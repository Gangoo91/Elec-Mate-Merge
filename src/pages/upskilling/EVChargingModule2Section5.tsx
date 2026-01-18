import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m2s5-check1",
    question: "What charging speed can a Tesla Model 3 achieve on a European Supercharger V3?",
    options: ["7kW AC only", "Up to 150kW DC", "Up to 250kW DC", "350kW DC"],
    correctIndex: 2,
    explanation: "Tesla Model 3 can achieve up to 250kW on Supercharger V3 stations in Europe (using CCS2 connector). Peak rates depend on battery temperature, state of charge, and station capability."
  },
  {
    id: "evcharging-m2s5-check2",
    question: "Why might a BMW iX achieve faster home charging than a Nissan Leaf?",
    options: ["Larger battery capacity", "Three-phase 22kW AC capability vs single-phase 6.6kW", "Better thermal management", "More efficient motor"],
    correctIndex: 1,
    explanation: "The BMW iX supports 22kW three-phase AC charging, while the Nissan Leaf is typically limited to 6.6kW single-phase. This means the iX can charge over 3× faster on a suitable AC supply."
  },
  {
    id: "evcharging-m2s5-check3",
    question: "Which connector standard is used by all Tesla vehicles sold in Europe since 2019?",
    options: ["Proprietary Tesla connector", "Type 1 SAE J1772", "CCS2 (Type 2 Combo)", "CHAdeMO"],
    correctIndex: 2,
    explanation: "Since 2019, all Tesla vehicles sold in Europe use CCS2 (Combined Charging System Type 2) for DC charging and Type 2 for AC charging, complying with EU standardisation requirements."
  }
];

const faqs = [
  {
    question: "Can I install a charger before knowing what EV the customer will buy?",
    answer: "Yes - install a socketed Type 2 outlet for maximum flexibility. This works with all European EVs for AC charging. For DC capability, you'd need to know the vehicle (CCS2 is standard for most new EVs in Europe)."
  },
  {
    question: "Why do some vehicles charge slower than their maximum rated speed?",
    answer: "Actual charging speed depends on: battery temperature (cold batteries charge slower), state of charge (speed reduces above 80%), charger capability, and the vehicle's Battery Management System protecting battery health."
  },
  {
    question: "Should I recommend a three-phase supply upgrade for home charging?",
    answer: "Only if the customer has a vehicle that supports three-phase charging (BMW iX, Audi e-tron, etc.) and regularly needs faster home charging. Many EVs only support single-phase AC, making the upgrade unnecessary."
  },
  {
    question: "What about older EVs with CHAdeMO - are they still supported?",
    answer: "CHAdeMO infrastructure is declining but still available. Public rapid chargers often have both CCS and CHAdeMO. For home installation, focus on AC charging (Type 2) which all CHAdeMO vehicles support."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A customer has a BMW iX and wants the fastest possible home charging. What would you recommend?",
  options: [
    "7kW single-phase tethered charger",
    "22kW three-phase Type 2 installation",
    "DC rapid charger installation",
    "Standard 13A plug charging"
  ],
  correctAnswer: 1,
  explanation: "The BMW iX supports 22kW three-phase AC charging. A 22kW Type 2 installation maximises the vehicle's AC charging capability. DC rapid chargers are impractical for home use (cost, supply requirements), and slower options don't utilise the vehicle's full capability."
  }
];

