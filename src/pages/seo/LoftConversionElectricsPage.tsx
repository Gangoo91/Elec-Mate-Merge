import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Cable,
  Flame,
  ClipboardCheck,
  GraduationCap,
  Zap,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Loft Conversion', href: '/guides/loft-conversion-electrics' },
];

const tocItems = [
  { id: 'overview', label: 'Loft Conversion Electrics Overview' },
  { id: 'part-p-notification', label: 'Part P Notification' },
  { id: 'new-circuits', label: 'New Circuits and Distribution' },
  { id: 'lighting-design', label: 'Lighting Design' },
  { id: 'smoke-alarms-fire-detection', label: 'Smoke Alarms and Fire Detection' },
  { id: 'part-b-compliance', label: 'Part B Fire Safety Compliance' },
  { id: 'cable-sizing-voltage-drop', label: 'Cable Sizing and Voltage Drop' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Loft conversions involving new circuits are notifiable work under Part P of the Building Regulations (Approved Document P) and require either a competent person scheme notification or a building control application.',
  'New circuits must be supplied from the existing consumer unit or a new sub-distribution board, protected by RCDs to BS 7671:2018+A3:2024 requirements.',
  'Interlinked smoke alarms and heat detectors are mandatory under Part B (Approved Document B) and must comply with BS 5839-6:2019 for domestic fire detection.',
  'Cable sizing must account for thermal insulation — cables enclosed in insulation require derating factors applied per BS 7671 Table 52.2.',
  'An Electrical Installation Certificate (EIC) must be issued on completion, and the work must be signed off by building control or a competent person scheme.',
];

const faqs = [
  {
    question: 'Do I need Part P notification for loft conversion electrics?',
    answer:
      'Yes. Under Approved Document P of the Building Regulations, adding new circuits in a loft conversion is notifiable work. This applies whether the loft is a habitable room, a home office, or a bedroom. The work must either be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or similar) who will self-certify and notify building control on your behalf, or a building control application must be made before work begins. If the work is not notified, the local authority can require you to open up the installation for inspection, which is costly and disruptive. When selling the property, a buyer solicitor will ask for the Part P completion certificate — if one does not exist, it can delay or even prevent the sale.',
  },
  {
    question: 'How many circuits does a loft conversion need?',
    answer:
      'A typical loft conversion requires at least two new circuits: one for lighting and one for socket outlets. Larger conversions — particularly those with an en-suite bathroom — may need additional circuits for the heated towel rail, extractor fan, or electric shower. If the loft will house a home office with high-power equipment, a dedicated circuit for that equipment is advisable. All new circuits must be RCD-protected, and the cable routes must be planned to minimise the length of cable buried in thermal insulation. The number of circuits depends on the diversity calculation and the maximum demand — Elec-Mate cable sizing calculator can help you work this out on site.',
  },
  {
    question: 'What fire detection is required in a loft conversion?',
    answer:
      'A loft conversion changes the dwelling from a single-storey or two-storey layout to a three-storey layout (or higher). Under Approved Document B (Fire Safety), this triggers a requirement for a Grade D1, Category LD2 fire detection system to BS 5839-6:2019. In practical terms, this means interlinked mains-powered smoke alarms with battery backup on every level of the property (including the new loft floor, the landing, and all existing floors), plus a heat detector in the kitchen. All alarms must be interlinked so that activation of any one alarm triggers all others. For properties with three or more storeys, a protected escape route (fire-rated doors, fire-rated construction to the stairwell) is also required. The electrician installing the loft conversion electrics should coordinate with the building control officer on the exact fire detection requirements.',
  },
  {
    question: 'Can I use the existing consumer unit for loft conversion circuits?',
    answer:
      'It depends on the spare capacity available in the existing consumer unit. If the consumer unit has spare ways and the main switch rating can accommodate the additional load, new circuits can be added directly. However, many older consumer units do not have spare ways, or they may not comply with current regulations (for example, a consumer unit without metal enclosure or without full RCD protection). In these cases, either a new consumer unit replacement or a sub-distribution board in the loft is required. A sub-distribution board fed from the main board via an appropriately sized SWA or twin-and-earth cable is a common and practical solution — it keeps the new circuits separate and makes future maintenance easier. The cable from the main board to the sub-board must be sized for the maximum demand of the loft circuits, accounting for voltage drop over the cable run length.',
  },
  {
    question: 'What cable derating applies when cables run through loft insulation?',
    answer:
      'Cables enclosed in thermal insulation must be derated according to BS 7671 Table 52.2 and the correction factors in Appendix 4. The derating factor depends on the length of cable surrounded by insulation and the installation method. For cables completely surrounded by thermal insulation for more than 0.5 metres, a correction factor of 0.5 applies — meaning the cable current-carrying capacity is halved. For cables touching one surface of thermal insulation (clipped to a joist with insulation laid over), a less severe correction factor applies (typically 0.75). The practical implication is that you often need to upsize the cable — for example, a circuit that would normally use 2.5mm twin-and-earth may require 4.0mm to compensate for the derating. Use the Elec-Mate cable sizing calculator to apply the correct factors automatically and ensure compliance.',
  },
  {
    question: 'Do loft conversion electrics need to be tested?',
    answer:
      'Yes. All new electrical work in a loft conversion must be tested and inspected in accordance with BS 7671 Chapter 6 before the circuits are energised. The tests include continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operation. An Electrical Installation Certificate (EIC) must be issued for all new circuits. If the work is carried out by a competent person scheme member, the EIC is submitted to building control as part of the self-certification process. If building control is handling the notification, the inspector will expect to see the completed EIC and schedule of test results. The EIC should cross-reference the Part P notification and the building control reference number.',
  },
  {
    question: 'Can the homeowner do loft conversion electrics themselves?',
    answer:
      'While there is no legal prohibition on a homeowner carrying out their own electrical work, loft conversion electrics are notifiable under Part P. This means the work must be inspected and tested by a qualified person, and building control must be notified. If the homeowner is not registered with a competent person scheme, they must apply to building control before starting the work, pay the building control fee, and have the work inspected by the building control officer. In practice, the cost of building control inspection plus the risk of non-compliant work makes it far more practical and cost-effective to use a qualified electrician who is registered with a competent person scheme.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for loft conversion circuits with automatic derating for thermal insulation and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on long cable runs from the consumer unit to the loft distribution board.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Complete guide to Part P notification requirements for domestic electrical work in England and Wales.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete digital Electrical Installation Certificates on your phone with AI-assisted board scanning.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units including metal enclosure requirements and RCD protection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Loft Conversion Electrics: What You Need to Know',
    content: (
      <>
        <p>
          A loft conversion transforms unused roof space into a habitable room — a bedroom, home
          office, playroom, or en-suite. The electrical installation is a critical part of the
          project, covering new lighting circuits, socket outlets, smoke and fire detection, and
          often additional circuits for bathrooms, heating, or dedicated equipment.
        </p>
        <p>
          Unlike cosmetic work such as replacing a light fitting or adding a socket to an existing
          circuit, loft conversion electrics involve new circuits in a new part of the building.
          This makes the work notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (Approved Document P). It also triggers fire detection requirements under Part B (Approved
          Document B), because adding a habitable storey changes the fire safety category of the
          dwelling.
        </p>
        <p>
          The electrical design must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition with Amendment 3). Cable sizing, circuit
          protection, earthing, bonding, and RCD selection must all be calculated and specified
          correctly. Cables running through loft insulation require derating factors that
          significantly affect the conductor size needed.
        </p>
        <p>
          This guide covers the full scope of loft conversion electrics — from Part P notification
          through to testing, certification, and building control sign-off.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-notification',
    heading: 'Part P Notification Requirements',
    content: (
      <>
        <p>
          Adding new circuits in a loft conversion is classified as notifiable work under Approved
          Document P of the Building Regulations (England and Wales). There are two routes to
          compliance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme (recommended)</strong> — the electrician is
                registered with NICEIC, NAPIT, ELECSA, or another approved scheme. They carry out
                the work, self-certify compliance, and notify building control on behalf of the
                homeowner. A completion certificate is issued automatically. This is the most common
                and cost-effective route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control application</strong> — the homeowner or electrician applies
                to the local authority building control department before work starts. Building
                control inspects the work at key stages and issues a completion certificate when
                satisfied. This route involves a fee (typically £250 to £500) and requires
                coordination with the building control officer schedule.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the work is not notified, no completion certificate is issued. This creates problems
          when selling the property — a buyer solicitor will request the Part P certificate, and its
          absence can delay the sale or require retrospective regularisation (which costs more than
          doing it properly in the first place).
        </p>
        <p>
          For loft conversions, the electrical Part P notification usually runs alongside the main
          building regulations application for the structural conversion. The building control
          officer inspecting the structural work will also want to see the electrical completion
          certificate before signing off the project.
        </p>
      </>
    ),
  },
  {
    id: 'new-circuits',
    heading: 'New Circuits and Distribution',
    content: (
      <>
        <p>
          A loft conversion typically requires at least two new circuits — one for lighting and one
          for socket outlets. Depending on the scope of the conversion, additional circuits may be
          needed:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuit</strong> — typically 1.0mm or 1.5mm twin-and-earth,
                protected by a 6A MCB. If the cable route passes through thermal insulation, upsize
                to 1.5mm to compensate for derating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket circuit</strong> — 2.5mm twin-and-earth (or 4.0mm if enclosed in
                insulation), protected by a 32A MCB. A ring circuit or radial circuit depending on
                the floor area and number of sockets required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>En-suite bathroom</strong> — dedicated circuit for an electric shower
                (typically 10.0mm cable, 40A or 50A MCB), heated towel rail, and extractor fan. The
                bathroom circuits must comply with BS 7671 Section 701 (special locations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution board</strong> — if the main consumer unit lacks spare
                ways, a sub-distribution board in the loft fed by an appropriately sized cable is a
                practical solution. This also simplifies maintenance and future modifications.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All new circuits must be RCD-protected. Under BS 7671 Regulation 411.3.4, socket outlets
          rated up to 32A and lighting circuits in domestic premises must be protected by a 30mA
          RCD. If the existing{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>{' '}
          does not have RCD protection, this may trigger a consumer unit upgrade as part of the loft
          conversion project.
        </p>
        <SEOAppBridge
          title="Size every cable on site in seconds"
          description="Elec-Mate's cable sizing calculator applies derating factors for thermal insulation, grouping, and ambient temperature automatically. Enter the circuit details, get the correct cable size with a full voltage drop check — compliant with BS 7671 Appendix 4."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'lighting-design',
    heading: 'Lighting Design for Loft Conversions',
    content: (
      <>
        <p>
          Lighting is one of the most visible aspects of a loft conversion. The sloped ceilings,
          dormer windows, and roof windows create unique opportunities and constraints. A
          well-designed lighting scheme combines ambient, task, and accent lighting to make the most
          of the space.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Downlights in sloped ceilings</strong> — fire-rated downlights are essential
                to maintain the fire integrity of the ceiling. Use IC-rated (insulation contact)
                fittings where the ceiling void is filled with insulation. Each downlight
                penetration must be fire-stopped to maintain the fire compartment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pendant fittings</strong> — suitable for the central area of the room where
                there is full headroom. Consider the fixing point carefully — the ceiling joist must
                support the fitting weight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall lights</strong> — particularly useful in the eaves area where the
                ceiling height is insufficient for downlights. LED wall washers can create an
                attractive ambient effect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-way and intermediate switching</strong> — a loft room accessed by a
                staircase needs switching at both the top and bottom of the stairs. If there is a
                landing, intermediate switching may be required. Consider smart lighting controls as
                a premium option for the homeowner.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All lighting circuits in the loft must be RCD-protected. The cable routes for lighting
          typically run through the loft floor void, which is filled with insulation — the derating
          factors described in the cable sizing section apply here too. Use 1.5mm cable where 1.0mm
          would normally suffice, to compensate for thermal insulation derating.
        </p>
      </>
    ),
  },
  {
    id: 'smoke-alarms-fire-detection',
    heading: 'Smoke Alarms and Fire Detection Requirements',
    content: (
      <>
        <p>
          A loft conversion that creates a new storey in a dwelling triggers enhanced fire detection
          requirements under Approved Document B (Fire Safety). For most loft conversions, this
          means upgrading to a Grade D1, Category LD2 fire detection system to BS 5839-6:2019.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D1</strong> — mains-powered detectors with integral battery backup.
                This is the standard specification for domestic dwellings under Part B.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category LD2</strong> — detectors in all circulation spaces (hallways,
                landings, stairwells) plus rooms that open onto the escape route and high-risk
                rooms. For a loft conversion, this typically means the new loft room, the landing at
                each level, the hallway at ground floor, and a heat detector in the kitchen.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlinking</strong> — all detectors must be interlinked so that activation
                of any one unit triggers all units. This can be achieved by hard-wired interlinking
                (interconnect cable between all units) or by using wireless interlinked units where
                cabling is impractical in existing floors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The fire detection system is separate from the electrical installation circuits but is
          typically installed by the same electrician. The detectors should be supplied from a
          dedicated circuit or from the lighting circuit, and the cable route must be fire-rated or
          protected to ensure the alarms remain operational in the early stages of a fire.
        </p>
        <p>
          Building control will inspect the fire detection system as part of the loft conversion
          sign-off. The positions, types, and interlinking of the detectors must be agreed with
          building control before installation. Getting this wrong causes delays — discuss the fire
          detection layout at the earliest opportunity.
        </p>
      </>
    ),
  },
  {
    id: 'part-b-compliance',
    heading: 'Part B Fire Safety: Protected Escape Route',
    content: (
      <>
        <p>
          Beyond the fire detection system, Part B (Approved Document B) imposes structural fire
          safety requirements on loft conversions. These are not purely electrical, but the
          electrician must understand them because they affect cable routing, containment, and the
          fire integrity of penetrations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30-minute fire-rated construction</strong> — the stairwell and landing
                forming the escape route from the loft must achieve 30-minute fire resistance. This
                includes the walls, ceiling, and any services penetrations through them. Cables
                passing through fire-rated walls or floors must be fire-stopped to maintain the fire
                barrier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>FD30 fire doors</strong> — all doors opening onto the protected escape route
                must be FD30 (30-minute fire-rated) self-closing doors. This includes the door to
                the new loft room and all existing bedroom doors. If the homeowner objects to
                self-closers, discuss alternative solutions with building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency egress window</strong> — the loft room should have an openable
                window or rooflight that provides an emergency escape (minimum clear opening of
                0.33m square and at least 450mm high and 450mm wide). This is not an electrical
                requirement but affects the room layout and the positioning of electrical
                accessories.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Every cable penetration through a fire-rated wall or floor must be fire-stopped with
          intumescent sealant or purpose-made firestop devices. This is inspected by building
          control and is a common reason for failed inspections. Plan the cable routes to minimise
          the number of fire-rated penetrations, and use the correct firestopping products.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing-voltage-drop',
    heading: 'Cable Sizing and Voltage Drop in Loft Conversions',
    content: (
      <>
        <p>
          Cable sizing for loft conversion circuits requires careful attention to two factors that
          do not always apply in standard domestic work: thermal insulation derating and voltage
          drop on longer cable runs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal insulation derating</strong> — cables enclosed in thermal insulation
                for more than 0.5m must be derated per BS 7671 Table 52.2. A cable completely
                surrounded by insulation has a correction factor of 0.5 (current capacity halved). A
                cable in contact with one surface of insulation uses a factor of approximately 0.75.
                This often means upsizing from 2.5mm to 4.0mm for socket circuits and from 1.0mm to
                1.5mm for lighting circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop</strong> — the cable run from the main consumer unit on the
                ground floor to the loft can be 15 to 25 metres or more. BS 7671 limits the voltage
                drop to 3% for lighting circuits and 5% for other circuits (of the nominal 230V
                supply). On a long run with a high load, the{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop
                </SEOInternalLink>{' '}
                may exceed the permitted limit, requiring a larger cable size.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical approach is to use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to apply all correction factors — thermal insulation, grouping, ambient temperature — and
          check the voltage drop simultaneously. This avoids manual errors and ensures the selected
          cable size satisfies both current-carrying capacity and voltage drop requirements.
        </p>
        <p>
          Where a sub-distribution board is installed in the loft, the feed cable from the main
          board must be sized for the total maximum demand of all loft circuits, including diversity
          factors where applicable. A 6.0mm or 10.0mm twin-and-earth cable is commonly used for the
          sub-main feed, protected by an appropriately rated MCB or RCBO at the main board.
        </p>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          All new electrical work in a loft conversion must be tested in accordance with BS 7671
          Chapter 6 (Initial Verification) before the circuits are put into service. The following
          tests are required:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of protective conductors</strong> — verify the earth path from
                every point to the main earthing terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance</strong> — minimum 1 megohm at 500V DC between live
                conductors and earth, and between live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Polarity</strong> — confirm correct connection of line, neutral, and earth
                at every point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance (Zs)</strong> — verify Zs values do not exceed
                the maximum permitted values in BS 7671 Table 41.2, 41.3, or 41.4.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD operation</strong> — test at rated residual operating current (30mA) and
                verify trip time is within BS 7671 limits (300ms for general protection, 40ms for
                additional protection at 5 times rated current).
              </span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued for all new circuits. The EIC includes the design, construction,
          inspection, and test results, along with a schedule of test results for every circuit.
          This certificate is required by building control as part of the loft conversion sign-off.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Loft Conversion Work',
    content: (
      <>
        <p>
          Loft conversions are high-value domestic projects with strong margins for electricians.
          The electrical package typically includes new circuits, fire detection, consumer unit
          work, and often an en-suite bathroom — a substantial job that can be worth £2,000 to
          £5,000 or more depending on the scope.
        </p>
        <p>
          The key to winning and delivering loft conversion work efficiently is quoting accurately,
          sizing cables correctly on the first visit, and producing professional certification
          promptly. Here is how Elec-Mate helps:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Apply thermal insulation derating, grouping factors, and ambient temperature
                  correction automatically. Get the correct cable size with a full{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop check
                  </SEOInternalLink>{' '}
                  — compliant with BS 7671 Appendix 4. No manual table lookups, no calculation
                  errors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on site with AI board scanning
                  and voice test entry. Export as a professional PDF and send to the homeowner and
                  building control from the property. No desk time, no handwriting.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App for Accurate Pricing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the loft conversion electrical package with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Materials, labour, margins, and VAT calculated automatically. Send a
                  professional quote to the customer before you leave the survey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify loft conversions faster"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, EIC certificates, and professional quoting. Everything you need for loft conversion electrics in one app. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LoftConversionElectricsPage() {
  return (
    <GuideTemplate
      title="Loft Conversion Electrics | Wiring Requirements UK"
      description="Complete guide to loft conversion electrics in the UK. Part P notification, new circuits, lighting design, smoke alarms, fire detection, Part B compliance, cable sizing with insulation derating, and EIC certification requirements."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Loft Conversion Electrics:{' '}
          <span className="text-yellow-400">Wiring Requirements for UK Installations</span>
        </>
      }
      heroSubtitle="Every loft conversion needs new circuits, fire detection, and a Part P notification. This guide covers the full electrical scope — from cable sizing with thermal insulation derating to smoke alarm requirements under Part B and EIC certification on completion."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Loft Conversion Electrics"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Loft Conversions on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing with automatic derating, EIC certificates with AI board scanning, and professional quoting. 7-day free trial, cancel anytime."
    />
  );
}
