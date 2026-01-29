import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Inspection and Test Plans - HNC Module 5 Section 4.2";
const DESCRIPTION = "Master ITP development for MEP works: hold points, witness points, notification procedures, inspection scheduling, acceptance criteria, and sign-off procedures for building services quality management.";

const quickCheckQuestions = [
  {
    id: "itp-definition",
    question: "What is the primary purpose of an Inspection and Test Plan (ITP)?",
    options: ["To replace quality management systems", "To document inspection and verification stages throughout installation", "To record final test results only", "To schedule maintenance activities"],
    correctIndex: 1,
    explanation: "An ITP documents all inspection, testing, and verification stages throughout the installation process, ensuring quality requirements are met at each critical point before work proceeds."
  },
  {
    id: "hold-point-def",
    question: "What happens at a Hold Point in an ITP?",
    options: ["Work continues while inspection is arranged", "Contractor notifies client but proceeds", "Work MUST stop until formal sign-off is obtained", "Documentation is filed for later review"],
    correctIndex: 2,
    explanation: "At a Hold Point, work must completely stop until the designated party (client, engineer, or authority) has inspected and formally signed off. Work cannot proceed without this approval."
  },
  {
    id: "witness-point-def",
    question: "How does a Witness Point differ from a Hold Point?",
    options: ["Witness Points are more important", "Work may proceed if the witness doesn't attend after notification", "Witness Points don't require documentation", "They are the same thing"],
    correctIndex: 1,
    explanation: "At a Witness Point, the contractor notifies the relevant party who may attend if they wish. If they don't attend within the notification period, work may proceed with contractor documentation."
  },
  {
    id: "notification-period",
    question: "What is a typical notification period for Hold Points on MEP works?",
    options: ["2 hours", "24-48 hours", "7 days", "Same day"],
    correctIndex: 1,
    explanation: "Hold Points typically require 24-48 hours advance notification to allow the witnessing party to schedule attendance. Critical or complex inspections may require longer notice periods."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which document forms the foundation for developing an ITP?",
    options: [
      "The contractor's standard procedures",
      "The project specification and quality requirements",
      "Previous project ITPs",
      "Manufacturer's installation guides"
    ],
    correctAnswer: 1,
    explanation: "The ITP must be developed from the project specification and quality requirements, ensuring all specified inspection and test stages are captured with appropriate acceptance criteria."
  },
  {
    id: 2,
    question: "For a concealed cable installation, at what stage would a Hold Point typically be applied?",
    options: ["After final fix", "Before concealment/covering", "At project completion", "During cable delivery"],
    correctAnswer: 1,
    explanation: "Hold Points for concealed work must occur before covering - once cables are plastered over or hidden, inspection becomes destructive. Pre-concealment inspection is critical."
  },
  {
    id: 3,
    question: "Who typically signs off Hold Points on MEP installations?",
    options: [
      "The installing electrician only",
      "The project manager or designated engineer",
      "Health and safety officer",
      "The client's receptionist"
    ],
    correctAnswer: 1,
    explanation: "Hold Points are typically signed off by the project manager, supervising engineer, or designated client representative who has authority to approve continuation of work."
  },
  {
    id: 4,
    question: "What documentation must be referenced in an ITP?",
    options: [
      "Applicable standards, specifications, and drawings",
      "Contractor's profit margins",
      "Staff holiday schedules",
      "Competitor pricing"
    ],
    correctAnswer: 0,
    explanation: "An ITP must reference all applicable standards (BS 7671, CIBSE guides), project specifications, relevant drawings, and any special requirements that define acceptance criteria."
  },
  {
    id: 5,
    question: "A Witness Point notification states '48 hours notice required'. What does this mean?",
    options: [
      "Work must wait 48 hours after notification",
      "The witness has 48 hours to inspect after notification",
      "If no attendance after 48 hours, contractor may proceed",
      "Documentation must be submitted within 48 hours"
    ],
    correctAnswer: 2,
    explanation: "The notification period gives the witnessing party opportunity to attend. If they don't attend within the stated period after proper notification, the contractor may proceed with their own documentation."
  },
  {
    id: 6,
    question: "Which of these would typically be a Hold Point for main switchboard installation?",
    options: [
      "Cable tray installation",
      "Pre-energisation inspection and testing",
      "Labelling completion",
      "Drawing submission"
    ],
    correctAnswer: 1,
    explanation: "Pre-energisation inspection is a critical Hold Point - once energised, the installation cannot be safely inspected in the same way. All testing and verification must be complete before power is applied."
  },
  {
    id: 7,
    question: "What information must each ITP entry include?",
    options: [
      "Activity, inspection stage, acceptance criteria, responsibility, and reference documents",
      "Activity name only",
      "Date completed only",
      "Cost of inspection"
    ],
    correctAnswer: 0,
    explanation: "Each ITP entry must detail the activity, inspection stage, acceptance criteria, responsible parties, reference documents, record requirements, and whether it's a Hold or Witness Point."
  },
  {
    id: 8,
    question: "How should non-conformances discovered at Hold Points be handled?",
    options: [
      "Ignore and continue",
      "Record, rectify, and re-inspect before sign-off",
      "Document for end of project review",
      "Notify insurance company"
    ],
    correctAnswer: 1,
    explanation: "Non-conformances at Hold Points must be recorded on an NCR (Non-Conformance Report), rectified, and re-inspected before sign-off can be given. The Hold Point cannot be released until resolved."
  },
  {
    id: 9,
    question: "For fire alarm system installation, which phase would require the most Hold Points?",
    options: [
      "Material delivery",
      "First fix cabling",
      "Testing and commissioning",
      "Documentation handover"
    ],
    correctAnswer: 2,
    explanation: "Testing and commissioning of fire alarm systems requires multiple Hold Points: cause and effect testing, integration testing, witness testing with fire authority, and final certification."
  },
  {
    id: 10,
    question: "What is the purpose of linking ITPs to the project programme?",
    options: [
      "To track contractor productivity",
      "To ensure inspection requirements are built into the schedule with adequate notice periods",
      "To calculate bonus payments",
      "To reduce inspection frequency"
    ],
    correctAnswer: 1,
    explanation: "Linking ITPs to the programme ensures Hold Points are scheduled with adequate notification periods and that inspection resources are available when needed, preventing delays."
  }
];

