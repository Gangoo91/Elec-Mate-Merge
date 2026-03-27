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
  { label: 'EICR Cardiff', href: '/guides/eicr-cardiff' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'cardiff-costs', label: 'EICR Cost in Cardiff' },
  { id: 'legal-requirements', label: 'Legal Requirements in Wales' },
  { id: 'rent-smart-wales', label: 'Rent Smart Wales Requirements' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'cardiff-properties', label: 'Cardiff Property Challenges' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR (Electrical Installation Condition Report) is a formal inspection of a property\'s fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Regulation 712.534.101). It records the condition of wiring, consumer units, protective devices, earthing, and bonding with classified observation codes.',
  'Cardiff EICR costs typically range from £100 to £400 depending on property size. A two-bedroom flat costs £130 to £220, while a three-bedroom house costs £180 to £300. Prices are close to the national average for England and Wales.',
  'Wales has its own landlord registration and licensing scheme through Rent Smart Wales. All landlords in Wales must be registered, and those who self-manage must also be licensed. While the Electrical Safety Standards Regulations 2020 apply to England only, Welsh landlords have obligations under the Renting Homes (Wales) Act 2016 and the Fitness for Human Habitation standard, which include electrical safety.',
  'Cardiff has a large stock of Victorian terraces, particularly in Cathays, Roath, and Splott, alongside student HMOs near Cardiff University and the University of South Wales. These properties frequently present aged wiring and earthing deficiencies.',
  'NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the Distribution Network Operator for Cardiff. Supply-side issues such as deteriorated cut-outs and absent earthing provision are common findings in older Cardiff properties.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Cardiff?',
    answer:
      'EICR costs in Cardiff vary by property size. A one-bedroom flat typically costs £100 to £180. A two-bedroom flat costs £130 to £220. A three-bedroom house costs £180 to £300. Larger properties with multiple consumer units cost more. HMOs in student areas such as Cathays and Roath can cost £300 to £600 depending on the number of consumer units and circuits. Cardiff prices are close to the national average.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Wales?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to England only — not Wales. However, Welsh landlords have obligations under the Renting Homes (Wales) Act 2016. Under this Act, rental properties must meet the Fitness for Human Habitation standard, which includes electrical safety. While a specific five-yearly EICR requirement does not exist in Welsh law in the same way as in England, an EICR is the standard way to demonstrate that the electrical installation is safe. Rent Smart Wales guidance strongly recommends regular EICRs, and most letting agents and landlord insurers require them.',
  },
  {
    question: 'What is Rent Smart Wales?',
    answer:
      'Rent Smart Wales is the landlord registration and licensing scheme for Wales. All landlords who rent property in Wales must register with Rent Smart Wales. Landlords who self-manage their properties must also obtain a licence. Letting agents who manage properties on behalf of landlords must be licensed too. Rent Smart Wales training covers landlord obligations including property safety. While Rent Smart Wales does not specifically mandate EICRs at fixed intervals, it emphasises that landlords must ensure their properties are safe, and an EICR is the accepted method of demonstrating electrical safety.',
  },
  {
    question: 'What happens if my Cardiff property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord should arrange for remedial work promptly. Under the Renting Homes (Wales) Act 2016, the property must be fit for human habitation — an Unsatisfactory EICR could indicate the property does not meet this standard. Landlords should treat C1 and C2 observations as requiring urgent remedial action.',
  },
  {
    question: 'How long does an EICR take in Cardiff?',
    answer:
      'The duration depends on property size and the number of circuits. A one-bedroom flat with a single consumer unit typically takes 2 to 3 hours. A three-bedroom house takes 3 to 4 hours. Victorian terraces in Cathays and Roath often take longer due to aged wiring and complex layouts. HMOs with multiple consumer units can take a full day.',
  },
  {
    question: 'Who is the DNO for Cardiff?',
    answer:
      'The Distribution Network Operator for Cardiff is NGED (National Grid Electricity Distribution), formerly known as Western Power Distribution (WPD). If an EICR identifies supply-side issues such as a deteriorated cut-out, absent earth terminal, or problems with the supply cable, the electrician may need to request a visit from NGED to assess or upgrade the supply-side equipment. Supply enquiries can be made through their website or by calling 105.',
  },
  {
    question: 'Do I need an EICR for a Cardiff flat I own and live in?',
    answer:
      'There is no legal requirement for owner-occupiers to obtain an EICR. However, it is strongly recommended every 10 years (or every 5 years for properties over 25 years old) as best practice under BS 7671 Regulation 134.2. If you are selling the property, an EICR is not legally required but mortgage lenders and conveyancers increasingly request one.',
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
    description: 'Study for C&G 2391 with structured training modules covering periodic inspection.',
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
          property's fixed electrical installation. It assesses the condition of the wiring, consumer
          unit, protective devices, earthing and bonding, sockets, switches, and all fixed electrical
          equipment.
        </p>
        <p>
          The EICR is documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Regulation 712.534.101), which requires that an Electrical Installation Condition Report
          is used for periodic inspection and testing of existing installations — not an Electrical
          Installation Certificate, which is for new work only.
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
          Unsatisfactory. An Unsatisfactory result means the installation has one or more C1
          (danger present) or C2 (potentially dangerous) observations that require remedial work.
        </p>
      </>
    ),
  },
  {
    id: 'cardiff-costs',
    heading: 'EICR Cost in Cardiff (2026 Prices)',
    content: (
      <>
        <p>
          Cardiff EICR costs are close to the national average. The city has a growing private rented
          sector and a significant student population, both of which drive demand for electrical
          inspections. Below are typical 2026 prices for Cardiff EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £100 to £180. Typically 3 to 5
                circuits, single consumer unit. Common in Cardiff Bay developments and converted
                Victorian properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £130 to £220. Usually 5 to 8 circuits.
                Purpose-built flats in Cardiff Bay and the city centre are generally quicker to
                inspect than converted Victorian terraces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £300. Expect 8 to 15 circuits.
                Victorian terraces in Cathays, Roath, and Splott often take longer due to aged
                wiring and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £280 to £400+. Larger properties in
                Pontcanna, Llandaff, and Cyncoed may have multiple consumer units or extensions
                that increase the scope of inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £300 to £600+. Cardiff has a
                large number of HMOs, particularly in Cathays and Roath near Cardiff University.
                HMOs have multiple consumer units, fire alarm systems, and emergency lighting that
                all form part of the inspection scope.
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
    heading: 'Legal Requirements for EICRs in Wales',
    content: (
      <>
        <p>
          Wales has a different legal framework for private rented housing compared to England. The
          Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 do not
          apply in Wales. However, Welsh landlords have significant legal obligations regarding
          electrical safety:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renting Homes (Wales) Act 2016</strong> — this Act, which came into force on
                1 December 2022, replaced assured shorthold tenancies in Wales with "occupation
                contracts". Under the Act, landlords must ensure that rental properties are fit for
                human habitation at the start of the contract and throughout its duration. Electrical
                safety is a key component of the fitness standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fitness for Human Habitation</strong> — the Welsh Government's Fitness for
                Human Habitation guidance specifies that the electrical installation must be safe.
                While the guidance does not mandate a specific inspection interval, an EICR is the
                standard and accepted way to demonstrate compliance. Most legal and industry experts
                recommend five-yearly EICRs as best practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent Smart Wales registration</strong> — all landlords in Wales must
                register with Rent Smart Wales. Self-managing landlords must also obtain a licence.
                Rent Smart Wales training covers property safety obligations. While Rent Smart Wales
                does not currently mandate EICRs at specific intervals, it emphasises landlords'
                duty to maintain safe electrical installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Cardiff Council operates mandatory HMO licensing.
                A valid EICR is a condition of HMO licences in Cardiff, providing a specific legal
                requirement for HMO landlords to obtain and maintain current electrical safety
                certificates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh Building Regulations</strong> — Part P (Electrical Safety) of the
                Building Regulations applies in Wales as in England. Notifiable electrical work
                must be either carried out by a registered competent person or notified to Building
                Control. This includes consumer unit replacements and new circuit installations
                that may be identified as necessary following an EICR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Although Wales does not have the same prescriptive five-yearly EICR requirement as England,
          the practical reality is that most Cardiff landlords obtain regular EICRs. Letting agents,
          insurers, and mortgage lenders typically require them, and the Fitness for Human Habitation
          standard means landlords need to demonstrate electrical safety — an EICR is the recognised
          way to do so.
        </p>
      </>
    ),
  },
  {
    id: 'rent-smart-wales',
    heading: 'Rent Smart Wales and EICR Requirements',
    content: (
      <>
        <p>
          Rent Smart Wales is the mandatory registration and licensing scheme for landlords and
          letting agents in Wales. Understanding how it interacts with EICR requirements is important
          for Cardiff landlords:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registration obligation</strong> — every landlord who rents property in
                Wales must register with Rent Smart Wales. This includes landlords who use a letting
                agent. Registration provides Rent Smart Wales with a record of all rental properties
                in Wales and enables enforcement of landlord obligations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licensing for self-managing landlords</strong> — landlords who manage their
                own properties (rather than using a licensed letting agent) must obtain a licence
                from Rent Smart Wales. The licensing process includes mandatory training that covers
                property safety obligations, including electrical safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR as best practice</strong> — while Rent Smart Wales does not currently
                mandate EICRs at a specific frequency, its guidance emphasises that landlords must
                ensure their properties are safe. An EICR every five years is the widely accepted
                best practice, and most letting agents and landlord insurers require one. Cardiff
                Council's HMO licensing specifically requires a valid EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement</strong> — Rent Smart Wales can revoke a landlord's registration
                or licence for failure to comply with landlord obligations. Cardiff Council can also
                take enforcement action under the Renting Homes (Wales) Act if a property is found
                to be unfit for human habitation due to electrical safety concerns.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cardiff landlords should maintain current EICRs for all rental properties as a matter of
          best practice and to demonstrate compliance with the Fitness for Human Habitation standard.
          The Welsh Government has indicated it may introduce more specific electrical safety
          requirements in future, making early compliance a sensible approach.
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
              Cardiff properties include exposed live conductors, damaged wiring in converted
              Victorian terraces, and missing consumer unit covers.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              Cardiff include absent or inadequate earthing (particularly in older Cathays terraces),
              lack of RCD protection on socket circuits (BS 7671 Section 411), overloaded circuits,
              and deteriorated cable insulation.
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
              investigation is needed. This is common in Cardiff's Victorian terraces where wiring is
              concealed in plaster, under floorboards, or behind fixed kitchen units that cannot be
              moved during the inspection.
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
    id: 'cardiff-properties',
    heading: 'Cardiff Property Challenges',
    content: (
      <>
        <p>
          Cardiff's housing stock includes a large number of Victorian terraces, particularly in the
          inner city areas of Cathays, Roath, Splott, and Adamsdown. Combined with newer Cardiff Bay
          developments and student HMOs, the city presents a range of challenges for EICR inspectors:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terrace wiring</strong> — Cathays, Roath, and Splott have
                extensive streets of Victorian terraces, many of which are rented to students or
                young professionals. These properties frequently have aged wiring, lead-sheathed
                cables, and earthing deficiencies. Multiple phases of electrical work over the
                decades create complex installations with mixed wiring systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO conversions</strong> — Cathays has one of the highest
                concentrations of student HMOs in Wales. Properties originally designed as family
                homes have been converted with additional rooms, en-suite bathrooms, and communal
                kitchens. These conversions add circuits and consumer units, and the quality of
                conversion work varies significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing deficiencies</strong> — many older Cardiff properties were
                originally wired without a protective earth conductor. Some still rely on gas or
                water pipe earthing, which is no longer acceptable. Properties converted to HMOs
                may have inadequate earthing arrangements for the increased electrical load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>NGED supply issues</strong> — NGED (formerly WPD) is the DNO for Cardiff.
                Older properties may have deteriorated service cut-outs, inadequate earthing
                provision at the supply point, or supply cables that need replacement. The inspector
                may need to recommend an NGED visit to assess or upgrade the supply-side equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp and moisture</strong> — some Cardiff properties, particularly those in
                lower-lying areas and Victorian terraces without damp-proof courses, suffer from
                damp issues that can affect the electrical installation. Moisture ingress into
                consumer units, sockets, and cable routes is a common finding that may result in
                C2 observations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in Cardiff should allow extra time when quoting EICRs for Victorian
          terraces and HMO conversions. A three-bedroom Victorian terrace in Cathays may take 4 to 5
          hours compared to 2 to 3 hours for a modern flat of the same size.
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
                Schedules of Circuit Details and Test Results (as required by Regulation
                712.534.101). The report includes observations with classification codes, an overall
                assessment, and a recommended date for the next inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In Cardiff, tenants and landlords should prepare by ensuring clear access to the consumer
          unit and meter, removing items stored in front of electrical equipment, and making all
          rooms accessible. In HMO properties, the inspector will need access to every individual
          room — coordinate with all tenants in advance.
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
          The recommended frequency of EICRs depends on the property type and use. BS 7671 Regulation
          554.4 establishes that installations must be periodically inspected at intervals suited to
          the property type:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented property (Wales)</strong> — every 5 years is the recommended
                best practice. While Wales does not have the same prescriptive legal requirement as
                England, the Fitness for Human Habitation standard under the Renting Homes (Wales)
                Act means landlords should maintain current EICRs.
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
                environments). Cardiff commercial landlords should factor this into lease
                obligations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — a new EICR is recommended whenever a property
                changes occupant, even if the previous EICR has not expired. This is particularly
                relevant in Cardiff's student rental market where properties change tenants annually.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval than the standard maximum if the
          installation is in poor condition. For example, a Victorian Cardiff terrace with multiple
          C3 observations may have a recommended next inspection of 3 years rather than the standard
          5 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Cardiff',
    content: (
      <>
        <p>
          The EICR must be carried out by a person who is qualified and competent. For HMO licensing
          purposes, Cardiff Council requires the inspector to be registered with a competent person
          scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, STROMA, and
                other approved bodies maintain registers of qualified electricians. Searching these
                registers for Cardiff-based inspectors is the most reliable way to find a qualified
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
          Be cautious of extremely low-priced EICR offers in Cardiff. An EICR for a two-bedroom flat
          that is priced below £80 may indicate a rushed inspection, inadequate testing, or an
          unqualified inspector. A thorough EICR takes time and requires expensive calibrated test
          instruments.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Cardiff',
    content: (
      <>
        <p>
          Cardiff offers good demand for EICR work. The city's growing private rented sector, large
          student population, HMO licensing requirements, and substantial stock of Victorian terraces
          create consistent work for qualified inspectors.
        </p>
        <p>
          To maximise efficiency and professionalism, electricians carrying out EICRs in Cardiff
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
                  . Landlords need to act promptly to maintain Fitness for Human Habitation — the
                  electrician who delivers the quote on the day of the EICR is most likely to win
                  the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRCardiffPage() {
  return (
    <GuideTemplate
      title="EICR Cardiff | Electrical Inspection Certificate 2026"
      description="EICR costs in Cardiff for 2026. Rent Smart Wales requirements, Welsh landlord obligations, Victorian terrace challenges, HMO licensing, observation codes explained, and how to find a qualified inspector. Prices from £100 for a flat to £400+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Cardiff:{' '}
          <span className="text-yellow-400">Electrical Inspection Certificate 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Cardiff — costs by property type, Rent Smart Wales requirements, Welsh landlord obligations, Victorian terrace challenges, observation codes, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Cardiff"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
