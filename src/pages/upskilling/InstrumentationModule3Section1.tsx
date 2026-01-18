import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Signal Types - Instrumentation Module 3 Section 1";
const DESCRIPTION = "Understanding voltage, current, resistance, and frequency signals in industrial instrumentation systems.";

const quickCheckQuestions = [
  {
    id: "m3s1-q1",
    question: "What is the main advantage of 4-20mA current signals over voltage signals?",
    options: ["Lower cost", "Excellent noise immunity and live-zero detection", "Higher resolution", "Simpler wiring"],
    correctIndex: 1,
    explanation: "4-20mA current signals offer excellent noise immunity because current is less affected by electrical interference. The 4mA live-zero allows detection of broken wires or sensor failures."
  },
  {
    id: "m3s1-q2",
    question: "Which signal type is most commonly used with RTD temperature sensors?",
    options: ["Voltage (0-10V)", "Current (4-20mA)", "Resistance (varying ohms)", "Frequency (Hz)"],
    correctIndex: 2,
    explanation: "RTDs inherently produce resistance changes with temperature variations. A Pt100 sensor's resistance typically changes from around 100Ω at 0°C to 138Ω at 100°C."
  },
  {
    id: "m3s1-q3",
    question: "Why are frequency signals ideal for flow totalisation?",
    options: ["They are cheaper", "Pulses can be easily counted for totals", "They use less power", "They are more accurate"],
    correctIndex: 1,
    explanation: "Frequency signals are excellent for totalising applications because pulses can be easily counted. They also provide good noise immunity since noise rarely creates false pulses at the correct frequency."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the advantages of 4-20mA signals?",
    options: [
      "They are cheaper to implement than voltage signals",
      "Excellent noise immunity and live-zero detection capability",
      "They require less power than other signal types",
      "They provide higher resolution than digital signals"
    ],
    correctAnswer: 1,
    explanation: "4-20mA signals offer excellent noise immunity because current is less affected by electrical interference. The 4mA live-zero allows detection of broken wires or sensor failures."
  },
  {
    id: 2,
    question: "Which signal type is most common with RTDs?",
    options: [
      "Voltage signals (0-10V)",
      "Current signals (4-20mA)",
      "Resistance signals (varying ohms)",
      "Frequency signals (Hz)"
    ],
    correctAnswer: 2,
    explanation: "RTDs inherently produce resistance changes with temperature variations. The RTD's resistance typically changes from around 100Ω to 138Ω over a 0-100°C range for Pt100 sensors."
  },
  {
    id: 3,
    question: "What is a downside of voltage signals over long distances?",
    options: [
      "They consume too much power",
      "Voltage drop and susceptibility to electrical noise interference",
      "They require special cables",
      "They cannot be digitally processed"
    ],
    correctAnswer: 1,
    explanation: "Voltage signals suffer from voltage drop due to cable resistance over long distances, and they are more susceptible to electrical noise pickup."
  },
  {
    id: 4,
    question: "Why might a system use frequency output?",
    options: [
      "Frequency signals are always more accurate",
      "They use less power than other signal types",
      "Excellent for totalising applications and noise immunity",
      "They are required by safety regulations"
    ],
    correctAnswer: 2,
    explanation: "Frequency signals are excellent for totalising applications like flow measurement because pulses can be easily counted. They also provide good noise immunity."
  },
  {
    id: 5,
    question: "Which signal type is best for environments with electrical noise?",
    options: [
      "0-10V voltage signals",
      "4-20mA current signals",
      "Millivolt signals",
      "Variable resistance signals"
    ],
    correctAnswer: 1,
    explanation: "4-20mA current signals are best for noisy electrical environments because current loops are inherently less susceptible to electrical interference than voltage-based signals."
  },
  {
    id: 6,
    question: "What does a Pt100 RTD resistance of 100Ω indicate?",
    options: [
      "The sensor is faulty",
      "The temperature is 0°C",
      "The temperature is 100°C",
      "Maximum measurement range"
    ],
    correctAnswer: 1,
    explanation: "A Pt100 RTD has a resistance of 100Ω at 0°C. This is the reference point from which all temperature measurements are calculated."
  },
  {
    id: 7,
    question: "What is the typical maximum transmission distance for voltage signals?",
    options: [
      "Less than 50 metres",
      "500 metres",
      "1000 metres",
      "Unlimited distance"
    ],
    correctAnswer: 0,
    explanation: "Voltage signals are limited to short distances (typically less than 50m) due to voltage drop caused by cable resistance and increased susceptibility to noise pickup."
  },
  {
    id: 8,
    question: "Which measurement method provides the highest RTD accuracy?",
    options: [
      "2-wire measurement",
      "3-wire measurement",
      "4-wire measurement",
      "All methods are equally accurate"
    ],
    correctAnswer: 2,
    explanation: "4-wire measurement provides the highest accuracy by completely eliminating lead wire resistance effects, achieving errors as low as ±0.01°C."
  },
  {
    id: 9,
    question: "What is the temperature coefficient (α) for a standard Pt100 RTD?",
    options: [
      "0.00385Ω/Ω/°C",
      "0.00500Ω/Ω/°C",
      "0.00100Ω/Ω/°C",
      "0.01000Ω/Ω/°C"
    ],
    correctAnswer: 0,
    explanation: "The standard temperature coefficient for Pt100 RTDs is 0.00385Ω/Ω/°C (European standard IEC 60751)."
  },
  {
    id: 10,
    question: "What is the main advantage of NTC thermistors over RTDs?",
    options: [
      "Better accuracy",
      "Higher sensitivity (large resistance change)",
      "Linear response",
      "Better stability"
    ],
    correctAnswer: 1,
    explanation: "NTC thermistors have high sensitivity with large resistance changes per degree, making them useful for detecting small temperature changes, though their response is non-linear."
  }
];

