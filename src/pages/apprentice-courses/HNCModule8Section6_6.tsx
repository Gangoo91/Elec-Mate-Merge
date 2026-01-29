import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Handover and Training - HNC Module 8 Section 6.6";
const DESCRIPTION = "Master client training, operational handover, defects liability period and post-occupancy support for building services. Covers Soft Landings framework, FM team handover, and aftercare arrangements.";

const quickCheckQuestions = [
  {
    id: "soft-landings-purpose",
    question: "What is the primary purpose of the Soft Landings framework?",
    options: ["To reduce construction costs", "To bridge the gap between design intent and operational performance", "To accelerate project completion", "To eliminate the defects period"],
    correctIndex: 1,
    explanation: "Soft Landings is a building handover process designed to bridge the gap between design intent and operational performance. It ensures a smooth transition from construction to occupation through extended aftercare and performance monitoring."
  },
  {
    id: "defects-period",
    question: "What is the typical duration of the defects liability period for building services installations?",
    options: ["3 months", "6 months", "12 months", "24 months"],
    correctIndex: 2,
    explanation: "The defects liability period (also known as the rectification period) is typically 12 months from practical completion. During this time, the contractor must return to rectify any defects that become apparent under normal use."
  },
  {
    id: "fm-training-requirement",
    question: "Which personnel must receive training before building handover under best practice guidance?",
    options: ["Only the building owner", "Facilities management team and operational staff", "Only security personnel", "External maintenance contractors only"],
    correctIndex: 1,
    explanation: "The facilities management team and all operational staff who will interact with building services must receive comprehensive training before handover. This ensures they can safely operate, maintain, and respond to emergencies affecting the electrical systems."
  },
  {
    id: "poe-timing",
    question: "When should Post-Occupancy Evaluation (POE) typically be conducted?",
    options: ["Before practical completion", "During the defects period only", "At 12 months and optionally at 3 years post-occupation", "Only if problems arise"],
    correctIndex: 2,
    explanation: "Post-Occupancy Evaluation is typically conducted at 12 months after occupation (end of defects period) and optionally at 3 years. This timing allows seasonal performance assessment and captures the building's performance under actual operational conditions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under the Soft Landings framework, when should the process ideally begin?",
    options: [
      "At practical completion",
      "During the design stage (RIBA Stage 2)",
      "After the first year of occupation",
      "When problems are identified"
    ],
    correctAnswer: 1,
    explanation: "Soft Landings should ideally begin at RIBA Stage 2 (Concept Design) to ensure that operational requirements and maintainability are considered from the outset. Early engagement leads to better outcomes during handover and operation."
  },
  {
    id: 2,
    question: "What is the contractor's obligation during the defects liability period?",
    options: [
      "To provide unlimited free modifications",
      "To rectify defects in workmanship and materials at their own cost",
      "To replace all equipment regardless of condition",
      "To provide 24-hour on-site support"
    ],
    correctAnswer: 1,
    explanation: "During the defects liability period, the contractor must rectify defects in workmanship and materials that become apparent under normal use, at their own cost. This does not include damage caused by misuse, fair wear and tear, or client-requested changes."
  },
  {
    id: 3,
    question: "Which document typically defines the aftercare arrangements following practical completion?",
    options: [
      "The building regulations",
      "The contract (e.g., JCT or NEC)",
      "The planning permission",
      "The architect's appointment"
    ],
    correctAnswer: 1,
    explanation: "Aftercare arrangements are defined in the construction contract (JCT, NEC, or bespoke). The contract specifies the defects period duration, contractor's obligations, retention release conditions, and any extended aftercare requirements."
  },
  {
    id: 4,
    question: "What is the recommended minimum duration of operational training for complex building services?",
    options: [
      "30 minutes per system",
      "Half a day total",
      "A minimum of one full day, with follow-up sessions",
      "Training is not required if O&M manuals are provided"
    ],
    correctAnswer: 2,
    explanation: "Complex building services require a minimum of one full day of operational training, with follow-up sessions recommended during the initial occupation period. Training should be documented with signed attendance records and competency assessments."
  },
  {
    id: 5,
    question: "BSRIA Soft Landings identifies which of the following as a key activity during the 'Initial Aftercare' stage?",
    options: [
      "Design reviews only",
      "Resident on-site support and fine-tuning of building systems",
      "Demolition planning",
      "Tender preparation"
    ],
    correctAnswer: 1,
    explanation: "During Initial Aftercare (typically the first four weeks post-handover), Soft Landings requires resident on-site support from key personnel who can respond to occupant queries and fine-tune building systems based on actual usage patterns."
  },
  {
    id: 6,
    question: "Post-Occupancy Evaluation (POE) typically assesses which of the following?",
    options: [
      "Only energy consumption",
      "Building performance, occupant satisfaction, and comparison with design predictions",
      "Construction costs only",
      "Contractor profit margins"
    ],
    correctAnswer: 1,
    explanation: "POE assesses building performance (energy, comfort, indoor environment), occupant satisfaction, functionality, and compares actual performance against design predictions. This feedback loop helps identify improvements and informs future designs."
  },
  {
    id: 7,
    question: "What percentage of construction contract value is typically held as retention during the defects period?",
    options: [
      "1-2%",
      "2.5-5%",
      "10%",
      "No retention is held"
    ],
    correctAnswer: 1,
    explanation: "Typically 2.5-5% of the contract value is held as retention, with half released at practical completion and the remainder at the end of the defects period. This provides the client with security that defects will be rectified."
  },
  {
    id: 8,
    question: "FM team training for electrical systems should include which of the following?",
    options: [
      "Design calculations only",
      "Normal operation, emergency procedures, and basic fault diagnosis",
      "Only reading meter displays",
      "Detailed design changes"
    ],
    correctAnswer: 1,
    explanation: "FM training must cover normal operation procedures, emergency procedures (including isolation and lock-off), basic fault diagnosis, BMS/control system operation, and when to call specialist support. This ensures safe and efficient building operation."
  },
  {
    id: 9,
    question: "The Building Performance Evaluation (BPE) programme recommends assessments at which intervals?",
    options: [
      "Weekly during the first month",
      "1 year, 2 years, and 5 years post-occupation",
      "Only when requested by the client",
      "Every 6 months indefinitely"
    ],
    correctAnswer: 1,
    explanation: "The BPE programme recommends assessments at 1 year (to capture seasonal performance), 2 years (to assess settled operation), and optionally 5 years (to evaluate longer-term performance and any degradation issues)."
  },
  {
    id: 10,
    question: "What is the primary purpose of seasonal commissioning?",
    options: [
      "To reduce costs",
      "To optimise systems for heating and cooling seasons after initial occupation",
      "To avoid the defects period",
      "To satisfy building control"
    ],
    correctAnswer: 1,
    explanation: "Seasonal commissioning optimises HVAC and controls for both heating and cooling seasons under actual occupancy conditions. Initial commissioning may occur in one season, so return visits ensure optimal performance year-round."
  },
  {
    id: 11,
    question: "Under Soft Landings, who should attend the 'resident on-site' period during initial aftercare?",
    options: [
      "Only the architect",
      "Representatives from the design team, contractor, and building services engineer",
      "Only the client's representative",
      "Building control officers"
    ],
    correctAnswer: 1,
    explanation: "Soft Landings requires representatives from the design team, contractor, and building services engineer to provide resident on-site support during initial aftercare. This multi-disciplinary presence ensures queries can be addressed and systems fine-tuned effectively."
  },
  {
    id: 12,
    question: "What is the relationship between the defects liability period and the final certificate?",
    options: [
      "They are unrelated",
      "The final certificate is issued after expiry of the defects period and rectification of notified defects",
      "The final certificate is issued before practical completion",
      "The defects period begins after the final certificate"
    ],
    correctAnswer: 1,
    explanation: "The final certificate is issued after the defects liability period has expired and any notified defects have been rectified. It marks the formal conclusion of the contract and triggers release of the remaining retention."
  }
];

