import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule2Section1QuizData } from "@/data/upskilling/bmsModule2Section1QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "digital-input-example",
    question: "Give one example of a digital input in a BMS.",
    options: [
      "Temperature sensor reading 22°C",
      "Variable fan speed control at 60%",
      "Door contact sensor showing open/closed",
      "Humidity sensor at 45% RH"
    ],
    correctIndex: 2,
    explanation: "Door contact sensors are digital inputs as they provide only two states - open or closed. Temperature and humidity sensors provide variable analog readings."
  },
  {
    id: "digital-output",
    question: "What type of BMS output would switch a fan on or off?",
    options: [
      "Analog output providing variable speed",
      "Digital output providing on/off control",
      "Pulse width modulated signal",
      "Variable frequency drive output"
    ],
    correctIndex: 1,
    explanation: "A digital output provides on/off control for switching a fan. For variable speed control, you would need an analog output to a variable frequency drive."
  },
  {
    id: "analog-signal-range",
    question: "What signal range might a temperature sensor send to a BMS?",
    options: [
      "230V AC mains voltage",
      "0-10V DC or 4-20mA signal",
      "High frequency digital pulses",
      "24V AC on/off switching"
    ],
    correctIndex: 1,
    explanation: "Temperature sensors typically send analog signals in the range of 0-10V DC or 4-20mA to represent variable temperature readings. These are standard analog signal ranges for BMS applications."
  },
  {
    id: "analog-output-device",
    question: "What kind of device would an analog output control that requires variable positioning?",
    options: [
      "A simple on/off relay for lighting",
      "A motorised valve actuator that can be positioned anywhere from 0-100% open",
      "An alarm beacon with fixed brightness",
      "A door contact sensor for monitoring"
    ],
    correctIndex: 1,
    explanation: "Motorised valve actuators require analog outputs because they need precise positioning control (e.g., 40% open, 75% open). This variable control allows for accurate flow regulation and energy efficiency."
  }
];

const faqs = [
  {
    question: "How do I know if a signal is digital or analog?",
    answer: "Digital signals have only two states (on/off, open/closed), while analog signals vary continuously across a range (e.g., 0-10V, 4-20mA). Check the device datasheet - it will specify the signal type and range."
  },
  {
    question: "Why is 4-20mA preferred over 0-10V for long cable runs?",
    answer: "Current signals (4-20mA) have better noise immunity than voltage signals because they're less affected by cable resistance and electromagnetic interference. Additionally, a reading below 4mA indicates a fault, making it self-diagnosing."
  },
  {
    question: "What happens if I wire an analog device to a digital input?",
    answer: "The BMS will only see on/off states instead of variable readings. For example, a temperature sensor would show as 'triggered' or 'not triggered' rather than displaying actual temperature values, leading to incorrect control."
  },
  {
    question: "How should I terminate screened cables for analog signals?",
    answer: "Terminate the screen at one end only (usually the BMS controller end) to prevent ground loops. Use a single star earth point for all analog signal screens to minimise noise pickup."
  }
];

