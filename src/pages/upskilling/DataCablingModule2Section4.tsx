import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m2s4-check1",
    question: "What is the correct wire sequence for T568B termination?",
    options: [
      "White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown",
      "White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown",
      "Orange, White/Orange, Green, White/Green, Blue, White/Blue, Brown, White/Brown",
      "White/Orange, Orange, White/Green, Green, White/Blue, Blue, White/Brown, Brown"
    ],
    correctIndex: 0,
    explanation: "T568B standard uses: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown sequence. This is the most common standard in commercial installations."
  },
  {
    id: "datacabling-m2s4-check2",
    question: "What is the maximum untwisted cable length for Category 6 termination?",
    options: ["6mm", "13mm", "19mm", "25mm"],
    correctIndex: 1,
    explanation: "Category 6 cable should have no more than 13mm (0.5 inches) of untwisted pairs at termination to maintain performance specifications."
  },
  {
    id: "datacabling-m2s4-check3",
    question: "What is the purpose of a load bar in RJ45 connectors?",
    options: [
      "To improve cable strain relief",
      "To maintain proper pair separation",
      "To reduce insertion loss",
      "To prevent water ingress"
    ],
    correctIndex: 1,
    explanation: "The load bar maintains proper pair separation and reduces crosstalk by keeping wire pairs in the correct positions throughout the connector."
  }
];

const faqs = [
  {
    question: "When should I use T568A vs T568B wiring standard?",
    answer: "T568B is more common in commercial installations and matches older AT&T standards. T568A is the preferred standard for new installations per TIA/EIA. The critical rule is consistency - use the same standard throughout the entire installation."
  },
  {
    question: "What's the difference between 110 and Krone IDC termination?",
    answer: "Both are insulation displacement connection (IDC) systems but use different blade designs. 110 is the US/TIA standard while Krone is European. They're not interchangeable - you must use the correct punch-down tool for each type."
  },
  {
    question: "Can I reuse RJ45 connectors if I make a termination mistake?",
    answer: "No, RJ45 connectors are single-use. Once crimped, the contacts are permanently deformed. Attempting to reuse them will result in intermittent connections or complete failures. Always use a new connector."
  },
  {
    question: "Why do modular jack patch panels perform better than 110 blocks?",
    answer: "Modular jack panels use keystone jacks that maintain better pair geometry and shorter untwisted lengths. They're easier to test and replace individually. For Cat6 and Cat6A, this improved geometry is essential for meeting performance specifications."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "During termination inspection, you notice 20mm of untwisted cable at a Cat6A keystone jack. What action should you take?",
  options: [
    "Accept it - Cat6A has more tolerance",
    "Re-terminate with maximum 13mm untwist",
    "Add extra cable ties to secure it",
    "Test it first before deciding"
  ],
  correctAnswer: 1,
  explanation: "Cat6A actually requires stricter termination than Cat6, not more tolerance. Maximum untwist should be around 13mm or less. Re-termination is required to meet performance specifications."
  }
];

