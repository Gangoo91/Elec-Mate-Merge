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
    id: 'elm2-s2-minimum',
    question:
      'What is the minimum horizontal illuminance required across an open area (anti-panic) under BS EN 1838:2024?',
    options: [
      '0.5 lx across the unobstructed area, at floor level.',
      '0.2 lx across the unobstructed area, at floor level.',
      '1 lx — same as escape route lighting.',
      '15 lx — same as high-risk task area.',
    ],
    correctIndex: 0,
    explanation:
      'BS EN 1838:2024 §5.1 sets 0.5 lx as the minimum across the unobstructed area of an anti-panic open-area space. The figure is half of escape route illuminance because anti-panic answers a different question — not "can occupants follow a route" but "can occupants perceive the layout well enough to identify and reach an escape route without panic". Visual orientation, not navigation along a path, is what 0.5 lx delivers. Anti-panic and escape route are separate functional categories with separate illuminance figures.',
  },
  {
    id: 'elm2-s2-perimeter',
    question:
      'What is excluded from the area over which the 0.5 lx minimum is verified, under BS EN 1838:2024?',
    options: [
      'Nothing — the rule applies to every square metre.',
      'Only the centre of the room is excluded.',
      'A 0.5 m perimeter band against walls, columns, and obstacles.',
      'The entire room — only doorways are verified.',
    ],
    correctIndex: 2,
    explanation:
      'A 0.5 m perimeter band against walls and obstacles is excluded from the verification area. The rule reflects two facts: people are unlikely to be pressed against walls during the panic phase, and walls absorb light unevenly so corner illuminance is hard to design for and not functionally critical. The 0.5 lx minimum applies to the body of the unobstructed area excluding this strip. This is a key methodological feature of anti-panic calculation that distinguishes it from escape route methodology (which has no perimeter exclusion). Mixing the two is one of the most common errors at the boundary between functional categories.',
  },
  {
    id: 'elm2-s2-uniformity',
    question:
      'What is the maximum permissible max-to-min uniformity ratio for open-area (anti-panic) lighting under BS EN 1838:2024?',
    options: [
      '10:1 — tighter than the standard requires.',
      '60:1 across the unobstructed area.',
      'No limit applies to anti-panic lighting.',
      '40:1 across the unobstructed area, excluding the 0.5 m perimeter.',
    ],
    correctIndex: 3,
    explanation:
      'Both escape route and anti-panic lighting share the 40:1 maximum uniformity ratio — the same physiological constraint, since bright-to-dark contrast over 40:1 produces eye-adaptation problems for the dark-adapted occupant. Anti-panic uniformity is verified ACROSS the area; escape route uniformity is verified ALONG the route — different geometries, same ratio. The shared figure makes design easier when both methodologies apply to one area: a layout achieving 40:1 for the route also achieves it for anti-panic.',
  },
  {
    id: 'elm2-s2-trigger',
    question: 'When does anti-panic open-area lighting become mandatory under BS EN 1838:2024?',
    options: [
      'Only when the unobstructed area exceeds 100 m².',
      'When the unobstructed area exceeds 60 m² OR occupancy exceeds 10 persons.',
      'Only when occupancy exceeds 50 persons.',
      'In all rooms regardless of size or occupancy.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 §5.1 — anti-panic open-area lighting required where unobstructed area > 60 m² OR occupancy > 10 persons. Either trigger is sufficient. A small high-occupancy room qualifies; a large low-occupancy room qualifies; both qualify if both triggers are met. Designers often miss the 10-occupant trigger in small meeting rooms, conference rooms, and waiting areas.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the FUNCTIONAL purpose of open-area (anti-panic) emergency lighting under BS EN 1838:2024?',
    options: [
      'Give occupants enough light to perceive layout and identify an escape route without losing orientation.',
      'Identical to escape route lighting — illuminate the defined path to a final exit.',
      'Replace escape route lighting in any open space over 60 m².',
      'Provide 15 lx at the working plane for safe machinery shutdown.',
    ],
    correctAnswer: 0,
    explanation:
      'Anti-panic, escape route, and high-risk task lighting are three independent functional categories answering three different questions. Anti-panic covers the gap between being in an open area and entering a defined escape route — perceiving the layout, identifying the exit direction, and starting to move, without losing orientation. Escape route lighting takes over once the occupant is on the route. The 0.5 lx minimum is calibrated for visual orientation, not for following a defined path.',
  },
  {
    id: 2,
    question:
      'A meeting room has unobstructed floor area 35 m² and seats 14 people. Does anti-panic emergency lighting apply?',
    options: [
      'No — the unobstructed area is below 60 m².',
      'No — meeting rooms are exempt from anti-panic.',
      'Yes — the 10-occupant trigger fires regardless of area.',
      'Only if the meeting is held after dark.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 mandates anti-panic lighting where unobstructed area > 60 m² OR occupancy > 10 persons (either trigger). 14 occupants in a 35 m² room exceeds the occupancy trigger, so anti-panic 0.5 lx applies across the unobstructed area excluding the 0.5 m perimeter. This dual trigger catches small meeting rooms, conference rooms, training rooms, and waiting areas that would otherwise slip through if only the area trigger were applied — a classic case designers frequently miss.',
  },
  {
    id: 3,
    question: 'What is the maximum max-to-min uniformity ratio for anti-panic open-area lighting?',
    options: [
      '10:1 across the unobstructed area.',
      '100:1 across the unobstructed area.',
      'No limit applies to the unobstructed area.',
      '40:1 across the unobstructed area, excluding the 0.5 m perimeter.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 1838:2024 retains 40:1 as the uniformity cap for both escape route (longitudinal) and anti-panic (areal) lighting. The figure caps glare-to-shadow contrast the dark-adapted eye cannot accommodate. The shared 40:1 means a single luminaire layout can satisfy both metrics where both functional categories apply.',
  },
  {
    id: 4,
    question:
      'A 0.5 m perimeter band against the walls of an open area is treated how, in anti-panic verification?',
    options: [
      'Excluded from the area over which the 0.5 lx minimum is verified.',
      'Treated identically to the rest of the unobstructed area.',
      'Verified to a higher 1 lx minimum than the rest of the area.',
      'Verified at 5 lx vertical illuminance only.',
    ],
    correctAnswer: 0,
    explanation:
      'The perimeter exclusion is a methodological feature of anti-panic lighting (BS EN 1838:2024 §5). Walls absorb light unevenly and corners are hard to design for; people in the panic phase are unlikely to be pressed against walls. The 0.5 lx minimum applies to the body of the unobstructed area, excluding this strip. The exclusion belongs to anti-panic methodology and NOT to escape route methodology, which applies 1 lx to the full route width with no exclusion. The two treat the boundary differently — a frequent source of errors when both apply to the same space.',
  },
  {
    id: 5,
    question:
      'Within how many seconds of mains failure must anti-panic lighting reach 50 % of its rated illuminance, under BS EN 1838:2024?',
    options: [
      '0.5 s — the high-risk task-area figure.',
      '15 s to 50 %, with full output within 60 s.',
      '5 s to 50 %, with full output within 60 s.',
      '60 s, matching the full-output allowance.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 1838:2024 §5.3 — anti-panic response time follows the same general rule as escape route lighting: 50 % within 5 s, full rated illuminance within 60 s. The 5 s figure is the GENERAL response time for emergency escape lighting categories. Only high-risk task lighting tightens this further (to 0.5 s) because of the safety consequences of operating machinery in darkness. Modern LED systems achieve both within milliseconds; the 60 s allowance is a legacy of discharge-lamp warm-up.',
  },
  {
    id: 6,
    question:
      'A retail unit has a 220 m² open shopfloor with display fixtures occupying about 40 m² of that area. What anti-panic methodology applies?',
    options: [
      'Treat the full 220 m² gross floor as the verification area.',
      'Treat each fixture cluster as a separate high-risk task area.',
      'Apply 1 lx escape route across the whole shopfloor.',
      'Verify 0.5 lx across the unobstructed area — gross minus the fixture footprint (about 180 m²).',
    ],
    correctAnswer: 3,
    explanation:
      'The unobstructed area is the full 220 m² minus the fixture footprint, leaving roughly 180 m² against which 0.5 lx is verified. Display fixtures are obstructions occupants navigate around; they form part of the perimeter-exclusion concept extended to internal obstacles. The "unobstructed" qualifier is load-bearing — verify 0.5 lx across the floor occupants can actually walk on, not the gross room area. Internal obstructions are excluded along with their 0.5 m perimeter.',
  },
  {
    id: 7,
    question:
      'A wide office open-plan area is 18 m × 12 m (216 m²) with the main escape route running diagonally across the floor. Both functional categories apply. What does the design need to satisfy?',
    options: [
      'Both — 1 lx along the diagonal route AND 0.5 lx across the unobstructed area.',
      'Only escape route — anti-panic is suppressed by the escape route requirement.',
      'Only anti-panic — escape route does not apply within open spaces.',
      'Apply 15 lx high-risk task lighting across the whole area.',
    ],
    correctAnswer: 0,
    explanation:
      'Both functional categories apply concurrently when the geometry triggers both. Escape route methodology requires 1 lx across the full width of the diagonal route at floor level (with BS EN 1838:2024 edge exclusions) and 40:1 uniformity along the route; anti-panic requires 0.5 lx across the unobstructed area excluding the 0.5 m perimeter, with 40:1 across the area. The layout satisfying escape route 1 lx (the more demanding metric) usually also satisfies anti-panic, but area-wide verification must still be performed because the perimeter and uniformity geometries differ. In commissioning, the route is a lux-meter walk; anti-panic is a grid of measurements across the area.',
  },
  {
    id: 8,
    question: 'What rated DURATION applies to anti-panic open-area lighting under BS 5266-1:2025?',
    options: [
      '30 minutes, regardless of the building duration.',
      '8 hours, regardless of the building duration.',
      'Same as escape route in the same premises — typically 3 h non-domestic.',
      'Anti-panic lighting has no minimum duration.',
    ],
    correctAnswer: 2,
    explanation:
      'Duration is a property of the emergency installation as a whole, not a separate property of each functional category. Anti-panic and escape route share a duration because they share a battery / central system. The 3 h default for non-domestic premises applies to escape route, anti-panic, signage, and high-risk task lighting alike, with shorter durations (1 h or 2 h) only by exception with risk-assessment justification.',
  },
  {
    id: 9,
    question:
      'During mains failure, what happens to occupants in an unlit large open area BEFORE anti-panic lighting kicks in (within the 5 s response window)?',
    options: [
      'Nothing — vision is preserved by residual ambient light.',
      'Cone cells continue to operate normally in the dark.',
      'Vision is preserved by the emergency floor lighting only.',
      'Near-total darkness produces immediate disorientation while the eye is still light-adapted.',
    ],
    correctAnswer: 3,
    explanation:
      'The eye is light-adapted, operating from photopic vision via cone cells. Sudden darkness leaves cones non-functional, and rod cells (scotopic vision) require 20-30 minutes to fully dark-adapt — so in the first 5 s occupants effectively cannot see. Crowded spaces produce panic responses: pushing toward perceived exits, knocking down others, blocking doorways. The 5 s response time is a human-factors rule calibrated to interrupt this physiological and psychological cascade before the panic response fires — once panic starts in a crowd it is hard to interrupt.',
  },
  {
    id: 10,
    question:
      'A small bar with 8 occupants and a 25 m² floor area requests an emergency lighting design. What category(ies) apply?',
    options: [
      'Escape route lighting only — both anti-panic triggers fail at 25 m² and 8 occupants.',
      'No emergency lighting required — the premises is below all triggers.',
      'Anti-panic lighting is mandatory across the unobstructed area.',
      'High-risk task lighting at 15 lx is mandatory throughout.',
    ],
    correctAnswer: 0,
    explanation:
      'Escape route lighting applies at the exit door, change of direction, top/bottom of any stair, and along any defined escape route, plus signage at the exit. Anti-panic does NOT apply because both triggers fail: 25 m² < 60 m² AND 8 occupants ≤ 10 persons. Anti-panic is conditional — it applies above thresholds, not to all premises. Escape route lighting is unconditional wherever a defined escape route exists, in any non-domestic premises (and in common parts of multi-occupancy residential). As soon as either trigger fires (occupancy 11+, or area 60 m²+) anti-panic kicks in alongside it.',
  },
];

const EmergencyLightingModule2Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Open area (anti-panic) lighting | Emergency Lighting Module 2.2 | Elec-Mate',
    description:
      'BS EN 1838:2024 anti-panic open-area lighting: 0.5 lx minimum across unobstructed area excluding 0.5 m perimeter, 40:1 max uniformity, triggers > 60 m² area or > 10 occupants, 5 s response.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2"
            title="Open area (anti-panic) lighting"
            description="BS EN 1838:2024 anti-panic methodology: 0.5 lx minimum across the unobstructed area excluding a 0.5 m perimeter, 40:1 maximum uniformity, 5 s response time, triggered when unobstructed area exceeds 60 m² OR occupancy exceeds 10 persons. Independent of escape route lighting; both apply where both triggers fire."
            tone="yellow"
          />

          <TLDR
            points={[
              'Anti-panic open-area lighting prevents panic in large unobstructed spaces by giving occupants enough light to identify the direction of an escape route from anywhere in the space.',
              'BS EN 1838:2024: 0.5 lx minimum across the unobstructed area at floor level — half the escape route value because the function is orientation, not navigation.',
              'A 0.5 m perimeter band against walls and obstacles is EXCLUDED from the verification area. Distinct from escape route methodology (which has no perimeter exclusion).',
              'Maximum 40:1 max-to-min uniformity ratio across the unobstructed area — same numerical limit as escape route, applied across the area instead of along a route.',
              'Trigger: unobstructed area > 60 m² OR occupancy > 10 persons (either fires). Catches small high-occupancy rooms (meeting / training / waiting) and large low-occupancy rooms (warehouse / showroom).',
              'Response time: 50 % of rated illuminance within 5 s of mains failure; 100 % within 60 s. Same as escape route; tightens to 0.5 s only for high-risk task (§3).',
              'Independent of escape route lighting. Both apply concurrently in many spaces (open-plan office with diagonal route, shopfloor with central aisle); the layout must satisfy both.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS EN 1838:2024 illuminance, perimeter exclusion, uniformity, response-time and trigger criteria for anti-panic open-area lighting',
              'Distinguish anti-panic methodology (0.5 lx, area, perimeter exclusion) from escape route methodology (1 lx, route, no perimeter exclusion)',
              'Apply the dual trigger (> 60 m² area OR > 10 occupants) to identify where anti-panic lighting is mandatory',
              'Calculate the unobstructed area by excluding internal obstructions (fixtures, columns, plant) and the 0.5 m perimeter band',
              'Verify a layout against both anti-panic and escape route methodologies where both apply concurrently',
              'Explain why the 5 s response time is calibrated against the human dark-adaptation lag and panic-response physiology',
              'Identify high-risk small-room scenarios (meeting rooms, conference rooms, waiting areas with > 10 occupants) that trigger anti-panic despite their small footprint',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What anti-panic lighting is for</ContentEyebrow>

          <ConceptBlock
            title="Panic prevention through visual orientation"
            plainEnglish="Imagine standing in the middle of a 200 m² open-plan office when the lights go out. Total darkness for several seconds. The eye is light-adapted; cone cells stop responding; rod cells need 20-30 minutes to dark-adapt fully. In those first seconds, you cannot see the walls, the desks around you, the doorway, or the colleagues a metre away. The natural response is to move toward where you remember an exit was — but so is everyone else. Crowds compress at doorways. Panic emerges quickly because the disorientation is total. Anti-panic lighting interrupts this cascade by providing 0.5 lx within 5 seconds — enough to see the room layout, identify the exit direction, and walk toward it without colliding."
            onSite="Stand in the middle of the room with the meter at floor level and the mains off. If you cannot see the doorway clearly within 5 seconds, the design has failed even if the calculated value is compliant. The functional test is whether occupants can orient themselves; the lux figure is the proxy measure."
          >
            <p>What anti-panic lighting does NOT do:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>It does not light an escape route.</strong> Once the occupant has identified
                a route and started moving along it, escape route lighting (1 lx) takes over. The
                anti-panic 0.5 lx covers the gap before that — perception of layout, recognition of
                exit direction, initial movement.
              </li>
              <li>
                <strong>It does not enable safe machinery operation.</strong> Operators of hazardous
                equipment need the high-risk task lighting figure (15 lx, 0.5 s — see §3). 0.5 lx is
                well below the level required for shutting down a printing press.
              </li>
              <li>
                <strong>It does not produce comfortable seeing.</strong> 0.5 lx is barely above
                moonlight. Occupants can see shapes, recognise the room layout, identify doorways —
                they cannot read, work, or perform any visual task. Anti-panic is a survival floor,
                not a working level.
              </li>
              <li>
                <strong>It does not extend everywhere.</strong> Bounded by the unobstructed area;
                excludes the 0.5 m perimeter; excludes internal obstructions. The bounded area is
                what 0.5 lx covers, no more.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.1 (Open area / anti-panic lighting — illuminance)"
            clause={
              <>
                Open area (anti-panic) lighting shall provide a horizontal illuminance of not less
                than 0.5 lx across the unobstructed area, excluding a peripheral band of 0.5 m from
                the walls and obstacles. The maximum to minimum ratio of illuminance shall not
                exceed 40:1.
              </>
            }
            meaning="0.5 lx is the floor of the floor for open-area anti-panic. The 0.5 m perimeter exclusion and the 'unobstructed' qualifier are load-bearing — they define the geometry over which the 0.5 lx applies. Outside that geometry (within the perimeter, on top of fixtures, behind columns) the 0.5 lx rule is not verified."
          />

          <ConceptBlock
            title="The 0.5 m perimeter exclusion"
            plainEnglish="The verification area excludes a strip 0.5 m wide running along every wall and around every internal obstacle (column, partition, fixture). Two reasons. First, walls absorb light unevenly — corners, reveals, and nooks create dark patches that are hard to design for and not functionally critical because nobody is pressed against the wall during the panic phase. Second, the obstruction itself is not part of the floor that occupants can stand on, so verifying lux there is a category error. The 0.5 m strip is the engineering accommodation for these realities."
          >
            <p>How the perimeter exclusion plays out in design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Walls.</strong> A 0.5 m strip running along every wall is excluded. In a 10
                m × 8 m room, the verification area is 9 m × 7 m = 63 m² (not the gross 80 m²).
              </li>
              <li>
                <strong>Internal columns.</strong> A 0.5 m strip around each column is also
                excluded. A row of columns down the centre of an open office produces a series of
                small unilluminated zones around their perimeters.
              </li>
              <li>
                <strong>Fixed obstructions.</strong> Filing cabinets, server racks, manufacturing
                cells, partitions taller than waist height — each excluded along with their 0.5 m
                perimeter.
              </li>
              <li>
                <strong>Movable obstructions.</strong> Desks, chairs, free-standing equipment —
                generally NOT excluded because the layout could change. The verification area
                assumes the room could be cleared; the design must work whether the desks are there
                or not.
              </li>
              <li>
                <strong>Partitions below 1.5 m.</strong> Treated as not blocking emergency egress
                because occupants can see and step over them. Not excluded.
              </li>
            </ul>
            <p>
              The exclusion is for verification, not for emergency function. A luminaire near a wall
              still illuminates the wall and the perimeter band — that light is welcome. The
              exclusion just means the calculated minimum is verified excluding those zones; the
              light that does fall there is a bonus, not a requirement.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram: open area anti-panic with 0.5 lx field + 40:1 ratio + perimeter */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Open area anti-panic — 0.5 lx field, 0.5 m perimeter, 40:1 ratio
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="Plan view of an open area showing the 0.5 m perimeter exclusion band, internal column exclusion, unobstructed verification area, luminaire grid producing a uniform 0.5 lx field, and the 40:1 max-to-min ratio annotation."
            >
              <text
                x="410"
                y="24"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                OPEN AREA (ANTI-PANIC) — 0.5 lx MINIMUM across unobstructed area
              </text>
              <text x="410" y="40" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                BS EN 1838:2024 §5 · floor level · max 40:1 uniformity · 0.5 m perimeter excluded
              </text>

              <rect
                x="60"
                y="70"
                width="700"
                height="320"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.8"
              />
              <text x="410" y="88" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Open area room — gross 18 m × 8 m = 144 m² (triggers anti-panic at &gt; 60 m²)
              </text>

              <rect
                x="80"
                y="100"
                width="660"
                height="260"
                fill="none"
                stroke="rgba(239,68,68,0.55)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
              <text x="80" y="118" fill="#EF4444" fontSize="9" fontWeight="bold">
                0.5 m perimeter exclusion (excluded from verification)
              </text>

              <rect
                x="100"
                y="130"
                width="620"
                height="200"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.6)"
                strokeWidth="1.4"
              />
              <text
                x="410"
                y="146"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                Unobstructed verification area — 0.5 lx minimum applies here
              </text>

              <g>
                <rect x="380" y="220" width="22" height="22" fill="rgba(255,255,255,0.6)" />
                <rect
                  x="370"
                  y="210"
                  width="42"
                  height="42"
                  fill="none"
                  stroke="rgba(239,68,68,0.55)"
                  strokeWidth="1.2"
                  strokeDasharray="4,3"
                />
                <text x="391" y="270" textAnchor="middle" fill="rgba(239,68,68,0.85)" fontSize="9">
                  Column + 0.5 m
                </text>
              </g>

              {[150, 270, 390, 510, 630].map((cx) =>
                [180, 280].map((cy) => (
                  <g key={`grid-${cx}-${cy}`}>
                    {!(cx === 390 && cy === 280) && (
                      <>
                        <circle cx={cx} cy={cy} r="7" fill="rgba(251,191,36,0.95)" />
                        <circle cx={cx} cy={cy} r="14" fill="rgba(251,191,36,0.18)" />
                      </>
                    )}
                  </g>
                ))
              )}

              <rect
                x="105"
                y="135"
                width="610"
                height="190"
                fill="rgba(34,211,238,0.04)"
                stroke="none"
              />

              <g>
                <circle cx="150" cy="180" r="5" fill="#22D3EE" />
                <text x="155" y="174" fill="#22D3EE" fontSize="9">
                  E_max ≈ 12 lx (under luminaire)
                </text>
                <circle cx="450" cy="320" r="5" fill="#FBBF24" />
                <text x="460" y="324" fill="#FBBF24" fontSize="9">
                  E_min ≈ 0.55 lx (between luminaires)
                </text>
              </g>

              <g>
                <rect
                  x="60"
                  y="400"
                  width="700"
                  height="55"
                  rx="10"
                  fill="rgba(168,85,247,0.05)"
                  stroke="rgba(168,85,247,0.4)"
                  strokeWidth="1.4"
                />
                <text x="80" y="420" fill="#A855F7" fontSize="11" fontWeight="bold">
                  Trigger: unobstructed area &gt; 60 m² OR occupancy &gt; 10 — either fires.
                </text>
                <text x="80" y="438" fill="rgba(255,255,255,0.7)" fontSize="10">
                  Response: 50 % of rated illuminance within 5 s; 100 % within 60 s. Duration: 3 h
                  non-domestic default.
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The trigger — when anti-panic applies</ContentEyebrow>

          <ConceptBlock
            title="The dual trigger: area or occupancy"
            plainEnglish="Anti-panic open-area lighting is conditional. It is mandatory in an open area only when the unobstructed floor area exceeds 60 m² OR when occupancy exceeds 10 persons — whichever fires first. The dual trigger captures two different risk profiles. Large empty spaces (warehouses, showrooms, atriums) trigger on area: even a few occupants can lose orientation in a big dark space. Small crowded spaces (meeting rooms, conference rooms, waiting areas) trigger on occupancy: even in a small room, more than 10 disoriented people can produce a panic-crush response at the door."
          >
            <p>Worked examples of the trigger:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>80 m² open warehouse aisle, 3 occupants.</strong> Area trigger fires (80 m²
                &gt; 60 m²). Anti-panic mandatory.
              </li>
              <li>
                <strong>30 m² meeting room, 14 occupants.</strong> Occupancy trigger fires (14 &gt;
                10). Anti-panic mandatory in this small room.
              </li>
              <li>
                <strong>50 m² break room, 8 occupants.</strong> Both triggers below threshold.
                Anti-panic NOT required (escape route lighting still applies at exits and decision
                points, separately).
              </li>
              <li>
                <strong>200 m² showroom, 15 occupants.</strong> Both triggers fire. Anti-panic
                mandatory.
              </li>
              <li>
                <strong>Open-plan office 120 m², 20 occupants.</strong> Both fire. Anti-panic across
                the unobstructed area; escape route along the diagonal route to the exit. Both
                methodologies apply concurrently.
              </li>
              <li>
                <strong>Lecture theatre 200 m², 150 occupants.</strong> Both fire. Anti-panic
                applies to the central unobstructed walking space (between fixed seating); seating
                itself is the obstruction.
              </li>
            </ul>
            <p>
              The 60 m² figure is roughly an 8 m × 8 m room. The 10-occupant figure catches small
              meeting rooms that designers often miss because the area looks fine. Both triggers
              must be evaluated on every space — area alone is not enough.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.1 (Application of open area lighting)"
            clause={
              <>
                Open area (anti-panic) lighting shall be provided where the unobstructed area
                exceeds 60 m² or where the occupancy exceeds 10 persons, whichever applies first.
                Where the area is small but the occupancy is high, the occupancy trigger shall
                apply.
              </>
            }
            meaning="The 'whichever applies first' wording is decisive. EITHER trigger fires the requirement. The standard explicitly highlights the small-area / high-occupancy case to prevent designers missing it. Meeting rooms with 11+ occupants are anti-panic spaces under 1838:2024."
          />

          <CommonMistake
            title="Missing the occupancy trigger in small rooms"
            whatHappens="A designer specifies escape route lighting only at the exit door of a 28 m² conference room. Floor area is well below 60 m² so the designer concludes anti-panic does not apply. Occupancy capacity per the room booking system is 16 persons. The 10-occupant trigger fires and anti-panic 0.5 lx is required across the unobstructed area — but is absent. A real-world fire occurs, mains fails, 14 occupants in the room cannot orient themselves, panic-crush at the door. RRO investigation cites missing anti-panic provision."
            doInstead="Always evaluate both triggers. For every space, check unobstructed area AND occupancy capacity. Either &gt; 60 m² OR &gt; 10 persons fires the requirement. Where rooms have flexible occupancy, use the rated maximum capacity not the typical use."
          />

          <CommonMistake
            title="Treating fixed seating as 'unobstructed' area"
            whatHappens="A 300 m² lecture theatre has fixed bench seating across most of the floor with a central aisle of about 80 m². The designer applies anti-panic 0.5 lx to the gross 300 m² area. Lighting design comes back compliant on average but with the seating zones at 0.3 lx. The 'pass' is illusory because the seating is not unobstructed area; the 0.5 lx must apply to the central aisle (the unobstructed walking space) and any other clear circulation routes."
            doInstead="Identify the unobstructed area carefully. Fixed seating is an obstruction; occupants navigate the aisles between seats. Verify anti-panic 0.5 lx across those aisles and any open circulation areas — not across the seating itself. The seating zone is excluded along with its 0.5 m perimeter."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Uniformity and response time</ContentEyebrow>

          <ConceptBlock
            title="40:1 uniformity across the area"
            plainEnglish="Anti-panic uses the same 40:1 max-to-min ratio as escape route lighting, but applies it across the unobstructed area instead of along a route. Verified at multiple grid points. The brightest point in the area (typically directly under a luminaire) divided by the darkest point (typically between luminaires near the perimeter) must be 40:1 or less. Failing this ratio means the dark-adapted eye cannot accommodate the contrast between bright and dim zones during the 20-30 minute dark-adaptation window, and orientation is harder than it should be."
          >
            <p>How the area uniformity differs from route uniformity:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Geometry of measurement.</strong> Route uniformity is along the route,
                roughly one-dimensional. Area uniformity is across a two-dimensional grid.
                Verification typically uses a grid of measurement points (every 1-2 m).
              </li>
              <li>
                <strong>Bright spot location.</strong> Same — directly under each luminaire.
              </li>
              <li>
                <strong>Dark spot location.</strong> Different. Route minimum is between adjacent
                luminaires along the route. Area minimum is at the geometric centre of the
                furthest-from-luminaire zone — typically the corner of the unobstructed area, at or
                near the 0.5 m perimeter boundary.
              </li>
              <li>
                <strong>Spacing-to-mounting-height ratio.</strong> Modern LED practice keeps this
                under 1.5:1 to give comfortable area uniformity. A spacing-to-height ratio of 3:1
                will struggle to meet 40:1 across an area, even if it passes 40:1 along a route.
              </li>
              <li>
                <strong>Edge effects.</strong> Anti-panic verification at the 0.5 m perimeter
                boundary often gives the worst-case minimum because the room's far edge sees the
                least overlap from luminaires. Designers add perimeter luminaires to address this.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §5.3 (Open area lighting — response time and duration)"
            clause={
              <>
                The illuminance for open area lighting shall reach 50 % within 5 s and 100 % within
                60 s. The minimum duration shall be that determined for the building, not less than
                the duration applied to escape route lighting.
              </>
            }
            meaning="Response time identical to escape route — 5 s to half output, 60 s to full output. Duration ties to the building's overall emergency lighting duration (3 h default for non-domestic), which means anti-panic and escape route share batteries / central system in normal installations."
          />

          <ConceptBlock
            title="Why 5 s — the human factors basis"
            plainEnglish="The 5 s figure is not arbitrary engineering convention. It is calibrated against three physiological / psychological constraints. First, the dark-adaptation lag: cones (photopic vision) stop firing in darkness, rods (scotopic vision) take 20-30 minutes to fully adapt. In the first few seconds of total darkness, vision is essentially absent. Second, the panic-response cascade: in a crowd, disorientation triggers movement toward perceived exits, which compresses at doorways within 10-20 seconds, blocking egress. Third, the orientation window: humans can hold a mental picture of their immediate surroundings for 5-10 seconds before it degrades. The 5 s response interrupts the cascade BEFORE panic propagates and BEFORE the mental picture decays."
          >
            <p>Practical consequences of the 5 s rule:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Switchover hardware speed.</strong> Self-contained luminaires use a relay or
                solid-state switch that responds in milliseconds. Central battery systems respond in
                1-2 s typically. Both well within 5 s.
              </li>
              <li>
                <strong>Lamp warm-up.</strong> LED is effectively instant. Discharge lamps could
                take 10-30 s to full output (the 60 s allowance covered this in older
                installations). Modern installations are LED-only and the 5 s test is trivial to
                meet.
              </li>
              <li>
                <strong>Verification.</strong> BS EN 50172:2024 commissioning includes a stopwatch
                test of switchover. Routine monthly tests confirm switchover but do not always
                quantitatively measure to 5 s; annual tests do.
              </li>
              <li>
                <strong>The hidden failure.</strong> A luminaire whose switchover relay sticks
                (mechanical wear) may take 10-15 s instead of 1 s. Looks fine on monthly visual
                test, fails 5 s rule. Battery testing alone misses this — the relay timing has to be
                checked.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The open-plan office that fails uniformity"
            situation="An open-plan office is 25 m × 15 m (375 m²) with two internal columns. Anti-panic design uses 12 surface-mounted LED luminaires on a regular 4 × 3 grid. Lux calculation reports minimum 0.6 lx on the verification area, maximum 18 lx under each luminaire. The ratio is 30:1 — within 40:1. The design is approved. On commissioning, the lux meter reading at the corner near a column reads 0.35 lx — anti-panic minimum failed at that location. Investigation shows the column shadow combined with grid-edge falloff at that corner produces the dark spot."
            whatToDo="Two options. Option 1: add a perimeter luminaire near the affected corner to lift the minimum at that point above 0.5 lx. Option 2: re-pitch the grid so the corner falls between rows / columns of luminaires more centrally. Both options take the layout to compliance. Verify across the full grid after change. The lesson is that the 'passing' calculation needs verification at the worst-case point — typically near columns, partitions, and corners, where shadow effects produce dark zones the grid does not anticipate."
            whyItMatters="Calculations rely on idealised geometry. Real rooms have columns, alcoves, partitions, and other shadow generators that the calculation may not include. Commissioning verification at the actual worst-case points is where these compliance surprises surface. Always survey corners and obstruction zones explicitly."
          />

          <SectionRule />

          <ContentEyebrow>Anti-panic + escape route — when both apply</ContentEyebrow>

          <ConceptBlock
            title="Concurrent application"
            plainEnglish="Many spaces trigger both anti-panic and escape route methodologies — large enough or crowded enough to qualify as anti-panic, AND traversed by a defined escape route. Open-plan offices, shopfloors, lecture theatres, factories, transit concourses. In these cases both methodologies apply concurrently. Every point must satisfy both — escape route 1 lx along the route, anti-panic 0.5 lx across the unobstructed area excluding 0.5 m perimeter. The luminaire layout must produce both at once."
          >
            <p>How to satisfy both efficiently:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route is more demanding numerically.</strong> 1 lx is double 0.5 lx.
                A layout that produces 1 lx along the route generally produces 0.5 lx in the
                surrounding area as a side effect — provided the spacing is reasonably tight.
              </li>
              <li>
                <strong>Verification differs.</strong> Verify route compliance across the full width
                at floor level, with the BS EN 1838:2024 edge exclusions (outer 0.5 m on routes &gt;
                2 m, outer ¼ width on routes ≤ 2 m). Verify anti-panic compliance across the
                unobstructed area excluding the 0.5 m perimeter. Two different measurement
                geometries; one luminaire layout has to satisfy both.
              </li>
              <li>
                <strong>Uniformity figures share.</strong> Both 40:1. A layout that achieves 40:1
                along the route usually achieves 40:1 across the area at the same time, provided the
                spacing-to-height ratio is sensible.
              </li>
              <li>
                <strong>Mandatory locations apply from escape route.</strong> The mandatory
                luminaire locations from BS 5266-1:2025 §6 (exit doors, change of direction, top and
                bottom of stairs, etc.) carry through. Anti-panic does not relax these.
              </li>
              <li>
                <strong>The risk: designing for anti-panic alone.</strong> A layout designed for 0.5
                lx everywhere may fall to 0.6 lx along the route — passes anti-panic but fails
                escape route 1 lx. Always design for the more demanding metric where both apply.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <RegsCallout
            source="BS EN 1838:2024 · §5.4 (Interaction between escape route and anti-panic lighting)"
            clause={
              <>
                Where an escape route passes through an open area subject to anti-panic lighting,
                the requirements of §4 (escape route lighting) and §5 (open area lighting) shall
                both apply. Compliance with §4 along the route does not relieve the requirement to
                comply with §5 across the unobstructed area.
              </>
            }
            meaning="Both methodologies apply concurrently. The standard is explicit that compliance with one does not substitute for the other. Verify each independently at commissioning. A typical open-plan office requires verification along its main corridor (route) AND across its open desk area (anti-panic) as separate exercises."
          />

          <SectionRule />

          <ContentEyebrow>Edge cases and special spaces</ContentEyebrow>

          <ConceptBlock
            title="Spaces where the trigger is ambiguous"
            plainEnglish="Some spaces sit at the boundaries of the trigger criteria and need judgement. The pattern is to apply anti-panic methodology unless there is a positive reason not to — the additional luminaires are cheap, the safety upside is real, and any ambiguity at audit time is settled in the responsible person's favour by having applied the requirement."
          >
            <p>Common edge cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reception areas.</strong> Often around 30-50 m² with variable occupancy.
                Apply anti-panic if the rated occupancy reaches 11+ at any time, or if the
                unobstructed area exceeds 60 m². Reception desks and seating are obstructions; the
                walk-through area is the unobstructed component.
              </li>
              <li>
                <strong>Atriums and double-height spaces.</strong> Anti-panic applies on the floor
                level. Upper-level mezzanines are separate spaces with their own anti-panic
                evaluation.
              </li>
              <li>
                <strong>Stairwells.</strong> Stairwells are escape routes, not open areas. Escape
                route methodology applies; anti-panic does not (unless the stair landing is large
                enough to constitute an open area in its own right — uncommon).
              </li>
              <li>
                <strong>Toilets.</strong> Individual toilet cubicles below 8 m² are not open-area
                triggers. Larger washroom areas with multiple cubicles where the unobstructed
                walking area exceeds 8 m² require escape route lighting (per BS 5266-1:2025
                mandatory locations); anti-panic only if the open area trigger fires.
              </li>
              <li>
                <strong>Plant rooms and electrical switchrooms.</strong> Typically below 60 m² and
                low-occupancy; escape route lighting at the exit suffices. Larger plant rooms with
                regular human attendance may trigger anti-panic.
              </li>
              <li>
                <strong>Open external areas (covered car parks, loading bays).</strong> Treated as
                open areas for anti-panic if covered and forming part of the building's escape
                route. Verify on actual area used and occupancy.
              </li>
              <li>
                <strong>Mezzanine floors.</strong> Treated as a separate space from the main floor.
                Anti-panic evaluated separately on each mezzanine. Some mezzanines escape anti-panic
                by being below the area trigger and lightly occupied.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Confusing anti-panic with escape route in a hybrid space"
            whatHappens="An open-plan office has a single defined escape route running diagonally across the floor. The designer applies anti-panic 0.5 lx across the area but does NOT identify the diagonal as a separate escape route requiring 1 lx along its centre. Commissioning verifies 0.6 lx across the area — passes anti-panic. Along the diagonal route, the lux meter reads 0.7 lx — fails escape route 1 lx. Re-design needed; cost and delay."
            doInstead="Identify defined escape routes within open areas and treat them with escape route methodology (1 lx along centre / full width &gt; 2 m). The route is in addition to, not instead of, anti-panic across the surrounding area. Both methodologies apply concurrently."
          />

          <CommonMistake
            title="Forgetting the perimeter exclusion at commissioning"
            whatHappens="A commissioning engineer takes lux readings at every point in an anti-panic verification grid — including points 0.2 m from each wall. Several wall-adjacent points read below 0.5 lx. The engineer records non-compliance and the contractor is asked to add luminaires. In fact those points fall within the 0.5 m perimeter exclusion and should not have been measured against the 0.5 lx target. The actual minimum across the verification area (excluding perimeter) is 0.6 lx — compliant."
            doInstead="Mark the 0.5 m perimeter band on the floor plan before commissioning and exclude readings within it. The verification area is the body of the unobstructed area, not the gross room. Misapplying the rule produces false fails and unnecessary remediation."
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
              'Anti-panic open-area lighting prevents panic by giving occupants enough light to identify and reach an escape route. 0.5 lx minimum (BS EN 1838:2024 §5).',
              '0.5 m perimeter band against walls and obstacles is EXCLUDED from the verification area — distinct from escape route methodology which has no perimeter exclusion.',
              'Maximum 40:1 max-to-min uniformity ratio across the unobstructed area. Same numerical limit as escape route, applied across the area.',
              'Trigger: unobstructed area > 60 m² OR occupancy > 10 persons. Either fires. Catches small high-occupancy meeting / training rooms that designers commonly miss.',
              'Response time: 50 % of rated illuminance within 5 s of mains failure; 100 % within 60 s. Same as escape route. Calibrated against human dark-adaptation lag and panic-cascade timing.',
              'Independent of escape route lighting. Both apply concurrently in open-plan offices, shopfloors, lecture theatres — a single layout has to satisfy both metrics.',
              'Where escape route runs through an open area, escape route 1 lx along the route is ADDITIONAL to anti-panic 0.5 lx across the area. Compliance with one does not substitute for the other.',
              'Duration: same as the building emergency lighting duration (3 h non-domestic default, BS 5266-1:2025).',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Why is anti-panic 0.5 lx half of escape route 1 lx?',
                answer:
                  'Different functional purposes. Escape route lighting illuminates a defined path so occupants can follow it without tripping or losing the route — 1 lx is calibrated for navigation. Anti-panic lighting prevents panic in open spaces by giving occupants enough light to perceive layout and identify an exit direction — 0.5 lx is calibrated for orientation, which is a less demanding visual task than path-following. Once the occupant has identified a route and moved onto it, escape route lighting takes over.',
              },
              {
                question: 'Does anti-panic apply to a small storeroom with one occupant?',
                answer:
                  'No, both triggers fail. Below 60 m² area AND below 11 occupants — neither fires. Anti-panic methodology does not apply. Escape route lighting at the exit door applies (BS 5266-1:2025 mandatory location), but the anti-panic 0.5 lx area-wide rule does not.',
              },
              {
                question: 'What about a 12-occupant meeting room that is only 30 m²?',
                answer:
                  'Anti-panic IS triggered. The occupancy trigger (11+ persons) fires regardless of the area. The 30 m² area is small but does not exempt the room. Apply 0.5 lx across the unobstructed area excluding 0.5 m perimeter, with 40:1 uniformity. Designers regularly miss this case because the area looks "small enough not to matter".',
              },
              {
                question:
                  'How is the unobstructed area calculated when there are desks and partitions?',
                answer:
                  'Movable obstructions (desks, chairs, free-standing equipment) generally are NOT excluded — the design must work whether they are there or not. Fixed obstructions (columns, fixed partitions taller than waist height, server racks, manufacturing cells) ARE excluded along with their 0.5 m perimeter. The unobstructed area is the floor that occupants can walk on or stand on through a flexible layout, plus the 0.5 m perimeter exclusion against walls and fixed obstacles.',
              },
              {
                question: 'What if my anti-panic design verifies at 0.5 lx exactly — no margin?',
                answer:
                  'Technically compliant but operationally fragile. Battery degradation, luminaire ageing, lens soiling all reduce in-service output by 20-30 % over 3-5 years. A design at exactly 0.5 lx will fall below in service. Specify a target minimum of 0.7-1.0 lx in design to give margin, particularly across an area where the worst-case point is hard to predict precisely.',
              },
              {
                question: 'How is anti-panic verified at commissioning?',
                answer:
                  'Lux meter at floor level on a grid across the unobstructed area. Typical practice: 1 m or 2 m grid, depending on space size. Take readings at each grid point, plus targeted readings at columns, partition corners, and other expected dark spots. Maximum across the grid divided by minimum gives uniformity ratio. Any reading below 0.5 lx at a grid point inside the verification area fails minimum; any ratio over 40:1 fails uniformity. Record all readings and the calculation in the commissioning report.',
              },
              {
                question: 'Does anti-panic apply outside the building?',
                answer:
                  'Generally no — anti-panic is an inside-the-building concept where occupants might lose orientation. Outdoor areas (car parks, courtyards) usually have ambient light from the surroundings even in mains failure. Exception: covered external areas that form part of the escape route (covered loading bay, internal courtyard) — these may trigger anti-panic if their geometry meets the criteria. Treat case-by-case.',
              },
              {
                question:
                  'How does anti-panic interact with normal lighting controls (DALI, Casambi, lighting management)?',
                answer:
                  'Emergency function must operate independently of normal lighting controls. A maintained luminaire that is dimmed to 10 % for energy management during occupied hours must still come up to FULL emergency output on mains failure — the controls cannot constrain the emergency output. This is verified at commissioning via switchover test with the controls in their dimmest state. BS EN 50172:2024 requires this independence; modern emergency luminaires have hardwired emergency override that bypasses controls.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Open area (anti-panic) lighting — Module 2.2" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
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
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 High-risk task area
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

export default EmergencyLightingModule2Section2;