const BMSModule2Section1 = () => {
  useSEO({
    title: "Digital vs Analog Inputs and Outputs | BMS Course",
    description: "Learn the differences between digital and analog signals in Building Management Systems. Understand DI, DO, AI, AO signal types for proper BMS installation."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bms-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Digital vs Analog Inputs and Outputs
          </h1>
          <p className="text-white">
            Signal types and processing methods
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Digital:</strong> On/off, open/closed — binary states only</li>
              <li><strong>Analog:</strong> Variable values — 0-10V, 4-20mA signals</li>
              <li><strong>Critical:</strong> Correct wiring prevents system failures</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">On Site</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>DI:</strong> Door contacts, flow switches, alarm contacts</li>
              <li><strong>DO:</strong> Fan switching, lighting relays, pump control</li>
              <li><strong>AI/AO:</strong> Temperature, humidity, valve positioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the difference between digital and analog signals",
              "Identify examples of digital inputs/outputs in a BMS",
              "Identify examples of analog inputs/outputs in a BMS",
              "Understand how signal types affect installation and testing"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Digital Inputs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Digital Inputs (DI)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital inputs represent two states: <strong>on/off</strong>, <strong>open/closed</strong>, <strong>true/false</strong>.
              These binary signals are the foundation of BMS monitoring, providing essential status information about building systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Examples</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Door contact sensors</strong> — open/closed status</li>
                <li><strong>Flow switches</strong> — water flow/no flow</li>
                <li><strong>Alarm contacts</strong> — triggered/not triggered</li>
                <li><strong>Pressure switches</strong> — high/low pressure</li>
                <li><strong>Filter status switches</strong> — clean/dirty indication</li>
                <li><strong>Smoke detector contacts</strong> — normal/alarm state</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Wiring and Installation</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Voltage:</strong> Typically 24V DC/AC, some systems 12V or 48V</li>
                <li><strong>Terminals:</strong> Dedicated DI terminals numbered sequentially (DI1, DI2, etc.)</li>
                <li><strong>Contact types:</strong> Normally open (NO), normally closed (NC), or changeover</li>
                <li><strong>Polarity:</strong> Always check manufacturer specifications</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Processing</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Debouncing:</strong> Eliminates contact bounce, prevents false triggers</li>
                  <li><strong>Isolation:</strong> Optical isolation protects from voltage spikes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>SELV:</strong> Under 50V AC/120V DC classification</li>
                  <li><strong>Separation:</strong> Minimum 3mm from mains circuits</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Troubleshooting Issues</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Contact bounce:</strong> Multiple rapid on/off readings — check debouncing settings</li>
                <li><strong>Voltage drop:</strong> Intermittent readings — check cable length and wire gauge</li>
                <li><strong>False triggers:</strong> Unwanted switching — check for EMI, use screened cables</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Digital Outputs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Digital Outputs (DO)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital outputs control devices in binary form: <strong>on/off</strong> switching only.
              They provide the interface between BMS logic and building equipment, enabling automated control of systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Examples</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Switching a fan on or off</strong></li>
                <li><strong>Operating lighting relays</strong></li>
                <li><strong>Triggering alarms or status indicators</strong></li>
                <li><strong>Starting/stopping pumps</strong></li>
                <li><strong>Motorised damper open/closed control</strong></li>
                <li><strong>Boiler/chiller enable signals</strong></li>
                <li><strong>Access control door locks</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50 my-6">
              <p className="text-red-400/90 text-sm font-medium mb-2">Load Switching and Protection</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Relay sizing:</strong> Coil voltage typically 24V DC, 10-50mA</li>
                <li><strong>Contact ratings:</strong> Ensure contacts can handle switched load</li>
                <li><strong>Inrush current:</strong> Factor in for motors, transformers, fluorescent lighting</li>
                <li><strong>Arc suppression:</strong> Use snubber circuits for inductive loads</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Interlocking</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Interlocks:</strong> Prevent unsafe combinations (e.g., heating + cooling)</li>
                  <li><strong>Sequencing:</strong> Time delays prevent excessive electrical demand</li>
                  <li><strong>Fail-safe:</strong> Define default states during power loss</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Compatibility</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>24V systems:</strong> Most common, SELV classification</li>
                  <li><strong>48V systems:</strong> Larger installations, higher power</li>
                  <li><strong>230V switching:</strong> Via contactors/relays only, never direct</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Analog Inputs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Analog Inputs (AI)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Analog inputs provide <strong>variable data</strong> to the BMS, representing continuous measurements.
              These signals enable precise monitoring and control of building environmental conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Examples</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature sensors</strong> — 0–50°C</li>
                <li><strong>Humidity sensors</strong> — 0–100% RH</li>
                <li><strong>CO2 concentration</strong> — 0-2000 ppm</li>
                <li><strong>Pressure transmitters</strong> — 0-10 bar</li>
                <li><strong>Light level sensors</strong> — 0-1000 lux</li>
                <li><strong>Air velocity sensors</strong> — 0-30 m/s</li>
                <li><strong>Power meters</strong> — kW, kVA, power factor</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Signals</p>
                <ul className="text-sm text-white space-y-1">
                  <li>0–10V DC (most common)</li>
                  <li>0–5V DC</li>
                  <li>2–10V DC</li>
                  <li>±10V (bipolar signals)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Signals</p>
                <ul className="text-sm text-white space-y-1">
                  <li>4–20mA (industry standard)</li>
                  <li>0–20mA</li>
                  <li>Better noise immunity than voltage</li>
                  <li>Self-diagnosing (below 4mA = fault)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Conditioning</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Amplification</p>
                  <p className="text-white text-xs">Boost weak signals</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Filtering</p>
                  <p className="text-white text-xs">Remove noise</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Linearisation</p>
                  <p className="text-white text-xs">Convert curves</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Calibration</p>
                  <p className="text-white text-xs">Zero and span</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-elec-yellow/90 text-sm font-medium mb-2">Wiring Best Practices</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Screened cables:</strong> Use individually screened pairs for each analog signal</li>
                <li><strong>Screen termination:</strong> One end only to prevent ground loops</li>
                <li><strong>Cable separation:</strong> Minimum 300mm from power cables, cross at 90°</li>
                <li><strong>EMC:</strong> Twisted pair construction, avoid running parallel to fluorescents</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Analog Outputs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Analog Outputs (AO)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Analog outputs allow the BMS to control devices with <strong>variable outputs</strong>, providing smooth,
              continuous control instead of binary switching. They form the control interface for precise equipment modulation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Examples</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Variable frequency drives</strong> — controlling fan/pump speed 0-100%</li>
                <li><strong>Motorised valve actuators</strong> — adjusting to 40% open</li>
                <li><strong>Lighting dimming systems</strong> — 10–100% brightness</li>
                <li><strong>Damper actuators</strong> — precise airflow control</li>
                <li><strong>Electric heating elements</strong> — modulated power control</li>
                <li><strong>Cooling coil valves</strong> — chilled water flow control</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-elec-yellow/5 border border-elec-yellow/20 my-6">
              <p className="text-sm text-white">
                <strong>Energy efficiency:</strong> Analog outputs enable precise control — a fan can run at 60% speed when only
                partial cooling is needed, rather than just on/off operation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Algorithms</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>PID Control:</strong> Proportional, Integral, Derivative</li>
                  <li><strong>Modulation:</strong> PWM for efficient power control</li>
                  <li><strong>Response tuning:</strong> Adjust to prevent oscillation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drive Capabilities</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Voltage output:</strong> 0-10V up to 10mA</li>
                  <li><strong>Current output:</strong> 4-20mA up to 500Ω load</li>
                  <li><strong>Resolution:</strong> 12-bit to 16-bit typical</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuator Integration</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Position feedback:</strong> 0-10V or 4-20mA to verify actual position matches command</li>
                <li><strong>Accuracy:</strong> ±1% typical for quality actuators, ±2-3% for less critical</li>
                <li><strong>Response time:</strong> 60-180 seconds full travel typical for HVAC applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Tests</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Signal verification:</strong> Check at 0%, 25%, 50%, 75%, 100% setpoints</li>
                <li><strong>Loop tuning:</strong> Start P-only, add I, then D if needed</li>
                <li><strong>Step response:</strong> Verify settling time and overshoot</li>
                <li><strong>Load testing:</strong> Test under actual operating conditions</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Practical Guidance Section */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always confirm whether a point is digital or analog before wiring</li>
                <li>Label terminations clearly (DI, DO, AI, AO) to avoid confusion during commissioning</li>
                <li>Be careful with analog wiring — poor connections cause inaccurate readings</li>
                <li>Use a multimeter to check 0–10V or 4–20mA signals when commissioning</li>
                <li>Follow cable segregation — keep analog signals away from mains power cables</li>
                <li>Use screened cables for analog signals in electrically noisy environments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong terminal type:</strong> — analog device wired to digital input gives on/off instead of variable reading</li>
                <li><strong>Poor terminations:</strong> — loose connections cause intermittent or incorrect readings</li>
                <li><strong>Missing screens:</strong> — unscreened analog cables pick up electrical noise</li>
                <li><strong>Wrong polarity:</strong> — reversed connections can damage sensors or give negative readings</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Example: The Temperature Sensor Mistake
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              On a commercial project, an electrician wired a temperature sensor (analog input) into a
              digital input terminal by mistake. The BMS only read the signal as "on/off" instead of
              a variable temperature, leading to incorrect HVAC control.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">The Problem</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Heating ran at full blast or turned off completely</li>
                  <li>No intermediate control based on actual temperature</li>
                  <li>Uncomfortable conditions for building occupants</li>
                  <li>Significant energy waste</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resolution</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Temperature sensor rewired to correct analog input terminal</li>
                  <li>BMS reconfigured to read variable temperature</li>
                  <li>System restored to proper operation</li>
                  <li>Commissioning delays and client frustration</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm text-white">
                <strong>Key Lesson:</strong> Always verify whether a device requires digital or analog connection
                before wiring. A few minutes checking the datasheet prevents hours of troubleshooting later.
              </p>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Digital Signals</p>
              <ul className="space-y-0.5">
                <li>DI: Door contacts, flow switches, alarm contacts</li>
                <li>DO: Fan switching, lighting relays, pump control</li>
                <li>Binary only: on/off, open/closed</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Analog Signals</p>
              <ul className="space-y-0.5">
                <li>AI: Temperature, humidity, CO2, pressure sensors</li>
                <li>AO: VFDs, valve actuators, dimming systems</li>
                <li>Common ranges: 0-10V DC, 4-20mA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-2">
            {[
              "Digital signals = on/off, open/closed states only",
              "Analog signals = variable values (e.g., 0–10V, 4–20mA)",
              "Digital inputs/outputs control binary states; analog inputs/outputs provide or adjust continuous values",
              "Correct wiring and labelling are critical to avoid faults and system failures",
              "Always verify signal type before termination to prevent commissioning delays"
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            questions={bmsModule2Section1QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bms-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-2-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule2Section1;
