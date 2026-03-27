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
  { label: 'Landlord Electrical Safety Exeter', href: '/landlord-electrical-safety-exeter' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'exeter-enforcement', label: 'Exeter City Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Exeter' },
  { id: 'devon-wider-area', label: 'Devon: Wider Area Considerations' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Exeter and Devon' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Exeter and Devon private landlords to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Exeter City Council and the Devon district councils enforce the 2020 Regulations in their respective areas. Exeter\'s large student population — driven by the University of Exeter — creates significant HMO demand and associated licensing requirements.',
  'Civil penalties for non-compliance can reach £30,000 per breach. Each distinct failure — not obtaining an EICR, not providing it to tenants, not completing remedial work — is a separate breach with its own potential penalty.',
  'Devon has a mix of property ages, from Victorian terraces in Exeter and Torquay to rural properties in the surrounding villages. Older properties frequently present C2 observations for absent RCD protection and deteriorated wiring during EICR inspections.',
  'Landlords must complete remedial work within 28 days of an Unsatisfactory EICR (or sooner as directed) and provide written confirmation to the tenant and local authority. Consumer unit replacement is frequently required in older Devon rental stock.',
];

const faqs = [
  {
    question: 'What are the electrical safety rules for Exeter landlords?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Exeter private landlords to have the electrical installation inspected and tested by a qualified person and obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days of inspection and supplied to Exeter City Council within seven days if requested. Penalties of up to £30,000 per breach apply for non-compliance.',
  },
  {
    question: 'Do Exeter student properties need an EICR?',
    answer:
      'Yes. All privately rented properties in Exeter must comply with the 2020 Regulations, including those let to University of Exeter students. Properties occupied by three or more students from different households qualify as HMOs and may require licensing from Exeter City Council, with a valid EICR as a mandatory condition. Student rental demand is concentrated in Exeter\'s St Thomas, Heavitree, and Pennsylvania areas.',
  },
  {
    question: 'Does the Devon countryside need an EICR too?',
    answer:
      'Yes. The 2020 Regulations apply to all privately rented properties in England, including rural Devon properties, holiday lets used as assured shorthold tenancies, and properties in remote locations. Each district council — including East Devon, Mid Devon, Teignbridge, and Torridge — is responsible for enforcement in their area. Rural properties with older electrical systems and no recent upgrade history are at particular risk of Unsatisfactory EICRs.',
  },
  {
    question: 'Does Exeter City Council enforce landlord electrical safety?',
    answer:
      'Yes. Exeter City Council\'s environmental health team investigates private rented sector complaints and conducts HMO licensing inspections. The council can impose civil penalties of up to £30,000 per breach, issue remedial notices, revoke HMO licences, and arrange for remedial work to be carried out at the landlord\'s expense. Exeter\'s large student rental market makes enforcement an ongoing priority.',
  },
  {
    question: 'How much does an EICR cost in Exeter and Devon?',
    answer:
      'Exeter EICR costs are broadly in line with the South West region — generally below the national average. A one-bedroom flat typically costs £100 to £180, a two to three-bedroom property £160 to £280, and a student HMO £250 to £450 depending on size. Rural Devon properties may attract travel surcharges if the electrician has to travel significant distances. Older farmhouses and converted barns with complex electrical installations may cost more.',
  },
  {
    question: 'What are common EICR findings in Exeter and Devon rental properties?',
    answer:
      'The most common EICR findings in Exeter and Devon rental properties include absent RCD protection on socket circuits (C2 under BS 7671 Regulation 411.3.3), deteriorated cable insulation in older terraced properties, inadequate main protective bonding, and overloaded circuits in converted HMOs. Rural Devon properties may also have earthing issues related to TT earthing systems, which require specific testing and verification.',
  },
  {
    question: 'What happens if an Exeter rental fails its EICR?',
    answer:
      'An EICR is Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations under BS 7671 Section 631. The landlord must complete all required remedial work within 28 days (or sooner as specified by the inspector) and obtain written confirmation from a qualified electrician. The confirmation must be provided to the tenant and to Exeter City Council. Failure to complete remedial work is a separate breach with its own penalty of up to £30,000.',
  },
  {
    question: 'Do Devon rural rental properties have different EICR requirements?',
    answer:
      'The legal requirements under the 2020 Regulations are identical across all English private rented properties. However, rural Devon properties often have TT earthing systems (rather than the TN-S or TN-C-S systems common in urban areas), which require different testing procedures and earthing electrode verification. Rural properties may also have longer distances between the supply point and consumer unit, affecting volt drop calculations. Landlords should ensure their inspector has experience with rural property electrical systems.',
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
    href: '/landlord-electrical-safety-york',
    title: 'Landlord Electrical Safety York',
    description: 'EICR requirements for York landlords, Victorian properties, and HMO licensing.',
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
          are the primary legislation governing landlord electrical safety obligations in Exeter
          and across Devon. These regulations came into force on 1 June 2020 for new tenancies
          and 1 April 2021 for all existing tenancies. Every private landlord in Devon must
          comply, from city-centre student HMOs to rural farmhouse lettings.
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
                <strong>Tenant notification</strong> — existing tenants must receive a copy
                within 28 days of the inspection. New tenants must receive a copy before
                moving in. Prospective tenants can request a copy within 28 days of asking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of
                the EICR to the relevant local council within seven days if requested.
                In Exeter this means Exeter City Council; in the wider county, the relevant
                Devon district council.
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
          These regulations apply to all assured shorthold tenancies, assured tenancies, and
          regulated tenancies in England. They cover all Exeter student lets, professional
          tenancies, and rural Devon rental properties. They do not apply to social housing or
          lodger arrangements where the landlord lives in the property.
        </p>
      </>
    ),
  },
  {
    id: 'exeter-enforcement',
    heading: 'Exeter City Council Enforcement',
    content: (
      <>
        <p>
          Exeter City Council is the local housing authority responsible for enforcing the
          2020 Regulations within Exeter. The council's environmental health and housing
          standards team handles private rented sector complaints and HMO licensing inspections.
          Beyond the city boundary, Devon's district councils — East Devon, Mid Devon,
          Teignbridge, Torridge, North Devon, West Devon, and South Hams — are each responsible
          for enforcement in their areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exeter enforcement team</strong> — Exeter City Council has an active
                environmental health team that investigates tenant complaints, conducts HMO
                licence inspections, and issues civil penalties for non-compliance. The
                concentration of student HMOs around the University of Exeter makes electrical
                safety a significant enforcement priority within the city.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing enforcement</strong> — a valid EICR is a mandatory
                condition of HMO licences issued by Exeter City Council. The council can refuse
                to grant or renew a licence where an EICR cannot be provided and can revoke a
                licence for persistent non-compliance with electrical safety conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint-driven investigations</strong> — many enforcement actions
                in Exeter originate from tenant complaints. The University of Exeter Students'
                Guild actively supports students with housing concerns and refers non-compliant
                landlords to the council's environmental health team.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Devon district enforcement</strong> — enforcement in rural Devon is
                generally complaint-driven. Tenants in villages and market towns across the
                county can report non-compliant landlords to their local district council.
                While enforcement capacity varies across Devon's districts, all have powers
                to impose civil penalties of up to £30,000 per breach.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Exeter and Devon landlords should maintain clear EICR records for every property
          in their portfolio. The relevant council can request these documents at any time,
          and absence of a valid EICR is treated as evidence of non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Exeter',
    content: (
      <>
        <p>
          Exeter has a substantial HMO market driven primarily by the University of Exeter,
          with some of England's highest student satisfaction ratings and a growing student
          population. Student accommodation is concentrated in areas including St Thomas,
          Heavitree, Pennsylvania, and around the Streatham campus. Most shared student
          houses qualify as HMOs requiring licensing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or
                more occupants forming two or more households. A valid EICR covering all fixed
                electrical installations, communal areas, fire alarm systems, and emergency
                lighting is a mandatory licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional HMO licensing</strong> — Exeter City Council operates
                additional licensing schemes covering smaller HMOs in designated areas with
                high HMO concentrations. Landlords should check with the council whether their
                property falls within an additional licensing area and what conditions apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter EICR intervals</strong> — Exeter HMO licence conditions
                typically require EICRs every three to five years. Always check the conditions
                specified on your HMO licence certificate. Properties that have received
                Unsatisfactory EICRs may face more frequent inspection requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Academic year cycle</strong> — the Exeter student rental market
                operates on an academic year basis with most tenancies beginning in September
                or October. Landlords should arrange EICR inspections in May or June and
                complete any remedial work well before the new term begins.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating an unlicensed HMO in Exeter is a criminal offence with an unlimited fine
          on conviction, in addition to any civil penalties under the electrical safety
          regulations. Exeter City Council actively investigates unlicensed HMOs.
        </p>
      </>
    ),
  },
  {
    id: 'devon-wider-area',
    heading: 'Devon: Wider Area Considerations',
    content: (
      <>
        <p>
          Beyond Exeter, Devon's private rental market spans coastal towns, market towns,
          rural villages, and the South Devon Riviera resorts of Torquay, Paignton, and
          Brixham. Each area has its own mix of property ages, tenant demographics, and
          local authority enforcement approaches.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coastal rental properties</strong> — towns including Torquay, Brixham,
                Exmouth, and Ilfracombe have significant private rented sectors including
                holiday let conversions and long-term residential tenancies. Victorian and
                Edwardian seaside boarding houses converted to flats are common and frequently
                present EICR challenges similar to urban terraced housing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural properties and TT earthing</strong> — many rural Devon rental
                properties use TT earthing systems, where the installation has its own earth
                electrode rather than being connected to the supply network earth. TT systems
                require specific testing and verification of the earth electrode resistance
                (RN) and the installation of RCD protection for all circuits. Landlords of
                rural properties should ensure their EICR inspector has specific experience
                with TT systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel surcharges</strong> — rural Devon properties may attract travel
                surcharges from electricians who have to travel significant distances. Landlords
                with properties in remote locations should factor this into their budget and
                allow additional time for inspection scheduling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>District council enforcement</strong> — enforcement in rural Devon
                sits with each district council. While complaint-driven enforcement is the
                norm outside Exeter, all councils have the same powers and the same maximum
                penalty of £30,000 per breach. Non-compliance in rural Devon is not safer
                than non-compliance in Exeter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties across multiple Devon district council areas should
          maintain separate compliance records for each property and ensure they understand
          which local authority to supply EICR documentation to for each one.
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
          The 2020 Regulations give local authorities the power to impose civil penalties of
          up to £30,000 per breach. Non-compliance creates multiple distinct obligations, each
          capable of attracting its own penalty. Exeter and Devon landlords with multiple
          non-compliant properties face significant cumulative exposure.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing
                to provide it to tenants, failing to supply it to the council on request, and
                failing to complete remedial work within 28 days are each separate breaches
                with their own potential penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence consequences</strong> — Exeter City Council can refuse to
                renew or revoke an HMO licence for persistent non-compliance with electrical
                safety conditions. For Exeter student landlords, licence revocation during an
                active tenancy cycle can mean significant financial disruption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid
                Section 21 (no-fault eviction) notice without having provided the current EICR
                to the tenant. This applies equally to Exeter student lets and rural Devon
                tenancies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action at landlord's cost</strong> — where a landlord fails
                to comply with a remedial notice, the council can arrange for the work to be
                carried out and recover costs from the landlord. This power exists alongside
                the civil penalty regime and can result in significant additional expenditure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A Devon EICR every five years — typically £120 to £300 in the region — is modest
          compared to the maximum penalties. Exeter and Devon landlords should treat electrical
          safety compliance as a non-negotiable operating cost.
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
          Tenants in Exeter and across Devon have specific statutory rights under the 2020
          Regulations regarding electrical safety in their rented property. This includes
          university students, coastal town residents, and rural tenants in villages across
          the county.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to receive the EICR</strong> — new tenants must receive a copy
                before moving in. Existing tenants must receive a copy within 28 days of the
                inspection. Request the EICR in writing from your Exeter landlord or letting
                agent before signing any tenancy agreement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — if your Exeter landlord
                cannot provide a valid EICR, report this to Exeter City Council's environmental
                health team (or the relevant Devon district council if outside the city). The
                University of Exeter Students' Guild can also assist students with housing
                complaints.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies C1 or C2
                observations, the landlord must arrange remedial work within 28 days. If the
                landlord fails to act, the council can arrange the work and recover costs.
                Tenants must not be charged for remedial work arising from electrical safety
                compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve
                a valid Section 21 notice without providing the EICR. The Deregulation Act
                2015 additionally protects tenants who raise legitimate complaints about
                property conditions from retaliatory eviction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Exeter and Devon tenants can seek advice from Citizens Advice Devon, Shelter, or
          their local council's housing team. The University of Exeter Students' Guild has a
          dedicated advice and support service for student tenants experiencing housing
          issues in the city.
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
          When an Exeter or Devon EICR identifies C1 or C2 observations (classified under
          BS 7671 Section 631), landlords must complete remedial work within the strict
          timescales set by the 2020 Regulations. In rural Devon, finding available
          electricians quickly can be more challenging than in urban areas — planning ahead
          is essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within
                28 days of the EICR, unless the inspector specifies a shorter timeframe.
                The clock starts from the date of the inspection, not when the report arrives.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate</strong> — a C1 (danger present) finding
                may require immediate disconnection. Exeter and Devon landlords must treat
                C1 observations as urgent and arrange emergency remedial work as soon as
                possible, particularly in rural areas where electrician availability may
                be limited.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete,
                written confirmation from a qualified electrician must be obtained and provided
                to the tenant and to the relevant council within 28 days of the work
                being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Exeter and Devon remedial work</strong> — typical remedial work
                includes fitting RCD protection on socket circuits (Regulation 411.3.3 of
                BS 7671), consumer unit replacement, earthing conductor upgrades, main
                protective bonding installation, replacement of deteriorated cables, and
                earth electrode verification and improvement in rural TT properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Exeter landlords should maintain relationships with reliable local electricians who
          can respond quickly when remedial work is required. Rural Devon landlords should
          identify qualified electricians in their area in advance rather than searching when
          work is urgently needed.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Exeter and Devon',
    content: (
      <>
        <p>
          Exeter has a reasonable pool of qualified electricians for EICR work. In rural Devon,
          availability may be more limited and some inspectors may charge travel costs for
          remote properties. Booking well in advance is advisable, particularly for student
          property inspections in May to August.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — use the NICEIC, NAPIT, or ELECSA
                online registers to find Exeter and Devon-based inspectors. Registration
                confirms qualifications, insurance, and ongoing assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — the inspector must hold City and
                Guilds 2391 (Inspection and Testing) or equivalent, and a current BS 7671
                qualification (C&G 2382 18th Edition). For rural Devon properties, experience
                with TT earthing systems is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural property experience</strong> — landlords with rural Devon
                properties should specifically seek electricians experienced with TT earthing
                systems, agricultural supplies, and the older electrical installations common
                in Devon farmhouses and converted rural properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Book ahead of summer</strong> — Exeter student property demand peaks
                in May to July. Booking in March or April ensures availability and allows
                sufficient time for remedial work before September tenancy starts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Exeter and Devon (2026 Prices)',
    content: (
      <>
        <p>
          Exeter and Devon EICR costs are broadly in line with the South West of England
          — generally below the national average. Rural Devon properties may attract travel
          surcharges, and properties with complex or aged electrical installations cost more
          to inspect thoroughly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat (Exeter)</strong> — £100 to £180. Modern flats
                with straightforward installations are at the lower end of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two to three-bedroom house</strong> — £160 to £280. Victorian and
                Edwardian terraced properties in Exeter take longer to inspect than modern houses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO (four to six bedrooms)</strong> — £250 to £450.
                Fire alarm systems, emergency lighting, and multiple consumer units
                increase inspection scope and cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural Devon property</strong> — £150 to £350 plus potential travel
                surcharge. TT earthing systems require additional testing and earth electrode
                verification, which increases inspection time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted and charged
          separately. Exeter and Devon landlords with multiple properties may be able to negotiate
          portfolio pricing with a trusted local electrician to reduce the cost per inspection.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Exeter and Devon',
    content: (
      <>
        <p>
          Exeter's student market and Devon's mix of coastal, rural, and urban rental properties
          create varied and consistent demand for landlord EICRs across the county. Electricians
          who build relationships with Exeter letting agents or develop a rural Devon portfolio
          can generate reliable annual income from EICR contracts and the remedial work that
          follows Unsatisfactory reports.
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
                  to complete the full report on your phone while still on site in Exeter or
                  rural Devon. AI board scanning, voice test entry, and instant PDF export mean
                  the landlord has their report before you leave. Particularly valuable for
                  rural Devon jobs where you might be far from your office.
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
                  When C2 observations are found in an Exeter student house or a rural Devon
                  property with a TT earth, quote the consumer unit replacement or earthing
                  upgrade immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Devon landlords must act within 28 days — the electrician who quotes on
                  the day consistently wins the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Exeter and Devon landlord EICR business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more Devon EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyExeterPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Exeter | EICR Landlords Devon"
      description="Landlord electrical safety requirements in Exeter and Devon. 2020 Regulations, Exeter City Council enforcement, HMO licensing, rural Devon TT earthing, penalties up to £30,000, and 2026 EICR costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Exeter:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Exeter and Devon landlords need to know about electrical safety compliance — the 2020 Regulations, Exeter City Council enforcement, HMO licensing, student rental requirements, rural Devon TT earthing considerations, penalties of up to £30,000, and 2026 EICR costs."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Exeter and Devon"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
