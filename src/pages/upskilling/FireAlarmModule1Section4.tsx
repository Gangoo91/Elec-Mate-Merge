import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Category Selection & Risk Assessment - Fire Alarm Module 1 Section 4";
const DESCRIPTION = "Learn how to select the correct BS 5839-1 fire alarm category based on fire risk assessment, building use, and fire strategy requirements.";

const quickCheckQuestions = [
  {
    id: "selection-driver",
    question: "What is the primary driver for fire alarm category selection?",
    options: [
      "Cost of installation",
      "Fire risk assessment and fire strategy",
      "Building age",
      "Number of occupants only"
    ],
    correctIndex: 1,
    explanation: "Category selection must be based on fire risk assessment findings and the requirements of the fire strategy."
  },
  {
    id: "office-scenario",
    question: "A new 4-storey office building has open-plan floors, a basement car park, server room, and ground floor restaurant. How would you approach category selection?",
    options: [
      "M category throughout",
      "L4 for escape routes only",
      "L2 for life safety plus P2 for server room",
      "P1 only for property protection"
    ],
    correctIndex: 2,
    explanation: "L2 for life safety (escape routes + high-risk rooms like the restaurant kitchen), P2 for the server room. Car park may need separate consideration for ventilation system integration."
  },
  {
    id: "review-trigger",
    question: "An L3 office building is adding a 24-hour call centre that will have night shift workers. Does the category need reviewing?",
    options: [
      "No, the category is already adequate",
      "Yes, the change to 24-hour occupation may affect the risk assessment",
      "Only if the insurer requests it",
      "Only if more than 50 people work nights"
    ],
    correctIndex: 1,
    explanation: "Yes - the change to 24-hour occupation may affect the risk assessment. Consider whether L3 still provides adequate warning during night shifts when fewer people are present to raise manual alarm."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary driver for fire alarm category selection?",
    options: [
      "Cost of installation",
      "Fire risk assessment and fire strategy",
      "Building age",
      "Number of occupants only"
    ],
    correctAnswer: 1,
    explanation: "Category selection must be based on fire risk assessment findings and the requirements of the fire strategy."
  },
  {
    id: 2,
    question: "Which document formally defines the fire alarm category required?",
    options: [
      "Weekly test logbook",
      "Maintenance contract",
      "Fire strategy document",
      "Insurance policy only"
    ],
    correctAnswer: 2,
    explanation: "The fire strategy document defines life safety provisions including the required fire alarm category."
  },
  {
    id: 3,
    question: "When selecting between L1 and L2, what is the key consideration?",
    options: [
      "Installation cost only",
      "Whether full coverage or targeted high-risk coverage meets life safety objectives",
      "Age of the building",
      "Number of floors only"
    ],
    correctAnswer: 1,
    explanation: "The choice depends on whether the fire strategy requires comprehensive (L1) or targeted (L2) detection."
  },
  {
    id: 4,
    question: "A mixed-use building with offices and a warehouse might require:",
    options: [
      "M category throughout",
      "L3 for offices, P1 for warehouse - combined categories",
      "No fire alarm system",
      "Only call points"
    ],
    correctAnswer: 1,
    explanation: "Different zones may have different needs - life safety for offices, property protection for warehouse."
  },
  {
    id: 5,
    question: "Who should be consulted during category selection?",
    options: [
      "Only the building owner",
      "Fire engineer, insurer, and building control as appropriate",
      "Only the fire alarm installer",
      "The general contractor only"
    ],
    correctAnswer: 1,
    explanation: "Category selection may involve multiple stakeholders depending on building type and requirements."
  },
  {
    id: 6,
    question: "If the fire risk assessment identifies sleeping risk, which categories are typically considered?",
    options: [
      "M or P2 only",
      "L1 or L2 depending on building layout",
      "L4 only",
      "P1 only"
    ],
    correctAnswer: 1,
    explanation: "Sleeping risk requires enhanced life safety detection, typically L1 for full coverage or L2 for targeted."
  },
  {
    id: 7,
    question: "What should happen if the fire risk assessment is updated?",
    options: [
      "No action needed",
      "Category selection should be reviewed and system upgraded if necessary",
      "Only test more frequently",
      "Remove the existing system"
    ],
    correctAnswer: 1,
    explanation: "Changes in risk may require changes to category selection and system design."
  },
  {
    id: 8,
    question: "Cause-and-effect documentation should be developed:",
    options: [
      "After installation is complete",
      "During design stage in consultation with stakeholders",
      "Only if requested by the user",
      "By the maintenance contractor"
    ],
    correctAnswer: 1,
    explanation: "Cause-and-effect should be agreed during design to ensure the system meets all operational requirements."
  },
  {
    id: 9,
    question: "Which factor would NOT typically influence category selection?",
    options: [
      "Occupancy type (sleeping, public, etc.)",
      "Fire load and ignition sources",
      "Colour of the building exterior",
      "Evacuation strategy"
    ],
    correctAnswer: 2,
    explanation: "Category selection is based on risk, occupancy, and strategy - not aesthetic factors."
  },
  {
    id: 10,
    question: "For a school with science labs, how would you approach category selection?",
    options: [
      "M throughout as it is low risk",
      "L2 with detection on escape routes plus targeted coverage in high-risk labs",
      "No fire alarm needed",
      "P1 only for property protection"
    ],
    correctAnswer: 1,
    explanation: "Schools typically require L2 - escape route protection plus detection in high-risk areas like labs."
  }
];

