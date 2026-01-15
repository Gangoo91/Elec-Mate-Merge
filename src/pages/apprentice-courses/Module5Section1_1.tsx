import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "What Is a Specification and Why It Matters - Module 5.1.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about electrical specifications - formal documents defining materials, standards and methods. Essential for BS 7671 compliance and safe installation practices.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is a specification in electrical work?",
    options: ["A drawing showing cable routes", "A formal document defining materials, methods and standards", "A test certificate", "A risk assessment"],
    correctIndex: 1,
    explanation: "A specification is a formal document that outlines the materials, standards, methods, and performance criteria for an installation."
  },
  {
    id: 2,
    question: "Name one difference between performance and prescriptive specifications.",
    options: ["Performance costs more", "Performance states the outcome required; prescriptive states the exact method/materials", "There is no difference", "Prescriptive is always better"],
    correctIndex: 1,
    explanation: "Performance specifications define the required outcome (e.g., lighting levels must achieve 500 lux), whilst prescriptive specifications define the exact method/materials (e.g., use PVC trunking 50mm x 50mm)."
  },
  {
    id: 3,
    question: "Why must specifications and drawings be used together?",
    options: ["It's a legal requirement", "Drawings show where to install, specifications show how to install", "To increase costs", "Only for complex installations"],
    correctIndex: 1,
    explanation: "Drawings show where to install components and routing, whilst specifications explain how to install them - both are essential for accurate and compliant work."
  }
];

