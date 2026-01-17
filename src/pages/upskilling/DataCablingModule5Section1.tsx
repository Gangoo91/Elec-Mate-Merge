import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m5s1-check1",
    question: "What type of wire conductor is used in permanent horizontal cabling?",
    options: ["Stranded copper", "Solid copper", "Aluminium", "Copper-clad steel"],
    correctIndex: 1,
    explanation: "Solid copper conductors are used in permanent horizontal cabling for better electrical performance and stability. Stranded conductors are used in patch cords for flexibility."
  },
  {
    id: "datacabling-m5s1-check2",
    question: "What is the maximum untwist length allowed when terminating Cat 6A cable?",
    options: ["25mm", "13mm", "8mm", "50mm"],
    correctIndex: 1,
    explanation: "Cat 6A requires a maximum untwist of 13mm (½ inch) at termination points to maintain the cable's high-frequency performance up to 500MHz."
  },
  {
    id: "datacabling-m5s1-check3",
    question: "Which termination standard places the green pair on pins 3 and 6?",
    options: ["T568A", "T568B", "Both standards", "Neither standard"],
    correctIndex: 0,
    explanation: "T568A places the green pair (pins 3,6) as the second pair. T568B places the orange pair on these pins. Most installations use T568B, but T568A is required for US government contracts."
  }
];

const faqs = [
  {
    question: "What's the difference between T568A and T568B wiring?",
    answer: "T568A and T568B differ only in the position of the orange and green pairs. T568B (orange on pins 1,2) is more common in commercial installations. T568A is required for US government and some residential work. Consistency matters more than which standard you choose."
  },
  {
    question: "Why is maintaining pair twist so important?",
    answer: "The twist in cable pairs provides crosstalk cancellation. Each pair has a unique twist rate to minimize interference between pairs. Untwisting cable beyond the allowed limit degrades NEXT and FEXT performance, potentially causing the link to fail certification."
  },
  {
    question: "Do I need different tools for Cat 5e vs Cat 6A termination?",
    answer: "While many tools work for both, Cat 6A termination benefits from high-precision tools. Look for impact tools with adjustable force, cable strippers designed for the specific cable diameter, and termination fixtures that maintain pair separation during the process."
  },
  {
    question: "How do I know if my termination is good?",
    answer: "Visual inspection should show consistent conductor seating, minimal untwist, and proper jacket retention. However, certification testing with a cable analyser is the only way to verify electrical performance meets category requirements."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A newly terminated Cat 6A link fails NEXT testing at 400MHz. What is the most likely cause?",
  options: [
    "Cable is too long",
    "Excessive untwist at termination points",
    "Wrong cable category used",
    "Connector contacts are corroded"
  ],
  correctAnswer: 1,
  explanation: "High-frequency NEXT failures are typically caused by excessive untwist at termination points. The twist rate provides crosstalk cancellation, and removing too much twist degrades this protection, especially at higher frequencies."
  }
];

