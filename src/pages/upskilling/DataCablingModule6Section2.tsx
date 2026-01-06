import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m6s2-check1",
    question: "What is the maximum frequency specification for Class EA cabling?",
    options: ["250 MHz", "500 MHz", "600 MHz", "1000 MHz"],
    correctIndex: 1,
    explanation: "Class EA (Category 6A equivalent) supports frequencies up to 500 MHz, enabling 10GBASE-T applications over the full 100-metre channel length."
  },
  {
    id: "datacabling-m6s2-check2",
    question: "What is the key difference between Class E and Class EA?",
    options: ["Connector type", "Cable length", "Alien crosstalk performance", "Installation method"],
    correctIndex: 2,
    explanation: "Class EA includes specifications for alien crosstalk (AXT) which is critical for 10 Gigabit Ethernet. Class E does not have alien crosstalk requirements."
  },
  {
    id: "datacabling-m6s2-check3",
    question: "Which class is the minimum requirement for PoE++ Type 4 (90W) in bundled installations?",
    options: ["Class D", "Class E", "Class EA", "Class F"],
    correctIndex: 2,
    explanation: "Class EA (Cat 6A) is recommended for PoE++ Type 4 applications due to its lower DC resistance and better thermal characteristics, especially in bundled cable runs."
  }
];

const faqs = [
  {
    question: "When should I specify Class EA instead of Class E?",
    answer: "Specify Class EA when you need 10GBASE-T support, high-power PoE (60-90W), or future-proofing for 15+ years. The alien crosstalk specifications in EA are essential for reliable 10G performance in bundled runs."
  },
  {
    question: "Is Class F (Cat 7) worth the extra cost?",
    answer: "For most commercial applications, Class EA provides sufficient performance. Class F is primarily for specialised applications requiring superior EMI immunity or frequencies above 500MHz. The shielding requirements add installation complexity."
  },
  {
    question: "Can Class D support 10 Gigabit Ethernet?",
    answer: "Not reliably at full distance. While 10GBASE-T can technically negotiate on Class D, distance is severely limited (typically 55m) and performance depends heavily on installation quality and alien crosstalk conditions."
  },
  {
    question: "What determines the expected service life of each class?",
    answer: "Higher classes provide more bandwidth headroom for future applications. Class D may need replacement in 5-7 years, Class E in 7-10 years, while Class EA typically provides 15+ years of usable service."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A hospital is upgrading their network to support new medical imaging systems requiring 10GBASE-T and high-power PoE for wireless access points. What is the recommended minimum class specification?",
  options: [
    "Class D for cost savings",
    "Class E for adequate performance",
    "Class EA for full 10G support and PoE++ capability",
    "Class F for maximum future-proofing"
  ],
  correctAnswer: 2,
  explanation: "Class EA provides full 10GBASE-T support at 100 metres with alien crosstalk specifications, plus excellent thermal performance for PoE++. It balances capability with reasonable cost, while Class F adds complexity without proportional benefit for this application."
  }
];