const faqs = [
  {
    question: "What is the difference between practical completion and final completion?",
    answer: "Practical completion occurs when the works are substantially complete and the building can be used for its intended purpose, even if minor snagging items remain. This triggers the start of the defects liability period. Final completion occurs after the defects period expires and all notified defects have been rectified, triggering release of remaining retention. The period between them (typically 12 months) is when latent defects may emerge under operational conditions."
  },
  {
    question: "Who is responsible for organising client training during handover?",
    answer: "Responsibility for organising client training typically rests with the main contractor, who coordinates specialist sub-contractors to deliver training on their systems. The contract should specify training requirements, duration, and the number of sessions. On larger projects, the principal designer or project manager may oversee the training programme to ensure it meets client needs and covers all systems comprehensively."
  },
  {
    question: "What happens if defects are not rectified during the defects period?",
    answer: "If defects are not rectified, the client can: (1) withhold the retention money and use it to engage others to complete the work, (2) claim damages for breach of contract, or (3) seek specific performance through legal action. The client must notify defects in writing during the defects period. Latent defects discovered after the period may still be actionable under limitation periods (6 years for simple contracts, 12 years for deeds)."
  },
  {
    question: "Is Soft Landings mandatory for all projects?",
    answer: "Soft Landings is mandatory for UK government projects (Government Soft Landings - GSL) but voluntary for private sector projects. However, many clients now include Soft Landings requirements in their employer's requirements, and BREEAM awards credits for projects implementing the framework. Even when not mandatory, the principles of extended aftercare and performance verification represent best practice."
  },
  {
    question: "How should training be documented for handover?",
    answer: "Training documentation should include: training programmes/agendas for each session, attendance registers signed by all participants, handout materials provided, competency assessment records (if applicable), certificates of completion, and video recordings where permitted. This documentation forms part of the Health and Safety File under CDM 2015 and provides evidence of discharge of the contractor's training obligations."
  },
  {
    question: "What support should the contractor provide after the defects period ends?",
    answer: "After the defects period, the contractor has no contractual obligation unless extended aftercare is specified. However, many contracts include optional maintenance agreements, spare parts supply arrangements, and technical support services. Equipment warranties may extend beyond the defects period. For critical systems, clients should establish ongoing maintenance contracts with either the original installer or specialist maintenance providers."
  }
];

