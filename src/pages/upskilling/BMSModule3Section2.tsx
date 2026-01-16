import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule3Section2QuizData } from "@/data/upskilling/bmsModule3Section2QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "control-check1",
    question: "What is the main advantage of PID control over simple proportional control?",
    options: [
      "PID control uses less electrical power",
      "PID control is easier to install and commission",
      "PID control eliminates steady-state offset error and provides better stability",
      "PID control works without any sensors"
    ],
    correctIndex: 2,
    explanation: "PID control combines proportional, integral, and derivative actions. The integral component eliminates steady-state offset error (reaching exact set point), while the derivative component improves stability and reduces overshoot."
  },
  {
    id: "control-check2",
    question: "Why is differential pressure control essential in chilled water systems?",
    options: [
      "It reduces the cost of installation",
      "It prevents pump cavitation and ensures proper flow to all coils",
      "It eliminates the need for temperature sensors",
      "It makes the system run quieter"
    ],
    correctIndex: 1,
    explanation: "Differential pressure control maintains the pressure difference needed for proper water flow through all coils, preventing pump cavitation, ensuring remote coils receive adequate flow, and maintaining efficient heat transfer throughout the system."
  },
  {
    id: "control-check3",
    question: "What is the key advantage of pressure-independent VAV boxes over simple dampers?",
    options: [
      "They are less expensive to install",
      "They maintain accurate airflow control regardless of duct pressure variations",
      "They require less maintenance",
      "They use less electrical power"
    ],
    correctIndex: 1,
    explanation: "Pressure-independent VAV boxes include integral flow sensors and controllers that maintain accurate airflow regardless of duct pressure variations, ensuring consistent zone control even as other zones' demands change."
  },
  {
    id: "control-check4",
    question: "How does poor wiring or sensor placement affect BMS control performance?",
    options: [
      "It has no significant impact on performance",
      "It causes false readings leading to inefficient operation",
      "It only affects system startup time",
      "It reduces installation costs"
    ],
    correctIndex: 1,
    explanation: "Poor wiring or sensor placement causes the BMS to receive false readings, leading to inefficient operation. For example, a miswired pressure sensor may cause pumps to run at full speed unnecessarily, wasting energy."
  }
];

const faqs = [
  {
    question: "What's the difference between on/off and proportional control?",
    answer: "On/off control switches equipment fully on or off at setpoint thresholds, causing temperature swings of ±2-3°C. Proportional control gradually adjusts output based on how far from setpoint, providing smoother control with ±1°C accuracy."
  },
  {
    question: "What does PID stand for and what does each component do?",
    answer: "PID stands for Proportional-Integral-Derivative. P responds to current error magnitude, I eliminates steady-state offset by accumulating error over time, and D responds to rate of change to reduce overshoot and improve stability."
  },
  {
    question: "Where should static pressure sensors be located in ductwork?",
    answer: "Static pressure sensors should be located approximately 2/3 along the main duct run for a representative reading. This location accounts for pressure drops across the system while remaining responsive to demand changes."
  },
  {
    question: "Why do fan energy savings follow the cube law?",
    answer: "Fan power varies as the cube of speed, so reducing speed to 50% uses only 12.5% of full-speed power (0.5³ = 0.125). This makes VFD control extremely effective for energy savings during partial load conditions."
  }
];

