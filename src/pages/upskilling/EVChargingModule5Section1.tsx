import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m5s1-check1",
    question: "What is the primary benefit of implementing Dynamic Load Management?",
    options: [
      "Faster charging speeds for all vehicles",
      "Maximising infrastructure utilisation and avoiding costly upgrades",
      "Reducing the number of chargers needed",
      "Eliminating the need for RCD protection"
    ],
    correctIndex: 1,
    explanation: "DLM maximises utilisation of existing electrical infrastructure by intelligently allocating available power to EV charging, preventing overloads and avoiding costly electrical supply upgrades."
  },
  {
    id: "evcharging-m5s1-check2",
    question: "What accuracy class is recommended for CT clamps in DLM systems?",
    options: ["Class 5 (±5%)", "Class 3 (±3%)", "Class 1 (±1%)", "Class 0.1 (±0.1%)"],
    correctIndex: 2,
    explanation: "CT clamps should have accuracy class 1 (±1% error) or better for effective DLM operation. Higher accuracy improves system performance and allows closer operation to maximum capacity limits."
  },
  {
    id: "evcharging-m5s1-check3",
    question: "In equal distribution DLM, how is power allocated with 50kW available and 5 active sessions?",
    options: ["50kW to first vehicle only", "10kW per vehicle", "25kW to two priority vehicles", "Variable based on battery size"],
    correctIndex: 1,
    explanation: "Equal distribution divides available power equally: 50kW ÷ 5 active sessions = 10kW per vehicle. This is simple, fair, and predictable but may not optimise total charging throughput."
  }
];

const faqs = [
  {
    question: "How does DLM prevent electrical overloads?",
    answer: "DLM continuously monitors total electrical demand and automatically reduces EV charging power when approaching maximum supply capacity. Safety margins and real-time control ensure the installation never exceeds its design limits."
  },
  {
    question: "Can DLM work with existing charge points?",
    answer: "Yes, most modern charge points support OCPP (Open Charge Point Protocol) which enables external control. Older units may require retrofit communication modules or replacement with DLM-compatible equipment."
  },
  {
    question: "What happens if the DLM system fails?",
    answer: "Well-designed systems include fail-safe modes where charge points revert to reduced power operation or predetermined limits. Backup communication paths and redundant monitoring ensure continued safe operation."
  },
  {
    question: "What communication protocols do DLM systems use?",
    answer: "Common protocols include OCPP for charge point control, Modbus TCP/RTU for meter integration, MQTT for IoT connectivity, and RESTful APIs for third-party system integration."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A 150kVA office building with 30A spare capacity wants to install 10 × 22kW charge points. What DLM approach is most appropriate?",
  options: [
    "Install without DLM since capacity seems adequate",
    "Reduce to 5 charge points to match capacity",
    "Install all 10 with DLM to share available capacity dynamically",
    "Install a larger electrical supply first"
  ],
  correctAnswer: 2,
  explanation: "DLM enables installation of all 10 charge points while dynamically sharing the available capacity. During typical use, not all vehicles charge simultaneously, and DLM ensures the total load never exceeds the 30A spare capacity. This maximises charging provision without costly infrastructure upgrades."
  }
];

