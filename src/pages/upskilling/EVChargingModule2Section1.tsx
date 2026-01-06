import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m2s1-check1",
    question: "Which charging mode is prohibited in the UK?",
    options: ["Mode 1", "Mode 2", "Mode 3", "Mode 4"],
    correctIndex: 0,
    explanation: "Mode 1 charging (direct connection to standard AC mains without additional protection) is prohibited in the UK due to safety concerns. It lacks essential safety features including earth fault detection during charging."
  },
  {
    id: "evcharging-m2s1-check2",
    question: "What is the maximum power for a single-phase Mode 3 charger at 32A?",
    options: ["3.7kW", "7.4kW", "11kW", "22kW"],
    correctIndex: 1,
    explanation: "At 230V single-phase and 32A, the maximum power is 7.4kW (230V × 32A = 7.36kW). This is the typical power level for domestic wallbox installations."
  },
  {
    id: "evcharging-m2s1-check3",
    question: "What does the Control Pilot (CP) signal communicate?",
    options: ["Vehicle speed", "Maximum available current via PWM duty cycle", "Battery temperature", "Charging cost"],
    correctIndex: 1,
    explanation: "The Control Pilot signal uses PWM (Pulse Width Modulation) to communicate the maximum available charging current from the EVSE to the vehicle. Different duty cycles correspond to specific current limits."
  }
];

const faqs = [
  {
    question: "Why is Mode 1 prohibited in the UK?",
    answer: "Mode 1 lacks essential safety features required for EV charging. It has no control pilot communication, no earth fault detection during charging, and relies only on basic household protection. IET Code of Practice and BS 7671 require additional safety measures that Mode 1 cannot provide."
  },
  {
    question: "When should I use Mode 2 vs Mode 3?",
    answer: "Mode 2 (portable EVSE) is for temporary or emergency charging - ideal for travel, rental properties, or backup. Mode 3 (dedicated wallbox) is the standard for permanent installations at home or work, offering faster charging, smart features, and full safety systems."
  },
  {
    question: "What determines charging speed during DC rapid charging?",
    answer: "Mode 4 DC charging speed is determined by the charger's output capability, the vehicle's onboard charging system limits, battery state of charge (SOC), and battery temperature. Most vehicles accept maximum power up to about 80% SOC, then taper significantly."
  },
  {
    question: "What is the CP signal voltage for 'vehicle ready to charge'?",
    answer: "State C (+6V) indicates the vehicle is connected and ready for charging. State A (+12V) means no vehicle connected, State B (+9V) means connected but not ready, and State E (0V) indicates an error condition."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A customer wants the fastest home charging possible from a single-phase supply. What should you recommend?",
  options: [
    "Mode 2 portable charger at 13A",
    "Mode 3 wallbox at 32A (7.4kW)",
    "Mode 4 DC charger at 50kW",
    "Mode 3 wallbox at 63A (14.5kW)"
  ],
  correctAnswer: 1,
  explanation: "A Mode 3 wallbox at 32A provides 7.4kW - the maximum for single-phase domestic supply. Mode 2 is slower (2.3kW at 10A). Mode 4 DC requires commercial infrastructure. 63A single-phase isn't available domestically."
  }
];

