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
  { label: 'EICR Edinburgh', href: '/guides/eicr-edinburgh' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'edinburgh-costs', label: 'EICR Cost in Edinburgh' },
  { id: 'scottish-legal-requirements', label: 'Scottish Legal Requirements' },
  { id: 'repairing-standard', label: 'The Repairing Standard' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'tenement-challenges', label: 'Edinburgh Tenement Challenges' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Regulation 712.534.101). It records the condition of wiring, consumer units, protective devices, earthing, and bonding with classified observation codes.",
  "Edinburgh EICR costs typically range from £110 to £450 depending on property size. A two-bedroom flat costs £150 to £250, while a three-bedroom house costs £200 to £350. Edinburgh prices are higher than the Scottish average due to the city's premium labour rates and the complexity of its tenement housing stock.",
  'Scotland has different landlord rules from England and Wales. Under the Housing (Scotland) Act 2006, landlords must meet the Repairing Standard, which requires that the electrical installation is in a reasonable state of repair and proper working order. An EICR is the standard way to demonstrate compliance. Landlords must carry out an EICR before the start of a tenancy and at least every five years.',
  'Edinburgh has a vast stock of tenement flats, many dating from the Georgian and Victorian eras. These properties present unique challenges including shared electrical supplies, communal stairwell installations, stone construction that complicates cable routing, and multiple phases of wiring from different decades.',
  'SPEN (SP Energy Networks) is the Distribution Network Operator for Edinburgh. Supply-side issues such as deteriorated cut-outs, shared intake positions in tenement stairwells, and absent earthing provision are common findings during Edinburgh EICRs.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Edinburgh?',
    answer:
      'EICR costs in Edinburgh vary by property size. A one-bedroom flat typically costs £110 to £200. A two-bedroom flat costs £150 to £250. A three-bedroom house costs £200 to £350. Larger properties with multiple consumer units cost more. Edinburgh HMOs can cost £350 to £700 depending on the number of consumer units and circuits. Edinburgh prices are above the Scottish average due to higher labour rates and the prevalence of complex tenement properties.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Scotland?',
    answer:
      'Yes. Under the Housing (Scotland) Act 2006, landlords must meet the Repairing Standard, which includes ensuring the electrical installation is in a reasonable state of repair and proper working order. The Scottish Government requires landlords to obtain an EICR before the start of a tenancy and at least every five years. This is enforced through the First-tier Tribunal for Scotland (Housing and Property Chamber), where tenants can raise complaints about properties that do not meet the Repairing Standard.',
  },
  {
    question: 'How is Scottish landlord law different from England?',
    answer:
      'Scotland has its own tenancy law under the Housing (Scotland) Act 2006 and the Private Housing (Tenancies) (Scotland) Act 2016. The Repairing Standard (rather than the English Electrical Safety Standards Regulations 2020) governs electrical safety in rented properties. Enforcement is through the First-tier Tribunal for Scotland rather than local authority civil penalties. Scotland also has different HMO licensing arrangements administered by local councils. The requirement for five-yearly EICRs is similar in practice, but the legal framework is distinct.',
  },
  {
    question: 'What happens if my Edinburgh property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord must arrange for remedial work. Under the Repairing Standard, the electrical installation must be in a reasonable state of repair. Failure to address C1 and C2 observations means the property may not meet the Repairing Standard, and the tenant can apply to the First-tier Tribunal for Scotland for an order requiring the landlord to carry out repairs.',
  },
  {
    question: 'How long does an EICR take in Edinburgh?',
    answer:
      'The duration depends on property size and the number of circuits. A one-bedroom tenement flat with a single consumer unit typically takes 2 to 3 hours. A three-bedroom house takes 3 to 4 hours. Edinburgh tenement flats often take longer due to the age of the wiring, stone walls that prevent cable tracing, communal supply arrangements, and access challenges in stairwell cupboards. HMOs with multiple consumer units can take a full day.',
  },
  {
    question: 'Who is the DNO for Edinburgh?',
    answer:
      'The Distribution Network Operator for Edinburgh is SPEN (SP Energy Networks). If an EICR identifies supply-side issues such as a deteriorated cut-out, absent earth terminal, or problems with the supply cable, the electrician may need to request a visit from SP Energy Networks to assess or upgrade the supply-side equipment. Supply enquiries can be made through the SP Energy Networks website or by calling 105.',
  },
  {
    question: 'Do I need an EICR for an Edinburgh flat I own and live in?',
    answer:
      "There is no legal requirement for owner-occupiers to obtain an EICR. However, it is strongly recommended every 10 years (or every 5 years for properties over 25 years old) as best practice under BS 7671 Regulation 134.2. Given the age of much of Edinburgh's housing stock, periodic inspection is particularly important. If you are selling the property, you will need a Home Report (which is mandatory in Scotland) but this does not include an EICR — a separate EICR is recommended.",
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
          Unsatisfactory. An Unsatisfactory result means the installation has one or more C1 (danger
          present) or C2 (potentially dangerous) observations that require remedial work.
        </p>
      </>
    ),
  },
  {
    id: 'edinburgh-costs',
    heading: 'EICR Cost in Edinburgh (2026 Prices)',
    content: (
      <>
        <p>
          Edinburgh EICR costs are above the Scottish average, reflecting the city's higher labour
          rates and the complexity of its predominantly tenement housing stock. The city's large
          private rented sector and active Festival Fringe short-let market also contribute to
          demand. Below are typical 2026 prices for Edinburgh EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £110 to £200. Typically 3 to 5
                circuits, single consumer unit. Common in Edinburgh's New Town and converted
                tenement properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £150 to £250. Usually 5 to 8 circuits.
                Purpose-built flats in modern developments are generally quicker to inspect than
                traditional tenement flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £200 to £350. Expect 8 to 15 circuits.
                Victorian and Edwardian houses in Morningside, Marchmont, and Bruntsfield often take
                longer due to aged wiring and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £300 to £450+. Larger properties in
                Murrayfield, Cramond, and The Grange may have multiple consumer units or
                outbuildings that increase the scope of inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £350 to £700+. Edinburgh has a
                significant number of HMOs, particularly around the university areas and in the Old
                Town. HMOs have multiple consumer units, fire alarm systems, and emergency lighting
                that all form part of the inspection scope.
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
    id: 'scottish-legal-requirements',
    heading: 'Scottish Legal Requirements for EICRs',
    content: (
      <>
        <p>
          Scotland has its own legal framework for private rented housing, which is distinct from
          England and Wales. The Electrical Safety Standards in the Private Rented Sector (England)
          Regulations 2020 do not apply in Scotland. Instead, Scottish landlords' electrical safety
          obligations come from different legislation:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing (Scotland) Act 2006 — Repairing Standard</strong> — this is the
                primary legal framework for property condition in Scottish private rented housing.
                The Repairing Standard requires that the electrical installation is in a reasonable
                state of repair and in proper working order. An EICR is the standard way to
                demonstrate compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five-yearly EICR requirement</strong> — the Scottish Government requires
                landlords to obtain an EICR before the start of a new tenancy and at least every
                five years thereafter. The EICR must be carried out by a competent person — an
                electrician registered with a competent person scheme such as NICEIC, NAPIT, or
                SELECT (the Scottish trade body for electrical contractors).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private Housing (Tenancies) (Scotland) Act 2016</strong> — this Act
                introduced the Private Residential Tenancy (PRT), which replaced the assured
                shorthold tenancy in Scotland. Under a PRT, the landlord has ongoing obligations to
                maintain the property to the Repairing Standard, including electrical safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement — First-tier Tribunal</strong> — unlike England (where local
                authorities enforce and can impose civil penalties), in Scotland enforcement is
                through the First-tier Tribunal for Scotland (Housing and Property Chamber). Tenants
                who believe their property does not meet the Repairing Standard can apply to the
                Tribunal, which can order the landlord to carry out repairs. The Tribunal can also
                make a Repairing Standard Enforcement Order (RSEO).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration</strong> — all landlords in Scotland must be
                registered with their local council. The City of Edinburgh Council maintains a
                landlord register and can refuse or revoke registration for landlords who fail to
                meet their obligations, including property safety requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Edinburgh landlords should be aware that Scotland's legal framework, while different from
          England's, imposes equivalent obligations regarding electrical safety. The practical
          requirement is the same: obtain an EICR before a new tenancy and renew it every five
          years.
        </p>
      </>
    ),
  },
  {
    id: 'repairing-standard',
    heading: 'The Repairing Standard and Electrical Safety',
    content: (
      <>
        <p>
          The Repairing Standard is the minimum physical standard that all private rented properties
          in Scotland must meet. It is set out in the Housing (Scotland) Act 2006 and covers the
          structure, installations, fixtures, and fittings of the property. The electrical
          requirements are particularly relevant to EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reasonable state of repair</strong> — the electrical installation (wiring,
                consumer unit, protective devices, earthing, bonding, sockets, switches, and light
                fittings) must be in a reasonable state of repair. An Unsatisfactory EICR with C1 or
                C2 observations is strong evidence that the installation does not meet this
                requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proper working order</strong> — all electrical installations and fixtures
                must be in proper working order. This includes socket outlets, light fittings,
                switches, the consumer unit, and all protective devices (MCBs, RCDs, RCBOs). The
                EICR tests verify that these components function correctly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — the Repairing Standard also requires satisfactory
                provision for detecting fires and for giving warning in the event of fire. In
                Scotland, all rented properties must have interlinked fire alarms, heat detectors,
                and carbon monoxide detectors. These systems are typically inspected alongside the
                EICR, though they require separate certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant rights</strong> — if a tenant believes the electrical installation
                does not meet the Repairing Standard, they can apply to the First-tier Tribunal for
                Scotland. The Tribunal can inspect the property, order an EICR, and require the
                landlord to carry out remedial work. Non-compliance with a Tribunal order is a
                criminal offence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Edinburgh landlords should maintain current EICRs and address any observations promptly.
          The Repairing Standard provides tenants with a clear route to enforce their rights through
          the First-tier Tribunal, making compliance essential.
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
              Edinburgh properties include exposed live conductors in tenement stairwell cupboards,
              severely damaged wiring, and missing consumer unit covers in communal areas.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              Edinburgh include absent or inadequate earthing (particularly in older tenement
              flats), lack of RCD protection on socket circuits (BS 7671 Section 411), overloaded
              circuits in properties with electric storage heating, and deteriorated cable
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
              investigation is needed. This is very common in Edinburgh tenement flats where wiring
              is concealed within thick stone walls, under floorboards, or routed through communal
              areas that cannot be accessed during the inspection.
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
    id: 'tenement-challenges',
    heading: 'Edinburgh Tenement Challenges',
    content: (
      <>
        <p>
          Edinburgh's housing stock is dominated by tenement flats — stone-built apartment buildings
          typically dating from the Georgian era (New Town), Victorian era, and Edwardian era. The
          city has more tenement flats per capita than any other UK city. These properties present
          distinctive challenges during an EICR:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stone wall construction</strong> — Edinburgh tenements are built with thick
                stone walls (often 600mm or more). Cable routes through stone walls are difficult to
                trace, and surface-mounted wiring or trunking is often used where chasing is not
                practical. The inspector may record FI observations where cables enter or pass
                through stone walls and cannot be visually inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal stairwell installations</strong> — tenement stairwells often have
                their own electrical installation for lighting and, in some cases, entry-phone
                systems. The supply arrangement for stairwell lighting may be shared between the
                flats or provided by a separate communal supply. Inspectors need to establish the
                extent of the installation being inspected and whether the stairwell installation is
                included or excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared supply intakes</strong> — many Edinburgh tenements have all the
                electrical meters and supply cut-outs located in a communal stairwell cupboard. This
                can make it difficult to identify which supply belongs to which flat, and access to
                the cupboard may require coordination with other residents or the factor (property
                management company).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPEN supply issues</strong> — SP Energy Networks (SPEN) is the DNO for
                Edinburgh. Older tenements may have deteriorated service cut-outs, inadequate
                earthing provision, or supply cables that have been in service for decades. The
                inspector may need to recommend an SP Energy Networks visit to assess or upgrade the
                supply-side equipment. In tenements, supply-side work may affect multiple flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple phases of wiring</strong> — Edinburgh tenement flats have often
                been rewired or partially rewired multiple times. It is common to find original lead
                or rubber-insulated cables alongside PVC wiring from different decades. Some
                circuits may have been added informally without proper documentation, making the
                inspection more complex.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric storage heating</strong> — many Edinburgh tenement flats use
                electric storage heaters on an Economy 7 or Economy 10 tariff. These high-load
                circuits require adequate cable sizing, dedicated MCBs or RCBOs, and proper
                earthing. Older storage heater circuits are a common source of C2 observations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in Edinburgh should allow extra time when quoting EICRs for tenement
          flats. A two-bedroom tenement flat may take 3 to 4 hours compared to 2 hours for a modern
          flat of the same size. Access to the communal stairwell cupboard should be confirmed
          before the inspection date.
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
          In Edinburgh, tenants and landlords should prepare by ensuring clear access to the
          consumer unit and meter. In tenement flats, the meter and supply cut-out are often in a
          communal stairwell cupboard — ensure you have a key or have arranged access with the
          factor. Remove items stored in front of electrical equipment and make all rooms
          accessible.
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
          554.4 establishes that installations must be periodically inspected at intervals suited to
          the property type:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented property (Scotland)</strong> — at least every 5 years (as
                required under the Repairing Standard). The EICR must also be obtained before the
                start of a new tenancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied domestic</strong> — every 10 years is the recommended
                interval as best practice. Properties over 25 years old or with known wiring issues
                should be inspected every 5 years. Given the age of Edinburgh's tenement stock,
                five-yearly inspections are advisable for most properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises</strong> — every 5 years (or 3 years for higher-risk
                environments). Edinburgh commercial landlords should factor this into lease
                obligations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — a new EICR is recommended (and required for
                rented properties under the Repairing Standard) whenever a property changes
                occupant, even if the previous EICR has not expired.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval than the standard maximum if the
          installation is in poor condition. For example, an Edinburgh tenement flat with multiple
          C3 observations and mixed-era wiring may have a recommended next inspection of 3 years
          rather than the standard 5 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Edinburgh',
    content: (
      <>
        <p>
          The EICR must be carried out by a person who is qualified and competent. In Scotland,
          SELECT (the trade body for the Scottish electrotechnical industry) is the primary
          competent person scheme, alongside national bodies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — SELECT, NICEIC, NAPIT, ELECSA, and other
                approved bodies maintain registers of qualified electricians. SELECT is Scotland's
                leading trade body and searching their register for Edinburgh-based inspectors is a
                reliable way to find a qualified person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — the inspector should hold City & Guilds 2391
                (Inspection and Testing) or City & Guilds 2395 (Initial Verification and
                Certification), or the combined 2394/2395 qualification. They should also hold a
                current BS 7671 qualification (C&G 2382 18th Edition). Scottish Vocational
                Qualifications (SVQs) in electrical installation are also relevant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenement experience</strong> — when choosing an inspector for an Edinburgh
                tenement flat, look for an electrician with specific experience of tenement
                properties. The unique challenges of Edinburgh tenements (stone walls, communal
                supplies, stairwell installations) mean that an inspector unfamiliar with them may
                miss issues or underestimate the time required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of extremely low-priced EICR offers in Edinburgh. An EICR for a two-bedroom
          tenement flat that is priced below £100 may indicate a rushed inspection, inadequate
          testing, or an unqualified inspector. A thorough EICR takes time and requires expensive
          calibrated test instruments.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh is one of Scotland's strongest markets for EICR work. The city's large private
          rented sector, growing short-let market (Festival Fringe and Airbnb), active council
          enforcement, and vast stock of tenement flats create consistent demand for qualified
          inspectors.
        </p>
        <p>
          To maximise efficiency and professionalism, electricians carrying out EICRs in Edinburgh
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
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords must meet the Repairing Standard — the electrician who delivers the
                  quote on the day of the EICR is most likely to win the remedial work.
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

export default function EICREdinburghPage() {
  return (
    <GuideTemplate
      title="EICR Edinburgh | Electrical Safety Certificate 2026"
      description="EICR costs in Edinburgh for 2026. Scottish landlord requirements under the Housing (Scotland) Act 2006, Repairing Standard, tenement property challenges, observation codes explained, and how to find a qualified inspector. Prices from £110 for a flat to £450+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Edinburgh:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Edinburgh — costs by property type, Scottish landlord requirements under the Repairing Standard, tenement property challenges, observation codes, and how to find a qualified inspector."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