const EVChargingModule2Section5 = () => {
  useSEO({
    title: "Compatibility by Manufacturer | EV Charging Module 2.5",
    description: "Understand vehicle-specific charging requirements for Tesla, BMW, Volkswagen, Nissan, and other major EV manufacturers."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/ev-charging-module-2">
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
            <span>Module 2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Compatibility by Manufacturer
          </h1>
          <p className="text-white/80">
            Vehicle-specific charging requirements and capabilities
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Europe:</strong> Type 2 AC + CCS2 DC standard</li>
              <li><strong>Speeds vary:</strong> 3.7kW to 350kW by model</li>
              <li><strong>Check vehicle:</strong> Not all support three-phase</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check vehicle spec sheet for AC/DC speeds</li>
              <li><strong>Use:</strong> Match charger to vehicle's max AC rate</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify charging specs by manufacturer",
              "Match charger capacity to vehicle capability",
              "Understand regional connector differences",
              "Advise on three-phase vs single-phase",
              "Plan for multi-vehicle households",
              "Future-proof installations"
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
            Tesla Vehicles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tesla has transitioned to regional standard connectors in Europe while maintaining
              proprietary connectors in North America. All Tesla models support high-speed DC
              charging via the Supercharger network.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">European Models (2019+)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>AC:</strong> Type 2, 11kW three-phase</li>
                  <li><strong>DC:</strong> CCS2, up to 250kW</li>
                  <li><strong>Model 3/Y:</strong> 250kW peak DC</li>
                  <li><strong>Model S/X Plaid:</strong> 250kW peak DC</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">North American Models</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>AC:</strong> Proprietary, up to 11.5kW</li>
                  <li><strong>DC:</strong> Proprietary Supercharger</li>
                  <li><strong>V3 Supercharger:</strong> 250kW peak</li>
                  <li><strong>Opening to CCS:</strong> Via adapters/Magic Dock</li>
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
            German Manufacturers (BMW, VW Group, Mercedes)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              German manufacturers typically offer the fastest AC charging (up to 22kW) and
              competitive DC speeds. Many models support three-phase charging, making the most
              of European electrical infrastructure.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">BMW iX / i4</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>AC: 11-22kW three-phase</li>
                  <li>DC: 195-205kW CCS2</li>
                  <li>Battery: 70-105kWh</li>
                  <li>Preconditioning: GPS-based</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">VW ID.3 / ID.4</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>AC: 11kW three-phase</li>
                  <li>DC: 100-135kW CCS2</li>
                  <li>Battery: 45-77kWh</li>
                  <li>Plug & Charge: Supported</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Porsche Taycan</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>AC: 11-22kW three-phase</li>
                  <li>DC: 270kW (800V native)</li>
                  <li>Battery: 79-93kWh</li>
                  <li>5-80%: 22.5 minutes</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Note:</strong> The Porsche Taycan and Audi e-tron GT use 800V architecture,
              enabling significantly faster DC charging than 400V vehicles. However, AC charging
              speeds are similar across voltage architectures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Japanese & Other Manufacturers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Japanese manufacturers historically used CHAdeMO for DC charging but are
              transitioning to CCS for new models. AC charging speeds are often more limited
              than European brands.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Nissan</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Leaf (2018+):</strong> AC 6.6kW, DC 50-100kW CHAdeMO</li>
                  <li><strong>Ariya:</strong> AC 22kW, DC 130kW CHAdeMO/CCS2</li>
                  <li><strong>Note:</strong> V2G capability via CHAdeMO</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hyundai/Kia</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ioniq 5/6, EV6:</strong> AC 11kW, DC 220kW CCS2</li>
                  <li><strong>Architecture:</strong> 800V E-GMP platform</li>
                  <li><strong>Feature:</strong> V2L vehicle-to-load output</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Regional Compatibility Matrix (UK/Europe):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-2">Manufacturer</th>
                      <th className="text-left p-2">AC Connector</th>
                      <th className="text-left p-2">DC Connector</th>
                      <th className="text-left p-2">Max AC</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/10">
                      <td className="p-2">Tesla (EU)</td>
                      <td className="p-2">Type 2</td>
                      <td className="p-2">CCS2</td>
                      <td className="p-2">11kW</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-2">BMW</td>
                      <td className="p-2">Type 2</td>
                      <td className="p-2">CCS2</td>
                      <td className="p-2">22kW</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-2">VW Group</td>
                      <td className="p-2">Type 2</td>
                      <td className="p-2">CCS2</td>
                      <td className="p-2">11-22kW</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-2">Nissan Leaf</td>
                      <td className="p-2">Type 2</td>
                      <td className="p-2">CHAdeMO</td>
                      <td className="p-2">6.6kW</td>
                    </tr>
                    <tr>
                      <td className="p-2">Hyundai/Kia</td>
                      <td className="p-2">Type 2</td>
                      <td className="p-2">CCS2</td>
                      <td className="p-2">11kW</td>
                    </tr>
                  </tbody>
                </table>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Recommendations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check vehicle spec before sizing charger</li>
                <li>Type 2 socketed for unknown future vehicles</li>
                <li>Only upgrade to three-phase if vehicle supports it</li>
                <li>Consider 22kW for premium German EVs</li>
                <li>7kW sufficient for most Japanese/Korean EVs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Oversizing:</strong> — 22kW charger for 6.6kW vehicle wastes money</li>
                <li><strong>Wrong phase:</strong> — Three-phase charger on single-phase supply</li>
                <li><strong>Ignoring onboard limit:</strong> — Vehicle limits AC regardless of charger</li>
                <li><strong>CHAdeMO assumption:</strong> — Check if Nissan has CCS2 (Ariya does)</li>
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
              <p className="font-medium text-white mb-1">22kW Three-Phase Capable</p>
              <ul className="space-y-0.5">
                <li>BMW iX, i4, iX3</li>
                <li>Audi e-tron, Q4</li>
                <li>Mercedes EQ series</li>
                <li>Porsche Taycan</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Single-Phase Limited</p>
              <ul className="space-y-0.5">
                <li>Nissan Leaf (6.6kW)</li>
                <li>Tesla (11kW max)</li>
                <li>VW ID series (11kW)</li>
                <li>Hyundai/Kia (11kW)</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-2-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-3">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule2Section5;