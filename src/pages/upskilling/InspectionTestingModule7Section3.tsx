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
    id: 'mod7-s3-reg-trigger',
    question: 'Reg 643.9 only bites under one condition. What is it?',
    options: [
      'Whenever the supply is three-phase, regardless of the loads on it',
      'Where phase sequence is required — i.e. where rotating machinery, three-phase variable-speed drives, or any load whose correct operation depends on a specific phase order is connected to the installation',
      'Only on industrial premises over 100 A per phase',
      'On every TT installation, three-phase or single-phase',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.9 is conditional. The duty to verify phase sequence applies where a load actually depends on it — typically motors, three-phase drives, or rotating equipment. A three-phase supply that feeds only single-phase final circuits has no rotation-sensitive load and the verification is not required (though an inspector commonly does it anyway as good practice).',
  },
  {
    id: 'mod7-s3-instrument',
    question:
      'A three-wire phase-rotation indicator is the standard tool for the live phase-sequence test. What does it read, and what does the GS 38 requirement add?',
    options: [
      'It reads voltage on each phase only — GS 38 is about the user manual',
      'It reads the rotational direction of the three-phase supply (clockwise / anti-clockwise) by sensing the order in which the phase voltages reach their peaks. GS 38 requires that the test leads are insulated, finger-guarded, fused or current-limited, and that the exposed metal of the probe tip is no more than 4 mm — because the test is live three-phase 400 V',
      'It reads only line-to-earth voltage — GS 38 covers the meter case',
      'It is a continuity tester — GS 38 is irrelevant to live testing',
    ],
    correctIndex: 1,
    explanation:
      'A three-wire rotation indicator reads the temporal phase order. GS 38 governs the test leads themselves: insulated, finger-guarded, current-limited, and with no more than 4 mm of exposed metal at the probe tip. This matters because you are probing live 400 V three-phase terminals — the lead standard is what stops a slip becoming a fatality.',
  },
  {
    id: 'mod7-s3-dead-route',
    question:
      'GN3 describes a dead-test route to confirm phase rotation without energising. What is the principle?',
    options: [
      'Use an insulation tester switched to ohms across each phase pair',
      'Identify each phase conductor end-to-end (origin to load terminal) using continuity, confirm the conductor identification matches the design phase identification (L1 to L1, L2 to L2, L3 to L3), and the rotation then follows from correct identification on a known-rotation supply',
      'Measure the resistance of each phase and pick the lowest as L1',
      'It is impossible — phase rotation can only be tested live',
    ],
    correctIndex: 1,
    explanation:
      'The dead route is identification-by-continuity: trace each phase conductor end-to-end and confirm the design colour / marking is preserved at every termination. If the supply rotation at the origin is known, correct conductor identification at every load terminal guarantees correct rotation at the load. The live rotation indicator is then the confirmation, not the discovery.',
  },
  {
    id: 'mod7-s3-recording',
    question:
      'On the A4:2026 documentation, where does the phase-rotation result for a three-phase distribution circuit go, and what is the correct entry?',
    options: [
      'In the Zs column — the rotation is implicit in the loop impedance',
      'On the Schedule of Inspections (visual / verification entry) and / or in the comments column on the Schedule of Test Results — typically as "L1-L2-L3 confirmed" or "rotation correct" with the instrument and method noted. It is not a numeric reading',
      'It does not need to be recorded — only single-phase polarity is recorded',
      'In the polarity column as "L1" or "L2"',
    ],
    correctIndex: 1,
    explanation:
      'Phase rotation is a verification, not a measurement, so it is recorded as a confirmation against the inspection schedule plus a comment on the test schedule for the affected circuit. The entry should name the instrument used (three-wire rotation indicator) and the method (live test at the origin / sub-board). A numeric value in the polarity or Zs column would be the wrong column.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.9 — Check of phase sequence — uses one specific verb for the duty. What does the regulation actually require, and where?',
    options: [
      'Phase sequence shall be measured at the supply intake only',
      'For polyphase circuits, it shall be verified that the phase sequence is maintained at all relevant points throughout the installation',
      'Phase rotation testing is recommended but not required by BS 7671',
      'Phase sequence shall be tested only on circuits feeding three-phase motors',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.9 (A4:2026) states verbatim: "For polyphase circuits, it shall be verified that the phase sequence is maintained at all relevant points throughout the installation." Not just the origin — every relevant downstream point, every distribution board, every three-phase outlet.',
  },
  {
    id: 2,
    question:
      'A three-phase induction motor is wired with L1 and L2 swapped at the isolator. The motor is energised. What happens?',
    options: [
      'The motor will not start — it sees a single-phase fault',
      'The motor runs at the correct speed but in the reverse direction; it draws normal running current and gives no obvious electrical alarm',
      'The motor draws double the rated current and trips the overload',
      'The motor runs at half speed',
    ],
    correctAnswer: 1,
    explanation:
      'A two-phase swap reverses the rotating-magnetic-field direction. The motor runs in reverse at correct speed and current. Nothing trips. The pump runs backwards, the conveyor runs backwards, the lift travels the wrong way — and the only electrical evidence is the rotation itself. That is precisely why Reg 643.9 exists as a standalone duty.',
  },
  {
    id: 3,
    question:
      'You discover the motor on a new pump set is running anti-clockwise when it should be clockwise. What is the correct corrective action under standard practice?',
    options: [
      'Swap any two phases at the upstream supply (e.g. at the DB outgoing)',
      'Swap any two phases at the load (e.g. at the motor terminal box or local isolator) so the rest of the installation keeps its agreed phase sequence',
      'Reverse the direction of the supply transformer',
      'Swap line and neutral at the motor',
    ],
    correctAnswer: 1,
    explanation:
      'Swap two phases at the load, never at the supply. Reg 643.9 obliges you to keep the phase sequence consistent at all relevant points throughout the installation. Swapping at the DB or upstream propagates the reversal to every other three-phase point downstream — which would fail Reg 643.9 for everything else on that board.',
  },
  {
    id: 4,
    question:
      'Phase rotation testing per Reg 643.9 is which kind of test in terms of installation state?',
    options: [
      'A dead test — the circuit must be isolated and proved dead',
      'A live test — the system must be energised at normal voltage and frequency for the indication to mean anything',
      'Either a dead test (using continuity) or a live test, depending on instrument and circumstance',
      'Always a megger test at 500 V DC',
    ],
    correctAnswer: 2,
    explanation:
      'Two valid approaches exist. The primary live method uses a phase rotation tester on the energised three-phase supply (BS EN 61557-7 instrument). A secondary dead-test confirmation is permitted by GN3: each line conductor is tested one at a time linked to the protective conductor, mirroring polarity-style continuity. Most live testing uses two-probe phase rotation testers for safety.',
  },
  {
    id: 5,
    question:
      'BS EN 61557-7 sets the performance requirements for phase rotation instruments. Which of the following is the acceptance band for an unambiguous indication?',
    options: [
      '50 % to 110 % of nominal voltage at any frequency',
      '85 % to 110 % of nominal voltage and 95 % to 105 % of nominal frequency',
      '100 % to 105 % of nominal voltage only',
      '90 % to 130 % of nominal voltage only',
    ],
    correctAnswer: 1,
    explanation:
      'An instrument is accepted for phase rotation testing if it gives a clear, unambiguous indication of phase sequence between 85 % and 110 % of nominal voltage and between 95 % and 105 % of nominal frequency. Outside those bands the indication may not be reliable — and the regulation requires unambiguous determination.',
  },
  {
    id: 6,
    question:
      'A two-probe phase rotation tester is connected between L1 and L2 and shows clockwise rotation. The same instrument is then connected between L2 and L3 at the same accessory and shows anti-clockwise. What does this tell you?',
    options: [
      'The instrument is faulty',
      'Phase sequence is inconsistent between probe pairs at this accessory — there is a wiring fault somewhere on this distribution circuit (likely a phase swapped between two conductors). Investigate before energising any equipment downstream',
      'This is normal — different probe pairs always give different results',
      'L3 must be the neutral',
    ],
    correctAnswer: 1,
    explanation:
      'On a properly wired three-phase supply the rotation indication is consistent regardless of which two phases the two-probe tester is connected across. An inconsistent indication means one of the line conductors is mislabelled or swapped at this point. Reg 643.9 fails — corrective wiring before energisation, then re-test.',
  },
  {
    id: 7,
    question:
      "When extending an existing three-phase installation (e.g. adding a sub-board to feed new machinery), what does Reg 643.9 require with respect to the existing installation's phase sequence?",
    options: [
      'The new circuits adopt their own phase sequence convention; the old installation is unaffected',
      'The phase sequence on the extension shall match the phase sequence already present on the existing installation, so that sequence is continuous throughout',
      'The new installation shall be re-labelled to match the extension',
      'Phase sequence is only checked at the new sub-board, not at the connection to the existing supply',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.9 is explicit on extensions in the GN3 commentary: phase sequence shall be maintained throughout the original and extended installation. Adopting a different sequence on the extension creates a confusion hazard for any future three-phase equipment that travels between the two — the canonical example is a portable three-phase tool that is plugged into both areas.',
  },
  {
    id: 8,
    question:
      'Why is a two-probe phase rotation tester generally preferred over a traditional three-wire (clip-on) phase rotation indicator at a live distribution board?',
    options: [
      'It is more accurate',
      'It is cheaper',
      'It avoids the need to attach three crocodile clips to live three-phase busbars or terminals — only two hand-held probes contact the live parts, reducing exposure time and the risk of slipped clips bridging phases',
      'It can also test single-phase circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Approved voltage testers with two-probe phase rotation facilities are an explicit safety advantage in GN3 — no crocodile clips on energised busbars, no dangling leads creating snag hazards, only momentary probe contact. CAT IV-rated probes with shrouded tips and GS38-compliant leads further reduce exposed metal during the live test.',
  },
  {
    id: 9,
    question:
      'A phase rotation tester displays the alphanumeric sequence "1-3-2". The instrument manual maps this string to anti-clockwise rotation. The motor under test must run clockwise. What does Reg 643.9 oblige you to do before energising the motor?',
    options: [
      'Energise and observe the motor — if it runs anti-clockwise, swap two motor terminals at the motor box',
      'Correct the wiring (typically swap any two of L1/L2/L3 at the load isolator or motor terminal box) so the rotation indication matches the required clockwise sequence, THEN energise',
      'Change the motor for one with reverse rotation',
      'Accept anti-clockwise rotation if the motor is rated for it',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.9 requires verification before energisation when equipment may be affected by reverse phase rotation. The whole point of the pre-energisation check is to fix the wiring before the motor spins. Energising-and-observing is exposed-equipment testing — pumps run dry, lifts travel down instead of up, conveyors throw product. Correct first, then prove with a second rotation indication.',
  },
  {
    id: 10,
    question:
      'You have completed a phase rotation check at the main intake of a three-phase installation. Reg 643.9 requires verification at "all relevant points". Which of the following counts as a relevant point that should also be checked?',
    options: [
      'Only the main intake',
      'Each downstream three-phase distribution board, each three-phase socket-outlet (e.g. BS EN 60309), and any sub-mains where the phase sequence could have been disturbed by the wiring on the way',
      'Only points where a motor is connected',
      'Single-phase circuits derived from the three-phase board',
    ],
    correctAnswer: 1,
    explanation:
      '"All relevant points throughout the installation" — every place where a three-phase consumer could be connected. Sub-mains, three-phase DBs, three-phase sockets, and any plant termination where phase order matters. Single-phase circuits are out of scope (one phase, no sequence to verify).',
  },
];

const InspectionTestingModule7Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Three-phase rotation testing (Reg 643.9) | I&T Module 7.3 | Elec-Mate',
    description:
      'Reg 643.9 + GN3: phase sequence verification on polyphase circuits, two-probe vs three-wire phase rotation testers (BS EN 61557-7), the live-test discipline, and the load-side phase swap rule.',
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
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3"
            title="Three-phase rotation testing"
            description="Reg 643.9 — phase sequence verified at every relevant point. Live test, two-probe instrument, and the load-side swap that keeps the rest of the installation untouched."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.9 obliges you to verify, on polyphase circuits, that the phase sequence is maintained at all relevant points throughout the installation — not just at the origin.',
              'It is a live test. The supply must be energised at normal voltage and frequency for the indication to mean anything (BS EN 61557-7 instruments are specified for 85–110 % V and 95–105 % f).',
              'Two-probe phase rotation testers are safer than three-wire clip-on indicators: only two hand-held probes contact live conductors, no crocodile clips on energised busbars.',
              'When rotation is wrong, swap two phases at the load (motor terminal box / local isolator). Never swap at the DB or upstream — that propagates the reversal to every other three-phase point and breaks Reg 643.9 elsewhere.',
              'A dead-test confirmation is permitted by GN3: each line conductor tested one at a time linked to the protective conductor (polarity-style). Use it on de-energised commissioning, then prove with a live rotation check before handover.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Quote Reg 643.9 verbatim and explain why "at all relevant points" is the load-bearing phrase',
              'Distinguish phase rotation (the order phases peak) from phase reversal (the consequence of swapping two conductors) and from polarity (the L–N orientation in single-phase work)',
              'Choose between a two-probe and a three-wire phase rotation tester for a given live test, and justify the choice on safety grounds',
              'Identify the BS EN 61557-7 acceptance bands for unambiguous indication and explain why outside-band readings should be rejected',
              'Diagnose a wrong-rotation result and apply the load-side swap rule to correct it without disturbing the rest of the installation',
              'Carry the rotation result onto the Schedule of Test Results and EIC declaration, including the locations checked and the indication observed',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.9 — Check of phase sequence"
            plainEnglish="On any three-phase (polyphase) circuit, you must verify that the phase sequence (L1, L2, L3) is the same at every place a three-phase consumer could be connected. The whole installation has to agree."
            onSite="Read the words 'at all relevant points throughout the installation' carefully. The main switch is one such point. Every downstream three-phase distribution board is another. Every three-phase socket (BS EN 60309), every motor isolator, every sub-main termination — all relevant points."
          >
            <p>
              Reg 643.9 in BS&nbsp;7671:2018+A4:2026 is a single, short obligation that does a lot
              of work. It binds initial verification, periodic inspection, and any addition or
              alteration to a three-phase installation. The verb is verify — by indication, with an
              instrument suitable for the duty (BS EN 61557-7 phase rotation indicator).
            </p>
            <p>
              GN3 frames the practical importance: if phase sequence is not maintained, three-phase
              equipment connected at different points may rotate in opposite directions or behave
              unpredictably. The classic failure mode is a portable three-phase appliance — a pump,
              a saw, a hoist — that is plugged into one socket and runs correctly, then plugged into
              a socket on a different sub-board and runs in reverse. Same installation, two
              different phase sequences, no Reg 643.9 check, predictable consequences.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.9 — Check of phase sequence"
            clause={
              <>
                For polyphase circuits, it shall be verified that the phase sequence is maintained
                at all relevant points throughout the installation.
              </>
            }
            meaning="Polyphase = three-phase (and in principle any system with more than one line conductor). The duty is verification at every relevant point — the main intake is the start, not the end. Each downstream three-phase termination where a consumer could connect counts as relevant."
          />

          <ConceptBlock
            title="Phase rotation, phase sequence, phase reversal — three terms, one concept"
            plainEnglish="Phase rotation and phase sequence are the same thing: the order in which the three phases reach their peak voltage as the cycle turns. Phase reversal is what happens when you swap two of those conductors — the rotation flips."
          >
            <p>
              Three-phase voltages peak in turn, separated by 120&deg; of the cycle. The standard UK
              convention is L1 leads, L2 lags by 120&deg;, L3 lags by 240&deg; (equivalently leads
              L1 by 120&deg;). That order — L1, L2, L3 — defines clockwise rotation as observed by a
              phase rotation indicator. A clockwise indication means the installation matches
              convention.
            </p>
            <p>
              Swap any two of those conductors and the order changes. Common notations include
              "1-3-2" or "3-2-1" on alphanumeric instruments, or anti-clockwise disc rotation on
              older mechanical indicators. The motor that was spinning clockwise now spins
              anti-clockwise: same speed, same current, opposite direction, no electrical alarm.
            </p>
            <p>
              The instrument manual is the source of truth for what its indication means.
              Alphanumeric strings, graphical symbols and LED patterns are not standardised between
              manufacturers — always check the legend before recording a result.
            </p>
          </ConceptBlock>

          {/* Phase sequence vector diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Phase sequence — clockwise (L1, L2, L3) vs anti-clockwise (L1, L3, L2)
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Two phasor diagrams. Left: clockwise sequence with L1 at 0 degrees, L2 at 120 degrees lag, L3 at 240 degrees lag, indicator showing CW. Right: anti-clockwise after swapping L2 and L3, with L1 at 0, L3 at 120 lag, L2 at 240 lag, indicator showing ACW."
            >
              {/* LEFT — clockwise */}
              <text
                x="180"
                y="30"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontWeight="bold"
              >
                CLOCKWISE — correct sequence
              </text>
              <text x="180" y="46" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
                L1 → L2 → L3 (peaks in order)
              </text>

              {/* Reference circle */}
              <circle
                cx="180"
                cy="180"
                r="100"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              {/* Origin */}
              <circle cx="180" cy="180" r="3" fill="rgba(255,255,255,0.5)" />

              {/* L1 phasor — 0 degrees (right) */}
              <line x1="180" y1="180" x2="280" y2="180" stroke="#EF4444" strokeWidth="2.5" />
              <polygon points="280,180 272,176 272,184" fill="#EF4444" />
              <text x="290" y="184" fill="#EF4444" fontSize="13" fontWeight="bold">
                L1
              </text>
              <text x="290" y="198" fill="rgba(255,255,255,0.5)" fontSize="9">
                0°
              </text>

              {/* L2 phasor — 120 degrees lag (down-left) */}
              <line x1="180" y1="180" x2="130" y2="266.6" stroke="#FBBF24" strokeWidth="2.5" />
              <polygon points="130,266.6 134,258 138,266" fill="#FBBF24" />
              <text x="100" y="280" fill="#FBBF24" fontSize="13" fontWeight="bold">
                L2
              </text>
              <text x="80" y="294" fill="rgba(255,255,255,0.5)" fontSize="9">
                120° lag
              </text>

              {/* L3 phasor — 240 degrees lag (up-left) */}
              <line x1="180" y1="180" x2="130" y2="93.4" stroke="#3B82F6" strokeWidth="2.5" />
              <polygon points="130,93.4 138,94 134,102" fill="#3B82F6" />
              <text x="100" y="88" fill="#3B82F6" fontSize="13" fontWeight="bold">
                L3
              </text>
              <text x="80" y="74" fill="rgba(255,255,255,0.5)" fontSize="9">
                240° lag
              </text>

              {/* CW arrow on circle */}
              <path
                d="M 230 130 A 70 70 0 0 1 230 230"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <polygon points="230,230 222,224 234,222" fill="#22C55E" />
              <text x="252" y="184" fill="#22C55E" fontSize="11" fontWeight="bold">
                CW
              </text>

              {/* Tester indication box */}
              <rect
                x="100"
                y="310"
                width="160"
                height="36"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="180"
                y="328"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Tester: "1-2-3" / CW
              </text>
              <text x="180" y="342" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Pre-energisation: PASS
              </text>

              {/* Divider */}
              <line
                x1="400"
                y1="40"
                x2="400"
                y2="350"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />

              {/* RIGHT — anticlockwise (L2 and L3 swapped) */}
              <text
                x="600"
                y="30"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontWeight="bold"
              >
                ANTI-CLOCKWISE — L2 and L3 swapped
              </text>
              <text x="600" y="46" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
                L1 → L3 → L2 (motor reverses)
              </text>

              <circle
                cx="600"
                cy="180"
                r="100"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <circle cx="600" cy="180" r="3" fill="rgba(255,255,255,0.5)" />

              {/* L1 phasor — 0 degrees (right) */}
              <line x1="600" y1="180" x2="700" y2="180" stroke="#EF4444" strokeWidth="2.5" />
              <polygon points="700,180 692,176 692,184" fill="#EF4444" />
              <text x="710" y="184" fill="#EF4444" fontSize="13" fontWeight="bold">
                L1
              </text>
              <text x="710" y="198" fill="rgba(255,255,255,0.5)" fontSize="9">
                0°
              </text>

              {/* L3 phasor — now at 120 degrees lag */}
              <line x1="600" y1="180" x2="550" y2="266.6" stroke="#3B82F6" strokeWidth="2.5" />
              <polygon points="550,266.6 554,258 558,266" fill="#3B82F6" />
              <text x="520" y="280" fill="#3B82F6" fontSize="13" fontWeight="bold">
                L3
              </text>
              <text x="500" y="294" fill="rgba(255,255,255,0.5)" fontSize="9">
                120° lag
              </text>

              {/* L2 phasor — now at 240 degrees lag */}
              <line x1="600" y1="180" x2="550" y2="93.4" stroke="#FBBF24" strokeWidth="2.5" />
              <polygon points="550,93.4 558,94 554,102" fill="#FBBF24" />
              <text x="520" y="88" fill="#FBBF24" fontSize="13" fontWeight="bold">
                L2
              </text>
              <text x="500" y="74" fill="rgba(255,255,255,0.5)" fontSize="9">
                240° lag
              </text>

              {/* ACW arrow */}
              <path
                d="M 650 230 A 70 70 0 0 1 650 130"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <polygon points="650,130 642,138 654,138" fill="#EF4444" />
              <text x="668" y="184" fill="#EF4444" fontSize="11" fontWeight="bold">
                ACW
              </text>

              <rect
                x="520"
                y="310"
                width="160"
                height="36"
                rx="6"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="600"
                y="328"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Tester: "1-3-2" / ACW
              </text>
              <text x="600" y="342" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Reg 643.9 FAIL — correct before energising load
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

          <ContentEyebrow>Why phase rotation matters</ContentEyebrow>

          <ConceptBlock
            title="The equipment that cares — and the consequences when it gets reverse rotation"
            plainEnglish="Three-phase induction motors and any plant driven by them care about phase sequence. Get it wrong and the motor runs the right speed at the right current, in the wrong direction. Most of the time, the only signal is the motion itself."
          >
            <p>
              Phase rotation is relevant primarily for three-phase induction motors and the plant
              they drive. Reverse rotation is mechanically benign for the motor itself — the
              rotating magnetic field reverses, the rotor follows, the motor draws normal current.
              But the load is rarely so forgiving:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pumps:</strong> centrifugal pumps in reverse deliver little to no flow,
                cavitate, and (depending on design) can unscrew their own impeller. Some
                positive-displacement pumps can be physically damaged in seconds by reverse
                rotation.
              </li>
              <li>
                <strong>Compressors:</strong> screw and scroll compressors can self-destruct on
                reverse rotation — the helical geometry only operates one way.
              </li>
              <li>
                <strong>Conveyors and saws:</strong> obvious mechanical hazard. Product travels the
                wrong direction; saw teeth grab instead of cut.
              </li>
              <li>
                <strong>Lifts and hoists:</strong> the cabin or load travels in the opposite
                direction to that commanded. This is a safety-critical failure mode.
              </li>
              <li>
                <strong>Three-phase HVAC:</strong> fans deliver greatly reduced airflow in reverse;
                some scroll-compressor heat pumps trip immediately on reverse rotation.
              </li>
            </ul>
            <p>
              Reg 643.9 sits where it does in the test sequence because reverse rotation is
              invisible to overcurrent and earth-fault protection. The MCB does not see a fault. The
              RCD does not trip. Only the rotation indicator and the resulting plant behaviour tell
              you something is wrong — which is why the verification is mandated, not recommended.
            </p>
          </ConceptBlock>

          <Scenario
            title="Three-phase commercial kitchen — replacement extract fan"
            situation="A commercial extract fan is replaced on a Friday afternoon. The old fan was wired direct to the local isolator; the new fan is the same physical footprint and electrically equivalent. The installer copies the wiring across without checking phase rotation. The kitchen is handed back. On Monday the chef reports the extract is poor."
            whatToDo="Treat as a phase rotation suspect. Isolate, prove dead, lock-off. With the local isolator open, energise the supply side and probe phase rotation at the isolator's outgoing terminals (or at the fan motor terminal box) using a two-probe phase rotation tester. If the indication is anti-clockwise, swap any two phases at the local isolator's outgoing terminals (NOT the supply side) and re-test. Re-energise; confirm the fan now spins in the direction marked on its housing. Record the result against Reg 643.9 in the Schedule of Test Results."
            whyItMatters="Reverse rotation on a centrifugal extract fan typically reduces airflow by 30–50 % — enough to fail the kitchen's ventilation regulations, build heat in the canopy, and cause grease to deposit in places the cleaning regime never covers. The motor itself is fine; the system is broken. The 90-second rotation check would have caught it before handover."
          />

          <SectionRule />

          <ContentEyebrow>The instruments — three-wire vs two-probe</ContentEyebrow>

          <ConceptBlock
            title="Three-wire phase rotation indicator — the traditional tool"
            plainEnglish="Three crocodile clips, one per phase, attached to L1/L2/L3 at the test point. The instrument internally drives a small motor or rotating disc; the disc rotates clockwise or anti-clockwise according to phase sequence. Cheap, simple, robust."
            onSite="Three-wire indicators are still common — particularly the rotating-disc style on older test kits. Their weakness is the connection method: three crocodile clips on energised three-phase terminals create three independent slip and bridge hazards."
          >
            <p>
              The classic phase rotation indicator has three test leads, each terminated in a
              crocodile clip and labelled L1, L2, L3. The clips are attached, in order, to the
              corresponding line conductors at the test point. With the supply energised, the
              instrument indicates rotation by either:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Mechanical disc rotation:</strong> a small disc visibly turns clockwise or
                anti-clockwise.
              </li>
              <li>
                <strong>LED sequence:</strong> three LEDs labelled L1/L2/L3 illuminate in turn, the
                order indicating sequence.
              </li>
              <li>
                <strong>Alphanumeric display:</strong> "1-2-3" / "1-3-2" / "CW" / "ACW" or similar.
              </li>
            </ul>
            <p>
              BS EN 61557-7 is the performance standard: an instrument shall provide a clear,
              unambiguous indication of phase sequence between 85 % and 110 % of nominal voltage and
              between 95 % and 105 % of nominal frequency. Outside those bands the indication may be
              unreliable and shall not be used to satisfy Reg 643.9.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Two-probe phase rotation tester — the safer modern alternative"
            plainEnglish="An approved voltage tester (often the same device used for proving dead) with a phase rotation function. The user holds two probes and momentarily contacts any two of the three line conductors. The instrument's internal sensing determines rotation from the two-phase signal pattern."
            onSite="Two-probe testers are now the default choice on live work. No clips on the busbars, no hanging leads, no third connection to slip. The trade-off is technique: you have to know which two phases you have probed and the user has to interpret the indication accordingly."
          >
            <p>
              The two-probe approach uses the same hand-held probes already used for proving dead
              under safe-isolation procedures. The instrument senses the relative timing of the two
              waveforms it sees and infers rotation. GN3 explicitly notes the safety advantage: they
              do not require the inspector to attach wires to the installation, needing only two
              phases to be probed with hand-held probes.
            </p>
            <p>Practical considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The probe tips must be GS38-compliant (max 4 mm exposed metal, finger-guarded
                shroud) and CAT IV-rated for distribution-board work.
              </li>
              <li>
                Probe pairs are interchangeable for a healthy supply — L1/L2 should give the same
                indication as L2/L3 as L1/L3. An inconsistent indication between probe pairs is a
                wiring fault, not a meter quirk.
              </li>
              <li>
                Take readings at the test point you have just proved dead and re-energised, not on a
                different fed circuit.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="GN3 · Phase sequence safety advantage of two-probe testers"
            clause={
              <>
                Approved voltage testers with two-probe phase rotation facilities offer an increase
                in safety over standard three-wire phase rotation testers because they do not
                require the inspector to attach wires to the installation, needing only two phases
                to be probed with hand-held probes.
              </>
            }
            meaning="Two-probe testers are the default for live phase rotation testing on this course. Three-wire instruments remain valid where the test point is designed for clip attachment (e.g. test points downstream of an isolator, with the cover off and clear access) and the risk assessment supports it."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The live test discipline</ContentEyebrow>

          <ConceptBlock
            title="How to actually do the live phase rotation test — safely"
            plainEnglish="Phase rotation is one of the small set of tests that requires the supply to be energised. Treat the live test with the same discipline as any other live work: risk-assess, dress for it, stand off, two-person where the system warrants it, and minimise time at the live face."
            onSite="The order matters: dead test, isolate, prove dead at the test point, then re-energise specifically for the rotation check. Do not extend the live exposure window — get the indication, retreat, then continue with the rest of the test schedule."
          >
            <p>
              The procedure for a live phase rotation check at a three-phase distribution board:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Risk assess.</strong> Identify the test point. Identify how exposed
                conductors will be presented. Identify escape routes. Identify whether two-person
                working is required (it is, for distribution-board live access in most occupied
                premises and for any supply with prospective fault current that warrants a second
                person on the lock-off).
              </li>
              <li>
                <strong>Dress for the live face.</strong> Arc-rated PPE appropriate to the
                prospective fault energy at the test point. Insulated gloves (BS EN 60903) where
                contact with bare conductors is possible. Eye protection. CAT IV-rated test
                equipment with GS38-compliant leads.
              </li>
              <li>
                <strong>Confirm dead and prove the test point.</strong> Before re-energising for the
                rotation check, prove the test point is dead with the same instrument used for
                rotation. This is the proving step — never trust an isolator without confirming with
                a tester proven against a known live source before and after.
              </li>
              <li>
                <strong>Re-energise.</strong> Restore supply at the agreed switching point. Stand
                off until any inrush has settled.
              </li>
              <li>
                <strong>Take the rotation indication.</strong> With a two-probe tester, contact any
                two of the three line conductors momentarily; read the indication; release. Repeat
                for a different probe pair to confirm consistency. With a three-wire instrument,
                attach L1/L2/L3 clips before energising the test point, then re-energise; read;
                de-energise; remove clips.
              </li>
              <li>
                <strong>Record on the schedule.</strong> Indication observed (CW / ACW or
                alphanumeric), test point location, instrument and serial number, date.
              </li>
              <li>
                <strong>Repeat at every relevant point.</strong> Sub-mains, downstream three-phase
                DBs, three-phase socket-outlets, plant terminations.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Treating phase rotation as a single-point test at the main intake"
            whatHappens="The check is done only at the main intake. Sequence is correct there. Three weeks later a portable three-phase saw is plugged into a sub-board on the first floor and runs in reverse — the sub-board was wired with two phases swapped at its incoming terminals. The intake check did nothing for it."
            doInstead="Reg 643.9 says all relevant points throughout the installation. Treat each downstream three-phase distribution board, each three-phase socket-outlet and each plant-supply termination as its own test point. A 30-second rotation check per point is cheap insurance against a wiring error that could otherwise sit undiscovered until a portable consumer travels to it."
          />

          <CommonMistake
            title="Swapping phases at the supply to fix one motor's rotation"
            whatHappens="A new three-phase pump is found to run anti-clockwise on commissioning. The installer swaps two phases at the outgoing of the distribution board. The pump now runs the right way. But every other three-phase circuit on that DB now has reversed rotation — the kitchen extract, the workshop conveyor, the goods lift. Every other piece of plant on that board is now non-compliant against Reg 643.9 and may run in reverse the next time it is energised."
            doInstead="Always swap at the load. The load isolator's outgoing terminals, or the motor terminal box itself, is the correct place. The swap is then local to that single piece of plant — the rest of the installation keeps its phase sequence intact. After the swap, re-test rotation at the load and confirm correct, and re-test rotation at any downstream three-phase point that might have been affected."
          />

          <CommonMistake
            title="Reading the indication without checking the instrument legend"
            whatHappens="A digital phase rotation tester displays '1-3-2'. The installer assumes 1-3-2 means clockwise (numerical order forward) and records pass. The indication is anti-clockwise per the instrument's manual. The motor is energised, runs in reverse, the centrifugal pump cavitates within seconds and is damaged."
            doInstead="Interpretation of alphanumeric strings, graphical symbols and LED patterns is dependent on the instrument's manual or legend. Read the legend (printed on most instruments, full detail in the manual) before recording. Train as a habit: every new instrument, look up the legend on first use; every old instrument, re-confirm at the start of any phase rotation testing session."
          />

          <SectionRule />

          <ContentEyebrow>The dead-test confirmation route (GN3)</ContentEyebrow>

          <ConceptBlock
            title="Confirming phase sequence by continuity — when and how"
            plainEnglish="GN3 permits phase sequence to be confirmed by continuity testing in the same manner as polarity checks. With the circuit isolated, each line conductor is tested one at a time linked to the protective conductor — the same R1+R2 method, applied per phase to identify which conductor at the far end is which."
            onSite="The dead test is useful during commissioning of new wiring before energisation, or when investigating a suspected wiring error and energising would be unsafe. It confirms the identity of each conductor — but it does not replace the live rotation indication, which remains the canonical Reg 643.9 verification."
          >
            <p>The GN3 procedure for dead-test phase confirmation:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Isolate the circuit at the source, prove dead at the test point, lock off.</li>
              <li>
                At the source (DB outgoing or local isolator), connect a temporary link between L1
                only and the circuit's protective conductor.
              </li>
              <li>
                At the far end (motor terminal box, three-phase socket, plant termination), use a
                low-resistance ohmmeter to identify which conductor reads continuity to the
                protective conductor. That conductor is L1.
              </li>
              <li>
                Remove the L1 link. Repeat for L2, then L3. Each test confirms the identity of one
                conductor.
              </li>
              <li>
                Once all three are identified, the order at the far end is known. If the installer's
                labelling matches, sequence is correct in identity terms.
              </li>
              <li>
                Re-energise and perform the live rotation indication for the formal Reg 643.9
                record.
              </li>
            </ol>
            <p>
              Each line conductor is tested one at a time so that the identification is unambiguous
              — testing two at once cannot tell you which is which. Phase sequence confirmation by
              continuity testing is permitted in the same manner as polarity checks; the technique
              mirrors single-phase polarity continuity verification but applied per phase.
            </p>
          </ConceptBlock>

          <Scenario
            title="New three-phase sub-main, pre-energisation"
            situation="You have run a new three-phase SWA sub-main from the main DB to a workshop sub-board, ≈45 m. The cores have been identified at both ends by colour. Before energising the sub-board for the first time, you want to confirm that L1/L2/L3 at the sub-board terminals correspond to L1/L2/L3 at the main DB."
            whatToDo="Use the dead-test confirmation. With the sub-main isolated at the main DB and the sub-board's main switch open, link L1 (only) to the sub-main's CPC at the main DB. At the sub-board, with a low-resistance ohmmeter, find which line terminal reads near-zero ohms to the CPC — that is L1. Note. Remove L1 link, link L2 to CPC, repeat. Remove, link L3, repeat. If all three identifications agree with the labelling at the sub-board, the cores are correctly identified. Energise. Then perform the live phase rotation check at the sub-board's outgoing terminals to record the formal Reg 643.9 result."
            whyItMatters="The dead test prevents an energise-and-find-out situation where, if the cores were swapped, you would discover the problem only by observing wrong-way motor rotation downstream. The dead-test takes 5 minutes and removes the live discovery from the sequence."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where Reg 643.9 sits in the test sequence</ContentEyebrow>

          <ConceptBlock
            title="The phase rotation check in context — before the load is energised, after the dead tests"
            plainEnglish="Reg 643.9 lives at the energised end of the test sequence — after the dead tests (continuity, insulation resistance, polarity), after the protective-device verifications under 643.7 / 643.8, and before the functional tests under 643.10 that operate the connected load."
            onSite="On a new three-phase commissioning the order is roughly: continuity → insulation → Ze / loop / RCD trip → polarity → energise main switch only → phase rotation check at the intake → energise sub-mains in turn → phase rotation check at each downstream board → energise final circuits → functional test of connected plant. The rotation check is a gate at each energising step, not an end-of-job tick."
          >
            <p>
              The reason Reg 643.9 lives where it does is that the rotation check has to happen with
              the supply energised but before the load is operated. Energising the main switch makes
              the busbars live without any consumer drawing current; that is the cleanest moment to
              take a phase rotation indication. The same pattern repeats at every downstream
              three-phase board: energise the incoming, take rotation, then energise the outgoing
              circuits one by one.
            </p>
            <p>
              Where the installation has motor-driven plant downstream of a sub-board, the rotation
              indication at the sub-board\'s outgoing terminals is your gate before starting any
              motor. If the indication is wrong, correct (load-side swap at the motor isolator or
              motor terminal box) before energising the motor — never observe the motor running in
              reverse as the diagnostic.
            </p>
            <p>
              For installations with multiple supplies (e.g. generator backup, transfer schemes,
              parallel transformers), each source has to be checked independently and proved to
              match. A generator that arrives on site with the wrong rotation relative to the public
              supply is a paralleling-fault waiting for the next mains failure — picked up by Reg
              643.9 commissioning and not by the main-supply intake test alone.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording the result</ContentEyebrow>

          <ConceptBlock
            title="What goes on the Schedule of Test Results and the EIC"
            plainEnglish="The phase sequence check has its own column on the Schedule of Test Results for three-phase circuits. Record the indication observed (CW or alphanumeric equivalent), the test point, and confirm in the EIC declaration that Reg 643.9 has been satisfied."
          >
            <p>
              On the A4:2026 Schedule of Test Results, three-phase circuits are recorded with a
              phase sequence column. Three rules:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Tick / pass / CW</strong> for circuits where the sequence matches the
                installation's agreed sequence at the test point.
              </li>
              <li>
                <strong>Note any corrective action</strong> in the comments column where the
                sequence was wrong on first inspection and corrected (e.g. "L2/L3 swapped at motor
                isolator on commissioning, re-tested, sequence now CW"). Document the original
                non-compliance and its remediation.
              </li>
              <li>
                <strong>Test point identified</strong> for each result. "Three-phase socket on bench
                3" is more useful to the next inspector than "tested".
              </li>
            </ul>
            <p>
              Single-phase circuits derived from the three-phase board do not require a phase
              sequence entry — there is one phase, no sequence to verify. The polarity column covers
              the L–N orientation duty for those circuits.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.9: for polyphase circuits, verify phase sequence is maintained at all relevant points — main intake, downstream DBs, three-phase sockets, plant terminations.',
              'It is a live test (or a dead-test confirmation by per-phase continuity, then a live indication for the formal record). Energised system at 85–110 % V / 95–105 % f for the BS EN 61557-7 instrument to give an unambiguous indication.',
              'Two-probe tester preferred over three-wire — only hand-held probe contact, no clips on energised busbars. CAT IV / GS38 leads.',
              "Wrong rotation? Swap two phases at the load (motor terminal box / local isolator), never at the DB or upstream — protects every other circuit's sequence.",
              'Read the instrument legend before recording. Alphanumeric strings ("1-2-3" / "1-3-2") and LED patterns are not standardised between manufacturers.',
              'Inconsistent indication between probe pairs at the same accessory = wiring fault. Investigate before energising downstream equipment.',
              'On extensions, the new sequence must match the existing — phase order is continuous throughout original and extended installation.',
              'Record indication (CW / ACW / alphanumeric) and test point for each three-phase circuit on the Schedule of Test Results. Reverse-rotation discoveries get noted in comments with remediation detail.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is phase rotation testing required on every three-phase circuit, or only those feeding motors?',
                answer:
                  'Reg 643.9 applies to all polyphase circuits — the duty is to verify phase sequence is maintained at all relevant points throughout the installation, regardless of what is connected. The motor is the obvious case where reverse rotation has consequences, but a three-phase socket today might feed a portable saw or pump tomorrow. The check is required at the relevant point, not just at the relevant load.',
              },
              {
                question:
                  'Can I rely on cable-core colour identification (brown/black/grey) to confirm phase sequence?',
                answer:
                  'No. Colour confirms what you intended to connect, not what is actually energised at the test point. A core mis-terminated at one end is invisible to colour-only checking. Reg 643.9 requires verification — measurement with an instrument, or per-phase continuity confirmation. Colour is part of the visual inspection (Section 651.2 inspection items), not a substitute for the rotation test.',
              },
              {
                question:
                  'My phase rotation tester is showing CW on L1/L2 but ACW on L2/L3 at the same three-phase socket. Is the tester broken?',
                answer:
                  'Almost certainly not. On a healthy three-phase supply all probe-pair combinations give the same rotation indication. An inconsistent reading between pairs means one of the line conductors at the socket is not what its label says — typically a phase swapped at the socket terminals or somewhere upstream on this circuit. Treat as Reg 643.9 fail, isolate, investigate the wiring, correct, re-test. To rule out the meter, take the same readings at a known-good three-phase point on the same installation.',
              },
              {
                question:
                  'How do I do a phase rotation check on an installation with no three-phase sockets, only fixed wiring to plant?',
                answer:
                  'Test at the plant termination. The motor terminal box, the local isolator outgoing terminals, the panel-board incoming terminals — any three-phase point that is part of the installation. With the supply isolated, prove dead, expose the test point safely, re-energise, take the indication with a two-probe tester, then de-energise and re-secure the cover. Record the test point against the circuit on the Schedule of Test Results.',
              },
              {
                question:
                  'On a periodic inspection (EICR) of an existing three-phase installation, do I have to re-do phase rotation at every point?',
                answer:
                  'Periodic inspection is sample-based against the agreed scope — Reg 651 governs frequency, extent and the limitations declared on the report. Phase rotation should be sampled at every readily accessible three-phase distribution board and at each three-phase socket-outlet covered by the inspection. If the indication is consistent across the sampled points and matches the agreed installation sequence, that is your evidence; any inconsistency triggers full investigation. Document scope and limitations on the EICR.',
              },
              {
                question:
                  'What is the difference between phase rotation and polarity for the purposes of BS 7671 inspection and testing?',
                answer:
                  'Polarity (Reg 643.6) is the L–N orientation check on single-phase circuits — that switches and single-pole protective devices are in the line conductor, not the neutral. Phase rotation (Reg 643.9) is the L1–L2–L3 sequence check on three-phase circuits. Different regulation, different concept, different instrument. Both are required at initial verification; both have their own column on the Schedule of Test Results.',
              },
              {
                question:
                  'Can I do the phase rotation check at the motor terminal box rather than at the supply isolator?',
                answer:
                  'Yes — the motor terminal box is a relevant point in the Reg 643.9 sense. In fact, testing at the motor terminal box is the most direct check for the rotation that the motor will actually see. The trade-off is access: opening a motor terminal box for a live test usually means energising a partially exposed assembly. Two-probe testers and a tight risk assessment make this acceptable; otherwise, test at the local isolator outgoing and accept that the cable between isolator and motor cannot itself swap the sequence.',
              },
              {
                question:
                  'A generator is paralleled with the public supply. Why does phase rotation matter at commissioning?',
                answer:
                  'Phase rotation mismatch between a generator and the public supply is a paralleling-fault condition that can cause severe equipment damage and large fault currents. Compatibility of characteristics (per Reg 551 / 557 paralleling requirements) shall include correct phase sequence and rotation between the generator and the public supply; this shall be verified during commissioning before any synchronising attempt. Phase sequence mismatch at the moment of paralleling is one of the high-energy failure modes for generator switchgear.',
              },
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Three-phase rotation testing — Module 7.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-7/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.4 Functional testing of switchgear
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

export default InspectionTestingModule7Section3;
