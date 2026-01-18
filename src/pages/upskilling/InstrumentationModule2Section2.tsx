import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const quickCheckQuestions = [
  {
    id: "rtd-principle",
    question: "What principle does an RTD work on?",
    options: [
      "Voltage generation from dissimilar metals",
      "Resistance change with temperature",
      "Capacitance variation with heat",
      "Magnetic field strength changes"
    ],
    correctIndex: 1,
    explanation: "RTDs (Resistance Temperature Detectors) work on the principle that the electrical resistance of certain metals increases predictably with temperature."
  },
  {
    id: "high-temp-sensor",
    question: "Which sensor is best for high-temperature environments?",
    options: [
      "Thermistor",
      "RTD",
      "Thermocouple",
      "Infrared sensor"
    ],
    correctIndex: 2,
    explanation: "Thermocouples can withstand the highest temperatures (up to 2000°C or more) and are most suitable for harsh, high-temperature industrial environments."
  },
  {
    id: "thermistor-advantage",
    question: "What's the main advantage of a thermistor?",
    options: [
      "Wide temperature range",
      "High sensitivity and precision in narrow temperature ranges",
      "Rugged construction",
      "Self-powered operation"
    ],
    correctIndex: 1,
    explanation: "Thermistors offer the highest sensitivity and precision for temperature measurement, but only within their specific, relatively narrow temperature range."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What principle does an RTD work on?",
    options: [
      "Voltage generation from dissimilar metals",
      "Resistance change with temperature",
      "Capacitance variation with heat",
      "Magnetic field strength changes"
    ],
    correctAnswer: 1,
    explanation: "RTDs (Resistance Temperature Detectors) work on the principle that the electrical resistance of certain metals increases predictably with temperature."
  },
  {
    id: 2,
    question: "Which sensor is best for high-temperature environments?",
    options: [
      "Thermistor",
      "RTD",
      "Thermocouple",
      "Infrared sensor"
    ],
    correctAnswer: 2,
    explanation: "Thermocouples can withstand the highest temperatures (up to 2000°C or more) and are most suitable for harsh, high-temperature industrial environments."
  },
  {
    id: 3,
    question: "What's the main advantage of a thermistor?",
    options: [
      "Wide temperature range",
      "High sensitivity and precision in narrow temperature ranges",
      "Rugged construction",
      "Self-powered operation"
    ],
    correctAnswer: 1,
    explanation: "Thermistors offer the highest sensitivity and precision for temperature measurement, but only within their specific, relatively narrow temperature range."
  },
  {
    id: 4,
    question: "Why might you avoid using an RTD in harsh environments?",
    options: [
      "Too expensive",
      "Fragile construction and susceptibility to vibration and shock",
      "Requires external power",
      "Poor accuracy"
    ],
    correctAnswer: 1,
    explanation: "RTDs have delicate wire elements that can be damaged by vibration, shock, and mechanical stress, making them less suitable for harsh industrial environments."
  },
  {
    id: 5,
    question: "Which sensor offers the fastest response time?",
    options: [
      "RTD",
      "Thermistor",
      "Thermocouple",
      "Bimetallic strip"
    ],
    correctAnswer: 2,
    explanation: "Thermocouples have the fastest response time due to their small thermal mass and direct junction construction, making them ideal for rapid temperature changes."
  },
  {
    id: 6,
    question: "What does Pt100 indicate about an RTD?",
    options: [
      "Maximum temperature of 100°C",
      "100 ohms resistance at 0°C",
      "100% accuracy rating",
      "100mA maximum current"
    ],
    correctAnswer: 1,
    explanation: "Pt100 indicates a platinum RTD with 100 ohms resistance at 0°C. This is the most common RTD specification used in industrial applications."
  },
  {
    id: 7,
    question: "What is the Seebeck effect?",
    options: [
      "Resistance change with temperature",
      "Voltage generation when dissimilar metals are joined and heated",
      "Capacitance variation with pressure",
      "Inductance change with position"
    ],
    correctAnswer: 1,
    explanation: "The Seebeck effect is the generation of a voltage when two dissimilar metals are joined and exposed to a temperature difference, which is the operating principle of thermocouples."
  },
  {
    id: 8,
    question: "What is cold junction compensation?",
    options: [
      "Cooling the sensor for accuracy",
      "Correcting for temperature at the reference junction of a thermocouple",
      "Preventing frost damage",
      "Reducing thermal lag"
    ],
    correctAnswer: 1,
    explanation: "Cold junction compensation corrects for the temperature at the reference junction (where thermocouple wires connect to measurement equipment) to ensure accurate readings."
  },
  {
    id: 9,
    question: "Why is a 3-wire RTD configuration commonly used?",
    options: [
      "Lower cost than 2-wire",
      "Better accuracy by compensating for lead wire resistance",
      "Faster response time",
      "Higher temperature capability"
    ],
    correctAnswer: 1,
    explanation: "A 3-wire configuration compensates for lead wire resistance, providing better accuracy than 2-wire while being more cost-effective than 4-wire arrangements."
  },
  {
    id: 10,
    question: "What does NTC stand for in thermistors?",
    options: [
      "Narrow Temperature Control",
      "Negative Temperature Coefficient",
      "Non-Thermal Conductor",
      "Nominal Temperature Characteristic"
    ],
    correctAnswer: 1,
    explanation: "NTC stands for Negative Temperature Coefficient, meaning the thermistor's resistance decreases as temperature increases."
  }
];

