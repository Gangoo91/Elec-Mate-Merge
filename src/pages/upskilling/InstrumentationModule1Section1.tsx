import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "What Is Instrumentation? - Instrumentation Module 1 Section 1";
const DESCRIPTION = "Learn the fundamentals of instrumentation: definition, purpose, measurement and control functions, and connection to industrial control systems.";

const quickCheckQuestions = [
  {
    id: "instrumentation-function",
    question: "What is the primary function of instrumentation in an industrial setting?",
    options: [
      "To generate electricity",
      "To measure, monitor, and control process variables",
      "To provide lighting",
      "To store data only"
    ],
    correctIndex: 1,
    explanation: "Instrumentation's primary role is to measure, monitor, and control critical process variables to ensure safe and efficient operation."
  },
  {
    id: "measured-variables",
    question: "Which of these are examples of measured variables in electrical instrumentation?",
    options: [
      "Temperature and pressure",
      "Colour and texture",
      "Weight and height",
      "Speed and direction only"
    ],
    correctIndex: 0,
    explanation: "Temperature and pressure are common measured variables, along with flow, level, voltage, current, and many others."
  },
  {
    id: "plc-relationship",
    question: "How does instrumentation relate to control systems like PLCs?",
    options: [
      "They are completely separate systems",
      "Instrumentation provides data inputs to PLCs for automated control decisions",
      "PLCs replace all instrumentation",
      "They only work with manual systems"
    ],
    correctIndex: 1,
    explanation: "Instrumentation provides critical sensor data that PLCs use to make automated control decisions in industrial processes."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary function of instrumentation in an industrial setting?",
    options: [
      "To generate electricity",
      "To measure, monitor, and control process variables",
      "To provide lighting",
      "To store data only"
    ],
    correctAnswer: 1,
    explanation: "Instrumentation's primary role is to measure, monitor, and control critical process variables to ensure safe and efficient operation."
  },
  {
    id: 2,
    question: "Which of these are examples of measured variables in electrical instrumentation?",
    options: [
      "Temperature and pressure",
      "Colour and texture",
      "Weight and height",
      "Speed and direction only"
    ],
    correctAnswer: 0,
    explanation: "Temperature and pressure are common measured variables, along with flow, level, voltage, current, and many others."
  },
  {
    id: 3,
    question: "How does instrumentation relate to control systems like PLCs?",
    options: [
      "They are completely separate systems",
      "Instrumentation provides data inputs to PLCs for automated control decisions",
      "PLCs replace all instrumentation",
      "They only work with manual systems"
    ],
    correctAnswer: 1,
    explanation: "Instrumentation provides critical sensor data that PLCs use to make automated control decisions in industrial processes."
  },
  {
    id: 4,
    question: "What is the difference between an instrument and a sensor?",
    options: [
      "There is no difference",
      "A sensor detects physical changes; an instrument is the complete measurement device",
      "Instruments are always digital",
      "Sensors are only used in computers"
    ],
    correctAnswer: 1,
    explanation: "A sensor is the detection element, while an instrument is the complete device that includes sensing, signal processing, and often display or output functions."
  },
  {
    id: 5,
    question: "Why is accurate measurement critical in industrial processes?",
    options: [
      "For regulatory compliance only",
      "To ensure safety, quality, efficiency, and regulatory compliance",
      "Only for cost savings",
      "Just for documentation purposes"
    ],
    correctAnswer: 1,
    explanation: "Accurate measurement is essential for maintaining safety, product quality, operational efficiency, and meeting regulatory requirements."
  },
  {
    id: 6,
    question: "What does a pressure transmitter typically convert?",
    options: [
      "Light to electrical signals",
      "Pressure to standardised electrical signals (4-20mA)",
      "Temperature to voltage",
      "Sound to digital data"
    ],
    correctAnswer: 1,
    explanation: "A pressure transmitter converts pressure measurements to standardised electrical signals, typically 4-20mA, for transmission to control systems."
  },
  {
    id: 7,
    question: "What is the purpose of SCADA in instrumentation systems?",
    options: [
      "To replace all sensors",
      "To provide supervisory control and data acquisition from multiple locations",
      "To generate electricity",
      "To manufacture instruments"
    ],
    correctAnswer: 1,
    explanation: "SCADA (Supervisory Control and Data Acquisition) systems provide central monitoring and control capabilities for instrumentation across multiple locations."
  },
  {
    id: 8,
    question: "In a control loop, what happens after measurement?",
    options: [
      "The process immediately stops",
      "Comparison with setpoint, then control action if needed",
      "Data is deleted",
      "The sensor is replaced"
    ],
    correctAnswer: 1,
    explanation: "After measurement, the value is compared with the setpoint, and the controller determines if control action is needed to maintain desired conditions."
  },
  {
    id: 9,
    question: "What type of signal is commonly used for analogue instrumentation?",
    options: [
      "WiFi signals",
      "4-20mA current signals",
      "Bluetooth",
      "Radio waves"
    ],
    correctAnswer: 1,
    explanation: "4-20mA current signals are the industry standard for analogue instrumentation, providing noise immunity and easy fault detection."
  },
  {
    id: 10,
    question: "Why does poor measurement lead to poor control?",
    options: [
      "It doesn't affect control",
      "The controller cannot make accurate decisions without accurate input data",
      "Only affects display readings",
      "Poor measurement improves safety"
    ],
    correctAnswer: 1,
    explanation: "Control systems rely on accurate measurement data to make decisions. Inaccurate measurements lead to incorrect control actions and poor process performance."
  }
];

