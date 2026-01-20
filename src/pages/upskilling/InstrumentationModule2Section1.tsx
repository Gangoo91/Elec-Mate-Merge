import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    id: "sensor-role",
    question: "What is the main role of a sensor?",
    options: [
      "To convert energy from one form to another",
      "To detect and respond to physical changes in the environment",
      "To amplify electrical signals",
      "To store measurement data"
    ],
    correctIndex: 1,
    explanation: "A sensor's primary function is to detect and respond to physical changes in the environment, such as temperature, pressure, light, or motion."
  },
  {
    id: "transducer-convert",
    question: "What does a transducer convert?",
    options: [
      "Digital signals to analogue signals",
      "One form of energy into another form of energy",
      "AC current to DC current",
      "High voltage to low voltage"
    ],
    correctIndex: 1,
    explanation: "A transducer converts one form of energy into another form of energy, typically converting physical quantities into electrical signals for measurement and control purposes."
  },
  {
    id: "combined-device",
    question: "Can a device be both a sensor and a transducer?",
    options: [
      "No, they must always be separate devices",
      "Yes, many modern devices combine both functions",
      "Only in digital systems",
      "Only in high-temperature applications"
    ],
    correctIndex: 1,
    explanation: "Many modern devices combine both sensor and transducer functions in a single unit, such as thermocouples, strain gauges, and pressure transmitters."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main role of a sensor?",
    options: [
      "To convert energy from one form to another",
      "To detect and respond to physical changes in the environment",
      "To amplify electrical signals",
      "To store measurement data"
    ],
    correctAnswer: 1,
    explanation: "A sensor's primary function is to detect and respond to physical changes in the environment, such as temperature, pressure, light, or motion."
  },
  {
    id: 2,
    question: "What does a transducer convert?",
    options: [
      "Digital signals to analogue signals",
      "One form of energy into another form of energy",
      "AC current to DC current",
      "High voltage to low voltage"
    ],
    correctAnswer: 1,
    explanation: "A transducer converts one form of energy into another form of energy, typically converting physical quantities into electrical signals for measurement and control purposes."
  },
  {
    id: 3,
    question: "Give an example of a sensor and transducer combination.",
    options: [
      "A light bulb and switch",
      "A thermocouple measuring temperature",
      "A battery and resistor",
      "A motor and gearbox"
    ],
    correctAnswer: 1,
    explanation: "A thermocouple is an excellent example as it acts as both sensor (detecting temperature changes) and transducer (converting thermal energy into electrical voltage)."
  },
  {
    id: 4,
    question: "Can a device be both a sensor and a transducer?",
    options: [
      "No, they must always be separate devices",
      "Yes, many modern devices combine both functions",
      "Only in digital systems",
      "Only in high-temperature applications"
    ],
    correctAnswer: 1,
    explanation: "Many modern devices combine both sensor and transducer functions in a single unit, such as thermocouples, strain gauges, and pressure transmitters."
  },
  {
    id: 5,
    question: "Why is it important to distinguish between the two?",
    options: [
      "It's not important in practical applications",
      "For proper system design, troubleshooting, and component selection",
      "Only for academic purposes",
      "To increase system complexity"
    ],
    correctAnswer: 1,
    explanation: "Understanding the distinction helps with proper system design, effective troubleshooting, correct component selection, and understanding signal flow in instrumentation systems."
  },
  {
    id: 6,
    question: "What type of energy conversion does a photodiode perform?",
    options: [
      "Thermal to electrical",
      "Optical to electrical",
      "Mechanical to electrical",
      "Chemical to electrical"
    ],
    correctAnswer: 1,
    explanation: "A photodiode converts light (optical energy) into electrical current, making it a transducer that converts optical energy to electrical energy."
  },
  {
    id: 7,
    question: "What is an advantage of integrated sensor/transducer devices?",
    options: [
      "More complex wiring required",
      "Compact design, reduced wiring, and factory calibration",
      "Lower accuracy than separate components",
      "More difficult to maintain"
    ],
    correctAnswer: 1,
    explanation: "Integrated devices offer compact design, reduced wiring and connections, lower installation costs, factory calibration, and simplified maintenance."
  },
  {
    id: 8,
    question: "When would modular (separate) sensor/transducer systems be preferred?",
    options: [
      "For standard applications only",
      "For specialised requirements, harsh environments, or flexibility needs",
      "When cost is the only concern",
      "Only in laboratory settings"
    ],
    correctAnswer: 1,
    explanation: "Modular systems offer flexibility in component selection, easier troubleshooting, custom signal conditioning, and better harsh environment protection."
  },
  {
    id: 9,
    question: "In the signal chain, what comes after sensing?",
    options: [
      "Output",
      "Energy conversion",
      "Display",
      "Storage"
    ],
    correctAnswer: 1,
    explanation: "After sensing (detecting the physical change), the signal chain proceeds to energy conversion where the sensed parameter is transformed into an electrical signal."
  },
  {
    id: 10,
    question: "What is an example of a modular sensor/transducer system?",
    options: [
      "A thermocouple",
      "An RTD with a separate transmitter",
      "A pressure transmitter",
      "A smart temperature sensor"
    ],
    correctAnswer: 1,
    explanation: "An RTD with a separate transmitter is a modular system where the RTD acts as the sensor and the transmitter provides signal conditioning and conversion."
  }
];