const faqs = [
  {
    question: "How detailed should an ITP be for MEP installations?",
    answer: "ITPs should be detailed enough to capture every critical quality verification point without being unwieldy. For electrical installations, this typically means entries for: first fix containment, cable installation, equipment mounting, connections, testing phases, and pre-energisation. Each entry needs clear acceptance criteria linked to BS 7671 or project specifications."
  },
  {
    question: "Can Hold Points be waived or bypassed in urgent situations?",
    answer: "Hold Points should never be bypassed without formal approval. In genuine emergencies, a concession may be granted by the project manager or client representative, but this must be documented with risk assessment and alternative verification arrangements. Unauthorised bypass is a serious quality breach."
  },
  {
    question: "Who is responsible for scheduling inspections in the ITP?",
    answer: "The contractor is typically responsible for scheduling and issuing notifications for ITP inspections. They must provide adequate notice (usually 24-48 hours for Hold Points), ensure the work is ready for inspection, and have relevant documentation available. The witnessing party is responsible for attending within the notification period."
  },
  {
    question: "How do ITPs interface with BS 7671 certification requirements?",
    answer: "ITPs complement BS 7671 by capturing intermediate verification stages, while BS 7671 focuses on final certification. The ITP should include Hold Points for key BS 7671 tests (insulation resistance, earth continuity, RCD testing) and ensure Schedule of Test Results is compiled progressively. Final electrical certification becomes a Hold Point itself."
  },
  {
    question: "What records must be maintained from ITP inspections?",
    answer: "Each ITP inspection should generate: dated sign-off on the ITP sheet, inspection checklists or reports, test results where applicable, photographs of concealed work, non-conformance reports if issues found, and any concession or variation approvals. These form part of the O&M manual handover."
  },
  {
    question: "How are ITPs modified during a project?",
    answer: "ITP modifications require formal change control. If specifications change, the ITP must be updated to reflect new acceptance criteria. New activities may require additional Hold Points. Changes should be issued as controlled revisions with distribution records. Using superseded ITP versions is a common quality audit finding."
  }
];

