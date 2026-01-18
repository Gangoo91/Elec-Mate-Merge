import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "L Category Systems (Life Safety) - Fire Alarm Module 1 Section 1";
const DESCRIPTION = "Understand BS 5839-1 fire alarm L categories: L1-L5 with examples, coverage, and compliance requirements for life safety detection.";

const quickCheckQuestions = [
  {
    id: "l-category-purpose",
    question: "What is the primary purpose of L category systems under BS 5839-1?",
    options: [
      "Property protection and business continuity",
      "Life safety through early warning for evacuation",
      "Manual activation only via call points",
      "Automatic fire suppression"
    ],
    correctIndex: 1,
    explanation: "L category systems are designed for life safety, providing early detection and warning to enable safe evacuation of building occupants."
  },
  {
    id: "l1-coverage",
    question: "Which of the following best describes an L1 system?",
    options: [
      "Coverage limited to escape routes only",
      "Automatic detection throughout all areas where a fire could start",
      "Manual call points only",
      "Detection in high-risk areas only"
    ],
    correctIndex: 1,
    explanation: "L1 provides automatic detection throughout all areas of the building to maximise life safety protection."
  },
  {
    id: "sleeping-risk",
    question: "For sleeping risk premises, which is the minimum recommended L category?",
    options: [
      "L4",
      "L5",
      "L1 or L2 depending on layout",
      "L3"
    ],
    correctIndex: 2,
    explanation: "Sleeping risk premises typically require L1 for full coverage or L2 where justified by the fire strategy, due to the vulnerability of sleeping occupants."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of L category systems under BS 5839-1?",
    options: [
      "Property protection and business continuity",
      "Life safety through early warning for evacuation",
      "Manual activation only via call points",
      "Automatic fire suppression"
    ],
    correctAnswer: 1,
    explanation: "L category systems are designed for life safety, providing early detection and warning to enable safe evacuation."
  },
  {
    id: 2,
    question: "Which of the following best describes an L1 system?",
    options: [
      "Coverage limited to escape routes only",
      "Automatic detection throughout all areas where a fire could start",
      "Manual call points only",
      "Detection in high-risk areas only"
    ],
    correctAnswer: 1,
    explanation: "L1 provides automatic detection throughout all areas of the building to maximise life safety."
  },
  {
    id: 3,
    question: "An L2 system provides detection in which areas?",
    options: [
      "Escape routes only",
      "Escape routes plus defined high-risk rooms",
      "All areas of the building",
      "Only plant rooms and stores"
    ],
    correctAnswer: 1,
    explanation: "L2 provides detection in escape routes and specified high-risk rooms that open onto them."
  },
  {
    id: 4,
    question: "What is the key characteristic of an L5 system?",
    options: [
      "Detection throughout the entire building",
      "Manual call points only",
      "Localised detection in specific areas to satisfy a particular objective",
      "Detection in escape routes and all adjoining rooms"
    ],
    correctAnswer: 2,
    explanation: "L5 is a bespoke category providing localised protection engineered to meet a specific need or objective."
  },
  {
    id: 5,
    question: "Which building type would most likely require an L1 system?",
    options: [
      "Small single-storey office",
      "Care home with sleeping accommodation",
      "Retail unit with constant supervision",
      "Industrial warehouse"
    ],
    correctAnswer: 1,
    explanation: "Care homes and premises with sleeping risk typically require L1 for maximum early warning and life safety."
  },
  {
    id: 6,
    question: "An L4 system provides detection in which areas?",
    options: [
      "Throughout all areas of the building",
      "Escape routes only",
      "High-risk rooms only",
      "Property protection areas only"
    ],
    correctAnswer: 1,
    explanation: "L4 systems provide automatic detection on escape routes only, offering basic life safety coverage."
  },
  {
    id: 7,
    question: "Which statement about L3 systems is correct?",
    options: [
      "L3 includes detection in all high-risk rooms",
      "L3 provides detection on escape routes and rooms opening directly onto them",
      "L3 is suitable for property protection only",
      "L3 requires manual call points to be omitted"
    ],
    correctAnswer: 1,
    explanation: "L3 systems provide automatic detection on escape routes plus rooms that open directly onto those escape routes."
  },
  {
    id: 8,
    question: "For sleeping risk premises, which is the minimum recommended L category?",
    options: [
      "L4",
      "L5",
      "L1 or L2 depending on layout",
      "L3"
    ],
    correctAnswer: 2,
    explanation: "Sleeping risk premises typically require L1 for full coverage or L2 where justified by the fire strategy."
  },
  {
    id: 9,
    question: "What determines the specific coverage requirements for L5?",
    options: [
      "BS 5839-1 prescribes exact areas",
      "The fire strategy and specific risk to be addressed",
      "Insurance company requirements only",
      "Building age"
    ],
    correctAnswer: 1,
    explanation: "L5 coverage is determined by the fire strategy to address specific risks identified in the fire risk assessment."
  },
  {
    id: 10,
    question: "Which factor does NOT typically influence the choice between L1 and L2?",
    options: [
      "Presence of sleeping accommodation",
      "Building complexity and layout",
      "Cost of detector equipment",
      "Fire strategy requirements"
    ],
    correctAnswer: 2,
    explanation: "Category selection should be based on risk assessment and fire strategy, not primarily on cost considerations."
  }
];