const EVChargingModule5Section1 = () => {
  useSEO({
    title: "Dynamic Load Management DLM | EV Charging Module 5.1",
    description: "Learn to implement intelligent Dynamic Load Management systems for EV charging. Covers algorithms, hardware, control strategies, and BS 7671 compliance."
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
            <Link to="/electrician/upskilling/ev-charging-module-5">
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
            <span>Module 5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Dynamic Load Management (DLM)
          </h1>
          <p className="text-white/80">
            Implementing intelligent load management for optimised EV charging
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Prevent overloads, maximise capacity</li>
              <li><strong>Method:</strong> Real-time monitoring + dynamic allocation</li>
              <li><strong>Result:</strong> 2-3× more chargers on same supply</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> CT clamps on incomer, DLM controller box</li>
              <li><strong>Use:</strong> Multi-charger sites with limited supply</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design Dynamic Load Management systems",
              "Calculate load allocation algorithms",
              "Select monitoring equipment and control hardware",
              "Configure DLM parameters for different installations",
              "Integrate with existing protection systems",
              "Troubleshoot and optimise DLM performance"
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
            Core DLM Concepts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dynamic Load Management automatically adjusts EV charging power based on real-time
              electrical demand, available capacity, and grid conditions. This prevents
              infrastructure overload whilst maximising charging efficiency.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Monitoring</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Real-time:</strong> Continuous demand measurement</li>
                  <li><strong>Capacity:</strong> Dynamic available power calculation</li>
                  <li><strong>Forecasting:</strong> Predictive algorithms</li>
                  <li><strong>Response:</strong> Sub-second adjustment capability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Loop</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Measure:</strong> Data from CTs and meters</li>
                  <li><strong>Process:</strong> Algorithm calculates allocation</li>
                  <li><strong>Command:</strong> Transmit to charge points</li>
                  <li><strong>Verify:</strong> Confirm implementation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DLM Benefits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maximises utilisation of existing electrical infrastructure</li>
                <li>Prevents costly electrical supply upgrades (save £20-100k+)</li>
                <li>Reduces peak demand charges by 20-40%</li>
                <li>Enables 2-3× more charge points within existing capacity</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            DLM Hardware and Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective DLM requires accurate current monitoring and robust control systems.
              Component selection depends on installation size and accuracy requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CT Clamp Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Non-intrusive:</strong> Install on existing cables</li>
                  <li><strong>Accuracy:</strong> Class 1 or better required</li>
                  <li><strong>Ratios:</strong> 100:5A, 200:5A, 400:5A</li>
                  <li><strong>Split-core:</strong> For retrofit installations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DLM Controller</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Processing:</strong> ARM Cortex or equivalent</li>
                  <li><strong>Comms:</strong> Ethernet, WiFi, 4G, RS485</li>
                  <li><strong>Rating:</strong> IP54 indoor, IP65 outdoor</li>
                  <li><strong>Certification:</strong> CE, BS EN 61010</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Communication Protocols:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OCPP:</strong> Industry standard for charge point control</li>
                <li><strong>Modbus:</strong> Industrial protocol for meter integration</li>
                <li><strong>MQTT:</strong> Lightweight IoT messaging</li>
                <li><strong>REST APIs:</strong> Third-party system integration</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Load Allocation Algorithms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different allocation strategies suit different applications. Algorithm selection
              depends on fairness requirements, charging priorities, and user expectations.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Equal</p>
                <p className="text-white text-xs">Fair split</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Priority</p>
                <p className="text-white text-xs">Weighted allocation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">First-Come</p>
                <p className="text-white text-xs">Sequential</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equal Distribution</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Formula:</strong> Available ÷ Active sessions</li>
                  <li><strong>Pro:</strong> Simple, fair, predictable</li>
                  <li><strong>Con:</strong> May not optimise throughput</li>
                  <li><strong>Use:</strong> Workplace, residential</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Priority-Weighted</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Factors:</strong> SoC, departure time, user tier</li>
                  <li><strong>Pro:</strong> Optimises for urgent needs</li>
                  <li><strong>Con:</strong> More complex to configure</li>
                  <li><strong>Use:</strong> Fleet, premium services</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Configuration Parameters</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Maximum import capacity:</strong> Total available supply</li>
                <li><strong>Base load allocation:</strong> Reserved for building operations</li>
                <li><strong>Safety margin:</strong> 5-10% headroom to prevent overload</li>
                <li><strong>Minimum charging power:</strong> Typically 6A (1.4kW) per session</li>
                <li><strong>Monitoring interval:</strong> 1-60 seconds depending on response needs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong CT ratio:</strong> — Results in incorrect load readings</li>
                <li><strong>No safety margin:</strong> — System may trip on load spikes</li>
                <li><strong>Poor communication:</strong> — Delayed response to load changes</li>
                <li><strong>Missing fail-safe:</strong> — No backup if DLM fails</li>
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
              <p className="font-medium text-white mb-1">Hardware Requirements</p>
              <ul className="space-y-0.5">
                <li>CT accuracy: Class 1 minimum</li>
                <li>Controller: IP54/IP65 rated</li>
                <li>Comms: OCPP, Modbus, MQTT</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Typical Settings</p>
              <ul className="space-y-0.5">
                <li>Safety margin: 5-10%</li>
                <li>Minimum power: 6A (1.4kW)</li>
                <li>Response time: &lt;5 seconds</li>
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
            <Link to="/electrician/upskilling/ev-charging-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-5-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule5Section1;