const DataCablingModule5Section1 = () => {
  useSEO({
    title: "Copper Termination Tools and Techniques | Data Cabling Module 5.1",
    description: "Professional tools and methods for achieving consistent, high-quality copper cable terminations in structured cabling systems."
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
            <Link to="/study-centre/upskilling/data-cabling-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
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
            Copper Termination Tools and Techniques
          </h1>
          <p className="text-white/80">
            Professional methods for consistent, high-quality terminations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>T568A/B:</strong> Wiring standards for RJ45 termination</li>
              <li><strong>Untwist limit:</strong> 13mm for Cat 6A, 25mm for Cat 5e</li>
              <li><strong>Key tools:</strong> Impact tool, stripper, cable tester</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Blue/white, orange/white, green/white, brown/white pairs</li>
              <li><strong>Use:</strong> Maintain twist as close to termination point as possible</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate termination tools",
              "Apply T568A and T568B standards",
              "Maintain cable twist during termination",
              "Use punch-down and crimp techniques",
              "Test terminations for quality",
              "Troubleshoot common termination issues"
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
            Essential Termination Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional copper termination requires the right tools for consistent, reliable results.
              Quality tools pay for themselves through reduced re-work and faster testing pass rates.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Punch-Down Tools</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Impact tool:</strong> 110/66 blade for patch panels and keystones</li>
                  <li><strong>Adjustable force:</strong> Prevents over-punching thin conductors</li>
                  <li><strong>Blade types:</strong> 110 (most common), 66, Krone, BIX</li>
                  <li><strong>Quality indicator:</strong> Sharp blade cut, no conductor damage</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Preparation Tools</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cable stripper:</strong> Adjustable blade depth for jacket removal</li>
                  <li><strong>Pair separator:</strong> Maintains twist during cable dressing</li>
                  <li><strong>Scissors/snips:</strong> Flush cutting for clean terminations</li>
                  <li><strong>Cable comb:</strong> Organises pairs for plug termination</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Impact Tool</p>
                <p className="text-white/90 text-xs">Punch-down connections</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Crimp Tool</p>
                <p className="text-white/90 text-xs">RJ45 plug termination</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cable Tester</p>
                <p className="text-white/90 text-xs">Verify wiremap</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wiring Standards: T568A vs T568B
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              T568A and T568B define the pin assignments for RJ45 terminations. Both provide
              identical electrical performance - consistency throughout an installation is what matters.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">T568A Pin Assignment</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Pin 1:</strong> White/Green</li>
                  <li><strong>Pin 2:</strong> Green</li>
                  <li><strong>Pin 3:</strong> White/Orange</li>
                  <li><strong>Pin 4:</strong> Blue</li>
                  <li><strong>Pin 5:</strong> White/Blue</li>
                  <li><strong>Pin 6:</strong> Orange</li>
                  <li><strong>Pin 7:</strong> White/Brown</li>
                  <li><strong>Pin 8:</strong> Brown</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">T568B Pin Assignment</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Pin 1:</strong> White/Orange</li>
                  <li><strong>Pin 2:</strong> Orange</li>
                  <li><strong>Pin 3:</strong> White/Green</li>
                  <li><strong>Pin 4:</strong> Blue</li>
                  <li><strong>Pin 5:</strong> White/Blue</li>
                  <li><strong>Pin 6:</strong> Green</li>
                  <li><strong>Pin 7:</strong> White/Brown</li>
                  <li><strong>Pin 8:</strong> Brown</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to use each standard:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>T568B:</strong> Most commercial installations, industry preference</li>
                <li><strong>T568A:</strong> US government contracts, some residential standards</li>
                <li><strong>Crossover:</strong> T568A one end, T568B other (rarely needed today)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Termination Technique and Quality
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper termination technique directly impacts cable performance. The key is maintaining
              the cable's pair twist as close to the termination point as possible.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Untwist Lengths:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Category 5e:</strong> 25mm (1 inch) maximum untwist</li>
                <li><strong>Category 6:</strong> 13mm (½ inch) maximum untwist</li>
                <li><strong>Category 6A:</strong> 13mm (½ inch) maximum untwist</li>
                <li><strong>Category 8:</strong> 6mm (¼ inch) maximum untwist</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Punch-Down Best Practices</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use appropriate blade type for IDC</li>
                  <li>Position pairs according to colour code</li>
                  <li>Keep pairs twisted until last moment</li>
                  <li>Ensure clean cut on conductor trim</li>
                  <li>Verify seating with visual inspection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RJ45 Plug Crimping</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use load bar or wire guide for alignment</li>
                  <li>Ensure all conductors reach end of plug</li>
                  <li>Maintain pair order through load bar</li>
                  <li>Full crimp with quality tool</li>
                  <li>Test every termination immediately</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Prepare more cable length than needed - you can always trim</li>
                <li>Mark cable jacket with standard used (A or B) during installation</li>
                <li>Keep spare blades for impact tools - dull blades cause failures</li>
                <li>Practice on scrap cable when learning new connectors</li>
                <li>Document any non-standard terminations clearly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Excessive untwist:</strong> — Degrades NEXT/FEXT performance</li>
                <li><strong>Split pairs:</strong> — Wire from different pairs on same terminal</li>
                <li><strong>Reversed pairs:</strong> — Polarity reversal within a pair</li>
                <li><strong>Short conductors:</strong> — Don't reach contact in plug</li>
                <li><strong>Jacket in plug:</strong> — Prevents proper strain relief</li>
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
              <p className="font-medium text-white mb-1">T568B (Most Common)</p>
              <ul className="space-y-0.5">
                <li>Pin 1-2: Orange pair</li>
                <li>Pin 3-6: Green pair</li>
                <li>Pin 4-5: Blue pair</li>
                <li>Pin 7-8: Brown pair</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Max Untwist</p>
              <ul className="space-y-0.5">
                <li>Cat 5e: 25mm</li>
                <li>Cat 6/6A: 13mm</li>
                <li>Cat 8: 6mm</li>
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
            <Link to="/study-centre/upskilling/data-cabling-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/data-cabling-module-5-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule5Section1;