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
    id: 'elm3-s1-escape',
    question: 'BS EN 1838:2024 minimum escape route illumination at floor level on a defined escape route is...?',
    options: [
      '0.2 lx, measured along the centre line of the route only.',
      '0.5 lx across a 2 m central band, the superseded 2013 approach.',
      '1 lx across the full width of the route, with permitted edge exclusions.',
      '5 lx, matching the level used at firefighting equipment.',
    ],
    correctIndex: 2,
    explanation:
      'BS EN 1838:2024 §4.2.1 puts the 1 lx minimum across the FULL width of the escape route at floor level (with edge exclusions). The 2013 centre-line + central-band wording is superseded. BS 5266-1:2025 references the 2024 edition.',
  },
  {
    id: 'elm3-s1-antipanic',
    question: 'Anti-panic (open-area) lighting in BS EN 1838:2024 must achieve...?',
    options: [
      '1 lx everywhere, with the same 40:1 uniformity rule applied.',
      '0.5 lx minimum over the open area (0.5 m perimeter excluded), 40:1 uniformity.',
      '5 lx minimum over the open area, with no uniformity rule.',
      '0.2 lx minimum over the open area, with no perimeter exclusion.',
    ],
    correctIndex: 1,
    explanation:
      'Anti-panic (sometimes called open-area) lighting prevents disorientation in spaces ≥60 m² or where escape routes are not defined. 0.5 lx minimum, 40:1 max:min ratio, perimeter 0.5 m of the floor area excluded from the calculation. The uniformity rule prevents bright pools next to dark voids.',
  },
  {
    id: 'elm3-s1-highrisk',
    question: 'High-risk task area lighting must achieve which illuminance?',
    options: [
      '1 lx, matching the escape-route value, within 5 s of mains failure.',
      '5 lx vertical, matching the safety-equipment value, within 5 s.',
      '15 lx or 10% of the task illuminance, whichever is greater, within 0.5 s.',
      '50 lx fixed, regardless of the normal task illuminance, within 1 s.',
    ],
    correctIndex: 2,
    explanation:
      'BS EN 1838:2024 §4.4 sets the high-risk task threshold at the higher of 15 lx or 10% of normal task lux. Switch-on must reach full required illuminance within 0.5 s — far faster than the 5 s escape-route value — because the operator must continue or safely abort a hazardous process the instant power fails.',
  },
  {
    id: 'elm3-s1-duration',
    question: 'Standard non-domestic emergency lighting duration in BS 5266-1:2025 is...?',
    options: [
      '30 min, sufficient to cover a simple single-storey evacuation.',
      '1 h, the default for premises with simple, short evacuation.',
      '3 h, the default for most non-domestic buildings.',
      '8 h, sized to cover a full overnight mains failure.',
    ],
    correctIndex: 2,
    explanation:
      'BS 5266-1:2025 retains the 1 h / 2 h / 3 h family but tightens the conditions on 1 h. The default for offices, retail, places of assembly, education, industrial premises is 3 h. 2 h is for healthcare and sleeping accommodation where evacuation is slower. 1 h is rare and conditional.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the minimum horizontal illuminance for an escape route per BS EN 1838:2024?',
    options: [
      '0.2 lx at floor level along the centre line of the route, edges unspecified.',
      '0.5 lx across a 2 m central band, the superseded 2013 central-band approach.',
      '1 lx across the full width of the route, with permitted edge exclusions.',
      '15 lx at floor level, matching the high-risk-task threshold.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 §4.2.1 — escape route 1 lx minimum across the full width of the route at floor level, with edge exclusions. The full-width rule supersedes the 2013 centre-line + central-band wording.',
  },
  {
    id: 2,
    question: 'What is the minimum horizontal illuminance for anti-panic (open-area) lighting?',
    options: [
      '0.5 lx over the open area, 0.5 m perimeter excluded, 40:1 uniformity.',
      '1 lx over the open area, with no uniformity rule applied.',
      '0.2 lx over the open area, with no perimeter exclusion.',
      '15 lx over the open area, matching the high-risk threshold.',
    ],
    correctAnswer: 0,
    explanation:
      'Anti-panic lighting: 0.5 lx minimum, 0.5 m perimeter excluded, 40:1 max:min uniformity. Applies to any open area ≥60 m² or where defined escape routes are absent.',
  },
  {
    id: 3,
    question: 'High-risk task area lighting must achieve...?',
    options: [
      '15 lx or 10% of normal task illuminance, whichever is greater, within 0.5 s.',
      '1 lx within 5 s, matching the escape-route value and switch-on time.',
      '0.5 lx within 15 s, matching the anti-panic minimum and timing.',
      '50 lx within 1 s, a fixed level regardless of the normal task illuminance.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838:2024 §4.4 — 15 lx or 10% of task lux (whichever is higher), within 0.5 s, 10:1 uniformity. The fast switch-on lets the operator continue or safely terminate a hazardous activity the moment supply fails.',
  },
  {
    id: 4,
    question: 'What vertical illuminance is required at fire alarm call points and firefighting equipment?',
    options: [
      '1 lx horizontal at the floor in front of the device, not on its face.',
      '15 lx vertical on the equipment face, matching the high-risk threshold.',
      '50 lx vertical on the equipment face, matching a normal task level.',
      '5 lx vertical on the equipment face, measured where it is operated.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 1838:2024 §4.5 — 5 lx vertical at fire alarm call points, firefighting equipment, first-aid stations, refuge call points and any safety-critical position requiring identification or operation in darkness. Vertical, not horizontal — the user reads or operates the device on its vertical face.',
  },
  {
    id: 5,
    question: 'What is the standard non-domestic emergency lighting duration in BS 5266-1:2025?',
    options: [
      '30 min, sufficient for a simple single-storey evacuation.',
      '1 h, the default for most non-domestic premises.',
      '3 h, the default for most non-domestic buildings.',
      '8 h, sized to cover a full overnight mains failure.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1:2025 — 3 h default. 2 h for healthcare / sleeping risk. 1 h only on the narrow conditions of immediate evacuation and no re-occupancy in the same operating period.',
  },
  {
    id: 6,
    question: 'Switch-on time for general escape-route emergency lighting per BS EN 1838:2024 is...?',
    options: [
      '5 s to 50% of rated output and 60 s to full rated output for escape routes.',
      '0.5 s to full output for all categories, including general escape routes.',
      '15 s to 50% and 2 min to full output for general escape-route lighting.',
      '2 min straight to full output, with no intermediate 50% milestone.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838:2024 §4.2.5 — escape route reaches 50% of rated illuminance within 5 s and full rated illuminance within 60 s. High-risk task areas require full output within 0.5 s. Anti-panic also follows the 5 s / 60 s rule.',
  },
  {
    id: 7,
    question: 'When does BS 5266-1:2025 permit the 1 h duration rating?',
    options: [
      'Always — 1 h is the default for any non-domestic building.',
      'In all schools, on the basis that they evacuate quickly under supervision.',
      'In all retail premises, because shoppers leave promptly on alarm.',
      'Only where the building is evacuated immediately on alarm, not re-occupied in the same period, and the AHJ accepts the risk.',
    ],
    correctAnswer: 3,
    explanation:
      'The 2025 revision tightens the 1 h conditions. Immediate evacuation AND no re-occupancy in the same operating period. Risk-assessed and AHJ-accepted. The narrow scope reflects historical incidents where 1 h ran out before fire-service investigation completed.',
  },
  {
    id: 8,
    question: 'Anti-panic lighting applies to open spaces of what minimum size?',
    options: [
      '10 m² or larger, catching even small store rooms and lobbies.',
      '500 m² or larger, limiting the duty to large assembly floors.',
      '60 m² or any space without defined escape routes, whatever its size.',
      '1000 m² or larger, applying only to major open warehouse areas.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 — anti-panic applies to open areas ≥60 m² and to any open area lacking defined escape routes irrespective of size. The size threshold catches typical retail floors, lobbies, halls; the no-route caveat catches smaller spaces where occupants must orient themselves before reaching an escape door.',
  },
  {
    id: 9,
    question: 'Standby lighting (NEW expanded scope in BS 5266-1:2025) is provided to...?',
    options: [
      'Allow normal activities to continue during a mains failure, sized by task duration.',
      'Replace escape lighting with a single combined system covering both duties.',
      'Provide a uniform 1 lx everywhere in the building during a mains failure.',
      'Run for a fixed 30 minutes regardless of the task it actually supports.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 broadens guidance on standby lighting — used in operating theatres, control rooms, broadcast studios, data centres, security suites. Sized to maintain task illuminance for the task duration. Does NOT discharge the escape-lighting duty; both are provided.',
  },
  {
    id: 10,
    question: 'A fitness studio of 90 m² with one defined exit. What lighting category applies and to what level?',
    options: [
      '1 lx escape-route lighting only, from any point in the room to the exit.',
      '0.5 lx anti-panic lighting only, across the open studio floor area.',
      '15 lx high-risk-task lighting only, treating the studio as a hazardous area.',
      'Both 1 lx escape route AND 0.5 lx anti-panic, because the room is over 60 m².',
    ],
    correctAnswer: 3,
    explanation:
      'Open spaces over 60 m² need both layers — escape route to direct occupants to the exit and anti-panic to prevent disorientation across the floor. The two requirements are additive; satisfying one does not satisfy the other.',
  },
];

const EmergencyLightingModule3Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Minimum illumination levels and durations | EL Module 3.1 | Elec-Mate',
    description:
      'BS EN 1838:2024 and BS 5266-1:2025 minimum illuminances — 1 lx escape route, 0.5 lx anti-panic, 15 lx high-risk, 5 lx vertical at safety equipment — plus 1 h / 2 h / 3 h duration rules and switch-on timings.',
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
            eyebrow="Module 3 · Section 1"
            title="Minimum illumination levels and durations"
            description="The numerical backbone of every emergency lighting design. BS EN 1838:2024 sets the illuminance floors — 1 lx on escape routes, 0.5 lx for anti-panic, 15 lx for high-risk tasks, 5 lx vertical at safety equipment. BS 5266-1:2025 sets durations — 3 h default, 2 h for sleeping risk, 1 h conditional only. Get the numbers wrong and the design is non-compliant before a luminaire is positioned."
            tone="yellow"
          />

          <TLDR
            points={[
              'Escape route — 1 lx minimum at floor level across the FULL WIDTH of the route, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m). BS EN 1838:2024 update — supersedes the 2013 centre-line + central-band wording.',
              'Anti-panic (open-area) — 0.5 lx minimum, 0.5 m perimeter excluded, maximum:minimum uniformity 40:1.',
              'High-risk task — 15 lx OR 10% of normal task illuminance, whichever is greater, within 0.5 s of mains failure, 10:1 uniformity.',
              'Safety equipment — 5 lx VERTICAL at fire alarm call points, firefighting equipment, first-aid posts, disabled refuge call points.',
              'Switch-on — 5 s to 50% and 60 s to full for escape route and anti-panic; 0.5 s to full for high-risk task.',
              'Duration — 3 h default for non-domestic; 2 h for healthcare and sleeping risks; 1 h only on tightly conditional grounds (immediate evacuation, no re-occupancy in the same operating period).',
              'Standby lighting (expanded in BS 5266-1:2025) — separate duty, sized to task continuity, additional to escape lighting.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS EN 1838:2024 minimum horizontal illuminances for escape route, anti-panic and high-risk task areas, and identify where each applies',
              'Apply the 2024 full-width rule to escape-route measurement: 1 lx across the full width of the route at floor level, with edge exclusions per BS EN 1838:2024',
              'State the 5 lx VERTICAL requirement at fire alarm call points, firefighting equipment, first-aid posts and refuge points, and explain why vertical not horizontal',
              'Apply the BS EN 1838:2024 switch-on times: 5 s / 60 s for escape and anti-panic; 0.5 s for high-risk task',
              'Apply the BS 5266-1:2025 duration rules: 3 h default, 2 h sleeping risk, 1 h conditional, and identify which buildings qualify for which',
              'Distinguish standby lighting (task continuity) from escape lighting (evacuation) and recognise when both are required',
              'Diagnose mixed-occupancy and mixed-function spaces where multiple categories apply simultaneously',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four illuminance categories</ContentEyebrow>

          <ConceptBlock
            title="Escape route — 1 lx across the full width"
            plainEnglish="The escape route is the path occupants follow from any point in the building to a final exit. BS EN 1838:2024 sets the minimum illuminance at 1 lx, measured horizontally at floor level, across the FULL WIDTH of the escape route — with edge exclusions: routes wider than 2 m exclude an outer 0.5 m strip each side; routes 2 m or narrower exclude an outer ¼ width each side. The 2013 edition specified 1 lx on the centre line + 0.5 lx on a 2 m central band; that wording is superseded. The 2024 rule closes the centre-line loophole that allowed dim edges and corners."
            onSite="Treat the 1 lx value as a NET design figure — it is the illuminance the user must see, after maintenance factor and end-of-life lumen depreciation. Designers typically work to 1.4 to 1.6 lx new, depreciating to 1 lx at end of maintenance interval."
          >
            <p>The escape-route definition matters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Defined escape route.</strong> A planned path from any occupiable point to a
                final exit, identified on the layout drawing. Typical width 1 m; may be wider where
                the path crosses lobbies, corridors of greater width, or open areas.
              </li>
              <li>
                <strong>Full width with edge exclusions.</strong> 1 lx applies across the full
                usable width of the route. The outer 0.5 m each side is excluded for routes wider
                than 2 m; the outer ¼ width each side is excluded for routes 2 m or narrower. This
                replaces the 2013 centre-line + central-band approach.
              </li>
              <li>
                <strong>Floor level.</strong> Horizontal plane at the floor surface. Some designers
                measure at 0.2 m to allow for furniture obstruction; the standard requires the
                floor plane unless the AHJ accepts an alternative.
              </li>
            </ul>
            <p>
              The 1 lx value is calibrated to the threshold at which a person with normal vision
              can perceive obstacles, follow a defined route, and read directional signage at
              typical viewing distance. Lower values (0.5 lx and below) leave the route navigable
              but increase trip risk and reduce sign legibility.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.2.1 (Escape route lighting)"
            clause={
              <>
                The horizontal illuminance at floor level on the escape route shall be not less
                than 1 lx across the full width of the route. For escape routes wider than 2 m, an
                outer border of 0.5 m on each side may be excluded. For escape routes of 2 m width
                or less, an outer border of one quarter of the route width on each side may be
                excluded.
              </>
            }
            meaning="The full-width rule with edge exclusions is the load-bearing change. Designs that worked under BS EN 1838:2013 (1 lx centre line + 0.5 lx central band) will fail under 2024 if the edges drop below 1 lx within the excluded boundary. Additional luminaires or repositioning are typically required."
          />

          <ConceptBlock
            title="Anti-panic (open-area) — 0.5 lx, 40:1 uniformity"
            plainEnglish="Anti-panic lighting (sometimes called open-area lighting) prevents disorientation in spaces where occupants must locate themselves and an escape route before they can begin to evacuate. Applies to open areas of 60 m² or more, and to any open area without defined escape routes regardless of size. Minimum 0.5 lx horizontal at floor level over the area, with a 0.5 m perimeter strip excluded from the calculation. Maximum:minimum uniformity ratio capped at 40:1 — bright pools next to dark voids cause more disorientation than low overall light."
          >
            <p>The 0.5 lx and 40:1 figures together define the protective measure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>0.5 lx minimum.</strong> Lowest acceptable point illuminance over the
                open-area floor plane. Calculated and measured exclusive of the 0.5 m perimeter.
              </li>
              <li>
                <strong>40:1 uniformity.</strong> Brightest point on the area divided by darkest
                must not exceed 40. A point at 20 lx with another at 0.4 lx is non-compliant
                (50:1) even though both points individually exceed the minimum. The rule prevents
                designs that lump luminaires together leaving large dim regions between.
              </li>
              <li>
                <strong>0.5 m perimeter.</strong> Excluded because furniture, fittings, walls
                inevitably reduce illuminance close to the boundary. Including the strip would
                force impractical levels at the centre. Designers should still consider perimeter
                obstacles for navigation.
              </li>
            </ul>
            <p>
              Anti-panic supplements escape-route lighting; it does not replace it. A room
              ≥60 m² with a defined escape route gets BOTH: 1 lx on the route, 0.5 lx across the
              open floor.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.3 (Open-area / anti-panic lighting)"
            clause={
              <>
                Open-area (anti-panic) lighting shall be provided to give horizontal illuminance of
                not less than 0.5 lx on the empty floor area, excluding a peripheral border of
                0.5 m. The maximum to minimum illuminance ratio shall not exceed 40:1.
              </>
            }
            meaning="Two numbers, both binding. Hit 0.5 lx minimum AND keep peak/minimum within 40:1. Designs often pass the first and fail the second by clustering luminaires near exits. Spread the layout."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <ConceptBlock
            title="High-risk task — 15 lx or 10%, within 0.5 s"
            plainEnglish="High-risk task area lighting protects workers operating processes that cannot be safely abandoned the instant power fails. Examples: a saw at a press break, a chemical operator mid-batch, a surgeon mid-procedure, a control room operator mid-shutdown. The illuminance must reach 15 lx OR 10% of the normal task illuminance, whichever is greater, within 0.5 s of mains failure. Uniformity maximum:minimum 10:1 — much tighter than anti-panic because precise visual work continues."
          >
            <p>The high-risk threshold is intentionally aggressive:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>15 lx OR 10%, whichever is greater.</strong> A workshop with normal task
                illuminance of 500 lx requires 50 lx high-risk emergency (10% × 500), not 15 lx.
                A general office at 300 lx requires 30 lx (10% × 300). The rule is "whichever is
                greater" — the figure is always the higher of the two.
              </li>
              <li>
                <strong>0.5 s switch-on.</strong> Far faster than the 5 s for escape routes. The
                operator must continue to see the work to terminate it safely. A 5 s gap is enough
                time for a hand to enter a cutter cycle.
              </li>
              <li>
                <strong>10:1 uniformity.</strong> Tighter than anti-panic (40:1). Visual work
                requires consistent contrast across the task plane. A bright spot beside a shadow
                degrades the operator's ability to discriminate.
              </li>
              <li>
                <strong>Risk-assessment driven.</strong> The high-risk classification comes from
                the fire risk assessment or process safety analysis. The designer does not
                self-select; the dutyholder identifies high-risk areas and the designer engineers
                to the standard.
              </li>
            </ul>
            <p>
              Duration for high-risk lighting is sized to the time needed to make the process safe
              — the operator brings the saw to rest, the chemist terminates the batch, the surgeon
              completes the immediate step. Typically minutes, not hours; specified by the risk
              assessment, not a default value.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Safety equipment — 5 lx vertical"
            plainEnglish="Specific safety devices need to be located and operated in darkness. BS EN 1838:2024 requires 5 lx VERTICAL illuminance at the device — measured on the vertical face of the equipment, not on the floor in front of it. Applies to fire alarm call points, firefighting equipment (extinguishers, hose reels, dry/wet riser inlets), first-aid posts and disabled refuge call points. Vertical because the user reads or operates the device on its vertical face; horizontal floor lux does not guarantee the face of the device is lit."
          >
            <p>The vertical-versus-horizontal distinction is load-bearing:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Vertical 5 lx.</strong> Measured on the face of the device at typical
                operating height (1.2 to 1.5 m above floor). Achieved by positioning a luminaire
                so that direct light reaches the vertical surface. A luminaire directly overhead
                throws light DOWN and may give zero vertical illuminance on a wall-mounted device
                4 m away.
              </li>
              <li>
                <strong>Why vertical.</strong> The user looks AT the device — reading the
                instruction label on the extinguisher, operating the call-point button, locating
                the refuge phone. The face of the device must be visible. A 50 lx pool on the
                floor at the user's feet does not light the device.
              </li>
              <li>
                <strong>Devices covered.</strong> Fire alarm manual call points (MCPs);
                firefighting equipment — portable extinguishers, fixed hose reels, dry/wet riser
                inlets, fire blanket cabinets; first-aid posts; disabled refuge call points; any
                building safety device requiring identification or operation in mains failure.
              </li>
              <li>
                <strong>Practical placement.</strong> A luminaire 2 m to the side of a
                wall-mounted device, set with appropriate beam spread, gives the vertical
                illuminance. Designers locate the safety equipment FIRST on the layout drawing,
                then place a dedicated luminaire to illuminate it. Reverse-engineering from a
                ceiling-grid layout often misses the vertical lux requirement.
              </li>
            </ul>
            <p>
              The 5 lx vertical applies in addition to whichever horizontal category covers the
              area (escape route, anti-panic, high-risk). It is not "instead of" — a device in a
              corridor needs both 1 lx on the route AND 5 lx on the device face.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.5 (Lighting of safety equipment)"
            clause={
              <>
                The vertical illuminance at the location of safety equipment shall not be less than
                5 lx at the position where the equipment is mounted. Safety equipment includes,
                but is not limited to, fire alarm call points, firefighting equipment, first-aid
                posts and refuge call points.
              </>
            }
            meaning="Vertical 5 lx, measured on the face. Designs that hit 1 lx horizontal on the route can still miss 5 lx vertical on a side-mounted call point. Locate safety equipment, position dedicated luminaires for vertical lux."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Switch-on times</ContentEyebrow>

          <ConceptBlock
            title="5 s to 50%, 60 s to full — and 0.5 s for high-risk"
            plainEnglish="When the mains fails, emergency luminaires must come up to operating output within defined times. BS EN 1838:2024 §4.2.5 sets two regimes: 5 s to 50% of rated illuminance and 60 s to full rated output for general escape route, anti-panic and safety-equipment lighting; 0.5 s to full output for high-risk task lighting. The faster ramp on high-risk is because operators must continue working without interruption."
          >
            <p>The numbers and what they mean for product selection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>5 s to 50%.</strong> Within 5 s of the mains supply being interrupted, the
                luminaire must produce at least half its rated emergency illuminance. The user
                experiences this as a perceptible warm-up; lighting is usable for navigation
                immediately, brightening over the next minute.
              </li>
              <li>
                <strong>60 s to full output.</strong> Full rated emergency illuminance must be
                reached by 1 minute. Most modern LED conversion gear hits full output within 1 to
                2 seconds; the 60 s allowance is historical (covers older fluorescent and HID
                technologies with extended warm-up).
              </li>
              <li>
                <strong>0.5 s to full for high-risk.</strong> Half a second from mains failure to
                full output. Achieved by maintained luminaires (always-on so transition is
                instantaneous as supply switches from mains-fed to battery-fed) or by sustained
                operation of the lamp through changeover. Non-maintained luminaires struck from
                cold cannot meet 0.5 s and are excluded from high-risk applications.
              </li>
              <li>
                <strong>Mains-monitoring.</strong> The detection of mains failure and the trigger
                of emergency operation is per BS EN 50172:2024 and tested as part of
                commissioning. Switch-on time is from the instant of detection, not from the
                instant the user notices a flicker.
              </li>
            </ul>
            <p>
              Switch-on time is a product specification, not a design choice. The designer selects
              luminaires meeting the relevant switch-on for the area; the manufacturer tests and
              certifies. Mixing a high-risk-rated luminaire into a general escape route is fine;
              fitting a general-rated luminaire into a high-risk area is not.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.2.5 (Switch-on time)"
            clause={
              <>
                The escape-route lighting and the anti-panic lighting shall reach 50% of the
                required illuminance within 5 s and full required illuminance within 60 s. The
                high-risk task area lighting shall reach the full required illuminance within
                0.5 s.
              </>
            }
            meaning="Two regimes: 5 s/60 s general; 0.5 s high-risk. The 0.5 s rule effectively forces maintained operation in high-risk areas; non-maintained luminaires struck from cold cannot be relied upon."
          />

          <SectionRule />

          <ContentEyebrow>Duration ratings — 1 h, 2 h, 3 h</ContentEyebrow>

          <ConceptBlock
            title="3 h default, 2 h sleeping risk, 1 h conditional"
            plainEnglish="Duration is how long the emergency luminaires must continue to deliver rated output after mains failure. BS 5266-1:2025 retains the 1 h / 2 h / 3 h family but tightens the conditions. 3 h is the default for most non-domestic premises. 2 h is for healthcare and sleeping accommodation where evacuation is slower. 1 h is reserved for buildings emptied immediately on alarm and not re-occupied during the same operating period — a narrow set of cases. Get the duration wrong and the building runs out of emergency light during the fire-service investigation phase."
          >
            <p>The decision matrix:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>3 h — the default.</strong> Offices, retail, places of assembly,
                education, industrial premises, museums, libraries, places of worship, cinemas,
                theatres, restaurants, bars. Sized to cover full evacuation, fire-service
                investigation, and re-occupancy if the incident permits. The 3 h figure derives
                from incident analysis showing fire-service operations typically conclude within
                that envelope.
              </li>
              <li>
                <strong>2 h — sleeping and healthcare risk.</strong> Hospitals, care homes,
                hotels, hostels, halls of residence, residential accommodation. Evacuation is
                slower because occupants are asleep, infirm, or under medical care; the 2 h is
                additional to the building-specific evacuation strategy and on top of the
                staff-led horizontal/vertical movement times.
              </li>
              <li>
                <strong>1 h — the narrow case.</strong> Permitted only where (a) the building is
                evacuated immediately on alarm, (b) the building is not re-occupied during the
                same operating period, AND (c) the AHJ accepts the 1 h on documented risk grounds.
                Most buildings cannot meet all three. Common 1 h cases: small, single-occupancy
                workshops where staff leave for the day on alarm and the next operating period
                begins after the mains is restored.
              </li>
            </ul>
            <p>
              Duration is determined at design stage by the risk assessment and reflected in the
              specification. Luminaires are rated and labelled with their duration (typically
              3 h on UK installations). Verifying the rated duration is a commissioning test —
              the luminaire must deliver rated output across the whole rating period.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §5.4 (Duration of emergency lighting)"
            clause={
              <>
                The minimum duration of operation of emergency lighting shall be 3 h for non-
                domestic premises, except where (a) the premises are evacuated immediately on
                alarm and not re-occupied during the same operating period, in which case 1 h
                may be permitted subject to risk assessment, or (b) the premises are healthcare
                or sleeping accommodation, in which case 2 h shall be provided in addition to the
                evacuation strategy.
              </>
            }
            meaning="3 h is the default. 2 h is for sleeping and healthcare. 1 h is conditional, narrow, AHJ-accepted on documented risk. The dutyholder cannot self-select 1 h to save battery cost; the conditions must be evidenced."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Standby lighting — the parallel duty</ContentEyebrow>

          <ConceptBlock
            title="Continuity of task, not evacuation"
            plainEnglish="Standby lighting allows normal activities to continue substantially unchanged during a mains failure. It is OUTSIDE the scope of escape lighting. Examples: an operating theatre where surgery must continue, a control room where operators must monitor processes, a broadcast studio mid-transmission, a data centre where staff must perform shutdowns. BS 5266-1:2025 expands the guidance on standby lighting; it does not absorb it into escape lighting. Both duties are provided independently."
          >
            <p>The distinction matters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape lighting.</strong> Sized for evacuation. 1 lx route, 0.5 lx
                anti-panic, 15 lx high-risk task, 5 lx vertical at safety equipment. Duration
                1/2/3 h. Defined by BS EN 1838 and BS 5266-1.
              </li>
              <li>
                <strong>Standby lighting.</strong> Sized for the task. May be 200, 500, 750 lx —
                whatever the task demands. Duration is sized to the task, not evacuation — could
                be minutes (controlled shutdown of a chemical plant) or hours (running a hospital
                operating theatre through a mains outage). Defined by the task safety case, not by
                BS EN 1838.
              </li>
              <li>
                <strong>Source.</strong> Standby is typically generator-fed (longer run, full
                task lux) rather than battery (limited run, limited lux). A standby system using
                battery-backed luminaires sized to standby duty is technically possible but rare.
              </li>
              <li>
                <strong>Escape duty within standby spaces.</strong> A space requiring standby
                lighting still requires escape lighting on its escape route. The two systems may
                be implemented in the same luminaires (large output, long duration) or in
                separate luminaires (one for task, one for evacuation). Either is acceptable;
                both duties must be evidenced.
              </li>
            </ul>
            <p>
              Standby lighting is part of the design conversation but is engineered separately
              from this course's emergency lighting scope. We mention it to mark the boundary —
              when a designer says "I need 500 lx maintained on the operating table during a
              mains outage," that is standby, not emergency, and a generator + UPS is the typical
              source.
            </p>
          </ConceptBlock>

          <SectionRule />

          {/* Diagram — levels vs durations matrix */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Illumination categories vs duration — the BS EN 1838:2024 / BS 5266-1:2025 matrix
            </h4>
            <svg
              viewBox="0 0 880 520"
              className="w-full h-auto"
              role="img"
              aria-label="Matrix showing four illumination categories on rows (escape route 1 lx, anti-panic 0.5 lx, high-risk 15 lx or 10%, safety equipment 5 lx vertical) crossed with duration columns (1 h conditional, 2 h sleeping/healthcare, 3 h default) and switch-on time annotations."
            >
              <rect x="0" y="0" width="880" height="46" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
              <text x="440" y="29" textAnchor="middle" fill="#FBBF24" fontSize="14" fontWeight="bold">
                BS EN 1838:2024 illuminance × BS 5266-1:2025 duration
              </text>

              <rect x="220" y="60" width="200" height="42" fill="rgba(239,68,68,0.10)" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2" />
              <text x="320" y="80" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">1 h — conditional</text>
              <text x="320" y="94" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">immediate evac, no re-occ</text>

              <rect x="430" y="60" width="200" height="42" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.2" />
              <text x="530" y="80" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">2 h — sleeping / healthcare</text>
              <text x="530" y="94" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">hospitals, hotels, care homes</text>

              <rect x="640" y="60" width="200" height="42" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.2" />
              <text x="740" y="80" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">3 h — default</text>
              <text x="740" y="94" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">offices, retail, education</text>

              <rect x="20" y="115" width="190" height="80" fill="rgba(34,211,238,0.08)" stroke="#22D3EE" strokeWidth="1.2" />
              <text x="30" y="138" fill="#22D3EE" fontSize="12" fontWeight="bold">Escape route</text>
              <text x="30" y="154" fill="rgba(255,255,255,0.85)" fontSize="11">1 lx horizontal</text>
              <text x="30" y="169" fill="rgba(255,255,255,0.6)" fontSize="9.5">full width + edge exclusions</text>
              <text x="30" y="183" fill="rgba(255,255,255,0.6)" fontSize="9.5">5 s/60 s switch-on</text>

              <rect x="220" y="115" width="200" height="80" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="320" y="160" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">applies (rare)</text>

              <rect x="430" y="115" width="200" height="80" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="530" y="160" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">applies + sleeping factor</text>

              <rect x="640" y="115" width="200" height="80" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
              <text x="740" y="160" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">DEFAULT</text>

              <rect x="20" y="205" width="190" height="80" fill="rgba(168,85,247,0.08)" stroke="#A855F7" strokeWidth="1.2" />
              <text x="30" y="228" fill="#A855F7" fontSize="12" fontWeight="bold">Anti-panic</text>
              <text x="30" y="244" fill="rgba(255,255,255,0.85)" fontSize="11">0.5 lx + 40:1 unif.</text>
              <text x="30" y="259" fill="rgba(255,255,255,0.6)" fontSize="9.5">≥60 m² open spaces</text>
              <text x="30" y="273" fill="rgba(255,255,255,0.6)" fontSize="9.5">5 s/60 s switch-on</text>

              <rect x="220" y="205" width="200" height="80" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="320" y="250" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">applies (rare)</text>

              <rect x="430" y="205" width="200" height="80" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="530" y="250" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">applies</text>

              <rect x="640" y="205" width="200" height="80" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
              <text x="740" y="250" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">DEFAULT</text>

              <rect x="20" y="295" width="190" height="80" fill="rgba(239,68,68,0.08)" stroke="#EF4444" strokeWidth="1.2" />
              <text x="30" y="318" fill="#EF4444" fontSize="12" fontWeight="bold">High-risk task</text>
              <text x="30" y="334" fill="rgba(255,255,255,0.85)" fontSize="11">15 lx OR 10% task</text>
              <text x="30" y="349" fill="rgba(255,255,255,0.6)" fontSize="9.5">10:1 uniformity</text>
              <text x="30" y="363" fill="rgba(255,255,255,0.6)" fontSize="9.5">0.5 s switch-on</text>

              <rect x="220" y="295" width="620" height="80" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
              <text x="530" y="328" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">
                Duration sized to safe-termination time
              </text>
              <text x="530" y="345" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                typically minutes — set by risk assessment, not by 1/2/3 h schedule
              </text>
              <text x="530" y="362" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                must reach full output within 0.5 s of mains failure
              </text>

              <rect x="20" y="385" width="190" height="80" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.2" />
              <text x="30" y="408" fill="#FBBF24" fontSize="12" fontWeight="bold">Safety equipment</text>
              <text x="30" y="424" fill="rgba(255,255,255,0.85)" fontSize="11">5 lx VERTICAL on face</text>
              <text x="30" y="439" fill="rgba(255,255,255,0.6)" fontSize="9.5">MCPs, extinguishers,</text>
              <text x="30" y="453" fill="rgba(255,255,255,0.6)" fontSize="9.5">first-aid, refuge points</text>

              <rect x="220" y="385" width="620" height="80" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
              <text x="530" y="418" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">
                Duration matches the surrounding category
              </text>
              <text x="530" y="435" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                e.g. MCP on a 3 h escape route → 3 h vertical-lit
              </text>
              <text x="530" y="452" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                additive to horizontal escape / anti-panic in the area
              </text>

              <rect x="0" y="478" width="880" height="42" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="440" y="497" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Standby lighting — separate duty, sized to task continuity, additional to escape lighting
              </text>
              <text x="440" y="512" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9.5">
                BS 5266-1:2025 expands guidance — outside scope of BS EN 1838
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Mistakes the standards expose</ContentEyebrow>

          <CommonMistake
            title="Carrying the 2013 centre-line + central-band wording into a 2024 design"
            whatHappens="Designer sizes a system to BS EN 1838:2013 — 1 lx along the centre line plus 0.5 lx across a 2 m central band — with luminaires aligned along the corridor. At commissioning under 2024 the centre passes 1 lx; the edges within the non-excluded width read 0.4 lx. Non-compliant under the 2024 full-width rule. Additional luminaires required, project delayed."
            doInstead="Apply BS EN 1838:2024 §4.2.1 from the start. Design 1 lx across the FULL WIDTH of the route at floor level, allowing the permitted edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m). The check is during design; doing it at commissioning is too late."
          />

          <CommonMistake
            title="Hitting 1 lx on a corridor and forgetting the 5 lx vertical at the call point"
            whatHappens="A 30 m corridor scheme is designed to 1 lx escape route — three luminaires evenly spaced, all bullseye downlighters. At the half-way point a wall-mounted fire alarm call point is recessed in a side wall. Horizontal floor lux at the call-point position reads 1.4 lx (good); vertical lux on the call-point face reads 0.7 lx because the nearest luminaire throws light straight DOWN, not sideways. Non-compliant — call point requires 5 lx vertical."
            doInstead="Locate every fire alarm call point, extinguisher, hose reel, refuge call point on the layout drawing FIRST. Then add a dedicated luminaire (or position one of the existing escape-route luminaires) so that direct light reaches the vertical face of each device. A side-spread or wall-washer photometric distribution often helps. Check vertical illuminance explicitly in the calculation, not just horizontal."
          />

          <CommonMistake
            title="Using 1 h duration to save battery cost"
            whatHappens="A small office is built with 1 h non-maintained luminaires on the basis that 'staff evacuate immediately on alarm.' At a Friday-afternoon false alarm, evacuation completes in 4 minutes. The fire service investigates for 50 minutes; staff wait outside. A second false-alarm occurs at 17:55 just before staff plan to leave. Now the building has run 1 h 50 min on emergency power; the luminaires fail at 60 min and the second-alarm investigation continues in darkness. The 'no re-occupancy in same operating period' condition was breached the moment a second event occurred."
            doInstead="Default to 3 h. The 1 h conditional case is rare in practice — the conditions are 'immediate evacuation AND no re-occupancy in the same operating period AND AHJ-accepted on documented risk.' Most buildings cannot prove all three. The cost differential between 1 h and 3 h luminaires is small relative to the consequence of running out of light in a real incident."
          />

          <SectionRule />

          <Scenario
            title="A 250 m² hot-desk office — what does the design require?"
            situation="Open-plan office, 250 m², single floor, two means of escape (front entrance and rear fire exit). Defined escape routes from any desk to either exit. Two fire alarm call points, one extinguisher near each exit, a first-aid post in a corner. Normal task illuminance 400 lx. Building occupied 09:00 to 18:00, no sleeping risk."
            whatToDo="Three categories apply: 1 lx across the full width of each defined escape route between desk clusters and the exits (per BS EN 1838:2024, with permitted edge exclusions); 0.5 lx anti-panic across the open floor (250 m² is well over the 60 m² threshold; 0.5 m perimeter excluded; 40:1 max:min uniformity); 5 lx vertical at each call point, each extinguisher and the first-aid post. Duration 3 h (default non-domestic). Switch-on 5 s to 50% / 60 s to full (not high-risk). High-risk task lighting NOT required (general office, no critical process)."
            whyItMatters="An open-plan office is a multi-category space. Designing only to 1 lx escape route misses the anti-panic duty across the open floor and the 5 lx vertical at every safety device. A compliant design lays the layers in order — escape routes, anti-panic, safety-equipment vertical — and verifies each independently. Missing a layer is a design error that reveals itself only at commissioning when a third-party engineer measures."
          />

          <Scenario
            title="A small machine workshop — high-risk in a 60 m² envelope"
            situation="60 m² metalwork shop with three CNC machines, a guillotine, and a manual press. Single exit. Normal task illuminance 500 lx. Operators run the machines unattended for short periods; an alarm event must allow operators to safely halt the machines before evacuation."
            whatToDo="Four categories apply: 1 lx escape route across the full width of each path from operator station to exit (BS EN 1838:2024 with edge exclusions); 0.5 lx anti-panic across the 60 m² (just at the threshold); HIGH-RISK task lighting at each machine station — 50 lx (10% × 500 lx, exceeds 15 lx) within 0.5 s, 10:1 uniformity, duration sized to time-to-safe-stop (typically 2 to 5 minutes per the machinery risk assessment); 5 lx vertical at the call point, extinguisher and first-aid post. Use maintained luminaires at the high-risk stations to guarantee 0.5 s switch-on. Duration of escape and anti-panic is 3 h (default non-domestic) even though the high-risk lighting may only need 5 minutes — because escape and high-risk are separate duties."
            whyItMatters="High-risk task areas are NOT a duration discount. They are an additional duty on top of escape and anti-panic. Operators safely terminating machines need 50 lx within 0.5 s; once machines are stopped, they evacuate via the same escape route as everyone else and the route must give 1 lx for 3 h. The two requirements are independent and additive."
          />

          <SectionRule />

          <KeyTakeaways
            title="The numbers to commit to memory"
            points={[
              'Escape route: 1 lx horizontal at floor across the FULL WIDTH of the route, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m) per BS EN 1838:2024 — supersedes the 2013 centre-line + central-band wording.',
              'Anti-panic: 0.5 lx horizontal at floor over open area, 0.5 m perimeter excluded, 40:1 max:min uniformity, applies to ≥60 m² spaces.',
              'High-risk task: 15 lx OR 10% of normal task lux, whichever is greater, within 0.5 s, 10:1 uniformity.',
              'Safety equipment: 5 lx VERTICAL on the face of fire alarm call points, firefighting equipment, first-aid posts, refuge call points.',
              'Switch-on: 5 s to 50% / 60 s to full for general (escape, anti-panic, safety equipment); 0.5 s to full for high-risk.',
              'Duration: 3 h default non-domestic; 2 h healthcare and sleeping risk; 1 h conditional (immediate evac + no re-occ + AHJ accepts).',
              'Standby lighting is a separate duty from escape lighting, sized to task continuity not evacuation, and is additional not alternative.',
              'Multi-category spaces are normal — open-plan offices need escape routes AND anti-panic AND vertical at safety equipment, all simultaneously.',
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
                question: 'Does the 1 lx value include or exclude the maintenance factor?',
                answer:
                  'The 1 lx is the END-OF-LIFE design value — what the user must see at the worst point of the maintenance interval. Designers calculate using a maintenance factor (typically 0.7 to 0.8) so the new-installed value is 1.25 to 1.4 lx; over time, lumen depreciation, dirt and battery ageing reduce the output to the 1 lx floor at end of interval. Verifying the 1 lx at commissioning checks the new condition; the periodic test confirms it has not dropped below.',
              },
              {
                question: 'Why is anti-panic 0.5 lx but escape route 1 lx?',
                answer:
                  'Escape route is a defined path that occupants follow to a known exit; 1 lx supports gait, obstacle avoidance and signage reading on a single direction of travel. Anti-panic applies in open spaces where occupants must first orient themselves — they need enough light to see the room, the doors, the layout — but do not need to read directional signage at navigation distance. 0.5 lx is the calibrated threshold for orientation; the 40:1 uniformity prevents disorientation from contrast.',
              },
              {
                question: 'A wall-mounted call point is at 1.5 m. What does "5 lx vertical" mean exactly?',
                answer:
                  'A photometric measurement on the vertical face of the call point at the position where the user looks at and operates the device. The illuminance is measured with a meter cell oriented perpendicular to the wall, parallel to the device face. A luminaire directly above the call point throws light DOWN past the wall and gives close to zero vertical lux on the device face; a luminaire 2 to 3 m to the side, with appropriate beam spread, gives the vertical lux. Designers and commissioning engineers measure vertical explicitly with a tilted meter.',
              },
              {
                question: 'Why is the high-risk switch-on 0.5 s when escape is 5 s?',
                answer:
                  'Use case. On an escape route, occupants are ABOUT to begin moving — a few seconds of dimmer-than-rated light is acceptable because they are still standing, not yet walking. In a high-risk task area, the operator is ALREADY working — a saw is mid-cut, a chemist is mid-pour. A 5 s gap of darkness at the work face means the operator loses sight of the work mid-action. 0.5 s is the threshold for visual continuity; any gap above that creates a safety event in itself.',
              },
              {
                question: 'Can I use 1 h luminaires in a small shop that closes at 17:00?',
                answer:
                  'Only if you can evidence (a) immediate evacuation on alarm, (b) no re-occupancy during the same operating period, and (c) AHJ acceptance of the 1 h on documented risk grounds. In practice, most shops cannot meet all three — staff often re-enter to retrieve possessions, the same operating period continues until close-of-business, and AHJs are increasingly reluctant to accept 1 h on cost grounds alone. Default to 3 h; the 1 h case is narrow.',
              },
              {
                question: 'My building has hospital wards on the upper floors and offices on the ground floor. What duration?',
                answer:
                  'Mixed-use buildings apply the longer duration to shared escape routes and the use-specific duration to dedicated areas. Ward floors and the escape routes that serve them: 2 h sleeping/healthcare. Office floors and dedicated office escape routes: 3 h default. Where an escape route serves both, the LONGER duration prevails — so a stairwell shared between the wards and the offices runs to 3 h. The dutyholder cannot cherry-pick the shorter of the two for shared zones.',
              },
              {
                question: 'Does standby lighting replace emergency lighting?',
                answer:
                  'No. They are separate duties. Standby lighting allows tasks to continue during a mains failure; emergency lighting allows safe evacuation during a mains failure. A space requiring standby (e.g. operating theatre) still requires emergency on its escape route. The duties may be implemented in the same luminaire (sized to whichever is the higher specification) or in separate luminaires. Both must be evidenced in the documentation.',
              },
              {
                question: 'How does the 5 s rule interact with a maintained luminaire?',
                answer:
                  'A maintained luminaire is permanently illuminated when the mains is healthy; on mains failure, the lamp continues to burn from the integral battery. There is no perceptible "switch-on" because the lamp never went out. The 5 s rule is therefore trivially met. Non-maintained luminaires are dark in normal conditions and must strike from cold on mains failure; the 5 s allowance covers warm-up. For high-risk areas the 0.5 s rule effectively requires maintained operation; cold-strike non-maintained cannot meet 0.5 s reliably.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Minimum illumination levels and durations — Module 3.1" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Escape route and coverage rules
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

export default EmergencyLightingModule3Section1;
