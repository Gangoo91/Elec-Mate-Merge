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
    label: 'Landlord Electrical Safety Nottingham',
    href: '/guides/landlord-electrical-safety-nottingham',
  },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'nottingham-enforcement', label: 'Nottingham Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Nottingham' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Nottingham' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Nottingham to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  "Nottingham City Council is one of the most proactive local authorities in England for private rented sector enforcement. The council operates the UK's first city-wide selective licensing scheme and has imposed significant civil penalties on non-compliant landlords.",
  'HMOs in Nottingham face additional requirements — a valid EICR is a mandatory condition of both mandatory and additional HMO licensing schemes operated by Nottingham City Council.',
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete remedial work within 28 days or sooner if specified by the inspector.',
  'Nottingham has a very large student rental sector and high concentration of HMOs near the University of Nottingham and Nottingham Trent University. Many properties in areas such as Lenton and Dunkirk have ageing electrical installations.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Nottingham?',
    answer:
      "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Nottingham. Landlords must obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days and to Nottingham City Council within seven days if requested. The council — one of England's most active enforcement authorities — can impose civil penalties of up to £30,000 per breach.",
  },
  {
    question: 'Does Nottingham City Council operate selective licensing?',
    answer:
      'Yes. Nottingham City Council operates a city-wide selective licensing scheme — one of the largest and most comprehensive in England. Under selective licensing, all private rented properties in Nottingham must be licensed, and EICR compliance is a standard condition of the licence. Landlords without a valid licence or who fail to meet EICR requirements are subject to enforcement action including civil penalties and licence revocation. Selective licensing applies on top of the mandatory requirements under the 2020 Regulations.',
  },
  {
    question: 'What happens if my Nottingham rental property fails the EICR?',
    answer:
      "An EICR is Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must complete all remedial work within 28 days or sooner if the inspector specifies. A qualified electrician must confirm the work in writing. Failure to complete remedial work is a separate breach attracting its own penalty of up to £30,000. Under Nottingham's selective licensing scheme, failure to comply with EICR requirements can also result in licence revocation.",
  },
  {
    question: 'Do I need an EICR for my Nottingham HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Nottingham. Mandatory licensing applies to properties with five or more occupants in two or more households. Nottingham City Council also operates additional HMO licensing. Given the large student population near the University of Nottingham (Lenton, Dunkirk, Beeston) and Nottingham Trent University (Forest Fields, Sherwood), HMO compliance is heavily scrutinised. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting.',
  },
  {
    question: 'How active is Nottingham City Council in enforcing electrical safety?',
    answer:
      'Nottingham City Council is one of the most proactive councils in England for private rented sector enforcement. The council operates a city-wide selective licensing scheme, an active HMO licensing programme, and has used its civil penalty powers under the 2020 Regulations. Landlords in Nottingham who fail to comply with EICR requirements face a significantly higher enforcement risk than in many other cities.',
  },
  {
    question: 'How much does a landlord EICR cost in Nottingham?',
    answer:
      'Nottingham EICR costs are competitive compared to London and the South East. A one-bedroom flat typically costs £110 to £190. A two-bedroom flat costs £155 to £280. A three-bedroom house runs from £220 to £380. HMOs cost £320 to £620 or more depending on circuits and systems. These prices cover inspection and report only — remedial work is quoted separately.',
  },
  {
    question: 'Can a Nottingham tenant request an electrical safety check?',
    answer:
      "Yes. Tenants have the right to request a copy of the current EICR. If the landlord cannot provide one, the tenant can report to Nottingham City Council's environmental health or private rented sector team. Under the selective licensing scheme, the council actively monitors compliance and can investigate complaints, require inspections, and arrange remedial work if the landlord fails to comply with a notice, recovering costs from the landlord.",
  },
  {
    question: 'What qualifications must an EICR inspector have in Nottingham?',
    answer:
      'The inspector must be qualified and competent — in practice, registered with NICEIC, NAPIT, or ELECSA, and holding City and Guilds 2391 (Inspection and Testing) and a current BS 7671 qualification (C&G 2382 18th Edition). Professional indemnity insurance is required.',
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
          are the primary legislation governing landlord electrical safety in Nottingham. These
          regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for all
          existing tenancies. Every private landlord in Nottingham must comply — and in Nottingham,
          the risk of non-compliance being detected is higher than in most English cities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must obtain an Electrical Installation
                Condition Report before a new tenancy begins and at least every five years. The EICR
                is documented in accordance with{' '}
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
                before they move in. Prospective tenants can request a copy within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to Nottingham City Council within seven days if requested. Under the selective
                licensing scheme, the council may actively request this as part of licence
                compliance monitoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a qualified and
                competent person, in practice meaning registration with NICEIC, NAPIT, ELECSA, or
                equivalent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nottingham-enforcement',
    heading: 'Nottingham City Council Enforcement',
    content: (
      <>
        <p>
          Nottingham City Council is widely regarded as one of the most active local authorities in
          England for private rented sector enforcement. The city operates the UK's first city-wide
          selective licensing scheme and has invested significantly in enforcement capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City-wide selective licensing</strong> — Nottingham's selective licensing
                scheme applies to private rented properties across the entire city. All landlords
                must hold a property licence, and EICR compliance is a standard licence condition.
                The council actively monitors compliance as part of the licensing programme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalty enforcement</strong> — Nottingham City Council has been among
                the more active councils in England in using civil penalty powers under the 2020
                Regulations. Penalties of up to £30,000 per breach have been issued to non-compliant
                landlords.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proactive monitoring</strong> — unlike councils that rely primarily on
                tenant complaints, Nottingham City Council proactively monitors compliance through
                its licensing programme. Landlords should not assume that non-compliance will go
                undetected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice without providing the tenant with a copy of the current
                EICR. In Nottingham's competitive student rental market, this is a significant
                practical consequence for landlords seeking possession.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Nottingham',
    content: (
      <>
        <p>
          Nottingham has one of the highest concentrations of HMOs per capita in England, driven by
          the large student populations at the University of Nottingham and Nottingham Trent
          University. Nottingham City Council operates both mandatory and additional HMO licensing
          and is well-known for active enforcement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR is a mandatory licence
                condition. The EICR must cover all fixed electrical installations including communal
                areas, fire alarm systems, and emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — Nottingham City Council operates additional
                HMO licensing covering smaller HMOs, particularly in the student areas around
                Lenton, Dunkirk, Forest Fields, and Radford. Check the council's website for the
                current licensing area. EICR compliance is equally required under additional
                licensing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — Nottingham HMO licence conditions typically
                require EICRs at intervals specified in the licence. Check your specific licence
                conditions rather than assuming the standard five-year interval applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement</strong> — operating an unlicensed HMO in Nottingham is a
                criminal offence. Nottingham City Council has prosecuted unlicensed HMO landlords
                and imposed substantial fines. The council's active enforcement reputation means
                that non-compliance is significantly more likely to be detected in Nottingham than
                in many other cities.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance in Nottingham',
    content: (
      <>
        <p>
          Nottingham City Council can impose civil penalties of up to £30,000 per breach under the
          2020 Regulations. In Nottingham, the risk of non-compliance being detected is higher than
          in most English cities due to the selective licensing scheme.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to the council, and failing to
                complete remedial work are each separate breaches. Multiple penalties can be imposed
                on the same landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licence revocation</strong> — persistent non-compliance with EICR
                requirements can result in licence revocation under the selective licensing scheme.
                Without a licence, it is unlawful to rent the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                notice without providing the EICR. In Nottingham's active student market, this is a
                meaningful restriction on landlords' ability to manage tenancies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — where a landlord commits certain housing
                offences (such as operating an unlicensed HMO), tenants can apply to the First-tier
                Tribunal (Property Chamber) for a rent repayment order of up to 12 months' rent.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of compliance — an EICR every five years, typically £180 to £380 in Nottingham —
          is negligible compared to the financial and reputational consequences of enforcement.
          Nottingham landlords should treat EICR compliance as an absolute priority.
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
          Nottingham tenants have specific rights under the 2020 Regulations and benefit from one of
          the UK's most active local enforcement regimes.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a copy
                within 28 days. New tenants must receive a copy before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — tenants can report to Nottingham
                City Council's private rented sector team. The council's proactive enforcement
                approach means that tenant complaints are taken seriously and acted upon.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies C1 or C2
                observations, the landlord must arrange remedial work within 28 days. The council
                can arrange the work and recover costs from the landlord if the landlord fails.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without providing the EICR. The Deregulation Act 2015 also
                protects tenants who raise legitimate complaints about property conditions.
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
          Nottingham landlords must complete remedial work within the timescales set by the 2020
          Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR, unless the inspector specifies a shorter timescale. The clock
                starts from the date of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action</strong> — C1 (danger present)
                observations require immediate action. Do not wait the full 28 days. The inspector
                may recommend immediate disconnection of the affected circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete, a
                qualified person must confirm the work in writing. This must be provided to the
                tenant and to Nottingham City Council within 28 days of the work being completed.
                Under the selective licensing scheme, this evidence may also be required to
                demonstrate licence compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Nottingham remedial work</strong> — fitting RCD protection
                (Regulation 411.3.3 of BS 7671), replacing plastic consumer units with metal
                enclosures (Regulation 421.1.201), upgrading earthing and bonding, and replacing
                deteriorated cables in Victorian and Edwardian terraced properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Nottingham',
    content: (
      <>
        <p>
          Nottingham has a good supply of qualified electricians experienced in landlord EICR work.
          Given the city's active enforcement environment, it is important to choose a fully
          qualified and registered inspector.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC, NAPIT, or ELECSA registration</strong> — search the scheme's online
                register for Nottingham-based inspectors. Scheme membership provides assurance of
                qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing), a current BS 7671 qualification (C&G 2382 18th Edition), and experience
                with Nottingham's housing stock including Victorian terraces and HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — verify that the inspector
                carries appropriate professional indemnity insurance. Essential given the active
                enforcement environment in Nottingham.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thorough testing</strong> — a thorough EICR for a Nottingham two-bedroom
                property requires 2 to 4 hours and calibrated test equipment. A report produced in
                under an hour is unlikely to meet the required standard and could expose a landlord
                to enforcement risk if challenged by the council.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Nottingham (2026 Prices)',
    content: (
      <>
        <p>
          Nottingham EICR costs are competitive, reflecting East Midlands labour rates that are
          generally lower than London and the South East.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £110 to £190. Typically 3 to 5 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat or terraced house</strong> — £155 to £280. Usually 5 to 8
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £220 to £380. Victorian terraces in Lenton
                and Dunkirk may take longer due to aged wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £320 to £620+. Multiple consumer units, fire alarm systems,
                and emergency lighting increase the inspection scope significantly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover inspection and report only. Given Nottingham's enforcement environment,
          landlords should factor in the potential cost of remedial work identified during the EICR
          when budgeting. Some Nottingham electricians offer combined EICR and remedial packages for
          landlords managing multiple properties.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Nottingham',
    content: (
      <>
        <p>
          Nottingham's city-wide selective licensing scheme, large HMO sector, and active
          enforcement regime create some of the strongest demand for landlord EICRs of any city in
          England. Electricians who position themselves as the go-to inspection resource for
          Nottingham landlords and letting agents can build a very strong pipeline of recurring
          work.
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
                  test entry, and instant PDF export mean no evening paperwork. In Nottingham,
                  landlords are highly motivated to have reports quickly due to licensing deadlines.
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
                  . Nottingham landlords must act within 28 days — the electrician who quotes on the
                  day of the EICR wins the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business in Nottingham with Elec-Mate"
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

export default function LandlordElectricalSafetyNottinghamPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Nottingham | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Nottingham. 2020 Regulations explained, Nottingham City Council selective licensing and enforcement, HMO requirements, penalties up to £30,000, tenant rights, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Nottingham:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Nottingham City Council operates one of England's most proactive landlord enforcement regimes, including a city-wide selective licensing scheme. This guide covers the 2020 Regulations, enforcement, HMO requirements, penalties of up to £30,000, tenant rights, and EICR costs in Nottingham."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Nottingham"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
