import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m3s5-check1",
    question: "What percentage of properties are predicted to have 2+ EVs by 2030?",
    options: ["20%", "30%", "40%", "50%"],
    correctIndex: 2,
    explanation: "Statistical analysis predicts 40% of properties will have 2+ EVs by 2030, making dual charging capability essential for future-proof installations."
  },
  {
    id: "evcharging-m3s5-check2",
    question: "What is Vehicle-to-Grid (V2G) technology?",
    options: [
      "One-way charging only",
      "Bidirectional charging allowing EVs to export power to the grid",
      "Wireless charging",
      "Solar panel connection"
    ],
    correctIndex: 1,
    explanation: "V2G enables bidirectional power flow, allowing EVs to export stored energy back to the grid during peak demand, creating revenue opportunities for vehicle owners."
  },
  {
    id: "evcharging-m3s5-check3",
    question: "What diversity factor applies with smart charging for dual domestic EV charging?",
    options: ["1.0 (100%)", "0.8 (80%)", "0.6 (60%)", "0.4 (40%)"],
    correctIndex: 1,
    explanation: "Smart charging systems enable 0.8 (80%) diversity factor for 1-2 domestic chargers, as dynamic load balancing prevents simultaneous full-power charging."
  }
];

const faqs = [
  {
    question: "How should I size infrastructure for future expansion?",
    answer: "Size cable infrastructure for 150% of current requirements. Install larger cables with tapping points, use modular distribution boards, and leave 25% spare capacity in containment. Plan DNO upgrade pathways early."
  },
  {
    question: "What's the benefit of PV integration with EV charging?",
    answer: "A typical 6kWp residential PV system can provide 60-70% of EV charging energy. This reduces grid demand, lowers charging costs, and provides energy independence. Battery storage enables evening charging from daytime generation."
  },
  {
    question: "When will higher power charging standards become mainstream?",
    answer: "350kW DC and 22kW AC are expected standard by 2025-2027. 800V vehicle architectures and MW-level charging are projected for 2028-2030. Infrastructure should accommodate these future requirements."
  },
  {
    question: "What revenue opportunities exist for smart EV charging?",
    answer: "Grid services earn £50-200/MW/hour. Demand response provides £0.10-0.30/kWh. V2G systems can generate £300-600 annual revenue. Time-of-use tariff optimization saves £800-1,200 annually vs day rate charging."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A new residential development of 50 homes wants future-proof EV charging. What infrastructure strategy should you recommend?",
  options: [
    "Single 7kW charger per home, no expansion planning",
    "Install the cheapest solution and upgrade later",
    "Dual EV capability, smart charging, PV-ready, ducted routes for expansion",
    "Only install rapid chargers in communal areas"
  ],
  correctAnswer: 2,
  explanation: "Future-proofing requires: dual EV capability (40% will have 2+ EVs by 2030), smart charging for load management, PV-ready infrastructure for renewable integration, and ducted cable routes for future upgrades. This maximises long-term value."
  }
];

