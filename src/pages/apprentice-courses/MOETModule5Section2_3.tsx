/**
 * MOET · Module 5 · Section 2 · Subsection 3 — Ladder Logic Basics
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course did not enumerate a
 * Module 5 KSB list, so the statements below are reused verbatim from the
 * Module 1/3/4 lists it did supply, matched by topic.
 *   Knowledge  · "Electrical. Types of diagrams used to represent circuits;
 *                 symbols and abbreviations used to represent components in
 *                 electrical schematics."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * The original's safety references (BS EN 60204-1 for fail-safe NC stop
 * buttons, BS EN ISO 13850 for hardwired E-stops) are kept exactly as
 * written — these are standard, uncontested machinery-safety citations and
 * are outside the scope of the brief's verified corrections (which concern
 * GS38, thermography, test intervals and C&G qualifications).
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Ladder Logic Basics - MOET Module 5 Section 2.3';
const DESCRIPTION =
  'Comprehensive guide to ladder logic for maintenance technicians: contacts, coils, AND/OR logic, latching circuits, scan order, online monitoring and fault-finding techniques. IEC 61131-3 and ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'no-contact',
    question: 'A normally open (NO) contact passes power when:',
    options: [
      'The associated input or coil is ON (energised)',
      'The associated input is OFF (de-energised)',
      'The rung is disabled by the programme',
      'It always passes power regardless of state',
    ],
    correctIndex: 0,
    explanation:
      'A NO contact closes and passes power when its associated bit is ON, mirroring a physical NO relay contact. When the bit is OFF, the contact is open and blocks power flow through the rung.',
  },
  {
    id: 'series-logic',
    question: 'Two contacts in series on a ladder logic rung represent:',
    options: [
      'A timer function with two stages',
      'AND logic — both must be true for the output to energise',
      'NOT logic — one inverts the other',
      'OR logic — either contact can activate the output',
    ],
    correctIndex: 1,
    explanation:
      'Series contacts create AND logic — power can only flow through the rung if ALL series contacts are closed (true). This directly mirrors series-connected relay contacts in traditional hard-wired circuits.',
  },
  {
    id: 'latch-use',
    question: 'A latching circuit keeps an output ON after:',
    options: [
      'A fixed time delay expires automatically',
      'The input signal remains continuously held',
      'A momentary input pulse, requiring a separate input to turn OFF',
      'The PLC restarts from a power cycle',
    ],
    correctIndex: 2,
    explanation:
      'A latch (seal-in) keeps the output energised after a momentary start press. The output remains ON until a separate stop input breaks the circuit. This is the fundamental start/stop motor control pattern.',
  },
  {
    id: 'scan-order',
    question: 'If the same output coil appears on two different rungs, what happens?',
    options: [
      'Both rungs control the output equally',
      'The output alternates between the two rung states each scan',
      'The PLC generates a compilation error and will not run',
      'Only the last rung scanned determines the final output state',
    ],
    correctIndex: 3,
    explanation:
      "The PLC scans top to bottom. Each rung writes to the output, but only the last rung scanned determines the final state written to the output image table. This 'double coil' condition is a common programming error flagged by most PLC software.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Ladder logic was originally designed to resemble:',
    options: [
      'A flowchart showing the sequence of machine operations step by step',
      'A ladder with two power rails and horizontal rungs containing contacts and coils',
      'A block diagram of interconnected function blocks and data flows',
      'A line of structured text statements similar to a computer programme',
    ],
    correctAnswer: 1,
    explanation:
      'Ladder logic uses two vertical power rails with horizontal rungs — designed to look like the relay wiring diagrams that electricians already understood, making the transition from hard-wired relay panels to PLC programming intuitive.',
  },
  {
    id: 2,
    question: 'A normally closed (NC) contact passes power when:',
    options: [
      'The associated input is ON (energised)',
      'The rung above it has already energised its coil',
      'The associated input is OFF (de-energised)',
      'The PLC is in programming mode rather than run mode',
    ],
    correctAnswer: 2,
    explanation:
      'NC contacts are closed by default, passing power when their associated bit is OFF. They open when the bit turns ON. NC contacts are used for stop buttons and safety interlocks to provide fail-safe operation.',
  },
  {
    id: 3,
    question: 'Parallel contacts on a ladder logic rung create:',
    options: [
      'NAND logic — output is ON unless all contacts are true',
      'AND logic — all contacts must be true',
      'XOR logic — output is ON if exactly one contact is true',
      'OR logic — any one contact being true activates the output',
    ],
    correctAnswer: 3,
    explanation:
      'Parallel (branched) contacts create OR logic — power can flow through any one of the parallel paths. If ANY parallel contact is closed, the output coil is energised.',
  },
  {
    id: 4,
    question: 'The stop button in a motor start/stop circuit should use:',
    options: [
      'A normally closed (NC) contact for fail-safe design per BS EN 60204-1',
      'A normally open (NO) contact so the rung is broken only when pressed',
      'An internal memory bit rather than any physical contact',
      'A one-shot edge instruction to register a single button press',
    ],
    correctAnswer: 0,
    explanation:
      'NC stop buttons are fail-safe: if the wire breaks, the connection fails, or the contact welds open, the circuit opens and the motor stops. This is a mandatory requirement under BS EN 60204-1.',
  },
  {
    id: 5,
    question: 'A PLC scans its ladder logic rungs in which order?',
    options: [
      'Randomly, depending on processor load',
      'Top to bottom, left to right, starting from rung 1',
      'Only the rungs with active inputs are scanned',
      'Bottom to top, to prioritise the last-written logic',
    ],
    correctAnswer: 1,
    explanation:
      'The PLC executes ladder logic sequentially from top to bottom, evaluating each rung from left to right. This scan order affects when coil states update and is important for understanding programme behaviour.',
  },
  {
    id: 6,
    question: 'An internal relay (memory bit) in a PLC programme is used to:',
    options: [
      'Drive physical output terminals directly',
      'Read physical input values from sensors',
      'Store intermediate logic states without driving physical outputs',
      'Count the number of scan cycles per second',
    ],
    correctAnswer: 2,
    explanation:
      'Memory bits (internal relays, M-bits) are virtual coils in PLC memory used for intermediate logic, sequencing flags, and conditional states. They have no physical output but can be used as contacts throughout the programme.',
  },
  {
    id: 7,
    question: 'Emergency stop functions in machinery should be:',
    options: [
      'A single NO contact read by the PLC as a standard input',
      'Implemented entirely in software for fastest possible response',
      'A latched memory bit reset by the operator after each stop',
      'NC hardwired contacts that break safety circuits directly, not relying solely on PLC logic',
    ],
    correctAnswer: 3,
    explanation:
      'E-stop circuits must use hardwired NC contacts per BS EN 60204-1 and BS EN ISO 13850. They must function independently of the PLC. The PLC may monitor E-stop status but must not be the sole means of achieving the safety function.',
  },
  {
    id: 8,
    question: 'Online monitoring in PLC software helps maintenance by:',
    options: [
      'Displaying live contact and coil states so you can trace exactly which condition blocks an output',
      'Automatically rewriting the programme to correct any detected fault',
      'Permanently logging every input change to an external database',
      'Increasing the PLC scan speed while a fault is being diagnosed',
    ],
    correctAnswer: 0,
    explanation:
      'Online monitoring highlights energised elements in real time, showing power flow through each rung. You can see exactly which contacts are satisfied and which are blocking, making it the most powerful diagnostic tool for PLC fault-finding.',
  },
  {
    id: 9,
    question: 'Cross-referencing in PLC software allows you to:',
    options: [
      'Connect two different PLC brands together',
      'Find every location in the programme where a specific address is used',
      'Convert between ladder logic and structured text automatically',
      'Identify unused cable routes in the installation',
    ],
    correctAnswer: 1,
    explanation:
      'Cross-referencing lists every rung where a given address appears — essential for tracing how a condition in one part of the programme affects logic elsewhere. It is a fundamental diagnostic tool when investigating why an output is not behaving as expected.',
  },
  {
    id: 10,
    question: 'A seal-in (latch) contact in a motor start circuit is:',
    options: [
      'An NC contact of the stop button wired in series with the start button',
      'A one-shot instruction that pulses the output coil for a single scan',
      'An NO contact of the output coil wired in parallel with the start button to maintain the circuit',
      'A separate timer that holds the output on for a fixed period',
    ],
    correctAnswer: 2,
    explanation:
      'The seal-in contact is an NO contact of the motor output coil itself, placed in parallel with the momentary start button. Once the start button is pressed and the coil energises, the seal-in contact closes and maintains the circuit after the button is released.',
  },
  {
    id: 11,
    question: 'A one-shot (edge detection) instruction in ladder logic is used to:',
    options: [
      'Hold an output on continuously for as long as the input stays true',
      'Combine several inputs so any one of them activates the output',
      'Delay an output by a fixed time after the input becomes true',
      'Produce a single scan pulse on the rising or falling edge of an input transition',
    ],
    correctAnswer: 3,
    explanation:
      'A one-shot (OSR/OSF, P/N trigger) produces a single-scan pulse when the input transitions from OFF to ON (rising edge) or ON to OFF (falling edge). This is essential for counting, toggling, and triggering single events from maintained signals.',
  },
  {
    id: 12,
    question: 'Under ST1426, a maintenance technician is expected to:',
    options: [
      'Read and interpret ladder logic, use online monitoring for fault diagnosis, and understand programme structure',
      'Design and write the complete control programme for new machinery',
      'Carry out structural modifications to the machine guarding and frame',
      'Approve and sign off the electrical installation certificate for the panel',
    ],
    correctAnswer: 0,
    explanation:
      "ST1426 expects maintenance technicians to understand programme structure, read ladder logic diagrams, use online monitoring for systematic fault diagnosis, and communicate effectively with controls engineers. Full programme design is typically the controls engineer's role.",
  },
];

const faqs = [
  {
    question: 'Is ladder logic still widely used in modern industrial control?',
    answer:
      'Yes, ladder logic (LD) remains the most popular PLC programming language worldwide, especially for discrete manufacturing and machine control. Its similarity to traditional relay circuit diagrams makes it intuitive for electricians. However, other IEC 61131-3 languages such as Structured Text and Function Block Diagram are increasingly used for complex calculations and process control applications.',
  },
  {
    question: 'What is the difference between a contact and a coil in ladder logic?',
    answer:
      'Contacts test conditions — they either pass or block power flow based on the state of their associated bit. Coils are outputs that are energised when the rung logic evaluates to true. Contacts are placed on the left side of the rung (condition side) and coils on the right (output side). A single rung can have multiple contacts but typically has only one output coil.',
  },
  {
    question: 'How do I systematically read an unfamiliar ladder logic programme?',
    answer:
      'Start with the I/O list to understand what physical devices are connected. Find the main output coils you are interested in. Trace backwards through the contacts to understand what conditions must be met. Use cross-referencing to find where conditions are controlled elsewhere in the programme. Read any comments or rung descriptions. Work systematically through one output at a time rather than trying to understand the entire programme at once.',
  },
  {
    question: 'What is online monitoring and how does it help with fault-finding?',
    answer:
      'Online monitoring connects a programming laptop to the running PLC and displays real-time states of all programme elements. Energised contacts and coils are typically highlighted in green or bold. You can see exactly which conditions are met and which are blocking an output. This allows you to pinpoint whether a fault is in the field wiring (PLC shows correct input state but field device disagrees) or in the programme logic.',
  },
  {
    question: 'Can I make changes to a running PLC programme during online monitoring?',
    answer:
      'Most PLC software allows online edits, but this must NEVER be done without proper authorisation, risk assessment, and safe working procedures. Changes to a running programme can cause unexpected machine movements. Under ST1426, maintenance technicians use online monitoring primarily for diagnostics — programme modifications are typically the responsibility of the controls engineer following a formal management-of-change process.',
  },
];

const MOETModule5Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.2 · Subsection 3"
        title="Ladder Logic Basics"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Relay logic concepts, contacts, coils and fundamental programming elements for PLC
            control — the visual language that lets an electrician read what a machine is doing.
          </p>

          <TLDR
            points={[
              'Structure: Two power rails with horizontal rungs containing contacts and coils.',
              'Contacts: NO (passes when ON) and NC (passes when OFF) test conditions.',
              'Logic: Series = AND, Parallel = OR, NC contact = NOT.',
              'Scan: Top to bottom, left to right every scan cycle.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Read and interpret ladder logic diagrams with contacts, coils and branches',
              'Explain AND, OR and NOT logic functions using series and parallel contacts',
              'Describe latching (seal-in) circuits for motor start/stop control',
              'Understand PLC scan order and how it affects programme execution',
              'Use online monitoring and cross-referencing for systematic fault diagnosis',
              'Apply fail-safe design principles using NC contacts for stop and E-stop functions',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Online monitoring:</strong> See live contact and coil states for fault
                diagnosis.
              </li>
              <li>
                <strong>Cross-reference:</strong> Find every location where an address is used.
              </li>
              <li>
                <strong>Latching:</strong> Start/stop motor control is the fundamental pattern.
              </li>
              <li>
                <strong>ST1426:</strong> Read and interpret PLC programmes for maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Ladder logic fundamentals</ContentEyebrow>

          <ConceptBlock title="Built so electricians could read it on day one">
            <p>
              Ladder logic was created in the late 1960s so that electricians could programme PLCs
              using a format they already understood — relay circuit diagrams. Each rung of the
              ladder represents a circuit path between two vertical power rails, with contacts
              (conditions) on the left and coils (outputs) on the right. The PLC evaluates each rung
              sequentially from top to bottom during every scan cycle, typically completing the
              entire programme in 1-50 milliseconds.
            </p>
            <p>
              The visual format makes the logic straightforward to understand: if all series
              contacts in a path are closed (AND condition) or any parallel contacts are closed (OR
              condition), the output coil at the end of the rung energises. This directly mirrors
              how physical relay circuits work, which is why ladder logic remains the most widely
              used PLC language in discrete manufacturing and machine control worldwide.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Basic ladder elements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NO contact --| |--:</strong> Passes power when its associated bit is ON
                (energised). Used for start buttons, sensor inputs, and internal flags.
              </li>
              <li>
                <strong>NC contact --|/|--:</strong> Passes power when its associated bit is OFF
                (de-energised). Used for stop buttons, safety interlocks, and fault conditions.
              </li>
              <li>
                <strong>Output coil --( )--:</strong> Energises when rung logic evaluates to true.
                Drives physical outputs or internal memory bits.
              </li>
              <li>
                <strong>Set (latch) --(S)--:</strong> Turns the output ON and it stays ON until
                explicitly reset — survives loss of rung power.
              </li>
              <li>
                <strong>Reset (unlatch) --(R)--:</strong> Turns OFF a latched output. Must be used
                with a corresponding Set instruction.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The PLC scan cycle">
            <p>The PLC operates in a continuous repeating cycle with three main phases:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Input scan:</strong> Reads all physical input states into the input image
                table (a snapshot of inputs at that moment).
              </li>
              <li>
                <strong>Programme execution:</strong> Evaluates every rung from top to bottom, left
                to right, writing results to the output image table.
              </li>
              <li>
                <strong>Output update:</strong> Writes the output image table to the physical
                outputs simultaneously.
              </li>
            </ul>
            <p>
              This means that inputs are only read once per scan, and outputs are only updated once
              per scan. A very fast input pulse (shorter than the scan time) could be missed
              entirely — this is important for high-speed counting applications.
            </p>
            <p>
              <strong>Maintenance tip:</strong> Understanding the scan cycle explains why forcing an
              input in the PLC software may not produce the same result as operating the physical
              switch. The forced value bypasses the input scan and directly writes to the input
              image table.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Logic functions in ladder diagrams</ContentEyebrow>

          <ConceptBlock title="Every digital function comes from series, parallel and NC contacts">
            <p>
              All digital logic can be constructed from the basic ladder elements. The physical
              arrangement of contacts on the rung — series, parallel, or combinations — determines
              the logic function. Understanding these patterns is essential for reading any ladder
              programme, from a simple motor starter to a complex automated production line.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Logic function reference">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Function</th>
                    <th className="py-2 pr-4 font-medium text-white">Arrangement</th>
                    <th className="py-2 pr-4 font-medium text-white">Output ON when</th>
                    <th className="py-2 font-medium text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">AND</td>
                    <td className="py-2 pr-4">Contacts in series</td>
                    <td className="py-2 pr-4">ALL contacts true</td>
                    <td className="py-2">Guard closed AND start pressed</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">OR</td>
                    <td className="py-2 pr-4">Contacts in parallel</td>
                    <td className="py-2 pr-4">ANY contact true</td>
                    <td className="py-2">Start button 1 OR start button 2</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">NOT</td>
                    <td className="py-2 pr-4">NC contact</td>
                    <td className="py-2 pr-4">Associated bit is OFF</td>
                    <td className="py-2">Run if fault flag is NOT set</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">NAND</td>
                    <td className="py-2 pr-4">NC contacts in parallel</td>
                    <td className="py-2 pr-4">NOT all inputs true</td>
                    <td className="py-2">Alarm if NOT both sensors active</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">NOR</td>
                    <td className="py-2 pr-4">NC contacts in series</td>
                    <td className="py-2 pr-4">NONE of the inputs true</td>
                    <td className="py-2">Idle if no call for operation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Complex logic is built by combining these patterns. For example, a motor may require:
              (Stop NC in series) AND (Guard interlock NC in series) AND (Start button NO in
              parallel with seal-in contact NO). This creates a rung where the motor runs only when
              stop is not pressed, the guard is closed, and either the start button is pressed or
              the motor is already running.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Internal relays (memory bits)">
            <p>
              Internal relays (M-bits, flags) are virtual coils in PLC memory. They do not drive
              physical outputs but can be used as contacts anywhere in the programme. They are
              essential for:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Intermediate logic:</strong> Breaking complex conditions into manageable
                stages.
              </li>
              <li>
                <strong>Sequencing:</strong> Step flags for sequential machine operations.
              </li>
              <li>
                <strong>One-shot triggers:</strong> Edge detection for counting and toggling.
              </li>
              <li>
                <strong>Fault flags:</strong> Recording fault conditions for diagnostics.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Latching circuits and motor control</ContentEyebrow>

          <ConceptBlock title="The pattern behind almost every motor rung you will read">
            <p>
              The start/stop motor circuit is the most fundamental ladder logic pattern and the one
              you will encounter most frequently in industrial maintenance. Understanding this
              circuit thoroughly gives you the foundation for reading virtually any ladder
              programme, because the same latching principle is used throughout industrial control
              for pumps, valves, conveyors, and process sequences.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Start/stop circuit elements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop button:</strong> NC contact in series — breaks the rung when pressed.
                Uses NC because a broken wire also opens the contact, providing fail-safe behaviour
                as required by BS EN 60204-1.
              </li>
              <li>
                <strong>Start button:</strong> NO contact in parallel with the seal-in contact.
                Momentary — pressed to start, then released.
              </li>
              <li>
                <strong>Seal-in contact:</strong> An NO contact of the output coil itself, placed in
                parallel with the start button. When the coil energises, this contact closes and
                maintains the circuit after the start button is released.
              </li>
              <li>
                <strong>Overload contact:</strong> NC contact in series (from the thermal overload
                relay). Opens if the motor draws excessive current, stopping the motor and requiring
                manual reset.
              </li>
              <li>
                <strong>Output coil:</strong> Drives the motor contactor. When energised, the motor
                runs. When de-energised, the motor stops.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Using an NO contact for the stop function"
            whatHappens={
              <>
                If NO contacts were used for the stop function, a broken wire would prevent the
                operator from stopping the machine. This is not optional — it is a legal requirement
                under the Machinery Directive and BS EN 60204-1.
              </>
            }
            doInstead={
              <>
                Stop and E-stop buttons always use NC contacts. If the wire breaks, the circuit
                opens and the machine stops — this is fail-safe behaviour. Emergency stops must also
                be hardwired through safety-rated devices (safety relays) and must not rely solely
                on PLC logic (BS EN ISO 13850).
              </>
            }
          />

          <ConceptBlock title="Set/Reset vs seal-in">
            <p>There are two ways to create latching behaviour in ladder logic:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Seal-in contact:</strong> The output coil maintains itself via its own NO
                contact in parallel with start. The stop button breaks the seal-in. This is the
                traditional method, most similar to hard-wired relay circuits.
              </li>
              <li>
                <strong>Set/Reset instructions:</strong> Separate Set (S) and Reset (R) coils latch
                and unlatch the output. The output retains its state between scans without needing a
                seal-in path. Note: if both Set and Reset are active in the same scan, the
                instruction processed last wins.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Reading ladder diagrams for fault-finding</ContentEyebrow>

          <ConceptBlock title="A static diagram becomes a live diagnostic tool">
            <p>
              Online monitoring transforms ladder diagrams from static documentation into powerful
              real-time diagnostic tools. By connecting the programming laptop to the running PLC,
              every contact and coil displays its live state — typically highlighted in green when
              true and unhighlighted when false. This allows you to trace the logic flow from left
              to right and immediately identify which condition is preventing an output from
              operating.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Systematic diagnostic steps">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Identify the fault:</strong> Determine which output is not operating (or
                is operating unexpectedly).
              </li>
              <li>
                <strong>2. Find the output coil:</strong> Use cross-referencing to locate the rung
                containing the output coil in the programme.
              </li>
              <li>
                <strong>3. Go online:</strong> Connect to the running PLC and observe the rung in
                real time.
              </li>
              <li>
                <strong>4. Trace power flow:</strong> Follow the rung from left to right. Power
                should flow from the left rail through closed contacts to the coil. Find where power
                flow stops — that is the blocking condition.
              </li>
              <li>
                <strong>5. Evaluate the blocking contact:</strong> Is the blocking condition genuine
                (e.g. a guard is genuinely open) or is it a fault (e.g. the PLC shows the guard open
                but the physical guard is closed)?
              </li>
              <li>
                <strong>6. Check field wiring:</strong> If the PLC state does not match the physical
                device state, the fault is in the field wiring, the sensor, or the input module —
                not in the programme.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cross-referencing">
            <p>
              Cross-referencing shows every rung where a specific address (input, output, or memory
              bit) is used. This is essential because:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>A blocking contact may be controlled by logic on a different rung.</li>
              <li>An output may be referenced in multiple locations.</li>
              <li>A condition chain may span several programme sections.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Watch tables">
            <p>Watch tables allow you to monitor specific addresses in a list format:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Group related addresses for a particular machine section.</li>
              <li>Monitor timer and counter current values.</li>
              <li>View analogue input/output values in engineering units.</li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> Always use cross-referencing to check if a blocking
              contact is controlled by logic elsewhere in the programme. The fault may be in a
              completely different section — for example, a safety interlock in the housekeeping
              routines may be preventing the output you are investigating.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Good programming practice and common errors</ContentEyebrow>

          <ConceptBlock title="Reading programmes better, without needing to write them">
            <p>
              While maintenance technicians are not typically expected to write PLC programmes from
              scratch, understanding good programming practice helps you read programmes more
              effectively, identify potential issues, and communicate precisely with controls
              engineers when modifications are needed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common programming errors to watch for">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Double coil:</strong> The same output address used on two or more rungs.
                Only the last rung scanned determines the final state, making the earlier rungs
                ineffective. Most PLC software flags this as a warning.
              </li>
              <li>
                <strong>Missing seal-in:</strong> An output that should latch but has no seal-in
                contact or Set instruction. The output only stays ON while the start button is
                physically held — releasing it drops the output.
              </li>
              <li>
                <strong>NO stop button:</strong> Using a normally open contact for a stop function.
                If the wire breaks, the machine cannot be stopped — a serious safety violation.
              </li>
              <li>
                <strong>No overload protection in logic:</strong> Omitting the overload contact from
                the motor rung. Even if the physical overload trips the contactor, the PLC output
                remains ON, which can cause repeated attempts to restart against a tripped overload.
              </li>
              <li>
                <strong>Race conditions:</strong> Logic where the output depends on the order of
                evaluation within the same scan. Rearranging rungs could change the machine
                behaviour.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Programme documentation">
            <p>
              Well-documented programmes are far easier to maintain. Look for (and request from
              controls engineers) the following:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Symbolic names:</strong> Descriptive names instead of raw addresses (e.g.
                &quot;GuardInterlock&quot; instead of &quot;I0.3&quot;).
              </li>
              <li>
                <strong>Rung comments:</strong> Descriptions of what each rung or group of rungs
                does.
              </li>
              <li>
                <strong>I/O list:</strong> A complete list mapping every physical I/O point to its
                tag name and field device.
              </li>
              <li>
                <strong>Programme structure:</strong> Logical grouping into sections (e.g. safety,
                motor control, sequencing, HMI interface).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Forcing an output without a permit"
            whatHappens={
              <>
                Forced outputs bypass all programme logic including safety interlocks. A forgotten
                force has caused fatal accidents in industry.
              </>
            }
            doInstead={
              <>
                Never force an output or override a safety interlock in the PLC without a proper
                risk assessment and permit to work. Always document any forces applied and remove
                them immediately after diagnosis. Check the force table before leaving the PLC.
              </>
            }
          />

          <ConceptBlock title="ST1426 and this section">
            <p className="italic">
              Under ST1426, maintenance technicians are expected to read and interpret ladder logic
              programmes, use online monitoring for systematic fault diagnosis, understand programme
              structure and documentation, and communicate findings to controls engineers. These
              skills are fundamental to efficient reactive and planned maintenance of automated
              machinery.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'A rung reads left (contacts, conditions) to right (coil, output); the PLC scans every rung top to bottom, left to right, once per cycle.',
              'Series contacts = AND; parallel contacts = OR; an NC contact = NOT — all digital logic is built from these three patterns.',
              'A seal-in contact — an NO contact of the output coil itself, in parallel with the start button — is the classic way to latch a motor circuit; Set/Reset instructions do the same job without a seal-in path.',
              'Stop and E-stop functions must always use NC contacts (BS EN 60204-1) so a broken wire stops the machine rather than disabling the stop function; E-stops must be hardwired, not PLC-only (BS EN ISO 13850).',
              'A double-coil error (the same output on two rungs) means only the last-scanned rung actually controls the output — most PLC software flags it as a warning.',
              'Online monitoring highlights live contact and coil states so you can trace exactly where power flow stops on a rung; cross-referencing finds every other rung that touches the same address.',
              'If the PLC-displayed input state disagrees with the physical field device, the fault is in the wiring, sensor or input module — not in the programme logic.',
              'Never force an output or override a safety interlock without a risk assessment and permit to work, and always remove and check forces before leaving the PLC.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Input/Output Devices
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Timers, Counters and Sequencing
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section2_3;
