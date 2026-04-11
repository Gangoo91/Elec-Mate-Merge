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
  { label: 'Landlord Electrical Safety York', href: '/landlord-electrical-safety-york' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'york-enforcement', label: 'City of York Council Enforcement' },
  { id: 'older-properties', label: 'Victorian and Older Properties' },
  { id: 'hmo-requirements', label: 'HMO Requirements in York' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in York' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all York private landlords to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'York has an exceptionally high proportion of pre-1919 housing stock, including Victorian and Georgian terraced properties, many of which have been converted to private rented or HMO use. These properties frequently contain aged wiring requiring remedial work following EICR inspection.',
  'City of York Council is the local housing authority enforcing the 2020 Regulations. The council operates mandatory and additional HMO licensing schemes, both requiring a valid EICR as a licence condition.',
  'Civil penalties for non-compliance reach up to £30,000 per breach. York landlords with older properties and multiple compliance failures face significant cumulative financial exposure.',
  "Absent RCD protection under BS 7671 Regulation 411.3.3 is one of the most common C2 findings in York's Victorian rental stock. Consumer unit replacement is frequently required as a condition of making an Unsatisfactory EICR Satisfactory.",
];

const faqs = [
  {
    question: 'What are the electrical safety rules for York landlords?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all York private landlords to have the electrical installation inspected and tested by a qualified person, obtain an EICR before each new tenancy, and repeat the inspection at least every five years. A copy must be provided to tenants within 28 days of inspection and to City of York Council within seven days if requested. Penalties of up to £30,000 per breach apply for non-compliance.',
  },
  {
    question: 'Why are Victorian properties a particular concern for York landlords and EICRs?',
    answer:
      'York has one of the highest concentrations of Victorian and pre-1919 housing stock in England. Many of these properties have wiring that is decades old, lacks RCD protection required under BS 7671 Regulation 411.3.3, and may have deteriorated cable insulation or inadequate earthing. These issues are commonly recorded as C2 (potentially dangerous) observations on EICRs, resulting in an Unsatisfactory outcome. Landlords must then carry out remedial work — often a full consumer unit replacement — within 28 days.',
  },
  {
    question: 'Does City of York Council enforce landlord electrical safety?',
    answer:
      "Yes. City of York Council is the local housing authority responsible for enforcing the 2020 Regulations within York. The council's environmental health team investigates tenant complaints, conducts HMO licensing inspections, and issues civil penalties for non-compliance. York's large student population and significant HMO market make private rented sector enforcement an ongoing priority for the council.",
  },
  {
    question: 'Do York HMOs need an EICR more often than every five years?',
    answer:
      'The 2020 Regulations require an EICR at least every five years. City of York Council HMO licence conditions may require inspections every three to five years, depending on the property type and licence conditions. Older properties with complex electrical installations may face more frequent requirements. Always check the conditions specified on your HMO licence certificate.',
  },
  {
    question: 'What happens if a York rental fails its EICR?',
    answer:
      'An EICR is Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations under BS 7671 Section 631. The landlord must complete all required remedial work within 28 days (or sooner if specified by the inspector) and obtain written confirmation from a qualified electrician. The confirmation must be provided to the tenant and to City of York Council. Failure to complete remedial work is a separate breach carrying its own penalty.',
  },
  {
    question: 'How much does an EICR cost in York?',
    answer:
      'York EICR costs are broadly in line with Yorkshire and the Humber regional rates, which are generally below the national average. A one-bedroom flat typically costs £100 to £180, a two to three-bedroom terraced house £160 to £280, and a student HMO £250 to £450 depending on size and complexity. Victorian properties with complex or aged wiring may take longer to inspect and cost more than newer properties with straightforward installations.',
  },
  {
    question: 'What are common EICR findings in York rental properties?',
    answer:
      "The most common EICR findings in York's Victorian and Edwardian rental stock are absent RCD protection on socket circuits (C2 under BS 7671 Regulation 411.3.3), deteriorated rubber-insulated wiring (pre-1960s properties), inadequate or absent main protective bonding, earthing conductor undersizing, and overloaded circuits in converted terraced houses. Consumer unit replacement is the most common remedial work arising from York EICRs.",
  },
  {
    question: 'Can York tenants request a copy of the EICR?',
    answer:
      "Yes. Tenants have the right to receive a copy of the current EICR — new tenants before moving in, existing tenants within 28 days of inspection. If the landlord cannot provide a valid EICR, the tenant can report this to City of York Council's environmental health team. The University of York and York St John University student unions can also assist students with housing complaints.",
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
    href: '/landlord-electrical-safety-exeter',
    title: 'Landlord Electrical Safety Exeter',
    description: 'EICR requirements for Exeter landlords and the Devon rental market.',
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
          are the primary legislation governing landlord electrical safety obligations in York.
          These regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for
          all existing tenancies. Every private landlord in York must comply, regardless of property
          age, size, or tenant type.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must have the electrical installation
                inspected and tested by a qualified person and obtain an Electrical Installation
                Condition Report (EICR) before a new tenancy begins and at least every five years.
                Reports are produced under{' '}
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
                EICR to City of York Council within seven days if requested.
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
          regulated tenancies in England, covering all student lets, professional tenancies, and
          long-term rental arrangements in York. They do not apply to social housing or lodger
          arrangements where the landlord lives in the property.
        </p>
      </>
    ),
  },
  {
    id: 'york-enforcement',
    heading: 'City of York Council Enforcement',
    content: (
      <>
        <p>
          City of York Council is the unitary local authority responsible for enforcing the 2020
          Regulations within York. The council's environmental health team investigates complaints,
          conducts licensing inspections, and has powers to impose civil penalties, issue remedial
          notices, and revoke HMO licences.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Environmental health enforcement</strong> — City of York Council's
                environmental health team handles private rented sector complaints and
                investigations. York's large student rental market, tourism-driven short-let
                economy, and significant Victorian housing stock all contribute to a busy
                enforcement caseload.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing enforcement</strong> — a valid EICR is a mandatory condition
                of all HMO licences granted by City of York Council. The council can refuse to grant
                or renew licences where EICR documentation cannot be produced and can revoke
                licences for persistent non-compliance with electrical safety conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven investigations</strong> — many York enforcement actions
                begin with tenant complaints. University of York and York St John University
                students are increasingly aware of their housing rights, and complaints to the
                council's environmental health team are a common enforcement trigger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial powers</strong> — where a landlord fails to comply with a remedial
                notice, City of York Council can arrange for the work to be carried out and recover
                costs from the landlord, alongside imposing civil penalties of up to £30,000 per
                breach.
              </span>
            </li>
          </ul>
        </div>
        <p>
          York landlords with multiple properties should maintain comprehensive EICR records for
          every property. City of York Council can request this documentation at any time, and
          absence of a valid EICR is treated as prima facie evidence of non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'older-properties',
    heading: 'Victorian and Older Properties: EICR Challenges in York',
    content: (
      <>
        <p>
          York has one of the highest proportions of pre-1919 housing stock of any English city.
          Victorian and Georgian terraced houses, many originally built for working-class families
          and since converted to private rented or multi-occupancy use, are a defining feature of
          York's rental landscape. These properties present specific electrical safety challenges
          that York landlords must understand.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated wiring</strong> — properties built before the 1960s often
                have rubber-insulated conductors. Rubber insulation deteriorates over decades,
                becoming brittle and eventually cracking or crumbling. Deteriorated rubber wiring is
                recorded as a C2 observation on the EICR and must be replaced as part of remedial
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — properties installed before modern wiring
                regulations required RCD protection on socket circuits frequently lack this critical
                safety device. Under BS 7671 Regulation 411.3.3, 30mA RCD protection is required on
                socket-outlet circuits rated up to 32A. Absence of RCD protection is one of the most
                common C2 observations in York EICRs and typically requires consumer unit
                replacement to rectify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding deficiencies</strong> — older York properties
                frequently lack adequate main protective bonding to gas and water services, or have
                earthing conductors that are undersized by current standards. These are commonly
                recorded as C2 observations requiring remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit age</strong> — many York Victorian rental properties still
                have older-style consumer units (fuse boxes) using rewirable or cartridge fuses
                rather than modern MCBs and RCDs. These are typically recorded as C2 or C3
                observations, with consumer unit replacement being the standard solution.
              </span>
            </li>
          </ul>
        </div>
        <p>
          York landlords with Victorian properties should budget for periodic consumer unit
          replacement and wiring upgrades as part of their long-term property maintenance planning.
          Proactive investment in electrical infrastructure reduces the risk of Unsatisfactory EICRs
          and the costly emergency remedial work that follows.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in York',
    content: (
      <>
        <p>
          York has a substantial HMO market, driven primarily by the University of York (Heslington
          campus) and York St John University, as well as a growing professional co-living sector.
          Areas including Fulford, Fishergate, Bishopthorpe Road, and Heworth contain high
          concentrations of HMO properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR covering all fixed electrical
                installations, communal areas, fire alarm systems, and emergency lighting is a
                mandatory licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional HMO licensing</strong> — City of York Council operates additional
                licensing schemes covering smaller HMOs in designated areas. Landlords should check
                whether their property falls within an additional licensing designation and what
                conditions apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter EICR intervals</strong> — York HMO licence conditions typically
                require EICRs every three to five years. Always check the specific conditions on
                your HMO licence certificate. Older properties with complex electrical installations
                may face more frequent requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Academic year planning</strong> — the York student rental market operates on
                an academic year cycle with most tenancies beginning in September or October.
                Landlords should arrange EICR inspections in May or June and complete any remedial
                work before the summer handover period.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in York is a criminal offence with an unlimited fine on
          conviction. City of York Council actively investigates unlicensed HMOs and has prosecuted
          landlords. Civil penalties for electrical safety non-compliance apply entirely separately
          from HMO licensing offences.
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
          York landlords who fail to comply with the 2020 Regulations face civil penalties of up to
          £30,000 per breach. The regulations create multiple distinct obligations, each of which
          can attract its own penalty if breached.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to tenants, failing to supply it to City of York Council on request, and
                failing to complete remedial work within 28 days are each separate breaches with
                their own potential penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence consequences</strong> — City of York Council can refuse to renew
                or revoke an HMO licence for non-compliance with electrical safety conditions. For
                York student landlords, losing a licence during term time can be financially
                devastating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice without having provided the current EICR to the tenant.
                This applies to all York tenancies, including student lets with fixed end dates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlicensed HMO prosecution</strong> — operating an unlicensed HMO is a
                separate criminal offence with an unlimited fine, in addition to any civil penalties
                for electrical safety non-compliance. These consequences can run concurrently for
                the same property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A York EICR every five years — typically £140 to £300 — is negligible compared to the
          potential penalties or the consequences of losing an HMO licence. Electrical safety
          compliance should be a non-negotiable part of operating a York rental property.
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
          York tenants — including students from the University of York and York St John University,
          tourism and hospitality workers, and long-term residents — have specific rights under the
          2020 Regulations regarding electrical safety in their rented property.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to receive the EICR</strong> — new tenants must receive a copy before
                moving in. Existing tenants must receive a copy within 28 days of the inspection.
                Always request the EICR in writing before signing a York tenancy agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your York landlord cannot
                provide a valid EICR, report this to City of York Council's environmental health
                team. The University of York Students' Union and York St John University Students'
                Union both provide housing support for student tenants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies C1 or C2
                observations, the landlord must arrange remedial work within 28 days. If the
                landlord fails to act, City of York Council can arrange the work and recover costs
                from the landlord. Tenants must not be charged for this work.
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
          York tenants can seek further advice from Citizens Advice York, Shelter, or City of York
          Council's housing team. The council's website provides an online form for reporting
          private rented sector concerns.
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
          When a York EICR identifies C1 or C2 observations (classified under BS 7671 Section 631),
          landlords must complete remedial work within the strict timescales set by the 2020
          Regulations. For York's older housing stock, this work frequently involves significant
          electrical upgrades.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR, unless the inspector specifies a shorter timeframe. The 28-day
                period starts from the date of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate</strong> — a C1 (danger present) finding may
                require immediate disconnection. York landlords must treat C1 observations as urgent
                and arrange emergency remedial work as soon as possible rather than waiting for the
                28-day deadline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete,
                written confirmation from a qualified electrician must be obtained and provided to
                the tenant and to City of York Council within 28 days of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common York remedial work</strong> — in York's Victorian properties, typical
                remedial work includes consumer unit replacement to add RCD protection (Regulation
                411.3.3 of BS 7671), replacement of deteriorated rubber-insulated wiring,
                installation of main protective bonding, upgrading earthing conductors, and
                replacement of damaged or inadequate accessories.
              </span>
            </li>
          </ul>
        </div>
        <p>
          York landlords with Victorian properties should establish relationships with reliable
          local electricians in advance, so remedial work can begin immediately when required.
          Consumer unit replacements in Victorian properties can take a full day or more and require
          early booking.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in York',
    content: (
      <>
        <p>
          York has a reasonable supply of qualified electricians for EICR work. Demand peaks during
          summer as student landlords prepare properties for the new academic year. Early booking is
          particularly important for May to August inspections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — use the NICEIC, NAPIT, or ELECSA online
                registers to find York-based inspectors. Registration confirms qualifications,
                insurance, and ongoing assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector must hold City and Guilds
                2391 (Inspection and Testing) or equivalent, and a current BS 7671 qualification
                (C&G 2382 18th Edition). Specific experience with Victorian terraced properties and
                older wiring systems is highly valuable in York.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Book early</strong> — demand for EICR inspections in York peaks between May
                and August. Booking in March or April for summer inspections ensures availability
                and allows time for remedial work — which in York's Victorian properties can take
                considerably longer than a modern property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — verify professional indemnity insurance is held. This
                is required by all recognised competent person schemes and protects both parties if
                an error appears on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in York (2026 Prices)',
    content: (
      <>
        <p>
          York EICR costs are broadly in line with Yorkshire and the Humber regional rates,
          generally below the national average. However, the complexity of inspecting Victorian
          properties and HMOs with older electrical systems means some York EICRs take considerably
          longer than modern properties, affecting cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £100 to £180. Modern purpose-built flats are the
                most straightforward to inspect and sit at the lower end of the range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two to three-bedroom Victorian terrace</strong> — £160 to £280. Victorian
                properties with older wiring and complex layouts take longer, pushing costs towards
                the higher end of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO (four to six bedrooms)</strong> — £250 to £450. Fire alarm
                systems, emergency lighting, and multiple consumer units increase inspection scope
                and time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large HMO or complex Victorian property</strong> — £400 to £650+. Properties
                with rubber wiring, multiple conversion phases, or particularly aged electrical
                installations require the most thorough inspection and command the highest fees.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices cover the inspection and report only. Remedial work — particularly consumer unit
          replacement in York Victorian properties — is quoted and charged separately and can
          represent a significant additional cost. Proactive landlords who invest in electrical
          upgrades between EICR cycles reduce the risk of costly emergency remedials.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in York',
    content: (
      <>
        <p>
          York's concentration of Victorian rental properties and student HMOs creates excellent
          opportunities for electricians specialising in inspection and testing. Properties with
          aged wiring frequently result in Unsatisfactory EICRs requiring consumer unit replacement
          or rewiring — high-value follow-on work for the inspecting electrician.
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
                  to complete the full report on your phone while still on site in York. AI board
                  scanning, voice test entry, and instant PDF export mean the landlord has their
                  report before you leave. Ideal for the summer rush of York student property
                  inspections.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win the Consumer Unit Replacement</h4>
                <p className="text-white text-sm leading-relaxed">
                  When rubber wiring or absent RCD protection is found in a York Victorian terrace,
                  quote the consumer unit replacement immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . York landlords must act within 28 days — quoting on the day of the EICR
                  consistently wins the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your York landlord EICR business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more York EICRs per day and win the Victorian property remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyYorkPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety York | EICR Landlords York"
      description="Landlord electrical safety requirements in York. 2020 Regulations, City of York Council enforcement, Victorian property EICR challenges, HMO licensing, penalties up to £30,000, and 2026 EICR costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety York:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything York landlords need to know about electrical safety compliance — the 2020 Regulations, City of York Council enforcement, Victorian property EICR challenges, HMO licensing requirements, penalties of up to £30,000, and 2026 EICR costs."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in York"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
