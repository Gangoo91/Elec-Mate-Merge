import { ArrowLeft, Zap, CheckCircle, HelpCircle, SignalHigh, Battery, Wrench, Settings, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule7Section1 = () => {
  useSEO({
    title: "What Is a 4-20mA Loop and Why It's Used | Instrumentation Module 7",
    description: "Learn the fundamentals of 4-20mA current loops, their advantages over voltage signals, typical components, and why they're the industry standard for analog signalling.",
    keywords: ["4-20mA loop", "current loop", "analog signalling", "live zero", "process instrumentation", "industrial control"]
  });

  return (
    <div className="bg-background text-foreground">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-7" className="inline-flex items-center text-white hover:text-elec-yellow transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Module 7</span>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/20 mb-4">
            <Zap className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            What Is a 4-20mA Loop and Why It's Used
          </h1>
          <p className="text-white">
            Module 7 · Section 1 · 15 min read
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            What You Will Learn
          </h2>
          <ul className="space-y-1 text-white">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              What a 4-20mA current loop is and its fundamental principles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Advantages of using current signals over voltage signals
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Common loop configurations and components
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              Signal integrity and noise resistance characteristics
            </li>
          </ul>
        </div>

        {/* Section 01 - Definition and Purpose */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Definition and Purpose of 4-20mA Loops</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              A 4-20mA current loop is an analogue signalling standard where process variables are represented by current levels between 4 and 20 milliamps. The current is directly proportional to the measured parameter value. This robust signalling method has been the backbone of industrial control systems for decades.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <SignalHigh className="h-5 w-5 text-blue-400" />
                  Signal Range Representation
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>4mA:</strong> Represents 0% of measurement range
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>20mA:</strong> Represents 100% of measurement range
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Linear Scale:</strong> Current proportional to measured value
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Live Zero:</strong> 4mA indicates functioning loop
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-400" />
                  Key Characteristics
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Analogue Signal:</strong> Continuous current representation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Two-Wire:</strong> Single pair for signal and power
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Industry Standard:</strong> Widely adopted globally
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Fault Detection:</strong> Below 4mA indicates failure
                  </li>
                </ul>
              </div>
            </div>

            {/* Example Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Example: Pressure Transmitter (0-100 PSI)</h3>
              <div className="grid gap-2 sm:grid-cols-4 text-white text-sm">
                <div className="bg-card/50 rounded p-2 text-center">
                  <span className="font-medium text-blue-400">0 PSI</span>
                  <p>4.0mA output</p>
                </div>
                <div className="bg-card/50 rounded p-2 text-center">
                  <span className="font-medium text-blue-400">50 PSI</span>
                  <p>12.0mA output</p>
                </div>
                <div className="bg-card/50 rounded p-2 text-center">
                  <span className="font-medium text-blue-400">100 PSI</span>
                  <p>20.0mA output</p>
                </div>
                <div className="bg-red-500/20 rounded p-2 text-center">
                  <span className="font-medium text-red-400">Fault</span>
                  <p>Below 4mA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What does 4mA represent in a 4-20mA current loop and why is it called 'live zero'?"
          answer="4mA represents 0% of the measurement range (minimum value). It's called 'live zero' because the presence of 4mA proves the loop is functioning correctly - if current drops below 4mA (including 0mA), this indicates a fault such as a broken wire, failed transmitter, or power loss."
        />

        {/* Section 02 - Signal Integrity */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Signal Integrity and Noise Resistance</h2>
          </div>

          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              One of the primary reasons for using current signals is their excellent noise immunity and ability to transmit accurately over long distances in electrically noisy industrial environments.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Current Loop Advantages
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Noise Immunity:</strong> Current unaffected by cable resistance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Long Distance:</strong> Minimal signal degradation over distance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Simple Wiring:</strong> Two-wire configuration reduces complexity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Ground Independence:</strong> No common ground reference needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Power Efficiency:</strong> Low power consumption in loop
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-red-400" />
                  Voltage Signal Disadvantages
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Voltage Drop:</strong> Cable resistance affects signal accuracy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Noise Susceptible:</strong> Electromagnetic interference issues
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Ground Loops:</strong> Common mode voltage problems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>Distance Limited:</strong> Signal degradation over long runs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <strong>More Wiring:</strong> Separate signal and power conductors
                  </li>
                </ul>
              </div>
            </div>

            {/* EMC Box */}
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3">Electromagnetic Compatibility (EMC)</h3>
              <p className="text-white text-sm mb-3">
                Current loops provide excellent electromagnetic compatibility in industrial environments:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2 text-white text-sm">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Low Impedance:</strong> Current loops present low impedance to noise</span>
                </div>
                <div className="flex items-start gap-2 text-white text-sm">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Twisted Pair:</strong> Differential signal cancels common mode noise</span>
                </div>
                <div className="flex items-start gap-2 text-white text-sm">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Shielding:</strong> Cable shields can be effectively grounded</span>
                </div>
                <div className="flex items-start gap-2 text-white text-sm">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Isolation:</strong> Galvanic isolation prevents ground loops</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03 - Loop Configurations */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Common Loop Configurations</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                Basic Two-Wire Loop
              </h3>
              <p className="text-white text-sm mb-3">
                The most common configuration using two conductors for both power and signal.
              </p>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Transmitter:</strong> Loop-powered device generates 4-20mA
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Receiver:</strong> Input card or indicator measures current
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Power Supply:</strong> Provides loop excitation voltage (typically 24VDC)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <strong>Series Circuit:</strong> All components in series path
                </li>
              </ul>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-green-400" />
                Multi-Drop Configuration
              </h3>
              <p className="text-white text-sm mb-3">
                Multiple receivers can monitor the same 4-20mA signal in parallel.
              </p>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Parallel Connection:</strong> Receivers connected in parallel
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>High Impedance:</strong> Input cards must be high impedance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Isolation:</strong> Receivers should be isolated
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <strong>Load Calculation:</strong> Total loop resistance must be managed
                </li>
              </ul>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-purple-400" />
                Isolated Loop Systems
              </h3>
              <p className="text-white text-sm mb-3">
                Galvanically isolated loops prevent ground loops and electrical interference.
              </p>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Signal Isolation:</strong> No electrical connection between loops
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Power Isolation:</strong> Isolated power supplies for each loop
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Safety:</strong> Personnel protection from electrical hazards
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Noise Elimination:</strong> Prevents ground loop currents
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why is current signalling better than voltage signalling over long cable runs?"
          answer="Current remains constant regardless of cable resistance (within limits) because the transmitter maintains a constant current flow. Voltage signals suffer from voltage drop due to cable resistance, causing measurement errors. A 300m cable run might drop several volts, but the current stays the same throughout the loop."
        />

        {/* Section 04 - Devices in a Loop */}
        <section className="mb-10 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Devices in a Loop: Transmitter, Receiver, Power Supply</h2>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Battery className="h-5 w-5 text-blue-400" />
                  Transmitters
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Function:</strong> Convert physical parameter to 4-20mA
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Types:</strong> Pressure, temperature, flow, level
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Power:</strong> Loop-powered or externally powered
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <strong>Accuracy:</strong> Typically ±0.1% to ±0.5% FS
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-400" />
                  Receivers
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Function:</strong> Measure loop current
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Types:</strong> Analog input cards, indicators
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Impedance:</strong> High input impedance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <strong>Resolution:</strong> 12-bit to 16-bit ADC
                  </li>
                </ul>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                  Power Supplies
                </h3>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Voltage:</strong> Typically 24VDC nominal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Current:</strong> Minimum 25mA capability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Regulation:</strong> Good voltage regulation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <strong>Protection:</strong> Short circuit protected
                  </li>
                </ul>
              </div>
            </div>

            {/* Loop Resistance Calculation */}
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h3 className="font-semibold text-elec-yellow mb-2">Loop Resistance Calculation</h3>
              <p className="text-white text-sm mb-3">
                Maximum loop resistance = (Supply Voltage - Transmitter Voltage Drop) / 0.02A
              </p>
              <div className="bg-card/50 rounded p-3 border border-border">
                <p className="text-white text-sm"><strong>Example:</strong></p>
                <ul className="text-white text-sm space-y-1 mt-2">
                  <li>Supply: 24V, Transmitter drop: 10V</li>
                  <li>Maximum loop resistance: (24V - 10V) / 0.02A = 700 ohms</li>
                  <li>Cable resistance: 2 x length x resistance per metre</li>
                  <li><strong>Design margin:</strong> Use 75% of maximum calculated value</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="How do you calculate the maximum allowable loop resistance?"
          answer="Maximum loop resistance = (Supply Voltage - Transmitter Voltage Drop) / 20mA. For example, with a 24V supply and 10V transmitter drop: (24 - 10) / 0.02 = 700 ohms maximum. Always design with a safety margin (75% of maximum) to account for cable ageing and connection resistance."
        />

        {/* Real World Scenario */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4 mb-10 mt-10">
          <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Real World Scenario: Chemical Plant Pressure Transmitter
          </h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            A technician is installing a pressure transmitter in a chemical plant to monitor reactor vessel pressure. The transmitter must be located 300 metres from the control room due to safety requirements and potential hazardous atmosphere.
          </p>
          <div className="bg-card/50 rounded-lg p-3 border border-border mb-3">
            <h4 className="font-medium text-elec-yellow text-sm mb-2">Installation Challenges:</h4>
            <ul className="text-white text-sm space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Long cable run through multiple electrical conduits
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                High electromagnetic interference from nearby motors
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Temperature variations from -10°C to +60°C
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                Requirement for hazardous area certification
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20 mb-3">
            <h4 className="font-medium text-green-400 text-sm mb-2">Why 4-20mA Loop is Ideal:</h4>
            <ul className="text-white text-sm space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Current signal unaffected by 300m cable voltage drop
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Excellent noise immunity against motor interference
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Two-wire installation reduces cable costs and complexity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                4mA live zero provides immediate fault detection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                Loop-powered transmitter simplifies hazardous area wiring
              </li>
            </ul>
          </div>
          <p className="text-green-400 text-sm italic">
            Result: Reliable, accurate pressure monitoring with minimal installation complexity and excellent long-term stability in challenging industrial environment.
          </p>
        </div>

        {/* FAQs Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">Why not start at 0mA instead of 4mA?</h3>
              <p className="text-white text-sm">
                Starting at 4mA (live zero) provides crucial fault detection. If a wire breaks or transmitter fails, current drops to 0mA - clearly distinguishable from a valid 0% reading (4mA). This safety feature is essential in industrial control systems where failures must be immediately detectable.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">Can I use the same power supply for multiple loops?</h3>
              <p className="text-white text-sm">
                Yes, but each loop must be electrically isolated to prevent ground loops and cross-talk. Many industrial power supplies provide multiple isolated outputs. Calculate total current draw to ensure the supply capacity is adequate for all connected loops.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">What happens if loop current exceeds 20mA?</h3>
              <p className="text-white text-sm">
                Transmitters typically limit output to around 22-24mA (saturation level) even if the process variable exceeds range. Most receivers detect over-range conditions and flag them as alarms. Some systems use the 21-24mA range for diagnostic information (NAMUR recommendations).
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-white mb-2">How do I convert mA reading to engineering units?</h3>
              <p className="text-white text-sm">
                Use the formula: Value = ((mA - 4) / 16) x Range + Offset. For a 0-100 PSI range: At 12mA, Value = ((12 - 4) / 16) x 100 = 50 PSI. This linear relationship makes scaling straightforward in control systems.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question="Why is 4mA used as the 'live zero' in a 4-20mA loop?"
            options={[
              "It saves power consumption in the transmitter",
              "It provides fault detection - any current below 4mA indicates a loop fault or transmitter failure",
              "It makes the signal stronger and easier to measure",
              "It is required by electrical safety regulations"
            ]}
            correctAnswer={1}
            explanation="4mA serves as 'live zero' because it provides fault detection capability. Any current below 4mA (including 0mA) indicates a broken wire, failed transmitter, or power loss. This allows operators to distinguish between a genuine 0% measurement reading (4mA) and a fault condition (below 4mA)."
          />
        </section>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
          <div className="w-full sm:w-auto">
            {/* Empty div for spacing */}
          </div>
          <Link to="/electrician/upskilling/instrumentation-module-7-section-2" className="w-full sm:w-auto">
            <Button className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule7Section1;
