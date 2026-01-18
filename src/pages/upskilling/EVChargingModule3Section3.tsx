import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m3s3-check1",
    question: "What is the minimum RCD type required for EV charging according to BS 7671?",
    options: ["Type AC RCD", "Type A RCD", "Type B RCD", "No RCD required"],
    correctIndex: 1,
    explanation: "Regulation 722.531.2.101 specifies Type A RCD as the minimum requirement for EV charging, with Type B preferred for enhanced protection against all residual current types including smooth DC."
  },
  {
    id: "evcharging-m3s3-check2",
    question: "How should circuit breakers be sized for sustained EV loading?",
    options: [
      "Equal to the design current",
      "MCB rating ≥ design current and ≤ cable capacity",
      "As large as possible",
      "Double the design current"
    ],
    correctIndex: 1,
    explanation: "MCB rating should be greater than or equal to the design current (Ib) and less than or equal to the cable current-carrying capacity (Iz), accounting for sustained loading and derating factors."
  },
  {
    id: "evcharging-m3s3-check3",
    question: "When are SPDs (Surge Protection Devices) required for EV charging?",
    options: [
      "Never required",
      "Always mandatory",
      "Based on risk assessment, especially for outdoor installations",
      "Only for three-phase installations"
    ],
    correctIndex: 2,
    explanation: "SPDs are required based on risk assessment, particularly for outdoor installations and areas with high lightning activity. They protect sensitive EV charging equipment from transient overvoltages."
  }
];

const faqs = [
  {
    question: "What's the difference between Type A and Type B RCDs?",
    answer: "Type A RCDs detect AC and pulsating DC residual currents. Type B RCDs detect all residual current types including smooth DC. Type B is preferred for EV charging as it provides protection against DC faults that can occur in vehicle chargers."
  },
  {
    question: "Why is Type AC RCD not suitable for EV charging?",
    answer: "Type AC RCDs only detect AC residual currents and can be blinded by DC components. EV charging equipment can produce DC residual currents that Type AC cannot detect, creating a safety risk."
  },
  {
    question: "What MCB characteristic should I use for EV charging?",
    answer: "Type B MCBs are suitable for most EV charging applications. Type C may be required for installations with high inrush currents. The choice depends on the specific equipment characteristics and prospective fault current."
  },
  {
    question: "How do I achieve proper discrimination between protective devices?",
    answer: "Ensure upstream devices have higher current ratings or time delays. Use time-delayed (S-type) RCDs upstream of instantaneous 30mA RCDs. Verify fault current breaking capacity and test discrimination during commissioning."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A commercial car park has nuisance tripping affecting multiple EV chargers. What is the most likely cause and solution?",
  options: [
    "Faulty chargers - replace all units",
    "Inadequate RCD discrimination - implement selective protection",
    "Wrong cable sizes - rewire installation",
    "Too many chargers - reduce capacity"
  ],
  correctAnswer: 1,
  explanation: "Nuisance tripping affecting multiple circuits usually indicates inadequate RCD discrimination. Installing a selective 300mA S-type RCD upstream with 30mA instantaneous RCDs at individual circuits provides fault containment."
  }
];

