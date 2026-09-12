/**
 * MOET · Module 5 · Section 4 · Subsection 2 — PID Control Loops
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
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'PID Control Loops - MOET Module 5 Section 4.2';
const DESCRIPTION =
  'Comprehensive guide to PID control for electrical maintenance technicians: proportional, integral and derivative control actions, tuning methods, controller response and industrial applications under ST1426.';

const quickCheckQuestions = [
  {
    id: 'proportional-action',
    question: 'What does the proportional (P) term in a PID controller do?',
    options: [
      'Eliminates steady-state offset completely',
      'Resets the controller output to zero when the error is zero',
      'Predicts the future error based on rate of change',
      'Produces an output proportional to the current error signal',
    ],
    correctIndex: 3,
    explanation:
      'The proportional term produces a controller output that is directly proportional to the current error. If the error doubles, the proportional output doubles. The proportional band (or gain) determines the sensitivity — a narrow proportional band (high gain) gives a large output for a small error. However, proportional action alone always leaves a residual offset from setpoint.',
  },
  {
    id: 'integral-purpose',
    question: 'What is the primary purpose of the integral (I) term in a PID controller?',
    options: [
      'To speed up the initial response to a step change',
      'To reduce controller output when the error is large',
      'To eliminate steady-state offset by accumulating the error over time',
      'To predict future errors and act in advance',
    ],
    correctIndex: 2,
    explanation:
      'The integral term accumulates the error over time. Even if the current error is very small, the integral action continues to increase the controller output until the error reaches exactly zero. This eliminates the steady-state offset that proportional action alone cannot remove. The integral time (Ti) determines how aggressively the integral acts.',
  },
  {
    id: 'derivative-action',
    question: 'When is the derivative (D) term most useful in a PID controller?',
    options: [
      'When the process variable is constant and not changing',
      'When the error is changing rapidly and the controller needs to anticipate the trend',
      'When the final control element is fully saturated',
      'When the sensor has failed and no feedback is available',
    ],
    correctIndex: 1,
    explanation:
      "The derivative term responds to the rate of change of the error. When the error is changing rapidly, derivative action provides an additional 'kick' to the output, effectively anticipating where the error is heading. This is most useful on processes with large time constants where early intervention can prevent excessive overshoot. It is rarely used on noisy processes as it amplifies signal noise.",
  },
  {
    id: 'tuning-oscillation',
    question:
      'If a control loop is oscillating with increasing amplitude, what is the most likely cause?',
    options: [
      'The integral time is set far too long, slowing the response',
      'The derivative term has been disabled on a noisy signal',
      'The controller gain is too high, causing the loop to become unstable',
      'The setpoint has been left exactly equal to the process variable',
    ],
    correctIndex: 2,
    explanation:
      'Oscillation with increasing amplitude indicates an unstable loop. The most common cause is excessive controller gain (proportional band too narrow). When the gain is too high, the controller over-corrects for each error, causing the process to swing past setpoint in both directions with each swing getting larger. Reducing the proportional gain (widening the proportional band) is the first corrective action.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A proportional controller with a gain of 2 receives an error signal of 5%. What is the controller output change?',
    options: ['2.5%', '10%', '5%', '7%'],
    correctAnswer: 1,
    explanation:
      'Output change = Gain x Error = 2 x 5% = 10%. Proportional action multiplies the error by the gain to determine the output. A higher gain gives a more aggressive response to errors.',
  },
  {
    id: 2,
    question:
      "The 'proportional band' of a controller is set to 50%. This is equivalent to a gain of:",
    options: ['50', '0.5', '2', '5'],
    correctAnswer: 2,
    explanation:
      'Gain = 100 / Proportional Band = 100 / 50 = 2. Proportional band and gain are inversely related. A narrow proportional band gives a high gain (more aggressive), while a wide proportional band gives a low gain (less aggressive). Different controller manufacturers use different conventions, so always check the documentation.',
  },
  {
    id: 3,
    question:
      'A PI controller is controlling temperature. The process variable has been stable at 1.5 degrees C below setpoint for several minutes. What will the integral action do?',
    options: [
      'Hold the output constant, leaving the 1.5 degree offset in place',
      'Reduce the output because the error is small and steady',
      'Switch the controller into manual mode automatically',
      'Gradually increase the controller output until the offset is eliminated',
    ],
    correctAnswer: 3,
    explanation:
      'The integral action accumulates error over time. Even though the error is small and constant at 1.5 degrees C, the integral is continuously adding to the output. Over time, the output increases enough to bring the process variable up to setpoint, eliminating the offset. This is precisely what proportional action alone cannot achieve.',
  },
  {
    id: 4,
    question: 'Integral wind-up occurs when:',
    options: [
      'The controller output saturates at its limit while the integral term continues to accumulate',
      'The derivative term amplifies high-frequency measurement noise',
      'The proportional band is set so narrow the loop oscillates continuously',
      'The setpoint is changed faster than the sensor can update',
    ],
    correctAnswer: 0,
    explanation:
      'Integral wind-up happens when the controller output has reached its maximum (or minimum) limit but the error persists — for example, during a large setpoint change or if the final control element is stuck. The integral term keeps accumulating even though the output cannot increase further. When the error eventually reverses, there is a large delay before the wound-up integral unwinds, causing overshoot. Anti-wind-up measures are built into modern controllers to prevent this.',
  },
  {
    id: 5,
    question: 'The Ziegler-Nichols tuning method involves:',
    options: [
      'Setting the integral and derivative terms to maximum and reducing them until stable',
      'Increasing the proportional gain until the loop oscillates continuously, then calculating P, I and D from the ultimate gain and period',
      'Calculating the PID terms directly from the control valve characteristic curve',
      'Adjusting each term by trial and error until the operator is satisfied with the response',
    ],
    correctAnswer: 1,
    explanation:
      'The Ziegler-Nichols ultimate gain method sets the integral and derivative to off, then increases the proportional gain until the loop sustains continuous oscillation. The gain at this point is the ultimate gain (Ku) and the oscillation period is the ultimate period (Pu). PID parameters are then calculated from these values using standard formulae. This method gives aggressive tuning and usually requires further adjustment.',
  },
  {
    id: 6,
    question: 'Derivative action is generally NOT used on which type of process variable?',
    options: ['Temperature', 'Level in a large vessel', 'Flow', 'Pressure in a gas system'],
    correctAnswer: 2,
    explanation:
      'Flow measurement is typically noisy due to turbulence and pulsation. Since derivative action responds to the rate of change, it amplifies this noise, causing erratic controller output and valve wear. PI control (without D) is the standard choice for flow loops. Derivative is more useful on slow, smooth processes like temperature control in large thermal masses.',
  },
  {
    id: 7,
    question: 'In a PID controller, what happens if the integral time (Ti) is set too short?',
    options: [
      'A permanent steady-state offset is left uncorrected',
      'The controller stops responding to setpoint changes entirely',
      'The proportional action is automatically disabled',
      'The integral action becomes too aggressive, causing oscillation and overshoot',
    ],
    correctAnswer: 3,
    explanation:
      'A short integral time means the integral action accumulates rapidly. This makes the controller aggressive in eliminating offset, but if it is too aggressive, it causes the output to overshoot and oscillate. The process variable swings above and below setpoint with each cycle being driven by the integral winding up and unwinding. Increasing the integral time reduces this aggression.',
  },
  {
    id: 8,
    question: "A controller is described as having 'direct action'. This means:",
    options: [
      'The controller output increases when the process variable increases above setpoint',
      'The controller acts directly without any integral or derivative action',
      'The controller sends the output signal directly to the valve without conversion',
      'The controller output decreases when the process variable increases above setpoint',
    ],
    correctAnswer: 0,
    explanation:
      "In direct action, the controller output increases when the process variable rises. This is used when the final control element must open further to reduce the process variable — for example, a cooling valve that needs to open more when the temperature rises. The reverse (output decreases when PV rises) is called 'reverse action' and is used for heating applications where the valve needs to close as temperature rises above setpoint.",
  },
  {
    id: 9,
    question: "The 'controller output' in a PID loop is typically expressed as:",
    options: [
      'A temperature in degrees Celsius',
      'A percentage from 0% to 100%',
      'A resistance in ohms',
      'A frequency in hertz',
    ],
    correctAnswer: 1,
    explanation:
      'The controller output is expressed as a percentage of the output range (0% to 100%). This is then converted by the output module and final control element into the physical action needed — for example, 0-100% output might correspond to 4-20 mA to a valve positioner, which in turn positions the valve from fully closed to fully open.',
  },
  {
    id: 10,
    question: 'When manually tuning a PID loop, the recommended sequence is:',
    options: [
      'Set D first for fast response, then P, then remove I entirely',
      'Set all three terms to maximum, then reduce them together',
      'Set P first to achieve acceptable response, then add I to eliminate offset, then add D if needed for faster response',
      'Increasing the proportional gain until the loop oscillates continuously, then calculating P, I and D from the ultimate gain and period',
    ],
    correctAnswer: 2,
    explanation:
      'The standard manual tuning approach is: first set I and D to their minimum (off or very slow), then adjust P to get the fastest response without excessive oscillation. Next, introduce integral action to eliminate offset — start with a long Ti and reduce until offset is corrected without causing oscillation. Finally, if needed, add small amounts of derivative to improve response to rapid changes. Always make one change at a time and observe the effect.',
  },
  {
    id: 11,
    question: "What does 'auto-tuning' mean in the context of a PID controller?",
    options: [
      'The operator manually adjusts each term by trial and error',
      'The controller automatically switches between manual and automatic mode',
      'The controller continuously changes its setpoint to track the load',
      'The controller runs a test sequence and calculates optimised PID parameters based on the process response',
    ],
    correctAnswer: 3,
    explanation:
      'Auto-tuning is a built-in feature of many modern controllers. When initiated, the controller applies a test disturbance (often a relay oscillation or step change), analyses the process response, and calculates appropriate P, I and D values. This provides a good starting point but often requires manual fine-tuning to optimise performance for the specific application.',
  },
  {
    id: 12,
    question: 'Under ST1426, an electrical maintenance technician should be able to:',
    options: [
      'Recognise PID control behaviour, perform basic tuning adjustments and diagnose common loop faults',
      'Design new control loops and specify the control philosophy for a plant',
      'Write the embedded firmware for the PID controller hardware',
      'Replace the instrumentation engineer on all complex tuning tasks',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 expects maintenance technicians to understand PID control principles sufficiently to recognise normal and abnormal loop behaviour, make basic tuning adjustments, diagnose common faults (sensor failure, valve stuck, poor tuning) and communicate effectively with specialist instrumentation engineers. The technician is not expected to design control systems but must be competent in maintaining them.',
  },
];

const faqs = [
  {
    question: 'What does PID stand for and why are there three terms?',
    answer:
      'PID stands for Proportional, Integral, Derivative. Each term addresses a different aspect of control: P provides an immediate response proportional to the current error, I eliminates steady-state offset by accumulating error over time, and D anticipates future error by responding to the rate of change. Together, they provide a versatile control algorithm that can be tuned for most industrial processes. Not all three terms are always used — PI control (without D) is the most common configuration in process control.',
  },
  {
    question: 'Why does proportional-only control always have an offset?',
    answer:
      "With proportional-only control, the output is directly proportional to the error. This means the output can only be non-zero when the error is non-zero. To maintain a constant output to the process (to hold the process at a steady state against a load), there must be a constant error. This residual error is called 'offset' or 'droop'. The only way to eliminate it is to add integral action, which can sustain an output even when the error reaches zero.",
  },
  {
    question: 'How do I know if a loop needs retuning?',
    answer:
      "Common signs include: continuous oscillation around setpoint (the PV never settles); very slow response to setpoint changes (taking much longer than expected); excessive overshoot after a change; the controller output constantly 'hunting' (moving back and forth); a persistent offset from setpoint despite having integral action; or significantly worse performance than when the loop was originally commissioned. Trending the PV, SP and output over time is the best diagnostic — compare current behaviour with the expected response.",
  },
  {
    question: "What is the difference between 'gain' and 'proportional band'?",
    answer:
      'Gain and proportional band are two ways of expressing the same thing — the sensitivity of proportional action. Gain = 100 / Proportional Band (%). A gain of 4 is equivalent to a proportional band of 25%. A high gain (narrow PB) gives aggressive response; a low gain (wide PB) gives gentle response. Different controller manufacturers use different conventions: some use gain, others use proportional band. Always check which convention your controller uses before making adjustments.',
  },
  {
    question: 'Can I tune a PID loop without any special software or tools?',
    answer:
      'Yes. Manual tuning (trial and error) is the most fundamental method and requires only the controller interface and a trend display. The process is: set I and D to minimum, adjust P for best response without oscillation, then slowly introduce I to eliminate offset, then optionally add D. A process reaction curve method (open-loop step test) requires a trend recorder and stopwatch. The Ziegler-Nichols closed-loop method requires the ability to observe oscillation. While software tools and auto-tune functions make tuning faster, every maintenance technician should understand manual tuning.',
  },
];

const MOETModule5Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.4 · Subsection 2"
        title="PID Control Loops"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Proportional, integral and derivative control principles and tuning.
          </p>

          <TLDR
            points={[
              'P: output proportional to error — fast but has offset.',
              'I: accumulates error over time — eliminates offset.',
              'D: responds to rate of change — anticipates trends.',
              'PI is the most common industrial configuration.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the function of proportional, integral and derivative control actions',
              'Calculate controller output for given error signals and PID parameters',
              'Identify common PID tuning problems from process trends',
              'Describe manual and automatic tuning methods for PID controllers',
              'Recognise the effects of integral wind-up and controller saturation',
              'Apply PID knowledge to fault diagnosis under ST1426 requirements',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tuning:</strong> adjust P, I, D parameters for stable control.
              </li>
              <li>
                <strong>Oscillation:</strong> usually caused by gain too high or Ti too short.
              </li>
              <li>
                <strong>Offset:</strong> sustained error means integral action is needed.
              </li>
              <li>
                <strong>ST1426:</strong> basic PID understanding is required for the EPA.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Proportional control</ContentEyebrow>

          <ConceptBlock
            title="Proportional control (P)"
            onSite="A proportional-only temperature controller with a gain of 5 is controlling a furnace at 200 degrees C setpoint. Under load, the furnace needs 60% output to maintain temperature. With 50% bias, the error must be (60-50)/5 = 2 degrees C, so the actual temperature settles at 198 degrees C — a 2 degree offset."
          >
            <p>
              Proportional control is the foundation of PID. The controller output is directly
              proportional to the error signal — the difference between setpoint and process
              variable. When the error is large, the output is large; when the error is small, the
              output is small. This provides an immediate, intuitive response to deviations from
              setpoint.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The proportional equation">
            <p className="rounded bg-white/5 p-3 font-mono text-[13px]">
              Output = Kp x Error + Bias
            </p>
            <p>Where:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Kp</strong> = proportional gain (dimensionless ratio).
              </li>
              <li>
                <strong>Error</strong> = setpoint minus process variable (SP − PV).
              </li>
              <li>
                <strong>Bias</strong> = the output value when error is zero (typically 50%).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Proportional band">
            <p>
              Proportional band (PB) is an alternative way to express the proportional sensitivity.
              It represents the range of the process variable over which the controller output moves
              from 0% to 100%.
            </p>
            <p className="rounded bg-white/5 p-3 font-mono text-[13px]">
              PB (%) = 100 / Kp or Kp = 100 / PB (%)
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Narrow PB (e.g., 10%):</strong> high gain (Kp = 10), very sensitive — large
                output change for small error.
              </li>
              <li>
                <strong>Wide PB (e.g., 200%):</strong> low gain (Kp = 0.5), gentle — small output
                change for large error.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="The offset problem"
            whatHappens={
              <p>
                The fundamental limitation of proportional-only control is offset — a permanent
                difference between setpoint and process variable. Because the output is proportional
                to the error, the controller needs a non-zero error to produce a non-zero output.
                When the process is under load, the controller must maintain an output to balance
                the load, which requires a sustained error. Increasing the gain reduces the offset
                but increases the risk of oscillation.
              </p>
            }
            doInstead={<p>Only integral action can eliminate offset completely.</p>}
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Integral control</ContentEyebrow>

          <ConceptBlock title="Integral control (I) — eliminating offset">
            <p>
              Integral action addresses the offset limitation of proportional control. It works by
              accumulating (integrating) the error over time. Even if the error is very small, the
              integral keeps adding to the controller output until the error reaches zero. This is
              why PI control — proportional plus integral — is the most widely used control
              configuration in industry.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How integral action works">
            <p>
              The integral contribution is proportional to the sum of all past errors multiplied by
              the time interval. In mathematical terms, it is the area under the error-time curve.
            </p>
            <p className="rounded bg-white/5 p-3 font-mono text-[13px]">
              I output = (Kp / Ti) x integral of error over time
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ti (integral time):</strong> determines the speed of integral action. Short
                Ti = fast integral = aggressive offset elimination. Long Ti = slow integral = gentle
                correction.
              </li>
              <li>
                <strong>Repeats per minute:</strong> some controllers express integral as
                repeats/minute (the inverse of Ti in minutes). More repeats = faster integral
                action.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Benefits of integral action">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Eliminates steady-state offset completely.</li>
              <li>Ensures the PV reaches setpoint exactly.</li>
              <li>Automatically compensates for slow load changes.</li>
              <li>Essential for processes requiring zero-offset accuracy.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Risks of integral action">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Slows the overall loop response.</li>
              <li>Can cause overshoot if Ti is too short.</li>
              <li>Integral wind-up during saturation periods.</li>
              <li>Makes noisy loops oscillate if set aggressively.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Integral wind-up"
            whatHappens={
              <p>
                Integral wind-up is a dangerous condition that occurs when the controller output
                saturates at its maximum (or minimum) limit but the error persists — for example,
                during a large setpoint change when the valve is fully open but the process has not
                yet reached setpoint. The integral term continues to accumulate, building up a large
                value. When the PV finally crosses setpoint, the wound-up integral prevents the
                controller from reducing its output, causing significant overshoot.
              </p>
            }
            doInstead={
              <>
                <p>
                  Modern controllers include anti-wind-up features that stop the integral
                  accumulating when the output is saturated.
                </p>
                <p>
                  If you see a process overshooting significantly after a setpoint change or after
                  recovering from a disturbance, integral wind-up is a likely cause. Check the
                  anti-wind-up settings in the controller configuration and ensure they are enabled.
                </p>
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Derivative control</ContentEyebrow>

          <ConceptBlock
            title="Derivative control (D) — anticipating change"
            onSite="Full PID control is less common than you might expect. In most industrial applications, PI control (without derivative) provides adequate performance. PID with all three terms active is reserved for processes where the improved response to rapid changes justifies the additional complexity of tuning and the risk of noise amplification."
          >
            <p>
              Derivative action is the third component of PID control. It responds to the rate of
              change of the error — how fast the error is changing, rather than its current
              magnitude or accumulated history. By responding to the rate of change, derivative
              action provides an anticipatory element, acting before the error becomes large.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How derivative action works">
            <p className="rounded bg-white/5 p-3 font-mono text-[13px]">
              D output = Kp x Td x (rate of change of error)
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Td (derivative time):</strong> determines the strength of derivative action.
                Longer Td = more derivative effect.
              </li>
              <li>
                <strong>When error is changing rapidly:</strong> D output is large, adding extra
                correction.
              </li>
              <li>
                <strong>When error is constant:</strong> D output is zero — derivative only responds
                to change.
              </li>
              <li>
                <strong>When error is decreasing:</strong> D output opposes the proportional action,
                acting as a brake to prevent overshoot.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="When to use derivative action">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Suitable for D action</th>
                    <th className="py-2 font-medium text-white">NOT suitable for D action</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Temperature control (slow, smooth signal)</td>
                    <td className="py-2">Flow control (noisy signal)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Large thermal mass processes</td>
                    <td className="py-2">Level control in agitated vessels</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Processes with significant dead time</td>
                    <td className="py-2">Pressure control in gas systems</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Batch process temperature ramps</td>
                    <td className="py-2">Any process with noisy measurement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Derivative and signal noise"
            whatHappens={
              <p>
                The biggest practical problem with derivative action is its sensitivity to noise.
                Since it responds to the rate of change, any high-frequency noise on the measurement
                signal is amplified. This causes rapid, erratic changes in controller output, which
                can damage actuators and valves.
              </p>
            }
            doInstead={
              <p>
                Most modern controllers include a derivative filter that limits the high-frequency
                response, but on noisy signals it is often better to disable derivative entirely and
                use PI control only.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Tuning methods</ContentEyebrow>

          <ConceptBlock
            title="Tuning methods for PID controllers"
            onSite="The maintenance technician standard expects you to be able to recognise the symptoms of poor tuning, carry out basic adjustments, and know when to involve a specialist instrument engineer for complex tuning problems."
          >
            <p>
              Tuning a PID controller means adjusting the P, I and D parameters to achieve the best
              possible control performance for the specific process. Good tuning results in stable,
              responsive control with minimal oscillation, overshoot and settling time. Poor tuning
              causes constant oscillation, sluggish response, or both — wasting energy, reducing
              product quality and wearing out actuators.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Method 1: manual tuning (trial and error)">
            <p>
              The most fundamental method, suitable when you have access to the controller and can
              observe the process response in real time.
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Set integral to maximum Ti (slowest) and derivative to zero.</li>
              <li>
                Adjust proportional gain until the response to a small setpoint change shows
                approximately quarter-wave damping (each successive oscillation is about one-quarter
                the amplitude of the previous).
              </li>
              <li>
                Reduce integral time (increase speed) until offset is eliminated without causing
                oscillation.
              </li>
              <li>
                If needed, increase derivative time cautiously to reduce overshoot on setpoint
                changes.
              </li>
              <li>
                Make one change at a time and allow the process to stabilise before making the next
                adjustment.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Method 2: Ziegler-Nichols ultimate gain">
            <p>
              A systematic method that determines tuning parameters from the point of sustained
              oscillation.
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Set I and D to off (Ti = maximum, Td = 0).</li>
              <li>
                Gradually increase Kp until the loop sustains continuous oscillation at constant
                amplitude.
              </li>
              <li>Record the ultimate gain (Ku) and the oscillation period (Pu).</li>
              <li>Calculate PID parameters: Kp = 0.6 x Ku, Ti = Pu / 2, Td = Pu / 8.</li>
              <li>
                Apply values and fine-tune as needed (Z-N often gives aggressive starting values).
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Method 3: auto-tuning">
            <p>
              Many modern controllers and DCS systems include built-in auto-tune functions that
              automate the tuning process. The controller applies a test disturbance, analyses the
              response, and calculates appropriate PID parameters.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Initiated from the controller front panel or engineering station.</li>
              <li>Usually uses relay feedback or step-test methodology.</li>
              <li>Provides good starting parameters but may need manual refinement.</li>
              <li>
                Should only be run when the process is stable and within normal operating range.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Recognising tuning problems from trends">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Symptom on trend</th>
                    <th className="py-2 pr-4 font-medium text-white">Likely cause</th>
                    <th className="py-2 font-medium text-white">Corrective action</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Growing oscillation</td>
                    <td className="py-2 pr-4">Gain too high</td>
                    <td className="py-2">Reduce Kp (widen PB)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Constant amplitude oscillation</td>
                    <td className="py-2 pr-4">Gain at critical value</td>
                    <td className="py-2">Reduce Kp slightly</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Slow oscillation with overshoot</td>
                    <td className="py-2 pr-4">Integral too aggressive (Ti too short)</td>
                    <td className="py-2">Increase Ti</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Persistent offset, no oscillation</td>
                    <td className="py-2 pr-4">Insufficient integral action</td>
                    <td className="py-2">Decrease Ti or check I is enabled</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Sluggish, very slow response</td>
                    <td className="py-2 pr-4">Gain too low</td>
                    <td className="py-2">Increase Kp (narrow PB)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Erratic, noisy output signal</td>
                    <td className="py-2 pr-4">Derivative on noisy signal</td>
                    <td className="py-2">Reduce or remove Td</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Practical considerations</ContentEyebrow>

          <ConceptBlock
            title="Practical considerations and controller configurations"
            onSite="When fault-finding a control loop, always check the controller configuration first — action direction, PID parameters, alarm limits, output limits and signal range. Many apparent 'process problems' are actually controller configuration errors introduced during maintenance or software updates."
          >
            <p>
              In real-world industrial applications, PID controllers must deal with practical issues
              that textbook theory does not always address. Understanding these practical
              considerations is what separates an effective maintenance technician from one who can
              only follow procedures.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Manual vs automatic mode">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Automatic:</strong> the controller calculates and applies the output based
                on the PID algorithm — normal operating mode.
              </li>
              <li>
                <strong>Manual:</strong> the operator directly sets the controller output — used
                during commissioning, tuning, fault-finding or when the control loop has a problem.
              </li>
              <li>
                <strong>Bumpless transfer:</strong> when switching between manual and automatic, the
                controller should match the output so there is no sudden jump (bump) in the process.
                Most modern controllers handle this automatically, but it must be verified during
                commissioning.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Direct and reverse action">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Direct action:</strong> output increases when PV increases — used for
                cooling applications (valve opens more to provide more cooling as temperature
                rises).
              </li>
              <li>
                <strong>Reverse action:</strong> output decreases when PV increases — used for
                heating applications (valve closes as temperature rises above setpoint).
              </li>
              <li>
                <strong>Critical check:</strong> incorrect action setting causes the controller to
                drive the process away from setpoint rather than towards it — always verify during
                commissioning.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common controller configurations">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Configuration</th>
                    <th className="py-2 pr-4 font-medium text-white">Typical application</th>
                    <th className="py-2 font-medium text-white">Reason</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">P only</td>
                    <td className="py-2 pr-4">Level control (non-critical)</td>
                    <td className="py-2">Offset is acceptable; simple and stable</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PI</td>
                    <td className="py-2 pr-4">Flow, pressure, most temperature loops</td>
                    <td className="py-2">Eliminates offset; D not needed or signal too noisy</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PID</td>
                    <td className="py-2 pr-4">Slow temperature processes, batch control</td>
                    <td className="py-2">D improves response on slow, clean signals</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">PD (rare)</td>
                    <td className="py-2 pr-4">Some position control systems</td>
                    <td className="py-2">Fast response needed; offset acceptable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A temperature loop that hunts after a valve is replaced"

            situation={
              <>
                <p>
                  A jacket heating loop held its setpoint steadily for years. After a control valve
                  was replaced with a different make, the temperature now oscillates either side of
                  setpoint by about 4 °C on a roughly two-minute cycle, and will not settle.
                </p>

                <p>The PID settings were not touched during the valve change.</p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Recognise the symptom before adjusting anything. A steady oscillation that neither
                  grows nor dies away usually means the loop gain is too high for the process as it
                  now stands — and the process has changed, because the valve has.
                </p>

                <p>
                  Check the valve characteristic against the old one. A linear valve swapped for an
                  equal-percentage valve, or a valve with a different Cv, changes how much process
                  response you get per per cent of controller output. The controller is unchanged
                  but its effective gain is not.
                </p>

                <p>
                  Reduce the proportional gain first and see whether the oscillation decays. If it
                  does, the diagnosis is confirmed and the loop needs retuning for the new valve
                  rather than the controller being suspect.
                </p>

                <p>
                  Only then consider the integral term. Integral action that was appropriate before
                  will now be winding up against a differently sized correction, and shortening the
                  integral time at this stage usually makes the hunting worse, not better.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Tuning constants are not properties of the controller — they are properties of the
                whole loop, including the valve and the process. Changing any element in the chain
                invalidates the tuning, and the most common mistake is to treat continued
                oscillation as a controller fault and start adjusting terms at random. Knowing that
                the gain became wrong the moment the valve changed turns an afternoon of trial and
                error into one deliberate adjustment.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'P — output proportional to error (immediate); I — accumulates error over time (eliminates offset); D — responds to rate of change (anticipatory); PI is the most common industrial configuration.',
              'Growing oscillation points to Kp too high.',
              'Persistent offset means the loop needs more integral action.',
              'Slow oscillation with overshoot points to Ti too short.',
              'Noisy output points to Td too high, or a noisy signal that should not carry derivative at all.',
              'Sluggish response points to Kp too low.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Principles of Process Control
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Pneumatic and Hydraulic Controls
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section4_2;
