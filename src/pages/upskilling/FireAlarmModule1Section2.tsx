import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "P Category Systems (Property Protection) - Fire Alarm Module 1 Section 2";
const DESCRIPTION = "Learn about BS 5839-1 P categories for property protection: P1 and P2 coverage, insurer requirements, and system selection.";

const quickCheckQuestions = [
  {
    id: "p-category-purpose",
    question: "What is the primary purpose of P category systems under BS 5839-1?",
    options: [
      "Life safety through early warning for evacuation",
      "Property protection and minimising asset damage",
      "Manual activation only via call points",
      "Providing emergency lighting"
    ],
    correctIndex: 1,
    explanation: "P category systems are designed for property protection, aiming to minimise damage to buildings and contents."
  },
  {
    id: "p1-vs-p2",
    question: "A distribution warehouse stores high-value goods. The insurer wants comprehensive fire protection. Which P category is appropriate?",
    options: [
      "No P category needed",
      "P2 for targeted areas only",
      "P1 for comprehensive detection throughout",
      "M category only"
    ],
    correctIndex: 2,
    explanation: "P1 provides comprehensive detection throughout all storage areas to detect any fire at the earliest stage and protect high-value stock."
  },
  {
    id: "combining-categories",
    question: "Can P and L categories be combined in the same building?",
    options: [
      "No, only one category can be specified",
      "Yes, it is common to combine L3 for life safety with P2 for property protection",
      "Only if required by Building Regulations",
      "Only in industrial premises"
    ],
    correctIndex: 1,
    explanation: "Combined categories are common - L categories address life safety while P categories address property protection objectives."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of P category systems under BS 5839-1?",
    options: [
      "Life safety through early warning for evacuation",
      "Property protection and minimising asset damage",
      "Manual activation only via call points",
      "Providing emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "P category systems are designed for property protection, aiming to minimise damage to buildings and contents."
  },
  {
    id: 2,
    question: "Which of the following best describes a P1 system?",
    options: [
      "Detection in high-risk areas only",
      "Automatic detection throughout all areas for maximum property protection",
      "Manual call points only",
      "Detection on escape routes only"
    ],
    correctAnswer: 1,
    explanation: "P1 provides automatic detection throughout all areas to detect any fire at the earliest possible stage for property protection."
  },
  {
    id: 3,
    question: "A P2 system provides detection in which areas?",
    options: [
      "Escape routes only",
      "All areas of the building",
      "Defined high-value or high-risk areas only",
      "Only plant rooms and stores"
    ],
    correctAnswer: 2,
    explanation: "P2 provides targeted detection in defined high-value or high-risk areas where property protection is specifically required."
  },
  {
    id: 4,
    question: "Insurers typically require property protection to be provided by:",
    options: [
      "M category only",
      "L4 systems",
      "P1 or P2 depending on risk and coverage requirements",
      "Manual call points only"
    ],
    correctAnswer: 2,
    explanation: "Insurers commonly specify P1 for comprehensive coverage or P2 for targeted high-value area protection."
  },
  {
    id: 5,
    question: "Which building area would most likely require P2 protection?",
    options: [
      "General office space",
      "Server room or data centre",
      "Reception area",
      "Toilet facilities"
    ],
    correctAnswer: 1,
    explanation: "Server rooms and data centres contain high-value equipment requiring targeted property protection."
  },
  {
    id: 6,
    question: "Can P and L categories be combined in the same building?",
    options: [
      "No, only one category can be specified",
      "Yes, it is common to combine L3 for life safety with P2 for property protection",
      "Only if required by Building Regulations",
      "Only in industrial premises"
    ],
    correctAnswer: 1,
    explanation: "Combined categories are common - L categories address life safety while P categories address property protection objectives."
  },
  {
    id: 7,
    question: "What is a key difference between P1 and L1?",
    options: [
      "P1 covers more areas",
      "L1 is for life safety, P1 is for property protection - coverage may be similar but objectives differ",
      "P1 does not require automatic detection",
      "L1 is cheaper to install"
    ],
    correctAnswer: 1,
    explanation: "While coverage may be similar, L1 prioritises early warning for evacuation whereas P1 prioritises early detection for asset protection."
  },
  {
    id: 8,
    question: "Third-party certification for fire alarm contractors is often required by:",
    options: [
      "Building Regulations only",
      "Insurers to ensure quality and competence",
      "The fire brigade",
      "Local planning authorities"
    ],
    correctAnswer: 1,
    explanation: "Insurers frequently require third-party certified contractors (BAFE, LPCB) to ensure installation quality and reduce risk."
  },
  {
    id: 9,
    question: "For a warehouse storing high-value goods, which P category is most appropriate?",
    options: [
      "No P category needed",
      "P1 for comprehensive protection throughout",
      "P2 for targeted areas only",
      "M category"
    ],
    correctAnswer: 1,
    explanation: "Warehouses with high-value goods typically require P1 for comprehensive early detection throughout all storage areas."
  },
  {
    id: 10,
    question: "What documentation should specify the extent of P category coverage?",
    options: [
      "Weekly test records only",
      "The fire strategy, risk assessment, and design documentation",
      "Insurance policy only",
      "User training manual"
    ],
    correctAnswer: 1,
    explanation: "P category coverage should be defined in the fire strategy and design documentation, often informed by insurer requirements."
  }
];

const faqs = [
  {
    question: "Do P categories meet life safety requirements?",
    answer: "Not necessarily - P categories focus on property protection. Life safety should be addressed through appropriate L category coverage."
  },
  {
    question: "What certification do insurers typically require?",
    answer: "Third-party certification such as BAFE SP203-1 or LPCB LPS 1014 for fire detection and alarm installation companies."
  },
  {
    question: "Can P2 be specified without any L category?",
    answer: "Technically yes, but most buildings need some life safety provision. P2 alone would not address evacuation warning requirements."
  },
  {
    question: "How do I know if an insurer requires P1 or P2?",
    answer: "Contact the insurer or broker directly. Requirements depend on building use, value, and risk profile."
  },
  {
    question: "Does P1 require monitoring to a remote centre?",
    answer: "Not by default, but insurers often require Alarm Receiving Centre (ARC) connection for high-value premises."
  },
  {
    question: "What happens if insurer requirements are not met?",
    answer: "Insurance cover may be invalidated or claims may be reduced. Always confirm and document compliance."
  }
];

const FireAlarmModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-course/module-1">
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
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            P Category Systems (Property Protection)
          </h1>
          <p className="text-white/80">
            Understanding BS 5839-1 P categories for property and asset protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>P categories:</strong> Protect property and assets, not life safety</li>
              <li><strong>P1:</strong> Full coverage throughout for maximum protection</li>
              <li><strong>P2:</strong> Targeted high-value areas only</li>
              <li><strong>Insurers:</strong> Commonly specify P categories to reduce loss</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High-value stock or equipment = P category</li>
              <li><strong>Use:</strong> Engage insurers early in design</li>
              <li><strong>Apply:</strong> Combine with L categories for full protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define the purpose of P category fire alarm systems",
              "Differentiate between P1 and P2 coverage requirements",
              "Identify typical applications for property protection",
              "Explain insurer requirements and third-party certification",
              "Understand how to combine L and P categories",
              "Apply P category selection principles to scenarios"
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

        {/* Section 01: What Are P Categories? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are P Categories?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              P categories under BS 5839-1 are designed to protect property and assets. The primary objective is early detection to minimise damage to buildings, contents, and enable rapid response to protect business continuity.
            </p>
            <p>
              The "P" stands for "Property" protection. These systems prioritise detection coverage to protect valuable assets and reduce financial loss from fire damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Early detection minimises property damage</li>
                <li>Coverage protects high-value assets and business continuity</li>
                <li>Often driven by insurance requirements</li>
                <li>Can be combined with L categories for complete protection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: P1 - Full Property Protection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            P1 - Full Property Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              P1 provides automatic fire detection throughout all areas of the building. The aim is to detect any fire anywhere at the earliest possible stage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">P1 Coverage Includes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All storage and production areas</li>
                <li>All offices and ancillary spaces</li>
                <li>Plant rooms and service areas</li>
                <li>Roof and floor voids where fire could spread</li>
              </ul>
            </div>

            <p>
              Typical applications include warehouses with valuable stock, manufacturing facilities, and data centres requiring comprehensive protection.
            </p>
          </div>
        </section>

        {/* Section 03: P2 - Targeted Property Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            P2 - Targeted Property Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              P2 provides detection in defined high-value or high-risk areas only. This is a targeted approach where comprehensive coverage is not justified.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">P2 Target Areas Typically Include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Server rooms and IT infrastructure</li>
                <li>High-value equipment areas</li>
                <li>Critical process areas</li>
                <li>Valuable stock storage locations</li>
              </ul>
            </div>

            <p>
              Typical applications include office buildings with server rooms, and retail premises with high-value stockrooms.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Insurer Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Insurer Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insurers commonly specify P category systems to reduce their risk exposure. Requirements may include:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Insurer Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>P1 or P2 coverage as appropriate to risk</li>
                <li>Third-party certified contractors (BAFE, LPCB)</li>
                <li>EN 54 compliant equipment</li>
                <li>Remote monitoring or ARC connection</li>
                <li>Regular maintenance and testing records</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Warning:</strong> Failure to meet insurer requirements may invalidate cover or result in claim reduction.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Combining L and P Categories */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Combining L and P Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              It is common to combine L and P categories in the same building when both life safety and property protection objectives apply.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Combinations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>L3 for escape routes + P2 for server rooms</li>
                <li>L2 for life safety + P1 for warehouse areas</li>
                <li>L1/P1 combined where both objectives require full coverage</li>
              </ul>
            </div>

            <p>
              When categories are combined, specify clearly which areas fall under which category in the design documentation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: P vs L - Key Differences */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            P vs L - Key Differences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While P1 and L1 may have similar coverage, their objectives differ significantly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">L Categories</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Early warning for evacuation</li>
                  <li>Protect human life</li>
                  <li>Driven by fire risk assessment</li>
                  <li>Regulatory and moral obligation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">P Categories</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Early detection for response</li>
                  <li>Protect property and assets</li>
                  <li>Driven by value and business need</li>
                  <li>Commercial and insurance obligation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Engage with insurers early in the design process to confirm their requirements</li>
                <li>Use third-party certified contractors to satisfy both insurer and quality requirements</li>
                <li>Document combined L/P categories clearly in design specifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify coverage matches insurer requirements</li>
                <li>Ensure ARC connection is provided if required</li>
                <li>Obtain and retain certification documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming P categories provide life safety</strong> - they do not replace L categories</li>
                <li><strong>Not confirming insurer requirements</strong> - before specifying system category</li>
                <li><strong>Using uncertified contractors</strong> - for insurance-required installations</li>
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
                <p className="font-medium text-white mb-1">P Category Summary</p>
                <ul className="space-y-0.5">
                  <li>P1 = Full coverage throughout</li>
                  <li>P2 = Targeted high-value areas</li>
                  <li>P = Property protection focus</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Insurer driven requirements</li>
                  <li>Third-party certification often required</li>
                  <li>Combine with L for full protection</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule1Section2;