const HNCModule8Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6">
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
            <span>Module 8.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Handover and Training
          </h1>
          <p className="text-white/80">
            Client training, operational handover, defects liability period, and post-occupancy support for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Soft Landings:</strong> Bridging design intent to operation</li>
              <li className="pl-1"><strong>Defects period:</strong> Typically 12 months for rectification</li>
              <li className="pl-1"><strong>FM training:</strong> Operation, emergencies, fault diagnosis</li>
              <li className="pl-1"><strong>POE:</strong> 12-month and 3-year evaluations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BSRIA BG 54:</strong> Soft Landings guidance</li>
              <li className="pl-1"><strong>GSL:</strong> Government Soft Landings (mandatory)</li>
              <li className="pl-1"><strong>Seasonal commissioning:</strong> Heating and cooling optimisation</li>
              <li className="pl-1"><strong>Aftercare:</strong> Extended support arrangements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the Soft Landings framework and its application to building services",
              "Describe client training requirements and documentation",
              "Understand the defects liability period and contractor obligations",
              "Plan FM team handover and operational demonstrations",
              "Conduct Post-Occupancy Evaluation to verify performance",
              "Establish aftercare support arrangements for complex installations"
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

        {/* Section 1: Client Training Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Client Training Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive client training is essential for safe and efficient building operation.
              Training must be tailored to the audience, covering operational staff, facilities
              management, and emergency responders with appropriate levels of detail.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Training Programme Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>System overview:</strong> Purpose, main components, and distribution architecture</li>
                <li className="pl-1"><strong>Normal operation:</strong> Starting, stopping, adjusting setpoints, and monitoring</li>
                <li className="pl-1"><strong>Emergency procedures:</strong> Isolation, lock-off, and evacuation protocols</li>
                <li className="pl-1"><strong>Fault diagnosis:</strong> Basic troubleshooting and alarm response</li>
                <li className="pl-1"><strong>BMS/controls:</strong> User interface operation and adjustment limits</li>
                <li className="pl-1"><strong>Maintenance access:</strong> Safe access requirements and permit systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Audience and Content</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Audience</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Training Focus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building owner/client</td>
                      <td className="border border-white/10 px-3 py-2">Overview, key contacts, warranty arrangements</td>
                      <td className="border border-white/10 px-3 py-2">1-2 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">FM manager</td>
                      <td className="border border-white/10 px-3 py-2">Comprehensive system operation, maintenance planning</td>
                      <td className="border border-white/10 px-3 py-2">1-2 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance technicians</td>
                      <td className="border border-white/10 px-3 py-2">Detailed operation, fault finding, safe isolation</td>
                      <td className="border border-white/10 px-3 py-2">2-3 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Security/reception</td>
                      <td className="border border-white/10 px-3 py-2">Emergency procedures, basic BMS monitoring</td>
                      <td className="border border-white/10 px-3 py-2">2-4 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General occupants</td>
                      <td className="border border-white/10 px-3 py-2">User controls, emergency evacuation</td>
                      <td className="border border-white/10 px-3 py-2">30-60 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Documentation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Training programme with objectives and duration</li>
                <li className="pl-1">Attendance register signed by all participants</li>
                <li className="pl-1">Handout materials and reference guides</li>
                <li className="pl-1">Competency assessment records where applicable</li>
                <li className="pl-1">Video recordings for future reference (with permission)</li>
                <li className="pl-1">Certificate of completion for each attendee</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Schedule multiple training sessions, with initial training before occupation and follow-up sessions after one month of operation to address real-world queries.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Operational Handover and FM Team */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Operational Handover and FM Team
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Operational handover transfers responsibility for building services from the contractor
              to the client's facilities management team. This process must be structured to ensure
              the FM team has the knowledge, documentation, and resources to operate the building safely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Process Stages</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded bg-blue-500/10">
                  <span className="text-blue-400 font-bold w-6">1</span>
                  <span className="text-sm"><strong>Pre-handover:</strong> FM team familiarisation visits during construction</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-green-500/10">
                  <span className="text-green-400 font-bold w-6">2</span>
                  <span className="text-sm"><strong>Practical completion:</strong> Formal handover of systems with demonstration</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-yellow-500/10">
                  <span className="text-yellow-400 font-bold w-6">3</span>
                  <span className="text-sm"><strong>Initial aftercare:</strong> On-site support during first weeks of occupation</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-purple-500/10">
                  <span className="text-purple-400 font-bold w-6">4</span>
                  <span className="text-sm"><strong>Extended aftercare:</strong> Seasonal commissioning and 12-month review</span>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">FM Team Handover Checklist</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">O&amp;M manuals</td>
                      <td className="border border-white/10 px-3 py-2">Complete, indexed, and project-specific</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">As-built drawings</td>
                      <td className="border border-white/10 px-3 py-2">Full set reflecting actual installation</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test certificates</td>
                      <td className="border border-white/10 px-3 py-2">EIC, commissioning records, witness tests</td>
                      <td className="border border-white/10 px-3 py-2">Sub-contractors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spare parts</td>
                      <td className="border border-white/10 px-3 py-2">Contractually specified spares with storage</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Access keys</td>
                      <td className="border border-white/10 px-3 py-2">All panel keys, lock-off devices, access cards</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warranty documents</td>
                      <td className="border border-white/10 px-3 py-2">Equipment warranties with claim procedures</td>
                      <td className="border border-white/10 px-3 py-2">Sub-contractors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contact list</td>
                      <td className="border border-white/10 px-3 py-2">Emergency contacts, specialist suppliers</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Demonstrations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Main switchgear operation and interlocks</li>
                  <li className="pl-1">Distribution board switching sequences</li>
                  <li className="pl-1">Emergency lighting test procedures</li>
                  <li className="pl-1">Generator start/stop and changeover</li>
                  <li className="pl-1">UPS system operation and bypass</li>
                  <li className="pl-1">BMS graphics and alarm response</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Briefings Required</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">High voltage equipment hazards</li>
                  <li className="pl-1">Arc flash risks and PPE requirements</li>
                  <li className="pl-1">Lock-off/tag-out procedures</li>
                  <li className="pl-1">Emergency isolation locations</li>
                  <li className="pl-1">Permit to work requirements</li>
                  <li className="pl-1">Competency requirements for access</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> FM involvement should begin during construction, not at handover. Early engagement allows the FM team to understand the systems and provide input on maintainability.
            </p>
          </div>
        </section>

        {/* Section 3: Defects Liability Period */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Defects Liability Period
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The defects liability period (DLP), also known as the rectification period, is the time
              following practical completion during which the contractor must return to rectify defects
              that become apparent under normal use. For building services, this is typically 12 months.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Standard Defects Period</p>
              <p className="text-lg text-white text-center font-medium">12 months from practical completion</p>
              <p className="text-sm text-white/80 text-center mt-2">Extended to 24 months for some specialist systems (BMS, fire alarm) under certain contracts</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractor's Obligations During DLP</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Obligation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Time Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Respond to defect notices</td>
                      <td className="border border-white/10 px-3 py-2">Acknowledge and arrange inspection</td>
                      <td className="border border-white/10 px-3 py-2">Within 48 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rectify defects</td>
                      <td className="border border-white/10 px-3 py-2">Repair defects in workmanship/materials</td>
                      <td className="border border-white/10 px-3 py-2">Reasonable time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency response</td>
                      <td className="border border-white/10 px-3 py-2">Attend dangerous defects immediately</td>
                      <td className="border border-white/10 px-3 py-2">Within 4 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Update documentation</td>
                      <td className="border border-white/10 px-3 py-2">Amend as-builts if repairs require changes</td>
                      <td className="border border-white/10 px-3 py-2">With final account</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Seasonal commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Return for heating/cooling season optimisation</td>
                      <td className="border border-white/10 px-3 py-2">As seasons occur</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-6">
              <div className="p-3 rounded bg-green-500/10">
                <p className="font-medium text-green-400 mb-1">Defects Covered</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Faulty workmanship</li>
                  <li>• Defective materials</li>
                  <li>• Equipment failure (manufacturing)</li>
                  <li>• Non-compliance with specification</li>
                  <li>• Latent defects becoming apparent</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-red-500/10">
                <p className="font-medium text-red-400 mb-1">Not Covered</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• Damage by client/occupants</li>
                  <li>• Fair wear and tear</li>
                  <li>• Client-requested changes</li>
                  <li>• Damage from misuse</li>
                  <li>• Consumable replacements</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention and Final Certificate</p>
              <div className="space-y-2">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm text-white"><strong>At Practical Completion:</strong> Half of retention released (typically 2.5% of contract value retained)</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm text-white"><strong>During DLP:</strong> Client notifies defects in writing; contractor rectifies</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm text-white"><strong>At DLP End:</strong> Final inspection; making good of any outstanding defects</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm text-white"><strong>Final Certificate:</strong> Issued after all defects rectified; remaining retention released</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Notification requirement:</strong> Defects must be notified in writing during the DLP to be covered. Keep detailed records with photographs of all reported defects.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Post-Occupancy Support and Soft Landings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Post-Occupancy Support and Soft Landings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Post-occupancy support ensures buildings perform as intended under actual operational
              conditions. The Soft Landings framework provides a structured approach to extended
              aftercare, performance monitoring, and feedback for continuous improvement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BSRIA Soft Landings Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 1: Inception</td>
                      <td className="border border-white/10 px-3 py-2">RIBA Stage 1-2</td>
                      <td className="border border-white/10 px-3 py-2">Set performance targets, define roles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 2: Design</td>
                      <td className="border border-white/10 px-3 py-2">RIBA Stage 3-4</td>
                      <td className="border border-white/10 px-3 py-2">Review for operational efficiency, involve FM</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 3: Pre-handover</td>
                      <td className="border border-white/10 px-3 py-2">Final 12 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning, training preparation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 4: Initial Aftercare</td>
                      <td className="border border-white/10 px-3 py-2">First 4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Resident support, system fine-tuning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stage 5: Extended Aftercare</td>
                      <td className="border border-white/10 px-3 py-2">Years 1-3</td>
                      <td className="border border-white/10 px-3 py-2">Seasonal commissioning, POE, reviews</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Occupancy Evaluation (POE)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy performance:</strong> Compare actual consumption against design predictions</li>
                <li className="pl-1"><strong>Occupant satisfaction:</strong> Surveys on comfort, lighting, controls</li>
                <li className="pl-1"><strong>Functional performance:</strong> Does the building work for its intended use?</li>
                <li className="pl-1"><strong>Maintainability:</strong> Feedback on access, serviceability, spare parts</li>
                <li className="pl-1"><strong>Lessons learned:</strong> Capture feedback for future projects</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">POE Timing and Activities</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-medium mb-1">12-Month POE</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Full seasonal energy analysis</li>
                    <li>• Occupant satisfaction survey</li>
                    <li>• System performance review</li>
                    <li>• Defects analysis and feedback</li>
                    <li>• End of DLP review meeting</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">3-Year POE (Optional)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Long-term energy trend analysis</li>
                    <li>• Equipment reliability assessment</li>
                    <li>• Maintenance cost evaluation</li>
                    <li>• User adaptation observations</li>
                    <li>• Lessons learned documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Government Soft Landings (GSL)</p>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-white mb-2">
                  <strong>Mandatory for UK government projects.</strong> Key requirements include:
                </p>
                <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Champion identified at project inception</li>
                  <li className="pl-1">Reality checking of designs against operational requirements</li>
                  <li className="pl-1">Minimum 3-week resident aftercare period</li>
                  <li className="pl-1">POE at 12 months and 3 years mandatory</li>
                  <li className="pl-1">Performance metrics and lessons learned published</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Aftercare Support Arrangements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Support Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Provision</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Helpdesk support</td>
                      <td className="border border-white/10 px-3 py-2">Telephone/email technical queries</td>
                      <td className="border border-white/10 px-3 py-2">12 months minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Site visits</td>
                      <td className="border border-white/10 px-3 py-2">Monthly review meetings reducing to quarterly</td>
                      <td className="border border-white/10 px-3 py-2">First 12 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Seasonal commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Heating and cooling season optimisation</td>
                      <td className="border border-white/10 px-3 py-2">First full year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS support</td>
                      <td className="border border-white/10 px-3 py-2">Remote monitoring, setpoint adjustment</td>
                      <td className="border border-white/10 px-3 py-2">12-24 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extended warranty</td>
                      <td className="border border-white/10 px-3 py-2">Equipment manufacturer support</td>
                      <td className="border border-white/10 px-3 py-2">2-5 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Performance gap:</strong> Studies show that buildings often consume 2-5 times more energy than design predictions. Soft Landings and POE help identify and close this performance gap.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Training Programme Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop a training programme for a new office building with BMS-controlled lighting and HVAC.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Training Programme - ABC Office Building</p>
                <p className="mt-2">Session 1: FM Manager Training (1 day)</p>
                <p>---------------------------------------------</p>
                <p>09:00 - System overview and distribution architecture</p>
                <p>10:30 - Main switchgear operation and interlocks</p>
                <p>12:00 - Lunch</p>
                <p>13:00 - BMS system overview and graphics tour</p>
                <p>15:00 - Emergency procedures and isolation</p>
                <p>16:30 - Q&amp;A and documentation review</p>
                <p className="mt-2">Session 2: Maintenance Team (2 days)</p>
                <p>---------------------------------------------</p>
                <p>Day 1: Electrical systems, testing, safe isolation</p>
                <p>Day 2: HVAC controls, lighting controls, fault finding</p>
                <p className="mt-2 text-green-400">Attendees: Sign attendance register and competency checklist</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Defects Period Management</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Track and manage defects during the 12-month liability period.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Defects Register - Project XYZ</p>
                <p className="text-white/60">Practical Completion: 15 March 2024</p>
                <p className="text-white/60">DLP Ends: 14 March 2025</p>
                <p className="mt-2">Ref  | Date     | Location    | Description           | Status</p>
                <p>-----|----------|-------------|----------------------|--------</p>
                <p>D001 | 20/03/24 | Level 2 DB  | Loose terminations   | Rectified</p>
                <p>D002 | 05/04/24 | Reception   | Lighting flicker     | Rectified</p>
                <p>D003 | 15/05/24 | Plant room  | Contactor failure    | Rectified</p>
                <p>D004 | 22/09/24 | Office area | Underfloor heating   | <span className="text-yellow-400">Outstanding</span></p>
                <p>D005 | 10/01/25 | Server room | UPS alarm fault      | <span className="text-yellow-400">Outstanding</span></p>
                <p className="mt-2 text-white/60">Next review meeting: 28 February 2025</p>
                <p className="text-white/60">All outstanding items to be closed before final certificate</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Post-Occupancy Evaluation Report</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Summarise findings from a 12-month POE for a commercial building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">12-Month Post-Occupancy Evaluation Summary</p>
                <p className="mt-2">Energy Performance:</p>
                <p>- Design prediction: 85 kWh/m²/year</p>
                <p>- Actual consumption: 102 kWh/m²/year (+20%)</p>
                <p>- Main variance: Extended operating hours, IT load</p>
                <p className="mt-2">Occupant Satisfaction (scale 1-5):</p>
                <p>- Thermal comfort: 3.8/5</p>
                <p>- Lighting quality: 4.2/5</p>
                <p>- Controls usability: 3.1/5 <span className="text-orange-400">&lt;-- Action required</span></p>
                <p className="mt-2">Key Findings:</p>
                <p>- BMS setpoints required adjustment for occupancy patterns</p>
                <p>- Lighting controls too complex - simplified interface needed</p>
                <p>- Emergency lighting test procedure clarified with FM</p>
                <p className="mt-2 text-green-400">Recommendations implemented; 3-year POE scheduled</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards and References</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BSRIA BG 54:</strong> Soft Landings Framework - 2018 edition</li>
                <li className="pl-1"><strong>BSRIA BG 64:</strong> Design Framework for Building Services</li>
                <li className="pl-1"><strong>BS 8536-1:</strong> Briefing for design and construction (Code of practice)</li>
                <li className="pl-1"><strong>Government Soft Landings:</strong> Mandatory for public sector projects</li>
                <li className="pl-1"><strong>CIBSE TM22:</strong> Energy Assessment and Reporting Methodology</li>
                <li className="pl-1"><strong>JCT/NEC contracts:</strong> Defects liability provisions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Checklist - Electrical Systems</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All EICs issued and test results complete</li>
                <li className="pl-1">O&amp;M manuals indexed and project-specific</li>
                <li className="pl-1">As-built drawings issued (marked "As-Built")</li>
                <li className="pl-1">FM training completed with signed attendance</li>
                <li className="pl-1">Operational demonstrations witnessed and recorded</li>
                <li className="pl-1">Spare parts handed over with storage location confirmed</li>
                <li className="pl-1">Access keys, lock-off devices, and panel keys provided</li>
                <li className="pl-1">Emergency contact list issued</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Handover Problems</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late documentation:</strong> O&amp;M manuals arriving weeks after occupation</li>
                <li className="pl-1"><strong>Rushed training:</strong> Inadequate time for FM team to absorb information</li>
                <li className="pl-1"><strong>Missing spares:</strong> Contractual spares not delivered or stored incorrectly</li>
                <li className="pl-1"><strong>Incomplete snagging:</strong> Minor defects still being rectified during occupation</li>
                <li className="pl-1"><strong>No aftercare plan:</strong> Contractor disengages immediately after handover</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* FAQs */}
        <section className="mb-10 mt-10">
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
                <p className="font-medium text-white mb-1">Key Timescales</p>
                <ul className="space-y-0.5">
                  <li>Defects period: 12 months (typical)</li>
                  <li>Initial aftercare: 4 weeks</li>
                  <li>POE at 12 months and 3 years</li>
                  <li>Retention release: 50% at PC, 50% at final cert</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Soft Landings Stages</p>
                <ul className="space-y-0.5">
                  <li>Stage 1-2: Inception and design</li>
                  <li>Stage 3: Pre-handover (final 12 weeks)</li>
                  <li>Stage 4: Initial aftercare (4 weeks)</li>
                  <li>Stage 5: Extended aftercare (years 1-3)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Training Requirements</p>
                <ul className="space-y-0.5">
                  <li>FM manager: 1-2 days</li>
                  <li>Maintenance team: 2-3 days</li>
                  <li>Security/reception: 2-4 hours</li>
                  <li>All with signed attendance records</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">POE Assessment Areas</p>
                <ul className="space-y-0.5">
                  <li>Energy performance vs design</li>
                  <li>Occupant satisfaction surveys</li>
                  <li>Functional performance review</li>
                  <li>Lessons learned capture</li>
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

        {/* Navigation - Back button only (last subsection) */}
        <nav className="flex justify-start pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section6_6;
