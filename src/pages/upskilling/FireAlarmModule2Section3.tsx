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
    id: 'fam2-s3-distance',
    question:
      'BS 5839-1:2025 simplified the manual call point distance rules in clause 12. What are the maximum distances now, and what was simplified?',
    options: [
      'No change.',
      'Two maxima: 30 m STRAIGHT-LINE distance to the nearest MCP, AND 45 m ACTUAL TRAVEL distance (along the route a person would walk, around obstructions and through doorways). Both maxima are CEILINGS — the designer can specify shorter distances if the risk demands. The simplification: the 2017 edition had multiple distance categories depending on premises type and risk; the 2025 edition collapses these to the single 30 m / 45 m pair as the maximum permissible. Tighter distances are still allowed and still required where, for example, the fire risk assessment identifies higher-risk areas. The change reduces ambiguity at design and audit.',
      '15 m maximum.',
      '60 m maximum.',
    ],
    correctIndex: 1,
    explanation:
      'The 30 m / 45 m pair is the load-bearing distance rule for MCP siting. Straight-line is geometric (across the room); actual travel is along the walking route. A typical office corridor with side rooms easily satisfies the 30 m straight-line test but may exceed the 45 m travel test if the route winds — both must be checked.',
  },
  {
    id: 'fam2-s3-height',
    question:
      'Per BS 5839-1:2025 clause 12 (clarified mounting height rule), what is the permitted mounting height range for an MCP?',
    options: [
      'Exactly 1.4 m.',
      '1.4 m nominal, with a tolerance of +200 mm and -300 mm — giving an absolute permitted range of 1.1 m to 1.6 m above floor level. The 2025 edition CLARIFIED the previous wording (which gave the nominal 1.4 m without a clear tolerance). The asymmetric tolerance (+200/-300) reflects accessibility considerations: a slightly lower mounting (1.1-1.4 m) is more inclusive for shorter users and wheelchair users than a higher mounting. The 1.4 m nominal is calibrated to the standing-arm reach of an average adult; the +200 mm upper cap prevents excessively high mountings that exclude shorter users.',
      '1 m to 2 m.',
      '0.5 m to 1.5 m.',
    ],
    correctIndex: 1,
    explanation:
      'Memorise 1.4 m nominal, +200/-300 tolerance, 1.1-1.6 m absolute range. Architects often want MCPs higher (cleaner sight lines); clause 12 caps that at 1.6 m. Accessibility advocates want them lower; clause 12 floors at 1.1 m to ensure the visible signal-strip is in a normal eye-level scan range.',
  },
  {
    id: 'fam2-s3-types',
    question: 'What is the difference between a Type A and a Type B manual call point?',
    options: [
      'There is no difference.',
      'Type A — SINGLE-action operation: pressing the frangible element directly initiates the alarm. Most common type in UK installations. Type B — DOUBLE-action operation: lift cover, then press. Two distinct actions required to initiate the alarm. Both are standardised in BS EN 54-11. Type B is sometimes specified where there is elevated risk of malicious activation (e.g. schools, public-access areas, premises with a history of false alarms) — the cover slows the casual or accidental press without preventing intentional use. The 2025 edition is consistent with the 2017 edition on Types A/B; the only Type-related change is the protective-cover specification (now recommended TRANSPARENT — see next question).',
      'Type A is for indoor use only.',
      'Type B is wireless.',
    ],
    correctIndex: 1,
    explanation:
      'Type A is the default; Type B is the malicious-activation mitigation. The double-action requirement — cover plus press — does not delay legitimate use because a person aware of fire intent can lift and press in less than a second. The barrier is meaningful for accidental or playful contact only.',
  },
  {
    id: 'fam2-s3-stairway',
    question:
      'A 5-storey office has manual call points on each stairway landing. Per the BS 5839-1:2025 clause 12.1a clarification, how should each stairway MCP be zoned?',
    options: [
      'All on one stairway zone.',
      "Each stairway MCP — except those at final-exit level — should be incorporated into the ZONE THAT SERVES THE ADJACENT ACCOMMODATION on that level. NOT into a separate stairway zone. The reasoning: when an MCP on the third-floor stairway landing operates, the alarm display should point the FRS to the third floor, not to a generic 'stairway' that gives no useful location information. The 2025 edition removed the previous reference to 'enclosed stairway' (which had created interpretive confusion) and now simply states the rule. The MCP on the FINAL-EXIT level may be zoned with the stairway or with the ground-floor accommodation depending on the design intent.",
      'All on a single building-wide zone.',
      'Each one on its own zone.',
    ],
    correctIndex: 1,
    explanation:
      'Stairway zoning is one of the historically muddier areas of BS 5839-1 design. The 2025 clarification removes the "enclosed stairway" phrase that was sometimes interpreted as requiring a single stairway zone. The new wording is clear: each landing MCP zones with its accommodation level. Only the final-exit MCP may be treated differently.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What are the two maximum distances to the nearest manual call point per BS 5839-1:2025 clause 12?',
    options: [
      'Just 30 m.',
      '30 m STRAIGHT-LINE distance AND 45 m ACTUAL TRAVEL distance. BOTH are maxima — both must be satisfied at every point in the protected area. Straight-line is the as-the-crow-flies distance from any point to the nearest MCP, ignoring obstructions. Actual travel is the distance along the route a person would actually walk to reach the MCP, around walls, doorways and obstructions. Travel distance is typically longer than straight-line because of the building geometry. Both numbers are CEILINGS — designers may specify shorter distances where the risk assessment demands.',
      '60 m only.',
      '15 m only.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 simplification replaced multiple risk-category distances with a single 30 m / 45 m pair as the universal maximum. Tighter distances may still be specified by the designer; this just sets the worst-case ceiling.',
  },
  {
    id: 2,
    question:
      'Per clause 12, what is the nominal mounting height for an MCP and what tolerance applies?',
    options: [
      'Any height.',
      '1.4 m above floor level, with tolerance +200 mm / -300 mm. Absolute permitted range: 1.1 m to 1.6 m. The 1.4 m nominal is calibrated to the comfortable arm-reach height of an average adult; the asymmetric tolerance (+200/-300) reflects accessibility considerations — slightly lower mountings are more inclusive for shorter users and wheelchair users than higher mountings. The 2025 edition CLARIFIED this tolerance — the previous edition stated 1.4 m nominal but with less clear tolerance language.',
      '2 m exactly.',
      '0.8 m to 1 m.',
    ],
    correctAnswer: 1,
    explanation:
      'Memorise: 1.4 m nominal, +200/-300 tolerance, 1.1-1.6 m absolute range. Mountings above 1.6 m exclude shorter users; mountings below 1.1 m put the device below normal eye-level scan and reduce visibility.',
  },
  {
    id: 3,
    question: 'BS EN 54-11 Type A and Type B manual call points differ in what way?',
    options: [
      'Colour.',
      'Number of actions to initiate the alarm. Type A — single-action: press the frangible element directly. Type B — double-action: lift cover, then press. Both are EN 54-11 compliant. Type B is sometimes used where malicious or accidental activation is a known risk (schools, public-access areas, premises with FA history) — the cover slows casual contact without delaying intentional use.',
      'Voltage.',
      'Wired vs wireless.',
    ],
    correctAnswer: 1,
    explanation:
      'Type A is the UK default; Type B is the malicious-activation hedge. The cover does not delay legitimate use materially (under one second to lift and press) but it eliminates almost all casual or accidental triggers.',
  },
  {
    id: 4,
    question:
      'BS 5839-1:2025 clarified the protective cover recommendation for MCPs. What is now recommended?',
    options: [
      'Opaque covers.',
      "TRANSPARENT covers. Previous editions recommended that MCPs be fitted with protective covers (to reduce malicious operation) but did not specify the cover material in detail. The 2025 edition clarifies that where covers are fitted, they should be TRANSPARENT — so that the visible 'fire alarm' label and the frangible element remain identifiable through the cover. Opaque covers obscure the device, defeating its purpose as a visible alarm-trigger; transparent covers slow casual contact while preserving visibility.",
      'Metal covers.',
      'No covers.',
    ],
    correctAnswer: 1,
    explanation:
      'Transparent covers preserve the visual signal of the MCP — its red colour, its label, its frangible element — while preventing accidental brushes against the trigger. The 2025 clarification settles a small but practically important detail.',
  },
  {
    id: 5,
    question: 'Where should an MCP on a stairway landing be zoned per BS 5839-1:2025 clause 12.1a?',
    options: [
      'On a separate stairway zone.',
      'In the ZONE that serves the ADJACENT ACCOMMODATION on that level. So for a 5-storey building with stairway MCPs on each landing, the third-floor stairway MCP zones with the third-floor accommodation (offices, residential rooms, whatever serves that level). NOT in a generic "stairway" zone. The exception is the final-exit-level MCP, which may be treated differently. The 2025 edition removed the "enclosed stairway" wording from the 2017 edition that created interpretive confusion.',
      'On the ground-floor zone only.',
      'On the topmost floor zone.',
    ],
    correctAnswer: 1,
    explanation:
      'Zoning the stairway MCP with its adjacent accommodation gives the FRS useful location information when the MCP operates ("third floor") rather than the unhelpful generic ("stairway"). Final-exit-level MCPs are a designer choice based on the building design.',
  },
  {
    id: 6,
    question:
      'A 60 m corridor has MCPs at each end. Is this compliant with the 30 m straight-line distance rule?',
    options: [
      'No.',
      'YES — exactly. Two MCPs 60 m apart means the centre of the corridor is 30 m from each, satisfying the 30 m straight-line maximum. Anyone in the middle of the corridor reaches an MCP within 30 m geometric distance. (The actual travel distance test, 45 m, is also satisfied as the corridor is straight.) However, this is a TIGHT design — there is no margin for changes in occupancy, room layout, or door positions that might extend travel routes. Good practice would specify intermediate MCPs at e.g. 20 m intervals to leave margin.',
      'Yes only with covers.',
      'Only if the corridor is L1.',
    ],
    correctAnswer: 1,
    explanation:
      'Compliant but not generous. The 30 m / 45 m maxima are ceilings; tighter spacings are best practice and required where the risk assessment indicates. For high-occupancy corridors with moving people, MCPs every 20 m is a defensible specification.',
  },
  {
    id: 7,
    question:
      'Why does BS 5839-1:2025 specify a 45 m ACTUAL TRAVEL distance in addition to the 30 m straight-line distance?',
    options: [
      'For accessibility.',
      'Because the 30 m straight-line distance can be misleading in real building geometry. A point in a corner office may be 25 m straight-line from an MCP in the adjacent corridor, but the actual walking route (out of the office, along the corridor, around a service core, to the MCP) may be 50 m. Without the travel-distance test, the design would pass the geometric test but fail the operational one — a person in that office would have a long walk to raise the alarm. The 45 m actual-travel maximum closes the geometric/operational gap. BOTH tests must be satisfied.',
      'It is just historical.',
      'For OS purposes.',
    ],
    correctAnswer: 1,
    explanation:
      'Real building geometry rarely matches the simple geometric test. Walls, columns, service cores, locked doors and stairwells all extend the actual travel distance. The 45 m travel test forces the designer to consider the route a person would actually walk.',
  },
  {
    id: 8,
    question:
      'A school is fitting MCPs in corridors with high pupil traffic. Which combination of features should be specified?',
    options: [
      'Default Type A, no covers.',
      'Type A or B with TRANSPARENT protective covers (clause 12 / BS EN 54-11 cover recommendation). The transparent cover preserves visibility of the device while reducing malicious activation by pupils — a documented FA-source pattern in schools. Type B (double-action) provides additional barrier; some authorities prefer Type B in schools, others prefer Type A with a transparent cover (functional equivalent in practice). The 2025 edition explicitly lists schools as an example of premises where MCP covers are recommended.',
      'No MCPs at all.',
      'Hidden MCPs.',
    ],
    correctAnswer: 1,
    explanation:
      'Schools are a known FA hot-spot for MCPs. The combination of transparent cover plus possibly Type B double-action gives meaningful protection against malicious activation without compromising legitimate use. Hidden MCPs are non-compliant — the device must be visible.',
  },
  {
    id: 9,
    question: 'Where on the wall should an MCP be sited for maximum visibility and accessibility?',
    options: [
      'In a recess.',
      'On a CONSPICUOUS surface, at 1.4 m mounting height (with the +200/-300 tolerance), on the route to a final exit, and clear of obstructions. Typical good positions: adjacent to escape doors, on stairway landings, at corridor junctions, on the route past major occupied areas. Avoid: behind doors, in alcoves, in poor lighting, behind columns. The MCP must be IDENTIFIABLE at first glance from a moving person — a person fleeing fire will not pause to look for the device, so its position must place it directly in their line of sight on the natural escape route.',
      'On the ceiling.',
      'On the floor.',
    ],
    correctAnswer: 1,
    explanation:
      'Conspicuousness is as important as distance. An MCP that is technically within 30 m straight-line but tucked behind a column or in an alcove provides little operational value. Always position on the natural escape route, in normal lighting, at standing-arm-reach height.',
  },
  {
    id: 10,
    question:
      'A new build has stairway MCPs labelled "STAIRWAY ZONE 99" on the panel. Is this compliant with the 2025 clause 12.1a rule?',
    options: [
      'Yes always.',
      "Generally NO — the stairway-MCP-on-its-own-zone configuration was the pattern that the 2025 clarification specifically addresses. Each stairway MCP (except final-exit-level) should be zoned with the adjacent accommodation on that level, so when the MCP operates the panel directs the FRS to the affected floor. Lumping all stairway MCPs onto a 'STAIRWAY ZONE 99' gives the FRS no useful location information when one operates. Re-zone at next system modification: third-floor landing MCP into Zone 3 (third floor accommodation), fourth-floor landing into Zone 4, etc. Final-exit-level MCP can stay on a separate zone if the design intent calls for it.",
      'It is acceptable for L4.',
      'Yes if the building is small.',
    ],
    correctAnswer: 1,
    explanation:
      'Existing systems with stairway-only zones are not necessarily non-compliant against the edition under which they were installed, but at next modification (which triggers a fresh certificate against the current edition) the zoning should be revised to align with clause 12.1a. The change improves the location-of-fire information delivered to the FRS at attendance.',
  },
];