const faqs = [
  {
    question: "Can I combine L and P categories in the same building?",
    answer: "Yes - it is common to specify L3 for life safety on escape routes plus P2 for property protection in high-value areas like server rooms."
  },
  {
    question: "Does L1 always require detection in roof voids?",
    answer: "Not always - BS 5839-1 provides guidance on when void detection is required based on void construction and fire risk."
  },
  {
    question: "Is L5 a cheaper option than L4?",
    answer: "No - L5 is a bespoke category for specific needs, not a reduced coverage option. Coverage is determined by the fire strategy objective."
  },
  {
    question: "Who decides which L category is required?",
    answer: "The fire risk assessment and fire strategy determine requirements. The designer specifies the category to meet those requirements."
  },
  {
    question: "Can the category be changed after installation?",
    answer: "Yes, but this requires a formal variation and update to certificates. Changes should be justified by updated risk assessment."
  },
  {
    question: "What is the difference between L2 and L3?",
    answer: "L2 targets specific high-risk rooms plus escape routes. L3 covers ALL rooms opening onto escape routes, regardless of individual risk level."
  }
];

const FireAlarmModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            L Category Systems (Life Safety)
          </h1>
          <p className="text-white/80">
            Understanding BS 5839-1 L categories for life safety detection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>L categories:</strong> Designed for life safety and evacuation</li>
              <li><strong>L1:</strong> Full coverage throughout all areas</li>
              <li><strong>L2-L4:</strong> Varying levels of escape route protection</li>
              <li><strong>L5:</strong> Bespoke coverage for specific objectives</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Sleeping risk = L1 or L2 minimum</li>
              <li><strong>Use:</strong> Fire strategy drives category selection</li>
              <li><strong>Apply:</strong> Risk assessment determines coverage</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define the purpose of L category fire alarm systems",
              "Differentiate between L1, L2, L3, L4 and L5 coverage",
              "Identify typical building applications for each L category",
              "Explain the relationship between sleeping risk and L category selection",
              "Reference BS 5839-1 requirements for life safety detection",
              "Apply L category selection principles to scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Are L Categories? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are L Categories?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              L categories under BS 5839-1 are specifically designed to protect life safety. The primary objective is to provide early warning of fire to enable safe evacuation of occupants before escape routes become impassable.
            </p>
            <p>
              The "L" stands for "Life" protection. These systems prioritise detection speed and coverage to maximise warning time for building occupants.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Early warning enables safe evacuation</li>
                <li>Detection coverage matches occupant risk profile</li>
                <li>Higher categories provide more comprehensive protection</li>
                <li>Selection is driven by fire risk assessment</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: L1 - Full Coverage */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            L1 - Full Coverage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              L1 provides automatic fire detection throughout all areas of the building where a fire might start. This is the highest level of life safety protection available.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">L1 Coverage Includes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All rooms including offices, stores, toilets</li>
                <li>All circulation spaces (corridors, lobbies, stairs)</li>
                <li>Roof voids and floor voids where required</li>
                <li>Plant rooms and technical spaces</li>
              </ul>
            </div>

            <p>
              Typical applications include care homes, hotels, hospitals, HMOs with sleeping risk, and complex public buildings where maximum early warning is essential.
            </p>
          </div>
        </section>

        {/* Section 03: L2 - Escape Routes + High Risk */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            L2 - Escape Routes + High Risk
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              L2 provides detection in all escape routes, plus defined high-risk rooms that could present a hazard or open onto escape routes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">L2 High-Risk Rooms Typically Include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Electrical intake rooms and switch rooms</li>
                <li>Plant rooms and boiler rooms</li>
                <li>Kitchens (with appropriate detector type)</li>
                <li>Storage areas with high fire load</li>
              </ul>
            </div>

            <p>
              Typical applications include offices, schools, and retail premises with back-of-house risks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: L3 and L4 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            L3 and L4 - Escape Route Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">L3 - Routes + Adjoining Rooms</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detection on escape routes</li>
                  <li>All rooms opening onto escape routes</li>
                  <li>Does not target specific high-risk rooms</li>
                  <li>Covers all adjacent spaces regardless of risk</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">L4 - Escape Routes Only</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum life safety coverage</li>
                  <li>Corridors, lobbies, stairways only</li>
                  <li>Relies on fire reaching escape route</li>
                  <li>Less early warning than L1-L3</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Warning:</strong> L4 may be insufficient where rooms pose significant fire risk or where sleeping accommodation exists.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: L5 - Bespoke Coverage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            L5 - Bespoke Coverage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              L5 is a bespoke category where detection is provided in specific areas to satisfy a particular fire safety objective identified in the fire risk assessment.
            </p>
            <p>
              L5 is not a "lesser" category than L4 - it is a flexible option where coverage is engineered to meet a specific need that does not fit L1-L4 patterns.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">L5 Examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Detection in a specific high-risk process area only</li>
                <li>Coverage to satisfy a specific fire strategy requirement</li>
                <li>Localised protection for a defined evacuation zone</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always start with the fire risk assessment - let risk drive category selection, not cost</li>
                <li>For sleeping risk, default to L1 unless the fire strategy specifically justifies L2</li>
                <li>Document the rationale for category selection in design documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify detector coverage matches the specified category</li>
                <li>Ensure all areas required by the category are protected</li>
                <li>Check that void detection is provided where required</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Selecting a lower category to reduce cost</strong> - without proper risk justification</li>
                <li><strong>Using L4 where sleeping risk exists</strong> - this is rarely appropriate</li>
                <li><strong>Confusing L categories with P categories</strong> - L is life safety, P is property protection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">L Category Summary</p>
                <ul className="space-y-0.5">
                  <li>L1 = Full coverage throughout</li>
                  <li>L2 = Routes + high-risk rooms</li>
                  <li>L3 = Routes + adjoining rooms</li>
                  <li>L4 = Escape routes only</li>
                  <li>L5 = Bespoke coverage</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>L = Life safety focus</li>
                  <li>Sleeping risk = L1 or L2</li>
                  <li>Risk assessment drives selection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
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

export default FireAlarmModule1Section1;
