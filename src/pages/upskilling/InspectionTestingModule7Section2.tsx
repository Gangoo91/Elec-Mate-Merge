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
    id: 'mod7-s2-link-flag',
    question:
      'You have placed the L–CPC link at the board for the dead polarity test. What single procedural detail most reliably stops you re-energising with the link still in place?',
    options: [
      'Memorising the test sequence',
      'Using a brightly coloured / labelled flying lead and writing link removal as a discrete tick-box step on your test record before any breaker is closed',
      'A second person watching the board',
      'Closing the board cover after each test',
    ],
    correctIndex: 1,
    explanation:
      'Leaving the link in place is the most common Method 1 / polarity failure. The procedural mitigation is twofold: a high-visibility flying lead so the link is impossible to miss visually, and link-removal as a printed tick-box step on the test sheet before any breaker is closed.',
  },
  {
    id: 'mod7-s2-switch-test',
    question:
      'At a single-pole light switch, the dead polarity probe (L–CPC linked at board) reads continuous L-to-CPC at the COM terminal and open-circuit at the L1 terminal with the switch in the OFF position. The L1 reading goes continuous when the switch is flipped to ON. What does this prove?',
    options: [
      'A polarity fault — the switch should always read continuous',
      'The switch is correctly wired with the line conductor entering on COM and the switched line leaving on L1, and the switch is breaking the line conductor as Reg 132.14.1 requires',
      'The CPC is broken inside the switch back-box',
      'The switch is faulty and should be replaced',
    ],
    correctIndex: 1,
    explanation:
      'COM continuous to L–CPC link confirms the line conductor enters the switch on COM. L1 going open-on-OFF and continuous-on-ON confirms the switch is breaking the line conductor between COM and L1 — exactly what Reg 132.14.1 demands. A switch in the neutral would read continuous on both terminals regardless of switch position.',
  },
  {
    id: 'mod7-s2-rose-perm-line',
    question:
      'At a ceiling rose (loop-in wiring, lamp removed), the dead polarity probe should read continuous L-to-CPC at which terminal(s) on an earthed-neutral system?',
    options: [
      'The neutral terminal — that is where the user plugs the bulb in',
      'The permanent line terminal (where the supply line lands and loops to the next rose) AND the switched line terminal only when its switch is in the ON position. The neutral terminal must read open',
      'All three terminals — line, neutral and CPC',
      'Only the CPC terminal',
    ],
    correctIndex: 1,
    explanation:
      'Permanent line is continuous to the L–CPC link at the board because it is the line conductor by definition. Switched line is continuous only when the controlling switch is closed. The neutral terminal must read open — if it reads continuous, line and neutral have been swapped somewhere on the circuit.',
  },
  {
    id: 'mod7-s2-socket-back',
    question:
      'A BS 1363 socket-outlet has been wired with the line conductor on the right-hand terminal as you face the front of the socket. The dead polarity test confirms electrical continuity from this terminal back to the L–CPC link at the board. Pass or fail?',
    options: [
      'Pass — continuity is the only thing the test cares about',
      'Fail. BS 1363 is non-reversible at the plug, so the right-hand terminal as you face the front is the neutral side. The line conductor lands on the LEFT terminal. Continuity to L–CPC link at the board on the right terminal is a polarity reversal — the conductor that should be neutral is electrically the line',
      'Pass on a TN-C-S supply, fail on TT',
      'Cannot be determined without an RCD test',
    ],
    correctIndex: 1,
    explanation:
      "BS 1363 socket geometry fixes which pin is line and which is neutral at the plug interface. The terminal-back wiring must follow that geometry — line on the left as you face the front. If continuity to the board's L–CPC link comes back at the right-hand terminal, the socket has been wired in reverse and the appliance now sees 230 V on what its design expects to be the neutral side.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On a single-phase final circuit, what is the first physical step in the dead polarity verification once continuity and IR have passed?',
    options: [
      'Energise and use a socket tester',
      'Confirm or place the L–CPC link at the consumer unit / distribution board on the circuit being tested',
      'Insulation resistance test L–N at 500 V',
      'Disconnect every CPC at the accessories',
    ],
    correctAnswer: 1,
    explanation:
      'The Method 1 setup is the foundation: line linked to CPC at the board for that circuit. The same link that gave you the R1+R2 reading is what makes the polarity probe possible. If the link is not in, the ohmmeter at the accessory has nothing on the line side to read against.',
  },
  {
    id: 2,
    question:
      'At a single-pole light switch on a domestic lighting circuit, the polarity test confirms which conductor is the line conductor by what reading?',
    options: [
      'Switch in the OFF position, ohmmeter from line input terminal at the switch to the CPC at the back-box → continuous = line is correctly presented at the input terminal',
      'Switch in the ON position, ohmmeter L–N at the switch',
      '500 V insulation resistance L–E at the switch',
      'Two-pole indicator across the switch terminals while energised',
    ],
    correctAnswer: 0,
    explanation:
      'At the switch, with L–CPC linked at the board, the input (permanent line) terminal must read continuous to the back-box CPC. The output (switched line) terminal will only read continuous when the switch is closed. Probing both terminals with the switch in OFF then ON proves the line conductor enters the device and the switch is interrupting the line, not the neutral.',
  },
  {
    id: 3,
    question:
      'You probe the input terminal of a single-pole switch (switch OFF) and read open circuit. The output terminal reads continuous L-to-E. What is the most likely fault?',
    options: [
      'The lamp is still in',
      'The switch has been wired into the neutral conductor — the output is the line in, and the input is being held at switched-line potential',
      'The CPC is broken at the switch back-box',
      'The L–CPC link has fallen off at the board',
    ],
    correctAnswer: 1,
    explanation:
      'A switch wired into the neutral by mistake reverses the apparent terminal mapping. The conductor that should be the permanent line is now the neutral; the switched-line conductor coming back from the rose is on the input terminal. With the switch OFF, the input terminal sees no continuity — but as soon as you close the switch, both terminals become continuous via the rose. This is the canonical Reg 643.6(a) failure.',
  },
  {
    id: 4,
    question:
      'At a fused connection unit (FCU) feeding a fixed appliance, what does the polarity test specifically need to verify in addition to the standard line continuity check?',
    options: [
      'Only that the line conductor enters the FCU',
      'That the line conductor enters the FCU on the line-input side and the fuse is in the line — i.e. the line conductor passes through the fuse, not the neutral. With the fuse removed (or carrier withdrawn), the load-side line terminal should read open to the L–CPC link at the board; with the fuse in, it reads continuous',
      'That the fuse rating matches the cable rating only',
      'That the FCU is fitted with a switch',
    ],
    correctAnswer: 1,
    explanation:
      'The FCU duty under Reg 643.6(a) is twofold: line on the input side, and the fuse element itself in the line conductor. The fuse-pull test (carrier out, expect open at the load-side line terminal; carrier in, expect continuous) is the practical confirmation that the fuse interrupts the line. A fuse in the neutral is a Reg 132.14.1 / 643.6(a) failure.',
  },
  {
    id: 5,
    question:
      'At a BS 1363 socket-outlet, looking at the face of the socket with the cord-grip downwards, where is the line terminal?',
    options: ['On the left', 'On the right', 'In the centre', 'It varies by manufacturer'],
    correctAnswer: 1,
    explanation:
      'BS 1363 fixes the geometry: with the socket viewed from the front and the earth terminal at the top, the line is on the right and the neutral is on the left. The non-reversible plug pin geometry guarantees the appliance side once the socket-back is wired correctly — but the socket-back itself can still be wired wrong, and that is what the polarity test at the socket terminals catches.',
  },
  {
    id: 6,
    question:
      'On a ceiling rose using the loop-in method, three line conductors meet at the rose: a permanent line in, a permanent line out (looping to the next rose), and a switched line returning from the switch. How does the polarity test confirm the switched line is on the lampholder?',
    options: [
      'It cannot — visual inspection only',
      'Switch in OFF, with L–CPC linked at the board: the lampholder centre-contact terminal must read open. Switch in ON: the lampholder centre-contact terminal must read continuous to CPC. The permanent-line terminals at the rose must read continuous in both switch positions',
      'Switched line is always continuous regardless of switch position',
      'The neutral terminal at the rose is the test point',
    ],
    correctAnswer: 1,
    explanation:
      'A loop-in rose is the densest wiring point on the circuit. The polarity test discriminates by switching the switch: permanent lines stay continuous always (they are tied to the L–CPC link); the switched line reaching the lampholder is open with the switch off and continuous with the switch on. If the lampholder centre stays continuous regardless of switch position, the switched line and a permanent line have been swapped — a code C2 failure.',
  },
  {
    id: 7,
    question:
      'You are polarity-testing a 32 A radial socket circuit with seven sockets, with all lamps removed from the lighting circuit on the same board. At the fifth socket the line terminal reads continuous to CPC, but the line terminal at sockets 6 and 7 reads open. What is the most likely cause?',
    options: [
      'The L–CPC link has loosened mid-test',
      'A broken line conductor between sockets 5 and 6, OR a switched-spur FCU between socket 5 and 6 with the fuse out / load-side connections swapped',
      'The CPC is shared between circuits',
      'Sockets 6 and 7 are on a different ring',
    ],
    correctAnswer: 1,
    explanation:
      'A radial test where continuity drops out at a specific accessory localises the fault. Either the line conductor itself is broken between sockets 5 and 6, or there is an intermediate device in the line path (an FCU spur, a switched isolator) and its load-side terminations have been mis-wired. Method-2-style probing along the line conductor at each accessory pin-points the break to the section between sockets 5 and 6.',
  },
  {
    id: 8,
    question:
      'A wrong-polarity reading at a switched accessory typically takes one of two forms. Which pair is correct?',
    options: [
      'Open circuit when expected closed (line conductor not at the test terminal); OR closed circuit when expected open (the conductor at the test terminal is line when it should be neutral or switched line)',
      'High resistance only; never open circuit',
      'A reading of zero ohms always; never open circuit',
      'Only voltage readings — resistance is never the diagnostic',
    ],
    correctAnswer: 0,
    explanation:
      'Both directions of error matter. Open when expected closed (the line is not arriving where the test expects it) catches missing line continuity. Closed when expected open (the test terminal reads continuous to the L–CPC link when in design it should be on neutral or on switched line) catches conductors swapped at terminals. The polarity test interprets readings against the design — both directions are diagnostic.',
  },
  {
    id: 9,
    question:
      'After polarity passes dead, you energise the consumer unit. At the consumer unit incoming side you read L–E ≈ 230 V and N–E ≈ 230 V. What does that mean and what do you do?',
    options: [
      'A normal TN-C-S reading — proceed',
      'Supplier&rsquo;s tails reversed at the cut-out — the conductor presented as neutral is actually line. Isolate, lock off, do not re-energise, and report to the DNO. Issue no certificate',
      'The consumer unit is faulty',
      'Disconnect the bonding to verify',
    ],
    correctAnswer: 1,
    explanation:
      'A healthy supply reads L–E ≈ 230 V and N–E ≈ 0–10 V (the small N–E reading is the supplier neutral drop on TN-C-S). A 230 V reading on N–E means the conductor labelled N is at line potential — i.e. the cut-out tails are reversed. The supplier is the only party permitted to remediate at the cut-out. Isolate, escalate, do not energise downstream.',
  },
  {
    id: 10,
    question:
      'On the Generic Schedule of Test Results, a circuit with seven sockets passed polarity at all seven socket-back terminations and at the consumer unit live test. How is the polarity column entry made for that circuit row?',
    options: [
      'Seven separate ticks, one per socket',
      'A single tick (or pass mark) on the circuit row — the entry is per-circuit, not per-accessory. The polarity verification is scoped to the whole circuit; failures and the diagnostic detail go in comments',
      'A numeric ohms value',
      'The lowest measured resistance from the test',
    ],
    correctAnswer: 1,
    explanation:
      'The Generic Schedule of Test Results carries one polarity entry per circuit, not per accessory. A pass = tick. A failure = cross with the diagnostic detail (which accessory, what was wrong, what was rectified) in the comments column. The granularity at which polarity is tested (every accessory) is finer than the granularity at which it is recorded (per circuit) — and the comments column is what bridges the two.',
  },
];

