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
    id: 'fam2-s2-spacing',
    question:
      'Per BS 5839-1:2025 clause 21.2, what are the maximum centre-to-centre and detector-to-wall distances for a SMOKE detector mounted on a flat ceiling, and how do they compare to a HEAT detector?',
    options: [
      'They are the same.',
      'For a SMOKE detector: maximum 7.5 m centre-to-centre (giving an effective coverage radius of 7.5 m / √2 ≈ 5.3 m), maximum 5.3 m from any wall. For a HEAT detector the corresponding values are TIGHTER: maximum 5.3 m centre-to-centre and maximum 3.7 m from any wall (effective radius 3.7 m). The reason the heat numbers are tighter is that a heat detector responds only to localised temperature rise — heat dissipates more rapidly than smoke spreads, so the detector needs to be physically closer to the fire to respond in time.',
      '5.3 m for both.',
      '10 m for both.',
    ],
    correctIndex: 1,
    explanation:
      'These spacings come from BS 5839-1:2025 clause 21.2 and are unchanged from earlier editions. The 7.5 m / 5.3 m smoke versus 5.3 m / 3.7 m heat differential is one of the load-bearing rules of detector siting. A heat detector spaced as a smoke detector will fail to respond in time to a real fire — the fire will be well established before the localised temperature rise reaches the device.',
  },
  {
    id: 'fam2-s2-element',
    question:
      'BS 5839-1:2025 clause 21.2.4 states that a smoke detector must have its sensitive element 25 mm to 600 mm below the ceiling, and a heat detector 25 mm to 150 mm. Why the lower-bound 25 mm, and why the tighter 150 mm upper bound for heat?',
    options: [
      'Decoration.',
      "The 25 mm LOWER bound exists because the layer of air immediately at the ceiling is a 'dead zone' for smoke and heat — buoyant smoke flows along the ceiling but is partially trapped in a static boundary layer, and a detector hard against the ceiling surface may not see the smoke layer until it has thickened significantly. The 25 mm offset puts the sensitive element below the boundary layer, in the active smoke-flow region. The 150 mm UPPER bound for heat exists because heat dissipates with distance and time — a heat detector 600 mm below the ceiling would be too far from the rising plume to respond in useful time. Smoke is more persistent in the descending layer, so the upper bound is more relaxed at 600 mm.",
      'Decoration choice.',
      'Manufacturing tolerance.',
    ],
    correctIndex: 1,
    explanation:
      'The 25 mm lower bound is sometimes overlooked at installation when detectors are recessed flush into ceilings — the sensitive element ends up at 0-15 mm below the ceiling surface, in the dead zone. Always check at commissioning that the element offset is within the 25-600 mm (smoke) / 25-150 mm (heat) envelope.',
  },
  {
    id: 'fam2-s2-void',
    question:
      'A 1.4 m deep ceiling void contains cabling and is being protected with smoke detectors. Per the BS 5839-1:2025 clause 21.2.7 figure for voids, where should the detector be mounted?',
    options: [
      'On the lower (room-side) ceiling.',
      'Within the TOP 10 percent of the void depth. The 2025 figure for detectors in voids gives three cases: (a) void up to 1.25 m deep — detector top 125 mm; (b) void more than 1.25 m and up to 1.5 m — detector in TOP 10 PERCENT of the void; (c) void more than 1.5 m — treat as a normal-height room and apply standard ceiling detector rules. For the 1.4 m case here, rule (b) applies: the detector should be within the top 10 percent of the void = within the top 140 mm. Mounting it at the void floor (the lower ceiling) leaves the detector below the smoke layer that will accumulate at the void apex.',
      'In the centre of the void.',
      'On the room-side ceiling, not in the void.',
    ],
    correctIndex: 1,
    explanation:
      'The clause 21.2.7 void figure is NEW in BS 5839-1:2025 — replacing earlier text-only guidance that frequently caused on-site interpretation errors. The figure gives three clear depth bands and the corresponding detector position. Print the figure and bring it to site for any void detection design.',
  },
  {
    id: 'fam2-s2-obstacle',
    question:
      'BS 5839-1:2025 clause 21.2.12 introduces a "treat as a wall" rule for ceiling-mounted obstructions. What are the two conditions that must BOTH be met before an obstruction (e.g. ducting) is treated as a wall for spacing purposes?',
    options: [
      'Only one condition.',
      'BOTH conditions in clause 21.2.12: (a) the gap between the TOP of the obstruction and the ceiling above is less than 300 mm; AND (b) the obstruction is deeper than 10 percent of the overall ceiling height. Both must hold. If either fails — gap above the obstruction is 300 mm or more, OR the obstruction is shallower than 10 percent of ceiling height — the obstruction is NOT treated as a wall. Smoke and heat will flow over and around it without significant obstruction; the detector may be sited as if the obstruction were not there. This rule is one of the more useful 2025 clarifications because the previous edition left "obstacle" undefined.',
      'Only the depth.',
      'Only the gap.',
    ],
    correctIndex: 1,
    explanation:
      'Clause 21.2.12 is a 2025 clarification of previously informal guidance. The two-test (gap AND depth) makes the rule unambiguous. A 200 mm-deep beam with 350 mm clearance to the ceiling is NOT a wall (gap fails). A 200 mm-deep beam with 250 mm clearance to the ceiling is also NOT a wall in a 4 m ceiling (10 percent depth fails: 200 mm < 400 mm). Both tests must pass.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the maximum CENTRE-TO-CENTRE spacing for a smoke detector on a flat ceiling per BS 5839-1:2025 clause 21.2?',
    options: [
      '5.3 m.',
      '7.5 m. The corresponding maximum distance from any wall is 5.3 m. Together these define a 7.5 m × 7.5 m detection grid with each detector centred in a 7.5 m × 7.5 m area; effective coverage radius is 7.5 / √2 = approximately 5.3 m. The numbers are calibrated against expected smoke spread for typical UK ceiling heights and combustion signatures. They are NOT changed in the 2025 edition; they remain the load-bearing flat-ceiling spacing rule.',
      '10.5 m.',
      '12 m.',
    ],
    correctAnswer: 1,
    explanation:
      'Smoke detector flat-ceiling rule: 7.5 m centre-to-centre, 5.3 m to wall. Heat detector rule: 5.3 m centre-to-centre, 3.7 m to wall. The two rule sets are different because heat spreads less reliably than smoke; a heat detector must be closer to the fire to respond.',
  },
  {
    id: 2,
    question:
      'Per BS 5839-1:2025 clause 21.2.4, what is the permitted RANGE of distance between the sensitive element and the ceiling for a SMOKE detector?',
    options: [
      '0 to 25 mm.',
      '25 mm to 600 mm. The 25 mm minimum keeps the element out of the static boundary-layer "dead zone" at the ceiling surface where smoke flow can be impeded; the 600 mm maximum keeps the element within the active smoke-spread region descending from the ceiling. For HEAT detectors the corresponding range is tighter (25 mm to 150 mm) because heat dissipates with distance — a heat detector hung too far below the ceiling will not respond fast enough.',
      '0 to 150 mm.',
      '600 mm to 1 m.',
    ],
    correctAnswer: 1,
    explanation:
      'Element position is one of the most commonly missed details at installation. Recessed flush-fitting detectors can put the element at less than 25 mm offset; pendant-mounted heat detectors can exceed 150 mm. Both are non-compliant with clause 21.2.4. Verify at commissioning.',
  },
  {
    id: 3,
    question:
      'A multi-sensor detector is configured to operate on heat AND smoke (both must trigger). What ceiling-height limit applies?',
    options: [
      'Smoke detector limit.',
      'The HEAT-detector limit, per BS 5839-1:2025 clause 17 (Table 3). Where a multi-sensor is configured in AND-logic, the slowest-responding element controls the device behaviour, so the ceiling height limit is the more conservative heat value (typically 7.5 m or 9 m depending on class). The smoke-detector limit (typically 10.5 m for class A1R smoke) does NOT apply when the smoke element is gated by the heat element. Designers using AND-logic in tall spaces must work the height limit explicitly.',
      'Multi-sensor has no limit.',
      'Beam-detector limit.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 17 / Table 3 was clarified in the 2025 edition specifically to address this multi-sensor question. AND-logic gives strong false-alarm immunity but constrains ceiling height. The designer must record the operating mode (clause 20.11) so commissioning can verify the height assumption.',
  },
  {
    id: 4,
    question:
      'In BS 5839-1:2025, "closely spaced" structural beams are now defined as beams approximately how far apart, centre-to-centre?',
    options: [
      '3 m or more.',
      '1 m or less. This is a NEW definition introduced in the 2025 revision (clause 21 commentary). Previous editions referred to "closely spaced beams" without defining the threshold, leading to inconsistent on-site interpretation. The 2025 figure of approximately 1 m centre-to-centre defines the cellular-ceiling regime, where each cell may be treated as a small enclosed area for detection purposes rather than the beams being treated as obstructions on a flat ceiling. The clarification removes a long-standing ambiguity.',
      '5 m apart.',
      '500 mm apart.',
    ],
    correctAnswer: 1,
    explanation:
      'The 1 m closely-spaced threshold drives whether you treat the ceiling as a single flat ceiling with obstructions (beams >1 m apart) or as a series of small cells (beams ≤1 m apart). The two regimes have different detection rules. The 2025 clarification finally pins the threshold down.',
  },
  {
    id: 5,
    question:
      'Per BS 5839-1:2025 clause 21.2 — for STRUCTURAL beams or other isolated ceiling attachments not exceeding 250 mm depth — what is the spacing rule for nearby detectors?',
    options: [
      'No rule.',
      'Detectors should not be mounted closer to the obstruction than TWICE the depth of the obstruction. For a 200 mm beam, no detector within 400 mm. For a 250 mm beam, no detector within 500 mm. The rationale: smoke and heat flow rounds an obstruction in a turbulent pattern that creates a localised "shadow" zone immediately downstream of the obstacle; detectors in that shadow have impaired response. The 2× depth rule keeps the detector clear of the shadow. NOTE: where a beam is ≤ 250 mm AND there is more than 300 mm gap above it to the ceiling, the new clause 21.2.12 note clarifies the beam is not treated as an obstacle at all.',
      '1 m clear.',
      'Same as wall spacing.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2× depth rule is unchanged from earlier editions; the 2025 addition is the clarification that beams with adequate clearance above (>300 mm) and modest depth are not treated as obstacles at all — formalising what good designers had been doing informally.',
  },
  {
    id: 6,
    question:
      'Per BS 5839-1:2025 (the new figure for detectors in voids), where do you mount a detector in a 0.8 m deep ceiling void?',
    options: [
      'In the middle.',
      'Within the TOP 125 mm of the void (i.e. close to the structural ceiling above the void). This is rule (a) in the new clause 21.2.7 figure: void up to and including 1.25 m deep — detector top 125 mm. The remaining void depth between 125 mm and the lower ceiling is irrelevant for detector siting; the detector watches the smoke that will collect at the apex of the void. The lower ceiling (which forms the room ceiling on its other side) requires its own room-side detection if the void is being protected as a separate compartment.',
      'On the lower ceiling.',
      'Anywhere in the void.',
    ],
    correctAnswer: 1,
    explanation:
      'The new void figure handles three depth bands: ≤1.25 m → top 125 mm; >1.25 m and ≤1.5 m → top 10 percent; >1.5 m → treat as normal-height room. The figure replaces previous text-only guidance and removes a frequent on-site error.',
  },
  {
    id: 7,
    question:
      'Why are heat detectors no longer permitted in sleeping rooms for new L1, L2 or L3 systems under BS 5839-1:2025?',
    options: [
      'Cost.',
      'Because typical sleeping-room fires are smouldering, low-temperature events. A discarded cigarette igniting bedding, an overheating phone charger, a fire in soft furnishings — these produce LARGE quantities of toxic smoke at temperatures FAR below the response point of a heat detector. The smoke kills the sleeping occupant well before the heat threshold (typically 54-65 °C for the lowest static class) is reached. Coroner inquest data and FRS fatality statistics support the change. New L1, L2 and L3 work must use SMOKE or MULTI-SENSOR detection in sleeping rooms; existing systems are grandfathered until new work occurs.',
      'Heat detectors are unreliable.',
      'They cost too much.',
    ],
    correctAnswer: 1,
    explanation:
      'The change is one of the most consequential of the 2025 edition. Sleeping fires are characteristically slow and smoke-dominated; the heat threshold is reached too late. Specify smoke or multi-sensor for new bedrooms, hotel rooms, dorms, halls of residence, care home rooms, hospital wards.',
  },
  {
    id: 8,
    question:
      'A horizontal ceiling has a series of small cells (closely spaced beams ≤ 1 m centre-to-centre). What is the detector siting rule?',
    options: [
      'Treat as a flat ceiling.',
      'Treat each cell — or a group of cells — as the detection area, NOT the overall ceiling. With closely spaced beams, smoke and heat are constrained within each cell and do not flow freely along the overall ceiling. Detectors are sited based on the cellular geometry. The 2025 edition (clause 21.2 commentary) clarifies the closely-spaced threshold (≈ 1 m) and points to the appropriate detection-area rules. For sparse beams (>1 m apart) the overall ceiling is treated as flat, with the beams as obstructions assessed under clauses 21.2.12 / 21.2.14.',
      'Treat as a high ceiling.',
      'Treat as a void.',
    ],
    correctAnswer: 1,
    explanation:
      'Cellular ceilings are common in older industrial buildings and in some modern coffered architectural ceilings. The 1 m threshold (new in 2025) settles the long-standing question of when to treat each cell separately versus when to treat the whole ceiling as flat with obstructions.',
  },
  {
    id: 9,
    question:
      'A 4 m high room has a 200 mm deep ducting strip running across the ceiling, with a 350 mm gap between the top of the duct and the ceiling above. Is the ducting an OBSTACLE under clause 21.2.12?',
    options: [
      'Yes.',
      'NO. Clause 21.2.12 sets two tests that BOTH must pass for the duct to be treated as a wall: (a) gap above the obstruction LESS than 300 mm — here the gap is 350 mm, so test (a) FAILS. Even if test (b) (depth ≥ 10 percent of ceiling height = 400 mm) had passed, the obstruction would still NOT be treated as a wall because both tests must pass. The ducting is therefore not an obstacle for spacing purposes; smoke and heat will flow over and around it. Detectors may be sited as if the duct were not there. NOTE: this does not exempt the area DIRECTLY UNDER the duct from any localised shadow consideration if the duct is wide.',
      'Only if it is metal.',
      'Only on the underside.',
    ],
    correctAnswer: 1,
    explanation:
      "Clause 21.2.12's two-test rule is one of the more useful 2025 clarifications. Many on-site interpretation arguments arose from the 2017 edition's vague 'where there is sufficient gap above the obstruction' phrasing; the 2025 numbers (300 mm gap AND 10 percent depth) make the rule auditable.",
  },
  {
    id: 10,
    question:
      'Approximately how many smoke detectors does it take to cover a 30 m × 30 m office floor (flat ceiling, no obstructions)?',
    options: [
      '4.',
      '16. With smoke spacing of 7.5 m centre-to-centre and 5.3 m to wall, a 30 m × 30 m square accommodates a 4 × 4 grid of detectors. Each detector covers a 7.5 m × 7.5 m area = 56.25 m². Sixteen detectors cover 900 m². The first row centre is approximately 5.3 m from one wall and the last row centre is approximately 5.3 m from the opposite wall, leaving 30 - 10.6 = 19.4 m for the three centre-to-centre gaps of 7.5 m each = 22.5 m — not quite enough, so the spacing tightens slightly to fit. A 4 × 4 grid is the minimum valid configuration; some designs add a 5 × 5 grid to allow drop-out tolerance. The exact answer depends on detector class (smoke vs heat vs multi-sensor mode) and any obstructions.',
      '8.',
      '32.',
    ],
    correctAnswer: 1,
    explanation:
      'The "30 × 30 = 16 detectors" rule of thumb is a useful sanity check. For heat detection on the same floor (5.3 m centre-to-centre, 3.7 m to wall), the corresponding number is approximately 36 detectors — more than double, reflecting the tighter spacing rules for heat.',
  },
];

const FireAlarmModule2Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Detector siting and coverage | Fire Alarm Module 2.2 | Elec-Mate',
    description:
      'BS 5839-1:2025 detector siting rules: flat-ceiling spacing 7.5 m / 5.3 m for smoke and 5.3 m / 3.7 m for heat (clause 21.2), element offsets 25-600 mm / 25-150 mm (21.2.4), the new void figure (21.2.7), the 300 mm / 10 percent obstacle test (21.2.12), and closely-spaced beam definition.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2"
            title="Detector siting and coverage"
            description="Spacing, element offset, void detection and the new obstacle rule. The geometry of detector placement is a small set of numbers that, once held in mind, drives every flat-ceiling, beam-ceiling and void-ceiling design under BS 5839-1:2025."
            tone="yellow"
          />

          <TLDR
            points={[
              'Flat-ceiling spacing — SMOKE: 7.5 m centre-to-centre, 5.3 m to any wall (effective radius ≈ 5.3 m). HEAT: 5.3 m centre-to-centre, 3.7 m to any wall. Heat is tighter because heat dissipates faster than smoke spreads.',
              'Sensitive-element offset (clause 21.2.4) — SMOKE: 25 to 600 mm below ceiling. HEAT: 25 to 150 mm. The 25 mm minimum keeps the element out of the ceiling boundary-layer dead zone; the upper bound keeps it within the active smoke/heat-spread region.',
              'Voids (clause 21.2.7) — NEW figure in 2025: void ≤ 1.25 m → detector in top 125 mm; void > 1.25 m and ≤ 1.5 m → detector in top 10 percent; void > 1.5 m → treat as normal-height room.',
              'Obstacles (clause 21.2.12) — NEW two-test rule: an obstruction (e.g. duct) is treated as a WALL only if BOTH (a) gap to ceiling < 300 mm AND (b) depth > 10 percent of ceiling height. Otherwise the obstruction is not treated as a wall.',
              'Beams ≤ 250 mm depth — detectors must be no closer to the beam than 2× its depth. Beams with > 300 mm gap above are not treated as obstacles at all.',
              'Closely-spaced beams — NEW 2025 definition: beams approximately 1 m or less centre-to-centre form a cellular ceiling, treated separately from a flat ceiling with obstructions.',
              'Ceiling-height limits (Table 3) follow detector type. Multi-sensor in AND-logic falls back to the HEAT-detector height limit (clause 17), not the smoke limit.',
              'Heat detection is NO LONGER permitted in sleeping rooms for NEW L1/L2/L3 work (clause 14, see Section 1).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the BS 5839-1:2025 clause 21.2 flat-ceiling spacing rules: 7.5 m / 5.3 m for smoke; 5.3 m / 3.7 m for heat',
              'Apply the clause 21.2.4 sensitive-element offset rules: 25-600 mm for smoke, 25-150 mm for heat, and check at commissioning',
              'Apply the NEW clause 21.2.7 void-detection figure: top 125 mm / top 10 percent / treat as normal-height room based on void depth bands',
              'Apply the NEW clause 21.2.12 obstacle test: two conditions (gap < 300 mm AND depth > 10 percent ceiling height) BOTH required for an obstruction to be treated as a wall',
              'Apply the 2× depth rule for nearby beams ≤ 250 mm and identify when beams are not obstacles at all',
              'Apply the NEW 2025 closely-spaced beam definition (approximately 1 m centre-to-centre) and switch between flat-ceiling and cellular-ceiling regimes',
              'Apply Table 3 ceiling-height limits, including the multi-sensor AND-logic falls-back-to-heat rule (clause 17)',
              'Calculate detector counts for typical floor plates and verify against grid geometry',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Flat-ceiling spacing — clause 21.2</ContentEyebrow>

          <ConceptBlock
            title="Smoke detector flat-ceiling spacing"
            plainEnglish="On a flat horizontal ceiling, smoke detectors are arranged on a grid such that no point on the ceiling is more than 5.3 m from the nearest detector — that is the 'effective coverage radius' of a smoke detector. The convenient grid that achieves this is 7.5 m × 7.5 m centre-to-centre, with each detector centred in its own 7.5 m × 7.5 m square. The diagonal of that square is 10.6 m, so the corner-to-detector distance is 5.3 m — the geometric maximum. The detector at any position on the grid is not more than 5.3 m from its corresponding wall (so the boundary cells are equivalent to interior cells)."
            onSite="When laying out detectors on a drawing, snap to a 7.5 m grid. Verify by drawing 5.3 m circles around each detector and confirming the union of circles covers every point on the floor. For irregular geometries, the 5.3 m radius around the proposed detector position is the test. Tighter spacing always passes; wider spacing always fails."
          >
            <p>The exact wording from BS 5839-1:2025 clause 21.2:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Maximum centre-to-centre spacing:</strong> 7.5 m for smoke detectors.
              </li>
              <li>
                <strong>Maximum wall-to-detector distance:</strong> 5.3 m for smoke detectors.
              </li>
              <li>
                <strong>Effective coverage radius:</strong> approximately 5.3 m (the diagonal of a
                7.5 m square divided by 2).
              </li>
              <li>
                <strong>Per-detector floor area:</strong> 7.5 m × 7.5 m = 56.25 m² maximum.
              </li>
              <li>
                <strong>Wall and corner allowance:</strong> the same 5.3 m maximum applies — corners
                of the room are not further from a detector than any other point.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Heat detector flat-ceiling spacing — TIGHTER than smoke"
            plainEnglish="Heat detectors require closer spacing than smoke detectors because heat dissipates more rapidly than smoke spreads. A real fire produces a buoyant plume of hot gases that rises to the ceiling; smoke layers spread laterally along the ceiling and remain detectable for some time, but heat conducts and convects away more quickly. The detector therefore needs to be physically closer to the fire to receive useful temperature signal. The flat-ceiling rule for heat is 5.3 m centre-to-centre and 3.7 m to wall — about 70 percent of the smoke-detector dimensions."
          >
            <p>BS 5839-1:2025 clause 21.2 — heat-detector spacing:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Maximum centre-to-centre spacing:</strong> 5.3 m for heat detectors.
              </li>
              <li>
                <strong>Maximum wall-to-detector distance:</strong> 3.7 m for heat detectors.
              </li>
              <li>
                <strong>Effective coverage radius:</strong> approximately 3.7 m.
              </li>
              <li>
                <strong>Per-detector floor area:</strong> 5.3 m × 5.3 m ≈ 28 m² — about half the
                smoke area.
              </li>
            </ul>
            <p>
              In practice this means a heat-only design has ROUGHLY DOUBLE the detector count of an
              equivalent smoke design. This cost differential — combined with the 2025 prohibition
              on heat detectors in sleeping rooms — has further accelerated the move to multi-sensor
              (which uses the smoke-detector spacing where the smoke element is the primary
              trigger).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 21.2 (siting and spacing of point detectors)"
            clause={
              <>
                Point fire detectors should be sited such that the horizontal distance from any
                point in the protected area to the nearest detector does not exceed: 7.5 m for smoke
                detectors; 5.3 m for heat detectors. Equivalent maximum distances from a wall to the
                nearest detector are 5.3 m for smoke detectors and 3.7 m for heat detectors. NOTE
                These distances are based on rectangular grid layouts; alternative grid geometries
                (e.g. triangular) may permit different spacings provided the maximum coverage radius
                is respected.
              </>
            }
            meaning="The clause is unchanged in numerical content from the 2017 edition, but the numbering moved (clause 21.2 in 2025; was clause 22.3 in 2017). Memorise the four numbers — 7.5/5.3 smoke, 5.3/3.7 heat — and the corresponding effective radii (5.3 m smoke, 3.7 m heat). They drive every flat-ceiling design."
          />

          <ConceptBlock
            title="Sensitive-element offset — clause 21.2.4"
            plainEnglish="The detector body sits below the ceiling on its mounting base, but what matters for detection performance is the position of the SENSITIVE ELEMENT — the optical chamber, the thermistor, the CO cell — relative to the ceiling surface. The 2025 edition (clause 21.2.4) specifies a permitted range of element offsets: 25 mm to 600 mm for smoke detectors, 25 mm to 150 mm for heat detectors. The 25 mm minimum is the same for both."
          >
            <p>Why these numbers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>25 mm minimum (smoke and heat).</strong> A static boundary layer exists at
                the ceiling surface where smoke and heat flow are impeded. An element hard against
                the ceiling sees this dead-zone air. 25 mm offset puts the element below the
                boundary layer, in the active flow region.
              </li>
              <li>
                <strong>600 mm maximum (smoke).</strong> Smoke layers descending from the ceiling
                remain detectable to about this depth in typical fire scenarios. Beyond 600 mm the
                element is below the smoke layer and detection is delayed.
              </li>
              <li>
                <strong>150 mm maximum (heat).</strong> Heat dissipates with distance from the
                ceiling much faster than smoke does. A heat detector hung 600 mm below the ceiling
                may be in air whose temperature has dropped well below the response point even when
                the ceiling itself is hot. The 150 mm tighter limit reflects this.
              </li>
              <li>
                <strong>Common installation errors.</strong> RECESSED detectors fitted flush with
                the ceiling face — element is at 0-15 mm offset, in the dead zone. PENDANT-MOUNTED
                heat detectors hung from a long pendant — element exceeds 150 mm. BOTH are
                non-compliant with clause 21.2.4 and should be picked up at commissioning.
              </li>
            </ul>
            <p>
              Where structural constraints force the element outside the permitted envelope (e.g. a
              very low ceiling height where 25 mm offset would intrude into walking space), the
              designer must record a justified variation under clause 22.2 — not all variations are
              permitted, and the 25 mm offset is rarely a candidate for variation because the
              dead-zone risk is well-evidenced.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Spacing diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Flat-ceiling spacing — smoke vs heat (clause 21.2)
            </h4>
            <svg
              viewBox="0 0 820 540"
              className="w-full h-auto"
              role="img"
              aria-label="Two side-by-side plan views. Left: smoke detector grid showing 7.5 m centre-to-centre spacing and 5.3 m to wall, with effective coverage circles overlapping. Right: heat detector grid with tighter 5.3 m centre-to-centre and 3.7 m to wall spacing, demonstrating the higher detector density required for heat detection."
            >
              {/* SMOKE GRID */}
              <g>
                <text
                  x="200"
                  y="30"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="14"
                  fontWeight="bold"
                >
                  SMOKE detector grid
                </text>
                <text x="200" y="48" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                  7.5 m c/c · 5.3 m to wall · radius 5.3 m
                </text>
                {/* Room outline */}
                <rect
                  x="50"
                  y="70"
                  width="300"
                  height="300"
                  rx="6"
                  fill="rgba(168,85,247,0.04)"
                  stroke="rgba(168,85,247,0.6)"
                  strokeWidth="1.5"
                />
                {/* Detectors at 7.5m grid (representative 4 detectors at corners) */}
                {[110, 290].map((cx) =>
                  [130, 310].map((cy) => (
                    <g key={`sm-${cx}-${cy}`}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="60"
                        fill="rgba(251,191,36,0.06)"
                        stroke="rgba(251,191,36,0.45)"
                        strokeWidth="1"
                        strokeDasharray="3,2"
                      />
                      <circle cx={cx} cy={cy} r="6" fill="#FBBF24" />
                      <circle cx={cx} cy={cy} r="3" fill="black" />
                    </g>
                  ))
                )}
                {/* Spacing labels */}
                <line
                  x1="110"
                  y1="395"
                  x2="290"
                  y2="395"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.2"
                  markerEnd="url(#arrow1)"
                  markerStart="url(#arrow1)"
                />
                <text
                  x="200"
                  y="412"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  7.5 m
                </text>
                {/* Wall distance */}
                <line
                  x1="50"
                  y1="130"
                  x2="110"
                  y2="130"
                  stroke="rgba(34,211,238,0.7)"
                  strokeWidth="1"
                />
                <text x="80" y="124" textAnchor="middle" fill="#22D3EE" fontSize="9">
                  5.3 m max to wall
                </text>
                {/* Coverage area annotation */}
                <text
                  x="200"
                  y="455"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="10"
                >
                  each detector covers up to 7.5 × 7.5 = 56.25 m²
                </text>
                <text
                  x="200"
                  y="472"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  applies to optical, ionisation, multi-sensor in O or O+H mode
                </text>
              </g>

              {/* HEAT GRID */}
              <g>
                <text
                  x="600"
                  y="30"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="14"
                  fontWeight="bold"
                >
                  HEAT detector grid
                </text>
                <text x="600" y="48" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                  5.3 m c/c · 3.7 m to wall · radius 3.7 m
                </text>
                {/* Room outline (same size for comparison) */}
                <rect
                  x="450"
                  y="70"
                  width="300"
                  height="300"
                  rx="6"
                  fill="rgba(239,68,68,0.04)"
                  stroke="rgba(239,68,68,0.6)"
                  strokeWidth="1.5"
                />
                {/* Detectors at 5.3m grid (more density - 9 detectors in 3x3) */}
                {[510, 600, 690].map((cx) =>
                  [130, 220, 310].map((cy) => (
                    <g key={`ht-${cx}-${cy}`}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="42"
                        fill="rgba(239,68,68,0.05)"
                        stroke="rgba(239,68,68,0.4)"
                        strokeWidth="0.8"
                        strokeDasharray="2,2"
                      />
                      <circle cx={cx} cy={cy} r="5" fill="#EF4444" />
                      <circle cx={cx} cy={cy} r="2.5" fill="black" />
                    </g>
                  ))
                )}
                {/* Spacing labels */}
                <line
                  x1="510"
                  y1="395"
                  x2="600"
                  y2="395"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.2"
                />
                <text
                  x="555"
                  y="412"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  5.3 m
                </text>
                <line
                  x1="450"
                  y1="130"
                  x2="510"
                  y2="130"
                  stroke="rgba(34,211,238,0.7)"
                  strokeWidth="1"
                />
                <text x="480" y="124" textAnchor="middle" fill="#22D3EE" fontSize="9">
                  3.7 m
                </text>
                <text
                  x="600"
                  y="455"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="10"
                >
                  each detector covers up to ≈ 28 m² — about HALF
                </text>
                <text
                  x="600"
                  y="472"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  heat dissipates faster than smoke spreads → tighter spacing
                </text>
              </g>

              {/* Element offset cross-section */}
              <g>
                <rect
                  x="50"
                  y="490"
                  width="700"
                  height="40"
                  rx="8"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                <text x="65" y="510" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                  Element offset (clause 21.2.4):
                </text>
                <text x="220" y="510" fill="#FBBF24" fontSize="10">
                  SMOKE 25-600 mm below ceiling
                </text>
                <text x="475" y="510" fill="#EF4444" fontSize="10">
                  HEAT 25-150 mm below ceiling
                </text>
                <text x="65" y="525" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                  25 mm min keeps element out of static boundary-layer dead zone · upper bound keeps
                  element in active spread region
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Voids — the new clause 21.2.7 figure</ContentEyebrow>

          <ConceptBlock
            title="Detectors in ceiling voids — three depth bands"
            plainEnglish="A ceiling void is the space between the structural ceiling above and a suspended (or false) ceiling below. Voids commonly contain cabling, ducting, services and combustible insulation — fire risk that is invisible from the room below. Where a void is being protected, smoke (or other fire signature) must be detected within the void, NOT just at the room ceiling. The 2025 edition introduced a NEW figure (clause 21.2.7) that gives clear detector positions for three depth bands."
          >
            <p>The three cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Void up to and including 1.25 m deep.</strong> Detector mounted at the
                STRUCTURAL CEILING (the upper boundary of the void), with the sensitive element in
                the TOP 125 mm of the void. The void is too shallow to develop a meaningful smoke
                stratification; the apex collects smoke and the detector watches that apex.
              </li>
              <li>
                <strong>Void more than 1.25 m and up to 1.5 m deep.</strong> Detector mounted at the
                structural ceiling with the sensitive element in the TOP 10 PERCENT of the void
                depth. For a 1.5 m void, that is the top 150 mm. The 10 percent rule scales the
                element position to the void depth.
              </li>
              <li>
                <strong>Void more than 1.5 m deep.</strong> Treat the void as a NORMAL-HEIGHT ROOM
                and apply standard ceiling-detector rules. Element offset 25-600 mm (smoke) or
                25-150 mm (heat); spacing 7.5 m / 5.3 m smoke or 5.3 m / 3.7 m heat. The void is
                effectively a separate compartment with its own ceiling.
              </li>
            </ul>
            <p>
              The figure replaces text-only guidance from the 2017 edition that frequently caused
              on-site interpretation errors. Print or screen-grab the figure and bring it to site
              for any void-detection design.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 21.2.7 (detectors in voids)"
            clause={
              <>
                The placement of detectors in voids has been made clearer with the use of a new
                figure to highlight at what position and what depth of the void the detector should
                be mounted. Three cases are illustrated: void up to and including 1.25 m deep
                (detector top 125 mm); void more than 1.25 m and up to and including 1.5 m deep
                (detector top 10 percent); void more than 1.5 m deep (treated as a normal height
                room).
              </>
            }
            meaning="The void figure is one of the most-referenced new visuals in the 2025 edition. Memorise the three depth bands and their detector positions. Voids more than 1.5 m deep are treated as separate rooms with their own ceiling — apply the standard 7.5/5.3 smoke or 5.3/3.7 heat spacing rules and the standard 25-600/25-150 element offsets."
          />

          <ConceptBlock
            title="When does a void need protecting at all?"
            plainEnglish="Not every ceiling void requires fire detection. The decision flows from the system category and the void contents. L1 systems require detection in all areas where a fire could start, which generally includes voids containing combustible material or cabling. L2 systems require detection in defined high-risk areas plus escape routes; voids over escape routes typically need protection if they contain combustible material. L3 protects escape routes and rooms opening onto them; voids over those spaces may need protection. L4/L5 typically do not require void detection."
          >
            <p>The void-protection decision sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System category.</strong> L1 → broadly yes; L2/L3 → depends on contents and
                location; L4/L5 → typically no.
              </li>
              <li>
                <strong>Void contents.</strong> Cabling — depends on cable mass and combustibility.
                Combustible insulation — yes. Bare structural void with no services — typically no.
              </li>
              <li>
                <strong>Void location.</strong> Over an escape route or sleeping accommodation —
                weight toward yes. Over plant rooms with their own protection — typically no.
              </li>
              <li>
                <strong>Compartmentation.</strong> Where the void is fire-stopped at compartment
                walls, each compartment is treated separately. The 2025 commentary on category L3
                clarifies that the void wall adjacent to an escape route should be of solid
                construction with no holes — the previous "fire-resisting construction" requirement
                has been replaced with a simpler "solid construction, no holes" test.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Obstacles, beams and the new 2025 clarifications</ContentEyebrow>

          <ConceptBlock
            title="Clause 21.2.12 — the two-test rule for ceiling-mounted obstructions"
            plainEnglish="Ducting, cable trays, light fittings and other obstructions on or near a ceiling can disrupt smoke and heat flow. The 2025 edition introduces clause 21.2.12 — a clear two-test rule for when an obstruction is treated as a wall (and therefore drives the 5.3 m / 3.7 m wall-distance rule), and when it is not."
          >
            <p>The two tests — BOTH must be met for the obstruction to be treated as a wall:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Test (a) — gap above.</strong> The gap between the TOP of the obstruction
                and the ceiling above is LESS than 300 mm.
              </li>
              <li>
                <strong>Test (b) — depth.</strong> The obstruction is DEEPER than 10 PERCENT of the
                overall ceiling height.
              </li>
            </ul>
            <p>
              If both pass, treat the obstruction as a wall — apply the 5.3 m smoke / 3.7 m heat
              wall-distance rule. If either fails, the obstruction is NOT treated as a wall; smoke
              and heat flow over and around it.
            </p>
            <p>Worked examples:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>4 m ceiling, 200 mm duct with 250 mm gap above:</strong> Test (a) passes
                (250 &lt; 300). Test (b) fails (200 &lt; 400 = 10 percent of 4000). Therefore NOT a
                wall.
              </li>
              <li>
                <strong>3 m ceiling, 350 mm duct with 200 mm gap above:</strong> Test (a) passes
                (200 &lt; 300). Test (b) passes (350 &gt; 300 = 10 percent of 3000). Therefore IS a
                wall — apply 5.3 m / 3.7 m rule.
              </li>
              <li>
                <strong>5 m ceiling, 600 mm duct with 200 mm gap above:</strong> Test (a) passes
                (200 &lt; 300). Test (b) passes (600 &gt; 500 = 10 percent of 5000). Therefore IS a
                wall.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 21.2.12 (obstructions to detectors)"
            clause={
              <>
                Where obstructions such as ducting are installed close to the ceiling, these
                obstructions should be treated as a wall if: a) the gap between the top of the
                obstruction and the ceiling above is less than 300 mm; AND b) the obstruction is
                deeper than 10 percent of the overall ceiling height. NOTE: A new note has clarified
                that where there is a gap above any of these features greater than 300 mm, the
                features are not regarded as an obstacle to the flow of smoke.
              </>
            }
            meaning="Clause 21.2.12 codifies what good designers had been doing informally. Two tests, both must pass, no judgement calls. Print the rule and apply it on every site where ducting, cable tray or beam runs are part of the ceiling geometry. Where the result is 'not a wall', smoke spreads over the obstruction and the standard 7.5 m / 5.3 m grid applies. Where the result is 'wall', insert a wall-distance constraint and break the grid."
          />

          <ConceptBlock
            title="Beams ≤ 250 mm — the 2× depth rule and the closely-spaced threshold"
            plainEnglish="Where structural beams, ductwork, light fittings or other isolated ceiling attachments are no greater than 250 mm in depth, they form obstacles to smoke flow at a smaller scale. Two rules apply: a 2× depth clearance rule for individual obstructions, and the new closely-spaced-beam definition for arrays of beams."
          >
            <p>Beams ≤ 250 mm depth — the two cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Isolated beams (or sparse arrays, beams &gt; 1 m c/c).</strong> A detector
                must NOT be mounted closer to such a beam than 2× the beam depth. For a 200 mm beam,
                no detector within 400 mm. The rule keeps the detector out of the local turbulent
                shadow downstream of the obstruction. EXCEPTION: where the beam has more than 300 mm
                gap above to the ceiling (clause 21.2.12 note), the beam is not treated as an
                obstacle at all and the 2× depth rule does not apply.
              </li>
              <li>
                <strong>Closely-spaced beams (≤ 1 m c/c centre-to-centre).</strong> NEW 2025
                clarification of the closely-spaced threshold. The ceiling is treated as a CELLULAR
                ceiling rather than a flat ceiling with obstructions. Each cell (or group of cells)
                is treated as the detection area. The detection rules for cellular ceilings differ
                from flat ceilings; refer to the relevant clause-21.2 sub-clauses for cell-by-cell
                or grouped-cell siting.
              </li>
            </ul>
            <p>
              The 1 m closely-spaced threshold is one of the most useful 2025 clarifications because
              the 2017 edition referenced &quot;closely spaced beams&quot; without defining the
              threshold; on-site interpretation produced wide variation. The 2025 number is now
              definitive.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Ceiling height and Table 3</ContentEyebrow>

          <ConceptBlock
            title="Table 3 height limits and the multi-sensor implication"
            plainEnglish="BS 5839-1:2025 Table 3 sets maximum ceiling heights for each detector type. The exact numbers depend on detector class, but the principle is: detection performance degrades with ceiling height because (a) smoke layers stratify and lose density before reaching the detector, and (b) heat plumes cool and spread laterally. A detector mounted too high may not see the fire until it is well-developed. Smoke detectors typically have higher height limits (10.5 m for class A1R) than heat detectors (7.5 m or 9 m depending on class)."
          >
            <p>The 2025 multi-sensor clarification (clause 17):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Multi-sensor in OR-logic / weighted mode.</strong> The smoke element can
                trigger independently. Height limit is the SMOKE-detector value (typically 10.5 m).
              </li>
              <li>
                <strong>Multi-sensor in AND-logic.</strong> Both elements must trigger. The slowest
                element controls. Height limit drops to the HEAT-detector value (typically 7.5 m or
                9 m). Designers using AND-logic in tall spaces must work this constraint.
              </li>
              <li>
                <strong>Multi-sensor in heat-only mode.</strong> Treated as a heat detector. Height
                limit is the heat-detector value.
              </li>
            </ul>
            <p>
              The clause 20.11 design record (type AND mode) feeds the Table 3 height check. The
              commissioning technician verifies the height assumption is consistent with the
              programmed mode. Get the mode wrong at programming and the height limit may
              accidentally drop below the actual mounting height — non-compliance not visible from
              the panel.
            </p>
          </ConceptBlock>

          <Scenario
            title="The car showroom — a case of interacting rules"
            situation="A new-build car showroom has a 9.5 m high vaulted ceiling with structural beams 280 mm deep at 4.5 m centre-to-centre. There is a 1.8 m deep service void above the public-facing display area, containing power cabling and combustible insulation. The brief is L1 protection."
            whatToDo="Work the geometry rule by rule. (1) Ceiling height 9.5 m — within the smoke detector A1R limit (10.5 m) but outside the heat detector limit (7.5 m). Specify smoke or multi-sensor in OR/weighted mode for the main vault. AND-logic multi-sensor would be non-compliant on height. (2) Beams 280 mm deep at 4.5 m c/c — sparse (>1 m), not closely-spaced. Each beam is an obstruction. Test under clause 21.2.12 — depth 280 mm, ceiling 9500 mm, 10 percent = 950 mm, so depth fails the 10-percent test → beam is NOT a wall. Apply the 2× depth rule: no detector within 560 mm of each beam. (3) Service void 1.8 m deep — exceeds 1.5 m, treat as a normal-height room. Apply the 7.5 m / 5.3 m smoke spacing inside the void. (4) Document each per-area detector type and mode under clause 20.11. The result: smoke or weighted-mode multi-sensor in the main vault on a 7.5 m grid clear of beam shadows; smoke detection inside the void on its own grid; clause 20.11 record showing modes per area."
            whyItMatters="The car showroom problem is typical: every detector-siting rule interacts with every other. The designer must walk through them sequentially, not pick one and ignore the others. The 2025 edition rewards this approach by making each rule numerically clear (height limits in Table 3, obstacle test in 21.2.12, void figure in 21.2.7, multi-sensor mode in 17 / 20.11). The penalty for shortcutting is a system that triggers in the wrong place, fails to trigger at all, or fails commissioning."
          />

          <CommonMistake
            title="Spacing heat detectors as if they were smoke detectors"
            whatHappens="A small commercial site with cooking fumes substitutes heat detectors for smoke (the easy-feeling fix for cooking false alarms). The designer reuses the original 7.5 m smoke grid for the heat detectors. The detector count is the same, but coverage is significantly thinner — each heat detector now needs to cover a 7.5 m × 7.5 m area when its effective radius is only 3.7 m. Large gaps in coverage. A real fire occurs in a corner of the floor; the heat detectors do not respond until the fire is well-developed and smoke has begun to flow into the corridor. The investigation finds that the detectors were spaced as smoke; non-compliance and (more importantly) life-safety failure."
            doInstead="When substituting detector type, RECALCULATE the grid. Heat-detector spacing 5.3 m / 3.7 m is roughly half the area of smoke spacing 7.5 m / 5.3 m. A heat-detector design has approximately double the device count of an equivalent smoke design. The 2025 clause 14 prohibition on heat in sleeping rooms — combined with the cost-multiplier effect of tighter spacing — means the typical answer to a 'cooking false alarm' problem is multi-sensor (smoke + heat AND-logic), not heat-only. Multi-sensor uses the smoke-detector spacing (7.5 m / 5.3 m) where the smoke element is the primary trigger, recovering the detector count."
          />

          <CommonMistake
            title="Recessed flush-mount installation that puts the element above 25 mm"
            whatHappens="A high-end fit-out specifies recessed flush-fitting smoke detectors for aesthetic reasons. The detectors look excellent — the visible face is flush with the ceiling tile. The sensitive element, however, sits in a small recess approximately 10-15 mm below the ceiling face. The element is in the static boundary-layer dead zone of the ceiling; smoke flow at 25-50 mm passes over it without triggering. Bench testing in service mode shows the detectors trigger on direct test-spray. In a real fire scenario, the smoke layer has to descend below 50 mm before the detector responds — by which point the room is filling. The flush installation is non-compliant with clause 21.2.4."
            doInstead="Specify SURFACE-MOUNTED detectors or flush detectors with a sensitive-element offset of at least 25 mm below the ceiling face. Some manufacturers offer 'low profile' flush detectors specifically engineered to put the chamber 25-30 mm below the visible face — these are clause-21.2.4 compliant. Confirm the offset specification at procurement; do not assume a flush detector is compliant on appearance alone. At commissioning, measure or verify-from-data-sheet the element offset and record."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Flat-ceiling spacing — SMOKE: 7.5 m c/c, 5.3 m to wall (radius 5.3 m). HEAT: 5.3 m c/c, 3.7 m to wall (radius 3.7 m). Heat is roughly half the area per detector.',
              'Sensitive-element offset — SMOKE 25-600 mm, HEAT 25-150 mm (clause 21.2.4). The 25 mm minimum is critical — flush flush-mount detectors often violate it.',
              'Voids (clause 21.2.7) — three depth bands: ≤1.25 m → top 125 mm; >1.25 m and ≤1.5 m → top 10 percent; >1.5 m → treat as normal-height room.',
              'Obstacles (clause 21.2.12) — TWO tests: (a) gap < 300 mm AND (b) depth > 10 percent ceiling height. BOTH must pass for the obstruction to be treated as a wall.',
              'Beams ≤ 250 mm depth — no detector within 2× depth of the beam (unless beam has > 300 mm gap above, then beam is not an obstacle at all).',
              'Closely-spaced beams (≤ 1 m c/c) — NEW 2025 definition. Treat as cellular ceiling, not flat ceiling with obstructions.',
              'Table 3 height limits — multi-sensor in AND-logic falls back to HEAT-detector limit (clause 17). Mode and height interact.',
              'Heat detectors NOT permitted in sleeping rooms for new L1/L2/L3 work (clause 14, see Section 1).',
              'When in doubt, apply the rule that produces TIGHTER spacing or LOWER ceiling assumption — false alarms are recoverable, missed fires are not.',
              'Document mode and rationale per detector under clause 20.11; the void figure, the obstacle test and the closely-spaced threshold are all numerically clear in 2025 — record your design decisions against them.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I increase smoke detector spacing beyond 7.5 m if I justify it as a variation under clause 22?',
                answer:
                  'In principle yes — BS 5839-1:2025 is a code of practice and variations are permitted with justification. In practice this particular variation is rarely defensible. The 7.5 m spacing is calibrated against typical UK fire-spread modelling; pushing beyond it leaves real coverage gaps. Variations are typically applied for tighter constraints (architectural, heritage), not looser. Where the variation reduces detection performance, the user must accept a written justification and the variation is recorded under clause 22 — and is now also recorded in the system logbook (a 2025 change: ALL variations in the logbook, not just "major" variations).',
              },
              {
                question:
                  'My multi-sensor manufacturer\'s data sheet quotes a "single-detector coverage area" of 100 m². Can I use that?',
                answer:
                  'No — manufacturer claims do not override BS 5839-1. The standard\'s 7.5 m / 5.3 m smoke and 5.3 m / 3.7 m heat spacing is the design rule. Manufacturer "extended coverage" claims are typically based on European EN-54 testing in idealised conditions and do not necessarily transfer to UK BS 5839-1 design assumptions. If you want extended coverage, you have two options: (a) specify a beam detector or aspirating system designed for the larger area; (b) record a clause-22 variation with justification if you genuinely believe the manufacturer claim. Most designers stick to the 7.5/5.3 grid and accept the device count.',
              },
              {
                question:
                  'For a void deeper than 1.5 m, do I need to think of it as a separate compartment?',
                answer:
                  'For detection siting purposes, yes — clause 21.2.7 says "treat as a normal-height room", which means apply the standard 7.5/5.3 m smoke or 5.3/3.7 m heat spacing within the void, with normal element offsets. The void is detected on its own grid. For zoning purposes, it depends on the building\'s fire compartmentation. A void that is fire-stopped at compartment walls is typically zoned with the compartment below; a void that runs continuously across multiple compartments may need its own zone(s).',
              },
              {
                question:
                  'A flat ceiling has a single deep beam (350 mm) running across it. Where do I put detectors?',
                answer:
                  'Apply clause 21.2.12 first. If the gap above the beam is less than 300 mm AND the beam is more than 10 percent of the ceiling height, the beam is treated as a wall — split the room into two parts at the beam, apply the 5.3 m / 3.7 m wall-distance rule on each side. If either condition fails, the beam is not a wall — but if the beam is between 250 mm and 600 mm deep, you may still need to apply the 2× depth clearance rule for nearby detectors (no detector within 2× beam depth of the beam itself). Beams less than 250 mm with > 300 mm gap above are not obstacles at all (the new 21.2.12 note).',
              },
              {
                question:
                  'Does the closely-spaced beam definition (≤ 1 m c/c) apply to beam depth as well as spacing?',
                answer:
                  'No — the 1 m threshold is centre-to-centre spacing only. Beam depth is governed separately. The combination matters: closely-spaced shallow beams (≤ 1 m c/c, ≤ 250 mm deep) form a cellular ceiling that may be treatable as a single flat ceiling for some purposes; closely-spaced deep beams (≤ 1 m c/c, > 250 mm deep) form a more pronounced cellular ceiling where each cell may need separate detection. The 2025 clarification settles the spacing threshold; the depth treatment was largely unchanged.',
              },
              {
                question:
                  'If I install a detector at 30 mm offset from the ceiling — just above the 25 mm minimum — is that compliant?',
                answer:
                  'Yes, just. The clause 21.2.4 envelope is 25-600 mm for smoke and 25-150 mm for heat. 30 mm satisfies the lower bound. In practice you want some margin — design and procure for 50-100 mm offset where the architecture allows, so installation tolerances and base mounting variation do not push the element below 25 mm. At commissioning, confirm element position from the manufacturer data sheet for the specific detector model — some have the chamber significantly offset from the rim of the housing.',
              },
              {
                question: 'How do I handle a sloped ceiling under BS 5839-1:2025?',
                answer:
                  'Sloped ceilings are addressed in clause 21.2 sub-clauses with specific rules: typically detectors are aligned with the apex of the slope, and spacing rules account for the slope angle (steeper slopes concentrate smoke at the apex, allowing slightly wider detector spacing on the sloped surface). The principles are unchanged from the 2017 edition; the 2025 numbering moved (the slope-ceiling sub-clauses sit within the renumbered clause 21.2 framework). Refer to BS 5839-1:2025 directly for the sub-clause text on sloped, pitched and apex ceilings.',
              },
              {
                question:
                  'Why does the 2025 edition replace "fire-resisting construction" with "solid construction, no holes" for the void wall in L3 designs?',
                answer:
                  'The 2017 phrase "fire-resisting construction" raised two practical questions: what fire resistance rating is required, and how does the inspector verify it on a built site? The 2025 commentary clarifies that the AIM of the requirement is to prevent smoke from the void compromising the escape route below — not to provide structural fire resistance per se. A solid construction with no holes (no cable penetrations left unsealed, no service-pass-through gaps) achieves the smoke-tightness aim without the unverifiable "fire-resisting" requirement. This is one of several 2025 simplifications that prefer auditable on-site tests over abstract specifications.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Detector siting and coverage — Module 2.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-2/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Manual call points
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

export default FireAlarmModule2Section2;
