/**
 * MOET · Module 5 · Section 2 · Subsection 4 — Timers, Counters and Sequencing
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
 *   Knowledge  · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *              · "Electrical. Functions and applications of electrical
 *                 circuits."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * No GS38, thermography ΔT, test-interval or C&G-qualification claims appear
 * on this page.
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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Timers, Counters and Sequencing - MOET Module 5 Section 2.4';
const DESCRIPTION =
  'Comprehensive guide to PLC timers, counters and sequential control for electrical maintenance technicians. TON, TOF, TP timers, CTU/CTD counters, GRAFCET and sequencer design. IEC 61131-3 and ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'timer-ton',
    question: 'What does a TON (Timer On-Delay) instruction do?',
    options: [
      'Turns the output ON immediately and OFF after the preset time',
      'Counts the number of input pulses received',
      'Delays turning the output ON for a preset time after the input becomes TRUE',
      'Generates a fixed-frequency pulse output continuously',
    ],
    correctIndex: 2,
    explanation:
      'A TON starts timing when its input (enable) becomes TRUE. After the preset time elapses, the done bit turns ON. If the input goes FALSE before the preset is reached, the timer resets to zero. This is the most common timer type in industrial PLC programmes.',
  },
  {
    id: 'counter-ctu',
    question: 'How does a CTU (Count Up) counter increment its value?',
    options: [
      'By one each time the count input transitions from FALSE to TRUE (rising edge)',
      'By one for every PLC scan cycle while the count input is held TRUE',
      'Continuously in proportion to the analogue value at the count input',
      'By one each time the reset input is activated by the operator',
    ],
    correctIndex: 0,
    explanation:
      'A CTU increments its accumulated value by one on each rising edge (FALSE-to-TRUE transition) of the count input. When the accumulated value reaches the preset, the done bit turns ON. A separate reset input returns the accumulated value to zero.',
  },
  {
    id: 'sequencer-purpose',
    question: 'What is the main purpose of a sequencer in PLC programming?',
    options: [
      'Convert an analogue sensor input into a scaled engineering value',
      'Control a process that must follow defined steps in a fixed order with transition conditions',
      'Provide overcurrent protection for the PLC output modules',
      'Generate a continuous fixed-frequency clock pulse for timing',
    ],
    correctIndex: 1,
    explanation:
      'A sequencer controls a process that executes steps in a defined order, with transitions between steps triggered by specific conditions (sensor signals, timer completion, operator input). Examples include packaging machines, conveyor sorting systems, and batch mixing processes.',
  },
  {
    id: 'retentive-timer',
    question: 'How does a retentive timer differ from a standard TON timer?',
    options: [
      'A retentive timer counts down from its preset rather than up from zero',
      'A retentive timer remembers its accumulated time if the input goes FALSE, resuming when TRUE returns',
      'A retentive timer can only be used with high-speed counter inputs',
      'A retentive timer resets automatically every PLC scan cycle',
    ],
    correctIndex: 1,
    explanation:
      'A retentive timer (TONR) retains its accumulated value when the input goes FALSE. Timing resumes from where it left off when the input returns TRUE. This is useful for tracking total run-time across intermittent operation. A separate reset instruction is required to clear the accumulated value.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A TOF (Timer Off-Delay) keeps an output ON for:',
    options: [
      'A preset time before the input becomes TRUE',
      'A preset time after the input goes FALSE',
      'The exact duration the input is held TRUE',
      'An unlimited time until manually reset',
    ],
    correctAnswer: 1,
    explanation:
      'A TOF starts timing when the input goes FALSE. The output remains ON during the timing period and turns OFF when the preset elapses. Common application: cooling fan run-on after a motor stops to allow heat dissipation.',
  },
  {
    id: 2,
    question: 'The time base of a PLC timer determines:',
    options: [
      'The maximum number of outputs the timer can control',
      'The maximum number of timers that can run simultaneously',
      'The resolution — for example, 1 ms, 10 ms, 100 ms or 1 s per count increment',
      'The voltage level of the timer output signal',
    ],
    correctAnswer: 2,
    explanation:
      'The time base sets the timer resolution. A 100 ms base means each count increment represents 100 ms, so a preset of 50 gives 5 seconds. Faster time bases provide greater precision; slower bases allow longer delays without large preset values.',
  },
  {
    id: 3,
    question: 'A TP (Timer Pulse) instruction produces:',
    options: [
      'A delayed OFF output after the input goes FALSE',
      'Continuous oscillation at a fixed frequency',
      'A retentive time accumulation across multiple activations',
      'A single pulse of fixed duration regardless of how long the input is held',
    ],
    correctAnswer: 3,
    explanation:
      'A TP generates a single pulse of preset duration on the rising edge of the input. The pulse runs to completion even if the input goes FALSE before the preset time. Used for fixed-duration operations such as solenoid activation pulses.',
  },
  {
    id: 4,
    question: 'A CTD (Count Down) counter starts counting from:',
    options: [
      'The preset value, decrementing towards zero',
      'Zero, incrementing upwards',
      'The maximum integer value of the PLC data type',
      'Always from 100 regardless of configuration',
    ],
    correctAnswer: 0,
    explanation:
      'A CTD loads the preset value and decrements by one on each count pulse. The done bit turns ON when the accumulated value reaches zero. Used for dispensing fixed quantities, batch counting remaining items, and cycle-limited operations.',
  },
  {
    id: 5,
    question: 'In a sequential programme, the transition from Step 3 to Step 4 occurs when:',
    options: [
      'The PLC scan cycle naturally reaches Step 4 in the programme',
      'The transition condition between the two steps evaluates to TRUE',
      'The operator presses any button on the control panel',
      'A fixed universal time delay expires between all steps',
    ],
    correctAnswer: 1,
    explanation:
      'Transitions are controlled by specific defined conditions. The active step remains active until its transition condition is satisfied. Conditions can include sensor signals, timer done bits, counter targets, operator inputs, or logical combinations of these.',
  },
  {
    id: 6,
    question: 'The difference between the accumulated value and the preset value in a timer is:',
    options: [
      'The preset is the current elapsed time, while the accumulated value is the fixed target set by the programmer',
      'The accumulated value is the time base resolution, while the preset is the number of scan cycles completed',
      'The preset is the target time; the accumulated is the current elapsed time counting towards that target',
      'Both values are always identical, because the timer copies the preset into the accumulated register on every scan',
    ],
    correctAnswer: 2,
    explanation:
      'The preset (PV/PT) is the target value set by the programmer. The accumulated (CV/ET) is the current elapsed time since the timer started. When the accumulated reaches the preset, the done bit turns ON. The accumulated resets to zero when a non-retentive timer resets.',
  },
  {
    id: 7,
    question: 'Cascaded timers are used when:',
    options: [
      'Faster timing resolution is needed for high-speed processes',
      'Multiple motors need to start with the same delay',
      'Counting and timing must occur simultaneously on the same signal',
      'The total required delay exceeds the maximum value of a single timer instruction',
    ],
    correctAnswer: 3,
    explanation:
      "Cascading connects one timer's done bit to the next timer's enable input. The total delay equals the sum of all presets in the cascade. This technique is used when the required delay exceeds the maximum value a single timer can represent.",
  },
  {
    id: 8,
    question:
      'For counting bottles passing a photoelectric sensor on a conveyor, the correct instruction is:',
    options: [
      'A CTU counter with the sensor signal connected as the count input',
      'A TOF timer holding the output after each bottle passes',
      'A TON timer measuring the duration between bottles',
      'An analogue input scaling the sensor output to a count value',
    ],
    correctAnswer: 0,
    explanation:
      'A CTU counter with the photoelectric sensor as the count input increments by one each time a bottle breaks and remakes the beam (rising edge). The done bit triggers the next operation (e.g., box closure) when the batch preset count is reached.',
  },
  {
    id: 9,
    question: 'A GRAFCET diagram is:',
    options: [
      'An electrical wiring diagram showing cable routes and terminal numbers',
      'A graphical method for designing sequential control processes, standardised in IEC 60848',
      'A PLC memory allocation chart showing address ranges',
      'A calibration record format for instruments and sensors',
    ],
    correctAnswer: 1,
    explanation:
      'GRAFCET (IEC 60848) defines steps, transitions, actions, and control flow graphically. It is widely used to design and document sequential programmes before coding in ladder logic, structured text, or SFC. It provides a clear, unambiguous representation of the intended sequence.',
  },
  {
    id: 10,
    question: 'A timer that is not reaching its preset is most likely caused by:',
    options: [
      'A corrupt timer instruction that needs to be deleted and re-entered',
      'A short circuit on the output module driven by the timer',
      'The enable input going FALSE before the preset is reached, causing the timer to reset',
      'The PLC system clock running slower than its specification',
    ],
    correctAnswer: 2,
    explanation:
      'For non-retentive timers (TON), if the enable input goes FALSE before the preset is reached, the accumulated value resets to zero. Check via online monitoring for intermittent input dropout — the input may be flickering due to a loose connection or noisy sensor signal.',
  },
  {
    id: 11,
    question: 'A high-speed counter (HSC) differs from a standard counter because it:',
    options: [
      'Counts only on the falling edge of the input signal rather than the rising edge',
      'Can count up but is unable to count down or be reset by the programme',
      'Relies entirely on the normal scan cycle but uses a faster internal system clock',
      'Counts input pulses via dedicated hardware, independent of the PLC scan cycle',
    ],
    correctAnswer: 3,
    explanation:
      'High-speed counters use dedicated hardware inputs that count independently of the scan cycle. Standard counters can miss pulses that occur faster than the scan time. HSCs are essential for encoder feedback, flow meter pulses, and any application with pulse rates exceeding the scan frequency.',
  },
  {
    id: 12,
    question: 'Under ST1426, timers and counters are important because:',
    options: [
      'They form the basis of most automated sequences and process control in industrial machinery',
      'They are only found in domestic heating control systems',
      'They are only used in robotic applications that maintenance does not service',
      'They are not relevant to electrical maintenance technicians',
    ],
    correctAnswer: 0,
    explanation:
      'Timers and counters are fundamental building blocks in virtually every automated process. Maintenance technicians encounter them daily in motor start delays, batch counting, cooling fan run-on, sequential operations, and production monitoring. Understanding their operation is essential for efficient fault diagnosis.',
  },
];

const faqs = [
  {
    question: "How do I find a timer's time base in different PLC brands?",
    answer:
      'Check the timer instruction properties in the programming software. Siemens S7-1200/1500 uses TIME data type (1 ms resolution). Allen-Bradley CompactLogix/ControlLogix uses a 1 ms base by default. Mitsubishi FX series has dedicated timer types (T for 100 ms, ST for 10 ms). Older Siemens S5 uses S5TIME with selectable bases (10 ms, 100 ms, 1 s, 10 s). The project documentation should also specify timer configurations.',
  },
  {
    question: 'Can a timer and counter share the same number in a PLC?',
    answer:
      'This depends on the PLC manufacturer and model. Older Mitsubishi FX series PLCs share memory between timers and counters, so T0 and C0 cannot both be used — they would conflict. Modern PLCs (Siemens S7-1200, Allen-Bradley CompactLogix) use separate data blocks or tags for each instruction, so there is no possibility of conflict. Always check the hardware manual for your specific PLC model.',
  },
  {
    question: 'What is the maximum duration a PLC timer can handle?',
    answer:
      'This varies by PLC model and data type. A 16-bit timer with a 1-second time base can count up to 32,767 seconds (approximately 9 hours). For longer durations, use retentive timers, cascade multiple timers, or programme a counter that counts minutes or hours using a 1-minute timer pulse. Always check the hardware manual for maximum values and consider using DINT (32-bit) timer data types where available.',
  },
  {
    question: 'How do I troubleshoot a counter that is not counting correctly?',
    answer:
      'Systematic checks: (1) Is the count input signal clean — noisy or bouncing signals cause double-counting or missed counts. (2) Is the input transitioning cleanly with definite edges — counters count edges, not levels. (3) Has the counter been inadvertently reset by another part of the programme — use cross-referencing to check. (4) Has the counter overflowed past its maximum integer value. (5) Is the pulse rate exceeding the scan time — if so, a high-speed counter input is needed.',
  },
  {
    question: 'What is the difference between SFC and GRAFCET?',
    answer:
      'GRAFCET (IEC 60848) is a design methodology — a graphical specification and documentation tool for sequential processes. SFC (Sequential Function Chart, part of IEC 61131-3) is a PLC programming language that implements the concepts of GRAFCET in actual PLC code. You design the sequence using GRAFCET notation, then implement it in SFC (or translate it into ladder logic or structured text). GRAFCET defines what the sequence should do; SFC is how you programme it.',
  },
];

const MOETModule5Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.2 · Subsection 4"
        title="Timers, Counters and Sequencing"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Programming timers, counters and sequential control operations in industrial PLC systems
            — the building blocks behind almost every automated sequence you will maintain.
          </p>

          <TLDR
            points={[
              'TON: Delays output ON by preset time after enable.',
              'TOF: Keeps output ON for preset time after input goes OFF.',
              'CTU/CTD: Count up/down on rising edge of count input.',
              'Sequencer: Step-by-step control with transition conditions.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain TON, TOF and TP timer operations and their industrial applications',
              'Configure CTU and CTD counters for production counting and batch control',
              'Distinguish between retentive and non-retentive timer behaviour',
              'Design basic sequential control using step-transition logic and GRAFCET',
              'Diagnose timer and counter faults using online monitoring techniques',
              'Apply cascaded timers and high-speed counters for advanced applications',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Diagnosis:</strong> Check accumulated vs preset values via online
                monitoring.
              </li>
              <li>
                <strong>Run-time tracking:</strong> Retentive timers for maintenance scheduling.
              </li>
              <li>
                <strong>Batch control:</strong> Counters for production counting and dispensing.
              </li>
              <li>
                <strong>ST1426:</strong> Understand automated sequences for fault diagnosis.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>PLC timer instructions</ContentEyebrow>

          <ConceptBlock title="Every automated machine uses timers">
            <p>
              Timers are among the most frequently used PLC instructions, controlling delays, pulse
              durations, and timed sequences throughout industrial processes. Every automated
              machine uses timers — from simple motor start delays to complex multi-stage process
              timing. Understanding how each timer type works is essential for diagnosing why a
              machine is not advancing, why an output stays on too long, or why a sequence is stuck.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Timer types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Timer</th>
                    <th className="py-2 pr-4 font-medium text-white">Function</th>
                    <th className="py-2 pr-4 font-medium text-white">Reset behaviour</th>
                    <th className="py-2 font-medium text-white">Typical application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">TON</td>
                    <td className="py-2 pr-4">Output ON after preset; resets when input FALSE</td>
                    <td className="py-2 pr-4">Non-retentive (resets to zero)</td>
                    <td className="py-2">Motor start delay, debounce</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">TOF</td>
                    <td className="py-2 pr-4">Output stays ON for preset time after input FALSE</td>
                    <td className="py-2 pr-4">Non-retentive</td>
                    <td className="py-2">Cooling fan run-on, light delay</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">TP</td>
                    <td className="py-2 pr-4">Fixed-duration pulse on rising edge</td>
                    <td className="py-2 pr-4">Runs to completion</td>
                    <td className="py-2">Solenoid pulse, signal shaping</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">TONR</td>
                    <td className="py-2 pr-4">Accumulates time; retains when input FALSE</td>
                    <td className="py-2 pr-4">Retentive (requires explicit reset)</td>
                    <td className="py-2">Total run-time, maintenance alerts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Timer data structure">
            <p>
              Every timer instruction has the same fundamental data elements, regardless of PLC
              brand:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Preset (PT/PV):</strong> The target time value set by the programmer — the
                duration before the done bit activates.
              </li>
              <li>
                <strong>Elapsed (ET/CV):</strong> The current elapsed time since the timer started
                counting — this increments while the timer is running.
              </li>
              <li>
                <strong>Done bit (Q/DN):</strong> Turns ON when the elapsed time reaches the preset
                — this is the output used in programme logic.
              </li>
              <li>
                <strong>Enable (IN/EN):</strong> The input that starts timing — the timer runs while
                this is TRUE (for TON/TONR).
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When diagnosing a timer issue online, check the
              elapsed value (ET) against the preset (PT). If ET is counting but never reaches PT,
              the enable input is dropping out before completion. If ET stays at zero, the enable
              input is never going TRUE. If ET has reached PT but the expected action has not
              occurred, the done bit may be blocked by downstream logic.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Counter instructions</ContentEyebrow>

          <ConceptBlock title="Tracking discrete events, not duration">
            <p>
              Counters track discrete events — sensor pulses, machine cycles, products produced,
              parts dispensed. Unlike timers which measure duration, counters respond to signal
              transitions (edges) and increment or decrement their accumulated value by one per
              event. They are fundamental to batch control, production monitoring, and any
              application that requires a specific number of events before the next action.
            </p>
          </ConceptBlock>

          <ConceptBlock title="CTU — Count Up">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Starts at zero, increments by one on each rising edge.</li>
              <li>Done bit turns ON when accumulated reaches preset.</li>
              <li>Reset input clears accumulated to zero.</li>
              <li>Continues counting past preset unless reset.</li>
              <li>Example: counting bottles into a box.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="CTD — Count Down">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Starts at preset value, decrements on each pulse.</li>
              <li>Done bit turns ON when accumulated reaches zero.</li>
              <li>Load input resets accumulated to preset value.</li>
              <li>Useful for &quot;remaining items&quot; displays.</li>
              <li>Example: dispensing a fixed quantity of fasteners.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="CTUD — bidirectional counter">
            <p>
              A CTUD (Count Up/Down) has separate count-up and count-down inputs and can track both
              additions and removals. This is useful for:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Tracking items entering and leaving a buffer zone on a conveyor.</li>
              <li>
                Monitoring parking space availability (entry sensor counts up, exit counts down).
              </li>
              <li>Stock level monitoring in automated warehousing.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Counter input bounce"
            whatHappens={
              <>
                Mechanical switches and some sensors produce contact bounce — multiple rapid
                transitions when they change state. This causes the counter to register multiple
                counts for a single event.
              </>
            }
            doInstead={
              <>
                Use hardware debouncing (RC filter on the input), sensors with clean electronic
                outputs (e.g. photoelectric rather than mechanical), or a software debounce timer
                before the counter input. Always verify the count accuracy during commissioning.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Sequential control and GRAFCET</ContentEyebrow>

          <ConceptBlock title="Fixed sequences need step-by-step control">
            <p>
              Many industrial processes follow fixed sequences: fill a vessel, heat to temperature,
              mix for a duration, cool, drain, and repeat. Sequential programmes manage these
              step-by-step operations, ensuring each action occurs in the correct order and only
              when the previous step has completed successfully. Understanding sequential control is
              essential for diagnosing &quot;stuck machine&quot; faults — the most common complaint
              in automated manufacturing.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Elements of sequential control">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steps:</strong> Each step represents a state of the machine with specific
                outputs active and actions being performed.
              </li>
              <li>
                <strong>Transitions:</strong> Conditions that must be satisfied to advance from one
                step to the next.
              </li>
              <li>
                <strong>Actions:</strong> The outputs and operations associated with each step (e.g.
                open valve, start motor, energise heater).
              </li>
              <li>
                <strong>Initial step:</strong> The starting point of the sequence after reset or
                power-up — typically an &quot;idle&quot; or &quot;home position&quot; state.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Implementation methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bit-based (flag method):</strong> Uses individual memory bits (M-bits) as
                step flags. Only one step bit is active at any time. The transition logic sets the
                next step bit and resets the current one.
              </li>
              <li>
                <strong>Integer-based (step register):</strong> A single integer variable holds the
                current step number. Transition logic increments (or sets) the step number. CASE or
                comparison instructions select the active step&apos;s outputs.
              </li>
              <li>
                <strong>SFC (Sequential Function Chart):</strong> A dedicated IEC 61131-3 graphical
                programming language purpose-built for sequential control. Steps and transitions are
                drawn graphically; actions within each step can be written in any IEC language.
              </li>
              <li>
                <strong>GRAFCET (IEC 60848):</strong> A design methodology and documentation
                standard for sequential processes. Used to design the sequence before coding.
                GRAFCET diagrams define steps, transitions, parallel branches (simultaneous
                sequences), and selection branches (alternative paths).
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When a machine is stuck and not advancing to the
              next step, identify the active step (check step flags or the step register value
              online) and then examine the transition condition for that step. The machine is
              waiting for that specific condition to become TRUE. The fault is almost always in the
              field — a sensor not detecting, a limit switch not reaching, or a process condition
              not being met.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Practical fault diagnosis</ContentEyebrow>

          <ConceptBlock title="The programming software already has the tools you need">
            <p>
              Efficient diagnosis of timer, counter, and sequencer faults directly reduces
              maintenance response time and improves plant availability. The PLC programming
              software provides all the tools needed — online monitoring, watch tables, and
              cross-referencing — to systematically identify why a timed or counted operation is not
              behaving as expected.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common timer faults">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Timer not reaching preset (enable input intermittent).</li>
              <li>Timer reaching preset but output not activating (downstream logic blocking).</li>
              <li>Timer running too fast or slow (wrong time base configured).</li>
              <li>Retentive timer never resetting (reset condition not met).</li>
              <li>Timer preset changed by HMI to incorrect value.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common counter faults">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Counter double-counting (input bounce or noise).</li>
              <li>Counter missing counts (pulse rate exceeds scan time).</li>
              <li>Counter not resetting (reset logic fault or timing).</li>
              <li>Counter overflowing past maximum integer value.</li>
              <li>Incorrect preset value loaded by operator.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Online diagnosis steps">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1.</strong> Go online and navigate to the timer or counter instruction in
                the programme.
              </li>
              <li>
                <strong>2.</strong> Check the accumulated value (ET/CV) — is it counting? Is it
                stuck at zero? Has it reached the preset?
              </li>
              <li>
                <strong>3.</strong> Verify the enable/count input is stable — watch for flickering
                or intermittent dropout.
              </li>
              <li>
                <strong>4.</strong> Check the done bit status — if it is ON, follow the logic
                downstream to find why the expected action is not happening.
              </li>
              <li>
                <strong>5.</strong> Verify the reset condition — use cross-referencing to find what
                resets the timer/counter and check if it is activating unexpectedly.
              </li>
              <li>
                <strong>6.</strong> Compare the preset value with documentation — it may have been
                changed by an operator or during previous maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Advanced timer and counter applications</ContentEyebrow>

          <ConceptBlock title="Combining basic instructions into complex behaviour">
            <p>
              Beyond basic timing and counting, these instructions are combined in sophisticated
              ways to create complex automated behaviour. Understanding these advanced patterns
              helps you diagnose more complex faults and appreciate why machines behave the way they
              do.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cascaded timers">
            <p>
              When the required delay exceeds the maximum value of a single timer, multiple timers
              are cascaded — the done bit of one timer enables the next. The total delay is the sum
              of all presets.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Timer 1: 30,000 seconds (done bit enables Timer 2).</li>
              <li>Timer 2: 6,000 seconds (total = 36,000 seconds = 10 hours).</li>
              <li>Also used to create multiple timed events within one operation.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Oscillating timer (flasher)">
            <p>
              Two TON timers can be cross-connected to create an oscillating output (flasher). Timer
              1&apos;s done bit enables Timer 2 and resets Timer 1. Timer 2&apos;s done bit resets
              Timer 2 and restarts Timer 1. The result is a continuously toggling output with
              independently adjustable ON and OFF periods.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Used for warning beacons, intermittent lubrication, and cyclic operations.</li>
              <li>ON time and OFF time can be set independently via the two presets.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="High-speed counters">
            <p>
              Standard PLC counters are limited by the scan cycle — if pulses arrive faster than the
              scan time, counts are missed. High-speed counter (HSC) inputs use dedicated hardware
              that counts independently:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Encoder feedback:</strong> Incremental encoders on motors, conveyors, and
                positioning systems.
              </li>
              <li>
                <strong>Flow measurement:</strong> Turbine flow meters generating pulses
                proportional to flow rate.
              </li>
              <li>
                <strong>Frequency measurement:</strong> Converting pulse frequency to speed or rate
                values.
              </li>
              <li>Typical HSC capability: 10 kHz to 200 kHz depending on PLC model.</li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians are expected to understand the operation of
              timers, counters, and sequential control as used in industrial automation. This
              includes diagnosing faults in timed and counted operations, understanding sequence
              progression, and using online monitoring to identify stuck steps and failed
              transitions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=RwSga-zQy0I"

            title="Time Delay Relays Explained"

            channel="The Engineering Mindset"

            duration="12:29"

            topic="On-delay and off-delay timing, in hardware"

            caption="The hardware ancestor of the PLC timer instruction. Seeing the mechanical version makes on-delay versus off-delay much harder to mix up."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'TON delays turning ON after enable; TOF delays turning OFF after the input drops; TP fires a fixed pulse regardless of how long the input is held; TONR is retentive and needs an explicit reset.',
              'A timer has a preset (the target), an elapsed/accumulated value (progress so far) and a done bit (fires when elapsed reaches preset) — check all three online before condemning a timer.',
              'CTU counts up on a rising edge to a preset; CTD counts down from a preset to zero; CTUD tracks both additions and removals with separate up/down inputs.',
              'Contact bounce causes a counter to register multiple counts for one event — cure it with hardware debouncing, a clean electronic sensor, or a software debounce timer.',
              'Sequential control needs steps, transitions, actions and an initial step; GRAFCET (IEC 60848) is the design methodology, SFC (IEC 61131-3) is how it gets programmed.',
              "A stuck machine is almost always waiting on its current step's transition condition — find the active step, then check the field device the transition depends on.",
              "Cascaded timers sum their presets to exceed a single timer's maximum; two cross-connected TON timers with independent presets make a flasher with adjustable ON/OFF times.",
              'Standard counters can miss pulses faster than the scan cycle — a high-speed counter (HSC) uses dedicated hardware to count independently, essential for encoders and flow meters.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Ladder Logic Basics
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  PLC Programming Software
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section2_4;
