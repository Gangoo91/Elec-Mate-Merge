import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    id: "measurement-vs-indication",
    question: "What is the difference between measurement and indication?",
    options: [
      "There is no difference",
      "Measurement captures data; indication displays or signals the value",
      "Indication is always digital",
      "Measurement is only for temperature"
    ],
    correctIndex: 1,
    explanation: "Measurement is the process of capturing and quantifying data, while indication is the display or signalling of that measured value to operators or systems."
  },
  {
    id: "control-action",
    question: "Give an example of a control action triggered by instrumentation.",
    options: [
      "Manually turning a valve",
      "Automatic boiler shutdown when pressure limits are exceeded",
      "Reading a gauge visually",
      "Painting equipment"
    ],
    correctIndex: 1,
    explanation: "A control action is an automatic response based on measured values, such as shutting down equipment when safety limits are exceeded."
  },
  {
    id: "closed-loop",
    question: "What is a closed-loop system?",
    options: [
      "A system with no outputs",
      "A system where output affects the input through feedback",
      "A broken system",
      "A system that never changes"
    ],
    correctIndex: 1,
    explanation: "A closed-loop system uses feedback from the output to adjust the input, creating automatic control that responds to changes in conditions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the difference between measurement and indication?",
    options: [
      "There is no difference",
      "Measurement captures data; indication displays or signals the value",
      "Indication is always digital",
      "Measurement is only for temperature"
    ],
    correctAnswer: 1,
    explanation: "Measurement is the process of capturing and quantifying data, while indication is the display or signalling of that measured value to operators or systems."
  },
  {
    id: 2,
    question: "Give an example of a control action triggered by instrumentation.",
    options: [
      "Manually turning a valve",
      "Automatic boiler shutdown when pressure limits are exceeded",
      "Reading a gauge visually",
      "Painting equipment"
    ],
    correctAnswer: 1,
    explanation: "A control action is an automatic response based on measured values, such as shutting down equipment when safety limits are exceeded."
  },
  {
    id: 3,
    question: "What is a closed-loop system?",
    options: [
      "A system with no outputs",
      "A system where output affects the input through feedback",
      "A broken system",
      "A system that never changes"
    ],
    correctAnswer: 1,
    explanation: "A closed-loop system uses feedback from the output to adjust the input, creating automatic control that responds to changes in conditions."
  },
  {
    id: 4,
    question: "Name a device that performs control functions.",
    options: [
      "Thermometer only",
      "PID controller",
      "Light bulb",
      "Wire"
    ],
    correctAnswer: 1,
    explanation: "A PID controller is a device that performs control functions by calculating the required output based on the difference between setpoint and measured values."
  },
  {
    id: 5,
    question: "Why is indication still important in automated systems?",
    options: [
      "It's not important in automated systems",
      "For operator awareness, troubleshooting, and system monitoring",
      "Only for decoration",
      "To increase costs"
    ],
    correctAnswer: 1,
    explanation: "Even in automated systems, indication provides essential operator awareness, enables troubleshooting, supports system monitoring, and ensures safety oversight."
  },
  {
    id: 6,
    question: "What is the primary purpose of measurement in instrumentation?",
    options: [
      "To display values",
      "To determine the magnitude of a physical quantity",
      "To control equipment",
      "To generate alarms"
    ],
    correctAnswer: 1,
    explanation: "The primary purpose of measurement is to determine the magnitude of a physical quantity accurately and reliably for further processing or decision-making."
  },
  {
    id: 7,
    question: "Which of the following is NOT a type of indication?",
    options: [
      "Visual indication (gauges, displays)",
      "Audible indication (alarms, beepers)",
      "Control action (valve operation)",
      "Digital communication (4-20mA signals)"
    ],
    correctAnswer: 2,
    explanation: "Control action is a separate function from indication. Indication presents data through visual, audible, or digital means, while control takes action based on that data."
  },
  {
    id: 8,
    question: "What distinguishes open-loop from closed-loop control?",
    options: [
      "Open-loop is more expensive",
      "Closed-loop uses feedback from output to adjust input",
      "Open-loop is always digital",
      "Closed-loop cannot be automated"
    ],
    correctAnswer: 1,
    explanation: "Closed-loop control uses feedback from the output to adjust the input, while open-loop control operates independently of the output without feedback."
  },
  {
    id: 9,
    question: "In a control loop, what is the role of the final control element?",
    options: [
      "To measure the process variable",
      "To display values to operators",
      "To implement the control action",
      "To store historical data"
    ],
    correctAnswer: 2,
    explanation: "The final control element (such as a valve, motor, or heater) implements the control action determined by the controller to affect the process."
  },
  {
    id: 10,
    question: "Which key measurement characteristic describes how close a measurement is to the true value?",
    options: [
      "Precision",
      "Resolution",
      "Accuracy",
      "Range"
    ],
    correctAnswer: 2,
    explanation: "Accuracy describes how close a measured value is to the true value. Precision refers to repeatability, resolution is the smallest detectable change, and range is the measurement span."
  }
];

