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
  { label: 'EICR Liverpool', href: '/guides/eicr-liverpool' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'liverpool-costs', label: 'EICR Cost in Liverpool' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'liverpool-enforcement', label: 'Liverpool Council Enforcement' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'dock-area-properties', label: 'Dock Area and Converted Properties' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Section 631). It records the condition of wiring, consumer units, protective devices, earthing, and bonding with classified observation codes.",
  'Liverpool EICR costs typically range from £100 to £400 depending on property size. A two-bedroom flat costs £130 to £220, while a three-bedroom house costs £180 to £300. Prices are generally below the national average, reflecting lower labour rates in the North West.',
  'Since 1 April 2021, landlords in England must obtain an EICR before a new tenancy begins and at least every five years. Failure to comply can result in fines of up to £30,000 per breach, enforced by Liverpool City Council.',
  'Liverpool has a large stock of Victorian terraces, dock area warehouse conversions, and student HMOs. These properties frequently present aged wiring, converted commercial installations, and complex multi-tenancy arrangements that require careful inspection.',
  'SP Energy Networks is the Distribution Network Operator for Liverpool. Supply-side issues such as deteriorated cut-outs and absent earthing provision are common findings during Liverpool EICRs, particularly in older properties around the dock areas and inner city.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Liverpool?',
    answer:
      'EICR costs in Liverpool vary by property size. A one-bedroom flat typically costs £100 to £180. A two-bedroom flat costs £130 to £220. A three-bedroom house costs £180 to £300. Larger properties with multiple consumer units cost more. HMOs in student areas such as Wavertree, Kensington, and Smithdown Road can cost £300 to £600 depending on the number of consumer units and circuits. Liverpool prices are generally below the national average.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Liverpool?',
    answer:
      'Yes. Since 1 April 2021, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to obtain an EICR before the start of a new tenancy and at least every five years thereafter. The EICR must be carried out by a qualified person registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A copy must be provided to tenants within 28 days and to Liverpool City Council within seven days if requested. Failure to comply can result in a civil penalty of up to £30,000 per breach.',
  },
  {
    question: 'What happens if my Liverpool property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord must arrange for remedial work within 28 days (or sooner if the inspector recommends it). The remedial work must be carried out by a qualified electrician, and the original inspector (or another qualified person) must confirm the work has been completed and update the EICR accordingly.',
  },
  {
    question: 'How long does an EICR take in Liverpool?',
    answer:
      'The duration depends on property size and the number of circuits. A one-bedroom flat with a single consumer unit typically takes 2 to 3 hours. A three-bedroom house takes 3 to 4 hours. Dock area warehouse conversions and Victorian terraces often take longer due to unusual layouts, long cable runs, and multiple phases of wiring. HMOs with multiple consumer units can take a full day.',
  },
  {
    question: 'Does Liverpool have selective licensing for rental properties?',
    answer:
      'Yes. Liverpool City Council has operated selective licensing schemes in designated areas of the city. Under selective licensing, landlords must obtain a property licence, and a valid EICR is typically a condition of the licence. Liverpool also operates mandatory HMO licensing for larger HMOs. The city has a large student population (University of Liverpool, LJMU, and Liverpool Hope University) which means many properties in the L15 and L17 postcode areas are licensed HMOs requiring current EICRs.',
  },
  {
    question: 'Who is the DNO for Liverpool?',
    answer:
      'The Distribution Network Operator for Liverpool is SP Energy Networks. If an EICR identifies supply-side issues such as a deteriorated cut-out, absent earth terminal, or problems with the supply cable, the electrician may need to request a visit from SP Energy Networks to assess or upgrade the supply-side equipment. Supply enquiries can be made through their website or by calling 105.',
  },
  {
    question: 'Do I need an EICR for a Liverpool flat I own and live in?',
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
    id: 'liverpool-costs',
    heading: 'EICR Cost in Liverpool (2026 Prices)',
    content: (
      <>
        <p>
          Liverpool EICR costs are generally below the national average, reflecting lower labour
          rates in the North West compared to London and the South East. However, prices have
          increased in recent years due to rising demand from landlord compliance obligations. Below
          are typical 2026 prices for Liverpool EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £100 to £180. Typically 3 to 5
                circuits, single consumer unit. Common in dock area conversions and purpose-built
                city centre apartments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £130 to £220. Usually 5 to 8 circuits.
                Purpose-built flats are generally quicker to inspect than converted Victorian
                terraces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £300. Expect 8 to 15 circuits.
                Victorian terraces in Toxteth, Wavertree, and Kensington often take longer due to
                aged wiring and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £280 to £400+. Larger properties in Allerton,
                Woolton, and Childwall may have multiple consumer units or extensions that increase
                the scope of inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £300 to £600+. Liverpool has a
                significant number of HMOs particularly around the university areas. HMOs have
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
                £30,000 per breach. Liverpool City Council has enforcement powers under these
                regulations and its selective licensing schemes provide an additional enforcement
                mechanism.
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
    id: 'liverpool-enforcement',
    heading: 'Liverpool Council Enforcement and Selective Licensing',
    content: (
      <>
        <p>
          Liverpool City Council is responsible for enforcing the Electrical Safety Standards
          Regulations in the private rented sector. Liverpool has one of the largest private rented
          sectors in the North West, and the council has been active in enforcement through both the
          national regulations and its own licensing schemes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — Liverpool City Council has operated selective
                licensing schemes in designated areas of the city. Under selective licensing,
                landlords must obtain a property licence, and a valid EICR is a condition of the
                licence. This has driven EICR compliance in areas that might otherwise have lower
                take-up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO requirements</strong> — with three major universities
                (University of Liverpool, Liverpool John Moores University, and Liverpool Hope
                University), the city has a high concentration of student lets. Properties in
                Wavertree, Kensington, Smithdown Road, and Edge Hill are frequently HMOs requiring
                both licensing and valid EICRs. Liverpool City Council works with universities to
                ensure landlords comply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Liverpool City Council has the power to issue
                civil penalties of up to £30,000 per breach for non-compliance with the Electrical
                Safety Standards Regulations. The council's Environmental Health team handles
                complaints and conducts inspections of private rented properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties in Liverpool should check whether their properties fall within a
          selective licensing area, as the licensing requirements add an additional layer of
          compliance beyond the national EICR regulations.
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
              Liverpool properties include exposed live conductors in warehouse conversions, damaged
              wiring in cellar areas, and missing consumer unit covers.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              Liverpool include absent or inadequate earthing (particularly in older terraces), lack
              of RCD protection on socket circuits, overloaded circuits, and deteriorated cable
              insulation in dock area conversions.
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
              investigation is needed. This is common in Liverpool's converted warehouse properties
              where wiring may be concealed behind cladding, in service voids, or routed through
              areas that cannot be accessed without destructive investigation.
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
    id: 'dock-area-properties',
    heading: 'Dock Area and Converted Properties in Liverpool',
    content: (
      <>
        <p>
          Liverpool's docklands regeneration has created a large number of converted warehouse and
          commercial properties, particularly around the Albert Dock, Baltic Triangle, and Ropewalks
          areas. These conversions, alongside Liverpool's extensive stock of Victorian terraces,
          present specific challenges during an EICR:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial-to-residential conversions</strong> — warehouse and commercial
                buildings converted to residential use may retain elements of the original
                commercial electrical installation. Three-phase supplies, industrial-grade
                distribution boards, and commercial cable types are sometimes found alongside
                domestic installations, creating a complex inspection scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable runs</strong> — converted warehouses often have exceptionally
                long cable runs compared to standard domestic properties. This affects voltage drop
                calculations and earth fault loop impedance values. Inspectors need to verify that
                protective devices can disconnect within the required time at the furthest point of
                each circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terrace wiring</strong> — Liverpool has extensive streets of
                Victorian terraces in areas such as Toxteth, Wavertree, Anfield, and Kensington.
                These properties frequently have aged wiring, lead-sheathed cables, and earthing
                deficiencies similar to those found in other major UK cities with Victorian housing
                stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>SP Energy Networks supply issues</strong> — SP Energy Networks is the DNO
                for Liverpool. Older properties may have deteriorated service cut-outs, inadequate
                earthing provision at the supply point, or supply cables that need replacement. The
                inspector may need to recommend an SP Energy Networks visit to assess or upgrade the
                supply-side equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared supplies in conversions</strong> — some dock area conversions and
                terraced house conversions share electrical supplies between flats. Identifying
                which circuits belong to which flat, and confirming that metering and protective
                devices are correctly allocated, can be time-consuming.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in Liverpool should allow extra time when quoting EICRs for dock area
          conversions and Victorian terraces. A converted warehouse flat may take significantly
          longer than a standard purpose-built flat of the same floor area.
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
          In Liverpool, tenants and landlords should prepare by ensuring clear access to the
          consumer unit and meter, removing items stored in front of electrical equipment, and
          making all rooms accessible. In dock area conversions, the meter and consumer unit may be
          in a communal plant room — check access arrangements with the building management
          beforehand.
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
                environments). Liverpool commercial landlords should factor this into lease
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
          installation is in poor condition. For example, a Victorian Liverpool terrace with
          multiple C3 observations may have a recommended next inspection of 3 years rather than the
          standard 5 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Liverpool',
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
                registers for Liverpool-based inspectors is the most reliable way to find a
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
                <strong>Insurance</strong> — check that the inspector carries professional indemnity
                insurance. This protects both the inspector and the landlord if an error is made on
                the report. Reputable electricians registered with competent person schemes are
                required to maintain adequate insurance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of extremely low-priced EICR offers in Liverpool. An EICR for a two-bedroom
          flat that is priced below £80 may indicate a rushed inspection, inadequate testing, or an
          unqualified inspector. A thorough EICR takes time and requires expensive calibrated test
          instruments.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Liverpool',
    content: (
      <>
        <p>
          Liverpool offers strong and growing demand for EICR work. The city's large private rented
          sector, selective licensing schemes, three universities generating student housing demand,
          and dock area regeneration create consistent work for qualified inspectors.
        </p>
        <p>
          To maximise efficiency and professionalism, electricians carrying out EICRs in Liverpool
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

export default function EICRLiverpoolPage() {
  return (
    <GuideTemplate
      title="EICR Liverpool | Electrical Inspection Cost 2026"
      description="EICR costs in Liverpool for 2026. Landlord legal requirements, selective licensing, student HMO requirements, dock area property challenges, observation codes explained, and how to find a qualified inspector. Prices from £100 for a flat to £400+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Liverpool: <span className="text-yellow-400">Electrical Inspection Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Liverpool — costs by property type, landlord legal requirements, selective licensing, student HMO requirements, dock area property challenges, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Liverpool"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
