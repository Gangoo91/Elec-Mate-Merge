import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Twisted Pair Basics and Categories | Data Cabling Module 2.1";
const DESCRIPTION = "Learn twisted pair cable construction, categories from Cat5e to Cat6A, and performance specifications for structured cabling systems.";

const quickCheckQuestions = [
  {
    id: "datacabling-m2s1-check1",
    question: "What is the primary purpose of twisting wire pairs in UTP cable?",
    options: [
      "To make the cable more flexible",
      "To reduce electromagnetic interference",
      "To increase cable length",
      "To improve aesthetics"
    ],
    correctIndex: 1,
    explanation: "Twisting wire pairs cancels out electromagnetic interference (EMI) from external sources and reduces crosstalk between pairs within the cable."
  },
  {
    id: "datacabling-m2s1-check2",
    question: "What is the maximum bandwidth supported by Category 6 cable?",
    options: ["100 MHz", "250 MHz", "500 MHz", "1000 MHz"],
    correctIndex: 1,
    explanation: "Category 6 cable supports frequencies up to 250 MHz, providing improved performance margins over Cat5e for Gigabit Ethernet."
  },
  {
    id: "datacabling-m2s1-check3",
    question: "Why is Cat6A cable thicker than Cat6?",
    options: [
      "It uses more copper",
      "It has additional insulation and separators for alien crosstalk control",
      "Marketing reasons only",
      "It's designed for outdoor use"
    ],
    correctIndex: 1,
    explanation: "Cat6A includes additional insulation and often an internal spline or cross-filler to maintain pair separation and reduce alien crosstalk, necessary for 500 MHz bandwidth and 10 Gbps over 100 metres."
  }
];

const faqs = [
  {
    question: "What's the difference between UTP and STP cables?",
    answer: "UTP (Unshielded Twisted Pair) relies solely on wire twisting for interference protection, whilst STP (Shielded Twisted Pair) includes additional metallic shielding around pairs or the entire cable. STP provides better performance in high-interference environments but is more expensive and requires proper grounding."
  },
  {
    question: "Can I use Cat6 cables with Cat5e patch panels?",
    answer: "Whilst physically compatible, this creates a performance bottleneck. The connection will only perform to the lowest category standard (Cat5e). For optimal performance, all components in the channel should be the same category or higher."
  },
  {
    question: "How do I know if my installation meets category requirements?",
    answer: "Proper certification testing using a qualified cable tester is essential. The tester must verify all performance parameters including insertion loss, return loss, NEXT, FEXT, and alien crosstalk for the specific category. Simply having category-rated components doesn't guarantee channel performance."
  },
  {
    question: "What's the maximum pulling tension for twisted pair cables?",
    answer: "The maximum pulling tension is typically 25 pounds (110 Newtons) for 4-pair cables. Exceeding this can stretch the conductors, alter the twist rates, and permanently degrade performance. Always use proper pulling techniques and lubricants when necessary."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A client needs cabling that supports 10GBASE-T over the full 100-metre channel length. Which category should you recommend?",
  options: [
    "Category 5e",
    "Category 6",
    "Category 6A",
    "Any category will work"
  ],
  correctAnswer: 2,
  explanation: "Category 6A (augmented) is required for 10GBASE-T over the full 100-metre distance. While Cat6 can support 10 Gbps, it's limited to approximately 55 metres due to alien crosstalk limitations."
  }
];

