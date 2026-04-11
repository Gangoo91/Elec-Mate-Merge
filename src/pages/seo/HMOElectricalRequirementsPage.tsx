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
  Users,
  BellRing,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'HMO Electrical Requirements', href: '/hmo-electrical-requirements' },
];

const tocItems = [
  { id: 'what-is-hmo', label: 'What Counts as an HMO?' },
  { id: 'mandatory-licensing', label: 'Mandatory HMO Licensing' },
  { id: 'eicr-requirements', label: 'EICR Frequency & Scope' },
  { id: 'fire-detection', label: 'Fire Detection — BS 5839' },
  { id: 'emergency-lighting', label: 'Emergency Lighting — BS 5266' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'smoke-heat-detectors', label: 'Smoke & Heat Detectors Per Room' },
  { id: 'landlord-responsibilities', label: 'Landlord Responsibilities' },
  { id: 'typical-costs', label: 'Typical Costs for HMO Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Mandatory HMO licensing applies to properties with five or more occupants from two or more households. A valid EICR is a mandatory licence condition — without one the property cannot legally operate as an HMO.',
  'The EICR must be renewed at least every five years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, but most local authorities specify a three-year cycle in HMO licence conditions.',
  'Fire detection in HMOs must comply with BS 5839-6:2019. Most HMOs require at minimum a Grade D, LD2 system — interlinked mains-powered detectors in all escape routes and high-risk rooms.',
  'Emergency lighting to BS 5266-1:2016 is required in communal areas and escape routes in all but the smallest HMOs. Non-maintained battery-backed luminaires are the most common solution.',
  'RCD protection under Regulation 411.3.3 of BS 7671 is required on all socket-outlet circuits. Absence of RCD protection in shared areas is the most common C2 finding on HMO EICRs.',
  'Full HMO electrical compliance — EICR, fire alarm system, and emergency lighting — typically costs £2,000 to £8,000 for a five-bedroom HMO depending on the condition of the existing installation.',
];

const faqs = [
  {
    question: 'Does my HMO legally require an EICR?',
    answer:
      'Yes. A valid EICR is a mandatory condition of both mandatory and additional HMO licences issued by local authorities in England. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 also independently require an EICR for all private rented properties, including HMOs, at least every five years. Many councils impose shorter intervals — typically three years — as a licence condition. Operating an HMO without a valid EICR exposes landlords to civil penalties of up to £30,000 per breach and potential prosecution for operating an unlicensed HMO.',
  },
  {
    question: 'What fire detection system does an HMO need under BS 5839-6?',
    answer:
      'BS 5839-6:2019 is the relevant standard. The minimum requirement for most HMOs is a Grade D, LD2 system: interlinked mains-powered smoke detectors (with battery back-up) in all escape routes — hallways, landings, and stairwells — and heat detectors in every kitchen. Larger or higher-risk HMOs may require a Grade D, LD1 system (detectors in all rooms including bedrooms) or even a Grade A system with a central fire alarm panel. Your local fire authority or housing officer can advise on the correct category for your property.',
  },
  {
    question: 'Is emergency lighting compulsory in an HMO?',
    answer:
      'Emergency lighting to BS 5266-1:2016 is required in the communal areas and escape routes of most HMOs of three or more storeys, or with escape routes longer than 12 metres. HMO licence conditions issued by local authorities commonly specify BS 5266-compliant emergency lighting for these properties. Single-storey or small two-storey HMOs may not require formal emergency lighting, but self-contained emergency luminaires at the stair foot and final exit are strongly recommended and often required by licence conditions regardless.',
  },
  {
    question: 'How often must the EICR be renewed for an HMO?',
    answer:
      "The Electrical Safety Standards Regulations 2020 require an EICR at least every five years for all private rented properties. However, most HMO licence conditions specify a shorter interval of three years. The EICR must also be renewed on any change of the named licence holder, or when significant electrical work is carried out. Always check your specific local authority's HMO licence conditions rather than relying on the statutory minimum five-year interval.",
  },
  {
    question: 'What RCD protection is required in an HMO under BS 7671?',
    answer:
      'Regulation 411.3.3 of BS 7671:2018+A3:2024 requires 30mA RCD protection on all socket-outlet circuits rated up to 32A. In an HMO, every circuit serving bedrooms, kitchens, and communal areas must have RCD protection. Best practice is an RCBO (residual current circuit-breaker with overcurrent protection) on each circuit, providing individual fault discrimination so one circuit tripping does not affect all tenants. A single split-load RCD consumer unit is inadequate for most HMOs.',
  },
  {
    question: 'What are the penalties for running an HMO without a valid EICR?',
    answer:
      'Local authorities can impose civil penalties of up to £30,000 per breach under the Electrical Safety Standards Regulations 2020. Running an unlicensed HMO is also a criminal offence carrying an unlimited fine, and can result in a rent repayment order requiring the landlord to repay up to 12 months of rent received during the unlicensed period. These sanctions apply cumulatively — a landlord without a valid EICR while also operating an unlicensed HMO faces multiple simultaneous penalties.',
  },
  {
    question: 'Can the local authority inspect my HMO for electrical safety?',
    answer:
      'Yes. Local housing authorities have powers of entry to inspect HMOs under the Housing Act 2004 and can request a copy of the EICR within seven days. If electrical hazards are identified, they can serve a Hazard Awareness Notice, an Improvement Notice requiring works within 21 days, or a Prohibition Order preventing use of part or all of the property. Fire authorities also have independent inspection powers under the Regulatory Reform (Fire Safety) Order 2005 in relation to communal areas.',
  },
  {
    question: 'What is the minimum smoke detection requirement in each room of an HMO?',
    answer:
      'Under a Grade D, LD2 system (BS 5839-6:2019), optical smoke detectors are required in all escape routes — hallways, landings, and at the top of each stairwell. Heat detectors are required in kitchens instead of smoke detectors to avoid false alarms from cooking. Bedrooms are not required under LD2 but are required under LD1. Many local authorities now specify LD1 for all HMOs regardless of size, meaning a detector in every room including sleeping rooms. All detectors must be mains-powered and interlinked.',
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
    id: 'what-is-hmo',
    heading: 'What Counts as a House in Multiple Occupation?',
    content: (
      <>
        <p>
          A House in Multiple Occupation (HMO) is a property occupied by three or more people who
          form more than one household and share facilities such as a kitchen or bathroom. The
          definition is set out in the Housing Act 2004 and has important consequences for both
          licensing obligations and electrical safety requirements.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small HMO (3–4 occupants)</strong> — three or more people from two or more
                households sharing facilities. Not subject to mandatory licensing, but subject to
                additional licensing where the local authority operates a scheme. Still requires an
                EICR under the 2020 Regulations and basic fire detection under BS 5839-6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory licensing HMO (5+ occupants)</strong> — five or more people from
                two or more households. Subject to mandatory HMO licensing under the Housing Act
                2004. A valid EICR is a mandatory licence condition without exception.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 257 HMOs — converted blocks</strong> — purpose-built or converted
                blocks of flats where not all flats comply with the 1991 Building Regulations may be
                classed as HMOs even if individually self-contained. The s257 HMO definition catches
                many converted Victorian and Edwardian properties in England.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are unsure whether your property qualifies as an HMO, contact your local housing
          authority before letting. Operating an unlicensed HMO carries criminal liability
          regardless of whether the landlord was aware of the licensing requirement.
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
          specific conditions the landlord must satisfy throughout the licence period, typically
          five years.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Valid EICR mandatory</strong> — a current EICR (renewed every three to five
                years depending on the licence condition) must be held for the entire fixed
                electrical installation. The EICR must cover all circuits including communal areas,
                fire alarm wiring, emergency lighting, and any outbuilding circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Copy to council on demand</strong> — the licence holder must produce the
                EICR to the local authority within seven days of a written request. Failure to
                produce a valid report is a breach of licence conditions and can trigger a licence
                review.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial works — 28 days</strong> — where the EICR identifies C1 or C2
                observations, all remedial works must be completed within 28 days or sooner if the
                inspector specifies. Written confirmation of completion must be provided to tenants
                and to the council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing schemes</strong> — many local authorities operate
                additional licensing covering smaller HMOs with three or four occupants. These
                schemes typically impose identical EICR and fire safety conditions. Check with your
                local council whether additional licensing applies in your area.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          operate in parallel with HMO licensing. Both regimes independently require a valid EICR.
          Non-compliance with either can result in separate civil penalties of up to £30,000.
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
          The EICR for an HMO is significantly more complex than a standard residential property
          inspection. Multiple consumer units, fire alarm wiring, emergency lighting circuits, and a
          larger number of final circuits all increase the inspection scope, duration, and cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency</strong> — at least every five years under the 2020 Regulations,
                but most local authority HMO licence conditions specify every three years. Some
                councils require renewal on every change of the named licence holder. Always check
                your specific licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full installation scope</strong> — the EICR must cover the entire fixed
                electrical installation: main consumer unit(s), all final circuits in every room and
                communal area, fire alarm system wiring, emergency lighting circuits, outdoor
                lighting, and any ancillary buildings connected to the supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory outcome required</strong> — the EICR must record an overall
                satisfactory condition (no unresolved C1 or C2 observations) before submission to
                the local authority. An unsatisfactory EICR means the landlord is in breach of the
                licence condition until all remedial works are completed and confirmed in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified inspector</strong> — the inspector must be registered with a
                competent person scheme (NICEIC, NAPIT, or ELECSA) and hold City and Guilds 2391
                (Inspection and Testing) or equivalent, plus a current BS 7671 qualification.
                Experience with HMO installations and fire alarm systems is essential.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-detection',
    heading: 'Fire Detection in HMOs — BS 5839-6:2019',
    content: (
      <>
        <p>
          BS 5839-6:2019 is the British Standard for fire detection and fire alarm systems in
          domestic premises including HMOs. The standard uses a two-part classification: Grade
          (equipment quality) and Category (extent of coverage).
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D, LD2 — minimum for most HMOs</strong> — interlinked mains-powered
                smoke detectors with tamper-proof battery back-up, installed in all escape routes
                (hallways, landings, stairwells) and heat detectors in all high-risk rooms
                (kitchens). This is the minimum most local authorities accept for three-storey HMOs
                with up to six occupants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D, LD1 — higher-risk or larger HMOs</strong> — extends coverage to all
                rooms including every sleeping room. Required where the local fire authority or
                housing authority assesses a higher risk, or where licence conditions specify LD1.
                Many councils now apply LD1 to all HMOs regardless of size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade A — large or multi-storey HMOs</strong> — a central fire alarm panel
                with addressable detectors. Required for larger HMOs, purpose-built blocks, and any
                HMO exceeding three storeys where the local fire authority specifies a Grade A
                system. BS 5839-1:2017 applies to these commercial-grade systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat detectors in kitchens — mandatory</strong> — smoke detectors must not
                be installed in kitchens due to false alarm risk. BS 5839-6 requires a heat detector
                (fixed temperature 58°C or rate-of-rise type) interlinked with the rest of the
                detector network.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Fire alarm systems in HMOs are part of the fixed electrical installation and are within
          the scope of the <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>.
          The inspector will check the wiring, interlink operation, and functionality of all
          detectors and sounders. Faults in the fire alarm system will generate C2 or C1
          observations.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in HMOs — BS 5266-1:2016',
    content: (
      <>
        <p>
          BS 5266-1:2016 is the British Standard for emergency lighting. In HMOs, emergency lighting
          is required in communal areas and escape routes to enable safe evacuation during mains
          power failure in a fire or other emergency.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where required</strong> — all communal hallways, landings, stairwells, and
                final exits. In HMOs of three or more storeys, or where any escape route exceeds 12
                metres from any point, emergency lighting is a standard licence condition. Smaller
                two-storey HMOs may require only self-contained emergency luminaires at the stair
                foot and the final exit door.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-maintained luminaires</strong> — the most common type in HMOs. They only
                illuminate during a mains power failure, charging continuously from the mains. Must
                provide at least one hour's illumination at a minimum of 1 lux measured at floor
                level on the escape route centre line.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual full-duration test</strong> — BS 5266-1 requires monthly 30-second
                function tests and an annual full-duration discharge test of one to three hours.
                Records must be kept in a logbook. The EICR inspector will verify that testing
                records are current and that all luminaires operate correctly on test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting within EICR scope</strong> — the inspector will verify
                correct installation, appropriate circuit connection, and satisfactory operation on
                test. Defective emergency lighting is commonly recorded as a C2 observation on HMO
                EICRs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection in HMOs — Regulation 411.3.3',
    content: (
      <>
        <p>
          RCD protection is one of the most critical — and most frequently deficient — electrical
          safety measures in HMOs. Regulation 411.3.3 of BS 7671:2018+A3:2024 sets out the
          requirement that applies without exception to all new and existing HMO installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD on all socket circuits</strong> — every socket-outlet circuit rated
                up to 32A must be protected by a 30mA RCD. This applies to every room in the HMO:
                individual bedrooms, shared kitchens, communal lounges, and utility areas. There are
                no exemptions for older properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO per circuit — best practice for HMOs</strong> — an RCBO (Residual
                Current Circuit-Breaker with Overcurrent Protection) on each circuit provides
                individual fault discrimination. When one circuit trips, others remain live. This is
                essential in HMOs where a single consumer unit trip affects all tenants
                simultaneously. A split-load single-RCD board is inadequate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Most common C2 finding</strong> — absence of RCD protection on socket
                circuits is the single most common C2 observation in HMO EICRs. Properties with
                consumer units installed before 2008 are particularly likely to fail on this point.
                Landlords should budget for consumer unit replacement as a likely compliance cost
                when purchasing older HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom and outdoor circuits</strong> — under Regulation 701.411.3.3, all
                circuits supplying bathroom zones require additional RCD protection. Outdoor sockets
                used by the HMO (garden, bin store, outbuildings) must also have 30mA RCD protection
                under Regulation 411.3.3.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smoke-heat-detectors',
    heading: 'Smoke and Heat Detectors — Room-by-Room Requirements',
    content: (
      <>
        <p>
          The placement of smoke and heat detectors in an HMO is determined by the required BS
          5839-6 category and the specific licence conditions imposed by the local housing
          authority. The following guidance applies to a typical Grade D, LD2 system in a
          five-bedroom three-storey HMO.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hallways and landings</strong> — optical smoke detector on each floor level.
                Position within 1.5m of each bedroom door, and within 7.5m of any other point on the
                escape route. Must be interlinked with all other detectors in the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stairwells</strong> — optical smoke detector at the top of each stairwell.
                In properties of four or more storeys, a detector on each intermediate landing is
                recommended. The stairwell detector protects the main vertical escape route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchens</strong> — heat detector only (not smoke, to avoid false alarms
                from cooking). A fixed-temperature heat detector at 58°C, or a combined
                fixed-temperature and rate-of-rise type, is standard. The heat detector must be
                interlinked with the full smoke detector network.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal lounges and living rooms</strong> — optical smoke detector required
                under LD1, and recommended under LD2. Many local authority licence conditions
                require detectors in all communal rooms regardless of the LD2 category minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual bedrooms</strong> — required under LD1 but not under LD2. Many
                councils now specify LD1 category for all HMOs, meaning a detector in every sleeping
                room. Where provided, optical detectors are preferred over ionisation types in
                sleeping areas.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All detectors must be mains-powered with tamper-proof battery back-up (Grade D minimum).
          Battery-only detectors do not comply with BS 5839-6 requirements for HMOs. Interconnection
          should be hard-wired where practicable; RF wireless interlink is acceptable where wiring
          is not feasible.
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
          HMO landlords have a comprehensive and ongoing set of electrical safety obligations. These
          are not one-off tasks at the point of licensing — they require continuous management
          throughout the licence period and between licence renewals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commission and renew the EICR on schedule</strong> — engage a NICEIC, NAPIT,
                or ELECSA registered inspector at the frequency specified in your licence conditions
                (typically three years). Renew immediately after any significant electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide EICR copies to all tenants</strong> — existing tenants must receive
                a copy within 28 days of the inspection. New tenants must receive a copy before
                moving in. Provide a copy to the local authority within seven days of a request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete C1 and C2 remedial works within 28 days</strong> — C1 observations
                (danger present) may require immediate action including disconnection of the
                affected circuit before remedial work can be arranged. Do not wait the full 28 days
                for C1 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintain testing records for fire detection and emergency lighting</strong>{' '}
                — carry out and record monthly 30-second function tests of all detectors and
                emergency luminaires. Commission an annual full-duration discharge test of emergency
                lighting. Keep the logbook available for inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace detector heads and batteries on schedule</strong> — optical smoke
                detector heads typically require replacement every ten years. Emergency lighting
                battery packs typically require replacement every three to four years. Follow
                manufacturer schedules and record all replacements in the logbook.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for Full HMO Electrical Compliance (2026)',
    content: (
      <>
        <p>
          The total cost of bringing an HMO to full electrical compliance depends heavily on the
          condition of the existing installation. A property with a modern consumer unit, existing
          interlinked detectors, and no significant defects will cost far less than a property
          requiring a full rewire and complete fire alarm installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — 5-bedroom HMO</strong> — £400 to £800. Multiple consumer units, fire
                alarm wiring, and emergency lighting circuits increase the inspection scope compared
                to a standard rental property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement with RCBOs</strong> — £800 to £1,500 per consumer
                unit. A five-bedroom HMO may require two or three consumer units. RCBO-equipped
                boards suitable for HMOs cost more than standard split-load units but provide
                essential individual circuit discrimination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D, LD2 fire alarm installation</strong> — £500 to £1,500 for a
                five-bedroom HMO, covering all detectors, sounders, wiring, and commissioning. A
                Grade A system with a central panel costs £2,000 to £6,000 or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting installation</strong> — £600 to £2,000 for a three-storey
                five-bedroom HMO, covering hallways, landings, stairwell, and final exit. Includes
                supply, fixing, and commissioning of non-maintained luminaires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — worst case</strong> — £8,000 to £20,000 for a five-bedroom
                three-storey HMO requiring complete rewiring. Necessary for properties still on
                rubber-insulated, cloth-covered, or aluminium wiring with fundamental installation
                deficiencies.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords acquiring an HMO should commission a full electrical survey before exchange and
          factor compliance costs into their acquisition model. Deferring compliance work does not
          reduce costs — it increases them through penalties, licensing delays, and more extensive
          remedial work.
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
          HMO EICRs are among the most lucrative inspection jobs available to UK electricians. A
          thorough inspector who understands HMO licensing requirements, BS 5839-6 fire detection
          categories, and BS 5266-1 emergency lighting obligations commands premium rates and builds
          long-term landlord relationships.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete HMO EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to document large HMO installations circuit by circuit on your phone. AI board
                  scanning speeds up consumer unit inspection, and the full schedule of test results
                  can be completed on site. Send the PDF to the landlord before you leave the
                  property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  HMO remedial works — consumer unit upgrades, fire alarm installations, emergency
                  lighting — are high-value jobs. Quote on site using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords under a 28-day remedial deadline will instruct the electrician who
                  quotes first.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more HMO work with Elec-Mate"
          description="Complete HMO EICRs on your phone, quote remedial works on site, and build a recurring HMO landlord client base. 7-day free trial for UK electricians."
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
      title="HMO Electrical Requirements UK | Houses in Multiple Occupation"
      description="Full guide to HMO electrical requirements in the UK. Mandatory licensing, EICR frequency, fire detection to BS 5839-6, emergency lighting to BS 5266-1, RCD protection, smoke and heat detector placement per room, landlord responsibilities, and 2026 compliance costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="HMO Landlord Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          HMO Electrical Requirements UK:{' '}
          <span className="text-yellow-400">Complete Compliance Guide 2026</span>
        </>
      }
      heroSubtitle="Everything HMO landlords and electricians need to know — mandatory licensing conditions, EICR frequency, fire detection to BS 5839-6, emergency lighting to BS 5266-1, RCD protection under Regulation 411.3.3, room-by-room detector placement, and typical costs for full HMO electrical compliance."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About HMO Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Complete HMO EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
