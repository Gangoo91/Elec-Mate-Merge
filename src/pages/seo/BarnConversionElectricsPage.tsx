import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Landmark,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  Lightbulb,
  Thermometer,
  ClipboardCheck,
  Ruler,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Barn Conversion Electrics', href: '/guides/barn-conversion-electrics' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'heritage', label: 'Heritage and Listed Building Constraints' },
  { id: 'supply', label: 'Supply and Three-Phase Considerations' },
  { id: 'cable-runs', label: 'Long Cable Runs and Voltage Drop' },
  { id: 'structural', label: 'Structural Challenges' },
  { id: 'lighting', label: 'Lighting Design' },
  { id: 'heating', label: 'Underfloor Heating and Heat Pumps' },
  { id: 'consumer-unit', label: 'Consumer Unit Design' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'tools-materials', label: 'Tools and Materials' },
  { id: 'costs', label: 'Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Barn conversions often involve heritage or listed building constraints that restrict how cables are routed and accessories are positioned. Conservation officers may require cables to be concealed in specific ways and may restrict surface-mounted trunking or conduit on exposed stonework.',
  'Long cable runs are typical in barn conversions — large open-plan spaces and agricultural buildings can mean 30m to 50m cable runs from the consumer unit to the furthest point. Voltage drop is the critical sizing factor, often requiring cables one or two sizes larger than the load alone demands.',
  'Three-phase supply is common in agricultural buildings. If the barn has an existing three-phase supply, it can be advantageous to retain it — particularly for underfloor heating zones, electric vehicle charging, and workshop equipment. Balance the load across phases.',
  'Exposed beams, stone walls, and vaulted ceilings create installation challenges. Surface-mounted cabling on exposed stonework requires careful routing and may need conservation officer approval. Concealed routes through thick stone walls require core drilling.',
  'Budget £5,000 to £20,000+ for the electrical installation depending on the barn size, specification, heritage constraints, and whether three-phase is involved. A standard two-bedroom barn conversion is typically £8,000 to £12,000 for the electrical package.',
];

