import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Connector Types and Polish Grades | Data Cabling Module 3.2";
const DESCRIPTION = "Learn fibre optic connector types (LC, SC, ST), polish grades (PC, UPC, APC), and professional termination techniques.";

const quickCheckQuestions = [
  {
    id: "datacabling-m3s2-check1",
    question: "What is the typical return loss specification for APC connectors?",
    options: ["14 dB", "26 dB", "40 dB", "60 dB"],
    correctIndex: 3,
    explanation: "APC (Angled Physical Contact) connectors typically achieve return loss of 60 dB or better due to the 8-degree angled polish."
  },
  {
    id: "datacabling-m3s2-check2",
    question: "Which connector type is standard for singlemode applications in modern installations?",
    options: ["ST", "SC", "LC", "FC"],
    correctIndex: 2,
    explanation: "LC connectors are the current standard for singlemode applications due to their small form factor and excellent performance."
  },
  {
    id: "datacabling-m3s2-check3",
    question: "Which polish type should NEVER be mated with PC or UPC connectors?",
    options: ["PC", "UPC", "APC", "Any can be mixed"],
    correctIndex: 2,
    explanation: "APC (Angled Physical Contact) connectors should never be mated with PC or UPC connectors due to the angled polish causing permanent damage."
  }
];

const faqs = [
  {
    question: "How do I identify APC vs UPC connectors?",
    answer: "APC connectors always have green boots/bodies, while UPC connectors have blue boots. This colour coding is an industry standard - never ignore it. Mating APC with UPC causes permanent damage to both connectors."
  },
  {
    question: "When should I choose APC over UPC connectors?",
    answer: "Use APC for high-performance singlemode applications requiring minimal back reflections, such as CATV distribution, broadcast systems, analytical equipment, and long-haul transmission. UPC is suitable for most standard data network applications."
  },
  {
    question: "What ferrule material is best for fibre connectors?",
    answer: "Ceramic (zirconia) ferrules provide the best performance and durability for most applications. Plastic ferrules are lower cost but have reduced durability and repeatability. For high-performance applications, always specify ceramic ferrules."
  },
  {
    question: "How many times can I mate and unmate a fibre connector?",
    answer: "High-quality connectors are typically rated for 500-1000 mating cycles. Each cycle slightly degrades performance. Always use protective caps when not in use, and clean before every mating to maximise connector life."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client requires connectors for a CATV distribution system where minimising back reflections is critical. Which connector polish should you specify?",
  options: [
    "PC (Physical Contact)",
    "UPC (Ultra Physical Contact)",
    "APC (Angled Physical Contact)",
    "Any polish type is suitable"
  ],
  correctAnswer: 2,
  explanation: "APC connectors achieve 60+ dB return loss compared to 50-55 dB for UPC. For CATV and broadcast applications where back reflections cause picture degradation, APC is essential."
  }
];

const DataCablingModule3Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/electrician/upskilling/data-cabling-module-3">
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
            <span>Module 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Connector Types and Polish Grades
          </h1>
          <p className="text-white/80">
            Fibre optic connectors and termination quality
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>LC:</strong> Modern standard, small form factor</li>
              <li><strong>UPC:</strong> Blue boots, 50-55dB return loss</li>
              <li><strong>APC:</strong> Green boots, 60+dB return loss</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Green = APC, Blue = UPC (critical!)</li>
              <li><strong>Use:</strong> Never mix APC with UPC connectors</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common fibre connector types",
              "Understand PC, UPC, and APC polish grades",
              "Select connectors for specific applications",
              "Apply proper installation techniques",
              "Implement quality control procedures",
              "Calculate link loss budgets with connectors"
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
            Common Connector Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different connector types have evolved for specific applications. Understanding when
              to use each type is crucial for professional fibre installations.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LC (Lucent Connector)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1.25mm ferrule diameter</li>
                  <li>Push-pull latching mechanism</li>
                  <li>High-density applications</li>
                  <li>Modern singlemode standard</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SC (Subscriber Connector)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>2.5mm ferrule diameter</li>
                  <li>Square body, push-pull</li>
                  <li>Excellent repeatability</li>
                  <li>ISP demarcation points</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">LC</p>
                <p className="text-white/90 text-xs">Modern standard</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">SC</p>
                <p className="text-white/90 text-xs">Legacy/robust</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">MTP/MPO</p>
                <p className="text-white/90 text-xs">Multi-fibre</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Polish Grades Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The quality of the connector end-face polish directly affects optical performance.
              Different polish types are optimised for specific applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Polish Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>PC (Physical Contact):</strong> Slight curve, ~14dB return loss, basic applications</li>
                <li><strong>UPC (Ultra Physical Contact):</strong> Enhanced curve, ~50-55dB RL, standard singlemode</li>
                <li><strong>APC (Angled Physical Contact):</strong> 8° angle, ~60+dB RL, high-performance</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">UPC Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Standard data networks</li>
                  <li>Most singlemode installations</li>
                  <li>Cost-sensitive projects</li>
                  <li>General enterprise networking</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">APC Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>CATV and broadcast</li>
                  <li>Long-haul transmission</li>
                  <li>Analytical equipment</li>
                  <li>High-dynamic-range systems</li>
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
            Connector Quality and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper connector installation requires precision, appropriate tools, and rigorous
              quality control to achieve optimal performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Insertion Loss:</strong> ≤0.3 dB (Grade A), ≤0.5 dB (Grade B)</li>
                <li><strong>Return Loss UPC:</strong> ≥50 dB (typical ≥55 dB)</li>
                <li><strong>Return Loss APC:</strong> ≥60 dB</li>
                <li><strong>Repeatability:</strong> ≤0.2 dB variation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Control Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Inspect:</strong> Use fibre microscope before mating</li>
                <li><strong>2. Clean:</strong> IPA and lint-free wipes</li>
                <li><strong>3. Test:</strong> Measure insertion and return loss</li>
                <li><strong>4. Document:</strong> Record all test results</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always clean connectors before and after mating</li>
                <li>Use protective caps when connectors are not in use</li>
                <li>Maintain calibrated test equipment</li>
                <li>Document all test results for warranty compliance</li>
                <li>Train personnel in proper handling techniques</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Critical Warning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>NEVER mate APC with UPC:</strong> — Causes permanent damage</li>
                <li><strong>Verify colour coding:</strong> — Green = APC, Blue = UPC</li>
                <li><strong>Different angles:</strong> — 8° (APC) vs 0° (UPC) incompatible</li>
                <li><strong>Separate inventory:</strong> — Maintain clear labelling systems</li>
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
              <p className="font-medium text-white mb-1">Connector Types</p>
              <ul className="space-y-0.5">
                <li>LC: Modern standard, SFP+</li>
                <li>SC: Legacy, robust</li>
                <li>MTP/MPO: Multi-fibre</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Polish Colour Codes</p>
              <ul className="space-y-0.5">
                <li>Blue: UPC (~55dB RL)</li>
                <li>Green: APC (~60dB RL)</li>
                <li>Never mix types!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <Quiz
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
            <Link to="/electrician/upskilling/data-cabling-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-3-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule3Section2;