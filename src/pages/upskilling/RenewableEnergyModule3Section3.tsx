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
import { WahHierarchy } from '@/components/study-centre/diagrams/renewableM3';
import { StandoffCrossSection, FixingByRoofType, FlashingOrientation } from '@/components/study-centre/diagrams/renewablePvSiting';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s3-wah',
    question:
      'The Work at Height Regulations 2005 set the hierarchy of control for roof work. What\'s the correct order?',
    options: [
      'Provide ladders, then personal fall-arrest, then collective edge protection',
      'AVOID work at height, then PREVENT falls, then MINIMISE the consequences',
      'Use a harness and anchor first, before considering any other control measure',
      'Minimise consequences first, prevent falls second, avoid height work last',
    ],
    correctIndex: 1,
    explanation:
      'The Work at Height Regulations 2005 set the AVOID → PREVENT → MINIMISE hierarchy. Applied to PV roof work: AVOID would mean ground-mount or BIPV (avoiding roof access); PREVENT means scaffolding or edge protection or MEWP (the typical standard for PV installs); MINIMISE means safety nets or harness systems where falls cannot be prevented. The Risk Assessment and Method Statement (RAMS) records the chosen control measures.',
  },
  {
    id: 'm3s3-structural',
    question:
      'Structural assessment for a 6 kWp PV install adds approximately what dead load to a typical UK domestic roof?',
    options: [
      'Effectively zero, since modern modules are essentially weightless',
      'Around 250-350 kg total, roughly 10-15 kg/m² across the array footprint',
      'Around 5,000 kg total, roughly 200 kg/m² across the array footprint',
      'Around 100 kg per module, roughly 60 kg/m² across the array footprint',
    ],
    correctIndex: 1,
    explanation:
      'PV adds ~10-15 kg/m² distributed dead load (modules + mounting + wiring) over the array footprint. A 15-module install adds ~280 kg of modules + ~50 kg of mounting = ~330 kg total. UK pitched roofs designed to BS EN 1990 + BS EN 1991 / BS EN 1991-1-3 (snow + imposed) have typical capacity of 25-30 kg/m² for the imposed + dead load combination; the 10-15 kg/m² added is usually within capacity. The structural assessment confirms for the specific roof — older / weakened structures may not accommodate. The MCS MIS 3002 design pack records the assessment.',
  },
  {
    id: 'm3s3-standoff',
    question:
      'The 70-100 mm roof standoff above the tile / slate / metal surface — what does it do?',
    options: [
      'Purely decorative, to lift the modules clear of the roof line',
      'Natural convection cooling, letting air flow under the module to remove heat',
      'Lightning protection, by isolating the module from the roof structure',
      'Wind-uplift resistance, by adding mass to anchor the module down',
    ],
    correctIndex: 1,
    explanation:
      'The 70-100 mm standoff allows natural convection cooling. Without standoff, cell temperature can reach 25-35°C above ambient at peak summer noon; with proper standoff, 10-15°C above ambient. At a P_max temperature coefficient of -0.4 %/°C, the difference is 4-8% additional power loss without standoff. Required by module manufacturer mounting specs and by Reg 712.512.2.1 for site-radiation responsibility (Module 3 Section 1).',
  },
  {
    id: 'm3s3-tile-fixings',
    question:
      'For a UK tiled roof install, the mounting fixings should go through the tile and into the:',
    options: [
      'Tile only, with the bracket bedded into the tile and never the rafter',
      'Rafter, the structural timber member running from ridge to eaves',
      'Tile batten only, spreading the load across several battens',
      'Mortar bed at the ridge, anchoring the bracket into the ridge line',
    ],
    correctIndex: 1,
    explanation:
      'Mounting fixings must reach the structural rafter. The tile is a roof-covering element, not a structural one — fixings through tile alone would pull out under wind loading. Standard approach on UK tiled roofs: replace the tile in the fixing location with a "flashing-tile" or "flush-mount kit" — a specialised tile with an integrated fixing point that penetrates through and into the rafter below. The flashing seals the penetration; the rafter takes the load.',
  },
  {
    id: 'm3s3-wind-uplift',
    question:
      'Wind uplift on a PV array — where on the roof is the wind-uplift pressure highest?',
    options: [
      'The centre of the roof, where the array is most exposed to gusts',
      'The edges and corners, typically 1.5-2× the centre-zone pressure',
      'Immediately above the chimney, where airflow is channelled upward',
      'Roughly equal everywhere, since wind loads the whole roof uniformly',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1991-1-4 wind code zones the roof into corner / edge / centre regions, with corner / edge zones experiencing 1.5-2× the wind pressure of the centre. PV modules placed at the roof edges or corners experience the higher pressure during storms — both higher uplift force per module and higher fixing pull-out load. The structural assessment must zone the modules and confirm fixing capacity in each zone. PWI common-mistakes flags "cramming modules to roof edges" as a structural / safety error.',
  },
  {
    id: 'm3s3-flashings',
    question:
      'Flashing-tile penetration through a UK tile roof — what\'s the waterproofing principle?',
    options: [
      'No waterproofing needed, since the modules above shield the penetration',
      'A raised collar channels water down the slope around the penetration, with an EPDM seal',
      'Silicone sealant alone around the bolt, topped up at each service visit',
      'A second tile laid loosely over the penetration to shed rainwater',
    ],
    correctIndex: 1,
    explanation:
      'The flashing-tile waterproofing principle: water flows DOWN the roof slope. The flashing-tile has a raised lip / collar above the penetration that channels water around the fixing point and back onto the next tile down — never above the penetration. The bracket-to-flashing interface uses an EPDM gasket or equivalent for the seal. Combined with the natural water-shedding action of the slope, the penetration becomes weatherproof. Same principle as flashing around chimneys, vents, soil stacks.',
  },
  {
    id: 'm3s3-712-512',
    question:
      'BS 7671 Reg 712.512.2.1 makes the installer responsible for adequate heat dissipation under site\'s maximum solar radiation. How does the mounting arrangement evidence compliance?',
    options: [
      'No mounting arrangement is relevant; the requirement is the manufacturer\'s alone',
      'The 70-100 mm standoff plus the manufacturer mounting spec, recorded in the bundle',
      'Whatever standoff the customer prefers on aesthetic grounds, with no record',
      'Forced cooling fans beneath every module, recorded in the bundle',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.512.2.1 is satisfied through: (1) site irradiance assessment (Module 3 Section 1); (2) manufacturer mounting spec (rail spacing, module gap, ventilation); (3) the 70-100 mm standoff for natural convection cooling; (4) cert evidence bundle recording all three. The standard UK install with 70-100 mm standoff + manufacturer spec satisfies the requirement at typical UK irradiance (~1,000 W/m² STC).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'PV roof installer arrives at a job. Roof scaffolding is in place but no edge protection. What\'s the correct action under WAH Regulations 2005?',
    options: [
      'STOP work — add edge protection or an alternative PREVENT-level arrangement before proceeding, and update the RAMS',
      'Proceed carefully, keeping back from the unprotected roof edge while working',
      'Clip a harness and lanyard to the scaffold and use that as the fall protection',
      'Work as planned, since scaffolding is already a recognised access platform',
    ],
    correctAnswer: 0,
    explanation:
      'The WAH Regulations 2005 hierarchy is AVOID → PREVENT → MINIMISE. Scaffolding without edge protection doesn\'t fully PREVENT falls — falls between the scaffold and the roof edge are still possible. Either scaffolding must be amended (add edge protection), a different arrangement substituted (MEWP, fall-arrest with anchor points), or work AVOIDED. The installer\'s duty is to escalate, not to proceed unsafely.',
  },
  {
    id: 2,
    question:
      'Structural assessment of a UK pitched-tile roof for 6 kWp install. The roof was built in 1965; rafters are nominal 100 × 50 mm at 400 mm centres. What\'s the assessment finding?',
    options: [
      'Automatically adequate — standard 1960s timber always takes PV without assessment',
      'Automatically inadequate — any pre-1990 roof must be reinforced before any PV',
      'Probably adequate, but document the assessment; escalate to a structural engineer only if decay or undersized members are found',
      'Adequate only if the array is doubled in size to spread the load more widely',
    ],
    correctAnswer: 2,
    explanation:
      'UK pitched-tile roofs from the 1960s onwards use timber sizes that are typically adequate for PV. The structural assessment confirms: (1) rafter dimensions are nominal-or-better; (2) timber is sound (no decay, no insect damage); (3) the existing roof loading plus PV (10-15 kg/m²) is within capacity; (4) wind uplift in the chosen module positions is acceptable. Where any of these are doubtful, structural engineer review is needed.',
  },
  {
    id: 3,
    question:
      'Module manufacturer mounting spec says 100 mm minimum air gap below the module. The installer\'s proposed mounting brackets give 60 mm. What happens?',
    options: [
      'Fit the 60 mm brackets, since a smaller gap improves the array\'s appearance',
      'Keep the 60 mm brackets and add forced-air fans beneath the modules to cool them',
      'Disregard the manufacturer air-gap figure as a non-binding recommendation',
      'STOP and substitute brackets — below-spec air gap raises cell temperature, voids warranty and breaks the Reg 712.512.2.1 evidence path',
    ],
    correctAnswer: 3,
    explanation:
      'Module manufacturer mounting specs typically prescribe 70-100 mm standoff and an equivalent air gap below the module for natural convection cooling. Installing at less than the specified gap: (a) modules operate hotter, accelerated degradation, void warranty; (b) Reg 712.512.2.1 site-radiation evidence path broken — the cert evidence bundle can\'t evidence compliance.',
  },
  {
    id: 4,
    question:
      'A UK customer\'s roof is metal sheet (corrugated profile). Mounting approach?',
    options: [
      'A dedicated system — clamp-on-rib (no penetration) or rivet-through into purlins with EPDM seal and bonding',
      'The same flashing-tile method used on a standard concrete-tile pitched roof',
      'A penetrating fixing through the centre of every individual sheet of the roof',
      'No mounting at all — corrugated metal roofs cannot carry a PV array',
    ],
    correctAnswer: 0,
    explanation:
      'Metal-sheet roofs (corrugated, standing-seam, trapezoidal) use bespoke mounting systems. Clamp-on-rib brackets are preferred where the roof profile allows — no penetration, no waterproofing risk, just a mechanical clamp around the rib. Penetrating brackets need bonded waterproofing and may need bonding the metal sheet to the supplementary bonding network.',
  },
  {
    id: 5,
    question:
      'PV installer is fixing brackets through tile into rafter. After fitting 4 brackets, the fixing fails the pull-out test on the 5th — the rafter at that location is decayed. Action?',
    options: [
      'Swap to longer screws to bite deeper into the same decayed timber',
      'Drive longer screws in by force until the fixing finally holds',
      'STOP and investigate — pull-out failure is a structural finding; inspect, document, reposition to sound timber or escalate to an engineer',
      'Leave that bracket out and carry on fixing the rest of the array',
    ],
    correctAnswer: 2,
    explanation:
      'Pull-out failure is a structural finding, not a fixing problem. The honest response: stop, investigate, document, consult structural engineer if needed. Forcing longer screws masks the underlying problem and creates ongoing structural risk. The cert evidence bundle records the finding and the chosen mitigation. Customer must be informed.',
  },
  {
    id: 6,
    question:
      'The IET CoP for Grid-Connected Solar PV Installations cross-references the structural assessment requirements. What level of assessment is expected?',
    options: [
      'No structural assessment is expected for domestic PV installs at all',
      'An informal estimate of the roof loading, made without any inspection',
      'A chartered structural engineer\'s report is mandatory for every domestic roof',
      'Competent visual assessment for typical roofs in good condition; engineer review only for decay, unusual construction or large arrays',
    ],
    correctAnswer: 3,
    explanation:
      'The IET CoP for Grid-Connected Solar PV Installations recognises that typical UK domestic pitched-tile / slate roofs in good condition can be assessed by a competent installer. The competent assessment includes rafter spacing, timber condition, existing loading, and the additional PV load. For roofs outside this typical category, structural engineer review is required.',
  },
  {
    id: 7,
    question:
      'Roof penetration for the bracket fixing — the flashing seal fails 2 years post-install and water enters the loft. Root cause?',
    options: [
      'Premature ageing and cracking of the existing roof tiles around the array',
      'A sealant-only L-bracket, a reversed flashing collar or a damaged EPDM gasket at the penetration',
      'Decay of the rafter the bracket is fixed into, opening up the penetration',
      'Roof tiles too small to lap correctly over the mounting bracket',
    ],
    correctAnswer: 1,
    explanation:
      'Roof-penetration water ingress is one of the most common PV install fault categories. Root causes: (a) generic L-bracket through tile with sealant only — not a long-term waterproofing strategy; (b) flashing-tile installed in wrong orientation — the raised collar must be DOWNSLOPE of the penetration; (c) EPDM gasket damaged at install.',
  },
  {
    id: 8,
    question:
      'The PWI common-mistakes list flags four high-frequency mounting errors on UK PV installs. What are they?',
    options: [
      'Module brand mismatch, cable colour, panel tilt angle and inverter location',
      'Edge cramming, missing flashing-tile, standoff below 70 mm and skipped structural assessment',
      'Customer satisfaction surveys, payment terms, scaffold hire cost and parking',
      'Module colour, frame finish, roof tile shade and inverter display brightness',
    ],
    correctAnswer: 1,
    explanation:
      'PWI common-mistakes on UK PV mounting: (1) Modules crammed to roof edges; (2) Missing flashing-tile / flush-mount kit; (3) Inadequate standoff below 70 mm; (4) Skipping structural assessment. Each is a high-frequency MCS audit finding. The competent contractor avoids all four by following manufacturer spec + IET CoP + structural assessment discipline.',
  },
];

const faqs = [
  {
    question: 'What does the Risk Assessment and Method Statement (RAMS) for PV roof work need to cover?',
    answer:
      'The RAMS must address: (1) the site-specific hazards (height of roof, weather conditions, condition of roof, access route); (2) the Work at Height Regulations 2005 hierarchy of control applied; (3) the specific protective measures for this site (scaffolding spec, anchor points, harness type); (4) the emergency rescue plan (how a fallen worker is recovered); (5) the competence of the workforce. RAMS is a HSE requirement under the WAH Regulations and the Construction (Design and Management) Regulations 2015.',
  },
  {
    question: 'Is scaffolding always required for PV roof work?',
    answer:
      'Not strictly — but it\'s the typical and preferred control measure on UK domestic PV installs. Alternative arrangements that satisfy the WAH Regulations PREVENT-falls level: (a) MEWP (cherry picker) for short-duration work; (b) tower scaffold for shorter jobs; (c) roof ladders with edge protection for very short tasks. Personal fall-arrest (harness + anchor) alone is the MINIMISE level — only acceptable where PREVENT-fall isn\'t reasonably practicable.',
  },
  {
    question: 'How does the structural assessment differ for flat roofs vs pitched roofs?',
    answer:
      'Flat-roof PV uses ballasted frames (concrete blocks weighing down a tilted module frame) rather than penetrating fixings. The structural assessment must confirm: (1) the flat-roof structure can take the ballasted load (typically 30-60 kg/m² for a tilted-frame array); (2) the roof membrane / waterproofing is intact and won\'t be damaged by the frame; (3) the wind-uplift design — flat roofs without ballast can lift; ballast quantity is calculated against BS EN 1991-1-4 for the location. Structural engineer review is often required for flat-roof PV.',
  },
  {
    question: 'What\'s the lifespan of the mounting system vs the modules?',
    answer:
      'Modules have a typical 25-30 year performance warranty (linear degradation to 80-85% of nameplate by year 25). The mounting system (aluminium rails, stainless steel brackets, flashing-tiles) is generally designed for the same lifespan — but the EPDM gaskets, neoprene pads, and any plastic components may need replacement at 15-20 years. The customer information pack covers the maintenance schedule (typically 5-yearly visual inspection).',
  },
  {
    question: 'How does mounting on slate differ from mounting on tile?',
    answer:
      'Slate is more brittle than concrete or clay tile — penetrating fixings risk fracturing the slate. The standard approach for slate roofs: use a "slate hook" — a stainless steel hook that goes UNDER the slate above the fixing location and AROUND the slate at the fixing location, with the hook attached to a bracket that fixes into the rafter through the batten. No penetration through the slate itself. The flashing approach is critical — slate roofs have less margin for waterproofing error than tile.',
  },
  {
    question: 'What happens if the structural assessment reveals the roof can\'t take the proposed array?',
    answer:
      'Three options: (1) reduce the array size to a load the roof can take; (2) strengthen the roof structure (additional rafters / collar ties / ridge beam) before installing PV — can be cost-prohibitive for domestic; (3) move the array elsewhere (different roof surface, ground mount, BIPV). The customer\'s informed decision sets the outcome. The MCS MIS 3002 design pack records the assessment finding and the chosen response.',
  },
  {
    question: 'How does the PWI common-mistakes list inform the survey checklist?',
    answer:
      'The PWI common-mistakes list (drawn from field reports across UK PV installs) gives the survey checklist its priority items. The top issues — module clearance, flashing-tile usage, standoff dimension, structural assessment depth — become the explicit checklist items every survey covers. The MCS MIS 3002 design pack records the checklist outcomes. The IET CoP for Grid-Connected Solar PV Installations cross-references PWI-equivalent guidance.',
  },
  {
    question: 'What\'s the relationship between mounting and earthing / bonding?',
    answer:
      'Mounting system metal components (rails, brackets, frames) may need bonding to the supplementary bonding network where they become extraneous-conductive-parts or where the manufacturer mounting spec specifies functional bonding. Reg 712.542.102 (Section 5) covers DC-side functional bonding requirements. Module frames are typically bonded through the mounting rail (single-point bonding); metal-sheet roof surfaces may need separate bonding.',
  },
  {
    question: 'How does the IET CoP cover mounting and structural integration?',
    answer:
      'The IET CoP for Grid-Connected Solar PV Installations (5th edition) covers mounting and structural integration in detail: WAH Regulations 2005 application; competent visual structural assessment criteria; when structural engineer review is required; flashing-tile / flush-mount kit selection; metal-sheet roof mounting; flat-roof ballasted frames; ground-mount foundations; wind-uplift zoning per BS EN 1991-1-4. The MCS MIS 3002 design pack typically references the IET CoP as the source.',
  },
];

export default function RenewableEnergyModule3Section3() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Roof safety, mounting & structural integration | Renewable Energy 3.3 | Elec-Mate',
    description:
      'PV mounting and structural integration — Work at Height Regulations 2005, structural assessment, fixings by roof type, 70-100 mm standoff, flashing-tile waterproofing, and the PWI common-mistakes that drive UK PV install failures.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · BS 7671:2018+A4:2026"
            title="Roof safety, mounting & structural integration"
            description="Work at Height Regulations 2005, structural assessment, fixings by roof type, the 70-100 mm standoff discipline, flashing-tile waterproofing, and the PWI common-mistakes that drive UK PV install failures."
            tone="yellow"
          />

          <TLDR
            points={[
              'Work at Height Regulations 2005: AVOID → PREVENT → MINIMISE hierarchy. PV roof work typically uses scaffolding or MEWP (PREVENT level). RAMS records the chosen control. Personal fall-arrest alone is the MINIMISE-only fallback.',
              'PV adds ~10-15 kg/m² distributed dead load to the roof — typically within UK pitched-roof capacity but the structural assessment confirms for the specific roof. Older / decayed / unusual roofs need structural engineer review.',
              'The 70-100 mm standoff above the roof surface enables natural convection cooling — keeps cell temperature 10-15°C above ambient vs 25-35°C without standoff. Required by manufacturer specs and by Reg 712.512.2.1.',
              'Mounting fixings reach the rafter (structural timber), not the tile (covering). Flashing-tile / flush-mount kit penetrates correctly with EPDM seal. Slate roofs use slate-hook. Metal sheet uses clamp-on-rib or rivet-through with EPDM bond.',
              'Wind-uplift edge zoning per BS EN 1991-1-4 — corner / edge zones experience 1.5-2× the wind pressure of the centre. Cramming modules to roof edges is a high-frequency PWI common-mistake.',
              'PWI common-mistakes on PV mounting: edge cramming, missing flashing-tile, inadequate standoff, skipped structural assessment. Each is a high-frequency MCS audit finding. Day-one discipline prevents all four.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the Work at Height Regulations 2005 hierarchy of control to PV roof installations — scaffolding, MEWP, harness, RAMS.',
              'Run a competent visual structural assessment of a UK pitched-tile / slate domestic roof and identify when structural engineer review is required.',
              'Specify the 70-100 mm roof standoff arrangement for natural convection cooling, matched to the module manufacturer mounting spec and Reg 712.512.2.1.',
              'Select fixing approach by roof type — flashing-tile for tile, slate-hook for slate, clamp-on-rib or rivet-through for metal sheet.',
              'Apply BS EN 1991-1-4 wind-uplift edge zoning to module layout and confirm fixing capacity in corner / edge / centre zones.',
              'Avoid the four high-frequency PWI common-mistakes through day-one survey discipline.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Scaffolding goes up first. Standoff at 70-100 mm. Fixings into the rafter, not the tile.</Pullquote>

          <ContentEyebrow>Working at height — the WAH Regulations 2005 discipline</ContentEyebrow>

          <ConceptBlock
            title="AVOID → PREVENT → MINIMISE — the hierarchy of control"
            plainEnglish="The Work at Height Regulations 2005 set a hierarchy of control. AVOID work at height first; PREVENT falls where avoidance not practicable; MINIMISE the consequence where prevention not practicable."
            onSite="Applied to PV roof work: AVOID means ground-mount / BIPV; PREVENT means scaffolding / edge protection / MEWP (the typical UK standard); MINIMISE means safety nets / harness fall-arrest (the fallback)."
          >
            <p>The hierarchy applied to a PV install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">AVOID work at height</strong> — where reasonably practicable, don\'t do work at height. For PV, this rarely applies. Ground-mount and BIPV facade avoid roof work</li>
              <li><strong className="text-white">PREVENT falls</strong> — collective protection: full perimeter scaffolding with handrail and toe-board; MEWP (cherry picker, scissor lift); tower scaffold for shorter installs. The typical UK standard</li>
              <li><strong className="text-white">MINIMISE consequences</strong> — collective fall-arrest (safety nets); personal fall-arrest (harness + anchor + lanyard). PFAS alone is the fallback — only acceptable when PREVENT isn\'t reasonably practicable</li>
            </ul>
            <p>
              The RAMS (Risk Assessment and Method Statement) records the chosen
              control measures, the rationale, and the emergency rescue plan. RAMS
              is a HSE requirement under the WAH Regulations and the Construction
              (Design and Management) Regulations 2015.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Scaffolding for PV roof work — the standard arrangement"
            plainEnglish="Full perimeter scaffolding with handrail and toe-board is the UK PV install standard. Provides a working platform for module install, electrical termination, and inspection."
            onSite="Scaffolding spec: independent tied scaffold; working platform ~1.5 m below ridge; handrail at 950 mm above platform; intermediate rail; toe-board at 150 mm above platform; ladder access; site-specific risk assessment recorded."
          >
            <p>Scaffolding decisions for the PV survey:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Single-sided vs surround</strong> — single-sided where access from one elevation; surround for split arrays</li>
              <li><strong className="text-white">Working platform height</strong> — typically 1-1.5 m below the lowest module position</li>
              <li><strong className="text-white">Access</strong> — ladder access from ground or stair access through scaffold</li>
              <li><strong className="text-white">Duration</strong> — typical residential PV scaffolding 5-10 days. Survey-stage estimate informs the customer (typically £500-£1,500 for a small domestic install)</li>
            </ul>
          </ConceptBlock>

          <WahHierarchy
            caption="WAH Regulations hierarchy diagram for PV roof work — vertical flowchart from AVOID at top to MINIMISE at bottom. AVOID branches to ground-mount / BIPV. PREVENT branches to scaffolding / MEWP / tower. MINIMISE branches to safety nets / harness fall-arrest. Annotated with WAH Regs 2005 and RAMS requirement."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Structural assessment — competent visual + when to escalate</ContentEyebrow>

          <Pullquote>10-15 kg/m² added load. Visual assessment for typical roofs. Engineer for the rest.</Pullquote>

          <ConceptBlock
            title="Structural assessment scope for typical UK domestic PV"
            plainEnglish="A 6 kWp install adds ~10-15 kg/m² distributed dead load (modules + mounting) over the array footprint. Typical UK pitched roofs designed for 25-30 kg/m² imposed + dead load — usually within capacity."
            onSite="The competent installer\'s structural assessment confirms: rafter spacing, timber condition, existing loading, additional PV load, wind-uplift zoning. For typical UK domestic pitched-tile or slate roofs in good condition, the competent visual assessment suffices. For roofs outside this category, structural engineer review is required."
          >
            <p>The competent visual assessment checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Rafter dimensions and spacing</strong> — typical UK domestic: 100 × 50 mm at 400-600 mm centres. Confirm by measurement or building records</li>
              <li><strong className="text-white">Timber condition</strong> — visual inspection from loft for decay, beetle damage, fungal growth, distortion. Probe suspect areas with awl</li>
              <li><strong className="text-white">Existing loading</strong> — tiles + felt + insulation typically 50-80 kg/m². Slate heavier; thatched lighter</li>
              <li><strong className="text-white">Modifications</strong> — any roof modifications (loft conversion, dormers, removed walls) flagged for structural engineer review</li>
              <li><strong className="text-white">PV load distribution</strong> — module + mounting load distributed across the array footprint; confirm rafter capacity in each fixing location</li>
              <li><strong className="text-white">Wind-uplift zoning</strong> — corner / edge zones flagged; fixings in those zones may need additional reinforcement</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When structural engineer review is required"
            plainEnglish="Some installs go beyond competent visual assessment — structural engineer (chartered, or working under chartered supervision) review is required."
            onSite="Triggers: any timber decay or beetle damage; rafters less than nominal size or significantly degraded; loft conversions or roof modifications; large arrays (10+ kWp); flat-roof PV with ballasted frame; ground-mount foundations; unusual roof construction. The MCS MIS 3002 design pack records the level of assessment."
          >
            <p>The engineer review provides:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Quantified structural capacity</strong> — kg/m² acceptable for the specific roof condition</li>
              <li><strong className="text-white">Bracket / fixing recommendations</strong> — specific to rafter dimensions and timber condition. May require reinforcement</li>
              <li><strong className="text-white">Wind-uplift analysis</strong> — BS EN 1991-1-4 applied to specific site / orientation / layout</li>
              <li><strong className="text-white">Sign-off documentation</strong> — engineer\'s report part of the cert evidence bundle</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The 70-100 mm standoff — natural convection cooling</ContentEyebrow>

          <Pullquote>70-100 mm of air. Cell temperature 10-15°C above ambient instead of 25-35°C.</Pullquote>

          <ConceptBlock
            title="Why the standoff matters — temperature derate and Reg 712.512.2.1"
            plainEnglish="PV cells lose ~0.4% of power per °C above STC 25°C. Without standoff, cell reaches 25-35°C above ambient at peak summer noon. With 70-100 mm standoff, natural convection cools the cell to 10-15°C above ambient."
            onSite="The difference: ~4-8% additional power loss at peak summer noon without standoff. Compounded across the year, ~2-4% annual yield loss vs the standoff case. Chronic high-temperature operation accelerates module degradation."
          >
            <p>How the standoff works:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Natural convection</strong> — warm air rises from cell surface; cooler air enters from below; airflow removes heat</li>
              <li><strong className="text-white">70-100 mm is the manufacturer-typical spec</strong> — sufficient airflow for residential array sizes and UK conditions</li>
              <li><strong className="text-white">Less than 70 mm</strong> — airflow restricted, cooling impaired, cell operates hotter; manufacturer warranty may be void</li>
              <li><strong className="text-white">More than 100 mm</strong> — diminishing returns; wind-uplift load increases; aesthetic impact</li>
              <li><strong className="text-white">Roof-integrated PV (BIPV)</strong> — no standoff. Cell temperatures higher; design must account for higher temperature derate</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.512.2.1 — adequate heat dissipation"
            clause="As specified by the manufacturer, the PV modules shall be installed in such a way that there is adequate heat dissipation under the conditions of maximum solar radiation for the site."
            meaning="The 70-100 mm standoff above the roof surface combined with the manufacturer mounting spec (rail spacing, module gap, ventilation) is the standard mitigation. The cert evidence bundle records the standoff dimension, the manufacturer spec, and the site irradiance assessment. Roof-integrated PV (BIPV) requires additional thermal analysis."
          />

          <StandoffCrossSection
            caption="Roof standoff cross-section — side view of module sitting on rail bracket. Standoff dimension labelled 70-100 mm between module backsheet and tile / slate surface. Airflow arrows showing convection. Annotated: cell temperature 10-15°C above ambient with standoff vs 25-35°C without."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Fixings by roof type — tile, slate, metal, flat</ContentEyebrow>

          <Pullquote>Tile: flashing-tile through to rafter. Slate: slate-hook around. Metal: clamp-on-rib.</Pullquote>

          <ConceptBlock
            title="Tile roof — flashing-tile / flush-mount kit"
            plainEnglish="UK tile roofs: the fixing goes through a flashing-tile (a specialised replacement tile with integrated raised collar and fixing point) and into the rafter below."
            onSite="The flashing-tile method: (1) lift the existing tile in the fixing location; (2) install the flashing-tile in its place; (3) drive the fixing bolt through the flashing-tile\'s integrated fixing point and into the rafter; (4) the raised collar above the penetration channels water downslope; (5) the bracket / EPDM gasket seals the penetration."
          >
            <p>What goes wrong without the flashing-tile:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Generic L-bracket + sealant</strong> — sealant degrades within 2-5 years; water enters; loft damage; insurance claim; rectification cost</li>
              <li><strong className="text-white">Lead flashing handcrafted on-site</strong> — depends on installer skill; the flashing-tile is more consistent and warrantied</li>
              <li><strong className="text-white">Cracked tile around fixing</strong> — penetrating an unsupported tile causes localised cracking; flashing-tile is designed for the penetration</li>
            </ul>
            <p>
              Common manufacturers: K2 Systems, Schletter, MAGE / Solar-Mountage,
              Conergy. The cert evidence bundle records the flashing-tile
              manufacturer and part number.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Slate roof — slate-hook (no penetration)"
            plainEnglish="UK slate roofs are more brittle than tile — penetrating fixings risk fracturing. The standard approach: slate-hook — a stainless steel hook over the batten and into the rafter, with no penetration of the slate itself."
            onSite="The slate-hook method: (1) carefully remove the slate above the fixing location; (2) install the slate-hook over the batten and into the rafter; (3) re-fit the slate over the hook; (4) the hook protrudes through the seam between slates; (5) the bracket attaches to the hook."
          >
            <p>Slate-specific considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Slate hook material</strong> — stainless steel (typically 316) for corrosion resistance over 25-year life</li>
              <li><strong className="text-white">Batten condition</strong> — older slate roofs may have decayed battens; structural assessment confirms batten + rafter integrity</li>
              <li><strong className="text-white">Slate fragility</strong> — handling care during install; some slates may need replacement</li>
              <li><strong className="text-white">Bonding</strong> — slate roofs may have lead flashings; cert evidence bundle shows bonding arrangement</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Metal-sheet roof — clamp-on-rib or rivet-through"
            plainEnglish="UK metal-sheet roofs use bespoke mounting systems. Two approaches: clamp-on-rib (no penetration) or rivet-through (penetration with EPDM bond)."
            onSite="Clamp-on-rib clamps directly to the standing seam or rib without penetrating the sheet — preferred where roof profile allows. Rivet-through uses rivets through the sheet flat into the underlying purlins, sealed with EPDM butyl pad. Penetrating metal-sheet may require electrical bonding (Section 5)."
          >
            <p>Metal-sheet mounting decisions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Clamp-on-rib (preferred)</strong> — no penetration; no waterproofing risk; simple install</li>
              <li><strong className="text-white">Rivet-through (when rib doesn\'t suit clamp)</strong> — rivet through sheet into purlin; EPDM butyl pad above rivet</li>
              <li><strong className="text-white">Standing-seam (raised seam profile)</strong> — specialised clamp that wraps around the seam</li>
              <li><strong className="text-white">Electrical bonding</strong> — metal sheet may become extraneous-conductive-part; bonding to supplementary bonding network may be required</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Flat roof — ballasted frame"
            plainEnglish="Flat-roof PV uses ballasted frames (tilted module frame, weighed down by concrete blocks) rather than penetrating the roof membrane. Avoids waterproofing risk."
            onSite="Flat-roof ballasted-frame mounting adds ~30-60 kg/m² over the array footprint — significantly higher than pitched-roof PV. Structural engineer review typically required. Ballast quantity calculated against BS EN 1991-1-4 wind code for the location and array tilt."
          >
            <p>Flat-roof considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Membrane protection</strong> — slip pads / rubber pads between frame and membrane to prevent abrasion and puncture</li>
              <li><strong className="text-white">Drainage</strong> — frame must not obstruct roof drainage paths</li>
              <li><strong className="text-white">Wind-uplift</strong> — flat roofs have high uplift at perimeter / corner zones; ballast calculated per BS EN 1991-1-4</li>
              <li><strong className="text-white">Array tilt</strong> — typical flat-roof PV uses 10-15° (gentle) to balance yield vs wind / snow load</li>
              <li><strong className="text-white">Inter-row spacing</strong> — needed to avoid self-shading (front rows shading back rows in low-elevation winter sun)</li>
            </ul>
          </ConceptBlock>

          <FixingByRoofType
            caption="Fixing methods by roof type — four-panel diagram. Panel 1 (tile): flashing-tile cross-section with raised collar downslope, bolt into rafter, EPDM gasket. Panel 2 (slate): slate-hook over batten, no penetration of slate. Panel 3 (metal-sheet): clamp-on-rib vs rivet-through with EPDM butyl pad. Panel 4 (flat): ballasted tilted frame with slip pads on membrane."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Wind-uplift and edge zoning — BS EN 1991-1-4</ContentEyebrow>

          <Pullquote>Corner zones 1.5-2× the centre. Don\'t cram modules to the edges.</Pullquote>

          <ConceptBlock
            title="Wind-uplift zoning on PV roof installs"
            plainEnglish="Wind pressure on a roof varies by location — corners and edges experience higher pressure than the centre. BS EN 1991-1-4 wind code zones the roof; PV layout must account for the zoning."
            onSite="Edge / corner zones experience 1.5-2× the centre-zone pressure. Survey-stage clearance discipline (300-500 mm from edges) keeps modules in the lower-pressure centre zone."
          >
            <p>BS EN 1991-1-4 zoning summary for a typical UK pitched roof:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Centre zone (interior)</strong> — lowest wind pressure; typical PV placement zone</li>
              <li><strong className="text-white">Edge zone (along ridge / eaves / verges)</strong> — moderate pressure; typically 1.2-1.5× centre zone</li>
              <li><strong className="text-white">Corner zone (within ~1 m of corner)</strong> — highest pressure; typically 1.5-2× centre zone; PV modules generally avoided here</li>
            </ul>
            <p>
              UK design wind speed 22-30 m/s by region per BS EN 1991-1-4 Annex
              NA. The structural assessment quantifies the force per module; the
              bracket and fixing pull-out capacity must exceed it with appropriate
              factor of safety.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Flashings, waterproofing, and the install photo record</ContentEyebrow>

          <Pullquote>Flashing collar downslope. EPDM seal intact. Photos for the bundle.</Pullquote>

          <ConceptBlock
            title="Waterproofing the penetration — the flashing-tile orientation"
            plainEnglish="The flashing-tile / flush-mount kit waterproofs the penetration by channelling water DOWN the slope around the fixing. The raised collar above the penetration must be DOWNSLOPE."
            onSite="Two failure modes: (1) flashing collar installed upside-down (collar upslope, water pools above the penetration); (2) EPDM gasket damaged at install. The install photo record evidences correct orientation and gasket condition."
          >
            <p>Install-stage waterproofing discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Flashing-tile orientation</strong> — raised collar on downslope side; water flows from upper tile, around the collar, onto the lower tile</li>
              <li><strong className="text-white">EPDM gasket</strong> — intact, undamaged, square on the bracket-to-flashing interface; bolt torqued to manufacturer spec</li>
              <li><strong className="text-white">Adjacent tiles</strong> — re-fitted to lap correctly over the flashing-tile</li>
              <li><strong className="text-white">Install photos</strong> — taken at each fixing showing flashing-tile orientation, EPDM gasket, bracket bolt; archived in cert evidence bundle</li>
              <li><strong className="text-white">5-yearly inspection</strong> — customer information pack lists periodic inspection</li>
            </ul>
          </ConceptBlock>

          <FlashingOrientation
            caption="Flashing-tile correct vs incorrect orientation — side-by-side. Correct: raised collar downslope, water flows over the collar and around it. Incorrect: raised collar upslope, water pools above the penetration and enters through the bolt thread / gasket. Annotated with water-flow arrows and failure mode."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Survey reveals decayed rafters in the loft — proceed with caution"
            situation="On a survey visit, the installer inspects the loft and finds significant beetle damage on 3 of the 14 rafters in the proposed array footprint. The customer\'s 1960s detached property has had no recent roof refurbishment."
            whatToDo="STOP and document. The beetle-damaged rafters are not suitable for PV mounting — fixings could pull out, structural failure risk. (1) Photograph the damage and document the affected rafter positions; (2) explain the finding to the customer; (3) recommend structural engineer review before install proceeds; (4) options: (a) treat the beetle infestation and replace the affected rafters; (b) re-position the array to use only sound rafters; (c) defer the install until customer addresses the structural issue. The MCS MIS 3002 design pack records the finding and chosen response."
            whyItMatters="Surveying without going into the loft is a high-frequency PWI common-mistake. Many UK domestic roofs have hidden structural issues. The competent surveyor checks from inside the loft. The honest finding protects the customer and the installer."
          />

          <Scenario
            title="Customer wants modules right up to the roof edges — refuse politely"
            situation="Customer wants the largest possible array on a 30 m² south-facing roof. Proposed layout fills the roof edge-to-edge, including the corner zones, to maximise kWp."
            whatToDo="Refuse the edge-cramming politely and explain. The 300-500 mm clearance is non-negotiable: (1) working-at-height access; (2) wind-uplift zoning — corner / edge zones experience 1.5-2× the pressure; (3) some regional fire-service-access requirements; (4) MCS audit finds edge-crammed installs as major findings. The competent install recovers ~80-90% of the theoretical maximum kWp through proper clearance."
            whyItMatters="Edge-cramming is one of the four high-frequency PWI common-mistakes. The MCS audit flags it; the structural assessment fails it. The competent installer doesn\'t shortcut clearance discipline."
          />

          <CommonMistake
            title="Surveying the roof from the outside only — missing loft-side findings"
            whatHappens="An installer surveys a UK domestic roof from outside only — measures area, photographs orientation, notes tile type. The install proceeds. After 6 months, fixings in 2 locations pull out under wind loading; the loft inspection reveals localised rafter decay that the external survey couldn\'t see."
            doInstead="The competent survey includes loft access — visual inspection of rafter dimensions, timber condition, modifications, fungal / beetle damage. Probe suspect timber with an awl. Photograph the loft inspection. The MCS MIS 3002 design pack records loft-side findings alongside external survey."
          />

          <CommonMistake
            title="Using generic L-brackets with sealant on a tile roof — water ingress within 2-5 years"
            whatHappens="An installer uses generic L-brackets through tiles with silicone sealant. Install commissions and operates normally. After 2-3 years, sealant degrades; water enters loft; insulation soaked; ceiling stains. Customer raises a claim; installer liable for rectification cost."
            doInstead="Use the module / mounting manufacturer\'s specified flashing-tile / flush-mount kit for every fixing through a tile roof. The flashing-tile waterproofs without relying on sealant; manufacturer-warrantied; the cert evidence bundle records the flashing-tile manufacturer + part number."
          />

          <CommonMistake
            title="Standoff dimension less than 70 mm — cooling loss + warranty void"
            whatHappens="An installer uses brackets with a 50 mm standoff for aesthetic reasons. Install commissions; modules operate hotter than designed; module warranty technically void. Year-1 yield ~3% below modelled; cell temperature monitoring would reveal modules running 25-30°C above ambient."
            doInstead="Always use the manufacturer-specified standoff (typically 70-100 mm). The aesthetics trade-off is real but minor; the cooling and warranty discipline is non-negotiable. The cert evidence bundle records the standoff dimension; install photos evidence it. Reg 712.512.2.1 satisfied through standoff + manufacturer spec."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Work at Height Regulations 2005: AVOID → PREVENT → MINIMISE hierarchy. Scaffolding or MEWP is the typical UK PV install standard. RAMS records the chosen control and rescue plan.',
              'PV adds ~10-15 kg/m² distributed dead load — usually within typical UK pitched-roof capacity. Engineer review for older / decayed / unusual / large arrays / flat / ground.',
              '70-100 mm roof standoff enables natural convection cooling — cell temperature 10-15°C above ambient instead of 25-35°C. Required by manufacturer spec and by Reg 712.512.2.1.',
              'Mounting fixings reach the rafter, not the tile / slate / metal sheet. Flashing-tile for tile (raised collar downslope). Slate-hook for slate (no penetration). Clamp-on-rib or rivet-through for metal sheet. Ballasted frame for flat roof.',
              'Wind-uplift edge zoning per BS EN 1991-1-4: corner / edge zones 1.5-2× centre-zone pressure. PV in lower-pressure centre zone; 300-500 mm clearance from edges.',
              'Four high-frequency PWI common-mistakes: edge cramming, missing flashing-tile, inadequate standoff, skipped structural assessment. Each is a high-frequency MCS audit finding.',
              'IET CoP for Grid-Connected Solar PV Installations is the operational source for mounting and structural workflow. Cross-references BS EN 1991-1-4, WAH Regulations 2005, BS 7671 Reg 712.512.2.1.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                PV system sizing
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 DC cable &amp; fire
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
