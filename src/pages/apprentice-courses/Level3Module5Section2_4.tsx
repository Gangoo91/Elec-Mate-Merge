/**
 * Level 3 Module 5 Section 2.4 - Recording Inspection Observations (C1, C2, C3 codes)
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Recording Inspection Observations - Level 3 Module 5 Section 2.4";
const DESCRIPTION = "Master the proper recording of inspection findings using C1, C2, C3 and FI classification codes for electrical installation condition reports (EICRs).";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What information must be included when recording each observation on an EICR?",
    options: [
      "Just the classification code (C1, C2, C3, or FI)",
      "Location, description of the observation, and classification code",
      "The estimated cost of repair",
      "The name of the person who will fix it"
    ],
    correctIndex: 1,
    explanation: "Each observation must include the specific location (circuit reference, room, position), a clear technical description of what was found, and the appropriate classification code. This enables anyone reading the report to understand and locate the issue."
  },
  {
    id: "check-2",
    question: "When should a Schedule of Inspections be completed?",
    options: [
      "Only for new installations",
      "Only when dangerous conditions are found",
      "For both initial verification and periodic inspection",
      "Only for commercial installations"
    ],
    correctIndex: 2,
    explanation: "The Schedule of Inspections is required for both initial verification (new work) and periodic inspection (existing installations). It records which items were checked and their condition, providing a systematic record of the inspection process."
  },
  {
    id: "check-3",
    question: "What does 'LIM' or a limitation entry indicate on an EICR?",
    options: [
      "A limited warranty on the work",
      "Areas that could not be fully inspected or tested",
      "A limit on the number of circuits",
      "A limitation on the inspector's qualifications"
    ],
    correctIndex: 1,
    explanation: "Limitations record parts of the installation that could not be fully inspected or tested - such as concealed wiring, inaccessible areas, or equipment that could not be isolated. They ensure the client understands what was and wasn't included in the inspection."
  },
  {
    id: "check-4",
    question: "Who must sign the Electrical Installation Condition Report?",
    options: [
      "Only the client",
      "Only the inspector",
      "The inspector and, where applicable, their supervisor",
      "The building owner and tenant"
    ],
    correctIndex: 2,
    explanation: "The EICR must be signed by the inspector who carried out the work. If the inspector is not competent to supervise their own work (e.g., they are in training), it must also be signed by a qualified supervisor who takes responsibility for the inspection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to IET guidance, what is the recommended format for recording an observation?",
    options: [
      "Code first, then description",
      "Location, observation description, then classification code",
      "Description only, code is optional",
      "Photo reference only"
    ],
    correctAnswer: 1,
    explanation: "The recommended format is: Location (where is it), Observation (what is wrong), Classification (how serious). For example: 'Kitchen socket outlet way 3, position 2 - cracked faceplate exposing terminals - C2'. This logical order helps readers understand and locate issues."
  },
  {
    id: 2,
    question: "The Schedule of Test Results must include which of the following for each circuit?",
    options: [
      "Only the pass/fail result",
      "Circuit designation, protective device details, and all test results",
      "Just the insulation resistance value",
      "Only circuits that failed testing"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Test Results must record complete information for every circuit tested: circuit designation, cable size, length, protective device type and rating, plus all relevant test results (continuity, insulation resistance, Zs, RCD trip times etc.)."
  },
  {
    id: 3,
    question: "What determines the 'date of next inspection' recommendation on an EICR?",
    options: [
      "It must always be exactly 5 years",
      "Based on the type, use and condition of the installation",
      "The client decides the interval",
      "It is set by the local authority"
    ],
    correctAnswer: 1,
    explanation: "The recommended interval is based on professional judgement considering: the type of installation, its use and operation, frequency of maintenance, and the condition found during inspection. IET Guidance Note 3 provides typical intervals, but these are guidance not fixed requirements."
  },
  {
    id: 4,
    question: "When multiple observations are found on the same circuit, how should they be recorded?",
    options: [
      "Group them as one observation",
      "Record each observation separately with its own classification",
      "Only record the most serious one",
      "List them alphabetically"
    ],
    correctAnswer: 1,
    explanation: "Each observation should be recorded separately with its own location, description, and classification. A circuit might have multiple issues of different severity (e.g., a C2 earth fault and a C3 missing label). Recording them separately ensures each is properly addressed."
  },
  {
    id: 5,
    question: "What is the purpose of the 'Particulars of Installation' section on the EICR?",
    options: [
      "To record test equipment used",
      "To document basic installation details including supply, earthing and bonding",
      "To list all circuits",
      "To record the client's personal details"
    ],
    correctAnswer: 1,
    explanation: "The Particulars section records fundamental installation information: type of earthing system (TN-S, TN-C-S, TT), supply characteristics, main protective devices, and presence of main bonding. This context is essential for understanding test results and compliance."
  },
  {
    id: 6,
    question: "How should an inspector record a situation where testing could not be completed safely?",
    options: [
      "Leave the test result blank",
      "Record 'N/A' without explanation",
      "Record as a limitation with explanation of why testing wasn't possible",
      "Refuse to issue the EICR"
    ],
    correctAnswer: 2,
    explanation: "Any tests that couldn't be completed must be recorded as limitations with clear explanation - for example, 'Zs not tested on shower circuit - could not isolate supply safely'. This protects the inspector and informs the client of the scope of testing."
  },
  {
    id: 7,
    question: "The EICR form requires the overall assessment to be stated as:",
    options: [
      "Pass, Fail, or Borderline",
      "Satisfactory, Unsatisfactory, or Further Investigation",
      "Satisfactory or Unsatisfactory",
      "Good, Average, or Poor"
    ],
    correctAnswer: 2,
    explanation: "The overall assessment must be either 'Satisfactory' (no C1, C2, or FI observations) or 'Unsatisfactory' (any C1, C2, or FI present). There is no middle ground - the installation either meets the required standard or it does not."
  },
  {
    id: 8,
    question: "According to BS 7671 Regulation 634.2, what information must be recorded about protective devices?",
    options: [
      "Only the manufacturer's name",
      "Type, nominal current rating, and short-circuit capacity",
      "Only whether they are working",
      "Purchase date and warranty information"
    ],
    correctAnswer: 1,
    explanation: "For each protective device, the type (MCB, RCBO, fuse), nominal current rating (In), and where relevant, the short-circuit capacity must be recorded. This information is essential for verifying circuit protection and coordination."
  },
  {
    id: 9,
    question: "When should photographs be included with an EICR?",
    options: [
      "Never - they are not part of the official documentation",
      "Only if the client requests them",
      "When they help clarify observations, particularly for dangerous conditions",
      "Only for commercial installations"
    ],
    correctAnswer: 2,
    explanation: "While not mandatory, photographs are valuable evidence that can clarify written observations, particularly for C1 and C2 conditions. They provide visual proof of conditions found and can be helpful for both the client and for any potential disputes or legal proceedings."
  },
  {
    id: 10,
    question: "What is the inspector's responsibility regarding a Danger Present notification?",
    options: [
      "Issue it only if the client requests",
      "Issue it immediately when C1 conditions are found and ensure the duty holder receives it",
      "Issue it only after all testing is complete",
      "Issue it only for commercial premises"
    ],
    correctAnswer: 1,
    explanation: "When danger is present (C1), the inspector must issue a formal Danger Present notification to the duty holder (person responsible for the installation). This should be done as soon as the danger is identified, not left until the end of the inspection."
  },
  {
    id: 11,
    question: "How long must records of electrical installation certificates and EICRs be retained?",
    options: [
      "1 year",
      "5 years",
      "For the life of the installation",
      "Until the next inspection"
    ],
    correctAnswer: 2,
    explanation: "Regulation 631.2 requires that records be retained for the lifetime of the installation. Copies should be held by both the electrical contractor and the person ordering the work. Digital storage is acceptable provided it meets data retention requirements."
  },
  {
    id: 12,
    question: "What is the difference between the Schedule of Inspections and Schedule of Test Results?",
    options: [
      "They are the same document",
      "Inspections record visual checks; Test Results record measured values",
      "Inspections are for new work only",
      "Test Results are optional"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections records visual checks (correct connections, cable support, accessibility, labelling etc.). The Schedule of Test Results records measured values from instrument testing (continuity, insulation resistance, Zs, RCD trip times). Both are required."
  }
];

const faqs = [
  {
    question: "Can I use my own EICR form format or must I use the BS 7671 model forms?",
    answer: "You can use any format provided it contains all the information required by BS 7671. Many electrical contractors and certification bodies have their own versions. Electronic systems like Certsure, NICEIC, and NAPIT certification software are widely accepted. The key is that all required information is captured."
  },
  {
    question: "How detailed should observation descriptions be?",
    answer: "Detailed enough for any competent person to locate and understand the issue without seeing it. Include: specific location (circuit reference, room, position), what component is affected, what the defect or non-compliance is, and the classification. Avoid vague terms like 'various defects' or 'needs attention'."
  },
  {
    question: "What if I find more observations than will fit on the form?",
    answer: "Use continuation sheets. Most EICR forms have provision for this, or you can attach additional pages referenced to the main form. Ensure continuation sheets are properly numbered and attached. Electronic systems typically allow unlimited observations."
  },
  {
    question: "Should I provide repair recommendations with observations?",
    answer: "While the EICR records what was found (observations), it is not a repair specification. However, it is helpful to give general guidance on the type of remedial work needed. The detailed scope of repairs is usually covered by a separate quotation or specification."
  },
  {
    question: "How do I handle a client who refuses to accept my findings?",
    answer: "Your findings are technical judgements based on BS 7671 - they are not negotiable. Document the conversation. Issue the EICR as completed. For C1 conditions, issue the Danger Present notification and consider whether to report to the relevant authority if there is immediate risk to life and the client refuses to act."
  },
  {
    question: "What information must I provide to the client at the end of the inspection?",
    answer: "You must provide the completed EICR, Schedule of Inspections, and Schedule of Test Results. For C1 observations, a Danger Present notification. You should also verbally explain the key findings, overall assessment, and recommended next steps. Keep copies of everything you provide."
  }
];

const Level3Module5Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Location:</strong> Where exactly is the issue?</li>
              <li><strong>Observation:</strong> What precisely is wrong?</li>
              <li><strong>Classification:</strong> C1, C2, C3, or FI</li>
              <li><strong>Documentation:</strong> EICR + Schedules</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Documentation Hierarchy</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EICR:</strong> Overall report and observations</li>
              <li><strong>Schedule of Inspections:</strong> Visual checks</li>
              <li><strong>Schedule of Test Results:</strong> Measured values</li>
              <li><strong>Danger Notice:</strong> For C1 conditions</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: The EICR Form Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The EICR Form Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrical Installation Condition Report (EICR) is the formal document that records the findings of a periodic inspection. BS 7671 Appendix 6 provides model forms, though equivalent formats are acceptable provided all required information is captured. Understanding the form structure ensures complete and compliant documentation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EICR form sections:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Section 1:</strong> Details of the person ordering the report and installation address</li>
                <li><strong>Section 2:</strong> Purpose of the report and extent of the installation covered</li>
                <li><strong>Section 3:</strong> Summary of the condition - overall assessment (Satisfactory/Unsatisfactory)</li>
                <li><strong>Section 4:</strong> Particulars of the installation (supply, earthing, bonding)</li>
                <li><strong>Section 5:</strong> Observations and recommendations with classification codes</li>
                <li><strong>Section 6:</strong> Summary of inspection items (Schedule of Inspections)</li>
                <li><strong>Section 7:</strong> Schedule of Test Results for each circuit</li>
                <li><strong>Section 8:</strong> Declaration and signature(s)</li>
              </ul>
            </div>

            <p>
              Each section must be completed accurately. The particulars of the installation (Section 4) are especially important as they record the earthing system type, supply characteristics, and protective devices - information essential for interpreting test results and assessing compliance.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The EICR is a legal document. Incomplete or inaccurate information could have serious consequences if referenced in legal proceedings following an electrical incident.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Recording Observations Effectively */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Recording Observations Effectively
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every observation recorded on the EICR must be clear, specific, and actionable. A vague observation fails both the client (who cannot understand what is wrong) and any electrician tasked with repairs (who cannot locate the issue). Follow a consistent format for all observations.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Location (Where)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Circuit reference number/designation</li>
                  <li>Room or area name</li>
                  <li>Position (first socket left of door)</li>
                  <li>Floor level if multi-storey</li>
                  <li>Distribution board reference</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Observation (What)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Component affected</li>
                  <li>Nature of defect or non-compliance</li>
                  <li>Relevant regulation if applicable</li>
                  <li>Test result if relevant</li>
                  <li>Specific technical description</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Classification (How Serious)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>C1 - Danger present</li>
                  <li>C2 - Potentially dangerous</li>
                  <li>C3 - Improvement recommended</li>
                  <li>FI - Further investigation required</li>
                  <li>Clear justification if questioned</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example observations (good practice):</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Location:</strong> Kitchen ring main (Way 3), socket position 4 (behind fridge)</li>
                <li><strong>Observation:</strong> Protective conductor disconnected at socket terminal</li>
                <li><strong>Classification:</strong> C2 - No earth fault protection for equipment connected here</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Compare with poor example:</strong> "Earth fault on kitchen circuit" - This tells us nothing about which socket, what the fault is, or how to find it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Schedule of Inspections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Schedule of Inspections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Schedule of Inspections documents all visual checks performed during the inspection. It provides a systematic record of what was examined and the condition found. Each item is typically marked with a tick (acceptable), cross (not acceptable), or N/A (not applicable) or LIM (limitation).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key inspection schedule categories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.0 Intake equipment:</strong> Service head, meter, isolator, consumer unit</li>
                <li><strong>2.0 Methods of protection:</strong> ADS, earthing, bonding</li>
                <li><strong>3.0 Distribution equipment:</strong> Boards, protective devices, enclosures</li>
                <li><strong>4.0 Final circuits:</strong> Socket outlets, lighting, fixed equipment</li>
                <li><strong>5.0 Isolation and switching:</strong> Main switch, circuit isolation, functional switching</li>
                <li><strong>6.0 Current-using equipment:</strong> Fixed equipment, connection methods</li>
                <li><strong>7.0 Special locations:</strong> Bathrooms, swimming pools, external areas</li>
              </ul>
            </div>

            <div className="grid grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-green-400/80 mb-1">Tick</p>
                <p className="text-white/90 text-xs">Item inspected and acceptable</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-red-400/80 mb-1">Cross</p>
                <p className="text-white/90 text-xs">Item inspected but not acceptable</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-blue-400/80 mb-1">N/A</p>
                <p className="text-white/90 text-xs">Not applicable to this installation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-purple-400/80 mb-1">LIM</p>
                <p className="text-white/90 text-xs">Could not inspect - limitation</p>
              </div>
            </div>

            <p>
              Any item marked with a cross should have a corresponding observation recorded in Section 5 of the EICR, explaining what was wrong and providing the appropriate classification. Items marked LIM should be explained in the limitations section.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The Schedule of Inspections must be completed for every inspection. It demonstrates systematic checking and provides evidence of what was examined if questions arise later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Documentation and Record Keeping */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation and Record Keeping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation protects everyone involved - the inspector, the client, and future occupants. BS 7671 Regulation 631.2 requires that records be retained for the lifetime of the installation. Both paper and electronic records are acceptable, provided they meet retention requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation to provide to client:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Completed EICR (all sections)</li>
                <li>Schedule of Inspections</li>
                <li>Schedule of Test Results</li>
                <li>Danger Present notification (if C1 observations found)</li>
                <li>Any photographs or supporting evidence</li>
                <li>Explanation of findings and recommendations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Records to retain:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Copies of all documentation provided to client</li>
                <li>Test instrument calibration certificates</li>
                <li>Any correspondence regarding the inspection</li>
                <li>Records of verbal discussions about dangerous conditions</li>
                <li>Evidence of handover (client signature where possible)</li>
              </ul>
            </div>

            <p>
              For C1 observations, the Danger Present notification is a critical document. It formally notifies the duty holder of immediate danger and places responsibility on them to take action. Obtain acknowledgement of receipt where possible - this protects you if the client ignores your findings and an incident occurs.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Professional tip:</strong> Send a follow-up email summarising the key findings and confirming handover of documentation. This creates a timestamp and record of what was communicated, valuable if questions arise later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Completing the EICR Efficiently</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record observations as you go - don't rely on memory</li>
                <li>Use a systematic approach - work through the schedule methodically</li>
                <li>Take photographs of significant findings</li>
                <li>Complete test results on site while equipment is connected</li>
                <li>Review completeness before leaving site</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Limitations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Be specific about what couldn't be inspected and why</li>
                <li>Common limitations: concealed wiring, locked areas, equipment in use</li>
                <li>Recommend how to address limitations for future inspections</li>
                <li>Consider if limitations affect the overall assessment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Documentation Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete sections:</strong> Every applicable section must be completed</li>
                <li><strong>Vague observations:</strong> Be specific about location and nature</li>
                <li><strong>Missing signatures:</strong> The EICR must be signed before issue</li>
                <li><strong>No limitations recorded:</strong> Be honest about what wasn't inspected</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">EICR Requirements</p>
                <ul className="space-y-0.5">
                  <li>BS 7671 Regulation 631.1 - Record keeping</li>
                  <li>Regulation 631.2 - Retention of records</li>
                  <li>Chapter 63 - Reporting requirements</li>
                  <li>Appendix 6 - Model forms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Overall Assessment</p>
                <ul className="space-y-0.5">
                  <li>SATISFACTORY = Only C3 or no observations</li>
                  <li>UNSATISFACTORY = Any C1, C2, or FI</li>
                  <li>Next inspection date = Professional judgement</li>
                  <li>IET Guidance Note 3 = Recommended intervals</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section3">
              Next: Testing Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section2_4;
