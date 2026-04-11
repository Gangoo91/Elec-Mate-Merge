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
  { label: 'EICR London', href: '/guides/eicr-london' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'london-costs', label: 'EICR Cost in London' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'london-boroughs', label: 'London Borough Enforcement' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'victorian-wiring', label: 'Victorian Wiring in London' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Section 631). It is not an MOT-style pass/fail but a detailed condition assessment with observation codes.",
  'London EICR costs are higher than the national average due to higher labour rates, travel time and parking costs. Expect to pay between £200 and £350 for a two-bedroom flat and £300 to £500 for a three-bedroom house.',
  'Since 1 April 2021, landlords in England must obtain an EICR before a new tenancy begins and at least every five years. Failure to comply can result in fines of up to £30,000 per breach, enforced by the local London borough.',
  'London has a high proportion of Victorian and Edwardian properties with aged wiring, lead-sheathed cables, and imperial-sized conduit. These properties frequently return C2 (potentially dangerous) observations requiring remedial work.',
  'UKPN (UK Power Networks) is the Distribution Network Operator for London. Supply-side issues such as deteriorated cut-outs, absent earthing, and PME terminations on older properties are common findings during London EICRs.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in London?',
    answer:
      'EICR costs in London vary by property size. A one-bedroom flat typically costs £150 to £250. A two-bedroom flat costs £200 to £350. A three-bedroom house costs £300 to £500. Larger properties with multiple consumer units or three-phase supplies cost more. London prices are 20% to 40% higher than the national average due to higher labour rates, congestion zone charges, and parking costs. Prices also vary between inner and outer London boroughs.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in London?',
    answer:
      'Yes. Since 1 April 2021, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to obtain an EICR before the start of a new tenancy and at least every five years thereafter. The EICR must be carried out by a qualified person (registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA). A copy must be provided to tenants within 28 days and to the local authority within seven days if requested. Failure to comply can result in a civil penalty of up to £30,000 per breach.',
  },
  {
    question: 'What happens if my London property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord must arrange for remedial work within 28 days (or sooner if the inspector recommends it). The remedial work must be carried out by a qualified electrician, and the original inspector (or another qualified person) must confirm the work has been completed and update the EICR accordingly. Failure to complete remedial work within the required timeframe is a breach of the regulations.',
  },
  {
    question: 'How long does an EICR take in London?',
    answer:
      'The duration depends on the property size and the number of circuits. A one-bedroom flat with a single consumer unit typically takes 2 to 3 hours. A three-bedroom house with 10 to 15 circuits takes 3 to 4 hours. Large HMOs or properties with multiple consumer units can take a full day. Victorian properties in London often take longer because of concealed wiring, lack of circuit identification, and the need to trace cables through lath-and-plaster walls. The inspector needs access to all rooms, the consumer unit, and the meter position.',
  },
  {
    question: 'Can I do my own EICR in London?',
    answer:
      'No. An EICR must be carried out by a qualified and competent person. For landlord compliance, the inspector must be registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent). Self-inspection is not accepted by London borough enforcement teams. The inspector must hold an appropriate qualification such as City & Guilds 2391 (Inspection and Testing) or equivalent, and must be experienced in periodic inspection work.',
  },
  {
    question: 'Which London boroughs are strictest about EICR enforcement?',
    answer:
      'Enforcement varies between London boroughs. Newham, Tower Hamlets, Hackney, Lambeth, and Southwark have been among the most proactive in enforcing electrical safety standards in the private rented sector. These boroughs have dedicated private rented sector enforcement teams that actively investigate complaints, conduct inspections, and issue civil penalties. However, all 32 London boroughs plus the City of London have the power to enforce the regulations and impose fines.',
  },
  {
    question: 'Do I need an EICR for a London flat I own and live in?',
    answer:
      'There is no legal requirement for owner-occupiers to obtain an EICR. However, it is strongly recommended every 10 years (or every 5 years for properties over 25 years old) as best practice under BS 7671 Regulation 134.2. If you are selling the property, an EICR is not legally required but mortgage lenders and conveyancers increasingly request one. If you live in a leasehold flat, the freeholder or managing agent may require an EICR for the communal electrical installation.',
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
    id: 'london-costs',
    heading: 'EICR Cost in London (2026 Prices)',
    content: (
      <>
        <p>
          London EICR costs are consistently higher than the national average. This reflects higher
          electrician labour rates, travel time through congested streets, congestion zone and ULEZ
          charges, and the difficulty and cost of parking in inner London boroughs. Below are
          typical 2026 prices for London EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £150 to £250. Typically 3 to 5
                circuits, single consumer unit. The most common EICR in London.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £200 to £350. Usually 5 to 8 circuits.
                Purpose-built flats from the 1960s onwards are generally quicker to inspect than
                converted Victorian houses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £300 to £500. Expect 8 to 15 circuits.
                Victorian and Edwardian terraced houses in inner London boroughs often take longer
                due to aged wiring and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £400 to £650+. Larger properties may have
                multiple consumer units, outbuildings, or three-phase supplies that increase the
                scope of inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £400 to £800+. HMOs have
                multiple consumer units, fire alarm systems, and emergency lighting that all form
                part of the inspection scope. Licensing conditions in many London boroughs require a
                valid EICR.
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
                £30,000 per breach. London boroughs have been particularly active in enforcement,
                with several issuing significant fines to non-compliant landlords.
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
    id: 'london-boroughs',
    heading: 'London Borough Enforcement',
    content: (
      <>
        <p>
          Each of London's 32 boroughs (plus the City of London Corporation) is responsible for
          enforcing the Electrical Safety Standards Regulations in the private rented sector. The
          level of enforcement activity varies significantly between boroughs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High enforcement activity</strong> — Newham, Tower Hamlets, Hackney,
                Lambeth, and Southwark have large private rented sectors and dedicated enforcement
                teams. These boroughs actively investigate tenant complaints, conduct property
                inspections, and issue civil penalties for non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing areas</strong> — several London boroughs operate
                selective licensing schemes that require landlords to obtain a property licence.
                EICR compliance is typically a condition of the licence. Newham was the first London
                borough to introduce borough-wide selective licensing. Waltham Forest, Brent, and
                Croydon also operate schemes in designated areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — mandatory HMO licensing applies to properties with
                five or more occupants forming two or more households. Many London boroughs also
                operate additional licensing schemes covering smaller HMOs. A valid EICR is a
                condition of all HMO licences.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties across multiple London boroughs should be aware that enforcement
          practices vary. A landlord who has had no issues in one borough should not assume the same
          approach applies elsewhere. The safest approach is full compliance: a valid EICR for every
          rented property, renewed every five years.
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
              London properties include exposed live conductors, missing consumer unit covers, and
              severely damaged wiring in Victorian loft conversions.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              London include absent or inadequate earthing (particularly in older flats), lack of
              RCD protection on socket circuits, overloaded circuits, and deteriorated cable
              insulation.
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
              investigation is needed. This is common in London properties where wiring is concealed
              in plaster, under floorboards, or behind fixed kitchen units that cannot be moved
              during the inspection.
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
    id: 'victorian-wiring',
    heading: 'Victorian Wiring in London Properties',
    content: (
      <>
        <p>
          A significant proportion of London's housing stock dates from the Victorian and Edwardian
          eras (1837 to 1914). These properties present unique challenges during an EICR that are
          less commonly encountered in other UK cities:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead-sheathed and rubber-insulated cables</strong> — original wiring from
                the early 20th century used rubber insulation with a lead sheath. The rubber
                degrades over time, becoming brittle and crumbling when disturbed. This is a common
                C1 or C2 finding in London properties that have never been rewired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Imperial conduit and fittings</strong> — older installations may use
                imperial-sized conduit (such as 3/4 inch) for which modern fittings are no longer
                available. Extensions and modifications have sometimes mixed imperial and metric
                fittings with adapter bushes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing deficiencies</strong> — many Victorian properties were originally
                wired without a protective earth conductor. Earthing may have been retrofitted using
                the gas or water pipes, which is no longer acceptable. Some properties still lack a
                proper earth connection to the DNO supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>UKPN supply issues</strong> — UK Power Networks is the DNO for London. Older
                properties may have deteriorated service cut-outs, inadequate earthing provision at
                the supply point, or PME (Protective Multiple Earthing) terminations that are not
                suitable for the installation type. The inspector may need to recommend a UKPN visit
                to assess or upgrade the supply-side equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lath-and-plaster walls</strong> — tracing cables through lath-and-plaster
                walls without causing damage is difficult. Cable routes are unpredictable, and the
                inspector may need to record FI (Further Investigation) observations where cables
                cannot be accessed without destructive investigation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in London should allow extra time when quoting EICRs for Victorian
          properties. A three-bedroom Victorian terraced house in inner London may take 4 to 5 hours
          compared to 2 to 3 hours for a modern flat of the same size.
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
          In London, tenants and landlords should prepare by ensuring clear access to the consumer
          unit and meter, removing items stored in front of electrical equipment, and making all
          rooms accessible. The inspector may need to move furniture to access socket outlets for
          testing.
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
                environments). London commercial landlords should factor this into lease
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
          installation is in poor condition. For example, a Victorian London property with multiple
          C3 observations may have a recommended next inspection of 3 years rather than the standard
          5 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in London',
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
                registers for London-based inspectors is the most reliable way to find a qualified
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
          Be cautious of extremely low-priced EICR offers in London. An EICR for a two-bedroom flat
          that is priced below £150 may indicate a rushed inspection, inadequate testing, or an
          unqualified inspector. A thorough EICR takes time and requires expensive calibrated test
          instruments.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in London',
    content: (
      <>
        <p>
          London is one of the largest and most lucrative markets for EICR work in the UK. The
          combination of a massive private rented sector, active borough enforcement, and a high
          proportion of older properties creates consistent demand for qualified inspectors.
        </p>
        <p>
          To maximise efficiency and professionalism, electricians carrying out EICRs in London
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

export default function EICRLondonPage() {
  return (
    <GuideTemplate
      title="EICR London | Electrical Safety Certificate Cost 2026"
      description="EICR costs in London for 2026. Landlord legal requirements, London borough enforcement, Victorian wiring challenges, observation codes explained, and how to find a qualified inspector. Prices from £150 for a flat to £500+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR London:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in London — costs by property type, landlord legal requirements, London borough enforcement, Victorian wiring challenges, observation codes, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in London"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