const faqs = [
  {
    question: "What is the difference between an instrument and a sensor?",
    answer: "A sensor is the detection element that responds to physical changes, while an instrument is the complete measurement device that includes sensing, signal processing, and often display or output functions. Many modern instruments integrate sensors within their design."
  },
  {
    question: "Why are 4-20mA signals so common in instrumentation?",
    answer: "4-20mA signals are industry standard because they're resistant to electrical noise, can travel long distances without signal degradation, and allow easy detection of faults (0mA indicates a broken wire). The 'live zero' at 4mA means you can distinguish between zero reading and a fault."
  },
  {
    question: "How do PLCs use instrumentation data?",
    answer: "PLCs receive analogue and digital signals from instrumentation, process this data using programmed logic and control algorithms, then output control signals to actuators like valves, motors, and heaters to maintain desired process conditions automatically."
  },
  {
    question: "What happens if a sensor fails in a control system?",
    answer: "Modern control systems have fault detection capabilities. When a sensor fails, alarms are triggered, and the system may switch to a backup sensor, use a calculated value, or place the process in a safe state depending on the criticality and system design."
  },
  {
    question: "What is the control loop in instrumentation?",
    answer: "A control loop is a continuous cycle of measurement, comparison with setpoint, control action, and process response. The sensor measures the process variable, the controller compares it to the desired value, calculates a response, and sends signals to final control elements to adjust the process."
  },
  {
    question: "Why is calibration important for instrumentation?",
    answer: "Calibration ensures instruments provide accurate readings by comparing them to known standards and making adjustments. Regular calibration maintains measurement accuracy, ensures regulatory compliance, supports quality control, and prevents costly errors in process control."
  }
];

const InstrumentationModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Instrumentation?
          </h1>
          <p className="text-white/80">
            Understanding the fundamentals of instrumentation and its role in industrial systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Science of measurement and control</li>
              <li><strong>Purpose:</strong> Monitor, measure, and control processes</li>
              <li><strong>Components:</strong> Sensors, transmitters, controllers</li>
              <li><strong>Output:</strong> Standardised signals (4-20mA, 0-10V)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Pressure gauges, temperature transmitters, flow meters</li>
              <li><strong>Use:</strong> Process monitoring, automated control, safety systems</li>
              <li><strong>Apply:</strong> PLC integration, SCADA systems, control loops</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what electrical instrumentation is",
              "Recognise its role in system monitoring and automation",
              "Identify key components involved in instrumentation systems",
              "Understand the relationship between measurement and control",
              "Know how instrumentation integrates with PLCs and SCADA",
              "Apply the control loop concept to practical scenarios"
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

        {/* Section 1: Definition and Purpose */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Definition and Purpose of Instrumentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Instrumentation</strong> is the science and technology of measurement and control. It encompasses all devices, systems, and methods used to detect, measure, monitor, and control physical variables in industrial processes and systems.
            </p>
            <p>
              Instrumentation forms the backbone of modern industrial operations, providing the eyes and ears that allow engineers to monitor, control, and optimise complex processes. From the pressure gauge on a boiler to sophisticated digital control systems managing entire manufacturing plants, instrumentation enables safe, efficient, and reliable operation across all industrial sectors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Core Functions of Instrumentation:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Measurement</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Quantifying physical variables</li>
                    <li>Converting physical parameters to electrical signals</li>
                    <li>Providing accurate, repeatable readings</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Control</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Maintaining desired process conditions</li>
                    <li>Automatic adjustment of system parameters</li>
                    <li>Safety shutdown and protection functions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Common Examples */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Examples of Instrumentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Instrumentation devices are found throughout industrial, commercial, and residential environments. Understanding common examples helps identify instrumentation in practice.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Instruments</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Bourdon tube pressure gauges</li>
                  <li>Electronic pressure transmitters</li>
                  <li>Differential pressure sensors</li>
                  <li>Vacuum measurement devices</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Instruments</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>RTDs (Resistance Temperature Detectors)</li>
                  <li>Thermocouples</li>
                  <li>Infrared thermometers</li>
                  <li>Bimetallic temperature switches</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Instruments</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Electromagnetic flow meters</li>
                  <li>Turbine flow meters</li>
                  <li>Ultrasonic flow measurement</li>
                  <li>Variable area flow meters</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Connection to Control Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Connection to Control Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern instrumentation rarely operates in isolation. Instead, it forms integrated systems with control equipment like PLCs (Programmable Logic Controllers), SCADA (Supervisory Control and Data Acquisition) systems, and DCS (Distributed Control Systems).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration with PLCs</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Input Functions</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Analogue inputs (4-20mA, 0-10V)</li>
                    <li>Digital inputs (contact closure, voltage levels)</li>
                    <li>Smart sensor communications (HART, Profibus)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Processing &amp; Control</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>PID control algorithms</li>
                    <li>Logic-based control sequences</li>
                    <li>Safety interlocks and alarms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SCADA Integration</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Real-time data acquisition from multiple locations</li>
                <li>Central monitoring and control capabilities</li>
                <li>Historical data logging and trending</li>
                <li>Alarm management and notification systems</li>
                <li>Remote access and control functionality</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: The Control Loop */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Control Loop Concept
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Measurement and control are intrinsically linked in instrumentation systems. Accurate measurement provides the foundation for effective control, while control systems rely on continuous measurement feedback to maintain desired process conditions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-1">1. Measurement</p>
                <p className="text-white/70 text-xs">Sensor detects process variable</p>
              </div>
              <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-1">2. Comparison</p>
                <p className="text-white/70 text-xs">Actual vs setpoint value</p>
              </div>
              <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-1">3. Control Action</p>
                <p className="text-white/70 text-xs">Controller determines response</p>
              </div>
              <div className="p-3 rounded bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-1">4. Process Response</p>
                <p className="text-white/70 text-xs">System adjusts to correction</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Relationships:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Measurement Accuracy Impact</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Poor measurement = poor control</li>
                    <li>Instrument uncertainty affects control precision</li>
                    <li>Calibration critical for system performance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Response Time Considerations</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Fast processes need quick-response sensors</li>
                    <li>Slow sensors can cause control instability</li>
                    <li>Matching sensor and process time constants</li>
                  </ul>
                </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Working with Instrumentation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always verify instrument ranges match process requirements</li>
                <li>Check calibration certificates and due dates</li>
                <li>Understand signal types (4-20mA, 0-10V, digital) before connecting</li>
                <li>Verify power supply requirements and isolation needs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Troubleshooting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with the simplest checks - power supply and connections</li>
                <li>Use appropriate test equipment (multimeter, calibrator)</li>
                <li>Compare readings with known good references</li>
                <li>Check for environmental factors affecting accuracy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring calibration schedules</strong> — leads to measurement drift and errors</li>
                <li><strong>Mismatching signal types</strong> — can damage instruments or give wrong readings</li>
                <li><strong>Poor cable routing</strong> — electrical noise can corrupt sensitive signals</li>
                <li><strong>Inadequate documentation</strong> — makes troubleshooting difficult</li>
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
            <Link to="../instrumentation-module-1-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule1Section1;
