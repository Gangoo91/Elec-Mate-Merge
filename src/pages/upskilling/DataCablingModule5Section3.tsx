import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Patch Cord Design and Performance | Data Cabling Module 5.3";
const DESCRIPTION = "Understanding patch cord specifications, design principles, and performance criteria for professional network installations.";

const quickCheckQuestions = [
  {
    id: "datacabling-m5s3-check1",
    question: "What is the maximum allowable length for a work area cable according to TIA-568?",
    options: ["3 metres", "5 metres", "7 metres", "10 metres"],
    correctIndex: 1,
    explanation: "TIA-568 specifies that work area cables (equipment cords) should not exceed 5 metres in length to maintain proper signal integrity and prevent excessive attenuation."
  },
  {
    id: "datacabling-m5s3-check2",
    question: "What type of conductor is typically used in patch cords for flexibility?",
    options: ["Solid copper", "Stranded copper", "Copper-clad aluminium", "Steel core"],
    correctIndex: 1,
    explanation: "Stranded copper conductors are used in patch cords because they provide the flexibility needed for frequent handling, plugging, and unplugging without conductor fatigue."
  },
  {
    id: "datacabling-m5s3-check3",
    question: "What is the primary purpose of strain relief in patch cord design?",
    options: ["Aesthetic appearance", "Prevent cable damage at connection points", "Improve electrical performance", "Meet colour coding requirements"],
    correctIndex: 1,
    explanation: "Strain relief prevents mechanical stress from being transferred to the cable-connector interface, which could cause conductor damage, connection failure, or performance degradation."
  }
];

const faqs = [
  {
    question: "Why are patch cords more expensive than bulk cable per metre?",
    answer: "Patch cords use stranded conductors (more expensive than solid), factory-terminated connectors with quality testing, strain relief boots, and must meet tighter performance specifications. The terminations and testing add significant cost."
  },
  {
    question: "Can I make my own patch cords instead of buying factory-made?",
    answer: "While possible, factory patch cords are generally recommended for Cat 6 and above. Factory terminations use precision equipment and 100% testing. Hand-made cords often have inconsistent performance, especially at higher frequencies."
  },
  {
    question: "How do I know what category my patch cord needs to be?",
    answer: "Match or exceed your permanent link category. Using a lower category patch cord creates a bottleneck. For example, Cat 5e patch cords on a Cat 6A installation limit the entire channel to Cat 5e performance."
  },
  {
    question: "When should I use shielded patch cords?",
    answer: "Use shielded patch cords in electrically noisy environments (factories, hospitals, near power equipment), when required by the installed cable system (must match), or for high-security applications requiring EMI containment."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A data centre is experiencing intermittent connectivity issues. Inspection reveals patch cords with cracked boots and visible conductor fatigue. What is the recommended action?",
  options: [
    "Tape the damaged areas for temporary fix",
    "Replace with new factory-tested patch cords",
    "Re-terminate the existing cables",
    "Ignore if connections still work"
  ],
  correctAnswer: 1,
  explanation: "Damaged patch cords should be replaced with new factory-tested units. Strain relief damage and conductor fatigue cause intermittent failures that worsen over time. Factory cords ensure consistent performance and include proper testing."
  }
];

