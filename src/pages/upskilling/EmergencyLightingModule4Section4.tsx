import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m4s4-check1",
    question: "Why must emergency lighting circuits be segregated from other circuits?",
    options: ["To reduce cost", "To prevent fire damage affecting multiple systems", "For easier identification", "To use smaller cables"],
    correctIndex: 1,
    explanation: "Circuit segregation ensures that a fire damaging one cable route doesn't disable both normal and emergency lighting. Segregation provides redundancy and maintains escape route illumination."
  },
  {
    id: "emergencylighting-m4s4-check2",
    question: "What is the purpose of fire barriers at cable penetrations?",
    options: ["Mechanical protection only", "To maintain fire compartment integrity", "Reduce cable heating", "Improve aesthetics"],
    correctIndex: 1,
    explanation: "Fire barriers maintain the integrity of fire compartments where cables pass through walls or floors. Without proper fire stopping, fire and smoke can spread through cable penetrations."
  },
  {
    id: "emergencylighting-m4s4-check3",
    question: "What BS 7671 chapter covers safety services including emergency lighting?",
    options: ["Chapter 41", "Chapter 52", "Chapter 56", "Chapter 61"],
    correctIndex: 2,
    explanation: "BS 7671 Chapter 56 covers safety services, including emergency lighting. Section 560 provides requirements for sources, circuits, and wiring systems for safety services."
  }
];

const faqs = [
  {
    question: "What level of segregation is required for emergency lighting?",
    answer: "BS 5266-1 requires segregation of emergency lighting supplies from other circuits such that a fire disabling one supply doesn't affect the other. Physical separation or fire-resistant enclosure achieves this."
  },
  {
    question: "Can emergency and normal lighting share the same containment?",
    answer: "Only if the containment provides fire resistance matching the cable rating, or the cables are fire-resistant throughout. Otherwise, separate routes are required to achieve segregation."
  },
  {
    question: "What fire stopping products are acceptable?",
    answer: "Products must be tested and certified for the specific cable/penetration combination. Intumescent collars, fire pillows, or ablative coatings must achieve the required fire rating (typically matching the wall/floor)."
  },
  {
    question: "How do I verify fire integrity during installation?",
    answer: "Check cable type matches specification, fixings are correct type and spacing, fire stopping is complete at all penetrations, and segregation is achieved. Document with photographs and test certificates."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "Emergency lighting cables must pass through a 60-minute fire compartment wall. What is required at the penetration?",
  options: [
    "Standard grommet only",
    "Fire stopping rated for 60 minutes",
    "Metal sleeve without sealing",
    "Larger opening for heat dissipation"
  ],
  correctAnswer: 1,
  explanation: "Fire stopping at penetrations must match the fire rating of the element being penetrated. A 60-minute compartment wall requires 60-minute rated fire stopping to maintain compartment integrity."
  }
];

const EmergencyLightingModule4Section4 = () => {
  useSEO({
    title: "Circuit Segregation and Fire Integrity | Emergency Lighting Module 4.4",
    description: "Understand circuit segregation, fire barriers, cable penetrations, and maintaining fire integrity for emergency lighting systems."
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
            <span>Module 4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Circuit Segregation and Fire Integrity
          </h1>
          <p className="text-white/80">
            Maintaining circuit integrity under fire conditions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Segregation:</strong> Separate from normal circuits</li>
              <li><strong>Fire barriers:</strong> At all penetrations</li>
              <li><strong>BS 7671:</strong> Chapter 56 requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Protection Methods</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Physical:</strong> Separate routes</li>
              <li><strong>Enclosure:</strong> Fire-rated containment</li>
              <li><strong>Cable:</strong> Fire-resistant types</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply circuit segregation principles",
              "Specify fire stopping requirements",
              "Maintain compartment integrity",
              "Select appropriate protection methods",
              "Comply with BS 7671 Chapter 56",
              "Verify installation integrity"
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
            Circuit Segregation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting circuits must be segregated from other electrical
              services to ensure a fire affecting one system doesn't disable another.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Segregate</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fire damaging one route spares other</li>
                  <li>Maintains escape illumination</li>
                  <li>BS 5266-1 requirement</li>
                  <li>BS 7671 Chapter 56 compliance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Segregation Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Physically separate routes</li>
                  <li>Fire-resistant enclosure</li>
                  <li>Distance separation</li>
                  <li>Different fire compartments</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Separate</p>
                <p className="text-white/90 text-xs">Physical routes</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Protected</p>
                <p className="text-white/90 text-xs">Fire enclosure</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Fire-resistant</p>
                <p className="text-white/90 text-xs">Cable types</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Stopping at Penetrations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Where cables penetrate fire compartment boundaries (walls, floors), fire
              stopping must maintain the fire resistance of the building element.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Fire Stopping Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rating:</strong> Match the fire compartment rating</li>
                <li><strong>Products:</strong> Tested and certified for cable type</li>
                <li><strong>Installation:</strong> Per manufacturer's instructions</li>
                <li><strong>Inspection:</strong> Visual check and certificate</li>
                <li><strong>Future access:</strong> Maintain when adding cables</li>
              </ul>
            </div>

            <p>
              Common fire stopping products include intumescent collars, fire pillows,
              ablative coatings, and proprietary transit systems. Each must be appropriate
              for the cable type and opening size.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            BS 7671 Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Chapter 56 provides specific requirements for safety services
              including emergency lighting, covering power sources, circuits, and wiring.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chapter 56 Key Points</p>
                <ul className="text-sm text-white space-y-1">
                  <li>560.1: Scope and definitions</li>
                  <li>560.6: Sources</li>
                  <li>560.7: Circuits</li>
                  <li>560.8: Wiring systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Segregation from other circuits</li>
                  <li>Fire resistance of cables</li>
                  <li>Protection against fire</li>
                  <li>Maintained integrity</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify cable route segregation on drawings</li>
                <li>Check fire-resistant cable specification</li>
                <li>Inspect fixing type and spacing</li>
                <li>Verify fire stopping at all penetrations</li>
                <li>Obtain fire stopping certificates</li>
                <li>Photograph key installations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Fire Integrity Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing fire stopping:</strong> — Penetrations left unsealed</li>
                <li><strong>Wrong products:</strong> — Not rated for cable type</li>
                <li><strong>Poor installation:</strong> — Not per manufacturer data</li>
                <li><strong>Breached later:</strong> — Additional cables without resealing</li>
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
              <p className="font-medium text-white mb-1">Segregation</p>
              <ul className="space-y-0.5">
                <li>Separate routes</li>
                <li>Fire enclosure</li>
                <li>Distance separation</li>
                <li>Fire-resistant cable</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Fire Stopping</p>
              <ul className="space-y-0.5">
                <li>Match compartment rating</li>
                <li>Certified products</li>
                <li>Per manufacturer data</li>
                <li>BS 7671 Chapter 56</li>
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-4-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule4Section4;