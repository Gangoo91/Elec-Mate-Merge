import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Categories of Electrical Faults - Module 7.1.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about the four main categories of electrical faults: design, installation, deterioration, and external damage faults.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What type of fault occurs due to inadequate circuit design?",
    options: ["Installation fault", "Design fault", "Deterioration fault", "External damage fault"],
    correctIndex: 1,
    explanation: "Design faults occur when circuits are inadequately designed, such as insufficient cable ratings or inadequate protection."
  },
  {
    id: 2,
    question: "Which category of fault typically results from poor workmanship?",
    options: ["Design fault", "Installation fault", "Deterioration fault", "External damage fault"],
    correctIndex: 1,
    explanation: "Installation faults result from poor workmanship during installation, such as loose connections or incorrect wiring."
  },
  {
    id: 3,
    question: "What causes deterioration faults over time?",
    options: ["Poor design", "Bad installation", "Age, wear, and environmental factors", "Physical damage"],
    correctIndex: 2,
    explanation: "Deterioration faults develop over time due to age, wear, environmental factors, and normal operational stresses."
  },
  {
    id: 4,
    question: "Give an example of external damage that could cause electrical faults.",
    options: ["Loose connections", "Inadequate cable size", "Construction work damaging cables", "Old insulation"],
    correctIndex: 2,
    explanation: "External damage includes physical damage from construction work, impact damage, or deliberate interference with electrical equipment."
  }
];

