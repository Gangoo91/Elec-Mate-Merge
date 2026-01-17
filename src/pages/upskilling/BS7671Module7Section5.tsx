import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m7s5-check1",
    question: "What is a 'prosumer' electrical installation?",
    options: [
      "A professional consumer installation",
      "An installation that both consumes and generates energy",
      "A high-power industrial installation",
      "A temporary event installation"
    ],
    correctIndex: 1,
    explanation: "Prosumer installations both consume energy from the grid and generate/store energy locally (solar PV, batteries, wind). BS 7671 Part 8 addresses these systems."
  },
  {
    id: "bs7671-m7s5-check2",
    question: "What protection is required at the interface between PV system and supply?",
    options: [
      "MCB only",
      "RCD only",
      "Disconnection device and anti-islanding protection",
      "Surge protection only"
    ],
    correctIndex: 2,
    explanation: "Grid-connected generation requires a disconnection device for isolation and anti-islanding protection to prevent energising the grid during outages (G98/G99 requirements)."
  },
  {
    id: "bs7671-m7s5-check3",
    question: "What type of RCD is required for circuits with DC fault currents from inverters?",
    options: ["Type AC", "Type A", "Type B or Type A with DC detection", "Type S"],
    correctIndex: 2,
    explanation: "Inverters can produce DC fault currents that won't trip Type A RCDs. Type B or Type A with built-in DC fault detection is required for the AC side of inverter circuits."
  }
];

const faqs = [
  {
    question: "Can battery storage systems be installed in domestic properties?",
    answer: "Yes, but location and ventilation requirements must be met. Batteries should not be in escape routes, require adequate ventilation for any gases produced, and need appropriate fire detection. Manufacturer guidance is essential."
  },
  {
    question: "What are the G98/G99 requirements?",
    answer: "G98 applies to systems up to 16A per phase (typically <3.68kW single phase), G99 for larger systems. Both require DNO notification, appropriate protection settings, and anti-islanding capability."
  },
  {
    question: "Do I need to isolate PV before working on consumer unit?",
    answer: "Yes, absolutely. PV systems remain energised in daylight regardless of grid connection. AC and DC isolation is required before safe work can commence. Treat all conductors as live until proven dead."
  },
  {
    question: "What labelling is required for prosumer installations?",
    answer: "Warning labels at meter position, consumer unit, and all isolation points indicating presence of dual supplies. Labels must warn that the installation has more than one source of supply."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A solar PV system is being installed on a domestic property. Where must warning labels be positioned?",
  options: [
    "On the inverter only",
    "At meter position, consumer unit, and all points of isolation",
    "On the roof only",
    "At the front door"
  ],
  correctAnswer: 1,
  explanation: "Warning labels indicating dual supply sources must be placed at the meter position, consumer unit, and all isolation points to alert anyone working on the installation to the presence of generation equipment."
  }
];