const EVChargingModule2Section1 = () => {
  useSEO({
    title: "Mode 1-4 and Charging Speeds | EV Charging Module 2.1",
    description: "Understand the four EV charging modes defined in IEC 61851-1, their power levels, safety features, and appropriate applications."
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
            <Link to="../ev-charging-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mode 1–4 and Charging Speeds
          </h1>
          <p className="text-white/80">
            Charging modes and power levels per IEC 61851-1
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Mode 1:</strong> Prohibited in UK (no safety features)</li>
              <li><strong>Mode 2:</strong> Portable EVSE (2.3-7.4kW)</li>
              <li><strong>Mode 3:</strong> Dedicated AC (3.7-43kW)</li>
              <li><strong>Mode 4:</strong> DC rapid (50-350kW+)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> CP/PP signals, tethered vs socketed</li>
              <li><strong>Use:</strong> Mode 3 for most installations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand four charging modes per IEC 61851-1",
              "Identify appropriate charging speeds for applications",
              "Recognise safety features for each mode",
              "Apply knowledge to select charging solutions",
              "Understand Control Pilot communication",
              "Calculate power levels for different configurations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Mode 1 and Mode 2
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 61851-1 defines four charging modes with increasing levels of safety
              and control. Understanding these modes is fundamental for EV installers.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded border border-red-500/30 bg-red-500/5">
                <p className="text-sm font-medium text-red-400 mb-2">Mode 1 - Prohibited in UK</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Direct AC connection (230V, 16A max)</li>
                  <li>No vehicle-supply communication</li>
                  <li>Basic RCD/MCB protection only</li>
                  <li>Maximum 3.7kW single-phase</li>
                  <li className="text-red-400">Lacks essential safety features</li>
                </ul>
              </div>
              <div className="p-4 rounded border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Mode 2 - Portable EVSE</p>
                <ul className="text-sm text-white space-y-1">
                  <li>In-Cable Control and Protection Device</li>
                  <li>Built-in RCD (Type A or B)</li>
                  <li>Control Pilot communication</li>
                  <li>2.3kW (10A) to 7.4kW typical</li>
                  <li>Temporary/emergency use</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-white">
                <strong className="text-red-400">UK Regulation:</strong> Mode 1 is prohibited due to
                safety concerns. IET Code of Practice and BS 7671 require additional safety measures
                including earth fault detection and communication systems that Mode 1 cannot provide.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mode 3 - Dedicated EVSE
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mode 3 is the standard for permanent EV charging installations, providing
              dedicated equipment with advanced control and safety systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mode 3 Characteristics</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dedicated EVSE permanently connected to AC supply</li>
                <li>Control Pilot (CP) and Proximity Pilot (PP) signals</li>
                <li>Integrated protection and control systems</li>
                <li>Smart charging capabilities available</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow mb-1">Single Phase</p>
                <p className="text-white/90 text-xs">230V AC</p>
                <p className="text-white text-xs">16A: 3.7kW</p>
                <p className="text-white text-xs">32A: 7.4kW</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow mb-1">Three Phase</p>
                <p className="text-white/90 text-xs">400V AC</p>
                <p className="text-white text-xs">16A: 11kW</p>
                <p className="text-white text-xs">32A: 22kW</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-elec-yellow mb-1">High Power</p>
                <p className="text-white/90 text-xs">400V AC</p>
                <p className="text-white text-xs">63A: 43kW</p>
                <p className="text-white text-xs">(Commercial)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mode 4 - DC Fast Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mode 4 provides direct DC supply to the vehicle battery, enabling rapid
              charging at power levels from 50kW to 350kW+.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li>External DC converter in EVSE</li>
                  <li>Direct DC to vehicle battery</li>
                  <li>CAN bus digital communication</li>
                  <li>Real-time BMS integration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>CCS:</strong> Type 2 + DC pins, up to 350kW</li>
                  <li><strong>CHAdeMO:</strong> Separate connector, up to 100kW</li>
                  <li><strong>Tesla:</strong> Proprietary, up to 250kW</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Charging Times (50kWh battery, 20-80%):</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                <div className="p-2 bg-white/5 rounded text-center">
                  <span className="text-white/70">50kW</span>
                  <p className="text-elec-yellow font-medium">~35 min</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <span className="text-white/70">100kW</span>
                  <p className="text-elec-yellow font-medium">~18 min</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <span className="text-white/70">150kW</span>
                  <p className="text-elec-yellow font-medium">~12 min</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <span className="text-white/70">350kW</span>
                  <p className="text-elec-yellow font-medium">~5 min</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Pilot Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Control Pilot (CP) signal is fundamental to Mode 2 and Mode 3 charging,
              enabling safe communication between EVSE and vehicle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">CP Signal States (IEC 61851-1):</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-elec-yellow font-medium">State A</p>
                  <p className="text-white">+12V</p>
                  <p className="text-white/70">Not connected</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-elec-yellow font-medium">State B</p>
                  <p className="text-white">+9V</p>
                  <p className="text-white/70">Connected, no charge</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-elec-yellow font-medium">State C</p>
                  <p className="text-white">+6V</p>
                  <p className="text-white/70">Ready to charge</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-elec-yellow font-medium">State D</p>
                  <p className="text-white">+3V</p>
                  <p className="text-white/70">Ventilation req'd</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-elec-yellow font-medium">State E</p>
                  <p className="text-white">0V</p>
                  <p className="text-white/70">Error</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PWM Duty Cycle Current Encoding</p>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="p-2 bg-white/5 rounded">10% → 6A</div>
                <div className="p-2 bg-white/5 rounded">30% → 12A</div>
                <div className="p-2 bg-white/5 rounded">50% → 20A</div>
                <div className="p-2 bg-white/5 rounded">70% → 32A</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proximity Pilot (PP) - Cable Rating</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>480Ω: 32A cable</li>
                <li>220Ω: 20A cable</li>
                <li>680Ω: 16A cable</li>
                <li>1.5kΩ: 10A cable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Mode Selection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mode 2:</strong> Temporary, travel, emergency backup only</li>
                <li><strong>Mode 3:</strong> Standard for all permanent installations</li>
                <li><strong>Mode 4:</strong> Commercial rapid charging infrastructure</li>
                <li>Always match mode to application requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mode 2 as permanent:</strong> — Only for temporary use</li>
                <li><strong>Ignoring supply limits:</strong> — Check available capacity first</li>
                <li><strong>Wrong RCD type:</strong> — Mode 3 requires Type A minimum, Type B preferred</li>
                <li><strong>No O-PEN protection:</strong> — Required for TN-C-S supplies</li>
              </ul>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Power Levels</p>
              <ul className="space-y-0.5">
                <li>Mode 2: 2.3-7.4kW</li>
                <li>Mode 3 1φ: 3.7-7.4kW</li>
                <li>Mode 3 3φ: 11-43kW</li>
                <li>Mode 4: 50-350kW+</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">CP Signal States</p>
              <ul className="space-y-0.5">
                <li>+12V: Not connected</li>
                <li>+9V: Connected, no charge</li>
                <li>+6V: Ready to charge</li>
                <li>0V: Error</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
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
            <Link to="../ev-charging-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-2-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule2Section1;