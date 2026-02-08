import { ArrowLeft, RotateCcw, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "PID Control Loops - MOET Module 5 Section 4.2";
const DESCRIPTION = "Comprehensive guide to PID control for electrical maintenance technicians: proportional, integral and derivative control actions, tuning methods, controller response and industrial applications under ST1426.";

const quickCheckQuestions = [
  {
    id: "proportional-action",
    question: "What does the proportional (P) term in a PID controller do?",
    options: [
      "Eliminates steady-state offset completely",
      "Produces an output proportional to the current error signal",
      "Predicts the future error based on rate of change",
      "Resets the controller output to zero when the error is zero"
    ],
    correctIndex: 1,
    explanation: "The proportional term produces a controller output that is directly proportional to the current error. If the error doubles, the proportional output doubles. The proportional band (or gain) determines the sensitivity — a narrow proportional band (high gain) gives a large output for a small error. However, proportional action alone always leaves a residual offset from setpoint."
  },
  {
    id: "integral-purpose",
    question: "What is the primary purpose of the integral (I) term in a PID controller?",
    options: [
      "To speed up the initial response to a step change",
      "To predict future errors and act in advance",
      "To eliminate steady-state offset by accumulating the error over time",
      "To reduce controller output when the error is large"
    ],
    correctIndex: 2,
    explanation: "The integral term accumulates the error over time. Even if the current error is very small, the integral action continues to increase the controller output until the error reaches exactly zero. This eliminates the steady-state offset that proportional action alone cannot remove. The integral time (Ti) determines how aggressively the integral acts."
  },
  {
    id: "derivative-action",
    question: "When is the derivative (D) term most useful in a PID controller?",
    options: [
      "When the process variable is constant and not changing",
      "When the error is changing rapidly and the controller needs to anticipate the trend",
      "When the sensor has failed and no feedback is available",
      "When the final control element is fully saturated"
    ],
    correctIndex: 1,
    explanation: "The derivative term responds to the rate of change of the error. When the error is changing rapidly, derivative action provides an additional 'kick' to the output, effectively anticipating where the error is heading. This is most useful on processes with large time constants where early intervention can prevent excessive overshoot. It is rarely used on noisy processes as it amplifies signal noise."
  },
  {
    id: "tuning-oscillation",
    question: "If a control loop is oscillating with increasing amplitude, what is the most likely cause?",
    options: [
      "The controller gain is too low",
      "The integral time is too long",
      "The controller gain is too high, causing the loop to become unstable",
      "The derivative time is too long"
    ],
    correctIndex: 2,
    explanation: "Oscillation with increasing amplitude indicates an unstable loop. The most common cause is excessive controller gain (proportional band too narrow). When the gain is too high, the controller over-corrects for each error, causing the process to swing past setpoint in both directions with each swing getting larger. Reducing the proportional gain (widening the proportional band) is the first corrective action."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A proportional controller with a gain of 2 receives an error signal of 5%. What is the controller output change?",
    options: [
      "2.5%",
      "10%",
      "5%",
      "7%"
    ],
    correctAnswer: 1,
    explanation: "Output change = Gain x Error = 2 x 5% = 10%. Proportional action multiplies the error by the gain to determine the output. A higher gain gives a more aggressive response to errors."
  },
  {
    id: 2,
    question: "The 'proportional band' of a controller is set to 50%. This is equivalent to a gain of:",
    options: [
      "0.5",
      "2",
      "50",
      "5"
    ],
    correctAnswer: 1,
    explanation: "Gain = 100 / Proportional Band = 100 / 50 = 2. Proportional band and gain are inversely related. A narrow proportional band gives a high gain (more aggressive), while a wide proportional band gives a low gain (less aggressive). Different controller manufacturers use different conventions, so always check the documentation."
  },
  {
    id: 3,
    question: "A PI controller is controlling temperature. The process variable has been stable at 1.5 degrees C below setpoint for several minutes. What will the integral action do?",
    options: [
      "Nothing — it only acts on large errors",
      "Gradually increase the controller output until the offset is eliminated",
      "Reduce the controller output to prevent overshoot",
      "Switch the controller to manual mode"
    ],
    correctAnswer: 1,
    explanation: "The integral action accumulates error over time. Even though the error is small and constant at 1.5 degrees C, the integral is continuously adding to the output. Over time, the output increases enough to bring the process variable up to setpoint, eliminating the offset. This is precisely what proportional action alone cannot achieve."
  },
  {
    id: 4,
    question: "Integral wind-up occurs when:",
    options: [
      "The integral time is set too short",
      "The controller output saturates at its limit while the integral term continues to accumulate",
      "The derivative term becomes too large",
      "The sensor provides a noisy signal"
    ],
    correctAnswer: 1,
    explanation: "Integral wind-up happens when the controller output has reached its maximum (or minimum) limit but the error persists — for example, during a large setpoint change or if the final control element is stuck. The integral term keeps accumulating even though the output cannot increase further. When the error eventually reverses, there is a large delay before the wound-up integral unwinds, causing overshoot. Anti-wind-up measures are built into modern controllers to prevent this."
  },
  {
    id: 5,
    question: "The Ziegler-Nichols tuning method involves:",
    options: [
      "Setting all three PID parameters to zero and increasing them simultaneously",
      "Increasing the proportional gain until the loop oscillates continuously, then calculating P, I and D from the ultimate gain and period",
      "Using a computer simulation to optimise the parameters",
      "Copying the parameters from a similar loop on another plant"
    ],
    correctAnswer: 1,
    explanation: "The Ziegler-Nichols ultimate gain method sets the integral and derivative to off, then increases the proportional gain until the loop sustains continuous oscillation. The gain at this point is the ultimate gain (Ku) and the oscillation period is the ultimate period (Pu). PID parameters are then calculated from these values using standard formulae. This method gives aggressive tuning and usually requires further adjustment."
  },
  {
    id: 6,
    question: "Derivative action is generally NOT used on which type of process variable?",
    options: [
      "Temperature",
      "Flow",
      "Level in a large vessel",
      "Pressure in a gas system"
    ],
    correctAnswer: 1,
    explanation: "Flow measurement is typically noisy due to turbulence and pulsation. Since derivative action responds to the rate of change, it amplifies this noise, causing erratic controller output and valve wear. PI control (without D) is the standard choice for flow loops. Derivative is more useful on slow, smooth processes like temperature control in large thermal masses."
  },
  {
    id: 7,
    question: "In a PID controller, what happens if the integral time (Ti) is set too short?",
    options: [
      "The controller becomes very slow to respond",
      "The integral action becomes too aggressive, causing oscillation and overshoot",
      "The controller loses its proportional action",
      "The derivative term is disabled"
    ],
    correctAnswer: 1,
    explanation: "A short integral time means the integral action accumulates rapidly. This makes the controller aggressive in eliminating offset, but if it is too aggressive, it causes the output to overshoot and oscillate. The process variable swings above and below setpoint with each cycle being driven by the integral winding up and unwinding. Increasing the integral time reduces this aggression."
  },
  {
    id: 8,
    question: "A controller is described as having 'direct action'. This means:",
    options: [
      "The controller output increases when the process variable increases above setpoint",
      "The controller output decreases when the process variable increases above setpoint",
      "The controller acts directly without any integral or derivative action",
      "The controller sends the output signal directly to the valve without conversion"
    ],
    correctAnswer: 0,
    explanation: "In direct action, the controller output increases when the process variable rises. This is used when the final control element must open further to reduce the process variable — for example, a cooling valve that needs to open more when the temperature rises. The reverse (output decreases when PV rises) is called 'reverse action' and is used for heating applications where the valve needs to close as temperature rises above setpoint."
  },
  {
    id: 9,
    question: "The 'controller output' in a PID loop is typically expressed as:",
    options: [
      "Degrees Celsius",
      "A percentage from 0% to 100%",
      "Revolutions per minute",
      "Litres per second"
    ],
    correctAnswer: 1,
    explanation: "The controller output is expressed as a percentage of the output range (0% to 100%). This is then converted by the output module and final control element into the physical action needed — for example, 0-100% output might correspond to 4-20 mA to a valve positioner, which in turn positions the valve from fully closed to fully open."
  },
  {
    id: 10,
    question: "When manually tuning a PID loop, the recommended sequence is:",
    options: [
      "Set D first, then I, then P",
      "Set P first to achieve acceptable response, then add I to eliminate offset, then add D if needed for faster response",
      "Set all three simultaneously to factory defaults",
      "Set I first to eliminate offset, then adjust P"
    ],
    correctAnswer: 1,
    explanation: "The standard manual tuning approach is: first set I and D to their minimum (off or very slow), then adjust P to get the fastest response without excessive oscillation. Next, introduce integral action to eliminate offset — start with a long Ti and reduce until offset is corrected without causing oscillation. Finally, if needed, add small amounts of derivative to improve response to rapid changes. Always make one change at a time and observe the effect."
  },
  {
    id: 11,
    question: "What does 'auto-tuning' mean in the context of a PID controller?",
    options: [
      "The controller automatically switches between manual and automatic mode",
      "The controller runs a test sequence and calculates optimised PID parameters based on the process response",
      "The controller automatically adjusts the setpoint based on time of day",
      "The controller tunes the sensor calibration automatically"
    ],
    correctAnswer: 1,
    explanation: "Auto-tuning is a built-in feature of many modern controllers. When initiated, the controller applies a test disturbance (often a relay oscillation or step change), analyses the process response, and calculates appropriate P, I and D values. This provides a good starting point but often requires manual fine-tuning to optimise performance for the specific application."
  },
  {
    id: 12,
    question: "Under ST1426, an electrical maintenance technician should be able to:",
    options: [
      "Design new control systems from scratch",
      "Recognise PID control behaviour, perform basic tuning adjustments and diagnose common loop faults",
      "Write PLC programs for complex batch control",
      "Carry out only mechanical maintenance tasks"
    ],
    correctAnswer: 1,
    explanation: "ST1426 expects maintenance technicians to understand PID control principles sufficiently to recognise normal and abnormal loop behaviour, make basic tuning adjustments, diagnose common faults (sensor failure, valve stuck, poor tuning) and communicate effectively with specialist instrumentation engineers. The technician is not expected to design control systems but must be competent in maintaining them."
  }
];

const faqs = [
  {
    question: "What does PID stand for and why are there three terms?",
    answer: "PID stands for Proportional, Integral, Derivative. Each term addresses a different aspect of control: P provides an immediate response proportional to the current error, I eliminates steady-state offset by accumulating error over time, and D anticipates future error by responding to the rate of change. Together, they provide a versatile control algorithm that can be tuned for most industrial processes. Not all three terms are always used — PI control (without D) is the most common configuration in process control."
  },
  {
    question: "Why does proportional-only control always have an offset?",
    answer: "With proportional-only control, the output is directly proportional to the error. This means the output can only be non-zero when the error is non-zero. To maintain a constant output to the process (to hold the process at a steady state against a load), there must be a constant error. This residual error is called 'offset' or 'droop'. The only way to eliminate it is to add integral action, which can sustain an output even when the error reaches zero."
  },
  {
    question: "How do I know if a loop needs retuning?",
    answer: "Common signs include: continuous oscillation around setpoint (the PV never settles); very slow response to setpoint changes (taking much longer than expected); excessive overshoot after a change; the controller output constantly 'hunting' (moving back and forth); a persistent offset from setpoint despite having integral action; or significantly worse performance than when the loop was originally commissioned. Trending the PV, SP and output over time is the best diagnostic — compare current behaviour with the expected response."
  },
  {
    question: "What is the difference between 'gain' and 'proportional band'?",
    answer: "Gain and proportional band are two ways of expressing the same thing — the sensitivity of proportional action. Gain = 100 / Proportional Band (%). A gain of 4 is equivalent to a proportional band of 25%. A high gain (narrow PB) gives aggressive response; a low gain (wide PB) gives gentle response. Different controller manufacturers use different conventions: some use gain, others use proportional band. Always check which convention your controller uses before making adjustments."
  },
  {
    question: "Can I tune a PID loop without any special software or tools?",
    answer: "Yes. Manual tuning (trial and error) is the most fundamental method and requires only the controller interface and a trend display. The process is: set I and D to minimum, adjust P for best response without oscillation, then slowly introduce I to eliminate offset, then optionally add D. A process reaction curve method (open-loop step test) requires a trend recorder and stopwatch. The Ziegler-Nichols closed-loop method requires the ability to observe oscillation. While software tools and auto-tune functions make tuning faster, every maintenance technician should understand manual tuning."
  }
];

const MOETModule5Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <RotateCcw className="h-4 w-4" />
            <span>Module 5.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            PID Control Loops
          </h1>
          <p className="text-white/80">
            Proportional, integral and derivative control principles and tuning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>P:</strong> Output proportional to error — fast but has offset</li>
              <li className="pl-1"><strong>I:</strong> Accumulates error over time — eliminates offset</li>
              <li className="pl-1"><strong>D:</strong> Responds to rate of change — anticipates trends</li>
              <li className="pl-1"><strong>PI:</strong> Most common industrial configuration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Tuning:</strong> Adjust P, I, D parameters for stable control</li>
              <li className="pl-1"><strong>Oscillation:</strong> Usually caused by gain too high or Ti too short</li>
              <li className="pl-1"><strong>Offset:</strong> Sustained error means integral action is needed</li>
              <li className="pl-1"><strong>ST1426:</strong> Basic PID understanding required for EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the function of proportional, integral and derivative control actions",
              "Calculate controller output for given error signals and PID parameters",
              "Identify common PID tuning problems from process trends",
              "Describe manual and automatic tuning methods for PID controllers",
              "Recognise the effects of integral wind-up and controller saturation",
              "Apply PID knowledge to fault diagnosis under ST1426 requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Proportional Control (P)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proportional control is the foundation of PID. The controller output is directly proportional to the
              error signal — the difference between setpoint and process variable. When the error is large, the output
              is large; when the error is small, the output is small. This provides an immediate, intuitive response
              to deviations from setpoint.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Proportional Equation</p>
              <div className="p-3 rounded bg-white/5 text-sm font-mono mb-3">
                Output = Kp x Error + Bias
              </div>
              <p className="text-sm text-white mb-2">Where:</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Kp</strong> = Proportional gain (dimensionless ratio)</li>
                <li className="pl-1"><strong>Error</strong> = Setpoint minus Process Variable (SP - PV)</li>
                <li className="pl-1"><strong>Bias</strong> = The output value when error is zero (typically 50%)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proportional Band</p>
              <p className="text-sm text-white mb-3">
                Proportional band (PB) is an alternative way to express the proportional sensitivity. It represents
                the range of the process variable over which the controller output moves from 0% to 100%.
              </p>
              <div className="p-3 rounded bg-white/5 text-sm font-mono mb-3">
                PB (%) = 100 / Kp &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp; Kp = 100 / PB (%)
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Narrow PB (e.g., 10%):</strong> High gain (Kp = 10), very sensitive — large output change for small error</li>
                <li className="pl-1"><strong>Wide PB (e.g., 200%):</strong> Low gain (Kp = 0.5), gentle — small output change for large error</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">The Offset Problem</p>
              <p className="text-sm text-white">
                The fundamental limitation of proportional-only control is offset — a permanent difference between
                setpoint and process variable. Because the output is proportional to the error, the controller
                needs a non-zero error to produce a non-zero output. When the process is under load, the controller
                must maintain an output to balance the load, which requires a sustained error. Increasing the gain
                reduces the offset but increases the risk of oscillation. Only integral action can eliminate offset
                completely.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical example:</strong> A proportional-only temperature controller with a gain of 5 is
              controlling a furnace at 200 degrees C setpoint. Under load, the furnace needs 60% output to maintain
              temperature. With 50% bias, the error must be (60-50)/5 = 2 degrees C, so the actual temperature
              settles at 198 degrees C — a 2 degree offset.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Integral Control (I) — Eliminating Offset
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Integral action addresses the offset limitation of proportional control. It works by accumulating
              (integrating) the error over time. Even if the error is very small, the integral keeps adding to the
              controller output until the error reaches zero. This is why PI control — proportional plus integral —
              is the most widely used control configuration in industry.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Integral Action Works</p>
              <p className="text-sm text-white mb-3">
                The integral contribution is proportional to the sum of all past errors multiplied by the time
                interval. In mathematical terms, it is the area under the error-time curve.
              </p>
              <div className="p-3 rounded bg-white/5 text-sm font-mono mb-3">
                I output = (Kp / Ti) x integral of error over time
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ti (integral time):</strong> Determines the speed of integral action. Short Ti = fast integral = aggressive offset elimination. Long Ti = slow integral = gentle correction</li>
                <li className="pl-1"><strong>Repeats per minute:</strong> Some controllers express integral as repeats/minute (the inverse of Ti in minutes). More repeats = faster integral action</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Integral Action</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Eliminates steady-state offset completely</li>
                  <li className="pl-1">Ensures the PV reaches setpoint exactly</li>
                  <li className="pl-1">Automatically compensates for slow load changes</li>
                  <li className="pl-1">Essential for processes requiring zero-offset accuracy</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Risks of Integral Action</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Slows the overall loop response</li>
                  <li className="pl-1">Can cause overshoot if Ti is too short</li>
                  <li className="pl-1">Integral wind-up during saturation periods</li>
                  <li className="pl-1">Makes noisy loops oscillate if set aggressively</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Integral Wind-Up</p>
              <p className="text-sm text-white">
                Integral wind-up is a dangerous condition that occurs when the controller output saturates at
                its maximum (or minimum) limit but the error persists — for example, during a large setpoint change
                when the valve is fully open but the process has not yet reached setpoint. The integral term
                continues to accumulate, building up a large value. When the PV finally crosses setpoint, the
                wound-up integral prevents the controller from reducing its output, causing significant overshoot.
                Modern controllers include anti-wind-up features that stop the integral accumulating when the
                output is saturated.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> If you see a process overshooting significantly after a setpoint
              change or after recovering from a disturbance, integral wind-up is a likely cause. Check the
              anti-wind-up settings in the controller configuration and ensure they are enabled.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Derivative Control (D) — Anticipating Change
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Derivative action is the third component of PID control. It responds to the rate of change of the
              error — how fast the error is changing, rather than its current magnitude or accumulated history.
              By responding to the rate of change, derivative action provides an anticipatory element, acting
              before the error becomes large.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Derivative Action Works</p>
              <div className="p-3 rounded bg-white/5 text-sm font-mono mb-3">
                D output = Kp x Td x (rate of change of error)
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Td (derivative time):</strong> Determines the strength of derivative action. Longer Td = more derivative effect</li>
                <li className="pl-1"><strong>When error is changing rapidly:</strong> D output is large, adding extra correction</li>
                <li className="pl-1"><strong>When error is constant:</strong> D output is zero — derivative only responds to change</li>
                <li className="pl-1"><strong>When error is decreasing:</strong> D output opposes the proportional action, acting as a brake to prevent overshoot</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Derivative Action</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Suitable for D Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">NOT Suitable for D Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature control (slow, smooth signal)</td>
                      <td className="border border-white/10 px-3 py-2">Flow control (noisy signal)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large thermal mass processes</td>
                      <td className="border border-white/10 px-3 py-2">Level control in agitated vessels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Processes with significant dead time</td>
                      <td className="border border-white/10 px-3 py-2">Pressure control in gas systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Batch process temperature ramps</td>
                      <td className="border border-white/10 px-3 py-2">Any process with noisy measurement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Derivative and Signal Noise</p>
              <p className="text-sm text-white">
                The biggest practical problem with derivative action is its sensitivity to noise. Since it
                responds to the rate of change, any high-frequency noise on the measurement signal is amplified.
                This causes rapid, erratic changes in controller output, which can damage actuators and valves.
                Most modern controllers include a derivative filter that limits the high-frequency response, but
                on noisy signals it is often better to disable derivative entirely and use PI control only.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Full PID control is less common than you might expect. In most
              industrial applications, PI control (without derivative) provides adequate performance. PID with
              all three terms active is reserved for processes where the improved response to rapid changes
              justifies the additional complexity of tuning and the risk of noise amplification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Tuning Methods for PID Controllers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tuning a PID controller means adjusting the P, I and D parameters to achieve the best possible
              control performance for the specific process. Good tuning results in stable, responsive control
              with minimal oscillation, overshoot and settling time. Poor tuning causes constant oscillation,
              sluggish response, or both — wasting energy, reducing product quality and wearing out actuators.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Method 1: Manual Tuning (Trial and Error)</h3>
                <p className="text-sm text-white mb-2">
                  The most fundamental method, suitable when you have access to the controller and can observe
                  the process response in real time.
                </p>
                <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                  <li className="pl-1">Set integral to maximum Ti (slowest) and derivative to zero</li>
                  <li className="pl-1">Adjust proportional gain until the response to a small setpoint change shows approximately quarter-wave damping (each successive oscillation is about one-quarter the amplitude of the previous)</li>
                  <li className="pl-1">Reduce integral time (increase speed) until offset is eliminated without causing oscillation</li>
                  <li className="pl-1">If needed, increase derivative time cautiously to reduce overshoot on setpoint changes</li>
                  <li className="pl-1">Make one change at a time and allow the process to stabilise before making the next adjustment</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Method 2: Ziegler-Nichols Ultimate Gain</h3>
                <p className="text-sm text-white mb-2">
                  A systematic method that determines tuning parameters from the point of sustained oscillation.
                </p>
                <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                  <li className="pl-1">Set I and D to off (Ti = maximum, Td = 0)</li>
                  <li className="pl-1">Gradually increase Kp until the loop sustains continuous oscillation at constant amplitude</li>
                  <li className="pl-1">Record the ultimate gain (Ku) and the oscillation period (Pu)</li>
                  <li className="pl-1">Calculate PID parameters: Kp = 0.6 x Ku, Ti = Pu / 2, Td = Pu / 8</li>
                  <li className="pl-1">Apply values and fine-tune as needed (Z-N often gives aggressive starting values)</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Method 3: Auto-Tuning</h3>
                <p className="text-sm text-white mb-2">
                  Many modern controllers and DCS systems include built-in auto-tune functions that automate the
                  tuning process. The controller applies a test disturbance, analyses the response, and calculates
                  appropriate PID parameters.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Initiated from the controller front panel or engineering station</li>
                  <li className="pl-1">Usually uses relay feedback or step-test methodology</li>
                  <li className="pl-1">Provides good starting parameters but may need manual refinement</li>
                  <li className="pl-1">Should only be run when the process is stable and within normal operating range</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Recognising Tuning Problems from Trends</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Symptom on Trend</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Likely Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Corrective Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Growing oscillation</td>
                      <td className="border border-white/10 px-3 py-2">Gain too high</td>
                      <td className="border border-white/10 px-3 py-2">Reduce Kp (widen PB)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Constant amplitude oscillation</td>
                      <td className="border border-white/10 px-3 py-2">Gain at critical value</td>
                      <td className="border border-white/10 px-3 py-2">Reduce Kp slightly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Slow oscillation with overshoot</td>
                      <td className="border border-white/10 px-3 py-2">Integral too aggressive (Ti too short)</td>
                      <td className="border border-white/10 px-3 py-2">Increase Ti</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Persistent offset, no oscillation</td>
                      <td className="border border-white/10 px-3 py-2">Insufficient integral action</td>
                      <td className="border border-white/10 px-3 py-2">Decrease Ti or check I is enabled</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sluggish, very slow response</td>
                      <td className="border border-white/10 px-3 py-2">Gain too low</td>
                      <td className="border border-white/10 px-3 py-2">Increase Kp (narrow PB)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Erratic, noisy output signal</td>
                      <td className="border border-white/10 px-3 py-2">Derivative on noisy signal</td>
                      <td className="border border-white/10 px-3 py-2">Reduce or remove Td</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard expects you to be able to recognise
              the symptoms of poor tuning, carry out basic adjustments, and know when to involve a specialist
              instrument engineer for complex tuning problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Considerations and Controller Configurations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In real-world industrial applications, PID controllers must deal with practical issues that textbook
              theory does not always address. Understanding these practical considerations is what separates an
              effective maintenance technician from one who can only follow procedures.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Manual vs Automatic Mode</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Automatic:</strong> The controller calculates and applies the output based on PID algorithm — normal operating mode</li>
                <li className="pl-1"><strong>Manual:</strong> The operator directly sets the controller output — used during commissioning, tuning, fault-finding or when the control loop has a problem</li>
                <li className="pl-1"><strong>Bumpless transfer:</strong> When switching between manual and automatic, the controller should match the output so there is no sudden jump (bump) in the process. Most modern controllers handle this automatically, but it must be verified during commissioning</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Direct and Reverse Action</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct action:</strong> Output increases when PV increases — used for cooling applications (valve opens more to provide more cooling as temperature rises)</li>
                <li className="pl-1"><strong>Reverse action:</strong> Output decreases when PV increases — used for heating applications (valve closes as temperature rises above setpoint)</li>
                <li className="pl-1"><strong>Critical check:</strong> Incorrect action setting causes the controller to drive the process away from setpoint rather than towards it — always verify during commissioning</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Common Controller Configurations</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">P only</td>
                      <td className="border border-white/10 px-3 py-2">Level control (non-critical)</td>
                      <td className="border border-white/10 px-3 py-2">Offset is acceptable; simple and stable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PI</td>
                      <td className="border border-white/10 px-3 py-2">Flow, pressure, most temperature loops</td>
                      <td className="border border-white/10 px-3 py-2">Eliminates offset; D not needed or signal too noisy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PID</td>
                      <td className="border border-white/10 px-3 py-2">Slow temperature processes, batch control</td>
                      <td className="border border-white/10 px-3 py-2">D improves response on slow, clean signals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PD (rare)</td>
                      <td className="border border-white/10 px-3 py-2">Some position control systems</td>
                      <td className="border border-white/10 px-3 py-2">Fast response needed; offset acceptable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> When fault-finding a control loop, always check the controller configuration
              first — action direction, PID parameters, alarm limits, output limits and signal range. Many apparent
              'process problems' are actually controller configuration errors introduced during maintenance or
              software updates.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">PID Actions</p>
                <ul className="space-y-0.5">
                  <li>P — Output proportional to error (immediate)</li>
                  <li>I — Accumulates error over time (eliminates offset)</li>
                  <li>D — Responds to rate of change (anticipatory)</li>
                  <li>PI — Most common industrial configuration</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Tuning Symptom Guide</p>
                <ul className="space-y-0.5">
                  <li>Growing oscillation = Kp too high</li>
                  <li>Persistent offset = needs more integral</li>
                  <li>Slow oscillation = Ti too short</li>
                  <li>Noisy output = Td too high or noisy signal</li>
                  <li>Sluggish response = Kp too low</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Principles of Process Control
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-3">
              Next: Pneumatic and Hydraulic Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section4_2;