import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "part-2-purpose",
    question: "What is the primary purpose of Part 2 in BS 7671?",
    options: [
      "To provide installation methods",
      "To serve as the regulatory dictionary defining terminology",
      "To list protective devices",
      "To specify cable ratings"
    ],
    correctIndex: 1,
    explanation: "Part 2 serves as the regulatory dictionary, providing consistent definitions for all terminology used throughout BS 7671."
  },
  {
    id: "consistent-interpretation",
    question: "Why must definitions in Part 2 be interpreted consistently?",
    options: [
      "To reduce paperwork",
      "To ensure uniform understanding and safety across all installations",
      "To simplify training",
      "To reduce costs"
    ],
    correctIndex: 1,
    explanation: "Consistent interpretation ensures uniform understanding, prevents misapplication, and maintains safety standards across all electrical installations."
  },
  {
    id: "isolator-misunderstanding",
    question: "What could happen if an installer misunderstands the term 'isolator'?",
    options: [
      "Higher installation costs",
      "Slower installation process",
      "Non-compliance and potentially unsafe installation",
      "Need for additional paperwork"
    ],
    correctIndex: 2,
    explanation: "Misunderstanding 'isolator' could lead to installing inadequate switching devices that don't provide proper isolation, creating safety risks and non-compliance."
  }
];

const faqs = [
  {
    question: "How does Part 2 connect to the rest of BS 7671?",
    answer: "Every regulation in BS 7671 is underpinned by these definitions, ensuring consistent terminology and interpretation across all Parts."
  },
  {
    question: "What is the legal significance of Part 2 definitions?",
    answer: "Part 2 definitions form the legal basis for interpreting regulations and determining compliance, making them critical for professional practice."
  },
  {
    question: "Do Part 2 definitions get updated?",
    answer: "Yes, Part 2 is regularly revised to reflect technological advances and changes in the electrical industry."
  },
  {
    question: "Why is understanding definitions important for electricians?",
    answer: "Misunderstanding definitions can lead to dangerous misapplications, safety risks, compliance failures, and legal exposure."
  }
];

const quizQuestion = {
  question: "What does Part 2 define the term 'Isolation' as requiring?",
  options: [
    "Disconnection of the line conductor only",
    "Cutting off supply from all, or a discrete section, of the installation from every source of electrical energy",
    "Using electronic switching devices",
    "A single-pole switch in the off position"
  ],
  correctAnswer: 1,
  explanation: "Isolation is defined as the function intended to cut off for reasons of safety the supply from all, or a discrete section, of the installation by separating it from every source of electrical energy."
};

