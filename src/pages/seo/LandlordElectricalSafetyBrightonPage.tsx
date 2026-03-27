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
  { label: 'Landlord Electrical Safety Brighton', href: '/landlord-electrical-safety-brighton' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'brighton-enforcement', label: 'Brighton Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Brighton' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Brighton' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Brighton and Hove private landlords to obtain an EICR before a new tenancy and at least every five years.',
  'Brighton and Hove City Council is one of the more active local authorities in England for private rented sector enforcement, with a dedicated team handling HMO licensing and electrical safety compliance.',
  'Brighton has a very large HMO market serving the University of Brighton and University of Sussex student populations, as well as a substantial professional co-living sector. Most HMOs require licensing with a valid EICR as a mandatory condition.',
  'Civil penalties for non-compliance reach up to £30,000 per breach. Multiple failures from the same property — no EICR, no tenant copy, no response to remedial notice — can each attract separate penalties.',
  'Brighton\'s mixture of Regency, Victorian, and Edwardian housing stock, much of it converted into flats, frequently presents EICR challenges including absent RCD protection, deteriorated wiring, and inadequate earthing.',
];

const faqs = [
  {
    question: 'What are the electrical safety rules for Brighton landlords?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all privately rented properties in Brighton and Hove. Landlords must have the electrical installation inspected and tested by a qualified person, obtain an EICR before a new tenancy, and repeat the inspection at least every five years. A copy must be given to tenants within 28 days of inspection and to Brighton and Hove City Council within seven days if requested. Penalties of up to £30,000 per breach apply.',
  },
  {
    question: 'Do Brighton student houses need an EICR?',
    answer:
      'Yes. All privately rented properties in Brighton and Hove must comply with the 2020 Regulations, including those let to students. Properties occupied by three or more students from different households are likely to be HMOs requiring licensing from Brighton and Hove City Council, with a valid EICR as a mandatory condition. The university campuses in Brighton and Falmer generate significant demand for student HMOs across Kemptown, Hanover, and Preston Park.',
  },
  {
    question: 'Does Brighton and Hove City Council actively enforce landlord electrical safety?',
    answer:
      'Yes. Brighton and Hove City Council has an active private rented sector enforcement team. The city has a large and long-established private rented sector, significant HMO concentrations around both university campuses, and a council that has historically prioritised housing standards enforcement. The team investigates tenant complaints, conducts licensing inspections, and issues civil penalties for non-compliance with the 2020 Regulations.',
  },
  {
    question: 'What are the Brighton HMO licensing requirements?',
    answer:
      'Brighton and Hove City Council operates mandatory HMO licensing (five or more occupants, two or more households) and additional HMO licensing covering smaller HMOs in designated areas. A valid EICR is a mandatory condition of all HMO licences. Some Brighton HMO licences require EICRs every three years rather than five. Landlords should check their specific licence conditions. Operating an unlicensed HMO is a criminal offence with an unlimited fine.',
  },
  {
    question: 'How much does an EICR cost in Brighton?',
    answer:
      'Brighton EICR costs are broadly in line with South East of England rates. A one-bedroom flat typically costs £120 to £210, a two to three-bedroom property £190 to £340, and a student HMO £300 to £550 depending on size. Converted Regency and Victorian properties with multiple consumer units or complex layouts may cost more. Prices can increase during the summer peak when student property demand is high.',
  },
  {
    question: 'What happens if a Brighton rental fails its EICR?',
    answer:
      'An EICR is Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. The landlord must complete all remedial work within 28 days (or sooner if specified by the inspector) and obtain written confirmation from a qualified electrician. This confirmation must be provided to the tenant and to Brighton and Hove City Council. Failure to complete remedial work is a separate breach carrying its own penalty of up to £30,000.',
  },
  {
    question: 'Can Brighton tenants request an EICR from their landlord?',
    answer:
      'Yes. Tenants have the right to receive a copy of the current EICR — new tenants before moving in, existing tenants within 28 days of inspection. If the landlord cannot provide a valid EICR, the tenant can report this to Brighton and Hove City Council\'s environmental health team. The council can investigate and take enforcement action. Brighton\'s active student unions at the University of Brighton and University of Sussex can also assist students with housing concerns.',
  },
  {
    question: 'What are common EICR findings in Brighton rental properties?',
    answer:
      'Brighton\'s mixture of Regency, Victorian, and Edwardian housing converted into flats and HMOs frequently presents C2 observations. The most common findings include absent RCD protection on socket-outlet circuits (Regulation 411.3.3 of BS 7671), deteriorated rubber or early PVC cable insulation, inadequate earthing and bonding in converted properties, and overloaded circuits in multi-occupancy conversions. Consumer unit upgrades are frequently required as part of remedial work.',
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
    href: '/landlord-electrical-safety-reading',
    title: 'Landlord Electrical Safety Reading',
    description: 'EICR requirements for Reading landlords and the Thames Valley rental market.',
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
    heading: 'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          are the primary legislation governing landlord electrical safety obligations in Brighton
          and Hove. These regulations came into force on 1 June 2020 for new tenancies and
          1 April 2021 for all existing tenancies. Every private landlord in Brighton must comply.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must have the electrical installation
                inspected and tested by a qualified person and obtain an Electrical Installation
                Condition Report (EICR) before a new tenancy begins and at least every five years.
                The EICR is produced under{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing requirements).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — existing tenants must receive a copy
                within 28 days of the inspection. New tenants must receive a copy before moving
                in. Prospective tenants can request a copy within 28 days of their request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy to
                Brighton and Hove City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a person
                who is qualified and competent, in practice meaning registration with a
                recognised competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all assured shorthold tenancies, assured tenancies, and
          regulated tenancies in England, covering all student lets, co-living arrangements, and
          professional tenancies in Brighton and Hove. They do not apply to social housing or
          lodger arrangements where the landlord lives in the property.
        </p>
      </>
    ),
  },
  {
    id: 'brighton-enforcement',
    heading: 'Brighton and Hove City Council Enforcement',
    content: (
      <>
        <p>
          Brighton and Hove City Council is the local housing authority responsible for enforcing
          the 2020 Regulations across the city. The council has a well-established private rented
          sector enforcement function, reflecting Brighton's large and historically complex rental
          market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Environmental health enforcement</strong> — the council's environmental
                health team investigates tenant complaints, inspects properties, and issues
                civil penalties for non-compliance with the 2020 Regulations. Brighton has a
                large private rented sector as a proportion of total housing, making enforcement
                a significant operational priority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing integration</strong> — EICR compliance is verified as
                part of HMO licence applications and inspections. The council can refuse to
                grant or renew a licence where a valid EICR cannot be provided and can revoke
                a licence for persistent non-compliance with electrical safety conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proactive and complaint-driven action</strong> — the council uses
                both proactive inspections (particularly for licensed HMOs) and complaint-driven
                investigations. Brighton's active student community and strong tenant advocacy
                networks mean that non-compliant landlords are frequently reported.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action</strong> — where a landlord fails to comply with a
                remedial notice, Brighton and Hove City Council can arrange for the work to
                be carried out and recover costs, in addition to imposing civil penalties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Brighton landlords should maintain clear records of all EICRs, remedial work, and
          tenant communications for every property in their portfolio. The council can request
          these at any time and treats absence of documentation as evidence of non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Brighton',
    content: (
      <>
        <p>
          Brighton and Hove has one of the largest HMO markets on the South Coast, driven by
          two universities, a young professional population, and a culture of co-living. The
          University of Brighton (city centre and Eastbourne campuses) and the University of
          Sussex (Falmer) both generate substantial demand for shared accommodation in areas
          including Kemptown, Hanover, Lewes Road, and Preston Park.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or
                more occupants forming two or more households. A valid EICR covering all
                fixed electrical installations, fire alarm systems, and emergency lighting is
                a mandatory licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional HMO licensing</strong> — Brighton and Hove City Council
                operates additional licensing schemes covering smaller HMOs (three or four
                occupants) in designated areas with high HMO concentrations. Many Brighton
                student properties in Kemptown, Hanover, and around the university campuses
                fall within additional licensing areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter EICR intervals</strong> — Brighton HMO licence conditions
                commonly require EICRs every three to five years. Check the specific conditions
                on your HMO licence certificate. Licences are usually issued for five years
                and EICR requirements are typically checked at renewal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted property challenges</strong> — Brighton's housing stock
                includes large Regency and Victorian properties divided into flats and
                maisonettes, converted terraced houses used as HMOs, and purpose-built
                student accommodation. Converted properties often have complex electrical
                installations with shared wiring, multiple consumer units, and outdated
                systems requiring upgrading to meet current standards.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Brighton is a criminal offence. Brighton and Hove
          City Council actively investigates unlicensed HMOs and has prosecuted landlords in
          the Magistrates' Court. Civil penalties for electrical safety non-compliance apply
          entirely separately from HMO licensing offences.
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
          Brighton landlords who fail to comply with the 2020 Regulations face civil penalties
          of up to £30,000 per breach. The regulations create multiple distinct obligations,
          each of which can attract its own penalty if breached.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing
                to provide it to the tenant, failing to supply it to the council on request,
                and failing to complete remedial work within 28 days are each separate
                breaches with their own potential penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence consequences</strong> — Brighton and Hove City Council can
                refuse to renew or revoke an HMO licence for non-compliance with electrical
                safety conditions. For Brighton landlords operating student HMOs, licence
                revocation can result in significant financial loss and reputational damage
                within the competitive Brighton rental market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid
                Section 21 (no-fault eviction) notice without having provided the current EICR
                to the tenant. This is particularly relevant for Brighton landlords who wish
                to regain possession at the end of a student tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repeat offence escalation</strong> — the council maintains enforcement
                records. Repeat non-compliance results in escalated penalties and increases
                the frequency of council inspections across a landlord's Brighton portfolio.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of an EICR every five years — typically £150 to £400 in Brighton — is
          negligible when weighed against potential penalties and the loss of an HMO licence.
          Brighton landlords should treat electrical safety compliance as a basic operating cost.
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
          Brighton tenants — including students, young professionals, and long-term residents —
          have specific rights under the 2020 Regulations. Brighton's active tenant advocacy
          community and strong student union networks mean these rights are increasingly well known.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to receive the EICR</strong> — new tenants must receive a copy
                before moving in. Existing tenants must receive a copy within 28 days of the
                inspection. Always request the EICR in writing before signing a tenancy
                agreement in Brighton.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your Brighton landlord
                cannot provide a valid EICR, report this to Brighton and Hove City Council's
                environmental health team. The University of Brighton Students' Union and
                University of Sussex Students' Union both provide housing support for students
                experiencing non-compliant landlords.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to prompt remedial action</strong> — if the EICR identifies C1
                or C2 observations, the landlord must arrange remedial work within 28 days.
                If the landlord fails to act, the council can arrange the work and recover
                costs. Tenants must not be charged for remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve
                a valid Section 21 notice without providing the EICR. The Deregulation Act
                2015 additionally protects tenants who have raised legitimate complaints about
                property conditions from retaliatory eviction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Brighton tenants can seek further advice from Citizens Advice Brighton, Shelter,
          or Brighton and Hove City Council's housing team. The council's website provides
          an online form for reporting private rented sector concerns.
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
          When a Brighton EICR identifies C1 or C2 observations (classified under BS 7671
          Section 631), landlords must complete remedial work within the timescales set by the
          2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within
                28 days of the EICR, unless the inspector specifies a shorter period.
                The clock starts from the date of the inspection, not when the report arrives.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate</strong> — a C1 (danger present) finding
                may require immediate disconnection of the affected circuit. Brighton landlords
                must treat C1 observations as urgent and arrange emergency remedial work
                promptly, not wait for the 28-day deadline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — once remedial work is complete, written
                confirmation from a qualified electrician must be obtained and provided to the
                tenant and to Brighton and Hove City Council within 28 days of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Brighton remedial work</strong> — typical remedial work in
                Brighton rental properties includes fitting RCD protection on socket circuits
                (Regulation 411.3.3 of BS 7671), replacing deteriorated consumer units,
                upgrading earthing and bonding in converted properties, replacing aged wiring,
                and addressing inadequate fire alarm and emergency lighting circuits in HMOs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Brighton landlords should maintain relationships with reliable local electricians
          who can respond quickly when remedial work is required. Delays beyond the 28-day
          deadline are a separate breach of the regulations.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Brighton',
    content: (
      <>
        <p>
          Brighton has a good supply of qualified electricians capable of carrying out EICRs.
          Demand increases during the summer months as landlords prepare student properties
          for the new academic year. Early booking is advisable for June to August inspections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — use the NICEIC, NAPIT, or ELECSA
                online registers to find Brighton-based inspectors. Registration confirms
                qualifications, insurance, and ongoing assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector must hold City and
                Guilds 2391 (Inspection and Testing) or equivalent, plus a current BS 7671
                qualification (C&G 2382 18th Edition). Experience with converted Regency and
                Victorian properties and HMOs is particularly useful in Brighton.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Book ahead of summer</strong> — demand peaks in June and July as
                Brighton landlords prepare student properties for the new term. Booking in
                April or May avoids availability constraints and allows time for remedial work
                before September tenancy start dates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance verification</strong> — confirm the inspector carries
                professional indemnity insurance. This is required by all competent person
                schemes and protects both parties if an error is discovered on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Brighton (2026 Prices)',
    content: (
      <>
        <p>
          Brighton EICR costs are broadly in line with South East of England rates, reflecting
          local labour costs and the prevalence of older housing stock. Converted properties
          and HMOs with complex electrical installations cost more to inspect.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £120 to £210. Modern purpose-built flats
                with straightforward installations are at the lower end of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two to three-bedroom property</strong> — £190 to £340. Converted
                Victorian and Regency properties with more complex wiring cost more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO (four to six bedrooms)</strong> — £300 to £550.
                Fire alarm systems, emergency lighting, and multiple distribution boards
                increase the inspection scope and cost significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large HMO (seven bedrooms or more)</strong> — £500 to £800+.
                Larger properties with extensive electrical installations require
                proportionally longer inspection times and higher fees.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These figures cover the inspection and report only. Remedial work is quoted and
          charged separately. Brighton landlords with multiple properties may benefit from
          negotiating portfolio pricing with a trusted local electrician.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Brighton',
    content: (
      <>
        <p>
          Brighton's large and varied private rented sector — spanning student HMOs, professional
          co-living properties, and long-term family rentals — creates sustained demand for
          landlord EICRs. The concentration of converted Victorian properties and HMOs means
          inspections frequently identify remedial work, creating follow-on revenue opportunities.
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
                  to complete the full report on your phone while on site. AI board scanning,
                  voice test entry, and instant PDF export mean the Brighton landlord has their
                  report before you leave. Complete more jobs per day during the summer peak.
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
                  When C2 observations are found in a Brighton Victorian conversion, quote the
                  consumer unit upgrade or RCD installation immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Brighton landlords must act within 28 days — and the electrician who quotes
                  on the day wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Brighton landlord EICR business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more Brighton EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyBrightonPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Brighton | EICR Landlords Brighton"
      description="Landlord electrical safety requirements in Brighton and Hove. 2020 Regulations, Brighton City Council enforcement, HMO licensing, penalties up to £30,000, converted property EICR challenges, and 2026 costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Brighton:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Brighton and Hove landlords need to know about electrical safety compliance — the 2020 Regulations, Brighton City Council enforcement, HMO licensing, student rental requirements, penalties of up to £30,000, and 2026 EICR costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Brighton"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