const DataCablingModule5Section3 = () => {
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
            <Link to="/electrician/upskilling/data-cabling-module-5">
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
            <span>Module 5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Patch Cord Design and Performance
          </h1>
          <p className="text-white/80">
            Specifications and requirements for professional installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Max length:</strong> 5 metres per cord (10m total)</li>
              <li><strong>Conductors:</strong> Stranded for flexibility</li>
              <li><strong>Category:</strong> Must match or exceed permanent link</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Category marking, strain relief, jacket type</li>
              <li><strong>Use:</strong> Factory-tested cords for Cat 6 and above</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand patch cord construction",
              "Select appropriate cord category",
              "Identify quality indicators",
              "Apply length limitations correctly",
              "Choose shielded vs unshielded",
              "Maintain and manage patch cords"
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
            Patch Cord Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Patch cords connect equipment to the structured cabling system. Their design must
              balance flexibility for frequent handling with electrical performance requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Construction</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Conductors:</strong> Stranded (7x32 AWG typical)</li>
                  <li><strong>Pairs:</strong> 4-pair twisted configuration</li>
                  <li><strong>Impedance:</strong> 100Ω ±15Ω</li>
                  <li><strong>Jacket:</strong> PVC, LSZH, or plenum-rated</li>
                  <li><strong>Bend radius:</strong> Min 4x cable diameter</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connector Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type:</strong> RJ45 (8P8C) standard</li>
                  <li><strong>Contacts:</strong> Gold-plated (50µin min)</li>
                  <li><strong>Mating cycles:</strong> 750+ minimum</li>
                  <li><strong>Strain relief:</strong> Moulded boot</li>
                  <li><strong>Latch:</strong> Snag-resistant designs available</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 5e</p>
                <p className="text-white/90 text-xs">100MHz, 1Gbps</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 6</p>
                <p className="text-white/90 text-xs">250MHz, 1-10Gbps</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cat 6A</p>
                <p className="text-white/90 text-xs">500MHz, 10Gbps</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Performance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Patch cords must meet category-specific performance requirements. These become
              more stringent at higher categories to support increased bandwidth.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Parameters:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Cat 6 @ 250MHz</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Insertion Loss: 0.8 dB max</li>
                    <li>NEXT: 39.9 dB min</li>
                    <li>Return Loss: 20.0 dB min</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Cat 6A @ 500MHz</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Insertion Loss: 1.2 dB max</li>
                    <li>NEXT: 44.3 dB min</li>
                    <li>Return Loss: 20.0 dB min</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why performance matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Patch cords can limit overall channel performance</li>
                <li>Poor cords cause intermittent failures difficult to diagnose</li>
                <li>High-frequency performance degrades first with damage</li>
                <li>Factory testing ensures consistent starting performance</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Quality and Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper selection, installation, and maintenance of patch cords extends their
              service life and maintains network reliability.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Category marking:</strong> Clear, permanent labelling</li>
                  <li><strong>Manufacturer:</strong> Known brand with warranty</li>
                  <li><strong>Construction:</strong> Consistent diameter, flexible</li>
                  <li><strong>Boot:</strong> Secure strain relief, not cracked</li>
                  <li><strong>Contacts:</strong> Bright gold, properly seated</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Practices</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Length:</strong> Appropriate for application</li>
                  <li><strong>Routing:</strong> Service loops, no tight bends</li>
                  <li><strong>Management:</strong> Velcro ties, not cable ties</li>
                  <li><strong>Labelling:</strong> Both ends identified</li>
                  <li><strong>Documentation:</strong> Record in cable database</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maintenance guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Inspect for physical damage during moves/changes</li>
                <li>Replace cords with damaged boots or kinked cables</li>
                <li>Clean connector contacts if intermittent issues occur</li>
                <li>Track mating cycles in high-change environments</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Guidelines</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Match patch cord category to permanent link category minimum</li>
                <li>Use colour coding for circuit identification consistency</li>
                <li>Keep standard lengths in stock (0.5m, 1m, 2m, 3m, 5m)</li>
                <li>Choose snag-resistant boots for high-density environments</li>
                <li>Consider LSZH jackets where fire safety is a concern</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Category mismatch:</strong> — Using Cat 5e cords on Cat 6A systems</li>
                <li><strong>Excessive length:</strong> — Creating cable management issues</li>
                <li><strong>Sharp bends:</strong> — Exceeding minimum bend radius</li>
                <li><strong>Cable ties:</strong> — Over-tightening causes performance issues</li>
                <li><strong>Cheap cords:</strong> — Saving money costs more in troubleshooting</li>
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
              <p className="font-medium text-white mb-1">Standard Lengths</p>
              <ul className="space-y-0.5">
                <li>0.5m - Equipment connections</li>
                <li>1-2m - Desktop use</li>
                <li>3m - Typical work area</li>
                <li>5m - Maximum recommended</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Quality Checks</p>
              <ul className="space-y-0.5">
                <li>Category clearly marked</li>
                <li>Strain relief intact</li>
                <li>Gold contacts visible</li>
                <li>Latch operates smoothly</li>
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
            <Link to="/electrician/upskilling/data-cabling-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-5-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule5Section3;