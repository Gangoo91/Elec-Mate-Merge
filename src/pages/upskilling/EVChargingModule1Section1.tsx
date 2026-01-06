import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m1s1-check1",
    question: "What percentage of electrical energy do EV motors typically convert into motion?",
    options: ["50-60%", "70-75%", "85-90%", "95-99%"],
    correctIndex: 2,
    explanation: "EV motors are highly efficient, converting approximately 85-90% of electrical energy into motion. Compare this to internal combustion engines which typically convert only 20-30% of fuel energy into motion."
  },
  {
    id: "evcharging-m1s1-check2",
    question: "Which connector type is the European standard for AC charging?",
    options: ["Type 1", "Type 2", "CHAdeMO", "Tesla Supercharger"],
    correctIndex: 1,
    explanation: "Type 2 (Mennekes) is the European standard for AC charging. It supports both single-phase and three-phase charging and is now mandatory for new public charging points in Europe."
  },
  {
    id: "evcharging-m1s1-check3",
    question: "What is the maximum RCD rating required by BS 7671 Section 722 for EV charging?",
    options: ["10mA", "30mA", "100mA", "300mA"],
    correctIndex: 1,
    explanation: "BS 7671 Section 722 requires RCD protection with a maximum rating of 30mA for EV charging installations to provide adequate protection against electric shock."
  }
];

const faqs = [
  {
    question: "Can I plug an EV directly into a standard 13A socket?",
    answer: "Yes, but charging will be very slow (Level 1 - around 2-3kW). This is only suitable for occasional top-ups. For regular use, a dedicated 7kW charger is recommended as it's significantly faster and safer for continuous use."
  },
  {
    question: "Do all EVs support rapid DC charging?",
    answer: "No. The vehicle must have the appropriate battery management system and charging port. Many older EVs and some plug-in hybrids have limited or no DC charging capability. Always check the vehicle specifications."
  },
  {
    question: "Is three-phase power required for home EV chargers?",
    answer: "No. Most domestic chargers use single-phase 230V supply (7kW maximum). Three-phase allows faster charging (up to 22kW) if available, but single-phase is adequate for most overnight charging needs."
  },
  {
    question: "Why does charging slow down above 80% state of charge?",
    answer: "The battery management system reduces charging speed to protect battery health. Rapid charging generates heat, and lithium-ion batteries can be damaged by overcharging. The 80-100% range uses a slower 'constant voltage' phase."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A 7kW home charger connected to a 230V single-phase supply will draw approximately what current?",
  options: [
    "16A",
    "25A",
    "30A",
    "32A"
  ],
  correctAnswer: 3,
  explanation: "Using P = V × I, a 7kW charger on 230V draws approximately 30A (7000 ÷ 230 = 30.4A). In practice, these chargers are typically rated at 32A to account for the continuous load requirement."
  }
];

