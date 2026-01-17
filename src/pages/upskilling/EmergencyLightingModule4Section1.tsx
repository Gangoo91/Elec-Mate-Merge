import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m4s1-check1",
    question: "What cable type provides fire resistance for emergency lighting circuits?",
    options: ["Standard PVC/PVC", "MICC or FP cables", "Armoured SWA", "XLPE only"],
    correctIndex: 1,
    explanation: "Mineral Insulated Copper Clad (MICC) and Fire Performance (FP) cables like FP200 Gold maintain circuit integrity during fire conditions. Standard PVC cables fail at elevated temperatures."
  },
  {
    id: "emergencylighting-m4s1-check2",
    question: "What installation method protects cables in fire conditions?",
    options: ["Surface clipping only", "In plastic conduit", "Fire-resistant routes or enclosures", "Any containment system"],
    correctIndex: 2,
    explanation: "Fire-resistant routes using dedicated containment, intumescent coatings, or fire-rated enclosures protect cables during fires. Standard plastic conduit provides no fire protection."
  },
  {
    id: "emergencylighting-m4s1-check3",
    question: "What BS standard governs cable installation for emergency lighting?",
    options: ["BS 7671 only", "BS 5266-1 and BS 7671", "BS EN 1838 only", "Building Regulations only"],
    correctIndex: 1,
    explanation: "BS 5266-1 specifies emergency lighting cable requirements while BS 7671 provides general wiring regulations. Both must be satisfied for compliant installations."
  }
];

const faqs = [
  {
    question: "When is MICC cable required versus FP cable?",
    answer: "MICC provides superior fire resistance and is preferred for critical escape routes or where BS 8519 enhanced standards apply. FP200 Gold is acceptable for most BS 5266-1 applications but has lower fire survival ratings than MICC."
  },
  {
    question: "Can standard cables be used if protected by fire barriers?",
    answer: "Yes, standard cables can be used within fire-rated enclosures or protected routes that maintain integrity for the required duration. The protection system must be certified and correctly installed."
  },
  {
    question: "What fixings are suitable for fire-resistant cables?",
    answer: "Metal clips or cleats rated for fire conditions must be used. Plastic cable ties or clips fail under heat and allow cables to fall, potentially breaking the circuit. Spacing as per manufacturer data."
  },
  {
    question: "How do cable routes affect emergency lighting design?",
    answer: "Cable routes should be planned to minimise exposure to fire risk and avoid areas with high fire load. Routes through fire compartments require fire stopping at penetrations."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An emergency lighting circuit must pass through a plant room with significant fire load. What cable solution is most appropriate?",
  options: [
    "Standard cables in plastic trunking",
    "MICC or FP cable with metal fixings",
    "Any cable with intumescent paint",
    "Armoured cable without additional protection"
  ],
  correctAnswer: 1,
  explanation: "MICC or FP cables with appropriate metal fixings maintain circuit integrity in high fire-load areas. The fire-resistant cable construction protects against flame and heat without relying on external protection."
  }
];

const EmergencyLightingModule4Section1 = () => {
  useSEO({
    title: "Cable Types and Installation | Emergency Lighting Module 4.1",
    description: "Fire-resistant cable selection, MICC and FP cables, installation methods and BS 5266-1/BS 7671 compliance for emergency lighting systems."
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Types and Installation Requirements
          </h1>
          <p className="text-white/80">
            Fire-resistant cabling for emergency lighting circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>MICC:</strong> Mineral insulated, highest rating</li>
              <li><strong>FP cables:</strong> Fire performance rated</li>
              <li><strong>Fixings:</strong> Metal clips, fire-rated</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 5266-1:</strong> Emergency lighting</li>
              <li><strong>BS 7671:</strong> Wiring regulations</li>
              <li><strong>BS 8519:</strong> Enhanced systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate fire-resistant cables",
              "Understand MICC vs FP cable applications",
              "Specify correct cable fixings",
              "Plan fire-resistant routes",
              "Apply BS 5266-1 requirements",
              "Integrate with BS 7671"
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
            Fire-Resistant Cable Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting cables must maintain circuit integrity during fire conditions
              to ensure luminaires continue operating during evacuation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MICC Cable</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Construction:</strong> Mineral insulated</li>
                  <li><strong>Rating:</strong> 3 hours+ fire survival</li>
                  <li><strong>Application:</strong> Critical escape routes</li>
                  <li><strong>Termination:</strong> Specialist seals required</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">FP Cables</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type:</strong> FP200 Gold, equivalent</li>
                  <li><strong>Rating:</strong> BS EN 50200 compliant</li>
                  <li><strong>Application:</strong> Standard installations</li>
                  <li><strong>Termination:</strong> Standard methods</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">MICC</p>
                <p className="text-white/90 text-xs">Highest protection</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">FP200</p>
                <p className="text-white/90 text-xs">Standard FP</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Protected</p>
                <p className="text-white/90 text-xs">Standard + enclosure</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Installation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct installation is essential to maintain fire resistance. Cable routes,
              fixings, and penetrations must all be addressed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Installation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fixings:</strong> Metal clips rated for fire conditions</li>
                <li><strong>Spacing:</strong> Per manufacturer's fire test data</li>
                <li><strong>Penetrations:</strong> Fire stopped at compartment boundaries</li>
                <li><strong>Segregation:</strong> Separate from other services where required</li>
                <li><strong>Routing:</strong> Avoid high fire-load areas where possible</li>
              </ul>
            </div>

            <p>
              Standard plastic cable ties fail at temperatures well below those encountered
              in fires. All fixings must maintain cable support during the required fire
              resistance period.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Standards Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting cable installations must satisfy multiple standards
              covering both the emergency lighting function and general wiring requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 5266-1</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cable fire resistance requirements</li>
                  <li>Circuit protection needs</li>
                  <li>Segregation from other circuits</li>
                  <li>Duration matching system needs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Chapter 56: Safety services</li>
                  <li>Section 560: General</li>
                  <li>Regulation 560.8: Cabling</li>
                  <li>Current carrying capacity</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Selection Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify fire risk along proposed routes</li>
                <li>Determine required fire resistance duration</li>
                <li>Select cable type to match requirements</li>
                <li>Specify appropriate fixings and spacing</li>
                <li>Plan fire stopping at penetrations</li>
                <li>Document selections in design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Installation Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Plastic cable ties:</strong> — Fail in fire conditions</li>
                <li><strong>Missing fire stopping:</strong> — Penetrations breach compartments</li>
                <li><strong>Wrong clip spacing:</strong> — Cable sags and breaks in fire</li>
                <li><strong>Mixed cable types:</strong> — Weakest section limits system</li>
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
              <p className="font-medium text-white mb-1">Cable Types</p>
              <ul className="space-y-0.5">
                <li>MICC: Highest rating</li>
                <li>FP200: Standard FP</li>
                <li>Protected: Standard + enclosure</li>
                <li>Metal fixings required</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Standards</p>
              <ul className="space-y-0.5">
                <li>BS 5266-1: EL requirements</li>
                <li>BS 7671: Wiring regs</li>
                <li>BS 8519: Enhanced</li>
                <li>BS EN 50200: Cable test</li>
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-4-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule4Section1;