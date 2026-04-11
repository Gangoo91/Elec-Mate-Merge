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
  { label: 'EICR Newcastle', href: '/guides/eicr-newcastle' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'newcastle-costs', label: 'EICR Cost in Newcastle' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'newcastle-enforcement', label: 'Newcastle Council Enforcement' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'tyneside-flats', label: 'Tyneside Flat Conversions' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Section 631). It records the condition of wiring, consumer units, protective devices, earthing, and bonding with classified observation codes.",
  'Newcastle EICR costs typically range from £100 to £400 depending on property size. A two-bedroom flat costs £130 to £220, while a three-bedroom house costs £180 to £300. Prices are below the national average, reflecting lower labour rates in the North East.',
  'Since 1 April 2021, landlords in England must obtain an EICR before a new tenancy begins and at least every five years. Failure to comply can result in fines of up to £30,000 per breach, enforced by Newcastle City Council.',
  'Newcastle has a distinctive housing stock that includes Tyneside flats — a unique two-storey terraced conversion found almost exclusively in the North East. These properties present specific challenges for EICR inspectors, including shared supplies, complex earthing arrangements, and multiple phases of wiring.',
  'Northern Powergrid is the Distribution Network Operator for Newcastle. Supply-side issues such as deteriorated cut-outs and absent earthing provision are common findings during Newcastle EICRs, particularly in Tyneside flats and older Victorian terraces.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Newcastle?',
    answer:
      'EICR costs in Newcastle vary by property size. A one-bedroom flat typically costs £100 to £170. A two-bedroom flat costs £130 to £220. A three-bedroom house costs £180 to £300. Larger properties with multiple consumer units cost more. HMOs in student areas such as Jesmond, Heaton, and Sandyford can cost £300 to £600 depending on the number of consumer units and circuits. Newcastle prices are below the national average.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Newcastle?',
    answer:
      'Yes. Since 1 April 2021, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to obtain an EICR before the start of a new tenancy and at least every five years thereafter. The EICR must be carried out by a qualified person registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A copy must be provided to tenants within 28 days and to Newcastle City Council within seven days if requested. Failure to comply can result in a civil penalty of up to £30,000 per breach.',
  },
  {
    question: 'What happens if my Newcastle property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord must arrange for remedial work within 28 days (or sooner if the inspector recommends it). The remedial work must be carried out by a qualified electrician, and the original inspector (or another qualified person) must confirm the work has been completed and update the EICR accordingly.',
  },
  {
    question: 'What is a Tyneside flat and why does it affect EICRs?',
    answer:
      'A Tyneside flat is a distinctive North East housing type where a terraced building is divided into two self-contained flats — one on the ground floor and one on the upper floor, each with its own front door. Many were originally single dwellings that were converted decades ago. They present EICR challenges including shared or unclear supply arrangements, mixed-era wiring, and earthing that may have been retrofitted. Inspectors should allow extra time for Tyneside flats and check supply ownership carefully.',
  },
  {
    question: 'Does Newcastle have selective licensing for rental properties?',
    answer:
      'Newcastle City Council has operated selective licensing schemes in designated areas. Under selective licensing, landlords must obtain a property licence, and a valid EICR is typically a condition of the licence. Newcastle also operates mandatory HMO licensing for larger HMOs. The large student population (Newcastle University and Northumbria University) means many properties in Jesmond, Heaton, and Sandyford are licensed HMOs requiring current EICRs.',
  },
  {
    question: 'Who is the DNO for Newcastle?',
    answer:
      'The Distribution Network Operator for Newcastle is Northern Powergrid. If an EICR identifies supply-side issues such as a deteriorated cut-out, absent earth terminal, or problems with the supply cable, the electrician may need to request a visit from Northern Powergrid to assess or upgrade the supply-side equipment. Supply enquiries can be made through their website or by calling 105.',
  },
  {
    question: 'Do I need an EICR for a Newcastle flat I own and live in?',
    answer:
      'There is no legal requirement for owner-occupiers to obtain an EICR. However, it is strongly recommended every 10 years (or every 5 years for properties over 25 years old) as best practice under BS 7671 Regulation 134.2. If you are selling the property, an EICR is not legally required but mortgage lenders and conveyancers increasingly request one.',
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
          The EICR is documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which requires that an Electrical Installation Condition Report is used for
          periodic inspection and testing of existing installations — not an Electrical Installation
          Certificate, which is for new work only.
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
      </>
    ),
  },
  {
    id: 'newcastle-costs',
    heading: 'EICR Cost in Newcastle (2026 Prices)',
    content: (
      <>
        <p>
          Newcastle EICR costs are below the national average, reflecting lower labour rates in the
          North East. However, demand has grown steadily due to landlord compliance obligations and
          active enforcement by Newcastle City Council. Below are typical 2026 prices for Newcastle
          EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £100 to £170. Typically 3 to 5
                circuits, single consumer unit. Common in purpose-built city centre developments and
                converted Tyneside flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £130 to £220. Usually 5 to 8 circuits.
                Purpose-built flats on the Quayside are generally quicker to inspect than converted
                Tyneside flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £300. Expect 8 to 15 circuits.
                Victorian terraces in Heaton, Jesmond, and Fenham often take longer due to aged
                wiring and multiple phases of electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £280 to £400+. Larger properties in Gosforth,
                Jesmond Dene, and Ponteland may have multiple consumer units or extensions that
                increase the scope of inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £300 to £600+. Newcastle has a
                significant number of HMOs, particularly around the university areas. HMOs have
                multiple consumer units, fire alarm systems, and emergency lighting that all form
                part of the inspection scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Remedial work identified during the
          EICR is quoted and charged separately. Some electricians offer a combined EICR and
          remedial package at a reduced total cost.
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
                134.2 requires periodic inspection regimes that confirm installations remain safe.
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
                £30,000 per breach. Newcastle City Council has been active in enforcement,
                particularly in areas with high concentrations of student and private rented
                housing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all private rented properties in England, including Houses in
          Multiple Occupation (HMOs). Social housing providers have separate obligations under the
          Homes (Fitness for Human Habitation) Act 2018. Owner-occupied properties are not covered
          by these regulations but periodic inspection is recommended as best practice under
          Regulation 134.2 of BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'newcastle-enforcement',
    heading: 'Newcastle Council Enforcement and Student Areas',
    content: (
      <>
        <p>
          Newcastle City Council is responsible for enforcing the Electrical Safety Standards
          Regulations in the private rented sector. Newcastle has a substantial private rented
          sector, driven in large part by its two major universities. The council has been
          particularly active in enforcing standards in student areas:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student area enforcement</strong> — Jesmond, Heaton, Sandyford, and
                Shieldfield have very high concentrations of student lets. Newcastle City Council
                works closely with Newcastle University and Northumbria University to ensure
                landlords comply with electrical safety requirements. Complaints from students are
                actively investigated, and the council has issued civil penalties to non-compliant
                landlords in these areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Newcastle operates mandatory HMO licensing for
                larger HMOs and additional licensing in designated areas. A valid EICR is a
                condition of all HMO licences. Many properties in Jesmond and Heaton that were
                originally large family houses have been converted to HMOs and must maintain current
                electrical safety certificates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Newcastle City Council has the power to issue
                civil penalties of up to £30,000 per breach for non-compliance with the Electrical
                Safety Standards Regulations. The council's Private Rented Service team handles
                complaints, conducts inspections, and takes enforcement action where necessary.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties in Newcastle's student areas should be particularly diligent
          about EICR compliance. The combination of active council enforcement, university
          involvement, and informed student tenants makes non-compliance a significant risk.
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
              Newcastle properties include exposed live conductors in converted Tyneside flats,
              severely damaged wiring, and missing consumer unit covers.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              Newcastle include absent or inadequate earthing (particularly in Tyneside flats), lack
              of RCD protection on socket circuits, overloaded circuits, and deteriorated cable
              insulation in older terraces.
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
              investigation is needed. This is common in Tyneside flats and Victorian terraces where
              wiring is concealed in plaster, under floorboards, or routed through party walls
              between the upper and lower flats.
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
    id: 'tyneside-flats',
    heading: 'Tyneside Flat Conversions',
    content: (
      <>
        <p>
          The Tyneside flat is a distinctive housing type found almost exclusively in Newcastle and
          the wider North East. These are terraced buildings that have been divided into two
          self-contained flats — one on the ground floor and one on the upper floor — each with its
          own front door. Thousands of Tyneside flats exist across Newcastle, Gateshead, and North
          and South Tyneside. They present unique challenges during an EICR:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared and unclear supply arrangements</strong> — many Tyneside flats were
                converted before modern regulations. The electrical supply may be shared between the
                upper and lower flats, or the supply ownership may be unclear. Inspectors need to
                establish which circuits belong to which flat and confirm that metering is correctly
                allocated before beginning the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixed-era wiring</strong> — Tyneside flats have often been modified multiple
                times over the decades. It is common to find original rubber-insulated wiring
                alongside PVC cables from different eras, creating a mix of wiring systems that
                complicates the inspection. Some circuits may cross the boundary between flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing deficiencies</strong> — many Tyneside flats were originally wired
                without a protective earth conductor. Earthing may have been retrofitted at
                different times for the upper and lower flats, resulting in inconsistent earthing
                arrangements. Some flats still rely on gas or water pipe earthing, which is no
                longer acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northern Powergrid supply issues</strong> — Northern Powergrid is the DNO
                for Newcastle. Older Tyneside flats may have deteriorated service cut-outs, or the
                supply may not have been properly split when the building was converted. The
                inspector may need to recommend a Northern Powergrid visit to assess the supply
                arrangement and provide separate earthing for each flat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access between flats</strong> — inspecting a Tyneside flat may require
                access to the other flat in the building to trace shared circuits, check earthing
                connections, or inspect the supply intake. Coordinating access between tenants or
                between different landlords adds complexity to the inspection process.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in Newcastle should allow extra time when quoting EICRs for Tyneside
          flats. What appears to be a simple one-bedroom flat can take significantly longer than
          expected due to shared supplies, cross-flat circuits, and the need to investigate the
          building's electrical history.
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
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector examines the consumer unit,
                protective devices, cable condition, socket outlets, light fittings, switches,
                earthing and bonding connections, and the condition of all accessible wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — with the supply isolated, the inspector tests
                continuity of protective conductors, continuity of ring final circuit conductors,
                and insulation resistance (at 500V DC, minimum 1 megohm required).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — with the supply restored, the inspector tests earth
                fault loop impedance (Ze and Zs values), prospective fault current (PFC), RCD
                operation times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR including
                Schedules of Circuit Details and Test Results (as required by Regulation Section
                631). The report includes observations with classification codes, an overall
                assessment, and a recommended date for the next inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In Newcastle, tenants and landlords should prepare by ensuring clear access to the
          consumer unit and meter, removing items stored in front of electrical equipment, and
          making all rooms accessible. For Tyneside flats, check whether access to the other flat in
          the building will be needed and arrange this in advance.
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
          The required frequency of EICRs depends on the property type and use. BS 7671 Regulation
          Section 621 establishes that installations must be periodically inspected at intervals
          suited to the property type:
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
                environments). Newcastle commercial landlords should factor this into lease
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
          installation is in poor condition. For example, a Tyneside flat with multiple C3
          observations and mixed-era wiring may have a recommended next inspection of 3 years rather
          than the standard 5 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Newcastle',
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
                registers for Newcastle-based inspectors is the most reliable way to find a
                qualified person.
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
                <strong>Tyneside flat experience</strong> — when choosing an inspector for a
                Tyneside flat, look for an electrician with specific experience of this property
                type. The unique challenges of Tyneside flats mean that an inspector unfamiliar with
                them may miss issues or underestimate the time required. Local Newcastle
                electricians will typically have extensive experience with Tyneside flats.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of extremely low-priced EICR offers in Newcastle. An EICR for a two-bedroom
          flat that is priced below £80 may indicate a rushed inspection, inadequate testing, or an
          unqualified inspector. A thorough EICR takes time and requires expensive calibrated test
          instruments.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Newcastle',
    content: (
      <>
        <p>
          Newcastle offers consistent demand for EICR work. The city's large student population,
          active council enforcement, extensive stock of Tyneside flats, and growing city centre
          rental market all contribute to a steady flow of work for qualified inspectors.
        </p>
        <p>
          To maximise efficiency and professionalism, electricians carrying out EICRs in Newcastle
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords are legally obligated to act within 28 days — the electrician who
                  delivers the quote on the day of the EICR is most likely to win the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
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

export default function EICRNewcastlePage() {
  return (
    <GuideTemplate
      title="EICR Newcastle | Electrical Safety Report Cost 2026"
      description="EICR costs in Newcastle for 2026. Landlord legal requirements, Tyneside flat conversion challenges, student area enforcement, observation codes explained, and how to find a qualified inspector. Prices from £100 for a flat to £400+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Newcastle:{' '}
          <span className="text-yellow-400">Electrical Safety Report Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Newcastle — costs by property type, landlord legal requirements, Tyneside flat conversion challenges, student area enforcement, observation codes, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Newcastle"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
