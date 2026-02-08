import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Principles of Process Control - MOET Module 5 Section 4.1";
const DESCRIPTION = "Comprehensive guide to process control principles for electrical maintenance technicians: open and closed loop control, feedback systems, feedforward strategies, control modes and industrial applications under ST1426.";

const quickCheckQuestions = [
  {
    id: "open-vs-closed",
    question: "What is the fundamental difference between open loop and closed loop control?",
    options: [
      "Open loop uses digital signals; closed loop uses analogue signals",
      "Closed loop uses feedback from the process output to adjust the input; open loop does not",
      "Open loop is more accurate than closed loop in all situations",
      "Closed loop systems cannot be used in industrial environments"
    ],
    correctIndex: 1,
    explanation: "The defining characteristic of closed loop control is the feedback path: the process output is measured by a sensor, compared with the desired setpoint, and the error signal is used to adjust the controller output. Open loop control has no feedback — the output is not measured, so the controller cannot compensate for disturbances or changes in the process."
  },
  {
    id: "setpoint-error",
    question: "In a closed loop control system, what is the 'error signal'?",
    options: [
      "A fault indication from the controller hardware",
      "The difference between the setpoint and the measured process variable",
      "The maximum output the controller can deliver",
      "An alarm triggered when a sensor fails"
    ],
    correctIndex: 1,
    explanation: "The error signal (also called deviation) is the difference between the desired value (setpoint) and the actual measured value (process variable). The controller uses this error signal to determine the corrective action needed. When the error is zero, the process is at setpoint and no correction is required."
  },
  {
    id: "feedforward-purpose",
    question: "What is the main advantage of feedforward control over pure feedback control?",
    options: [
      "It is cheaper to implement",
      "It can take corrective action before a disturbance affects the process output",
      "It does not require any sensors",
      "It eliminates the need for a controller"
    ],
    correctIndex: 1,
    explanation: "Feedforward control measures disturbances before they affect the process and takes corrective action in advance. This is its key advantage over pure feedback control, which can only react after the process output has already deviated from setpoint. In practice, feedforward is often combined with feedback to give both anticipatory and corrective control."
  },
  {
    id: "control-element",
    question: "Which component in a control loop is the 'final control element'?",
    options: [
      "The sensor that measures the process variable",
      "The controller that calculates the output signal",
      "The device that physically adjusts the process, such as a control valve or variable speed drive",
      "The setpoint dial on the operator interface"
    ],
    correctIndex: 2,
    explanation: "The final control element is the device that directly manipulates the process to bring the controlled variable towards setpoint. Common examples include control valves (adjusting flow), variable speed drives (adjusting motor speed), heating elements (adjusting temperature) and dampers (adjusting airflow). It receives the controller output signal and converts it into physical action."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A domestic toaster that runs for a fixed time regardless of bread colour is an example of:",
    options: [
      "Closed loop control with feedback",
      "Open loop control without feedback",
      "Cascade control",
      "Feedforward control"
    ],
    correctAnswer: 1,
    explanation: "A basic toaster runs for a set time with no measurement of the toast colour. This is open loop control — there is no feedback sensor to detect the actual output (toast darkness) and adjust the process accordingly."
  },
  {
    id: 2,
    question: "In a closed loop temperature control system, the sensor measures 48 degrees C and the setpoint is 50 degrees C. The error signal is:",
    options: [
      "-2 degrees C",
      "+2 degrees C",
      "48 degrees C",
      "50 degrees C"
    ],
    correctAnswer: 1,
    explanation: "Error = Setpoint minus Process Variable = 50 - 48 = +2 degrees C. A positive error means the process is below setpoint, so the controller will increase its output to raise the temperature."
  },
  {
    id: 3,
    question: "Which of the following is NOT a component of a basic control loop?",
    options: [
      "Sensor/transmitter",
      "Controller",
      "Final control element",
      "Programmable logic controller (PLC) in every case"
    ],
    correctAnswer: 3,
    explanation: "The three essential components of any control loop are the sensor (measurement), the controller (decision), and the final control element (action). A PLC is one type of controller but is not required in every loop — analogue controllers, DCS systems, and even pneumatic controllers can fulfil the controller role."
  },
  {
    id: 4,
    question: "A thermostat that switches a heater fully on below setpoint and fully off above setpoint is using which control mode?",
    options: [
      "Proportional control",
      "On-off (bang-bang) control",
      "Integral control",
      "Derivative control"
    ],
    correctAnswer: 1,
    explanation: "On-off control (also called bang-bang control) is the simplest control mode. The output is either 100% or 0% depending on whether the process variable is below or above setpoint. It is cheap and simple but causes oscillation around the setpoint, with the process variable cycling above and below the desired value."
  },
  {
    id: 5,
    question: "In a cascade control arrangement, the output of the primary controller becomes:",
    options: [
      "The feedback signal for the sensor",
      "The setpoint for the secondary controller",
      "The alarm threshold",
      "The process variable"
    ],
    correctAnswer: 1,
    explanation: "In cascade control, the primary (master) controller monitors the main process variable and its output signal becomes the setpoint for the secondary (slave) controller. The secondary controller then manipulates the final control element. This arrangement improves response to disturbances that affect the secondary loop."
  },
  {
    id: 6,
    question: "A 4-20 mA signal representing 0-100% of a process variable has a current reading of 12 mA. What percentage does this represent?",
    options: [
      "30%",
      "50%",
      "60%",
      "75%"
    ],
    correctAnswer: 1,
    explanation: "The 4-20 mA range spans 16 mA (20 - 4 = 16). At 12 mA, the signal is 8 mA above the zero (12 - 4 = 8). Percentage = (8 / 16) x 100 = 50%. This standard signal range is used because a live zero of 4 mA allows detection of cable breaks (0 mA indicates a fault, not a zero reading)."
  },
  {
    id: 7,
    question: "What does 'dead time' mean in process control?",
    options: [
      "The time when the controller is switched off",
      "The delay between a change in controller output and the first measurable effect on the process variable",
      "The time taken to calibrate a sensor",
      "The period between maintenance shutdowns"
    ],
    correctAnswer: 1,
    explanation: "Dead time (also called transport delay or pure delay) is the time elapsed between a change being made at the final control element and the sensor first detecting a change in the process variable. It is caused by physical transport of material or energy through the process and cannot be eliminated — it can only be compensated for in the controller tuning."
  },
  {
    id: 8,
    question: "Which control strategy measures a disturbance before it affects the process output?",
    options: [
      "Feedback control",
      "On-off control",
      "Feedforward control",
      "Manual control"
    ],
    correctAnswer: 2,
    explanation: "Feedforward control measures the disturbance variable directly and takes corrective action before the disturbance reaches the process output. For example, in a heat exchanger, a feedforward system might measure the incoming fluid temperature and adjust the steam valve before the outlet temperature changes."
  },
  {
    id: 9,
    question: "The 'process variable' in a control loop is:",
    options: [
      "The desired value set by the operator",
      "The actual measured value of the controlled condition",
      "The output signal from the controller",
      "The type of controller used"
    ],
    correctAnswer: 1,
    explanation: "The process variable (PV) is the actual, measured value of the condition being controlled — for example, the actual temperature, pressure, flow rate or level in the process. It is measured by the sensor and fed back to the controller for comparison with the setpoint."
  },
  {
    id: 10,
    question: "Why is the 4-20 mA standard preferred over 0-20 mA for industrial process signals?",
    options: [
      "It uses less electrical power",
      "The live zero at 4 mA allows differentiation between a true zero reading and a cable fault",
      "It is compatible with digital signals only",
      "It produces a stronger electromagnetic field"
    ],
    correctAnswer: 1,
    explanation: "With 4-20 mA, a reading of 0 mA is never a valid signal — it always indicates a fault such as a broken cable, loose connection or failed transmitter. With 0-20 mA, a zero reading could mean either a genuine zero process value or a fault, making fault detection impossible. This 'live zero' principle is fundamental to industrial instrumentation safety."
  },
  {
    id: 11,
    question: "In ratio control, the controller maintains:",
    options: [
      "A constant process variable regardless of load",
      "A fixed ratio between two process variables",
      "Equal pressure across a control valve",
      "A fixed controller output signal"
    ],
    correctAnswer: 1,
    explanation: "Ratio control maintains a predetermined ratio between two variables. A common example is maintaining the correct fuel-to-air ratio in a burner system: as the fuel flow changes, the air flow is automatically adjusted to maintain the correct combustion ratio. The ratio can be adjusted by the operator to optimise the process."
  },
  {
    id: 12,
    question: "Under ST1426, understanding process control principles is important for maintenance technicians because:",
    options: [
      "They only work on domestic heating systems",
      "They need to diagnose faults in automated systems, understand control strategies and communicate with instrumentation engineers",
      "Process control is only relevant to chemical engineers",
      "It is optional knowledge not assessed in the EPA"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to understand the principles of control systems so they can diagnose faults in automated plant, interpret control system documentation, carry out basic tuning and calibration, and work effectively with instrumentation and control engineers. This knowledge is assessed in the end-point assessment."
  }
];

const faqs = [
  {
    question: "What is the difference between a setpoint and a process variable?",
    answer: "The setpoint (SP) is the desired value — what you want the process to be. The process variable (PV) is the actual measured value — what the process currently is. The controller compares these two values and generates an output to drive the PV towards the SP. For example, if you set a room thermostat to 21 degrees C, that is the setpoint. The actual room temperature measured by the sensor is the process variable."
  },
  {
    question: "Why do some processes need closed loop control while others work fine with open loop?",
    answer: "Closed loop control is needed when the process is subject to disturbances that would cause the output to drift from the desired value, or when precise control is required. Open loop works when the relationship between input and output is well-known and stable, disturbances are minimal, and exact precision is not critical. For example, a conveyor belt running at a fixed speed is often open loop, while a furnace temperature must be closed loop because heat loss varies with ambient conditions and load."
  },
  {
    question: "What is meant by 'loop tuning' and why does it matter?",
    answer: "Loop tuning is the process of adjusting the controller parameters (P, I and D values) to achieve the best possible control performance for a specific process. Poorly tuned loops can oscillate wildly, respond too slowly, or never reach setpoint. Proper tuning ensures stable, responsive control that minimises energy waste and maintains product quality. As a maintenance technician, you will be expected to recognise poorly tuned loops and carry out basic tuning adjustments."
  },
  {
    question: "How do I know if a control loop has a problem?",
    answer: "Common signs of loop problems include: the process variable oscillating continuously around setpoint; the PV drifting steadily away from setpoint; slow response to load changes; the final control element constantly hunting (moving back and forth); excessive energy consumption; and poor product quality. Trending the PV, SP and controller output over time is the most effective diagnostic technique — a well-tuned loop should respond smoothly without excessive oscillation."
  },
  {
    question: "What is the difference between analogue and digital control signals?",
    answer: "Analogue signals (such as 4-20 mA or 0-10 V) vary continuously and represent the process variable as a proportional electrical quantity. Digital signals use discrete values (binary data) transmitted via communication protocols such as HART, Foundation Fieldbus or Profibus. Many modern instruments support both: the analogue signal for the basic control loop and a digital signal overlay for diagnostics, configuration and status information."
  },
  {
    question: "Is process control only relevant to large industrial plants?",
    answer: "No. Process control principles apply everywhere — from domestic central heating thermostats and refrigeration systems to commercial HVAC, water treatment works, food manufacturing and large-scale chemical plants. As an electrical maintenance technician, you will encounter control loops in virtually every industrial and commercial environment, whether it is a simple on-off heating control or a complex multi-loop DCS system."
  }
];

const MOETModule5Section4_1 = () => {
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
            <Settings className="h-4 w-4" />
            <span>Module 5.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Process Control
          </h1>
          <p className="text-white/80">
            Open and closed loop control, feedback systems and control strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Open loop:</strong> No feedback — output not measured or corrected</li>
              <li className="pl-1"><strong>Closed loop:</strong> Feedback from sensor adjusts controller output</li>
              <li className="pl-1"><strong>Error signal:</strong> Setpoint minus process variable drives correction</li>
              <li className="pl-1"><strong>Signal standard:</strong> 4-20 mA analogue with live zero</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault diagnosis:</strong> Understanding loops helps locate control faults</li>
              <li className="pl-1"><strong>Calibration:</strong> Sensors and transmitters need regular calibration</li>
              <li className="pl-1"><strong>Loop tuning:</strong> Poor tuning causes oscillation and energy waste</li>
              <li className="pl-1"><strong>ST1426:</strong> Control system knowledge assessed in EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between open loop and closed loop control systems",
              "Identify the components of a standard control loop",
              "Explain the concepts of setpoint, process variable and error signal",
              "Describe feedback, feedforward and cascade control strategies",
              "Interpret 4-20 mA analogue signal conventions",
              "Relate process control principles to ST1426 maintenance requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is Process Control?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Process control is the discipline of maintaining a process variable — such as temperature, pressure, flow rate
              or level — at a desired value by continuously measuring the variable, comparing it with the target, and making
              adjustments to keep the process within specification. In industrial environments, process control is the
              foundation of consistent product quality, energy efficiency and safe operation.
            </p>
            <p>
              For electrical maintenance technicians working under the ST1426 standard, understanding process control is
              essential because modern industrial plant relies heavily on automated control systems. When these systems
              malfunction, the maintenance technician must be able to diagnose whether the fault lies in the sensor, the
              controller, the wiring, or the final control element. Without a solid grasp of control principles, effective
              fault-finding is impossible.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three Essential Functions of Control</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Measurement:</strong> A sensor detects the current value of the process variable and converts it into an electrical signal (e.g., 4-20 mA, 0-10 V, or a digital value)</li>
                <li className="pl-1"><strong>Comparison:</strong> The controller compares the measured value with the desired setpoint and calculates the error — the difference between actual and desired</li>
                <li className="pl-1"><strong>Correction:</strong> Based on the error, the controller sends a signal to the final control element (valve, drive, heater) to adjust the process and reduce the error towards zero</li>
              </ul>
            </div>

            <p>
              These three functions — measure, compare, correct — form the basis of every control system, from a domestic
              room thermostat to a complex distributed control system managing an entire chemical plant. The sophistication
              of the control depends on the process requirements, but the fundamental principle remains the same.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Process Variables in Industrial Control</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Variable</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Sensor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Final Control Element</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature</td>
                      <td className="border border-white/10 px-3 py-2">RTD (Pt100), thermocouple</td>
                      <td className="border border-white/10 px-3 py-2">Heating element, cooling valve, VSD fan</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure</td>
                      <td className="border border-white/10 px-3 py-2">Pressure transmitter, bourdon tube</td>
                      <td className="border border-white/10 px-3 py-2">Control valve, compressor speed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flow</td>
                      <td className="border border-white/10 px-3 py-2">Electromagnetic, vortex, orifice plate</td>
                      <td className="border border-white/10 px-3 py-2">Control valve, pump VSD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level</td>
                      <td className="border border-white/10 px-3 py-2">Ultrasonic, radar, differential pressure</td>
                      <td className="border border-white/10 px-3 py-2">Inlet/outlet valve, pump control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a maintenance technician, you will work with all of these process variables.
              Understanding the relationship between the sensor, controller and final control element in each loop is
              essential for effective fault diagnosis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Open Loop vs Closed Loop Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All control systems fall into one of two fundamental categories: open loop or closed loop. The distinction is
              simple but critically important — it determines whether the system can respond to disturbances and maintain
              the desired output under changing conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Open Loop Control</h3>
                <p className="text-sm text-white mb-3">
                  In an open loop system, the controller output is determined solely by the input — there is no
                  measurement of the actual output and no feedback path. The controller 'assumes' that the desired
                  output will result from the given input, with no verification.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No feedback sensor — output not measured</li>
                  <li className="pl-1">Cannot compensate for disturbances</li>
                  <li className="pl-1">Simple and inexpensive to implement</li>
                  <li className="pl-1">Suitable where precision is not critical</li>
                  <li className="pl-1">Examples: basic timer, fixed-speed conveyor, traffic lights</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Closed Loop Control</h3>
                <p className="text-sm text-white mb-3">
                  In a closed loop system, the actual output is measured by a sensor and fed back to the controller.
                  The controller continuously compares the measured value with the setpoint and adjusts its output
                  to minimise the error.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Feedback sensor measures actual output</li>
                  <li className="pl-1">Automatically compensates for disturbances</li>
                  <li className="pl-1">More complex and costly than open loop</li>
                  <li className="pl-1">Essential where precision and stability are required</li>
                  <li className="pl-1">Examples: thermostat, cruise control, industrial PID loop</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Feedback Loop — Block Diagram Elements</p>
              <p className="text-sm text-white mb-3">
                A closed loop control system is best understood through its block diagram. Each block represents a
                functional element, and the signal flows in a continuous path — hence the term 'loop'.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Setpoint (SP):</strong> The desired value, set by the operator or a higher-level controller</li>
                <li className="pl-1"><strong>Summing junction:</strong> Where the setpoint and feedback signal are compared to produce the error</li>
                <li className="pl-1"><strong>Controller:</strong> Receives the error signal and calculates the appropriate output using its control algorithm (P, PI, PID etc.)</li>
                <li className="pl-1"><strong>Final control element:</strong> Receives the controller output and physically adjusts the process (valve, drive, heater)</li>
                <li className="pl-1"><strong>Process:</strong> The physical system being controlled (furnace, tank, pipe, motor)</li>
                <li className="pl-1"><strong>Sensor/transmitter:</strong> Measures the process variable and converts it to a standard signal (4-20 mA)</li>
                <li className="pl-1"><strong>Feedback path:</strong> Carries the measured signal back to the summing junction for comparison</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Why Feedback Can Cause Instability</p>
              <p className="text-sm text-white">
                While feedback is essential for accurate control, it can also cause problems. If the controller
                gain is too high, or if there are significant time delays in the loop, the system can become
                unstable — oscillating with increasing amplitude until the process goes out of control. This is
                why loop tuning (adjusting controller parameters) is so important. A maintenance technician who
                understands this concept can recognise when a loop is oscillating and take appropriate action.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When fault-finding a control loop, always start by checking whether the
              loop is actually 'closed'. A disconnected sensor cable, a failed transmitter, or a valve stuck in one
              position effectively converts a closed loop into an open loop — and the process will drift uncontrolled.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Strategies: Feedback, Feedforward and Cascade
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond the basic distinction between open and closed loop, industrial control systems employ a range of
              strategies to achieve the required performance. The three most important are feedback control, feedforward
              control and cascade control. Understanding these strategies is essential for maintaining and troubleshooting
              automated systems.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Feedback Control (Reactive)</h3>
                <p className="text-sm text-white mb-2">
                  Feedback control is the most common strategy. The controller reacts to deviations from setpoint
                  by adjusting the output. Its limitation is that it can only correct errors after they have occurred
                  — there is always some deviation before the correction takes effect.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Measures the process variable after the process</li>
                  <li className="pl-1">Corrects errors after they occur (reactive)</li>
                  <li className="pl-1">Simple to implement and works for most applications</li>
                  <li className="pl-1">Performance limited by dead time and process dynamics</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Feedforward Control (Anticipatory)</h3>
                <p className="text-sm text-white mb-2">
                  Feedforward control measures a disturbance before it affects the process and takes corrective
                  action in advance. This requires knowledge of the relationship between the disturbance and the
                  process, modelled mathematically. In practice, feedforward is almost always combined with feedback
                  to handle unmeasured disturbances.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Measures disturbances before they affect the output</li>
                  <li className="pl-1">Takes corrective action before the error occurs (proactive)</li>
                  <li className="pl-1">Requires accurate process model</li>
                  <li className="pl-1">Example: measuring incoming fluid temperature and adjusting heat input before the outlet temperature changes</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cascade Control (Two Loops)</h3>
                <p className="text-sm text-white mb-2">
                  Cascade control uses two controllers in series. The primary (outer) controller monitors the main
                  process variable, and its output becomes the setpoint for the secondary (inner) controller. The
                  secondary controller manipulates the final control element. This improves response to disturbances
                  that enter the secondary loop.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Primary controller sets the setpoint for the secondary controller</li>
                  <li className="pl-1">Secondary loop responds faster to local disturbances</li>
                  <li className="pl-1">Improves overall control quality for processes with multiple dynamics</li>
                  <li className="pl-1">Example: furnace temperature (primary) controlling fuel flow (secondary)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Other Common Control Strategies</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ratio control</td>
                      <td className="border border-white/10 px-3 py-2">Maintains a fixed ratio between two variables</td>
                      <td className="border border-white/10 px-3 py-2">Fuel-to-air ratio in combustion systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Split range</td>
                      <td className="border border-white/10 px-3 py-2">One controller output drives two or more final elements over different ranges</td>
                      <td className="border border-white/10 px-3 py-2">Heating and cooling valves on a single temperature loop</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Override/selective</td>
                      <td className="border border-white/10 px-3 py-2">Multiple controllers compete; the one with the most urgent demand takes priority</td>
                      <td className="border border-white/10 px-3 py-2">Compressor anti-surge protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Batch/sequential</td>
                      <td className="border border-white/10 px-3 py-2">Steps through a sequence of operations based on time or events</td>
                      <td className="border border-white/10 px-3 py-2">Chemical batch reactor, CIP cleaning cycles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to understand different
              control strategies so you can interpret P&ID drawings, follow loop diagrams during fault-finding, and
              communicate effectively with process and instrumentation engineers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Signal Standards and the 4-20 mA Convention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For the components of a control loop to communicate, they must use a common signal standard. In industrial
              process control, the most widely used analogue signal standard is 4-20 mA. Understanding this convention
              is fundamental for any electrical maintenance technician working with instrumentation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why 4-20 mA?</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Live zero:</strong> The 4 mA lower limit means a reading of 0 mA always indicates a fault (broken cable, failed transmitter) rather than a genuine zero process value</li>
                <li className="pl-1"><strong>Noise immunity:</strong> Current signals are less susceptible to electrical noise and voltage drops over long cable runs than voltage signals</li>
                <li className="pl-1"><strong>Two-wire operation:</strong> Many 4-20 mA transmitters can be powered from the same two wires that carry the signal, simplifying installation</li>
                <li className="pl-1"><strong>Standardisation:</strong> The 4-20 mA range is defined in IEC 60381-1 and is universally supported by instrumentation manufacturers</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Signal Values</p>
              <p className="text-sm text-white mb-3">
                The relationship between the process variable range and the 4-20 mA signal is linear. The formula is:
              </p>
              <div className="p-3 rounded bg-white/5 text-sm font-mono mb-3">
                mA = 4 + (PV - PV_min) / (PV_max - PV_min) x 16
              </div>
              <p className="text-sm text-white mb-2">For example, a temperature transmitter ranged 0-200 degrees C:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">At 0 degrees C: 4 + (0/200) x 16 = 4.0 mA (0%)</li>
                <li className="pl-1">At 50 degrees C: 4 + (50/200) x 16 = 8.0 mA (25%)</li>
                <li className="pl-1">At 100 degrees C: 4 + (100/200) x 16 = 12.0 mA (50%)</li>
                <li className="pl-1">At 200 degrees C: 4 + (200/200) x 16 = 20.0 mA (100%)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Signal Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Signal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-20 mA</td>
                      <td className="border border-white/10 px-3 py-2">4 mA = 0%, 20 mA = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Process transmitters, valve positioners, controller I/O</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-10 V DC</td>
                      <td className="border border-white/10 px-3 py-2">0 V = 0%, 10 V = 100%</td>
                      <td className="border border-white/10 px-3 py-2">HVAC controls, building management systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-5 V DC</td>
                      <td className="border border-white/10 px-3 py-2">1 V = 0%, 5 V = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Older pneumatic-to-electronic converters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-15 psi</td>
                      <td className="border border-white/10 px-3 py-2">3 psi = 0%, 15 psi = 100%</td>
                      <td className="border border-white/10 px-3 py-2">Pneumatic instruments (legacy systems)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HART digital</td>
                      <td className="border border-white/10 px-3 py-2">Digital overlay on 4-20 mA</td>
                      <td className="border border-white/10 px-3 py-2">Smart transmitters with diagnostics and configuration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Fault Detection with Live Zero</p>
              <p className="text-sm text-white">
                The live zero principle is a safety feature. If you measure 0 mA on a 4-20 mA loop, you know
                immediately that there is a fault — a cable break, a blown fuse, a failed transmitter, or a
                disconnected terminal. Without the live zero (i.e., using 0-20 mA), a reading of 0 mA could mean
                either zero process variable or a complete system failure. Always check for 0 mA as a first step
                when troubleshooting instrumentation faults.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> A multimeter set to mA range in series with the loop is the most
              basic diagnostic tool for a 4-20 mA circuit. You can also use a loop calibrator to inject a known
              current and test the entire signal chain from transmitter input to controller display.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Process Dynamics and Control Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every real process has dynamic characteristics that determine how it responds to changes. Understanding
              these dynamics is essential for tuning controllers, diagnosing oscillation problems, and predicting how
              a process will behave when disturbances occur. The three key dynamic characteristics are gain, dead time
              and time constant.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Process Dynamic Characteristics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Process gain:</strong> The ratio of the change in process variable to the change in controller output. A high-gain process is sensitive — a small change in controller output causes a large change in the process variable</li>
                <li className="pl-1"><strong>Dead time (transport delay):</strong> The time between a change at the final control element and the first detectable change at the sensor. Long dead times make control difficult because the controller is 'flying blind' during the delay</li>
                <li className="pl-1"><strong>Time constant:</strong> The time taken for the process to reach approximately 63% of its final value after a step change. It characterises how quickly the process responds — a large time constant means a slow, sluggish process</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fast Processes</h3>
                <p className="text-sm text-white">
                  Processes with short time constants and minimal dead time respond quickly to controller output
                  changes. Examples include flow control and pressure control in gas systems. These processes can
                  be controlled tightly with high controller gains, but they are also prone to oscillation if the
                  controller is over-tuned.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Slow Processes</h3>
                <p className="text-sm text-white">
                  Processes with long time constants and significant dead time respond slowly. Temperature control
                  in large vessels and pH control in mixing tanks are typical examples. These require patient
                  controller settings with lower gains, and they can be frustrating to tune because changes take
                  a long time to show their effect.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Control Performance Measures</h3>
              <p className="text-sm text-white mb-3">
                When assessing whether a control loop is performing well, maintenance technicians should look at
                several key indicators:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Offset:</strong> A sustained difference between setpoint and process variable — indicates the controller lacks integral action or has a tuning problem</li>
                <li className="pl-1"><strong>Overshoot:</strong> The process variable exceeds the setpoint before settling — excessive overshoot may indicate too much proportional gain</li>
                <li className="pl-1"><strong>Oscillation:</strong> The process variable cycles continuously around setpoint — indicates the loop may be unstable or poorly tuned</li>
                <li className="pl-1"><strong>Settling time:</strong> The time taken for the process to stabilise at the new setpoint after a change — should be as short as possible without excessive overshoot</li>
                <li className="pl-1"><strong>Steady-state accuracy:</strong> How closely the process variable matches setpoint once the transient has died out</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Common Control Modes</h3>
              <p className="text-sm text-white mb-3">
                The control mode determines how the controller calculates its output from the error signal.
                The most common modes, which will be covered in detail in Section 5.4.2, are:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>On-off:</strong> Output is either fully on or fully off — simple but causes cycling around setpoint</li>
                <li className="pl-1"><strong>Proportional (P):</strong> Output is proportional to the error — provides fast response but always has offset</li>
                <li className="pl-1"><strong>Proportional + Integral (PI):</strong> Adds integral action to eliminate offset — the most common mode in process control</li>
                <li className="pl-1"><strong>Proportional + Integral + Derivative (PID):</strong> Adds derivative action for faster response to rapid changes — used where tight control is needed</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Process control is a deep discipline, and the principles covered here provide the
              foundation you need as an electrical maintenance technician. The following sections in this module will
              build on these concepts, covering PID tuning (5.4.2), pneumatic and hydraulic controls (5.4.3), control
              valves (5.4.4), DCS systems (5.4.5) and instrument calibration (5.4.6).
            </p>
          </div>
        </section>

        {/* Divider */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Control Loop Components</p>
                <ul className="space-y-0.5">
                  <li>1. Sensor/transmitter — measures the PV</li>
                  <li>2. Controller — compares SP and PV, calculates output</li>
                  <li>3. Final control element — adjusts the process</li>
                  <li>4. Feedback path — returns measured PV to controller</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Signal Standards</p>
                <ul className="space-y-0.5">
                  <li>4-20 mA — standard process signal (live zero)</li>
                  <li>0-10 V DC — HVAC and BMS systems</li>
                  <li>3-15 psi — pneumatic instruments</li>
                  <li>HART — digital overlay on 4-20 mA</li>
                  <li>IEC 60381-1 — signal standard reference</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-2">
              Next: PID Control Loops
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section4_1;