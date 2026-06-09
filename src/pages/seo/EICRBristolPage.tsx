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
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Bristol', href: '/guides/eicr-bristol' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'bristol-costs', label: 'EICR Cost in Bristol' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'bristol-enforcement', label: 'Bristol Council Enforcement' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'georgian-wiring', label: 'Georgian Properties in Clifton' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, carried out under BS 7671:2018+A4:2026 Chapter 65 (periodic inspection and testing) on the model form in Appendix 6. It records the condition of wiring, consumer units, protective devices, earthing, and bonding with classified observation codes.",
  'Bristol EICR costs typically range from £120 to £450 depending on property size. A two-bedroom flat costs £150 to £250, while a three-bedroom house costs £200 to £350. Prices are lower than London but slightly above the national average due to strong demand in the private rented sector.',
  'Since 1 April 2021, landlords in England must obtain an EICR before a new tenancy begins and at least every five years. Failure to comply can result in fines of up to £30,000 per breach, enforced by Bristol City Council.',
  'Bristol has a large stock of Georgian and Victorian properties, particularly in Clifton, Redland, and Cotham. These properties frequently present aged wiring, inadequate earthing, and lead-sheathed cables that return C2 observations requiring remedial work.',
  'NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the Distribution Network Operator for Bristol. Supply-side issues such as deteriorated cut-outs and absent earthing provision are common findings in older Bristol properties.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Bristol?',
    answer:
      'EICR costs in Bristol vary by property size. A one-bedroom flat typically costs £120 to £200. A two-bedroom flat costs £150 to £250. A three-bedroom house costs £200 to £350. Larger properties with multiple consumer units cost more. HMOs in areas such as Stokes Croft and Easton can cost £350 to £700 depending on the number of consumer units and circuits. Bristol prices are slightly above the national average but significantly lower than London.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Bristol?',
    answer:
      'Yes. Since 1 April 2021, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to obtain an EICR before the start of a new tenancy and at least every five years thereafter. The EICR must be carried out by a qualified person registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A copy must be provided to tenants within 28 days and to Bristol City Council within seven days if requested. Failure to comply can result in a civil penalty of up to £30,000 per breach.',
  },
  {
    question: 'What happens if my Bristol property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord must arrange for remedial work within 28 days (or sooner if the inspector recommends it). The remedial work must be carried out by a qualified electrician, and the original inspector (or another qualified person) must confirm the work has been completed and update the EICR accordingly.',
  },
  {
    question: 'How long does an EICR take in Bristol?',
    answer:
      'The duration depends on property size and the number of circuits. A one-bedroom flat with a single consumer unit typically takes 2 to 3 hours. A three-bedroom house takes 3 to 4 hours. Georgian properties in Clifton and Redland often take longer due to concealed wiring, multiple floors, and cellar installations. HMOs with multiple consumer units can take a full day.',
  },
  {
    question: 'Does Bristol have HMO licensing requirements for EICRs?',
    answer:
      'Yes. Bristol City Council operates mandatory HMO licensing for properties with five or more occupants forming two or more households. Bristol also operates an additional licensing scheme covering smaller HMOs in certain wards. A valid EICR is a condition of all HMO licences. Bristol has a large student population (University of Bristol and UWE) which means many properties in Redland, Cotham, Stokes Croft, and Fishponds are licensed HMOs requiring current EICRs.',
  },
  {
    question: 'Who is the DNO for Bristol?',
    answer:
      'The Distribution Network Operator for Bristol is NGED (National Grid Electricity Distribution), formerly known as Western Power Distribution (WPD). If an EICR identifies supply-side issues such as a deteriorated cut-out, absent earth terminal, or problems with the supply cable, the electrician may need to request a visit from NGED to assess or upgrade the supply-side equipment. NGED supply enquiries can be made through their website or by calling 105.',
  },
  {
    question: 'Do I need an EICR for a Bristol flat I own and live in?',
    answer:
      'There is no legal requirement for owner-occupiers to obtain an EICR. However, it is strongly recommended every 10 years (or every 5 years for properties over 25 years old) as best practice under BS 7671. If you are selling the property, an EICR is not legally required but mortgage lenders and conveyancers increasingly request one.',
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
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK',
    description: 'National EICR pricing guide with breakdowns by property type and region.',
    icon: PoundSterling,
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
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering periodic inspection.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eicr',
    heading: 'What Is an EICR?',
    content: (
      <>
        <p>
          An EICR (Electrical Installation Condition Report) is a formal inspection and test of a
          property's fixed electrical installation. It assesses the condition of the wiring,
          consumer unit, protective devices, earthing and bonding, sockets, switches, and all fixed
          electrical equipment.
        </p>
        <p>
          The EICR is carried out under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Chapter 65 (periodic inspection and testing), using the model report form in Appendix 6.
          An Electrical Installation Condition Report is the correct document for periodic
          inspection of existing installations — not an Electrical Installation Certificate, which
          is issued for new work only.
        </p>
        <p>
          The inspector carries out a detailed visual inspection followed by a programme of testing
          (insulation resistance, earth fault loop impedance, RCD operation times, continuity of
          protective conductors). The results are recorded on Schedules of Circuit Details and Test
          Results, which form part of the report. Each observation is classified using a code system
          (C1, C2, C3, FI) that indicates the severity and urgency of any defects found.
        </p>
        <p>
          The overall condition of the installation is assessed as either Satisfactory or
          Unsatisfactory. An Unsatisfactory result means the installation has one or more C1 (danger
          present) or C2 (potentially dangerous) observations that require remedial work.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white mb-2">A4:2026 Changes Relevant to Bristol EICRs</h3>
          <p className="text-white text-sm leading-relaxed mb-2">
            BS 7671:2018+A4:2026 introduced two requirements that directly affect how domestic EICRs
            are assessed in Bristol:
          </p>
          <ul className="space-y-2 text-white text-sm">
            <li>
              <strong>Reg 421.1.7 — Arc Fault Detection Devices (AFDDs):</strong> A4:2026 makes
              AFDDs a <em>requirement</em> for single-phase AC final circuits supplying
              socket-outlets rated up to 32 A in Houses in Multiple Occupation, purpose-built
              student accommodation, care homes, and higher-risk residential buildings. For all
              other premises the regulation <em>recommends</em> AFDDs on the same circuits. Given
              Bristol's large HMO and student-let stock, this is a material change — inspectors
              record AFDD presence on the EICR, and the EICR confirms AFDDs are operational
              (Regs 421.1.7, 532.6 and 651.2(e)).
            </li>
            <li>
              <strong>Reg 411.3.4 — RCD protection on domestic lighting circuits:</strong> Within
              domestic premises, additional protection by an RCD with a rated residual operating
              current not exceeding 30 mA <em>shall</em> be provided for AC final circuits supplying
              luminaires. This is a mandatory requirement. Domestic lighting circuits without RCD
              protection (&le;30 mA) are now non-compliant and should attract a C2 observation on an
              EICR of an existing installation.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bristol-costs',
    heading: 'EICR Cost in Bristol (2026 Prices)',
    content: (
      <>
        <p>
          Bristol EICR costs are slightly above the national average, reflecting strong demand from
          the city's large private rented sector, a significant student population, and active HMO
          licensing enforcement. Below are typical 2026 prices for Bristol EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[1.4fr_1fr_0.8fr] gap-px bg-white/10 text-xs sm:text-sm">
            <div className="bg-white/[0.06] px-3 sm:px-4 py-3 font-bold text-white">
              Property type
            </div>
            <div className="bg-white/[0.06] px-3 sm:px-4 py-3 font-bold text-white">
              Indicative cost
            </div>
            <div className="bg-white/[0.06] px-3 sm:px-4 py-3 font-bold text-white">Circuits</div>

            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white font-semibold">
              Studio / 1-bed flat
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-yellow-400 font-bold">
              £120–£200
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white/80">3–5</div>

            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white font-semibold">
              Two-bedroom flat
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-yellow-400 font-bold">
              £150–£250
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white/80">5–8</div>

            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white font-semibold">
              Three-bedroom house
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-yellow-400 font-bold">
              £200–£350
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white/80">8–15</div>

            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white font-semibold">
              Four-bedroom+ house
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-yellow-400 font-bold">
              £300–£450+
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white/80">15+</div>

            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white font-semibold">
              HMO (multiple units)
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-yellow-400 font-bold">
              £350–£700+
            </div>
            <div className="bg-[#0b0f17] px-3 sm:px-4 py-3 text-white/80">Varies</div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white mb-3">How Bristol's areas affect the price</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted Georgian houses (Clifton)</strong> — studios and flats split out
                of period townhouses often share meters and communal boards, adding access time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Purpose-built flats (Harbourside, Temple Quay)</strong> — modern wiring and
                a single accessible consumer unit make these the quickest and cheapest to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (Bedminster, Southville, Totterdown)</strong> — aged
                wiring and cellar installations push the inspection towards the upper end of the
                range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMOs (Redland, Cotham, Stokes Croft, Fishponds)</strong> — multiple
                consumer units, fire alarm systems, and emergency lighting all fall within the
                inspection scope, so cost scales with the number of units.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are indicative market prices for the inspection and report only — not a quote.
          Remedial work identified during the EICR is priced separately. Some electricians offer a
          combined EICR and remedial package at a reduced total cost. For a national comparison, see
          our{' '}
          <SEOInternalLink href="/guides/eicr-cost-uk">EICR cost UK guide</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICRs in England',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          introduced mandatory electrical safety checks for private rented properties in England.
          The key legal requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — the landlord must ensure the electrical
                installation is inspected and tested by a qualified person, and obtain an EICR,
                before a new tenant moves in. This applies to all new tenancies from 1 July 2020 and
                all existing tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years, or sooner if the inspector recommends a shorter interval. BS 7671 Regulation
                651.1 (Part 6, Chapter 65) requires that periodic inspection and testing of every
                electrical installation is carried out in accordance with the Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to the
                tenant within 28 days of the inspection. New tenants must receive a copy before they
                move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — if the EICR identifies C1 or C2 observations, the
                landlord must complete remedial work within 28 days (or sooner if the inspector
                specifies a shorter timeframe). Written confirmation of completion must be provided
                to the tenant and the local authority if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — local authorities can impose civil penalties of up to
                £30,000 per breach. Bristol City Council has been proactive in enforcing these
                regulations given the city's large private rented sector.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all private rented properties in England, including Houses in
          Multiple Occupation (HMOs). Social housing providers have separate obligations under the
          Homes (Fitness for Human Habitation) Act 2018. Owner-occupied properties are not covered
          by these regulations but periodic inspection is recommended as best practice under
          Regulation 651.1 of BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'bristol-enforcement',
    heading: 'Bristol Council Enforcement and HMO Licensing',
    content: (
      <>
        <p>
          Bristol City Council is responsible for enforcing the Electrical Safety Standards
          Regulations in the private rented sector across the city. Bristol has one of the largest
          private rented sectors outside London, and the council has been active in enforcement:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Bristol operates mandatory HMO licensing for larger
                HMOs (five or more occupants forming two or more households) and additional
                licensing in designated areas. The city's large student population means many
                properties in Redland, Cotham, Stokes Croft, Fishponds, and Horfield are licensed
                HMOs. A valid EICR is a condition of every HMO licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student housing enforcement</strong> — with two major universities
                (University of Bristol and UWE Bristol), the city has a high concentration of
                student lets. Bristol City Council works with both universities and student unions
                to ensure landlords comply with electrical safety requirements. Student complaints
                are actively investigated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Bristol City Council has the power to issue civil
                penalties of up to £30,000 per breach for non-compliance with the Electrical Safety
                Standards Regulations. The council's Private Housing team handles complaints and
                conducts inspections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties in Bristol should be aware that the combination of active HMO
          licensing, a large student population, and a proactive council enforcement team makes
          compliance essential. Maintaining a valid EICR for every rented property is the safest
          approach.
        </p>
      </>
    ),
  },
  {
    id: 'observation-codes',
    heading: 'EICR Observation Codes Explained',
    content: (
      <>
        <p>
          Every observation recorded on an EICR is classified using one of four codes. Understanding
          these codes is essential for landlords, tenants and electricians. The codes are defined in{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            BS 7671 and the associated model forms
          </SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate remedial action is required. The inspector may
              recommend disconnecting the dangerous circuit or installation on the spot. Examples in
              Bristol properties include exposed live conductors, damaged wiring in cellar
              conversions, and missing consumer unit covers.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              Bristol include absent or inadequate earthing (particularly in older Clifton flats),
              lack of RCD additional protection on socket-outlet circuits up to 32&nbsp;A
              (Reg&nbsp;411.3.3), overloaded circuits, and deteriorated cable insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous but improvement would enhance safety. C3 observations do not
              make the EICR Unsatisfactory. Common examples include lack of supplementary bonding in
              bathrooms (where not required by current regulations) and older but functional
              accessories.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation and further
              investigation is needed. This is common in Bristol's Georgian and Victorian properties
              where wiring is concealed in plaster, under floorboards, or behind fixed kitchen units
              that cannot be moved during the inspection.
            </p>
          </div>
        </div>
        <p>
          An EICR is assessed as <strong>Unsatisfactory</strong> if it contains any C1 or C2
          observations. C3 and FI observations alone do not make the report Unsatisfactory, but FI
          items should be investigated to confirm the installation is safe.
        </p>
      </>
    ),
  },
  {
    id: 'georgian-wiring',
    heading: 'Georgian and Victorian Properties in Bristol',
    content: (
      <>
        <p>
          Bristol has a substantial stock of Georgian properties (particularly in Clifton, the city
          centre, and parts of Kingsdown) and Victorian terraces throughout Bedminster, Southville,
          Totterdown, and Eastville. These properties present specific challenges during an EICR:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple conversions</strong> — many Georgian townhouses in Clifton have
                been converted into multiple flats over several decades. Each conversion may have
                added wiring of different eras, leading to a mix of wiring systems and consumer
                units within a single building. Tracing circuit ownership between flats can be
                complex.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead-sheathed and rubber-insulated cables</strong> — original wiring in
                Georgian and early Victorian properties used rubber insulation with a lead sheath.
                The rubber degrades over time, becoming brittle and crumbling. This is a common C1
                or C2 finding in Bristol properties that have never been rewired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing deficiencies</strong> — many older Bristol properties were
                originally wired without a protective earth conductor. Some still rely on gas or
                water pipe earthing, which is no longer acceptable. Properties in Clifton and
                Redland converted from single dwellings to flats may have inadequate earthing
                arrangements for the individual flat installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>NGED supply issues</strong> — NGED (formerly WPD) is the DNO for Bristol.
                Older properties may have deteriorated service cut-outs, inadequate earthing
                provision at the supply point, or supply cables that have been in service for
                decades. The inspector may need to recommend an NGED visit to assess or upgrade the
                supply-side equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cellar installations</strong> — many Bristol terraces have cellars that have
                been converted to living space or used as utility areas. Wiring in cellars is often
                exposed to damp conditions, which accelerates deterioration of cable insulation and
                can compromise earthing connections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in Bristol should allow extra time when quoting EICRs for Georgian
          and Victorian properties. A three-bedroom Victorian terrace in Bedminster may take 4 to 5
          hours compared to 2 to 3 hours for a modern flat of the same size.
        </p>
        <p>
          Under BS 7671:2018+A4:2026, older Bristol properties face two additional compliance
          considerations. First, domestic lighting circuits that have never had RCD protection are
          now non-compliant under Reg 411.3.4, which requires that all AC final circuits supplying
          luminaires in domestic premises are protected by an RCD with a rated residual operating
          current not exceeding 30 mA. Victorian terraces in Bedminster and Southville that were
          rewired before RCD protection on lighting became standard will typically attract a C2
          observation on this point. Second, properties with aluminium wiring, ageing
          rubber-insulated cables, or complex multi-conversion wiring are prime candidates for AFDD
          under Reg 421.1.7, which recommends arc fault detection devices on AC final circuits to
          mitigate fire risk from arc fault currents.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During an EICR',
    content: (
      <>
        <p>
          The EICR process involves both a visual inspection and a programme of testing. The
          inspector needs access to all parts of the property including every room, the consumer
          unit, the meter cupboard, loft space (if accessible), and any outbuildings. The power will
          need to be switched off for parts of the testing — typically 30 to 60 minutes for a
          standard property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-yellow-400 shrink-0" />
            Visual inspection
          </h3>
          <p className="text-white text-sm leading-relaxed">
            The inspector examines the consumer unit, protective devices, cable condition, socket
            outlets, light fittings, switches, earthing and bonding connections, and the condition
            of all accessible wiring. Periodic inspection is carried out without dismantling, or
            with partial dismantling as required (Reg 651.2).
          </p>
        </div>
        <p>
          A programme of measurements then follows, applying the relevant tests from BS 7671
          Chapter 64. The dead tests are completed in sequence before the supply is restored:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[0.5fr_1.3fr_1fr] gap-px bg-white/10 text-xs sm:text-sm">
            <div className="bg-white/[0.06] px-3 sm:px-4 py-3 font-bold text-white">Stage</div>
            <div className="bg-white/[0.06] px-3 sm:px-4 py-3 font-bold text-white">Test</div>
            <div className="bg-white/[0.06] px-3 sm:px-4 py-3 font-bold text-white">Reference</div>

            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-blue-300 font-semibold">Dead</div>
            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-white">
              Continuity of protective conductors and ring final circuit conductors
            </div>
            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-white/80">Reg 643.2</div>

            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-blue-300 font-semibold">Dead</div>
            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-white">
              Insulation resistance — 500&nbsp;V DC test, minimum 1.0&nbsp;M&Omega; (Table 64)
            </div>
            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-white/80">Reg 643.3</div>

            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-blue-300 font-semibold">Dead</div>
            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-white">Polarity</div>
            <div className="bg-blue-900/30 px-3 sm:px-4 py-3 text-white/80">Reg 643.6</div>

            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-amber-300 font-semibold">
              Live
            </div>
            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-white">
              Earth fault loop impedance (Ze and Zs) — protection by automatic disconnection
            </div>
            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-white/80">Reg 643.7</div>

            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-amber-300 font-semibold">
              Live
            </div>
            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-white">
              RCD operation as additional protection
            </div>
            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-white/80">Reg 643.8</div>

            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-amber-300 font-semibold">
              Live
            </div>
            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-white">
              Functional testing of switchgear, controlgear and protective devices
            </div>
            <div className="bg-amber-900/30 px-3 sm:px-4 py-3 text-white/80">Reg 643.10</div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white mb-2 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-yellow-400 shrink-0" />
            Report completion
          </h3>
          <p className="text-white text-sm leading-relaxed">
            The inspector completes the EICR including the Schedule of Inspections and the Schedule
            of Test Results, using the model form in Appendix 6 of BS 7671. The report records
            observations with classification codes, an overall Satisfactory or Unsatisfactory
            assessment, and a recommended date for the next inspection. Details of any damage,
            deterioration, defects or dangerous conditions are recorded in the report (Reg 651.4).
          </p>
        </div>
        <p>
          In Bristol, tenants and landlords should prepare by ensuring clear access to the consumer
          unit and meter, removing items stored in front of electrical equipment, and making all
          rooms accessible. In converted Georgian properties, the meter and consumer unit may be in
          a communal area — check access arrangements with the managing agent beforehand.
        </p>
      </>
    ),
  },
  {
    id: 'how-often',
    heading: 'How Often Is an EICR Needed?',
    content: (
      <>
        <p>
          The required frequency of EICRs depends on the property type and use. Under BS 7671
          Chapter 65, Reg 651.1 requires periodic inspection and testing of every electrical
          installation where required, and Reg 652.1 sets the frequency having regard to the type
          of installation, its use and operation, and the maintenance and external influences it is
          subject to. Typical intervals by property type are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented property (England)</strong> — at least every 5 years (legal
                requirement under the 2020 Regulations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied domestic</strong> — every 10 years is the recommended
                interval as best practice. Properties over 25 years old or with known wiring issues
                should be inspected every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises</strong> — every 5 years (or 3 years for higher-risk
                environments). Bristol commercial landlords should factor this into lease
                obligations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — a new EICR is recommended (and required for
                rented properties) whenever a property changes occupant, even if the previous EICR
                has not expired.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval than the standard maximum if the
          installation is in poor condition. For example, a Georgian Bristol property with multiple
          C3 observations may have a recommended next inspection of 3 years rather than the standard
          5 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Bristol',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a person who is qualified and
          competent. The regulations specify that the inspector should be a member of a competent
          person scheme or a person who the landlord can demonstrate is qualified and competent.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, STROMA, and other
                approved bodies maintain registers of qualified electricians. Searching these
                registers for Bristol-based inspectors is the most reliable way to find a qualified
                person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — the inspector should hold City & Guilds 2391
                (Inspection and Testing) or City & Guilds 2395 (Initial Verification and
                Certification), or the combined 2394/2395 qualification. They should also hold a
                current BS 7671 qualification (C&G 2382 18th Edition).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — check that the inspector carries professional indemnity
                insurance. This protects both the inspector and the landlord if an error is made on
                the report. Reputable electricians registered with competent person schemes are
                required to maintain adequate insurance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of extremely low-priced EICR offers in Bristol. An EICR for a two-bedroom flat
          that is priced below £100 may indicate a rushed inspection, inadequate testing, or an
          unqualified inspector. A thorough EICR takes time and requires expensive calibrated test
          instruments.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Bristol',
    content: (
      <>
        <p>
          Bristol is a strong market for EICR work. The city's large private rented sector, active
          HMO licensing, two universities generating student housing demand, and substantial stock
          of older properties create consistent work for qualified inspectors.
        </p>
        <p>
          To maximise efficiency and professionalism, electricians carrying out EICRs in Bristol
          should:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the report on your phone while you are still on site. AI board
                  scanning reads the consumer unit schedule, voice entry records test results
                  hands-free, and instant PDF export sends the report to the landlord before you
                  leave. No more evening paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Instantly</h4>
                <p className="text-white text-sm leading-relaxed">
                  When the EICR identifies C1 or C2 observations, quote the remedial work
                  immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink>.
                  Landlords are legally obligated to act within 28 days — the electrician who
                  delivers the quote on the day of the EICR is most likely to win the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRBristolPage() {
  return (
    <GuideTemplate
      title="EICR Bristol | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Bristol for 2026. Landlord legal requirements, HMO licensing, Georgian property challenges in Clifton, observation codes explained…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Bristol:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Bristol — costs by property type, landlord legal requirements, HMO licensing, Georgian and Victorian property challenges, observation codes, and how to find a qualified inspector."
      answerBox={{
        question: 'How much does an EICR cost in Bristol?',
        answer:
          'An EICR in Bristol typically costs £120 to £200 for a one-bedroom flat, £150 to £250 for a two-bedroom flat, and £200 to £350 for a three-bedroom house. HMOs around the university areas run £350 to £700 depending on the number of consumer units and circuits. These are indicative market prices for the inspection and report only — remedial work is quoted separately.',
        detail:
          'Since 1 April 2021, landlords in England must hold a satisfactory EICR before a new tenancy and renew it at least every five years, enforced by Bristol City Council with penalties of up to £30,000 per breach.',
      }}
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Bristol"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
