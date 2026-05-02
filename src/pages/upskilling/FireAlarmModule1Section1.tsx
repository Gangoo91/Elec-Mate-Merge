import { ArrowLeft, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
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
    id: 'fam1-s1-l1coverage',
    question:
      'Under BS 5839-1:2025, an L1 system requires automatic detection in which areas of the protected building?',
    options: [
      'Escape routes only.',
      'Escape routes plus rooms opening onto them.',
      'All areas of the protected building, with the limited exceptions for areas of low fire risk listed in Annex D (typical exceptions: small bathrooms, small unoccupied toilet cubicles, sanitary accommodation, certain small voids). The L1 starting position is "everywhere"; exceptions must be justified room by room.',
      'High-risk rooms only.',
    ],
    correctIndex: 2,
    explanation:
      'L1 is the highest life-safety category and starts from "automatic detection in every area". BS 5839-1:2025 Annex D (previously Annex E in 2017) lists the limited exceptions where detection is not required. The designer must justify each excluded area; "low fire risk" is the test, not "convenient to leave out".',
  },
  {
    id: 'fam1-s1-l2sleep',
    question:
      'A new four-storey care home is being designed. The fire strategy specifies a Category L2 system. Where must automatic fire detection be provided?',
    options: [
      'Escape routes only.',
      'Escape routes only — sleeping rooms remain optional under L2.',
      'Escape routes, rooms opening onto escape routes AND rooms in which people sleep — because the BS 5839-1:2025 revision now defines sleeping rooms as high-risk rooms and brings them within the L2 protection envelope. Heat detectors are no longer permitted in those sleeping rooms; smoke or multi-sensor detection must be used.',
      'Throughout — L2 always means full coverage.',
    ],
    correctIndex: 2,
    explanation:
      'BS 5839-1:2025 reclassifies rooms in which people sleep as high-risk rooms requiring automatic detection within an L2 system. This is a substantive change from the 2017 edition. Heat detectors are no longer acceptable in those sleeping rooms (smoke or multi-sensor required). The change is not retrospective — existing systems remain compliant until material works trigger an upgrade.',
  },
  {
    id: 'fam1-s1-l3void',
    question:
      'BS 5839-1:2025 changed the wording for the wall separating a Category L3 ceiling void from the escape route. What is the new requirement?',
    options: [
      'The wall must achieve a 60-minute fire-resisting rating.',
      'The wall must be of solid construction with no holes in it. The 2017 wording "fire-resisting construction" was found to be unhelpful (designers and inspectors could not agree what counted, or how to verify it on site). The 2025 wording focuses on the actual fire-safety objective: stopping smoke from the void crossing the boundary into the escape route.',
      'The wall must be a 30-minute partition with intumescent seals.',
      'No separation is required.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 change is a clarification, not a relaxation. The objective — preventing smoke from a void compromising the escape route — is unchanged. The wording shifts from a construction descriptor (fire-resisting) that proved hard to apply, to a performance descriptor (solid, no holes) that any inspector can verify visually.',
  },
  {
    id: 'fam1-s1-l4flue',
    question:
      'BS 5839-1:2025 introduces a new requirement for Category L4 systems where flue-like structures are present. What does the standard now recommend?',
    options: [
      'Detection at every floor level within the flue.',
      'A detector at the top of the flue-like structure (and only at the top — unlike L1, L2, L3 and P1, the standard does NOT recommend a detector within ~1.5 m of the penetration on every floor for L4). The recognition is that smoke rises rapidly in a flue and the top is the early-warning point; floor-by-floor detection is reserved for the higher categories.',
      'No detection inside flue-like structures.',
      'Heat detection only.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 change adds top-of-flue detection to L4 because flue-like structures (atria, lift shafts open to corridors, large service shafts) have historically been an L4 blind spot. The "top only" approach is the L4-grade response — proportionate to L4\'s "escape routes only" remit, not as exhaustive as L1/L2/L3/P1 which require both top and per-floor detection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the "L" prefix denote in BS 5839-1:2025 system categorisation?',
    options: [
      'Limited coverage.',
      'Life safety — the system is designed primarily to protect the lives of building occupants by providing early warning of fire so that they can escape. Property protection is, at most, a secondary outcome. Contrast with "P" (property) and "M" (manual only).',
      'Loop — addressable system.',
      'Local — a single-zone system.',
    ],
    correctAnswer: 1,
    explanation:
      '"L" = life safety. The whole purpose of an L category system is to protect occupants, which is why the design starts from the question "where could a fire start that would threaten people?" and works outward.',
  },
  {
    id: 2,
    question: 'Which BS 5839-1:2025 category provides automatic detection throughout the building?',
    options: ['L2', 'L1', 'L3', 'L4'],
    correctAnswer: 1,
    explanation:
      'L1 is the highest life-safety category — automatic detection in every area, with the limited exceptions justified through Annex D. L2 covers escape routes plus rooms opening onto them plus high-risk rooms (including, from 2025, sleeping rooms). L3 covers escape routes plus rooms opening onto them. L4 covers escape routes only.',
  },
  {
    id: 3,
    question:
      'A 2025-designed Category L2 system protects a small hotel. In which of the following areas is automatic detection now mandatory under the 2025 revision that was NOT mandatory under the 2017 edition?',
    options: [
      'Reception.',
      'Bedrooms in which guests sleep — BS 5839-1:2025 reclassifies sleeping rooms as high-risk rooms, bringing them within L2 protection. Heat detectors are no longer permitted in those rooms; smoke or multi-sensor detection must be specified.',
      'Kitchen.',
      'Plant room.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 revision treats sleeping rooms as high-risk rooms within L2 (and L3 in respect of detector type — heat detectors banned). The change reflects evidence that sleeping occupants are uniquely vulnerable to delayed detection and need early warning even where the L category does not otherwise demand whole-building cover.',
  },
  {
    id: 4,
    question:
      'What detector type is NOT permitted in sleeping rooms in a 2025-designed L2 or L3 system?',
    options: [
      'Multi-sensor.',
      'Heat — BS 5839-1:2025 explicitly prohibits heat detectors in rooms where people sleep (within new L2 or L3 designs). Smoke or multi-sensor detection must be used. The change is not retrospective — existing systems with heat detectors in sleeping rooms remain compliant until material works (e.g. a system upgrade) trigger the new requirement.',
      'Optical smoke.',
      'Aspirating smoke.',
    ],
    correctAnswer: 1,
    explanation:
      'Heat detectors respond too late for sleeping occupants — by the time the room reaches the heat-detector threshold, escape via smoke-filled routes is already compromised. The 2025 prohibition removes a long-standing design pattern; specifiers must change to smoke or multi-sensor in those rooms going forward.',
  },
  {
    id: 5,
    question:
      'In a 2025 Category L3 system, BS 5839-1 changed the wording for the wall between an adjacent ceiling void and the escape route. What does the new wording require?',
    options: [
      '60-minute fire resistance.',
      'Solid construction with no holes — the 2025 wording replaces "fire-resisting construction" (vague, hard to verify on site) with a performance-based description focused on the actual safety objective: stopping smoke from the void crossing the boundary into the escape route.',
      '30-minute fire resistance.',
      'No separation needed.',
    ],
    correctAnswer: 1,
    explanation:
      'The change is a clarification, not a relaxation. The fire-safety objective (smoke must not cross from the void to the escape route) is preserved; the wording is now expressed in terms that an installer or surveyor can actually verify — the wall is solid and has no penetrations.',
  },
  {
    id: 6,
    question: 'What new L4 requirement does BS 5839-1:2025 introduce for flue-like structures?',
    options: [
      'Detection at every floor.',
      'A detector at the TOP of the flue-like structure. Unlike L1, L2, L3 and P1, the L4 wording does NOT additionally require a detector within ~1.5 m of the penetration on every floor. L4\'s "escape routes only" remit means the top-of-flue detector is the proportionate L4-grade response.',
      'Heat detection only.',
      'Beam detection across the flue.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 change recognises that flue-like structures (atria, large service shafts, lift shafts open to corridors) draw smoke upward rapidly. The top of the flue is the earliest, most reliable detection point. L4 gets the top detector; the higher categories get top-plus-per-floor.',
  },
  {
    id: 7,
    question:
      'BS 5839-1:2025 introduces a change for stairway lobbies. What is the new requirement?',
    options: [
      'No detection required.',
      'Stairway lobbies now require automatic fire detection. The 2017 edition allowed lobbies to be excluded from automatic detection on the basis that they were classed as areas of low fire risk. The 2025 revision withdraws that exclusion — lobbies must now have automatic detection.',
      'Heat detection only.',
      'Manual call point only.',
    ],
    correctAnswer: 1,
    explanation:
      'Stairway lobbies are the buffer between fire-protected stair cores and the accommodation they serve. A fire that enters a lobby threatens the stair core. The 2025 revision recognises that historic exclusion of lobbies as "low fire risk" was inconsistent with their critical role in evacuation — they must now have automatic detection.',
  },
  {
    id: 8,
    question:
      'BS 5839-1:2025 21.2.4 sets out distances of point detectors from the ceiling. What are the figures?',
    options: [
      '50 mm to 800 mm for both smoke and heat.',
      '25 mm to 600 mm for smoke detectors and 25 mm to 150 mm for heat detectors. The same figures applied in the 2017 edition (then numbered 22.3); the 2025 revision changed the clause numbering but retained the technical content.',
      '0 mm to 300 mm for both.',
      '100 mm to 500 mm for smoke; 25 mm to 150 mm for heat.',
    ],
    correctAnswer: 1,
    explanation:
      '21.2.4 (2025) = 22.3 (2017) for the technical recommendation. The smoke-detector range allows for the smoke layer to develop below the ceiling without losing early-detection sensitivity; the much tighter heat-detector range reflects the ceiling-jet behaviour of hot gases.',
  },
  {
    id: 9,
    question:
      'A specifier is choosing between L1 and L2 for a small two-storey day-care nursery (no overnight sleeping). Which factor most strongly drives the choice?',
    options: [
      'Cost.',
      'The fire risk assessment. The Regulatory Reform (Fire Safety) Order 2005 puts the duty on the responsible person to conduct a suitable and sufficient fire risk assessment; the fire-detection category follows from that. For a non-sleeping nursery the FRA may justify L2 (escape routes plus high-risk rooms); a more onerous evacuation profile (very young children, restricted mobility) may push the FRA towards L1. Building Regs Approved Document B and insurer requirements feed into the same decision.',
      'The colour scheme.',
      'The brand of detectors.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 is a code of practice — a means of meeting a wider statutory duty under the RRO 2005, Building Regs and the property insurer\'s requirements. The fire risk assessment is the master document; the category selection reflects its findings. "Always L1" or "always L2" without an FRA is not how the standard is meant to be used.',
  },
  {
    id: 10,
    question:
      'BS 5839-1:2025 specifies that all manual call points should be sited so that no person needs to travel more than what straight-line and actual-travel distances to reach one?',
    options: [
      '20 m straight line / 30 m travel.',
      '30 m straight line and 45 m actual travel distance — these are the maximum distances; designers may specify shorter distances if the risk assessment requires it. The 2025 revision simplified the previous wording; the figures themselves are unchanged from custom and practice.',
      '50 m straight line / 75 m travel.',
      '10 m straight line / 15 m travel.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 simplified the call-point distance rules to a clear pair: 30 m straight line, 45 m actual travel. These are limits — specifiers can be more demanding in higher-risk areas (kitchens, plant rooms, processes with elevated ignition risk) and routinely should be.',
  },
];

const FireAlarmModule1Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'L category systems — life safety | Fire Alarm Module 1.1 | Elec-Mate',
    description:
      'BS 5839-1:2025 L1 to L5 life-safety fire alarm categories: coverage, sleeping-room rule changes, void-wall clarification, flue detection, stairway lobby protection, risk-assessment-driven selection.',
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
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1"
            title="L category systems — life safety"
            description="BS 5839-1:2025 L1 to L5: how detection coverage scales with the life-safety risk, what the 2025 revision changed (sleeping rooms, void walls, flues, stairway lobbies) and how to select the correct category from a fire risk assessment."
            tone="yellow"
          />

          <TLDR
            points={[
              'L = life safety. The category number scales with how much of the building is protected by automatic detection. L1 = highest cover, L5 = bespoke task-specific.',
              'L1 — automatic detection throughout, with the limited Annex D exceptions for areas of low fire risk (small bathrooms, certain small voids).',
              'L2 — escape routes + rooms opening onto them + HIGH-RISK ROOMS. From BS 5839-1:2025, sleeping rooms ARE high-risk rooms — they must have detection. Heat detectors no longer permitted in sleeping rooms.',
              'L3 — escape routes + rooms opening onto them. 2025 reworded the void-wall requirement: solid construction with no holes is the test (replacing "fire-resisting construction").',
              'L4 — escape routes only. 2025 NEW: a detector at the TOP of any flue-like structure (no per-floor requirement at L4 grade).',
              'L5 — task-specific. Designer-defined fire-safety objective (e.g. protect a specific process, contain a specific high-risk area). Coverage and detector type follow the objective, not a category template.',
              'Stairway lobbies — 2025 NEW: now require automatic detection (previously could be excluded as low fire risk).',
              'Selection is risk-assessment-driven: Regulatory Reform (Fire Safety) Order 2005 + Approved Document B + insurer requirements + BS 5839-1:2025 = the choice of category.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define each of the L1, L2, L3, L4 and L5 categories under BS 5839-1:2025 in terms of where automatic detection is required',
              'Identify the BS 5839-1:2025 changes affecting L category systems: sleeping rooms reclassified as high-risk (L2), heat detectors banned in sleeping rooms, void-wall wording changed (L3), flue-top detector added (L4), stairway lobbies now require detection',
              'Apply BS 5839-1:2025 21.2.4 ceiling-distance limits (25 mm to 600 mm smoke; 25 mm to 150 mm heat) when siting point detectors',
              'Apply the BS 5839-1:2025 manual-call-point distance limits (30 m straight line / 45 m actual travel) and recognise where shorter distances are appropriate',
              'Use a fire risk assessment under the Regulatory Reform (Fire Safety) Order 2005 to drive category selection, rather than defaulting to a single category',
              'Recognise that the 2025 changes are not retrospective — existing systems remain compliant until material works (extension, modification, system upgrade) trigger the new requirement',
              'Cross-reference BS 7671 Section 560 (safety services) and Approved Document B in the wider design conversation',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What "L" means and why categories exist</ContentEyebrow>

          <ConceptBlock
            title="The life-safety remit"
            plainEnglish="The L prefix in BS 5839-1:2025 denotes life safety. The whole point of an L category system is to provide early warning of fire so that occupants can escape before the fire blocks the escape route or fills it with smoke. Property protection — saving the building or its contents — is at most a secondary outcome of an L system. If property protection is the primary objective, a P category system is selected (covered in Section 2). If only manual activation is required, an M system is selected (Section 3)."
            onSite="When you read 'L1' or 'L2' on a fire strategy document, your first question on site is 'where does the standard say automatic detection must be?' — the category fixes the answer. The numerical suffix (1, 2, 3, 4, 5) is a coverage scale: L1 is most cover, L5 is the smallest, most targeted cover. The selection of the number reflects the life-safety risk evaluated in the fire risk assessment."
          >
            <p>
              Categories are not interchangeable. A specifier cannot say "we want L1 cover but at L4
              cost"; the cost difference reflects a real difference in coverage and therefore a real
              difference in life-safety performance. Likewise, "L2 was good enough for similar
              buildings before, so we will use L2 here" is not how the standard is used — the fire
              risk assessment for THIS building produces the category for THIS building.
            </p>
            <p>The five L categories are:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L1</strong> — highest life-safety coverage. Automatic detection throughout
                the protected building, except for the limited exceptions listed in Annex D.
              </li>
              <li>
                <strong>L2</strong> — escape routes plus rooms opening onto them plus
                designer-identified high-risk rooms. Sleeping rooms are now (from 2025) within this
                envelope.
              </li>
              <li>
                <strong>L3</strong> — escape routes plus rooms opening onto them. The objective is
                early warning of a fire that could block the escape route.
              </li>
              <li>
                <strong>L4</strong> — escape routes only. Minimum L cover; selected where the fire
                strategy concludes that whole-area cover is not justified.
              </li>
              <li>
                <strong>L5</strong> — bespoke. Designer-defined fire-safety objective. Coverage is
                whatever the objective requires.
              </li>
            </ul>
            <p>
              Manual call points are required in every L category — L1, L2, L3, L4 and L5 all
              include manual call points by default. The "/M" suffix (e.g. P1/M, P2/M, L5/M) is used
              only for the categories that do not already include manual call points.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system (clause 5)"
            clause={
              <>
                Category L systems are systems intended for the protection of life. They are
                sub-divided as L1, L2, L3, L4 and L5 according to the extent of automatic detection
                provided.
              </>
            }
            meaning="Two phrases earn close reading. 'Protection of life' — life safety is the load-bearing objective; property is incidental. 'According to the extent of automatic detection' — the suffix number is a coverage scale, and the category selection therefore IS the coverage decision."
          />

          <SectionRule />

          <ContentEyebrow>L1 — automatic detection throughout</ContentEyebrow>

          <ConceptBlock
            title="L1 — the maximum life-safety category"
            plainEnglish="L1 provides automatic fire detection in every part of the protected building. The starting position is 'detection everywhere'; specific areas are excluded only where Annex D of BS 5839-1:2025 lists them as eligible exceptions or where the designer can justify that the area is genuinely of low fire risk and the exclusion does not compromise the life-safety objective. Typical Annex D exceptions: small bathrooms (provided no large quantities of combustible material), small unoccupied toilet cubicles, sanitary accommodation, certain small voids that meet specific dimensional limits."
            onSite="An L1 system is a 'detector in every room' design unless you can point to the specific Annex D exception that applies to a given room. 'It seems unlikely a fire would start there' is not enough — the standard expects a documented justification. On a commissioning visit, every excluded room should be matched to a written justification in the design documentation."
          >
            <p>L1 is selected where:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Sleeping risk exists and the FRA concludes that the highest life-safety cover is
                justified (hospitals, hospices, residential care, larger hotels).
              </li>
              <li>
                Vulnerable occupants are present (limited mobility, very young children, occupants
                whose self-evacuation is doubtful).
              </li>
              <li>
                The fire-strategy escape time is short or the building geometry makes phased
                evacuation high-risk.
              </li>
              <li>
                Insurance, regulatory or contractual requirements specifically demand L1 (e.g.
                certain healthcare specifications, some HMO licensing conditions).
              </li>
            </ul>
            <p>
              A common L1 design fault is treating Annex D as a checklist of "areas to exclude"
              rather than a checklist of "areas where exclusion is acceptable IF the conditions are
              met". The direction of inference matters: every room starts protected; the designer
              must demonstrate the conditions for exclusion before a detector is omitted.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Annex D (informative — areas not requiring detection)"
            clause={
              <>
                For Category L1 systems, automatic fire detection should be provided throughout the
                protected building. Limited exceptions are recognised for areas of low fire risk
                listed in Annex D, where the omission of detection does not materially affect the
                life-safety performance of the system.
              </>
            }
            meaning="Annex D is a permissive list, not a mandatory exclusion. The designer may exclude an Annex D-listed area; the designer is not required to. Where the FRA flags an Annex D-eligible area as raising concern (e.g. a bathroom adjacent to a sleeping area, with a known history of careless smoking), keeping the detector in is the correct response."
          />

          <ConceptBlock
            title="The Annex D exception — read it correctly"
            plainEnglish="Annex D in BS 5839-1:2025 (which was Annex E in 2017 — the lettering changed) lists the categories of area that may be excluded from automatic detection in an L1 design. It is informative, not mandatory. The headings are tightly drawn; a 'large' bathroom is not within the small-bathroom exception, and a void that is taller than the dimensional limit cannot use the small-void exception."
          >
            <p>The Annex D exceptions are typically expressed as:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Small bathrooms, shower rooms, toilet cubicles — provided they do not contain large
                quantities of combustible material and are not occupied for extended periods. A
                bathroom with a tumble drier or a stack of towels and toiletries fails the "no large
                quantities of combustible material" test.
              </li>
              <li>
                Sanitary accommodation — public toilets in commercial settings, similar reasoning.
              </li>
              <li>Lift shafts — subject to top-of-shaft detection separately.</li>
              <li>
                Small voids — subject to dimensional limits (depth, area, volume); a void above the
                limit must have detection.
              </li>
              <li>
                Certain external areas — outdoor stores, covered loading bays, by case-by-case
                judgement.
              </li>
            </ul>
            <p>
              Where Annex D and the FRA disagree, the FRA wins. Annex D allows you to exclude; it
              does not require you to. If the FRA flags a particular bathroom as elevated-risk
              (drying clothes, electric-fire hairdryer storage, smoking history), the detector stays
              in.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* L1 to L5 coverage diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5839-1:2025 L category coverage — at a glance
            </h4>
            <svg
              viewBox="0 0 820 420"
              className="w-full h-auto"
              role="img"
              aria-label="Comparison of L1 through L5 coverage. L1 covers all rooms, L2 covers escape routes plus rooms opening onto them plus high-risk and sleeping rooms, L3 covers escape routes plus rooms opening onto them, L4 covers escape routes only, L5 covers a designer-defined area."
            >
              {/* Title row */}
              <text
                x="410"
                y="24"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="12"
                fontWeight="bold"
              >
                Coverage scales with category — L1 most, L4 least, L5 bespoke
              </text>

              {/* Five building schematics arranged horizontally */}
              {/* L1 */}
              <g>
                <rect
                  x="20"
                  y="60"
                  width="148"
                  height="180"
                  rx="8"
                  fill="rgba(34,197,94,0.08)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="94"
                  y="80"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="13"
                  fontWeight="bold"
                >
                  L1
                </text>
                <text x="94" y="96" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                  All areas
                </text>
                {/* Detector dots — every room */}
                <circle cx="46" cy="120" r="5" fill="#22C55E" />
                <circle cx="94" cy="120" r="5" fill="#22C55E" />
                <circle cx="142" cy="120" r="5" fill="#22C55E" />
                <circle cx="46" cy="160" r="5" fill="#22C55E" />
                <circle cx="94" cy="160" r="5" fill="#22C55E" />
                <circle cx="142" cy="160" r="5" fill="#22C55E" />
                <circle cx="46" cy="200" r="5" fill="#22C55E" />
                <circle cx="94" cy="200" r="5" fill="#22C55E" />
                <circle cx="142" cy="200" r="5" fill="#22C55E" />
                {/* Grid lines suggesting rooms */}
                <line
                  x1="68"
                  y1="102"
                  x2="68"
                  y2="218"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
                <line
                  x1="120"
                  y1="102"
                  x2="120"
                  y2="218"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
                <line
                  x1="28"
                  y1="140"
                  x2="160"
                  y2="140"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
                <line
                  x1="28"
                  y1="180"
                  x2="160"
                  y2="180"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
              </g>

              {/* L2 */}
              <g>
                <rect
                  x="180"
                  y="60"
                  width="148"
                  height="180"
                  rx="8"
                  fill="rgba(132,204,22,0.06)"
                  stroke="#84CC16"
                  strokeWidth="1.6"
                />
                <text
                  x="254"
                  y="80"
                  textAnchor="middle"
                  fill="#84CC16"
                  fontSize="13"
                  fontWeight="bold"
                >
                  L2
                </text>
                <text
                  x="254"
                  y="96"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  Escape + high risk
                </text>
                {/* Escape route corridor (vertical centre) */}
                <rect
                  x="246"
                  y="105"
                  width="16"
                  height="118"
                  fill="rgba(132,204,22,0.18)"
                  stroke="rgba(132,204,22,0.5)"
                  strokeWidth="1"
                />
                {/* Detectors on escape route */}
                <circle cx="254" cy="120" r="5" fill="#84CC16" />
                <circle cx="254" cy="160" r="5" fill="#84CC16" />
                <circle cx="254" cy="200" r="5" fill="#84CC16" />
                {/* Rooms opening onto */}
                <circle cx="206" cy="120" r="5" fill="#84CC16" />
                <circle cx="302" cy="120" r="5" fill="#84CC16" />
                {/* Sleeping room marked H */}
                <circle cx="206" cy="200" r="5" fill="#84CC16" />
                <text
                  x="206"
                  y="215"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  sleep
                </text>
                <line
                  x1="220"
                  y1="102"
                  x2="220"
                  y2="223"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
                <line
                  x1="288"
                  y1="102"
                  x2="288"
                  y2="223"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
              </g>

              {/* L3 */}
              <g>
                <rect
                  x="340"
                  y="60"
                  width="148"
                  height="180"
                  rx="8"
                  fill="rgba(251,191,36,0.06)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="414"
                  y="80"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="13"
                  fontWeight="bold"
                >
                  L3
                </text>
                <text
                  x="414"
                  y="96"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  Escape + opens-onto
                </text>
                <rect
                  x="406"
                  y="105"
                  width="16"
                  height="118"
                  fill="rgba(251,191,36,0.16)"
                  stroke="rgba(251,191,36,0.5)"
                  strokeWidth="1"
                />
                <circle cx="414" cy="120" r="5" fill="#FBBF24" />
                <circle cx="414" cy="160" r="5" fill="#FBBF24" />
                <circle cx="414" cy="200" r="5" fill="#FBBF24" />
                <circle cx="366" cy="120" r="5" fill="#FBBF24" />
                <circle cx="462" cy="120" r="5" fill="#FBBF24" />
                <line
                  x1="380"
                  y1="102"
                  x2="380"
                  y2="223"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
                <line
                  x1="448"
                  y1="102"
                  x2="448"
                  y2="223"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
              </g>

              {/* L4 */}
              <g>
                <rect
                  x="500"
                  y="60"
                  width="148"
                  height="180"
                  rx="8"
                  fill="rgba(249,115,22,0.06)"
                  stroke="#F97316"
                  strokeWidth="1.6"
                />
                <text
                  x="574"
                  y="80"
                  textAnchor="middle"
                  fill="#F97316"
                  fontSize="13"
                  fontWeight="bold"
                >
                  L4
                </text>
                <text
                  x="574"
                  y="96"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  Escape routes only
                </text>
                <rect
                  x="566"
                  y="105"
                  width="16"
                  height="118"
                  fill="rgba(249,115,22,0.16)"
                  stroke="rgba(249,115,22,0.5)"
                  strokeWidth="1"
                />
                <circle cx="574" cy="120" r="5" fill="#F97316" />
                <circle cx="574" cy="160" r="5" fill="#F97316" />
                <circle cx="574" cy="200" r="5" fill="#F97316" />
                <line
                  x1="540"
                  y1="102"
                  x2="540"
                  y2="223"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
                <line
                  x1="608"
                  y1="102"
                  x2="608"
                  y2="223"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
              </g>

              {/* L5 */}
              <g>
                <rect
                  x="660"
                  y="60"
                  width="148"
                  height="180"
                  rx="8"
                  fill="rgba(168,85,247,0.06)"
                  stroke="#A855F7"
                  strokeWidth="1.6"
                />
                <text
                  x="734"
                  y="80"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="13"
                  fontWeight="bold"
                >
                  L5
                </text>
                <text
                  x="734"
                  y="96"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9.5"
                >
                  Designer-defined
                </text>
                {/* L5 — task-specific zone */}
                <rect
                  x="690"
                  y="140"
                  width="88"
                  height="60"
                  rx="4"
                  fill="rgba(168,85,247,0.18)"
                  stroke="rgba(168,85,247,0.7)"
                  strokeWidth="1.2"
                  strokeDasharray="4,3"
                />
                <circle cx="708" cy="160" r="5" fill="#A855F7" />
                <circle cx="760" cy="160" r="5" fill="#A855F7" />
                <circle cx="734" cy="190" r="5" fill="#A855F7" />
                <text
                  x="734"
                  y="220"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  task-specific objective
                </text>
              </g>

              {/* Legend strip */}
              <rect
                x="20"
                y="270"
                width="788"
                height="56"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <text x="38" y="290" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Reading the diagram
              </text>
              <text x="38" y="306" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                Coloured dot = automatic fire detector. Shaded vertical bar = escape-route corridor.
              </text>
              <text x="38" y="320" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                "sleep" tag in L2 = sleeping room — now within L2 detection envelope under BS
                5839-1:2025 (heat detectors not permitted).
              </text>

              {/* 2025 change strip */}
              <rect
                x="20"
                y="346"
                width="788"
                height="56"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="414"
                y="368"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                ⚠ BS 5839-1:2025 changes affecting L category cover
              </text>
              <text
                x="414"
                y="384"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                L2 — sleeping rooms now require detection (heat detectors prohibited) · L3 —
                void-wall wording changed to "solid, no holes"
              </text>
              <text
                x="414"
                y="397"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                L4 — top-of-flue detector now recommended · Stairway lobbies — automatic detection
                now required
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>L2 — escape routes plus high-risk rooms (2025 change)</ContentEyebrow>

          <ConceptBlock
            title="L2 — what coverage really means under the 2025 revision"
            plainEnglish="L2 covers the escape routes, the rooms that open onto the escape routes, and the rooms identified as high fire risk by the designer. The coverage is more than L3 (which stops at escape-routes-plus-opens-onto) but less than L1 (which is everywhere). The 2025 revision substantially changed L2 by adding sleeping rooms to the high-risk category. From 2025, every room in which people sleep — not just bedrooms in dwelling-style accommodation, but any sleeping use including dormitories, on-call rooms, sleep pods — is treated as a high-risk room and must have automatic detection within an L2 system."
            onSite="If you are surveying or commissioning a 2025-design L2 system in a building with sleeping use (hotel, care home, supported housing, hospital, hostel, university hall), every sleeping room must have automatic detection. If you find a sleeping room without a detector, that is a non-compliance under the 2025 revision unless the system was designed and installed before the change took effect (in which case it remains compliant until material works trigger an upgrade)."
          >
            <p>What the 2025 L2 change practically means:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Sleeping rooms = high-risk rooms within L2.</li>
              <li>
                Heat detectors are NO LONGER permitted in those sleeping rooms (in new L2 or L3
                designs). Specify smoke or multi-sensor detection instead. Heat detectors respond
                too late for sleeping occupants.
              </li>
              <li>
                The change is NOT retrospective. Existing systems that comply with BS 5839-1:2017
                and that include heat detectors in sleeping rooms are still compliant. They become
                subject to the 2025 rule when material works (extension, modification, system
                upgrade, refit following a fire) trigger redesign.
              </li>
              <li>
                The trigger for "material works" is essentially the same as that under the
                Regulatory Reform (Fire Safety) Order 2005 and Approved Document B — a substantial
                refurbishment, a change of use, a system extension. A like-for-like replacement of a
                detector head is not a trigger; replacing an entire panel in an extended system is.
              </li>
            </ul>
            <p>
              The 2017 edition allowed heat detectors in sleeping rooms because the L category did
              not demand sleeping-room cover at all in many cases — designers reached for heat
              detectors as a budget compromise. The 2025 revision closes that loophole by both
              requiring cover (the room is now high-risk) and prohibiting the under-performing
              detector type (heat).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Section 14 (use of heat detectors) — guide commentary clause 14"
            clause={
              <>
                With the changes to category L2 systems now including early warning of fire to rooms
                in which occupants sleep, the use of heat detectors is no longer permitted in these
                areas. Similarly, heat detectors should now not be used in rooms where people sleep
                in a category L3 system, albeit the objective of L3 is not to protect persons in
                that room. Despite the previous editions of BS 5839-1 allowing the use of heat
                detectors in sleeping rooms, the new recommendation is not retrospective, so
                existing systems do not need to be changed unless they are undergoing new works e.g.
                a system upgrade.
              </>
            }
            meaning="Three load-bearing phrases. 'No longer permitted' — a hard prohibition for new L2 / L3 designs in sleeping rooms. 'Not retrospective' — existing compliant systems remain compliant. 'Undergoing new works e.g. a system upgrade' — the trigger for the 2025 rule biting is material works, not just the passage of time."
          />

          <CommonMistake
            title="Specifying heat detectors in a 2025 hotel bedroom because 'they are cheaper and the bedrooms are not high-risk'"
            whatHappens="A hotel design produced after BS 5839-1:2025 came into effect specifies optical-smoke detection on the escape routes and heat detection in every bedroom. The reasoning given by the design office: bedrooms are low fire-loading (no kitchen, no laundry), so heat is sufficient and saves money. The hotel is built and signed off on a 2017 specification by a surveyor who was not aware of the 2025 change. Two years later, an enforcement officer reviews the system after a non-fatal fire and identifies the heat detectors in the bedrooms as a non-compliance with BS 5839-1:2025 — sleeping rooms now require non-heat detection. The hotel is required to retrofit smoke or multi-sensor detection at significant cost."
            doInstead="From the 2025 revision onwards, sleeping rooms must have smoke or multi-sensor detection — heat is not permitted. The cost saving is illusory; the retrofit is more expensive than getting it right first time. Update office templates so the default for sleeping rooms in new L2 and L3 designs is smoke or multi-sensor. The heat-detector default is dead for that application."
          />

          <SectionRule />

          <ContentEyebrow>
            L3 — escape routes plus rooms opening onto them (2025 wording change)
          </ContentEyebrow>

          <ConceptBlock
            title="L3 — what the 2025 wording change really fixed"
            plainEnglish="L3 covers the escape routes and the rooms that open onto the escape routes. The objective is early warning of a fire that could block the escape route — fire in a room two doors away that breaks out into the corridor before occupants can pass. L3 does not cover sleeping rooms unless those rooms open onto an escape route (in which case they are covered for the corridor's sake, not the sleeper's). One specific 2025 wording change matters: where a ceiling void is adjacent to the escape route, the wall between the void and the route was previously required to be of 'fire-resisting construction'. The 2025 revision changes that to 'solid construction with no holes in it'."
            onSite="The 2025 change is a clarification, not a relaxation. If you are inspecting a 2017-era L3 system, the wall between a ceiling void and the corridor needed to be fire-resisting. If you are inspecting a 2025-era L3 system, the test is solid + no holes. The 2025 wording is what the standard always meant — an inspector can verify it visually without disputing what counts as 'fire-resisting'."
          >
            <p>The 2025 L3 changes summarised:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Escape-route + opens-onto coverage — unchanged from 2017.</li>
              <li>
                Heat detectors prohibited in any sleeping room within an L3 design (consistent with
                the L2 change). The objective of L3 is not to protect the sleeper, but if a sleeping
                room is covered (because it opens onto the route), the detector type must be smoke
                or multi-sensor, not heat.
              </li>
              <li>
                Void-wall wording: was "fire-resisting construction"; is "solid construction with no
                holes". The objective (smoke must not cross from the void to the route) is
                identical. The verification is now practical.
              </li>
              <li>
                Cross-reference to BS 5839-1:2025 21.2.4 for ceiling-distance limits when siting
                detectors in rooms opening onto escape routes (25 mm to 600 mm for smoke; 25 mm to
                150 mm for heat).
              </li>
            </ul>
            <p>
              An L3 design is the typical 'small office building' default — escape route detection
              in the corridors, plus detection in offices that open onto those corridors. The 'rooms
              opening onto escape routes' coverage is what catches a fire before it breaks out into
              the route; without it, the route detectors give warning only after the route is
              compromised, which defeats the purpose.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system — L3 void-wall commentary"
            clause={
              <>
                A subtle but important change has been made to the terminology around category L3
                systems and ceiling voids. In the 2017 version, the separation of the void of the
                room off the escape route had to be "fire-resisting construction"; this always
                raised the question of "what is fire-resisting construction?" and "how do you
                identify it?". The aim of the clause is to prevent smoke from the void adjacent to
                the escape route compromising the escape route. Whether the wall between them is of
                fire-resisting construction is largely immaterial. It should just be of solid
                construction with no holes in it.
              </>
            }
            meaning="The change reframes a construction descriptor as a performance descriptor. 'Fire-resisting' is a manufacturer-test-certificate concept; 'solid, no holes' is a site-survey concept. Both serve the same fire-safety objective; only the second can be confidently verified by an inspector with a torch."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>L4 — escape routes only (2025 flue-top change)</ContentEyebrow>

          <ConceptBlock
            title="L4 — minimum L cover with one new flue rule"
            plainEnglish="L4 covers the escape routes only. It is the minimum L category — selected where the fire strategy concludes that whole-area cover is not justified but escape routes still need to be monitored. The 2025 revision adds one significant new requirement: where a flue-like structure is present (for example an atrium open to corridors, a large service shaft, or any vertical void that can carry smoke between floors), the L4 system must include a fire detector at the TOP of that structure. Unlike L1, L2, L3 and P1, the L4 wording does not also require a detector within approximately 1.5 m of the penetration on every floor — only the top detector is mandated at L4 grade."
            onSite="The L4 flue-top detector is a new check on commissioning surveys for 2025 systems. Walk the building plans, identify every flue-like structure, and verify a detector at the top of each. Floor-by-floor detection within the flue is a higher-category response (L1, L2, L3, P1) — at L4 the standard expects the top only."
          >
            <p>L4 in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Detection on the escape routes (corridors, stairs, lobbies — see stairway-lobby
                update below).
              </li>
              <li>Manual call points on the escape routes.</li>
              <li>
                NEW for 2025: detector at the top of any flue-like structure penetrating the
                escape-route system.
              </li>
              <li>
                NO detection in rooms opening onto the route (that would push the design to L3).
              </li>
              <li>NO detection in rooms generally (that would push the design to L2 or L1).</li>
            </ul>
            <p>
              L4 is appropriate for short, simple escape routes in modest buildings where the FRA
              concludes the route-only cover is sufficient warning for safe evacuation. It is rarely
              used for sleeping risk; an L3 or L2 (or L1 for vulnerable occupants) is the usual
              choice once sleeping use is in scope. L4 is most often seen in small commercial
              premises with no sleeping risk, simple geometry, and short escape distances.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system — L4 flue commentary"
            clause={
              <>
                A significant change has been made to category L4 with flue-like structures. It is
                now recommended that the flue-like structure should have a fire detector at the top.
                However, unlike categories L1, L2, L3 and P1 systems, it does not recommend a
                detector to be placed within approximately 1.5 m of the penetration on every floor.
              </>
            }
            meaning="Two phrases earn close reading. 'A fire detector at the top' — the top of the flue is where smoke arrives first; that is the early-warning point. 'Does not recommend a detector within ~1.5 m of the penetration on every floor' — at L4 grade, top-only is the standard response; per-floor detection is reserved for the higher categories."
          />

          <ConceptBlock
            title="Stairway lobbies — 2025 change applying to L1, L2, L3 and L4"
            plainEnglish="The 2025 revision withdraws the historic exclusion of stairway lobbies as 'low fire risk' areas. Lobbies are now designated as areas requiring automatic detection. The change recognises that lobbies are the buffer between the protected stair core and the accommodation it serves; a fire in the lobby threatens the stair core and the evacuation strategy that depends on it. The change applies across all L categories that reach the lobby — at minimum that is L4 (since the lobby is on the escape route)."
            onSite="If you are surveying a 2017-era system, the lobby may legitimately have no detector. If you are surveying a 2025 system, the lobby must have automatic detection. On commissioning new 2025 designs, audit every stair-and-lobby junction; missing detectors are a non-compliance."
          />

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system — stairway lobby commentary"
            clause={
              <>
                Stairway lobbies are now designated as areas requiring automatic detection, whereas
                previously, these areas could be excluded from automatic detection requirements as
                they were classed as areas of low fire risk.
              </>
            }
            meaning="'Now designated as areas requiring automatic detection' — the change is mandatory in new designs. 'Previously … excluded … as low fire risk' — the 2017 default was no detection; the 2025 default is detection. Older systems are not retrospectively non-compliant, but new and modified systems must include lobby detection."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>L5 — bespoke task-specific systems</ContentEyebrow>

          <ConceptBlock
            title="L5 — when the standard categories do not fit"
            plainEnglish="L5 is the bespoke category. Coverage is whatever the designer specifies to meet a defined fire-safety objective. Examples: protect a particular high-value process from fire damage that would interrupt evacuation; provide early warning specifically of a smouldering fire in a known ignition-risk room; supplement a sprinkler system with detection in the area not protected by sprinkler heads. The category exists because the L1 to L4 templates do not always match real-world risk profiles. L5 must be documented with the objective clearly stated; an L5 design without a written fire-safety objective is not a compliant L5 design."
            onSite="When you see L5 on a fire strategy, find the written fire-safety objective. Without it, the system is not a compliant L5 — it is an undocumented system. The objective tells you what to inspect and what to test: it identifies which rooms / areas / equipment items the system was intended to protect. Anything outside the objective is not within the L5 remit, but the system as a whole still has a manual call point requirement and routine maintenance requirements as for any L category."
          >
            <p>Typical L5 use cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A specific room (e.g. a pump room serving a sprinkler system) where loss of the room
                to fire would compromise the building's protection.
              </li>
              <li>
                A specific process area (e.g. a small printing operation with elevated solvent risk)
                where targeted detection adds early warning beyond the L1/L2/L3 of the surrounding
                building.
              </li>
              <li>
                A heritage or museum context where a specific gallery requires earlier detection
                than the rest of the building because of irreplaceable contents (this overlaps with
                P1 thinking and the system is sometimes specified L5/M).
              </li>
              <li>
                Compensating for a known design weakness elsewhere — e.g. a complex multi-storey
                atrium where the standard L category template under-protects a specific floor.
              </li>
            </ul>
            <p>
              The /M suffix attaches to L5 (and to P1 and P2) where the designer wants to explicitly
              note that manual call points are included. L1, L2, L3 and L4 already include MCPs by
              default, so the /M suffix is not used with those. An L5/M is "L5 with MCPs"; an L5
              without /M is "L5 with no MCPs" (rare but possible where the bespoke objective
              specifically does not include manual triggering).
            </p>
          </ConceptBlock>

          <Scenario
            title="The 2025 hotel L2 retrofit"
            situation="A 24-bedroom hotel was originally designed and certified to BS 5839-1:2017 with an L2 system: smoke detection on escape routes and in rooms opening onto them, plus heat detectors in every bedroom (acceptable under the 2017 edition because bedrooms were not classed as high-risk rooms in that edition). The hotel is now planning a major refurbishment that will add a four-bedroom extension and replace the fire alarm panel. The fire-alarm contractor is preparing the design for the new works."
            whatToDo="The major refurbishment + new panel = 'undergoing new works' for the purposes of the BS 5839-1:2025 retrospectivity guidance. The 2025 rules now apply. The contractor must redesign the L2 system to: (i) remove the heat detectors from every bedroom (sleeping rooms now high-risk and heat detectors not permitted); (ii) replace them with smoke or multi-sensor detection appropriate to bedroom conditions (multi-sensor reduces false alarms from incidental cooking smells if the bedrooms have minibar microwaves); (iii) confirm stairway lobbies have detection (2025 rule); (iv) add a top-of-flue detector to any atrium or large service shaft if applicable; (v) document the variations from the original 2017 design in the system logbook (2025 rule). The cost is non-trivial but unavoidable."
            whyItMatters="The 2025 changes are not retrospective by themselves, but they bite on the next material works. A contractor or building owner who fails to plan for the rule change at the point of refurbishment ends up either non-compliant or doing the work twice (once for the refurbishment under outdated rules, again under enforcement). The 'undergoing new works' threshold is in essence the same trigger as Building Regs Approved Document B applying to refurbishment — material works pull the design into the current standard."
          />

          <Scenario
            title="The L4 office with an atrium"
            situation="A two-storey office has a compact open-plan ground floor and a first-floor mezzanine with a glass-fronted atrium that runs the full height of the building (both floors). The fire strategy specifies an L4 system — escape routes only. The 2025-design contractor is preparing the detector schedule and reads the L4 commentary in the BS 5839-1:2025 guide."
            whatToDo="The atrium is a flue-like structure (vertical void capable of channelling smoke between floors). Under the 2025 revision, an L4 system in this building must include a detector at the TOP of the atrium. Floor-by-floor detection within the atrium is NOT required at L4 — that is the L1/L2/L3/P1 response. The contractor adds a top-of-atrium detector to the schedule, sites it to give a clear smoke-rise path (not behind a structural beam, not above a ventilation grille that would mask the plume), and documents the choice in the design pack. Stairway lobbies are also reviewed: each lobby must have automatic detection under the 2025 change, even on an L4 design."
            whyItMatters="Atria are common in modern offices and were a known L4 gap under the 2017 edition. The 2025 change closes the gap with a proportionate response — top detector for L4, top-plus-per-floor for the higher categories. A contractor who follows the 2017 wording into a 2025 design misses the new requirement and produces a non-compliant system."
          />

          <SectionRule />

          <ContentEyebrow>Selecting the L category — how the FRA drives the choice</ContentEyebrow>

          <ConceptBlock
            title="The selection hierarchy"
            plainEnglish="L category selection is not arbitrary, and it is not 'whatever the budget allows'. The decision flows from the fire risk assessment required by the Regulatory Reform (Fire Safety) Order 2005, supported by Approved Document B (Building Regulations), the property insurer's requirements, BS 5839-1:2025 itself, and any sector-specific regulation (HMO licensing, healthcare standards, residential care home requirements). The fire-alarm designer is implementing a decision that the responsible person has made about the building's life-safety risk."
            onSite="When asked 'why L1 rather than L2?' or 'why L3 rather than L1?', the answer should always trace back to the FRA. 'The fire risk assessment identified vulnerable occupants and a long escape path; L1 is the proportionate response.' If the FRA does not exist, has not been updated for the building's current use, or contradicts the system specification, that is a finding to flag — not a problem the fire-alarm designer can solve unilaterally."
          >
            <p>The L category selection inputs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Regulatory Reform (Fire Safety) Order 2005.</strong> Places the duty on the
                responsible person to conduct a suitable and sufficient fire risk assessment and to
                act on its findings. The L category is part of acting on the FRA's findings.
              </li>
              <li>
                <strong>Approved Document B (Building Regulations).</strong> Sets out the design
                expectations for new buildings and material refurbishments. ADB does not prescribe
                BS 5839-1 categories directly, but its guidance frequently leads to L1 / L2 / L3
                outcomes by way of escape-route and detection expectations.
              </li>
              <li>
                <strong>Property insurer's requirements.</strong> Many commercial property insurers
                require a specific L or P category as a condition of cover. Insurer requirements can
                push the design to a higher category than ADB or the FRA alone would justify.
              </li>
              <li>
                <strong>BS 5839-1:2025 itself.</strong> The category coverage rules; the 2025
                changes covered above.
              </li>
              <li>
                <strong>Sector-specific regulation.</strong> HMO licensing, hospital fire-safety
                guidance (HTM 05-03), care-home regulation, school-specific guidance, sleeping
                accommodation standards — all can demand a specific category.
              </li>
              <li>
                <strong>Fire engineering solution.</strong> Where the standard category templates do
                not match the building, a fire engineering approach can be used to justify a bespoke
                solution (often L5, sometimes a combination such as L2 + L5).
              </li>
            </ul>
            <p>
              The fire-alarm designer's role is to translate the responsible person's decision into
              a compliant detection scheme. If the FRA points to L1 and the budget points to L4, the
              correct response is to escalate the disagreement, not to silently install L4. The
              responsible person owns the risk decision; the designer owns the technical
              implementation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 9 (Risk Assessment)"
            clause={
              <>
                The responsible person must make a suitable and sufficient assessment of the risks
                to which relevant persons are exposed for the purpose of identifying the general
                fire precautions he needs to take to comply with the requirements and prohibitions
                imposed on him by or under this Order.
              </>
            }
            meaning="The FRA is the legal anchor for fire-safety decisions including the BS 5839-1 category selection. 'Suitable and sufficient' means proportionate to the risk and informed by competent assessment; an FRA that omits the building's actual use, occupancy or geometry is not suitable and sufficient. The fire alarm category follows from the FRA's findings, not the other way round."
          />

          <CommonMistake
            title="Picking a category from the budget rather than the fire risk assessment"
            whatHappens="A medium-sized hostel commissions a fire-alarm refurbishment. The budget allows for 24 detectors. The contractor counts the corridors and rooms-opening-onto, sees that 24 detectors will give an L3 layout, and proposes L3. The FRA — produced two years earlier and not consulted on this project — actually identifies the hostel as sleeping-risk with vulnerable occupants and recommends L1. The contractor signs off the L3 system, which is installed and put into service. Six months later, an enforcement officer reviews the system after a complaint, identifies the L3 / FRA mismatch as a non-compliance with the responsible person's duty, and requires retrofit to L1. The retrofit costs more than the original installation."
            doInstead="Read the FRA before producing the design. If the FRA recommends L1 and the budget covers L3 only, escalate to the responsible person — the design decision is theirs, not yours. Document the conversation. If the responsible person directs L3 anyway, get that direction in writing and reflect it in the design statement. The technical decision is binary (L1 or L3); the responsibility for taking it is the responsible person's."
          />

          <CommonMistake
            title="Treating the 2025 changes as discretionary 'best practice'"
            whatHappens="A fire-alarm contractor designs a 2026 hotel L2 system and includes heat detectors in the bedrooms 'for cost reasons', noting on the drawings that 'BS 5839-1:2025 prefers smoke detection here, but heat is acceptable as a variation'. The system is installed; the installer sees the drawing note and signs off. Three years later, a small bedroom fire produces enough heat to reach the heat detector but not before extensive smoke logging. The post-incident investigation identifies the heat detectors as non-compliant with BS 5839-1:2025 (heat is not permitted in sleeping rooms in new L2 / L3 designs); the 'variation' note is found to be unsupported; the design and the install are both deficient."
            doInstead="Some BS 5839-1 recommendations are appropriately handled as variations; the 2025 prohibition of heat detectors in sleeping rooms in new L2 / L3 designs is not one of them. The 2025 wording is 'no longer permitted', not 'not preferred'. Treat the prohibition as a hard constraint. If a specific deployment problem makes smoke / multi-sensor difficult, the right answer is engineering work to solve the problem (steam-tolerant multi-sensor, alternative siting), not a variation back to a now-prohibited detector type."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            BS 7671 cross-reference — fire alarm circuits and Section 560
          </ContentEyebrow>

          <ConceptBlock
            title="Fire alarm circuits as safety services"
            plainEnglish="Fire alarm and detection circuits fall within BS 7671 Section 560 (electrical installations for safety services). The fire-alarm designer's choice of cabling, supply arrangements and segregation must be consistent with both BS 5839-1:2025 (the fire-side standard) and BS 7671 (the wiring-side standard). The two standards work together: BS 5839-1 specifies the fire-detection performance; BS 7671 specifies the electrical installation that delivers that performance. A 2025 fire alarm in a building with a BS 7671 A4:2026-compliant electrical installation will benefit from clarified requirements on TN-C-S earthing arrangements and AFDD provision in higher-risk premises."
            onSite="When you commission an L category system, you are also commissioning a Section 560 safety-service circuit. The Section 560 implications include cable type (fire-resisting), routing, segregation from non-essential circuits, supply continuity, and the disconnection time of any protective device upstream. Coordination between the fire-alarm contractor and the electrical contractor on a project is part of getting the installation right."
          >
            <p>BS 7671 Section 560 — practical implications for fire alarm circuits:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable type.</strong> Fire-resisting cable specified for the fire-alarm
                circuits, conforming to the appropriate BS EN 50200 / BS 8434 / BS 8491 standard. BS
                5839-1:2025 clause 16 (cabling, labelling and identification) clarifies that fire
                alarm cables and the low-voltage mains supply should be of a single common colour,
                with red preferred.
              </li>
              <li>
                <strong>Identification.</strong> The 2025 revision incorporates BS 7671 A2:2022
                wiring regulations on identification (IEC 60445): the functional earth conductor is
                identified by pink or marked "FE" (changed from cream in earlier editions).
                Batteries should be labelled with the date of installation.
              </li>
              <li>
                <strong>Supply.</strong> Continuous availability of supply is the load-bearing
                Section 560 concept. Fire-alarm panels typically use a primary supply backed by
                standby batteries; the BS 5839-1:2025 alarm-transmission rule (14.17 — 90 s
                indication of fire alarm signal at the ARC) depends on supply integrity.
              </li>
              <li>
                <strong>Segregation.</strong> Fire alarm circuits should be segregated from other
                circuits to prevent a fault on a non-fire circuit propagating to the fire system.
                The segregation rules in BS 7671 Section 528 apply.
              </li>
              <li>
                <strong>AFDD relevance.</strong> BS 7671 A4:2026 expands AFDD requirements in
                certain higher-risk premises (sleeping accommodation, certain HMOs). An installation
                with AFDDs reduces the risk of a wiring-fault-driven fire that the BS 5839-1:2025
                detection system would then need to detect. AFDDs are not a substitute for a fire
                alarm; they are a complementary risk-reduction layer upstream.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS 5839-1:2025 21.2.4 — detector siting from ceiling</ContentEyebrow>

          <ConceptBlock
            title="Where to place point detectors below the ceiling"
            plainEnglish="BS 5839-1:2025 21.2.4 (which was 22.3 in the 2017 edition) sets the distances from the ceiling at which point detectors should be sited. The technical recommendation is unchanged from 2017; only the clause numbering changed. For smoke detectors, the sensitive element should be 25 mm to 600 mm below the ceiling. For heat detectors, the range is much tighter: 25 mm to 150 mm. The smoke range allows for the smoke layer to develop below the ceiling without losing early-detection sensitivity; the tighter heat range reflects the ceiling-jet behaviour of hot gases hugging the ceiling."
          >
            <p>BS 5839-1:2025 21.2.4 quoted directly:</p>
            <p className="italic text-[14px] text-white/80 border-l-2 border-elec-yellow/50 pl-4 my-2">
              "Other than within rooms in a Category L3 system (see 21.2.5), in voids (see 21.2.7)
              or where a horizontal ceiling comprises a series of small cells (see 21.2.13 and
              21.2.14), fire detectors should be sited on ceilings, such that their sensitive
              elements are between the following distances below ceilings: a) 25 mm to 600 mm for
              smoke detectors; and b) 25 mm to 150 mm for heat detectors."
            </p>
            <p>
              The 25 mm minimum prevents the detector being too close to the ceiling surface (where
              dust and stagnant air can mask the sensing chamber). The 600 mm / 150 mm maxima keep
              the detector within the smoke layer / ceiling jet that develops in a real fire. Going
              below those depths puts the detector outside the fire-driven flow and delays
              detection.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 21.2.4 (siting of point detectors below ceilings)"
            clause={
              <>
                Other than within rooms in a Category L3 system (see 21.2.5), in voids (see 21.2.7)
                or where a horizontal ceiling comprises a series of small cells (see 21.2.13 and
                21.2.14), fire detectors should be sited on ceilings, such that their sensitive
                elements are between the following distances below ceilings: a) 25 mm to 600 mm for
                smoke detectors; and b) 25 mm to 150 mm for heat detectors.
              </>
            }
            meaning="The clause is the central detector-siting rule for BS 5839-1:2025. The distances are unchanged from 2017; the numbering changed (was 22.3, is now 21.2.4) and the cross-references updated to point at the renumbered subclauses for L3, voids and small-cell ceilings."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'L1 — automatic detection throughout the protected building. Annex D lists the limited exceptions; the designer must justify each exclusion.',
              'L2 — escape routes + rooms opening onto + HIGH-RISK ROOMS. From BS 5839-1:2025, sleeping rooms ARE high-risk rooms and must have detection. Heat detectors no longer permitted in sleeping rooms.',
              'L3 — escape routes + rooms opening onto. 2025 changed the void-wall wording from "fire-resisting construction" to "solid construction with no holes". Same objective, clearer test.',
              'L4 — escape routes only. 2025 NEW: detector at the TOP of every flue-like structure (no per-floor requirement at L4 grade).',
              'L5 — bespoke task-specific. Coverage = whatever the documented fire-safety objective requires. An undocumented L5 is not a compliant L5.',
              'Stairway lobbies — 2025 NEW: now require automatic detection regardless of L category (previously could be excluded as low fire risk).',
              'BS 5839-1:2025 21.2.4 — point-detector siting: 25 mm to 600 mm below ceiling for smoke; 25 mm to 150 mm for heat.',
              'Selection of category is risk-assessment driven: RRO 2005 Article 9 + Approved Document B + insurer requirements + sector-specific guidance + BS 5839-1:2025.',
              'The 2025 changes are NOT retrospective. Existing systems remain compliant until material works (extension, modification, system upgrade) trigger redesign.',
              'BS 7671 Section 560 (safety services) and A4:2026 AFDD provisions interlink with the BS 5839-1:2025 detection design.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Are the BS 5839-1:2025 changes to L category systems retrospective?',
                answer:
                  'No. Existing systems that comply with BS 5839-1:2017 remain compliant. The 2025 rules apply to new designs and to existing systems undergoing material works (extension, modification, panel replacement, system upgrade). An older L2 hotel system with heat detectors in bedrooms is not retrospectively non-compliant; it becomes subject to the 2025 rule on the next material works.',
              },
              {
                question:
                  'My L2 client wants heat detectors in the bedrooms because they are cheaper and the bedrooms are low-risk. Can I install them under the 2025 standard?',
                answer:
                  'No. From BS 5839-1:2025, heat detectors are not permitted in sleeping rooms within new L2 (or L3) designs. The standard\'s wording is "no longer permitted", not "not preferred". You must specify smoke or multi-sensor detection. Multi-sensor is often the right answer where cooking-style or steam interference is a concern (e.g. en-suite bathroom adjacent to a bedroom).',
              },
              {
                question: 'How do I know whether to specify L1 or L2 for a sleeping-risk building?',
                answer:
                  "Read the fire risk assessment. The FRA — produced under the Regulatory Reform (Fire Safety) Order 2005 — identifies the life-safety risk profile and informs the category choice. Vulnerable occupants, long escape paths, complex geometry, sector-specific regulation (HMO licensing, healthcare standards, care-home regulation) and insurer requirements all push the choice up the L-category ladder. The fire-alarm designer implements the responsible person's decision; the designer does not own the choice unilaterally.",
              },
              {
                question: 'Does the 2025 stairway-lobby rule apply to L4 systems?',
                answer:
                  'Yes. Stairway lobbies are part of the escape route, so any L category that protects escape routes (L1, L2, L3, L4) must include detection in the lobbies. The 2025 change withdraws the "low fire risk" exclusion that 2017 designs sometimes used to omit lobby detection. On commissioning a 2025 design, audit every stair-and-lobby junction.',
              },
              {
                question:
                  'What counts as a "flue-like structure" for the L4 top-of-flue requirement?',
                answer:
                  'A vertical void capable of carrying smoke between floors. Typical examples: open-plan atria, large service shafts, lift shafts that open to corridors (closed lift shafts have separate top-of-shaft requirements), structural voids that connect floors. A stairwell is not a flue-like structure for this purpose (it is the escape route itself and is covered by route detection); the rule targets non-stair vertical voids that smoke can travel through.',
              },
              {
                question: 'What is the relationship between BS 5839-1:2025 and BS 7671 A4:2026?',
                answer:
                  'They cover different aspects of the same problem. BS 5839-1:2025 covers the fire-detection design (categories, detector types, siting, alarm transmission). BS 7671 A4:2026 covers the electrical installation that powers and connects the fire-alarm system: cable type, identification, segregation, supply integrity (Section 560 safety services), and AFDD provision in certain higher-risk premises. A compliant overall installation needs both standards applied together.',
              },
              {
                question:
                  'When does the BS 5839-1:2025 21.2.4 ceiling-distance rule (25 to 600 mm smoke / 25 to 150 mm heat) apply?',
                answer:
                  'For point detectors sited on flat horizontal ceilings — the most common case. The clause itself excludes (i) rooms within an L3 system (where 21.2.5 applies), (ii) voids (where 21.2.7 and the void-depth figure apply: top 125 mm for ≤ 1.25 m voids, top 10% for 1.25 to 1.5 m voids, normal-room treatment for > 1.5 m voids), and (iii) small-cell ceilings (21.2.13 / 21.2.14). For sloping ceilings, beam-and-channel ceilings, and very high ceilings, dedicated subclauses elsewhere in section 21 apply.',
              },
              {
                question:
                  'Is there a "minimum acceptable" L category beneath which a system is non-compliant by default?',
                answer:
                  'No — but BS 5839-1:2025 introduces the concept of variations that are NOT acceptable. The standard now lists certain departures (e.g. absence of a zone plan in a multi-zone building with sleeping accommodation; absence of an alarm-transmission facility to an ARC in supported housing or residential care homes where Grade A applies) as variations that should NOT be regarded as acceptable. For these specific cases, the variation is in effect prohibited; for everything else, variations remain possible but require justification and documentation in the system logbook.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="L category systems — Module 1.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-1/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 P category systems
              </div>
            </button>
          </div>

          <div className="hidden">
            <Flame />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule1Section1;