const faqs = [
  {
    question: "Who ultimately decides the fire alarm category?",
    answer: "The category should be defined in the fire strategy. The designer specifies a system to meet those requirements, which may be reviewed by building control."
  },
  {
    question: "Can the client choose a lower category to save money?",
    answer: "Not if it conflicts with fire strategy requirements or risk assessment findings. Life safety must take priority over cost."
  },
  {
    question: "What if insurer and fire strategy requirements differ?",
    answer: "Meet both - the higher standard applies. Document clearly which areas serve which purpose."
  },
  {
    question: "How often should category selection be reviewed?",
    answer: "Whenever there are significant changes to building use, layout, or occupancy. Also when the fire risk assessment is updated."
  },
  {
    question: "Can I specify a higher category than required?",
    answer: "Yes - there is no upper limit. A client may choose L1 where L2 would suffice, though this increases cost and false alarm potential."
  },
  {
    question: "What documentation is needed for category selection?",
    answer: "Design certificate, specification, cause-and-effect matrix, and reference to fire strategy. Keep records of stakeholder consultations."
  }
];

const FireAlarmModule1Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 1 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Category Selection & Risk Assessment
          </h1>
          <p className="text-white/80">
            Applying fire risk assessment principles to select the appropriate BS 5839-1 category
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fire risk assessment:</strong> Drives category selection</li>
              <li><strong>Fire strategy:</strong> Defines required category</li>
              <li><strong>Stakeholders:</strong> Fire engineer, insurer, building control</li>
              <li><strong>Documentation:</strong> Record rationale and justification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Changes in use = review category</li>
              <li><strong>Use:</strong> Consult stakeholders early</li>
              <li><strong>Apply:</strong> Document all decisions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Link fire risk assessment to category selection",
              "Identify key factors influencing category choice",
              "Apply selection principles to different building types",
              "Understand stakeholder consultation requirements",
              "Document and justify category selection",
              "Review and update categories when risks change"
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

        {/* Section 01: The Selection Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Selection Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm category selection is a systematic process driven by risk, not by cost or convenience.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Steps:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal">
                <li>Review fire risk assessment findings</li>
                <li>Identify life safety and property protection objectives</li>
                <li>Consult fire strategy document requirements</li>
                <li>Consider stakeholder requirements (insurer, building control)</li>
                <li>Select appropriate L/P/M category combination</li>
                <li>Document rationale and justification</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Key Selection Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Selection Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The following factors influence category selection:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Influencing Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Occupancy type</strong> - sleeping, public, vulnerable persons</li>
                <li><strong>Fire load</strong> - fuel, storage, processes</li>
                <li><strong>Ignition sources</strong> - electrical, heating, cooking</li>
                <li><strong>Building layout</strong> - escape routes, compartmentation</li>
                <li><strong>Evacuation strategy</strong> - simultaneous, phased, progressive</li>
                <li><strong>Asset value</strong> - high-value equipment, stock, data</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03: Common Building Scenarios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Building Scenarios
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Typical category selections for common building types:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Hotels / Care Homes</p>
                <p className="text-sm text-white">L1 (full coverage) due to sleeping risk and vulnerable occupants</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Offices</p>
                <p className="text-sm text-white">L2 or L3 + P2 for server rooms. Full L1 rarely justified.</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Schools</p>
                <p className="text-sm text-white">L2 with detection on routes plus labs, kitchens, stores</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Warehouses</p>
                <p className="text-sm text-white">L3 for escape routes + P1 for property (insurer-driven)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Stakeholder Consultation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Stakeholder Consultation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Category selection may require consultation with multiple parties:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Stakeholders:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire engineer</strong> - fire strategy, system design</li>
                <li><strong>Building control</strong> - Building Regulations compliance</li>
                <li><strong>Insurer</strong> - property protection requirements</li>
                <li><strong>Client/operator</strong> - operational needs, false alarm management</li>
                <li><strong>Fire and rescue service</strong> - for complex or high-risk buildings</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Important:</strong> Record all consultations and agreements in design documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Cause-and-Effect Matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cause-and-Effect Matrix
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The cause-and-effect matrix documents what happens when the fire alarm activates:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Outputs:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Sounder activation zones and sequences</li>
                <li>Fire door release (magnetic holders)</li>
                <li>Smoke ventilation and damper control</li>
                <li>Lift recall to ground/fire floor</li>
                <li>HVAC shutdown or fire mode</li>
                <li>Gas shut-off in kitchens/plant</li>
              </ul>
            </div>

            <p>
              Develop cause-and-effect during design stage with all relevant stakeholders.
            </p>
          </div>
        </section>

        {/* Section 06: Reviewing and Updating */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Reviewing and Updating
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Category selection should be reviewed when:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Review Triggers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Building use or occupancy changes</li>
                <li>Fire risk assessment is updated</li>
                <li>Building layout or compartmentation changes</li>
                <li>Insurer requirements change</li>
                <li>Regulations or standards are updated</li>
              </ul>
            </div>

            <p>
              Document any changes with updated certificates and cause-and-effect.
            </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Selecting Categories</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start with the fire strategy document - let it drive your category selection</li>
                <li>Engage insurers early if property protection is likely to be required</li>
                <li>Document your rationale clearly - you may need to justify decisions later</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Design certificate with category specified</li>
                <li>Cause-and-effect matrix</li>
                <li>Fire strategy reference</li>
                <li>Stakeholder consultation records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Selecting category based on cost</strong> - without proper risk justification</li>
                <li><strong>Not reviewing category</strong> - when building use changes</li>
                <li><strong>Failing to consult stakeholders</strong> - during design</li>
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
                <p className="font-medium text-white mb-1">Selection Process</p>
                <ul className="space-y-0.5">
                  <li>1. Review fire risk assessment</li>
                  <li>2. Check fire strategy</li>
                  <li>3. Consult stakeholders</li>
                  <li>4. Select and document</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Risk drives selection, not cost</li>
                  <li>Review when use changes</li>
                  <li>Document all decisions</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/fire-alarm/module-2">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule1Section4;
