/**
 * MOET · Module 7 · Section 2 · Subsection 4 — Control System Troubleshooting
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the EPA
 * practical observation rather than a specific piece of engineering
 * knowledge, so no ST1426 knowledge/skill/behaviour statement is quoted
 * here — none of the verified KSB statements checked for this conversion
 * describe assessment-preparation technique.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
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

const TITLE = 'Control System Troubleshooting - MOET Module 7 Section 2.4';
const DESCRIPTION =
  'PLC and control system fault diagnosis and resolution practice for EPA assessment: reading ladder logic, I/O checking, relay logic, motor starters and demonstrating systematic troubleshooting under ST1426.';

const quickCheckQuestions = [
  {
    id: 'plc-io-check',
    question:
      'What is the first step when troubleshooting a PLC-controlled system that is not operating correctly?',
    options: [
      'Download and re-upload the PLC program from a backup to clear any corruption',
      'Replace the PLC processor module, as this is the most common point of failure',
      'Check the physical inputs and outputs — are the sensors detecting, are the actuators receiving signals?',
      'Increase the scan time of the PLC to give the inputs longer to register',
    ],
    correctIndex: 2,
    explanation:
      'Most PLC system faults are in the field wiring, sensors, or actuators — not in the PLC program itself. Checking physical I/O first (using LED indicators, measuring voltages at terminals, and observing sensor operation) eliminates the most common fault causes before considering the program.',
  },
  {
    id: 'ladder-logic-reading',
    question:
      'Why is the ability to read ladder logic diagrams important for a maintenance technician?',
    options: [
      'It allows you to rewrite the PLC program to remove the fault permanently',
      'It is the only way to measure the supply voltage at each input terminal',
      'It removes the need to use a multimeter when testing field wiring',
      'It allows you to understand the intended sequence of operation and identify where the control logic is not progressing, narrowing the fault location',
    ],
    correctIndex: 3,
    explanation:
      'Reading ladder logic allows you to trace the control sequence and identify where the programme is stuck. If a rung is not energising, you can check the corresponding physical input or internal condition. This significantly speeds up fault diagnosis and is a key skill assessed in the EPA for control system tasks.',
  },
  {
    id: 'relay-logic-fault',
    question: 'In a relay-based control circuit, how do you determine if a relay coil has failed?',
    options: [
      'Listen for a clicking sound when the circuit is energised — no click always means the coil has failed',
      'Measure the coil resistance with a multimeter — an open circuit or wrong reading indicates failure',
      'Replace the relay and see if the fault clears, since coil testing cannot be done in situ',
      'Measure the voltage across the contacts — a reading of zero confirms the coil has burnt out',
    ],
    correctIndex: 1,
    explanation:
      "Measuring coil resistance is a definitive test. An open-circuit reading (OL) confirms a burnt-out coil. A reading significantly different from the manufacturer's specification suggests degradation. You should also check the coil supply voltage is present — a healthy coil with no supply voltage is not a coil fault but a supply fault.",
  },
  {
    id: 'forced-output-safety',
    question:
      'When using the PLC force function to test an output, what critical safety precaution must you observe?',
    options: [
      'Force every output in the program at once so the whole sequence can be observed together',
      'Leave the force in place after testing so the output keeps operating until the next visit',
      'Apply the force only while the machine is running under normal automatic control',
      'Ensure the actuator area is clear and remove all forces immediately after testing',
    ],
    correctIndex: 3,
    explanation:
      'Forcing a PLC output bypasses the normal control logic and directly activates the physical output device, bypassing safety interlocks in the programme. You must ensure the actuator area is clear of personnel, the forced movement will not cause damage or injury, and all forces are removed after testing. Leaving a force in place is extremely dangerous — it can cause unexpected operation when normal control resumes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A PLC input LED is illuminated but the program does not recognise the input. The most likely cause is:',
    options: [
      'The sensor wired to that input has failed and is no longer providing a signal',
      'The input module or the connection between the input terminal and the PLC processor has a fault',
      'The field wiring to the input terminal is open circuit',
      'The supply voltage to the sensor is too low for it to operate',
    ],
    correctAnswer: 1,
    explanation:
      'If the input LED illuminates, the physical signal is reaching the input terminal. If the program does not recognise it, the fault lies between the input terminal and the processor — possibly a faulty input module, a loose backplane connection, or an addressing error.',
  },
  {
    id: 2,
    question: 'When reading a ladder logic diagram, a normally open (NO) contact in series means:',
    options: [
      'The rung will always be true unless that input is active (ON)',
      'The rung will be true only when that input is de-energised (OFF)',
      'The rung will only be true (energised) when that input is active (ON)',
      'The rung is true regardless of the state of that input',
    ],
    correctAnswer: 2,
    explanation:
      'A normally open contact in a ladder rung means that input condition must be TRUE (active/ON) for the rung to energise. If multiple NO contacts are in series, ALL must be true. Understanding this basic logic allows you to trace the sequence and identify which condition is preventing operation.',
  },
  {
    id: 3,
    question:
      'A motor starter contactor chatters (rapidly opens and closes). The most likely cause is:',
    options: [
      'The main power contacts have welded together and cannot separate',
      'The motor overload relay has been set to too high a current value',
      'The contactor is correctly rated but the motor is drawing too much current',
      'The coil supply voltage is too low, or there is an intermittent connection in the control circuit',
    ],
    correctAnswer: 3,
    explanation:
      'Contactor chatter occurs when the coil receives insufficient voltage to hold the armature firmly. Common causes include: low control supply voltage, high-resistance connections in the control circuit, a faulty auxiliary contact in the hold-on circuit, or a failing coil.',
  },
  {
    id: 4,
    question:
      'A star-delta motor starter fails to change from star to delta. The most likely area to investigate is:',
    options: [
      'The changeover timer, the delta contactor, and the changeover auxiliary contacts',
      'The main isolator and the incoming supply fuses',
      'The motor windings and the thermal overload element',
      'The start and stop push buttons on the control station',
    ],
    correctAnswer: 0,
    explanation:
      'The star-to-delta changeover is controlled by a timer and interlocked contactors. If the changeover fails, check: the timer is operating and set correctly, the delta contactor coil is receiving a signal, the changeover auxiliary contacts are functioning, and the interlocking is correct.',
  },
  {
    id: 5,
    question: 'When checking PLC outputs, a forced output test is used to:',
    options: [
      'Permanently override the program so the output stays on after the test is finished',
      'Temporarily activate an output to verify the module and field wiring, bypassing the logic',
      'Measure the scan time of the PLC processor while the control program is running',
      'Read the status of an input sensor without disturbing the connected field wiring',
    ],
    correctAnswer: 1,
    explanation:
      'Forcing an output temporarily activates it regardless of the program logic. This tests the output module, wiring, and actuator independently of the control program. If the forced output works but the programme does not activate it, the fault is in the programme logic or input conditions. Always remove forces after testing.',
  },
  {
    id: 6,
    question:
      'A safety interlock on a machine guard prevents the machine from operating when the guard is open. If the machine will not start with the guard closed, you should first:',
    options: [
      'Bypass the interlock switch temporarily to confirm the rest of the circuit works',
      'Replace the PLC processor, since a failed processor is the most likely cause',
      'Check the interlock switch is making contact, verifying with a multimeter at its terminals',
      'Increase the control supply voltage to overcome any high-resistance connection',
    ],
    correctAnswer: 2,
    explanation:
      'The interlock switch is the most likely fault point. Check physical operation (does the switch actuate when the guard closes?), measure continuity/voltage at the switch terminals, and verify the wiring to the control system. Never bypass safety interlocks — this is a serious safety violation and would be an automatic fail in the EPA.',
  },
  {
    id: 7,
    question:
      'In a control panel, DIN rail-mounted terminal blocks serve which primary maintenance purpose?',
    options: [
      'Stepping the control voltage down from 230 V AC to 24 V DC for the PLC inputs',
      'Providing short-circuit protection for each field cable entering the panel',
      'Isolating the control circuit automatically when a fault current is detected',
      'Providing accessible, organised connection points that simplify fault diagnosis',
    ],
    correctAnswer: 3,
    explanation:
      'Terminal blocks provide organised, accessible connection points between field wiring and control devices that simplify maintenance. Field wiring terminates at the terminal blocks, and internal panel wiring connects the other side to the control devices. This means you can disconnect and test field wiring without disturbing the control device connections.',
  },
  {
    id: 8,
    question:
      "Checking for 'expected voltages' at test points during troubleshooting allows you to:",
    options: [
      'Verify the correct signals are present at each stage, locating where the path is broken',
      'Confirm the PLC program has been written correctly without reading the ladder logic',
      'Measure the insulation resistance of the control circuit conductors to earth',
      'Determine the correct torque setting for each terminal in the control panel',
    ],
    correctAnswer: 0,
    explanation:
      'Checking expected voltages at test points traces the signal path through the circuit. Where the expected voltage disappears, you have found the fault area. For example, if 24 V DC is present at a relay coil input terminal but not at the coil itself, the fault is in the connection between the terminal and the coil.',
  },
  {
    id: 9,
    question:
      'A proximity sensor on a conveyor system is not detecting product. Your systematic approach would be:',
    options: [
      'Replace the PLC input module first, as it is the most likely cause of the fault',
      'Check the LED, supply voltage and sensing gap, clean the face, then trace the wiring',
      'Force the corresponding PLC input on and leave the sensor in place untested',
      'Increase the conveyor speed so the sensor has more time to detect the product',
    ],
    correctAnswer: 1,
    explanation:
      'A systematic approach works from the sensor outward: check the indicator LED, verify supply voltage is correct, check the sensing distance and alignment, clean the face, measure the output signal, and trace wiring to the PLC input. This eliminates causes in order of likelihood and accessibility.',
  },
  {
    id: 10,
    question: 'During the EPA, demonstrating control system troubleshooting competence means:',
    options: [
      'Memorising the I/O addresses of one specific PLC brand before the assessment',
      'Working as quickly as possible to find the fault, regardless of method or safety',
      'Working systematically with drawings, testing safely and explaining your reasoning',
      'Replacing each suspect component in turn until the system operates correctly again',
    ],
    correctAnswer: 2,
    explanation:
      'The EPA assesses your systematic approach, not your knowledge of specific PLC brands. Demonstrate the ability to read circuit diagrams and ladder logic, systematic signal tracing, safe testing practices, clear communication of your diagnostic reasoning, and proper documentation.',
  },
  {
    id: 11,
    question:
      'When tracing a fault in a 24 V DC control circuit, you measure 24 V at the relay coil input terminal but 0 V across the coil. This indicates:',
    options: [
      'The coil is healthy and operating normally, drawing its full rated current',
      'The supply voltage is too high and is damaging the relay coil winding',
      'The relay contacts have welded closed and are holding the output energised',
      'The connection between the input terminal and the coil is broken or faulty',
    ],
    correctAnswer: 3,
    explanation:
      'If 24 V is present at the input terminal but does not reach the coil, the fault is in the path between them — possibly a broken conductor, a loose screw terminal, a corroded connection, or a failed intermediate connection. This is a classic example of signal tracing narrowing the fault to a specific section of the circuit.',
  },
  {
    id: 12,
    question:
      'A control system uses both PLC-controlled and hardwired relay circuits. When troubleshooting, you should:',
    options: [
      'Identify which technology controls the faulty function, then apply the right technique',
      'Assume the PLC is at fault first, since electronics fail more often than relays do',
      'Replace all the relays in the panel before investigating the PLC program at all',
      'Bypass the relay circuits so the fault can be isolated to the PLC on its own',
    ],
    correctAnswer: 0,
    explanation:
      'Hybrid systems require you to identify which technology is responsible for the faulty function. Reading the control drawings tells you whether the function is PLC-controlled (check the I/O status and ladder logic) or relay-controlled (trace with a multimeter and circuit diagram). Applying the right technique to the right technology saves time and demonstrates understanding.',
  },
];

const faqs = [
  {
    question: 'Do I need to know how to program a PLC for the EPA?',
    answer:
      "No. The MOET EPA assesses your ability to diagnose and resolve faults in control systems, not to programme them. You should be able to read and interpret ladder logic, use the PLC's I/O status display to check inputs and outputs, and understand basic control sequences. Programming is beyond the scope of the maintenance technician assessment.",
  },
  {
    question: 'What types of control system faults are most common in the EPA?',
    answer:
      'Common assessment faults include: faulty sensors (proximity, limit switches), failed relay/contactor coils, wiring faults (open circuits, loose connections), blown fuses in control circuits, incorrect timer settings, and stuck actuators. These are all faults you would encounter in real maintenance work and can be diagnosed with a systematic approach.',
  },
  {
    question: 'Should I touch the PLC during troubleshooting?',
    answer:
      "You can use the PLC's diagnostic features (I/O status display, fault indicators) to help with diagnosis. However, you should not modify the programme, change parameters, or physically remove modules unless specifically instructed. In the EPA, explain what information you are reading from the PLC display and how it informs your diagnosis.",
  },
  {
    question: 'How do I read a circuit diagram quickly under time pressure?',
    answer:
      'Focus on the fault area: identify the output that is not operating, trace backwards through the control circuit to find which input or condition is preventing operation. Do not try to understand the entire circuit — concentrate on the relevant rung or section. Practise reading drawings regularly so it becomes second nature.',
  },
  {
    question: 'What if the control system uses technology I have not seen before?',
    answer:
      'Apply the same systematic principles regardless of the specific technology. Inputs, outputs, power supplies and signal paths work the same way whether the controller is a PLC, a relay panel, or a bespoke control system. Explain to the assessor that you are applying systematic principles to an unfamiliar system — this demonstrates adaptability.',
  },
  {
    question: 'How do I demonstrate confidence with control panels during the EPA?',
    answer:
      'Confidence comes from familiarity. Before the EPA, practise opening control panels (with appropriate permissions and safe isolation), identifying components, tracing wiring, reading terminal markings, and using the PLC status display. During the assessment, take a moment to orientate yourself with the panel layout before starting diagnosis — this shows methodical thinking, not hesitation.',
  },
];

const MOETModule7Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.2 · Subsection 4"
        title="Control System Troubleshooting"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            PLC and relay logic fault diagnosis, signal tracing and systematic resolution for EPA
            readiness.
          </p>

          <TLDR
            points={[
              'Start physical: check sensors, actuators and wiring first.',
              'Read logic: trace ladder diagrams to find stuck conditions.',
              'Signal trace: follow voltages through the control path.',
              'Communicate: explain your reasoning throughout.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Systematically troubleshoot PLC-controlled and relay-based control systems',
              'Read and interpret ladder logic diagrams to trace control sequences',
              'Check physical inputs, outputs and field devices using test instruments',
              'Trace signal paths through control circuits to locate fault positions',
              'Diagnose common motor starter and contactor faults methodically',
              'Demonstrate control system competence to the EPA assessor with clear communication',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Drawings:</strong> must read circuit and ladder diagrams.
              </li>
              <li>
                <strong>Safety:</strong> never bypass interlocks or safety devices.
              </li>
              <li>
                <strong>PLC I/O:</strong> use status displays for diagnosis.
              </li>
              <li>
                <strong>ST1426:</strong> control system maintenance competence.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Understanding control system architecture</ContentEyebrow>

          <ConceptBlock title="Understanding control system architecture">
            <p>
              Before you can troubleshoot a control system, you need to understand its architecture.
              Industrial control systems in electrical maintenance typically fall into three
              categories: relay-based (hardwired), PLC-based, or hybrid systems that combine both.
              Regardless of the technology, the fundamental principles of inputs, processing, and
              outputs remain the same.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Control system building blocks">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Input devices:</strong> push buttons, limit switches, proximity sensors,
                thermostats, pressure switches — these detect conditions and provide signals to the
                controller.
              </li>
              <li>
                <strong>Controller/processor:</strong> the PLC, relay logic, or combination that
                processes input signals according to the programme or circuit design.
              </li>
              <li>
                <strong>Output devices:</strong> contactors, solenoid valves, indicator lamps,
                motors, heaters — these carry out the physical actions.
              </li>
              <li>
                <strong>Power supply:</strong> provides the correct voltage for control circuits
                (typically 24 V DC for PLC I/O, 110 V or 230 V AC for relay circuits).
              </li>
              <li>
                <strong>Safety circuits:</strong> emergency stops, guard interlocks, safety relays —
                these override all other functions.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Relay vs PLC control — key differences for maintenance">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Aspect</th>
                    <th className="py-2 pr-4 font-medium text-white">Relay logic</th>
                    <th className="py-2 font-medium text-white">PLC control</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Fault location</td>
                    <td className="py-2 pr-4">Physical components and wiring</td>
                    <td className="py-2">Field devices, wiring, I/O modules or programme</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Diagnosis tools</td>
                    <td className="py-2 pr-4">Multimeter, circuit diagrams</td>
                    <td className="py-2">Multimeter, I/O status display, ladder logic</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Modification</td>
                    <td className="py-2 pr-4">Requires physical rewiring</td>
                    <td className="py-2">Programme change (not maintenance scope)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Documentation</td>
                    <td className="py-2 pr-4">Wiring diagrams, circuit schematics</td>
                    <td className="py-2">Wiring diagrams plus ladder logic printouts</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Fault indication</td>
                    <td className="py-2 pr-4">Physical relay position, indicator lamps</td>
                    <td className="py-2">I/O LED status, fault codes, HMI messages</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> understanding the architecture before diving into testing
              prevents wasted time. Spend a few minutes reviewing the drawings and understanding how
              the system should work before you start measuring voltages.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Reading ladder logic and circuit diagrams</ContentEyebrow>

          <ConceptBlock title="Reading ladder logic and circuit diagrams">
            <p>
              The ability to read control circuit diagrams and ladder logic is essential for
              systematic troubleshooting. Without this skill, you are reduced to random testing —
              which is time-consuming, unreliable, and does not demonstrate competence. In the EPA,
              you will be provided with drawings and expected to use them effectively.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Ladder logic fundamentals">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rungs:</strong> each horizontal line represents one control function — like
                a sentence in the control story.
              </li>
              <li>
                <strong>NO contact (| |):</strong> normally open — must be activated (TRUE) for
                current to flow through.
              </li>
              <li>
                <strong>NC contact (|/|):</strong> normally closed — current flows until the
                condition is activated, then it opens.
              </li>
              <li>
                <strong>Coil ( ):</strong> the output — energised when all conditions in the rung
                are met.
              </li>
              <li>
                <strong>Series contacts:</strong> AND logic — all must be true for the rung to
                energise.
              </li>
              <li>
                <strong>Parallel contacts:</strong> OR logic — any one being true energises the
                rung.
              </li>
              <li>
                <strong>Timers/counters:</strong> add time delays or counting functions to the
                control logic.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Tracing a fault using ladder logic">
            <p>
              When a PLC output is not energising, look at the corresponding rung in the ladder
              logic. Identify each input condition on that rung. Using the PLC&apos;s I/O status
              display, check which conditions are met and which are not. The unmet condition is
              either the correct state (e.g., a guard interlock correctly preventing operation) or a
              fault (e.g., a sensor not detecting when it should). This narrows the fault to a
              specific input device, which you then test physically.
            </p>
            <p>
              When reading circuit diagrams for relay-based systems, the same principle applies but
              the tools are different. You trace the circuit on paper, identifying each contact and
              component in the current path. Then you use a multimeter to verify the actual state of
              each component matches the expected state. Where the actual and expected states
              differ, you have found the fault area.
            </p>
            <p>
              <strong>Key point:</strong> practise reading ladder logic diagrams before the EPA. The
              more familiar you are with the symbols and logic, the faster you can trace faults
              during the assessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Systematic signal tracing</ContentEyebrow>

          <ConceptBlock title="Systematic signal tracing">
            <p>
              Signal tracing is the practical technique of following the electrical signal path
              through a control circuit, measuring voltages at each point to find where the signal
              is lost. This is the core troubleshooting skill for both relay and PLC-based systems,
              and it is what the assessor is primarily looking for during the EPA.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Signal tracing procedure">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Start at the supply:</strong> confirm the control circuit power supply is
                present and at the correct voltage.
              </li>
              <li>
                <strong>Identify the output:</strong> which output device is not operating? This is
                your endpoint.
              </li>
              <li>
                <strong>Trace forward:</strong> from the supply, measure voltage at each connection
                point along the control path.
              </li>
              <li>
                <strong>Find the dropout:</strong> where the expected voltage disappears is the
                fault area.
              </li>
              <li>
                <strong>Investigate:</strong> check the component or connection at the dropout
                point.
              </li>
              <li>
                <strong>Verify:</strong> after repair, confirm the signal path is complete and the
                output operates.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Common control circuit faults">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Blown control fuse:</strong> no supply to the entire control circuit — check
                the control transformer secondary fuse.
              </li>
              <li>
                <strong>Failed relay coil:</strong> voltage present at the coil but no mechanical
                operation — measure coil resistance.
              </li>
              <li>
                <strong>Worn relay contacts:</strong> relay operates but the contact does not make —
                check contact condition.
              </li>
              <li>
                <strong>Loose terminal:</strong> intermittent or high-resistance connection — check
                and re-torque.
              </li>
              <li>
                <strong>Broken conductor:</strong> open circuit in the wiring — continuity test
                end-to-end.
              </li>
              <li>
                <strong>Failed sensor:</strong> no output signal despite the target being present —
                check supply and alignment.
              </li>
              <li>
                <strong>Corroded connections:</strong> high resistance causing voltage drop — clean
                and re-terminate.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> during signal tracing, explain to the assessor what
              voltage you expect at each point and what the actual reading tells you. This
              demonstrates that you understand the circuit, not just that you can operate a
              multimeter.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Motor starter and contactor diagnostics</ContentEyebrow>

          <ConceptBlock title="Motor starter and contactor diagnostics">
            <p>
              Motor control circuits are among the most common control systems you will encounter in
              maintenance work and the EPA. Understanding DOL (direct on-line), star-delta, and soft
              starter circuits allows you to diagnose faults efficiently. The key is understanding
              how the control circuit governs the power circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock title="DOL starter fault diagnosis">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motor will not start:</strong> check control supply, start button, safety
                interlocks, overload reset, contactor coil.
              </li>
              <li>
                <strong>Motor starts but will not hold:</strong> check the hold-on auxiliary contact
                — is it making? Check for voltage drop.
              </li>
              <li>
                <strong>Overload trips immediately:</strong> check motor current, mechanical
                binding, overload setting, thermal element.
              </li>
              <li>
                <strong>Contactor chatters:</strong> low coil voltage, intermittent control circuit,
                failing coil.
              </li>
              <li>
                <strong>Motor runs in wrong direction:</strong> two phases swapped — check at the
                contactor output terminals.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Safety: never bypass safety devices"
            whatHappens={
              <>
                During troubleshooting, you may be tempted to bypass safety interlocks, overloads,
                or emergency stops to test if the system operates. This is never acceptable — in the
                workplace it creates a serious safety hazard, and in the EPA it is an automatic
                fail.
              </>
            }
            doInstead={
              <>Always diagnose by testing the safety device itself, not by bypassing it.</>
            }
          />

          <ConceptBlock title="Star-delta starter troubleshooting">
            <p>
              Star-delta starters use a timed changeover between star and delta configurations to
              reduce starting current. Understanding the sequence is essential for diagnosis: the
              main and star contactors energise first, the timer runs, the star contactor drops out,
              and the delta contactor pulls in.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fails to start in star:</strong> check main and star contactor control
                circuits, interlocks, and the timer enable signal.
              </li>
              <li>
                <strong>Does not change to delta:</strong> check timer operation, delta contactor
                coil supply, and changeover auxiliary contacts.
              </li>
              <li>
                <strong>Trips during changeover:</strong> check the changeover timing (typically
                5-15 seconds), and that both star and delta contactors are not energising
                simultaneously.
              </li>
              <li>
                <strong>Mechanical interlock:</strong> star and delta contactors must be
                mechanically interlocked to prevent simultaneous operation — check the interlock
                mechanism.
              </li>
            </ul>
          </ConceptBlock>

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>ST1426 link:</strong> control system troubleshooting is a core practical
            competence in the MOET standard. The EPA practical observation will include control
            system fault diagnosis, assessed on your systematic approach, safe working, use of
            drawings, and clear communication.
          </p>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Communicating your diagnostic process</ContentEyebrow>

          <ConceptBlock title="Communicating your diagnostic process">
            <p>
              In the EPA, the assessor cannot see what is happening inside your head. If you work in
              silence, they can only assess the outcome — not the reasoning that led to it.
              Explaining your diagnostic process as you work is the single most effective way to
              demonstrate control system competence and achieve higher grades.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What to communicate during diagnosis">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Your hypothesis:</strong> &quot;Based on the symptoms, I suspect the input
                sensor is not detecting — I will check the PLC I/O status first.&quot;
              </li>
              <li>
                <strong>What you are testing:</strong> &quot;I am measuring the supply voltage at
                the sensor terminals to confirm it is receiving 24 V DC.&quot;
              </li>
              <li>
                <strong>Expected vs actual:</strong> &quot;I expected 24 V here but I am reading 0
                V, which tells me the fault is upstream of this point.&quot;
              </li>
              <li>
                <strong>Your reasoning:</strong> &quot;Because the PLC input LED is off, the fault
                is likely in the field wiring or sensor rather than the PLC itself.&quot;
              </li>
              <li>
                <strong>Safety awareness:</strong> &quot;Before I open the panel, I need to confirm
                whether the control circuit is at 24 V DC or 230 V AC.&quot;
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common mistakes when communicating">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Working in silence:</strong> the assessor cannot give credit for reasoning
                they cannot observe.
              </li>
              <li>
                <strong>Over-narrating:</strong> describing every hand movement is distracting —
                explain your thinking, not your physical actions.
              </li>
              <li>
                <strong>Using jargon incorrectly:</strong> use technical terms accurately — misusing
                terminology suggests gaps in understanding.
              </li>
              <li>
                <strong>Not explaining changes of plan:</strong> if your first hypothesis is wrong,
                explain why you are changing approach.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Practise speaking while working">
            <p>
              Explaining your work while performing it is a skill that requires practice. In your
              workplace, start explaining your diagnostic reasoning to a colleague or supervisor as
              you troubleshoot real faults. This builds the habit so it feels natural during the EPA
              rather than forced or awkward. Ask your training provider to include communication
              practice in your mock assessments.
            </p>
          </ConceptBlock>

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>ST1426 link:</strong> communication is a key differentiator between pass and
            distinction grades. A candidate who diagnoses a fault correctly in silence may achieve a
            pass. A candidate who diagnoses the same fault while clearly explaining their reasoning,
            referencing drawings, and demonstrating safety awareness throughout is far more likely
            to achieve a distinction.
          </p>

          <ConceptBlock title="Quick reference — control system troubleshooting">
            <p>
              <strong>Systematic approach:</strong> review drawings before testing; check power
              supply first; use PLC I/O status display; trace signals from supply to output; test
              one variable at a time; verify the repair before sign-off.
            </p>
            <p>
              <strong>Key safety rules:</strong> never bypass safety interlocks; check control
              voltage before touching; remove all PLC forces after testing; clear area before
              forcing outputs; use GS38-compliant test equipment; safe isolate before any physical
              work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Understand the architecture before testing — relay, PLC, or hybrid — and review drawings first.',
              'Read ladder logic to find the stuck rung, then test physically the input or output that condition points to.',
              'Signal tracing: measure voltage stage by stage until the expected reading disappears — that is the fault area.',
              'Never bypass a safety interlock, overload or emergency stop to test whether a system operates.',
              'Explain your hypothesis, what you are testing, and expected vs actual readings as you work.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Control Systems" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Component Replacement and Repair
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Completing Work to Industry Standards
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section2_4;