const BS7671Module2Section1 = () => {
  useSEO({
    title: "Part 2 Definitions | BS 7671 Module 2.1",
    description: "Learn how Part 2 definitions shape application of BS 7671 regulations. Understand the regulatory dictionary and its impact on electrical installation compliance and safety."
  });

  const outcomes = [
    "Understand the role of Part 2 in BS 7671",
    "Learn how consistent terminology aids regulatory compliance",
    "Appreciate the legal and technical significance of definitions",
    "Identify the most referenced terms across installations"
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Navigating Part 2 – How Definitions Shape Application
          </h1>
          <p className="text-white/80">
            Understanding how terminology underpins all regulations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>What:</strong> Part 2 is the regulatory dictionary</li>
              <li><strong>Why:</strong> Consistent interpretation prevents misapplication</li>
              <li><strong>Impact:</strong> Every regulation depends on these definitions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> When a regulation uses a specific term</li>
              <li><strong>Use:</strong> Look up the exact definition in Part 2</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Part 2 Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Part 2: The Regulatory Dictionary
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part 2 of BS 7671 is titled "Definitions" and serves as the regulatory dictionary for the entire set of wiring regulations. Every regulation within BS 7671 is underpinned by these definitions, ensuring consistent interpretation and application across all electrical work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics of Part 2:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-1">
                  <li><strong>Comprehensive coverage:</strong> Defines all technical terms</li>
                  <li><strong>Legal significance:</strong> Forms basis for regulatory interpretation</li>
                  <li><strong>International alignment:</strong> Based on IEC standards</li>
                  <li><strong>Regular updates:</strong> Revised to reflect technological advances</li>
                </ul>
                <ul className="space-y-1">
                  <li><strong>Cross-referencing:</strong> Referenced throughout all other Parts</li>
                  <li><strong>Practical application:</strong> Directly impacts installation methods</li>
                  <li><strong>Safety focus:</strong> Definitions support safety objectives</li>
                  <li><strong>Professional clarity:</strong> Eliminates ambiguity</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Critical Terms</p>
                <p className="text-white/90 text-xs">Protective conductor, Live part, Earthing arrangement</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Safety Terms</p>
                <p className="text-white/90 text-xs">Basic protection, Fault protection, RCD</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">System Terms</p>
                <p className="text-white/90 text-xs">TN system, TT system, SELV, PELV</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Why Consistent Interpretation Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Why Consistent Interpretation Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Consistent interpretation of definitions is crucial for safety, compliance, and professional practice. When terms are understood differently by different people, the risk of errors and accidents increases significantly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Consistency</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Safety assurance:</strong> Uniform understanding prevents dangerous misapplications</li>
                  <li><strong>Regulatory compliance:</strong> Consistent interpretation ensures installations meet requirements</li>
                  <li><strong>Professional communication:</strong> Clear terminology enables effective communication</li>
                  <li><strong>Quality assurance:</strong> Standardised definitions support consistent quality</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Risks of Inconsistency</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Safety compromises:</strong> Misunderstood definitions lead to inadequate protection</li>
                  <li><strong>Compliance failures:</strong> Incorrect interpretation results in non-compliance</li>
                  <li><strong>Legal exposure:</strong> Misapplication can lead to liability</li>
                  <li><strong>Professional reputation:</strong> Errors damage credibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: How Definitions Shape Practical Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            How Definitions Shape Practical Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every term defined in Part 2 directly influences how regulations are applied in practice. Understanding these definitions is not an academic exercise — it's essential for safe, compliant electrical work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Example: "Protective Conductor"</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Part 2 Definition:</p>
                  <p className="text-white/90 text-xs italic">"A conductor used for some measures of protection against electric shock and intended to connect together exposed-conductive-parts, extraneous-conductive-parts, the main earthing terminal, earth electrode(s)..."</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Practical Impact:</p>
                  <ul className="text-xs space-y-0.5">
                    <li>• Must be sized according to fault current</li>
                    <li>• Cannot be used as a functional conductor</li>
                    <li>• Must maintain continuity throughout circuit</li>
                    <li>• Requires specific identification (green/yellow)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Example: "Isolation"</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Part 2 Definition:</p>
                  <p className="text-white/90 text-xs italic">"Function intended to cut off for reasons of safety the supply from all, or a discrete section, of the installation by separating the installation or section from every source of electrical energy."</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Practical Impact:</p>
                  <ul className="text-xs space-y-0.5">
                    <li>• Must disconnect ALL live conductors</li>
                    <li>• Requires visible air gap or equivalent</li>
                    <li>• Cannot rely on electronic switching alone</li>
                    <li>• Must be lockable in open position</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-transparent border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-3">The "Isolator" Misunderstanding</p>
              <div className="text-sm space-y-3">
                <p><strong>Situation:</strong> An electrician is asked to install an "isolator" for a lighting circuit in a commercial building. Without consulting Part 2, they install a standard single-pole switch, thinking it will provide adequate isolation.</p>

                <p><strong>The Problem:</strong> Part 2 defines an isolator as a device that must "cut off for reasons of safety the supply from all, or a discrete section, of the installation by separating the installation or section from every source of electrical energy."</p>

                <div>
                  <p className="font-medium mb-1">What Was Wrong:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• Single-pole switch doesn't isolate neutral conductor</li>
                    <li>• No visible air gap confirmation</li>
                    <li>• Cannot be secured in off position</li>
                    <li>• Doesn't meet isolation requirements for safety</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium mb-1">Consequences:</p>
                  <ul className="text-xs space-y-0.5 ml-4">
                    <li>• EICR identifies non-compliance (C2 or C3 defect)</li>
                    <li>• Unsafe working conditions during maintenance</li>
                    <li>• Insurance may question compliance in event of incident</li>
                    <li>• Professional reputation damage and cost of remedial work</li>
                  </ul>
                </div>

                <p><strong>Correct Solution:</strong> Install a double-pole isolator with visible indication, capable of being locked in the off position, providing true isolation as defined in Part 2.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Legal and Technical Significance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Legal and Technical Significance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part 2 definitions carry significant legal weight. In the event of an incident, investigation, or legal proceedings, these definitions form the basis for determining whether work complies with recognised standards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Implications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Expert witness testimony:</strong> Part 2 definitions used to assess competence</li>
                  <li><strong>HSE investigations:</strong> Compliance measured against Part 2 standards</li>
                  <li><strong>Insurance claims:</strong> Definitions determine coverage validity</li>
                  <li><strong>Court proceedings:</strong> Definitions establish technical benchmarks</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Significance</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Design decisions:</strong> Definitions influence system selection</li>
                  <li><strong>Safety measures:</strong> Determine appropriate protective devices</li>
                  <li><strong>Testing procedures:</strong> Define test requirements and methods</li>
                  <li><strong>International compatibility:</strong> Enable global project work</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions */}
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Key Safety Terms</p>
              <ul className="space-y-0.5">
                <li>Basic protection – prevents contact with live parts</li>
                <li>Fault protection – protection under fault conditions</li>
                <li>Automatic disconnection of supply</li>
                <li>Residual current device (RCD)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Key Installation Terms</p>
              <ul className="space-y-0.5">
                <li>Circuit – equipment supplied from same origin</li>
                <li>Final circuit – connected directly to load</li>
                <li>Distribution circuit – supplies distribution boards</li>
                <li>Origin of installation – point of supply</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-2-section-2">
              Next: Key Terms
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module2Section1;
