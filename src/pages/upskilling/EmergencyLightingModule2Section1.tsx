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
    id: 'elm2-s1-floorlevel',
    question:
      'What is the minimum illuminance required at floor level on an escape route under BS EN 1838:2024?',
    options: [
      '0.5 lx — same as anti-panic open-area lighting.',
      '1 lx minimum across the FULL WIDTH of the escape route at floor level, with edge exclusions: outer 0.5 m on routes wider than 2 m, outer ¼ width on routes 2 m or narrower. The 2013 centre-line + central-band wording is superseded.',
      '5 lx — same as fire equipment vertical illuminance.',
      '15 lx — same as high-risk task area.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 1838:2024 puts the 1 lx minimum across the FULL width of the escape route at floor level (with permitted edge exclusions). The figure is calibrated for safe walking pace evacuation by occupants who may be unfamiliar with the building, in low-smoke conditions, with the eye dark-adapted. The 2013 centre-line + 2 m central-band wording is superseded.',
  },
  {
    id: 'elm2-s1-fullwidth',
    question:
      'BS EN 1838:2024 changed how illuminance is verified on escape routes. What is the 2024 requirement?',
    options: [
      'Still measured only on the centre line.',
      'Verified across the FULL WIDTH of the route at floor level, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m). The 2013 centre-line + central-band wording is superseded. The change reflects how people actually walk — spreading across the usable width, particularly when crowded.',
      'Now measured only at the wall edges.',
      'Reduced to 0.5 lx for wider routes.',
    ],
    correctIndex: 1,
    explanation:
      'The 2024 update replaced the 2013 centre-line + central-band approach with a full-width 1 lx rule and explicit edge exclusions. Designers now have to ensure 1 lx is met across the whole walkway within the non-excluded boundary. The earlier wording allowed the edges to fall to 0.5 lx; the 2024 rule closes that gap.',
  },
  {
    id: 'elm2-s1-uniformity',
    question:
      'What is the maximum allowable max-to-min uniformity ratio along an escape route under BS EN 1838:2024?',
    options: [
      '10:1.',
      '40:1 maximum ratio of brightest point to darkest point along the route. Beyond 40:1 the eye cannot adapt rapidly enough as the occupant walks from a bright zone to a dark zone, producing temporary blindness. The ratio is measured along the length of the route within the non-excluded width.',
      '100:1.',
      'No limit — only the minimum matters.',
    ],
    correctIndex: 1,
    explanation:
      'The 40:1 ratio limits glare-to-shadow contrast along the escape path. If a luminaire produces 50 lx directly underneath but the route falls to 0.5 lx between luminaires, the ratio is 100:1 and the design fails — occupants pass through bright then dark zones, the dark-adapted eye is repeatedly bleached, and effective vision is worse than uniform low light.',
  },
  {
    id: 'elm2-s1-responsetime',
    question:
      'Within how many seconds of mains failure must escape route lighting reach 50 % of its required illuminance, per BS EN 1838:2024?',
    options: [
      '0.5 s.',
      '5 s — 50 % of rated illuminance must be available within 5 seconds, with full rated illuminance available within 60 seconds at the latest. The 5 s figure is the response-time baseline for general escape route lighting and anti-panic lighting; high-risk task lighting tightens this to 0.5 s because of the safety consequences of operating machinery in darkness.',
      '15 s.',
      '60 s.',
    ],
    correctIndex: 1,
    explanation:
      'The two-stage response — 50 % within 5 s, 100 % within 60 s — accommodates technologies that take a brief warm-up to reach full output (e.g. some discharge lamps) while ensuring the route is usable almost immediately. LED systems typically achieve 100 % within milliseconds and the 60 s allowance is rarely consumed in modern installations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new BS 5266-1:2025 design office wants escape route lighting in a 1.6 m wide corridor. What minimum illuminance is required and where is it measured?',
    options: [
      '0.5 lx anywhere on the floor.',
      '1 lx minimum, measured at floor level across the FULL WIDTH of the corridor with the outer ¼ width each side excluded (because the route is ≤ 2 m wide). The 1 lx figure is the BS EN 1838:2024 baseline for escape routes; the 2013 centre-line + central-band wording is superseded. Floor-level measurement is specified because the eye is looking down at trip hazards and walking surface as much as forward; floor illuminance is what governs safe passage.',
      '5 lx vertical at the walls.',
      '15 lx everywhere.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 §4.2 — escape route lighting minimum 1 lx across the full width at floor level, with edge exclusions (outer ¼ width each side on routes ≤ 2 m). The figure is the lower bound; designers usually target 1.5-2 lx to give margin against luminaire ageing, soiling, and battery depletion at end of duration.',
  },
  {
    id: 2,
    question:
      'A wide foyer that forms part of an escape route widens from 1.5 m at one end to 4 m at the other. How does BS EN 1838:2024 require illuminance to be verified along the foyer?',
    options: [
      'Centre line throughout.',
      'Full width with edge exclusions throughout — outer ¼ width each side excluded in the 1.5 m section; outer 0.5 m each side excluded in any portion that exceeds 2 m. The 2024 rule replaces the 2013 centre-line + central-band wording. Either way the 1 lx minimum has to be met across the whole non-excluded width.',
      'Only at the doorways.',
      'Only at the perimeter.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2024 change closes a defect in the 2013 wording. Under BS EN 1838:2013 the rule was 1 lx on the centre line + 0.5 lx on a 2 m central band, leaving edges dim. People walk along the edges, not just the centre, particularly in crowds. The 2024 full-width rule (with edge exclusions) matches how the route is actually used.',
  },
  {
    id: 3,
    question:
      'What is the maximum allowable max-to-min uniformity ratio along an escape route?',
    options: [
      '10:1.',
      '40:1 — the brightest point along the route may be no more than 40 times the darkest point. Beyond 40:1 the dark-adapted eye cannot keep up as the occupant walks from bright zones into dark zones; the bright zones bleach the rods and the dark zones become invisible until the eye recovers. The ratio is measured along the length of the route (longitudinally) within the non-excluded width.',
      '100:1.',
      'No limit.',
    ],
    correctAnswer: 1,
    explanation:
      'The 40:1 cap is a glare-versus-shadow rule. It is satisfied through luminaire spacing — the closer the spacing, the lower the ratio. Designers typically achieve 10:1 or 20:1 in modern LED installations; 40:1 is the absolute permissible limit, not the design target.',
  },
  {
    id: 4,
    question:
      'How fast must escape route lighting reach 50 % of its rated illuminance after mains failure, per BS EN 1838:2024?',
    options: [
      '0.5 s — same as high-risk task lighting.',
      '5 seconds maximum to 50 % of rated illuminance, with full rated illuminance achieved within 60 seconds. The 5 s figure ensures the route is usable almost immediately; the 60 s allowance accommodates discharge-lamp warm-up. LED systems normally meet both figures within milliseconds. The 5 s rule is the GENERAL response time; high-risk task lighting tightens this to 0.5 s because operators may be controlling machinery.',
      '15 s.',
      '60 s.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 §4.3 — escape route lighting response time: 50 % within 5 s, 100 % within 60 s. The split timing is a legacy of mixed-technology installations; modern LED is effectively instant on switchover.',
  },
  {
    id: 5,
    question:
      'What rated DURATION is BS 5266-1:2025 standard for escape route lighting in a non-domestic premises (e.g. office, shop, industrial)?',
    options: [
      '30 minutes.',
      '3 hours — the standard non-domestic figure. Shorter durations (1 h or 2 h) are permitted in specific limited circumstances under BS 5266-1:2025 (e.g. small premises with simple escape routes, with the duration justified by risk assessment) but 3 h is the default expectation. The duration represents the minimum time the system must hold the rated illuminance after mains failure, allowing for safe evacuation, fire-fighting and re-entry.',
      '8 hours.',
      '24 hours.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 retains 3 h as the standard duration for most non-domestic escape route lighting. Shorter durations are an exception that has to be justified, not the default. Note: rated duration is what the system delivers at end of life and after temperature derating, not the brand-new manufacturer figure.',
  },
  {
    id: 6,
    question: 'Where in an escape route does the 1 lx minimum NOT apply?',
    options: [
      'On staircases.',
      'Within an outer edge strip on each side of the route — outer 0.5 m on routes wider than 2 m, outer ¼ width on routes 2 m or narrower. These edge exclusions are part of the BS EN 1838:2024 escape-route methodology. Anti-panic open-area lighting uses a different 0.5 m perimeter exclusion against walls and obstacles for its 0.5 lx average; the two methodologies are separate.',
      'On the floor.',
      'At doorways.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 explicitly permits an outer edge strip on each side of the escape route to be excluded from the 1 lx check — 0.5 m on routes > 2 m, ¼ width on routes ≤ 2 m. Anti-panic methodology (§4.3) uses its own 0.5 m perimeter exclusion for the 0.5 lx open-area average. Mixing the two is a common design error.',
  },
  {
    id: 7,
    question:
      'A landlord asks for escape route lighting on a domestic block of flats internal corridor. How does BS 5266-1:2025 treat this corridor?',
    options: [
      'Domestic — exempt from BS 5266-1.',
      'Common parts of multi-occupancy residential premises (block of flats) ARE in scope of BS 5266-1:2025. The internal common corridor that serves multiple dwellings is the means of escape from those dwellings; it requires escape route lighting to BS EN 1838 illuminance levels. The exemption from BS 5266 covers single dwellings (house, flat treated as single residence) — but the COMMON PARTS of a block of flats are non-domestic for emergency lighting purposes.',
      'Only one luminaire required regardless of layout.',
      'Maintained lighting only — non-maintained not permitted.',
    ],
    correctAnswer: 1,
    explanation:
      'A surprising number of designers treat blocks of flats as "domestic" for emergency lighting and therefore exempt. They are not — the common corridor, lobby, staircase, and any shared escape route are non-domestic for BS 5266 purposes. The single dwelling within a flat is exempt; the common parts are not.',
  },
  {
    id: 8,
    question:
      'An escape route corridor in an office is 3.2 m wide. Anti-panic lighting is also being designed. What does BS EN 1838:2024 require?',
    options: [
      'Only escape route lighting — anti-panic does not apply to corridors.',
      'Both apply. Escape route methodology requires 1 lx full width with the outer 0.5 m each side excluded (because the corridor exceeds 2 m). Anti-panic methodology applies because the unobstructed area exceeds 60 m² OR the occupancy exceeds 10 (whichever triggers first). The anti-panic 0.5 lx requirement is verified across the unobstructed area excluding the 0.5 m perimeter. Designers usually combine both into a single luminaire layout that satisfies the more demanding metric at every point.',
      'Anti-panic only — escape route superseded by anti-panic in wide spaces.',
      '15 lx high-risk task lighting required.',
    ],
    correctAnswer: 1,
    explanation:
      'A wide corridor that is also a large unobstructed area triggers both the escape route AND the anti-panic functional categories. The design must satisfy both. In practice this rarely produces a conflict — escape route 1 lx is more demanding than anti-panic 0.5 lx, so a layout that meets escape route across the width also meets anti-panic.',
  },
  {
    id: 9,
    question:
      'Which luminaire failure mode is the dominant cause of in-service escape route lighting non-compliance, in surveys conducted under BS 5266-1?',
    options: [
      'Bulb life.',
      'Battery degradation — the rated 3 h duration falls below the requirement after 3-5 years of normal cycling, well before any visible defect appears. The luminaire still illuminates briefly on test but cannot sustain the rated duration. Daily/monthly visual checks miss this; only the annual full-duration discharge test catches it. This is why BS 5266-1:2025 retains the annual 3 h test as a non-negotiable maintenance requirement.',
      'Corrosion of the housing.',
      'Lens yellowing.',
    ],
    correctAnswer: 1,
    explanation:
      'NiCd and NiMH batteries lose capacity through cycling and ageing. A luminaire that was compliant when commissioned may be at 50 % capacity by year 4. The monthly switch-on test confirms the luminaire still lights up; only the annual full-discharge test confirms it still holds the duration. The annual test is the load-bearing maintenance check.',
  },
  {
    id: 10,
    question:
      'Under BS 5266-1:2025 risk assessment, when may the duration of escape route lighting be reduced from 3 h to 1 h?',
    options: [
      'Always — 1 h is the new default.',
      'Only by exception, justified by risk assessment, in small simple premises where evacuation is rapid (low occupancy, short routes, single floor) AND the building is normally unoccupied at night AND re-entry is not required. The risk assessment must document the basis for the reduced duration, and the figure is recorded in the logbook. The 3 h default applies in the absence of such justification — designers cannot simply choose 1 h to save battery cost.',
      'Whenever the premises has a sprinkler system.',
      'Whenever the premises has under 50 people.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 retains 3 h as the default and treats reductions as exceptions requiring documented justification. The risk-assessment-led approach prevents both over-engineering (everywhere defaulting to 8 h) and under-engineering (everywhere dropping to 1 h on cost grounds). The duration must match the evacuation profile of the building.',
  },
];

const EmergencyLightingModule2Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Escape route lighting | Emergency Lighting Module 2.1 | Elec-Mate',
    description:
      'BS EN 1838:2024 escape route lighting: 1 lx across the full width at floor level (with edge exclusions), 40:1 max uniformity, 5 s response to 50 % of rated illuminance, 3 h standard duration.',
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
            eyebrow="Module 2 · Section 1"
            title="Emergency escape route lighting"
            description="The first and most familiar functional category of emergency lighting. Defined by BS EN 1838:2024 as illumination of escape routes for safe evacuation: 1 lx minimum across the full width at floor level (with edge exclusions: outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m), 40:1 maximum uniformity ratio, 5 second response to 50 % of rated illuminance, 3 hour standard duration."
            tone="yellow"
          />

          <TLDR
            points={[
              'Escape route lighting illuminates the defined evacuation route from any occupied point to a final exit, allowing safe walking pace under mains failure.',
              'BS EN 1838:2024 baseline: 1 lx minimum across the FULL WIDTH at floor level, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m). The 2013 centre-line + central-band wording is superseded.',
              'Maximum max-to-min uniformity ratio 40:1 along the route — limits glare-to-shadow contrast that would otherwise overwhelm the dark-adapted eye.',
              'Response time: 50 % of rated illuminance within 5 s of mains failure; 100 % within 60 s. (High-risk task lighting tightens this to 0.5 s — see §3.)',
              'Standard rated duration: 3 hours for non-domestic premises under BS 5266-1:2025. Shorter durations (1 h, 2 h) by exception with documented risk-assessment justification.',
              'Anti-panic lighting (§2) applies in addition where corridors widen beyond 2 m and the unobstructed area exceeds 60 m² or 10 occupants.',
              'Common parts of blocks of flats ARE in scope; only the single dwelling itself is exempt.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS EN 1838:2024 illuminance, uniformity, response-time and duration requirements for escape route lighting',
              'Apply the BS EN 1838:2024 full-width 1 lx rule with the correct edge exclusions (0.5 m on routes > 2 m, ¼ width on routes ≤ 2 m)',
              'Calculate maximum permissible max-to-min uniformity ratio (40:1) and explain why it limits glare-to-shadow contrast',
              'Identify when both escape-route and anti-panic methodologies apply to the same area, and how the design satisfies both',
              'Distinguish escape route lighting (1 lx, route geometry) from open-area anti-panic lighting (0.5 lx, area geometry)',
              'Justify the 3 h standard duration under BS 5266-1:2025 and the conditions under which a shorter duration may be agreed',
              'Recognise battery degradation as the dominant in-service failure mode and explain why annual full-duration testing is the load-bearing check',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What escape route lighting is for</ContentEyebrow>

          <ConceptBlock
            title="The functional purpose"
            plainEnglish="Escape route lighting answers a single, specific question: when the mains fails, can occupants walk safely from where they are to a final exit at normal walking pace, in low-smoke conditions, with their eyes dark-adapted? The 1 lx figure is calibrated to 'yes' for that question — it is the floor-level illuminance at which an unfamiliar occupant can identify trip hazards, see the floor surface clearly, and follow the escape route by visible cues (signage, walking surface, doorways). It is NOT a comfort level; it is a survival floor."
            onSite="On a survey, walk the route at normal pace with the lights off. If you cannot see your feet, the floor edge, or the next direction marker clearly, the design is wrong even if the lux meter reads compliant. The numbers are derived from human visual performance — the visual performance is the actual test."
          >
            <p>The functional category sits in a hierarchy of three:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route lighting</strong> (this section) — illuminate the path from
                anywhere in the building to a final exit. 1 lx minimum on the route. Geometry: the
                route itself.
              </li>
              <li>
                <strong>Open-area (anti-panic) lighting</strong> (§2) — prevent panic in large
                unobstructed spaces by giving occupants enough light to identify the direction of an
                escape route. 0.5 lx minimum across the unobstructed area. Geometry: the area
                excluding a 0.5 m perimeter.
              </li>
              <li>
                <strong>High-risk task area lighting</strong> (§3) — allow safe shutdown of
                hazardous processes (machinery, hot processes, lifts mid-cycle) before evacuation.
                15 lx minimum. Geometry: the working plane at the task.
              </li>
            </ul>
            <p>
              The three categories are independent functional answers to three distinct questions.
              A single area can fall into one, two, or all three categories simultaneously, and
              must satisfy each applicable category at every point. A wide corridor with operating
              machinery is escape route AND anti-panic AND high-risk task at the same time, and
              the layout must meet 1 lx on the route, 0.5 lx across the unobstructed area, AND 15
              lx at the machinery — typically achieved by mixing general escape lighting with
              dedicated task luminaires.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.2 (Emergency escape route lighting — illuminance)"
            clause={
              <>
                The horizontal illuminance at floor level on the escape route shall be not less
                than 1 lx across the full width of the route. For escape routes wider than 2 m, an
                outer border of 0.5 m on each side may be excluded. For escape routes of 2 m width
                or less, an outer border of one quarter of the route width on each side may be
                excluded.
              </>
            }
            meaning="1 lx is the floor of the floor — the absolute minimum, applied across the FULL width of the escape route at floor level (with the permitted edge exclusions). The 2024 change supersedes the 2013 centre-line + central-band wording. Edges within the non-excluded boundary must now achieve 1 lx, not 0.5 lx."
          />

          <ConceptBlock
            title="Full width with edge exclusions — the 2024 rule"
            plainEnglish={`Up to BS EN 1838:2013 the rule was 1 lx on the centre line plus 0.5 lx across a 2 m central band — wider foyers were lit by aiming luminaires at the centre and accepting falloff at the edges. The 2024 update replaced this with a full-width 1 lx rule and explicit edge exclusions. The standard recognised that people don't walk down the centre line — they spread across the route, particularly in crowds during evacuation. A foyer where the centre reads 2 lx but the edges read 0.3 lx fails real-world evacuation even if it passed the old test.`}
          >
            <p>What this means in practice for design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Routes wider than 2 m</strong> — 1 lx full width at floor level, with an
                outer 0.5 m strip on each side excluded. The non-excluded width must achieve 1 lx
                throughout, not just on a single centre line.
              </li>
              <li>
                <strong>Routes 2 m wide or narrower</strong> — 1 lx full width at floor level, with
                an outer ¼ width on each side excluded. A 1.6 m corridor excludes 0.4 m each side
                and the central 0.8 m must achieve 1 lx.
              </li>
              <li>
                <strong>Routes that vary in width</strong> — typical in foyers, stair landings, and
                concourses. Each section uses the exclusion appropriate to its width. A corridor
                that widens from 1.5 m to 4 m in a foyer uses ¼ width exclusions at the narrow end
                and 0.5 m exclusions at the wide end.
              </li>
              <li>
                <strong>The 1 lx target is unchanged.</strong> The 2024 update did not raise the
                target — it widened where the target must be met and superseded the 2013
                centre-line + central-band wording.
              </li>
            </ul>
            <p>
              This is the single most-missed change in BS EN 1838:2024. Designs based on the 2013
              wording often retain the centre-line-only assumption and fail verification on first
              commissioning. Reverify older designs under the new rule before recertification.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram: 1 lx coverage with luminaire spacing */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Escape route — 1 lx coverage with typical luminaire spacing
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="Plan view of an escape route corridor showing luminaire spacing producing a uniform 1 lx minimum across the full width. Annotations show 1 lx isoline, 40:1 uniformity ratio, and the 2024 full-width rule with edge exclusions."
            >
              {/* Title strip */}
              <text x="410" y="24" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="bold">
                ESCAPE ROUTE — 1 lx MINIMUM across full width
              </text>
              <text x="410" y="40" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                BS EN 1838:2024 §4.2 · floor level · max 40:1 uniformity
              </text>

              {/* Corridor outline (narrow section) */}
              <rect
                x="60"
                y="80"
                width="320"
                height="120"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text x="220" y="74" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Corridor — 1.6 m wide (≤ 2 m)
              </text>
              <text x="220" y="216" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                Rule: 1 lx full width at floor level (¼ width edge excl.)
              </text>

              {/* Reference line (geometric centre — illustrative only) */}
              <line
                x1="60"
                y1="140"
                x2="380"
                y2="140"
                stroke="#FBBF24"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* Luminaires on narrow section */}
              {[100, 180, 260, 340].map((cx) => (
                <g key={`narrow-${cx}`}>
                  <circle cx={cx} cy="100" r="8" fill="rgba(251,191,36,0.95)" />
                  <circle cx={cx} cy="100" r="14" fill="rgba(251,191,36,0.18)" />
                  <text x={cx} y="92" textAnchor="middle" fill="rgba(0,0,0,0.85)" fontSize="9" fontWeight="bold">
                    L
                  </text>
                </g>
              ))}

              {/* Iso 1 lx contour (visualised as wavy band across the route) */}
              <path
                d="M 60 140 Q 100 132 140 140 Q 180 148 220 140 Q 260 132 300 140 Q 340 148 380 140"
                fill="none"
                stroke="rgba(34,211,238,0.65)"
                strokeWidth="1.4"
              />
              <text x="200" y="160" textAnchor="middle" fill="#22D3EE" fontSize="9">
                1 lx isoline at floor (within non-excluded width)
              </text>

              {/* Wide section (4 m foyer) */}
              <rect
                x="440"
                y="80"
                width="320"
                height="200"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text x="600" y="74" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Foyer — 4 m wide (&gt; 2 m)
              </text>
              <text x="600" y="296" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                Rule (2024): 1 lx FULL WIDTH at floor level
              </text>

              {/* Luminaire grid on foyer (more dense, full-width) */}
              {[480, 560, 640, 720].map((cx) =>
                [120, 180, 240].map((cy) => (
                  <g key={`foyer-${cx}-${cy}`}>
                    <circle cx={cx} cy={cy} r="7" fill="rgba(251,191,36,0.9)" />
                    <circle cx={cx} cy={cy} r="11" fill="rgba(251,191,36,0.15)" />
                  </g>
                ))
              )}

              {/* Full-width coverage band */}
              <rect
                x="445"
                y="105"
                width="310"
                height="170"
                fill="rgba(34,211,238,0.05)"
                stroke="rgba(34,211,238,0.55)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="600" y="270" textAnchor="middle" fill="#22D3EE" fontSize="9">
                1 lx coverage across full width
              </text>

              {/* Uniformity legend */}
              <g>
                <rect
                  x="60"
                  y="320"
                  width="700"
                  height="120"
                  rx="10"
                  fill="rgba(168,85,247,0.05)"
                  stroke="rgba(168,85,247,0.4)"
                  strokeWidth="1.4"
                />
                <text x="80" y="344" fill="#A855F7" fontSize="11" fontWeight="bold">
                  Uniformity rule — max 40:1 ratio along the route
                </text>
                <text x="80" y="364" fill="rgba(255,255,255,0.7)" fontSize="10">
                  E_max ÷ E_min ≤ 40 measured along the route within the non-excluded width.
                </text>
                <text x="80" y="382" fill="rgba(255,255,255,0.7)" fontSize="10">
                  Closer luminaire spacing reduces ratio. Modern LED installations typically achieve 10:1.
                </text>
                <text x="80" y="402" fill="rgba(255,255,255,0.7)" fontSize="10">
                  Response time: 50 % of rated illuminance within 5 s of mains failure;
                </text>
                <text x="80" y="420" fill="rgba(255,255,255,0.7)" fontSize="10">
                  100 % within 60 s. Duration: 3 h standard for non-domestic premises (BS 5266-1:2025).
                </text>
              </g>
            </svg>
          </div>

          <RegsCallout
            source="BS EN 1838:2024 · §4.3 (Response time)"
            clause={
              <>
                Emergency escape route lighting shall provide 50 % of the required illuminance
                within 5 s and the full required illuminance within 60 s. The duration shall be
                appropriate to the time required for safe evacuation and shall be at least 1 h.
              </>
            }
            meaning="Two-stage response. Half-output within 5 s ensures the route is usable almost immediately on mains failure. Full output within 60 s accommodates discharge-lamp warm-up. LED systems achieve both within milliseconds; the 60 s allowance is rarely consumed in modern installations."
          />

          <SectionRule />

          <ContentEyebrow>Geometry of the route — what 1 lx covers</ContentEyebrow>

          <ConceptBlock
            title="The defined route width"
            plainEnglish="Escape route lighting verifies illuminance on the defined route — not on the floor in general. The 'defined route' is the corridor, staircase, ramp, or doorway that forms the means of escape, with its width set by the building geometry, occupancy capacity, and Approved Document B. A 1.6 m corridor between fire compartments is a 1.6 m route. A 4 m foyer that the route passes through is a 4 m route. The verification width matches the route width, not the room width."
          >
            <p>Specific route geometries and their verification:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Straight corridor ≤ 2 m wide.</strong> 1 lx full width at floor level,
                with the outer ¼ width on each side excluded. One row of luminaires down the
                middle is the typical solution; spacing must hold the central half of the corridor
                at 1 lx, with 40:1 uniformity along the route.
              </li>
              <li>
                <strong>Straight corridor &gt; 2 m wide.</strong> 1 lx full width at floor level,
                with the outer 0.5 m on each side excluded. Two rows of luminaires, or a grid
                layout matching anti-panic methodology, deliver the wider coverage.
              </li>
              <li>
                <strong>Staircase.</strong> 1 lx full width on each flight, with attention to the
                first and last tread (highest accident risk). BS 5266-1:2025 specifies dedicated
                luminaires within 2 m of each top and bottom tread. The route width on a stair is
                the going (depth) of each tread; verification at floor level means at tread
                level, not landing level.
              </li>
              <li>
                <strong>Doorway / threshold.</strong> 1 lx must be maintained at the door
                threshold. A door positioned between two luminaires falls in the dimmest part of
                the design — verify specifically at the threshold, not just at the luminaire
                positions.
              </li>
              <li>
                <strong>Direction change (corner, junction).</strong> Each branch of the junction
                is a separate route in its own right. Each is verified to 1 lx full width with
                the appropriate edge exclusion. Junctions are also high-uniformity-ratio risk
                because two illuminance patterns superimpose; verify the corner specifically.
              </li>
              <li>
                <strong>Ramp.</strong> Same rules as corridor of equivalent width. The slope itself
                does not change the 1 lx floor-level requirement; the floor follows the slope.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §5 (Design objectives) and §6 (Locations to be illuminated)"
            clause={
              <>
                Emergency escape lighting shall be provided at all defined points of the means of
                escape, including changes of direction, intersections, exit doors, near each
                staircase and on each landing, in lift cars, near each fire alarm call point, near
                each first aid post and near each piece of fire-fighting equipment.
              </>
            }
            meaning="The points where luminaires are mandatory are not optional. They reflect the high-risk locations during evacuation: where direction is being chosen, where steps could be missed, where occupants are stationary at equipment. This is a layout rule, not just an illuminance rule."
          />

          <ConceptBlock
            title="Mandatory luminaire locations under BS 5266-1:2025"
            plainEnglish="Beyond the lux numbers, BS 5266-1:2025 lists specific points where a luminaire MUST be placed regardless of how the illuminance maths comes out. These are the high-decision, high-stumble points — places where an under-illuminated patch causes accidents, even if the average is compliant."
          >
            <p>The mandatory locations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>At each exit door</strong> intended to be used in an emergency.
              </li>
              <li>
                <strong>Near each staircase</strong> — within 2 m horizontally of the top and
                bottom of every flight, so each tread is directly illuminated.
              </li>
              <li>
                <strong>At each change of direction</strong> — corners, junctions, T-pieces. The
                point at which the occupant has to choose a direction.
              </li>
              <li>
                <strong>At each intersection</strong> of corridors.
              </li>
              <li>
                <strong>Outside each final exit</strong> and within 2 m of it externally — to
                prevent occupants stepping from a lit interior into a dark exterior.
              </li>
              <li>
                <strong>Near each first-aid post</strong> and where signage / call points / fire
                equipment are located (these also trigger the 5 lx vertical rule — see §5).
              </li>
              <li>
                <strong>In every lift car</strong> — occupants who are in the lift at mains failure
                need the car illuminated to operate the alarm and exit when the car is recovered.
              </li>
              <li>
                <strong>In moving stairs and walkways</strong> — escalators, travelators that form
                part of the escape route.
              </li>
              <li>
                <strong>In toilet facilities exceeding 8 m²</strong> and any toilet for disabled
                people (occupants in cubicles need to find their way out).
              </li>
            </ul>
            <p>
              These are placements rather than lux levels. A luminaire is required at each of these
              points whether or not the illuminance from neighbouring luminaires would otherwise be
              compliant. The placement itself is the regulation.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Uniformity — the 40:1 ratio</ContentEyebrow>

          <ConceptBlock
            title="Why uniformity matters as much as minimum"
            plainEnglish="A meter reading 1 lx everywhere is not the same as a meter reading 1 lx in some places and 100 lx in others, even though both 'pass' the minimum. The dark-adapted human eye works on a slow chemical adaptation; bright-then-dark transitions bleach the retinal photopigments and produce temporary blindness lasting tens of seconds. An evacuation through a route with bright spots and dark gaps is genuinely worse than one through uniformly low light, because the dark gaps become invisible after each bright spot. The 40:1 ratio caps this contrast."
          >
            <p>How the 40:1 ratio works in design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The ratio is longitudinal.</strong> Measured along the route — bright
                point under a luminaire vs darkest point between luminaires. NOT measured between
                rooms or between floors.
              </li>
              <li>
                <strong>Spacing controls the ratio.</strong> Closer luminaire spacing produces
                higher minimum (more overlap between adjacent illuminance patterns) and lower
                maximum (no single luminaire dominates), reducing the ratio.
              </li>
              <li>
                <strong>Mounting height controls the maximum.</strong> A luminaire mounted lower
                produces higher peak directly underneath it. Higher mounting smooths the maximum
                but reduces the minimum elsewhere; designers balance both.
              </li>
              <li>
                <strong>Lumen output controls the minimum.</strong> A higher-output luminaire
                produces higher minimum at the same spacing, but also higher maximum — the ratio
                does not improve unless spacing is also reduced.
              </li>
              <li>
                <strong>Modern LED practice</strong> typically achieves 10:1 or better. The 40:1
                figure is the absolute permissible limit, not the design target. A lighting
                calculation that comes back at 35:1 is technically compliant but is a sign the
                spacing is too generous; the layout is one luminaire failure away from a 50:1
                non-compliance.
              </li>
            </ul>
            <p>
              In commissioning, take spot lux readings at the brightest and darkest points along
              each route (under a luminaire and between luminaires) and confirm the ratio.
              Software simulations are usually accurate but commissioning verification catches
              real-world deviations from the model.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.4 (Uniformity)"
            clause={
              <>
                Along the length of the escape route within the non-excluded width, the uniformity
                (E_min/E_max) shall be not less than 1/40, equivalent to a maximum to minimum
                ratio of 40:1.
              </>
            }
            meaning="40:1 is the permissible limit, expressed in 2024 either as 'E_min/E_max ≥ 1/40' or 'E_max/E_min ≤ 40:1'. The two formulations are mathematically identical. The figure caps the brightness contrast that the dark-adapted eye must accommodate as the occupant walks through the route."
          />

          <CommonMistake
            title="Designing to the 1 lx minimum and ignoring uniformity"
            whatHappens="A designer specifies a long corridor with just enough luminaires to give a calculated minimum of 1.05 lx. The maximum directly under each luminaire is 60 lx (a low-bay LED at low mounting). The uniformity ratio is 60:1 — non-compliant — but the 1 lx minimum 'passes'. The corridor is reported as compliant; on first commissioning the uniformity check fails and the design has to be revisited at the contractor's cost."
            doInstead="Treat illuminance and uniformity as a pair. The 1 lx minimum AND the 40:1 ratio are both design targets, not just the minimum. Closer luminaire spacing or lower lumen output per luminaire reduces both peak and ratio. A target of 2 lx minimum and 10:1 ratio is a robust design that survives luminaire ageing and minor failures."
          />

          <CommonMistake
            title="Carrying the 2013 centre-line + central-band wording into a 2024 design"
            whatHappens="A designer applies the BS EN 1838:2013 wording (1 lx centre line + 0.5 lx on a 2 m central band) to a 4 m wide foyer that is part of the escape route. One row of luminaires down the centre. Centre reads 1.5 lx, central band reads 0.6 lx — passes the old rule. Edges within the non-excluded width read 0.4 lx. On commissioning under BS EN 1838:2024 the edges fail (must be 1 lx within the non-excluded width); design rejected. The change costs an extra row of luminaires and re-cabling."
            doInstead="Apply the BS EN 1838:2024 full-width rule from the start. 1 lx across the full route width at floor level, with the outer 0.5 m each side excluded for routes > 2 m and the outer ¼ width each side excluded for routes ≤ 2 m. The full-width rule supersedes the 2013 centre-line + central-band wording."
          />

          <SectionRule />

          <ContentEyebrow>Response time and duration</ContentEyebrow>

          <ConceptBlock
            title="Response time — 5 s to 50 %, 60 s to 100 %"
            plainEnglish="When the mains fails, escape route lighting must come on fast enough that occupants do not lose visual contact with their surroundings. The BS EN 1838:2024 rule is two-stage: 50 % of rated illuminance within 5 seconds, and the full rated illuminance within 60 seconds. The first stage ensures the route is usable almost immediately; the second stage accommodates technologies that take a brief warm-up. Modern LED systems meet both within milliseconds and the 60 s allowance is rarely needed."
          >
            <p>Why two stages:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>5 s to 50 %.</strong> Fast enough that the occupant's dark-adapted eye does
                not lose orientation. The eye dark-adapts in tens of seconds, not minutes; a 5 s
                blackout is tolerable. A 30 s blackout is not.
              </li>
              <li>
                <strong>60 s to 100 %.</strong> Allows discharge lamps (sodium, mercury) to warm
                up. Pre-LED installations relied on this allowance; LED systems do not need it.
              </li>
              <li>
                <strong>High-risk task lighting tightens to 0.5 s.</strong> Where occupants may be
                operating machinery (printing presses, woodworking, hot processes) the 5 s rule
                fails — tools spinning down in darkness cause injury. §3 covers this.
              </li>
            </ul>
            <p>
              Verification of response time is part of commissioning under BS EN 50172:2024 — a
              switchover test with a stopwatch, confirming 50 % within 5 s. In service, the
              monthly functional test confirms switchover but does not measure response time
              quantitatively; the annual test does.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §6.7 (Duration of emergency escape lighting)"
            clause={
              <>
                The minimum duration of emergency escape lighting shall be 1 h. In premises where
                evacuation is delayed or not immediate, or where re-entry may be required, longer
                durations of 2 h or 3 h shall be applied. The default duration for non-domestic
                premises is 3 h unless a shorter duration is justified by risk assessment.
              </>
            }
            meaning="3 h is the default. 1 h is the absolute minimum, allowed only by exception with documented risk-assessment justification (small premises, simple routes, low occupancy, no re-entry). Most non-domestic installations specify 3 h on commissioning regardless — a 3 h system runs at 1 h with no compliance issue, but a 1 h system cannot run at 3 h."
          />

          <ConceptBlock
            title="Why 3 h is the practical default"
            plainEnglish="The 3 h figure was set when buildings could take 2-3 hours to evacuate, fight a fire, and confirm safe re-entry. Modern fire engineering often produces faster evacuation, but the 3 h default persists because it covers the worst plausible case — including delayed evacuation (people sheltering in place, then evacuating later), re-entry by fire crews, and battery degradation across the 4-year battery life. A 3 h NEW system at end-of-battery-life is producing maybe 2 h of actual duration — still safe, but exactly why the design starts at 3 h, not 1 h."
          >
            <p>When shorter durations are permitted:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>2 h.</strong> Sometimes specified for places of public assembly that are
                normally occupied only briefly (cinemas, theatres) where evacuation is rapid and
                re-entry is not contemplated.
              </li>
              <li>
                <strong>1 h.</strong> Small premises with simple geometry and low occupancy, where
                the risk assessment shows evacuation will complete in well under 30 minutes and
                re-entry is not foreseeable. The basis for the 1 h figure must be documented in
                the logbook.
              </li>
              <li>
                <strong>Higher than 3 h.</strong> Some specialist premises (large hospitals,
                certain industrial sites) specify 8 h or longer where re-entry and continued
                occupation under power loss are anticipated. Common in life-safety critical
                environments.
              </li>
            </ul>
            <p>
              The duration is rated — it is the time the system delivers the minimum illuminance
              after mains failure under worst-case battery condition. End-of-life batteries lose
              30-50 % of original capacity. A 3 h fresh system at year 4 may produce only 2 h of
              actual duration; designing for the rated value gives margin.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <Scenario
            title="The retrofit foyer"
            situation="A 1990s office is being refurbished. Original emergency lighting was designed to BS 5266-1:1999 with centre-line-only verification of a 3.8 m wide foyer that forms part of the main escape route. The single existing luminaire row gives 2 lx on the centre and 0.45 lx near the walls. The contractor proposes replacing the luminaires like-for-like and reusing the wiring."
            whatToDo="Reject the like-for-like proposal. Under BS EN 1838:2024 the foyer exceeds 2 m and the 1 lx minimum applies across the full width at floor level, with the outer 0.5 m each side excluded — the 0.45 lx within the non-excluded width is a clear non-compliance. The retrofit needs an additional luminaire row (or grid layout with anti-panic methodology) to bring the full-width minimum to 1 lx, with maximum 40:1 uniformity. New cabling is required for the new row. The cost premium is real but the alternative is a non-compliant installation that fails commissioning and exposes the building owner to RRO non-conformance."
            whyItMatters="The 2024 change is one of the most consequential updates in the new standard. Designers carrying forward old methodologies into new commissionings will routinely fail. Understanding the change up-front saves a re-design cycle on every wide-foyer refurb."
          />

          <SectionRule />

          <ContentEyebrow>Common parts of blocks of flats</ContentEyebrow>

          <ConceptBlock
            title="The 'domestic' confusion"
            plainEnglish="BS 5266-1 does not apply to a single dwelling — your house, an isolated flat in a converted house, a granny annexe. But it DOES apply to the common parts of multi-occupancy residential premises (a block of flats). The common corridor, lobby, staircase, and any shared escape route serving multiple dwellings is non-domestic for emergency lighting purposes, and BS 5266-1:2025 + BS EN 1838:2024 illuminance levels apply in full. A surprising number of designers treat blocks of flats as 'domestic' and miss the requirement."
            onSite="If multiple front doors open onto the same corridor, that corridor is non-domestic for BS 5266 purposes. Every common part has to meet escape route lighting requirements. The escape route runs from the dwelling front door to the final exit; the route is in scope from the moment it leaves the dwelling."
          >
            <p>The boundary in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Inside an individual dwelling</strong> — exempt. The flat itself does not
                need BS 5266-compliant emergency lighting (though many specify it anyway for
                resident safety).
              </li>
              <li>
                <strong>Common corridor outside the front door</strong> — IN SCOPE. 1 lx escape
                route minimum, 40:1 uniformity, 5 s response, 3 h duration as default.
              </li>
              <li>
                <strong>Common staircase</strong> — IN SCOPE. Mandatory luminaire within 2 m of
                top and bottom of each flight.
              </li>
              <li>
                <strong>Common lobby / entrance hall</strong> — IN SCOPE. Often wide enough to
                trigger the full-width rule; combined with anti-panic methodology where the area
                exceeds 60 m².
              </li>
              <li>
                <strong>Outside the final exit</strong> — IN SCOPE up to 2 m from the door.
                Occupants leaving a lit interior must have their first 2 m of pavement / forecourt
                illuminated to avoid stepping into total darkness.
              </li>
              <li>
                <strong>Lift cars serving the block</strong> — IN SCOPE. A lift car is an enclosed
                space that may be occupied at the moment of mains failure.
              </li>
              <li>
                <strong>Bin store, plant room, communal car park</strong> — depends on whether
                they form part of an escape route. A bin store accessed only via the dwelling is
                not in scope; one accessed via a fire-rated common corridor IS, because the
                corridor is in scope.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating a block of flats as fully domestic"
            whatHappens="A landlord refurbishes a small Victorian house converted into 4 flats. The internal stair and corridor serve all four flats. The contractor argues it is 'domestic' and installs no emergency lighting. A fire occurs, the lights fail, and a tenant on the third floor cannot find the staircase landing. The Fire and Rescue investigation cites the absence of common-parts emergency lighting as a contributory cause. The landlord faces RRO Article 8/9 enforcement."
            doInstead="From the moment the staircase or corridor serves more than one dwelling, common parts emergency lighting is mandatory under BS 5266-1:2025. The block-of-flats exemption that some landlords assume does not exist. Apply 1 lx escape route + relevant signage + 3 h duration as the default."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Battery degradation — the dominant in-service failure</ContentEyebrow>

          <ConceptBlock
            title="Why annual full-duration testing is the load-bearing maintenance check"
            plainEnglish="A self-contained emergency luminaire is a normal LED light + a small NiCd or NiMH battery + a charging circuit. The luminaire works fine forever; the LED life is 50,000+ hours. The battery, however, ages every day. Capacity falls 20-30 % over 3-5 years of normal cycling. A new 3 h-rated luminaire will deliver close to 3 h. The same luminaire at year 4 may deliver 2 h. The same luminaire at year 6 may deliver 1 h or less — and that is BEFORE end-of-life. Battery degradation is invisible to user check; only the annual full-discharge test catches it."
          >
            <p>How the failure presents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Daily check.</strong> Visual indicator on central battery system (or
                mains-healthy LED on self-contained) — confirms charging circuit is alive. Says
                nothing about battery capacity.
              </li>
              <li>
                <strong>Monthly functional test.</strong> Brief mains-fail (typically 30 s).
                Luminaire lights up. Confirms the switchover relay works and the luminaire
                produces light. Says nothing about whether it would last 3 h.
              </li>
              <li>
                <strong>Annual full-duration test.</strong> Mains failed for the full rated
                duration (3 h for typical non-domestic). Battery discharged completely under load.
                Output measured at end of duration. THIS is the test that catches degradation. If
                output falls below the rated illuminance before the duration is reached, the
                battery has degraded and the luminaire fails.
              </li>
              <li>
                <strong>Self-test luminaires.</strong> Built-in microcontroller runs the monthly
                and annual tests automatically and reports results. Modern installations
                increasingly use self-test as it eliminates the manual labour of testing every
                luminaire and provides a digital record.
              </li>
            </ul>
            <p>
              Section 6 covers the testing regime in detail. The point here is that battery
              degradation is the headline reason annual testing exists — without it, the
              installation drifts into non-compliance without anyone noticing until an actual
              mains failure exposes the gap.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · §7.2.5 (Annual test)"
            clause={
              <>
                Once per year, the emergency lighting system shall be tested for the full rated
                duration. The illumination provided at the end of the rated duration shall be not
                less than that required by BS EN 1838. The result, including any luminaires not
                meeting the requirement, shall be recorded in the logbook.
              </>
            }
            meaning="Annual = full-duration discharge under load. The rated illuminance has to be available at the END of the rated duration, not at the start. End-of-duration output is the load-bearing test, because that is when battery degradation manifests. A luminaire that produces 1.5 lx for 30 minutes and then collapses to 0.2 lx for the next 2.5 hours fails — even though the early reading is fine."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Escape route lighting answers: can occupants walk safely from anywhere to a final exit when mains fails. 1 lx minimum across the FULL WIDTH at floor level, BS EN 1838:2024 §4.2.',
              'Edge exclusions: outer 0.5 m on routes wider than 2 m; outer ¼ width on routes 2 m or narrower. The 1 lx target applies to the non-excluded width — supersedes the 2013 centre-line + central-band wording.',
              'Maximum max-to-min uniformity ratio 40:1 along the route. Modern LED practice typically 10:1; 40:1 is the limit, not the target.',
              'Response time: 50 % within 5 s, 100 % within 60 s. High-risk task tightens to 0.5 s — see §3.',
              'Standard duration: 3 h non-domestic. 1 h or 2 h by exception, with risk-assessment justification documented in the logbook.',
              'Mandatory luminaire locations: each exit door, change of direction, intersection, top/bottom of stairs (within 2 m), within 2 m externally of final exits, lift cars, fire equipment, first-aid posts, toilets > 8 m².',
              'Common parts of blocks of flats ARE in scope. Single dwellings exempt; communal stair/corridor/lobby/lift = full BS 5266 + EN 1838 application.',
              'Battery degradation is the dominant in-service failure mode. Daily/monthly tests do not catch it; annual full-duration test does — the load-bearing maintenance check.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'What changed between BS EN 1838:2013 and BS EN 1838:2024 for escape route lighting?',
                answer:
                  'The headline change is the full-width rule with edge exclusions. Under 2013, the rule was 1 lx on the centre line plus 0.5 lx across a 2 m central band. Under 2024, the 1 lx minimum applies across the FULL WIDTH of the route at floor level, with explicit edge exclusions: outer 0.5 m on routes wider than 2 m, outer ¼ width on routes 2 m or narrower. The 1 lx target itself, 40:1 uniformity, and 5 s/60 s response figures are unchanged. The standard also clarifies signage continuity (covered in §5).',
              },
              {
                question:
                  'A corridor is exactly 2 m wide. Which edge exclusion applies?',
                answer:
                  'The ¼-width exclusion (routes 2 m or narrower) — the 0.5 m exclusion is reserved for routes WIDER than 2 m. At exactly 2 m, the ¼-width rule gives 0.5 m excluded each side and a non-excluded central 1.0 m to verify at 1 lx. In practice the two exclusion methods give the same numerical result at exactly 2 m, so the choice is academic at the boundary.',
              },
              {
                question: 'Can I use 1 h duration in a small office to save battery cost?',
                answer:
                  'Only with a documented risk assessment justifying the reduction. BS 5266-1:2025 sets 3 h as the default for non-domestic. To reduce to 1 h, the risk assessment must show the premises is small, the escape route is simple, occupancy is low, evacuation completes in well under 30 minutes, and re-entry is not foreseen. The justification goes in the logbook. Most designers default to 3 h regardless because the cost premium is small and the design is robust against changing circumstances.',
              },
              {
                question:
                  'My corridor passes 1 lx minimum but the uniformity comes out at 35:1. Compliant or not?',
                answer:
                  'Technically compliant — 35:1 is below the 40:1 limit. But it is a sign the layout is marginal. A single luminaire failure could push it to 50:1 (non-compliant). The design is one battery degradation cycle away from breaching uniformity. Add a luminaire or close up the spacing to bring the ratio to 10-20:1; this gives operational margin against in-service deterioration.',
              },
              {
                question:
                  'Does emergency lighting apply inside a private dwelling (a single flat)?',
                answer:
                  'No, BS 5266-1 does not apply inside a single private dwelling. It DOES apply to the common parts of any building containing multiple dwellings — the corridor, lobby, staircase, and any escape route serving more than one flat. The boundary is at the front door of the individual dwelling. Inside that door: exempt. Outside that door, in any shared space: in scope.',
              },
              {
                question: 'What happens if I miss the annual full-duration test?',
                answer:
                  'The system drifts into non-compliance silently. Battery capacity falls below rated duration. A real mains failure exposes the gap — luminaires give 30-60 minutes instead of the rated 3 h, occupants are evacuating in darkness late in the event. RRO Article 17 maintenance enforcement applies; the responsible person can face Article 32 prosecution. Insurer will void cover for failure to maintain. The annual test is the load-bearing check — daily and monthly checks alone are insufficient.',
              },
              {
                question: 'Can a normal mains-powered luminaire double as escape route lighting?',
                answer:
                  'Yes if it is wired to switch to emergency operation on mains failure (a maintained or sustained luminaire — see §4) AND it meets the BS EN 60598-2-22 product standard for emergency luminaires. A normal LED downlight without an emergency conversion module does NOT count, even if it is bright. The emergency function is a specific product certification, not just a property of being illuminated.',
              },
              {
                question: 'How does this interact with the Fire Safety Order (RRO 2005)?',
                answer:
                  'The Fire Safety Order Article 14 requires the responsible person to ensure means of escape are kept clear and usable. Emergency escape lighting is part of "usable" — without it, the escape route is not usable in a mains-failure fire scenario. BS 5266-1:2025 + BS EN 1838:2024 + BS EN 50172:2024 are the technical means by which the responsible person discharges this duty. Non-compliance with the technical standards is, by extension, a likely breach of Article 14 with Article 32 prosecution risk.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Escape route lighting — Module 2.1" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/emergency-lighting-module-2-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Open area (anti-panic)
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

export default EmergencyLightingModule2Section1;
