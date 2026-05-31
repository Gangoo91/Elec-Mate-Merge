import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import { PvArchitectures } from '@/components/study-centre/diagrams/renewableGapKit';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s6-on-roof',
    question:
      'On-roof PV mounting — what is it?',
    options: [
      'Modules built into roof tiles',
      'Modules mounted on rails fixed above an existing roof covering (tiles, slates, metal). The dominant residential architecture on retrofit installs and most new-build PV. Maintains the original waterproofing of the roof; PV is added on top with a 70–100 mm standoff for cooling airflow',
      'Modules on the ground',
      'Modules in a façade',
    ],
    correctIndex: 1,
    explanation:
      'On-roof is the most common UK residential PV mounting architecture. PV modules attach to a rail system mounted above the existing roof covering via tile hooks, slate hooks, or fixings appropriate to the roof type. The 70–100 mm standoff between the module backsheet and the roof surface (from the PWI practical work intelligence) is essential for natural-convection cooling. The original roof waterproofing is preserved; flashings seal any roof penetrations. Standard install for retrofit on existing roofs.',
  },
  {
    id: 'm2s6-in-roof',
    question:
      'In-roof PV mounting — what is it?',
    options: [
      'Modules inside the loft',
      'Modules integrated into the roof structure, replacing tiles or slates over the array area. The modules themselves become the weatherproof roof covering, with a proprietary flashing system around the array perimeter. Mostly used on new-builds or major roof refurbishments — replaces tile/slate cost with module cost',
      'Modules on the ground',
      'Modules below ceiling level',
    ],
    correctIndex: 1,
    explanation:
      'In-roof PV (sometimes called "integrated" PV in the UK market — distinct from BIPV which is broader) replaces tiles or slates over the array area with the PV modules themselves. The modules become the weatherproof covering; a proprietary flashing system (typically supplied by the mounting-system manufacturer) seals the array perimeter and the boundary with surrounding tile / slate. Premium aesthetic — the roof reads as one continuous surface rather than panels on top of tiles. Practical limitations: typically more expensive than on-roof, harder to retrofit without major roof work, lower airflow under modules (slight temperature derate vs on-roof with standoff).',
  },
  {
    id: 'm2s6-ground-mount',
    question:
      'Ground-mount PV — when is it the right architecture?',
    options: [
      'Always',
      'On installs where roof area is insufficient or unsuitable, where the customer has land available (typically rural / agricultural settings), or where commercial-scale installs are economic. Frame structures support the modules above the ground; the rear of the modules is fully ventilated, giving the best cooling performance of any architecture',
      'Only off-grid',
      'Only commercial',
    ],
    correctIndex: 1,
    explanation:
      'Ground-mount PV uses frame structures (typically galvanised steel or aluminium) to support modules at a fixed tilt above the ground. Best cooling performance of any architecture (modules fully ventilated front and rear). Best access for cleaning and maintenance. Limited by land availability — typical UK domestic ground-mount sees ~5–10 kWp on a typical large garden, while utility-scale ground-mount runs to many MW. The mounting system must handle wind uplift loads; foundations vary from concrete ballast (no ground penetration) to driven piles (ground-penetrating, requires geotechnical assessment).',
  },
  {
    id: 'm2s6-bipv',
    question:
      'BIPV (Building-Integrated PV) — what does it cover?',
    options: [
      'Standard rooftop PV',
      'Photovoltaic elements that serve a structural / architectural role in the building as well as generating electricity — solar façades, PV glazing in glass walls, PV-integrated curtain walling, walkable PV on terraces. The PV element IS the building component; removing it would leave a structural / weatherproofing gap',
      'Wind turbines',
      'Solar thermal collectors',
    ],
    correctIndex: 1,
    explanation:
      'BIPV (Building-Integrated PV) goes beyond in-roof to use PV as the structural / architectural building component. PV façades replace conventional cladding; PV glazing replaces conventional glass in curtain walling; walkable PV replaces conventional terrace surfaces. The PV element serves the building\'s structural and weatherproofing role. Amorphous thin-film cells (lower efficiency but better partial-shade and form-factor flexibility — Section 2.1) are often the technology of choice for BIPV. Premium aesthetic and architectural integration; premium cost per W; longest-lifetime (must match the building\'s 60+ year design life).',
  },
  {
    id: 'm2s6-structural',
    question:
      'A survey on a retrofit on-roof PV install must verify what about the roof structure?',
    options: [
      'Just the roof colour',
      'Roof structural capacity for the additional PV load (modules + mounting + wind uplift), condition of the roof covering and underlay, suitability of the rafter / batten arrangement for the chosen fixings, condition of the flashings around any planned penetrations, and the remaining service life of the roof covering vs the 25+ year PV array life',
      'Just the roof tile colour',
      'Only the roof age',
    ],
    correctIndex: 1,
    explanation:
      'The structural / mechanical survey for on-roof PV covers five items. Structural capacity for the additional load (typical residential PV adds 15–20 kg/m² static plus wind uplift loads — a competent surveyor or structural engineer signs off where the loading approaches or exceeds the roof design). Roof covering condition (tiles / slates / underlay) — the array is on a roof that must last as long as the array. Rafter / batten arrangement (for the chosen fixings — tile hooks for clay/concrete tile, slate hooks for slate, different fixings for metal sheet). Flashings (waterproof detailing around penetrations). Remaining roof service life — discussed in Module 1 Section 6 as a customer-acknowledged risk where the roof is ageing.',
  },
  {
    id: 'm2s6-orientation-tilt',
    question:
      'On a typical UK domestic on-roof install, the optimal PV array orientation and tilt for maximum annual yield is roughly:',
    options: [
      'North-facing, 90° tilt',
      'South-facing (azimuth 180° from north), tilt 30–40° (matches typical UK roof pitches and the latitude-appropriate solar elevation). Real installs typically follow the existing roof pitch rather than optimising — the loss from sub-optimal tilt / orientation is usually 5–15% on a UK install, accepted in exchange for not modifying the roof structure',
      'East-facing, flat',
      'West-facing, vertical',
    ],
    correctIndex: 1,
    explanation:
      'For the UK (latitude ~50–58°N), the optimal annual-yield orientation is south-facing with a tilt of ~30–40° (roughly matching the average solar elevation across the year). Pure-south orientation captures more midday sun; tilts of 30–40° balance summer (high-elevation sun) and winter (low-elevation sun) yields. Real-world installs follow the existing roof pitch (typical UK roofs are 30–45° pitch, often close to optimal) — the practical loss from sub-optimal orientation / tilt vs theoretical optimum is usually 5–15%. The PV yield calculation tools (PVGIS, etc.) give exact figures for any orientation / tilt combination.',
  },
  {
    id: 'm2s6-shading',
    question:
      'Shading topology — what should the survey capture?',
    options: [
      'Just the time of day',
      'Sources of shade across the year (trees, chimneys, neighbouring buildings, distant objects), how the shading pattern moves with sun position (morning shade vs midday shade vs afternoon shade — and seasonal variation as sun elevation changes), the impact on specific modules within the proposed array, and the architectural mitigation (separate strings into separate MPPTs, or module-level optimisation)',
      'Whether the customer likes shade',
      'The weather forecast',
    ],
    correctIndex: 1,
    explanation:
      'Shading topology is a survey-stage discipline. The competent surveyor maps the shading sources (trees, chimneys, neighbouring buildings, even distant objects on a flat horizon), tracks how the shading pattern moves with sun position across the day, accounts for seasonal variation (winter sun is lower, shadows are longer; summer sun is higher, shadows shorter), and identifies which modules in the proposed array are affected at which times. The mitigation flows from the analysis — multi-MPPT inverter for orientation-driven mismatch, module-level optimisation (Section 2.5) for shading-driven mismatch. Shade analysis tools (SunEye, Solmetric, mobile apps) capture the annual shading pattern objectively; the data forms part of the cert evidence bundle.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new-build customer with a fully-architectural design wants integrated PV on the south roof. Three options at survey: on-roof retrofit-style, in-roof integrated, or full BIPV roof. Which is right for the new-build aesthetic?',
    options: [
      'On-roof always',
      'In-roof or BIPV — both deliver the architectural aesthetic of a continuous roof surface without panels &ldquo;sitting on top&rdquo;. In-roof is cheaper and more standard; BIPV is premium and may include glazing, façades and other building elements as PV. The new-build context is when these aesthetics are easiest to deliver because the roof can be designed around the PV',
      'Ground-mount only',
      'No PV',
    ],
    correctAnswer: 1,
    explanation:
      'New-build construction is the natural moment to specify in-roof or BIPV — the roof structure can be designed to accommodate the PV module dimensions and the perimeter flashings without major retrofit complexity. On-roof retrofit is the right architecture for adding PV to an existing roof; new-build PV gets the option of the integrated aesthetics that on-roof can\'t deliver. The Future Homes Standard (covered in Module 1 Section 7) drives much of the new-build PV market.',
  },
  {
    id: 2,
    question:
      'A customer with a south-facing main roof pitch but also an east extension proposes 12 modules across both. What architectural decision matters most?',
    options: [
      'Whether the modules are blue or black',
      'Treating the two roof pitches as separate strings into separate MPPT inputs (Section 2.4) — the architectural decision affects inverter topology and the per-string design. The visible aesthetic on each roof pitch may differ (orientation, tilt, module count) but the electrical architecture treats them as two independent arrays sharing one inverter',
      'Removing the east roof',
      'Tilting the modules manually',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-orientation arrays are an electrical architecture decision as much as a mounting decision. The two roof pitches become two independent strings into two MPPT inputs on a dual-MPPT inverter — covered in Section 2.4. The on-roof mounting on each pitch follows standard practice; the inverter topology and the MPPT input architecture is what eliminates the orientation mismatch loss. The PWI common-mistakes list flags &ldquo;multi-pitch arrays need separate strings or separate MPPT inputs&rdquo; explicitly.',
  },
  {
    id: 3,
    question:
      'A ground-mount PV install on a customer\'s land — what foundation choice matters most for a residential 5 kWp install?',
    options: [
      'Always concrete',
      'Concrete ballast (no ground penetration, suitable for soft ground, no planning issues, but heavier hardware footprint) OR driven piles (ground-penetrating, lighter visual footprint, but may require geotechnical assessment and planning consideration). The choice depends on the ground type, the customer\'s long-term land use, and any local planning constraints',
      'Always piles',
      'No foundation needed',
    ],
    correctAnswer: 1,
    explanation:
      'Ground-mount foundations come in two main types. Concrete ballast (precast concrete blocks, no ground penetration — the array sits on the ground supported by the ballast weight) suits soft ground, avoids planning permission complications, and is straightforward to remove if the land use changes. Driven piles (galvanised steel piles driven into the ground) have a lighter visual footprint and better long-term stability but may require geotechnical assessment and planning consideration. The choice depends on ground conditions, planning requirements, and the customer\'s long-term land-use plans.',
  },
  {
    id: 4,
    question:
      'The PWI common-mistakes list flags &ldquo;installing modules flush to roof surface&rdquo; as a high-frequency error. What\'s the cooling discipline?',
    options: [
      'Modules can be installed any way',
      'Maintain the 70–100 mm (7–10 cm) standoff above the roof surface — encourages natural convection and reduces module operating temperature by 10–20°C vs flush-mounted installs. The yield gain over a 25-year array life is 5–8% accumulated; the structural / thermal cost of flush-mounting is meaningful',
      'Flush-mounting improves cooling',
      'Standoff doesn\'t matter',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 712 makes the installer responsible for delivering adequate heat dissipation per the manufacturer\'s spec (Section 2.2). The standard discipline is the 70–100 mm standoff above the roof surface — natural convection between the module backsheet and the roof surface keeps cell temperatures 10–20°C cooler than flush-mounted equivalents. The temperature coefficient (~-0.4 %/°C P_max) means the cooler install yields measurably more annual energy. Flush-mounting also voids the manufacturer\'s warranty in most cases.',
  },
  {
    id: 5,
    question:
      'A customer with planning constraints (Conservation Area, restrictions on visible-from-public-realm PV) wants PV on their south-facing roof. The on-roof retrofit aesthetic is unacceptable to the local planning authority. What architectural alternative may be acceptable?',
    options: [
      'No PV',
      'In-roof integrated PV — the modules replace the tiles over the array area, the array reads as part of the roof rather than as panels on top. Acceptability depends on the local planning policy; engagement with the conservation officer at survey stage is the recommended path. The alternative is rear-roof on-roof (not visible from public realm) where the geometry allows',
      'Ground-mount in front garden',
      'Solar thermal instead',
    ],
    correctAnswer: 1,
    explanation:
      'Conservation Area and listed-building restrictions on visible-from-public-realm PV can sometimes be resolved with in-roof integration (where the array reads as part of the roof surface rather than as panels sitting on top). Acceptability is decided by the local planning authority\'s conservation officer; the survey-stage engagement is essential. The alternative is moving the array to a rear-facing roof slope not visible from public realm (where the geometry allows). The competent installer reads the planning landscape (Module 1 Section 7) and proposes the architectural alternative early.',
  },
  {
    id: 6,
    question:
      'A 60 m² south-facing roof, mid-Wales, customer wants maximum annual yield. The roof pitch is 35°, azimuth 180° (true south). Approximate annual yield for a fully-occupied 60 m² array?',
    options: [
      'Hard to estimate without more data',
      'PVGIS or equivalent yield modelling tools are the operational reference. For mid-Wales, south-facing, 35° tilt, modern modules at ~22% efficiency, performance ratio 0.80, the modelled yield is roughly 950–1,050 kWh/kWp per year. A fully-occupied 60 m² roof at ~200 W/m² module density = ~12 kWp = 11,400–12,600 kWh/year',
      '5,000 kWh/year exactly',
      '50,000 kWh/year',
    ],
    correctAnswer: 1,
    explanation:
      'PVGIS (Photovoltaic Geographical Information System) is the standard operational reference for UK PV yield modelling — free online tool maintained by the European Commission JRC. For typical UK locations with south-facing 30–40° tilt and modern modules at ~22% efficiency: 950–1,050 kWh/kWp per year. The performance ratio (0.75–0.85 depending on shading, temperature, soiling and inverter efficiency) is applied to scale from the theoretical yield to the modelled real-world yield. A 60 m² roof at ~200 W/m² module density gives ~12 kWp, modelled yield ~11,400–12,600 kWh/year. MCS MIS 3002 design pack includes the modelled yield calculation.',
  },
  {
    id: 7,
    question:
      'A solar carport (PV-roofed parking structure) on a commercial site combines two functions — what is the key design consideration distinct from rooftop PV?',
    options: [
      'No special consideration',
      'Structural design must handle both the PV load AND the vehicle-impact loads (parked / moving vehicles can collide with carport supports). Foundations must be more substantial than rooftop or typical ground-mount. EV charging integration is often paired with the carport — PV roof feeds chargepoints below, requiring cross-discipline design under Section 712 + Section 722 + Chapter 82',
      'Just the colour',
      'Carports cannot have PV',
    ],
    correctAnswer: 1,
    explanation:
      'Solar carports combine structural engineering (supporting both PV load and vehicle-impact protection), PV electrical design (Section 712), and EV charging design (Section 722) where chargepoints are integrated. Chapter 82 PEI framing applies on hybrid PV + EV installations. The carport structural design typically requires a structural engineer\'s involvement — the load case is more complex than rooftop or ground-mount. Solar carports are growing in the commercial / fleet UK market driven by Part S (Module 1 Section 7) and the supply-constraint-on-EV-charging dynamics (Module 1 Section 5).',
  },
  {
    id: 8,
    question:
      'A heavy partial-shade scenario from an adjacent tree affects 4 of 12 modules on a south roof for ~3 hours per day. The customer wants on-roof retrofit. What architectural mitigation pays back?',
    options: [
      'String inverter with single MPPT — accept the loss',
      'Module-level optimisation — microinverters or power optimisers on all 12 modules (covered in Section 2.5). The 4 shaded modules operate at their own MPP when shaded (limited by shade) while the 8 unshaded modules continue to operate at full MPP. Without module-level optimisation, string-level mismatch from the bypass-diode bypass would lose significantly more than the shaded modules\' direct production loss',
      'Remove the tree',
      'Smaller array',
    ],
    correctAnswer: 1,
    explanation:
      'Heavy partial shading is the classic case for module-level optimisation. The bypass-diode behaviour on a shaded sub-string (Section 2.2) loses the entire sub-string\'s production, not just the shaded cell\'s. On a 12-module string with 4 shaded modules, a string-level inverter would lose all 4 (and their sub-string companions) during shade — easily 30–40% of array output during the shade window. Module-level optimisation (microinverters or power optimisers — Section 2.5) lets each shaded module produce what it can while the 8 unshaded modules continue at full MPP. The yield recovery over 25 years is substantially more than the hardware premium.',
  },
];

const faqs = [
  {
    question:
      'How thick is a typical on-roof PV mounting rail system, and how does it affect the roof aesthetic?',
    answer:
      'A typical on-roof rail system stands the modules 70–100 mm above the roof surface — modules visible from the ground appear as a panel sitting ~10 cm above the original roof line. Modern slimline rails reduce the visual depth but cannot go below the cooling-airflow minimum. In-roof systems (integrated PV) sit flush with the surrounding tile / slate line because the modules replace the covering. BIPV systems sit within the building\'s architectural design and can be effectively invisible (PV glazing in a glass wall, for example) at the cost of higher per-kWp pricing.',
  },
  {
    question:
      'What roof types are suitable for on-roof PV?',
    answer:
      'Standard pitched roofs with clay or concrete tiles, slate (natural or composite), or metal sheet are all standard on-roof PV targets. Different roof types use different fixings: tile hooks slide between tile courses with a hook over the rafter / batten; slate hooks attach via slate-specific fixings; metal sheet uses adhesive or mechanical-fixing clamps depending on the panel profile. Flat roofs use ballasted or mechanically-anchored frame systems (different from pitched-roof rails). Thatch is generally not PV-suitable. Asbestos cement (older industrial buildings) presents safety-and-disturbance complications.',
  },
  {
    question:
      'Why is the 70–100 mm standoff such a recurring rule?',
    answer:
      'It\'s a thermal and warranty rule rolled together. Thermally, the standoff enables natural-convection airflow under the modules — cool air enters at the lower edge of the array, warms as it rises behind the modules, and exits at the upper edge. The result is cell temperatures 10–20°C cooler than flush-mounted equivalents, with a measurable yield benefit at the typical -0.4%/°C P_max temperature coefficient. The warranty rule: most module manufacturers specify the minimum standoff in their installation instructions; installing below that voids the warranty. BS 7671 Section 712 picks up the manufacturer\'s requirement as a regulatory obligation on the installer (Section 2.2).',
  },
  {
    question:
      'How does ground-mount PV compare with rooftop on a £/kWp basis?',
    answer:
      'Ground-mount typically comes in at 10–25% lower £/kWp than rooftop for a comparable system size, due to easier access, simpler mounting (no roof-penetration sealing, no flashings), better module spacing (no roof-geometry constraints), and easier cable routing. The trade-off is the land take — a 5 kWp ground-mount array needs ~30–40 m² of clear south-facing land, plus access for maintenance. Planning permission may be required for ground-mount above certain thresholds (typically &gt; 9 m² in domestic settings; commercial varies). The lower £/kWp is offset for many customers by limited land availability — rooftop wins on space-constrained sites.',
  },
  {
    question:
      'Is BIPV worth the cost premium on a typical residential install?',
    answer:
      'Usually not, on cost-justification alone. Standard BIPV runs 1.5–3× the £/kWp of on-roof or in-roof PV. The justification is architectural — premium aesthetic, integration into the building design, applications where standard PV is unacceptable (listed buildings, high-end residential, commercial brand showcases). The marginal cost over standard PV is paid for by the architectural value, not the energy yield. For mainstream residential installs the cost premium does not pay back through energy alone. The market is currently small but growing, particularly on premium new-build and architectural-led refurbishment.',
  },
  {
    question:
      'How do solar carports integrate with EV charging?',
    answer:
      'Solar carports are the natural home for EV charging in commercial / fleet settings — the carport roof supplies PV; the parking spaces below host chargepoints. The integration combines Section 712 (PV) + Section 722 (EV charging) + Chapter 82 (PEI) on one project. The PV typically charges a BESS or feeds chargepoints directly during daylight, with grid backup for cloudy conditions. The structural engineering of the carport handles both the PV load and the vehicle-impact loads (parked / moving vehicles can collide with supports). Solar carport projects are growing rapidly in commercial / fleet UK contexts; the cross-discipline design demands competence across PV, EV and BESS chapters.',
  },
  {
    question:
      'What aspects of BS 7671 Section 712 are architecture-specific?',
    answer:
      'Section 712 is largely architecture-agnostic — the same Section 712 rules (712.1 scope, 712.412 reinforced insulation, 712.431 string protection, 712.433.101.1 Upc/Isc max determination) apply to on-roof, in-roof, ground-mount and BIPV. What changes by architecture is the mechanical / structural arrangement and the heat dissipation discipline. The Section 712 manufacturer-heat-dissipation requirement applies differently — on-roof needs the 70–100 mm standoff; in-roof has less airflow and may need slightly derated yield modelling; ground-mount has the best airflow; BIPV varies by integration type. The cert evidence bundle records the architecture-specific design pack including the heat-dissipation arrangement.',
  },
  {
    question:
      'What\'s a "sub-array" and when do I have one?',
    answer:
      'A sub-array is an electrically independent portion of a larger PV install — typically connected to its own MPPT input on a multi-MPPT inverter or its own dedicated inverter. The term is used in MCS / IET CoP contexts to distinguish the per-MPPT electrical units within a larger array. A 10 kWp install with two orientations and a dual-MPPT inverter has two sub-arrays. A 50 kWp commercial install with six MPPTs has six sub-arrays. The Section 712.431 string protection logic applies per sub-array, not necessarily per overall array. The cert evidence bundle records each sub-array\'s design independently.',
  },
  {
    question:
      'How do I handle a customer who wants east-only or west-only orientation (no south-facing roof available)?',
    answer:
      'East- or west-only installs produce ~75–85% of equivalent south-facing yield in UK conditions. Customers without south-facing roof options can still get viable PV — the design pack uses PVGIS or equivalent for the actual orientation, modelled yield reflects the orientation reality, and the customer is told to expect 75–85% of the &ldquo;south-facing equivalent&rdquo; performance. East-only peaks in the morning; west-only peaks in the afternoon — affects self-consumption patterns and SEG export timing. The cert evidence bundle includes the orientation rationale and the modelled yield against the realistic expectation, not the south-facing reference.',
  },
];

export default function RenewableEnergyModule2Section6() {
  const navigate = useNavigate();

  useSEO({
    title:
      'PV system architectures | Renewable Energy 2.6 | Elec-Mate',
    description:
      'On-roof, in-roof, ground-mount, BIPV and solar carport architectures. Mounting, structural, shading and orientation considerations, plus the BS 7671 Section 712 heat dissipation discipline and how it applies to each architecture.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · BS 7671:2018+A4:2026"
            title="PV system architectures"
            description="On-roof, in-roof, ground-mount, BIPV and solar carport architectures. Mounting, structural, shading and orientation considerations, plus the BS 7671 Section 712 heat dissipation discipline that lands on each architecture."
            tone="yellow"
          />

          <TLDR
            points={[
              'Four main PV system architectures in the UK market: on-roof (dominant residential, modules on rails above existing roof), in-roof (modules replace tiles over the array area), ground-mount (frame structures on land), BIPV (PV as the building component — façades, glazing, walkable surfaces).',
              'Solar carports combine PV roof + EV charging beneath — growing rapidly in commercial / fleet UK contexts. Cross-discipline design under Section 712 (PV) + Section 722 (EV) + Chapter 82 (PEI).',
              'BS 7671 Section 712 manufacturer-heat-dissipation requirement applies per architecture — on-roof needs the 70–100 mm standoff for natural convection; in-roof has less airflow; ground-mount has the best airflow; BIPV varies by integration type.',
              'Structural / mechanical survey is architecture-specific: roof structure for on-roof and in-roof; ground conditions for ground-mount; building façade structural design for BIPV.',
              'UK optimal orientation is south-facing, 30–40° tilt. Real installs follow the existing roof pitch with 5–15% loss from sub-optimal orientation. Multi-pitch and shading scenarios need multi-MPPT or module-level optimisation (Section 2.5).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the four main PV system architectures and the conditions where each is the right choice.',
              'Run the architecture-specific survey items — roof structural capacity for on-roof / in-roof; ground conditions for ground-mount; building design for BIPV.',
              'Apply the BS 7671 Section 712 heat-dissipation discipline per architecture — particularly the 70–100 mm standoff on on-roof installs.',
              'Calculate modelled yield via PVGIS or equivalent for any orientation / tilt / location combination, and present realistic vs theoretical performance to customers.',
              'Anticipate planning constraints (Conservation Areas, listed buildings, Article 4 Directions) on visible-from-public-realm PV and propose architectural alternatives where required.',
              'Integrate solar carport projects under the cross-discipline Section 712 + Section 722 + Chapter 82 framework.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The architecture follows the building. The electrical follows the architecture.</Pullquote>

          <ContentEyebrow>The four main PV system architectures</ContentEyebrow>

          <ConceptBlock
            title="On-roof — the dominant retrofit architecture"
            plainEnglish="Modules mounted on rails fixed above an existing roof covering. The dominant UK residential PV architecture by volume. The original roof waterproofing stays; PV is added on top with a 70–100 mm standoff."
            onSite="Tile hooks for clay / concrete tile roofs. Slate hooks for slate roofs. Mechanical-fixing clamps or adhesive systems for metal-sheet roofs. The rails span across rafters; the modules clamp to the rails. Flashings seal any roof penetrations. Standard install pattern — most installers do this every job."
          >
            <p>On-roof characteristics and typical applications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Architecture</strong> — rails fixed above
                roof covering via tile hooks / slate hooks / clamps; modules clamp to
                rails; 70–100 mm standoff for natural-convection cooling
              </li>
              <li>
                <strong className="text-white">Best for</strong> — retrofit installs on
                existing pitched roofs; new-builds where standard aesthetic is acceptable;
                installs where roof replacement is not in scope
              </li>
              <li>
                <strong className="text-white">Pricing</strong> — the baseline against
                which other architectures are compared. Typical UK 2026 residential
                pricing ~£1,500–2,000 per kWp installed (full system including modules,
                mounting, inverter, install)
              </li>
              <li>
                <strong className="text-white">Constraints</strong> — visible-from-public-
                realm in Conservation Areas may require planning permission; listed
                buildings typically need listed-building consent; rafter and structural
                load must support the additional weight
              </li>
            </ul>
          </ConceptBlock>

          <PvArchitectures caption="On-roof, in-roof and ground-mount — how the mounting choice trades off cooling, cost and yield." />

          <ConceptBlock
            title="In-roof — integrated aesthetic, new-build natural"
            plainEnglish="Modules integrated into the roof structure, replacing tiles or slates over the array area. The modules become the weatherproof roof covering. Premium aesthetic; the roof reads as one continuous surface."
            onSite="In-roof is the natural new-build PV architecture — the roof is designed around the PV. Retrofit in-roof is possible but typically requires removing the existing tiles in the array area and fitting the in-roof mounting system; significantly more roof work than on-roof retrofit."
          >
            <p>In-roof characteristics and typical applications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Architecture</strong> — proprietary
                mounting system replaces tiles / slates over the array area; modules
                become the weatherproof covering; perimeter flashings seal the boundary
                with surrounding tile / slate
              </li>
              <li>
                <strong className="text-white">Best for</strong> — new-builds where the
                roof can be designed around the PV; major roof refurbishments where the
                covering is being replaced anyway; installs where the on-roof aesthetic
                is unacceptable to the customer or planning authority
              </li>
              <li>
                <strong className="text-white">Pricing</strong> — typically 10–25%
                premium over on-roof retrofit due to the more complex mounting and
                flashing system, offset partly by the saved tile / slate cost on
                new-build
              </li>
              <li>
                <strong className="text-white">Constraints</strong> — module heat
                dissipation is lower than on-roof (less airflow under modules) — modelled
                yield may be 2–5% below an equivalent on-roof install; warranty
                conditions per the mounting system supplier vary
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Ground-mount — best cooling, land-take constraint"
            plainEnglish="Frame structures supporting modules at a fixed tilt above the ground. The modules are fully ventilated front and rear, giving the best cooling performance of any architecture. Constrained by land availability."
            onSite="Galvanised steel or aluminium frames. Foundations: concrete ballast (no ground penetration, suits soft ground, no planning issues) or driven piles (lighter visual footprint, may require geotechnical assessment). Modules at optimal tilt and orientation rather than constrained by roof geometry."
          >
            <p>Ground-mount characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Architecture</strong> — frame structure
                (steel or aluminium) supporting modules at a fixed tilt; foundations are
                concrete ballast or driven piles; full ventilation front and rear of
                modules
              </li>
              <li>
                <strong className="text-white">Best for</strong> — sites with limited
                roof area but available land; rural / agricultural settings; commercial /
                utility-scale installs; where peak yield from optimal orientation / tilt
                matters
              </li>
              <li>
                <strong className="text-white">Pricing</strong> — 10–25% lower £/kWp
                than rooftop for equivalent system size (easier access, simpler mounting,
                no roof-penetration sealing, better cooling = no derate)
              </li>
              <li>
                <strong className="text-white">Constraints</strong> — land take (~6–8 m²
                per kWp installed including spacing for maintenance access); planning
                permission may be required above certain thresholds; visual impact for
                neighbouring properties; theft / vandalism risk on open sites
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BIPV — architectural PV at premium cost"
            plainEnglish="Photovoltaic elements that serve a structural / architectural building role as well as generating electricity. PV façades, PV glazing, walkable PV. The PV element IS the building component."
            onSite="BIPV is premium-cost territory — typically 1.5–3× the £/kWp of standard PV. The justification is architectural rather than energy economics. Amorphous thin-film (Section 2.1) is often the cell technology of choice for BIPV — lower nameplate efficiency but better form-factor flexibility and partial-shade tolerance."
          >
            <p>BIPV types and typical applications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV façades</strong> — PV cladding replacing
                conventional building cladding on vertical or inclined surfaces. Premium
                commercial / architectural use. Lower per-W yield (vertical PV captures
                less sun than tilted) but high architectural value
              </li>
              <li>
                <strong className="text-white">PV glazing</strong> — translucent PV
                modules replacing conventional glass in curtain walling, skylights or
                conservatory roofs. Generates electricity while transmitting visible
                light
              </li>
              <li>
                <strong className="text-white">Walkable PV</strong> — PV surfaces designed
                to bear pedestrian or light vehicular loads, used in terraces, walkways,
                car-park surfaces. Amorphous thin-film is the typical cell technology
              </li>
              <li>
                <strong className="text-white">Solar carports</strong> — PV roof
                structures over parking. Often paired with EV charging — covered in
                detail below
              </li>
            </ul>
            <p>
              BIPV economics are architectural, not energy. The cost premium per kWp is
              paid for by the building\'s aesthetic / brand / planning-acceptability
              value rather than by direct yield economics. The market is small but
              growing, particularly on premium new-build and architectural-led
              refurbishment.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Solar carports — PV + EV charging integrated</ContentEyebrow>

          <Pullquote>The carport is the natural home for PV + EV charging — Section 712 + Section 722 + Chapter 82 in one project.</Pullquote>

          <ConceptBlock
            title="Solar carports — combining PV, EV and PEI design"
            plainEnglish="A solar carport is a PV-roofed parking structure. The PV roof generates electricity; the parking spaces below typically host EV chargepoints. The carport architecture brings PV, EV charging and (often) BESS into one project."
            onSite="Solar carports are growing rapidly in commercial / fleet UK contexts. The structural engineering combines PV load with vehicle-impact protection. The electrical design crosses three BS 7671 chapters — Section 712 (PV), Section 722 (EV charging), Chapter 82 (PEI). The Module 1 Section 7 Part S building regulation drives the new-build EV / carport market."
          >
            <p>Solar carport design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Structural design</strong> — handles PV
                load + vehicle-impact loads on supports. Typically requires structural
                engineer involvement. Foundations more substantial than typical
                ground-mount
              </li>
              <li>
                <strong className="text-white">PV electrical design</strong> — Section
                712 applies as for any PV install. Sub-arrays organised per carport bay
                or per inverter MPPT input. Multi-MPPT inverter typical for the
                geometry
              </li>
              <li>
                <strong className="text-white">EV charging integration</strong> — chargepoints
                per parking bay, typically AC chargers at 7.4 kW per bay (residential /
                light commercial) or 22 kW three-phase (workplace). DC fast charging
                (50–150 kW) for fleet / public installations
              </li>
              <li>
                <strong className="text-white">PEI framing</strong> — A4:2026 Chapter 82
                treats the install as a Prosumer\'s Electrical Installation (Module 1
                Section 5). System-level design discipline above the per-technology
                chapters
              </li>
              <li>
                <strong className="text-white">BESS integration</strong> — often paired
                to smooth PV output, peak-shave demand, or provide buffer storage for
                EV charging. Chapter 57 applies (Module 5 covers BESS in detail)
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Architecture-specific structural survey discipline</ContentEyebrow>

          <Pullquote>Every architecture has its own survey items. Skipping any one creates the failure mode.</Pullquote>

          <ConceptBlock
            title="Structural / mechanical survey per architecture"
            plainEnglish="The survey discipline from Module 1 Section 6 adapts per architecture. On-roof checks roof structure; ground-mount checks ground; BIPV engages the building designer."
            onSite="The Module 1 Section 6 survey checklist remains the foundation. Architecture-specific items add to the standard survey: roof structural capacity calculation; ground geotechnical assessment; building façade structural design review."
          >
            <p>On-roof survey items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Roof structural capacity for PV load + wind uplift (typically 15–20 kg/m² static plus wind loads — competent surveyor or structural engineer signs off where loading approaches design limits)</li>
              <li>Roof covering condition and remaining service life vs the 25+ year PV array life</li>
              <li>Rafter / batten arrangement and the appropriate fixings (tile hooks, slate hooks, metal-sheet clamps)</li>
              <li>Flashing requirements around penetrations</li>
              <li>Access for install, cleaning and end-of-life removal</li>
            </ul>
            <p>In-roof survey items (additional to on-roof):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Roof structure capable of accepting in-roof mounting system perimeter flashings and integrated waterproofing</li>
              <li>Existing tile / slate that will be removed and how the perimeter integrates with the remaining covering</li>
              <li>Mounting system supplier\'s specific installation requirements (including warranty conditions)</li>
            </ul>
            <p>Ground-mount survey items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Ground conditions — soft ground / clay / chalk / shallow rock determines foundation type (ballast vs piles)</li>
              <li>Geotechnical assessment for pile foundations (typically a borehole or trial pit)</li>
              <li>Planning permission threshold for the proposed array size and location</li>
              <li>Wind uplift loads at the site (the open-ground location typically has higher wind exposure than rooftop)</li>
              <li>Theft / vandalism protection — fencing, lighting, monitoring</li>
              <li>Cable trenching route from array to inverter location</li>
            </ul>
            <p>BIPV survey items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Engagement with the building designer / architect — BIPV is rarely an add-on after design completion</li>
              <li>Façade / glazing / surface structural integration with the building design</li>
              <li>Long-term replacement / maintenance access for the PV elements</li>
              <li>Specific BIPV product specifications (often requires bespoke modules rather than off-the-shelf)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Orientation, tilt and shading topology</ContentEyebrow>

          <ConceptBlock
            title="Orientation and tilt — and what the real-world install looks like"
            plainEnglish="The theoretical optimum for UK PV is south-facing, 30–40° tilt. Real installs follow the existing roof pitch and orientation, accepting a 5–15% loss from theoretical optimum."
            onSite="PVGIS (the European Commission\'s PV yield modelling tool) is the operational reference. Plug in the postcode, the orientation (azimuth) and the tilt; PVGIS returns the modelled annual yield in kWh/kWp. The MCS MIS 3002 design pack includes the yield modelling. Real installs use the modelled yield against the actual roof, not the theoretical south-facing 30° optimum."
          >
            <p>Orientation and tilt principles for UK installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Azimuth (orientation)</strong> — 180°
                (south) is theoretical optimum. East (90°) or west (270°) loses ~15–25%
                vs south. North-facing (0°/360°) loses ~50%+ — generally not viable
              </li>
              <li>
                <strong className="text-white">Tilt</strong> — 30–40° is optimal for UK
                latitudes. Flatter tilts capture more summer sun but lose winter; steeper
                tilts capture more winter sun but lose summer. The 30–40° range balances
                the annual sum
              </li>
              <li>
                <strong className="text-white">Roof pitch</strong> — typical UK domestic
                roofs are 30–45° pitch, often close to optimal. The visual / structural
                cost of modifying the roof for &ldquo;perfect&rdquo; orientation is
                rarely justified
              </li>
              <li>
                <strong className="text-white">Multi-orientation arrays</strong> — covered
                in Section 2.3 and Section 2.4 (multi-MPPT inverter solves the
                mismatch). PVGIS models each orientation independently
              </li>
            </ul>
            <p>Shading topology — survey-stage discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Identify shading sources</strong> — trees,
                chimneys, neighbouring buildings, distant horizon objects. Walk the
                proposed array area at survey and note potential shadow casters
              </li>
              <li>
                <strong className="text-white">Track shadows across the day</strong> —
                morning, midday, afternoon — and seasonally (winter sun is lower,
                shadows are longer). Shade-analysis tools (SunEye, Solmetric, mobile
                apps) automate this
              </li>
              <li>
                <strong className="text-white">Map shadows to modules</strong> — which
                modules in the proposed array are affected at which times
              </li>
              <li>
                <strong className="text-white">Architectural mitigation</strong> —
                multi-MPPT inverter for orientation-driven mismatch; module-level
                optimisation for shading-driven mismatch (Section 2.5)
              </li>
              <li>
                <strong className="text-white">Survey artefact</strong> — the shading
                analysis becomes part of the cert evidence bundle, justifying the
                topology choice
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A retrofit on-roof install with a 30-year-old concrete tile roof"
            situation="A homeowner wants 5 kWp PV on a south-facing roof. The roof is 30 years old, concrete tile, in serviceable but ageing condition. The roof has had no major refurbishment work; the underlay condition is unknown. The PV array would be installed on top via tile hooks and rails."
            whatToDo="Survey records the roof condition as a customer-acknowledged risk. PV array life is 25+ years; the roof\'s remaining service life is estimated 5–15 years (ageing underlay; potential tile cracks not visible from below). If the roof needs refurbishment within the array life, the PV must be removed for the roof work and re-installed — a substantial additional cost. Three options presented to the customer: (1) refurbish the roof first, then install PV — clean fix, higher up-front cost. (2) Install PV now accepting the future remove-and-refit liability — captured as a customer-acknowledged risk in the survey artefact. (3) Defer the install until the roof refurbishment is scheduled — combines the two projects. The competent installer presents the options and the cost trade-offs; the customer\'s informed decision is recorded in writing. The on-roof retrofit proceeds with the structural survey signing off on current load capacity, and the customer signs the acknowledgement on the remaining roof service life."
            whyItMatters="On-roof installs on ageing roofs are the most common scenario where the customer-acknowledged-risk discipline (Module 1 Section 6) applies. Without the written record, a remove-and-refit cost dispute at year 5–10 becomes a he-said-she-said. With the record, the customer\'s informed decision is preserved; the contractor\'s liability is defined; both parties have the project plan in writing."
          />

          <Scenario
            title="A new-build with full-roof BIPV ambition"
            situation="A premium new-build customer with an architect wants a fully-integrated PV roof — the entire south-facing roof slope as PV, no visible &ldquo;panels&rdquo;, the roof reads as a continuous PV surface. Budget allows premium-tier products. Architect has designed the roof structure around the PV from concept stage."
            whatToDo="In-roof or true BIPV. In-roof: the array area uses an in-roof mounting system with proprietary modules replacing the tiles; perimeter flashings integrate with the surrounding non-PV roof (where applicable). Cost ~£2,000–2,800 per kWp installed. True BIPV: bespoke PV modules supplied by a BIPV specialist (e.g. solar tile manufacturers like SolarStone, or custom-sized PV modules for the architectural design). Cost ~£3,000–5,000 per kWp installed; potentially even higher for unique applications. The cross-discipline design engages the architect, structural engineer, BIPV product supplier, and electrical contractor; the project schedule reflects the longer lead time on bespoke products. BS 7671 Section 712 applies as standard; the Section 712 heat-dissipation requirement is delivered per the BIPV manufacturer\'s spec (often with less airflow than on-roof, accepted in modelled yield); BS EN 61730 and MCS Product List eligibility verified for any PV product used."
            whyItMatters="BIPV is the architectural premium tier. The customer pays for the aesthetic, not the energy economics. The installer\'s value is the cross-discipline coordination — engaging the architect early, sourcing the right BIPV products, delivering against the architectural design while maintaining BS 7671 compliance and MCS-funded eligibility. Most BIPV projects are 1.5–3× standard PV pricing; the customer accepts the premium for the design value."
          />

          <CommonMistake
            title="Installing on-roof PV without a structural survey"
            whatHappens="An installer quotes and installs on-roof PV on an older property without a structural survey of the roof. The structure was on the edge of its design capacity for the existing roof load alone; adding the PV pushes the loading above the design margin. After a year of wind cycling, rafters show movement; the roof develops cracks visible internally. The customer\'s building insurance investigates; the lack of a structural sign-off on the PV install is the cause."
            doInstead="A structural survey is part of every on-roof PV install (Module 1 Section 6). For typical residential roofs of standard construction, a competent surveyor (the installer if appropriately qualified, or a structural engineer for marginal cases) signs off on the additional load capacity. The cert evidence bundle includes the structural assessment record. On older or non-standard structures, engage a structural engineer at survey stage."
          />

          <CommonMistake
            title="Choosing in-roof on a retrofit without budgeting for the roof work"
            whatHappens="An installer specifies in-roof PV on a retrofit install to deliver the customer\'s preferred aesthetic. The quote does not adequately budget the roof work — removing existing tiles in the array area, fitting the in-roof mounting system, integrating the perimeter flashings, and disposing of the displaced tiles. The actual job exceeds the budget by 30–50%. The customer disputes; the installer absorbs the overrun or argues with the customer about scope."
            doInstead="In-roof on retrofit is materially more labour-intensive than on-roof. The survey-stage quote separates the PV install cost from the roof work cost — and the roof work cost reflects realistic time and materials. For most retrofit installs, on-roof is the cost-effective choice; in-roof is reserved for cases where the aesthetic justifies the additional cost. New-builds are different — the roof is being constructed regardless, and in-roof PV replaces tile cost with module cost."
          />

          <CommonMistake
            title="Ground-mount without checking planning permission"
            whatHappens="An installer specifies a 8 kWp ground-mount install in a customer\'s rear garden without checking the planning permission threshold. The local planning authority\'s permitted-development rules limit free-standing PV to 9 m² of array area in a domestic garden (subject to other conditions). The customer\'s installed array is ~50 m² — well above the threshold. A neighbour reports the install; the LPA serves a planning contravention notice; the customer is required to remove the array."
            doInstead="Ground-mount in domestic settings has size thresholds in the permitted-development framework. Check the local planning authority\'s rules at survey stage. Most domestic ground-mount above 9 m² requires planning permission. Commercial / agricultural ground-mount has different rules, often more permissive but with sometimes more substantial application requirements. The cert evidence bundle includes the planning verification record."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Four main PV system architectures: on-roof (dominant retrofit), in-roof (new-build natural), ground-mount (best cooling, land-take constraint), BIPV (architectural premium).',
              'Solar carports combine PV roof + EV charging + (often) BESS in one project — cross-discipline design under Section 712, Section 722, Chapter 57 and Chapter 82.',
              'BS 7671 Section 712 manufacturer-heat-dissipation requirement applies per architecture. On-roof: 70–100 mm standoff for natural convection. In-roof: less airflow, slight derate. Ground-mount: best cooling. BIPV: per manufacturer.',
              'Architecture-specific survey items extend the Module 1 Section 6 standard checklist — roof structural capacity, ground conditions, building design integration.',
              'UK optimal orientation is south-facing 30–40° tilt. Real installs follow the existing roof pitch with 5–15% loss vs theoretical. PVGIS or equivalent is the modelling tool.',
              'Shading topology is a survey-stage discipline — identify sources, track across day and season, map to modules, propose architectural mitigation (multi-MPPT or module-level optimisation).',
              'Planning constraints (Conservation Areas, listed buildings, Article 4 Directions, ground-mount size thresholds) need survey-stage verification — Module 1 Section 7 covers the framework.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2.5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Inverter topologies
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.7 DC vs AC coupling
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
