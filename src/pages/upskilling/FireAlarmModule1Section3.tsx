import { ArrowLeft, ChevronLeft, ChevronRight, BellRing } from 'lucide-react';
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
    id: 'fam1-s3-purpose',
    question: 'What does a Category M system under BS 5839-1:2025 consist of?',
    options: [
      'Automatic detection only, with no manual call points.',
      'A combination of manual call points and automatic detection.',
      'Manual call points only, with no automatic detection element.',
      'Smoke control plant operated by a manual override switch.',
    ],
    correctIndex: 2,
    explanation:
      '"M" = manual. Category M is the manual-only category — sounders, MCPs and a panel, with no smoke or heat detectors. It provides a means for occupants to summon help by operating a call point. Selection of M is appropriate only where the FRA concludes automatic detection adds no material benefit: very small premises, fully attended areas with high occupant alertness, or premises where detection would be impractical and warning would propagate by other means.',
  },
  {
    id: 'fam1-s3-distance',
    question:
      'BS 5839-1:2025 simplified the manual-call-point distance rules. What are the maximum straight-line and actual-travel distances from any point in the protected area to the nearest MCP?',
    options: [
      '20 m straight line / 30 m actual travel.',
      '30 m straight line / 45 m actual travel.',
      '50 m straight line / 75 m actual travel.',
      '15 m straight line / 25 m actual travel.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 simplified the distance rules to a clear pair: 30 m straight-line, 45 m actual-travel. These are maximums, not targets — designers can specify shorter distances where the FRA, the building geometry or the occupant profile justify it (process areas with high ignition risk, premises with restricted-mobility occupants). The figures are unchanged from custom and practice. MCPs in stairway landings (other than the final exit level) are now incorporated within the zone serving the adjacent accommodation per 12.1 a).',
  },
  {
    id: 'fam1-s3-height',
    question:
      'BS 5839-1:2025 clarified the manual-call-point mounting height. Mount-height is 1.4 m above floor level — what tolerance does the standard now allow?',
    options: [
      'No tolerance at all — the MCP must be exactly 1.4 m above the floor.',
      'Plus or minus 50 mm relative to the 1.4 m datum.',
      'Plus 200 mm and minus 300 mm — a 1.1 m to 1.6 m window.',
      'Plus or minus 500 mm relative to the 1.4 m datum.',
    ],
    correctIndex: 2,
    explanation:
      'BS 5839-1:2025 12 (call points) clarified the tolerance as +200 mm / -300 mm relative to the 1.4 m datum, so 1.1 m to 1.6 m is the acceptable window; outside it the install is non-compliant. The 2025 wording quantifies a tolerance previous editions left implicit, removing arguments about whether a slightly high or low installation was a non-compliance. The downward asymmetry is deliberate — slightly lower is always acceptable for occupants of lower stature or wheelchair users.',
  },
  {
    id: 'fam1-s3-cover',
    question:
      'BS 5839-1:2025 introduced a 2017 recommendation as a now-firm specification for manual-call-point protective covers. What is the new recommendation?',
    options: [
      'Covers should be permanently locked to prevent any activation.',
      'Covers should be transparent so the MCP behind them is visible.',
      'Covers should be of solid metal to resist impact and tampering.',
      'Covers are no longer permitted and should be removed from MCPs.',
    ],
    correctIndex: 1,
    explanation:
      'The 2017 edition introduced protective covers as a recommendation; the 2025 revision now firmly recommends those covers be transparent. Transparency lets occupants verify in an emergency that the device behind the cover is an MCP and operates as expected, where an opaque cover introduces hesitation. The cover still prevents accidental and malicious activation while preserving immediate operability in a genuine emergency.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the "M" prefix denote in BS 5839-1:2025 system categorisation?',
    options: [
      'Multiple zones — a multi-zone detection layout.',
      'Manufactured — a factory-assembled panel type.',
      'Mains-powered — a non-battery-backed supply.',
      'Manual — manual call points only, with no automatic detection.',
    ],
    correctAnswer: 3,
    explanation:
      '"M" = manual. The category is the simplest under BS 5839-1:2025 — sounders, MCPs and a panel, with no automatic detection. The whole category is built around occupants summoning help by operating an MCP. Selection is FRA-driven and limited: typically very small premises with high occupant alertness, or fully attended areas where occupants would discover a fire by direct observation before any detector would respond.',
  },
  {
    id: 2,
    question: 'Which categories under BS 5839-1:2025 have NO automatic detection?',
    options: [
      'L4 only, since it is the minimum-coverage L category.',
      'L4 and L5, the two lowest-coverage L categories.',
      'M only, the standalone manual-only category.',
      'P1 and P2, since property cover does not need detection.',
    ],
    correctAnswer: 2,
    explanation:
      'Category M is the only BS 5839-1:2025 category without automatic detection. L1, L2, L3, L4, L5, P1 and P2 all include automatic detection (the L suffix describes the extent; the P suffix describes full or targeted). The /M suffix on other categories (P1/M, P2/M, L5/M) adds manual call points to a category that does not include them by default — but those categories still have their automatic detection. Standalone "M" has neither suffix nor automatic detection.',
  },
  {
    id: 3,
    question:
      'BS 5839-1:2025 simplified the manual-call-point distance rules. What is the maximum straight-line distance from any point in the protected area to the nearest MCP?',
    options: [
      '30 m straight-line distance (with 45 m actual travel).',
      '20 m straight-line distance (with 30 m actual travel).',
      '60 m straight-line distance (with 90 m actual travel).',
      '100 m straight-line distance (with 150 m actual travel).',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5839-1:2025 distance limits: 30 m straight-line / 45 m actual-travel. Both apply — the MCP must satisfy each. These are maximum limits; designers can specify shorter distances where building geometry, occupant profile or risk demands it. The 2025 simplification removed earlier conditional wording while retaining the figures. Where straight-line distance is short but actual-travel is long (winding corridors, staircases), the actual-travel figure is the binding constraint.',
  },
  {
    id: 4,
    question: 'What mounting-height tolerance does BS 5839-1:2025 allow for manual call points?',
    options: [
      'No tolerance — the MCP must be exactly 1.4 m above the floor.',
      'Plus or minus 50 mm relative to the 1.4 m datum.',
      'Plus or minus 500 mm relative to the 1.4 m datum.',
      'Plus 200 mm and minus 300 mm — a 1.1 m to 1.6 m window.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-1:2025 12 quantifies the tolerance earlier editions left implicit: +200 mm / -300 mm relative to the 1.4 m datum, so the MCP may be mounted anywhere between 1.1 m and 1.6 m. Outside that window the installation is non-compliant. The downward asymmetry recognises accessibility for occupants of lower stature and wheelchair users. Designers should aim for the 1.4 m datum and allow normal installation variation; the tolerance is the install boundary, not the design target.',
  },
  {
    id: 5,
    question:
      'What change does BS 5839-1:2025 make to the protective covers fitted over manual call points?',
    options: [
      'It removed the cover recommendation introduced in 2017.',
      'It requires the protective covers to be of solid metal.',
      'It recommends the protective covers be transparent.',
      'It requires the protective covers to be permanently locked.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5839-1:2025 retains the 2017 recommendation for protective covers and now recommends they be transparent. The reasoning is operational — in a real emergency a transparent cover lets occupants verify the device is an MCP and operates correctly without hesitation, whereas an opaque cover slows recognition. The cover continues to perform its anti-malicious-activation function while preserving immediate operability.',
  },
  {
    id: 6,
    question:
      'BS 5839-1:2025 12.1 a) clarifies how MCPs on stairway landings should be assigned to fire detection zones. What is the rule?',
    options: [
      'Each landing MCP belongs to the zone serving the adjacent accommodation.',
      'Each landing MCP is allocated to its own dedicated single-device zone.',
      'Each landing MCP belongs to the single zone covering the whole stairway.',
      'MCPs located in stairways are exempt from zoning requirements entirely.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5839-1:2025 12.1 a) states that a landing MCP on each level (other than at a final exit level) is incorporated within the zone that serves the adjacent accommodation on that level, not the stairway zone itself. The 2025 revision removed an earlier "enclosed stairway" reference that caused interpretation disputes. The reasoning is operational — when an MCP is operated, the responding investigator needs to know which accommodation level the alarm came from, not just "somewhere in the stairway".',
  },
  {
    id: 7,
    question:
      'A small standalone retail unit (single open-plan sales area, fully staffed during operating hours, no overnight occupation, fire risk assessment concludes minimal automatic-detection benefit) is being designed in 2026. The fire strategy specifies a Category M system. What does the designer install?',
    options: [
      'Optical smoke detection throughout the open-plan sales area.',
      'Heat detectors only, sited across the sales floor.',
      'Multi-sensor detectors only, throughout the unit.',
      'Manual call points, sounders and a panel — with no automatic detection.',
    ],
    correctAnswer: 3,
    explanation:
      'A standalone Category M system has MCPs (sited per the 30 m / 45 m distance and 1.4 m height rules), sounders providing audible warning across the protected area, a CIE (panel), standby battery support if a separate PSU is used, and alarm transmission to an ARC if the FRA specifies it — but no automatic smoke or heat detectors. The category exists for premises where the FRA concludes automatic detection is not justified. M would be inappropriate for premises with overnight occupation or sleeping risk; there the FRA points to an L category.',
  },
  {
    id: 8,
    question:
      'A 2026 night-club proposes a Category M system on the basis that "it is fully attended during opening hours". What is the most likely problem with this specification?',
    options: [
      'The installed cost of the chosen detection equipment.',
      'The choice of fire-resistant cabling for the sounder circuits.',
      'The fire risk assessment, which points away from a manual-only system.',
      'The type of standby battery fitted to the control panel.',
    ],
    correctAnswer: 2,
    explanation:
      'A night-club has dim lighting, loud noise that masks fire signs, high occupant density, alcohol-impaired occupants, restricted exits and a high ignition load (cooking, smoking, electrical equipment). A suitable and sufficient FRA under the Regulatory Reform (Fire Safety) Order 2005 will almost certainly identify automatic detection as necessary, so an M-only system would not meet the responsible person\'s duty. "Fully attended" is a starting point, not a complete answer — the FRA drives category selection and here points to L-category cover.',
  },
  {
    id: 9,
    question:
      'What is the 2025 BS 5839-1 stance on the use of fire alarm sounders for non-fire signals (e.g. school class-change tones, lockdown alarms)?',
    options: [
      'Now permitted with conditions, where distinct tones distinguish each signal.',
      'Strictly prohibited; fire sounders must never carry any non-fire signal.',
      'Permitted only in schools, and only for class-change tones.',
      'Permitted with no restrictions on tone, message or building type.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5839-1:2025 15.1.12 permits non-fire use of the sounders provided different tones or messages distinguish each warning (or the required response is identical — immediate evacuation by all escape routes). School class-change signals can use the same sounders, with the class-change duration extended from 5 to 10 seconds to address data lag in addressable systems. Lockdown alarms are acknowledged as a common school use, supported by separate FIA guidance.',
  },
  {
    id: 10,
    question:
      'BS 5839-1:2025 introduces a clarification on remote indicator LED colour. What does the standard now require?',
    options: [
      'Any colour, at the installer\'s discretion to suit the decor.',
      'Green, to match emergency-exit signage conventions.',
      'Yellow, to align with hazard and caution colour coding.',
      'Red, the specified visual-indication colour for all remote indicators.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-1:2025 12 (remote indicators) now specifies red as the visual-indication colour for all remote indicators, removing earlier ambiguity and ensuring consistency across installations. Remote indicators should be checked for correct operation at the annual service visit and verified that they have not been obstructed or painted over.',
  },
];

const FireAlarmModule1Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'M category systems — manual only | Fire Alarm Module 1.3 | Elec-Mate',
    description:
      'BS 5839-1:2025 Category M (manual only) systems: when M is appropriate, MCP siting (30 m / 45 m), mounting height (1.4 m with +200 / -300 mm tolerance), transparent protective covers, sounder use for non-fire signals, remote indicator colour.',
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
            eyebrow="Module 1 · Section 3"
            title="M category systems — manual only"
            description="BS 5839-1:2025 Category M: manual call points only with no automatic detection. When M is appropriate, the 2025 MCP siting and mounting clarifications, transparent protective covers, sounder use for non-fire signals, and the remote indicator colour rule."
            tone="yellow"
          />

          <TLDR
            points={[
              'M = manual. Manual call points only, no automatic detection. The simplest BS 5839-1:2025 category.',
              'Selection of M is FRA-driven and limited — typically very small premises, fully attended areas with high alertness, places where the FRA concludes automatic detection adds no material benefit.',
              'BS 5839-1:2025 simplified MCP distance rules: 30 m straight-line distance, 45 m actual-travel distance. Both must be met.',
              'BS 5839-1:2025 12 quantifies the MCP mounting-height tolerance: +200 mm and -300 mm relative to 1.4 m. Acceptable window is 1.1 m to 1.6 m.',
              'BS 5839-1:2025 firms up protective covers — transparent covers are now recommended (not opaque). Transparency preserves operational clarity in emergencies.',
              'Stairway landing MCPs (except final-exit level) are now incorporated in the zone serving the adjacent accommodation per 12.1 a) — a 2025 wording clarification.',
              'Sounder use for non-fire signals (class-change in schools, lockdown alarms) is now permitted under BS 5839-1:2025 15.1.12 with conditions; class-change limited to 10 seconds.',
              'Remote indicators must be RED (BS 5839-1:2025 12). Annual service verifies the indicator is unobstructed and operates correctly.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define a BS 5839-1:2025 Category M system: manual call points only, no automatic detection',
              'Identify the limited circumstances where M is an appropriate selection (FRA-driven; small / fully-attended premises) and where it is not (sleeping risk, complex geometry, high ignition load)',
              'Apply BS 5839-1:2025 MCP distance limits: 30 m straight-line and 45 m actual-travel from any point in the protected area to the nearest MCP',
              'Apply BS 5839-1:2025 12 MCP mounting-height tolerance: +200 mm / -300 mm relative to 1.4 m datum (so 1.1 m to 1.6 m acceptable window)',
              'Apply BS 5839-1:2025 protective-cover requirements: transparent covers preferred',
              "Assign stairway landing MCPs to the correct fire detection zone per BS 5839-1:2025 12.1 a) — adjacent accommodation's zone, not the stairway zone (except at final exit levels)",
              'Apply BS 5839-1:2025 15.1.12 rules for non-fire sounder use (class-change in schools, lockdown signals) with the 10-second class-change duration limit',
              'Apply BS 5839-1:2025 12 remote-indicator colour rule (red) and the annual service check (unobstructed, operational)',
              "Cross-reference BS 7671 Section 560 (safety services) for an M-system's electrical installation",
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What "M" means and when it is appropriate</ContentEyebrow>

          <ConceptBlock
            title="The manual-only remit"
            plainEnglish="The M prefix in BS 5839-1:2025 denotes a system with manual call points only. There is no automatic detection element — no smoke detectors, no heat detectors, no multi-sensor detectors. Sounders, MCPs and a panel are present; the warning depends entirely on a person seeing a fire and operating an MCP. The category exists because some premises have circumstances where automatic detection adds no material benefit to the life-safety or property-protection objective: very small spaces where occupants would directly observe any fire long before a detector responded; fully-attended-only areas where staff alertness is the operational protective measure; specific narrow contexts where automatic detection would be counterproductive (chronic false-alarm environments where the FRA prefers manual operation backed by other measures)."
            onSite="Reading 'M' on a fire strategy is rare and should always trigger a check of the FRA. The FRA must explicitly justify why automatic detection is not necessary. 'M was on the spec' is not enough — the responsible person under the RRO 2005 has a duty to make a suitable and sufficient assessment of risk, and choosing M ahead of any L category is a risk decision that needs documentation."
          >
            <p>Where M is potentially appropriate:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Very small premises.</strong> A small open-plan retail unit where the entire
                space is visible to staff and customers; a small workshop with a single occupant who
                can see the whole space.
              </li>
              <li>
                <strong>Fully attended-only premises.</strong> An office space used only during
                attended hours, with high staff alertness and direct lines of sight, and where the
                FRA concludes attended observation provides earlier warning than detector response
                would.
              </li>
              <li>
                <strong>
                  Premises where automatic detection is impractical and warning propagates by other
                  means.
                </strong>{' '}
                Some specific industrial contexts — short-duration operations, non-occupied during
                operating hours.
              </li>
              <li>
                <strong>
                  Premises explicitly excluded by the standard from the L-category demand and where
                  insurance / regulation does not require P cover.
                </strong>{' '}
                Genuinely low-risk one-storey commercial premises with no sleeping use.
              </li>
            </ul>
            <p>Where M is NOT appropriate:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Any premises with sleeping use — occupants asleep cannot observe a fire to operate
                an MCP. L category is required.
              </li>
              <li>
                Complex geometry where lines of sight are obstructed (multiple rooms, partitions,
                multi-storey).
              </li>
              <li>
                Premises with high ignition load — kitchens, plant rooms, equipment-intensive
                spaces; the ignition risk outpaces manual observation.
              </li>
              <li>
                Premises with restricted-mobility occupants or vulnerable occupants — early warning
                is essential.
              </li>
              <li>
                Premises with low occupant alertness — alcohol service (night-clubs, pubs), dim
                lighting, loud ambient noise.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system (clause 5)"
            clause={
              <>
                Category M systems are manual fire alarm systems. They have no automatic fire
                detection or fire alarm devices, only manual call points by which occupants can
                trigger the alarm.
              </>
            }
            meaning="The clause is short and definitive. 'No automatic fire detection' — the absence is the defining feature. 'Manual call points by which occupants can trigger the alarm' — the system depends entirely on occupants observing a fire and reaching an MCP. Selection of M is therefore a statement that those occupants will notice a fire in time, will be able to reach an MCP in time, and will operate it correctly — all of which the FRA must support."
          />

          {/* Manual-only system layout diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Category M — manual-only system layout
            </h4>
            <svg
              viewBox="0 0 820 420"
              className="w-full h-auto"
              role="img"
              aria-label="Category M manual-only fire alarm system layout. Shows MCPs sited around the protected area subject to 30 m straight-line and 45 m actual-travel distance limits. No automatic detectors. Sounders provide warning; the panel is centrally located."
            >
              {/* Title */}
              <text
                x="410"
                y="24"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="12"
                fontWeight="bold"
              >
                M-only — MCPs and sounders only, no automatic detection
              </text>

              {/* Building outline */}
              <rect
                x="60"
                y="60"
                width="700"
                height="240"
                rx="10"
                fill="rgba(251,191,36,0.04)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="410"
                y="85"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                PROTECTED AREA
              </text>

              {/* Internal partitions */}
              <line
                x1="220"
                y1="60"
                x2="220"
                y2="300"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="4,2"
              />
              <line
                x1="420"
                y1="60"
                x2="420"
                y2="300"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="4,2"
              />
              <line
                x1="600"
                y1="60"
                x2="600"
                y2="300"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="4,2"
              />

              {/* Final exit */}
              <rect
                x="380"
                y="294"
                width="80"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="420"
                y="304"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                EXIT
              </text>

              {/* MCP locations — square red boxes with M label */}
              {/* Each MCP placement satisfies 30 m straight-line / 45 m actual travel */}
              <g>
                <rect
                  x="100"
                  y="120"
                  width="22"
                  height="22"
                  rx="3"
                  fill="rgba(239,68,68,0.85)"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                />
                <text
                  x="111"
                  y="135"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  M
                </text>

                <rect
                  x="300"
                  y="120"
                  width="22"
                  height="22"
                  rx="3"
                  fill="rgba(239,68,68,0.85)"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                />
                <text
                  x="311"
                  y="135"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  M
                </text>

                <rect
                  x="500"
                  y="120"
                  width="22"
                  height="22"
                  rx="3"
                  fill="rgba(239,68,68,0.85)"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                />
                <text
                  x="511"
                  y="135"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  M
                </text>

                <rect
                  x="690"
                  y="120"
                  width="22"
                  height="22"
                  rx="3"
                  fill="rgba(239,68,68,0.85)"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                />
                <text
                  x="701"
                  y="135"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  M
                </text>

                <rect
                  x="409"
                  y="278"
                  width="22"
                  height="22"
                  rx="3"
                  fill="rgba(239,68,68,0.85)"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                />
                <text
                  x="420"
                  y="293"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  M
                </text>
              </g>

              {/* Sounders — circle with note */}
              <g>
                <circle cx="200" cy="220" r="11" fill="none" stroke="#3B82F6" strokeWidth="1.6" />
                <text
                  x="200"
                  y="224"
                  textAnchor="middle"
                  fill="#3B82F6"
                  fontSize="10"
                  fontWeight="bold"
                >
                  S
                </text>

                <circle cx="400" cy="220" r="11" fill="none" stroke="#3B82F6" strokeWidth="1.6" />
                <text
                  x="400"
                  y="224"
                  textAnchor="middle"
                  fill="#3B82F6"
                  fontSize="10"
                  fontWeight="bold"
                >
                  S
                </text>

                <circle cx="600" cy="220" r="11" fill="none" stroke="#3B82F6" strokeWidth="1.6" />
                <text
                  x="600"
                  y="224"
                  textAnchor="middle"
                  fill="#3B82F6"
                  fontSize="10"
                  fontWeight="bold"
                >
                  S
                </text>
              </g>

              {/* CIE / panel symbol */}
              <g>
                <rect
                  x="700"
                  y="200"
                  width="46"
                  height="42"
                  rx="4"
                  fill="rgba(251,191,36,0.15)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="723"
                  y="218"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  CIE
                </text>
                <text
                  x="723"
                  y="232"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  panel
                </text>
              </g>

              {/* No-detection annotation */}
              <text
                x="410"
                y="180"
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="10"
                fontStyle="italic"
              >
                no automatic smoke / heat / multi-sensor detectors
              </text>

              {/* Distance rule strip */}
              <rect
                x="60"
                y="320"
                width="700"
                height="42"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="410"
                y="338"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                BS 5839-1:2025 distance rules
              </text>
              <text
                x="410"
                y="354"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                30 m straight-line · 45 m actual-travel · mounting 1.4 m above floor (+200 / -300 mm
                tolerance, i.e. 1.1 m to 1.6 m)
              </text>

              {/* Legend */}
              <rect
                x="60"
                y="372"
                width="700"
                height="42"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <rect
                x="80"
                y="384"
                width="14"
                height="14"
                rx="2"
                fill="rgba(239,68,68,0.85)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text x="102" y="396" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                M = MCP (red, transparent cover)
              </text>
              <circle cx="270" cy="391" r="7" fill="none" stroke="#3B82F6" strokeWidth="1.4" />
              <text x="282" y="396" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                S = sounder
              </text>
              <rect
                x="400"
                y="384"
                width="14"
                height="14"
                rx="2"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1"
              />
              <text x="422" y="396" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                CIE = control + indicating equipment (panel)
              </text>
              <rect
                x="630"
                y="384"
                width="14"
                height="14"
                rx="2"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text x="652" y="396" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Final exit
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 5839-1:2025 MCP siting — distance limits</ContentEyebrow>

          <ConceptBlock
            title="The 30 m / 45 m rule"
            plainEnglish="BS 5839-1:2025 simplified the manual-call-point distance rules into a clear pair: 30 m straight-line distance and 45 m actual-travel distance from any point in the protected area to the nearest MCP. Both must be satisfied. The figures themselves are unchanged from custom and practice; the 2025 simplification removed earlier conditional wording."
            onSite="Walk the protected area with the drawing. From any point you can stand, you must be no more than 30 m straight-line and 45 m actual-travel from an MCP. Where the building geometry (winding corridors, multi-room layouts, staircases) extends actual-travel beyond straight-line, the actual-travel figure is the binding constraint. In a long narrow corridor with no obstructions, the two figures are similar; in a labyrinthine layout, actual-travel can be much higher and is the limit."
          >
            <p>Designer considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Both limits apply.</strong> The MCP must be reachable within both 30 m
                straight-line and 45 m actual-travel. Either limit alone is incomplete.
              </li>
              <li>
                <strong>Maximums, not targets.</strong> Designers can specify shorter distances
                where the FRA, the building geometry or the occupant profile justifies it. A kitchen
                with an active deep-fat fryer warrants an MCP much closer than 30 m. A room used
                principally by mobility-impaired occupants warrants closer placement.
              </li>
              <li>
                <strong>Final exits and routes.</strong> An MCP at every final exit is good practice
                and frequently required by the FRA — occupants leaving the building should be able
                to trigger the alarm as they exit. Routes from rooms to final exits should pass an
                MCP within the distance limits.
              </li>
              <li>
                <strong>Stairway landings.</strong> MCPs on stairway landings (other than at the
                final exit level) are now (per 12.1 a)) incorporated within the ZONE that serves the
                adjacent accommodation on that level — not within the stairway zone itself. The 2025
                revision removed earlier wording about "enclosed stairway" that had caused
                interpretation disputes.
              </li>
              <li>
                <strong>External MCPs.</strong> External MCPs (in covered loading areas, in attached
                outhouses) are subject to the same distance rules and to weather-rating requirements
                in addition.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 12.1 (manual call points)"
            clause={
              <>
                The distances to find the nearest call points has been simplified to the 30 m
                straight line and 45 m actual travel distance. As these are the maximum distances,
                they can be shorter if the designer deems it necessary. If manual call points are
                located on the landings of a stairway (see 19.4), the manual call point on each
                level, other than a final exit level from the stairway, should be incorporated
                within the zone that serves the adjacent accommodation on that level.
              </>
            }
            meaning="Two phrases earn close reading. 'Maximum distances, they can be shorter if the designer deems it necessary' — the figures are limits, not targets; designers should be more demanding where the risk warrants. 'Incorporated within the zone that serves the adjacent accommodation' — landing MCPs belong to the accommodation zone, not the stairway zone, so that on activation the responding investigator knows which level / accommodation triggered the alarm."
          />

          <SectionRule />

          <ContentEyebrow>BS 5839-1:2025 MCP mounting — height tolerance</ContentEyebrow>

          <ConceptBlock
            title="The 1.4 m datum and the +200 / -300 mm tolerance"
            plainEnglish="BS 5839-1:2025 12 quantifies the manual-call-point mounting-height tolerance that earlier editions left implicit. The mounting datum is 1.4 m above floor level. The 2025 revision specifies a tolerance of +200 mm and -300 mm — so any mounting between 1.1 m and 1.6 m above floor level is acceptable. Outside that window, the installation is non-compliant. The asymmetry (more downward room than upward) reflects accessibility — slightly lower placement is appropriate for occupants of lower stature and wheelchair users; slightly higher is acceptable up to the upper limit."
            onSite="Aim for the 1.4 m datum on installation; allow normal trade-quality variation (typically a few millimetres). Any installation more than 200 mm above 1.4 m (over 1.6 m) or more than 300 mm below 1.4 m (under 1.1 m) is non-compliant and must be corrected before commissioning. On commissioning surveys, measure a representative sample of MCPs against the datum to verify compliance — particularly in older buildings where wall finishes or installation hardware may have shifted heights from the original design."
          >
            <p>Practical mounting issues:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Floor-level reference.</strong> The 1.4 m reference is to the finished floor
                level, not the unfinished slab. In refurbishment projects with floor-level changes
                (raised access floors, screeded toppings), measure to the actual finished floor.
              </li>
              <li>
                <strong>Sloping floors.</strong> In ramped corridors, the local finished-floor level
                is the reference. The MCP follows the floor — moving up or down with the slope.
              </li>
              <li>
                <strong>Accessibility.</strong> Where wheelchair access is the primary
                consideration, the lower end of the tolerance window (1.1 m to 1.2 m) is
                appropriate. Approved Document M (Building Regulations) provides additional
                accessibility guidance.
              </li>
              <li>
                <strong>Wall finish and surround.</strong> Decorative surrounds, picture rails,
                tiling that boxes around the MCP, signage adjacent — all can affect the visible
                MCP\'s effective height and approachability. The standard\'s tolerance is to the MCP
                operating element itself, not to surrounds.
              </li>
              <li>
                <strong>Existing systems.</strong> Existing MCPs that were compliant under earlier
                editions may now sit outside the explicit 2025 tolerance. The 2025 wording is not
                strictly retrospective; existing MCPs typically remain in service until the next
                material works. On any modification or panel-replacement project, audit MCP heights
                and bring outliers into the 1.1 m to 1.6 m window.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 12 (call point mounting height)"
            clause={
              <>
                The call point mounting height has been clarified, with the tolerance on the
                mounting height being 200 mm higher than 1.4 m, and 300 mm lower than 1.4 m.
              </>
            }
            meaning="The clarification removes earlier disputes. 'Tolerance' makes the figure a window, not a single point. The asymmetry — more downward room than upward — recognises accessibility; lower mounting is always acceptable to within the 300 mm limit. Outside the 1.1 m to 1.6 m window the install is non-compliant; commissioning surveys should sample-check MCP heights."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Protective covers — transparency, and the 2025 strengthening
          </ContentEyebrow>

          <ConceptBlock
            title="Why protective covers are now expected to be transparent"
            plainEnglish="Manual call points are wall-mounted devices designed to be operated quickly in an emergency. Without any cover, they can be activated by accidental knock, by mischievous activity (children, pranks, malicious activation) and by routine cleaning. Covers introduced as a recommendation in the 2017 revision protect against these activations. The 2025 revision strengthens that recommendation by specifying that covers should be transparent. The reasoning is operational: in a real emergency, an opaque cover slows recognition (occupant pauses to identify the device behind the cover), whereas a transparent cover preserves the immediate visual confirmation that the device is an MCP."
            onSite="Specify transparent covers in any new install. On refurbishments where 2017-era opaque covers are present and the project triggers material works, replace with transparent. Where 2017-era opaque covers are present and no material works are happening, the existing install is not retrospectively non-compliant; record the configuration in the system documentation."
          >
            <p>Cover selection considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Transparency.</strong> The 2025 BS 5839-1 recommendation. The cover lets the
                operator see the MCP without removing the cover.
              </li>
              <li>
                <strong>Operability.</strong> The cover must be openable in an emergency without
                tools. Covers requiring a key or special tool to remove DEFEAT the purpose of the
                MCP being operable in seconds.
              </li>
              <li>
                <strong>Anti-malicious feature.</strong> The cover should sound a local audible
                indication on opening (often a piezo squawker), to deter casual activation while not
                preventing genuine emergency use.
              </li>
              <li>
                <strong>Robustness.</strong> The cover is a high-touch item; it must withstand
                routine handling, cleaning, knocks. A flimsy cover that breaks on first malicious
                activation is no protection.
              </li>
              <li>
                <strong>Compatibility.</strong> The cover must fit the specific MCP product. Generic
                covers may not seal correctly with all MCP form-factors; verify product-level
                compatibility before specifying.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 12 (protective covers)"
            clause={
              <>
                The protective covers that were introduced as a recommendation in the 2017 edition
                are now recommended to be transparent.
              </>
            }
            meaning="The clause is short. 'Now recommended to be transparent' — the 2025 revision strengthens the 2017 recommendation by specifying a property (transparency) of the cover. Designers and installers should specify transparent covers as the new default; opaque covers should not appear in 2025-design specifications."
          />

          <CommonMistake
            title="Specifying or accepting opaque covers in a 2025-design installation"
            whatHappens="A new commercial building is fitted with a 2025-designed M-system. The contractor sources MCPs with opaque red plastic covers ('they\'re cheaper and more durable'). On the commissioning visit, the surveyor notes the opaque covers; the contractor argues that 2017-edition product is still acceptable. The surveyor identifies the covers as not aligning with the BS 5839-1:2025 recommendation; the project lists the covers as a non-compliance to remediate. The contractor must replace every cover with transparent product before sign-off, at the contractor\'s expense."
            doInstead="From 2025 onwards, specify transparent protective covers as the default. Verify the proposed product matches the spec before procurement. The 2025 recommendation is very clear; designers and installers who substitute opaque product on cost grounds find themselves remediating at handover, which is more expensive than getting it right first time."
          />

          <SectionRule />

          <ContentEyebrow>Sounder use for non-fire signals — BS 5839-1:2025 15.1.12</ContentEyebrow>

          <ConceptBlock
            title="When and how the same sounder can serve multiple alarm types"
            plainEnglish="The 2017 edition did not allow the same physical sounder to be used for conflicting warnings — fire alarm and (say) lockdown alarm had to use separate devices, on the basis that occupants could not tell which warning was active. The 2025 revision permits the same sounder to be used provided different tones / messages distinguish each warning type. The clause specifically addresses the use of fire alarm sounders for school class-change signals (often used because schools already have the speaker infrastructure for the fire alarm) and for lockdown alarms (now common in schools as a separate but related building-safety capability)."
            onSite="Where you encounter a system that uses fire-alarm sounders for class-change or lockdown, verify the configuration: the tones / messages must clearly distinguish each warning; the response required for fire (immediate evacuation by all escape routes) must be either identical to or clearly different from the response required for the other warning. Class-change duration is limited to 10 seconds (extended from the 2017 figure of 5 seconds, to address data lag in addressable systems). Lockdown design follows separate FIA guidance."
          >
            <p>BS 5839-1:2025 15.1.12 conditions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identical-response use.</strong> Permissible where the response required is
                identical to that required in the event of fire — i.e. immediate evacuation by use
                of all escape routes. An emergency-evacuation tone for any reason can use the fire
                sounders.
              </li>
              <li>
                <strong>School class-change.</strong> Permissible to use fire sounders for the start
                or finish of predetermined periods (lessons). Duration limited to 10 seconds
                (extended from 5 seconds in the 2017 edition because addressable systems can take
                longer to propagate the signal).
              </li>
              <li>
                <strong>Lockdown.</strong> Acknowledged as common practice in schools; design
                follows FIA guidance ("Use of fire alarm systems for lockdown — specifically in
                schools"). The lockdown signal must clearly distinguish itself from the fire signal
                so occupants respond appropriately.
              </li>
              <li>
                <strong>Distinct tones / messages.</strong> Each non-fire use must have a tone or
                voice message distinct from the fire tone, so occupants can identify the warning
                type and respond correctly.
              </li>
              <li>
                <strong>Documentation.</strong> Non-fire use must be documented in the system
                operating manual and in the cause-and-effect matrix (a 2025 documentation
                recommendation — see Module 1.4).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 15.1.12 (use of fire alarm sounders for non-fire signals)"
            clause={
              <>
                Fire alarm evacuation tones should not be used for purposes other than warning of
                fire, except where: a) the response required is identical to that required in the
                event of fire (i.e. immediate evacuation by use of all escape routes); or b) in
                schools, the fire alarm signal is used to indicate the start or finish of
                predetermined periods. In these cases, the duration of class change signals should
                not exceed 10 s.
              </>
            }
            meaning="Two phrases earn close reading. 'Should not be used for purposes other than warning of fire, except where' — the default is reserved use; non-fire use is the controlled exception. 'The response required is identical' — if the occupant must do the same thing whether the signal is fire or non-fire, no confusion is introduced and the same sounder is acceptable. 'Duration of class change signals should not exceed 10 s' — this hard limit prevents a class-change signal being mistaken for a sustained fire alarm tone."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Remote indicators — colour and annual check</ContentEyebrow>

          <ConceptBlock
            title="The red rule and the unobstructed-and-operating check"
            plainEnglish="A remote indicator is a small visual indicator (typically an LED) located outside a room or area to indicate that a detector or call point inside that area has triggered. They are useful because they let an investigator quickly identify which room within a multi-room zone is the source of the alarm. BS 5839-1:2025 12 clarifies that the visual indication should be RED — earlier editions left the colour unspecified, leading to inconsistent installations (red, orange, green, white all seen in practice). The 2025 wording standardises on red. The clause also requires annual servicing to confirm the indicator is unobstructed (not painted over, not blocked by furniture or signage) and operates correctly when triggered."
            onSite="On commissioning surveys, verify all remote indicators are red. Existing installations with non-red indicators are not strictly retrospectively non-compliant, but on the next material works the indicators should be brought into the 2025 colour rule. At every annual service, walk every remote indicator: it must be visible (no paint, no obstruction), must operate (trigger the associated detector, see the indicator light), and must be in good repair."
          >
            <p>Remote-indicator practical notes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Where required.</strong> Outside any room where the detector or MCP is not
                directly visible from the corridor — typically bedrooms in hotels / care homes,
                store-rooms, electrical cupboards, voids accessed only from inside a room.
              </li>
              <li>
                <strong>Colour.</strong> Red, per BS 5839-1:2025 12.
              </li>
              <li>
                <strong>Mounting.</strong> Above or near the door, at a height where it is visible
                from the typical observer position in the corridor (typically around 2 m above floor
                level, but the position is design-driven rather than fixed).
              </li>
              <li>
                <strong>Wiring.</strong> Two-wire connection from the associated detector or MCP;
                the indicator should activate when the device activates (latched until the system
                resets).
              </li>
              <li>
                <strong>Annual check.</strong> Confirm visible (no paint, no obstruction); confirm
                operating (trigger the device, see the LED light); confirm in good repair (the LED
                lens is intact, the bezel is secure).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 12 (remote indicators)"
            clause={
              <>
                It has been clarified that for all remote indicators, the visual indication provided
                by the indicator should be red in colour. Also, that they should be checked for
                correct operation at the annual service visit to ensure they have not been
                obstructed or painted over.
              </>
            }
            meaning="Two phrases earn close reading. 'Red in colour' — standardising on red removes installation-to-installation variation and makes the indicator universally recognisable. 'Checked for correct operation at the annual service visit' — the indicator is part of the system and must be tested annually like any other component. 'Have not been obstructed or painted over' — common real-world failure modes; a remote indicator behind a coat hook or under a coat of paint has stopped functioning."
          />

          <CommonMistake
            title="Treating remote indicators as 'fit and forget' — never checking them at annual service"
            whatHappens="A care home has a 2025-designed L1 system with remote indicators outside every bedroom. Three years pass. At the next routine service, an engineer notices that one resident's bedroom has had decorating work done — the wall around the bedroom door has been painted, including a thin coat over the previously red remote indicator. The LED still illuminates but the colour is muted to nearly white through the paint. A bedroom alarm now shows as a faint pale glow that is easy to miss on a dim corridor. If the resident were unable to leave the bedroom unaided in a fire, the muted indicator would significantly delay staff identifying the alarm location."
            doInstead="At every annual service visit, walk every remote indicator. Confirm visibility (no paint, no obstruction, no signage in front of), confirm operation (trigger the associated device, see the indicator light), confirm colour (red — repaint or replace if the colour is muted). The 2025 revision makes this annual check a specific deliverable; the maintenance regime should reflect it explicitly."
          />

          <SectionRule />

          <ContentEyebrow>Cabling, identification and BS 7671 cross-reference</ContentEyebrow>

          <ConceptBlock
            title="Single-colour cabling and IEC 60445 functional-earth identification"
            plainEnglish="BS 5839-1:2025 16 (cabling, labelling and identification) addresses long-standing questions about cable colour. Whilst fire alarm cables have always been required to be fire-resisting (to BS EN 50200, BS 8434 or BS 8491 grades depending on application), the colour was not previously specified clearly. The 2025 revision clarifies that all fire alarm cables AND the low-voltage mains supply to the system should be of a single, common colour, with red preferred. The 2025 revision also incorporates the BS 7671 A2:2022 / IEC 60445 conventions on conductor identification: the functional earth conductor is identified by the colour pink or marked with the alphanumeric designation 'FE'. Earlier editions used cream for functional earth; cream is no longer the convention. Batteries should have a label fixed to them showing the date of installation."
            onSite="On commissioning a 2025-design system, verify cable colour throughout — fire alarm circuits and the LV mains supply both on a single common colour, red preferred. Verify functional-earth identification — pink or marked 'FE', not cream. Verify battery labelling — date of installation visible on every battery (custom and practice now formally acknowledged in the standard, with permanent marker an accepted method). Older systems with cream functional earth or mixed cable colours are not retrospectively non-compliant, but on the next material works should be brought into 2025 standard."
          >
            <p>Cabling and identification points:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable colour.</strong> Single common colour, red preferred. Applies to fire
                alarm circuits AND the LV mains supply. The 2025 wording resolves long-running
                ambiguity.
              </li>
              <li>
                <strong>Functional-earth conductor.</strong> Pink or marked 'FE'. Was cream; cream
                is no longer the convention from BS 7671 A2:2022 onwards.
              </li>
              <li>
                <strong>Cable grade.</strong> Fire-resisting cable to the appropriate BS EN 50200 /
                BS 8434 / BS 8491 grade. Selection of grade depends on the building category and
                whether the cable supports critical-function circuits (sounders, control links).
              </li>
              <li>
                <strong>Battery labelling.</strong> Date of installation must be visible. Permanent
                marker on the battery is acknowledged custom and practice. Annual service should
                also record battery condition and replace at end-of-life.
              </li>
              <li>
                <strong>Section 560 (BS 7671) — safety services.</strong> Fire alarm circuits are
                safety services and must be installed to Section 560: separate routing, segregation
                from non-essential circuits, supply integrity, appropriate cable grade, fault
                tolerance in cable routing.
              </li>
              <li>
                <strong>BS 7671 A4:2026 cross-references.</strong> AFDD provision in higher-risk
                premises (sleeping accommodation, certain HMOs); TN-C-S earthing arrangement
                clarifications; updates to identification convention. Coordinate with the electrical
                contractor to ensure both standards are applied consistently.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 16 (cabling, labelling and identification)"
            clause={
              <>
                One of the common questions asked on the FIA technical helpline was, what colour
                should the mains cable be? Whilst the mains cable should be installed in fire
                resistant cable to the same grade as the fire detection and fire alarm system, it
                was never clear in the 2017 revision of BS 5839-1 what colour it should be. This has
                been clarified in the 2025 revision to emphasise that all fire alarm cables, and the
                low voltage mains supply should be of a single, common colour with the colour red
                being preferred. Batteries should have a label fixed to them showing the date of
                installation.
              </>
            }
            meaning="Two phrases earn close reading. 'All fire alarm cables, and the low voltage mains supply should be of a single, common colour' — the colour applies to all the system's cabling, including the LV mains supply, not just the alarm wiring. 'Red being preferred' — red is the conventional colour and is now expressly preferred. 'Date of installation' — battery labelling acknowledges custom and practice; the date is visible to the next servicing engineer."
          />

          <Scenario
            title="The small standalone retail unit"
            situation="A 60 m² standalone open-plan retail unit (single sales space, no back-of-house, no overnight occupation, fully attended during operating hours, 1.4 m wide front entrance / final exit, no sleeping use, single occupant during quiet periods, up to 3 staff and 8-10 customers at busy periods) is being designed in 2026. The fire risk assessment concludes that automatic detection adds no material life-safety benefit because the entire space is visible to staff at all times, ignition load is modest (cash desk, point-of-sale equipment, lighting), and the unit is not occupied outside operating hours. The fire strategy specifies a Category M system."
            whatToDo="Specify two MCPs (one near the cash desk, one near the final exit) — siting confirms 30 m straight-line / 45 m actual-travel from any point in the unit; mounting at 1.4 m above finished floor level with transparent protective covers. Specify two sounders (one centrally above the sales floor, one near the entrance) for full audible coverage. CIE (panel) discreetly mounted in the cash-desk area, with battery-supported standby supply per BS EN 54-4. Single-colour red fire-resisting cable throughout, run separately from non-essential circuits per BS 7671 Section 560. No automatic detectors. Specify alarm transmission to an ARC if the FRA recommends it; Category M does not automatically need ARC transmission unless the FRA or insurer demands. The system documentation includes the FRA reference (justifying M selection), the device schedule, the cause-and-effect (any MCP / sounder all-call) and the maintenance regime (six-monthly inspection per 43.2.1, annual remote-indicator check)."
            whyItMatters="A correctly specified M system in a small standalone retail unit is a fully compliant BS 5839-1:2025 design. The simplicity of the category does not mean simplicity of compliance — the FRA must justify selection, the MCP siting and mounting must satisfy the 2025 distance / height rules, the cable colour and identification must reflect the 2025 wording, and the maintenance regime must include the 2025 remote-indicator check. M is the simplest category; it is not the lowest-attention category."
          />

          <Scenario
            title="The night-club proposal — why M is wrong"
            situation="A new night-club operator approaches a fire-alarm contractor with a proposed Category M system, justifying the proposal by citing 'fully attended operation' and 'low cost'. The premises features dim lighting, loud music masking ambient sounds, alcohol service, multiple bar areas, two final exits with corridors leading to them, restricted-mobility access via a single platform lift, and a back-of-house kitchen and store. The operator explains that staff will visually monitor the floor and operate the MCPs if a fire is observed."
            whatToDo="Refuse to specify M and recommend an FRA review with the responsible person. The conditions in the night-club — dim lighting, loud noise, alcohol-impaired occupants, occupant density, restricted exit, kitchen and storage — are inconsistent with manual-only detection. A suitable and sufficient FRA under the RRO 2005 will conclude that occupants will not reliably observe fires in time to operate MCPs, and that automatic detection is necessary. The appropriate category is L1 or L2 with multi-sensor detection in the dance-floor and bar areas (managing false alarms from haze / smoke effects), heat detection in the kitchen, smoke detection in BoH areas, and a comprehensive escape-route detection scheme. The cost of getting it right is unavoidable. Document the M-rejection conversation with the operator; offer to support the operator in updating the FRA to reflect the actual conditions."
            whyItMatters="M selection in inappropriate premises is one of the most consequential mistakes a fire-alarm contractor can make. If the design is signed off by the contractor and a fire later occurs that an L category system would have detected, the contractor faces possible joint liability with the responsible person. The duty of the contractor is to advise correctly, even when the client wants to hear something different. 'The client asked for M' is not a defence against an inappropriate-design finding."
          />

          <CommonMistake
            title="Specifying M because the budget is tight, without revisiting the fire risk assessment"
            whatHappens="A small office building owner is quoted for an L4 system at £8,500 and counters with a request for an M-only system at perhaps £3,500, citing budget. The contractor, eager to win the work, accepts and writes up a Category M specification. The FRA produced two years earlier identifies sleeping use in a small flat above the office (occupied by a caretaker); the contractor does not revisit the FRA. The M system is installed and signed off. Eight months later, an enforcement officer reviewing fire-safety provision in the building identifies the sleeping use, the FRA gap, and the M-only specification. The system is found to be non-compliant with the responsible person's duty under the RRO 2005, and the office owner is required to retrofit at least an L4 (and probably L2) system at significantly higher cost than the original L4 quote."
            doInstead="When a client pushes for a category that the FRA does not support, refuse the work or insist on an FRA review. The fire-alarm contractor's duty is to specify the system the FRA supports; the responsible person's duty is to maintain a current FRA and to act on its findings. Both duties are independent. 'I just installed what the client asked for' is not a defence against an inappropriate specification — particularly when the contractor knew or should have known the FRA pointed elsewhere."
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
              'M = manual. Manual call points only, no automatic detection. Sounders, MCPs and a panel; no detector heads.',
              'Selection of M is FRA-driven and limited to specific circumstances. Not appropriate for sleeping use, complex geometry, high ignition load or low-alertness premises.',
              'BS 5839-1:2025 12 — MCP distance limits: 30 m straight-line and 45 m actual-travel from any point in the protected area. Both apply.',
              'BS 5839-1:2025 12 — MCP mounting height: 1.4 m datum with +200 mm and -300 mm tolerance. Acceptable window is 1.1 m to 1.6 m.',
              'BS 5839-1:2025 12 — Protective covers should be TRANSPARENT (strengthened from the 2017 cover recommendation).',
              'BS 5839-1:2025 12.1 a) — Stairway landing MCPs (except final exit level) belong to the zone serving the adjacent accommodation, not the stairway zone.',
              'BS 5839-1:2025 12 — Remote indicators must be RED. Annual service must verify they are unobstructed and operating.',
              'BS 5839-1:2025 15.1.12 — Sounder use for non-fire signals (school class-change, lockdown) is permitted with conditions; class-change duration limited to 10 s.',
              'BS 5839-1:2025 16 — Single common cable colour for fire alarm circuits AND LV mains supply, red preferred. Functional-earth identification: pink or marked "FE" (per IEC 60445); was cream.',
              'BS 5839-1:2025 16 — Battery labelling: date of installation visible on each battery (permanent marker accepted).',
              'BS 7671 Section 560 (safety services) and A4:2026 AFDD provisions apply to M-system installations.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'What is the difference between a Category M system and a P1/M or L5/M hybrid?',
                answer:
                  'A standalone Category M system has manual call points only — no automatic detection at all. The /M SUFFIX on a P or L5 system adds MCPs to a category that does not include them by default; the underlying P or L5 detection remains in place. P1/M = full property-protection automatic detection PLUS MCPs. L5/M = bespoke automatic detection PLUS MCPs. M alone = MCPs only.',
              },
              {
                question: 'When is selecting Category M actually appropriate?',
                answer:
                  'Limited circumstances supported by the FRA: very small premises with full visibility (small open-plan retail, single-occupant workshops), fully attended-only premises with high alertness, premises where the FRA explicitly concludes automatic detection adds no material benefit. Not appropriate for sleeping use, complex geometry, high ignition load, low alertness (alcohol, dim lighting, loud noise), restricted-mobility occupants, or any premises with overnight occupation.',
              },
              {
                question:
                  'Both 30 m straight-line and 45 m actual-travel apply to MCP siting — which is the binding constraint?',
                answer:
                  'Both must be satisfied. In simple geometries (straight corridors, open-plan spaces), the two figures are similar and either can be the binding constraint. In complex geometries (winding corridors, multi-room layouts, staircases), the actual-travel figure typically extends further than the straight-line figure, so actual-travel becomes the binding constraint. Check both and meet both.',
              },
              {
                question:
                  'A 1.4 m datum with +200 mm and -300 mm tolerance — does that mean the MCP MUST be exactly 1.4 m or anywhere from 1.1 m to 1.6 m?',
                answer:
                  'Anywhere from 1.1 m to 1.6 m above finished floor level. The 1.4 m is the datum the design aims for; the tolerance defines the acceptable installation window. Outside that window (under 1.1 m or over 1.6 m), the install is non-compliant. Aim for 1.4 m on installation; allow normal trade-quality variation; keep all MCPs within the 1.1 m to 1.6 m envelope.',
              },
              {
                question:
                  'My client wants to keep their existing opaque covers because "transparency is just a recommendation". Are they non-compliant?',
                answer:
                  'Existing 2017-era opaque covers in installations not undergoing material works are not retrospectively non-compliant. The 2025 transparent-cover recommendation applies to new designs and to existing systems on their next material works. For new specifications and new installations, transparent covers should be the default. Where existing covers are opaque and the client refuses to upgrade, document the configuration as a pre-existing variation in the system documentation.',
              },
              {
                question:
                  'Can fire alarm sounders be used for non-fire warnings in a 2025-designed system?',
                answer:
                  'Yes, with conditions. BS 5839-1:2025 15.1.12 permits non-fire use where (a) the response required is identical to the fire response (immediate evacuation by all escape routes), or (b) in schools, the signal is used for class-change (limited to 10 s duration). Lockdown alarms are also acknowledged with separate FIA design guidance. Distinct tones / messages must distinguish each warning type so occupants respond correctly. Document non-fire use in the system manual and cause-and-effect matrix.',
              },
              {
                question: 'Why do remote indicators need to be red specifically?',
                answer:
                  "Standardisation. BS 5839-1:2025 12 specifies red so that a fire-alarm investigator entering any building can immediately recognise the visual indicator without checking the local installation's convention. Earlier editions left colour unspecified, leading to inconsistent practice (red, orange, white, green all seen). Red is the convention now. Annual service should verify the indicators remain visibly red — paint, dust, finish degradation can all mute the colour over time.",
              },
              {
                question:
                  'How does an M-only system differ from an L4 system in installation cost?',
                answer:
                  'The main cost driver is the detector count. M has zero detectors; L4 has detectors throughout the escape route. For a building with say 50 m of escape route, L4 might add 4-6 detectors plus the associated cabling and per-device commissioning. An M-only system saves that cost. Whether the saving is a defensible trade-off depends entirely on the FRA — saving £500-£1,000 on detector count cannot justify selection of M in premises where L4 (or higher) is what the FRA supports.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="M category systems — Module 1.3" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/fire-alarm-course/module-1/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Risk assessment
              </div>
            </button>
          </div>

          <div className="hidden">
            <BellRing />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule1Section3;
