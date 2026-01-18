import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m1s5-check1",
    question: "Which manufacturer specialises in solar PV integration with their EV charger?",
    options: ["Pod Point", "myenergi (Zappi)", "Wallbox", "Andersen"],
    correctIndex: 1,
    explanation: "myenergi's Zappi charger specialises in solar PV integration, offering Eco, Eco+, and Fast charging modes that can use excess solar energy for vehicle charging."
  },
  {
    id: "evcharging-m1s5-check2",
    question: "What does OCPP stand for?",
    options: ["Open Charge Point Protocol", "Online Charging Power Platform", "Optimised Connector Power Protocol", "Open Cable Point Program"],
    correctIndex: 0,
    explanation: "OCPP stands for Open Charge Point Protocol - a vendor-neutral communication standard that enables interoperability between charging equipment and management systems."
  },
  {
    id: "evcharging-m1s5-check3",
    question: "What power level is typically classified as 'rapid DC charging'?",
    options: ["7kW", "22kW", "50kW+", "150kW+ only"],
    correctIndex: 2,
    explanation: "Rapid DC charging typically starts at 50kW and above. This provides significantly faster charging than AC chargers, with 50kW capable of adding approximately 100 miles of range in 30 minutes for many vehicles."
  }
];

const faqs = [
  {
    question: "How do I choose between different charger manufacturers?",
    answer: "Consider the application (domestic vs commercial), required features (solar integration, load management), customer preferences, total cost of ownership, warranty terms, and manufacturer support. Building relationships with 2-3 key manufacturers provides flexibility while maintaining expertise."
  },
  {
    question: "What is the difference between tethered and socketed chargers?",
    answer: "Tethered chargers have a permanently attached cable, offering convenience as users don't need to carry their own. Socketed chargers have a socket outlet requiring users to plug in their own cable. Tethered is common domestically; socketed is preferred for public/commercial where multiple connector types may be needed."
  },
  {
    question: "Should I recommend static or dynamic load management?",
    answer: "Dynamic load management is recommended for most multi-charger installations as it maximises available capacity and responds to real-time demand. Static is simpler and cheaper but may underutilise available supply capacity. Consider the client's budget and future expansion plans."
  },
  {
    question: "What is V2G and when will it be widely available?",
    answer: "Vehicle-to-Grid (V2G) allows EVs to discharge power back to the grid or building. CHAdeMO has working V2G capability now (e.g., Nissan Leaf). CCS-based V2G is emerging through ISO 15118. Wider adoption depends on vehicle compatibility, grid regulations, and commercial arrangements."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A commercial client wants to install 20 EV chargers but only has 100kW available supply. What hardware feature is essential?",
  options: [
    "Premium aesthetic design",
    "Dynamic load management system",
    "Tethered cables on all units",
    "V2G capability"
  ],
  correctAnswer: 1,
  explanation: "Dynamic load management is essential when the total charger capacity exceeds available supply. It intelligently distributes power across active charging sessions, ensuring all vehicles can charge without exceeding supply limits while maximising utilisation."
  }
];