const BMSModule3Section2 = () => {
  useSEO({
    title: "Control Strategies | BMS Module 3.2",
    description: "Master advanced BMS control strategies including PID control, system commissioning, and troubleshooting. Learn temperature, pressure, and flow control with practical examples."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Control Strategies
          </h1>
          <p className="text-white/80">
            Temperature, Pressure, and Flow Control
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>On/Off:</strong> Simple, ±2-3°C accuracy, equipment cycling</li>
              <li><strong>Proportional:</strong> Smooth control, ±1°C, offset error</li>
              <li><strong>PID:</strong> Precise, ±0.5°C, eliminates offset</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hunting/oscillation indicates tuning issues</li>
              <li><strong>Use:</strong> PID for critical temperature control</li>
              <li><strong>Test:</strong> Verify sensor readings before commissioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Purpose and implementation of control strategies in BMS",
              "Compare on/off, proportional, and PID control methods",
              "Temperature, pressure, and flow control applications",
              "System commissioning requirements and testing procedures"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Temperature Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Temperature Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temperature control is the foundation of HVAC automation, with different control strategies offering
              varying levels of precision, comfort, and energy efficiency.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">On/Off</p>
                <p className="text-white/90 text-xs">±2-3°C accuracy</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Proportional</p>
                <p className="text-white/90 text-xs">±1°C accuracy</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">PID</p>
                <p className="text-white/90 text-xs">±0.5°C accuracy</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">On/Off Control:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Operation:</strong> Switches on at setpoint + deadband, off at setpoint - deadband</li>
                <li><strong>Advantages:</strong> Simple wiring, low cost, reliable for basic applications</li>
                <li><strong>Limitations:</strong> Temperature oscillation, equipment cycling stress</li>
                <li><strong>Applications:</strong> Frost protection, basic ventilation, simple heating</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proportional Control:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Principle:</strong> Output varies linearly with temperature deviation from setpoint</li>
                <li><strong>Proportional band:</strong> Temperature range over which output varies 0-100%</li>
                <li><strong>Better control:</strong> Gradual adjustment prevents overshooting</li>
                <li><strong>Limitation:</strong> Offset error — may not reach exact setpoint under varying loads</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PID Control (P + I + D):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Proportional (P):</strong> Responds to current error magnitude</li>
                <li><strong>Integral (I):</strong> Eliminates steady-state offset by accumulating error over time</li>
                <li><strong>Derivative (D):</strong> Responds to rate of change, reduces overshoot</li>
                <li><strong>Tuning required:</strong> P, I, D parameters must be adjusted for optimal performance</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        {/* Section 2: Pressure Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pressure Control Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pressure control ensures optimal system performance by maintaining correct static and differential
              pressures. Poor pressure control leads to energy waste, inadequate flow, and system imbalances.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Static Pressure (Air Systems)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Purpose:</strong> Maintains constant duct pressure</li>
                  <li><strong>Sensor location:</strong> 2/3 along main duct run</li>
                  <li><strong>Control:</strong> VFD on supply fan</li>
                  <li><strong>Typical setpoint:</strong> 250-500 Pa</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Differential Pressure (Water Systems)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Purpose:</strong> Maintains pressure across coils</li>
                  <li><strong>Location:</strong> Pump discharge</li>
                  <li><strong>Control:</strong> VFD on pump</li>
                  <li><strong>Typical setpoint:</strong> 200-400 kPa</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Savings Principle:</p>
              <p className="text-sm text-white ml-4">
                Fan power varies as the cube of speed. Running at 50% speed uses only 12.5% of full-speed power
                (0.5³ = 0.125). This makes VFD control extremely effective for energy savings during partial load.
              </p>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        {/* Section 3: Flow Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Flow Control and Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Flow control optimises energy delivery by managing air and water flow based on actual demand.
              Proper flow control prevents energy waste while maintaining comfort and indoor air quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variable Air Volume (VAV) Control:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zone control:</strong> Each VAV box modulates airflow based on space temperature</li>
                <li><strong>Minimum airflow:</strong> Maintained for ventilation (typically 30% of maximum)</li>
                <li><strong>Pressure independence:</strong> Maintains accurate flow regardless of duct pressure</li>
                <li><strong>Energy savings:</strong> Reduces fan energy by 40-60% vs constant volume</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Way Valves</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Variable flow systems</li>
                  <li>Valve modulates, pump speed varies</li>
                  <li>Energy efficient at partial loads</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Way Valves</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Constant flow systems</li>
                  <li>Valve diverts flow, pump speed constant</li>
                  <li>Simpler but less efficient</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Valve Authority:</p>
              <p className="text-sm text-white ml-4">
                Pressure drop across valve should be 25-50% of total circuit pressure drop for proper control.
                Too low authority results in poor control at partial loads.
              </p>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* Section 4: System Commissioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            System Commissioning and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper commissioning ensures control strategies operate as designed. Without systematic testing,
              even correctly installed systems may not deliver expected performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Functional Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Sensor calibration verification</li>
                  <li>Actuator stroke testing</li>
                  <li>Control loop configuration</li>
                  <li>Safety system testing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>End-to-end control verification</li>
                  <li>Load response testing</li>
                  <li>Sequence of operations</li>
                  <li>Energy performance validation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Loop Testing:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Step 1:</strong> Verify sensor readings against calibrated instruments</li>
                <li><strong>Step 2:</strong> Command actuators through full range, verify position feedback</li>
                <li><strong>Step 3:</strong> Introduce setpoint changes, verify appropriate system response</li>
                <li><strong>Step 4:</strong> Test interactions between interconnected control loops</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">As an Electrician</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check whether outputs are digital (on/off) or analog (0-10V, 4-20mA) before wiring</li>
                <li>Confirm sensors are correctly located and calibrated — accuracy is key</li>
                <li>Test actuator movement (valves, dampers) to ensure smooth modulation</li>
                <li>Work closely with commissioning engineers to verify control responses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong sensor placement</strong> — causes false readings and inefficient control</li>
                <li><strong>Mixing signal types</strong> — 0-10V and 4-20mA are not interchangeable</li>
                <li><strong>Poor earthing</strong> — can introduce electrical noise affecting analog signals</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">University Campus Chilled Water System</h3>
            <div className="text-sm text-white space-y-3">
              <p><strong>Problem:</strong> Pumps running continuously at full speed, wasting energy.</p>
              <p><strong>Investigation:</strong> Differential pressure sensor was installed in the wrong part of the pipework, giving false readings.</p>
              <p><strong>Solution:</strong> Repositioned and rewired the sensor correctly.</p>
              <p><strong>Result:</strong> BMS could modulate pump speed properly, reducing energy use by 30% without affecting comfort.</p>
              <p><strong>Key Learning:</strong> Correct sensor installation and wiring by electricians are vital for effective BMS control strategies.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Control Method Accuracy</p>
              <ul className="space-y-0.5">
                <li>On/Off: ±2-3°C</li>
                <li>Proportional: ±1°C</li>
                <li>PID: ±0.5°C</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Typical Pressure Setpoints</p>
              <ul className="space-y-0.5">
                <li>Supply duct: 250-500 Pa</li>
                <li>Return duct: -25 to -50 Pa</li>
                <li>Chilled water: 200-400 kPa</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            questions={bmsModule3Section2QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-3-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule3Section2;
