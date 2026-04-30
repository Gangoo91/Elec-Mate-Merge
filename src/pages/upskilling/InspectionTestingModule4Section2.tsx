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
    id: 'mod4-s2-pick-voltage',
    question:
      'You are testing a 400 V three-phase distribution circuit feeding a sub-board. What test voltage does Table 64 require?',
    options: ['250 V DC', '500 V DC', '1000 V DC', '400 V DC'],
    correctIndex: 1,
    explanation:
      '400 V three-phase sits in the "up to and including 500 V (other than SELV/PELV)" row of Table 64. Test voltage is 500 V DC, minimum acceptance 1.0 MΩ. The 1000 V row applies only above 500 V — typically HV-side LV measurements, generation feeders, and certain motor circuits.',
  },
  {
    id: 'mod4-s2-pelv-vs-felv',
    question:
      'A FELV (functional extra-low voltage) circuit operates at 24 V from a non-isolating source. Which row of Table 64 applies?',
    options: [
      'SELV/PELV row — 250 V DC, 0.5 MΩ',
      'FELV is tested at the same test voltage as the primary side of the source and must meet all the test requirements for low-voltage circuits — typically 500 V DC, 1.0 MΩ',
      'No insulation test is required',
      '1000 V DC, 1.0 MΩ',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.3.2 closing wording is explicit: FELV circuits shall be tested at the same test voltage as that applied to the primary side of the source and shall meet all the test requirements for LV circuits. FELV is NOT the SELV/PELV row — the lack of safe isolation from the primary is what bumps it up.',
  },
  {
    id: 'mod4-s2-geometry',
    question:
      'On a single-phase final circuit, which conductor pairs does the IR test interrogate as a default?',
    options: [
      'Only L to E',
      'L to N, L to E and N to E (or L+N linked to E if equipment cannot tolerate L–N separation)',
      'Only between live conductors',
      'L to N only — earth tests are covered by continuity',
    ],
    correctIndex: 1,
    explanation:
      'IR is tested between every pair of conductors that should be electrically isolated. On a single-phase circuit that is L–N (between lives), L–E and N–E. Where equipment connection makes L–N separation impractical, the linked-lives variant (L+N together vs E) is the recognised alternative — record the variant used in the schedule comments.',
  },
  {
    id: 'mod4-s2-250v-step',
    question:
      'After the cable-alone Table 64 test passes at 500 V DC, equipment is reconnected. A4:2026 Reg 643.3.3 then requires what?',
    options: [
      'Repeat the 500 V DC test with equipment connected',
      '250 V DC test between live conductors and the protective conductor connected to the earthing arrangement, minimum 1 MΩ',
      'No further test',
      'AC hipot test at 1.5 × nominal',
    ],
    correctIndex: 1,
    explanation:
      'The A4 redraft codifies the post-connection 250 V DC step. It is between live conductors and the protective conductor connected to the earthing arrangement, with a 1 MΩ minimum. Manufacturer instructions may still require certain devices (notably SPDs) to be disconnected even at 250 V DC.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 230 V single-phase final circuit. Per Reg 643.3.2 and Table 64, what test voltage and minimum acceptance value apply?',
    options: [
      '250 V DC, minimum 0.5 MΩ',
      '500 V DC, minimum 1.0 MΩ',
      '1000 V DC, minimum 1.0 MΩ',
      '500 V AC, minimum 1.0 MΩ',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64 splits by circuit nominal voltage. 230 V sits in the "up to and including 500 V" band, so the test voltage is 500 V DC and the minimum insulation resistance is 1.0 MΩ. AC is never the answer — Reg 643.3.2 mandates DC.',
  },
  {
    id: 2,
    question:
      'A SELV lighting circuit operates at 24 V DC. Which row of Table 64 governs and what is the minimum acceptance?',
    options: [
      'Up to 500 V row — 500 V DC test, 1.0 MΩ minimum',
      'SELV/PELV row — 250 V DC test, 0.5 MΩ minimum',
      'No insulation test required for SELV',
      '250 V DC test, 1.0 MΩ minimum',
    ],
    correctAnswer: 1,
    explanation:
      'SELV/PELV gets its own row in Table 64: 250 V DC test, 0.5 MΩ minimum. The lower test voltage exists so a 500 V DC stress is not applied across components rated only for the SELV nominal voltage. The 0.5 MΩ minimum reflects the smaller voltage stress, not relaxed safety.',
  },
  {
    id: 3,
    question:
      'Reg 643.3.3 was redrafted in A4:2026. What two-step sequence does it now spell out where connected equipment is likely to influence the test or be damaged?',
    options: [
      'Test at 500 V with equipment connected, then again at 250 V if the first reading fails',
      'Test at the Table 64 voltage with the equipment disconnected, then after re-connecting the equipment apply a 250 V DC test between live conductors and the protective conductor with a minimum of 1 MΩ',
      'Test at 250 V first, then at 500 V if the equipment is undamaged',
      'Skip the Table 64 test if equipment cannot be safely disconnected',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 sets up two distinct tests. Step one: with the influencing / damageable equipment disconnected, do the full Table 64 test. Step two: re-connect the equipment, then apply a 250 V DC test between live conductors and the CPC and verify ≥ 1 MΩ. Both readings get recorded — the redraft removed the old "use judgement" wording.',
  },
  {
    id: 4,
    question: 'Why does Table 64 specify DC test voltages rather than AC?',
    options: [
      'DC is cheaper to generate in a portable instrument',
      'AC test voltages would charge cable capacitance, the meter would read a falling resistance over the test duration, and the dielectric would be stressed at the peak (not the RMS) value of the AC waveform — making readings inconsistent and over-stressful',
      'AC is reserved for HV equipment',
      'BS 7671 follows IEC 60364, which prefers DC for legacy reasons only',
    ],
    correctAnswer: 1,
    explanation:
      'A DC stress is steady. Cable capacitance charges to a stable voltage, conduction current settles, the reading stabilises. AC continuously charges and discharges the cable capacitance — the apparent "resistance" reading would mix capacitive impedance with the genuine leakage path, and the dielectric sees the peak voltage (≈1.41× RMS), not the nominal. DC removes both confounders.',
  },
  {
    id: 5,
    question:
      'A 400 V three-phase distribution circuit feeds a sub-board. What test voltage does Table 64 require, and across which conductor combinations is the test applied?',
    options: [
      '1000 V DC, between each line and earth only',
      '500 V DC, between live conductors (L-L, L-N) and between live conductors and the protective conductor',
      '250 V DC, between live conductors only',
      '500 V AC, line-to-line only',
    ],
    correctAnswer: 1,
    explanation:
      '400 V is "up to and including 500 V" — Table 64 row two: 500 V DC. Reg 643.3.1 sets the geometry: between (a) live conductors and (b) live conductors and the protective conductor connected to the earthing arrangement. Lines may be linked together for the L–E test. Earth-only is not the regulation — both legs of 643.3.1 must be tested.',
  },
  {
    id: 6,
    question: 'What does Reg 643.3.1(a) explicitly permit during the live-to-earth measurement?',
    options: [
      'Linking line and neutral conductors together so a single L+N to E reading covers both',
      'Skipping the neutral entirely',
      'Using a 250 V test in place of the Table 64 voltage',
      'Connecting current-using equipment to speed the test up',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.3.1 says: "During this measurement, line and neutral conductors may be connected together." Practically this is the test you almost always do on a final circuit — link L and N at the board, test against E, one reading. It is permitted but not mandatory; the L-L and L-N legs of 643.3.1(a) still have to be covered separately.',
  },
  {
    id: 7,
    question:
      'A test on a 230 V circuit at 500 V DC reads 2.3 MΩ. The same circuit re-tested with the immersion heater re-connected reads 0.8 MΩ. What does Reg 643.3.3 require you to do?',
    options: [
      'Record 2.3 MΩ as the only acceptance value — the second reading is irrelevant',
      'Record both: the 2.3 MΩ first-test value (Table 64 acceptance, ≥ 1 MΩ — pass) and the 0.8 MΩ post-connection reading. The post-connection reading fails the 1 MΩ floor for the 250 V re-test, so investigate the immersion element',
      'Record 0.8 MΩ as a fail outright and condemn the circuit',
      'Average the two readings',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 makes two readings the norm where equipment was disconnected. The pre-connection reading is judged against Table 64 (1 MΩ for 230 V at 500 V DC). The post-connection reading is judged against the explicit 1 MΩ minimum for the 250 V DC re-test. Here the post-connection 0.8 MΩ fails the 250 V test floor — that flags the appliance, not the circuit wiring.',
  },
  {
    id: 8,
    question: 'Why does Reg 643.3.3 set the post-connection test at 250 V DC rather than 500 V DC?',
    options: [
      '250 V is below the working voltage of 230 V circuits, so no equipment is stressed',
      "It's an instrument limitation",
      '250 V DC is below the withstand voltage of typical electronic loads, MOV-based SPDs, dimmer thyristor packs, smoke alarm electronics, and similar devices that would otherwise be punctured by a 500 V DC stress, while still being well above the working AC peak of a 230 V circuit (≈325 V) so a real insulation defect still shows',
      '250 V is the standard test voltage in the rest of Europe and BS 7671 is harmonising',
    ],
    correctAnswer: 2,
    explanation:
      'The 250 V re-test is a deliberate compromise: low enough that connected electronic equipment (SPDs, dimmer thyristor stacks, smoke alarms, RCBOs with electronic boards) is not destroyed by the test stress, but still well above the 230 V RMS working voltage of the circuit (peak ≈ 325 V) so a genuine insulation defect develops a measurable leakage path.',
  },
  {
    id: 9,
    question:
      'On a circuit above 500 V (say a 690 V industrial supply), Table 64 specifies which test voltage and minimum acceptance?',
    options: ['500 V DC, 1.0 MΩ', '1000 V DC, 1.0 MΩ', '1000 V DC, 5.0 MΩ', '2000 V DC, 1.0 MΩ'],
    correctAnswer: 1,
    explanation:
      'The third Table 64 row covers circuits above 500 V: test voltage 1000 V DC, minimum insulation resistance 1.0 MΩ. The minimum is the same 1.0 MΩ as the LV row — the difference is the test stress, scaled to the higher working voltage so the dielectric is properly probed.',
  },
  {
    id: 10,
    question:
      'You have a 230 V circuit with an SPD installed at the consumer unit. What sequence does Reg 643.3.3 (A4:2026 redraft) tell you to apply?',
    options: [
      'Test at 500 V DC with the SPD in circuit — modern SPDs are rated for it',
      'Skip the IR test on this circuit',
      'Disconnect the SPD, perform the 500 V DC test against Table 64, re-connect the SPD, then apply the 250 V DC test (≥ 1 MΩ) between live conductors and the protective conductor. Record both results, and note the SPD disconnection in the comments column',
      'Test only at 250 V DC throughout',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.3.3 was specifically redrafted to address this. SPDs (and dimmers, smoke alarms, electronics with built-in MOVs, and so on) are "likely to influence the measurement … or be damaged". The procedure is: disconnect for the Table 64 test, re-connect for the 250 V re-test, record both, comment the disconnection. Testing at 500 V DC across an SPD will conduct the test current through the MOV, give a low / failing reading, and may permanently damage the device.',
  },
];

const InspectionTestingModule4Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Test voltages and applications | I&T Module 4.2 | Elec-Mate',
    description:
      'Reg 643.3 + Table 64 + the A4:2026 redraft of 643.3.3: which test voltage applies to which circuit, the SELV/LV/HV split, the 250 V re-test floor for sensitive equipment, and why DC is the only choice.',
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
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2"
            title="Test voltages and applications"
            description="Reg 643.3, Table 64 and the A4:2026 redraft of 643.3.3. Which DC voltage applies to which circuit, the minimum acceptance values, and the 250 V re-test that protects connected equipment."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.3.2 + Table 64 split by circuit nominal voltage. SELV/PELV → 250 V DC, minimum 0.5 MΩ. Up to and including 500 V (excl. SELV/PELV) → 500 V DC, minimum 1.0 MΩ. Above 500 V → 1000 V DC, minimum 1.0 MΩ.',
              'Reg 643.3.1 sets the geometry: between live conductors, and between live conductors and the protective conductor connected to the earthing arrangement. Line and neutral may be linked together during the L–E measurement.',
              'Reg 643.3.3 was redrafted in A4:2026. Where connected equipment is likely to influence the test or be damaged, do the Table 64 test with the equipment disconnected first. Then re-connect, apply a 250 V DC test between live conductors and the CPC, and verify ≥ 1 MΩ.',
              'DC is mandatory. AC would charge cable capacitance throughout the test, mix capacitive impedance into the reading, and stress the dielectric at the peak of the waveform (≈1.41× RMS) rather than the nominal — readings would be inconsistent and the test itself over-stressful.',
              'Test current through an SPD or MOV-based device at 500 V DC will conduct through the device, produce a misleading low reading, and may permanently damage the SPD. Disconnect first, re-test at 250 V re-connected, record both.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Read Reg 643.3.2 + Table 64 and select the correct test voltage and minimum acceptance for any circuit by nominal voltage',
              'Apply Reg 643.3.1 — between live conductors, and between lives and the CPC — including the L-N linking permission',
              'Follow the A4:2026 redraft of Reg 643.3.3 — disconnect-test-reconnect-retest-record sequence — without ambiguity',
              'Justify why the test is DC, not AC, and why the 250 V re-test floor is set at 1 MΩ rather than 0.5 MΩ',
              'Identify which equipment is "likely to influence the measurement or be damaged" and disconnect the right things before applying a 500 V DC stress',
              'Record the dual reading (pre- and post-reconnection) on the Schedule of Test Results without losing the audit trail',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.3 — the redraft and what it changed"
            plainEnglish="Reg 643.3 in A4:2026 has been re-written to handle the reality that modern installations are full of electronics. The old regulation gave you a Table 64 voltage and left you to deal with damage risk by judgement. The redraft now spells out a two-test sequence: the Table 64 test with the influencing equipment disconnected, then a 250 V DC re-test with the equipment re-connected."
            onSite="Read Reg 643.3 as three regulations in sequence — 643.3.1 (what conductors), 643.3.2 + Table 64 (what voltage and minimum), 643.3.3 (the disconnect-re-connect sequence for sensitive equipment). Skipping 643.3.3 used to be common; in A4:2026 it is explicit."
          >
            <p>
              The amendment summary attached to Reg 643.3 in BS&nbsp;7671:2018+A4:2026 is unusually
              direct: &ldquo;643.3 has been redrafted. The requirements for testing insulation
              resistance where equipment is likely to influence the verification test or be damaged
              has been clarified and reference is made to a 250&nbsp;V DC test following the
              connection of equipment.&rdquo; That sentence tells you the redraft has two purposes —
              clarify where to disconnect, and add a named follow-up test. Both are now in 643.3.3
              as concrete steps rather than implied good practice.
            </p>
            <p>
              The other A4 change in 643.3 is at the geometry level: the regulation makes plain that
              Table 64 applies whenever an insulation resistance verification is being done,
              including between non-earthed protective conductors and Earth. The structure is the
              same as previous editions — three rows, three voltages, three minimums — but the
              wording now removes any ambiguity about when the table is the correct authority.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.1"
            clause={
              <>
                The insulation resistance shall be measured between: (a) live conductors; and (b)
                live conductors and the protective conductor connected to the earthing arrangement.
                During this measurement, line and neutral conductors may be connected together.
              </>
            }
            meaning="Two test geometries, not one. The L-L (or L-N) leg verifies separation between live conductors. The L-E leg verifies separation between lives and the earthing arrangement. The permission to link L and N during the L-E test is a practical concession — one reading covers both lives against earth — but it does not remove the L-L / L-N requirement of (a)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.2 (Table 64)"
            clause={
              <>
                The insulation resistance measured with the test voltages indicated in Table 64
                shall be considered satisfactory if the main switchboard and each distribution
                circuit tested separately, with all its final circuits connected but with
                current-using equipment disconnected, has an insulation resistance not less than the
                appropriate value given in Table 64.
              </>
            }
            meaning="The boundary condition is &lsquo;final circuits connected but current-using equipment disconnected&rsquo;. That is the default test posture. Reg 643.3.3 then adds a layer for equipment that cannot simply be disconnected because it is wired in (smoke alarms, SPDs, dimmers, RCBOs with electronics)."
          />

          <ConceptBlock
            title="Table 64 — three rows, no ambiguity"
            plainEnglish="Table 64 is the entire decision. Find the row that matches the circuit nominal voltage. Apply the test voltage in the middle column. Read the minimum insulation resistance in the right-hand column."
            onSite="Tape a Table 64 reminder card to the inside of your meter case. Three rows, that is all."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Circuit nominal voltage</th>
                    <th className="text-center text-white/80 py-2">Test voltage (DC)</th>
                    <th className="text-center text-elec-yellow py-2">
                      Minimum insulation resistance
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">SELV and PELV</td>
                    <td className="text-center">250 V</td>
                    <td className="text-center text-elec-yellow">0.5 MΩ</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Up to and including 500 V (excl. SELV/PELV)</td>
                    <td className="text-center">500 V</td>
                    <td className="text-center text-elec-yellow">1.0 MΩ</td>
                  </tr>
                  <tr>
                    <td className="py-2">Above 500 V</td>
                    <td className="text-center">1000 V</td>
                    <td className="text-center text-elec-yellow">1.0 MΩ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The bands are deliberate. SELV/PELV operates at extra-low voltage so a 500 V DC test
              would over-stress the insulation that is only required to withstand the SELV nominal —
              hence the 250 V row and the relaxed 0.5 MΩ minimum. The middle row is where almost
              every domestic and commercial circuit lives: 230 V single-phase final circuits and 400
              V three-phase distribution both fall in &ldquo;up to and including 500 V&rdquo;. The
              third row is rare in domestic and commercial work but routine on industrial and
              utility-scale supplies.
            </p>
            <p>
              A note on the table itself: Table 64 also applies when verifying insulation resistance
              between non-earthed protective conductors and Earth. That covers the case where the
              installation is not directly earthed at the relevant point and the CPC is being tested
              against true Earth — the table values still set the acceptance.
            </p>
          </ConceptBlock>

          {/* Test voltage decision tree diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Test voltage selector — circuit nominal voltage to test stress to acceptance
            </h4>
            <svg
              viewBox="0 0 800 380"
              className="w-full h-auto"
              role="img"
              aria-label="Decision tree for selecting the correct insulation resistance test voltage and minimum acceptance value from Table 64. Inputs: circuit nominal voltage. Outputs: test DC voltage and minimum MΩ."
            >
              <rect
                x="320"
                y="20"
                width="160"
                height="50"
                rx="8"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="42"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Circuit nominal voltage?
              </text>
              <text x="400" y="58" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (Reg 643.3.2 · Table 64)
              </text>

              <line
                x1="380"
                y1="70"
                x2="140"
                y2="120"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <line
                x1="400"
                y1="70"
                x2="400"
                y2="120"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <line
                x1="420"
                y1="70"
                x2="660"
                y2="120"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />

              <rect
                x="40"
                y="120"
                width="200"
                height="46"
                rx="6"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="140"
                y="140"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                SELV / PELV
              </text>
              <text x="140" y="156" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                ≤ 50 V AC / 120 V DC
              </text>

              <rect
                x="300"
                y="120"
                width="200"
                height="46"
                rx="6"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="400"
                y="140"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Up to and including 500 V
              </text>
              <text x="400" y="156" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                (excl. SELV/PELV) — 230 V, 400 V
              </text>

              <rect
                x="560"
                y="120"
                width="200"
                height="46"
                rx="6"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="660"
                y="140"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Above 500 V
              </text>
              <text x="660" y="156" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                e.g. 690 V industrial
              </text>

              <line
                x1="140"
                y1="166"
                x2="140"
                y2="200"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <line
                x1="400"
                y1="166"
                x2="400"
                y2="200"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <line
                x1="660"
                y1="166"
                x2="660"
                y2="200"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />

              <rect
                x="60"
                y="200"
                width="160"
                height="44"
                rx="6"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text x="140" y="220" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Test voltage
              </text>
              <text
                x="140"
                y="236"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="13"
                fontWeight="bold"
              >
                250 V DC
              </text>

              <rect
                x="320"
                y="200"
                width="160"
                height="44"
                rx="6"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text x="400" y="220" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Test voltage
              </text>
              <text
                x="400"
                y="236"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                500 V DC
              </text>

              <rect
                x="580"
                y="200"
                width="160"
                height="44"
                rx="6"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text x="660" y="220" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Test voltage
              </text>
              <text
                x="660"
                y="236"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="13"
                fontWeight="bold"
              >
                1000 V DC
              </text>

              <line
                x1="140"
                y1="244"
                x2="140"
                y2="278"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <line
                x1="400"
                y1="244"
                x2="400"
                y2="278"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <line
                x1="660"
                y1="244"
                x2="660"
                y2="278"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />

              <rect
                x="60"
                y="278"
                width="160"
                height="44"
                rx="6"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.2"
              />
              <text x="140" y="298" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Minimum
              </text>
              <text
                x="140"
                y="314"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="13"
                fontWeight="bold"
              >
                ≥ 0.5 MΩ
              </text>

              <rect
                x="320"
                y="278"
                width="160"
                height="44"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.2"
              />
              <text x="400" y="298" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Minimum
              </text>
              <text
                x="400"
                y="314"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                ≥ 1.0 MΩ
              </text>

              <rect
                x="580"
                y="278"
                width="160"
                height="44"
                rx="6"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.2"
              />
              <text x="660" y="298" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Minimum
              </text>
              <text
                x="660"
                y="314"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="13"
                fontWeight="bold"
              >
                ≥ 1.0 MΩ
              </text>

              <rect
                x="40"
                y="340"
                width="720"
                height="32"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="360" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reg 643.3.3: where equipment may influence or be damaged → disconnect, test,
                re-connect, then 250 V DC re-test, ≥ 1 MΩ.
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

          <ContentEyebrow>The geometry — what is tested against what</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.3.1 — between live conductors, and lives to earth"
            plainEnglish="On a single-phase circuit, the live conductors are L and N. So 643.3.1(a) means an L-to-N test, plus an L-and-N (linked together) to E test. On three-phase, the live conductors are L1, L2, L3 and N — so the L-L combinations get tested too."
            onSite="On a final circuit, the practical sequence is: link L–N at the board, IR test against E, record. Then unlink, IR test L to N, record. Two readings cover the full Reg 643.3.1 requirement."
          >
            <p>
              Reg 643.3.1 is two-limbed. Limb (a) is between live conductors. On a single-phase
              circuit the only live conductor pair is L and N — so one L-N test. On a three-phase
              circuit you have L1-L2, L1-L3, L2-L3, plus each line to N — six combinations in
              theory. Multifunction testers automate this with a single button-press through an
              internal switching matrix; the reading reported is the worst case across all
              combinations.
            </p>
            <p>
              Limb (b) is between live conductors and the protective conductor. The
              regulation&apos;s explicit permission to link L and N together for this measurement
              turns what would be two readings into one — the meter sees the combined live
              conductors as one node and reads through to E. On a final circuit this is the everyday
              pattern. Where the regulation forbids linking is implicit: any circuit where N is
              being tested as an independent live conductor (rare in standard installations,
              relevant on some IT systems) requires the L-N link to be left off.
            </p>
            <p>
              Note the wording: &ldquo;the protective conductor connected to the earthing
              arrangement&rdquo;. The CPC is what goes on the test point, but the test current flows
              through the CPC into Earth via the earthing terminal. A circuit whose CPC is broken
              end-to-end will read open (∞) on the L–E test even if the cable insulation between L
              and the CPC is perfect — because the test loop is open. That is why the Reg 643.2
              continuity test sits before insulation resistance in the Reg 643 sequence: continuity
              confirms the CPC is in place, then IR can rely on the CPC as its return path.
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

          <ContentEyebrow>The A4:2026 redraft — Reg 643.3.3 spelt out</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.3"
            clause={
              <>
                Where connected equipment is likely to influence the measurement or result of the
                test, or be damaged, the test shall be applied prior to the connection of such
                equipment, in accordance with Table 64. Following connection of the equipment, a
                test at 250&nbsp;V DC shall be applied between live conductors and the protective
                conductor connected to the earthing arrangement. The insulation resistance shall
                have a value of at least 1&nbsp;MΩ.
              </>
            }
            meaning="The redraft is two sentences and they are both load-bearing. Sentence one: do the Table 64 test with the equipment disconnected. Sentence two: re-connect the equipment, do a 250 V DC test L-to-CPC, accept ≥ 1 MΩ. Both readings are required, both go on the Schedule of Test Results, the disconnection step gets a comment."
          />

          <ConceptBlock
            title="What &lsquo;likely to influence the measurement … or be damaged&rsquo; means in practice"
            plainEnglish="Anything with electronics in it. The 500 V DC test stress will conduct through MOVs in SPDs, through thyristors in dimmers, through rectifier diodes in smoke alarm power supplies, through the electronic boards in modern RCBOs. Some devices will give you a low reading that is not the cable insulation. Others will be permanently damaged."
            onSite="Standard disconnect list before a 500 V DC test on a domestic CU: SPDs at the origin, smoke / heat alarms with sealed batteries, intruder alarm power supplies, dimmer switches (or replace temporarily with a plain switch), thermostats with electronics, RCBO trip electronics where the manufacturer instructions say so. Lighting LEDs, fixed switches, and conventional MCBs do not need to come off."
          >
            <p>
              The published note on Reg 643.3.3 is unusually direct: &ldquo;Manufacturer&rsquo;s
              instructions may recommend some equipment to be disconnected during 250&nbsp;V DC
              insulation resistance tests as it may influence the results of the test.&rdquo; That
              is the regulation pointing you to the device documentation as the source of truth for
              borderline cases. If the smoke alarm manual says &ldquo;disconnect before insulation
              testing&rdquo;, the disconnection is the regulation, not optional.
            </p>
            <p>
              The two failure modes Reg 643.3.3 is protecting against are quite different. The
              influence failure mode is a measurement problem: the SPD&apos;s MOV starts to conduct
              in the few hundreds of volts, the meter reads the MOV&apos;s leakage path in parallel
              with the cable insulation, the reading drops well below the cable&apos;s true value,
              the test &ldquo;fails&rdquo; spuriously. The damage failure mode is a hardware
              problem: the thyristor stack in a dimmer is rated for the working voltage of the
              circuit (a few hundred volts peak), the 500 V DC test punches through it, the dimmer
              is destroyed.
            </p>
            <p>
              The 250 V re-test is engineered around both. 250 V DC is below the breakdown of the
              vast majority of modern electronic loads, so the equipment survives. It is also above
              the working AC peak of a 230 V circuit (≈325 V peak when the AC mains is at peak —
              though the 250 V test is DC and is applied with the circuit isolated, the figure gives
              the right intuition). A 1 MΩ minimum at 250 V DC catches genuine insulation breakdowns
              without nuisance failing on equipment leakage.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 230 V kitchen radial with an SPD on the consumer unit"
            situation="You are doing the periodic inspection of a 5-year-old domestic installation. Origin has a Type 2 SPD. You isolate the kitchen radial, link L–N at the way, set the meter to 500 V DC, and press test. The reading is 0.4 MΩ — well below the 1 MΩ minimum."
            whatToDo={
              <>
                <span className="block">
                  Stop. The reading almost certainly reflects the SPD conducting at 500 V DC, not
                  the cable. Procedure:
                </span>
                <span className="block">
                  1. Re-confirm isolation. Disconnect the SPD at its terminals (or at the
                  factory-fitted plug if the unit allows it).
                </span>
                <span className="block">
                  2. Re-test at 500 V DC, L+N to E. If the reading rises above 1 MΩ — typically well
                  above — the cable is fine and the previous reading was the SPD.
                </span>
                <span className="block">
                  3. Re-connect the SPD. Apply a 250 V DC test L+N to E. Verify ≥ 1 MΩ. Record both
                  readings on the schedule.
                </span>
                <span className="block">
                  4. Comments column: &ldquo;SPD disconnected for 500 V test; re-tested at 250 V DC
                  with SPD reconnected per Reg 643.3.3.&rdquo;
                </span>
              </>
            }
            whyItMatters="A 0.4 MΩ reading recorded against the kitchen radial without context implicates the cable. A new spark inheriting the certificate sees a circuit on the edge of failure and starts pulling sockets to investigate. The disconnect-retest-record sequence puts the responsibility where it belongs (the SPD&rsquo;s MOV is doing exactly what it was designed to do under DC stress) and leaves the next inspector a clean audit trail."
          />

          <CommonMistake
            title="Recording a 500 V DC reading taken across a connected SPD or smoke alarm"
            whatHappens="The reading is the parallel combination of the cable insulation and the device&rsquo;s internal protection — typically dropping you below 1 MΩ on a perfectly serviceable circuit. You either record a misleading fail (and start re-pulling cable that has nothing wrong with it), or you accept the low value and record a number that the next inspector cannot reproduce."
            doInstead="Read Reg 643.3.3 as a procedure, not a paragraph. If the equipment is &ldquo;likely to influence the test or be damaged&rdquo; — and modern electronics are exactly that — disconnect first, do the Table 64 test, re-connect, do the 250 V re-test, record both. The two-reading habit is the audit trail Reg 643.3.3 was redrafted to require."
          />

          <CommonMistake
            title="Using 250 V DC throughout to &lsquo;avoid damaging anything&rsquo;"
            whatHappens="The test does not adequately stress the insulation of a 230 V or 400 V circuit. A real defect — a partially broken-down dielectric that would conduct at the working voltage peak — may not register at 250 V DC. You record a passing reading on a circuit with a latent fault. The first time the cable sees a peak voltage transient under load it tracks across the defect."
            doInstead="The 250 V re-test in Reg 643.3.3 is a follow-up, not a replacement. The Table 64 test stress (500 V DC for LV, 1000 V DC for HV) is what proves the dielectric. Use the Table 64 voltage with the sensitive equipment disconnected, then re-test at 250 V re-connected. Both readings, both recorded."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why DC, not AC</ContentEyebrow>

          <ConceptBlock
            title="DC gives a steady reading. AC would not."
            plainEnglish="Cables have capacitance — line and neutral run side by side, separated by insulation, and that is the geometry of a capacitor. When you put DC on a cable, the capacitance charges to the DC level and stops drawing current. The leakage current through the insulation then settles to a steady value, and the meter reads a stable resistance. AC would charge and discharge the capacitance continuously, the meter would see capacitive current the whole time, and the reading would be impossible to interpret as &lsquo;insulation resistance&rsquo;."
            onSite="If your meter reading is rising for the first few seconds before settling, that is the cable capacitance charging. Wait for it to stabilise (typically 5-10 seconds on a domestic final circuit, longer on a long run or large cable) before recording."
          >
            <p>
              The full physics matter when the reading misbehaves. Three things happen when you
              apply 500 V DC across a cable:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Charging current</strong> — the cable&apos;s capacitance charges to the
                applied voltage. The current is initially high and decays exponentially with a time
                constant of R·C, where R is the meter&apos;s internal resistance and C is the cable
                capacitance. On a 50 m run of T&amp;E this is fractions of a second. On a 200 m run
                of large SWA it can be several seconds.
              </li>
              <li>
                <strong>Polarisation / absorption current</strong> — dielectric materials reorient
                their molecular dipoles under DC stress. This produces a slowly decaying current
                that takes seconds to a minute to settle. On clean modern cable insulation this
                current is small; on aged PVC or damp cable it can be significant and is itself a
                diagnostic indicator (used in the so-called Polarisation Index test on motors).
              </li>
              <li>
                <strong>Leakage / conduction current</strong> — the genuine current through the
                insulation resistance you are trying to measure. This is the steady-state value the
                meter settles to.
              </li>
            </ol>
            <p>
              AC test voltages would never let the dielectric polarisation settle and would
              continuously circulate capacitive current. The reading would be dominated by
              capacitive impedance, not insulation resistance, and would change with cable length,
              cable type and frequency. AC also stresses the dielectric at the peak of the waveform,
              which on an RMS-rated AC test instrument is approximately 1.41× the displayed RMS
              value — meaning a &ldquo;500 V AC&rdquo; test would actually expose the insulation to
              707 V peak. DC at 500 V is exactly 500 V, applied steadily.
            </p>
          </ConceptBlock>

          <Scenario
            title="A long SWA submain reading low on first press"
            situation="You are testing a 60 m run of 25 mm² 4-core SWA from the main switchboard to a sub-distribution board. First press of the 500 V DC test gives a reading of 0.6 MΩ that climbs to 1.4 MΩ over about eight seconds before settling at 2.1 MΩ."
            whatToDo="Wait for the reading to stabilise before recording. The initial 0.6 MΩ is the cable capacitance still charging — the meter is reading the charge current as if it were leakage. The 2.1 MΩ steady-state value is the actual insulation resistance and is well above the 1 MΩ minimum. Record 2.1 MΩ."
            whyItMatters="A common misread on long cables is to write down the early reading and either record a fail or set off chasing a non-existent fault. GN3 is explicit that the reading should be the steady-state value. Develop the habit of holding the test for 8-10 seconds (or until the reading has stopped moving for two full seconds) before recording."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The numbers in context</ContentEyebrow>

          <ConceptBlock
            title="Why 1.0 MΩ is the floor (not a target)"
            plainEnglish="A 230 V circuit with exactly 1.0 MΩ of insulation resistance has 0.23 mA of leakage current at the working voltage. That is small but not negligible — sustained, it represents heat dissipation in the insulation that accelerates ageing, and on a TT system it can desensitise an RCD."
            onSite="In practice, modern thermoplastic-insulated cable in good condition reads in the hundreds of MΩ to GΩ on a 500 V DC test. A reading of 5 MΩ on a domestic radial is technically a pass but is 200× worse than what the cable should be giving. Treat anything below 100 MΩ as a flag for further investigation, even though Reg 643.3.2 only requires 1.0 MΩ."
          >
            <p>
              The 1.0 MΩ minimum in Table 64 is a pass/fail threshold for compliance — not the
              target value for new work. The relationship between insulation resistance and leakage
              current is straightforward:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Leakage current at working voltage = working voltage ÷ insulation resistance.</li>
              <li>
                At 230 V and 1.0 MΩ: leakage = 230 ÷ 1,000,000 = 0.23 mA per circuit. That is
                sub-detection on most RCDs but is real heat in the insulation.
              </li>
              <li>
                At 230 V and 100 MΩ: leakage = 0.0023 mA. Effectively zero. This is what new cable
                should be giving.
              </li>
              <li>
                At 230 V and 0.1 MΩ: leakage = 2.3 mA. This is starting to be a real fault — a TT
                installation with several circuits at this level can accumulate enough leakage on
                the upstream RCD to cause nuisance tripping.
              </li>
            </ul>
            <p>
              The 0.5 MΩ floor for SELV/PELV reflects the fact that the working voltage is much
              lower (≤50 V AC), so the leakage current at the floor is also much lower:
              50&nbsp;÷&nbsp;500,000&nbsp;=&nbsp;0.1&nbsp;mA. The compliance numbers and the physics
              line up.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What goes in the IR columns — and the comment that has to go with it"
            plainEnglish="The Schedule of Test Results has columns for IR readings against L-L (or L-N), L-E and N-E. Record the steady-state reading in MΩ to one decimal place. If you applied Reg 643.3.3, both readings have to appear and the disconnection has to be commented."
          >
            <p>Three columns, three rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L-L / L-N column:</strong> the live-to-live measurement from Reg 643.3.1(a).
                On single-phase, this is the L-N reading. On three-phase, this is the worst case
                across the line-to-line and line-to-neutral combinations.
              </li>
              <li>
                <strong>L-E (and N-E) column:</strong> the live-to-protective-conductor measurement
                from Reg 643.3.1(b). With L and N linked, this is one reading. The N-E column on
                some forms is for the case where the link is not used; if you used the link, write
                the reading in L-E and put a dash or &ldquo;link&rdquo; in N-E.
              </li>
              <li>
                <strong>Comments column:</strong> if Reg 643.3.3 was invoked, list what was
                disconnected and note the 250 V re-test value. Example:
                &ldquo;SPD&nbsp;disconnected;&nbsp;500&nbsp;V&nbsp;test&nbsp;218&nbsp;MΩ;&nbsp;SPD&nbsp;re-connected;&nbsp;250&nbsp;V&nbsp;re-test&nbsp;42&nbsp;MΩ.&rdquo;
                Without that audit trail, the schedule is incomplete under A4:2026.
              </li>
            </ul>
            <p>
              The A4:2026 model forms tightened the wording around &ldquo;all measured values shall
              be recorded&rdquo;. A single reading where two were taken is a procedural defect on
              the certificate, even if both readings passed.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating a SELV circuit as &lsquo;not worth testing&rsquo;"
            whatHappens="The installer reasons that 24 V DC cannot hurt anyone, so the lighting circuit gets a visual inspection and a working test only — no IR measurement. Several years later a damp ingress causes a partial breakdown between the SELV cable and a nearby earthed metalwork run. Under fault, the SELV source is loaded enough to cause overheating at the breakdown point. The fire alarm triggers. The installer is on a Saturday morning call-out."
            doInstead="Reg 643.3 does not exempt SELV. Table 64 has its own row for SELV/PELV: 250 V DC test, 0.5 MΩ minimum. The test takes the same 30 seconds as on a 230 V circuit and produces a recorded value that proves the dielectric was sound at the time of the verification. Record it."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.3.2 + Table 64 are the entire decision: SELV/PELV → 250 V DC, 0.5 MΩ. Up to 500 V → 500 V DC, 1.0 MΩ. Above 500 V → 1000 V DC, 1.0 MΩ.',
              'Reg 643.3.1 sets two test geometries: between live conductors, and between live conductors and the protective conductor. L and N may be linked together for the L-E test.',
              'Reg 643.3.3 (A4:2026 redraft) is a two-test sequence: Table 64 test with sensitive equipment disconnected, then 250 V DC re-test ≥ 1 MΩ with the equipment re-connected. Both readings recorded, disconnection commented.',
              'DC, never AC. AC would mix capacitive impedance into the reading and stress the dielectric at the peak (≈1.41× RMS).',
              'Hold the test until the reading stabilises. The first second or two is cable capacitance charging, not insulation resistance.',
              'A 1.0 MΩ pass on a modern circuit is a flag, not a celebration. New thermoplastic cable should be reading hundreds of MΩ to GΩ.',
              'Sensitive equipment that is &lsquo;likely to influence the measurement or be damaged&rsquo;: SPDs, dimmers, smoke alarms, RCBOs with electronics, intruder alarm PSUs, electronic thermostats. The manufacturer instructions are the regulation for borderline cases.',
              'Schedule of Test Results: record both the Table 64 reading and the 250 V re-test reading where Reg 643.3.3 applied. The disconnection step gets a comment.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I use my meter&rsquo;s 250 V setting on a 230 V circuit if I think the SPD is going to fail at 500 V?',
                answer:
                  'No — at least, not as a substitute. Reg 643.3.2 + Table 64 require a 500 V DC test for circuits up to and including 500 V. A 250 V test does not adequately stress the dielectric of a 230 V circuit. The correct procedure is Reg 643.3.3: disconnect the SPD, do the 500 V test, re-connect, do the 250 V re-test (≥ 1 MΩ). Both readings get recorded.',
              },
              {
                question:
                  'On a three-phase distribution circuit, does Reg 643.3.1 require all six L-L / L-N combinations as separate tests?',
                answer:
                  'In principle yes — the regulation requires the measurement between live conductors. In practice, all modern multifunction testers run the combinations through an internal switching matrix and report the worst-case reading from a single button press. As long as the meter conforms to BS EN 61557-2 and the test sequence is the manufacturer&rsquo;s declared method, the recorded value is the worst-case from the full set.',
              },
              {
                question:
                  'Why is the post-connection test at 250 V DC, not at the working voltage of the circuit?',
                answer:
                  'The 250 V re-test is engineered to be a compromise between two things: low enough not to damage typical electronic equipment in modern installations (SPD MOVs, dimmer thyristor stacks, smoke alarm PSUs, RCBO electronics), and high enough above the working AC peak (≈325 V on a 230 V circuit) that a real insulation defect develops a measurable leakage path. 250 V DC is the published number in Reg 643.3.3 — not the working voltage, not the Table 64 voltage.',
              },
              {
                question:
                  'Reg 643.3.2 says &ldquo;current-using equipment disconnected&rdquo;. Where is the line between &ldquo;current-using equipment&rdquo; and &ldquo;final-circuit fitting&rdquo;?',
                answer:
                  'A useful working rule: anything that draws current as part of its normal function is current-using equipment. A wired-in oven or hob, a fixed water heater, a class II luminaire with a driver, a dimmer switch with a thyristor, an electronic thermostat — all current-using. A socket-outlet, a switch, a plain MCB, a passive light fitting body — not current-using. Reg 643.3.3 then sits over the top of that with its &ldquo;likely to influence or be damaged&rdquo; test, which catches the wired-in electronic devices that are technically current-using but which would also be damaged or distort the test if left connected.',
              },
              {
                question:
                  'I&rsquo;m doing an EICR on a TT installation with a 30 mA front-end RCD. The SPD is hard-wired and there is no easy disconnect. Do I have to take it out?',
                answer:
                  'You apply Reg 643.3.3. If the device is &ldquo;likely to influence the measurement or be damaged&rdquo;, disconnect for the 500 V test. On a hard-wired SPD that means undoing its terminations or unplugging its module if it has one. The alternative — leaving it in and accepting a low reading at 500 V DC — gives you a misleading number that fails Table 64 and that the next inspector cannot reproduce. The regulation is not optional just because the disconnect is awkward. Many SPD manufacturers provide a removable module specifically for this; check the device documentation.',
              },
              {
                question:
                  'Does the same 500 V DC test stress damage the cable insulation over many years of EICRs?',
                answer:
                  'No — modern thermoplastic and thermosetting cable insulations are rated for a working voltage well above 500 V (PVC is typically rated for 600/1000 V) and the brief application of 500 V DC during a periodic test is well within the dielectric&rsquo;s design margin. The damage risk Reg 643.3.3 addresses is specifically to electronic equipment whose internal components (MOVs, thyristors, integrated circuits) are rated at or near the circuit working voltage and have no margin for a 500 V stress.',
              },
              {
                question:
                  'I have a circuit with both an SPD and a smoke alarm wired in. Do I need to disconnect both for the 500 V test?',
                answer:
                  'Yes — anything &ldquo;likely to influence the measurement or be damaged&rdquo; comes off. Then the Table 64 test is done, both come back on, and the 250 V re-test is applied with both connected. Record the disconnections in comments: &ldquo;SPD and smoke alarm disconnected for 500 V test per Reg 643.3.3; both reconnected for 250 V re-test, value 38 MΩ.&rdquo;',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Test voltages and applications — Module 4.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-4/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Testing procedure (phase-phase, phase-earth)
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

export default InspectionTestingModule4Section2;