const EVChargingModule3Section5 = () => {
  useSEO({
    title: "Future-Proofing Installations | EV Charging Module 3.5",
    description: "Design future-proof EV charging installations with dual EV capability, PV integration, smart grid connectivity and expansion planning."
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
            <span>Module 3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Future-Proofing Installations
          </h1>
          <p className="text-white/80">
            Designing for expansion, PV integration, and smart grid
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Dual EV:</strong> 40% of homes will have 2+ EVs by 2030</li>
              <li><strong>V2G:</strong> Bidirectional charging for grid services</li>
              <li><strong>Sizing:</strong> 150% of current requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Spare capacity in containment/CU</li>
              <li><strong>Use:</strong> Smart charging + PV for future value</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan infrastructure for multiple EV scenarios",
              "Design dual EV systems with load management",
              "Integrate PV solar with EV charging",
              "Implement smart grid connectivity",
              "Size for future expansion",
              "Understand emerging charging technologies"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 - Load Growth Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Load Growth Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Future-proofing requires anticipating EV adoption growth and planning
              infrastructure that can accommodate increasing demand.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Adoption Forecasts</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• 40% properties: 2+ EVs by 2030</li>
                  <li>• Workplace: 20% → 60% by 2035</li>
                  <li>• Size for 150% current load</li>
                  <li>• Expansion points every 25m</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diversity with Smart Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1-2 chargers:</strong> 0.8 diversity</li>
                  <li><strong>3-10:</strong> 0.5 diversity</li>
                  <li><strong>11-50:</strong> 0.3 diversity</li>
                  <li><strong>50+:</strong> 0.2 diversity</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Demand Forecasting Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>• Household income correlation with EV adoption</li>
                <li>• Local authority EV strategy alignment</li>
                <li>• Building use patterns (commuter vs visitor)</li>
                <li>• Grid connection capacity and upgrade pathways</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 - Dual EV & PV Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dual EV and PV Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dual EV Load Balancing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Dynamic power allocation</li>
                  <li>• Sequential charging queues</li>
                  <li>• Time-based off-peak scheduling</li>
                  <li>• House load priority management</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PV-EV Direct Charging</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• DC-coupled: Direct from PV</li>
                  <li>• AC-coupled: Via grid-tie inverter</li>
                  <li>• Surplus diverters: Auto-switch</li>
                  <li>• Weather-based scheduling</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-transparent border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Example: Residential PV-EV System</p>
              <ul className="text-xs text-white space-y-1">
                <li><strong>PV Array:</strong> 6kWp (24 × 250W panels)</li>
                <li><strong>Annual generation:</strong> ~5,400kWh</li>
                <li><strong>EV consumption:</strong> 3,500kWh/year (12,000 miles)</li>
                <li><strong>Solar charging:</strong> 60-70% of EV energy from PV</li>
                <li><strong>Battery storage:</strong> 10kWh for evening charging</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grid Connection Considerations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>• G98/G99 requirements for PV systems</li>
                <li>• Export limitation and curtailment</li>
                <li>• DNO notification for combined installations</li>
                <li>• Smart Export Guarantee (SEG) integration</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 - Smart Grid Integration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smart Grid and V2G
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vehicle-to-Grid (V2G)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Bidirectional charging</li>
                  <li>• G98/G99 approval required</li>
                  <li>• Revenue: £10-40/MW/hour</li>
                  <li>• ±0.95 power factor capability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demand Response</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Automated demand reduction</li>
                  <li>• Time-of-use tariff optimisation</li>
                  <li>• DNO flexibility services</li>
                  <li>• Virtual power plant participation</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-transparent border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Example: Octopus Go Integration</p>
              <ul className="text-xs text-white space-y-1">
                <li><strong>Off-peak:</strong> 00:30-04:30 at 7.5p/kWh</li>
                <li><strong>Day rate:</strong> 05:00-00:00 at 30.9p/kWh</li>
                <li><strong>Smart charging:</strong> 90% in off-peak window</li>
                <li><strong>Annual saving:</strong> £800-1,200 vs day rate</li>
                <li><strong>V2G potential:</strong> Additional £300-600 revenue</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 - Infrastructure Sizing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Infrastructure Sizing Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Oversizing Approach</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Cable: Install for ultimate load</li>
                  <li>• CU: 25% spare MCB capacity</li>
                  <li>• Main switch: Full future load</li>
                  <li>• DNO: Plan upgrade pathways</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modular Expansion</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Larger submains with tapping points</li>
                  <li>• Modular distribution boards</li>
                  <li>• Earth electrode provisions</li>
                  <li>• 40% spare containment capacity</li>
                </ul>
              </div>
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2 text-elec-yellow">Installation</th>
                    <th className="text-left p-2 text-elec-yellow">Current</th>
                    <th className="text-left p-2 text-elec-yellow">Future Provision</th>
                    <th className="text-left p-2 text-elec-yellow">Capacity</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="p-2">Single dwelling</td>
                    <td className="p-2">7kW + 8kW house</td>
                    <td className="p-2">Second 7kW EV</td>
                    <td className="p-2">22kW supply</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-2">Commercial 10 spaces</td>
                    <td className="p-2">3 × 7kW</td>
                    <td className="p-2">10 × 7kW + 2 × 22kW</td>
                    <td className="p-2">150kW</td>
                  </tr>
                  <tr>
                    <td className="p-2">Destination charging</td>
                    <td className="p-2">5 × 22kW</td>
                    <td className="p-2">20 × 22kW + 4 × 50kW</td>
                    <td className="p-2">800kW</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5 - Emerging Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Emerging Technologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Ultra-High Power</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• 350kW+ DC charging</li>
                  <li>• 800V architectures</li>
                  <li>• Liquid-cooled cables</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Wireless Charging</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• 11-22kW inductive pads</li>
                  <li>• Position accuracy ±50mm</li>
                  <li>• EMF compliance (ICNIRP)</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Autonomous EVs</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Robotic plug connection</li>
                  <li>• 5G/V2X communication</li>
                  <li>• Fleet optimisation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Future-Proofing Checklist</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>✓ Cable infrastructure sized 150% current requirements</li>
                <li>✓ Three-phase provision for single-phase installations</li>
                <li>✓ Communication cable routes to charge points</li>
                <li>✓ Space for additional switchgear and meters</li>
                <li>✓ Grid connection pathway for upgrades</li>
                <li>✓ PV and battery storage integration ready</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Planning Future-Proof Installations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Size infrastructure for 150% current requirements</li>
                <li>Include smart charging capability from the start</li>
                <li>Plan PV and battery integration pathways</li>
                <li>Consider V2G-ready equipment selection</li>
                <li>Document expansion provisions in handover</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No expansion planning:</strong> — Expensive retrofits required</li>
                <li><strong>Ignoring smart charging:</strong> — Higher diversity factors possible</li>
                <li><strong>No PV integration:</strong> — Missed renewable energy opportunities</li>
                <li><strong>Undersized infrastructure:</strong> — Cannot accommodate second EV</li>
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
              <p className="font-medium text-white mb-1">Future Predictions</p>
              <ul className="space-y-0.5">
                <li>40% dual EV homes by 2030</li>
                <li>350kW DC standard by 2027</li>
                <li>60% workplace adoption by 2035</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Revenue Potential</p>
              <ul className="space-y-0.5">
                <li>V2G: £300-600/year</li>
                <li>Off-peak savings: £800-1,200/year</li>
                <li>Grid services: £50-200/MW/hour</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-3-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-4">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule3Section5;