const DataCablingModule6Section2 = () => {
  useSEO({
    title: "Class D, E, EA, F Standards | Data Cabling Module 6.2",
    description: "Performance class specifications, applications, and selection criteria for structured cabling systems."
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
            <Link to="../data-cabling-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Class D, E, EA, F Standards
          </h1>
          <p className="text-white/80">
            Performance class specifications and applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Class D:</strong> 100MHz, 1Gbps, basic PoE</li>
              <li><strong>Class E:</strong> 250MHz, limited 10G</li>
              <li><strong>Class EA:</strong> 500MHz, full 10G, PoE++</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Class marking on cable jacket/docs</li>
              <li><strong>Use:</strong> Class EA for modern enterprise networks</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand each class specification",
              "Compare performance parameters",
              "Select appropriate class for applications",
              "Evaluate alien crosstalk requirements",
              "Plan PoE compatibility",
              "Estimate service life expectations"
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
            Class D and E: Foundation Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class D and E represent the foundation levels of structured cabling performance,
              suitable for basic networking and transitional applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class D (Cat 5e Equivalent)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency:</strong> 1-100 MHz</li>
                  <li><strong>Applications:</strong> 1000BASE-T, basic PoE</li>
                  <li><strong>Insertion Loss:</strong> ≤24 dB @ 100MHz</li>
                  <li><strong>NEXT:</strong> ≥30 dB @ 100MHz</li>
                  <li><strong>Service life:</strong> 5-7 years remaining</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class E (Cat 6 Equivalent)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency:</strong> 1-250 MHz</li>
                  <li><strong>Applications:</strong> 1000BASE-T, PoE+</li>
                  <li><strong>Insertion Loss:</strong> ≤36 dB @ 250MHz</li>
                  <li><strong>NEXT:</strong> ≥21 dB @ 250MHz</li>
                  <li><strong>10G distance:</strong> ~55m (limited)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1000BASE-T</p>
                <p className="text-white/90 text-xs">Both classes OK</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">10GBASE-T</p>
                <p className="text-white/90 text-xs">E limited, EA full</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">PoE++</p>
                <p className="text-white/90 text-xs">EA recommended</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Class EA: Augmented Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class EA (Augmented) adds alien crosstalk specifications essential for reliable
              10 Gigabit Ethernet performance in bundled cable installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class EA Key Specifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Frequency:</strong> 1-500 MHz</li>
                <li><strong>Insertion Loss:</strong> ≤54 dB @ 500MHz</li>
                <li><strong>NEXT:</strong> ≥15 dB @ 500MHz</li>
                <li><strong>ANEXT:</strong> ≥43 dB @ 500MHz (alien crosstalk)</li>
                <li><strong>Bundle testing:</strong> 6-around-1 configuration</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">10GBASE-T Performance</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Single cable:</strong> 100m full rate</li>
                  <li><strong>Small bundle:</strong> 100m full rate</li>
                  <li><strong>Large bundle:</strong> AXT testing required</li>
                  <li><strong>Reliability:</strong> Excellent</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PoE++ Capability</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type 3:</strong> 60W excellent</li>
                  <li><strong>Type 4:</strong> 90W good</li>
                  <li><strong>DC resistance:</strong> Lower (23 AWG)</li>
                  <li><strong>Thermal:</strong> Better heat dissipation</li>
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
            Class F: High-Frequency Performance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class F provides frequencies up to 600MHz with enhanced shielding, primarily for
              specialised applications requiring superior EMI immunity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Class F Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency:</strong> 1-600 MHz</li>
                  <li><strong>Equivalent:</strong> Category 7</li>
                  <li><strong>Shielding:</strong> Individual pair + overall</li>
                  <li><strong>Connectors:</strong> GG45, TERA (or RJ45)</li>
                  <li><strong>EMI immunity:</strong> Excellent</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cable type:</strong> S/FTP construction</li>
                  <li><strong>Diameter:</strong> 6-8mm (larger)</li>
                  <li><strong>Bend radius:</strong> Stricter requirements</li>
                  <li><strong>Grounding:</strong> Critical for performance</li>
                  <li><strong>Termination:</strong> Specialised skills needed</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to consider Class F:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Industrial environments with high EMI</li>
                <li>Broadcast and audio/video production</li>
                <li>Security-critical installations requiring EMI containment</li>
                <li>Applications requiring frequencies above 500MHz</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Class Selection Guide</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Basic office (1G, basic PoE):</strong> Class D minimum, E preferred</li>
                <li><strong>Modern enterprise (10G, PoE++):</strong> Class EA recommended</li>
                <li><strong>Data centre (25/40G):</strong> Class I/II or fibre</li>
                <li><strong>Industrial/high EMI:</strong> Consider Class F shielded</li>
                <li><strong>15+ year planning:</strong> Class EA provides good headroom</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-specifying:</strong> — Class F adds cost/complexity without proportional benefit</li>
                <li><strong>Under-specifying:</strong> — Class D won't meet future needs</li>
                <li><strong>Ignoring AXT:</strong> — Class E fails 10G in bundles</li>
                <li><strong>Poor grounding:</strong> — Shielded cable performs worse than UTP if improperly grounded</li>
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
              <p className="font-medium text-white mb-1">Class Frequency</p>
              <ul className="space-y-0.5">
                <li>D: 100MHz</li>
                <li>E: 250MHz</li>
                <li>EA: 500MHz</li>
                <li>F: 600MHz</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Best For</p>
              <ul className="space-y-0.5">
                <li>D: Legacy, basic</li>
                <li>E: Standard office</li>
                <li>EA: Enterprise, PoE++</li>
                <li>F: Industrial, EMI</li>
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
            <Link to="../data-cabling-module-6-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-6-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule6Section2;