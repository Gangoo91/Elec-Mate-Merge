import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m2s4-check1",
    question: "What is the main difference between Type 1 and Type 2 AC connectors?",
    options: ["Type 1 is faster", "Type 2 supports three-phase charging", "Type 1 is used in Europe", "Type 2 is only for DC charging"],
    correctIndex: 1,
    explanation: "Type 2 (Mennekes) connectors have 7 pins supporting three-phase AC charging up to 43kW, while Type 1 (SAE J1772) has 5 pins and only supports single-phase AC up to 19.2kW."
  },
  {
    id: "evcharging-m2s4-check2",
    question: "What does CCS stand for and what makes it unique?",
    options: ["Combined Charging System - combines AC and DC in one connector", "Continuous Charging Standard - maintains constant power", "Commercial Charging Solution - for business use only", "Controlled Charging Sequence - manages charging stages"],
    correctIndex: 0,
    explanation: "Combined Charging System (CCS) adds DC charging pins to the existing Type 1 or Type 2 AC connector, allowing a single vehicle inlet to support both AC and DC charging without separate ports."
  },
  {
    id: "evcharging-m2s4-check3",
    question: "What PWM duty cycle on the Control Pilot signal indicates 32A available current?",
    options: ["10%", "25%", "50%", "90%"],
    correctIndex: 2,
    explanation: "The Control Pilot PWM duty cycle directly correlates to available current: 10% = 6A, 25% ≈ 15A, 50% = 32A, and 90% = 57A (or digital communication enabled above 85%)."
  }
];

const faqs = [
  {
    question: "Why does Europe use a different connector than North America?",
    answer: "Europe standardised on Type 2 (Mennekes) because of the prevalence of three-phase electrical supplies, which Type 2 supports natively. North America primarily uses single-phase 240V, so Type 1 was sufficient for domestic needs."
  },
  {
    question: "Is CHAdeMO becoming obsolete?",
    answer: "CHAdeMO is declining in new vehicles as CCS becomes the global standard. However, it remains important for V2G/V2H applications due to its mature bidirectional capabilities, and many existing vehicles still use it."
  },
  {
    question: "What is Plug & Charge and how does it work?",
    answer: "Plug & Charge (ISO 15118) enables automatic authentication when you plug in - no app, card, or PIN needed. The vehicle and charger exchange encrypted certificates to verify identity and billing information automatically."
  },
  {
    question: "Will there be a single global EV charging standard?",
    answer: "CCS is emerging as the dominant global standard, with Tesla adopting CCS in Europe and opening Superchargers to other brands. However, regional variations (CCS1 vs CCS2) and legacy systems mean multiple standards will coexist for years."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A customer's new EV has a CCS2 inlet. Which charging options are compatible?",
  options: [
    "CCS2 DC rapid charging only",
    "Type 2 AC and CCS2 DC charging",
    "CHAdeMO DC with an adapter",
    "Any European charger"
  ],
  correctAnswer: 1,
  explanation: "CCS2 is a Combined Charging System that incorporates the Type 2 AC connector with additional DC pins. Vehicles with CCS2 inlets can charge from both Type 2 AC chargers (using the upper portion) and CCS2 DC rapid chargers (using the full connector)."
  }
];

