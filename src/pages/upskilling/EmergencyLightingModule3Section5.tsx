import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm3-s5-symbols',
    question: 'Standard symbols for emergency luminaires on a layout drawing follow which standard?',
    options: [
      'Free designer choice, agreed informally with the installer on each project.',
      'BS EN 60617 graphic symbols, with markings distinguishing M, NM, HR, ST, SC and CB variants.',
      'The architect\'s house style, set by the practice rather than a published standard.',
      'BS 7671 wiring-diagram symbols applied unchanged to the lighting layout.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 references BS EN 60617 for graphic symbols and specifies emergency-lighting-specific markings. Each symbol shows luminaire type (downlight, bulkhead, sign), emergency function (maintained / non-maintained / high-risk), supply type (self-contained / central battery) and self-test status, and links to the schedule for fitting reference, photometric distribution and circuit number.',
  },
  {
    id: 'elm3-s5-grid',
    question: 'Photometric calculation grid spacing on the layout should be...?',
    options: [
      '5 m × 5 m on the target plane, sampling the route at a few representative points.',
      '0.5 m × 0.5 m or 1 m × 1 m on the target plane, capturing the minimum at every point.',
      '10 m × 10 m on the target plane, matching the typical luminaire spacing.',
      'No calculation grid is needed where average lux is documented for the area.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §5.3 effectively requires a calculation grid fine enough to capture the minimum at every relevant point on the target plane (escape route at floor; vertical face for safety equipment). 0.5 m or 1 m grids are typical industry practice; coarse grids (e.g. 5 m) miss localised dim spots, while very fine grids (e.g. 0.1 m) add computation without practical benefit. The grid output is part of the commissioning evidence pack.',
  },
  {
    id: 'elm3-s5-scale',
    question: 'Typical drawing scales for emergency lighting layouts are...?',
    options: [
      '1:5000, with the whole site shown on a single sheet.',
      '1:50 for detail areas and 1:100 for typical floor layouts.',
      '1:1, drawing each luminaire at its true physical size.',
      '1:1000, treating the layout as a location plan only.',
    ],
    correctIndex: 1,
    explanation:
      'Emergency lighting drawings sit between 1:50 (detail areas such as refuge points, high-risk task plans and sign details) and 1:100 (general floor plan). The scale must permit clear identification of luminaire positions, route highlighting and photometric grid annotations without zoom. Scales of 1:200 and smaller often lose the detail required for verification.',
  },
  {
    id: 'elm3-s5-docs',
    question: 'BS 5266-1:2025 documentation requirements for the emergency lighting design include...?',
    options: [
      'The installation invoice and a copy of the wiring certificate only.',
      'A design pack: layout drawings, luminaire schedule, photometric output, risk-link and commissioning schedules.',
      'The fire risk assessment alone, with the luminaire positions described in its text.',
      'A verbal handover to the responsible person, with no written design record.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 §7 specifies the design documentation pack: layout drawing(s) with luminaire positions and references, schedule of luminaires (type, photometric, mounting, circuit), photometric calculation output (grid lux at every point), risk-assessment-referenced uplift justification, schedule of commissioning test points, and schedule of safety-equipment vertical-lux points. Each component supports a different stakeholder, and the pack as a whole is auditable evidence of the design.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 5266-1:2025 references which standard for graphic symbols on emergency-lighting layout drawings?',
    options: [
      'BS EN 60617 — graphic symbols for diagrams — supplemented by BS 5266-specific markings (M, NM, HR, SC, CB) to distinguish luminaire variants on the drawing.',
      'BS 7671.',
      'BS EN 50172.',
      'No specific standard.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 60617 is the general standard for electrical schematic and layout symbols. BS 5266-1:2025 references it and adds emergency-lighting markings on the symbols. Designers and inspectors read the symbols against the schedule legend.',
  },
  {
    id: 2,
    question: 'Photometric calculation grid spacing on emergency lighting layouts is typically...?',
    options: [
      '5 m × 5 m.',
      '10 m × 10 m.',
      '0.5 m × 0.5 m or 1 m × 1 m on the target plane — fine enough to capture localised minimum lux at every point.',
      'No grid is needed.',
    ],
    correctAnswer: 2,
    explanation:
      'Industry practice is 0.5 to 1 m grids on the target plane (floor for horizontal duties; vertical face for safety equipment). Coarser grids miss localised dim spots and produce non-evidenced designs.',
  },
  {
    id: 3,
    question: 'Typical drawing scale for an emergency-lighting general floor layout is...?',
    options: [
      '1:5000.',
      '1:1.',
      'Free choice.',
      '1:100 for general floor plan, 1:50 for detail areas (refuge points, high-risk plans, sign-detail close-ups).',
    ],
    correctAnswer: 3,
    explanation:
      '1:100 is the common general-plan scale; 1:50 for detail. The scale must allow clear identification of positions, references and grid annotations without zoom.',
  },
  {
    id: 4,
    question: 'On an emergency-lighting drawing, each luminaire symbol typically carries which information?',
    options: [
      'Type, photometric code, orientation arrow, circuit number and a schedule reference label.',
      'The luminaire body symbol alone, with no type or circuit annotation.',
      'A sequential position number only, with all detail held in the schedule.',
      'The manufacturer\'s catalogue part number printed beside each fitting.',
    ],
    correctAnswer: 0,
    explanation:
      'A luminaire symbol on a compliant drawing communicates type (per the schedule), photometric distribution code, mounting orientation arrow (for asymmetric distributions), circuit number and a reference label linking to the schedule. Each parameter feeds a different consumer — installer needs orientation; commissioning engineer needs circuit; inspector needs the schedule reference.',
  },
  {
    id: 5,
    question: 'A photometric calculation report (Dialux output) for an emergency lighting design should include...?',
    options: [
      'The average lux for the area only, as a single headline figure.',
      'The maintenance factor applied, without the resulting illuminance values.',
      'Point-by-point grid lux with minimum, maximum and uniformity, at 0% reflectance.',
      'A total installed wattage figure for the emergency luminaires on the plan.',
    ],
    correctAnswer: 2,
    explanation:
      'The photometric report is the primary evidence of design lux compliance: point-by-point grid lux values (or a contour map) on the target plane with minimum, maximum and uniformity ratio identified, calculated at 0% surface reflectance per BS EN 1838:2024, with the grid spacing and luminaire positions shown. Graphical contour maps support visual interpretation; numerical grids support precise audit.',
  },
  {
    id: 6,
    question: 'Cross-section views are typically required for...?',
    options: [
      'Every drawing, as a mandatory second view of each floor plan.',
      'Single-storey, single-level spaces where the plan view is already complete.',
      'No areas — cross-sections are never required for emergency lighting.',
      'Height-critical areas: stairs, high-bay, atria with mezzanines and refuge areas.',
    ],
    correctAnswer: 3,
    explanation:
      'Plan views show horizontal coverage; cross-sections show vertical relationships. Stairs (tread illumination), high-bay industrial (luminaire-to-target throw), atria with mezzanines (how each level is lit) and refuge areas (where door swings or wall projections affect the envelope) all benefit from a cross-section. Standard single-level floor plans do not need them; height-critical areas do.',
  },
  {
    id: 7,
    question: 'The schedule of luminaires accompanying the layout drawing typically includes...?',
    options: [
      'Per luminaire: reference, model, photometric file, function, supply, mounting, circuit and notes.',
      'The total count of emergency luminaires by floor, without per-fitting detail.',
      'The manufacturer and model only, with circuit and mounting left to the installer.',
      'A reference label per fitting that links to a separate online product page.',
    ],
    correctAnswer: 0,
    explanation:
      'The schedule is the per-luminaire specification: reference (e.g. EM1), manufacturer and model, photometric file (LDT/IES), maintained / non-maintained / high-risk function, supply type (self-contained / central battery), mounting type and height, photometric distribution, beam orientation if asymmetric, circuit number and commissioning notes. The installer orders to it, the commissioning engineer tests against it, and the inspector audits against it.',
  },
  {
    id: 8,
    question: 'Sign details on the emergency lighting drawings should show...?',
    options: [
      'A generic exit-sign symbol at each door, without size or direction detail.',
      'The sign locations only, with type and pictogram left to the installer.',
      'Location, type, pictogram size, mounting height, direction and illumination method.',
      'The viewing distance for each sign, without the pictogram size that sets it.',
    ],
    correctAnswer: 2,
    explanation:
      'Sign details on drawings are part of the design evidence: each emergency exit sign with location, type (illuminated / non-illuminated), pictogram size (which sets viewing distance at 100 × pictogram height per BS EN ISO 7010), mounting height, orientation (which way the running-man points, indicating the exit) and the luminaire for externally illuminated signs or self-contained classification for internally illuminated ones.',
  },
  {
    id: 9,
    question: 'A safety-equipment schedule on the layout drawings is required to...?',
    options: [
      'List the emergency luminaires only, without reference to the devices they serve.',
      'Record the cleaning and inspection schedule for each safety device.',
      'Identify the responsible person for maintaining each item of safety equipment.',
      'Map every call point, extinguisher, first-aid post and refuge point to its 5 lx vertical luminaire.',
    ],
    correctAnswer: 3,
    explanation:
      'The safety-equipment schedule maps every device requiring 5 lx vertical — fire alarm call points, firefighting equipment, first-aid posts and refuge call points — to the specific luminaire that delivers the vertical illuminance on its face. Without the schedule the inspector cannot verify the vertical-lux duty per device; with it, every device is auditable.',
  },
  {
    id: 10,
    question: 'BS 5266-1:2025 documentation extends beyond drawings to require...?',
    options: [
      'A full design pack: schedule, photometric output, risk link, test-point and safety-equipment schedules.',
      'The layout drawings only, with all other detail held by the installer.',
      'The installation invoice and the electrical certificate for the circuits.',
      'The manufacturer datasheets only, as evidence the products are fit for purpose.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 §7 prescribes the documentation pack: drawings, luminaire schedule, photometric output, risk-assessment-referenced uplift justification, schedule of commissioning test points, schedule of safety-equipment vertical-lux points, manufacturer datasheets, photometric data files (LDT/IES) and maintenance-factor evidence. Each item has its consumer; the pack as a whole is the auditable record of the design and supports commissioning, periodic test and future modifications.',
  },
];

const EmergencyLightingModule3Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Emergency lighting layout drawings | EL Module 3.5 | Elec-Mate',
    description:
      'BS 5266-1:2025 layout drawing requirements — symbols per BS EN 60617, photometric calculation grids, drawing scales 1:50 / 1:100, the schedule of luminaires, sign details, safety-equipment schedule, and the 2025 documentation pack.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5"
            title="Emergency lighting layout drawings"
            description="The drawing IS the design. Every luminaire position, every photometric calculation, every safety-equipment vertical-lux mapping is on the layout. BS 5266-1:2025 §7 expands documentation requirements — the drawing alone is no longer sufficient; the design pack must include schedules, photometric output and the risk-assessment trail. Done well, the pack survives the design team and supports the building through its life."
            tone="yellow"
          />

          <TLDR
            points={[
              'Drawing scales: 1:100 for general floor plans, 1:50 for detail (refuge points, high-risk task plans, sign details).',
              'Symbols per BS 5266-1:2025 referencing BS EN 60617 — luminaire body + emergency markings (M / NM / HR / SC / CB).',
              'Each symbol carries: type, photometric distribution, mounting orientation arrow (for asymmetric optics), circuit number, and reference label linking to the schedule.',
              'Photometric calculation grid: typically 0.5 m × 0.5 m or 1 m × 1 m on the target plane, output as point-by-point lux with min / max / uniformity at 0% reflectance.',
              'Schedule of luminaires: per-fitting reference, manufacturer + model, photometric file, M / NM / HR, SC / CB, mounting, circuit, commissioning notes.',
              'Sign details: pictogram size (viewing distance = 100 × pictogram height), mounting, direction-of-pointing, lit / unlit / self-contained classification.',
              'Safety-equipment schedule maps every fire alarm call point / extinguisher / first-aid post / refuge call point to the dedicated luminaire delivering 5 lx vertical.',
              'BS 5266-1:2025 §7 documentation pack: drawings + schedules + photometric output + risk-assessment-link + commissioning + datasheets + photometric data files.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS EN 60617 graphic symbols and BS 5266-1:2025 emergency markings to layout drawings',
              'Specify drawing scales (1:50 detail, 1:100 general) and select cross-section views for height-critical areas',
              'Set photometric calculation grid spacing (0.5 m or 1 m on target plane) and document output (min / max / uniformity at 0% reflectance)',
              'Compose a schedule of luminaires capturing every parameter the installer / commissioning engineer / inspector needs',
              'Specify sign details with viewing-distance pictogram sizing and direction-of-pointing',
              'Maintain a safety-equipment schedule linking each device to its dedicated 5 lx vertical luminaire',
              'Assemble the BS 5266-1:2025 §7 documentation pack as auditable evidence of the design',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The drawing components</ContentEyebrow>

          <ConceptBlock
            title="What goes on a compliant emergency-lighting layout"
            plainEnglish="An emergency-lighting layout drawing is a building floor plan with the emergency lighting design overlaid. Standard architectural detail (walls, doors, fixed equipment) is shown in muted line work; the emergency lighting overlay is in colour or distinguished line weight. Every luminaire is shown by an EN 60617 / BS 5266 symbol with reference label. The escape route is highlighted (typically a coloured line or arrow). Photometric calculation grids show point-by-point lux. Cross-sections appear for height-critical areas. The drawing references the schedule for full specification."
            onSite="The drawing is the medium of communication between designer, installer, commissioning engineer, dutyholder and inspector. Done well, the drawing is unambiguous — every luminaire position is identified, every photometric calculation is shown, every connection to the schedule is clear. Done poorly, the drawing creates installation errors, commissioning gaps and audit failures."
          >
            <p>The drawing layers (typical CAD organisation):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Architectural background.</strong> Walls, doors, fixed equipment, fixtures.
                Muted line weight to keep the emergency overlay clear. The architect's CAD file is
                typically the source.
              </li>
              <li>
                <strong>Escape routes (highlighted).</strong> Coloured line or arrow showing the
                primary and secondary escape routes from each occupiable area to the final exits.
                The route lighting design follows this layer.
              </li>
              <li>
                <strong>Luminaire positions.</strong> Each emergency luminaire as a symbol (per
                BS EN 60617 / BS 5266) at its specified location. Mounting orientation arrow for
                asymmetric optics. Reference label (e.g. EM1, EM2) linking to the schedule.
                Circuit number annotation.
              </li>
              <li>
                <strong>Photometric grid.</strong> Calculation grid (typically 0.5 m × 0.5 m or
                1 m × 1 m) overlaid on the target plane (floor for horizontal duties; vertical
                face for safety equipment). Each grid intersection carries the calculated lux
                value, or the area is presented as a contour map.
              </li>
              <li>
                <strong>Safety-equipment overlay.</strong> Fire alarm call points, firefighting
                equipment, first-aid posts, refuge call points marked with their identifiers.
                Each linked by a leader to its dedicated luminaire (the one providing 5 lx
                vertical on the device face).
              </li>
              <li>
                <strong>Sign positions.</strong> Each emergency exit sign, refuge sign, directional
                sign on the route. Pictogram size and direction-of-pointing annotated. Luminaire
                reference for externally illuminated signs.
              </li>
              <li>
                <strong>Cross-section views.</strong> Where height-critical (stairs, high-bay,
                atria, refuges), additional cross-section views show the vertical relationship
                between luminaire and target. Plan-view alone does not communicate stair tread
                illumination or atrium mezzanine coverage.
              </li>
              <li>
                <strong>Title block + revision history.</strong> Standard CAD title block. Project
                identifier, drawing reference, scale, date, designer, revision number, revision
                history. Critical for audit — the drawing version in use must be the latest, and
                superseded versions must be marked.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7 (Documentation)"
            clause={
              <>
                The emergency-lighting design shall be documented by layout drawings showing the
                location and reference of each luminaire, the routes of escape, the photometric
                calculation, the location of safety equipment requiring vertical illuminance, and
                the location of emergency exit signs. The drawings shall be supported by a
                schedule of luminaires, a schedule of test points, and the photometric calculation
                output.
              </>
            }
            meaning="The standard prescribes drawings AND schedules AND photometric output. The drawing is the primary visual; the schedules are the per-fitting specification; the photometric output is the quantitative evidence. All three together form the design pack."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Symbols, scales, and the photometric grid</ContentEyebrow>

          <ConceptBlock
            title="Reading and writing the visual language"
            plainEnglish="A compliant emergency lighting drawing communicates rigorously through standard symbols. Every reader — installer, commissioning engineer, inspector — should be able to look at the drawing and understand the design without ambiguity. BS 5266-1:2025 references BS EN 60617 for general electrical symbols and adds emergency-specific markings. The drawing scale must permit the symbols to be read clearly; the photometric grid must be fine enough to capture localised minima."
          >
            <p>Symbol conventions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Luminaire body.</strong> Per BS EN 60617 — square / rectangle for ceiling
                luminaires, half-circle for wall-mounted, etc. The body shape distinguishes
                luminaire family.
              </li>
              <li>
                <strong>Emergency function marking.</strong> Letter inside or beside the body —
                M (maintained, lit in normal use, continues on mains failure), NM (non-maintained,
                dark in normal use, illuminates on mains failure), HR (high-risk task), or
                combinations such as M/HR. The letter immediately tells the installer how the
                luminaire wires.
              </li>
              <li>
                <strong>Supply marking.</strong> SC (self-contained, integral battery), CB
                (central battery, fed from a central UPS / battery system). Critical for the
                installer because the wiring is fundamentally different — SC needs only normal
                supply with a permanent live for charging detection; CB needs a separate
                emergency-supply circuit from the central battery.
              </li>
              <li>
                <strong>Mounting orientation arrow.</strong> Asymmetric / forward-throw luminaires
                have a tapered arrow showing the direction the bright part of the beam goes.
                Symmetric luminaires omit the arrow. The installer must orient to the arrow.
              </li>
              <li>
                <strong>Reference label.</strong> Short identifier (e.g. EM1 for emergency
                luminaire type 1, EM2 for type 2, EM3 for type 3) linking the symbol to the
                schedule of luminaires. Multiple instances of the same type carry the same
                reference.
              </li>
              <li>
                <strong>Circuit number annotation.</strong> The final circuit feeding the
                luminaire (e.g. C1, C2, or full origin reference such as DB1/MCB-3). Important
                for high-risk areas where the 2-circuit redundancy rule needs verification.
              </li>
            </ul>
            <p>Drawing scales:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1:100 — general floor plan.</strong> Whole-floor layout with luminaire
                positions, escape routes, photometric grid summary. The default for most projects.
                Allows clear reading at A1 / A0 paper size or full-screen on tablet.
              </li>
              <li>
                <strong>1:50 — detail areas.</strong> Refuge points, high-risk task areas, sign
                detail close-ups, intersection details where multiple duties combine. Larger
                scale lets the photometric grid annotations be read alongside the symbols.
              </li>
              <li>
                <strong>1:200 — overview only, not for compliance.</strong> Sometimes used for
                site-wide overview at very large facilities. The symbols and grid annotations
                cannot be read at this scale without zoom; not acceptable as the primary design
                drawing.
              </li>
              <li>
                <strong>1:20 or larger — sign and luminaire fixing details.</strong> Sometimes
                included as separate detail sheets where the sign mounting or luminaire fixing
                interface needs clarification.
              </li>
            </ul>
            <p>Photometric grid spacing:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>0.5 m × 0.5 m on the target plane.</strong> Default for escape route
                full-width verification (within the BS EN 1838:2024 non-excluded width),
                anti-panic open areas, high-risk task surfaces. Captures localised minima.
              </li>
              <li>
                <strong>1 m × 1 m for large open areas.</strong> Where the open area is
                substantial (1000 m² or more) and uniformity is the dominant duty, 1 m grids
                reduce computation time without missing duty-relevant minima.
              </li>
              <li>
                <strong>0.1 m or finer at safety equipment.</strong> The 5 lx vertical at a call
                point is a localised duty; very fine grids confirm the lux value at the precise
                call-point face position.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The schedule of luminaires</ContentEyebrow>

          <ConceptBlock
            title="The per-fitting specification"
            plainEnglish="The schedule of luminaires is the structured specification accompanying the layout drawing. Each row corresponds to a luminaire reference (or a luminaire variant). The columns capture every parameter the installer, commissioning engineer and inspector need: manufacturer + model, photometric data file, function (M/NM/HR), supply type (SC/CB), mounting type and height, photometric distribution, beam orientation if asymmetric, circuit number, commissioning notes."
          >
            <p>Typical schedule columns and what each is for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reference (EM1, EM2, ...).</strong> Short identifier matching the drawing
                symbols. Used by everyone reading the drawing.
              </li>
              <li>
                <strong>Manufacturer.</strong> Specific manufacturer (e.g. Helvar, Tridonic,
                Eaton, Designplan). Avoid generic descriptions; the design depends on the
                specific photometric data of the named manufacturer.
              </li>
              <li>
                <strong>Model number.</strong> Specific model variant. Manufacturers often have
                product families with multiple variants differing in photometric distribution,
                light output, supply voltage, IP rating. The schedule names the specific variant.
              </li>
              <li>
                <strong>Photometric file.</strong> LDT or IES file reference (e.g. EM1_3W_Wide.ldt)
                that was used in the design calculation. The commissioning engineer can re-verify
                with the same file.
              </li>
              <li>
                <strong>Function.</strong> M / NM / HR. Drives the wiring and the test regime.
              </li>
              <li>
                <strong>Supply.</strong> SC (self-contained) or CB (central battery). Drives the
                wiring topology.
              </li>
              <li>
                <strong>Mounting.</strong> Recessed / surface / suspended / wall-mounted /
                bulkhead. With mounting height (e.g. 2.5 m).
              </li>
              <li>
                <strong>Photometric distribution.</strong> Narrow / medium / wide / asymmetric
                with the manufacturer code (e.g. BR-B, BR-D).
              </li>
              <li>
                <strong>Beam orientation.</strong> For asymmetric luminaires, the cardinal
                direction the bright part of the beam goes. Matches the arrow on the drawing
                symbol.
              </li>
              <li>
                <strong>Circuit number.</strong> Final circuit reference (e.g. C-EM-1, EM-A, or
                full origin). Critical for high-risk areas.
              </li>
              <li>
                <strong>Duration rating.</strong> 1 h / 2 h / 3 h. Verified at commissioning by
                the rated-duration test.
              </li>
              <li>
                <strong>Commissioning notes.</strong> Any specific test method, expected
                photometric reading, or unique commissioning action for this luminaire.
              </li>
            </ul>
            <p>
              The schedule is typically a table on the drawing or a separate document referenced
              by the drawing. Either format works; the schedule must accompany the drawing
              wherever the drawing is used.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Sign details and the safety-equipment schedule</ContentEyebrow>

          <ConceptBlock
            title="Documenting the supplementary duties"
            plainEnglish="The escape route lux is the headline; sign legibility and safety-equipment vertical lux are supplementary duties that designs frequently miss. The drawing must document both. Sign details show pictogram size, mounting height, direction-of-pointing and lit / unlit / self-contained classification. The safety-equipment schedule maps every fire alarm call point, firefighting equipment item, first-aid post and refuge call point to the dedicated luminaire that provides its 5 lx vertical illuminance."
          >
            <p>Sign details on the drawing:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Sign symbol.</strong> Standard BS EN ISO 7010 running-man pictogram in
                rectangle. Direction-of-pointing arrow.
              </li>
              <li>
                <strong>Pictogram size.</strong> Drives viewing distance: viewing distance =
                100 × pictogram height. A 200 mm pictogram is legible at 20 m; a 300 mm pictogram
                at 30 m. The drawing must show the pictogram dimension to evidence the
                viewing-distance choice.
              </li>
              <li>
                <strong>Mounting height.</strong> Typically 2.0 to 2.5 m above floor for
                head-height visibility along the route; higher (3 m) for sightline above large
                fixtures or crowds.
              </li>
              <li>
                <strong>Lit classification.</strong> Internally illuminated (self-contained
                luminous sign), externally illuminated (sign panel lit by an adjacent emergency
                luminaire), or non-lit (uncommon, only acceptable in spaces with continuous
                ambient lighting from emergency luminaires).
              </li>
              <li>
                <strong>Direction.</strong> Which way the running-man pictogram points — left,
                right, up, down, or pointing to a specific exit. The drawing arrow on the symbol
                matches.
              </li>
            </ul>
            <p>Safety-equipment schedule entries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Device reference.</strong> Identifier for the device (e.g. MCP-G-01 for
                the first manual call point on ground floor).
              </li>
              <li>
                <strong>Device type.</strong> Manual call point / extinguisher / hose reel /
                first-aid post / refuge call point.
              </li>
              <li>
                <strong>Location.</strong> Wall, room, height — typically 1.2 to 1.5 m above
                floor for call points, varying for other devices.
              </li>
              <li>
                <strong>Linked luminaire.</strong> The emergency luminaire reference (from the
                schedule of luminaires) that provides the 5 lx vertical on the device face.
              </li>
              <li>
                <strong>Photometric verification.</strong> Calculated vertical lux at the device
                face (e.g. 6.4 lx vertical). The verification value is part of the photometric
                output.
              </li>
            </ul>
            <p>
              The safety-equipment schedule is the trail that lets an inspector verify each device
              has its required vertical light. Without it, the inspector must reverse-engineer
              from the layout drawing and the photometric output — possible but slow and
              error-prone.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7.3 (Sign design and documentation)"
            clause={
              <>
                Each emergency exit sign shall be specified on the design drawings with its
                location, pictogram type, pictogram size, mounting height and direction of
                pointing. Where the sign is internally illuminated, its self-contained
                classification shall be stated; where externally illuminated, the dedicated
                luminaire that illuminates it shall be referenced. Pictogram dimensions shall be
                consistent with the maximum viewing distance from the most distant occupant
                position to the sign.
              </>
            }
            meaning="Pictogram size = viewing distance / 100. The drawing must evidence this — a small pictogram on a long corridor is non-compliant if the most distant occupant cannot read the sign. Document the size, the viewing distance, and the sign's lit classification."
          />

          <SectionRule />

          {/* Diagram — layout drawing example with symbols + lux annotations */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Sample layout drawing extract — symbols, photometric grid, schedule references
            </h4>
            <svg
              viewBox="0 0 880 580"
              className="w-full h-auto"
              role="img"
              aria-label="Example emergency lighting layout drawing showing a corridor section with luminaire symbols, photometric calculation grid lux values, escape route highlight, sign with pictogram size annotation, fire alarm call point with 5 lx vertical luminaire link, and the schedule reference labels."
            >
              <rect x="0" y="0" width="880" height="40" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="440" y="26" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                Layout drawing extract — corridor section, scale 1:100, photometric grid 1 m × 1 m
              </text>

              {/* Drawing area */}
              <rect x="20" y="60" width="700" height="240" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

              {/* Corridor walls */}
              <line x1="40" y1="120" x2="700" y2="120" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
              <line x1="40" y1="240" x2="700" y2="240" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
              <text x="370" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">corridor (1.8 m wide)</text>

              {/* Final exit (left) */}
              <rect x="22" y="120" width="18" height="120" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="32" y="190" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">EXIT</text>

              {/* Door (right - to office) */}
              <rect x="400" y="240" width="40" height="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="420" y="254" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">door</text>

              {/* Final exit (right) */}
              <rect x="700" y="120" width="18" height="120" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
              <text x="710" y="190" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">EXIT</text>

              {/* Escape route arrow */}
              <line x1="60" y1="180" x2="680" y2="180" stroke="rgba(34,197,94,0.5)" strokeWidth="2" strokeDasharray="6,3" />
              <polygon points="680,180 668,174 668,186" fill="rgba(34,197,94,0.6)" />
              <polygon points="60,180 72,174 72,186" fill="rgba(34,197,94,0.6)" />
              <text x="370" y="175" textAnchor="middle" fill="rgba(34,197,94,0.85)" fontSize="9">defined escape route</text>

              {/* Luminaire symbols with reference labels */}
              {/* EM1 — at exit */}
              <rect x="80" y="150" width="22" height="22" fill="rgba(251,191,36,0.20)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="91" y="166" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">M</text>
              <text x="91" y="186" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">EM1</text>
              <text x="91" y="198" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">SC · C-EM-1</text>

              {/* EM1 — middle */}
              <rect x="240" y="150" width="22" height="22" fill="rgba(251,191,36,0.20)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="251" y="166" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">NM</text>
              <text x="251" y="186" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">EM1</text>
              <text x="251" y="198" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">SC · C-EM-1</text>

              {/* EM2 — sign + asymmetric (forward-throw) */}
              <rect x="400" y="150" width="22" height="22" fill="rgba(251,191,36,0.20)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="411" y="166" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">M</text>
              <polygon points="424,151 432,161 424,171" fill="#FBBF24" />
              <text x="411" y="186" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">EM2</text>
              <text x="411" y="198" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">SC · BR-D · C-EM-1</text>

              {/* EM1 — right */}
              <rect x="560" y="150" width="22" height="22" fill="rgba(251,191,36,0.20)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="571" y="166" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">NM</text>
              <text x="571" y="186" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">EM1</text>
              <text x="571" y="198" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">SC · C-EM-2</text>

              {/* EM3 — exit */}
              <rect x="660" y="150" width="22" height="22" fill="rgba(251,191,36,0.20)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="671" y="166" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">M</text>
              <text x="671" y="186" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">EM3</text>
              <text x="671" y="198" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">SC · C-EM-2</text>

              {/* Photometric grid lux values */}
              <text x="120" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.4</text>
              <text x="160" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.2</text>
              <text x="200" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.1</text>
              <text x="240" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.4</text>
              <text x="280" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.2</text>
              <text x="320" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.0</text>
              <text x="360" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.1</text>
              <text x="400" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.5</text>
              <text x="440" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.6</text>
              <text x="480" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.4</text>
              <text x="520" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.2</text>
              <text x="560" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.4</text>
              <text x="600" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.2</text>
              <text x="640" y="220" textAnchor="middle" fill="rgba(34,211,238,0.85)" fontSize="9">1.3</text>

              <text x="370" y="278" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">photometric grid 1 m × 1 m · 0% reflectance · min 1.0 lx</text>

              {/* Sign at right */}
              <rect x="650" y="125" width="36" height="14" fill="rgba(34,197,94,0.20)" stroke="#22C55E" strokeWidth="1.2" />
              <text x="668" y="135" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">EXIT →</text>
              <text x="668" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">200 mm pictogram (20 m view)</text>

              {/* MCP — fire alarm call point */}
              <rect x="335" y="245" width="14" height="14" fill="rgba(239,68,68,0.7)" stroke="#EF4444" strokeWidth="1.4" />
              <text x="342" y="255" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">M</text>
              <text x="342" y="278" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold">MCP-G-01</text>
              <text x="342" y="290" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">linked → EM2 · 6.4 lx vert</text>

              {/* Schedule of luminaires panel */}
              <rect x="20" y="315" width="500" height="240" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" />
              <text x="270" y="335" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="bold">Schedule of luminaires (extract)</text>

              <text x="40" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Ref</text>
              <text x="80" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Mfr / Model</text>
              <text x="220" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Fn</text>
              <text x="250" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Sup</text>
              <text x="290" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Dist</text>
              <text x="340" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Mt</text>
              <text x="380" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Cct</text>
              <text x="430" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Dur</text>

              <line x1="36" y1="364" x2="490" y2="364" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />

              <text x="40" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">EM1</text>
              <text x="80" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">Helvar / iL3-Wide</text>
              <text x="220" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">M/NM</text>
              <text x="250" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">SC</text>
              <text x="290" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">BR-C</text>
              <text x="340" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">2.7</text>
              <text x="380" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">EM-1/2</text>
              <text x="430" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">3 h</text>

              <text x="40" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">EM2</text>
              <text x="80" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">Tridonic / FT-Asym</text>
              <text x="220" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">M</text>
              <text x="250" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">SC</text>
              <text x="290" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">BR-D</text>
              <text x="340" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">2.7</text>
              <text x="380" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">EM-1</text>
              <text x="430" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">3 h</text>

              <text x="40" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">EM3</text>
              <text x="80" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">Eaton / EX-Bulkhead</text>
              <text x="220" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">M</text>
              <text x="250" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">SC</text>
              <text x="290" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">Wide</text>
              <text x="340" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">2.2</text>
              <text x="380" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">EM-2</text>
              <text x="430" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">3 h</text>

              {/* Safety-equipment schedule panel */}
              <rect x="540" y="315" width="320" height="240" fill="rgba(168,85,247,0.05)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.2" />
              <text x="700" y="335" textAnchor="middle" fill="#A855F7" fontSize="12" fontWeight="bold">Safety-equipment schedule</text>

              <text x="560" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Ref</text>
              <text x="615" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Type</text>
              <text x="700" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">Linked lum</text>
              <text x="800" y="358" fill="#FBBF24" fontSize="9" fontWeight="bold">V-lx</text>

              <line x1="556" y1="364" x2="848" y2="364" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />

              <text x="560" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">MCP-G-01</text>
              <text x="615" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">Call point</text>
              <text x="700" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">EM2</text>
              <text x="800" y="382" fill="rgba(255,255,255,0.85)" fontSize="9">6.4 lx</text>

              <text x="560" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">EXT-G-01</text>
              <text x="615" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">Extinguisher</text>
              <text x="700" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">EM1 (mid)</text>
              <text x="800" y="402" fill="rgba(255,255,255,0.85)" fontSize="9">5.6 lx</text>

              <text x="560" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">FA-G-01</text>
              <text x="615" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">First-aid post</text>
              <text x="700" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">dedicated</text>
              <text x="800" y="422" fill="rgba(255,255,255,0.85)" fontSize="9">5.2 lx</text>

              {/* Title block */}
              <rect x="20" y="568" width="840" height="10" fill="rgba(255,255,255,0.04)" />
              <text x="30" y="576" fill="rgba(255,255,255,0.55)" fontSize="9">Project · Floor G · Drawing EM-G-001 · Rev C · Scale 1:100 · BS 5266-1:2025 / BS EN 1838:2024</text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>2025 documentation pack</ContentEyebrow>

          <ConceptBlock
            title="What BS 5266-1:2025 §7 expects"
            plainEnglish="The 2025 revision expands documentation requirements. The drawing alone is no longer sufficient; the design pack must include schedules, photometric output, the risk-assessment trail, and supporting evidence. The pack is auditable evidence of the design — used at handover, periodic test, modification, and any compliance review through the installation life."
          >
            <p>Pack contents per BS 5266-1:2025 §7:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Layout drawings.</strong> Floor plans at 1:100 / 1:50 with luminaire
                positions, escape routes, photometric grids, safety-equipment overlay, sign
                positions, cross-sections.
              </li>
              <li>
                <strong>Schedule of luminaires.</strong> Per-fitting specification.
              </li>
              <li>
                <strong>Photometric calculation output.</strong> Dialux / Relux / AGi32 report
                with point-by-point grids, minimum / maximum / uniformity, reflectance set to 0%,
                maintenance factor stated.
              </li>
              <li>
                <strong>Risk-assessment cross-reference.</strong> Mapping each design uplift
                (above-minimum lux, refuge provision, high-risk circuit redundancy) to the fire
                risk assessment factor that drove it. Traceability from risk to design.
              </li>
              <li>
                <strong>Schedule of test points.</strong> Where the commissioning engineer must
                physically measure lux to verify the design. Typically the worst-case grid points
                from the photometric calculation, plus every safety-equipment vertical-lux point.
              </li>
              <li>
                <strong>Schedule of safety-equipment vertical-lux points.</strong> Already
                described — the per-device mapping.
              </li>
              <li>
                <strong>Manufacturer datasheets.</strong> For every luminaire model in the
                schedule. Photometric polar diagrams, S/h tables, IP rating, certifications.
              </li>
              <li>
                <strong>Photometric data files.</strong> The LDT / IES files used in the
                calculation. The commissioning engineer can re-run the calculation with the same
                data; future design modifications can refer to the actual photometric used.
              </li>
              <li>
                <strong>Maintenance factor evidence.</strong> The MF used in the calculation
                (typically 0.7 to 0.8) with rationale (luminaire technology, environment, cleaning
                regime).
              </li>
              <li>
                <strong>Revision history.</strong> Complete record of design changes from initial
                concept to as-built. Each revision dated, authored, and described.
              </li>
            </ul>
            <p>
              The pack is delivered to the dutyholder at handover and forms part of the building's
              fire safety documentation under the Regulatory Reform (Fire Safety) Order 2005. The
              dutyholder retains it and provides it on request to fire safety inspectors,
              insurance auditors, and any future design team modifying the system.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §7 (Documentation pack — full requirement)"
            clause={
              <>
                The design documentation shall comprise: layout drawings, schedule of luminaires,
                photometric calculation output, schedule of safety-equipment vertical-illuminance
                points, schedule of commissioning test points, manufacturer photometric data
                files, maintenance factor justification, and a cross-reference to the fire risk
                assessment identifying the basis for any design above the minimum values stated
                in this standard.
              </>
            }
            meaning="Nine pack components. Each has a different consumer and a different use case. Missing any one component breaks the audit chain; the pack must be complete at handover and maintained through the life of the installation."
          />

          <SectionRule />

          <ContentEyebrow>Mistakes the drawings expose</ContentEyebrow>

          <CommonMistake
            title="Generic luminaire descriptions instead of specific manufacturer + model"
            whatHappens="Schedule lists 'wide-distribution emergency LED downlighter, 3 W, IP44' for EM1 without naming a manufacturer or model. Procurement orders the cheapest available wide-distribution downlighter; commissioning engineer measures lux and finds 0.7 lx (against the 1.4 lx design value because the actual luminaire has a different photometric distribution). Design lux is non-evidenced because the design was based on a specific photometric file that does not match the installed luminaire."
            doInstead="Specify manufacturer + specific model variant + photometric file in the schedule. Procurement orders the named product. If procurement substitutes (e.g. a value-engineered alternative), the substitution must be re-verified photometrically — the new photometric file run through the design calculation. Generic descriptions break the traceability from design to installation."
          />

          <CommonMistake
            title="Sign drawings without pictogram size annotation"
            whatHappens="Drawings show emergency exit signs at every change of direction with the standard pictogram symbol. The pictogram size is not annotated. Installer fits 100 mm pictograms throughout the building; commissioning engineer verifies sign legibility from the most distant occupant position (15 m) and finds the 100 mm pictogram unreadable (legibility 100 × pictogram = 10 m, below the 15 m requirement). 200 mm pictograms required; existing signs replaced; project delayed."
            doInstead="Annotate pictogram size on every sign symbol on the drawing. The size must be calculated against the maximum viewing distance from any occupant position to the sign — 100 × pictogram height per BS EN ISO 7010. Document the viewing distance calculation alongside the size choice."
          />

          <CommonMistake
            title="Missing safety-equipment schedule"
            whatHappens="Layout drawing shows luminaires and the photometric grid for horizontal floor lux. Safety equipment (fire alarm call points, extinguishers) is shown on the drawing but no link is made to specific luminaires that provide 5 lx vertical on the device face. At commissioning, the engineer measures vertical lux at each device and finds three with values below 5 lx. The design document does not specify which luminaire was supposed to provide the duty for those devices, so remediation is guesswork."
            doInstead="Maintain the safety-equipment schedule as part of the design pack. Each device gets a row: identifier, type, location, linked luminaire reference, calculated vertical lux. The schedule is the audit trail — the inspector confirms each device has its dedicated luminaire and the predicted vertical lux. Without it, the vertical-lux duty is not documented and gaps go undetected until commissioning."
          />

          <SectionRule />

          <Scenario
            title="Producing a layout for a 4-storey office — the workflow"
            situation="New 4-storey office fit-out. Architect provides CAD floor plans. You have been engaged as the emergency lighting designer; deliverables include layout drawings, schedule of luminaires, photometric calculation output, safety-equipment schedule, and the BS 5266-1:2025 §7 documentation pack."
            whatToDo="(1) Walk the building (or virtual walk via 3D model). Identify every §5.5 mandatory position — exits, stairs, turns, intersections, safety devices. Mark each on the architect's CAD layer. (2) Read the fire risk assessment. Identify any uplift factors (none if it is a standard office). (3) Select luminaire types — EM1 wide-distribution recessed for corridors, EM2 asymmetric for long straight runs, EM3 bulkhead for stairs and exits. Download LDT files. (4) Initial layout in Dialux: place luminaires at mandatory positions, fill in between to meet S/h. (5) Run photometric calculation at 0% reflectance with 1 m × 1 m grid. Verify 1 lx route, 0.5 lx anti-panic in open areas, 5 lx vertical at each safety device. (6) Iterate: add luminaires where dim, reduce where over-spec, change distribution where wrong type. (7) Produce the schedule of luminaires; produce the safety-equipment schedule; export photometric calculation report. (8) Compose the §7 documentation pack: drawings, schedules, photometric, risk-assessment cross-reference, datasheets, LDT files, maintenance factor justification, revision history. (9) Issue for review."
            whyItMatters="The workflow is methodical because the standard requires every step to be evidenced. Skipping the walkthrough leaves §5.5 gaps; skipping the risk-assessment read misses uplifts; skipping photometric verification produces non-evidenced lux; missing schedules breaks the audit chain. Each step has a deliverable; each deliverable has a consumer; each consumer audits."
          />

          <Scenario
            title="Updating drawings after value-engineering substitution"
            situation="Original design specified Helvar iL3-Wide for EM1 at 24 positions. Contractor proposes Tridonic Felicta-W for value engineering — same form factor, same wattage, similar IP rating. Photometric distribution is published as 'wide' in both cases. The substitution will save approximately 8% on the package."
            whatToDo="The substitution is NOT automatically equivalent. Download the Tridonic LDT file. Re-run the Dialux calculation with the Tridonic file replacing the Helvar file. Verify min, max, uniformity at every grid point still meet the duty. If yes — produce a revised drawing showing EM1-A (Tridonic Felicta-W) and update the schedule. The revision history captures the change, the photometric verification report demonstrates the equivalence, and the documentation pack is updated. If the photometric does not match, refuse the substitution or re-design (which may consume any savings). The substitution must not happen on procurement decision alone; the photometric verification is mandatory."
            whyItMatters="Value engineering is fine as long as the photometric is verified. The schedule's specific manufacturer + model + LDT reference makes the verification possible — generic descriptions defeat the check. Designers who maintain the discipline of model-specific schedules can validate or reject substitutions in hours; designers with generic descriptions cannot validate at all."
          />

          <SectionRule />

          <KeyTakeaways
            title="Layout drawings — what makes them auditable"
            points={[
              'Drawing scales: 1:100 general, 1:50 detail. Symbols per BS EN 60617 with BS 5266 emergency markings (M / NM / HR / SC / CB).',
              'Each luminaire symbol carries: type, photometric distribution, mounting orientation arrow, circuit number, reference label.',
              'Photometric grid 0.5 m or 1 m on the target plane; output min / max / uniformity at 0% reflectance.',
              'Schedule of luminaires: per-row reference, manufacturer + model, LDT/IES file, function, supply, mounting, distribution, orientation, circuit, duration, commissioning notes.',
              'Sign details: pictogram size (viewing distance = 100 × height), mounting, direction, lit / unlit / self-contained.',
              'Safety-equipment schedule maps every call point / extinguisher / first-aid / refuge to its dedicated 5 lx vertical luminaire.',
              'Cross-section views for height-critical areas (stairs, high-bay, atria, refuges).',
              'BS 5266-1:2025 §7 documentation pack: drawings + schedules + photometric + risk-link + datasheets + LDT + MF + revision history.',
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <FAQ
            items={[
              {
                question: 'Can I deliver the layout digitally only, no paper?',
                answer:
                  'Yes — BS 5266-1:2025 does not mandate paper delivery. The design pack can be PDFs and CAD files. The dutyholder must be able to access, view and reproduce the documents on demand. Many dutyholders prefer digital because revision control and distribution are simpler. Inspectors typically have no preference provided they can view at the inspection site.',
              },
              {
                question: 'Who owns the LDT files in the pack — the designer or the manufacturer?',
                answer:
                  'The manufacturer owns the LDT data; the designer is licensed to use it for the design and to include it in the pack as evidence. Including a manufacturer LDT file in the documentation pack for compliance / audit purposes is standard industry practice and accepted by manufacturers; reproducing the data outside this purpose may need licence consideration.',
              },
              {
                question: 'How often does the documentation pack need updating?',
                answer:
                  'After any design change. New luminaires, repositioned luminaires, replaced luminaires (with different photometric), changes to the building layout that affect the design — all trigger an update. The revision history captures the changes; the original design plus all subsequent revisions form the lifetime documentation.',
              },
              {
                question: 'What if the architect changes the layout after the EL design is complete?',
                answer:
                  'Re-design where the architectural change affects the EL duty. Moved walls change the escape route geometry; new partitions change anti-panic open-area boundaries; relocated safety equipment requires moved 5 lx vertical luminaires. The EL designer reviews the architect\'s revision and updates the EL design; the documentation pack revision history captures the dependency.',
              },
              {
                question: 'Are detail-area cross-sections required for stairs?',
                answer:
                  'Recommended for any stair flight where the luminaire-to-tread relationship is not obvious from the plan view. A cross-section shows the luminaire mounting height, the angle of light incidence on the tread surfaces, and any architectural feature that might shadow a tread. The standard does not strictly mandate cross-sections but inspectors expect them where the design depends on vertical relationships.',
              },
              {
                question: 'What if the photometric calculation report does not state 0% reflectance explicitly?',
                answer:
                  'Re-run with 0% explicitly set and re-export. BS EN 1838:2024 §5.2 mandates 0% reflectance; the report must evidence it. Some software defaults to typical reflectances and the user must explicitly set zero for emergency calculations. A report showing typical reflectances is non-evidenced for emergency duty even if the lux values look reasonable.',
              },
              {
                question: 'Can the schedule of luminaires be combined with the schedule of test points?',
                answer:
                  'They can share a document but should be distinct sections / tabs. The luminaire schedule is the per-fitting specification; the test point schedule is the per-test commissioning list. They have different consumers (installer vs commissioning engineer) and combining them confuses the audit. Best practice is separate sections in the same documentation pack.',
              },
              {
                question: 'How detailed should the risk-assessment cross-reference be?',
                answer:
                  'Specific enough to trace each above-minimum design decision back to a risk assessment item. Example: \'2.5 lx route lux in residential corridors per fire risk assessment item 4.3.2 (vulnerable user group: residents with reduced mobility and cognitive impairment).\' Vague references (\'risk assessment\') do not support audit; specific references do.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Emergency lighting layout drawings — Module 3.5" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3-section-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.6 Software and calculation tools
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule3Section5;