const EVChargingModule1Section5 = () => {
  useSEO({
    title: "Market-Ready Hardware | EV Charging Module 1.5",
    description: "Explore current EV charging hardware from leading manufacturers including domestic, commercial, and rapid charging solutions."
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
            <span>Module 1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overview of Market-Ready Hardware
          </h1>
          <p className="text-white/80">
            Current charging equipment and manufacturers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Domestic:</strong> Pod Point, Zappi, Ohme, Wallbox (7kW)</li>
              <li><strong>Commercial:</strong> ABB, ChargePoint (7-22kW AC)</li>
              <li><strong>Rapid:</strong> ABB, Tritium, IONITY (50kW+ DC)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> OCPP support, load management, smart features</li>
              <li><strong>Use:</strong> Match hardware to client needs and budget</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify major EV charging manufacturers",
              "Compare different charging technologies",
              "Select appropriate hardware for requirements",
              "Understand smart charging features",
              "Evaluate total cost of ownership",
              "Recognise emerging technologies"
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
            Domestic Charging Solutions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The domestic EV charging market offers diverse solutions from established manufacturers,
              each with distinct features and target applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pod Point Solo 3</p>
                <ul className="text-sm text-white space-y-1">
                  <li>7kW single-phase, 22kW three-phase</li>
                  <li>Tethered Type 2 cable</li>
                  <li>App-based control and monitoring</li>
                  <li>Smart charging capabilities</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">myenergi Zappi</p>
                <ul className="text-sm text-white space-y-1">
                  <li>7kW with solar PV integration</li>
                  <li>Eco, Eco+, and Fast modes</li>
                  <li>British designed and built</li>
                  <li>myenergi ecosystem compatible</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ohme Home Pro</p>
                <ul className="text-sm text-white space-y-1">
                  <li>AI-powered charging optimisation</li>
                  <li>Dynamic tariff integration</li>
                  <li>Carbon intensity awareness</li>
                  <li>Sleek minimalist design</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wallbox Pulsar Plus</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Compact design (166mm x 193mm)</li>
                  <li>WiFi and Bluetooth connectivity</li>
                  <li>7kW and 22kW options</li>
                  <li>Cost-effective solution</li>
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
            Commercial and Rapid Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial installations require robust, manageable equipment with features
              for access control, payment processing, and multi-user operation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Fast AC (7-22kW)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>ABB Terra AC:</strong> 7-22kW, OCPP 2.0.1</li>
                  <li><strong>ChargePoint CT4000:</strong> Cloud management</li>
                  <li>RFID and app authentication</li>
                  <li>Revenue-grade metering available</li>
                </ul>
              </div>
              <div className="p-4 rounded border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Rapid DC (50kW+)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>ABB Terra 184:</strong> 50-180kW output</li>
                  <li><strong>Tritium Veefil:</strong> Compact design</li>
                  <li>CCS, CHAdeMO connectors</li>
                  <li>Liquid-cooled cables available</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ultra-Fast Charging (150kW+):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IONITY HPC:</strong> Up to 350kW, highway corridors</li>
                <li><strong>Tesla Supercharger V3:</strong> 250kW peak, expanding access</li>
                <li>Liquid-cooled cables essential at these power levels</li>
                <li>Grid reinforcement typically required</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smart Charging Technology
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart charging enables intelligent control, monitoring, and optimisation of
              EV charging through connectivity and software.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">OCPP Protocol</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Version 1.6J widely deployed</li>
                  <li>Version 2.0.1 emerging standard</li>
                  <li>Vendor-neutral interoperability</li>
                  <li>Remote monitoring and control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connectivity Options</p>
                <ul className="text-sm text-white space-y-1">
                  <li>4G/5G cellular networks</li>
                  <li>WiFi and Ethernet</li>
                  <li>LoRaWAN for remote sites</li>
                  <li>Edge computing capability</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Load Management Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Static:</strong> Fixed power allocation, simple implementation</li>
                <li><strong>Dynamic:</strong> Real-time adjustment based on available capacity</li>
                <li>Dynamic recommended for multi-charger installations</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm text-white">
                <strong className="text-elec-yellow">V2G Technology:</strong> Vehicle-to-Grid enables
                EVs to discharge power back to the grid. CHAdeMO has established V2G capability;
                CCS V2G is emerging through ISO 15118 protocol development.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Selection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right hardware requires balancing technical requirements,
              commercial considerations, and client expectations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Power output requirements</li>
                  <li>Connector compatibility</li>
                  <li>Environmental rating (IP65+)</li>
                  <li>Smart charging features</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commercial Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Total cost of ownership</li>
                  <li>Warranty and support</li>
                  <li>Manufacturer relationship</li>
                  <li>Grant eligibility</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Market Trends to Watch:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ultra-fast charging (350kW+) expansion</li>
                <li>Wireless charging development</li>
                <li>V2G commercial deployment</li>
                <li>Energy storage integration</li>
                <li>Charging-as-a-Service models</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Manufacturer Relationships</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Build expertise with 2-3 key manufacturers</li>
                <li>Complete manufacturer training programmes</li>
                <li>Stay current with product updates and new releases</li>
                <li>Develop technical support relationships</li>
                <li>Consider warranty claim processes when selecting brands</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-specifying:</strong> — Match hardware to actual requirements</li>
                <li><strong>Ignoring software:</strong> — Smart features add significant value</li>
                <li><strong>Cheapest option:</strong> — Consider TCO, not just purchase price</li>
                <li><strong>Future-proofing excess:</strong> — Balance today's needs with growth</li>
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
              <p className="font-medium text-white mb-1">Domestic Brands</p>
              <ul className="space-y-0.5">
                <li>Pod Point, myenergi, Ohme</li>
                <li>Wallbox, Andersen, EO</li>
                <li>Typically 7kW single-phase</li>
                <li>OZEV grant eligible models</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Commercial/Rapid</p>
              <ul className="space-y-0.5">
                <li>ABB, ChargePoint, Tritium</li>
                <li>7kW to 350kW+ range</li>
                <li>OCPP protocol support</li>
                <li>Payment integration</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-1-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-1">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule1Section5;