const EVChargingModule3Section3 = () => {
  useSEO({
    title: "Circuit Protection and RCD Selection | EV Charging Module 3.3",
    description: "Master circuit protection and RCD selection for EV charging installations including protective device sizing and coordination."
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
            <Link to="/electrician/upskilling/ev-charging-module-3">
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
            <span>Module 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Circuit Protection and RCD Selection
          </h1>
          <p className="text-white/80">
            Protective device selection and coordination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RCD Minimum:</strong> Type A (Type B preferred)</li>
              <li><strong>RCD Rating:</strong> 30mA for additional protection</li>
              <li><strong>MCB Type:</strong> Type B for most EV applications</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> RCD type marked on device face</li>
              <li><strong>Use:</strong> Type B for best protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate RCD types and ratings",
              "Size circuit breakers for EV loads",
              "Understand discrimination principles",
              "Apply SPD requirements",
              "Implement AFDD protection where required",
              "Design protective systems for different scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 - RCD Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            RCD Selection and Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 722.531.2.101 specifies mandatory RCD protection for EV charging.
              The type of RCD determines what residual currents can be detected.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-red-400/30">
                <p className="font-medium text-white mb-2">Type AC</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• AC residual currents only</li>
                  <li>• Not suitable for EV</li>
                  <li>• May miss DC faults</li>
                </ul>
                <p className="text-xs text-red-400 mt-2">Non-compliant for EV</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-elec-yellow/30">
                <p className="font-medium text-white mb-2">Type A</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• AC + pulsating DC</li>
                  <li>• Minimum for EV</li>
                  <li>• Cost-effective</li>
                </ul>
                <p className="text-xs text-elec-yellow mt-2">Compliant minimum</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-green-400/30">
                <p className="font-medium text-white mb-2">Type B</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• All residual currents</li>
                  <li>• Including smooth DC</li>
                  <li>• Future-proof</li>
                </ul>
                <p className="text-xs text-green-400 mt-2">Recommended best practice</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Criteria</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Charging power:</strong> Higher power benefits from Type B</li>
                <li><strong>Vehicle type:</strong> Consider DC leakage characteristics</li>
                <li><strong>Environment:</strong> External installations need enhanced protection</li>
                <li><strong>Future requirements:</strong> Type B provides better compatibility</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 - Circuit Breaker Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Circuit Breaker Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circuit breakers must be correctly sized for sustained EV charging loads
              while allowing normal operation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Rating Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• MCB rating ≥ design current (Ib)</li>
                  <li>• MCB rating ≤ cable capacity (Iz)</li>
                  <li>• Consider sustained load factors</li>
                  <li>• Allow for temperature derating</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Characteristic Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type B:</strong> General EV charging</li>
                  <li><strong>Type C:</strong> High inrush current</li>
                  <li><strong>Type D:</strong> Motor loads</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2 text-elec-yellow">Charging Power</th>
                    <th className="text-left p-2 text-elec-yellow">Design Current</th>
                    <th className="text-left p-2 text-elec-yellow">MCB Rating</th>
                    <th className="text-left p-2 text-elec-yellow">Cable</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="p-2">3.7kW (16A)</td>
                    <td className="p-2">16A</td>
                    <td className="p-2">20A Type B</td>
                    <td className="p-2">2.5mm²</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">7.4kW (32A)</td>
                    <td className="p-2">32A</td>
                    <td className="p-2">40A Type B</td>
                    <td className="p-2">6.0mm²</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">11kW 3-phase</td>
                    <td className="p-2">16A</td>
                    <td className="p-2">20A Type B</td>
                    <td className="p-2">2.5mm²</td>
                  </tr>
                  <tr>
                    <td className="p-2">22kW 3-phase</td>
                    <td className="p-2">32A</td>
                    <td className="p-2">40A Type B</td>
                    <td className="p-2">6.0mm²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 - Advanced Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Advanced Protection Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Surge Protection (SPDs)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Type 2 SPD minimum at DB</li>
                  <li>• Type 3 SPD at charger if &gt;30m</li>
                  <li>• Required for outdoor installations</li>
                  <li>• Lightning risk assessment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Arc Fault Detection (AFDDs)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Enhanced fire protection</li>
                  <li>• Beneficial for domestic</li>
                  <li>• Check EV charger compatibility</li>
                  <li>• Regular testing required</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">SPD Selection Criteria</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Uc rating:</strong> ≥ 1.1 × nominal voltage</li>
                <li><strong>Imax:</strong> ≥ expected surge current</li>
                <li><strong>Up:</strong> Protection level appropriate for equipment</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 - Discrimination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Discrimination and Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper discrimination ensures only the device closest to a fault operates,
              maintaining supply to unaffected circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Protection Hierarchy:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center">1</span>
                  <span><strong>Incomer:</strong> Main switch/MCCB (time-delayed RCD if required)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center">2</span>
                  <span><strong>Distribution:</strong> MCB (63-80A, selective RCD if required)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center">3</span>
                  <span><strong>Final circuit:</strong> MCB + RCD (20-40A, 30mA instantaneous)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center">4</span>
                  <span><strong>Equipment:</strong> Internal protection in charging unit</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-transparent border border-red-400/30">
              <p className="text-sm font-medium text-red-400/80 mb-1">Real World Issue</p>
              <p className="text-sm text-white">A commercial car park experienced multiple charger disconnections during faults. Investigation found all circuits used 30mA instantaneous RCDs without upstream coordination.</p>
              <p className="text-sm text-elec-yellow mt-2"><strong>Solution:</strong> 300mA S-type RCD upstream with 30mA at individual points.</p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Protection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use Type A RCD minimum, Type B preferred</li>
                <li>Size MCBs for sustained EV loading</li>
                <li>Plan discrimination from the outset</li>
                <li>Consider SPDs for outdoor installations</li>
                <li>Test protective devices during commissioning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Type AC RCDs:</strong> — Non-compliant for EV charging</li>
                <li><strong>No discrimination:</strong> — Causes widespread nuisance trips</li>
                <li><strong>Undersized MCBs:</strong> — May trip during normal charging</li>
                <li><strong>Missing SPDs:</strong> — Risk of transient damage to equipment</li>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">RCD Types</p>
              <ul className="space-y-0.5">
                <li>Type AC: Not compliant</li>
                <li>Type A: Minimum requirement</li>
                <li>Type B: Best practice</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Protection Devices</p>
              <ul className="space-y-0.5">
                <li>RCD: 30mA for additional protection</li>
                <li>MCB: Type B typically</li>
                <li>SPD: Type 2 minimum at DB</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-3-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule3Section3;