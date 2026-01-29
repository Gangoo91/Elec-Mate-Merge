import { ArrowLeft, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Control Strategies - HNC Module 8 Section 5.5";
const DESCRIPTION = "Master BMS control strategies: PID control theory and tuning, cascade control loops, optimised start/stop algorithms, demand-based control (DCV), chilled water reset, supply air temperature reset and night setback strategies.";

const quickCheckQuestions = [
  {
    id: "pid-components",
    question: "In a PID controller, which term responds to the current error value and provides immediate corrective action?",
    options: ["Proportional (P)", "Integral (I)", "Derivative (D)", "All three equally"],
    correctIndex: 0,
    explanation: "The Proportional term provides output directly proportional to the current error. It gives immediate response but cannot eliminate steady-state error on its own."
  },
  {
    id: "cascade-benefit",
    question: "What is the primary benefit of cascade control over single-loop control?",
    options: ["Lower installation cost", "Faster response to secondary disturbances", "Simpler programming", "Reduced sensor requirements"],
    correctIndex: 1,
    explanation: "Cascade control places a secondary (inner) loop around disturbances, correcting them before they affect the primary (outer) loop. This significantly improves response time."
  },
  {
    id: "optimum-start",
    question: "What data does an optimum start algorithm typically use to calculate pre-heat time?",
    options: ["Only outside air temperature", "Building thermal mass and outside temperature", "Occupancy schedule only", "Equipment age and condition"],
    correctIndex: 1,
    explanation: "Optimum start algorithms use outside air temperature, building thermal characteristics (thermal mass, insulation), and sometimes historical data to calculate the minimum pre-conditioning time required."
  },
  {
    id: "dcv-sensor",
    question: "In demand-controlled ventilation (DCV), what is the most common parameter used to indicate occupancy levels?",
    options: ["Temperature", "Humidity", "CO2 concentration", "Light levels"],
    correctIndex: 2,
    explanation: "CO2 concentration is the most common indicator for DCV as it directly correlates with human occupancy and metabolic activity, allowing ventilation to match actual demand."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the 'I' in PID control stand for?",
    options: [
      "Immediate",
      "Integral",
      "Inverse",
      "Incremental"
    ],
    correctAnswer: 1,
    explanation: "The 'I' stands for Integral. The integral term sums the error over time and eliminates steady-state offset that proportional control alone cannot remove."
  },
  {
    id: 2,
    question: "In PID tuning, what symptom indicates excessive integral action?",
    options: ["Slow response", "Oscillation and overshoot", "Steady-state error", "No response to setpoint changes"],
    correctAnswer: 1,
    explanation: "Excessive integral action causes overshoot, oscillation, and slow settling as the accumulated error continues to drive the output even after the setpoint is reached."
  },
  {
    id: 3,
    question: "What is the purpose of derivative action in a PID controller?",
    options: [
      "To eliminate steady-state error",
      "To provide proportional response",
      "To anticipate future error based on rate of change",
      "To reduce energy consumption"
    ],
    correctAnswer: 2,
    explanation: "Derivative action responds to the rate of change of error, effectively 'anticipating' where the process is heading. This reduces overshoot and improves stability."
  },
  {
    id: 4,
    question: "In a cascade control system for AHU heating, what would typically be the inner loop?",
    options: [
      "Room temperature control",
      "Heating coil valve position",
      "Supply air temperature control",
      "Outside air temperature measurement"
    ],
    correctAnswer: 2,
    explanation: "The inner (secondary) loop controls supply air temperature, responding quickly to coil disturbances. The outer (primary) loop controls room temperature by adjusting the supply air setpoint."
  },
  {
    id: 5,
    question: "What factor does optimum stop control primarily consider?",
    options: [
      "Energy tariff rates",
      "Building thermal decay rate",
      "Equipment maintenance schedule",
      "Staff overtime costs"
    ],
    correctAnswer: 1,
    explanation: "Optimum stop calculates how early plant can be switched off whilst maintaining comfort until the end of occupancy, based on the building's thermal decay characteristics."
  },
  {
    id: 6,
    question: "What is the typical CO2 setpoint for demand-controlled ventilation in occupied spaces?",
    options: ["400 ppm", "600 ppm", "800-1000 ppm", "1500 ppm"],
    correctAnswer: 2,
    explanation: "DCV typically maintains CO2 between 800-1000 ppm above outdoor levels. This indicates acceptable air quality whilst avoiding over-ventilation and wasted energy."
  },
  {
    id: 7,
    question: "Chilled water supply temperature reset typically increases the setpoint when:",
    options: [
      "Cooling load increases",
      "Cooling load decreases",
      "Humidity rises",
      "Occupancy increases"
    ],
    correctAnswer: 1,
    explanation: "When cooling load decreases, the chilled water setpoint can be raised (reset upwards), reducing chiller energy consumption whilst still meeting the reduced demand."
  },
  {
    id: 8,
    question: "What is the primary energy-saving mechanism of supply air temperature reset?",
    options: [
      "Reducing fan speed",
      "Reducing reheat energy and improving chiller efficiency",
      "Reducing lighting loads",
      "Reducing pump speed"
    ],
    correctAnswer: 1,
    explanation: "Raising supply air temperature in cooling mode reduces simultaneous cooling and reheating, and allows chillers to operate at higher efficiency with elevated chilled water temperatures."
  },
  {
    id: 9,
    question: "Night setback control typically:",
    options: [
      "Maintains daytime setpoints",
      "Widens the temperature deadband to reduce plant operation",
      "Increases ventilation rates",
      "Activates all cooling systems"
    ],
    correctAnswer: 1,
    explanation: "Night setback widens the acceptable temperature range (e.g., heating setpoint 12C, cooling setpoint 28C) to minimise plant operation whilst protecting against extreme temperatures."
  },
  {
    id: 10,
    question: "Which tuning method involves deliberately inducing oscillations in a control loop?",
    options: [
      "Trial and error",
      "Ziegler-Nichols ultimate gain method",
      "Lambda tuning",
      "Cohen-Coon method"
    ],
    correctAnswer: 1,
    explanation: "The Ziegler-Nichols ultimate gain method increases proportional gain until sustained oscillation occurs, then calculates PID parameters from the critical gain and oscillation period."
  },
  {
    id: 11,
    question: "In a variable air volume (VAV) system, what parameter is typically reset based on zone demand?",
    options: [
      "Room temperature setpoint",
      "Supply air static pressure setpoint",
      "Outside air quantity",
      "Exhaust fan speed"
    ],
    correctAnswer: 1,
    explanation: "Static pressure reset reduces the duct pressure setpoint when VAV boxes are not fully open, reducing fan energy whilst maintaining airflow to zones that need it."
  },
  {
    id: 12,
    question: "What is 'anti-windup' in PID control?",
    options: [
      "Protection against high wind speeds",
      "Limiting integral accumulation when output is saturated",
      "Preventing motor overheating",
      "Reducing derivative noise sensitivity"
    ],
    correctAnswer: 1,
    explanation: "Anti-windup prevents the integral term from accumulating excessively when the controller output is at its limit (saturated), avoiding large overshoot when the constraint is removed."
  }
];

const faqs = [
  {
    question: "Why do BMS control loops sometimes oscillate?",
    answer: "Oscillation typically results from excessive gain (especially proportional or integral), insufficient damping, or improper tuning for the process dynamics. Common causes include oversized valves giving excessive gain, fast-acting loops connected to slow processes, interaction between multiple loops, and mechanical issues such as sticky valves or hysteresis. Reducing gains, adding derivative action, or retuning using systematic methods usually resolves oscillation."
  },
  {
    question: "When should I use cascade control instead of single-loop control?",
    answer: "Cascade control is beneficial when: the process has a measurable intermediate variable that responds faster than the main controlled variable; there are significant disturbances affecting the inner loop; the outer loop process is slow and would respond poorly to disturbances; and the inner loop dynamics are significantly faster than the outer loop. Typical applications include room temperature controlling supply air temperature, or chilled water temperature controlling valve position."
  },
  {
    question: "How do I know if optimum start is working correctly?",
    answer: "Effective optimum start should achieve setpoint just before occupancy begins - not early (wasting energy) nor late (comfort complaints). Monitor trends of start times versus outside temperature; pre-heat time should increase in colder weather. The building should reach setpoint within a few minutes of occupancy start. If the building consistently reaches setpoint 30+ minutes early, the algorithm parameters need adjustment."
  },
  {
    question: "What are the limitations of CO2-based demand-controlled ventilation?",
    answer: "CO2 sensors detect human occupancy but not other pollutants (VOCs, particulates, odours from equipment). CO2 levels respond with a time lag to occupancy changes. Sensors require regular calibration and can drift. Some spaces (laboratories, kitchens) may need additional pollutant-specific sensing. DCV should be combined with minimum ventilation rates per building regulations and additional sensing where appropriate."
  },
  {
    question: "How aggressive should setpoint reset strategies be?",
    answer: "Reset strategies must balance energy savings against comfort and equipment protection. Typical limits include: chilled water reset from 6C to 12C maximum; supply air reset from 12C to 16C in cooling; heating hot water from 82C down to 60C minimum for legionella. Reset should be gradual (ramp limited) to avoid rapid cycling. Always maintain minimum requirements for dehumidification, equipment protection, and comfort standards."
  },
  {
    question: "What is the difference between dead-band and setpoint reset?",
    answer: "Dead-band creates a neutral zone between heating and cooling setpoints where neither operates (e.g., heat below 20C, cool above 24C, nothing between). Setpoint reset actively adjusts setpoints based on conditions (load, outside temperature, time). Both save energy: dead-band prevents simultaneous heating/cooling, whilst reset optimises plant efficiency. They are complementary strategies often used together."
  }
];

const HNCModule8Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5">
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
            <BarChart3 className="h-4 w-4" />
            <span>Module 8.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Control Strategies
          </h1>
          <p className="text-white/80">
            Advanced BMS control techniques for optimising HVAC system performance and energy efficiency
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>PID control:</strong> Proportional, Integral, Derivative action</li>
              <li className="pl-1"><strong>Cascade control:</strong> Inner/outer loops for faster response</li>
              <li className="pl-1"><strong>Optimum start/stop:</strong> Minimise pre-conditioning time</li>
              <li className="pl-1"><strong>Setpoint reset:</strong> Adjust setpoints based on demand</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Energy Saving Strategies</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DCV:</strong> Ventilate based on CO2/occupancy</li>
              <li className="pl-1"><strong>CHW reset:</strong> Raise chilled water temp at part load</li>
              <li className="pl-1"><strong>SAT reset:</strong> Optimise supply air temperature</li>
              <li className="pl-1"><strong>Night setback:</strong> Wider deadband when unoccupied</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain PID control theory and the role of each term",
              "Describe common PID tuning methods including Ziegler-Nichols",
              "Design cascade control loops for improved disturbance rejection",
              "Implement optimum start/stop algorithms for energy savings",
              "Configure demand-controlled ventilation using CO2 sensing",
              "Apply chilled water and supply air temperature reset strategies",
              "Implement night setback and unoccupied mode control",
              "Troubleshoot common control loop problems"
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

        {/* Section 1: PID Control Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            PID Control Theory
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PID (Proportional-Integral-Derivative) control is the foundation of most HVAC control loops.
              It continuously calculates an error value as the difference between a desired setpoint and
              a measured process variable, then applies a correction based on proportional, integral, and
              derivative terms.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The PID Control Equation</p>
              <p className="font-mono text-center text-lg mb-2">Output = K<sub>p</sub>e + K<sub>i</sub>&int;e dt + K<sub>d</sub>(de/dt)</p>
              <div className="text-xs text-white/70 text-center space-y-1">
                <p>Where: e = error (setpoint - measured value)</p>
                <p>K<sub>p</sub> = proportional gain, K<sub>i</sub> = integral gain, K<sub>d</sub> = derivative gain</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Three PID Terms</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Term</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limitations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Proportional (P)</td>
                      <td className="border border-white/10 px-3 py-2">Output proportional to current error</td>
                      <td className="border border-white/10 px-3 py-2">Fast initial response</td>
                      <td className="border border-white/10 px-3 py-2">Cannot eliminate steady-state error</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Integral (I)</td>
                      <td className="border border-white/10 px-3 py-2">Output proportional to accumulated error</td>
                      <td className="border border-white/10 px-3 py-2">Eliminates steady-state offset</td>
                      <td className="border border-white/10 px-3 py-2">Can cause overshoot and windup</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Derivative (D)</td>
                      <td className="border border-white/10 px-3 py-2">Output proportional to rate of change</td>
                      <td className="border border-white/10 px-3 py-2">Anticipates and reduces overshoot</td>
                      <td className="border border-white/10 px-3 py-2">Sensitive to noise, rarely used in HVAC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common HVAC Control Modes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>P-only:</strong> Simple, fast, but has offset</li>
                  <li className="pl-1"><strong>PI:</strong> Most common for HVAC, eliminates offset</li>
                  <li className="pl-1"><strong>PID:</strong> Best response, used for critical loops</li>
                  <li className="pl-1"><strong>On/off:</strong> Simple switching, causes cycling</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tuning Parameters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Proportional band:</strong> Range over which output modulates</li>
                  <li className="pl-1"><strong>Integral time (Ti):</strong> Time to repeat P action</li>
                  <li className="pl-1"><strong>Derivative time (Td):</strong> Prediction horizon</li>
                  <li className="pl-1"><strong>Deadband:</strong> Neutral zone, no control action</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PID Tuning Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ziegler-Nichols (ultimate gain)</td>
                      <td className="border border-white/10 px-3 py-2">Increase P until oscillation, calculate from K<sub>u</sub> and P<sub>u</sub></td>
                      <td className="border border-white/10 px-3 py-2">Fast response, some overshoot acceptable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ziegler-Nichols (step response)</td>
                      <td className="border border-white/10 px-3 py-2">Measure delay and time constant from step test</td>
                      <td className="border border-white/10 px-3 py-2">When oscillation testing is impractical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lambda tuning</td>
                      <td className="border border-white/10 px-3 py-2">Specify desired closed-loop time constant</td>
                      <td className="border border-white/10 px-3 py-2">Conservative, no overshoot required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trial and error</td>
                      <td className="border border-white/10 px-3 py-2">Systematically adjust and observe</td>
                      <td className="border border-white/10 px-3 py-2">Fine-tuning, experienced engineers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Auto-tuning</td>
                      <td className="border border-white/10 px-3 py-2">Controller performs automated tests</td>
                      <td className="border border-white/10 px-3 py-2">Modern BMS, initial commissioning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Most HVAC loops use PI control. Start with manufacturer defaults, then adjust proportional band first, followed by integral time. Only add derivative if overshoot is problematic and the signal is noise-free.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cascade Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cascade Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cascade control uses two or more controllers in series, where the output of the outer
              (primary or master) controller becomes the setpoint for the inner (secondary or slave)
              controller. This configuration provides faster disturbance rejection and improved stability.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cascade Control Structure</p>
              <div className="p-4 rounded bg-black/30">
                <pre className="text-xs text-white/80 font-mono whitespace-pre overflow-x-auto">
{`  Primary (Outer) Loop              Secondary (Inner) Loop
  ┌─────────────────┐               ┌─────────────────┐
  │                 │   Setpoint    │                 │
  │  Room Temp  ────┼──────────────▶│  Supply Air ────┼──▶ Valve
  │  Controller     │               │  Controller     │
  │                 │               │                 │
  └────────┬────────┘               └────────┬────────┘
           │                                  │
           │ Room Temp                        │ Supply Air Temp
           │ Sensor                           │ Sensor
           ▼                                  ▼
      ┌─────────┐                       ┌─────────┐
      │  Room   │                       │  Coil   │
      └─────────┘                       └─────────┘

  Outer loop is SLOW (room thermal mass)
  Inner loop is FAST (coil response)`}
                </pre>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Requirements for Cascade Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Inner loop must be faster than outer loop (3-5x typical)</li>
                  <li className="pl-1">Measurable intermediate variable required</li>
                  <li className="pl-1">Significant disturbances affect inner loop</li>
                  <li className="pl-1">Additional sensor and control logic needed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Faster rejection of secondary disturbances</li>
                  <li className="pl-1">Improved stability and reduced overshoot</li>
                  <li className="pl-1">Inner loop linearises valve characteristics</li>
                  <li className="pl-1">Outer loop sees simpler process dynamics</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common HVAC Cascade Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Outer Loop</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Inner Loop</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Disturbance Rejected</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU heating</td>
                      <td className="border border-white/10 px-3 py-2">Room/return air temp</td>
                      <td className="border border-white/10 px-3 py-2">Supply air temp</td>
                      <td className="border border-white/10 px-3 py-2">LTHW temp/pressure changes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chilled water system</td>
                      <td className="border border-white/10 px-3 py-2">Zone temperature</td>
                      <td className="border border-white/10 px-3 py-2">CHW flow/valve position</td>
                      <td className="border border-white/10 px-3 py-2">CHW supply temp variations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VAV box</td>
                      <td className="border border-white/10 px-3 py-2">Zone temperature</td>
                      <td className="border border-white/10 px-3 py-2">Airflow rate</td>
                      <td className="border border-white/10 px-3 py-2">Duct pressure changes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Boiler plant</td>
                      <td className="border border-white/10 px-3 py-2">Flow temperature</td>
                      <td className="border border-white/10 px-3 py-2">Boiler firing rate</td>
                      <td className="border border-white/10 px-3 py-2">Return temp, load changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Tuning Cascade Loops</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Always tune the inner loop first with outer loop in manual</li>
                <li className="pl-1">Inner loop should have faster response (lower Ti, higher gain)</li>
                <li className="pl-1">Once inner loop is stable, tune outer loop</li>
                <li className="pl-1">Outer loop should be slower to avoid interaction</li>
                <li className="pl-1">Test both loops together under various load conditions</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The inner loop must settle before the outer loop makes its next adjustment. If the outer loop is too fast, it will fight the inner loop causing instability.
            </p>
          </div>
        </section>

        {/* Section 3: Optimised Start/Stop */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Optimised Start/Stop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Optimised start/stop (also called optimum start/stop) algorithms automatically calculate
              the minimum pre-conditioning time required to achieve comfort conditions by occupancy start,
              and the earliest time plant can be switched off whilst maintaining comfort until occupancy ends.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimum Start</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Calculates latest possible start time</li>
                  <li className="pl-1">Achieves setpoint just before occupancy</li>
                  <li className="pl-1">Considers outside temperature, building mass</li>
                  <li className="pl-1">Learns from historical performance</li>
                  <li className="pl-1">Reduces overnight/weekend heating costs</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimum Stop</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Calculates earliest possible stop time</li>
                  <li className="pl-1">Maintains comfort until end of occupancy</li>
                  <li className="pl-1">Uses building thermal storage</li>
                  <li className="pl-1">Considers thermal decay rate</li>
                  <li className="pl-1">Reduces end-of-day energy consumption</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimum Start Algorithm Factors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect on Start Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement/Input</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outside air temperature</td>
                      <td className="border border-white/10 px-3 py-2">Lower temp = earlier start</td>
                      <td className="border border-white/10 px-3 py-2">OAT sensor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inside air temperature</td>
                      <td className="border border-white/10 px-3 py-2">Lower temp = earlier start</td>
                      <td className="border border-white/10 px-3 py-2">Zone sensor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building thermal mass</td>
                      <td className="border border-white/10 px-3 py-2">Higher mass = earlier start</td>
                      <td className="border border-white/10 px-3 py-2">Configured parameter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant heating/cooling capacity</td>
                      <td className="border border-white/10 px-3 py-2">Higher capacity = later start</td>
                      <td className="border border-white/10 px-3 py-2">Learned or configured</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Historical performance</td>
                      <td className="border border-white/10 px-3 py-2">Algorithm adapts over time</td>
                      <td className="border border-white/10 px-3 py-2">Self-learning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Basic Optimum Start Calculation</p>
              <div className="p-4 rounded bg-black/30">
                <pre className="text-xs text-white/80 font-mono whitespace-pre overflow-x-auto">
{`Pre-heat time (hours) = (T_setpoint - T_inside) x Building Factor
                        ────────────────────────────────────────
                              (T_inside - T_outside) x k

Where:
  T_setpoint = desired occupied temperature (e.g., 21C)
  T_inside   = current inside temperature
  T_outside  = outside air temperature
  Building Factor = thermal mass coefficient (0.5-2.0 typical)
  k = plant capacity factor

Example: Inside 15C, Outside 5C, Setpoint 21C, Factor 1.0, k = 0.6
Pre-heat = (21-15) x 1.0 / ((15-5) x 0.6) = 6/6 = 1 hour

Start plant 1 hour before occupancy`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Implementation Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minimum start time:</strong> Ensure adequate time for air quality (pre-occupancy purge)</li>
                <li className="pl-1"><strong>Maximum start time:</strong> Limit to prevent excessively early starts in extreme weather</li>
                <li className="pl-1"><strong>Boost mode:</strong> Override for rapid warm-up if algorithm underestimates</li>
                <li className="pl-1"><strong>Holiday schedules:</strong> Integrate with calendar for bank holidays</li>
                <li className="pl-1"><strong>Frost protection:</strong> Override optimum stop if freeze risk</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy savings:</strong> Properly implemented optimum start can reduce heating energy by 10-20% compared to fixed start times, with even greater savings possible for heavyweight buildings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Demand-Based Control and Setpoint Reset */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Demand-Based Control and Setpoint Reset
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand-based control adjusts system operation based on actual requirements rather than
              fixed schedules or worst-case assumptions. Setpoint reset strategies optimise operating
              conditions to match current load, improving efficiency without sacrificing comfort.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Demand-Controlled Ventilation (DCV)</p>
              <p className="text-sm text-white/90 mb-3">
                DCV modulates outdoor air quantity based on actual occupancy indicators, typically CO2
                concentration. This reduces the energy required to condition outdoor air during partial
                occupancy periods.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">CO2-Based DCV Control:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Outdoor CO2: typically 400 ppm</li>
                    <li>Target: 800-1000 ppm above outdoor</li>
                    <li>Minimum ventilation always maintained</li>
                    <li>Proportional control of OA damper</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Alternative DCV Methods:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Occupancy sensors (PIR, counting)</li>
                    <li>Schedule-based (meeting room bookings)</li>
                    <li>VOC sensors (laboratories, kitchens)</li>
                    <li>Combined sensing strategies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chilled Water Temperature Reset</p>
              <p className="text-sm text-white/90 mb-3">
                Raising the chilled water supply temperature during part-load conditions improves chiller
                efficiency (higher COP at elevated evaporator temperature) whilst still meeting cooling demand.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Reset Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outside air reset</td>
                      <td className="border border-white/10 px-3 py-2">CHW temp increases as OAT decreases</td>
                      <td className="border border-white/10 px-3 py-2">6C at 30C OAT to 12C at 15C OAT</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valve position reset</td>
                      <td className="border border-white/10 px-3 py-2">CHW temp increases if no valves &gt;90% open</td>
                      <td className="border border-white/10 px-3 py-2">Gradual increase until demand satisfied</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Return water reset</td>
                      <td className="border border-white/10 px-3 py-2">CHW temp based on return temperature</td>
                      <td className="border border-white/10 px-3 py-2">Maintain minimum delta-T</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supply Air Temperature Reset</p>
              <p className="text-sm text-white/90 mb-3">
                Adjusting supply air temperature based on zone demand reduces simultaneous heating
                and cooling, improves dehumidification control, and optimises fan energy.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">SAT Reset Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low cooling demand</td>
                      <td className="border border-white/10 px-3 py-2">Raise SAT (e.g., 13C to 16C)</td>
                      <td className="border border-white/10 px-3 py-2">Reduced cooling and reheat energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High humidity</td>
                      <td className="border border-white/10 px-3 py-2">Lower SAT for dehumidification</td>
                      <td className="border border-white/10 px-3 py-2">Improved comfort, mould prevention</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating season</td>
                      <td className="border border-white/10 px-3 py-2">Raise SAT based on zone demand</td>
                      <td className="border border-white/10 px-3 py-2">Reduced reheat, improved efficiency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Static Pressure Reset (VAV Systems)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Concept:</strong> Reduce duct pressure setpoint when VAV boxes are not fully open</li>
                <li className="pl-1"><strong>Method:</strong> Monitor VAV damper positions; if none &gt;90% open, reduce SP setpoint</li>
                <li className="pl-1"><strong>Benefit:</strong> Significant fan energy savings (fan power varies with cube of speed)</li>
                <li className="pl-1"><strong>Typical range:</strong> Design pressure 400 Pa, reset down to 200 Pa minimum</li>
                <li className="pl-1"><strong>Limitation:</strong> Requires DDC VAV boxes with position feedback</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Night Setback and Unoccupied Mode</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Night Setback Settings:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Heating setpoint: 10-12C (frost protection)</li>
                    <li>Cooling setpoint: 28-30C (equipment protection)</li>
                    <li>Ventilation: minimum or off</li>
                    <li>Override facility for late working</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Considerations:</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Frost protection for pipes and coils</li>
                    <li>Humidity limits for sensitive equipment</li>
                    <li>Night purge for free cooling</li>
                    <li>Security lighting requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Heating Hot Water Reset</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Weather compensation:</strong> Reduce flow temp as OAT rises</li>
                <li className="pl-1"><strong>Typical curve:</strong> 82C at -5C OAT down to 60C at 15C OAT</li>
                <li className="pl-1"><strong>Minimum temperature:</strong> 60C for legionella prevention in HWS</li>
                <li className="pl-1"><strong>Condensing boilers:</strong> Lower return temps improve efficiency</li>
                <li className="pl-1"><strong>Heat pumps:</strong> Lower flow temps dramatically improve COP</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration note:</strong> Multiple reset strategies should be coordinated to avoid conflicts. For example, chilled water reset must consider dehumidification requirements that may need lower temperatures regardless of sensible cooling load.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: PID Controller Response</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A room temperature controller has setpoint 21C. Current temperature is 19C.
                With P-only control (K<sub>p</sub> = 10%/C), what is the controller output?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Error = Setpoint - Measured = 21C - 19C = 2C</p>
                <p className="mt-2">Proportional output = K<sub>p</sub> x Error</p>
                <p>Output = 10%/C x 2C = <strong>20%</strong></p>
                <p className="mt-2 text-white/60">The heating valve opens 20% to respond to the 2C error.</p>
                <p className="mt-2 text-white/60">Note: With P-only control, there will be a steady-state offset
                because the valve cannot reach 100% output for small errors.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Optimum Start Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A building has inside temp 14C, outside -2C, setpoint 21C.
                Building factor is 1.2, plant factor k = 0.5. Calculate pre-heat time.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Temperature rise required = 21C - 14C = 7C</p>
                <p>Temperature difference (inside-outside) = 14C - (-2C) = 16C</p>
                <p className="mt-2">Pre-heat time = (7 x 1.2) / (16 x 0.5)</p>
                <p>Pre-heat time = 8.4 / 8 = <strong>1.05 hours (63 minutes)</strong></p>
                <p className="mt-2 text-white/60">If occupancy starts at 08:00, plant should start at 06:57.</p>
                <p className="text-white/60">In practice, round to 07:00 or add safety margin (06:45).</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: DCV CO2-Based Control</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A meeting room has 800 ppm CO2 setpoint, outdoor 400 ppm.
                At 100% occupancy, the outdoor air damper should be 100% open.
                Current CO2 is 600 ppm. What damper position?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>CO2 above outdoor = 600 - 400 = 200 ppm</p>
                <p>Target CO2 above outdoor = 800 - 400 = 400 ppm</p>
                <p className="mt-2">Occupancy proxy = 200 / 400 = 50%</p>
                <p>OA damper position = <strong>50%</strong></p>
                <p className="mt-2 text-white/60">As occupancy increases and CO2 rises toward 800 ppm,
                the damper will progressively open to 100%.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Chilled Water Reset Energy Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A chiller produces 500 kW cooling. At 6C CHW, COP is 4.0.
                At 10C CHW, COP is 5.0. Calculate power reduction.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 6C: Compressor power = 500 / 4.0 = 125 kW</p>
                <p>At 10C: Compressor power = 500 / 5.0 = 100 kW</p>
                <p className="mt-2">Power saving = 125 - 100 = <strong>25 kW (20% reduction)</strong></p>
                <p className="mt-2 text-white/60">At 3000 operating hours/year and 0.15/kWh:</p>
                <p className="text-white/60">Annual saving = 25 x 3000 x 0.15 = <strong>GBP 11,250/year</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Control Loop Troubleshooting</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Symptom</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Likely Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Solution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuous oscillation</td>
                      <td className="border border-white/10 px-3 py-2">Excessive gain (P or I)</td>
                      <td className="border border-white/10 px-3 py-2">Reduce proportional gain, increase Ti</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Slow response</td>
                      <td className="border border-white/10 px-3 py-2">Insufficient gain, Ti too long</td>
                      <td className="border border-white/10 px-3 py-2">Increase gain, reduce Ti</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steady-state offset</td>
                      <td className="border border-white/10 px-3 py-2">No integral action, or Ti too long</td>
                      <td className="border border-white/10 px-3 py-2">Enable integral, reduce Ti</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overshoot then settling</td>
                      <td className="border border-white/10 px-3 py-2">Ti too short, no derivative</td>
                      <td className="border border-white/10 px-3 py-2">Increase Ti, add derivative if appropriate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Output stuck at limit</td>
                      <td className="border border-white/10 px-3 py-2">Integral windup, undersized plant</td>
                      <td className="border border-white/10 px-3 py-2">Enable anti-windup, check plant sizing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">DCV CO2 setpoint: <strong>800-1000 ppm</strong> (above outdoor)</li>
                <li className="pl-1">CHW reset range: <strong>6C to 12C</strong> typical</li>
                <li className="pl-1">SAT reset range: <strong>12C to 16C</strong> (cooling mode)</li>
                <li className="pl-1">Night setback heating: <strong>10-12C</strong> (frost protection)</li>
                <li className="pl-1">LTHW minimum: <strong>60C</strong> (legionella prevention)</li>
                <li className="pl-1">Cascade inner loop: <strong>3-5x faster</strong> than outer loop</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Tuning outer loop first:</strong> Always tune cascade inner loop first</li>
                <li className="pl-1"><strong>Ignoring anti-windup:</strong> Essential for any loop that can saturate</li>
                <li className="pl-1"><strong>Over-aggressive reset:</strong> Maintain minimum for dehumidification, legionella</li>
                <li className="pl-1"><strong>Fixed optimum start times:</strong> Algorithm should adapt to conditions</li>
                <li className="pl-1"><strong>No sensor maintenance:</strong> CO2 sensors drift, calibrate annually</li>
              </ul>
            </div>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">PID Control</p>
                <ul className="space-y-0.5">
                  <li>P: Proportional to current error</li>
                  <li>I: Eliminates steady-state offset</li>
                  <li>D: Anticipates based on rate of change</li>
                  <li>PI most common for HVAC loops</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Energy Saving Strategies</p>
                <ul className="space-y-0.5">
                  <li>Optimum start: 10-20% heating savings</li>
                  <li>CHW reset: 2-3% per degree raised</li>
                  <li>Static pressure reset: 20-40% fan savings</li>
                  <li>DCV: 20-50% ventilation savings</li>
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
            <Link to="../h-n-c-module8-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Communication Protocols
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section5-6">
              Next: System Optimisation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section5_5;
