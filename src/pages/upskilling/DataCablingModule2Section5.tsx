import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m2s5-check1",
    question: "What is the maximum pulling tension for Category 6 UTP cable?",
    options: ["110N (25 lbf)", "220N (50 lbf)", "330N (75 lbf)", "440N (100 lbf)"],
    correctIndex: 0,
    explanation: "Category 6 UTP cable has a maximum pulling tension of 110N (25 lbf) to prevent damage to internal conductors and maintain twist rates."
  },
  {
    id: "datacabling-m2s5-check2",
    question: "According to BS7671, what is the minimum separation between data cables and 230V power cables?",
    options: ["50mm", "100mm", "200mm", "300mm"],
    correctIndex: 3,
    explanation: "BS7671 requires minimum 300mm separation between data cables and 230V power cables to prevent electromagnetic interference, unless segregated containment is used."
  },
  {
    id: "datacabling-m2s5-check3",
    question: "What is the maximum recommended bundle size for Category 6A cables?",
    options: ["12 cables", "24 cables", "36 cables", "48 cables"],
    correctIndex: 1,
    explanation: "Category 6A cables should be limited to bundles of 24 cables maximum to control alien crosstalk (ANEXT) between cables."
  }
];

const faqs = [
  {
    question: "Can I install data cables in the same conduit as power cables?",
    answer: "Generally no - data and power should be in separate containment systems to prevent EMI. If shared containment is unavoidable, use screened data cables and maintain maximum practical separation within the enclosure."
  },
  {
    question: "What's the best way to cross power cables with data cables?",
    answer: "Cross at 90-degree angles to minimise electromagnetic coupling. Avoid parallel runs wherever possible. Where parallel runs are necessary, maintain the required separation distance (300mm for 230V) or use metallic barriers."
  },
  {
    question: "How do I protect cables in harsh environments?",
    answer: "Use appropriate containment (conduit, trunking) with suitable IP ratings. Consider UV-resistant cables for outdoor use, armoured cables for mechanical protection, and LSZH jackets for fire safety in enclosed spaces."
  },
  {
    question: "What documentation should I provide after installation?",
    answer: "Provide as-built drawings, cable schedules, test results/certifications for all links, warranty information, labelling schemes, and maintenance recommendations. This documentation is essential for ongoing support and future modifications."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A cable run passes near a large motor and VFD. The data cables are experiencing intermittent errors. What is the most effective solution?",
  options: [
    "Increase cable category to Cat6A",
    "Reduce cable length",
    "Re-route cables to maintain separation or use shielded cables",
    "Add more network switches"
  ],
  correctAnswer: 2,
  explanation: "Motors and VFDs are significant EMI sources. The most effective solution is to re-route cables to maintain adequate separation (300mm+) from EMI sources, or use shielded cables with proper grounding if re-routing isn't possible."
  }
];

const DataCablingModule2Section5 = () => {
  useSEO({
    title: "Installation Methods and Best Practices | Data Cabling Module 2.5",
    description: "Learn professional cable installation techniques, routing methods, separation requirements, and safety practices for data cabling."
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
            <Link to="/study-centre/upskilling/data-cabling-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
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
            Installation Methods and Best Practices
          </h1>
          <p className="text-white/80">
            Professional installation techniques and safety requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Pulling:</strong> Max 110N tension for UTP cables</li>
              <li><strong>Separation:</strong> 300mm from 230V power cables</li>
              <li><strong>Bundles:</strong> Max 24 cables for Cat6A</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cable tray routing near electrical equipment</li>
              <li><strong>Use:</strong> Plan routes before installation begins</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan efficient cable routes",
              "Apply proper installation methods",
              "Implement cable support systems",
              "Understand separation requirements",
              "Follow safe working practices",
              "Conduct installation testing"
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
            Cable Installation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional cable installation requires appropriate containment systems, proper
              support, and careful handling to maintain cable performance throughout its lifespan.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Containment Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Conduit:</strong> Maximum protection, EMI shielding</li>
                  <li><strong>Trunking:</strong> Easy access, higher capacity</li>
                  <li><strong>Cable tray:</strong> Ventilation, visible inspection</li>
                  <li><strong>Basket tray:</strong> Lighter loads, good airflow</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Support Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Horizontal:</strong> Every 1.5-2 metres</li>
                  <li><strong>Vertical:</strong> Support at each floor</li>
                  <li><strong>Changes:</strong> Support before/after bends</li>
                  <li><strong>Transition:</strong> Support at containment changes</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Conduit</p>
                <p className="text-white/90 text-xs">Best protection</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Trunking</p>
                <p className="text-white/90 text-xs">Easy access</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cable Tray</p>
                <p className="text-white/90 text-xs">High capacity</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Separation and EMI
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper separation between data and power cables is essential to prevent electromagnetic
              interference. BS7671 specifies minimum distances based on voltage levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS7671 Separation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Low voltage (&lt;50V):</strong> 50mm minimum separation</li>
                <li><strong>230V single phase:</strong> 300mm minimum separation</li>
                <li><strong>400V three phase:</strong> 300mm minimum separation</li>
                <li><strong>Shared containment:</strong> Use metallic barrier or screen</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common EMI Sources</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electric motors</li>
                  <li>Variable frequency drives (VFDs)</li>
                  <li>Fluorescent lighting</li>
                  <li>Welding equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EMI Mitigation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Maintain physical separation</li>
                  <li>Cross power at 90 degrees</li>
                  <li>Use shielded cables if needed</li>
                  <li>Metallic containment for screening</li>
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
            Cable Pulling and Handling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper cable pulling techniques prevent installation damage and ensure long-term
              performance of the network infrastructure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pulling Limits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cat5e/Cat6 UTP:</strong> 110N (25 lbf) maximum tension</li>
                <li><strong>Cat6A:</strong> Follow manufacturer spec (varies by cable)</li>
                <li><strong>Bend radius:</strong> Minimum 4x cable diameter during pull</li>
                <li><strong>Bundle size:</strong> Maximum 24 cables for Cat6A</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plan routes:</strong> Identify obstacles before starting</li>
                <li><strong>Use rollers:</strong> Reduce friction at corners</li>
                <li><strong>Lubricant:</strong> Approved cable lubricant for long runs</li>
                <li><strong>Steady pull:</strong> Consistent speed, no jerking</li>
                <li><strong>Communication:</strong> Clear signals between team members</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey route and identify potential obstacles</li>
                <li>Check separation from power cables and EMI sources</li>
                <li>Verify containment capacity for cable count</li>
                <li>Plan support locations before installation</li>
                <li>Test cables after installation - certify all links</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-tensioning:</strong> — Exceeding 110N damages cable</li>
                <li><strong>Tight bundles:</strong> — Large bundles increase alien crosstalk</li>
                <li><strong>Sharp bends:</strong> — Less than 4x diameter degrades performance</li>
                <li><strong>No testing:</strong> — Always certify before handover</li>
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
              <p className="font-medium text-white mb-1">Installation Limits</p>
              <ul className="space-y-0.5">
                <li>Max tension: 110N (25 lbf)</li>
                <li>Min bend: 4x diameter</li>
                <li>Bundle: Max 24 (Cat6A)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Separation (230V)</p>
              <ul className="space-y-0.5">
                <li>Open: 300mm minimum</li>
                <li>Metallic barrier: Can reduce</li>
                <li>Cross at: 90 degrees</li>
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
            <Link to="/study-centre/upskilling/data-cabling-module-2-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-3">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule2Section5;