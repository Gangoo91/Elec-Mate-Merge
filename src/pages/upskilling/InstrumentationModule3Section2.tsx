import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Standard Ranges - Instrumentation Module 3 Section 2";
const DESCRIPTION = "Exploring industry-standard signal formats including 4-20mA, 0-10V, and pulse signals for system integration.";

const quickCheckQuestions = [
  {
    id: "m3s2-q1",
    question: "What does a 4mA signal typically represent in a 4-20mA system?",
    options: ["A fault condition", "The zero or minimum scale value (0%)", "The maximum scale value", "50% of the range"],
    correctIndex: 1,
    explanation: "In the 4-20mA standard, 4mA represents 0% of the measurement range (zero scale). For example, in a 0-100°C temperature measurement, 4mA = 0°C."
  },
  {
    id: "m3s2-q2",
    question: "What does a 0mA reading indicate in a 4-20mA system?",
    options: ["The measurement is at minimum", "Normal operation", "A fault condition such as broken wire", "50% of range"],
    correctIndex: 2,
    explanation: "In a 4-20mA system, 0mA indicates a fault condition such as a broken wire, power failure, or sensor malfunction. Normal operation should never produce 0mA."
  },
  {
    id: "m3s2-q3",
    question: "Why are pulse signals ideal for flow totalisation?",
    options: ["They are cheaper to implement", "Pulses can be easily counted for running totals", "They require less wiring", "They are more accurate than current signals"],
    correctIndex: 1,
    explanation: "Pulse signals are ideal for flow totalisation because pulses can be easily counted and totalled, providing natural integration of flow data over time."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a 4mA signal typically represent?",
    options: [
      "A system fault condition",
      "The zero or minimum scale value (0% of measurement range)",
      "The maximum scale value",
      "50% of the measurement range"
    ],
    correctAnswer: 1,
    explanation: "In the 4-20mA standard, 4mA represents 0% of the measurement range (zero scale). This provides 'live zero' capability for fault detection."
  },
  {
    id: 2,
    question: "Why use 4-20mA over 0-20mA?",
    options: [
      "4-20mA signals are cheaper to implement",
      "The 4mA offset provides live-zero for fault detection",
      "4-20mA signals have better accuracy",
      "They consume less power"
    ],
    correctAnswer: 1,
    explanation: "The 4mA offset provides 'live-zero' capability, allowing differentiation between a true zero reading (4mA) and a system fault (0mA from broken wire)."
  },
  {
    id: 3,
    question: "Which signal is most affected by cable length?",
    options: [
      "4-20mA current signals",
      "0-10V voltage signals",
      "Frequency pulse signals",
      "Digital communication signals"
    ],
    correctAnswer: 1,
    explanation: "0-10V voltage signals are most affected by cable length due to voltage drop caused by cable resistance and increased susceptibility to electrical noise."
  },
  {
    id: 4,
    question: "When would you use a pulse signal?",
    options: [
      "For high-accuracy temperature measurement",
      "For pressure measurement in hydraulic systems",
      "For flow totalisation and speed measurement applications",
      "For pH measurement in chemical processes"
    ],
    correctAnswer: 2,
    explanation: "Pulse signals are ideal for flow totalisation and speed measurement because pulses can be easily counted and totalled."
  },
  {
    id: 5,
    question: "What does it mean if a 4-20mA signal reads 0mA?",
    options: [
      "The measurement is at minimum scale",
      "The system is operating normally",
      "There is a fault condition such as broken wire or sensor failure",
      "The measurement is at 50% scale"
    ],
    correctAnswer: 2,
    explanation: "In a 4-20mA system, 0mA indicates a fault condition such as a broken wire, power failure, or sensor malfunction."
  },
  {
    id: 6,
    question: "What is the main limitation of 0-10V signals?",
    options: [
      "Cannot be used with PLCs",
      "No fault detection capability and susceptible to noise",
      "Too expensive to implement",
      "Only works with temperature sensors"
    ],
    correctAnswer: 1,
    explanation: "0-10V signals cannot distinguish between 0V and a fault condition, and they are susceptible to electrical noise and voltage drop over distance."
  },
  {
    id: 7,
    question: "For a 0-100°C transmitter, what current represents 62.5°C?",
    options: [
      "10mA",
      "12mA",
      "14mA",
      "16mA"
    ],
    correctAnswer: 2,
    explanation: "Using the formula: Current = 4 + (62.5/100) × 16 = 4 + 10 = 14mA"
  },
  {
    id: 8,
    question: "What is the K-factor in pulse flow measurement?",
    options: [
      "The maximum flow rate",
      "The number of pulses per unit volume",
      "The cable length limit",
      "The signal frequency"
    ],
    correctAnswer: 1,
    explanation: "The K-factor is the number of pulses per unit volume (e.g., 1000 pulses/litre), used to calculate total flow from pulse count."
  },
  {
    id: 9,
    question: "What reading range indicates a sensor fault in 4-20mA systems?",
    options: [
      "4-20mA",
      "Below 3.8mA or above 20.5mA",
      "Exactly 12mA",
      "Between 0-4mA only"
    ],
    correctAnswer: 1,
    explanation: "Readings below 3.8mA (under-range) or above 20.5mA (over-range) typically indicate sensor faults or process conditions outside the normal range."
  },
  {
    id: 10,
    question: "What is the main advantage of standardised signal ranges?",
    options: [
      "Lower power consumption",
      "Universal compatibility between different manufacturers",
      "Faster signal transmission",
      "Smaller cable sizes"
    ],
    correctAnswer: 1,
    explanation: "Standardised signal ranges enable interoperability between devices from different manufacturers and simplify system integration and troubleshooting."
  }
];