const EVChargingModule1Section1 = () => {
  useSEO({
    title: "EV Basics and Charging Principles | EV Charging Module 1.1",
    description: "Understand electric vehicle fundamentals, charging levels, connector types, and safety requirements for EV charging installations."
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
            <Link to="../ev-charging-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            EV Basics and Charging Principles
          </h1>
          <p className="text-white/80">
            Understanding electric vehicle charging fundamentals
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Level 1:</strong> 2-3kW slow (13A socket) - emergency only</li>
              <li><strong>Level 2:</strong> 7-22kW fast (dedicated charger) - typical</li>
              <li><strong>Level 3:</strong> 50-350kW rapid DC - motorways</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Type 2 connectors, 7kW wallboxes, CCS for rapid</li>
              <li><strong>Use:</strong> BS 7671 Section 722 for all EV installations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Basic operating principles of EVs",
              "Charging levels and connector types",
              "AC vs DC charging differences",
              "Safety and regulatory requirements",
              "Factors affecting charging speed",
              "BS 7671 Section 722 requirements"
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
            How Electric Vehicles Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric vehicles are powered by electric motors drawing energy from rechargeable
              lithium-ion battery packs. These motors are highly efficient, converting 85-90%
              of electrical energy into motion.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key EV Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Battery pack:</strong> Stores electrical energy (40-100kWh typical)</li>
                  <li><strong>Motor:</strong> Converts electrical energy to motion</li>
                  <li><strong>Controller:</strong> Manages power delivery from battery to motor</li>
                  <li><strong>Onboard charger:</strong> Converts AC to DC for battery</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Recovery</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Regenerative braking:</strong> Motor works as generator</li>
                  <li><strong>Kinetic energy:</strong> Converted back to electricity</li>
                  <li><strong>Range extension:</strong> Up to 20% additional range</li>
                  <li><strong>Brake wear:</strong> Significantly reduced</li>
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
            Charging Levels Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charging is categorised into three levels based on power delivery.
              Understanding these levels helps determine appropriate solutions for each application.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Level 1 (Slow)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Supply:</strong> 230V AC single-phase</li>
                  <li><strong>Current:</strong> 10-16A</li>
                  <li><strong>Power:</strong> 2-3kW</li>
                  <li><strong>Time:</strong> 8-12+ hours</li>
                  <li><strong>Use:</strong> Emergency only</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Level 2 (Fast)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Supply:</strong> 230V/400V AC</li>
                  <li><strong>Current:</strong> 16-32A</li>
                  <li><strong>Power:</strong> 7-22kW</li>
                  <li><strong>Time:</strong> 3-6 hours</li>
                  <li><strong>Use:</strong> Home/workplace</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Level 3 (Rapid)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Supply:</strong> DC direct</li>
                  <li><strong>Power:</strong> 50-350kW</li>
                  <li><strong>Time:</strong> 20-60 min</li>
                  <li><strong>Use:</strong> Motorway services</li>
                  <li><strong>Cost:</strong> £20k-£150k+</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Connector Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several connector standards exist for EV charging. Type 2 is the European standard
              for AC, while CCS (Combined Charging System) handles both AC and DC in one connector.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Connectors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type 1:</strong> Older standard, mainly pre-2018 vehicles</li>
                  <li><strong>Type 2:</strong> European standard, single/three-phase</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Connectors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>CHAdeMO:</strong> Japanese standard, being phased out</li>
                  <li><strong>CCS:</strong> Combined AC/DC, European standard</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All EV charging installations must comply with BS 7671 Section 722. Non-compliance
              can result in insurance invalidation, safety hazards, and legal liability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>RCD:</strong> Type A (minimum) or Type B for DC fault detection</li>
                  <li><strong>MCB:</strong> Correctly sized (125% continuous load)</li>
                  <li><strong>Cable:</strong> Sized for continuous current + derating</li>
                  <li><strong>Isolation:</strong> Local isolator within 2m of charger</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>PME:</strong> Special measures for outdoor installations</li>
                  <li><strong>Open PEN:</strong> Detection on most modern chargers</li>
                  <li><strong>Bonding:</strong> All metalwork properly bonded</li>
                  <li><strong>IP rating:</strong> Minimum IP54 for outdoor units</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Most domestic installations use Level 2 (7kW) single-phase</li>
                <li>Charging speed limited by weakest link (charger, supply, or vehicle)</li>
                <li>Check supply capacity before sizing the installation</li>
                <li>Consider future expansion (second vehicle, higher power charger)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring PME requirements:</strong> — Always assess earthing arrangements</li>
                <li><strong>Undersized cables:</strong> — Account for continuous load and derating</li>
                <li><strong>No local isolation:</strong> — Required within 2m of charge point</li>
                <li><strong>Missing RCD protection:</strong> — 30mA Type A minimum required</li>
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
              <p className="font-medium text-white mb-1">Charging Levels</p>
              <ul className="space-y-0.5">
                <li>Level 1: 2-3kW (slow)</li>
                <li>Level 2: 7-22kW (fast)</li>
                <li>Level 3: 50-350kW (rapid DC)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Standards</p>
              <ul className="space-y-0.5">
                <li>BS 7671 Section 722</li>
                <li>RCD: 30mA Type A minimum</li>
                <li>IP54 minimum outdoor</li>
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
            <Link to="../ev-charging-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-1-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule1Section1;