const Module7Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What type of fault occurs due to inadequate circuit design?",
      options: ["Installation fault", "Design fault", "Deterioration fault", "External damage fault"],
      correctAnswer: 1,
      explanation: "Design faults occur when circuits are inadequately designed, such as insufficient cable ratings or inadequate protection."
    },
    {
      id: 2,
      question: "Which category of fault typically results from poor workmanship?",
      options: ["Design fault", "Installation fault", "Deterioration fault", "External damage fault"],
      correctAnswer: 1,
      explanation: "Installation faults result from poor workmanship during installation, such as loose connections or incorrect wiring."
    },
    {
      id: 3,
      question: "What is a common example of a design fault?",
      options: ["Loose terminal", "Cable damaged by drill", "Insufficient cable rating for load", "Corroded connection"],
      correctAnswer: 2,
      explanation: "Insufficient cable rating for the intended load is a classic design fault that can lead to overheating and fire risks."
    },
    {
      id: 4,
      question: "Which of these is an installation fault?",
      options: ["Cable too small for load", "Incorrect polarity connections", "Insulation degradation", "Impact damage"],
      correctAnswer: 1,
      explanation: "Incorrect polarity connections are installation faults resulting from poor workmanship during the installation process."
    },
    {
      id: 5,
      question: "What causes deterioration faults over time?",
      options: ["Poor design", "Bad installation", "Age, wear, and environmental factors", "Physical damage"],
      correctAnswer: 2,
      explanation: "Deterioration faults develop over time due to age, wear, environmental factors, and normal operational stresses."
    },
    {
      id: 6,
      question: "Give an example of external damage that could cause electrical faults.",
      options: ["Loose connections", "Inadequate cable size", "Construction work damaging cables", "Old insulation"],
      correctAnswer: 2,
      explanation: "External damage includes physical damage from construction work, impact damage, or deliberate interference with electrical equipment."
    },
    {
      id: 7,
      question: "Which fault category is most likely to cause immediate danger?",
      options: ["Design faults only", "Any category can cause immediate danger", "Only external damage", "Only deterioration faults"],
      correctAnswer: 1,
      explanation: "Any category of fault can create immediate danger depending on the specific circumstances and location of the fault."
    },
    {
      id: 8,
      question: "What is the key difference between design and installation faults?",
      options: ["No difference", "Design faults occur during planning, installation faults during construction", "Only timing", "Only severity"],
      correctAnswer: 1,
      explanation: "Design faults occur during the planning/design phase, while installation faults happen during the actual construction/installation work."
    },
    {
      id: 9,
      question: "How can deterioration faults be prevented?",
      options: ["They cannot be prevented", "Regular inspection and maintenance", "Better installation only", "Improved design only"],
      correctAnswer: 1,
      explanation: "Deterioration faults can be prevented or delayed through regular inspection, maintenance, and timely replacement of aging components."
    },
    {
      id: 10,
      question: "Why is it important to understand fault categories?",
      options: ["Academic interest only", "Helps determine prevention strategies and responsibility", "No practical benefit", "Only for insurance claims"],
      correctAnswer: 1,
      explanation: "Understanding fault categories helps determine appropriate prevention strategies, assign responsibility, and implement effective maintenance programs."
    }
  ];

  const faqs = [
    {
      question: "Can one installation contain multiple fault categories?",
      answer: "Yes, it's common to find design, installation, deterioration, and external damage faults in the same electrical system."
    },
    {
      question: "Which fault category is most common during initial testing?",
      answer: "Installation faults are most common during initial testing because they result from workmanship issues during construction."
    },
    {
      question: "Which fault category usually requires complete redesign to fix?",
      answer: "Design faults typically cannot be corrected without significant redesign and modification of the electrical system."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5 -ml-2 px-3"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="font-medium">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Section 1.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Categories of Electrical Faults
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Learn about the four main categories of electrical faults and their characteristics.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed">
              <strong className="text-elec-yellow">Key Points:</strong> Four main categories: design, installation, deterioration, external damage. Each category has different causes and prevention strategies. Understanding categories helps with fault finding and responsibility.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Not all electrical faults are the same—they arise from different causes and require different approaches for prevention and correction. Understanding the four main categories of electrical faults helps electricians identify root causes, assign responsibility, and implement effective prevention strategies.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Why This Matters:</strong> Proper fault categorisation helps determine liability, guides maintenance strategies, and prevents recurrence. It's the difference between reactive repairs and proactive system management.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm">
                  <strong className="text-elec-yellow">Industry Standard:</strong> BS 7671 emphasises the importance of understanding fault origins to ensure appropriate protective measures and maintenance schedules are implemented.
                </p>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p>By the end of this subsection, learners will be able to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identify and describe the four main categories of electrical faults.</li>
                <li>Explain how each category of fault develops and their typical characteristics.</li>
                <li>Recognise real-world examples of each fault type in electrical installations.</li>
                <li>Appreciate why classification helps with fault finding, prevention, and responsibility.</li>
              </ul>
            </div>
          </section>

          {/* Design Faults */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Design Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Design faults occur before installation begins—they are errors in the planning and specification phase.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Undersized Cables</p>
                  <p className="text-sm text-white/70">Cable ratings insufficient for intended loads</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Inadequate Protection</p>
                  <p className="text-sm text-white/70">Protective devices not sized for fault conditions</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Poor Load Assessment</p>
                  <p className="text-sm text-white/70">Incorrect calculation of anticipated loads</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Environmental Neglect</p>
                  <p className="text-sm text-white/70">Failure to account for environmental conditions</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Key Characteristics:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Present from day one of installation</li>
                  <li>Often require complete redesign to correct</li>
                  <li>Can be detected through proper design review</li>
                  <li>May not be apparent until systems are loaded</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="text-sm">
                  <strong className="text-green-400">Prevention Strategy:</strong> Design faults are prevented through proper design review, adequate load assessment, compliance with BS 7671, and consideration of future requirements and environmental factors.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="design-faults-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Installation Faults */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Installation Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Installation faults arise during construction and are typically caused by poor workmanship.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Workmanship Issues</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Loose terminal connections</li>
                    <li>Incorrect polarity connections</li>
                    <li>Damaged cables during installation</li>
                    <li>Poor cable management</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">System Errors</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Missing or incorrect earthing</li>
                    <li>Cross-connected circuits</li>
                    <li>Inadequate IP ratings for location</li>
                    <li>Non-compliance with BS 7671</li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Detection Methods</p>
                  <p className="text-sm text-white/70">Initial testing and inspection reveals most installation faults</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Prevention</p>
                  <p className="text-sm text-white/70">Proper training, supervision, and quality control procedures</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="text-sm">
                  <strong className="text-amber-400">Important Note:</strong> Installation faults are the most preventable category through proper training, supervision, and adherence to installation standards and procedures.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="installation-faults-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Deterioration Faults */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Deterioration Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Deterioration faults develop over time as systems age and components degrade.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Environmental Factors</p>
                  <p className="text-sm text-white/70">Heat, moisture, chemicals, and UV causing material degradation</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Operational Stress</p>
                  <p className="text-sm text-white/70">Thermal cycling, vibration, and electrical stress over time</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Material Aging</p>
                  <p className="text-sm text-white/70">Natural degradation of insulation, conductors, and protective devices</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Corrosion</p>
                  <p className="text-sm text-white/70">Electrochemical processes affecting connections and components</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Management Strategy:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Regular inspection and testing programs</li>
                  <li>Planned maintenance and component replacement</li>
                  <li>Environmental protection measures</li>
                  <li>Monitoring of system performance indicators</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="text-sm">
                  <strong className="text-purple-400">Key Understanding:</strong> Deterioration is inevitable but manageable. Regular inspection and maintenance can identify degradation before it becomes dangerous or causes system failure.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="deterioration-faults-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* External Damage Faults */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              External Damage Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                External damage faults are caused by influences outside the electrical system itself.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Physical Impact</p>
                  <p className="text-sm text-white/70">Construction work, vehicle impact, or accidental damage to equipment</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Penetration Damage</p>
                  <p className="text-sm text-white/70">Nails, screws, or drilling through concealed cables</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Animal Damage</p>
                  <p className="text-sm text-white/70">Rodents chewing through cables or nesting in equipment</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Environmental Events</p>
                  <p className="text-sm text-white/70">Flooding, fire, lightning, or extreme weather damage</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Protection Strategies:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Proper cable routing and mechanical protection</li>
                  <li>Adequate IP ratings for environmental conditions</li>
                  <li>Physical barriers and enclosures</li>
                  <li>Clear marking and identification of electrical services</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm">
                  <strong className="text-red-400">Critical Point:</strong> While external damage may be unpredictable, proper installation practices and protective measures can significantly reduce the risk and severity of such incidents.
                </p>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck
              id="external-damage-check"
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </div>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-white mb-2">Fault Identification and Classification:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Always determine the fault category as part of the investigation process.</li>
                  <li>Consider when the fault likely occurred and what may have caused it.</li>
                  <li>Document the category in fault reports to help with prevention strategies.</li>
                  <li>Use categorisation to guide discussions about responsibility and liability.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Prevention Strategies by Category:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Design:</strong> Thorough design review, proper load assessment, compliance verification.</li>
                  <li><strong>Installation:</strong> Skilled tradespeople, proper supervision, quality control procedures.</li>
                  <li><strong>Deterioration:</strong> Regular inspection, planned maintenance, environmental protection.</li>
                  <li><strong>External Damage:</strong> Proper protection, clear marking, risk assessment.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white mb-2">Professional Application:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Use fault categories to advise clients on prevention and maintenance needs.</li>
                  <li>Implement targeted inspection procedures based on likely fault categories.</li>
                  <li>Establish responsibility and liability through proper fault categorisation.</li>
                  <li>Develop maintenance schedules appropriate to fault risk categories.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <p className="font-medium text-white mb-3">Case Study: Office Building Fault Investigation</p>
              <div className="text-white/80 space-y-3 text-sm leading-relaxed">
                <p>
                  During testing of an office refurbishment, electricians found multiple faults that clearly demonstrated all four categories:
                </p>
                <ul className="space-y-2">
                  <li><strong>Design Fault:</strong> The main distribution board cables were consistently overheating because they were undersized for the connected load—a design error that existed from day one.</li>
                  <li><strong>Installation Fault:</strong> Several socket circuits had loose earth connections at terminals, clearly resulting from poor workmanship during installation.</li>
                  <li><strong>Deterioration Fault:</strong> Lighting circuits in the roof space showed degraded insulation due to prolonged exposure to heat from poorly ventilated areas.</li>
                  <li><strong>External Damage Fault:</strong> One circuit was completely dead due to a cable damaged by a contractor's screw during recent partition installation work.</li>
                </ul>
                <p>
                  <strong>Outcome:</strong> Each fault category required a different response—redesign for the undersized cables, repair work for installation faults, planned replacement for deteriorated circuits, and protection measures to prevent future external damage.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">{faq.question}</p>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="list-disc pl-5 space-y-2 text-white/80 text-sm">
                <li>Design faults occur during planning and typically require redesign to correct properly.</li>
                <li>Installation faults result from poor workmanship and are preventable through proper training and supervision.</li>
                <li>Deterioration faults develop over time and require regular inspection and maintenance to manage effectively.</li>
                <li>External damage faults are caused by outside influences but can be minimised through proper protection and installation practices.</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Quiz
            </h2>
            <Quiz questions={quizQuestions} title="Categories of Electrical Faults" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="min-h-[48px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5 justify-start"
              asChild
            >
              <Link to="../1-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Risks and Consequences
              </Link>
            </Button>
            <Button
              className="min-h-[48px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90 justify-center sm:justify-end"
              asChild
            >
              <Link to="../1-5">
                Legal Responsibilities
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section1_4;
