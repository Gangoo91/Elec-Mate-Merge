import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule3Section4QuizData } from "@/data/upskilling/bmsModule3Section4QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "demand-control-principles",
    question: "How does demand-based control reduce unnecessary energy use?",
    options: [
      "By running all equipment at maximum capacity for reliability",
      "By monitoring actual conditions and supplying only what is needed in real time",
      "By turning off all non-essential systems during the day",
      "By using more sensors throughout the building"
    ],
    correctIndex: 1,
    explanation: "Demand-based control monitors actual conditions (occupancy, temperature, load) in real time and adjusts system output to supply only what is needed, avoiding waste from over-supply while maintaining comfort and performance."
  },
  {
    id: "non-critical-loads",
    question: "What is one example of a non-critical load that could be shed by a BMS?",
    options: [
      "Emergency lighting systems",
      "Decorative and facade lighting",
      "Fire detection systems",
      "Primary chilled water pumps"
    ],
    correctIndex: 1,
    explanation: "Decorative and facade lighting is a typical non-critical load that can be safely shed during peak demand periods without affecting safety, comfort, or essential building operations."
  },
  {
    id: "labelling-importance",
    question: "Why is accurate labelling critical when setting up load shedding circuits?",
    options: [
      "It makes the installation look more professional",
      "It prevents the BMS from shedding the wrong loads, which could cause safety risks or complaints",
      "It reduces the cost of installation",
      "It helps identify which cables are the most expensive"
    ],
    correctIndex: 1,
    explanation: "Accurate labelling is critical because it prevents the BMS from shedding the wrong loads. Mistakenly shedding critical circuits could cause safety risks, equipment damage, or serious complaints, while poor labelling makes troubleshooting and maintenance extremely difficult."
  },
  {
    id: "commissioning-testing",
    question: "What commissioning step should be taken to test load shedding strategies?",
    options: [
      "Test only during normal working hours",
      "Simulate high load conditions to verify automatic shedding triggers work correctly",
      "Skip testing and rely on manufacturer specifications",
      "Only test manual controls, not automatic functions"
    ],
    correctIndex: 1,
    explanation: "Commissioning must include simulating high load conditions to verify that automatic shedding triggers work at the correct thresholds, loads shed in proper priority order, and the system responds within acceptable time limits."
  }
];

const faqs = [
  {
    question: "What is the difference between demand-based control and load shedding?",
    answer: "Demand-based control continuously adjusts equipment output to match actual requirements, while load shedding temporarily disconnects non-critical loads when demand exceeds safe or cost-effective limits. Demand control is proactive optimization; load shedding is reactive protection."
  },
  {
    question: "Which loads should never be included in load shedding schemes?",
    answer: "Life safety systems (fire alarms, emergency lighting, smoke extract), critical process equipment, security systems, and essential HVAC for server rooms or medical facilities must never be shed. These must be on dedicated circuits clearly marked as 'NO LOAD SHED'."
  },
  {
    question: "How quickly should load shedding respond to peak demand conditions?",
    answer: "Most utility demand charges are calculated on 15-30 minute rolling averages, so load shedding must respond within 30 seconds to 2 minutes to be effective. Response time from shed command to actual load disconnection should be tested and verified."
  },
  {
    question: "What happens if load shedding fails during a peak demand event?",
    answer: "The building may exceed its contracted maximum demand, triggering significant penalty charges from the utility. In severe cases, it could cause transformer overload, equipment damage, or even trigger utility disconnection. Proper failsafe design and regular testing are essential."
  }
];

