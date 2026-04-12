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
  { label: 'Landlord Electrical Safety Oxford', href: '/landlord-electrical-safety-oxford' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'oxford-enforcement', label: 'Oxford City Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO and Student Rental Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Oxford' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Oxford private landlords to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Oxford has one of the highest proportions of private rented households in England, driven by the University of Oxford, Oxford Brookes University, and a large professional workforce. Oxford City Council enforces the 2020 Regulations with civil penalties of up to £30,000 per breach.',
  'Oxford City Council operates mandatory and additional HMO licensing schemes. A valid EICR is a mandatory condition of every HMO licence, and many licences require inspections every three years rather than five.',
  "Much of Oxford's rental housing stock consists of Victorian and Edwardian terraced properties, which frequently present C2 observations for absent RCD protection, deteriorated wiring, and inadequate earthing during EICR inspections.",
  'Landlords must complete remedial work within 28 days of an Unsatisfactory EICR (or sooner if specified by the inspector) and provide written confirmation to the tenant and local authority.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety rules in Oxford?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Oxford private landlords to have the electrical installation inspected and tested by a qualified person and obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days of the inspection and supplied to Oxford City Council within seven days if requested. Penalties of up to £30,000 per breach apply for non-compliance.',
  },
  {
    question: 'Do Oxford student properties need an EICR?',
    answer:
      'Yes. All privately rented properties in Oxford must comply with the 2020 Regulations, including those let to students. Most Oxford student houses with three or more occupants from different households qualify as HMOs and require licensing from Oxford City Council, with a valid EICR as a mandatory licence condition. Many Oxford student properties are Victorian terraces with old wiring that may fail inspection.',
  },
  {
    question: 'Does Oxford City Council actively enforce landlord electrical safety?',
    answer:
      'Yes. Oxford City Council has an active private rented sector enforcement team. Oxford has one of the largest private rented sectors outside London as a proportion of total housing stock, and the council has significant enforcement experience. Enforcement is driven by tenant complaints, HMO licence inspections, and proactive investigations. Non-compliant landlords can face civil penalties of up to £30,000 per breach and, for HMO landlords, licence revocation.',
  },
  {
    question: 'How often does an Oxford HMO need an EICR?',
    answer:
      'The 2020 Regulations require an EICR at least every five years. Oxford City Council HMO licence conditions commonly require a shorter interval — typically every three to five years or at each licence renewal. The specific requirement is stated on the licence certificate. Properties that have previously received an Unsatisfactory EICR may be subject to more frequent inspections as a licence condition.',
  },
  {
    question: 'What happens if an Oxford rental fails its EICR?',
    answer:
      'An EICR is classed as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. The landlord must complete all required remedial work within 28 days (or sooner if specified by the inspector) and obtain written confirmation from a qualified electrician that the work is satisfactory. The written confirmation must be provided to the tenant and to Oxford City Council. Failure to complete remedial work is a separate breach and can attract its own penalty.',
  },
  {
    question: 'How much does an EICR cost in Oxford?',
    answer:
      'Oxford EICR costs are broadly in line with the South East of England, higher than national averages but below central London rates. A one-bedroom flat typically costs £120 to £200, a two to three-bedroom terraced house £200 to £350, and a student HMO £300 to £550 depending on size and complexity. Victorian properties with older wiring may take longer to inspect and cost more. Prices typically increase during the summer peak demand period.',
  },
  {
    question: 'Can Oxford tenants request a copy of the EICR?',
    answer:
      "Yes. Tenants have the right to receive a copy of the current EICR — new tenants before they move in, and existing tenants within 28 days of the inspection. If a landlord cannot provide a valid EICR, the tenant can report this to Oxford City Council's environmental health team, which can investigate and take enforcement action. University accommodation services and student unions can also provide guidance.",
  },
  {
    question: 'What are the most common EICR failures in Oxford rental properties?',
    answer:
      'The most common findings in Oxford rental properties, particularly the Victorian and Edwardian terraced stock, are absent or inadequate RCD protection on socket-outlet circuits (C2 under Regulation 411.3.3 of BS 7671), deteriorated rubber or early PVC cable insulation, inadequate main protective bonding, and overloaded circuits resulting from conversion of single-family houses into HMOs. Consumer unit replacement is frequently required as part of remedial work.',
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
    href: '/landlord-electrical-safety-cambridge',
    title: 'Landlord Electrical Safety Cambridge',
    description: 'EICR requirements for Cambridge landlords, student rentals, and HMO licensing.',
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
          are the primary legislation governing landlord electrical safety in Oxford. These
          regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for all
          existing tenancies. Every private landlord in Oxford — from a single flat to a portfolio
          of student HMOs — must comply.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must have the electrical installation
                inspected and tested by a qualified person and obtain an Electrical Installation
                Condition Report (EICR) before a new tenancy begins and at least every five years.
                Inspections are carried out under{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — existing tenants must receive a copy of the
                EICR within 28 days of the inspection. New tenants must receive a copy before moving
                in. Prospective tenants can request a copy within 28 days of asking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to Oxford City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a person who is
                qualified and competent, in practice meaning registration with a recognised
                competent person scheme such as NICEIC, NAPIT, or ELECSA.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all assured shorthold tenancies, assured tenancies, and regulated
          tenancies in England, covering all student lets, professional lets, and long-term
          tenancies in Oxford. They do not apply to social housing or lodger arrangements where the
          landlord resides in the property.
        </p>
      </>
    ),
  },
  {
    id: 'oxford-enforcement',
    heading: 'Oxford City Council Enforcement',
    content: (
      <>
        <p>
          Oxford City Council is the local housing authority responsible for enforcing the 2020
          Regulations within the city. Oxfordshire County Council has no direct enforcement role in
          these regulations — responsibility sits with the district and city councils. Oxford City
          Council has one of the most active private rented sector enforcement teams in the South
          East of England outside London.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Environmental health enforcement</strong> — Oxford City Council's
                environmental health team handles private rented sector complaints and
                investigations. With approximately 30 per cent of Oxford's housing stock in the
                private rented sector, the team handles a significant volume of cases and has
                substantial experience in enforcement action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing integration</strong> — EICR compliance checks are a standard
                part of HMO licence applications and renewals. The council can refuse to grant or
                renew a licence where an EICR is not provided, and can revoke a licence for
                non-compliance with electrical safety conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven investigations</strong> — many Oxford enforcement actions
                originate from tenant complaints, often from students made aware of their rights by
                university accommodation services or the Students' Union. A single complaint can
                trigger a formal investigation covering the entire property portfolio of a
                non-compliant landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action</strong> — where a landlord fails to comply with a remedial
                notice, Oxford City Council can arrange for the remedial work to be carried out and
                recover costs from the landlord. This power exists alongside the power to impose
                civil penalties of up to £30,000.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Oxford landlords with multiple properties across the city should maintain comprehensive
          compliance records for all properties. The council can request EICR documentation at any
          time, and absence of records is treated as evidence of non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO and Student Rental Requirements in Oxford',
    content: (
      <>
        <p>
          Oxford's two main universities — the University of Oxford and Oxford Brookes University —
          together with a large professional workforce create one of England's most active private
          rental markets. Shared housing is extremely common, and a high proportion of Oxford rental
          properties qualify as HMOs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR covering all fixed electrical
                installations, including communal areas, fire alarm systems, and emergency lighting,
                is a mandatory licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional HMO licensing</strong> — Oxford City Council operates additional
                licensing for smaller HMOs (three or four occupants) across much of the city. The
                majority of Oxford student houses fall within additional licensing areas. Check with
                the council whether your property requires a licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter EICR intervals</strong> — Oxford City Council HMO licence conditions
                typically require EICRs every three to five years, often tied to licence renewal
                cycles. Always check the conditions specified on your HMO licence certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Academic year planning</strong> — the Oxford student rental market operates
                on an academic year cycle with most tenancies beginning in October. Landlords should
                arrange EICR inspections in May or June and complete any remedial work well before
                September to avoid compliance failures at the start of a new tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian housing challenges</strong> — Jericho, Cowley, Headington, and
                East Oxford contain substantial amounts of Victorian and Edwardian terraced housing
                that has been converted for multi-occupancy use. These properties commonly present
                C2 observations for absent RCD protection (Regulation 411.3.3 of BS 7671),
                deteriorated wiring, and inadequate earthing. Consumer unit replacement is a
                frequent requirement following EICR inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Oxford is a criminal offence with an unlimited fine on
          conviction, in addition to civil penalties under the electrical safety regulations. Oxford
          City Council actively investigates unlicensed HMOs and has prosecuted multiple landlords
          in recent years.
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
          non-compliance. The maximum penalty is £30,000 per breach. Each failure — not obtaining an
          EICR, not providing it to the tenant, not supplying it to the council, and not completing
          remedial work — is a separate breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — multiple failures from a single property
                can accumulate rapidly. An Oxford landlord who has never obtained an EICR, not
                provided it to tenants, and ignored a remedial notice could face penalties totalling
                significantly more than £30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence consequences</strong> — in addition to civil penalties, Oxford
                City Council can refuse to renew or can revoke an HMO licence for non-compliance
                with electrical safety conditions. For Oxford student landlords, this can mean
                losing the ability to operate a property as an HMO for the duration of any appeal
                process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice without having provided the tenant with a copy of the
                current EICR. This is a significant practical issue for Oxford landlords who need to
                regain possession at the end of a fixed-term tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeat offence escalation</strong> — Oxford City Council maintains records
                of enforcement history. Repeat non-compliance can result in escalated penalties and
                more frequent compliance inspections across a landlord's entire Oxford portfolio.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of an EICR every five years — typically £150 to £400 in Oxford — is insignificant
          compared to the potential penalties and the reputational and financial consequences of
          losing an HMO licence.
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
          Oxford tenants, including students and professionals in shared houses, have specific
          statutory rights regarding electrical safety. The University of Oxford and Oxford Brookes
          University both actively inform students of their housing rights.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to receive the EICR</strong> — new tenants must receive a copy before
                moving in. Existing tenants must receive a copy within 28 days of the inspection.
                Request this in writing before signing a tenancy agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your Oxford landlord cannot
                produce a valid EICR, report this to Oxford City Council's environmental health
                team. The council has powers to investigate and impose financial penalties. OUSU and
                Oxford Brookes Students' Union both provide guidance on reporting housing concerns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrical installation</strong> — if the EICR identifies C1
                or C2 observations, the landlord must arrange remedial work within 28 days (or
                sooner). If the landlord fails to act, the council can arrange the work and recover
                costs. Tenants must not be charged for remedial work arising from electrical safety
                compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without providing the EICR. The Deregulation Act 2015 also
                protects tenants from retaliatory eviction where they have raised a legitimate
                complaint about property conditions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Oxford tenants can seek independent advice from Citizens Advice Oxford, Shelter, Oxford
          City Council's housing team, or their university accommodation service. All these
          organisations can assist with reporting non-compliant landlords and understanding tenant
          rights under the 2020 Regulations.
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
          When an Oxford EICR identifies C1 or C2 observations (classified under BS 7671 Section
          631), landlords must act quickly. The 2020 Regulations set strict timescales for
          completing remedial work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR, unless the inspector specifies a shorter timeframe. The clock
                starts from the date of the inspection, not when the report is received.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate</strong> — a C1 (danger present) observation may
                require immediate disconnection of the affected circuit. Oxford landlords should
                treat C1 findings as urgent and arrange emergency remedial work within days, not
                weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — once remedial work is complete, written
                confirmation from a qualified electrician must be obtained and provided to the
                tenant and to Oxford City Council within 28 days of the work being done.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Oxford remedial work</strong> — typical findings in Oxford Victorian
                rental properties include absent RCD protection (Regulation 411.3.3), deteriorated
                rubber-insulated cables, undersized earthing conductors, inadequate main bonding,
                and overloaded circuits created by converting houses into multi-occupancy use.
                Consumer unit replacement is common.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Oxford landlords preparing student properties for the new academic year should allow
          sufficient time between the EICR inspection and the tenancy start date to complete any
          required remedial work. A property cannot legally be let to new tenants without a
          Satisfactory EICR.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Oxford',
    content: (
      <>
        <p>
          Oxford has a reasonable supply of qualified electricians for EICR work, but demand spikes
          in the summer months as the academic year cycle drives a concentration of inspections.
          Landlords should book well in advance, particularly for the May to August peak period.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — use the NICEIC, NAPIT, or ELECSA online
                registers to find Oxford-based inspectors. Registration confirms qualifications,
                insurance, and ongoing technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector must hold City and Guilds
                2391 (Inspection and Testing) or equivalent, and a current BS 7671 qualification
                (C&G 2382 18th Edition). Experience with Victorian terraced housing and HMO
                properties is valuable for Oxford work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Book early</strong> — experienced EICR inspectors in Oxford are in high
                demand through summer. Booking in April for May or June inspections is advisable for
                landlords preparing student properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — verify professional indemnity insurance is in place.
                This is required by competent person scheme membership and protects the landlord in
                the event of an error on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Oxford (2026 Prices)',
    content: (
      <>
        <p>
          Oxford EICR costs reflect South East of England labour rates, local demand dynamics, and
          the prevalence of older housing stock. Prices are broadly higher than Midlands rates but
          below central London levels.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £120 to £200. Modern purpose-built apartments
                with fewer circuits are typically quicker to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two to three-bedroom terraced house</strong> — £200 to £360. Victorian
                properties with complex wiring layouts take longer and cost more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO (four to six bedrooms)</strong> — £320 to £560. Fire alarm
                systems, emergency lighting, and multiple consumer units increase inspection scope
                and cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large HMO (seven or more bedrooms)</strong> — £500 to £800+. Larger
                properties with extended electrical installations require proportionally more
                inspection time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices given are for the inspection and report only. Remedial work identified during the
          EICR is quoted and charged separately. Oxford landlords with multiple properties may be
          able to negotiate portfolio pricing with a local electrician.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Oxford',
    content: (
      <>
        <p>
          Oxford's combination of two major universities, a large professional workforce, and
          significant Victorian housing stock creates sustained and growing demand for landlord
          EICRs. The concentration of HMOs with complex electrical installations, fire alarms, and
          emergency lighting means each inspection generates above-average revenue and frequent
          remedial work opportunities.
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
                  test entry, and instant PDF export mean the landlord or letting agent has the
                  report before you leave. In the Oxford summer peak, faster turnaround wins repeat
                  business.
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
                  When C1 or C2 observations are found in an Oxford Victorian terrace, quote the
                  consumer unit replacement or RCD upgrade immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Oxford landlords must act within 28 days — the electrician who quotes on the day
                  wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Oxford landlord EICR business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more Oxford EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyOxfordPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Oxford | EICR Landlords Oxford"
      description="Landlord electrical safety requirements in Oxford. 2020 Regulations, Oxford City Council enforcement, student HMO licensing, penalties up to £30,000, Victorian property EICR challenges, and 2026 costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Oxford:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Oxford landlords need to know about electrical safety compliance — the 2020 Regulations, Oxford City Council enforcement, student HMO licensing requirements, Victorian property challenges, penalties of up to £30,000, and 2026 EICR costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Oxford"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