const Module5Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a specification?",
      options: [
        "To show where cables should be routed",
        "To define materials, standards, and methods of installation",
        "To replace BS 7671 requirements",
        "To set project costs"
      ],
      correctAnswer: 1,
      explanation: "A specification defines the materials, standards, methods, and performance criteria for an installation, ensuring consistency and compliance."
    },
    {
      id: 2,
      question: "True or False: Specifications are optional guidelines.",
      options: [
        "True - they are just suggestions",
        "False - they are legally binding",
        "True - only for large projects",
        "False - only BS 7671 matters"
      ],
      correctAnswer: 1,
      explanation: "Specifications form part of the contract and are legally binding - they must be followed for compliance and contractual obligations."
    },
    {
      id: 3,
      question: "Which type of specification tells you exactly what material to use?",
      options: [
        "Performance specification",
        "Prescriptive specification",
        "Hybrid specification",
        "General specification"
      ],
      correctAnswer: 1,
      explanation: "Prescriptive specifications define the exact method and materials to be used (e.g., 'use PVC trunking 50mm x 50mm with fire-resistant clips')."
    },
    {
      id: 4,
      question: "Give one example of information typically included in a specification.",
      options: [
        "Site address only",
        "Materials to be used (e.g., cable type)",
        "Weather conditions",
        "Client's personal preferences"
      ],
      correctAnswer: 1,
      explanation: "Specifications typically include materials (cables, trunking, switches), standards (BS 7671), installation methods, testing requirements, and quality expectations."
    },
    {
      id: 5,
      question: "Why is it important to use specifications and drawings together?",
      options: [
        "To make the work take longer",
        "Because drawings show where to install and specifications show how to install",
        "Only for electrical inspections",
        "To increase material costs"
      ],
      correctAnswer: 1,
      explanation: "Drawings show the location and routing of installations, whilst specifications explain the methods, materials and standards - both are essential for complete information."
    }
  ];

  const faqs = [
    {
      question: "Can I substitute materials if they seem equivalent?",
      answer: "Only if approved by the supervisor and compliant with the specification. Never assume materials are equivalent - always confirm changes with the project manager or client representative before making substitutions."
    },
    {
      question: "What if the specification conflicts with BS 7671?",
      answer: "BS 7671 always takes precedence as it's the statutory standard. The issue must be raised immediately with the project manager, as the specification will need to be amended to ensure compliance."
    },
    {
      question: "Are specifications legally binding?",
      answer: "Yes, they form part of the contract and must be followed. Failure to comply with specifications can result in contractual disputes, failed inspections, and potential legal action."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.1.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              What Is a Specification and Why It Matters
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding electrical specifications - the formal documents that define how work must be carried out for compliance and safety.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Specifications define materials, methods and standards for electrical installations</li>
              <li>• They ensure consistency, safety, compliance and client satisfaction</li>
              <li>• Must be used alongside drawings - drawings show where, specifications show how</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>Define what a specification is and explain its purpose in electrical installation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>Identify the types of information commonly included in a specification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>Recognise the importance of following specifications for compliance and safety</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>Understand how specifications link to BS 7671 and Building Regulations</span>
              </li>
            </ul>
          </section>

          {/* Definition Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Definition of a Specification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                A specification is a formal document that outlines the materials, standards, methods, and performance criteria for an installation.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Purpose and Function</p>
                <ul className="text-sm space-y-1">
                  <li>• Acts as a reference for contractors, installers, and inspectors</li>
                  <li>• Provides clear, unambiguous instructions for installation work</li>
                  <li>• Ensures all parties work to the same standards</li>
                  <li>• Forms the basis for quality control and inspection</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="specification-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Types Section */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Types of Specifications
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Performance Specification</p>
                <p className="text-sm mb-2">Defines the required outcome or result:</p>
                <ul className="text-sm space-y-1">
                  <li>• States what must be achieved (e.g., "lighting levels must achieve 500 lux")</li>
                  <li>• Allows contractor flexibility in method and material selection</li>
                  <li>• Focus on end result rather than specific processes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Prescriptive Specification</p>
                <p className="text-sm mb-2">Defines exact methods and materials:</p>
                <ul className="text-sm space-y-1">
                  <li>• States precisely what must be used (e.g., "use PVC trunking 50mm x 50mm")</li>
                  <li>• Leaves little room for contractor interpretation</li>
                  <li>• Ensures standardisation across installations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Hybrid Specification</p>
                <p className="text-sm">Combines performance and prescriptive elements - prescriptive for critical safety items, performance for other aspects.</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="specification-types-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Why Specifications Matter */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Why Specifications Matter
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="grid gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500">
                  <p className="font-medium text-white">Compliance</p>
                  <p className="text-sm">Ensures adherence to BS 7671 and building regulations</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500">
                  <p className="font-medium text-white">Consistency</p>
                  <p className="text-sm">Guarantees all contractors work to the same standard</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500">
                  <p className="font-medium text-white">Client Satisfaction</p>
                  <p className="text-sm">Ensures project requirements are met</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500">
                  <p className="font-medium text-white">Risk Reduction</p>
                  <p className="text-sm">Avoids errors, disputes, and safety hazards</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="specification-importance-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Consequences Section */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Consequences of Ignoring Specifications
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-white/80 space-y-2 text-sm">
                  <p><strong className="text-white">Failed inspections:</strong> Building Control rejection requiring rectification</p>
                  <p><strong className="text-white">Costly rework:</strong> Material and labour costs for reinstallation</p>
                  <p><strong className="text-white">Safety hazards:</strong> Undersized cables, inadequate earthing</p>
                  <p><strong className="text-white">Legal disputes:</strong> Breach of contract claims, professional negligence</p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="font-medium text-white mb-2">Office Project Specification Breach</p>
              <p className="text-white/80 text-sm mb-3">
                On a large office project, electricians installed standard PVC clips instead of the specified metal fire-resistant clips. Building Control rejected the installation, requiring complete reinstallation.
              </p>
              <p className="text-white/80 text-sm">
                <strong className="text-white">Result:</strong> 3 weeks delay, £15,000 additional costs, liquidated damages of £2,000/day.
              </p>
              <p className="text-amber-400 text-sm mt-3 font-medium">
                Lesson: Always read and follow specifications exactly.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors min-h-[44px] touch-manipulation"
                  >
                    <span className="font-medium text-white text-sm">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Always read</strong> specifications before starting work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Highlight</strong> key requirements (materials, methods, standards)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Cross-check</strong> with drawings and site conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Report</strong> any conflicts or unclear instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Never assume</strong> — always confirm changes</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-medium text-elec-yellow mb-2">Recap</p>
              <ul className="text-white/80 space-y-1 text-sm">
                <li>• Specifications define materials, standards, methods for installations</li>
                <li>• Different types: performance, prescriptive, and hybrid</li>
                <li>• Must be used with drawings for complete information</li>
                <li>• Ignoring specifications leads to failed inspections and costly rework</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <div className="mb-10">
            <Quiz
              title="Test Your Knowledge: Specifications"
              questions={quizQuestions}
            />
          </div>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-2">
                Next: Reading Drawings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section1_1;