const faqs = [
  {
    question: "When should I use 4-20mA instead of 0-10V signals?",
    answer: "Use 4-20mA for long distances (over 50m), noisy industrial environments, or when fault detection is critical. The live-zero feature means 0mA indicates a fault, not a valid zero reading. Voltage signals are suitable for short local connections in clean electrical environments."
  },
  {
    question: "Why does a Pt100 RTD use 100Ω at 0°C as the reference?",
    answer: "The Pt100 standard was established because 100Ω provides a good balance between sensitivity, power dissipation, and practical measurement. The platinum element's predictable, linear resistance change with temperature makes it ideal for precision temperature measurement."
  },
  {
    question: "What is the difference between 2-wire, 3-wire, and 4-wire RTD connections?",
    answer: "2-wire includes lead resistance in the measurement (±0.5°C error). 3-wire compensates for lead resistance using a balanced bridge (±0.1°C typical). 4-wire eliminates lead effects completely using separate current and voltage pairs (±0.01°C possible)."
  },
  {
    question: "How do I calculate the current for a 4-20mA signal at a given percentage?",
    answer: "Use the formula: Current (mA) = 4 + (16 × %Scale/100). For example, 50% scale = 4 + (16 × 0.5) = 12mA. To reverse: %Scale = (Current - 4) × 100/16."
  },
  {
    question: "Why are frequency signals preferred for flow measurement?",
    answer: "Frequency signals provide natural totalisation through pulse counting, excellent noise immunity (false pulses are rare), and high resolution limited only by counting time. Turbine and positive displacement meters typically output pulses per unit volume."
  }
];