const InspectionTestingModule7Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Single-phase polarity verification | I&T Module 7.2 | Elec-Mate',
    description:
      'Practical polarity testing on single-phase final circuits: at the consumer unit, at every switched accessory, at every FCU, every ceiling rose and every socket. What a wrong-polarity reading looks like, and how to record it on the Schedule of Test Results.',
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
            eyebrow="Module 7 · Section 2"
            title="Single-phase polarity verification"
            description="The on-site method: L–CPC link at the board, then ohmmeter at every switched accessory, FCU, ceiling rose and socket. What a passing reading looks like, what a failure looks like, and how the result lands on the schedule of test results."
            tone="yellow"
          />

          <TLDR
            points={[
              'The dead polarity method on a single-phase circuit: link L to CPC at the consumer unit / DB, then ohmmeter from the line terminal at every accessory to the CPC at that accessory. Continuous = line lands here. Open = polarity flag.',
              'At every switch, FCU and isolator: probe input terminal with the device OFF (expect continuous) and output terminal with the device ON / fuse in (expect continuous). Anything else is a switching-in-neutral failure.',
              'At every ceiling rose using loop-in: permanent-line terminals continuous regardless of switch position; switched-line terminal at the lampholder open with switch OFF, continuous with switch ON. Lamps removed throughout.',
              'At every BS 1363 socket: line on the right, neutral on the left, earth at the top — probe the socket-back terminals before the cover goes on. Non-reversible pin geometry protects the plug-side; only the polarity test protects the wiring-side.',
              'Wrong-polarity reading is open-when-closed-expected, OR closed-when-open-expected. Either is a fault. Recording on the Schedule of Test Results is one tick per circuit row; failures and diagnostic detail go in comments.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Set up the L–CPC link at a consumer unit on a typical single-phase domestic installation and use it as the polarity probe path',
              'Test polarity at every switched accessory, FCU, ceiling rose and socket on a circuit, knowing what a passing reading looks like at each',
              'Recognise the two failure modes of a polarity reading — open-when-expected-closed, and closed-when-expected-open — and diagnose which Reg 643.6 sub-clause is breached',
              'Sequence the test correctly with continuity, IR and lamp removal so the polarity readings are interpretable',
              'Carry out the live polarity check at the consumer unit using an approved two-pole indicator and read it against the L–E and N–E expected voltages',
              'Record the polarity result correctly on the Schedule of Test Results and write a defensible comment for any in-test correction',
            ]}
          />

          <ContentEyebrow>Setting up the test — the L–CPC link at the board</ContentEyebrow>

          <ConceptBlock
            title="The link is the test — get this step right and everything follows"
            plainEnglish="At the consumer unit, with the circuit isolated and proved dead, fit a temporary link between the line conductor and the CPC for the circuit being tested. This is the same link that gave you R1+R2 in Method 1 of continuity. While that link is in, every line terminal on the circuit becomes electrically connected to every CPC terminal — and an ohmmeter probe between any line terminal and any CPC terminal reads continuous if the wiring is correct."
            onSite="Use a brightly coloured / labelled flying lead. Most pros use yellow or red insulated wire with crocodile clips, taped to the front of the consumer unit so it is impossible to forget. The link is what makes the test work and what kills the board if you forget to remove it before energising."
          >
            <p>
              On a typical single-phase domestic installation, the L–CPC link goes between the
              load-side terminal of the MCB / RCBO for the circuit and the earthing bar at the
              consumer unit. Five practical points:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Isolate the circuit at the device, lock off, prove dead at the load side of the MCB
                before attempting any link.
              </li>
              <li>
                Use an insulated flying lead — never a bare strap. The link will be touched
                repeatedly during the test, and if the consumer unit is energised on a different
                circuit, an exposed link terminal at the live bus is a flash hazard.
              </li>
              <li>
                Crocodile clips are acceptable for short tests but not for prolonged work — they
                shake loose. A spring-loaded clamp or a screw terminal block at each end is more
                reliable.
              </li>
              <li>
                Once the link is in, walk to the furthest accessory on the circuit and confirm the
                ohmmeter reading is what you would expect from R1+R2 plus link resistance. If it is,
                the link is good. If the reading is open, the link is loose — fix before continuing.
              </li>
              <li>
                Write &lsquo;remove L–CPC link&rsquo; as a tick-box step on your test record sheet,
                before any breaker is closed. This is the procedural mitigation against the most
                common Method-1 / polarity failure mode: leaving the link in and re-energising.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="On-Site Guide · Reg 10.3.4 (cross-reference)"
            clause={
              <>
                Prior to connecting the supply, the method of test for polarity shall be the same as
                test method 1 for checking the continuity of protective conductors (as referenced in
                10.3.1).
              </>
            }
            meaning="The setup for polarity is the same physical link as for continuity. There is no separate &lsquo;polarity rig&rsquo;. If you have done Method 1 already, the link is already in place — and the polarity probe is just a re-read of the same setup at every accessory in turn, against a different acceptance question."
          />

          {/* Single-phase accessory map diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Single-phase accessory map — polarity test points and expected readings
            </h4>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto"
              role="img"
              aria-label="Single-phase accessory polarity test map showing a switch, FCU, BS 1363 socket and loop-in ceiling rose, each with the polarity probe location and expected ohmmeter reading."
            >
              {/* SWITCH (top-left) */}
              <g>
                <rect
                  x="30"
                  y="30"
                  width="170"
                  height="170"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <text
                  x="115"
                  y="50"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="11"
                  fontWeight="bold"
                >
                  SWITCH
                </text>
                <text x="115" y="64" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                  (single-pole, line only)
                </text>
                {/* Input terminal */}
                <circle cx="55" cy="100" r="4" fill="#EF4444" />
                <text
                  x="55"
                  y="92"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="9"
                  fontWeight="bold"
                >
                  IN (L)
                </text>
                {/* Output terminal */}
                <circle cx="175" cy="100" r="4" fill="#FBBF24" />
                <text
                  x="175"
                  y="92"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  OUT (Sw L)
                </text>
                {/* Switch contact */}
                <line
                  x1="55"
                  y1="100"
                  x2="100"
                  y2="100"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="135"
                  y2="115"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
                <line
                  x1="135"
                  y1="100"
                  x2="175"
                  y2="100"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
                <text x="115" y="135" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  (shown OFF)
                </text>
                {/* CPC */}
                <circle cx="115" cy="180" r="3" fill="#22C55E" />
                <text x="115" y="172" textAnchor="middle" fill="#22C55E" fontSize="9">
                  CPC
                </text>
                {/* Test reading */}
                <text
                  x="115"
                  y="195"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  IN→CPC: continuous · OUT→CPC: open (OFF) / continuous (ON)
                </text>
              </g>

              {/* FCU (top-right) */}
              <g>
                <rect
                  x="220"
                  y="30"
                  width="170"
                  height="170"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <text
                  x="305"
                  y="50"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="11"
                  fontWeight="bold"
                >
                  FCU
                </text>
                <text x="305" y="64" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                  (line through fuse)
                </text>
                <circle cx="245" cy="100" r="4" fill="#EF4444" />
                <text
                  x="245"
                  y="92"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="9"
                  fontWeight="bold"
                >
                  IN (L)
                </text>
                {/* Fuse symbol */}
                <line
                  x1="245"
                  y1="100"
                  x2="285"
                  y2="100"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
                <rect
                  x="285"
                  y="93"
                  width="40"
                  height="14"
                  rx="2"
                  fill="rgba(251,191,36,0.15)"
                  stroke="#FBBF24"
                  strokeWidth="1"
                />
                <text
                  x="305"
                  y="103"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  FUSE
                </text>
                <line
                  x1="325"
                  y1="100"
                  x2="365"
                  y2="100"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                />
                <circle cx="365" cy="100" r="4" fill="#FBBF24" />
                <text
                  x="365"
                  y="92"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  LOAD
                </text>
                {/* Neutral through */}
                <circle cx="245" cy="140" r="3" fill="#3B82F6" />
                <text x="245" y="155" textAnchor="middle" fill="#3B82F6" fontSize="9">
                  N
                </text>
                <line x1="245" y1="140" x2="365" y2="140" stroke="#3B82F6" strokeWidth="1.5" />
                <circle cx="365" cy="140" r="3" fill="#3B82F6" />
                {/* CPC */}
                <circle cx="305" cy="180" r="3" fill="#22C55E" />
                <text x="305" y="172" textAnchor="middle" fill="#22C55E" fontSize="9">
                  CPC
                </text>
                <text
                  x="305"
                  y="195"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Fuse out: LOAD→CPC open · Fuse in: continuous
                </text>
              </g>

              {/* SOCKET (bottom-left) */}
              <g>
                <rect
                  x="410"
                  y="30"
                  width="170"
                  height="170"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <text
                  x="495"
                  y="50"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="11"
                  fontWeight="bold"
                >
                  BS 1363 SOCKET
                </text>
                <text x="495" y="64" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                  (face view, earth top)
                </text>
                {/* Earth top */}
                <circle
                  cx="495"
                  cy="85"
                  r="5"
                  fill="rgba(34,197,94,0.2)"
                  stroke="#22C55E"
                  strokeWidth="1.5"
                />
                <text
                  x="495"
                  y="89"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="9"
                  fontWeight="bold"
                >
                  E
                </text>
                {/* Neutral left */}
                <circle
                  cx="450"
                  cy="135"
                  r="5"
                  fill="rgba(59,130,246,0.2)"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                />
                <text
                  x="450"
                  y="139"
                  textAnchor="middle"
                  fill="#3B82F6"
                  fontSize="9"
                  fontWeight="bold"
                >
                  N
                </text>
                <text x="450" y="158" textAnchor="middle" fill="#3B82F6" fontSize="9">
                  LEFT
                </text>
                {/* Line right */}
                <circle
                  cx="540"
                  cy="135"
                  r="5"
                  fill="rgba(239,68,68,0.2)"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                />
                <text
                  x="540"
                  y="139"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="9"
                  fontWeight="bold"
                >
                  L
                </text>
                <text x="540" y="158" textAnchor="middle" fill="#EF4444" fontSize="9">
                  RIGHT
                </text>
                <text
                  x="495"
                  y="185"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  L (right) → CPC: continuous · N (left) → CPC: open
                </text>
                <text x="495" y="197" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  test at the socket-back, before cover goes on
                </text>
              </g>

              {/* CEILING ROSE (bottom-right) */}
              <g>
                <rect
                  x="600"
                  y="30"
                  width="180"
                  height="170"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <text
                  x="690"
                  y="50"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="11"
                  fontWeight="bold"
                >
                  CEILING ROSE
                </text>
                <text x="690" y="64" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                  (loop-in, lamp removed)
                </text>
                {/* Permanent L bank */}
                <circle cx="625" cy="95" r="4" fill="#EF4444" />
                <text x="625" y="87" textAnchor="middle" fill="#EF4444" fontSize="9">
                  Perm L in
                </text>
                <circle cx="650" cy="95" r="4" fill="#EF4444" />
                <text x="650" y="87" textAnchor="middle" fill="#EF4444" fontSize="9">
                  Perm L out
                </text>
                {/* Neutral bank */}
                <circle cx="690" cy="95" r="4" fill="#3B82F6" />
                <text x="690" y="87" textAnchor="middle" fill="#3B82F6" fontSize="9">
                  N
                </text>
                {/* Switched L to lampholder */}
                <circle cx="730" cy="95" r="4" fill="#FBBF24" />
                <text x="730" y="87" textAnchor="middle" fill="#FBBF24" fontSize="9">
                  Sw L
                </text>
                {/* Lampholder */}
                <circle
                  cx="690"
                  cy="145"
                  r="14"
                  fill="rgba(251,191,36,0.05)"
                  stroke="rgba(251,191,36,0.4)"
                  strokeWidth="1.5"
                />
                <text x="690" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  lamp
                </text>
                <line
                  x1="730"
                  y1="100"
                  x2="700"
                  y2="135"
                  stroke="#FBBF24"
                  strokeWidth="1.5"
                  strokeDasharray="3,2"
                />
                <text
                  x="690"
                  y="180"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Perm L: always continuous
                </text>
                <text
                  x="690"
                  y="192"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Sw L: open (sw OFF) / continuous (sw ON)
                </text>
              </g>

              {/* BOARD setup at bottom */}
              <rect
                x="30"
                y="240"
                width="220"
                height="180"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="140"
                y="260"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                CONSUMER UNIT
              </text>
              <text x="140" y="274" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Isolated · circuit MCB locked off)
              </text>
              <rect
                x="60"
                y="295"
                width="40"
                height="22"
                rx="3"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="80"
                y="310"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                MCB L
              </text>
              <rect
                x="60"
                y="335"
                width="40"
                height="22"
                rx="3"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
              <text
                x="80"
                y="350"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N bar
              </text>
              <rect
                x="60"
                y="375"
                width="40"
                height="22"
                rx="3"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="80"
                y="390"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E bar
              </text>
              {/* L-CPC link */}
              <path
                d="M100,306 L150,306 L150,386 L100,386"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="6,3"
              />
              <rect
                x="135"
                y="335"
                width="55"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.15)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="162"
                y="350"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                L–CPC LINK
              </text>

              {/* Ohmmeter */}
              <rect
                x="290"
                y="290"
                width="190"
                height="100"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="385"
                y="312"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                LOW-Ω OHMMETER
              </text>
              <text x="385" y="330" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                One probe at line terminal at the accessory
              </text>
              <text x="385" y="345" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Other probe at CPC terminal at the accessory
              </text>
              <text
                x="385"
                y="365"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Continuous = pass at this point
              </text>
              <text x="385" y="378" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Open = polarity flag — investigate before energising
              </text>

              {/* Caption */}
              <rect
                x="510"
                y="240"
                width="270"
                height="180"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="645"
                y="262"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                The four-step accessory pass
              </text>
              <text x="525" y="285" fill="rgba(255,255,255,0.75)" fontSize="9">
                1. L terminal → CPC: continuous
              </text>
              <text x="525" y="302" fill="rgba(255,255,255,0.75)" fontSize="9">
                2. N terminal → CPC: open (no L–N link)
              </text>
              <text x="525" y="319" fill="rgba(255,255,255,0.75)" fontSize="9">
                3. Switch / fuse on the line input only
              </text>
              <text x="525" y="336" fill="rgba(255,255,255,0.75)" fontSize="9">
                4. Visual: terminal labels match design
              </text>
              <text x="525" y="362" fill="#FBBF24" fontSize="9" fontWeight="bold">
                One pass per accessory.
              </text>
              <text x="525" y="378" fill="#FBBF24" fontSize="9" fontWeight="bold">
                One tick per circuit on the schedule.
              </text>
              <text x="525" y="402" fill="rgba(255,255,255,0.5)" fontSize="9">
                Anything else = stop, isolate, investigate.
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

          <ContentEyebrow>At every switched accessory — switches, FCUs, isolators</ContentEyebrow>

          <ConceptBlock
            title="Switches — proving the device interrupts the line, not the neutral"
            plainEnglish="At every single-pole switch on the circuit, the polarity test is two readings: input terminal with the switch off (expect continuous to CPC), and output terminal with the switch on (expect continuous). If either reads the wrong way, the switch has been wired into the neutral conductor."
            onSite="Test the switch in both positions. The diagnostic is the contrast between OFF and ON. A switch that reads continuous on both terminals in OFF position has not been wired into the line — and it is not actually isolating anything when the user thinks the light is off."
          >
            <p>
              The switch test is a discrimination test. With L–CPC linked at the board, the four
              readings to take at every single-pole switch:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Switch position</th>
                    <th className="text-left text-white/80 py-2">Probe at INPUT (perm L)</th>
                    <th className="text-left text-white/80 py-2">Probe at OUTPUT (sw L)</th>
                    <th className="text-left text-elec-yellow py-2">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06] align-top">
                    <td className="py-2">OFF</td>
                    <td className="py-2 text-emerald-300">Continuous</td>
                    <td className="py-2 text-emerald-300">Open</td>
                    <td className="py-2 text-elec-yellow">
                      Pass — line is on the input, switch is interrupting line, switch is in line
                      not neutral
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06] align-top">
                    <td className="py-2">ON</td>
                    <td className="py-2 text-emerald-300">Continuous</td>
                    <td className="py-2 text-emerald-300">Continuous</td>
                    <td className="py-2 text-elec-yellow">
                      Pass — line passes through the closed contact to the lampholder
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06] align-top">
                    <td className="py-2">OFF</td>
                    <td className="py-2 text-red-300">Open</td>
                    <td className="py-2 text-red-300">Continuous</td>
                    <td className="py-2 text-elec-yellow">
                      <strong>FAIL</strong> — switch wired in neutral. Output terminal is at line
                      potential (line bypasses the switch via the lamp). C2.
                    </td>
                  </tr>
                  <tr className="align-top">
                    <td className="py-2">OFF</td>
                    <td className="py-2 text-red-300">Continuous</td>
                    <td className="py-2 text-red-300">Continuous</td>
                    <td className="py-2 text-elec-yellow">
                      <strong>FAIL</strong> — switch is bypassed (e.g. terminals shorted, line and
                      switch wire connected to the same terminal). The switch does nothing. C2.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The third row is the failure that gets people killed. A switch wired into the neutral
              leaves the lampholder centre contact at line potential when the user has switched the
              light off — and the user has no way to know.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Fused connection units (FCUs) — line through the fuse, with the fuse-pull confirmation"
            plainEnglish="At every FCU feeding a fixed appliance, the polarity test is the standard line-input check, plus a confirmation that the fuse element is in the line conductor. Pull the fuse and probe the load-side line terminal: it should read open. Replace the fuse: it should read continuous. That contrast confirms the fuse is in the line."
            onSite="The fuse-pull test is fast and definitive. Most FCUs have a removable fuse carrier — pop it out, take the reading, pop it back in. If the reading does not change between fuse-in and fuse-out, the fuse is in the neutral path or has been bypassed."
          >
            <p>
              The FCU duty under Reg 643.6(a) is doubled-up: the fuse is a single-pole protective
              device, so it must be in the line. The two-step test:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Standard polarity check: probe the line input terminal at the FCU. Continuous = line
                lands here. Open = line not arriving (broken conductor or wrong terminal).
              </li>
              <li>
                Fuse confirmation: with the L–CPC link at the board, pull the fuse and probe the
                load-side line terminal at the FCU. Open = fuse is in the line (the open is the fuse
                element). Replace the fuse: continuous. The contrast is the proof.
              </li>
              <li>
                Visual: with the FCU cover off, confirm the line conductor enters on the input side
                and leaves on the load side — and the fuse sits between them in the line, not in the
                neutral.
              </li>
            </ol>
            <p>
              A fuse in the neutral path of an FCU is a Reg 132.14.1 / 643.6(a) failure. The fuse
              cannot disconnect the line on a fault, so a fault-to-earth on the appliance line
              conductor remains live indefinitely.
            </p>
          </ConceptBlock>

          <Scenario
            title="Switched-spur FCU on a kitchen ring — fuse-pull test fails"
            situation="You are polarity-testing a kitchen ring final. At a switched-spur FCU feeding a built-in oven, the line input terminal reads continuous to CPC (good). You pull the fuse carrier. The load-side line terminal still reads continuous to CPC. The fuse is supposed to be in the line."
            whatToDo="Stop. The reading means the fuse element is not in the line path between the input and the load — either the fuse is in the neutral, or the carrier has been wired with a bridge that bypasses the fuse element. Open the FCU. Confirm conductor routing: line in → fuse → load out. Neutral straight through, no fuse. Correct any swap, re-test the fuse-pull contrast (open with fuse out, continuous with fuse in), and only then move on."
            whyItMatters="A built-in oven is a Class I appliance with an exposed metal chassis. Its CPC carries fault current to the consumer unit on a fault. If the FCU&rsquo;s fuse is in the neutral, a line-to-chassis fault inside the oven cannot blow the fuse — the fuse is in the wrong conductor. The CPC carries fault current indefinitely (until the upstream MCB or RCD picks it up, which it might not at the rated fault current). Disconnection time is not met. Touch voltage on every bonded part rises until something else trips."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>At every ceiling rose — loop-in is the dense test point</ContentEyebrow>

          <ConceptBlock
            title="Ceiling roses — the densest wiring on a domestic lighting circuit"
            plainEnglish="A loop-in ceiling rose has three line conductors meeting at it: a permanent line in (from the switch / previous rose), a permanent line out (looping to the next rose), and a switched line returning from the switch. The polarity test discriminates by switch position. Permanent lines stay continuous regardless. Switched line is open with switch off, continuous with switch on. Lamps must be removed throughout."
            onSite="The rose is where the most wiring goes wrong on a lighting circuit. The terminals are tight, the colour codes are sometimes mixed (old-style red / black), and the loop-in convention is not always followed. Take the readings; do not trust visual alone."
          >
            <p>
              The standard loop-in ceiling rose has three banks of terminals: permanent line
              (typically three terminals — line in, line out to next rose, switched-line feed to
              switch), neutral (line out to next rose plus the lampholder neutral), and CPC. The
              lampholder centre contact is fed by the switched line returning from the switch. The
              polarity test sequence:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Lamp removed. (Lamp present = continuous L-to-N at the holder, masking any swap.)
              </li>
              <li>
                With L–CPC linked at the board: probe each permanent-line terminal in the bank.
                Continuous in both switch positions = the bank is on permanent line.
              </li>
              <li>
                Probe the lampholder centre-contact terminal with the switch OFF. Expect open. With
                the switch ON, expect continuous. The contrast confirms the switched line is the
                lampholder feed.
              </li>
              <li>
                Probe the lampholder outer-contact / shell terminal. Expect open in both switch
                positions (this terminal should be on neutral, not connected to the L–CPC link).
              </li>
              <li>
                Visual: confirm conductor colours match the design. Older installations may have
                all-red T&E lighting wiring with marker tape on the switched line — the marker
                should be at every termination of that conductor.
              </li>
            </ol>
            <p>
              The single most common rose fault is the switched line being terminated on a
              permanent-line terminal. The lampholder gets continuous power (in OFF and ON) because
              the switch is irrelevant. The user reports &lsquo;the switch does not work&rsquo; —
              and a mis-diagnosis can leave the fault in place if you only look at the switch end.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Leaving a lamp in during the rose polarity test"
            whatHappens="A lamp filament is a low-resistance path between the lampholder centre and outer contacts. With the lamp in, an incorrectly wired rose (switched line on a permanent-line terminal, for example) reads continuous at the lampholder centre regardless of switch position — but it would have read continuous regardless anyway via the lamp. The fault is invisible. The certificate goes out. The user notices the &lsquo;switch is broken&rsquo; six weeks later, and an electrician investigating the call finds reverse polarity at the holder."
            doInstead="Lamps removed throughout polarity testing of the lighting circuit — every rose, every fitting. This is OSG guidance and is not optional. Re-fit the lamps after the polarity test passes, then proceed to the live energisation step."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>At every BS 1363 socket — terminal geometry matters</ContentEyebrow>

          <ConceptBlock
            title="Sockets — line on the right, neutral on the left, earth at the top"
            plainEnglish="At every BS 1363 socket-outlet, with the cover off and looking at the back of the socket, the standard terminal positions are: earth at the top (sometimes labelled E or with the earth symbol), line on the right (labelled L, brown core), neutral on the left (labelled N, blue core). The polarity test confirms that what is wired to the line terminal reads continuous to the L–CPC link at the board, and what is wired to the neutral terminal does not."
            onSite="Test the socket-back terminals with the cover off, before fitting the cover. Once the cover is on, you cannot probe the terminals without dismantling. Make the test part of the &lsquo;before screwing the cover on&rsquo; routine, not a return visit."
          >
            <p>The two-test pattern at every socket:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L terminal → CPC:</strong> continuous. The line conductor lands on the
                right-hand terminal as expected.
              </li>
              <li>
                <strong>N terminal → CPC:</strong> open. The neutral conductor is not the line — it
                is not connected to the L–CPC link path.
              </li>
            </ul>
            <p>
              The reverse-polarity socket failure mode is the L and N conductors swapped at the back
              of the socket. The plug is non-reversible (Reg 553.1.5), so the appliance is presented
              with what it expects on each pin — but the conductors feeding those pins are wrong way
              round. Class I appliances with single-pole switching in the neutral pin become
              permanently energised on their accessible metalwork.
            </p>
            <p>
              On a ring final circuit, the dead polarity test at every socket is the catch for the
              sub-clause-(c) duty: every socket is a separate test point, and the readings give you
              a chain of evidence along the ring. A single reversed socket on a ring is a localised
              fault that the ring continuity test (r1, r2, rn) on its own does not necessarily
              reveal — the polarity test at every socket is what catches it.
            </p>
          </ConceptBlock>

          <Scenario
            title="Reversed L and N at a kitchen socket on a 32 A ring final"
            situation="Ring continuity (r1, r2, rn) tests pass on the new kitchen ring. R1+R2 calculation matches measured. IR is clean. You move to the polarity test. At seven of eight sockets, L → CPC reads continuous and N → CPC reads open. At the eighth socket, L → CPC reads open and N → CPC reads continuous."
            whatToDo="The eighth socket has L and N swapped at the back. With the consumer unit isolated, isolate the circuit, prove dead, remove the cover, swap the line and neutral conductors at the socket terminals (brown to L on the right, blue to N on the left). Re-fit and re-test polarity at all eight sockets. Once L → CPC continuous and N → CPC open at every socket, polarity passes for the circuit. Record on the schedule of test results: tick. In the comments column: &lsquo;S/O 8 (kitchen, far end) — L and N reversed, corrected, re-tested OK&rsquo;."
            whyItMatters="The non-reversible plug geometry of BS 1363 protects the appliance once the socket-back is wired correctly. With the socket-back wired wrong, every appliance plugged in presents 230 V on what its design treats as the neutral side. A double-insulated (Class II) tool tolerates this. A single-insulated (Class I) tool with switching in its neutral side becomes permanently live on its chassis. The polarity test at the socket-back is the sole defence."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The live polarity step — once the dead test passes</ContentEyebrow>

          <ConceptBlock
            title="Live polarity at the consumer unit — the test the dead checks cannot do"
            plainEnglish="Once every dead test on every circuit has passed, energise the consumer unit and use an approved two-pole voltage indicator to read the incoming side of the main switch. L–E ≈ 230 V; N–E ≈ 0–10 V. Then read at one representative socket on each circuit type. The live test catches errors at the supplier&rsquo;s side that the dead test physically cannot."
            onSite="The live test is short — five minutes for a typical consumer unit and four representative sockets — but it has to be done. Skipping it on the basis that &lsquo;the dead tests all passed&rsquo; is the failure that lands certifiers in court."
          >
            <p>The live polarity check workflow at the consumer unit:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>L–CPC link removed from the board. Confirm. (Twice.)</li>
              <li>Pull all RCDs / RCBOs to the OFF position. Energise the main switch.</li>
              <li>
                Approved two-pole voltage indicator (GS 38 compliant) at the incoming side of the
                main switch. Read L–E. Expect ≈ 230 V (single-phase). Read N–E. Expect ≈ 0–10 V on
                TN-C-S, or close to 0 V on TT.
              </li>
              <li>
                A 230 V N–E reading is the canonical live-test failure: supplier&rsquo;s tails
                reversed at the cut-out. Isolate, lock off, do not energise downstream. Contact the
                DNO. Issue no certificate until the supplier corrects the cut-out.
              </li>
              <li>
                Once the origin reads correctly, close one RCD / RCBO at a time. At a representative
                socket on each circuit type, plug in an approved socket tester and confirm correct
                polarity indication — line on the right pin, neutral on the left, earth at the top —
                and the ICC sequence the tester expects.
              </li>
            </ol>
            <p>
              Socket testers are a final cross-check. They are not the polarity verification — that
              was the dead test. They are confirmation that the energised supply at the socket pins
              matches the dead-test wiring at the socket-back terminals.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the dead polarity test at the rose because &lsquo;the lamp will work or it will not&rsquo;"
            whatHappens="The installer thinks: if the polarity is wrong at the rose, the lamp simply will not light. So they skip the dead test, energise, switch on, and the lamp lights. They tick polarity. But the lamp lights regardless of whether the switch is in the line or the neutral — what the lamp cares about is current flow, not which conductor is being interrupted. The user changes a lamp six months later, switch off, lamp out, lampholder shell at line potential — and the user gets a shock that should not have been possible."
            doInstead="The dead test at the rose is the only step that distinguishes switch-in-line from switch-in-neutral. Lamp removed, ohmmeter at the lampholder centre contact, switch OFF (expect open), switch ON (expect continuous). That contrast is the proof. The lamp lighting up under live conditions is not — it cannot distinguish the two cases."
          />

          <SectionRule />

          <ContentEyebrow>Recording the result — the schedule of test results entry</ContentEyebrow>

          <ConceptBlock
            title="One tick per circuit row — diagnostic detail in comments"
            plainEnglish="The Generic Schedule of Test Results carries one polarity column per circuit row. The pass entry is a tick. The fail entry is a cross — and a cross blocks the certificate."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pass on first test:</strong> tick. No comment required.
              </li>
              <li>
                <strong>Fail on first test, corrected before completion:</strong> tick, with a
                comment in the comments column. Recommended format: &lsquo;[Accessory ref] — [fault]
                — corrected and re-tested OK&rsquo;. Example: &lsquo;S/O 8 kitchen — L/N reversed —
                corrected and re-tested OK&rsquo;.
              </li>
              <li>
                <strong>Fail not corrected (periodic inspection on existing installation):</strong>{' '}
                cross in the polarity column, code C2 in the schedule of inspections, diagnostic
                detail in comments. The customer is informed in writing.
              </li>
              <li>
                <strong>N/A:</strong> only for circuits where polarity does not apply. A standard
                single-phase final circuit always has polarity, so N/A is wrong on those circuits.
              </li>
            </ul>
            <p>
              The audit trail is what keeps the result defensible. A cleanly recorded comment naming
              the accessory and the action taken protects the inspector if the work is queried
              later.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'L–CPC link at the board for the circuit under test — the same link as Method 1 of continuity. The link is the test; without it, the polarity probe has nothing to read against.',
              'At every switch: input continuous to CPC with switch OFF, output continuous to CPC with switch ON. Anything else = switch in neutral, code C2.',
              'At every FCU: standard line-input check, plus the fuse-pull contrast (load-side line terminal open with fuse out, continuous with fuse in). The contrast proves the fuse is in the line.',
              'At every ceiling rose: lamps removed throughout, permanent-line terminals continuous in both switch positions, lampholder centre-contact open with switch OFF and continuous with switch ON.',
              'At every BS 1363 socket: L (right) → CPC continuous, N (left) → CPC open. Test at the socket-back, before the cover goes on.',
              'A wrong-polarity reading is open-when-closed-expected, OR closed-when-open-expected. Either is a fault and either blocks the certificate.',
              'Live polarity at the consumer unit once dead tests pass: L–E ≈ 230 V, N–E ≈ 0–10 V. A 230 V N–E reading = supplier&rsquo;s tails reversed at the cut-out → escalate to DNO.',
              'Schedule of Test Results: one tick per circuit row, diagnostic detail in comments. A pass after in-test correction is still a pass — the comment is the audit trail.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'On a domestic lighting circuit with a 2-way / 3-way switching arrangement, how is the polarity test set up?',
                answer:
                  'Test each switch position in turn. With L–CPC linked at the board, position one switch UP and the other DOWN — that gives the OFF state of the lamp. Probe the lampholder centre contact — expect open. Flip one switch to invert the lamp state to ON. Probe the centre contact — expect continuous. Repeat for every combination. The discrimination is the same as a single-pole switch: the lampholder must follow the switch state cleanly.',
              },
              {
                question:
                  'On a TT supply, the live N–E reading at the consumer unit is not 0–10 V — it might be tens of volts. Is that a polarity failure?',
                answer:
                  'Probably not. On TT, the consumer&rsquo;s earth is via a local rod, not via the supplier&rsquo;s neutral. There is no PEN bond, so the N–E voltage at the consumer unit reflects the difference between the supplier&rsquo;s neutral potential and the local earth potential. Tens of volts can be normal on TT, particularly with a high earth electrode resistance or a heavily loaded supplier transformer. The polarity diagnostic is L–E: ≈ 230 V means line is correctly presented. A 230 V N–E reading is still the canonical reversed-tails failure regardless of system type.',
              },
              {
                question:
                  'On a periodic inspection, I find a switch in the neutral on a circuit that has been working fine for 30 years. What code do I assign?',
                answer:
                  'Normally C2 — potentially dangerous. The fact the circuit has been operating without incident is not evidence the fault is benign; it is evidence that the specific accident sequence (user changing lamp, lampholder centre on line, contact with shell) has not happened yet. Reg 132.14.1 and Reg 643.6(a) make the configuration non-compliant. Document the accessory location, code C2 the circuit, and recommend remedial work before the next periodic. If the customer declines remediation, the EICR records the deviation and the customer carries the risk in writing.',
              },
              {
                question:
                  'On a ring final circuit, the polarity test at every socket passes — but I have not done a separate polarity test for &lsquo;line continuity around the ring&rsquo;. Have I missed something?',
                answer:
                  'The ring continuity test (r1, r2, rn at the consumer unit, end-to-end) is a continuity test, not a polarity test. The polarity verification on a ring is the per-socket test you have already done — at every socket, L is continuous to CPC and N is open to CPC. That is the polarity evidence for every accessory on the ring. Reg 643.6(c) is satisfied by the chain of socket-by-socket readings, not by an additional ring-level polarity step. If every socket passes, the polarity column for the ring gets a tick.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Single-phase polarity verification — Module 7.2" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/inspection-testing/module-7/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.3 Three-phase rotation testing
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

export default InspectionTestingModule7Section2;
