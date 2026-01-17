import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m1s3-check1",
    question: "Which of the following is a passive network component?",
    options: ["Network switch", "Patch panel", "Router", "Access point"],
    correctIndex: 1,
    explanation: "A patch panel is a passive component - it provides physical connection points but doesn't process or amplify signals. Switches, routers, and access points are all active components requiring power."
  },
  {
    id: "datacabling-m1s3-check2",
    question: "What is the typical lifespan of passive cabling infrastructure?",
    options: ["3-5 years", "5-10 years", "15-25 years", "30-40 years"],
    correctIndex: 2,
    explanation: "Passive cabling infrastructure typically lasts 15-25 years when properly installed, outlasting multiple generations of active equipment that typically needs replacement every 3-7 years."
  },
  {
    id: "datacabling-m1s3-check3",
    question: "Why do active components require more maintenance than passive?",
    options: [
      "They are physically larger",
      "They require power, cooling, and firmware updates",
      "They use more expensive materials",
      "They have more connectors"
    ],
    correctIndex: 1,
    explanation: "Active components require power, cooling, firmware updates, monitoring, and eventual replacement. Passive components have no moving parts or software, requiring minimal maintenance."
  }
];

const faqs = [
  {
    question: "When should I choose passive components over active ones?",
    answer: "Choose passive components when you need maximum reliability, minimal maintenance, operation without power, or deployment in harsh environments. They're ideal for foundational infrastructure that needs to last 15-25 years."
  },
  {
    question: "What are the ongoing costs of active vs passive components?",
    answer: "Passive components have minimal ongoing costs after installation. Active components require power, cooling, firmware updates, monitoring, and periodic replacement every 3-7 years, making their total cost of ownership higher."
  },
  {
    question: "Can I mix passive and active approaches in the same network?",
    answer: "Yes, and this is recommended. Most modern networks use passive infrastructure (cables, connectors) as the foundation with active components (switches, routers) strategically placed where intelligence and management are needed."
  },
  {
    question: "What happens if active components fail?",
    answer: "Active component failures can disrupt network operations. This is why redundancy planning, backup power, and spare equipment are important. The underlying passive infrastructure usually remains intact and functional."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client wants to minimise network maintenance costs over the next 20 years. What should you emphasise in your design?",
  options: [
    "Use the cheapest active equipment available",
    "High-quality passive infrastructure with strategic active components",
    "All-wireless solution to eliminate cabling",
    "Active components throughout for maximum features"
  ],
  correctAnswer: 1,
  explanation: "High-quality passive infrastructure (cables, patch panels, connectors) will last 15-25 years with minimal maintenance. Active components should be strategically placed where needed, knowing they'll require replacement every 3-7 years."
  }
];

const DataCablingModule1Section3 = () => {
  useSEO({
    title: "Passive vs Active Hardware | Data Cabling Module 1.3",
    description: "Understand the differences between passive and active network components for structured cabling system design."
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
            <Link to="/study-centre/upskilling/data-cabling-module-1">
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
            <span>Module 1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Passive vs Active Hardware
          </h1>
          <p className="text-white/80">
            Understanding network component types and their roles
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Passive:</strong> No power, no processing (cables, panels)</li>
              <li><strong>Active:</strong> Requires power, processes signals (switches)</li>
              <li><strong>Balance:</strong> Passive foundation + strategic active</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Patch panels (passive), switches with LEDs (active)</li>
              <li><strong>Use:</strong> Build on reliable passive, add active where needed</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish passive from active components",
              "Identify common passive components",
              "Understand active component functions",
              "Calculate total cost of ownership",
              "Plan component replacement cycles",
              "Design balanced infrastructure"
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
            Passive Components
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Passive components form the physical foundation of any network. They don't require
              power and don't process signals - they simply provide connection paths.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Passive Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cables:</strong> Copper, fibre optic</li>
                  <li><strong>Patch panels:</strong> Connection points</li>
                  <li><strong>Keystone jacks:</strong> Wall outlets</li>
                  <li><strong>Connectors:</strong> RJ45, LC, SC</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Characteristics</p>
                <ul className="text-sm text-white space-y-1">
                  <li>No power required</li>
                  <li>No signal processing</li>
                  <li>15-25 year lifespan</li>
                  <li>Minimal maintenance</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cables</p>
                <p className="text-white/90 text-xs">Signal pathway</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Panels</p>
                <p className="text-white/90 text-xs">Connection points</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Connectors</p>
                <p className="text-white/90 text-xs">Terminations</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Active Components
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Active components require power and process network signals. They provide
              intelligence, management, and signal regeneration capabilities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Active Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Switches:</strong> Connect devices, forward frames based on MAC addresses</li>
                <li><strong>Routers:</strong> Connect networks, route packets based on IP addresses</li>
                <li><strong>Access points:</strong> Provide wireless connectivity</li>
                <li><strong>Media converters:</strong> Convert between copper and fibre</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Component Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power:</strong> Mains or PoE supply</li>
                <li><strong>Cooling:</strong> Ventilation or air conditioning</li>
                <li><strong>Updates:</strong> Firmware and security patches</li>
                <li><strong>Monitoring:</strong> Performance and fault detection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Total Cost of Ownership
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When comparing passive and active components, consider the total cost of
              ownership over the system's expected lifetime, not just initial purchase cost.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive TCO Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Initial purchase and installation</li>
                  <li>Minimal ongoing maintenance</li>
                  <li>Long replacement cycle (15-25 years)</li>
                  <li>No power consumption</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active TCO Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Initial purchase and configuration</li>
                  <li>Power consumption (continuous)</li>
                  <li>Cooling requirements</li>
                  <li>Replacement cycle (3-7 years)</li>
                </ul>
              </div>
            </div>

            <p>
              High-quality passive infrastructure is a long-term investment. Active components
              should be budgeted for periodic replacement as technology advances.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Principles</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Invest in high-quality passive infrastructure</li>
                <li>Design active component locations for easy access</li>
                <li>Plan power and cooling for active equipment areas</li>
                <li>Document all components for maintenance</li>
                <li>Budget for active component replacement cycles</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cheap cabling:</strong> — Passive infrastructure should outlast active</li>
                <li><strong>No cooling plan:</strong> — Active components generate heat</li>
                <li><strong>Ignoring TCO:</strong> — Initial cost isn't total cost</li>
                <li><strong>No spare capacity:</strong> — Both passive and active need growth room</li>
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
              <p className="font-medium text-white mb-1">Passive Examples</p>
              <ul className="space-y-0.5">
                <li>Cables, patch panels</li>
                <li>Connectors, keystone jacks</li>
                <li>Cable management</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Active Examples</p>
              <ul className="space-y-0.5">
                <li>Switches, routers</li>
                <li>Access points</li>
                <li>Media converters</li>
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
            <Link to="/study-centre/upskilling/data-cabling-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-1-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule1Section3;