const HNCModule5Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4">
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
            <span>Module 5.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Inspection and Test Plans
          </h1>
          <p className="text-white/80">
            ITP development, hold points, witness points, notification procedures, and inspection scheduling for MEP works
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ITP:</strong> Documents all inspection and verification stages</li>
              <li className="pl-1"><strong>Hold Point:</strong> Work stops until formal sign-off</li>
              <li className="pl-1"><strong>Witness Point:</strong> Notification given; work proceeds if no attendance</li>
              <li className="pl-1"><strong>Purpose:</strong> Ensures quality at every critical stage</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Pre-concealment:</strong> Critical Hold Point for hidden work</li>
              <li className="pl-1"><strong>Pre-energisation:</strong> Mandatory inspection before power on</li>
              <li className="pl-1"><strong>Fire systems:</strong> Multiple witness/authority inspections</li>
              <li className="pl-1"><strong>Commissioning:</strong> Staged verification with sign-offs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Develop comprehensive ITPs for MEP installations",
              "Distinguish between Hold Points and Witness Points",
              "Implement effective notification procedures",
              "Schedule inspections aligned with project programmes",
              "Define clear acceptance criteria for each inspection stage",
              "Manage sign-off procedures and non-conformance handling"
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

        {/* Section 1: ITP Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ITP Format and Content
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An Inspection and Test Plan (ITP) is a structured document that identifies all inspection,
              testing, and verification activities required throughout the installation process. For MEP works,
              the ITP ensures quality requirements from BS 7671, CIBSE guides, and project specifications are
              met at each critical stage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential ITP components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Activity description:</strong> Clear identification of the work stage</li>
                <li className="pl-1"><strong>Inspection type:</strong> Hold Point (H), Witness Point (W), or Review (R)</li>
                <li className="pl-1"><strong>Acceptance criteria:</strong> Measurable standards for compliance</li>
                <li className="pl-1"><strong>Reference documents:</strong> Standards, specifications, drawings</li>
                <li className="pl-1"><strong>Responsible parties:</strong> Who inspects and who signs off</li>
                <li className="pl-1"><strong>Records required:</strong> Checklists, test results, photographs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical ITP Structure for Electrical Installation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Acceptance Criteria</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Material delivery</td>
                      <td className="border border-white/10 px-3 py-2">R</td>
                      <td className="border border-white/10 px-3 py-2">Correct specification, undamaged</td>
                      <td className="border border-white/10 px-3 py-2">Material schedule</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment installation</td>
                      <td className="border border-white/10 px-3 py-2">W</td>
                      <td className="border border-white/10 px-3 py-2">Routing, fixings, segregation</td>
                      <td className="border border-white/10 px-3 py-2">Drawing series E-100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable installation pre-cover</td>
                      <td className="border border-white/10 px-3 py-2">H</td>
                      <td className="border border-white/10 px-3 py-2">Types, routes, support spacing</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671, Spec clause 5.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment mounting</td>
                      <td className="border border-white/10 px-3 py-2">W</td>
                      <td className="border border-white/10 px-3 py-2">Heights, accessibility, fixings</td>
                      <td className="border border-white/10 px-3 py-2">Drawing E-201</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pre-energisation testing</td>
                      <td className="border border-white/10 px-3 py-2">H</td>
                      <td className="border border-white/10 px-3 py-2">All BS 7671 tests complete</td>
                      <td className="border border-white/10 px-3 py-2">BS 7671 Part 6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commissioning</td>
                      <td className="border border-white/10 px-3 py-2">H</td>
                      <td className="border border-white/10 px-3 py-2">Functional operation verified</td>
                      <td className="border border-white/10 px-3 py-2">Spec Section 8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The ITP captures quality gates - points where quality is verified before work proceeds. Missing an inspection point risks defects being concealed or costly rework.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Hold Points vs Witness Points */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Hold Points vs Witness Points
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the distinction between Hold Points and Witness Points is fundamental to
              effective ITP management. The wrong classification can cause unnecessary delays or
              inadequate quality verification.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Hold Point (H)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Work MUST stop completely</li>
                  <li className="pl-1">Cannot proceed without formal sign-off</li>
                  <li className="pl-1">Used for critical quality verification</li>
                  <li className="pl-1">Typically requires engineer/client attendance</li>
                  <li className="pl-1">Non-conformance must be resolved first</li>
                </ul>
                <p className="text-xs text-red-400/70 mt-2">Failure to observe: serious quality breach</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-400 mb-2">Witness Point (W)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Notification given to witnessing party</li>
                  <li className="pl-1">Party may attend if they wish</li>
                  <li className="pl-1">Work proceeds if no attendance after notice</li>
                  <li className="pl-1">Contractor documents in their absence</li>
                  <li className="pl-1">Used for important but not critical stages</li>
                </ul>
                <p className="text-xs text-blue-400/70 mt-2">Notification period must be observed</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Each Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Situation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work to be concealed</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">Hold</td>
                      <td className="border border-white/10 px-3 py-2">Cannot inspect after covering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pre-energisation testing</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">Hold</td>
                      <td className="border border-white/10 px-3 py-2">Safety critical verification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire authority witness test</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">Hold</td>
                      <td className="border border-white/10 px-3 py-2">Statutory requirement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment installation</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400 font-medium">Witness</td>
                      <td className="border border-white/10 px-3 py-2">Visible, can be checked later</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Equipment positioning</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400 font-medium">Witness</td>
                      <td className="border border-white/10 px-3 py-2">Adjustable if issues found</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final labelling check</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400 font-medium">Witness</td>
                      <td className="border border-white/10 px-3 py-2">Easily rectifiable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Hold Point Examples</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electrical:</strong> Pre-concealment cable check, pre-energisation testing, EICR before handover</li>
                <li className="pl-1"><strong>Fire alarm:</strong> Cause and effect testing, fire authority witness test, certificate issue</li>
                <li className="pl-1"><strong>Emergency lighting:</strong> 3-hour duration test witness, certificate sign-off</li>
                <li className="pl-1"><strong>Data/comms:</strong> Pre-cover structured cabling, final test certification</li>
                <li className="pl-1"><strong>Earthing:</strong> Main earth electrode test before backfill</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Contract requirement:</strong> The specification typically defines minimum Hold Points. Contractors may add additional quality gates in their ITP.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Notification Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Notification Requirements and Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective notification is essential for ITP management. Poor notification leads to either
              delays (inspection party not available) or quality lapses (work proceeding without required
              verification). A robust notification system protects both contractor and client.
            </p>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Typical Notification Periods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hold Points:</strong> Minimum 24-48 hours advance notice</li>
                <li className="pl-1"><strong>Witness Points:</strong> Minimum 24 hours advance notice</li>
                <li className="pl-1"><strong>Authority inspections:</strong> As required by authority (often 5+ days)</li>
                <li className="pl-1"><strong>Complex testing:</strong> May require 72 hours or agreed schedule</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notification Content Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Information</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ITP reference number</td>
                      <td className="border border-white/10 px-3 py-2">Unique identification of inspection point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Activity description</td>
                      <td className="border border-white/10 px-3 py-2">Clear statement of what will be inspected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Location/area</td>
                      <td className="border border-white/10 px-3 py-2">Where the inspection will take place</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Date and time</td>
                      <td className="border border-white/10 px-3 py-2">When work will be ready for inspection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Documentation available</td>
                      <td className="border border-white/10 px-3 py-2">Test results, drawings, method statements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contact details</td>
                      <td className="border border-white/10 px-3 py-2">Who to meet on site</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PPE requirements</td>
                      <td className="border border-white/10 px-3 py-2">Safety equipment needed for inspection area</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Notification Process Flow</p>
              <div className="grid sm:grid-cols-4 gap-2">
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-medium text-white mb-1">1. Prepare</p>
                  <p className="text-xs text-white/70">Complete work, gather records</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-medium text-white mb-1">2. Notify</p>
                  <p className="text-xs text-white/70">Issue formal notification</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-medium text-white mb-1">3. Confirm</p>
                  <p className="text-xs text-white/70">Receive acknowledgement</p>
                </div>
                <div className="p-3 rounded bg-white/5 text-center">
                  <p className="font-medium text-white mb-1">4. Inspect</p>
                  <p className="text-xs text-white/70">Conduct inspection, sign-off</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-2">Digital Notification Systems</p>
              <p className="text-sm text-white/80">
                Modern projects often use digital platforms for ITP management. These provide automatic
                notifications, acknowledgement tracking, audit trails, and dashboard visibility of
                inspection status. Common platforms include Aconex, Procore, and project-specific QA systems.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record keeping:</strong> Always retain proof of notification (email timestamps, system logs) in case of disputes about inspection attendance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Inspection Scheduling and Sign-off */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Inspection Scheduling and Sign-off Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective scheduling integrates ITP requirements with the project programme to ensure
              inspections don't become critical path delays. This requires forward planning, resource
              allocation, and coordination with multiple parties.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scheduling Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Programme integration:</strong> Mark Hold Points on construction programme</li>
                <li className="pl-1"><strong>Batch inspections:</strong> Group similar inspections where practical</li>
                <li className="pl-1"><strong>Lead times:</strong> Build notification periods into programme durations</li>
                <li className="pl-1"><strong>Resource availability:</strong> Confirm inspector availability in advance</li>
                <li className="pl-1"><strong>Dependent trades:</strong> Coordinate with following trades awaiting sign-off</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Scheduling Example - Distribution Board Installation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Day</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ITP Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-3</td>
                      <td className="border border-white/10 px-3 py-2">Board installation, cable glanding</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400">Issue notification for W1</td>
                      <td className="border border-white/10 px-3 py-2">W1: Installation check</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400">Witness Point inspection</td>
                      <td className="border border-white/10 px-3 py-2">W1 completed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4-5</td>
                      <td className="border border-white/10 px-3 py-2">Terminations, labelling</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Issue notification for H1 (48hr)</td>
                      <td className="border border-white/10 px-3 py-2">H1: Pre-energisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Complete testing, prepare records</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Hold Point inspection</td>
                      <td className="border border-white/10 px-3 py-2">H1 sign-off required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">Energisation (after H1 release)</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Sign-off Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Dated signature from authorised representative</li>
                <li className="pl-1">Clear statement of acceptance or conditional acceptance</li>
                <li className="pl-1">Any observations or conditions noted</li>
                <li className="pl-1">Supporting documentation attached or referenced</li>
                <li className="pl-1">NCR numbers if non-conformances raised</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Conformance Handling at Inspections</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Minor Non-Conformance</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Record on inspection sheet</li>
                    <li>May allow conditional sign-off</li>
                    <li>Rectify and close out</li>
                    <li>Example: Missing label</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Major Non-Conformance</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Raise formal NCR</li>
                    <li>Hold Point not released</li>
                    <li>Requires re-inspection after rectification</li>
                    <li>Example: Failed insulation test</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Audit trail:</strong> The completed ITP with all sign-offs, NCRs, and supporting records forms a key part of the O&M manual and demonstrates quality compliance throughout the project.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Fire Alarm ITP Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop Hold Points for a Category L1 fire alarm system in a care home.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-green-400">Required Hold Points:</p>
                <p className="mt-2">H1: First fix cabling pre-concealment</p>
                <p className="ml-4 text-white/60">- Verify correct cable types (FP200)</p>
                <p className="ml-4 text-white/60">- Check fire stopping penetrations</p>
                <p className="mt-2">H2: Device installation complete</p>
                <p className="ml-4 text-white/60">- Detector spacing per BS 5839-1</p>
                <p className="ml-4 text-white/60">- Sounder coverage verification</p>
                <p className="mt-2">H3: Cause and effect testing</p>
                <p className="ml-4 text-white/60">- All zones activate correct outputs</p>
                <p className="ml-4 text-white/60">- Integration with door holders, HVAC</p>
                <p className="mt-2">H4: Fire authority witness test</p>
                <p className="ml-4 text-white/60">- Minimum 5 days notice to authority</p>
                <p className="ml-4 text-white/60">- Authority sign-off required</p>
                <p className="mt-2">H5: Final certificate issue</p>
                <p className="ml-4 text-white/60">- BS 5839-1 certificate complete</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Notification Letter</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Draft notification for pre-energisation Hold Point.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">To: Project Manager</p>
                <p className="text-white/60">Date: [Current date]</p>
                <p className="text-white/60">Ref: ITP-E-001 / HP-007</p>
                <p className="mt-2"><strong>HOLD POINT NOTIFICATION</strong></p>
                <p className="mt-2">Activity: Pre-energisation inspection - Main LV Switchboard</p>
                <p>Location: Level 1 Main Switch Room</p>
                <p>Proposed inspection: [Date + 48hrs] at 10:00</p>
                <p className="mt-2">Available documentation:</p>
                <p>- Schedule of Test Results (complete)</p>
                <p>- Electrical Installation Certificate (draft)</p>
                <p>- As-installed single line diagram</p>
                <p>- Test equipment calibration certificates</p>
                <p className="mt-2">Contact: [Site supervisor] - [Mobile number]</p>
                <p>PPE: Hard hat, safety boots, hi-vis</p>
                <p className="mt-2 text-amber-400">Please confirm attendance or nominate alternate.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Programme Integration</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 5-day cabling activity requires a pre-cover Hold Point with 48hr notice. How should this be programmed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Day 1-4: Cable installation</p>
                <p>Day 3: Issue Hold Point notification (48hr notice)</p>
                <p>Day 5: Complete installation, await inspection</p>
                <p>Day 5: Hold Point inspection (if inspector available)</p>
                <p className="mt-2 text-white/60">Programme duration: 5 days minimum</p>
                <p className="text-white/60">If Hold Point fails: +2 days for rectification and re-inspection</p>
                <p className="mt-2 text-green-400">Best practice: Build 1-day float after Hold Points</p>
                <p className="text-green-400">Realistic duration: 6 days</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ITP Development Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review specification for mandatory inspection requirements</li>
                <li className="pl-1">Identify all concealed work requiring pre-cover inspection</li>
                <li className="pl-1">Include statutory inspections (fire authority, building control)</li>
                <li className="pl-1">Define clear acceptance criteria linked to standards</li>
                <li className="pl-1">Specify notification periods for each inspection type</li>
                <li className="pl-1">Identify responsible parties and sign-off authorities</li>
                <li className="pl-1">List records required at each stage</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Hold Point notice: <strong>Minimum 24-48 hours</strong></li>
                <li className="pl-1">Fire authority notice: <strong>Typically 5+ working days</strong></li>
                <li className="pl-1">Concealed work: <strong>Always Hold Point before covering</strong></li>
                <li className="pl-1">Pre-energisation: <strong>Mandatory Hold Point</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Proceeding past Hold Points</strong> - serious quality breach, may require opening up work</li>
                <li className="pl-1"><strong>Insufficient notice</strong> - causes delays waiting for inspector</li>
                <li className="pl-1"><strong>Vague acceptance criteria</strong> - leads to disputes about compliance</li>
                <li className="pl-1"><strong>Missing records</strong> - cannot demonstrate quality compliance at handover</li>
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
                <p className="font-medium text-white mb-1">Inspection Types</p>
                <ul className="space-y-0.5">
                  <li>H - Hold Point: Work stops until sign-off</li>
                  <li>W - Witness Point: Notify, proceed if no attendance</li>
                  <li>R - Review Point: Document check only</li>
                  <li>Always pre-cover check for concealed work</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Notification Periods</p>
                <ul className="space-y-0.5">
                  <li>Hold Points: 24-48 hours minimum</li>
                  <li>Witness Points: 24 hours minimum</li>
                  <li>Authorities: Per their requirements</li>
                  <li>Always confirm receipt of notification</li>
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
            <Link to="../h-n-c-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4-3">
              Next: Quality Audits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section4_2;