const faqs = [
  {
    question: "Which temperature sensor should I use for my application?",
    answer: "Consider: temperature range (thermocouples for high temps, RTDs for moderate, thermistors for narrow ranges), accuracy requirements (RTDs best, then thermistors, then thermocouples), environment (thermocouples for harsh conditions), and cost (thermocouples cheapest)."
  },
  {
    question: "Why do thermocouples need cold junction compensation?",
    answer: "Thermocouples measure the temperature difference between two junctions. The cold (reference) junction temperature must be known or compensated for to determine the absolute temperature at the measurement junction."
  },
  {
    question: "Can I replace an RTD with a thermocouple?",
    answer: "Not directly. They have different operating principles and output signals. RTDs output resistance changes while thermocouples output voltage. The instrumentation must be compatible with the sensor type."
  },
  {
    question: "What causes self-heating in RTDs?",
    answer: "The measurement current flowing through the RTD element generates heat due to resistance. This self-heating can cause measurement errors. Using lower excitation currents and proper sensor mounting minimises this effect."
  },
  {
    question: "How do I choose between Type K and Type J thermocouples?",
    answer: "Type K (Chromel-Alumel) is more versatile with a wider temperature range and better oxidation resistance. Type J (Iron-Constantan) has higher sensitivity but limited range and is not suitable for oxidising atmospheres."
  }
];