const BMSModule3Section4 = () => {
  useSEO({
    title: "Demand-Based Control and Load Shedding | BMS Module 3.4",
    description: "Master demand-based control and load shedding strategies in BMS. Learn peak load management, energy optimisation, load prioritisation, and real-time demand response for maximum efficiency."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Demand-Based Control and Load Shedding
          </h1>
          <p className="text-white/80">
            Advanced energy optimisation and peak load management strategies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Demand Control:</strong> Real-time adjustment to actual needs</li>
              <li><strong>Load Shedding:</strong> Strategic reduction during peaks</li>
              <li><strong>Energy Savings:</strong> 20-50% possible with proper implementation</li>
              <li><strong>ROI:</strong> Often recovered in 3-6 months</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Power meters, load control contactors, priority labels</li>
              <li><strong>Use:</strong> Reducing utility demand charges, protecting equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Demand-based control principles and importance",
              "Load shedding strategies for different buildings",
              "Critical vs non-critical load identification",
              "Peak demand management techniques",
              "Proper wiring and labelling practices",
              "Demand response implementation",
              "Commissioning and testing procedures",
              "Electrician's role in energy management"
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
            Demand-Based Control Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Demand-based control represents a fundamental shift from fixed-schedule operation to intelligent, responsive
              energy management. The system continuously monitors actual demand and adjusts equipment output accordingly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Implementation Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Occupancy-Based:</strong> PIR/CO2 sensors, 1-5 min response, 20-40% savings</li>
                <li><strong>Temperature Reset:</strong> External sensors, 5-15 min response, 15-25% savings</li>
                <li><strong>Load-Based:</strong> Flow/pressure sensors, 30s-2 min response, 25-45% savings</li>
                <li><strong>Predictive:</strong> Weather/schedule data, 1-4 hour lookahead, 30-50% savings</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-Time Monitoring Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>HVAC:</strong> Mild weather reduces chiller demand by 30%</li>
                  <li><strong>Ventilation:</strong> 40% occupancy = 60% airflow</li>
                  <li><strong>Boilers:</strong> 200kW needed of 600kW = 2 boilers off</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Advanced Techniques</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Trim and Respond:</strong> Reduce until zone calls</li>
                  <li><strong>Optimal Start/Stop:</strong> Calculate start time</li>
                  <li><strong>Adaptive Control:</strong> Learn building characteristics</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Load Shedding Strategies and Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Load shedding activates when overall demand threatens to exceed limits - either the building's design capacity
              or thresholds where electricity costs rise sharply. Strategic load shedding protects critical systems while
              minimising operational disruption.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Classification and Priority Levels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Critical (Never Shed):</strong> Fire systems, emergency lighting, life safety</li>
                <li><strong>Essential (Never Shed):</strong> Main chillers, primary pumps, core HVAC</li>
                <li><strong>Important (3rd to shed, 2-4hr max):</strong> Office HVAC, general lighting</li>
                <li><strong>Discretionary (2nd to shed, 8+ hr):</strong> Electric heating, some ventilation</li>
                <li><strong>Deferrable (1st to shed, indefinite):</strong> Decorative lighting, irrigation</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Lighting</p>
                <p className="text-white/90 text-xs">Decorative, car park, corridors</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">HVAC</p>
                <p className="text-white/90 text-xs">Electric reheat, toilet extract, car park vent</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Ancillary</p>
                <p className="text-white/90 text-xs">HW pumps, irrigation, non-critical motors</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Automatic Shedding Triggers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Peak demand approaching contracted maximum (90-95%)</li>
                <li>Power factor penalties imminent</li>
                <li>Utility demand response events</li>
                <li>Generator operation during outages</li>
                <li>Equipment failures requiring load reduction</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrician's Role in Demand Control Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electricians are fundamental to enabling demand-based strategies through proper installation, wiring, and labelling
              of control systems. Their work directly impacts system safety, reliability, and effectiveness.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Installation Responsibilities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sensor Installation:</strong> Temperature, flow, power monitoring with appropriate cabling</li>
                <li><strong>Load Control Devices:</strong> Relays, contactors, smart switches for BMS control</li>
                <li><strong>Circuit Segregation:</strong> Clear separation of safety-critical vs sheddable circuits</li>
                <li><strong>Documentation:</strong> Clear labelling and as-built drawings with priority levels</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Safety-Critical Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Emergency lighting on dedicated circuits</li>
                  <li>Fire alarms physically separated</li>
                  <li>Clearly marked "NO LOAD SHED" labels</li>
                  <li>Manual override capability provided</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current transformers for monitoring</li>
                  <li>Power quality meters</li>
                  <li>Modular contactors for circuit control</li>
                  <li>Smart relays with built-in logic</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Commissioning and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper commissioning ensures demand control and load shedding systems operate safely and effectively.
              Testing must verify both automatic operation and manual override capabilities under various scenarios.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Testing Procedures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Pre-testing verification of wiring, labelling, and protection</li>
                <li><strong>Step 2:</strong> Individual circuit testing for correct operation</li>
                <li><strong>Step 3:</strong> Demand threshold testing with simulated high loads</li>
                <li><strong>Step 4:</strong> Sequence and priority testing - correct shed order</li>
                <li><strong>Step 5:</strong> Manual override testing and emergency restoration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Safety Verification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Life safety isolation verified under all conditions</li>
                <li>Communication failure mode tested - must fail safe</li>
                <li>Manual override immediately restores loads</li>
                <li>Response time from command to disconnection (&lt;30 seconds)</li>
              </ul>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: Data Centre Load Shedding</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Challenge:</strong> 500-rack data centre with £40,000/month demand charges due to peak loads
                exceeding contracted capacity during summer cooling. Required 100% IT uptime maintained.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Implementation</p>
                <ul className="space-y-1">
                  <li>Critical loads identified (never-shed)</li>
                  <li>Sheddable loads: Office HVAC (30kW), lighting (15kW), car park (12kW)</li>
                  <li>Separate contactors per load group</li>
                  <li>Real-time demand monitoring</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-2">Results</p>
                <ul className="space-y-1">
                  <li>Peak demand reduced by 57kW (12%)</li>
                  <li>Demand charges reduced by £35,000/month</li>
                  <li>Zero critical interruptions in 18 months</li>
                  <li>ROI achieved in 3.2 months</li>
                </ul>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Energy Savings Potential</p>
              <ul className="space-y-0.5">
                <li>Occupancy-based: 20-40%</li>
                <li>Load-based: 25-45%</li>
                <li>Predictive: 30-50%</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Critical Requirements</p>
              <ul className="space-y-0.5">
                <li>Safety circuits physically separated</li>
                <li>Manual override always available</li>
                <li>Response time &lt;30 seconds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={bmsModule3Section4QuizData}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-3-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule3Section4;