const BS7671Module7Section5 = () => {
  useSEO({
    title: "Prosumer Electrical Installations | BS7671 Module 7.5",
    description: "Learn BS 7671 Part 8 requirements for prosumer installations including solar PV, battery storage, and grid integration."
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
            <Link to="/study-centre/upskilling/bs7671-module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Prosumer Electrical Installations
          </h1>
          <p className="text-white/80">
            BS 7671 Part 8 - Generation, storage, and grid integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part 8:</strong> New section for prosumer installations</li>
              <li><strong>Prosumer:</strong> Consume + generate energy</li>
              <li><strong>Key:</strong> Anti-islanding, labelling, isolation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Solar PV, battery storage, wind turbines, EVs with V2G</li>
              <li><strong>Use:</strong> Type B RCDs, G98/G99 compliance, dual-source labels</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Prosumer installation fundamentals",
              "Solar PV system requirements",
              "Battery energy storage systems (BESS)",
              "Grid connection requirements (G98/G99)",
              "Protection coordination for generation",
              "Labelling and safe isolation procedures"
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
            Understanding Prosumer Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The term "prosumer" combines producer and consumer. These installations can both
              draw power from the grid and export locally generated energy back to it.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generation Sources</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Solar PV:</strong> Photovoltaic panels</li>
                  <li><strong>Wind:</strong> Small-scale turbines</li>
                  <li><strong>Micro-hydro:</strong> Water turbines</li>
                  <li><strong>CHP:</strong> Combined heat and power</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Storage Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Lithium-ion:</strong> Most common domestic</li>
                  <li><strong>Lead-acid:</strong> Traditional, lower cost</li>
                  <li><strong>Flow batteries:</strong> Large scale</li>
                  <li><strong>V2G:</strong> Vehicle-to-grid (future)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3.68kW</p>
                <p className="text-white/90 text-xs">G98 single phase limit</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">11.04kW</p>
                <p className="text-white/90 text-xs">G98 three phase limit</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">&gt;16A/phase</p>
                <p className="text-white/90 text-xs">G99 required</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Grid Connection and Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Grid-connected generation systems must meet DNO requirements and include specific
              protection to prevent unsafe conditions during grid faults or maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Anti-Islanding Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Prevents generation energising dead grid</li>
                <li>Protects linesmen working on "dead" network</li>
                <li>Built into compliant inverters</li>
                <li>Must disconnect within 0.5 seconds of loss of mains</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">G98 Requirements (≤16A/phase):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Notification:</strong> Inform DNO within 28 days</li>
                <li><strong>Protection:</strong> Type-tested inverter with G98 certificate</li>
                <li><strong>Metering:</strong> Export meter may be required</li>
                <li><strong>No DNO approval:</strong> Just notification for compliant systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">G99 Requirements (&gt;16A/phase):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Application:</strong> Apply to DNO before installation</li>
                <li><strong>Studies:</strong> Network impact assessment may be required</li>
                <li><strong>Commissioning:</strong> Witnessed testing may be required</li>
                <li><strong>Protection settings:</strong> DNO-specified parameters</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protection and RCD Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inverter-based generation can produce DC fault currents that standard RCDs won't
              detect. Correct RCD selection is critical for safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Types Explained</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type AC:</strong> AC faults only (NOT suitable)</li>
                  <li><strong>Type A:</strong> AC + pulsating DC</li>
                  <li><strong>Type B:</strong> AC + DC + smooth DC</li>
                  <li><strong>Type F:</strong> Mixed frequency faults</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Type B</p>
                <ul className="text-sm text-white space-y-1">
                  <li>AC side of PV inverters (unless internal protection)</li>
                  <li>Battery inverter/charger circuits</li>
                  <li>Variable speed drives</li>
                  <li>Any circuit with DC fault potential</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Surge Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>SPD Type 2 recommended at consumer unit</li>
                <li>DC side SPD at inverter/combiner box</li>
                <li>Lightning exposure assessment for roof installations</li>
                <li>SPD backup protection coordination</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Battery Storage Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery Energy Storage Systems (BESS) are increasingly common in domestic and
              commercial installations. They present specific safety considerations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Location</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Not in escape routes</li>
                  <li>Adequate ventilation</li>
                  <li>Temperature controlled environment</li>
                  <li>Fire detection in vicinity</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Battery Management System (BMS)</li>
                  <li>Over-temperature protection</li>
                  <li>Over-charge/discharge protection</li>
                  <li>Cell balancing</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DC Isolation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolator accessible without removing covers</li>
                <li>Clearly labelled "DC ISOLATOR"</li>
                <li>Load-break rated for battery discharge current</li>
                <li>Lockable off position recommended</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Labelling and Safe Isolation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Prosumer installations require comprehensive labelling to warn of multiple energy
              sources and ensure safe isolation procedures are followed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Warning Labels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Meter position:</strong> "DUAL SUPPLY - ISOLATE PV/BATTERY"</li>
                <li><strong>Consumer unit:</strong> Warning of generation source</li>
                <li><strong>Inverter:</strong> DC voltage warning</li>
                <li><strong>Roof:</strong> Solar panel installation warning</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safe Isolation Procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Isolate AC supply at consumer unit</li>
                <li>2. Isolate DC supply at inverter/combiner</li>
                <li>3. Isolate battery (if present)</li>
                <li>4. Lock off all isolation points</li>
                <li>5. Prove dead at point of work</li>
                <li>6. Remember: PV generates in daylight regardless of isolation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify G98/G99 requirements and notify/apply to DNO</li>
                <li>Select appropriate RCD type (Type B or A+DC detection)</li>
                <li>Install compliant inverter with anti-islanding</li>
                <li>Provide all required warning labels</li>
                <li>Document isolation procedure and provide to client</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong RCD type:</strong> — Using Type A where Type B required</li>
                <li><strong>Missing labels:</strong> — Not warning of dual supplies</li>
                <li><strong>No DC isolation:</strong> — Forgetting DC side during maintenance</li>
                <li><strong>DNO notification:</strong> — Failing to notify within 28 days</li>
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
              <p className="font-medium text-white mb-1">Key Regulations</p>
              <ul className="space-y-0.5">
                <li>BS 7671 Part 8</li>
                <li>G98 / G99 (DNO requirements)</li>
                <li>MCS standards (certification)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Values</p>
              <ul className="space-y-0.5">
                <li>G98 limit: 16A per phase</li>
                <li>Anti-island: 0.5s disconnect</li>
                <li>DNO notify: within 28 days</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-7-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-8">
              Module 8
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module7Section5;