const InstrumentationModule3Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Signal Types
          </h1>
          <p className="text-white/80">
            Voltage, current, resistance, and frequency signals in instrumentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Voltage:</strong> Simple but noise-prone, short distance</li>
              <li><strong>Current:</strong> 4-20mA industry standard, excellent noise immunity</li>
              <li><strong>Resistance:</strong> RTDs and thermistors, high accuracy</li>
              <li><strong>Frequency:</strong> Ideal for totalising, great noise immunity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check transmitter output type on label</li>
              <li><strong>Use:</strong> Match signal type to distance and environment</li>
              <li><strong>Remember:</strong> 4mA = 0%, 20mA = 100%, 0mA = fault</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the key electrical signal types used in instrumentation",
              "Understand the behaviour and application of each signal type",
              "Recognise how different sensors output different signal types",
              "Compare signal types for range, noise susceptibility, and distance",
              "Calculate 4-20mA signal values from process measurements",
              "Select the appropriate signal type for different applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Voltage Signals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage Signals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage signals represent measurement data as varying electrical potential between two points. They are commonly used in analogue sensors and provide direct interfacing with many measurement systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Voltage Signal Ranges:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>0-10V DC:</strong> Most common industrial voltage range, providing good resolution and simple interfacing with PLCs, chart recorders, and data acquisition systems</li>
                <li><strong>±10V Bipolar:</strong> Allows representation of both positive and negative values, used for position sensors and differential measurements</li>
                <li><strong>Millivolt Signals (0-100mV):</strong> Low-level signals from thermocouples and strain gauges, requiring amplification and careful shielding</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Voltage Signal Characteristics:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 mb-1">Advantages:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li>Simple measurement circuits</li>
                    <li>High input impedance (minimal loading)</li>
                    <li>Direct digital conversion</li>
                    <li>Cost-effective implementation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 mb-1">Disadvantages:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li>Susceptible to electrical noise</li>
                    <li>Voltage drop over long cables</li>
                    <li>Ground loop problems</li>
                    <li>Limited transmission distance (&lt;50m)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Current Signals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Current Signals (4-20mA)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Current signals, particularly the industry-standard 4-20mA, provide excellent noise immunity and are ideal for long-distance transmission in industrial environments. The 4mA offset provides "live zero" capability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why 4-20mA Became the Standard:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>4mA = 0% scale</strong> (0°C, 0 bar, etc.) - Live zero allows fault detection</li>
                <li><strong>12mA = 50% scale</strong> - Midpoint of the measurement range</li>
                <li><strong>20mA = 100% scale</strong> - Full scale measurement</li>
                <li><strong>0mA = Fault condition</strong> - Broken wire or sensor failure</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Signal Calculation Formula:</p>
              <p className="text-white text-sm">Current (mA) = 4 + (Process Value / Full Scale) × 16</p>
              <p className="text-white/80 text-sm mt-2">Example: 50% scale = 4 + (16 × 0.5) = 12mA</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">4-20mA Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Excellent noise immunity - current loops resist EMI</li>
                <li>Long transmission distances (1000m+) without amplification</li>
                <li>Two-wire operation - power and signal in same loop</li>
                <li>HART communication compatible for smart transmitters</li>
                <li>Easy troubleshooting with standard multimeter</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Resistance Signals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Resistance Signals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Resistance signals are the fundamental output of RTDs (Resistance Temperature Detectors) and thermistors, where the sensor's resistance changes proportionally to the measured parameter, typically temperature.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pt100 RTD Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>0°C = 100.00Ω</strong> - The reference point for Pt100</li>
                <li><strong>25°C = 109.73Ω</strong> - Room temperature</li>
                <li><strong>50°C = 119.40Ω</strong> - Moderate temperature</li>
                <li><strong>100°C = 138.51Ω</strong> - Boiling point of water</li>
                <li><strong>α = 0.00385Ω/Ω/°C</strong> - Temperature coefficient</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RTD Measurement Methods:</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">2-Wire</p>
                  <p className="text-white">Simplest but includes lead wire resistance. Error: ±0.5°C typical</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">3-Wire</p>
                  <p className="text-white">Compensates for lead resistance. Most common industrial method. Error: ±0.1°C</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">4-Wire</p>
                  <p className="text-white">Highest accuracy by eliminating lead effects. Error: ±0.01°C possible</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">NTC Thermistors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Negative Temperature Coefficient - resistance decreases as temperature increases</li>
                <li>High sensitivity with large resistance changes per degree</li>
                <li>Non-linear response requiring linearisation</li>
                <li>Lower cost than RTDs, used in HVAC and consumer electronics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04 - Frequency Signals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequency Signals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Frequency signals encode measurement data as varying pulse rates or frequencies, providing excellent noise immunity and natural totalising capability for flow and speed measurements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Frequency Signal Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Typical ranges: 0-1000 Hz or 0-10 kHz</li>
                <li>Square wave output (TTL/CMOS logic levels)</li>
                <li>Frequency proportional to flow rate or speed</li>
                <li>Pulse count provides running totals</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advantages of Frequency Signals:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="text-white space-y-1 ml-4">
                    <li><strong>Excellent noise immunity:</strong> Digital nature resists interference</li>
                    <li><strong>Natural totalising:</strong> Easy pulse counting for totals</li>
                    <li><strong>Long distance:</strong> Can transmit over long cables</li>
                  </ul>
                </div>
                <div>
                  <ul className="text-white space-y-1 ml-4">
                    <li><strong>High resolution:</strong> Limited only by counting time</li>
                    <li><strong>Self-powered:</strong> Many sensors are passive</li>
                    <li><strong>Simple processing:</strong> Standard counter circuits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Turbine flow meters - pulses per litre</li>
                <li>Positive displacement meters - precise volume measurement</li>
                <li>Speed sensors and encoders - RPM measurement</li>
                <li>Energy meters - kWh pulse output</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 - Signal Type Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Signal Type Comparison
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the comparative strengths and weaknesses of each signal type enables optimal selection for specific applications and environments.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/20 rounded">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-2 text-left text-elec-yellow/80 border-b border-white/20">Characteristic</th>
                    <th className="p-2 text-left border-b border-white/20">Voltage</th>
                    <th className="p-2 text-left border-b border-white/20">Current</th>
                    <th className="p-2 text-left border-b border-white/20">Resistance</th>
                    <th className="p-2 text-left border-b border-white/20">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 text-elec-yellow/80 border-b border-white/10">Noise Immunity</td>
                    <td className="p-2 border-b border-white/10">Poor</td>
                    <td className="p-2 border-b border-white/10">Excellent</td>
                    <td className="p-2 border-b border-white/10">Moderate</td>
                    <td className="p-2 border-b border-white/10">Excellent</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-elec-yellow/80 border-b border-white/10">Distance</td>
                    <td className="p-2 border-b border-white/10">&lt;50m</td>
                    <td className="p-2 border-b border-white/10">1000m+</td>
                    <td className="p-2 border-b border-white/10">&lt;100m</td>
                    <td className="p-2 border-b border-white/10">1000m+</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-elec-yellow/80 border-b border-white/10">Fault Detection</td>
                    <td className="p-2 border-b border-white/10">Difficult</td>
                    <td className="p-2 border-b border-white/10">Built-in (4mA)</td>
                    <td className="p-2 border-b border-white/10">Moderate</td>
                    <td className="p-2 border-b border-white/10">Good</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-elec-yellow/80">Implementation Cost</td>
                    <td className="p-2">Low</td>
                    <td className="p-2">Moderate</td>
                    <td className="p-2">Moderate</td>
                    <td className="p-2">Low-Moderate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Selection Guidelines</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Choose current signals for industrial environments and long distances</li>
                <li>Use voltage for laboratory/local applications with clean power</li>
                <li>Select resistance for highest accuracy temperature measurement</li>
                <li>Use frequency for totalising applications like flow measurement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Troubleshooting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>4-20mA: 0mA indicates broken wire, &lt;4mA indicates sensor fault</li>
                <li>Voltage: Check for ground loops causing erratic readings</li>
                <li>Resistance: Verify correct wire configuration (2/3/4-wire)</li>
                <li>Frequency: Check for missing pulses or false triggering</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using voltage signals over long distances</strong> — causes measurement errors from noise and voltage drop</li>
                <li><strong>Ignoring 2-wire RTD lead resistance</strong> — can cause significant temperature reading errors</li>
                <li><strong>Misinterpreting 0mA as zero reading</strong> — 0mA always indicates a fault in 4-20mA systems</li>
                <li><strong>Not matching signal types to input modules</strong> — verify PLC/DCS input configuration</li>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/instrumentation-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default InstrumentationModule3Section1;