const faqs = [
  {
    question: "How do I convert a 4-20mA reading to a process value?",
    answer: "Use the formula: Process Value = (Current - 4) × Full Scale / 16. For example, with a 14mA reading on a 0-100°C transmitter: Temperature = (14-4) × 100/16 = 62.5°C."
  },
  {
    question: "What is the maximum cable length for 0-10V signals?",
    answer: "Generally 50-100 metres maximum, depending on cable quality and electrical environment. Shielded twisted pair cable with proper grounding extends this range. For longer distances, use 4-20mA signals instead."
  },
  {
    question: "How do I calculate total flow from pulse output?",
    answer: "Divide the total pulse count by the K-factor. For example, with K-factor = 1000 pulses/litre and 216,000 pulses counted: Total flow = 216,000/1000 = 216 litres."
  },
  {
    question: "What causes under-range readings in 4-20mA systems?",
    answer: "Under-range readings (below 3.8mA) can indicate sensor failure, incorrect calibration, process conditions below the sensor range, or transmitter power supply issues."
  },
  {
    question: "Why do some systems use 1-5V instead of 0-10V?",
    answer: "1-5V provides a similar live-zero benefit to 4-20mA, where 0V indicates a fault. It is often created by placing a 250Ω resistor in a 4-20mA loop (4mA × 250Ω = 1V, 20mA × 250Ω = 5V)."
  }
];

