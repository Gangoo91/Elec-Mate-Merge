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
    id: 'elm3-s2-points',
    question: 'BS 5266-1:2025 lists which positions as REQUIRED luminaire locations on an escape route?',
    options: [
      'At each exit, stair, change of direction, intersection, sign and item of safety equipment on the route.',
      'At the start and end of each escape route only, with intermediate sections relying on thrown light.',
      'At a fixed interval of every 3 m along the route, regardless of doors, turns and intersections.',
      'Wherever is convenient to an existing wiring run, so the luminaires can be fed economically.',
    ],
    correctIndex: 0,
    explanation:
      'BS 5266-1:2025 §5.5 enumerates the mandatory luminaire positions: each emergency exit door, each escape stair (so the steps are directly lit), each change of direction and corridor intersection, each exit sign, first-aid post, item of firefighting equipment and fire alarm call point. The list is non-discretionary — the reasoning is direction-of-escape, so at every decision point the user can see where to go next. Safety-equipment positions repeat the 5 lx vertical duty from BS EN 1838.',
  },
  {
    id: 'elm3-s2-toilet',
    question: 'When does BS 5266-1:2025 require emergency lighting in toilets?',
    options: [
      'Always, regardless of compartment size or route out, because any windowless room is a hazard.',
      'Never, because toilets are not part of a defined escape route and an occupant can wait.',
      'Where the floor area exceeds 8 m² or the route out involves more than one turn.',
      'Only in commercial premises; domestic and small-office toilets are exempt whatever their layout.',
    ],
    correctIndex: 2,
    explanation:
      'BS 5266-1:2025 §5.6 — the 8 m² and multi-turn criteria. A single small cubicle with a straight path out can rely on borrowed light from the corridor when the door opens; a larger or multi-room facility cannot, because an occupant disoriented in darkness may not find the door. Cubicles below 8 m² with a single-turn straight path are exempt. Apply the rule per cubicle / per WC, not per building.',
  },
  {
    id: 'elm3-s2-borrowed',
    question: 'What is "borrowed light" and what is its status under BS 5266-1:2025?',
    options: [
      'Daylight through windows, always permitted to count toward the duty during daytime occupation.',
      'Light from hand torches or emergency vehicle beams reaching the space from outside the building.',
      'Light from a portable battery lantern carried by a designated marshal during an evacuation.',
      'Light from an adjacent space through glazing or an open doorway — now excluded under the 2025 standard.',
    ],
    correctIndex: 3,
    explanation:
      'BS 5266-1:2025 removes the borrowed-light allowance that existed in the 2016 edition. The donor space may have a different category, switching, integrity or a closed door at the moment of incident, so each space requiring cover must have its own dedicated luminaires, verified independently. Existing installations using borrowed light are not retrospectively non-compliant but must be reviewed at the next renewal.',
  },
  {
    id: 'elm3-s2-lift',
    question: 'A passenger lift in an office building — what emergency lighting applies?',
    options: [
      'None — lifts are not part of a defined escape route, so neither car nor lobbies need emergency lighting.',
      'BS EN 81-20 lighting inside the car, plus BS 5266-1 escape lighting in the lobby and machine room.',
      'Escape-route lighting to 1 lx inside the lift car, treating the car as a section of the route.',
      'High-level illumination of 50 lx throughout the car and lobby, matching the high-risk task duty.',
    ],
    correctIndex: 1,
    explanation:
      'Lifts are dual-jurisdiction. Inside the car: BS EN 81-20 (and BS EN 81-72 for firefighters lifts) — typically 5 lx for at least 1 h from a self-contained battery. Outside the car (lobby on each floor, motor room): BS 5266-1. Designs frequently miss one or the other; the lobby is part of the escape route and gets full BS 5266 treatment.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 5266-1:2025 specifies luminaires near each of the following positions on an escape route — which is NOT in the list?',
    options: [
      'Each exit door intended for emergency use.',
      'Each change of direction.',
      'Each intersection of corridors.',
      'Each office desk.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-1:2025 §5.5 lists exit doors, escape stairs (so the steps are lit), changes of direction, corridor intersections, emergency exit signs, first-aid posts, firefighting equipment, fire alarm call points, and (where present) refuge call points. Office desks are not on the list — desks are not points of decision on the escape route.',
  },
  {
    id: 2,
    question: 'What is the floor-level illuminance rule for a defined escape route per BS EN 1838:2024?',
    options: [
      '1 lx across the FULL WIDTH of the route at floor level, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m). Supersedes the 2013 centre-line + central-band wording.',
      '0.2 lx on the centre line.',
      '5 lx on the centre line.',
      '15 lx everywhere.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838:2024 §4.2.1. The 1 lx minimum applies across the FULL width of the route at floor level, with the permitted edge exclusions. The 2013 centre-line + central-band wording is superseded.',
  },
  {
    id: 3,
    question: 'Why does BS 5266-1 require a luminaire near each change of direction?',
    options: [
      'To meet a fixed luminaire-density target of so many fittings per metre of corridor.',
      'For aesthetic balance, so the spacing of fittings looks even and symmetrical along the route.',
      'For wiring convenience, because turns are where cable routes naturally change direction.',
      'Because the user must see the next leg and the next sign at each decision point.',
    ],
    correctAnswer: 3,
    explanation:
      'Decision-point lighting. The user makes a navigational choice at every turn, which requires visibility of the new direction and the next sign. Missing the luminaire at a turn produces a "dark corner" that confuses occupants in smoke or stress.',
  },
  {
    id: 4,
    question: 'A toilet compartment is 6 m² with a single straight exit path. What does BS 5266-1:2025 require?',
    options: [
      'Full escape-route lighting inside the compartment to the 1 lx floor minimum.',
      '5 lx vertical illuminance at the WC, treating the toilet as a safety-equipment location.',
      'No internal emergency lighting (below 8 m² and single-turn), provided the corridor outside is lit.',
      '15 lx high-risk task lighting, because a windowless compartment in darkness is a high-risk area.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1:2025 §5.6 — the 8 m² / single-turn exemption. The compartment is below the threshold and the egress is a single straight line, so no internal emergency luminaire is mandated; verify the corridor outside is lit to the escape-route minimum so an occupant leaving the compartment immediately enters lit space.',
  },
  {
    id: 5,
    question: 'Borrowed light (illumination from an adjacent space through glazing or open doorway) under BS 5266-1:2025 is...?',
    options: [
      'Excluded — every space requiring cover must have its own dedicated luminaires.',
      'Permitted to count toward the escape-lighting duty, exactly as under the 2016 edition.',
      'Permitted only during the hours of darkness, when there is no daylight contribution.',
      'Permitted only in retail premises, where open-plan layouts make dedicated luminaires impractical.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 closes the borrowed-light loophole that existed in the 2016 standard. The donor space may have different switching, different integrity, or a closed door at the moment of incident, so each space stands on its own dedicated luminaires.',
  },
  {
    id: 6,
    question: 'Inside a passenger lift car the emergency lighting standard is...?',
    options: [
      'BS 5266-1.',
      'BS EN 81-20 (and BS EN 81-72 for firefighters lifts) — typically 5 lx for at least 1 h from a self-contained battery in the car. The lift LOBBY on each floor remains under BS 5266-1.',
      'BS 7671.',
      'BS EN 1838 only.',
    ],
    correctAnswer: 1,
    explanation:
      'Lifts are governed by lifts standards inside the car. BS 5266 applies in the lobby and motor room. Designers must coordinate the two so the user transitioning from car to lobby is in continuously lit space.',
  },
  {
    id: 7,
    question: 'On a stair flight, where should the emergency luminaire be positioned?',
    options: [
      'At the top of the stair only, allowing the light to wash down and reach the lower treads.',
      'At the bottom of the stair only, so ascending occupants see the foot of the flight.',
      'Concealed inside the handrail, providing a continuous low-level glow along the travel line.',
      'So that every individual tread receives direct light and tread shadows are eliminated.',
    ],
    correctAnswer: 3,
    explanation:
      'Stairs are over-represented in fire-evacuation injuries because shadow from poor luminaire placement obscures the tread edge — shadow plus smoke is the main fall risk. BS 5266-1:2025 specifies placement to give direct light on every tread, typically a luminaire at top and bottom of the flight, or a wall-mounted fitting mid-flight whose throw covers all treads.',
  },
  {
    id: 8,
    question: 'A 30 m corridor with one 90-degree turn and an exit at each end. Minimum luminaire positions per BS 5266-1?',
    options: [
      'Near each exit (×2) and the change of direction (×1), plus any extra needed to meet 1 lx.',
      'A single luminaire at the mid-point of the corridor, equidistant from both exit doors.',
      'Three luminaires at a fixed 10 m interval along the corridor, irrespective of the turn.',
      'One luminaire in each of the four corners of the corridor, lighting the route perimeter.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 §5.5 dictates the minimum positions — each exit door plus the change of direction, so at least three. The minimum spacing between those positions is set by the photometric requirement (1 lx across the full width at floor level, with permitted edge exclusions per BS EN 1838:2024), not a fixed metre interval. Both rules apply; meet whichever is more onerous.',
  },
  {
    id: 9,
    question: 'A defined escape route passes through a 200 m² atrium 8 m wide. How does BS EN 1838:2024 apply?',
    options: [
      '1 lx on the centre line of a notional 1 m wide path, as in the superseded 2013 wording.',
      '0.5 lx anti-panic across the open atrium floor only, with no separate duty for the route.',
      '1 lx across the full route width, 0.5 lx anti-panic over the floor and 5 lx vertical at safety equipment.',
      '15 lx high-risk task illuminance throughout the atrium, treating it as a high-risk area.',
    ],
    correctAnswer: 2,
    explanation:
      'Atria, lobbies and large reception spaces routinely combine all three duties: the 2024 full-width 1 lx rule on the route, 0.5 lx anti-panic across the open floor (200 m² ≥ 60 m²), and 5 lx vertical at any safety equipment in the atrium.',
  },
  {
    id: 10,
    question: 'Direction-of-escape — what does it mean for luminaire placement?',
    options: [
      'Luminaires are alternated side to side along the corridor to spread light evenly across the floor.',
      'Luminaires are oriented to face back toward the building entrance, guiding arriving occupants inward.',
      'Luminaires are wall-mounted only and never ceiling-mounted, to keep them below the smoke layer.',
      'Luminaires light the field of view in the direction of travel — the next sign and next leg.',
    ],
    correctAnswer: 3,
    explanation:
      'Direction-of-escape is the principle that the user must see where to go next, not just see the floor. Luminaire placement supports forward visibility — the surface ahead, the next sign, the next change of direction. Lighting only the segment behind the user is non-compliant.',
  },
];

const EmergencyLightingModule3Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Escape route and coverage rules | EL Module 3.2 | Elec-Mate',
    description:
      'BS 5266-1:2025 escape-route coverage — required luminaire positions at every exit, stair, change of direction and intersection; toilet provision; lifts; the 2025 borrowed-light exclusion.',
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
            eyebrow="Module 3 · Section 2"
            title="Escape route and coverage rules"
            description="Where luminaires must go. BS 5266-1:2025 enumerates the positions — every exit, every stair, every change of direction, every intersection, every safety device. Plus the rules that decide whether a toilet, a lift or a small ancillary space falls within scope. The 2025 revision removes the borrowed-light allowance that 2016 permitted; every space stands on its own dedicated luminaires."
            tone="yellow"
          />

          <TLDR
            points={[
              'Mandatory positions per BS 5266-1:2025 §5.5 — each exit door, each escape stair, each change of direction, each corridor intersection, each emergency exit sign, each first-aid post, each firefighting equipment location, each fire alarm call point, each refuge call point.',
              'Spacing between mandatory positions is set by the photometric requirement (1 lx, full-width per BS EN 1838:2024), not by a fixed metre interval.',
              'Direction-of-escape — at every point the user must have an unobstructed view of the next leg and the next sign, with the route surface lit.',
              'Toilets — emergency lighting required where >8 m² OR the egress path involves more than one turn.',
              'Lifts — inside the car: BS EN 81-20 (typically 5 lx for ≥1 h). Lobby and motor room: BS 5266-1.',
              'Borrowed light EXCLUDED in BS 5266-1:2025 — the 2016 allowance is removed; every space has its own luminaires.',
              'Stairs — luminaire placement gives direct light on every tread; shadow + smoke is the main fall risk on evacuation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the mandatory luminaire positions per BS 5266-1:2025 §5.5 and apply them to a typical floor plan',
              'Apply the photometric spacing rule (BS EN 1838:2024 1 lx full-width) alongside the §5.5 mandatory positions',
              'Apply the direction-of-escape principle: forward visibility of the next leg and the next sign at every point',
              'Apply the BS 5266-1:2025 toilet provision rules (>8 m² or multi-turn path)',
              'Coordinate the BS EN 81-20 lift-car emergency lighting with BS 5266-1 lobby and motor-room duty',
              'Apply the BS 5266-1:2025 borrowed-light EXCLUSION — every space has its own emergency luminaires',
              'Position luminaires on stair flights to eliminate shadows on tread surfaces',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The mandatory positions — BS 5266-1:2025 §5.5</ContentEyebrow>

          <ConceptBlock
            title="The non-discretionary list"
            plainEnglish="BS 5266-1:2025 §5.5 lists the positions at which an emergency luminaire SHALL be located. The list is not a suggestion; it is non-discretionary. Spacing between these positions is then set by the photometric calculation — additional luminaires as required to meet the 1 lx escape-route minimum, the 0.5 lx anti-panic, and the 5 lx vertical at safety devices. The mandatory positions and the photometric spacing both apply; meet whichever is more onerous."
            onSite="Walk the building before drawing the layout. Map every exit, every stair, every turn, every intersection, every fire safety device. Mark each as a mandatory luminaire position. Then calculate spacing between positions to meet the photometric values. Both rules — positional and photometric — must be evidenced on the design."
          >
            <p>The full §5.5 list:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Each exit door intended for emergency use.</strong> The final exits and any
                door designated as a secondary exit. The luminaire is positioned to light the door
                AND the area immediately outside it (so the user transitions into lit external
                space).
              </li>
              <li>
                <strong>Near each escape stair so the steps receive direct light.</strong> Stair
                flights have their own positional rule — luminaires placed to give direct light on
                every tread, eliminating shadows. A single luminaire at the top is generally not
                sufficient for a flight of more than 8 to 10 treads.
              </li>
              <li>
                <strong>Near each change of direction.</strong> Every 90 degree turn, every
                Y-junction, every chicane in a corridor. The user makes a navigational decision and
                needs to see the new direction.
              </li>
              <li>
                <strong>Near each intersection of corridors.</strong> A T-junction or cross-junction
                where two or more escape routes meet. Each leg must be lit so the user identifies
                the route ahead and the route they are joining.
              </li>
              <li>
                <strong>Near each emergency exit sign.</strong> The directional signage requires
                illumination at minimum legibility level. Externally illuminated signs need a
                luminaire on them; internally illuminated signs are self-contained but the
                surrounding area also needs route lighting.
              </li>
              <li>
                <strong>Near each first-aid post.</strong> 5 lx vertical on the post / cabinet face,
                so a user in distress can identify and operate the equipment. The first-aid post
                is also typically a mustering point for casualty management.
              </li>
              <li>
                <strong>Near each piece of firefighting equipment.</strong> Extinguishers, fire
                blankets, hose reels, dry/wet riser inlets, fire alarm panels. 5 lx vertical on the
                device face.
              </li>
              <li>
                <strong>Near each fire alarm manual call point.</strong> 5 lx vertical on the call
                point face. Users may operate a call point in mains failure during evacuation.
              </li>
              <li>
                <strong>Near each refuge call point.</strong> Disabled refuges in stairwells or
                protected lobbies. 5 lx vertical on the call point face. Refuge points are
                discussed at length in §4 (risk-based design).
              </li>
              <li>
                <strong>Outside any final exit.</strong> A luminaire on the external face so the
                user transitioning out of the building sees the immediate surrounding area, not
                stepping from a lit interior into a dark courtyard.
              </li>
            </ul>
            <p>
              Add to this list any location identified by the fire risk assessment as
              safety-critical for evacuation. The §5.5 list is the minimum; project-specific
              factors may add positions. Subtraction is not permitted.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §5.5 (Required positions for emergency luminaires)"
            clause={
              <>
                Emergency luminaires shall be provided at the following positions: at each exit
                door intended to be used in an emergency; near each escape stair so that each
                flight receives direct light; near each change of direction of the escape route;
                near each intersection of corridors; near each emergency exit sign; near each
                first-aid post; near each piece of firefighting equipment; near each fire alarm
                manual call point; near each refuge call point; outside the building on the
                external face of each final exit. Additional luminaires shall be installed as
                required to meet the illuminance requirements of BS EN 1838.
              </>
            }
            meaning="The positional list AND the photometric calculation. Both apply. A design that hits 1 lx full width but skips a luminaire at a stair head is non-compliant despite the lux value, because the §5.5 list is independent of the lux value."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Direction of escape — forward visibility</ContentEyebrow>

          <ConceptBlock
            title="The user must see where to go next"
            plainEnglish="Direction-of-escape is the principle that an evacuating occupant needs forward visibility — they need to see the route ahead, not just the floor at their feet. At every point on the route, the user must be able to see the next leg of the route, the next directional sign, and the next change of direction. Luminaires are placed to illuminate the field of view in the direction of travel, not just the surface where the user is currently standing."
          >
            <p>What this means in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Look-ahead distance.</strong> A typical occupant walking at evacuation pace
                covers 1 to 1.5 m per second. They look 5 to 10 m ahead to plan footfall and
                identify obstacles. The lit field must extend at least that far in the direction of
                travel from any point on the route.
              </li>
              <li>
                <strong>Sign visibility.</strong> Directional emergency exit signs (running-man
                pictogram) are sized for legibility at 100 × the height of the pictogram (the
                viewing distance). A 200 mm pictogram is legible at 20 m; a 150 mm pictogram at
                15 m. The next sign must be within visible range from the current position, lit so
                it can be read.
              </li>
              <li>
                <strong>Decision-point coverage.</strong> Every change of direction, every
                intersection, every door is a decision point. The user pauses, looks for the next
                directional cue, then continues. Decision points need a luminaire AND a sign
                visible from the previous decision point.
              </li>
              <li>
                <strong>Forward-throw photometric distribution.</strong> Some emergency luminaires
                are designed with a forward-throw distribution (asymmetric optic) that pushes light
                along the corridor in the direction of the next exit. Useful where the corridor is
                straight and the exit is some distance away — light in the direction of travel
                rather than directly below.
              </li>
            </ul>
            <p>
              A common design failure is to light the floor uniformly without considering forward
              visibility — the lux meter reads 1 lx everywhere, but the user looking ahead sees
              dim space and hesitates. The fix is photometric distribution selection plus
              positioning that aligns the brightest part of the beam with the direction of travel.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Toilets — the 8 m² and multi-turn rule</ContentEyebrow>

          <ConceptBlock
            title="When does a WC need its own emergency luminaire?"
            plainEnglish="Toilet compartments are a special case. Many are too small to disorient an occupant; some are large enough to be problematic in darkness. BS 5266-1:2025 §5.6 sets two thresholds: emergency lighting is required inside the compartment if the floor area exceeds 8 m² OR the egress path from any point inside back to a defined escape route involves more than one turn / change of direction. Below 8 m² AND single-turn — exempt. Above either threshold — luminaire required."
          >
            <p>Applying the rule:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Standard cubicle (1.5 m² with straight exit).</strong> Below 8 m², single
                turn — EXEMPT. Corridor lighting outside satisfies the exit requirement.
              </li>
              <li>
                <strong>Single-occupant accessible WC (4 m² with straight exit).</strong> Below
                8 m², single turn — EXEMPT.
              </li>
              <li>
                <strong>Larger accessible WC with vestibule (12 m² total, two turns).</strong>
                Above 8 m² OR multi-turn — REQUIRED. A luminaire inside the vestibule, possibly
                a second inside the WC compartment if the layout creates a sub-room.
              </li>
              <li>
                <strong>Multi-cubicle public WC (e.g. office washroom, 40 m² with multiple
                cubicles).</strong> Above 8 m² — REQUIRED. Luminaires positioned in the
                circulation space serving the cubicles; cubicles themselves typically rely on
                light spilling under the door.
              </li>
              <li>
                <strong>Lobbied WC (lobby + WC compartments separated).</strong> Apply the rule
                per discrete space. The lobby is one compartment; each WC compartment behind it
                is another. The lobby may exceed 8 m² and need its own luminaire even if each
                cubicle is below.
              </li>
            </ul>
            <p>
              The thresholds reflect the disorientation risk. A small straight-exit cubicle is
              quickly evacuated even in darkness — the door is one step away, the egress is
              obvious. A larger or multi-turn space presents real risk; the occupant cannot find
              the door without illumination.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §5.6 (Toilet and washroom provision)"
            clause={
              <>
                Emergency lighting shall be provided in toilet and washroom compartments where the
                floor area exceeds 8 m², or where the egress path from any position within the
                compartment to the defined escape route requires more than one change of direction.
                Compartments not meeting either criterion may be exempted, provided the surrounding
                escape route is itself adequately lit.
              </>
            }
            meaning="8 m² OR multi-turn — either trigger requires the luminaire. Below both — exempt. The corridor outside must still meet the escape-route duty for the exemption to be safe."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lifts — BS EN 81-20 inside the car</ContentEyebrow>

          <ConceptBlock
            title="Two standards meet at the lift door"
            plainEnglish="Lift cars are a tightly enclosed space with no direct exit. An occupant trapped in a lift during a mains failure cannot evacuate the way other occupants can; they must wait for rescue. The lift design standards (BS EN 81-20 for general passenger lifts; BS EN 81-72 for firefighters lifts) require dedicated emergency lighting inside the car — typically 5 lx at floor level for at least 1 h from a self-contained battery in the car. Outside the car — in the lift lobby on each floor and in the motor room — BS 5266-1 applies as for any escape route."
          >
            <p>The two-standard split:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Inside the car — BS EN 81-20.</strong> The lift manufacturer provides the
                car emergency lighting as part of the lift package. Verifies on commissioning per
                lift standards (LiftSafe, BS EN 81 family). The electrical contractor for the
                building does NOT design the car lighting; the lift contractor does.
              </li>
              <li>
                <strong>Lift lobby — BS 5266-1.</strong> The space outside the lift door on each
                floor is part of the building. It is on the escape route from the lift (when the
                lift opens, the user steps into the lobby), and it is on the escape route to /
                from the surrounding building. 1 lx escape route, 5 lx vertical at any safety
                equipment, 0.5 lx anti-panic if the lobby is open ≥60 m².
              </li>
              <li>
                <strong>Motor room (overhead or basement).</strong> Plant-room lighting on a
                BS 5266 basis where escape from the motor room to a final exit is required. Often
                a small switched circuit serving a 1 to 2 luminaire installation.
              </li>
              <li>
                <strong>Firefighters lifts (BS EN 81-72).</strong> Stricter requirements — the lift
                continues to operate during a fire, used by fire service personnel. Emergency
                lighting inside the car is to a tighter spec; the lobby on each floor is typically
                a protected lobby with its own dedicated emergency lighting on a longer duration.
              </li>
            </ul>
            <p>
              Coordinate at design stage. The BS 5266 designer agrees with the lift contractor
              what is in their respective scopes. A common gap: nobody designs the motor-room
              lighting, because the lift contractor scope ends at the car and the BS 5266 designer
              treats the motor room as out of scope. The motor room IS in BS 5266 scope and needs
              lighting.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 81-20:2020 · §5.4.10 (Car emergency lighting)"
            clause={
              <>
                The car shall be equipped with emergency lighting which shall illuminate the car
                control panel, alarm device and the floor area to a minimum of 5 lx for at least
                1 h after the failure of the normal supply. The emergency lighting source shall
                be self-contained within the car or otherwise arranged to remain operational
                independent of the building supply.
              </>
            }
            meaning="Inside the car, 5 lx for 1 h. Outside the car, BS 5266-1. Designs that miss the lobby (it is BS 5266 territory, not BS EN 81-20) leave gaps the standards do not cover."
          />

          <SectionRule />

          <ContentEyebrow>Borrowed light — removed in 2025</ContentEyebrow>

          <ConceptBlock
            title="The 2025 revision closes a 2016 loophole"
            plainEnglish="Under BS 5266-1:2016, borrowed light was permitted in some cases — luminaires in an adjacent space could illuminate the space under design through a glazed wall, an open doorway, or other transparent / open boundary, and the resulting illuminance could count toward the duty in the receiving space. BS 5266-1:2025 removes this allowance. Every space requiring emergency lighting must have its own dedicated emergency luminaires verified independently. Borrowed light no longer counts."
          >
            <p>The reasons for the change:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Different switching.</strong> The donor space might be switched off when
                the receiver space is occupied — a meeting room with the lights off behind a
                glazed wall does not illuminate the corridor on the other side.
              </li>
              <li>
                <strong>Different integrity.</strong> The donor space might use luminaires of a
                different rating, on a different circuit, with a different test regime. A failure
                in the donor's emergency system removes light from the receiver too.
              </li>
              <li>
                <strong>Closed door at incident.</strong> A donor space with luminaires shining
                through a normally-open door fails when the door is closed for any reason
                (security, draught, smoke containment).
              </li>
              <li>
                <strong>Verification difficulty.</strong> Periodic testing per BS EN 50172
                inspects each luminaire individually. Verifying that borrowed light is delivering
                the required lux in the receiving space requires a coordinated test of two
                circuits — easily missed in a maintenance regime.
              </li>
            </ul>
            <p>
              The practical effect: existing installations using borrowed light are not
              retrospectively non-compliant the day BS 5266-1:2025 is published, but they should be
              reviewed at the next maintenance interval and dedicated luminaires added where
              borrowed light was being relied on. New installations under BS 5266-1:2025 cannot
              use borrowed light in the design.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §5.7 (Dedicated luminaires, exclusion of borrowed light)"
            clause={
              <>
                Each space within the scope of this standard shall be provided with dedicated
                emergency luminaires sufficient to meet the illuminance and uniformity requirements
                of BS EN 1838 within that space alone. Illumination borrowed from luminaires in
                adjacent spaces shall not be counted toward the requirements of this standard.
              </>
            }
            meaning="Every space stands on its own. The 2016 borrowed-light allowance is removed. Existing installations review at next renewal; new designs cannot rely on borrowed light."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          {/* Diagram — escape route plan with required luminaire positions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Escape-route plan — required luminaire positions per BS 5266-1:2025 §5.5
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Floor plan of an office showing escape route with luminaires positioned at every exit door, change of direction, intersection, fire alarm call point, fire extinguisher and stair head, with the route highlighted from desks to the final exit."
            >
              <rect x="20" y="20" width="840" height="500" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

              {/* Office room */}
              <rect x="60" y="60" width="320" height="200" fill="rgba(34,211,238,0.04)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.4" />
              <text x="220" y="88" textAnchor="middle" fill="#22D3EE" fontSize="12" fontWeight="bold">Open-plan office (250 m²)</text>
              <text x="220" y="104" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9.5">anti-panic 0.5 lx + escape 1 lx full-width</text>

              {/* Desk markers */}
              <rect x="100" y="140" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="160" y="140" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="220" y="140" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="280" y="140" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="100" y="190" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="160" y="190" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="220" y="190" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="280" y="190" width="40" height="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />

              {/* Corridor */}
              <rect x="60" y="280" width="780" height="60" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.4" />
              <text x="450" y="298" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Escape corridor — 1 lx full width (edge excl. per 2024)</text>

              {/* Stair */}
              <rect x="420" y="60" width="120" height="200" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.5)" strokeWidth="1.4" />
              <text x="480" y="88" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">Stair</text>
              <text x="480" y="104" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9.5">direct light on every tread</text>

              {/* WC */}
              <rect x="580" y="60" width="100" height="100" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <text x="630" y="88" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">WC (12 m²)</text>
              <text x="630" y="104" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">&gt;8 m² → req</text>

              {/* Lift */}
              <rect x="700" y="60" width="120" height="80" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.4" />
              <text x="760" y="88" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Lift lobby</text>
              <text x="760" y="104" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">BS 5266-1</text>
              <text x="760" y="118" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">car: BS EN 81-20</text>

              {/* Final exit (right) */}
              <rect x="800" y="280" width="40" height="60" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="820" y="316" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">EXIT</text>

              {/* Final exit (left) */}
              <rect x="20" y="280" width="40" height="60" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="40" y="316" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">EXIT</text>

              {/* Office door (to corridor) */}
              <rect x="180" y="260" width="40" height="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="200" y="274" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">door</text>

              {/* Luminaires (yellow circles) */}
              {/* Inside office — anti-panic + escape */}
              <circle cx="160" cy="120" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="280" cy="120" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="160" cy="220" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="280" cy="220" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />

              {/* Office door — required */}
              <circle cx="200" cy="265" r="9" fill="#FBBF24" stroke="#EF4444" strokeWidth="2" />
              <text x="200" y="252" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold">door</text>

              {/* Corridor — multiple luminaires */}
              <circle cx="100" cy="310" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="240" cy="310" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="380" cy="310" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="500" cy="310" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="640" cy="310" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />
              <circle cx="760" cy="310" r="8" fill="#FBBF24" stroke="#000" strokeWidth="1" />

              {/* Final exits — required */}
              <circle cx="40" cy="265" r="9" fill="#FBBF24" stroke="#EF4444" strokeWidth="2" />
              <circle cx="820" cy="265" r="9" fill="#FBBF24" stroke="#EF4444" strokeWidth="2" />
              <text x="40" y="252" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold">exit</text>
              <text x="820" y="252" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold">exit</text>

              {/* External luminaires outside final exits */}
              <circle cx="40" cy="370" r="9" fill="#FBBF24" stroke="rgba(34,197,94,0.8)" strokeWidth="2" />
              <text x="40" y="392" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">ext.</text>
              <circle cx="820" cy="370" r="9" fill="#FBBF24" stroke="rgba(34,197,94,0.8)" strokeWidth="2" />
              <text x="820" y="392" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">ext.</text>

              {/* Stair head and foot luminaires — required */}
              <circle cx="480" cy="80" r="9" fill="#FBBF24" stroke="#A855F7" strokeWidth="2" />
              <circle cx="480" cy="240" r="9" fill="#FBBF24" stroke="#A855F7" strokeWidth="2" />
              <text x="480" y="68" textAnchor="middle" fill="#A855F7" fontSize="9" fontWeight="bold">stair head</text>
              <text x="480" y="258" textAnchor="middle" fill="#A855F7" fontSize="9" fontWeight="bold">foot</text>

              {/* Intersection at stair / corridor — required */}
              <circle cx="480" cy="310" r="9" fill="#FBBF24" stroke="#22D3EE" strokeWidth="2" />
              <text x="480" y="338" textAnchor="middle" fill="#22D3EE" fontSize="9" fontWeight="bold">int.</text>

              {/* WC luminaire — required (>8 m²) */}
              <circle cx="630" cy="110" r="9" fill="#FBBF24" stroke="#FBBF24" strokeWidth="2" />

              {/* Lift lobby luminaire */}
              <circle cx="760" cy="100" r="8" fill="#FBBF24" stroke="#22C55E" strokeWidth="1.5" />

              {/* Fire safety devices — call point + extinguisher with vertical lux markers */}
              <rect x="320" y="295" width="14" height="14" fill="rgba(239,68,68,0.7)" stroke="#EF4444" strokeWidth="1.4" />
              <text x="327" y="305" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">M</text>
              <text x="327" y="338" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold">MCP — 5 lx vert</text>

              <rect x="560" y="295" width="14" height="14" fill="rgba(239,68,68,0.7)" stroke="#EF4444" strokeWidth="1.4" />
              <text x="567" y="305" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">F</text>
              <text x="567" y="338" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold">extinguisher</text>

              {/* Direction-of-escape arrows */}
              <polygon points="370,310 386,304 386,316" fill="rgba(34,197,94,0.7)" />
              <polygon points="710,310 726,304 726,316" fill="rgba(34,197,94,0.7)" />
              <polygon points="135,310 119,304 119,316" fill="rgba(34,197,94,0.7)" />

              {/* Legend */}
              <rect x="20" y="430" width="840" height="84" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <text x="36" y="450" fill="#FBBF24" fontSize="11" fontWeight="bold">Legend — required luminaire positions per BS 5266-1:2025 §5.5</text>

              <circle cx="40" cy="468" r="6" fill="#FBBF24" />
              <text x="54" y="472" fill="rgba(255,255,255,0.85)" fontSize="10">photometric (1 lx route, 0.5 lx anti-panic)</text>

              <circle cx="240" cy="468" r="7" fill="#FBBF24" stroke="#EF4444" strokeWidth="2" />
              <text x="254" y="472" fill="rgba(255,255,255,0.85)" fontSize="10">at exit door (mandatory §5.5)</text>

              <circle cx="430" cy="468" r="7" fill="#FBBF24" stroke="#A855F7" strokeWidth="2" />
              <text x="444" y="472" fill="rgba(255,255,255,0.85)" fontSize="10">at stair head/foot (mandatory)</text>

              <circle cx="640" cy="468" r="7" fill="#FBBF24" stroke="#22D3EE" strokeWidth="2" />
              <text x="654" y="472" fill="rgba(255,255,255,0.85)" fontSize="10">at intersection / change of direction</text>

              <circle cx="40" cy="492" r="7" fill="#FBBF24" stroke="rgba(34,197,94,0.8)" strokeWidth="2" />
              <text x="54" y="496" fill="rgba(255,255,255,0.85)" fontSize="10">external (outside final exit)</text>

              <rect x="232" y="486" width="14" height="14" fill="rgba(239,68,68,0.7)" stroke="#EF4444" strokeWidth="1.4" />
              <text x="254" y="496" fill="rgba(255,255,255,0.85)" fontSize="10">safety device — 5 lx vertical on face</text>

              <text x="450" y="496" fill="rgba(34,197,94,0.85)" fontSize="10">→ direction of escape (forward visibility at every point)</text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Mistakes the standards expose</ContentEyebrow>

          <CommonMistake
            title="Designing to the photometric calculation only and missing §5.5 mandatory positions"
            whatHappens="Designer runs a photometric calculation with luminaires evenly spaced down a corridor. The calculation passes 1 lx full-width. At commissioning, the third-party engineer notes that the luminaire near the head of the stair is missing — the spacing put the nearest luminaire 4 m away from the stair head, which is fine for the lux at the stair top but does not meet §5.5 mandatory position. Layout requires modification and rewiring."
            doInstead="Walk the layout BEFORE running photometric calculations. Mark every §5.5 mandatory position. Place luminaires AT those positions. Then add additional luminaires between as needed for the photometric requirement. The mandatory list is the SKELETON; the photometric calculation fills in around it. Reversing the process leaves gaps."
          />

          <CommonMistake
            title="Relying on borrowed light from a glazed meeting room"
            whatHappens="A 2018 office fit-out designed a corridor section with light borrowed from a glazed meeting room — the meeting room's emergency luminaires shining through a glass partition gave 1 lx in the corridor. At periodic test in 2025 (under the new standard), the test engineer notes that with the meeting-room door closed and the meeting-room emergency luminaires removed for refit, the corridor has zero emergency illumination. Non-compliant under BS 5266-1:2025 §5.7. Dedicated luminaires required, electrical work after-hours, business disruption."
            doInstead="Each space requiring emergency lighting under BS 5266-1:2025 needs its own luminaires. Borrowed light is no longer permitted; designs based on it are non-compliant for new installations and require remediation at the next renewal of existing installations. When auditing legacy installations, identify spaces relying on borrowed light and quote them for dedicated provision."
          />

          <CommonMistake
            title="Skipping the lift lobby because the lift contractor designed the car"
            whatHappens="A new lift installation includes the BS EN 81-20 car emergency lighting (lift contractor scope). The BS 5266 designer assumes the lift area is covered. The lift LOBBY on each floor — the space outside the lift door — has no emergency lighting because nobody designed it. At commissioning, an inspector spots that on each of 6 floors the lift lobby is dark in mains failure. 6 luminaires retrofit, additional cabling."
            doInstead="The BS 5266 designer's scope ENDS at the inside of the car door. The lobby is theirs. Coordinate at design stage — the lift contractor delivers the car emergency lighting; the BS 5266 designer delivers everything else, INCLUDING the lobby on every floor and the motor room. Each luminaire on the layout is owned by exactly one party; nothing in scope is unowned."
          />

          <SectionRule />

          <Scenario
            title="A 4-storey office — applying §5.5 floor by floor"
            situation="4-storey office building. Each floor: open-plan office (200 m²), three meeting rooms, two WCs (one 6 m², one 14 m²), a lift lobby with one passenger lift, an escape stair (single flight per floor between landings), a corridor connecting the office to the stair / lift / WCs / final exits at ground floor."
            whatToDo="Per floor: luminaires inside the open-plan office for anti-panic (250 m² → ≥60 m² triggers anti-panic) plus escape route to the office door, plus 5 lx vertical at any safety devices; luminaires in the corridor at every change of direction and at the entry to each meeting room and each WC and the lift lobby and the stair; the 14 m² WC needs internal luminaires (>8 m²); the 6 m² WC is exempt if its egress is single-turn; the lift lobby needs its own luminaires (BS 5266 not BS EN 81-20); the stair head and foot on each landing need luminaires giving direct light on every tread. Ground floor adds external luminaires outside each final exit. All to 3 h duration. Approximately 30 to 40 luminaires per floor for a typical layout."
            whyItMatters="A multi-storey building multiplies the §5.5 mandatory positions by the number of floors plus the building-shared positions (final exits, plant rooms, lift motor room). Counting positions floor-by-floor is the systematic way to size the design. Skipping floors or sharing luminaire counts across floors leaves gaps."
          />

          <Scenario
            title="A retail unit with a glass-fronted display — does the glass help?"
            situation="Retail unit, 80 m², full-height glass shopfront facing a covered shopping centre arcade. The arcade is brightly lit and has its own emergency lighting designed by the centre owner. The retail tenant proposes to omit emergency lighting near the front of the unit because 'the arcade lights through the glass anyway'."
            whatToDo="Reject the proposal under BS 5266-1:2025 §5.7. Borrowed light from the arcade does not count toward the unit's emergency lighting duty. The unit must have dedicated luminaires throughout, sized to 1 lx escape route + 0.5 lx anti-panic + 5 lx vertical at any safety devices. The arcade's emergency lighting is the arcade's, with its own switching, integrity and test regime; the unit cannot rely on it. The 2025 revision is explicit about this and existing installations using such arrangements should be reviewed at renewal."
            whyItMatters="The borrowed-light prohibition is one of the cleanest changes between 2016 and 2025. Designers and dutyholders need to know it. Auditing legacy installations for borrowed-light reliance is a useful initial step in transitioning a portfolio to the 2025 standard."
          />

          <SectionRule />

          <KeyTakeaways
            title="Coverage rules to walk the building with"
            points={[
              'Mandatory positions per §5.5: every exit door, stair head and foot, change of direction, intersection, sign, first-aid post, firefighting equipment, MCP, refuge call point, external face of each final exit.',
              'Photometric spacing (1 lx full-width, 0.5 lx anti-panic, 5 lx vertical) sets additional luminaires between mandatory positions; both rules apply.',
              'Direction-of-escape: forward visibility at every point. The user must see the next leg and the next sign; back-of-route lighting is insufficient.',
              'Toilets: required if >8 m² OR multi-turn egress; below both, exempt provided the corridor outside is lit.',
              'Lifts: inside the car BS EN 81-20 (5 lx for 1 h); outside the car (lobby, motor room) BS 5266-1.',
              'Borrowed light is REMOVED in BS 5266-1:2025 §5.7 — every space has its own dedicated luminaires.',
              'Stair flights need luminaires that give direct light on every tread; shadow + smoke is the main fall risk.',
              'Walk the building first; map mandatory positions; then run photometric calculations; never reverse the order.',
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
                question: 'Does §5.5 require a luminaire AT every position, or NEAR every position?',
                answer:
                  'Near. The standard wording is "near each", recognising that a luminaire directly above a stair head, for example, may not be the optimal photometric position — a luminaire 1 to 2 m offset can give better tread illumination. "Near" is taken as within the photometric envelope where the position is effectively lit. Designers apply judgement; commissioning inspectors check the position is in fact lit.',
              },
              {
                question: 'A corridor has a slight curve, not a sharp turn — does the curve count as a change of direction?',
                answer:
                  'A gentle curve where the user can see continuously to the next decision point is generally not a change of direction; the user does not pause to navigate. A pronounced curve or a corner where the user loses sight of the path ahead IS a change of direction and gets a luminaire. Test it by walking the route — at any point where you cannot see the next leg, you have a change of direction. The line-of-sight test is the working definition.',
              },
              {
                question: 'External final-exit luminaires — are they part of BS 5266 or part of external lighting?',
                answer:
                  'Part of BS 5266. The luminaire on the external face of a final exit is in scope; it lights the immediate area outside the door so the user transitioning out is in lit space. Beyond the immediate door surround (covered approach, courtyard, walkway), external lighting takes over and may or may not be emergency-rated depending on the route to a place of safety. Coordinate with the building external lighting designer.',
              },
              {
                question: 'A stairwell is dark in normal use (no daytime lighting at all) — what does that mean for emergency lighting?',
                answer:
                  'A stairwell with no normal lighting is non-compliant before considering emergency lighting. BS 7671 requires general lighting for all common areas; BS 5266 requires emergency lighting in addition. The two duties are separate. If the stairwell has no normal lighting, the BS 5266 emergency duty cannot rescue the situation — fix the normal lighting first, then design the emergency layer on top.',
              },
              {
                question: 'A WC compartment has frosted glass in the door letting some corridor light in — does that satisfy emergency?',
                answer:
                  'No. Borrowed light is excluded under BS 5266-1:2025 §5.7. Frosted glass spilling corridor light into a WC does not count toward the WC duty. If the WC is >8 m² or multi-turn, it needs its own luminaires regardless of glazing. If the WC is below the threshold (single straight-exit cubicle), no luminaire is needed — but that is because of the size exemption, not because of borrowed corridor light.',
              },
              {
                question: 'A passenger lift in a small office building — is the BS EN 81-20 car lighting on a separate test regime?',
                answer:
                  'Yes. The lift car emergency lighting is part of the lift maintenance regime — typically tested annually by the lift maintenance contractor as part of the LOLER inspection. The BS 5266 lobby and motor-room lighting is on the BS EN 50172 6-monthly / annual regime under the building maintenance contract. The two regimes are separate; the dutyholder coordinates by ensuring both are scheduled and recorded.',
              },
              {
                question: 'A refuge call point — what emergency lighting does it need?',
                answer:
                  '5 lx vertical on the face of the call point AND escape lighting in the refuge area itself (the protected lobby or stair landing where the user waits for assistance). Plus the route from the refuge to the final exit, where the assistance leads the user out, must meet escape-route minimums. Refuges are covered in detail in §4 (risk-based design); the §5.5 reference here is the call-point face vertical lighting.',
              },
              {
                question: 'A floor area is exactly 60 m² — does anti-panic apply?',
                answer:
                  'Yes. The threshold is "60 m² OR more" so 60 m² triggers anti-panic. Designers commonly round area calculations; if the floor area is genuinely close to 60 m² (say 58 to 62), apply anti-panic conservatively. The cost of one or two extra luminaires is small compared to a non-compliance finding at commissioning.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Escape route and coverage rules — Module 3.2" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-3-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Mounting heights and photometric considerations
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

export default EmergencyLightingModule3Section2;