const faqs = [
  {
    question: "Can a single device perform measurement, indication, and control?",
    answer: "Yes, modern smart instruments often combine these functions. A smart temperature transmitter, for example, can measure temperature, display the value locally, and send control signals to other equipment."
  },
  {
    question: "Why do we still need local indication when systems are automated?",
    answer: "Local indication provides operators with immediate visual feedback for safety verification, troubleshooting, and manual override situations. It's essential when network or SCADA systems fail."
  },
  {
    question: "What's the difference between a sensor and a final control element?",
    answer: "A sensor is an input device that measures physical quantities, while a final control element is an output device (like a valve or motor) that acts on the process based on control signals."
  },
  {
    question: "How does PID control work?",
    answer: "PID (Proportional-Integral-Derivative) control calculates the error between the setpoint and measured value, then adjusts the output using three terms: proportional response, accumulated error correction, and rate of change prediction."
  },
  {
    question: "When would you use open-loop control instead of closed-loop?",
    answer: "Open-loop control is suitable for simple, predictable processes like timer-based systems, batch sequences, or start-up procedures where feedback isn't necessary or available."
  }
];

const InstrumentationModule1Section3 = () => {
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Measurement vs Control vs Indication
          </h1>
          <p className="text-white/80">
            Understanding the different functions and purposes of instrumentation systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Measurement:</strong> Capturing and quantifying physical data</li>
              <li><strong>Indication:</strong> Displaying or signalling measured values</li>
              <li><strong>Control:</strong> Taking automated action based on measurements</li>
              <li><strong>Integration:</strong> All three work together in control loops</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Sensors measure, displays indicate, controllers act</li>
              <li><strong>Use:</strong> Design systems with appropriate functions for each need</li>
              <li><strong>Apply:</strong> Troubleshoot by tracing measurement to control flow</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between measurement, control, and indication",
              "Understand where each fits in the control loop",
              "Identify instrumentation devices for each function",
              "Understand the interaction of sensors, indicators, and actuators",
              "Recognise open-loop vs closed-loop systems",
              "Apply this knowledge to practical troubleshooting"
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

        {/* Section 1: Measurement Function */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Measurement: Data Acquisition
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Measurement</strong> is the process of determining the magnitude of a physical quantity.
              It involves sensing the variable, converting it to a usable signal, and ensuring the data is
              accurate and reliable for further processing or decision-making.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Measurement Process:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Sensing:</strong> Detect physical change in the environment</li>
                <li><strong>2. Conversion:</strong> Transform to electrical signal</li>
                <li><strong>3. Processing:</strong> Condition and scale signal</li>
                <li><strong>4. Output:</strong> Provide usable data for systems</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Measurement Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature:</strong> Thermocouple measures heat and produces mV signal</li>
                  <li><strong>Pressure:</strong> Strain gauge sensor converts pressure to resistance change</li>
                  <li><strong>Flow:</strong> Electromagnetic meter measures liquid velocity</li>
                  <li><strong>Level:</strong> Ultrasonic sensor measures distance to liquid surface</li>
                  <li><strong>Vibration:</strong> Accelerometer detects mechanical oscillations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Measurement Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Accuracy:</strong> How close to the true value</li>
                  <li><strong>Precision:</strong> Repeatability of measurements</li>
                  <li><strong>Resolution:</strong> Smallest detectable change</li>
                  <li><strong>Range:</strong> Minimum to maximum measurable values</li>
                  <li><strong>Response Time:</strong> Speed of measurement update</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Indication Function */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Indication: Display and Signalling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Indication</strong> presents measurement data in a form that operators, maintenance
              personnel, or automated systems can interpret and act upon. It bridges the gap between raw
              measurement data and human understanding or system communication.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of Indication:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Visual Indication</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Analogue gauges and metres</li>
                    <li>Digital displays (LCD, LED)</li>
                    <li>Status lights and indicators</li>
                    <li>Graphical displays and trends</li>
                    <li>Colour-coded warnings</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Audible Indication</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Alarm horns and sirens</li>
                    <li>Beepers and chimes</li>
                    <li>Voice annunciators</li>
                    <li>Coded sound patterns</li>
                    <li>Frequency-based alerts</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Digital Communication</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>4-20mA current signals</li>
                    <li>Digital protocols (Modbus, HART)</li>
                    <li>Network communications</li>
                    <li>SMS and email alerts</li>
                    <li>HMI screen displays</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Local Indication Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Pressure gauge on boiler showing PSI reading</li>
                  <li>Temperature display on oven control panel</li>
                  <li>Level indicator on storage tank</li>
                  <li>Flow totaliser on water metre</li>
                  <li>LED status lights on control panel</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Remote Indication Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li>SCADA system displaying plant overview</li>
                  <li>Mobile app showing building energy usage</li>
                  <li>Central monitoring screen in control room</li>
                  <li>Email alerts for alarm conditions</li>
                  <li>Historian trends showing performance data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Control Function */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control: Action Based on Values
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Control</strong> uses measurement data to make decisions and take automated actions
              to maintain desired system conditions. Control functions ensure processes operate within safe,
              efficient, and optimal parameters without constant human intervention.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control System Types:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Open-Loop Control</p>
                  <p className="text-sm text-white mb-2">Control action is independent of output (no feedback)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Timer-based systems</li>
                    <li>Sequential control logic</li>
                    <li>Manual setpoint adjustments</li>
                    <li>Pre-programmed responses</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Closed-Loop Control</p>
                  <p className="text-sm text-white mb-2">Control action based on feedback from output</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>PID control algorithms</li>
                    <li>Feedback compensation</li>
                    <li>Automatic error correction</li>
                    <li>Self-adjusting systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control Devices and Functions:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Controllers</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>PID controllers</li>
                    <li>PLCs (Programmable Logic Controllers)</li>
                    <li>Temperature controllers</li>
                    <li>Flow controllers</li>
                    <li>Safety controllers</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Final Control Elements</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Control valves</li>
                    <li>Variable frequency drives</li>
                    <li>Dampers and actuators</li>
                    <li>Heaters and coolers</li>
                    <li>Pumps and motors</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Safety Systems</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Emergency shutdown systems</li>
                    <li>Pressure relief valves</li>
                    <li>Fire suppression systems</li>
                    <li>Interlock systems</li>
                    <li>Alarm management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: The Control Loop */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Control Loop: Integration of All Functions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A control loop demonstrates how measurement, indication, and control work together in a
              continuous cycle to maintain desired process conditions. Understanding this integration is
              fundamental to instrumentation system design and operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control Loop Components:</p>
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Process Variable</p>
                  <p className="text-white/90 text-xs">Current condition</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Sensor</p>
                  <p className="text-white/90 text-xs">Measures PV</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Controller</p>
                  <p className="text-white/90 text-xs">Compares &amp; calculates</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Final Element</p>
                  <p className="text-white/90 text-xs">Implements action</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Process</p>
                  <p className="text-white/90 text-xs">System controlled</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Closed-Loop Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Automatic error correction</li>
                  <li>Consistent performance despite disturbances</li>
                  <li>Reduced operator workload</li>
                  <li>Improved process stability</li>
                  <li>Better product quality</li>
                  <li>Enhanced safety through quick response</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open-Loop Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple on/off control</li>
                  <li>Batch process sequences</li>
                  <li>Time-based operations</li>
                  <li>Manual control backup systems</li>
                  <li>Emergency response procedures</li>
                  <li>Start-up and shutdown sequences</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Scenario: Boiler System Pressure Control</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Measurement:</strong> Pressure sensor continuously measures boiler pressure (0-10 bar range) with ±0.1 bar accuracy</li>
                <li><strong>Indication:</strong> Local pressure gauge shows 6.5 bar, control panel displays digital reading, SCADA logs trends</li>
                <li><strong>Control:</strong> When pressure exceeds 8 bar limit, controller automatically shuts down heater and opens relief valve</li>
                <li><strong>Result:</strong> Safe operation through coordinated measurement, clear indication, and automatic protection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Troubleshooting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Trace the signal path from measurement through to control action</li>
                <li>Check each function independently: sensor reading, display accuracy, control response</li>
                <li>Verify communication between components at each stage</li>
                <li>Use indication points to identify where the problem occurs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Confusing functions</strong> — sensors measure, indicators display, controllers act</li>
                <li><strong>Ignoring indication</strong> — local displays are vital for troubleshooting and safety</li>
                <li><strong>Bypassing feedback</strong> — closed-loop systems need proper feedback to function</li>
                <li><strong>Wrong control type</strong> — using open-loop where closed-loop is needed</li>
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
            <Link to="/electrician/upskilling/instrumentation-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../instrumentation-module-1-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule1Section3;
