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

const quizQuestions = [
  {
    id: 1,
    question:
      'GS38 is the HSE’s guidance on electrical test equipment. Per OSG Chapter 10, what is the correct standard for the two-pole voltage detector itself?',
    options: [
      'BS EN 61010 — instrument safety',
      'BS EN 61557 — multifunction tester suite',
      'BS EN 61243-3 — two-pole voltage detectors',
      'BS 7671 Appendix 6',
    ],
    correctAnswer: 2,
    explanation:
      'OSG 10.1 names BS EN 61243-3 as the standard for two-pole voltage detectors specifically, BS EN 61010 / BS EN 61557 for instruments more generally. A device branded as a “voltage indicator” for safe-isolation work should declare BS EN 61243-3 compliance on its label.',
  },
  {
    id: 2,
    question:
      'You are about to prove dead at a 230 V single-phase consumer unit. The voltage indicator is rated CAT III 600 V / CAT IV 300 V. Is this an appropriate selection?',
    options: [
      'No — CAT II is the required category at consumer-unit level',
      'Yes — CAT III 600 V / CAT IV 300 V covers a 230 V test at the consumer unit',
      'No — CAT IV 600 V is mandatory for any domestic test, including at final circuits',
      'Yes, but only once arc-rated PPE and insulating gloves are also worn',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Ch 1 defines CAT IV as CAT III plus equipment installed at or near the origin of the supply, between the building entrance and the primary distribution / consumer unit. The consumer unit itself is the CAT IV / CAT III boundary; an indicator rated CAT IV 300 V or CAT III 600 V covers a 230 V domestic test. Above the consumer unit (cut-out, meter tails up to the meter) you want CAT IV explicitly.',
  },
  {
    id: 3,
    question: 'What does the prove-test-prove sequence actually verify?',
    options: [
      'That the indicator works before and after, and the conductors read zero in between',
      'That the circuit is dead, in a single confirmation taken at the point of work',
      'That the circuit was correctly disconnected back at the meter position',
      'That the proving unit battery is in good condition before any testing starts',
    ],
    correctAnswer: 0,
    explanation:
      'Prove-test-prove verifies three things: the indicator can read voltage (prove on a known source before), the conductors at the point of work read no voltage (test), and the indicator was still functioning at the end (prove on the same known source after). A single “test reads zero” result is ambiguous — it could be a dead circuit, or a broken indicator. The two proves bracket the test so the zero in the middle is real.',
  },
  {
    id: 4,
    question:
      'The first prove on a fresh proving unit shows the indicator displays voltage. The test at the consumer unit reads zero. The second prove fails — the indicator no longer responds. Which conclusion is correct?',
    options: [
      'The circuit is dead and the indicator failed after the test — safe to start work',
      'The test is unreliable; replace the indicator and repeat the whole sequence',
      'The proving unit is faulty, so the second prove can be ignored on this circuit',
      'It only matters if voltage was actually expected on this particular circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Prove-test-prove is binary: both proves must succeed for the test to be trusted. A failed second prove means you have no evidence the indicator was working when it read zero on the conductors — it may have failed during the test and masked live voltage. Stop, replace the instrument with a known-good one, and re-run the whole sequence. You cannot reason your way past a failed second prove.',
  },
  {
    id: 5,
    question:
      'Which of the following is NOT acceptable as a known voltage source for the prove step of prove-test-prove?',
    options: [
      'A dedicated proving unit (e.g. Martindale VI-15700)',
      'A live socket on a separate, known-energised circuit',
      'A non-contact voltage tester held next to the indicator’s probes',
      'The output of a known-live distribution-board phase, after risk-assessing the live test',
    ],
    correctAnswer: 2,
    explanation:
      'A non-contact voltage tester is itself a detector, not a voltage source — it indicates the presence of a field, it does not generate a known voltage that another instrument can be tested against. A proving unit, a known-live socket, or a known-live conductor are all acceptable known sources. A non-contact tester used as a ‘proving device’ is one of the most common safety failures.',
  },
  {
    id: 6,
    question: 'Why is a non-contact voltage tester unsuitable for confirming a circuit is dead?',
    options: [
      'It fails to light at the lower end of the low-voltage band',
      'A null reading cannot distinguish a dead conductor from a non-detection',
      'It is not CE-marked for use on fixed installations',
      'It is too sensitive and over-reads on adjacent live cables',
    ],
    correctAnswer: 1,
    explanation:
      'A non-contact tester detects the presence of an electric field, not the absence of one. A null reading can mean dead, or shielded, or a flat battery, or an off-axis approach — it cannot tell “genuinely no voltage” from “not detected”. The failure mode is silent: a flat battery, a screened cable, or a slightly wrong angle gives the same null as a dead conductor. Proving dead requires positive contact, all-pole testing, and the prove-test-prove sequence with a contact-type voltage indicator.',
  },
  {
    id: 7,
    question:
      'For a 230 V single-phase final circuit, what is the minimum set of proving-dead readings between conductors at the point of work?',
    options: [
      'L–E only',
      'L–E and L–N',
      'L–E, L–N, and N–E (all three)',
      'L–E, L–N, N–E, plus a duplicate L–E for confirmation',
    ],
    correctAnswer: 2,
    explanation:
      'Three readings: L–E (proves line dead with respect to earth), L–N (proves no voltage between line and neutral), N–E (catches borrowed-neutral situations where another shared circuit puts voltage on this neutral). Skipping N–E is the classic gap that turns a borrowed-neutral install into an electric shock for the next operative.',
  },
  {
    id: 8,
    question:
      'On a TT system, Reg 537.3.3 requires isolation to disconnect all live conductors. For a 230 V single-phase TT circuit, which conductors does this include?',
    options: [
      'Line only — the neutral may remain connected on a TT supply',
      'Line and neutral — all live conductors must be disconnected',
      'Line and earth — the protective conductor is switched with the line',
      'All three conductors including the protective earth conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 537.3.3 (TT and IT systems) requires disconnection of all live conductors. “Live conductors” means line + neutral (the earth is not a live conductor). On a TT supply this matters because the neutral is not bonded to earth at the building — there is a real possibility of a fault leaving the neutral at potential. The proving-dead test on a TT install must include the neutral against earth as a live-to-earth combination, not just an information check.',
  },
  {
    id: 9,
    question:
      'You prove dead on a circuit you isolated 30 seconds ago. The indicator shows 18 V AC L–E. What do you do?',
    options: [
      'Start work — 18 V is below the extra-low-voltage shock threshold',
      'Start work, but glove up for the first few terminations as a precaution',
      'Stop and investigate the source before any work begins',
      'Re-isolate the same breaker and re-test until the reading clears',
    ],
    correctAnswer: 2,
    explanation:
      'Any unexpected reading is investigation territory, not acceptance territory. 18 V on a circuit you just isolated says something is feeding it — induced voltage from a parallel cable run, capacitive coupling on a long cable, a borrowed neutral, or a real backfeed from a downstream source. None of those are “less than 50 V so safe”. Identify the source. If it is induced/capacitive it will collapse under any deliberate load; if it is a backfeed, you have a second isolation point still to do.',
  },
  {
    id: 10,
    question:
      'OSG Chapter 10 / Appendix M direct you to two external sources for safe-isolation procedural detail. Which two?',
    options: [
      'BS EN 61557 and BS 7671 Appendix 6',
      'BS 7909 (temporary systems) and BS 7430 (earthing)',
      'IET Guidance Note 3 and BS 7671 Part 6 (inspection and testing)',
      'HSE HSG85 (Safe Working Practices) and Electrical Safety First BPG 2',
    ],
    correctAnswer: 3,
    explanation:
      'OSG Appendix M cites HSE HSG85 and Electrical Safety First Best Practice Guide 2. BS 7671 sets the duty (Reg 462.3, 537.2.4, 537.3.3); HSG85 + BPG2 set the procedure including prove-test-prove. The two should be on every site’s reference shelf.',
  },
];

const inlineChecks = [
  {
    id: 'mod2-s4-second-prove-failed',
    question:
      'Prove (before): indicator reads 230 V on the proving unit. Test at the point of work: indicator reads 0 V on every pairing. Prove (after): indicator reads 0 V on the proving unit — it has died. What is the procedurally correct call?',
    options: [
      'Accept the test — the second prove is only a courtesy check after the reading.',
      'Stop, replace the indicator, and repeat the whole prove-test-prove sequence.',
      'Re-test using a different known voltage source and keep the first reading.',
      'Accept the test, provided the lock-off at the source is still intact.',
    ],
    correctIndex: 1,
    explanation:
      'Prove-test-prove is binary: BOTH proves must succeed for the zero in the middle to be evidence. A failed second prove gives you no proof the indicator was working when it read zero on the conductors — it may have died during the test and masked live voltage. Replace the instrument with a known-good one and run the whole sequence again. There is no reasoning past a failed second prove.',
  },
  {
    id: 'mod2-s4-non-contact-tester',
    question:
      'A spark uses a non-contact voltage tester to "prove" his two-pole indicator: he holds the NCVT next to the indicator probes, the NCVT lights, he concludes the indicator is fine. What is wrong, and how could it kill someone?',
    options: [
      'Nothing is wrong — NCVTs are recognised proving devices for this purpose.',
      'The NCVT is a detector, not a source, so it puts no signal on the indicator probes.',
      'NCVTs are not CE-marked for use on fixed installations in the UK.',
      'The NCVT is too sensitive and gives the indicator a false high reading.',
    ],
    correctIndex: 1,
    explanation:
      'A non-contact tester senses a field around itself and lights up — it generates no voltage between two terminals. Touching it to a two-pole indicator gives the indicator nothing to detect. The "0 V" the indicator then reads on conductors is meaningless. Use a dedicated proving unit, a known-live socket, or a known-live conductor under documented live-test risk assessment.',
  },
  {
    id: 'mod2-s4-borrowed-neutral',
    question:
      'You isolate the upstairs lighting MCB. Test at a ceiling rose: L–E reads 0 V, L–N reads 0 V. You skip N–E because the line is dead. You strip the neutral and get a 60 V belt. What did the missed reading reveal, and which Reg framing covers the duty?',
    options: [
      'Static discharge from your clothing against the metalwork.',
      'A borrowed neutral, which the missed N–E reading would have shown.',
      'Induced voltage coupled from a parallel cable run nearby.',
      'Harmless capacitive coupling on a long final-circuit cable.',
    ],
    correctIndex: 1,
    explanation:
      'The N–E test is the smoking-gun reading: it would have shown ~60 V because the still-live downstairs lighting shares the upstairs neutral somewhere in the loft, returning current through the conductor you stripped. Borrowed neutrals are common enough on older domestic rewires that the all-pole prove-dead set (L–E, L–N, N–E) was designed specifically to catch them. Reg 537.3.3 makes "all live conductors" — including the neutral — explicit on TT/IT, and Reg 462.2 requires all live conductors to be isolated and verified; the same logic applies as a competence floor on TN systems too.',
  },
  {
    id: 'mod2-s4-cat-rating-meter-tails',
    question:
      'You are about to prove dead at the meter tails on the supply side of a domestic consumer unit. Your indicator is rated CAT III 600 V / CAT IV 300 V. Your leads are CAT III 1000 V. Is the test set-up appropriate, and what is the rule?',
    options: [
      'Yes — CAT III 1000 V is the highest rating, so the set-up is CAT III 1000 V overall.',
      'Yes — meter tails are a domestic location, so CAT III is sufficient throughout.',
      'No — the CAT III leads make it a CAT III set-up, below the CAT IV the origin demands.',
      'No — only CAT II is acceptable in domestic premises, so both items are over-rated.',
    ],
    correctIndex: 2,
    explanation:
      'The equivalent overvoltage category for a test arrangement is the lowest CAT of any item in the chain (instrument, leads, probes, adapters). A CAT IV instrument with CAT III leads is a CAT III set-up — and meter tails / cut-out / origin sit firmly in CAT IV territory per GN3 Ch 1, which places equipment between the building entrance and the primary distribution / consumer unit explicitly in CAT IV. Use CAT IV-rated leads so every item matches the location.',
  },
];

const InspectionTestingModule2Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Proving dead techniques | I&T Module 2.4 | Elec-Mate',
    description:
      'GS38 + OSG Ch 10 + GN3 Ch 1: prove-test-prove sequence, two-pole voltage indicators to BS EN 61243-3, CAT III / CAT IV ratings, what counts as a known source, and why a non-contact tester is not a proving device.',
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
            eyebrow="Module 2 · Section 4"
            title="Proving dead techniques"
            description="Prove-test-prove with a GS38-compliant two-pole voltage indicator. The single test that converts “I think it’s isolated” into “I know it’s dead” — done correctly, every time, before any conductor is touched."
            tone="yellow"
          />

          <TLDR
            points={[
              'Prove-test-prove is one sequence with three readings: prove the indicator works on a known source, test the conductors at the point of work, prove the indicator still works on the same known source. Both proves must succeed for the test to be trusted.',
              'The indicator: a two-pole voltage detector to BS EN 61243-3, GS38-compliant probes and leads, voltage rating matched to the system, CAT rating matched to the level of switchgear (CAT III for distribution, CAT IV for origin / cut-out / meter tails).',
              'The known source: a dedicated proving unit, OR a known-live socket on a separately energised circuit, OR a known-live conductor accessed under a documented live-test risk assessment. NOT a non-contact tester (it is a detector, not a source).',
              'All-pole testing at the point of work, not at the isolation point. Single-phase: L–E, L–N, N–E (3 readings). Three-phase: 10 readings covering every conductor pairing including N–E.',
              'OSG Appendix M directs you to HSE HSG85 and Electrical Safety First Best Practice Guide 2 for the procedural detail. BS 7671 (Reg 537.3.3, Reg 641.4) sets the duty; HSG85 + BPG2 set the steps.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Execute the prove-test-prove sequence using a GS38-compliant two-pole voltage indicator and a recognised known voltage source',
              'Identify the correct CAT rating (CAT III / CAT IV) for any given test point and select an indicator whose rating matches or exceeds it',
              'Justify why a non-contact voltage tester is not a proving device under any circumstances',
              'Run the all-pole test set: 3 readings on single-phase (L–E, L–N, N–E), 10 readings on three-phase, every reading at the point of work',
              'Interpret unexpected results — induced voltage, capacitive coupling, borrowed neutral, backfeed — and respond to each safely',
              'Document proving-dead with the correct minimum dataset for the day’s certificate / risk-assessment',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 537.3.3 (TT/IT) and Reg 641.4 — the duty to prove dead"
            plainEnglish="Two regulations matter. Reg 537.3.3 says isolation in TT and IT systems requires disconnection of all live conductors — so the proving-dead test has to actually verify all the conductors that should be dead are dead, not just the line. Reg 641.4 (under inspection and testing) says precautions shall be taken to avoid danger to persons during testing — in practice, that is the prove-dead step before any test that could see live current."
            onSite="The OSG and GN3 then translate the BS 7671 duties into procedure. OSG Chapter 12 names the prove-dead acceptance criterion: the voltage indicating device shall indicate that no voltage is present between the conductors used to isolate, at the point of work."
          >
            <p>The chain is straightforward:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS 7671:2018+A4:2026</strong> sets the duties: Reg 462.1 / 537.2.1.1 (every
                circuit isolatable), Reg 462.3 / 537.2.4 (prevent inadvertent closure), Reg 537.3.3
                (TT/IT — disconnect all live conductors), Reg 641.4 (precautions during inspection
                and testing).
              </li>
              <li>
                <strong>GN3 Ch 1 + Ch 4</strong>: observe HSE GS38 for instruments, leads, probes,
                accessories. Verify absence of voltage by suitable voltage indicator.
              </li>
              <li>
                <strong>OSG Ch 10 + Ch 12 + Appendix M</strong>: practical procedure including
                prove-test-prove acceptance criterion.
              </li>
              <li>
                <strong>HSE HSG85</strong>: HSE&rsquo;s authoritative document on safe working
                practices, including dead working principles.
              </li>
              <li>
                <strong>Electrical Safety First Best Practice Guide 2</strong>: industry consensus
                on safe-isolation steps.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 641.4 (and GN3 Ch 1)"
            clause={
              <>
                Precautions shall be taken to avoid danger to persons and livestock, and to avoid
                damage to property and installed equipment, during inspection and testing. Where
                isolation is appropriate to prevent danger during inspection and testing, circuits
                and equipment shall be safely isolated and locked off in accordance with
                BS&nbsp;7671 safe isolation principles.
              </>
            }
            meaning="The duty is on the inspector. Before any test that involves contact with conductors or could see fault current pass through the test set-up, the conductors must be isolated, locked off, and proved dead. ‘Safely isolated’ includes the prove-dead step — you cannot just assume the isolator did its job."
          />

          <RegsCallout
            source="OSG Chapter 10.1 (Safety and equipment) and GN3 Ch 1"
            clause={
              <>
                Live testing of electrical installations is a recognized method of assessing the
                suitability and safety of an electrical installation. However, suitable precautions
                must be taken including employing the correct test equipment and suitable personal
                protective equipment. Checking that the test instrumentation is made in accordance
                with the appropriate safety standards such as BS&nbsp;EN&nbsp;61243-3 for two-pole
                voltage detectors and BS&nbsp;EN&nbsp;61010 or BS&nbsp;EN&nbsp;61557 for
                instruments. The safety measures and procedures in HSE GS38 shall be observed for
                all instruments, leads, probes and accessories.
              </>
            }
            meaning="The instrument standards are explicit. A two-pole voltage detector for safe-isolation is a BS&nbsp;EN&nbsp;61243-3 device. Multifunction testers are BS&nbsp;EN&nbsp;61010 / BS&nbsp;EN&nbsp;61557. GS38 governs the leads, probes, fingerguards and exposed-tip lengths — a non-GS38-compliant probe converts a compliant instrument into a non-compliant test set-up."
          />

          <SectionRule />

          <ContentEyebrow>The prove-test-prove sequence</ContentEyebrow>

          <ConceptBlock
            title="Why three readings, not one"
            plainEnglish="A single &lsquo;test reads zero’ result is ambiguous. Zero might mean: the conductor is genuinely dead. Or it might mean: the indicator has a flat battery. Or a broken probe. Or a blown internal fuse. The two proves either side of the test eliminate the second possibility — if the indicator reads voltage on a known source before, and reads voltage on the same known source after, then it was working at both ends of the test, and the zero in the middle is the real state of the conductor."
            onSite="Both proves are non-negotiable. A failed second prove invalidates the test, regardless of how many other things are pulling on your time. Replace the indicator, repeat the sequence."
          >
            <p>The full sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Inspect the indicator</strong> for obvious damage, cracked probe insulation,
                frayed leads, loose finger-guards, missing fuse covers. OSG 12.5 requires this as
                the first stage. A damaged indicator goes back in the bag, not on the conductors.
              </li>
              <li>
                <strong>Prove (before)</strong>: connect the two probes to a known voltage source —
                a dedicated proving unit, or a known-live socket on a separately energised circuit.
                The indicator must display voltage at the expected level (typically 50 V / 230 V /
                400 V depending on the proving unit setting).
              </li>
              <li>
                <strong>Test</strong>: connect the two probes to each pair of conductors at the
                point of work, in turn. Single-phase: L–E, L–N, N–E. Three-phase: every pairing of
                L1, L2, L3, N, E (10 readings). Every reading must be 0 V or indistinguishable from
                0 V on the indicator&rsquo;s display.
              </li>
              <li>
                <strong>Prove (after)</strong>: return to the known voltage source and repeat the
                prove step. The indicator must still display voltage at the same level.
              </li>
              <li>
                <strong>Decision</strong>: if both proves succeeded and every test read 0 V, the
                circuit is dead and work may begin. If either prove failed, or any test read
                non-zero, work does not begin until the cause is identified and resolved.
              </li>
            </ol>
          </ConceptBlock>

          {/* Prove-test-prove diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Prove → Test → Prove — the three indicator displays
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="The three-step prove-test-prove sequence. Step 1, indicator on the proving unit, display reads 230 volts, prove succeeds. Step 2, indicator on the conductors at the point of work, display reads zero volts, test confirms dead. Step 3, indicator returned to the proving unit, display reads 230 volts again, second prove succeeds. The combined sequence confirms the indicator was working at both ends of the test, so the zero reading in the middle is real."
            >
              {/* Step 1 — Prove (before) */}
              <g>
                <rect
                  x="20"
                  y="40"
                  width="240"
                  height="280"
                  rx="12"
                  fill="rgba(34,197,94,0.08)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="140"
                  y="64"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STEP 1 — PROVE (before)
                </text>

                {/* Proving unit */}
                <rect
                  x="60"
                  y="84"
                  width="160"
                  height="60"
                  rx="6"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text
                  x="140"
                  y="105"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  PROVING UNIT
                </text>
                <text x="140" y="122" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  (known 230 V source)
                </text>
                <circle cx="100" cy="138" r="4" fill="#FBBF24" />
                <circle cx="180" cy="138" r="4" fill="#FBBF24" />

                {/* Two probes connecting unit to indicator below */}
                <line x1="100" y1="142" x2="120" y2="200" stroke="#EF4444" strokeWidth="2" />
                <line x1="180" y1="142" x2="160" y2="200" stroke="#22C55E" strokeWidth="2" />

                {/* Indicator body */}
                <rect
                  x="80"
                  y="200"
                  width="120"
                  height="80"
                  rx="10"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="140"
                  y="222"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  TWO-POLE INDICATOR
                </text>
                <text x="140" y="236" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                  BS EN 61243-3
                </text>
                {/* Display */}
                <rect
                  x="100"
                  y="246"
                  width="80"
                  height="26"
                  rx="3"
                  fill="rgba(0,0,0,0.55)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text
                  x="140"
                  y="265"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="14"
                  fontWeight="900"
                  fontFamily="monospace"
                >
                  230 V
                </text>

                <text
                  x="140"
                  y="304"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Indicator detects voltage ✓
                </text>
              </g>

              {/* Arrow 1 → 2 */}
              <path
                d="M260,180 L290,180"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
              />
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
                </marker>
              </defs>

              {/* Step 2 — Test */}
              <g>
                <rect
                  x="290"
                  y="40"
                  width="220"
                  height="280"
                  rx="12"
                  fill="rgba(251,191,36,0.06)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="400"
                  y="64"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STEP 2 — TEST
                </text>

                {/* Isolated conductors */}
                <rect
                  x="320"
                  y="84"
                  width="160"
                  height="60"
                  rx="6"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.2"
                />
                <text
                  x="400"
                  y="105"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  POINT OF WORK
                </text>
                <text x="400" y="122" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  (L – E, L – N, N – E)
                </text>
                <circle cx="345" cy="138" r="4" fill="#EF4444" />
                <circle cx="400" cy="138" r="4" fill="#3B82F6" />
                <circle cx="455" cy="138" r="4" fill="#22C55E" />

                {/* Probes from indicator below */}
                <line x1="345" y1="142" x2="380" y2="200" stroke="#EF4444" strokeWidth="2" />
                <line x1="455" y1="142" x2="420" y2="200" stroke="#22C55E" strokeWidth="2" />

                {/* Indicator body */}
                <rect
                  x="340"
                  y="200"
                  width="120"
                  height="80"
                  rx="10"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="400"
                  y="222"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  TWO-POLE INDICATOR
                </text>
                <text x="400" y="236" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                  on isolated conductors
                </text>
                {/* Display — 0 V */}
                <rect
                  x="360"
                  y="246"
                  width="80"
                  height="26"
                  rx="3"
                  fill="rgba(0,0,0,0.55)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                />
                <text
                  x="400"
                  y="265"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="14"
                  fontWeight="900"
                  fontFamily="monospace"
                >
                  0 V
                </text>

                <text
                  x="400"
                  y="304"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  No voltage on conductors
                </text>
              </g>

              {/* Arrow 2 → 3 */}
              <path
                d="M510,180 L540,180"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
              />

              {/* Step 3 — Prove (after) */}
              <g>
                <rect
                  x="540"
                  y="40"
                  width="240"
                  height="280"
                  rx="12"
                  fill="rgba(34,197,94,0.08)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="660"
                  y="64"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STEP 3 — PROVE (after)
                </text>

                {/* Same proving unit */}
                <rect
                  x="580"
                  y="84"
                  width="160"
                  height="60"
                  rx="6"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text
                  x="660"
                  y="105"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="10"
                  fontWeight="bold"
                >
                  PROVING UNIT (same)
                </text>
                <text x="660" y="122" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  (known 230 V source)
                </text>
                <circle cx="620" cy="138" r="4" fill="#FBBF24" />
                <circle cx="700" cy="138" r="4" fill="#FBBF24" />

                <line x1="620" y1="142" x2="640" y2="200" stroke="#EF4444" strokeWidth="2" />
                <line x1="700" y1="142" x2="680" y2="200" stroke="#22C55E" strokeWidth="2" />

                <rect
                  x="600"
                  y="200"
                  width="120"
                  height="80"
                  rx="10"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="660"
                  y="222"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  TWO-POLE INDICATOR
                </text>
                <text x="660" y="236" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                  same instrument
                </text>
                <rect
                  x="620"
                  y="246"
                  width="80"
                  height="26"
                  rx="3"
                  fill="rgba(0,0,0,0.55)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text
                  x="660"
                  y="265"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="14"
                  fontWeight="900"
                  fontFamily="monospace"
                >
                  230 V
                </text>

                <text
                  x="660"
                  y="304"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Indicator still works ✓
                </text>
              </g>

              {/* Caption strip */}
              <rect
                x="20"
                y="328"
                width="760"
                height="22"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="400"
                y="343"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Both proves succeed → the 0 V test reading is real → conductors are proved dead.
              </text>
            </svg>
          </div>

          <ConceptBlock
            title="What counts as a known voltage source"
            plainEnglish="The prove step needs a source the indicator is being tested against — something that, by independent prior knowledge, you know is at the right voltage. Three options qualify; one common candidate does not."
          >
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Dedicated proving unit:</strong> a battery-powered device that generates a
                known voltage on demand (typical: switchable 50 V / 230 V / 400 V outputs).
                Industry-standard option, and the only one that does not require any live work to
                use. Examples: Martindale VI-15700, Megger PT 100. Battery condition matters — a
                flat proving unit fails the prove silently in the wrong direction (it reads zero,
                you assume a successful test, you accept a broken indicator).
              </li>
              <li>
                <strong>Known-live socket:</strong> any socket on a circuit that is known,
                independently and at the moment of the test, to be live. The socket must belong to a
                circuit that is not the one being tested for absence of voltage. A 13 A
                socket-outlet on a different ring is the typical option. Risk-assess briefly — you
                are doing a deliberate live test on the indicator, with exposed terminals.
              </li>
              <li>
                <strong>Known-live conductor at the supply side:</strong> in a board where the
                incoming side is live and the outgoing circuit is isolated, the incoming terminals
                can be used as the known source. Higher-risk live work; document it in the
                day&rsquo;s risk-assessment.
              </li>
              <li>
                <strong>NOT a non-contact voltage tester.</strong> A non-contact tester is a
                detector — it senses the presence of an electric field. It does not generate a known
                voltage and is not a source. Using one as a proving unit is one of the most common
                and most dangerous safe-isolation failures (see Common Mistake below).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Using a non-contact voltage tester as a proving unit"
            whatHappens="Operative holds a two-pole indicator&rsquo;s probes against the tip of a non-contact voltage tester (or vice versa). The non-contact tester is on, the LED glows, the operative concludes the indicator is working. They go to the conductors, get a 0 V reading, start work. In reality the non-contact tester is not generating a voltage on the indicator&rsquo;s probes — it is sensing a field around the operative&rsquo;s body and lighting itself up. The indicator was given no signal to display, so &lsquo;0 V’ from the indicator is meaningless. If the conductors are actually live, the operative is now stripping a live cable."
            doInstead="Use a dedicated proving unit, a known-live socket, or a known-live conductor under documented live-test conditions. Test the indicator&rsquo;s probes against an actual voltage source, not against another detector. The simplest rule on site: if the prove source does not have two electrically distinct terminals at a known potential difference, it is not a prove source."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The instrument — GS38, BS EN 61243-3, and CAT ratings</ContentEyebrow>

          <ConceptBlock
            title="Two-pole voltage indicator to BS EN 61243-3"
            plainEnglish="The indicator itself is a specific type of instrument: two probes, internal load, no user-selectable function switch, designed for one job. BS EN 61243-3 is the product standard. A multimeter is not a voltage indicator — multimeters have user-selectable ranges and, depending on the range selected, can display garbage that looks like a voltage reading. The dedicated indicator removes that risk by removing the function switch."
            onSite="OSG 10.1 names BS EN 61243-3 explicitly. If your indicator does not declare BS EN 61243-3 compliance on the label, it is not the right tool for prove-dead. Multifunction testers (BS EN 61010 / BS EN 61557) are valid for measurement work but the dedicated two-pole detector is what GS38 and OSG nominate for safe-isolation."
          >
            <p>Required features per GS38:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Insulated leads</strong> rated for the system voltage and overvoltage
                category at the test point.
              </li>
              <li>
                <strong>Probes with finger guards</strong> and exposed metal tip length not
                exceeding 4 mm. Older instruments with longer tips are non-compliant; tape the tips
                down to 4 mm or replace.
              </li>
              <li>
                <strong>Probe insulation</strong> intact, no cracks, no exposed conductor.
              </li>
              <li>
                <strong>Internal load (current-limited):</strong> the indicator draws a small test
                current, which discriminates between real voltage and capacitively coupled or
                induced voltage. Pure-voltmeter-input devices can be fooled by stray voltage; a
                loaded indicator is harder to fool.
              </li>
              <li>
                <strong>Internal fuse</strong> for fault-current protection on the probes. Check
                fuse condition as part of the OSG 12.5 inspection step.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CAT III vs CAT IV — picking the right rating for the test point"
            plainEnglish="CAT (overvoltage category) is the indicator&rsquo;s rating for the level of switchgear it is being applied to. The closer you are to the origin of supply, the higher the prospective transient overvoltage and the higher the CAT rating you need. GN3 Ch 1 defines the categories explicitly."
          >
            <p>Definitions, drawn from GN3 Ch 1:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>CAT II</strong> — equipment supplied from the fixed installation
                (appliances, plug-in tools). Not appropriate for fixed-installation testing.
              </li>
              <li>
                <strong>CAT III</strong> — fixed installation downstream of the consumer unit /
                primary distribution board. Final-circuit testing, distribution-circuit testing,
                equipment terminals downstream of an isolator.
              </li>
              <li>
                <strong>CAT IV</strong> — origin of the supply, between the building entrance and
                the primary distribution board. Cut-out, meter, meter tails, the consumer unit
                incoming side. CAT IV is defined as &lsquo;CAT III plus equipment installed at or
                near the origin&rsquo;.
              </li>
            </ul>
            <p>
              Voltage rating: rated for the line-to-earth voltage of the system. UK single-phase 230
              V → indicator rated &ge;300 V. UK three-phase 400 V → indicator rated &ge;600 V.
            </p>
            <p>
              GN3 also notes a critical point about the test set-up as a whole: &ldquo;the
              equivalent overvoltage category for a test arrangement is the lowest overvoltage
              category of any equipment, including test instruments, leads, probes, connectors, and
              similar, connected in the test arrangement.&rdquo; A CAT IV indicator with CAT II
              probes is a CAT II test set-up. The probes, leads, and any adapter all have to match.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Chapter 1 · CAT IV definition"
            clause={
              <>
                CAT IV is defined as CAT III plus equipment installed at or near the origin of the
                electricity supply to a building, between the building entrance and the primary
                distribution board (consumer unit). CAT IV may include electricity meters and
                primary overcurrent protective devices.
              </>
            }
            meaning="Origin-of-supply work — cut-out, meter, meter tails, incoming side of the consumer unit — needs CAT IV instruments and CAT IV leads. Final-circuit and distribution-circuit work needs CAT III. Mismatching the CAT rating to the location is the kind of mistake that does not register day-to-day and matters a great deal during a transient overvoltage event."
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
            All-pole testing — every conductor pair, at the point of work
          </ContentEyebrow>

          <ConceptBlock
            title="Single-phase: three readings, none optional"
            plainEnglish="A single-phase circuit has three conductors that can carry voltage relative to each other: L, N, E. Three readings cover every pairing: L–E, L–N, N–E. Skipping any one of them leaves a hole — most importantly, skipping N–E hides borrowed-neutral situations where a different circuit’s current is being returned through this neutral."
          >
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>L–E:</strong> proves the line conductor is dead with respect to earth. The
                first reading most operatives think of, but on its own only confirms line-to-earth,
                not anything else.
              </li>
              <li>
                <strong>L–N:</strong> proves no voltage between line and neutral. Catches situations
                where both conductors are at the same non-zero potential relative to earth (which an
                L–E test would miss if the indicator measures line-to-line through capacitive
                coupling and reads partial).
              </li>
              <li>
                <strong>N–E:</strong> proves the neutral is at earth potential. Catches
                borrowed-neutral situations where another circuit shares this neutral and is still
                energised, leaving voltage on what looks like a dead neutral.
              </li>
            </ul>
            <p>
              Reg 537.3.3 (TT/IT) explicitly requires disconnection of all live conductors, which on
              a TT supply specifically means line + neutral. The three-reading set reflects that
              requirement at the test stage — if N is genuinely dead with respect to E and to L, the
              isolation has done what Reg 537.3.3 demands.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase: ten readings"
            plainEnglish="On a three-phase system (L1, L2, L3, N, E), the conductor pairings are: L1–L2, L1–L3, L2–L3 (3 phase-to-phase) + L1–N, L2–N, L3–N (3 phase-to-neutral) + L1–E, L2–E, L3–E (3 phase-to-earth) + N–E (1 neutral-to-earth) = 10 readings."
            onSite="Use a systematic order so you cannot lose your place: L1 to everything, then L2 to everything not already done, then L3, then N. Tick each reading on a clipboard or on the day&rsquo;s test sheet. The point of method is that an interruption — a phone call, a query from the apprentice, a dropped probe — leaves you a clear record of where you are."
          >
            <p>
              For a three-phase TT system: every reading matters, because the neutral is not earthed
              at the building. For a three-phase TN-S / TN-C-S system, the neutral is tied to earth
              at the substation, so N–E is normally near zero by design — but the reading still has
              to be taken, both as a sanity check and because a broken PEN / PEN-like fault on
              TN-C-S can leave the neutral floating with respect to earth at potentially dangerous
              voltages.
            </p>
          </ConceptBlock>

          <Scenario
            title="Borrowed neutral on a domestic upstairs lighting circuit"
            situation="You isolate the upstairs lighting MCB at the consumer unit, lock off, prove the indicator on a downstairs socket (known live), test at the ceiling rose: L–E reads 0 V, L–N reads 0 V. You skip N–E because &lsquo;the line is dead and that&rsquo;s the one that matters’. You strip the neutral conductor and your forefinger touches the bare strands; you get a sharp 60 V belt that throws you off the ladder."
            whatToDo="Re-prove dead with the full three-reading set. The N–E test would have read ~60 V — which is the smoking gun for a borrowed neutral. Investigation: the upstairs and downstairs lighting share the same neutral somewhere in the loft (a not-uncommon legacy fault on older two-way switching installs). The downstairs lighting was still live, returning current through the shared neutral, lifting the &lsquo;dead’ neutral above earth potential. Resolution: isolate both circuits at the consumer unit, re-prove with all three readings on each, identify and rectify the shared-neutral fault before re-energisation."
            whyItMatters="Borrowed neutrals are not exotic. They are common enough on older domestic rewires that the all-pole test set exists specifically to catch them. The 60 V you avoided by doing the N–E test is the entire reason the test exists. Skipping it because the line is dead is precisely the mistake the procedure was designed to prevent."
          />

          <ConceptBlock
            title="Test at the point of work, not just at the isolation point"
            plainEnglish="Where you test matters as much as how. Testing at the consumer unit confirms the consumer unit is dead. Testing at the ceiling rose where you are about to strip cable confirms the ceiling rose is dead. They are not the same fact — a downstream backfeed from a UPS, an emergency-light battery pack, a PV inverter, or a mis-identified isolation can leave your work area live while the consumer unit reads zero."
            onSite="OSG 12.5: prove dead at the point of work. If the work point is not accessible (cable midway through a wall), prove dead at the nearest accessible point and walk the route mentally for any other source that could feed downstream of that point."
          >
            <p>Order of preference, drawn from OSG and HSG85:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>At the point of work itself</strong> — the conductors you are about to
                touch.
              </li>
              <li>
                <strong>At the nearest accessible point</strong> when (1) is not physically
                possible, and you have walked the route to confirm no alternative supply can feed in
                between.
              </li>
              <li>
                <strong>At the isolation point only</strong> as a last resort, with explicit
                acknowledgement in the day&rsquo;s risk-assessment that you have verified there are
                no downstream sources (UPS, emergency lights, PV, generator, transfer switch) that
                could re-feed the work area.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Trusting the consumer-unit test for a job at a fitting in another room"
            whatHappens="Spark proves dead at the consumer unit incoming side, locks off, walks to a downstairs FCU to swap a faulty fan. The downstairs lighting on the same MCB has an interlinked emergency-light unit with a 3 V trickle from a battery pack inside the fitting. At the FCU itself, the spark gets a small unexpected reading, dismisses it as &lsquo;background’, strips the conductor, gets a stinging belt as the battery discharges into them through the FCU."
            doInstead="Prove dead at the point of work, every time. The CU test confirms one thing; the test at the FCU confirms a different thing. Both are needed; neither replaces the other. The general principle: every backfeed source is a separate isolation requirement. UPS, PV, generator, emergency-light battery, capacitive PFC banks — any of them can bring the dead end of your work alive."
          />

          <CommonMistake
            title="Treating an unexpected low-voltage reading as &lsquo;safe&rsquo;"
            whatHappens="Indicator reads 28 V AC L–E on a circuit that should be dead. The operative reasons that 28 V is below the 50 V SELV upper bound and shock-risk is therefore low, and proceeds with work. The 28 V was actually the partially-collapsed remains of an induced voltage from a parallel cable run, which was about to be re-energised by an unrelated breaker resetting; within five seconds the reading would have climbed back to 230 V."
            doInstead="Any unexpected non-zero reading is a stop. 28 V might be induced (will collapse under load), or capacitive (will collapse under load), or a borrowed neutral (won&rsquo;t collapse), or a real backfeed in transition (will rise). You cannot tell from the reading alone which it is. Investigate the source. Document the finding. Either eliminate it or accept it through a documented assessment that names the source and explains why it is not a hazard for this work."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Documentation — what goes on the test sheet</ContentEyebrow>

          <ConceptBlock
            title="Minimum dataset for the day&rsquo;s risk-assessment / certificate"
            plainEnglish="Proving-dead is not a separate certificate, but it leaves a paper trail in the day&rsquo;s risk-assessment, the schedule of test results, and (where applicable) the permit-to-work. The minimum information lets a future inspector or investigator reconstruct what was done."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Date and time</strong> of the prove-test-prove sequence.
              </li>
              <li>
                <strong>Location</strong> — board / circuit reference and the point of work
                description.
              </li>
              <li>
                <strong>Indicator details</strong> — make, model, serial number, declared
                BS&nbsp;EN&nbsp;61243-3 compliance, last calibration / function-check date.
              </li>
              <li>
                <strong>Known voltage source used</strong> — proving unit (make/model) or known-live
                socket (location and circuit ID).
              </li>
              <li>
                <strong>Prove (before) result</strong> — voltage displayed.
              </li>
              <li>
                <strong>Test results</strong> — the three (single-phase) or ten (three-phase)
                pairings with their readings.
              </li>
              <li>
                <strong>Prove (after) result</strong> — voltage displayed.
              </li>
              <li>
                <strong>Operative</strong> — printed name, signature.
              </li>
              <li>
                <strong>Photo evidence</strong> (good practice, not required) — timestamped photo of
                the indicator on the proving unit and of the indicator at the work point displaying
                0 V.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How proving-dead connects to the rest of the work</ContentEyebrow>

          <ConceptBlock
            title="Proving-dead in the wider Isolate → Lock → Tag → Try → Prove sequence"
            plainEnglish="Proving-dead is the final gate before work begins. Isolation removes the supply, lock-off prevents re-energisation, the tag carries the information, the &lsquo;try’ step confirms the isolation broke the circuit — and prove-dead, with the indicator, confirms there is genuinely no voltage on the conductors you are about to touch."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Isolate</strong> at every supply (Reg 462.1, 537.2.1.1, 537.3.3 for TT/IT).
              </li>
              <li>
                <strong>Lock off</strong> with the appropriate device (Reg 462.3, 537.2.4, 537.2.5 —
                covered in Section 2.3).
              </li>
              <li>
                <strong>Tag</strong> with name, date/time, reason, contact, RA reference.
              </li>
              <li>
                <strong>Try</strong> to operate the equipment downstream — confirms isolation.
              </li>
              <li>
                <strong>Prove dead</strong> at the point of work using prove-test-prove with a
                BS&nbsp;EN&nbsp;61243-3 indicator and a recognised known voltage source. All-pole
                testing. CAT rating matched to the test location.
              </li>
              <li>
                <strong>Begin work.</strong> The right to start work is granted by the successful
                prove-dead, not by the lock-off. If the prove-dead is wrong, the lock-off was
                protecting the wrong thing.
              </li>
            </ol>
            <p>
              The next section (2.5 Working on isolated systems) covers what to do once prove-dead
              is complete: re-prove after any break in work, control of the work area, hand-over
              between operatives, and the closing sequence at the end of the job that re-energises
              safely.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Prove-test-prove: prove on a known source, test at the point of work, prove on the same known source. Both proves must succeed for the test to be trusted.',
              'A non-contact voltage tester is a detector, not a source. It is not a proving device. Use a dedicated proving unit or a known-live socket / conductor.',
              'Two-pole voltage indicator to BS EN 61243-3, GS38-compliant probes, finger guards, exposed tip ≤ 4 mm, internal load, intact insulation.',
              'CAT III for downstream of the consumer unit. CAT IV for cut-out, meter, meter tails, incoming consumer-unit terminals. The lowest CAT in the test set-up is the rating of the whole test set-up.',
              'All-pole testing at the point of work. Single-phase: L–E, L–N, N–E (3 readings). Three-phase: 10 readings covering every pairing.',
              'N–E test catches borrowed-neutral situations. Skipping it because &lsquo;the line is dead’ is the canonical safe-isolation failure.',
              'Test at the point of work, not at the isolation point. UPS, PV, emergency-light batteries, generators, capacitive PFC — any can backfeed a dead-from-the-board work area.',
              'Any unexpected reading is a stop, not a discount. Investigate the source. Document the resolution.',
              'OSG Appendix M points to HSE HSG85 and Electrical Safety First BPG2. BS 7671 sets the duty (Reg 641.4, 537.3.3); HSG85 + BPG2 set the steps.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I use a multimeter instead of a dedicated two-pole voltage indicator?',
                answer:
                  'Not for safe-isolation prove-dead. OSG 10.1 names BS EN 61243-3 as the standard for two-pole voltage detectors used for this duty, and BS EN 61010 / 61557 for instruments more generally. The dedicated two-pole indicator has fewer modes (no user-selectable function switch), an internal load that discriminates real voltage from induced/capacitive coupling, and a deliberately limited interface that reduces operator-error opportunities. A multimeter on the wrong range can read &lsquo;0’ in a way that looks like a successful test but means nothing.',
              },
              {
                question:
                  'My indicator does not have a calibration certificate — is that a problem?',
                answer:
                  'BS EN 61243-3 indicators are typically self-checking by design (the prove step against a known source IS the calibration check) and most manufacturers do not require periodic factory calibration. What matters is the GS38-compliant function check before each use: visual inspection (OSG 12.5), prove on a known source, prove again after the test. If the manufacturer does specify a periodic check or calibration, follow it; in either case keep a record of when the function check is done and by whom.',
              },
              {
                question:
                  'Is it acceptable to use the circuit I’m about to test as the proving source if I do the prove first while it’s still live?',
                answer:
                  'No, and the failure mode is subtle. If the proving source IS the circuit, then a single failure of the isolation step (locked-off but didn’t actually disconnect) will give: prove succeeds (because it’s still live), test reads voltage (correctly identifies the failure). That sounds OK — but flip it: a circuit that was never properly isolated and is partially fed from a borrowed neutral might give a confusing reading on the prove and an ambiguous reading on the test. Use a circuit different from the one being tested as the prove source. Cleanest practice: a dedicated proving unit, every time.',
              },
              {
                question:
                  'How do I prove dead at a point of work that is buried in a wall — e.g. a damaged buried cable I’m about to repair?',
                answer:
                  'The principle is &lsquo;closest accessible point’. Open the nearest accessory (socket, junction box, FCU) downstream of the buried run and prove dead at those terminals. Walk the route mentally between that point and the buried cable: any potential alternative source (a different lighting circuit feeding the same area, a borrowed neutral, an emergency-light unit) needs to be considered. Document the test point and the rationale in the day’s risk-assessment. After exposing the buried cable, prove dead again at the cable itself before any cut.',
              },
              {
                question:
                  'What CAT rating do I need for testing on the meter tails on the supply side of the consumer unit?',
                answer:
                  'CAT IV. GN3 Ch 1 places equipment between the building entrance and the primary distribution / consumer unit explicitly in CAT IV — it includes electricity meters and primary overcurrent protective devices. The indicator must be CAT IV rated, and the leads / probes must also be CAT IV (the test set-up rating is the lowest CAT of any item in the chain). A CAT III instrument on meter tails is an instrument out of its rated category for the location.',
              },
              {
                question:
                  'I dropped my indicator on a hard floor between the prove and the test. Do I have to re-do the sequence?',
                answer:
                  'Yes, and OSG 12.5 supports this: inspect the indicator for damage and re-prove. A dropped instrument may have a cracked probe, a fractured internal solder joint, a dislodged battery contact, or a damaged display. Inspect visibly first; if anything looks wrong, take it out of service. If it passes inspection, run a fresh prove-test-prove cycle. The cost of a 30-second restart is nothing compared with the cost of a damaged indicator that reads zero on a live conductor.',
              },
              {
                question:
                  'Do I need to re-prove dead after lunch if my lock has been on the whole time?',
                answer:
                  'Yes, as a matter of best practice. The lock-off gives high confidence the circuit was not re-energised — but &lsquo;high confidence’ is not the same as &lsquo;directly verified’. Anything could have happened in your absence: a miscommunication leading someone to add a feed from another source, a backup transfer that operated automatically, an emergency-light battery cutting in. Re-prove dead at the point of work using the full prove-test-prove sequence. Treat each return to the work as a fresh entry, not a continuation.',
              },
              {
                question:
                  'I’m working on a TN-C-S installation. The N–E reading should be near zero by design, so do I really need to take it?',
                answer:
                  'Yes. The reading is normally near zero on TN-C-S — but a broken PEN conductor (the rare-but-real failure on TN-C-S systems) leaves the installation’s neutral floating with respect to true earth, potentially at hundreds of volts. The N–E reading is one of the few site-level checks that catches this before someone touches a metal-clad enclosure. The fact that it is normally zero is exactly why the test exists: a non-zero N–E on TN-C-S is a five-alarm event, not a routine variance.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Proving dead techniques — Module 2.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-2')}
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
                navigate('/electrician/upskilling/inspection-testing/module-2/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Working on isolated systems
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

export default InspectionTestingModule2Section4;