const InstrumentationModule2Section2 = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 2 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Temperature Sensors
          </h1>
          <p className="text-white/80">
            Thermocouples, RTDs, and Thermistors - Principles and Applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Thermocouples:</strong> Voltage from dissimilar metals, wide range, rugged</li>
              <li><strong>RTDs:</strong> Resistance change with temp, high accuracy, stable</li>
              <li><strong>Thermistors:</strong> High sensitivity, narrow range, fast response</li>
              <li><strong>Selection:</strong> Match sensor to application requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Identify sensor type by connections and output signal</li>
              <li><strong>Use:</strong> Select based on temp range, accuracy, and environment</li>
              <li><strong>Apply:</strong> Match wiring configuration to accuracy needs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the differences between thermocouples, RTDs, and thermistors",
              "Understand how temperature affects electrical properties in each sensor type",
              "Know where each sensor type is best applied",
              "Apply selection criteria based on environment, accuracy, and budget",
              "Understand wiring configurations for RTDs",
              "Recognise common thermocouple types and their applications"
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

        {/* Section 1: Thermocouples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Thermocouples: Voltage Generation from Dissimilar Metals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermocouples operate on the <strong>thermoelectric effect</strong> (Seebeck effect), where
              a voltage is generated when two dissimilar metals are joined at one end and exposed to a
              temperature difference. This simple yet robust principle makes thermocouples the most widely
              used temperature sensors in harsh industrial environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Seebeck Effect:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Two dissimilar metal wires joined at measuring junction</li>
                    <li>Temperature difference creates electron flow</li>
                    <li>Voltage generated proportional to temperature</li>
                    <li>Cold junction compensation required</li>
                    <li>Self-powered (no external excitation needed)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Construction:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Simple junction of two metal wires</li>
                    <li>Various junction types (grounded, ungrounded, exposed)</li>
                    <li>Protective sheaths for harsh environments</li>
                    <li>Mineral insulation for electrical isolation</li>
                    <li>Extension/compensation cables for long runs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Thermocouple Types:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Type K (Chromel-Alumel)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Range: -200°C to +1260°C</li>
                    <li>Most popular general purpose</li>
                    <li>Good oxidation resistance</li>
                    <li>±2.2°C or ±0.75% accuracy</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Type J (Iron-Constantan)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Range: -210°C to +760°C</li>
                    <li>Higher sensitivity than K</li>
                    <li>Limited to reducing atmospheres</li>
                    <li>±2.2°C or ±0.75% accuracy</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Type T (Copper-Constantan)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Range: -250°C to +400°C</li>
                    <li>Excellent for low temperatures</li>
                    <li>Good in moist conditions</li>
                    <li>±1°C or ±0.75% accuracy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wide temperature range capability</li>
                  <li>Rugged and robust construction</li>
                  <li>Fast response time (low thermal mass)</li>
                  <li>Self-powered operation</li>
                  <li>Relatively inexpensive</li>
                  <li>Suitable for harsh environments</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Low voltage output (mV range)</li>
                  <li>Requires cold junction compensation</li>
                  <li>Non-linear temperature relationship</li>
                  <li>Susceptible to electrical noise</li>
                  <li>Accuracy limited by reference junction</li>
                  <li>Ageing and drift over time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: RTDs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RTDs: Precision Resistance Temperature Detectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Resistance Temperature Detectors (RTDs) utilise the predictable change in electrical
              resistance of pure metals with temperature. Platinum RTDs are the most common due to their
              excellent stability, linearity, and wide temperature range, making them the standard for
              precision temperature measurement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Principle</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Resistance-Temperature Relationship:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Resistance increases linearly with temperature</li>
                    <li>Pure metals exhibit predictable coefficient</li>
                    <li>Temperature Coefficient of Resistance (TCR)</li>
                    <li>Platinum: ~0.385% per °C</li>
                    <li>Requires measurement current (excitation)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Common RTD Types:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>Pt100:</strong> 100Ω at 0°C (most common)</li>
                    <li><strong>Pt1000:</strong> 1000Ω at 0°C (higher sensitivity)</li>
                    <li><strong>Pt500:</strong> 500Ω at 0°C (compromise option)</li>
                    <li>Nickel and copper RTDs (specific applications)</li>
                    <li>Various accuracy classes (AA, A, B)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Wiring Configurations:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">2-Wire</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Simplest wiring</li>
                    <li>Lead resistance causes error</li>
                    <li>Short cable runs only</li>
                    <li>Lower accuracy</li>
                    <li>Lowest cost</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">3-Wire</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Compensates lead resistance</li>
                    <li>Most common configuration</li>
                    <li>Good accuracy vs cost</li>
                    <li>Moderate cable lengths</li>
                    <li>Industry standard</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">4-Wire</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Highest accuracy</li>
                    <li>Eliminates lead resistance</li>
                    <li>Long cable runs possible</li>
                    <li>Laboratory/precision use</li>
                    <li>Highest cost</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Excellent accuracy and stability</li>
                  <li>Nearly linear temperature response</li>
                  <li>Wide temperature range (-200°C to +850°C)</li>
                  <li>Good long-term stability</li>
                  <li>Interchangeable sensors available</li>
                  <li>No cold junction compensation needed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Requires excitation current</li>
                  <li>Self-heating effects possible</li>
                  <li>Slower response than thermocouples</li>
                  <li>More expensive than thermocouples</li>
                  <li>Fragile in high-vibration environments</li>
                  <li>Lead resistance compensation needed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Thermistors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermistors: High-Sensitivity Temperature Sensors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermistors are temperature-sensitive resistors made from semiconductor materials that
              exhibit large, predictable changes in electrical resistance with small temperature variations.
              Their high sensitivity makes them ideal for precise temperature control and measurement in
              narrow temperature ranges.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types and Characteristics:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">NTC (Negative Temperature Coefficient)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Resistance decreases with temperature increase</li>
                    <li>Most common type for temperature sensing</li>
                    <li>High sensitivity (3-5% per °C)</li>
                    <li>Non-linear response curve</li>
                    <li>Range typically -55°C to +200°C</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">PTC (Positive Temperature Coefficient)</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Resistance increases with temperature</li>
                    <li>Often used for over-temperature protection</li>
                    <li>Sharp resistance change at specific temperature</li>
                    <li>Self-limiting heating applications</li>
                    <li>Current limiting and circuit protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advantages</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Extremely high sensitivity</li>
                  <li>High precision in narrow ranges</li>
                  <li>Fast response time</li>
                  <li>Small size and low thermal mass</li>
                  <li>Low cost for volume applications</li>
                  <li>No self-heating at low currents</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Limited temperature range</li>
                  <li>Highly non-linear response</li>
                  <li>Not easily interchangeable</li>
                  <li>Requires linearisation circuitry</li>
                  <li>Fragile construction</li>
                  <li>Long-term stability concerns</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Selection Criteria */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Selection Criteria and Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the appropriate temperature sensor requires careful consideration of application
              requirements, environmental conditions, performance specifications, and cost constraints.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Application Guidelines:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Choose Thermocouples For:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>High-temperature processes</li>
                    <li>Harsh environments</li>
                    <li>Fast response requirements</li>
                    <li>Wide temperature ranges</li>
                    <li>Cost-sensitive applications</li>
                    <li>Furnace and kiln monitoring</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Choose RTDs For:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>High accuracy requirements</li>
                    <li>Laboratory measurements</li>
                    <li>Process control applications</li>
                    <li>Long-term stability needed</li>
                    <li>Moderate temperature ranges</li>
                    <li>Pharmaceutical processes</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Choose Thermistors For:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Precise temperature control</li>
                    <li>HVAC applications</li>
                    <li>Medical devices</li>
                    <li>Consumer electronics</li>
                    <li>Narrow temperature ranges</li>
                    <li>High-sensitivity needs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Quick Comparison:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Temperature Range</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Thermocouple: -200°C to +2000°C</li>
                    <li>RTD: -200°C to +850°C</li>
                    <li>Thermistor: -55°C to +200°C</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Accuracy</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Thermocouple: ±0.5°C to ±2°C</li>
                    <li>RTD: ±0.1°C to ±0.5°C</li>
                    <li>Thermistor: ±0.05°C to ±0.2°C</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-1">Response Time</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Thermocouple: Very fast (ms)</li>
                    <li>RTD: Moderate (seconds)</li>
                    <li>Thermistor: Fast (ms to seconds)</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Scenario: Commercial HVAC System</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Indoor Climate Control (RTDs):</strong> Zone temperature control requiring ±0.5°C accuracy in clean, stable conditions (18°C to 26°C range)</li>
                <li><strong>Boiler Room Monitoring (Thermocouples):</strong> High-heat equipment monitoring in hot, harsh environments with vibration (50°C to 800°C range)</li>
                <li><strong>Result:</strong> Optimal comfort control with reliability and cost-effectiveness by matching sensor type to application</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Temperature Sensors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure good thermal contact with the process</li>
                <li>Minimise thermal gradients along sensor length</li>
                <li>Protect cables from heat, vibration, and EMI</li>
                <li>Use appropriate wiring configuration for accuracy needs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong sensor type</strong> — matching temperature range and accuracy to application</li>
                <li><strong>Poor thermal contact</strong> — air gaps cause measurement errors</li>
                <li><strong>Ignoring lead resistance</strong> — use 3-wire or 4-wire RTD configurations</li>
                <li><strong>Missing cold junction compensation</strong> — essential for accurate thermocouple readings</li>
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InstrumentationModule2Section2;