const faqs = [
  {
    question: "Are all sensors also transducers?",
    answer: "Not necessarily. A sensor detects physical phenomena, while a transducer converts energy forms. Many devices combine both functions, but they are conceptually different roles that can exist separately."
  },
  {
    question: "What's the benefit of understanding this distinction?",
    answer: "Understanding the difference helps with troubleshooting (isolating sensor vs signal conditioning issues), system design (choosing appropriate components), and maintenance (replacing the correct part when faults occur)."
  },
  {
    question: "Can transducers work in reverse?",
    answer: "Yes, some transducers are bidirectional. For example, a piezoelectric crystal can convert pressure to voltage (sensing) or voltage to mechanical movement (actuation), like in ultrasonic transmitters."
  },
  {
    question: "What is signal conditioning?",
    answer: "Signal conditioning processes the raw sensor/transducer output to make it suitable for measurement systems. This includes amplification, filtering, linearisation, and conversion to standard signal formats like 4-20mA."
  },
  {
    question: "How do I choose between integrated and modular systems?",
    answer: "Choose integrated for standard applications requiring simplicity and reliability. Choose modular for specialised requirements, harsh environments, or when flexibility in component selection is needed."
  }
];

const InstrumentationModule2Section1 = () => {
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-2">
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
            <span>Module 2 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Difference Between Sensors and Transducers
          </h1>
          <p className="text-white/80">
            Understanding the distinction and relationship between sensors and transducers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Sensor:</strong> Detects and responds to physical changes</li>
              <li><strong>Transducer:</strong> Converts one energy form to another</li>
              <li><strong>Combined:</strong> Many devices perform both functions</li>
              <li><strong>Signal Flow:</strong> Sensing → Conversion → Processing → Output</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Identify sensor vs transducer elements in instruments</li>
              <li><strong>Use:</strong> Select appropriate components for measurement systems</li>
              <li><strong>Apply:</strong> Troubleshoot by tracing signal flow through both stages</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define and differentiate sensors and transducers clearly",
              "Understand the flow of information from physical quantity to electrical signal",
              "Recognise combined vs separate sensor/transducer setups",
              "Apply this knowledge to practical instrumentation scenarios",
              "Select appropriate configurations for different applications",
              "Troubleshoot measurement systems effectively"
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

        {/* Section 1: Core Definitions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Core Definitions and Functions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The distinction between sensors and transducers is fundamental to understanding instrumentation
              systems. While these terms are often used interchangeably in everyday conversation, they
              represent different functions in the measurement chain.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Definition</p>
              <p className="text-sm text-white mb-3">
                A <strong>sensor</strong> is a device that detects and responds to physical changes in its
                environment. It perceives external stimuli such as temperature, pressure, light, motion,
                moisture, or any other environmental phenomenon.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Key Characteristics:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Detects physical phenomena</li>
                    <li>Responds to environmental changes</li>
                    <li>Provides input to measurement systems</li>
                    <li>Acts as the "sensing element"</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Common Examples:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Bimetallic strip (temperature)</li>
                    <li>Photodiode (light)</li>
                    <li>Strain gauge (mechanical stress)</li>
                    <li>Accelerometer chip (motion)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transducer Definition</p>
              <p className="text-sm text-white mb-3">
                A <strong>transducer</strong> is a device that converts one form of energy into another form
                of energy. In instrumentation, transducers typically convert physical quantities (mechanical,
                thermal, optical) into electrical signals that can be measured, processed, and transmitted.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Key Characteristics:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Converts energy forms</li>
                    <li>Usually produces electrical output</li>
                    <li>Enables signal processing</li>
                    <li>Provides measurable output</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Energy Conversions:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Mechanical → Electrical</li>
                    <li>Thermal → Electrical</li>
                    <li>Optical → Electrical</li>
                    <li>Chemical → Electrical</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Signal Flow */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Information Flow in Measurement Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding how information flows from physical phenomena to usable electrical signals is
              crucial for instrumentation system design and analysis.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Complete Signal Chain:</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">1. Physical Variable</p>
                  <p className="text-white/90 text-xs">Temperature, Pressure, etc.</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">2. Sensor Detection</p>
                  <p className="text-white/90 text-xs">Physical change detected</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">3. Energy Conversion</p>
                  <p className="text-white/90 text-xs">Transducer converts</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">4. Signal Processing</p>
                  <p className="text-white/90 text-xs">Amplify, filter, scale</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">5. Output Signal</p>
                  <p className="text-white/90 text-xs">4-20mA, 0-10V, Digital</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Separate Components Example</p>
                <p className="text-sm text-white mb-1"><strong>RTD + Signal Conditioner:</strong></p>
                <ul className="text-sm text-white space-y-1">
                  <li>RTD detects temperature change (sensor)</li>
                  <li>Resistance change occurs</li>
                  <li>Signal conditioner converts resistance to 4-20mA (transducer)</li>
                  <li>Standard signal sent to control system</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integrated Device Example</p>
                <p className="text-sm text-white mb-1"><strong>Thermocouple:</strong></p>
                <ul className="text-sm text-white space-y-1">
                  <li>Junction detects temperature (sensor function)</li>
                  <li>Dissimilar metals generate voltage (transducer function)</li>
                  <li>Direct electrical output</li>
                  <li>Single device performs both functions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Integrated vs Modular */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Integrated vs Modular Configurations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern instrumentation employs both integrated devices that combine sensor and transducer
              functions, and modular systems where components are separate. Each approach has distinct
              advantages depending on the application requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integrated Sensor/Transducer Devices</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Compact design saves space</li>
                    <li>Reduced wiring and connections</li>
                    <li>Lower installation costs</li>
                    <li>Fewer failure points</li>
                    <li>Factory calibration</li>
                    <li>Simplified maintenance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Examples:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>Pressure transmitters:</strong> Diaphragm + electronics</li>
                    <li><strong>Smart temperature transmitters:</strong> RTD/TC + digital processing</li>
                    <li><strong>Flow metres:</strong> Sensor + signal processing</li>
                    <li><strong>Level transmitters:</strong> Sensing element + output circuitry</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modular Sensor/Transducer Systems</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Advantages:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Flexibility in component selection</li>
                    <li>Easier troubleshooting and repair</li>
                    <li>Component-specific replacement</li>
                    <li>Custom signal conditioning</li>
                    <li>Better harsh environment protection</li>
                    <li>Cost-effective for simple applications</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Examples:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>RTD + transmitter:</strong> Separate sensor and conditioner</li>
                    <li><strong>Strain gauge + amplifier:</strong> Separate sensing and conditioning</li>
                    <li><strong>Photodiode + converter:</strong> Modular light measurement</li>
                    <li><strong>LVDT + demodulator:</strong> Position sensing system</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection Criteria:</strong> Choose integrated devices for standard applications requiring
              simplicity and reliability. Choose modular systems for specialised requirements, harsh environments,
              or when flexibility is paramount.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Practical Application */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Application: Hydraulic System Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a manufacturing facility, a hydraulic press system requires pressure monitoring to prevent
              dangerous over-pressurisation. This demonstrates both sensor and transducer principles in action.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">System Operation:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Pressure Sensing:</strong> A diaphragm inside the hydraulic line physically responds to pressure changes (sensor function)</li>
                <li><strong>2. Energy Conversion:</strong> Diaphragm movement is converted to electrical signal via strain gauges (transducer function)</li>
                <li><strong>3. Signal Processing:</strong> Electronic circuitry amplifies and converts the signal to standard 4-20mA output</li>
                <li><strong>4. Safety Action:</strong> When pressure exceeds safe limits, the control system triggers automatic shutdown valves</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Result:</strong> This integrated pressure transmitter combines both sensor and transducer
              functions in one device, providing reliable safety protection while simplifying installation and maintenance.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Components</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider whether integrated or modular systems suit the application</li>
                <li>Evaluate environmental conditions (temperature, vibration, corrosion)</li>
                <li>Assess accuracy and response time requirements</li>
                <li>Factor in maintenance and replacement considerations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Troubleshooting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify whether the issue is with sensing or signal conversion</li>
                <li>Check sensor response to known input values</li>
                <li>Verify transducer output signal levels</li>
                <li>Test signal conditioning and transmission separately</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Confusing terms</strong> — sensors detect, transducers convert</li>
                <li><strong>Mismatched components</strong> — ensure sensor output matches transducer input</li>
                <li><strong>Ignoring environment</strong> — harsh conditions may require modular systems</li>
                <li><strong>Overlooking calibration</strong> — both sensor and transducer need periodic calibration</li>
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
            <Link to="/electrician/upskilling/instrumentation-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../instrumentation-module-2-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule2Section1;