const DataCablingModule2Section4 = () => {
  useSEO({
    title: "Connectors and Patch Panels | Data Cabling Module 2.4",
    description: "Learn RJ45 connector types, patch panel selection, and professional termination techniques for structured cabling installations."
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
            <Link to="../data-cabling-module-2">
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
            <span>Module 2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Connectors and Patch Panels
          </h1>
          <p className="text-white/80">
            Professional termination techniques and hardware
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RJ45:</strong> 8P8C modular connector for Ethernet</li>
              <li><strong>T568A/B:</strong> Wiring standards - be consistent</li>
              <li><strong>Untwist:</strong> Maximum 13mm for Cat6/6A</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Category marking on connectors and panels</li>
              <li><strong>Use:</strong> Match connector category to cable category</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify RJ45 connector types and categories",
              "Understand T568A and T568B wiring standards",
              "Select appropriate patch panel types",
              "Apply proper termination techniques",
              "Implement cable management strategies",
              "Troubleshoot termination issues"
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
            RJ45 Connectors and Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RJ45 connectors (technically 8P8C modular plugs) are the standard interface for
              Ethernet networks. Connector quality and proper termination directly impact performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connector Categories</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cat5e:</strong> Standard 8P8C, 100MHz</li>
                  <li><strong>Cat6:</strong> Enhanced design with load bar</li>
                  <li><strong>Cat6A:</strong> Larger body, 500MHz rated</li>
                  <li><strong>Shielded:</strong> Metal housing for STP/FTP</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>T568A:</strong> Preferred for new installations</li>
                  <li><strong>T568B:</strong> More common, AT&T compatible</li>
                  <li><strong>Crossover:</strong> T568A one end, T568B other</li>
                  <li><strong>Consistency:</strong> Use same standard throughout</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Pin 1-2</p>
                <p className="text-white/90 text-xs">Orange pair (T568B)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Pin 3-6</p>
                <p className="text-white/90 text-xs">Green pair (T568B)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Pin 4-5</p>
                <p className="text-white/90 text-xs">Blue pair (both)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Patch Panel Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Patch panels provide organised termination points for horizontal cabling. Panel type
              selection affects both performance and ease of maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Patch Panel Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>110 IDC:</strong> Insulation displacement, high density, tool-dependent</li>
                <li><strong>Krone IDC:</strong> European standard, similar to 110</li>
                <li><strong>Modular Jack:</strong> Keystone compatible, best for Cat6/6A</li>
                <li><strong>Angled:</strong> Better cable management, reduced strain</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">110 IDC Panels</p>
                <ul className="text-sm text-white space-y-1">
                  <li>High port density</li>
                  <li>Lower cost per port</li>
                  <li>Requires punch-down tool</li>
                  <li>Good for Cat5e applications</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modular Jack Panels</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Easy port replacement</li>
                  <li>Better high-frequency performance</li>
                  <li>Individual testing possible</li>
                  <li>Preferred for Cat6/6A</li>
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
            Termination Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper termination technique directly impacts network performance. Following established
              procedures ensures consistent, reliable connections.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RJ45 Termination Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Strip jacket:</strong> Remove correct length (typically 25-30mm)</li>
                <li><strong>2. Arrange pairs:</strong> Follow T568A or T568B sequence</li>
                <li><strong>3. Minimise untwist:</strong> Maximum 13mm for Cat6</li>
                <li><strong>4. Trim conductors:</strong> Cut to equal length</li>
                <li><strong>5. Insert fully:</strong> Conductors must reach connector end</li>
                <li><strong>6. Crimp properly:</strong> Use quality ratchet crimping tool</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Control:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Visual check:</strong> Verify wire sequence through connector</li>
                <li><strong>Strain relief:</strong> Jacket must enter connector body</li>
                <li><strong>Wire map test:</strong> Verify continuity and correct pairing</li>
                <li><strong>Performance test:</strong> Certify to category standard</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Standards</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use category-matched connectors for all terminations</li>
                <li>Maintain consistent wiring standard throughout installation</li>
                <li>Label all connections clearly and systematically</li>
                <li>Implement proper cable management in racks</li>
                <li>Document test results for warranty compliance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Excessive untwisting:</strong> — Degrades crosstalk performance</li>
                <li><strong>Wrong connector category:</strong> — Cat5e connector on Cat6 cable</li>
                <li><strong>Inconsistent standards:</strong> — Mixed T568A and T568B</li>
                <li><strong>Poor crimping:</strong> — Intermittent or failed connections</li>
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
              <p className="font-medium text-white mb-1">T568B Sequence</p>
              <ul className="space-y-0.5">
                <li>1: W/Orange, 2: Orange</li>
                <li>3: W/Green, 4: Blue</li>
                <li>5: W/Blue, 6: Green</li>
                <li>7: W/Brown, 8: Brown</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Termination Limits</p>
              <ul className="space-y-0.5">
                <li>Max untwist: 13mm (Cat6)</li>
                <li>Min bend: 4x diameter</li>
                <li>Jacket into connector: Yes</li>
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
            <Link to="../data-cabling-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-2-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule2Section4;