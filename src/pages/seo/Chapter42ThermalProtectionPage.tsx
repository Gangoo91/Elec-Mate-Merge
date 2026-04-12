import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Flame,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  Lightbulb,
  Cable,
  Building,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Chapter 42', href: '/guides/chapter-42-thermal-effects-protection' },
];

const tocItems = [
  { id: 'overview', label: 'Chapter 42 Overview' },
  { id: 'regulation-421', label: 'Regulation 421 — Fire Protection' },
  { id: 'building-elements', label: 'Cables Through Building Elements (Section 421)' },
  { id: 'downlighters', label: 'Fire Hoods for Downlighters' },
  { id: 'thermal-insulation', label: 'Cables in Contact with Thermal Insulation' },
  { id: 'escape-routes', label: 'Regulation 422 — Precautions in Escape Routes' },
  { id: 'enclosures', label: 'Enclosure Requirements' },
  { id: 'practical-compliance', label: 'Practical Compliance' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Chapter 42 of BS 7671 requires that electrical equipment shall not present a fire risk to adjacent materials. Regulation 421.1.1 requires that equipment is selected and erected so that its temperature in normal operation and foreseeable fault conditions does not cause a fire.',
  'BS 7671 Section 421 requires that where a wiring system passes through building elements (walls, floors, ceilings) with a specified fire resistance, the fire resistance of the building element must be maintained. Fire-stopping must be applied to the cable penetration.',
  'Fire hoods (or fire-rated enclosures) are required for recessed downlighters installed in fire-rated ceilings. Without a fire hood, the downlighter creates a hole in the fire barrier that allows fire to pass from one compartment to another.',
  'The Ci (thermal insulation) correction factor must be applied when cables are in contact with or surrounded by thermal insulation. Regulation 523.9 provides the derating factors — a cable completely surrounded by insulation is derated to 0.5 of its normal current-carrying capacity.',
  'BS 7671 Section 422 requires special precautions for wiring systems in escape routes. Cables must not be at risk of flame propagation, and the fixing method must maintain cable support during a fire for long enough to allow safe evacuation.',
];

const faqs = [
  {
    question: 'What does Regulation 421.1.1 require?',
    answer:
      'Regulation 421.1.1 requires that electrical equipment shall be selected and erected so that its temperature in normal operation and any foreseeable malfunction shall not cause a danger of fire to adjacent materials. This is a fundamental requirement that applies to all electrical equipment — luminaires, consumer units, cables, transformers, motors, and any other current-carrying equipment. In practice, this means maintaining clearances from combustible materials, using heat-resistant cable types near heat sources, derating cables where heat dissipation is restricted, and ensuring that protective devices limit fault currents to levels the equipment can withstand without exceeding safe temperatures.',
  },
  {
    question: 'When is fire-stopping required for cable penetrations?',
    answer:
      'Fire-stopping is required whenever a wiring system passes through a building element that has a specified fire resistance — a requirement under BS 7671 Section 421. This includes fire-rated walls (party walls, compartment walls, corridor walls), fire-rated floors (between storeys), and fire-rated ceilings. The fire-stopping must restore the fire resistance of the building element to its original rating. This is typically achieved using intumescent sealant, fire-rated mortar, fire pillows, or proprietary fire-stopping systems. The fire-stopping product must be tested and certified for the specific application (cable type, aperture size, wall or floor construction). Building Regulations Approved Document B also contains fire-stopping requirements that apply alongside BS 7671.',
  },
  {
    question: 'Do all recessed downlighters need fire hoods?',
    answer:
      'Fire hoods are required for recessed downlighters installed in fire-rated ceilings. The purpose of the fire hood is to maintain the fire resistance of the ceiling. When you cut a hole for a downlighter, you breach the fire barrier. The fire hood sits above the downlighter in the ceiling void and provides fire resistance around the lamp housing. Not all ceilings are fire-rated — for example, the ceiling of a single-storey extension with no habitable space above may not have a fire-resistance requirement. However, ceilings between storeys in a dwelling, ceilings below loft spaces, and ceilings in flats and HMOs are typically fire-rated and require fire hoods for recessed fittings. Always check the Building Regulations requirements for the specific building and confirm with the building control officer if uncertain.',
  },
  {
    question: 'What is the Ci derating factor for cables in thermal insulation?',
    answer:
      'The Ci factor is a correction factor applied to the current-carrying capacity of cables that are in contact with or surrounded by thermal insulation. Regulation 523.9 and Table 52.2 in BS 7671 provide the factors. A cable touching one side of thermal insulation has a Ci factor of 0.75 (derated to 75% of its tabulated current-carrying capacity). A cable completely surrounded by thermal insulation over a length greater than 0.5m has a Ci factor of 0.5 (derated to 50%). For shorter lengths enclosed in insulation, intermediate values apply. This derating is necessary because thermal insulation restricts heat dissipation from the cable, causing it to run hotter. If the cable is not derated, it may exceed its maximum operating temperature and degrade the insulation, creating a fire risk.',
  },
  {
    question: 'What special requirements apply to wiring in escape routes?',
    answer:
      'BS 7671 Section 422 requires that wiring systems in escape routes (corridors, stairways, lobbies used for escape) must not present a risk of flame propagation. Cables must be selected for low flame-propagation characteristics or be enclosed in non-combustible trunking or conduit. Additionally, the cable fixing method must be robust enough to maintain cable support during a fire — cable clips and fixings must be fire-resistant (metal clips, not plastic) so that cables do not fall during a fire and obstruct the escape route or cause injury. In locations with high fire risk (BD2, BD3, BD4 building design classifications), additional requirements apply including the use of cables with limited smoke and halogen-free construction (LSOH cables).',
  },
  {
    question: 'How does Chapter 42 relate to AFDDs (arc fault detection devices)?',
    answer:
      'AFDDs are addressed in BS 7671 Chapter 42 via Regulation 421.1 (protection against fire from electrical equipment). An AFDD detects dangerous electrical arcs — series arcs (loose connections) and parallel arcs (damaged insulation) — that can generate localised heat sufficient to ignite surrounding materials. Unlike overcurrent devices, which only operate when the current exceeds a threshold, AFDDs detect the characteristic waveform of an arc fault. BS 7671 recommends (but does not mandate in all cases) the use of AFDDs for final circuits in certain higher-risk premises. The guidance specifically references premises with sleeping accommodation, locations with combustible constructional materials, and locations with combustible materials being processed or stored.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/afdd-arc-fault-detection',
    title: 'AFDD Guide',
    description:
      'Arc fault detection devices for fire protection — when to use them and installation requirements.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Apply Ci derating factors and calculate safe current-carrying capacity for insulated cables.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Record fire-stopping, cable derating, and thermal protection details on EIC certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/regulation-411-automatic-disconnection',
    title: 'Regulation 411 — ADS Explained',
    description:
      'Automatic disconnection of supply — the primary fault protection measure in BS 7671.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study thermal effects, fire-stopping inspection, and cable derating for C&G 2391.',
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
    heading: 'Chapter 42: Protection Against Thermal Effects',
    content: (
      <>
        <p>
          Chapter 42 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          deals with protection against the thermal effects of electrical installations. The core
          principle is that electrical equipment must not cause a fire or burn risk to people,
          livestock, or property.
        </p>
        <p>
          This chapter is often overlooked in favour of the more frequently referenced Section 411
          (shock protection) and Section 434 (overcurrent protection). However, thermal effects
          cause real fires. Electrical faults are one of the leading causes of domestic fires in the
          UK — and many of these fires result from situations that Chapter 42 specifically
          addresses: cables overheating in insulation, downlighters igniting ceiling timbers, fire
          barriers breached by cable penetrations, and wiring in escape routes propagating flame.
        </p>
        <p>
          For electricians, Chapter 42 has direct practical implications for cable selection, cable
          routing, luminaire installation, consumer unit positioning, and fire-stopping. This guide
          covers the key regulations and how to apply them on site.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-421',
    heading: 'Regulation 421 — Protection Against Fire',
    content: (
      <>
        <p>
          Section 421 contains the requirements for protection against fire caused by electrical
          equipment. The key regulations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 421.1.1</strong> — Electrical equipment shall not present a fire
                hazard to adjacent materials. Equipment must be selected and installed so that its
                temperature in normal operation and foreseeable fault conditions does not cause
                ignition of adjacent combustible materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 421.1.2</strong> — Where the surface temperature of electrical
                equipment may cause a fire risk, the equipment must be mounted on or within material
                that can withstand the temperature. Fixed equipment that may reach temperatures
                capable of igniting adjacent material must be enclosed in fire-resistant material or
                mounted with sufficient clearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 421.1.3</strong> — Where equipment contains flammable liquid
                (such as oil-filled transformers), precautions must be taken to prevent the spread
                of liquid, flame, or combustion products. In domestic installations, this is rarely
                encountered but applies to some older transformer types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 421.1.6</strong> — The consumer unit (or equivalent) in domestic
                premises must comply with BS EN 61439-3 and be constructed of non-combustible
                material. This regulation, introduced in Amendment 3 of the 17th Edition,
                effectively requires metal consumer units in domestic properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The practical impact of Section 421 is that every installation decision — cable routing,
          luminaire selection, enclosure choice, and equipment mounting — must consider the fire
          risk to adjacent materials. This is not just about compliance; it is about preventing the
          electrical fires that cause deaths and property destruction.
        </p>
      </>
    ),
  },
  {
    id: 'building-elements',
    heading: 'Cables Through Building Elements (Section 421)',
    content: (
      <>
        <p>
          BS 7671 Section 421 addresses one of the most common fire safety issues in electrical
          installations: cables penetrating fire-rated building elements. When a cable passes
          through a fire-rated wall, floor, or ceiling, the penetration creates a potential path for
          fire to spread from one compartment to another.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div className="text-white text-sm space-y-2">
              <p>
                <strong>The requirement:</strong> Where a wiring system passes through a building
                element with a specified fire resistance, the fire resistance of that element must
                be maintained after the cable penetration. This means fire-stopping the penetration
                with an appropriate product.
              </p>
              <p>
                <strong>What counts as a fire-rated element?</strong> Party walls between dwellings
                (typically 60 minutes fire resistance), compartment walls and floors in flats and
                HMOs, corridor walls in commercial buildings, floors between storeys, and any wall
                or floor designated as a fire barrier in the building fire strategy.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Fire-Stopping Methods</h4>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intumescent sealant</strong> — expands when exposed to heat, sealing the gap
                around the cable. Suitable for small penetrations with a few cables. Must be applied
                to the correct depth (typically 25mm minimum).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-rated mortar or cement</strong> — used for larger penetrations.
                Proprietary fire-stopping mortars are tested and certified for specific fire
                ratings. Standard builders mortar may not provide the required fire resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire pillows</strong> — intumescent pillows placed in cable trays or
                trunking passing through fire barriers. They expand in a fire to seal the tray.
                Suitable for commercial installations with multiple cables on trays.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proprietary fire collars and sleeves</strong> — pre-formed fire-stopping
                devices that clamp around the cable or pipe penetration. Quick to install and
                provide a consistent fire rating. Must be matched to the cable type and aperture
                size.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Fire-stopping is not optional — it is a requirement of both BS 7671 and Building
          Regulations (Approved Document B). During an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>,
          missing or inadequate fire-stopping at cable penetrations is a common observation,
          typically coded C3 (improvement recommended) unless the penetration is through a critical
          fire barrier such as a party wall, where C2 may be appropriate.
        </p>
      </>
    ),
  },
  {
    id: 'downlighters',
    heading: 'Fire Hoods for Recessed Downlighters',
    content: (
      <>
        <p>
          Recessed downlighters are one of the most common causes of fire-barrier breaches in
          domestic installations. When a hole is cut in a fire-rated ceiling for a downlighter, the
          fire resistance of the ceiling is compromised unless a fire hood is installed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When fire hoods are needed</strong> — fire hoods are required for recessed
                luminaires installed in ceilings that form part of a fire barrier. This includes
                ceilings between ground floor and first floor in houses (30-minute fire resistance),
                ceilings in flats separating dwellings (60-minute fire resistance), and ceilings
                below loft conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What a fire hood does</strong> — the fire hood is a metal or intumescent
                enclosure that sits above the downlighter in the ceiling void. In normal operation,
                it allows heat to dissipate. In a fire, the intumescent material expands to seal the
                gap around the downlighter, maintaining the fire resistance of the ceiling for the
                rated period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire hood + thermal insulation</strong> — if thermal insulation (loft
                insulation) is present above the ceiling, the fire hood also prevents insulation
                from directly contacting the downlighter. Some fire hoods are rated as "insulation
                coverable" (IC-rated), meaning the loft insulation can be placed directly over the
                hood. Non-IC-rated hoods require a clearance gap.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED downlighters</strong> — modern LED downlighters generate significantly
                less heat than halogen. Some LED downlighters are fire-rated in themselves (with an
                integrated intumescent seal) and do not require a separate fire hood. Check the
                manufacturer data sheet — if the luminaire is listed as "fire-rated" and tested to
                BS 476 Part 21, a separate fire hood may not be needed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'thermal-insulation',
    heading: 'Cables in Contact with Thermal Insulation (Ci Factor)',
    content: (
      <>
        <p>
          Regulation 523.9 addresses the derating of cables that are in contact with or surrounded
          by thermal insulation. This is a critical consideration for domestic installations where
          loft insulation, wall insulation (cavity and solid-wall), and underfloor insulation are
          increasingly common.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Ci Correction Factors (Table 52.2)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4">Condition</th>
                  <th className="text-left py-2">Ci Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Cable touching one side of thermal insulation</td>
                  <td className="py-2">0.75</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Cable enclosed in insulation for up to 100mm</td>
                  <td className="py-2">0.89</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Cable enclosed in insulation for up to 200mm</td>
                  <td className="py-2">0.81</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Cable enclosed in insulation for up to 400mm</td>
                  <td className="py-2">0.68</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Cable completely surrounded for over 500mm</td>
                  <td className="py-2">0.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          The implication is significant. A 2.5mm² T&E cable clipped to a joist (Installation Method
          C) has a current-carrying capacity of 27A. If the same cable is surrounded by loft
          insulation over a length greater than 500mm, the Ci factor of 0.5 reduces the capacity to
          13.5A — below the 20A MCB that typically protects a radial circuit. This means the circuit
          does not comply unless the cable size is increased or the cable is kept clear of
          insulation.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Practical tip:</strong> In loft spaces with deep insulation (300mm+), clip
              cables to the top of the joists or run them on standoff clips to keep them above the
              insulation. If cables must run through insulation (for example, under insulation that
              covers the joists entirely), increase the cable size to account for the Ci derating.
              The{' '}
              <SEOInternalLink href="/cable-sizing-calculator">
                cable sizing calculator
              </SEOInternalLink>{' '}
              applies the Ci factor automatically when you select the installation method.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Apply Ci derating automatically"
          description="Elec-Mate's cable sizing calculator includes all derating factors — Ci for thermal insulation, Ca for ambient temperature, Cg for grouping, and Cc for semi-enclosed fuses. Get the right cable size first time."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'escape-routes',
    heading: 'Section 422 — Precautions in Escape Routes',
    content: (
      <>
        <p>
          BS 7671 Section 422 requires that wiring systems in escape routes do not contribute to the
          spread of fire and do not obstruct the escape route during a fire. This applies to
          corridors, stairways, lobbies, and any other route designated as an escape route in the
          building fire strategy.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flame propagation</strong> — cables installed in escape routes must not
                propagate flame. Standard PVC-insulated cables (6242Y T&E) meet the single-cable
                flame test (IEC 60332-1) but may not meet the requirements for bunched cables in
                vertical runs (IEC 60332-3). Where multiple cables are bunched on a tray or in a
                vertical riser, cables with improved flame-propagation characteristics or enclosure
                in non-combustible trunking/conduit may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable fixings</strong> — cable fixings in escape routes must be
                fire-resistant. Standard plastic cable clips soften and fail in a fire, allowing
                cables to drop from the ceiling or wall. Falling cables can obstruct the escape
                route or cause injury. Metal cable clips, metal conduit, or metal trunking should be
                used in escape routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and toxic fumes</strong> — in higher-risk locations (hospitals, care
                homes, high-rise buildings), low-smoke halogen-free (LSOH) cables may be specified
                to reduce toxic fume generation during a fire. Standard PVC cables produce hydrogen
                chloride gas when burning, which is toxic and reduces visibility. LSOH cables
                produce significantly less smoke and no halogenated gases.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In domestic premises, escape routes are typically the hallway, landing, and staircase. The
          practical requirement is to ensure cables in these areas are clipped securely (metal clips
          for surface wiring), fire-stopped where they pass through walls and floors, and that
          consumer units and distribution boards are not positioned in the escape route where they
          could ignite during a fault and block the exit.
        </p>
      </>
    ),
  },
  {
    id: 'enclosures',
    heading: 'Enclosure Requirements for Fire Protection',
    content: (
      <>
        <p>
          Regulation 421.1.6 requires that consumer units in domestic premises are constructed of
          non-combustible material. This regulation was introduced following a series of domestic
          fires caused by faults within plastic consumer units. The requirement effectively means
          that domestic consumer units must have a metal enclosure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal consumer units</strong> — all new domestic consumer units must comply
                with BS EN 61439-3 and have a non-combustible (metal) enclosure. Existing plastic
                consumer units do not need to be replaced solely because of this regulation, but if
                the consumer unit is being replaced or modified, the new unit must be metal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-domestic enclosures</strong> — in non-domestic premises, the enclosure
                material depends on the location and fire risk. Distribution boards in areas with
                combustible construction or contents should be metal. In purpose-built electrical
                switch rooms with non-combustible construction, plastic enclosures may be
                acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction boxes and accessories</strong> — junction boxes behind combustible
                surfaces (such as timber-framed walls) should be metal or mounted in a
                fire-resistant enclosure. This is a particular consideration in timber-frame
                buildings where the wall cavity contains combustible insulation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'practical-compliance',
    heading: 'Practical Compliance on Site',
    content: (
      <>
        <p>
          Chapter 42 affects many day-to-day installation decisions. Here is a practical checklist
          for ensuring compliance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routing</strong> — identify thermal insulation locations before
                routing cables. Clip cables to joist tops or use standoff clips in insulated loft
                spaces. Apply Ci derating where cables must pass through insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-stopping</strong> — fire-stop every cable penetration through a
                fire-rated building element. Use tested and certified products. Photograph the
                fire-stopping before it is covered up — this is valuable evidence for building
                control sign-off and future inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Downlighters</strong> — install fire hoods on all recessed downlighters in
                fire-rated ceilings unless the luminaire itself is fire-rated. Check the IC rating
                if insulation will cover the hood.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer units</strong> — use metal consumer units in all domestic
                installations. Ensure adequate clearance from combustible materials around the unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape routes</strong> — use metal cable clips in escape routes. Ensure
                fire-stopping at all penetrations through corridor and stairway walls. Consider LSOH
                cables for higher-risk buildings.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Document fire protection measures on your certificates"
          description="Elec-Mate's EIC and EICR certificates include dedicated sections for fire-stopping, cable derating, and thermal protection observations. Complete your certificates on site with all the fire safety details recorded."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Chapter42ThermalProtectionPage() {
  return (
    <GuideTemplate
      title="Chapter 42 BS 7671 | Protection Against Thermal Effects"
      description="Complete guide to Chapter 42 of BS 7671 — protection against thermal effects. Fire protection from electrical equipment, cable penetrations through fire barriers, fire hoods for downlighters, Ci derating factor for thermal insulation, and escape route wiring requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Deep-Dive"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Chapter 42: <span className="text-yellow-400">Protection Against Thermal Effects</span>
        </>
      }
      heroSubtitle="Electrical faults are a leading cause of domestic fires. Chapter 42 of BS 7671 sets out the requirements for fire protection from electrical equipment, fire-stopping cable penetrations, fire hoods for downlighters, cable derating in insulation, and wiring in escape routes."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Chapter 42 and Thermal Effects"
      relatedPages={relatedPages}
      ctaHeading="Size Cables with Correct Derating and Document Fire Protection"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing with Ci derating, on-site EIC/EICR certificates, and professional fire protection documentation. 7-day free trial, cancel anytime."
    />
  );
}