const EVChargingModule2Section4 = () => {
  useSEO({
    title: "IEC 61851, 62196 Connectors | EV Charging Module 2.4",
    description: "Understand international EV charging standards including IEC 61851, IEC 62196 connector types, CCS, CHAdeMO, and communication protocols."
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            IEC 61851, 62196 Connectors
          </h1>
          <p className="text-white/80">
            International charging standards and connector types
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IEC 61851:</strong> Defines charging modes and safety</li>
              <li><strong>IEC 62196:</strong> Specifies connector types (Type 1/2)</li>
              <li><strong>CCS:</strong> Combined AC + DC in one connector</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Type 2 = 7 pins, CCS = extra DC pins below</li>
              <li><strong>Use:</strong> UK/EU = Type 2 AC, CCS2 DC</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand IEC 61851 standard structure",
              "Identify Type 1, Type 2, CCS, and CHAdeMO connectors",
              "Explain Control Pilot signalling",
              "Match connectors to vehicle requirements",
              "Verify connector installation and testing",
              "Plan for future charging standards"
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
            IEC 61851 Standard
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 61851 defines requirements for conductive charging systems, ensuring safety,
              interoperability, and performance across all EV charging infrastructure globally.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Structure</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IEC 61851-1:</strong> General requirements and safety specifications</li>
                <li><strong>IEC 61851-21:</strong> AC charging station requirements</li>
                <li><strong>IEC 61851-22:</strong> AC connector specifications</li>
                <li><strong>IEC 61851-23:</strong> DC charging station specifications</li>
                <li><strong>IEC 61851-24:</strong> Digital communication (DC charging)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Safety</p>
                <ul className="text-sm text-white space-y-1">
                  <li>RCD protection requirements</li>
                  <li>Insulation monitoring</li>
                  <li>Earth fault detection</li>
                  <li>Overcurrent protection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Safety</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Control pilot verification</li>
                  <li>Proximity detection</li>
                  <li>Emergency stop function</li>
                  <li>Fail-safe operation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            AC Connectors (IEC 62196)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 62196 defines plugs, socket-outlets, and couplers for EV charging. The two
              main AC connector types serve different regional markets and power requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 1 (SAE J1772)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Pins:</strong> 5 (L1, N, PE, CP, PP)</li>
                  <li><strong>Power:</strong> Single-phase up to 19.2kW</li>
                  <li><strong>Voltage:</strong> Up to 240V AC</li>
                  <li><strong>Region:</strong> North America, Japan</li>
                  <li><strong>Vehicles:</strong> Nissan Leaf (US), Chevrolet</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 2 (Mennekes)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Pins:</strong> 7 (L1, L2, L3, N, PE, CP, PP)</li>
                  <li><strong>Power:</strong> Three-phase up to 43kW</li>
                  <li><strong>Voltage:</strong> Up to 500V AC</li>
                  <li><strong>Region:</strong> Europe (mandated), UK</li>
                  <li><strong>Vehicles:</strong> BMW, Mercedes, Tesla (EU)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control Pilot Pin Functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>CP (Control Pilot):</strong> PWM signal indicating available current</li>
                <li><strong>PP (Proximity Pilot):</strong> Cable capacity detection, plug insertion</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            DC Fast Charging Connectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC fast charging bypasses the vehicle's onboard charger, delivering high power
              directly to the battery. Three main DC standards exist globally.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">CHAdeMO</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Origin: Japan</li>
                  <li>Power: Up to 500kW</li>
                  <li>Protocol: CAN bus</li>
                  <li>Feature: V2G capable</li>
                  <li>Declining in new vehicles</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">CCS1 (Combo 1)</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Origin: North America</li>
                  <li>Power: Up to 500kW</li>
                  <li>Protocol: PLC (ISO 15118)</li>
                  <li>Feature: Plug & Charge</li>
                  <li>Type 1 + DC pins</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">CCS2 (Combo 2)</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Origin: Europe</li>
                  <li>Power: Up to 500kW</li>
                  <li>Protocol: PLC (ISO 15118)</li>
                  <li>EU mandatory from 2024</li>
                  <li>Type 2 + DC pins</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Pilot PWM Duty Cycles</p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-white/5">
                  <p className="font-medium">10%</p>
                  <p className="text-white/70">6A</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-medium">25%</p>
                  <p className="text-white/70">~15A</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-medium">50%</p>
                  <p className="text-white/70">32A</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-medium">90%</p>
                  <p className="text-white/70">57A</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Insulation resistance: &gt;1MΩ at 500V</li>
                <li>Earth continuity: &lt;0.5Ω</li>
                <li>Control pilot signal verification (oscilloscope)</li>
                <li>Proximity pilot resistance check</li>
                <li>Connector retention force: 80N minimum</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong connector:</strong> — Verify vehicle inlet type before ordering</li>
                <li><strong>Ignoring regional standards:</strong> — UK uses Type 2/CCS2, not Type 1</li>
                <li><strong>No CP testing:</strong> — Always verify control pilot signal</li>
                <li><strong>Incorrect cable sizing:</strong> — Match to connector current rating</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">AC Connectors</p>
              <ul className="space-y-0.5">
                <li>Type 1: 5 pins, single-phase, NA/Japan</li>
                <li>Type 2: 7 pins, three-phase, Europe/UK</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">DC Connectors</p>
              <ul className="space-y-0.5">
                <li>CCS1: Type 1 + DC, North America</li>
                <li>CCS2: Type 2 + DC, Europe/UK</li>
                <li>CHAdeMO: Separate, declining</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-2-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule2Section4;