const faqs = [
  {
    question: 'Do I need conservation officer approval for electrical work in a listed barn?',
    answer:
      'If the barn is a listed building or in a conservation area, you may need Listed Building Consent for the electrical installation. This applies to any work that affects the character or appearance of the building — including surface-mounted cables, trunking, or conduit on exposed stonework or beams. The conservation officer may specify how cables must be routed (typically concealed within floor voids, behind plasterboard linings, or through existing voids in the structure). They may also restrict the type and style of switches and sockets (heritage-style accessories in brass or bronze are sometimes required). Always check with the conservation officer before first fix — discovering restrictions at second fix is expensive and frustrating.',
  },
  {
    question: 'Should I keep the three-phase supply in a barn conversion?',
    answer:
      'If the barn has an existing three-phase supply from its agricultural use, it is usually worth retaining it — particularly if the conversion includes underfloor heating (which can be balanced across three phases), electric vehicle charging, a workshop, or substantial electrical heating. A three-phase supply provides 3x the capacity of a single-phase supply (typically 100A per phase vs 100A single phase). The consumer unit design is more complex (three-phase distribution board) and the electrician must balance the load across phases. If the conversion is a modest two-bedroom dwelling with gas heating, downgrading to single-phase may be simpler — but check the DNO charges for the change. Retaining three-phase is usually cheaper than downgrading and potentially re-upgrading later.',
  },
  {
    question: 'How do I handle voltage drop in a large barn conversion?',
    answer:
      'Voltage drop is the most common technical challenge in barn conversions. BS 7671 allows a maximum 5% voltage drop from the origin to the furthest load (3% for lighting is recommended). In a large barn, the consumer unit to the furthest socket outlet may be 40m or more. At this distance, a standard 2.5mm² cable on a 32A ring final circuit will exceed the voltage drop limit. Solutions include: using larger cable sizes (4.0mm² or 6.0mm² for socket circuits, 2.5mm² for lighting instead of 1.5mm²), positioning the consumer unit centrally in the building to reduce maximum cable lengths, using sub-distribution boards at the far end of the building for long runs, and dividing the building into zones with their own circuits.',
  },
  {
    question: 'What lighting works best in a barn conversion?',
    answer:
      'Barn conversions typically feature exposed beams, high ceilings, and stone or brick walls — the lighting design should complement these features. Popular approaches include: pendant fittings hung from beams at varying heights for the industrial aesthetic, track lighting on beams for adjustable directional light, LED strip lighting along beam undersides for indirect ambient lighting, wall-mounted uplighters on stone walls for feature lighting, and recessed downlights in plasterboard ceilings where they exist. Avoid recessed downlights in areas with exposed beam ceilings — they look out of place and create installation challenges. Dimming is highly desirable in open-plan barn spaces where the same room serves multiple functions.',
  },
  {
    question: 'How do I route cables through stone walls in a barn?',
    answer:
      'Stone walls in barns are typically 400mm to 600mm thick, making cable routing challenging. Options include: core drilling through stone walls for cable penetrations (use a diamond core drill, not a hammer drill, to avoid damaging the stone), chasing into mortar joints (less damaging than chasing into the stone itself, but requires careful reinstatement), running cables through floor voids between ground floor and first floor, running cables above plasterboard linings where internal walls are dry-lined, and using surface-mounted conduit or trunking where the conservation officer permits. For listed buildings, avoid any method that damages original fabric unless approved. Document all concealed routes on as-built drawings for future reference.',
  },
  {
    question: 'What are the fire safety requirements for a barn conversion?',
    answer:
      'A barn conversion to a dwelling must meet Part B of the Building Regulations for fire safety. The electrical requirements include: interconnected mains-powered smoke alarms with battery backup in all circulation areas and habitable rooms, heat alarms in kitchens, fire-stopping of all cable penetrations through fire-rated walls and floors (particularly important in barn conversions with multiple levels), and fire-rated downlights where downlights penetrate a fire-rated ceiling. If the barn conversion has a mezzanine or first floor, protected escape routes with emergency lighting may be required depending on the layout.',
  },
  {
    question: 'How much does a barn conversion cost for electrics?',
    answer:
      'Barn conversion electrical costs are higher than standard domestic work because of the building constraints, long cable runs, and typically high specifications. A modest two-bedroom barn conversion with standard specification costs £5,000 to £8,000 for electrics. A large three to four bedroom conversion with underfloor heating, three-phase distribution, heritage accessories, feature lighting, and EV charging costs £12,000 to £20,000+. The key cost drivers are: cable quantities (large floor areas and long runs), heritage accessories (brass or bronze switches and sockets are 3x to 5x the cost of standard white accessories), underfloor heating (materials and installation time), three-phase distribution (more complex consumer unit and balancing), and conservation officer requirements (concealed routing adds labour time).',
  },
  {
    question: 'Do I need an earth rod for a barn conversion?',
    answer:
      'Many agricultural buildings are on TT earthing arrangements (earth rod rather than PME). If the barn retains its existing TT earth, verify that the earth electrode resistance is adequate — the target is below 200 ohms, ideally below 100 ohms. If the electrode resistance is high, install a new earth rod or additional rods to improve it. If the barn is connected to the house supply on a PME (TN-C-S) system, the same considerations apply as for any outbuilding — a risk assessment is required under BS 7671 Regulation 9.2. For large barns with significant metalwork, long cable runs, and potentially damp conditions, a TT arrangement with a dedicated earth rod is often the safer option.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Critical for barn conversions — size cables for long runs with automatic voltage drop checking.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on 30m to 50m cable runs typical in barn conversions.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for barn conversions on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/annex-electrical-installation',
    title: 'Annex Electrical Installation',
    description:
      'Similar self-contained dwelling installation — supply options, kitchen/bathroom circuits, and testing.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Price barn conversion electrical packages with itemised materials, labour, and heritage accessories.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with modules covering three-phase testing and complex installations.',
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
    heading: 'Barn Conversion Electrical Installation: Complete Guide',
    content: (
      <>
        <p>
          Barn conversions are some of the most rewarding — and challenging — domestic electrical
          installations in the UK. These projects transform agricultural buildings into stunning
          homes, and the electrical installation must combine modern domestic standards with the
          unique constraints of historic structures.
        </p>
        <p>
          The challenges are distinct from standard domestic work: thick stone or brick walls that
          resist cable routing, exposed beams and vaulted ceilings that demand creative lighting
          solutions, long cable runs that push voltage drop limits, potential three-phase supplies
          inherited from agricultural use, and heritage or listed building constraints that restrict
          how and where cables can be installed.
        </p>
        <p>
          This guide covers the complete electrical installation process for barn conversions, from
          supply design through to certification, with practical guidance on the heritage,
          structural, and technical challenges that make these projects unique.
        </p>
      </>
    ),
  },
  {
    id: 'heritage',
    heading: 'Heritage and Listed Building Constraints',
    content: (
      <>
        <p>
          Many barns being converted are listed buildings or located in conservation areas. This has
          direct implications for the electrical installation:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routing restrictions</strong> — conservation officers may prohibit
                surface-mounted cables, trunking, or conduit on exposed stonework, brickwork, or
                beams. Cables must typically be concealed within floor voids, behind dry-lining, or
                through existing structural voids. This significantly increases first-fix labour
                time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessory styling</strong> — standard white plastic switches and sockets may
                not be acceptable in listed buildings. Heritage-style accessories in brushed bronze,
                antique brass, or black iron may be required. These cost 3x to 5x more than standard
                accessories but are non-negotiable for listed buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed Building Consent</strong> — any work that affects the character or
                appearance of a listed building requires Listed Building Consent. This is separate
                from planning permission and Building Regulations approval. Apply before starting
                work — retrospective consent is not guaranteed and unauthorised work on a listed
                building is a criminal offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coordination with conservation officer</strong> — arrange a site meeting
                with the conservation officer before first fix. Walk through the cable routes,
                accessory positions, and consumer unit location. Get agreement in writing. This
                avoids expensive rework.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supply',
    heading: 'Supply Options and Three-Phase Considerations',
    content: (
      <>
        <p>
          Agricultural buildings often have existing electrical supplies — sometimes three-phase —
          from their previous use. The supply options for the conversion are:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Retain Three-Phase</h3>
            <p className="text-white text-sm leading-relaxed">
              If the barn has an existing three-phase supply, retaining it provides 3x the capacity
              of single-phase. This is advantageous for large conversions with significant
              electrical loads: underfloor heating can be balanced across phases, EV chargers can
              use a dedicated phase, and workshop equipment can run on three-phase power. The
              consumer unit must be a three-phase distribution board, and circuits must be balanced
              across L1, L2, and L3. Design diversity carefully to avoid phase imbalance.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New Single-Phase Connection</h3>
            <p className="text-white text-sm leading-relaxed">
              For modest conversions with gas heating and moderate electrical loads, a standard
              single-phase 100A supply is adequate. If the barn is remote from the nearest network
              point, the DNO connection cost can be significant — £2,000 to £10,000+ depending on
              distance. The existing agricultural supply may need upgrading or replacing regardless.
              Check with the DNO early in the project to understand costs and lead times.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cable-runs',
    heading: 'Long Cable Runs and Voltage Drop',
    content: (
      <>
        <p>
          Voltage drop is the defining technical challenge of barn conversion electrics.
          Agricultural buildings are large — a typical barn is 15m to 25m long, and some are 30m to
          50m. The consumer unit is usually positioned near the meter, which may be at one end of
          the building. This creates cable runs of 30m to 50m to the furthest points.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Voltage Drop Limits</h4>
              <p className="text-white text-sm leading-relaxed">
                BS 7671 allows a maximum 5% voltage drop from the origin of the installation to the
                furthest point of utilisation (3% is recommended for lighting). At 230V, 5% is
                11.5V. On a 40m run with 2.5mm² cable carrying 20A, the voltage drop is
                approximately 14.4V — exceeding the limit. The solution is to increase the cable
                size: 4.0mm² drops to 9.0V, and 6.0mm² drops to 6.0V. Always check voltage drop at
                the design stage using the{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop calculator
                </SEOInternalLink>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central consumer unit positioning</strong> — where possible, position the
                consumer unit centrally in the building to halve the maximum cable run distance.
                This may require a sub-main from the meter position to a central location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution boards</strong> — for very large buildings, install a
                sub-distribution board at the far end fed by a sub-main. This reduces the cable run
                for final circuits and simplifies the voltage drop calculation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upsized cables</strong> — use 4.0mm² for socket circuits (instead of 2.5mm²)
                and 2.5mm² for lighting (instead of 1.5mm²) as standard in barn conversions. The
                material cost increase is modest compared to the risk of failing the voltage drop
                test at commissioning.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'structural',
    heading: 'Structural Challenges: Stone, Beams, and Vaulted Ceilings',
    content: (
      <>
        <p>
          The physical structure of a barn creates installation challenges that do not exist in
          standard domestic work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stone walls (400mm to 600mm thick)</strong> — core drilling for cable
                penetrations requires a diamond core drill. Chasing is extremely labour-intensive
                and may not be permitted in listed buildings. Route cables through dry-lining voids
                where internal walls are being lined, or through floor voids between levels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exposed beams</strong> — cables cannot simply be clipped to exposed oak or
                softwood beams without conservation officer approval. Options include routing
                through the beam (drilling from the hidden side), running along the top of the beam
                where not visible, or using the beam structure to conceal cables in junction points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vaulted ceilings</strong> — no ceiling void means no concealed cable routes
                overhead. Cables must be run in floor voids, along beams, or through the wall
                structure. Lighting feeds to ceiling pendants often need to be routed down through
                the ridge and along beams.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp and moisture</strong> — agricultural buildings can have persistent
                damp, particularly at ground level. Use IP-rated accessories and ensure all cable
                routes in damp areas are protected. Consider the long-term moisture environment when
                selecting materials and cable types.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Lighting Design for Barn Conversions',
    content: (
      <>
        <p>
          Lighting is where barn conversion electrics become genuinely creative. The double-height
          spaces, exposed structural elements, and stone or brick textures demand a lighting design
          that is both functional and atmospheric:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pendant fittings on beams</strong> — large industrial-style pendants hung
                from exposed beams are the signature barn conversion lighting look. Use
                adjustable-height pendants or pulley fittings in double-height spaces. Cable runs
                concealed along the top of beams.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Track lighting</strong> — ceiling-mounted or beam-mounted track systems
                provide flexible directional lighting. They work well in open-plan living spaces
                where the lighting needs change with furniture arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED strip lighting</strong> — concealed LED strips along beam undersides, in
                coving, or behind stone ledges create indirect ambient lighting that highlights the
                building texture without visible light fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall uplighters</strong> — stone and brick walls look spectacular when lit
                from below. Recessed or surface-mounted LED uplighters on the walls create drama
                without competing with the structural features.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dimming</strong> — essential in open-plan barn spaces. A dimming system
                allows the same room to transition from bright task lighting to ambient evening
                lighting. Use trailing-edge LED dimmers or a smart dimming system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'heating',
    heading: 'Underfloor Heating and Heat Pumps',
    content: (
      <>
        <p>
          Barn conversions almost always include underfloor heating — the large floor areas, stone
          or concrete substrates, and absence of standard radiator positions make underfloor heating
          the natural choice. The electrical implications are significant:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric underfloor heating</strong> — heating mats or cables embedded in
                the floor screed. Each zone requires a dedicated circuit (typically 16A to 20A) and
                a floor thermostat with floor and air sensors. A large barn may have 6 to 10 heating
                zones, each on its own circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase balancing</strong> — if the barn retains a three-phase supply,
                distribute the underfloor heating zones across phases to balance the load. For
                example, Zone 1-3 on L1, Zone 4-6 on L2, Zone 7-9 on L3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air source heat pump</strong> — increasingly specified in barn conversions
                for Part L compliance and running cost efficiency. The electrician provides the
                outdoor unit supply (typically 32A three-phase or single-phase), indoor unit wiring,
                zone valve controls, and the controls interface. The heat pump circuit must be on a
                dedicated RCBO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wet underfloor heating (pump and controls)</strong> — if the underfloor
                heating is wet (water-based, fed by a heat pump or boiler), the electrician provides
                power to the circulation pump, zone valves, and wiring centre. This is typically a
                fused spur to the wiring centre and individual zone thermostat connections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Design',
    content: (
      <>
        <p>
          A barn conversion consumer unit must accommodate the full domestic load plus any retained
          agricultural or workshop circuits. Typical requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase</strong> — a 16 to 20 way RCBO board is typical. Allow for:
                lighting (x3 to x4), sockets (x3 to x4), cooker, shower, immersion, heating zones
                (x4 to x8), extract fans, smoke detection, external lighting, EV charger, and spare
                ways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase</strong> — a three-phase distribution board with individual
                RCBOs on each phase. Balance the load: distribute circuits evenly across L1, L2, and
                L3. Use a phase rotation indicator during commissioning to verify correct phase
                sequence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution boards</strong> — for large buildings, a sub-distribution
                board at the far end of the barn reduces cable lengths and simplifies the design.
                Feed the sub-board from the main board via an appropriately sized sub-main.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          Barn conversion testing follows the same BS 7671 requirements as any domestic
          installation, but the scale and complexity are greater. An{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          is required covering all circuits:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Continuity of protective conductors on all circuits (expect long R1+R2 values)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Ring final circuit continuity (if ring circuits used)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance on all circuits (500V DC, minimum 1 megohm)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity at every point</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth electrode resistance (if TT earthing)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earth fault loop impedance on every circuit (Zs values may be higher due to cable
                length)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation on all RCD/RCBO protected circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Phase rotation and phase balance (three-phase installations)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Prospective fault current at each distribution board origin</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Functional testing of underfloor heating zones, smoke alarms, and extract fans
              </span>
            </li>
          </ul>
        </div>
        <p>
          The schedule of test results will be extensive — 20 to 40+ circuits is typical. Allow a
          full day for testing and certification on a large barn conversion.
        </p>
      </>
    ),
  },
  {
    id: 'tools-materials',
    heading: 'Tools and Materials Checklist',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Tools Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Insulated screwdriver set and torque screwdriver</li>
              <li>Diamond core drill (for stone wall penetrations)</li>
              <li>SDS drill with masonry bits</li>
              <li>SWA cable cutters and gland kit</li>
              <li>Cable strippers and cutters</li>
              <li>Crimping tool and ferrule kit</li>
              <li>Fish tape, draw wire, and cable rods</li>
              <li>Multimeter, continuity, and insulation resistance testers</li>
              <li>Earth fault loop impedance and RCD tester</li>
              <li>Earth electrode resistance tester</li>
              <li>Phase rotation indicator (three-phase)</li>
              <li>Scaffold tower or platform ladder (high ceilings)</li>
              <li>Cable detector</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Materials Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Consumer unit / three-phase distribution board</li>
              <li>RCBOs for all circuits</li>
              <li>Twin and earth cable (various sizes, upsized for voltage drop)</li>
              <li>SWA cable for sub-mains</li>
              <li>Heritage-style switches and sockets (if listed building)</li>
              <li>LED pendant fittings, track lighting, strip lighting</li>
              <li>Dimmers (trailing-edge LED compatible)</li>
              <li>Underfloor heating mats/cables and thermostats</li>
              <li>Interconnected mains smoke/heat alarms</li>
              <li>Intumescent fire-stop sealant</li>
              <li>Earth rod and clamp (if TT)</li>
              <li>Cable trunking, conduit, and clips</li>
              <li>Data cabling (Cat6) if specified</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Costs (2026 UK Pricing)',
    content: (
      <>
        <p>Barn conversion electrical costs reflect the scale, complexity, and specification:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small barn (1-2 bedrooms, standard spec)</strong> — single-phase, standard
                accessories, electric panel heating: £5,000 to £8,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium barn (2-3 bedrooms, mid spec)</strong> — single or three-phase, UFH,
                feature lighting, some heritage accessories: £8,000 to £12,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large barn (3-4+ bedrooms, high spec)</strong> — three-phase, full UFH, heat
                pump, heritage accessories throughout, feature lighting, EV charging, smart home:
                £12,000 to £20,000+.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key cost drivers</strong> — heritage accessories: £1,500 to £4,000 premium
                over standard. Three-phase distribution: £500 to £1,000 premium. Underfloor heating
                (electric, per zone): £300 to £600. Feature lighting design: £1,000 to £3,000. New
                DNO connection: £2,000 to £10,000+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Barn Conversions Are Premium Projects',
    content: (
      <>
        <p>
          Barn conversions are among the highest-value domestic electrical projects available. A
          typical barn conversion electrical package is worth £8,000 to £15,000, and the work spans
          weeks across first fix and second fix phases. These are customers spending £200,000 to
          £500,000+ on their conversion — they expect quality workmanship and professional
          documentation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Detailed Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the complete barn conversion electrical package with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Every circuit, every accessory, every metre of cable — itemised with your
                  margins. A detailed, professional quote differentiates you from competitors who
                  submit a one-line price.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Long Runs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to size every circuit with voltage drop verification. Get the cable sizes right at
                  the design stage — discovering a voltage drop failure at commissioning on a 40m
                  run in a barn is a costly rework.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC for 30+ Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate for a 30+ circuit barn conversion
                  on your phone. AI board scanning captures every RCBO. Voice test entry makes the
                  schedule of results manageable. Export a professional PDF for Building Control
                  sign-off.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, size, and certify barn conversion electrics"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification. Built for complex projects like barn conversions. 7-day free trial."
          icon={Landmark}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BarnConversionElectricsPage() {
  return (
    <GuideTemplate
      title="Barn Conversion Electrical Installation | Guide UK"
      description="Complete guide to barn conversion electrical installation in the UK. Heritage constraints, long cable runs, voltage drop, three-phase supply, exposed beam challenges, underfloor heating, industrial lighting, and 2026 pricing from £5,000 to £20,000+."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Landmark}
      heroTitle={
        <>
          Barn Conversion Electrical Installation:{' '}
          <span className="text-yellow-400">Complete Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Everything you need to know about barn conversion electrics — heritage constraints, long cable runs, voltage drop, three-phase supply, stone wall challenges, feature lighting, underfloor heating, and realistic 2026 pricing from £5,000 to £20,000+."
      readingTime={20}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Barn Conversion Electrics"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Barn Conversion Electrics on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certificates. Built for complex projects. 7-day free trial, cancel anytime."
    />
  );
}
