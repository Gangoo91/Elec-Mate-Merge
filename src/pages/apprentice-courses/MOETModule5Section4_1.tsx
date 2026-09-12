/**
 * MOET · Module 5 · Section 4 · Subsection 1 — Principles of Process Control
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only statements that already appear verbatim in the brief's
 * verified lists for other modules — and that genuinely fit this page's
 * content — are used here.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
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

const TITLE = 'Principles of Process Control - MOET Module 5 Section 4.1';
const DESCRIPTION =
  'Comprehensive guide to process control principles for electrical maintenance technicians: open and closed loop control, feedback systems, feedforward strategies, control modes and industrial applications under ST1426.';

const quickCheckQuestions = [
  {
    id: 'open-vs-closed',
    question: 'What is the fundamental difference between open loop and closed loop control?',
    options: [
      'Open loop is more accurate than closed loop in all situations',
      'Closed loop systems cannot be used in industrial environments',
      'Closed loop uses feedback from the process output to adjust the input; open loop does not',
      'Open loop uses digital signals; closed loop uses analogue signals',
    ],
    correctIndex: 2,
    explanation:
      'The defining characteristic of closed loop control is the feedback path: the process output is measured by a sensor, compared with the desired setpoint, and the error signal is used to adjust the controller output. Open loop control has no feedback — the output is not measured, so the controller cannot compensate for disturbances or changes in the process.',
  },
  {
    id: 'setpoint-error',
    question: "In a closed loop control system, what is the 'error signal'?",
    options: [
      'The difference between the setpoint and the measured process variable',
      'The maximum output the controller can deliver',
      'An alarm triggered when a sensor fails',
      'A fault indication from the controller hardware',
    ],
    correctIndex: 0,
    explanation:
      'The error signal (also called deviation) is the difference between the desired value (setpoint) and the actual measured value (process variable). The controller uses this error signal to determine the corrective action needed. When the error is zero, the process is at setpoint and no correction is required.',
  },
  {
    id: 'feedforward-purpose',
    question: 'What is the main advantage of feedforward control over pure feedback control?',
    options: [
      'It does not require any sensors to be fitted to the process',
      'It can take corrective action before a disturbance affects the process output',
      'It is always cheaper to implement than feedback control',
      'It eliminates the need for a final control element',
    ],
    correctIndex: 1,
    explanation:
      'Feedforward control measures disturbances before they affect the process and takes corrective action in advance. This is its key advantage over pure feedback control, which can only react after the process output has already deviated from setpoint. In practice, feedforward is often combined with feedback to give both anticipatory and corrective control.',
  },
  {
    id: 'control-element',
    question: "Which component in a control loop is the 'final control element'?",
    options: [
      'The sensor that measures the process variable',
      'The controller that calculates the error signal',
      'The transmitter that converts the signal to 4-20 mA',
      'The device that physically adjusts the process, such as a control valve or variable speed drive',
    ],
    correctIndex: 3,
    explanation:
      'The final control element is the device that directly manipulates the process to bring the controlled variable towards setpoint. Common examples include control valves (adjusting flow), variable speed drives (adjusting motor speed), heating elements (adjusting temperature) and dampers (adjusting airflow). It receives the controller output signal and converts it into physical action.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A domestic toaster that runs for a fixed time regardless of bread colour is an example of:',
    options: [
      'Closed loop control with feedback',
      'Open loop control without feedback',
      'Cascade control with two loops',
      'Feedforward control of a disturbance',
    ],
    correctAnswer: 1,
    explanation:
      'A basic toaster runs for a set time with no measurement of the toast colour. This is open loop control — there is no feedback sensor to detect the actual output (toast darkness) and adjust the process accordingly.',
  },
  {
    id: 2,
    question:
      'In a closed loop temperature control system, the sensor measures 48 degrees C and the setpoint is 50 degrees C. The error signal is:',
    options: ['48 degrees C', '-2 degrees C', '+2 degrees C', '50 degrees C'],
    correctAnswer: 2,
    explanation:
      'Error = Setpoint minus Process Variable = 50 - 48 = +2 degrees C. A positive error means the process is below setpoint, so the controller will increase its output to raise the temperature.',
  },
  {
    id: 3,
    question: 'Which of the following is NOT a component of a basic control loop?',
    options: [
      'A sensor or transmitter to measure the process variable',
      'A controller to compare the measurement with the setpoint',
      'A final control element to adjust the process',
      'A programmable logic controller (PLC) in every case',
    ],
    correctAnswer: 3,
    explanation:
      'The three essential components of any control loop are the sensor (measurement), the controller (decision), and the final control element (action). A PLC is one type of controller but is not required in every loop — analogue controllers, DCS systems, and even pneumatic controllers can fulfil the controller role.',
  },
  {
    id: 4,
    question:
      'A thermostat that switches a heater fully on below setpoint and fully off above setpoint is using which control mode?',
    options: [
      'On-off (bang-bang) control',
      'Proportional control',
      'Integral control',
      'Derivative control',
    ],
    correctAnswer: 0,
    explanation:
      'On-off control (also called bang-bang control) is the simplest control mode. The output is either 100% or 0% depending on whether the process variable is below or above setpoint. It is cheap and simple but causes oscillation around the setpoint, with the process variable cycling above and below the desired value.',
  },
  {
    id: 5,
    question: 'In a cascade control arrangement, the output of the primary controller becomes:',
    options: [
      'The measured process variable of the secondary controller',
      'The setpoint for the secondary controller',
      'A direct drive signal to the final control element',
      'The setpoint for the primary controller itself',
    ],
    correctAnswer: 1,
    explanation:
      'In cascade control, the primary (master) controller monitors the main process variable and its output signal becomes the setpoint for the secondary (slave) controller. The secondary controller then manipulates the final control element. This arrangement improves response to disturbances that affect the secondary loop.',
  },
  {
    id: 6,
    question:
      'A 4-20 mA signal representing 0-100% of a process variable has a current reading of 12 mA. What percentage does this represent?',
    options: ['30%', '60%', '50%', '75%'],
    correctAnswer: 2,
    explanation:
      'The 4-20 mA range spans 16 mA (20 - 4 = 16). At 12 mA, the signal is 8 mA above the zero (12 - 4 = 8). Percentage = (8 / 16) x 100 = 50%. This standard signal range is used because a live zero of 4 mA allows detection of cable breaks (0 mA indicates a fault, not a zero reading).',
  },
  {
    id: 7,
    question: "What does 'dead time' mean in process control?",
    options: [
      'The period when the controller is switched to manual mode',
      'The time taken for the process to reach 63% of its final value',
      'The interval between scheduled calibration checks',
      'The delay between a change in controller output and the first measurable effect on the process variable',
    ],
    correctAnswer: 3,
    explanation:
      'Dead time (also called transport delay or pure delay) is the time elapsed between a change being made at the final control element and the sensor first detecting a change in the process variable. It is caused by physical transport of material or energy through the process and cannot be eliminated — it can only be compensated for in the controller tuning.',
  },
  {
    id: 8,
    question: 'Which control strategy measures a disturbance before it affects the process output?',
    options: ['Feedforward control', 'Manual control', 'Feedback control', 'On-off control'],
    correctAnswer: 0,
    explanation:
      'Feedforward control measures the disturbance variable directly and takes corrective action before the disturbance reaches the process output. For example, in a heat exchanger, a feedforward system might measure the incoming fluid temperature and adjust the steam valve before the outlet temperature changes.',
  },
  {
    id: 9,
    question: "The 'process variable' in a control loop is:",
    options: [
      'The desired target value the operator enters into the controller',
      'The actual measured value of the controlled condition',
      'The output signal sent to the final control element',
      'The difference between the setpoint and the measurement',
    ],
    correctAnswer: 1,
    explanation:
      'The process variable (PV) is the actual, measured value of the condition being controlled — for example, the actual temperature, pressure, flow rate or level in the process. It is measured by the sensor and fed back to the controller for comparison with the setpoint.',
  },
  {
    id: 10,
    question: 'Why is the 4-20 mA standard preferred over 0-20 mA for industrial process signals?',
    options: [
      'It carries twice as much power to drive the final control element',
      'It allows a higher maximum current for greater measurement range',
      'The live zero at 4 mA allows differentiation between a true zero reading and a cable fault',
      'It is immune to all forms of electrical interference unlike 0-20 mA',
    ],
    correctAnswer: 2,
    explanation:
      "With 4-20 mA, a reading of 0 mA is never a valid signal — it always indicates a fault such as a broken cable, loose connection or failed transmitter. With 0-20 mA, a zero reading could mean either a genuine zero process value or a fault, making fault detection impossible. This 'live zero' principle is fundamental to industrial instrumentation safety.",
  },
  {
    id: 11,
    question: 'In ratio control, the controller maintains:',
    options: [
      'A constant process variable regardless of load',
      'A fixed controller output signal',
      'Equal pressure across a control valve',
      'A fixed ratio between two process variables',
    ],
    correctAnswer: 3,
    explanation:
      'Ratio control maintains a predetermined ratio between two variables. A common example is maintaining the correct fuel-to-air ratio in a burner system: as the fuel flow changes, the air flow is automatically adjusted to maintain the correct combustion ratio. The ratio can be adjusted by the operator to optimise the process.',
  },
  {
    id: 12,
    question:
      'Under ST1426, understanding process control principles is important for maintenance technicians because:',
    options: [
      'They need to diagnose faults in automated systems, understand control strategies and communicate with instrumentation engineers',
      'They are required to design and commission new control loops from scratch',
      'They must write the control algorithms used by the PLC or DCS',
      'They are responsible for setting the production targets for the plant',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to understand the principles of control systems so they can diagnose faults in automated plant, interpret control system documentation, carry out basic tuning and calibration, and work effectively with instrumentation and control engineers. This knowledge is assessed in the end-point assessment.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a setpoint and a process variable?',
    answer:
      'The setpoint (SP) is the desired value — what you want the process to be. The process variable (PV) is the actual measured value — what the process currently is. The controller compares these two values and generates an output to drive the PV towards the SP. For example, if you set a room thermostat to 21 degrees C, that is the setpoint. The actual room temperature measured by the sensor is the process variable.',
  },
  {
    question:
      'Why do some processes need closed loop control while others work fine with open loop?',
    answer:
      'Closed loop control is needed when the process is subject to disturbances that would cause the output to drift from the desired value, or when precise control is required. Open loop works when the relationship between input and output is well-known and stable, disturbances are minimal, and exact precision is not critical. For example, a conveyor belt running at a fixed speed is often open loop, while a furnace temperature must be closed loop because heat loss varies with ambient conditions and load.',
  },
  {
    question: "What is meant by 'loop tuning' and why does it matter?",
    answer:
      'Loop tuning is the process of adjusting the controller parameters (P, I and D values) to achieve the best possible control performance for a specific process. Poorly tuned loops can oscillate wildly, respond too slowly, or never reach setpoint. Proper tuning ensures stable, responsive control that minimises energy waste and maintains product quality. As a maintenance technician, you will be expected to recognise poorly tuned loops and carry out basic tuning adjustments.',
  },
  {
    question: 'How do I know if a control loop has a problem?',
    answer:
      'Common signs of loop problems include: the process variable oscillating continuously around setpoint; the PV drifting steadily away from setpoint; slow response to load changes; the final control element constantly hunting (moving back and forth); excessive energy consumption; and poor product quality. Trending the PV, SP and controller output over time is the most effective diagnostic technique — a well-tuned loop should respond smoothly without excessive oscillation.',
  },
  {
    question: 'What is the difference between analogue and digital control signals?',
    answer:
      'Analogue signals (such as 4-20 mA or 0-10 V) vary continuously and represent the process variable as a proportional electrical quantity. Digital signals use discrete values (binary data) transmitted via communication protocols such as HART, Foundation Fieldbus or Profibus. Many modern instruments support both: the analogue signal for the basic control loop and a digital signal overlay for diagnostics, configuration and status information.',
  },
  {
    question: 'Is process control only relevant to large industrial plants?',
    answer:
      'No. Process control principles apply everywhere — from domestic central heating thermostats and refrigeration systems to commercial HVAC, water treatment works, food manufacturing and large-scale chemical plants. As an electrical maintenance technician, you will encounter control loops in virtually every industrial and commercial environment, whether it is a simple on-off heating control or a complex multi-loop DCS system.',
  },
];

const MOETModule5Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.4 · Subsection 1"
        title="Principles of Process Control"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Open and closed loop control, feedback systems and control strategies.
          </p>

          <TLDR
            points={[
              'Open loop: no feedback — the output is not measured or corrected.',
              'Closed loop: feedback from a sensor adjusts the controller output.',
              'Error signal: setpoint minus process variable drives the correction.',
              'Signal standard: 4-20 mA analogue, with a live zero.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish between open loop and closed loop control systems',
              'Identify the components of a standard control loop',
              'Explain the concepts of setpoint, process variable and error signal',
              'Describe feedback, feedforward and cascade control strategies',
              'Interpret 4-20 mA analogue signal conventions',
              'Relate process control principles to ST1426 maintenance requirements',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault diagnosis:</strong> understanding loops helps locate control faults.
              </li>
              <li>
                <strong>Calibration:</strong> sensors and transmitters need regular calibration.
              </li>
              <li>
                <strong>Loop tuning:</strong> poor tuning causes oscillation and energy waste.
              </li>
              <li>
                <strong>ST1426:</strong> control system knowledge is assessed in the EPA.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>What process control is</ContentEyebrow>

          <ConceptBlock title="What Is Process Control?">
            <p>
              Process control is the discipline of maintaining a process variable — such as
              temperature, pressure, flow rate or level — at a desired value by continuously
              measuring the variable, comparing it with the target, and making adjustments to keep
              the process within specification. In industrial environments, process control is the
              foundation of consistent product quality, energy efficiency and safe operation.
            </p>
            <p>
              For electrical maintenance technicians working under the ST1426 standard,
              understanding process control is essential because modern industrial plant relies
              heavily on automated control systems. When these systems malfunction, the maintenance
              technician must be able to diagnose whether the fault lies in the sensor, the
              controller, the wiring, or the final control element. Without a solid grasp of control
              principles, effective fault-finding is impossible.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The three essential functions of control">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measurement:</strong> a sensor detects the current value of the process
                variable and converts it into an electrical signal (e.g., 4-20 mA, 0-10 V, or a
                digital value).
              </li>
              <li>
                <strong>Comparison:</strong> the controller compares the measured value with the
                desired setpoint and calculates the error — the difference between actual and
                desired.
              </li>
              <li>
                <strong>Correction:</strong> based on the error, the controller sends a signal to
                the final control element (valve, drive, heater) to adjust the process and reduce
                the error towards zero.
              </li>
            </ul>
            <p>
              These three functions — measure, compare, correct — form the basis of every control
              system, from a domestic room thermostat to a complex distributed control system
              managing an entire chemical plant. The sophistication of the control depends on the
              process requirements, but the fundamental principle remains the same.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Common process variables in industrial control"
            onSite="You will work with all of these process variables. Understanding the relationship between the sensor, controller and final control element in each loop is essential for effective fault diagnosis."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Variable</th>
                    <th className="py-2 pr-4 font-medium text-white">Typical sensor</th>
                    <th className="py-2 font-medium text-white">Typical final control element</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Temperature</td>
                    <td className="py-2 pr-4">RTD (Pt100), thermocouple</td>
                    <td className="py-2">Heating element, cooling valve, VSD fan</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Pressure</td>
                    <td className="py-2 pr-4">Pressure transmitter, bourdon tube</td>
                    <td className="py-2">Control valve, compressor speed</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Flow</td>
                    <td className="py-2 pr-4">Electromagnetic, vortex, orifice plate</td>
                    <td className="py-2">Control valve, pump VSD</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Level</td>
                    <td className="py-2 pr-4">Ultrasonic, radar, differential pressure</td>
                    <td className="py-2">Inlet/outlet valve, pump control</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Open loop vs closed loop control</ContentEyebrow>

          <ConceptBlock
            title="Open loop vs closed loop control"
            onSite="When fault-finding a control loop, always start by checking whether the loop is actually 'closed'. A disconnected sensor cable, a failed transmitter, or a valve stuck in one position effectively converts a closed loop into an open loop — and the process will drift uncontrolled."
          >
            <p>
              All control systems fall into one of two fundamental categories: open loop or closed
              loop. The distinction is simple but critically important — it determines whether the
              system can respond to disturbances and maintain the desired output under changing
              conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Open loop control">
            <p>
              In an open loop system, the controller output is determined solely by the input —
              there is no measurement of the actual output and no feedback path. The controller
              &apos;assumes&apos; that the desired output will result from the given input, with no
              verification.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>No feedback sensor — output not measured.</li>
              <li>Cannot compensate for disturbances.</li>
              <li>Simple and inexpensive to implement.</li>
              <li>Suitable where precision is not critical.</li>
              <li>Examples: basic timer, fixed-speed conveyor, traffic lights.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Closed loop control">
            <p>
              In a closed loop system, the actual output is measured by a sensor and fed back to the
              controller. The controller continuously compares the measured value with the setpoint
              and adjusts its output to minimise the error.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Feedback sensor measures actual output.</li>
              <li>Automatically compensates for disturbances.</li>
              <li>More complex and costly than open loop.</li>
              <li>Essential where precision and stability are required.</li>
              <li>Examples: thermostat, cruise control, industrial PID loop.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The feedback loop — block diagram elements">
            <p>
              A closed loop control system is best understood through its block diagram. Each block
              represents a functional element, and the signal flows in a continuous path — hence the
              term &apos;loop&apos;.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Setpoint (SP):</strong> the desired value, set by the operator or a
                higher-level controller.
              </li>
              <li>
                <strong>Summing junction:</strong> where the setpoint and feedback signal are
                compared to produce the error.
              </li>
              <li>
                <strong>Controller:</strong> receives the error signal and calculates the
                appropriate output using its control algorithm (P, PI, PID etc.).
              </li>
              <li>
                <strong>Final control element:</strong> receives the controller output and
                physically adjusts the process (valve, drive, heater).
              </li>
              <li>
                <strong>Process:</strong> the physical system being controlled (furnace, tank, pipe,
                motor).
              </li>
              <li>
                <strong>Sensor/transmitter:</strong> measures the process variable and converts it
                to a standard signal (4-20 mA).
              </li>
              <li>
                <strong>Feedback path:</strong> carries the measured signal back to the summing
                junction for comparison.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Why feedback can cause instability"
            whatHappens={
              <p>
                While feedback is essential for accurate control, it can also cause problems. If the
                controller gain is too high, or if there are significant time delays in the loop,
                the system can become unstable — oscillating with increasing amplitude until the
                process goes out of control. This is why loop tuning (adjusting controller
                parameters) is so important.
              </p>
            }
            doInstead={
              <p>
                A maintenance technician who understands this concept can recognise when a loop is
                oscillating and take appropriate action.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Control strategies</ContentEyebrow>

          <ConceptBlock
            title="Control strategies: feedback, feedforward and cascade"
            onSite="The maintenance technician standard requires you to understand different control strategies so you can interpret P&ID drawings, follow loop diagrams during fault-finding, and communicate effectively with process and instrumentation engineers."
          >
            <p>
              Beyond the basic distinction between open and closed loop, industrial control systems
              employ a range of strategies to achieve the required performance. The three most
              important are feedback control, feedforward control and cascade control. Understanding
              these strategies is essential for maintaining and troubleshooting automated systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Feedback control (reactive)">
            <p>
              Feedback control is the most common strategy. The controller reacts to deviations from
              setpoint by adjusting the output. Its limitation is that it can only correct errors
              after they have occurred — there is always some deviation before the correction takes
              effect.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Measures the process variable after the process.</li>
              <li>Corrects errors after they occur (reactive).</li>
              <li>Simple to implement and works for most applications.</li>
              <li>Performance limited by dead time and process dynamics.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Feedforward control (anticipatory)">
            <p>
              Feedforward control measures a disturbance before it affects the process and takes
              corrective action in advance. This requires knowledge of the relationship between the
              disturbance and the process, modelled mathematically. In practice, feedforward is
              almost always combined with feedback to handle unmeasured disturbances.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Measures disturbances before they affect the output.</li>
              <li>Takes corrective action before the error occurs (proactive).</li>
              <li>Requires accurate process model.</li>
              <li>
                Example: measuring incoming fluid temperature and adjusting heat input before the
                outlet temperature changes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cascade control (two loops)">
            <p>
              Cascade control uses two controllers in series. The primary (outer) controller
              monitors the main process variable, and its output becomes the setpoint for the
              secondary (inner) controller. The secondary controller manipulates the final control
              element. This improves response to disturbances that enter the secondary loop.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Primary controller sets the setpoint for the secondary controller.</li>
              <li>Secondary loop responds faster to local disturbances.</li>
              <li>Improves overall control quality for processes with multiple dynamics.</li>
              <li>Example: furnace temperature (primary) controlling fuel flow (secondary).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Other common control strategies">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Strategy</th>
                    <th className="py-2 pr-4 font-medium text-white">Description</th>
                    <th className="py-2 font-medium text-white">Typical application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Ratio control</td>
                    <td className="py-2 pr-4">Maintains a fixed ratio between two variables</td>
                    <td className="py-2">Fuel-to-air ratio in combustion systems</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Split range</td>
                    <td className="py-2 pr-4">
                      One controller output drives two or more final elements over different ranges
                    </td>
                    <td className="py-2">
                      Heating and cooling valves on a single temperature loop
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Override/selective</td>
                    <td className="py-2 pr-4">
                      Multiple controllers compete; the one with the most urgent demand takes
                      priority
                    </td>
                    <td className="py-2">Compressor anti-surge protection</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Batch/sequential</td>
                    <td className="py-2 pr-4">
                      Steps through a sequence of operations based on time or events
                    </td>
                    <td className="py-2">Chemical batch reactor, CIP cleaning cycles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Signal standards</ContentEyebrow>

          <ConceptBlock
            title="Signal standards and the 4-20 mA convention"
            onSite="A multimeter set to mA range in series with the loop is the most basic diagnostic tool for a 4-20 mA circuit. You can also use a loop calibrator to inject a known current and test the entire signal chain from transmitter input to controller display."
          >
            <p>
              For the components of a control loop to communicate, they must use a common signal
              standard. In industrial process control, the most widely used analogue signal standard
              is 4-20 mA. Understanding this convention is fundamental for any electrical
              maintenance technician working with instrumentation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Why 4-20 mA?">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live zero:</strong> the 4 mA lower limit means a reading of 0 mA always
                indicates a fault (broken cable, failed transmitter) rather than a genuine zero
                process value.
              </li>
              <li>
                <strong>Noise immunity:</strong> current signals are less susceptible to electrical
                noise and voltage drops over long cable runs than voltage signals.
              </li>
              <li>
                <strong>Two-wire operation:</strong> many 4-20 mA transmitters can be powered from
                the same two wires that carry the signal, simplifying installation.
              </li>
              <li>
                <strong>Standardisation:</strong> the 4-20 mA range is defined in IEC 60381-1 and is
                universally supported by instrumentation manufacturers.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Calculating signal values">
            <p>
              The relationship between the process variable range and the 4-20 mA signal is linear.
              The formula is:
            </p>
            <p className="rounded bg-white/5 p-3 font-mono text-[13px]">
              mA = 4 + (PV - PV_min) / (PV_max - PV_min) x 16
            </p>
            <p>For example, a temperature transmitter ranged 0-200 degrees C:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>At 0 degrees C: 4 + (0/200) x 16 = 4.0 mA (0%)</li>
              <li>At 50 degrees C: 4 + (50/200) x 16 = 8.0 mA (25%)</li>
              <li>At 100 degrees C: 4 + (100/200) x 16 = 12.0 mA (50%)</li>
              <li>At 200 degrees C: 4 + (200/200) x 16 = 20.0 mA (100%)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Other signal standards">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Signal type</th>
                    <th className="py-2 pr-4 font-medium text-white">Range</th>
                    <th className="py-2 font-medium text-white">Common application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">4-20 mA</td>
                    <td className="py-2 pr-4">4 mA = 0%, 20 mA = 100%</td>
                    <td className="py-2">
                      Process transmitters, valve positioners, controller I/O
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">0-10 V DC</td>
                    <td className="py-2 pr-4">0 V = 0%, 10 V = 100%</td>
                    <td className="py-2">HVAC controls, building management systems</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">1-5 V DC</td>
                    <td className="py-2 pr-4">1 V = 0%, 5 V = 100%</td>
                    <td className="py-2">Older pneumatic-to-electronic converters</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">3-15 psi</td>
                    <td className="py-2 pr-4">3 psi = 0%, 15 psi = 100%</td>
                    <td className="py-2">Pneumatic instruments (legacy systems)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">HART digital</td>
                    <td className="py-2 pr-4">Digital overlay on 4-20 mA</td>
                    <td className="py-2">Smart transmitters with diagnostics and configuration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Fault detection with live zero"
            whatHappens={
              <p>
                If you measure 0 mA on a 4-20 mA loop, you know immediately that there is a fault —
                a cable break, a blown fuse, a failed transmitter, or a disconnected terminal.
                Without the live zero (i.e., using 0-20 mA), a reading of 0 mA could mean either
                zero process variable or a complete system failure.
              </p>
            }
            doInstead={
              <p>
                Always check for 0 mA as a first step when troubleshooting instrumentation faults.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Process dynamics</ContentEyebrow>

          <ConceptBlock
            title="Process dynamics and control performance"
            onSite="Process control is a deep discipline, and the principles covered here provide the foundation you need as an electrical maintenance technician. The following sections in this module build on these concepts, covering PID tuning (5.4.2), pneumatic and hydraulic controls (5.4.3), control valves (5.4.4), DCS systems (5.4.5) and instrument calibration (5.4.6)."
          >
            <p>
              Every real process has dynamic characteristics that determine how it responds to
              changes. Understanding these dynamics is essential for tuning controllers, diagnosing
              oscillation problems, and predicting how a process will behave when disturbances
              occur. The three key dynamic characteristics are gain, dead time and time constant.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key process dynamic characteristics">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Process gain:</strong> the ratio of the change in process variable to the
                change in controller output. A high-gain process is sensitive — a small change in
                controller output causes a large change in the process variable.
              </li>
              <li>
                <strong>Dead time (transport delay):</strong> the time between a change at the final
                control element and the first detectable change at the sensor. Long dead times make
                control difficult because the controller is &apos;flying blind&apos; during the
                delay.
              </li>
              <li>
                <strong>Time constant:</strong> the time taken for the process to reach
                approximately 63% of its final value after a step change. It characterises how
                quickly the process responds — a large time constant means a slow, sluggish process.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fast processes">
            <p>
              Processes with short time constants and minimal dead time respond quickly to
              controller output changes. Examples include flow control and pressure control in gas
              systems. These processes can be controlled tightly with high controller gains, but
              they are also prone to oscillation if the controller is over-tuned.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Slow processes">
            <p>
              Processes with long time constants and significant dead time respond slowly.
              Temperature control in large vessels and pH control in mixing tanks are typical
              examples. These require patient controller settings with lower gains, and they can be
              frustrating to tune because changes take a long time to show their effect.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Control performance measures">
            <p>
              When assessing whether a control loop is performing well, maintenance technicians
              should look at several key indicators:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Offset:</strong> a sustained difference between setpoint and process
                variable — indicates the controller lacks integral action or has a tuning problem.
              </li>
              <li>
                <strong>Overshoot:</strong> the process variable exceeds the setpoint before
                settling — excessive overshoot may indicate too much proportional gain.
              </li>
              <li>
                <strong>Oscillation:</strong> the process variable cycles continuously around
                setpoint — indicates the loop may be unstable or poorly tuned.
              </li>
              <li>
                <strong>Settling time:</strong> the time taken for the process to stabilise at the
                new setpoint after a change — should be as short as possible without excessive
                overshoot.
              </li>
              <li>
                <strong>Steady-state accuracy:</strong> how closely the process variable matches
                setpoint once the transient has died out.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common control modes">
            <p>
              The control mode determines how the controller calculates its output from the error
              signal. The most common modes, which will be covered in detail in Section 5.4.2, are:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>On-off:</strong> output is either fully on or fully off — simple but causes
                cycling around setpoint.
              </li>
              <li>
                <strong>Proportional (P):</strong> output is proportional to the error — provides
                fast response but always has offset.
              </li>
              <li>
                <strong>Proportional + Integral (PI):</strong> adds integral action to eliminate
                offset — the most common mode in process control.
              </li>
              <li>
                <strong>Proportional + Integral + Derivative (PID):</strong> adds derivative action
                for faster response to rapid changes — used where tight control is needed.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Control loop components: sensor/transmitter measures the PV; controller compares SP and PV and calculates output; final control element adjusts the process; feedback path returns measured PV to the controller.',
              'Key signal standards: 4-20 mA is the standard process signal (live zero); 0-10 V DC serves HVAC and BMS systems; 3-15 psi serves pneumatic instruments; HART is a digital overlay on 4-20 mA; IEC 60381-1 is the signal standard reference.',
              'Open loop has no feedback; closed loop measures the output and corrects it.',
              'Feedback reacts after the fact; feedforward acts on a disturbance before it reaches the output; cascade nests a fast secondary loop inside a slower primary one.',
              'The live zero at 4 mA turns 0 mA into a fault signal, never a valid reading.',
              'Gain, dead time and time constant between them explain why a loop oscillates, drifts or responds sluggishly.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Process Control and Instrumentation
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  PID Control Loops
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section4_1;