const InstrumentationModule3Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 3 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Standard Signal Ranges
          </h1>
          <p className="text-white/80">
            4-20mA, 0-10V, and pulse signals for system integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>4-20mA:</strong> Industry standard, live-zero fault detection</li>
              <li><strong>0-10V:</strong> Simple, local applications only</li>
              <li><strong>Pulse:</strong> Natural totalising, excellent noise immunity</li>
              <li><strong>Standards:</strong> Enable universal compatibility</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> 0mA = fault, 4mA = zero, 20mA = full scale</li>
              <li><strong>Use:</strong> 250Ω resistor converts 4-20mA to 1-5V</li>
              <li><strong>Calculate:</strong> mA = 4 + (% × 16/100)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the benefits of standardised signal ranges",
              "Interpret 4-20mA and 0-10V signals correctly",
              "Know where and why pulse signals are used",
              "Calculate process values from signal readings",
              "Apply troubleshooting techniques using signal behaviour",
              "Select appropriate standards for different applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - 4-20mA Standard */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            4-20mA Current Loop Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 4-20mA current loop is the most widely used analogue signal standard in industrial instrumentation, chosen for its excellent noise immunity, long-distance transmission capability, and built-in fault detection through live-zero operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Linear Scaling Formula:</p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-white text-sm font-mono">Current (mA) = 4 + (Process Value / Full Scale) × 16</p>
                <p className="text-white/80 text-sm mt-2">Reverse: Process Value = (Current - 4) × Full Scale / 16</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example: 0-100°C Temperature Transmitter</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>0°C = 4 + (0/100) × 16 = <strong>4.0mA</strong></li>
                <li>25°C = 4 + (25/100) × 16 = <strong>8.0mA</strong></li>
                <li>50°C = 4 + (50/100) × 16 = <strong>12.0mA</strong></li>
                <li>100°C = 4 + (100/100) × 16 = <strong>20.0mA</strong></li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Live-Zero Benefits:</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Normal Operation</p>
                  <ul className="text-white space-y-1">
                    <li>4.0mA = 0% scale</li>
                    <li>4.1-19.9mA = Valid readings</li>
                    <li>20.0mA = 100% scale</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Fault Conditions</p>
                  <ul className="text-white space-y-1">
                    <li>0mA = Wire break/power loss</li>
                    <li>&lt;3.8mA = Sensor fault</li>
                    <li>&gt;20.5mA = Over-range/fault</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Diagnostic Benefits</p>
                  <ul className="text-white space-y-1">
                    <li>Automatic fault alarms</li>
                    <li>Loop integrity checking</li>
                    <li>Calibration verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Why 4-20mA */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Why 4-20mA Became the Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 4-20mA standard evolved as the optimal solution for industrial process control, combining excellent technical performance with practical implementation advantages.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Technical Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Noise Immunity:</strong> Current loops resist EMI better than voltage signals</li>
                <li><strong>Distance:</strong> Reliable transmission over 1000m+ without amplification</li>
                <li><strong>Two-Wire:</strong> Power and signal in same loop reduces wiring</li>
                <li><strong>Linear:</strong> Direct relationship between current and process value</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Industry Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Standardisation:</strong> Universal acceptance across manufacturers</li>
                <li><strong>Troubleshooting:</strong> Easy measurement with standard multimeter</li>
                <li><strong>Compatibility:</strong> Direct interface to PLCs and DCS systems</li>
                <li><strong>Training:</strong> Widely understood by technicians worldwide</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - 0-10V Standard */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            0-10V Voltage Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 0-10V voltage standard provides simple analogue signalling for local applications where simplicity and direct interfacing are more important than noise immunity or long-distance transmission.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Signal Scaling:</p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-white text-sm font-mono">Voltage (V) = (Process Value / Full Scale) × 10</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Implementation Considerations:</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Circuit Design</p>
                  <ul className="text-white space-y-1">
                    <li>High input impedance (&gt;10MΩ)</li>
                    <li>Low output impedance (&lt;100Ω)</li>
                    <li>Ground reference critical</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Cable Requirements</p>
                  <ul className="text-white space-y-1">
                    <li>Shielded twisted pair</li>
                    <li>Low capacitance cable</li>
                    <li>Max 50-100m distance</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium mb-1">Environment</p>
                  <ul className="text-white space-y-1">
                    <li>Clean electrical environment</li>
                    <li>Avoid high EMI areas</li>
                    <li>Temperature stable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advantages vs Limitations:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 mb-1">Advantages:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li>Simple interface to ADC inputs</li>
                    <li>High resolution available</li>
                    <li>Low cost implementation</li>
                    <li>Fast response time</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 mb-1">Limitations:</p>
                  <ul className="text-white space-y-1 ml-4">
                    <li>Noise susceptible</li>
                    <li>Distance limited</li>
                    <li>Ground loop problems</li>
                    <li>No fault detection (0V = zero or fault)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 - Pulse Signals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pulse Signals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pulse signals encode measurement data through frequency or pulse count, providing natural totalising capability and excellent noise immunity for applications like flow measurement and speed sensing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Flow Totalisation Example:</p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-white text-sm"><strong>Turbine Flow Meter with K-factor: 1000 pulses/litre</strong></p>
                <ul className="text-white text-sm mt-2 space-y-1">
                  <li>60Hz = 60 pulses/second</li>
                  <li>Flow rate = 60/1000 = 0.06 L/s = 3.6 L/min</li>
                  <li>1 hour at 60Hz = 216,000 pulses = 216 litres</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pulse Signal Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Square wave output (TTL/CMOS logic levels)</li>
                <li>Typical ranges: 0-1000 Hz or 0-10 kHz</li>
                <li>5V or 24V logic levels common</li>
                <li>Open collector output often used</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Excellent noise immunity:</strong> Digital nature resists interference</li>
                <li><strong>Natural totalising:</strong> Pulse counting provides running totals</li>
                <li><strong>High accuracy:</strong> Each pulse represents precise quantity</li>
                <li><strong>Long distance:</strong> Digital signals transmit reliably</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 - Troubleshooting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Troubleshooting Using Signal Behaviour
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding normal signal behaviour enables rapid fault diagnosis and system troubleshooting. Each standard has characteristic patterns that indicate specific problems.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/20 rounded">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-2 text-left text-elec-yellow/80 border-b border-white/20">Reading</th>
                    <th className="p-2 text-left border-b border-white/20">Indication</th>
                    <th className="p-2 text-left border-b border-white/20">Likely Cause</th>
                    <th className="p-2 text-left border-b border-white/20">Action Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-white/10">0mA</td>
                    <td className="p-2 border-b border-white/10 text-red-400">System Fault</td>
                    <td className="p-2 border-b border-white/10">Wire break, power loss, sensor failure</td>
                    <td className="p-2 border-b border-white/10">Check wiring, power supply, sensor</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-white/10">&lt;3.8mA</td>
                    <td className="p-2 border-b border-white/10 text-elec-yellow">Under-range</td>
                    <td className="p-2 border-b border-white/10">Sensor fault, calibration error</td>
                    <td className="p-2 border-b border-white/10">Calibrate sensor, check range</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-white/10">4-20mA</td>
                    <td className="p-2 border-b border-white/10 text-green-400">Normal</td>
                    <td className="p-2 border-b border-white/10">System operating correctly</td>
                    <td className="p-2 border-b border-white/10">No action required</td>
                  </tr>
                  <tr>
                    <td className="p-2">&gt;20.5mA</td>
                    <td className="p-2 text-elec-yellow">Over-range</td>
                    <td className="p-2">Process over-range, sensor fault</td>
                    <td className="p-2">Check process, verify calibration</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Signal Injection Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>4-20mA:</strong> Use calibrated current source at 4, 12, 20mA</li>
                <li><strong>0-10V:</strong> Use precision voltage source at 0, 5, 10V</li>
                <li><strong>Pulse:</strong> Use function generator at known frequency</li>
                <li>Verify system response at key points in the signal chain</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Selection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use 4-20mA for most industrial applications</li>
                <li>Use 0-10V only for local, clean environments</li>
                <li>Use pulse signals for flow totalisation and billing</li>
                <li>Consider 1-5V (4-20mA through 250Ω) for PLCs without current inputs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify signal type matches input module configuration</li>
                <li>Check scaling at 0%, 50%, and 100% points</li>
                <li>Confirm alarm setpoints for under/over-range conditions</li>
                <li>Document all calibration values for future reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Confusing 0mA with zero reading</strong> — 0mA always indicates a fault</li>
                <li><strong>Using 0-10V over long distances</strong> — causes signal degradation</li>
                <li><strong>Incorrect K-factor for pulse signals</strong> — causes totalisation errors</li>
                <li><strong>Not checking loop resistance</strong> — high resistance can cause under-range</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
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

export default InstrumentationModule3Section2;