const FireAlarmModule2Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Manual call points | Fire Alarm Module 2.3 | Elec-Mate',
    description:
      'BS 5839-1:2025 manual call point rules: 30 m straight-line / 45 m travel maxima (clause 12), 1.4 m nominal mounting height with +200/-300 tolerance, Type A vs Type B, transparent protective covers, and stairway zoning per clause 12.1a.',
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
            eyebrow="Module 2 · Section 3"
            title="Manual call points"
            description="The human override on every fire alarm system. BS 5839-1:2025 simplifies the distance rules, clarifies the mounting tolerance, recommends transparent covers, and rewrites the stairway zoning rule. Small numbers, real consequences."
            tone="yellow"
          />

          <TLDR
            points={[
              'Distance maxima (clause 12) — 30 m STRAIGHT-LINE distance to nearest MCP AND 45 m ACTUAL TRAVEL distance. Simplified in 2025: previous edition had multiple risk-category distances; now a single pair.',
              'Mounting height — 1.4 m nominal, +200 mm / -300 mm tolerance, absolute range 1.1-1.6 m. Clarified in 2025.',
              'Types — Type A single-action (default), Type B double-action with cover (malicious-activation hedge). Both BS EN 54-11.',
              'Protective covers — recommended TRANSPARENT in 2025 (was simply "covers" in 2017). Transparent preserves visibility of the device.',
              'Stairway MCP zoning (clause 12.1a) — each landing MCP zones with the ADJACENT ACCOMMODATION on that level (NOT a generic stairway zone). Exception: final-exit level may be different. Clarified in 2025.',
              'Position — conspicuous, on the natural escape route, at corridor junctions, adjacent to final exits. Not behind doors, in alcoves, or in poor lighting.',
              'Operation — single short action (Type A) or two actions in under a second (Type B with cover). The MCP is an emergency-use device; design assumes near-instant operation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the BS 5839-1:2025 clause 12 maximum distances: 30 m straight-line AND 45 m actual travel to the nearest MCP',
              'Apply the clarified mounting-height rule: 1.4 m nominal, +200/-300 tolerance, 1.1-1.6 m absolute range',
              'Distinguish BS EN 54-11 Type A (single-action) and Type B (double-action with cover) MCPs and select appropriately',
              'Apply the 2025 clarification on protective covers: transparent recommended where covers are fitted',
              'Apply the clause 12.1a stairway zoning rule: each landing MCP zones with the adjacent accommodation, not a generic stairway zone',
              'Site MCPs for visibility and accessibility on the natural escape route, away from obstructions and dim lighting',
              'Identify malicious-activation patterns (schools, public access, FA history) and specify cover or Type B accordingly',
              'Audit existing systems against the 2025 distance, height, cover and zoning rules; identify modifications needed at next certificate',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Distance — clause 12 simplified maxima</ContentEyebrow>

          <ConceptBlock
            title="The 30 m / 45 m rule"
            plainEnglish="From any point in the protected area, a person should be able to reach the nearest manual call point within 30 m measured in a straight line AND within 45 m measured along the actual walking route. Both numbers are MAXIMA. The straight-line test catches geometric coverage gaps; the travel-distance test catches operational gaps caused by walls, columns, locked doors, service cores and other route impediments. Both must pass at every point. The 2025 edition simplified this from the 2017 framework, which used multiple distance values depending on premises type and risk."
            onSite="Walk the building before final design sign-off. Stand in each occupied room, look toward the nearest MCP, walk to it. If your walk exceeds 45 m or your geometric distance exceeds 30 m, you need another MCP closer to where you started. The walk test catches errors that drawing measurements miss — particularly where rooms have multiple doors, or where escape routes change direction inside a service core."
          >
            <p>The two distance tests:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Straight-line distance ≤ 30 m.</strong> Geometric distance from any point to
                the nearest MCP, ignoring obstructions. Drawn as straight lines on the floor plan.
                Catches coverage gaps where a large room has no MCP within ranges.
              </li>
              <li>
                <strong>Actual travel distance ≤ 45 m.</strong> Distance along the route a person
                would walk — through doorways, around walls, past columns. Always equal to or longer
                than the straight-line. Catches operational gaps where the geometry is good but the
                route is long.
              </li>
              <li>
                <strong>Both maxima are CEILINGS.</strong> Designers can specify tighter distances
                and routinely should where the fire risk assessment identifies higher-risk areas
                (sleeping accommodation, public access, vulnerable occupants, fast-developing fire
                hazard).
              </li>
              <li>
                <strong>The 2025 simplification.</strong> The 2017 edition had multiple distance
                categories tied to premises type. The 2025 edition collapses these to the single 30
                m / 45 m maximum pair. The change reduces design ambiguity and makes audit
                straightforward.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 12 (manual call points — distance)"
            clause={
              <>
                The distances to find the nearest call points has been simplified to the 30 m
                straight line and 45 m actual travel distance. As these are the maximum distances,
                they can be shorter if the designer deems it necessary.
              </>
            }
            meaning="The 30 m / 45 m pair is now the universal maximum. Previous edition's risk-category distance variations are gone. Designers retain discretion to specify tighter — and should, in higher-risk areas — but the floor under the maximum is no longer prescribed by category. The simplification reduces ambiguity at audit."
          />

          <ConceptBlock
            title="Mounting height — 1.4 m nominal with clear tolerance"
            plainEnglish="MCPs are mounted at 1.4 m above floor level, nominal. The 2025 edition clarifies the tolerance: +200 mm above and -300 mm below. The absolute permitted range is therefore 1.1 m to 1.6 m. The 1.4 m nominal corresponds to the comfortable standing-arm-reach height of an average adult. The asymmetric tolerance (+200/-300) reflects accessibility considerations: a slightly lower mounting is more inclusive for shorter users and wheelchair users than a slightly higher one."
          >
            <p>The 1.4 m / +200 / -300 mm rule and its rationale:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1.4 m nominal.</strong> Comfortable arm-reach for an average standing adult.
                The MCP can be operated without bending or stretching.
              </li>
              <li>
                <strong>+200 mm upper bound (1.6 m).</strong> Higher mountings exclude shorter users
                and wheelchair users. The 1.6 m cap is the upper bound of broadly inclusive
                operation height.
              </li>
              <li>
                <strong>-300 mm lower bound (1.1 m).</strong> Below this, the MCP is below normal
                eye-level scan and reduces visibility. Wheelchair users can reach 1.1 m comfortably;
                below it, visibility for standing users degrades.
              </li>
              <li>
                <strong>Asymmetric tolerance.</strong> Reflects the fact that accessibility
                consideration biases toward LOWER mounting (within the visibility floor of 1.1 m)
                rather than higher. Architectural or ergonomic preference for higher mounting is
                capped at 1.6 m.
              </li>
              <li>
                <strong>Clarified in 2025.</strong> The 2017 edition stated the 1.4 m nominal but
                with less clear tolerance language; some installations interpreted "approximately
                1.4 m" generously. The 2025 wording locks down the tolerance.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* MCP mounting and distance diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              MCP mounting height and distance rules — clause 12 (BS 5839-1:2025)
            </h4>
            <svg
              viewBox="0 0 820 540"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram with two parts. Left: side elevation showing wall with manual call point at 1.4 m nominal mounting height, with +200 and -300 mm tolerance lines, and a person figure for scale. Right: plan view of corridor showing two MCPs with 30 m straight-line distance maximum and 45 m actual travel distance maximum overlaid on a sample geometry."
            >
              {/* MOUNTING HEIGHT — left panel */}
              <g>
                <text
                  x="180"
                  y="30"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="14"
                  fontWeight="bold"
                >
                  Mounting height
                </text>
                <text x="180" y="48" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                  1.4 m nominal · +200 mm / -300 mm tolerance
                </text>
                {/* Wall */}
                <rect
                  x="70"
                  y="80"
                  width="220"
                  height="380"
                  rx="4"
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.2"
                />
                {/* Floor */}
                <line
                  x1="70"
                  y1="450"
                  x2="290"
                  y2="450"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                />
                <text x="180" y="466" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  finished floor level
                </text>
                {/* Person figure (simple) */}
                <line
                  x1="240"
                  y1="270"
                  x2="240"
                  y2="450"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="240"
                  cy="260"
                  r="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <line
                  x1="220"
                  y1="320"
                  x2="240"
                  y2="320"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <line
                  x1="240"
                  y1="320"
                  x2="260"
                  y2="310"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <text x="240" y="478" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                  avg adult ~1.7 m
                </text>
                {/* MCP at 1.4m (1400/1700 of person's reference, scaled 1.7m=290px from 80 to 450 → 1.4m=240px down from 450) */}
                {/* 1.4m nominal at y = 450 - (1400/1700)*370 ≈ 450-305 = 145 — adjust scale: 1.7m maps from 80 to 450 (h=370), so 1m ≈ 218px, 1.4m = 305 from floor → y=145 */}
                <rect
                  x="135"
                  y="240"
                  width="38"
                  height="50"
                  rx="4"
                  fill="#EF4444"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.5"
                />
                <rect x="141" y="250" width="26" height="14" rx="2" fill="rgba(255,255,255,0.95)" />
                <text
                  x="154"
                  y="261"
                  textAnchor="middle"
                  fill="black"
                  fontSize="7"
                  fontWeight="bold"
                >
                  FIRE
                </text>
                <text
                  x="154"
                  y="282"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.95)"
                  fontSize="6"
                >
                  PUSH
                </text>
                {/* Height label - 1.4m nominal */}
                <line x1="105" y1="265" x2="105" y2="450" stroke="#FBBF24" strokeWidth="1.5" />
                <line x1="100" y1="265" x2="110" y2="265" stroke="#FBBF24" strokeWidth="1.5" />
                <line x1="100" y1="450" x2="110" y2="450" stroke="#FBBF24" strokeWidth="1.5" />
                <text
                  x="92"
                  y="358"
                  textAnchor="end"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1.4 m
                </text>
                <text x="92" y="372" textAnchor="end" fill="rgba(251,191,36,0.7)" fontSize="9">
                  nominal
                </text>
                {/* Upper tolerance line at 1.6m */}
                <line
                  x1="135"
                  y1="222"
                  x2="173"
                  y2="222"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1"
                  strokeDasharray="3,2"
                />
                <text x="180" y="225" fill="#22D3EE" fontSize="9">
                  1.6 m max (+200 mm)
                </text>
                {/* Lower tolerance line at 1.1m */}
                <line
                  x1="135"
                  y1="305"
                  x2="173"
                  y2="305"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1"
                  strokeDasharray="3,2"
                />
                <text x="180" y="308" fill="#22D3EE" fontSize="9">
                  1.1 m min (-300 mm)
                </text>
                {/* Permitted band shading */}
                <rect
                  x="125"
                  y="222"
                  width="60"
                  height="83"
                  fill="rgba(34,211,238,0.05)"
                  stroke="none"
                />
              </g>

              {/* DISTANCE PLAN VIEW — right panel */}
              <g>
                <text
                  x="600"
                  y="30"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="14"
                  fontWeight="bold"
                >
                  Distance maxima
                </text>
                <text x="600" y="48" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                  30 m straight-line · 45 m actual travel · clause 12
                </text>
                {/* Corridor outline */}
                <rect
                  x="380"
                  y="80"
                  width="440"
                  height="200"
                  rx="6"
                  fill="rgba(168,85,247,0.04)"
                  stroke="rgba(168,85,247,0.6)"
                  strokeWidth="1.5"
                />
                {/* Internal partition forcing routing */}
                <rect x="540" y="80" width="20" height="120" rx="2" fill="rgba(255,255,255,0.18)" />
                <rect
                  x="640"
                  y="160"
                  width="20"
                  height="120"
                  rx="2"
                  fill="rgba(255,255,255,0.18)"
                />
                {/* Two MCPs at corridor ends */}
                <rect
                  x="386"
                  y="170"
                  width="20"
                  height="22"
                  rx="3"
                  fill="#EF4444"
                  stroke="white"
                  strokeWidth="1.2"
                />
                <text
                  x="396"
                  y="208"
                  textAnchor="middle"
                  fill="rgba(239,68,68,0.85)"
                  fontSize="9"
                  fontWeight="bold"
                >
                  MCP-1
                </text>
                <rect
                  x="794"
                  y="170"
                  width="20"
                  height="22"
                  rx="3"
                  fill="#EF4444"
                  stroke="white"
                  strokeWidth="1.2"
                />
                <text
                  x="804"
                  y="208"
                  textAnchor="middle"
                  fill="rgba(239,68,68,0.85)"
                  fontSize="9"
                  fontWeight="bold"
                >
                  MCP-2
                </text>
                {/* Person at corner */}
                <circle cx="430" cy="260" r="6" fill="#22D3EE" />
                <text x="430" y="277" textAnchor="middle" fill="#22D3EE" fontSize="8.5">
                  person
                </text>
                {/* Straight-line distance arrow */}
                <line
                  x1="430"
                  y1="260"
                  x2="800"
                  y2="183"
                  stroke="rgba(251,191,36,0.7)"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                />
                <text
                  x="615"
                  y="232"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  30 m straight-line max
                </text>
                {/* Actual travel route (around partitions) */}
                <polyline
                  points="430,260 530,260 540,210 600,210 600,140 640,140 650,200 680,200 680,260 800,260 800,193"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2"
                  strokeDasharray="2,2"
                />
                <text
                  x="615"
                  y="305"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="10"
                  fontWeight="bold"
                >
                  45 m actual travel max
                </text>
                <text
                  x="615"
                  y="320"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  (walking route around obstacles)
                </text>
              </g>

              {/* Bottom note */}
              <rect
                x="50"
                y="490"
                width="720"
                height="40"
                rx="8"
                fill="rgba(168,85,247,0.05)"
                stroke="rgba(168,85,247,0.45)"
                strokeWidth="1"
              />
              <text x="65" y="510" fill="#A855F7" fontSize="11" fontWeight="bold">
                BOTH tests must pass at every point.
              </text>
              <text x="65" y="525" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Walk the building before sign-off. The 45 m travel test catches operational gaps
                that the 30 m geometric test misses.
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Types and covers — BS EN 54-11</ContentEyebrow>

          <ConceptBlock
            title="Type A (single-action) and Type B (double-action)"
            plainEnglish="BS EN 54-11 standardises two MCP types: Type A operates on a single action (press the frangible element directly) and Type B operates on two actions (lift the cover, then press). The cover is integral to the Type B device. UK practice predominantly uses Type A; Type B is selected where there is elevated risk of malicious or accidental activation. Both types are equally compliant; the choice is a design decision based on the risk profile of the premises."
          >
            <p>The selection considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Type A — single-action, default.</strong> Used in most UK installations.
                Press the frangible element (a thin polycarbonate or plastic flap, or a glass
                element) and the alarm initiates. Resetting requires a key or a replacement element.
              </li>
              <li>
                <strong>Type B — double-action, malicious-activation hedge.</strong> Lift the cover,
                then press the frangible element. Two actions in under a second for a person aware
                of fire intent. The cover slows or eliminates casual or accidental triggers (a
                shoulder-bump in a crowded corridor, a curious child, a deliberately mischievous
                pupil).
              </li>
              <li>
                <strong>Type B premises.</strong> Schools (high pupil-traffic, malicious-activation
                risk well-documented), public-access venues, premises with a recorded false-alarm
                history that includes user-press events, premises with vulnerable occupants where
                accidental triggers create life-safety distraction.
              </li>
              <li>
                <strong>Type A with cover.</strong> Functional equivalent of Type B in many
                applications. A Type A device fitted with an aftermarket transparent cover gives the
                double-action behaviour without specifying a different EN 54-11 type. Modern
                practice often specifies this combination.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 12 (protective covers)"
            clause={
              <>
                The protective covers that were introduced as a recommendation in the 2017 edition
                are now recommended to be transparent.
              </>
            }
            meaning="The 2025 clarification: where covers are fitted, they should be TRANSPARENT. Opaque covers obscure the device and defeat its purpose as a visible alarm-trigger; transparent covers slow casual contact while preserving the MCP's red colour, label, and frangible element visibility. The change is small but practically important. Existing installations with opaque covers are not necessarily non-compliant against the edition under which they were installed, but at next system modification the covers should be reviewed."
          />

          <ConceptBlock
            title="Stairway MCP zoning — clause 12.1a clarified"
            plainEnglish="A multi-storey building typically has manual call points on each stairway landing, providing escape-route alarm-raising at the most-used vertical circulation. The 2025 edition clarifies how these stairway MCPs are zoned. The previous edition's wording (referring to 'enclosed stairway') created interpretive confusion — some designers placed all stairway MCPs on a single 'stairway zone', others zoned each landing MCP with its accommodation level. The 2025 clause 12.1a settles the question: each landing MCP zones with the ADJACENT ACCOMMODATION on that level."
          >
            <p>The zoning rule and its operational logic:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Each landing MCP zones with the level it serves.</strong> Third-floor
                stairway-landing MCP → Zone 3 (third-floor accommodation). Fourth-floor → Zone 4.
                Etc.
              </li>
              <li>
                <strong>The reasoning.</strong> When the third-floor MCP operates, the panel's
                location indication should direct the FRS to the third floor (where the actual fire
                or near-fire is). A generic 'stairway' zone gives the FRS no useful location
                information.
              </li>
              <li>
                <strong>The exception — final-exit level.</strong> The MCP at the final-exit level
                of the stairway can be zoned with the stairway or with the ground-floor
                accommodation depending on design intent. Most designs use the ground-floor
                accommodation zone for consistency.
              </li>
              <li>
                <strong>The 2025 wording change.</strong> The 2017 edition referred to 'enclosed
                stairway' which some interpreted as requiring a single stairway zone. The 2025
                clause 12.1a removes the 'enclosed' qualifier and states the zoning rule directly.
                The change is a clarification, not a substantive change of design intent — but the
                practical effect on field installations is significant.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 12.1a (stairway manual call points)"
            clause={
              <>
                If manual call points are located on the landings of a stairway (see 19.4), the
                manual call point on each level, other than a final exit level from the stairway,
                should be incorporated within the zone that serves the adjacent accommodation on
                that level.
              </>
            }
            meaning="Zone the third-floor landing MCP into Zone 3 (third-floor accommodation), not into a generic stairway zone. The location-of-fire information delivered to the FRS at attendance is materially better. Final-exit-level MCPs may be treated differently per design intent. The clarification removes 'enclosed stairway' phrasing that had created interpretive confusion in the 2017 edition."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Position — visibility and accessibility</ContentEyebrow>

          <ConceptBlock
            title="Where to put the MCP for real-world use"
            plainEnglish="The 30 m / 45 m distance and the 1.4 m mounting height define WHERE in geometric and elevation terms an MCP is allowed. They do NOT capture conspicuousness — whether a person fleeing fire can identify the device at first glance. The position decision must additionally satisfy: in a normally-lit area, on the natural escape route, in line of sight from the typical occupant position, free of obstruction by doors, columns or signage, and at a logical decision point where a person already pausing or turning would naturally encounter the device."
          >
            <p>Good positioning practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Adjacent to final exits.</strong> Place an MCP within arm-reach of every
                final exit door. A person leaving the building has a natural opportunity to operate
                it; conversely, anyone reaching the door knows an MCP is there.
              </li>
              <li>
                <strong>On stairway landings.</strong> Each landing on each escape stairway should
                have an MCP, zoned with the adjacent accommodation level (clause 12.1a, see above).
              </li>
              <li>
                <strong>At corridor junctions.</strong> Where multiple corridors meet, an MCP at the
                junction is reachable from all of them and serves as a navigational anchor in
                emergency conditions.
              </li>
              <li>
                <strong>On the route past major occupied areas.</strong> An MCP between an open-plan
                office and the escape door is more useful than one tucked into the office itself.
              </li>
              <li>
                <strong>NOT behind doors, in alcoves, or in poor lighting.</strong> A device that
                requires a person to leave the natural escape route to find it provides little
                operational value. If the architectural arrangement forces this, add another MCP on
                the natural route.
              </li>
              <li>
                <strong>Visible from approaches.</strong> The red colour of the MCP and its alarm
                label are the visual signal. Position the device so that approaching occupants see
                the red and the label well before reaching it.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The school corridor — Type B with transparent cover"
            situation="A primary school has a 90 m main corridor with classrooms on both sides. Pupil traffic during change-over is high and chaotic. The previous BS 5839-1:2017 installation had Type A MCPs without covers; the school has experienced 11 malicious activations in the previous 18 months — pupils press the MCP as a prank. Each activation triggers FRS attendance under the school's monitoring regime. The school is upgrading to BS 5839-1:2025 standards as part of a refurbishment."
            whatToDo="Specify Type B double-action MCPs WITH transparent covers throughout the corridor and stairway landings. The double-action requirement (lift cover, press) eliminates almost all casual or impulsive trigger scenarios while a pupil aware of genuine fire intent can still operate the device in under a second. The transparent cover preserves visibility of the MCP's red colour and label so the device remains identifiable at a glance. Document the choice under clause 12 and clause 33 (false-alarm management) — the design rationale is the FA history. Distance: confirm the 30 m / 45 m maxima are met across the corridor and classrooms; with classrooms on both sides, MCPs at approximately 25 m intervals along the corridor satisfy both tests with margin. Mounting height: 1.4 m nominal (within +200/-300 tolerance — for primary-school children specifically, mounting toward the lower end of the tolerance, around 1.2 m, may be considered to allow older pupils to reach if needed, while staff can still operate at 1.4-1.6 m comfortably)."
            whyItMatters="Schools are the canonical malicious-activation environment. Type A without covers in a school corridor is a known FA-source pattern. The 2025 edition's transparent-cover recommendation responds directly to this evidence. Switching to Type B with transparent covers — combined with the clause 33 FA-management framework — typically reduces malicious activation by 80 percent or more. The school's avoided FRS-attendance cost recovers the upgrade cost in months."
          />

          <CommonMistake
            title="Mounting MCPs at 1.7 m for cleaner architectural sight lines"
            whatHappens="An architect specifies MCPs mounted at 1.7 m above floor level — slightly above the +200 mm upper bound — because the higher mounting aligns with a horizontal datum line in the wall design. The visual effect is cleaner but operation is compromised: shorter users (under approximately 1.55 m height) cannot reach the device without stretching, and wheelchair users cannot reach it at all. At commissioning, an audit identifies the 1.7 m height as a clause-12 non-compliance and requires re-fixing across 24 locations."
            doInstead="Hold the architect to the 1.4 m / +200 / -300 envelope. The +200 mm upper bound (1.6 m absolute max) accommodates most architectural datum-line preferences. If the project genuinely needs higher visibility for the device, achieve it through SIGNAGE (a fire-alarm icon at higher level adjacent to the MCP) rather than by mounting the device itself out of reach. The accessibility consideration is not negotiable; it sits behind the +200/-300 tolerance and the 1.4 m nominal."
          />

          <CommonMistake
            title="A single 'stairway zone' for all landing MCPs in a 12-storey block"
            whatHappens="A high-rise residential block has stairway MCPs on every landing, zoned together as 'STAIRWAY ZONE 99'. A pupil presses the seventh-floor landing MCP. The panel reports 'STAIRWAY ZONE 99 — fire alarm activated'. The FRS arrives and asks reception which floor the alarm came from; reception cannot answer because the panel does not know. The crew searches all 12 stairway landings and the adjoining accommodation before identifying the trigger as a malicious activation on the seventh floor. The whole exercise consumed 35 minutes when the crew could have been on the seventh-floor accommodation in three minutes if the zoning had been correct."
            doInstead="Zone each landing MCP with the adjacent accommodation on its level (clause 12.1a). Seventh-floor landing MCP → Zone 7 (seventh-floor flats). Eighth-floor landing → Zone 8. Etc. The panel now reports 'ZONE 7 — fire alarm activated' and the crew goes directly to the seventh floor. The location-of-fire information delivered to the FRS at attendance is the operational benefit of the clarified clause 12.1a rule. At next system modification, re-zone the existing installation."
          />

          <CommonMistake
            title="Opaque covers on MCPs in a public-access foyer"
            whatHappens="A retail foyer fits MCPs with opaque red plastic covers labelled 'IN CASE OF FIRE — LIFT AND PRESS'. The covers preserve the visual signal of the MCP's red colour but obscure the actual device. The foyer is busy and signage is dense; the cover-plus-label looks like one of many promotional or wayfinding signs. Two staff false-alarm scenarios are recorded over six months where staff failed to operate the MCP because they did not recognise it as a fire-alarm trigger under the cover. The cover defeats the purpose of the device."
            doInstead="Specify TRANSPARENT covers (the 2025 clarification). The MCP's red colour, its 'PUSH' or 'BREAK GLASS' label, and the frangible element are all visible through the cover; the device is identifiable at a glance. The cover slows casual contact (which is its design intent) without obscuring the device. Existing installations with opaque covers should be reviewed at next modification — a low-cost replacement (transparent covers at typical cost £8-12 per MCP) recovers the visibility benefit."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Operation, maintenance and the human factors</ContentEyebrow>

          <ConceptBlock
            title="What happens when an MCP is operated"
            plainEnglish="When the frangible element of an MCP is pressed (Type A) or the cover lifted and the element pressed (Type B), an internal switch closes — typically a microswitch with a small mechanical latching action. The closure is detected by the panel as a fire signal from that addressable point. The panel logs the device address, time of operation, and triggers the alarm cause-and-effect (sounders, VADs, ventilation control, magnetic door release, lift homing, ARC notification). Resetting requires either replacing the frangible element (older designs) or operating a key-reset mechanism (modern designs)."
          >
            <p>The operation cycle:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Operation.</strong> Press the frangible element. Latching switch closes
                instantly. Alarm initiates.
              </li>
              <li>
                <strong>Cause-and-effect.</strong> Panel triggers configured outputs — sounders,
                VADs, magnetic door release, lift homing, ventilation, ARC notification. The
                cause-and-effect matrix (a 2025-required documentation deliverable) defines what
                happens for each input zone.
              </li>
              <li>
                <strong>Display.</strong> Panel shows zone, address, device type and operation time.
                The clause 12.1a zoning ensures the displayed zone points the FRS to the correct
                building level.
              </li>
              <li>
                <strong>Reset.</strong> Older designs require replacement of the frangible element
                (a stock spare part). Modern designs use a key-reset that resets the latching switch
                and re-arms the device for re-use without replacement. The element is typically a
                replaceable polycarbonate flap.
              </li>
              <li>
                <strong>Logbook.</strong> Every MCP operation is logged in the system logbook with
                date, time, zone, device, cause (real fire / drill / test / malicious), and reset
                action. The 2025 edition emphasises the false-alarm investigation workflow (clause
                29) — see Section 5 of this module.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 19.4 (manual call points on stairways and 12.1a cross-reference)"
            clause={
              <>
                If manual call points are located on the landings of a stairway (see 19.4), the
                manual call point on each level, other than a final exit level from the stairway,
                should be incorporated within the zone that serves the adjacent accommodation on
                that level.
              </>
            }
            meaning="Cross-reference between clause 12.1a (the zoning rule) and clause 19.4 (the stairway-positioning rule). They work together: 19.4 says where to put the MCP (each landing), 12.1a says how to zone it (with the adjacent accommodation, except final-exit). The 2025 edition's removal of the 'enclosed stairway' qualifier resolves an interpretive confusion that affected designs from 2017 to 2025."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Defects you will see on every periodic inspection</ContentEyebrow>

          <ConceptBlock
            title="The five most common MCP defects in service — and how the standard frames each"
            plainEnglish="Six-monthly inspections under BS 5839-1:2025 clause 43 routinely surface the same handful of MCP defects. Knowing what they are, why they appear, and how the standard categorises each is the difference between a clean service report and one that the responsible person can argue down."
            onSite="Photograph each defect with location and zone label, record on the service report, and reference the relevant clause. The clause reference matters because it tells the duty holder this is a recommendation in a code of practice routinely cited by FRS, insurers and courts — not the inspector's preference."
          >
            <ol className="list-decimal pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Painted-over or obstructed cover.</strong> The 2025 standard now recommends
                that protective covers be transparent (clarification in clause 12). A painted, dirty
                or obstructed cover defeats the purpose. Photograph, record, recommend replacement.
              </li>
              <li>
                <strong>Mounting height drift.</strong> 1.4 m ±200 mm above / -300 mm below — i.e.
                1.1 m to 1.6 m measured to the operating element. Refurbishments routinely lift
                floors and bring devices below 1.1 m, or relocate to satisfy a finishes plan and
                break the BS 5839-1:2025 tolerance.
              </li>
              <li>
                <strong>Travel distance exceeded.</strong> 30 m straight-line / 45 m travel.
                Partition changes, plant relocation or new fire compartments routinely break this.
                The fix is usually an additional MCP, not a tolerance argument.
              </li>
              <li>
                <strong>Stairway zoning misalignment.</strong> 2025 clause 12.1 a) clarified that an
                MCP on a stairway landing must be in the zone that serves the adjacent accommodation
                on that level — not the stairway zone. A common misconfiguration after addressable
                system upgrades.
              </li>
              <li>
                <strong>Cover variant inconsistency.</strong> A site mixing Type A (single-action)
                and Type B (covered) call points without a documented reason is a finding. The fire
                risk assessment should justify Type B (e.g. a school where deliberate operation is a
                known risk); without that justification, Type A throughout is the default.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Distance maxima — 30 m STRAIGHT-LINE AND 45 m ACTUAL TRAVEL (clause 12). Both must pass at every point. The 2025 simplification: previous edition had multiple risk-category distances; now a single pair.',
              'Mounting height — 1.4 m nominal, +200 / -300 mm tolerance, absolute range 1.1-1.6 m. Clarified in 2025.',
              'Type A — single-action, default. Type B — double-action with cover, malicious-activation hedge. Both BS EN 54-11.',
              'Protective covers — TRANSPARENT recommended in 2025. Opaque covers obscure the device and defeat its purpose.',
              'Stairway MCP zoning (clause 12.1a) — each landing MCP zones with the ADJACENT ACCOMMODATION on that level. NOT a generic stairway zone. Final-exit level may be different.',
              'Position — conspicuous, on natural escape route, at corridor junctions, adjacent to final exits, at stairway landings. Not behind doors or in alcoves.',
              'Schools and public-access venues are FA hot-spots — specify Type B or Type A with transparent cover.',
              'Operation reset — replace frangible element (older) or key-reset (modern). Every operation logged in system logbook with cause analysis (clause 29 — see Section 5).',
              'Visibility matters as much as distance — 30 m to a hidden MCP is operationally worse than 35 m to a conspicuous one (though both must satisfy the rule).',
              'When upgrading existing systems, audit against the 2025 simplifications — distance, height tolerance, transparent covers, and stairway zoning — and plan modifications at next certificate.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Can I rely on detectors alone in a small premises and skip MCPs?',
                answer:
                  'No. BS 5839-1:2025 requires manual call points in all categories of life-safety system (L1, L2, L3, L4, L5) and in M-category systems. The MCP is the human override — the device that allows a person who has detected a fire to raise the alarm immediately, without waiting for an automatic detector to respond. Detectors and MCPs are complementary; both are required.',
              },
              {
                question: 'Does the 30 m / 45 m distance apply to all categories, or only L1?',
                answer:
                  'All categories. Clause 12 sets the maxima as universal across L1, L2, L3, L4, L5 and M systems. The category drives where MCPs are needed (e.g. M is manual-only — MCPs are the entire system) but the 30 m / 45 m maxima apply uniformly. Designers may specify tighter distances for any category where the risk assessment justifies — and routinely should for sleeping accommodation, public access, and high-traffic areas.',
              },
              {
                question: 'Are wireless MCPs permitted under BS 5839-1:2025?',
                answer:
                  'Yes, where they conform to the relevant product standards (typically BS EN 54-25 for radio-linked components) and are used as part of an overall system that meets BS 5839-1. Wireless MCPs are common in heritage buildings, temporary installations, and refurbishments where cabling is impractical. The clause 12 distance, height, type, cover and zoning rules apply identically to wired and wireless MCPs.',
              },
              {
                question:
                  'My fire risk assessment identifies a higher-risk area. Should I tighten the MCP distance there?',
                answer:
                  'Yes — that is exactly the discretion the 2025 edition preserves. The 30 m / 45 m maxima are ceilings; the FRA may identify areas where tighter distances are needed (sleeping accommodation, vulnerable occupants, fast-developing fire hazard, high occupancy with potential for crush). Specify shorter distances in those areas, document the rationale in the system design, and pass the rationale into the operating and maintenance manual under clause 38 documentation.',
              },
              {
                question:
                  'A 100 m corridor has MCPs at each end (50 m apart from ends to centre). The 30 m straight-line max is breached in the middle 40 m of the corridor. What do I do?',
                answer:
                  'Add a third MCP in the middle of the corridor. The two-end approach satisfies the 30 m rule only for corridors up to 60 m long (with 30 m from each end to the centre). For a 100 m corridor, three MCPs at 25 m intervals (or four at 20 m intervals) are required to satisfy both the 30 m straight-line and 45 m travel maxima with margin. The geometric calculation is straightforward; walking the corridor confirms the travel-distance test.',
              },
              {
                question:
                  'For an MCP next to a final exit, which side of the door should it be on?',
                answer:
                  'The OCCUPIED side — the side a person fleeing fire approaches from. An MCP on the outside of the final exit door is reached only after the person has already exited the building, by which point the alarm-raising opportunity is largely past. Conventionally MCPs are mounted on the wall adjacent to the door handle, on the latch side, at 1.4 m height, so that a person reaching the door for handle-grasping naturally has the MCP within arm-reach.',
              },
              {
                question:
                  'I have an existing system with stairway MCPs all on a single zone. Is it non-compliant?',
                answer:
                  'Not necessarily — the system was designed and installed against the BS 5839-1 edition in force at the time of installation, and the 2017 edition allowed the single-stairway-zone interpretation. At next system modification (which triggers a fresh certificate against the current edition), the stairway-MCP zoning should be revised to align with the 2025 clause 12.1a clarification. The change is a re-zoning at the panel — relatively low cost. Document the change in the system logbook and the modification certificate.',
              },
              {
                question:
                  'Can I use Type B MCPs in non-malicious-risk premises just for tidier appearance?',
                answer:
                  'Yes — Type B is permitted in any premises and there is no requirement to justify it as a malicious-activation hedge. Some designers prefer Type B for the cleaner unbroken appearance and the marginal protection against accidental contact (a shoulder-bump in a crowded corridor). Operationally, Type B does not delay legitimate use materially (under one second to lift and press). The cost difference per device is small; the choice is largely aesthetic and risk-management preference.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Manual call points — Module 2.3" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/fire-alarm-course/module-2/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Sounders and VADs
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

export default FireAlarmModule2Section3;
