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
  Building2,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared styles — cards go edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableCardCn =
  '-mx-4 my-5 overflow-hidden rounded-none border-y border-white/[0.14] ' +
  'bg-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'text-left font-semibold px-4 py-3 whitespace-nowrap';
const tdCn = 'px-4 py-3 align-top';
const noteCn = 'px-4 py-3 text-[13px] text-white border-t border-white/10';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'HMO Electrical Requirements', href: '/guides/hmo-electrical-requirements' },
];

const tocItems = [
  { id: 'at-a-glance', label: 'The Requirements at a Glance' },
  { id: 'what-is-hmo', label: 'What Counts as an HMO?' },
  { id: 'mandatory-licensing', label: 'Mandatory HMO Licensing' },
  { id: 'eicr-requirements', label: 'EICR Frequency & Scope' },
  { id: 'fire-detection', label: 'Fire Detection — BS 5839' },
  { id: 'emergency-lighting', label: 'Emergency Lighting — BS 5266-1' },
  { id: 'rcd-protection', label: 'RCD & AFDD Protection' },
  { id: 'smoke-heat-detectors', label: 'Smoke & Heat Detectors Per Room' },
  { id: 'landlord-responsibilities', label: 'Landlord Responsibilities' },
  { id: 'typical-costs', label: 'Typical Costs for HMO Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const answerBox = {
  question: 'What are the electrical requirements for an HMO in the UK?',
  answer:
    'An HMO needs a satisfactory EICR (at least every five years under the 2020 Regulations, often three under licence conditions), 30 mA RCD protection on socket-outlets up to 32 A (BS 7671 Reg 411.3.3) and on lighting circuits (Reg 411.3.4), AFDDs on single-phase socket-outlet circuits up to 32 A (Reg 421.1.7), interlinked fire detection to BS 5839-6, and emergency lighting to BS 5266-1 in escape routes.',
};

const keyTakeaways = [
  'Mandatory HMO licensing applies to properties with five or more occupants from two or more households. A valid EICR is a mandatory licence condition — without one the property cannot legally operate as an HMO.',
  'The EICR must be renewed at least every five years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. BS 7671 itself sets no fixed interval — Regulation 652.1 leaves the frequency to the type of installation, its use and its condition — and most local authorities specify a three-year cycle in HMO licence conditions.',
  'AFDDs are a requirement, not a recommendation, in HMOs. Regulation 421.1.7(b) of BS 7671:2018+A4:2026 states that AFDDs to BS EN 62606 shall be provided for single-phase AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in houses in multiple occupation. Everywhere else, the same regulation only recommends them.',
  '30 mA RCD protection is required on socket-outlets rated up to 32 A (Regulation 411.3.3) and on AC final circuits supplying luminaires in domestic premises (Regulation 411.3.4). Both apply to an HMO, and neither is new at A4:2026 — 411.3.4 has been in the standard since the 18th Edition was published in 2018.',
  'Fire detection in HMOs is designed to BS 5839-6. Most HMOs need at minimum interlinked mains-powered detection covering escape routes and high-risk rooms, with heat detectors in kitchens. Under BS 7671 Regulation 560.10, fire detection and fire alarm systems shall comply with the relevant parts of the BS 5839 series.',
  'Emergency lighting in communal areas and escape routes is a standard HMO licence condition. BS 7671 Regulation 560.9 requires emergency lighting systems to comply with BS 5266-1, BS EN 1838 and BS EN 50172.',
  'Full HMO electrical compliance — EICR, fire alarm system, and emergency lighting — typically costs £2,000 to £8,000 for a five-bedroom HMO depending on the condition of the existing installation.',
];

const faqs = [
  {
    question: 'Does my HMO legally require an EICR?',
    answer:
      'Yes. A valid EICR is a mandatory condition of both mandatory and additional HMO licences issued by local authorities in England. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 also independently require an EICR for all private rented properties, including HMOs, at least every five years. Many councils impose shorter intervals — typically three years — as a licence condition. Operating an HMO without a valid EICR exposes landlords to civil penalties of up to £30,000 per breach and potential prosecution for operating an unlicensed HMO.',
  },
  {
    question: 'How often must the EICR be renewed for an HMO?',
    answer:
      "The Electrical Safety Standards Regulations 2020 require an EICR at least every five years for all private rented properties. BS 7671 does not set a fixed interval of its own — Regulation 652.1 requires the frequency to be determined from the type of installation, its use and operation, the maintenance regime, the external influences it is subject to, and the findings of previous reports. In practice most HMO licence conditions specify a shorter interval of three years, and many require renewal on a change of the named licence holder or after significant electrical work. Always check your specific local authority's HMO licence conditions rather than relying on the statutory minimum five-year interval.",
  },
  {
    question: 'Are AFDDs compulsory in an HMO?',
    answer:
      'Yes. Regulation 421.1.7 of BS 7671:2018+A4:2026 states that arc fault detection devices conforming to BS EN 62606 shall be provided for single-phase AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in high rise residential buildings, houses in multiple occupation, purpose-built student accommodation and care homes. For all other premises the same regulation only recommends them. Where used, AFDDs shall be placed at the origin of the circuit to be protected. The requirement applies to new installations, additions and alterations; how a missing AFDD is treated on a condition report for an older installation is a matter of the inspector’s professional judgement, as BS 7671 does not itself assign observation codes to individual non-compliances.',
  },
  {
    question: 'What RCD protection is required in an HMO under BS 7671?',
    answer:
      'Regulation 411.3.3 of BS 7671:2018+A4:2026 requires 30 mA RCD protection for socket-outlets with a rated current not exceeding 32 A. The regulation permits an exception only for indent (b) — socket-outlets in other locations — and only where a documented risk assessment involving a skilled person determines RCD protection is unnecessary; that exception is not available for socket-outlets liable to be used by ordinary persons or children, which is the normal situation in an HMO. Regulation 411.3.4 separately requires 30 mA RCD protection for AC final circuits supplying luminaires within domestic (household) premises, and HMOs are domestic premises. Regulation 701.411.3.3 requires RCD protection for low voltage circuits serving a location containing a bath or shower and for circuits passing through zones 1 and 2. Best practice in an HMO is an RCBO per circuit so a fault in one room does not take out the whole house.',
  },
  {
    question: 'Do lighting circuits in an HMO need RCD protection?',
    answer:
      'Yes. Regulation 411.3.4 requires 30 mA RCD protection on AC final circuits supplying luminaires within domestic (household) premises, and HMOs are domestic premises. This is not a new A4:2026 requirement — 411.3.4 was introduced when BS 7671:2018 was published and has been carried forward unchanged since. An inspector working to BS 7671:2018+A4:2026 will check every lighting circuit for RCD protection and record any departure on the report.',
  },
  {
    question: 'What fire detection system does an HMO need under BS 5839-6?',
    answer:
      'BS 5839-6 is the relevant standard for fire detection in domestic premises, and BS 7671 Regulation 560.10 requires fire detection and fire alarm systems to comply with the relevant parts of the BS 5839 series. The common minimum for an HMO is a Grade D1, LD2 system: interlinked mains-powered smoke detectors with sealed back-up batteries in all escape routes — hallways, landings, and stairwells — and heat detectors in kitchens. Larger or higher-risk HMOs may need Grade D1 LD1 (detection in all rooms including bedrooms) or a Grade A system with a central panel. The correct grade and category for a specific property comes from its fire risk assessment; confirm it with your local housing authority or fire authority before installing.',
  },
  {
    question: 'Is emergency lighting compulsory in an HMO?',
    answer:
      'Emergency lighting is required in the communal areas and escape routes of most HMOs, and is a standard HMO licence condition for properties of three or more storeys or with long or complex escape routes. BS 7671 Regulation 560.9 requires emergency lighting systems to comply with BS 5266-1, BS EN 1838 and BS EN 50172. Regulation 560.8 additionally requires cables supplying safety circuits to have a resistance to fire rating matching the time set by building regulations or the relevant British Standard, or one hour where none applies. Small single or two-storey HMOs may not need a full system, but licence conditions commonly require self-contained luminaires at the stair foot and final exit regardless.',
  },
  {
    question: 'What are the penalties for running an HMO without a valid EICR?',
    answer:
      'Local authorities can impose civil penalties of up to £30,000 per breach under the Electrical Safety Standards Regulations 2020. Running an unlicensed HMO is also a criminal offence carrying an unlimited fine, and can result in a rent repayment order requiring the landlord to repay up to 12 months of rent received during the unlicensed period. These sanctions apply cumulatively — a landlord without a valid EICR while also operating an unlicensed HMO faces multiple simultaneous penalties.',
  },
  {
    question: 'Can the local authority inspect my HMO for electrical safety?',
    answer:
      'Yes. Local housing authorities have powers of entry to inspect HMOs under the Housing Act 2004 and can request a copy of the EICR, which must be supplied within seven days. If electrical hazards are identified they can serve a Hazard Awareness Notice, an Improvement Notice requiring remedial works, or a Prohibition Order preventing use of part or all of the property. Fire authorities also have independent inspection powers under the Regulatory Reform (Fire Safety) Order 2005 in relation to communal areas.',
  },
  {
    question: 'What is the minimum smoke detection requirement in each room of an HMO?',
    answer:
      'Under a Grade D1, LD2 system to BS 5839-6, optical smoke detectors are required in all escape routes — hallways, landings, and at the top of each stairwell. Heat detectors go in kitchens instead of smoke detectors to avoid false alarms from cooking. Bedrooms are not covered by LD2 but are covered by LD1. Many local authorities now specify LD1 for HMOs regardless of size, meaning a detector in every room including sleeping rooms. All detectors must be mains-powered and interlinked.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/afdd-hmo-care-home-a4-2026',
    title: 'AFDDs in HMOs & Care Homes',
    description: 'Where Regulation 421.1.7 makes AFDDs a requirement, and how to code them.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/student-house-electrical',
    title: 'Student House Electrical Safety',
    description:
      'EICR requirements, HMO considerations, and landlord obligations for student properties.',
    icon: Users,
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
    id: 'at-a-glance',
    heading: 'The Requirements at a Glance',
    content: (
      <>
        <p>
          Everything an HMO has to satisfy electrically, and the clause each requirement actually
          comes from. Regulation numbers are from BS 7671:2018+A4:2026, the edition current from 15
          April 2026.
        </p>
        <div className={tableCardCn}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className={thCn}>Requirement</th>
                  <th className={thCn}>What applies</th>
                  <th className={thCn}>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>EICR</td>
                  <td className={tdCn}>
                    Satisfactory report, renewed at least every 5 years — commonly 3 years under
                    licence conditions
                  </td>
                  <td className={tdCn}>
                    Electrical Safety Standards (England) Regulations 2020; BS 7671 Reg 652.1
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>RCD — socket-outlets</td>
                  <td className={tdCn}>
                    30 mA RCD for socket-outlets with a rated current not exceeding 32 A
                  </td>
                  <td className={tdCn}>Reg 411.3.3</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>RCD — lighting</td>
                  <td className={tdCn}>
                    30 mA RCD for AC final circuits supplying luminaires in domestic premises
                  </td>
                  <td className={tdCn}>Reg 411.3.4</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>RCD — bath or shower room</td>
                  <td className={tdCn}>
                    RCD for LV circuits serving the location, and circuits passing through zones 1
                    and 2
                  </td>
                  <td className={tdCn}>Reg 701.411.3.3</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold text-elec-yellow`}>AFDD</td>
                  <td className={tdCn}>
                    <span className="font-semibold">Shall</span> be provided on single-phase AC final
                    circuits supplying socket-outlets not exceeding 32 A — HMOs are named in the
                    regulation
                  </td>
                  <td className={tdCn}>Reg 421.1.7(b)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Fire detection</td>
                  <td className={tdCn}>
                    Interlinked detection to the grade and category set by the fire risk assessment
                  </td>
                  <td className={tdCn}>BS 5839-6, via BS 7671 Reg 560.10</td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Emergency lighting</td>
                  <td className={tdCn}>Communal areas and escape routes</td>
                  <td className={tdCn}>
                    BS 5266-1, BS EN 1838, BS EN 50172, via BS 7671 Reg 560.9
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            Licence conditions sit on top of all of this and vary by council. BS 7671 sets the
            technical requirements; the Housing Act 2004 licence sets the paperwork and the
            deadlines.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-hmo',
    heading: 'What Counts as a House in Multiple Occupation?',
    content: (
      <>
        <p>
          A House in Multiple Occupation (HMO) is a property occupied by three or more people who
          form more than one household and share facilities such as a kitchen or bathroom. The
          definition is set out in the Housing Act 2004 and has consequences for both licensing
          obligations and electrical safety requirements.
        </p>
        <div className={cardCn}>
          <dl className="space-y-5 text-white">
            <div>
              <dt className="font-semibold">Small HMO — 3 to 4 occupants</dt>
              <dd className="mt-1">
                Three or more people from two or more households sharing facilities. Not subject to
                mandatory licensing, but subject to additional licensing where the local authority
                operates a scheme. Still requires an EICR under the 2020 Regulations, and fire
                detection designed to BS 5839-6.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Mandatory licensing HMO — 5 or more occupants</dt>
              <dd className="mt-1">
                Five or more people from two or more households. Subject to mandatory HMO licensing
                under the Housing Act 2004. A valid EICR is a mandatory licence condition without
                exception.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Section 257 HMO — converted blocks</dt>
              <dd className="mt-1">
                Converted blocks of flats where not all flats comply with the Building Regulations
                1991 may be classed as HMOs even where the flats are individually self-contained.
                The s257 definition catches many converted Victorian and Edwardian properties in
                England.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          If you are unsure whether your property qualifies, contact your local housing authority
          before letting. Operating an unlicensed HMO carries criminal liability regardless of
          whether the landlord was aware of the licensing requirement.
        </p>
      </>
    ),
  },
  {
    id: 'mandatory-licensing',
    heading: 'Mandatory HMO Licensing — Key Electrical Conditions',
    content: (
      <>
        <p>
          Mandatory HMO licensing applies to properties with five or more occupants forming two or
          more households. The licence is issued by the local housing authority and sets out
          conditions the landlord must satisfy throughout the licence period, typically five years.
        </p>
        <div className={cardCn}>
          <dl className="space-y-5 text-white">
            <div>
              <dt className="font-semibold">A valid EICR is mandatory</dt>
              <dd className="mt-1">
                A current EICR — renewed every three to five years depending on the licence
                condition — must be held for the entire fixed electrical installation, covering all
                circuits including communal areas, fire alarm wiring, emergency lighting, and any
                outbuilding circuits.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Copy to the council within seven days</dt>
              <dd className="mt-1">
                The licence holder must produce the EICR to the local authority within seven days of
                a written request. Failure to produce a valid report is a breach of licence
                conditions and can trigger a licence review.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Remedial works within 28 days</dt>
              <dd className="mt-1">
                Where the EICR records C1 or C2 observations, remedial works must be completed
                within 28 days, or sooner where the inspector specifies. Written confirmation of
                completion must go to the tenants and to the council.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Additional licensing schemes</dt>
              <dd className="mt-1">
                Many local authorities operate additional licensing covering smaller HMOs with three
                or four occupants, typically imposing identical EICR and fire safety conditions.
                Check whether additional licensing applies in your area.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          operate in parallel with HMO licensing. Both regimes independently require a valid EICR,
          and non-compliance with either can result in separate civil penalties of up to £30,000.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-requirements',
    heading: 'EICR Frequency and Scope for HMOs',
    content: (
      <>
        <p>
          <strong>At least every five years</strong> under the 2020 Regulations, and{' '}
          <strong>typically every three</strong> under HMO licence conditions. BS 7671 sets no fixed
          number of its own: Regulation 652.1 requires the frequency to be determined from the type
          of installation and equipment, its use and operation, the frequency and quality of
          maintenance, the external influences it is subject to, and the results of previous
          reports.
        </p>
        <p>
          An HMO EICR is a bigger job than a standard residential inspection. Multiple consumer
          units, fire alarm wiring, emergency lighting circuits and a larger number of final
          circuits all widen the scope, the duration, and the cost.
        </p>
        <div className={cardCn}>
          <dl className="space-y-5 text-white">
            <div>
              <dt className="font-semibold">The whole fixed installation is in scope</dt>
              <dd className="mt-1">
                Main consumer unit(s), every final circuit in every room and communal area, fire
                alarm system wiring, emergency lighting circuits, outdoor lighting, and any
                ancillary buildings connected to the supply.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">A satisfactory outcome is required</dt>
              <dd className="mt-1">
                The report must record an overall satisfactory assessment before submission to the
                local authority. Per the model report in BS 7671 Appendix 6, an unsatisfactory
                assessment is one where C1 (danger present) or C2 (potentially dangerous)
                observations have been identified; C3 and FI observations are advisory and do not
                affect the overall assessment.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Carried out by a competent inspector</dt>
              <dd className="mt-1">
                Regulation 651.5 requires periodic inspection and testing to be carried out by one
                or more skilled persons competent in such work. In practice landlords should engage
                an inspector registered with a recognised competent person scheme, holding an
                inspection and testing qualification such as City &amp; Guilds 2391 or equivalent,
                plus a current BS 7671 qualification. Experience of HMO installations and fire alarm
                systems matters.
              </dd>
            </div>
          </dl>
        </div>
      </>
    ),
  },
  {
    id: 'fire-detection',
    heading: 'Fire Detection in HMOs — BS 5839-6',
    content: (
      <>
        <p>
          BS 5839-6 is the British Standard for fire detection and fire alarm systems in domestic
          premises including HMOs. BS 7671 Regulation 560.10 requires fire detection and fire alarm
          systems to comply with the relevant parts of the BS 5839 series. The standard uses a
          two-part classification: Grade (equipment and power supply) and Category (extent of
          coverage).
        </p>
        <div className={tableCardCn}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className={thCn}>Grade &amp; category</th>
                  <th className={thCn}>Equipment</th>
                  <th className={thCn}>Coverage</th>
                  <th className={thCn}>Typical HMO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold text-elec-yellow`}>Grade D1, LD2</td>
                  <td className={tdCn}>
                    Mains detectors, interlinked, with sealed (non-replaceable) back-up battery
                  </td>
                  <td className={tdCn}>Escape routes plus high-risk rooms such as kitchens</td>
                  <td className={tdCn}>Common minimum for many HMOs</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Grade D1, LD1</td>
                  <td className={tdCn}>
                    Mains detectors, interlinked, with sealed back-up battery
                  </td>
                  <td className={tdCn}>All rooms including every bedroom</td>
                  <td className={tdCn}>Higher-risk or larger HMOs</td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Grade A, LD1 or LD2</td>
                  <td className={tdCn}>Central panel, addressable detectors, sounders</td>
                  <td className={tdCn}>Per fire risk assessment</td>
                  <td className={tdCn}>Large or multi-storey HMOs and blocks</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            The correct grade and category for a specific property is set by its fire risk
            assessment and the local housing authority. Confirm before installing.
          </p>
        </div>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">Design points that recur</h3>
        <dl className="space-y-5 text-white">
          <div>
            <dt className="font-semibold">Heat detectors in kitchens, not smoke</dt>
            <dd className="mt-1">
              Smoke detectors are not used in kitchens because of the false alarm rate from cooking.
              A heat detector — fixed temperature or combined fixed-temperature and rate-of-rise —
              is interlinked with the rest of the detector network instead.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Escape routes drive the LD category</dt>
            <dd className="mt-1">
              LD2 covers escape routes plus high-risk rooms. LD1 extends detection to all rooms
              including sleeping rooms, and many councils now apply LD1 to HMOs regardless of size.
              Where a Grade A central-panel system is specified, BS 5839-1 applies to its design,
              installation, commissioning and maintenance.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">The wiring is part of the EICR</dt>
            <dd className="mt-1">
              Fire alarm systems in an HMO are part of the fixed electrical installation and fall
              within the scope of the{' '}
              <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>. The inspector
              checks the wiring, the interlink operation, and the functionality of all detectors and
              sounders.
            </dd>
          </div>
        </dl>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in HMOs — BS 5266-1',
    content: (
      <>
        <p>
          BS 7671 Regulation 560.9 requires emergency lighting systems to comply with BS 5266-1, BS
          EN 1838 and BS EN 50172. In HMOs, emergency lighting is provided in communal areas and
          escape routes so occupants can evacuate safely if the mains supply fails during a fire or
          other emergency.
        </p>
        <div className={cardCn}>
          <dl className="space-y-5 text-white">
            <div>
              <dt className="font-semibold">Where it goes</dt>
              <dd className="mt-1">
                Communal hallways, landings, stairwells and final exits. In HMOs of three or more
                storeys, or with long or complex escape routes, emergency lighting is a standard
                licence condition. Smaller two-storey HMOs may need only self-contained luminaires
                at the stair foot and the final exit door.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Non-maintained luminaires</dt>
              <dd className="mt-1">
                The most common type in HMOs. They charge continuously from the mains and only
                illuminate when the mains supply fails. The rated duration — commonly one or three
                hours — and the illuminance on the escape route come from BS 5266-1 and BS EN 1838
                applied to the property; premises with sleeping accommodation are usually specified
                at the longer duration, so confirm before ordering.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Cable fire performance</dt>
              <dd className="mt-1">
                Under BS 7671 Regulation 560.8, cables supplying safety circuits must have a
                resistance to fire rating corresponding to the time set by the applicable building
                regulations or British Standard, or one hour where no such requirement exists.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Routine testing and records</dt>
              <dd className="mt-1">
                Short monthly function tests plus an annual test at the full rated duration, with
                the results recorded in a logbook. The EICR inspector will expect the records to be
                current and the luminaires to operate on test.
              </dd>
            </div>
          </dl>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD and AFDD Protection in HMOs',
    content: (
      <>
        <p>
          RCD protection is the most frequently deficient safety measure found in HMOs, and AFDDs
          are the requirement most often missed. Three regulations do the work: 411.3.3 for
          socket-outlets, 411.3.4 for lighting, and 421.1.7 for arc fault detection.
        </p>
        <div className={cardCn}>
          <dl className="space-y-5 text-white">
            <div>
              <dt className="font-semibold">
                Reg 411.3.3 — 30 mA RCD on socket-outlets up to 32 A
              </dt>
              <dd className="mt-1">
                Additional protection by a 30 mA RCD is required for socket-outlets with a rated
                current not exceeding 32 A, and for mobile equipment up to 32 A used outdoors. The
                documented risk assessment exception applies only to indent (b) — it cannot be used
                for socket-outlets liable to be used by ordinary persons or children, which is the
                normal case throughout an HMO. Age of the property is not a defence.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Reg 411.3.4 — 30 mA RCD on lighting circuits</dt>
              <dd className="mt-1">
                Within domestic (household) premises, AC final circuits supplying luminaires require
                additional protection by a 30 mA RCD. HMOs are domestic premises, so every lighting
                circuit is caught. This regulation was introduced with BS 7671:2018 and is not new
                at A4:2026 — installations designed since 2019 should already comply.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Reg 701.411.3.3 — bath and shower rooms</dt>
              <dd className="mt-1">
                RCD protection is required for low voltage circuits serving a location containing a
                bath or shower, and for circuits passing through zones 1 and 2 that do not serve the
                location.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">An RCBO per circuit, not a split-load board</dt>
              <dd className="mt-1">
                An RCBO on each circuit gives per-circuit discrimination, so a fault in one bedroom
                does not put the whole house in darkness. In a shared property that difference
                matters more than it does in a single-family home.
              </dd>
            </div>
          </dl>
        </div>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          AFDDs are required in HMOs, not recommended
        </h3>
        <p>
          Regulation 421.1.7 of BS 7671:2018+A4:2026 states that arc fault detection devices
          conforming to BS EN 62606 <strong>shall</strong> be provided for single-phase AC final
          circuits supplying socket-outlets with a rated current not exceeding 32 A in four named
          premises types: high rise residential buildings, houses in multiple occupation,
          purpose-built student accommodation, and care homes. For every other type of premises the
          same regulation only <em>recommends</em> them. Where AFDDs are used, they shall be placed
          at the origin of the circuit to be protected.
        </p>
        <p>
          BS 7671 does not assign EICR observation codes to individual non-compliances, so how a
          missing AFDD in an existing HMO is coded is a matter of the inspector&rsquo;s judgement
          against the installation in front of them. Our{' '}
          <SEOInternalLink href="/guides/afdd-hmo-care-home-a4-2026">
            AFDD guide for HMOs and care homes
          </SEOInternalLink>{' '}
          works through the coding decision in detail.
        </p>
      </>
    ),
  },
  {
    id: 'smoke-heat-detectors',
    heading: 'Smoke and Heat Detectors — Room by Room',
    content: (
      <>
        <p>
          Detector placement follows the BS 5839-6 category required by the fire risk assessment and
          the licence conditions. The table below covers a typical Grade D1 system in a five-bedroom
          three-storey HMO.
        </p>
        <div className={tableCardCn}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className={thCn}>Location</th>
                  <th className={thCn}>Detector type</th>
                  <th className={thCn}>LD2</th>
                  <th className={thCn}>LD1</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Hallways &amp; landings</td>
                  <td className={tdCn}>Optical smoke</td>
                  <td className={tdCn}>Required</td>
                  <td className={tdCn}>Required</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Top of each stairwell</td>
                  <td className={tdCn}>Optical smoke</td>
                  <td className={tdCn}>Required</td>
                  <td className={tdCn}>Required</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold text-elec-yellow`}>Kitchens</td>
                  <td className={tdCn}>Heat detector — never smoke</td>
                  <td className={tdCn}>Required</td>
                  <td className={tdCn}>Required</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Communal lounges</td>
                  <td className={tdCn}>Optical smoke</td>
                  <td className={tdCn}>Per risk assessment</td>
                  <td className={tdCn}>Required</td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Individual bedrooms</td>
                  <td className={tdCn}>Optical smoke</td>
                  <td className={tdCn}>Not required</td>
                  <td className={tdCn}>Required</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            Kitchen heat detectors are typically a fixed-temperature type, or a combined
            fixed-temperature and rate-of-rise type, interlinked with the smoke detector network.
            Many councils now apply LD1 to all HMOs regardless of size — confirm the category
            required by your licence conditions.
          </p>
        </div>
        <p>
          All detectors must be mains-powered with back-up batteries; battery-only detectors are not
          a Grade D system. Interconnection should be hard-wired where practicable, with RF wireless
          interlink used where wiring is not feasible.
        </p>
      </>
    ),
  },
  {
    id: 'landlord-responsibilities',
    heading: 'Landlord Responsibilities — Ongoing Obligations',
    content: (
      <>
        <p>
          These are not one-off tasks at the point of licensing. They run continuously through the
          licence period and between renewals.
        </p>
        <div className={cardCn}>
          <dl className="space-y-5 text-white">
            <div>
              <dt className="font-semibold">Commission and renew the EICR on schedule</dt>
              <dd className="mt-1">
                Engage a registered inspector at the frequency set by your licence conditions,
                typically three years, and renew immediately after any significant electrical work.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Give copies to tenants and the council</dt>
              <dd className="mt-1">
                Existing tenants must receive a copy within 28 days of the inspection. New tenants
                must receive a copy before moving in. The local authority must receive a copy within
                seven days of a request.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Complete C1 and C2 remedial works within 28 days</dt>
              <dd className="mt-1">
                A C1 (danger present) observation calls for immediate action, which may include
                disconnecting the affected circuit before remedial work can be arranged — do not
                wait out the 28 days on a C1. Our guide to{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  EICR observation codes
                </SEOInternalLink>{' '}
                sets out what each code means.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Keep the fire and emergency lighting logbook</dt>
              <dd className="mt-1">
                Record the routine function tests of detectors and emergency luminaires, and the
                annual full-duration emergency lighting test. Keep the logbook available for
                inspection.
              </dd>
            </div>
            <div className="border-t border-white/10 pt-5">
              <dt className="font-semibold">Replace detector heads and batteries on schedule</dt>
              <dd className="mt-1">
                Follow the manufacturer&rsquo;s replacement intervals for detector heads and
                emergency lighting battery packs, and record every replacement in the logbook.
              </dd>
            </div>
          </dl>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for Full HMO Electrical Compliance',
    content: (
      <>
        <p>
          Total cost depends almost entirely on the condition of the existing installation. A
          property with a modern RCBO board and existing interlinked detection costs a fraction of
          one needing a rewire and a full fire alarm installation.
        </p>
        <div className={tableCardCn}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className={thCn}>Work item</th>
                  <th className={thCn}>Indicative cost</th>
                  <th className={thCn}>What it covers</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>EICR — 5-bedroom HMO</td>
                  <td className={`${tdCn} whitespace-nowrap text-elec-yellow`}>£400 – £800</td>
                  <td className={tdCn}>
                    Multiple consumer units, fire alarm and emergency lighting circuits widen the
                    inspection scope versus a standard rental.
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Consumer unit with RCBOs</td>
                  <td className={`${tdCn} whitespace-nowrap text-elec-yellow`}>
                    £800 – £1,500 each
                  </td>
                  <td className={tdCn}>
                    Per board. A five-bedroom HMO may need two or three. RCBO boards give
                    per-circuit discrimination.
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Grade D1, LD2 fire alarm</td>
                  <td className={`${tdCn} whitespace-nowrap text-elec-yellow`}>£500 – £1,500</td>
                  <td className={tdCn}>
                    All detectors, sounders, wiring and commissioning. A Grade A central-panel
                    system runs £2,000 – £6,000+.
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className={`${tdCn} font-semibold`}>Emergency lighting</td>
                  <td className={`${tdCn} whitespace-nowrap text-elec-yellow`}>£600 – £2,000</td>
                  <td className={tdCn}>
                    Hallways, landings, stairwell and final exit — supply, fixing and commissioning
                    of non-maintained luminaires.
                  </td>
                </tr>
                <tr>
                  <td className={`${tdCn} font-semibold`}>Full rewire — worst case</td>
                  <td className={`${tdCn} whitespace-nowrap text-elec-yellow`}>£8,000 – £20,000</td>
                  <td className={tdCn}>
                    Properties on rubber, cloth-covered or aluminium wiring with fundamental
                    installation deficiencies.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteCn}>
            Indicative UK market guidance, not a quote. Actual prices vary by region, property
            condition and contractor.
          </p>
        </div>
        <p>
          Landlords acquiring an HMO should commission a full electrical survey before exchange and
          build the compliance cost into the acquisition model. Deferring the work does not reduce
          the cost — penalties, licensing delays and more extensive remedial work increase it.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: HMO Inspection and Compliance Work',
    content: (
      <>
        <p>
          HMO EICRs are among the better-paid inspection jobs available. An inspector who
          understands HMO licensing, BS 5839-6 grades and categories, and the AFDD requirement in
          Regulation 421.1.7 commands premium rates and builds long-term landlord relationships.
        </p>
        <div className={cardCn}>
          <h3 className="text-base font-semibold text-white">Complete HMO EICRs on site</h3>
          <p className="mt-1 text-white">
            Use the{' '}
            <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate EICR app</SEOInternalLink> to
            document large HMO installations circuit by circuit on your phone. AI board scanning
            speeds up consumer unit inspection, and the full schedule of test results can be
            completed on site — send the PDF to the landlord before you leave the property.
          </p>
          <div className="mt-5 border-t border-white/10 pt-5">
            <h3 className="text-base font-semibold text-white">Quote the remedials the same day</h3>
            <p className="mt-1 text-white">
              Consumer unit upgrades, AFDD retrofits, fire alarm installations and emergency
              lighting are high-value jobs. Quote on site with the{' '}
              <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> —
              landlords working to a 28-day remedial deadline instruct whoever quotes first.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Run the HMO EICR from your phone"
          description="The five-year interval comes from the Electrical Safety Standards Regulations 2020, not from BS 7671 — Regulation 652.1 leaves the frequency to the installation. Record the inspection, the schedule of test results and the observations in one place."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HMOElectricalRequirementsPage() {
  return (
    <GuideTemplate
      title="HMO Electrical Requirements 2026: EICR Rules"
      description="HMO electrical rules: 5-year EICR, AFDDs under Reg 421.1.7, 30 mA RCD on sockets and lighting, BS 5839-6 fire detection and licensing thresholds."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="HMO Landlord Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          HMO Electrical Requirements UK:{' '}
          <span className="text-elec-yellow">Complete Compliance Guide 2026</span>
        </>
      }
      heroSubtitle="What an HMO has to satisfy electrically, and the clause each requirement comes from — EICR frequency, 30 mA RCD protection under Regulations 411.3.3 and 411.3.4, AFDDs required under Regulation 421.1.7, fire detection to BS 5839-6, emergency lighting to BS 5266-1, room-by-room detector placement, and typical compliance costs."
      readingTime={14}
      answerBox={answerBox}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About HMO Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Complete HMO EICRs on Your Phone"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