const DataCablingModule2Section1 = () => {
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
            <span>Module 2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Twisted Pair Basics and Categories
          </h1>
          <p className="text-white/80">
            Cable construction and performance classifications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Twisting:</strong> Cancels EMI and reduces crosstalk</li>
              <li><strong>Categories:</strong> Cat5e (100MHz) → Cat6A (500MHz)</li>
              <li><strong>Selection:</strong> Match category to speed requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Category markings printed on cable jacket</li>
              <li><strong>Use:</strong> Cat6A for 10 Gbps, Cat6 for Gigabit with headroom</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand twisted pair cable construction",
              "Identify cable categories and specifications",
              "Compare Cat5e, Cat6, and Cat6A performance",
              "Select appropriate cable for applications",
              "Recognise twist rate importance",
              "Apply category standards to installations"
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
            Twisted Pair Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Twisted pair cable consists of insulated copper conductors twisted together in pairs.
              This twisting is fundamental to cable performance, providing inherent noise immunity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">How Twisting Works</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>EMI cancellation:</strong> Induced noise affects both wires equally</li>
                  <li><strong>Differential signalling:</strong> Receivers detect the difference</li>
                  <li><strong>Crosstalk reduction:</strong> Varies twist rates between pairs</li>
                  <li><strong>Balance:</strong> Equal impedance in each conductor</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Components</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Conductors:</strong> Solid or stranded copper</li>
                  <li><strong>Insulation:</strong> PE, HDPE, or FEP</li>
                  <li><strong>Separator:</strong> Spline or cross-filler (Cat6+)</li>
                  <li><strong>Jacket:</strong> PVC, LSZH, or plenum-rated</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Solid Core</p>
                <p className="text-white/90 text-xs">Permanent installations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Stranded</p>
                <p className="text-white/90 text-xs">Patch leads, flexible</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">4-Pair</p>
                <p className="text-white/90 text-xs">Standard Ethernet</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Categories Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable categories define performance specifications including bandwidth, crosstalk limits,
              and transmission characteristics. Higher categories support faster speeds over longer distances.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Category Specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Category 5e:</strong> 100 MHz, 1 Gbps capable, entry-level standard</li>
                <li><strong>Category 6:</strong> 250 MHz, enhanced margins, 10G up to 55m</li>
                <li><strong>Category 6A:</strong> 500 MHz, 10GBASE-T full 100m, alien crosstalk tested</li>
                <li><strong>Category 7:</strong> 600 MHz, fully shielded, GG45/TERA connectors</li>
                <li><strong>Category 8:</strong> 2000 MHz, data centre applications, 30m max</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cat5e vs Cat6</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cat6 has stricter crosstalk requirements</li>
                  <li>Cat6 uses internal separator/spline</li>
                  <li>Cat6 provides better headroom for Gigabit</li>
                  <li>Cat6 supports 10G over limited distance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cat6 vs Cat6A</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cat6A doubles the bandwidth (500 MHz)</li>
                  <li>Cat6A specifies alien crosstalk (ANEXT)</li>
                  <li>Cat6A is physically larger diameter</li>
                  <li>Cat6A supports full 100m at 10 Gbps</li>
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
            Performance Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable category selection affects not just speed but also reliability, future-proofing,
              and total installation cost. Consider the complete channel, not just the cable.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Channel Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Horizontal cable:</strong> Maximum 90 metres fixed cabling</li>
                <li><strong>Patch cords:</strong> Up to 10 metres total (both ends)</li>
                <li><strong>Connectors:</strong> All must match or exceed cable category</li>
                <li><strong>Patch panels:</strong> Termination points must maintain performance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Impact:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Untwisting:</strong> Maximum 13mm for Cat6, even less for Cat6A</li>
                <li><strong>Bend radius:</strong> Minimum 4x cable diameter during installation</li>
                <li><strong>Pulling tension:</strong> Maximum 110N (25 lbf) to prevent damage</li>
                <li><strong>Bundle size:</strong> Affects alien crosstalk, especially Cat6A</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Category Selection Guide</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>New installations: Cat6A minimum for future-proofing</li>
                <li>Office environments: Cat6 suitable for current Gigabit needs</li>
                <li>High-performance: Cat6A mandatory for 10 Gbps</li>
                <li>Verify all components match the cable category</li>
                <li>Consider total cost including termination and testing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixed components:</strong> — Using Cat5e jacks with Cat6 cable</li>
                <li><strong>Excessive untwisting:</strong> — Degrading near-end crosstalk</li>
                <li><strong>Over-tensioning:</strong> — Stretching and damaging conductors</li>
                <li><strong>No testing:</strong> — Assuming compliance without certification</li>
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
              <p className="font-medium text-white mb-1">Category Bandwidth</p>
              <ul className="space-y-0.5">
                <li>Cat5e: 100 MHz (1 Gbps)</li>
                <li>Cat6: 250 MHz (10G @ 55m)</li>
                <li>Cat6A: 500 MHz (10G @ 100m)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Installation Limits</p>
              <ul className="space-y-0.5">
                <li>Max untwist: 13mm (Cat6)</li>
                <li>Max tension: 110N (25 lbf)</li>
                <li>Min bend: 4x diameter</li>
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
            <Link to="../../module-1/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule2Section1;