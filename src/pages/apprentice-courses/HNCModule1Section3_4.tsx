import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Audits and Inspections - HNC Module 1 Section 3.4";
const DESCRIPTION = "Understand the difference between safety audits and inspections, their types, frequency, reporting requirements, and corrective action processes in building services.";

const quickCheckQuestions = [
  {
    id: "audit-vs-inspection",
    question: "What is the key difference between an audit and an inspection?",
    options: ["Audits are quicker than inspections", "Audits examine systems and compliance; inspections check physical conditions", "Inspections are more formal than audits", "There is no difference"],
    correctIndex: 1,
    explanation: "Audits examine management systems, documentation, and compliance with standards. Inspections focus on physical workplace conditions, equipment, and work practices at a point in time."
  },
  {
    id: "inspection-frequency",
    question: "How often should workplace safety inspections typically be conducted?",
    options: ["Annually only", "Weekly to monthly depending on risk level", "Only after accidents", "Every five years"],
    correctIndex: 1,
    explanation: "Inspection frequency depends on risk level - high-risk workplaces may need daily or weekly inspections, while lower-risk areas may be monthly. Construction sites typically require daily inspections."
  },
  {
    id: "corrective-action",
    question: "What should happen immediately if an inspection identifies an imminent danger?",
    options: ["Note it for the next safety meeting", "Stop work and take immediate corrective action", "Wait for management approval", "Include it in the monthly report"],
    correctIndex: 1,
    explanation: "Imminent dangers require immediate action - stop work, remove people from danger, and implement emergency controls. Do not wait for paperwork or approval when life is at risk."
  },
  {
    id: "audit-evidence",
    question: "What type of evidence should safety auditors gather?",
    options: ["Only documents and records", "Only interviews with workers", "Documents, observations, and interviews combined", "Only management reports"],
    correctIndex: 2,
    explanation: "Effective audits gather triangulated evidence: documents (policies, records), observations (physical conditions, behaviours), and interviews (understanding, attitudes). This provides a complete picture."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a safety audit?",
    options: [
      "To find people breaking rules",
      "To verify that safety management systems are effective",
      "To measure accident rates",
      "To satisfy insurance requirements only"
    ],
    correctAnswer: 1,
    explanation: "Safety audits systematically evaluate whether the safety management system is implemented, effective, and achieving its objectives. They verify compliance and identify improvement opportunities."
  },
  {
    id: 2,
    question: "Which type of audit is conducted by an organisation's own staff?",
    options: [
      "Third-party audit",
      "External audit",
      "Internal audit",
      "Certification audit"
    ],
    correctAnswer: 2,
    explanation: "Internal audits are conducted by trained staff from within the organisation. External or third-party audits are conducted by independent bodies, often for certification purposes."
  },
  {
    id: 3,
    question: "What does a 'statutory inspection' refer to?",
    options: [
      "Voluntary inspection by management",
      "Legally required inspection of specific equipment or systems",
      "Inspection by trade unions",
      "Random spot checks"
    ],
    correctAnswer: 1,
    explanation: "Statutory inspections are legally required under regulations like LOLER (lifting equipment), PUWER (work equipment), and the Electricity at Work Regulations (electrical installations)."
  },
  {
    id: 4,
    question: "Who should conduct workplace safety inspections?",
    options: [
      "Only external consultants",
      "Only the health and safety manager",
      "Competent persons including managers, supervisors, and safety reps",
      "Only government inspectors"
    ],
    correctAnswer: 2,
    explanation: "Inspections should involve various competent persons: managers, supervisors, safety representatives, and workers. Different perspectives identify different issues. Training is essential."
  },
  {
    id: 5,
    question: "What is a 'non-conformance' in audit terminology?",
    options: [
      "A personal disagreement",
      "A failure to meet a specified requirement",
      "A minor suggestion",
      "An observation only"
    ],
    correctAnswer: 1,
    explanation: "A non-conformance is a failure to meet a requirement of the standard, legal provision, or the organisation's own documented system. It requires corrective action and follow-up."
  },
  {
    id: 6,
    question: "What is the recommended structure for an inspection checklist?",
    options: [
      "Random order of items",
      "Alphabetical order only",
      "Logical sequence covering all relevant areas systematically",
      "Shortest items first"
    ],
    correctAnswer: 2,
    explanation: "Checklists should follow a logical sequence, often geographical (room by room) or by topic (electrical, fire, access). This ensures systematic coverage without missing areas."
  },
  {
    id: 7,
    question: "What should an audit report include?",
    options: [
      "Just the non-conformances found",
      "Scope, findings, evidence, conclusions, and recommendations",
      "Only positive observations",
      "Personal opinions about workers"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive audit reports include: scope and objectives, methodology, positive findings, non-conformances with evidence, root cause analysis, conclusions, and prioritised recommendations."
  },
  {
    id: 8,
    question: "How should corrective actions from inspections be prioritised?",
    options: [
      "By cost - cheapest first",
      "By risk level - highest risk first",
      "Alphabetically",
      "By who raised them"
    ],
    correctAnswer: 1,
    explanation: "Corrective actions should be prioritised by risk: immediate action for imminent dangers, short-term for high risks, medium-term for moderate risks, and planned for lower risks."
  },
  {
    id: 9,
    question: "What is the purpose of a 'site safety tour' by senior management?",
    options: [
      "To catch workers making mistakes",
      "To demonstrate commitment and engage with workers on safety",
      "To replace formal inspections",
      "To reduce time spent on paperwork"
    ],
    correctAnswer: 1,
    explanation: "Management safety tours demonstrate visible leadership commitment, provide opportunity to engage with workers, identify issues, and reinforce safety culture. They complement but don't replace formal inspections."
  },
  {
    id: 10,
    question: "How should audit non-conformances be tracked?",
    options: [
      "No tracking required",
      "Logged, assigned owners, target dates set, and verified closed",
      "Mentioned in annual report only",
      "Left to individual discretion"
    ],
    correctAnswer: 1,
    explanation: "Non-conformances require formal tracking: logging in a register, assigning responsible persons, setting realistic target dates, monitoring progress, and verifying effective closure."
  },
  {
    id: 11,
    question: "What is a 'periodic inspection' under the Electricity at Work Regulations?",
    options: [
      "Optional annual check",
      "Required inspection of electrical installations at defined intervals",
      "Inspection of electrical workers",
      "Testing after installation only"
    ],
    correctAnswer: 1,
    explanation: "Under the Electricity at Work Regulations and BS 7671, electrical installations require periodic inspection and testing at intervals appropriate to the type of installation and its use."
  },
  {
    id: 12,
    question: "What documentation should be retained from safety inspections?",
    options: [
      "None - inspections are informal",
      "Inspection reports, findings, corrective actions, and close-out evidence",
      "Only findings of non-compliance",
      "Only summary statistics"
    ],
    correctAnswer: 1,
    explanation: "Retain complete records: dated inspection reports, who conducted them, findings (positive and negative), corrective actions raised, evidence of completion, and trend analysis over time."
  }
];

const faqs = [
  {
    question: "What's the difference between first, second, and third-party audits?",
    answer: "First-party (internal) audits are conducted by the organisation on itself. Second-party audits are conducted by interested parties such as clients or principal contractors on suppliers. Third-party audits are conducted by independent certification bodies for formal accreditation."
  },
  {
    question: "How often should internal audits be conducted?",
    answer: "The entire safety management system should typically be audited at least annually, with high-risk areas audited more frequently. Many organisations operate a rolling programme that covers all elements over a defined cycle."
  },
  {
    question: "Can workers refuse to participate in audits or inspections?",
    answer: "Workers should be encouraged to participate as it demonstrates engagement and helps identify real issues. While they cannot be forced to answer questions, non-cooperation may itself be an audit finding about safety culture. Ensure workers understand audits are about systems, not blame."
  },
  {
    question: "What qualifications do safety auditors need?",
    answer: "Internal auditors need training in audit techniques (such as ISO 19011 principles) plus knowledge of the standards being audited against. Third-party auditors for certification typically hold Lead Auditor qualifications and relevant sector experience."
  },
  {
    question: "Should positive findings be included in audit reports?",
    answer: "Yes, definitely. Reporting positive findings recognises good practice, maintains morale, identifies what works well for replication elsewhere, and provides a balanced view. An audit that only reports negatives misses half the picture."
  },
  {
    question: "How do you handle repeat non-conformances?",
    answer: "Repeat issues indicate the original corrective action was ineffective or addressed symptoms not root causes. Escalate repeat findings, conduct deeper root cause analysis, consider systemic factors, and ensure senior management attention. They may indicate cultural or resource issues."
  }
];

const HNCModule1Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Audits and Inspections
          </h1>
          <p className="text-white/80">
            Monitoring safety performance through systematic checking and verification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Audits:</strong> Systematic review of management systems</li>
              <li className="pl-1"><strong>Inspections:</strong> Physical checks of conditions and practices</li>
              <li className="pl-1"><strong>Frequency:</strong> Risk-based - higher risk = more frequent</li>
              <li className="pl-1"><strong>Action:</strong> Findings must lead to corrective action</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Statutory:</strong> Electrical periodic inspection, LOLER</li>
              <li className="pl-1"><strong>Site inspections:</strong> Daily/weekly on construction sites</li>
              <li className="pl-1"><strong>Quality audits:</strong> Workmanship and installation checks</li>
              <li className="pl-1"><strong>Client audits:</strong> Contractor safety assessments</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between safety audits and safety inspections",
              "Identify different types of audits and their purposes",
              "Understand statutory inspection requirements for building services",
              "Plan and conduct effective workplace inspections",
              "Implement corrective action processes for findings",
              "Apply risk-based prioritisation to safety findings"
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

        {/* Section 1: Audits vs Inspections */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Audits and Inspections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While often used interchangeably, audits and inspections serve different purposes in
              safety management. Understanding the distinction helps apply the right approach for
              different monitoring needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Differences</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety Audit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety Inspection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Focus</td>
                      <td className="border border-white/10 px-3 py-2">Management systems, procedures, compliance</td>
                      <td className="border border-white/10 px-3 py-2">Physical conditions, equipment, practices</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Depth</td>
                      <td className="border border-white/10 px-3 py-2">Systematic, comprehensive, in-depth</td>
                      <td className="border border-white/10 px-3 py-2">Snapshot at a point in time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">Annual or planned programme</td>
                      <td className="border border-white/10 px-3 py-2">Daily to monthly based on risk</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Conducted by</td>
                      <td className="border border-white/10 px-3 py-2">Trained auditors (internal/external)</td>
                      <td className="border border-white/10 px-3 py-2">Supervisors, managers, safety reps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Output</td>
                      <td className="border border-white/10 px-3 py-2">Formal report with non-conformances</td>
                      <td className="border border-white/10 px-3 py-2">Checklist, action list, observations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Audits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Internal (1st party):</strong> Self-assessment</li>
                  <li className="pl-1"><strong>Supplier (2nd party):</strong> Client auditing contractor</li>
                  <li className="pl-1"><strong>Certification (3rd party):</strong> Independent body</li>
                  <li className="pl-1"><strong>Compliance audit:</strong> Against legal requirements</li>
                  <li className="pl-1"><strong>System audit:</strong> Against ISO 45001 or similar</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Inspections</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>General workplace:</strong> Overall conditions</li>
                  <li className="pl-1"><strong>Statutory:</strong> Legally required checks</li>
                  <li className="pl-1"><strong>Pre-use:</strong> Equipment before each use</li>
                  <li className="pl-1"><strong>Management tour:</strong> Leadership visibility</li>
                  <li className="pl-1"><strong>Behavioural:</strong> Work practices observed</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Complementary approaches:</strong> Audits and inspections work together - audits ensure
              systems are in place; inspections verify they're implemented on the ground.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Statutory Inspections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Statutory Inspection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain equipment and systems require inspection at legally defined intervals. In building
              services, this includes electrical installations, lifting equipment, pressure systems, and
              work equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Statutory Inspections for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment/System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Interval</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical installation</td>
                      <td className="border border-white/10 px-3 py-2">EAWR / BS 7671</td>
                      <td className="border border-white/10 px-3 py-2">1-5 years (based on type)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifting equipment (MEWP, hoist)</td>
                      <td className="border border-white/10 px-3 py-2">LOLER 1998</td>
                      <td className="border border-white/10 px-3 py-2">6-12 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure systems</td>
                      <td className="border border-white/10 px-3 py-2">PSSR 2000</td>
                      <td className="border border-white/10 px-3 py-2">As per written scheme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Portable appliances</td>
                      <td className="border border-white/10 px-3 py-2">EAWR (via PUWER)</td>
                      <td className="border border-white/10 px-3 py-2">3 months - 4 years (risk-based)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire detection systems</td>
                      <td className="border border-white/10 px-3 py-2">RRO / BS 5839</td>
                      <td className="border border-white/10 px-3 py-2">Weekly test, annual service</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">RRO / BS 5266</td>
                      <td className="border border-white/10 px-3 py-2">Monthly test, annual full test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Periodic Inspection Intervals (BS 7671)</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <ul className="text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Domestic: 10 years (5 on change of occupancy)</li>
                  <li className="pl-1">Commercial: 5 years</li>
                  <li className="pl-1">Industrial: 3 years</li>
                </ul>
                <ul className="text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Leisure/entertainment: 1 year</li>
                  <li className="pl-1">Construction site: 3 months</li>
                  <li className="pl-1">Caravan parks: 1-3 years</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record keeping:</strong> Statutory inspection reports and certificates must be retained
              and made available for inspection. LOLER thorough examinations require reports kept until the
              next examination; EICR kept for the period of the certificate plus 2 years.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Conducting Inspections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Conducting Effective Inspections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular workplace inspections are essential for identifying hazards before they cause harm.
              Effective inspections are planned, systematic, and result in action - not just paperwork.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inspection process:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Prepare:</strong> Review previous findings, incidents, current work activities</li>
                <li className="pl-1"><strong>Conduct:</strong> Follow systematic route, use checklist, observe and talk to workers</li>
                <li className="pl-1"><strong>Record:</strong> Document findings with location, description, photos if needed</li>
                <li className="pl-1"><strong>Prioritise:</strong> Risk-rank findings for action priority</li>
                <li className="pl-1"><strong>Act:</strong> Assign actions, set deadlines, follow up completion</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sample Inspection Checklist Areas</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Items to Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Access/egress</td>
                      <td className="border border-white/10 px-3 py-2">Clear walkways, unobstructed exits, signage, lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Electrical</td>
                      <td className="border border-white/10 px-3 py-2">Cable condition, temporary supplies, isolation points, testing records</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Working at height</td>
                      <td className="border border-white/10 px-3 py-2">Scaffold condition, ladder inspection tags, edge protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fire precautions</td>
                      <td className="border border-white/10 px-3 py-2">Extinguisher condition, storage of flammables, hot work controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">PPE</td>
                      <td className="border border-white/10 px-3 py-2">Correct PPE worn, condition, storage, availability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Housekeeping</td>
                      <td className="border border-white/10 px-3 py-2">Waste management, material storage, slip/trip hazards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Tips</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Vary route to avoid predictable patterns</li>
                  <li className="pl-1">Look up, down, behind - not just eye level</li>
                  <li className="pl-1">Engage workers - ask about concerns</li>
                  <li className="pl-1">Check work in progress, not just static conditions</li>
                  <li className="pl-1">Note positive findings too</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Site Inspection Frequency</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Construction site: Daily by supervisor</li>
                  <li className="pl-1">Construction site: Weekly formal inspection</li>
                  <li className="pl-1">Occupied commercial: Monthly minimum</li>
                  <li className="pl-1">High-risk areas: More frequent as required</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Worker involvement:</strong> Including workers in inspections improves coverage,
              builds ownership, and often identifies issues that outsiders miss. Safety reps have statutory
              rights to conduct inspections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Corrective Action and Follow-up */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Corrective Action and Follow-up
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Findings from audits and inspections are only valuable if they lead to action. A robust
              corrective action process ensures issues are addressed effectively and verified closed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Action Priority Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timeframe</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-red-400">
                      <td className="border border-white/10 px-3 py-2">Immediate</td>
                      <td className="border border-white/10 px-3 py-2">Imminent danger</td>
                      <td className="border border-white/10 px-3 py-2">Stop work now</td>
                      <td className="border border-white/10 px-3 py-2 text-white">Exposed live conductors</td>
                    </tr>
                    <tr className="text-amber-400">
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">High risk</td>
                      <td className="border border-white/10 px-3 py-2">Within 24-48 hours</td>
                      <td className="border border-white/10 px-3 py-2 text-white">Scaffold incomplete</td>
                    </tr>
                    <tr className="text-yellow-400">
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Moderate risk</td>
                      <td className="border border-white/10 px-3 py-2">Within 1-2 weeks</td>
                      <td className="border border-white/10 px-3 py-2 text-white">PPE storage inadequate</td>
                    </tr>
                    <tr className="text-green-400">
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Low risk</td>
                      <td className="border border-white/10 px-3 py-2">Within 1 month</td>
                      <td className="border border-white/10 px-3 py-2 text-white">Notice board update needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Corrective action process:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Log:</strong> Enter finding in tracking system with unique reference</li>
                <li className="pl-1"><strong>Assign:</strong> Allocate to person with authority to resolve</li>
                <li className="pl-1"><strong>Analyse:</strong> Identify root cause, not just symptoms</li>
                <li className="pl-1"><strong>Plan:</strong> Define corrective action with realistic deadline</li>
                <li className="pl-1"><strong>Implement:</strong> Carry out the action</li>
                <li className="pl-1"><strong>Verify:</strong> Check action was effective - close only when confirmed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Audit Reporting Best Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Executive summary with key findings and overall opinion</li>
                <li className="pl-1">Scope, objectives, and methodology described</li>
                <li className="pl-1">Positive findings as well as non-conformances</li>
                <li className="pl-1">Evidence referenced for each finding</li>
                <li className="pl-1">Risk-rated non-conformances with recommended actions</li>
                <li className="pl-1">Agreed management responses and target dates</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trend analysis:</strong> Review findings over time to identify patterns. Repeat issues
              in the same area may indicate systemic problems, training gaps, or cultural issues that need
              deeper investigation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Application</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Weekly Site Inspection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Site:</strong> New commercial building - M&E installation phase.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Inspection Findings:</strong></p>
                <p className="ml-4 text-red-400">HIGH: Temporary DB cover removed, live terminals exposed</p>
                <p className="ml-4">→ Action: Immediate - work stopped, cover replaced before resuming</p>
                <p className="ml-4 text-amber-400">MEDIUM: Some operatives not wearing eye protection during drilling</p>
                <p className="ml-4">→ Action: Toolbox talk on PPE, supervisors to monitor</p>
                <p className="ml-4 text-yellow-400">LOW: Storage area cluttered, materials blocking access</p>
                <p className="ml-4">→ Action: Site tidy scheduled for Friday</p>
                <p className="mt-2 text-green-400">POSITIVE: All scaffold inspections up to date with tags</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Internal Safety Audit Finding</h3>
              <p className="text-sm text-white mb-2">
                <strong>Finding:</strong> Training records do not demonstrate competence verification.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Non-Conformance Report:</strong></p>
                <p className="ml-4">Ref: NC-2024-017</p>
                <p className="ml-4">Standard: Training Procedure TP-003 clause 5.3</p>
                <p className="ml-4">Finding: Training records show attendance but no evidence of competence assessment</p>
                <p className="ml-4">Evidence: Sample of 10 training records reviewed - none include test results</p>
                <p className="mt-2"><strong>Root Cause:</strong> Assessment element not built into training process</p>
                <p className="mt-2"><strong>Corrective Action:</strong></p>
                <p className="ml-4">1. Revise training procedure to include assessment (Owner: L&D Manager)</p>
                <p className="ml-4">2. Create assessment templates for each training module</p>
                <p className="ml-4">3. Brief trainers on new requirements</p>
                <p className="ml-4">4. Target date: 30 days</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Key Points Summary</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Audit Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Audits verify systems - are policies and procedures implemented?</li>
                <li className="pl-1">Gather evidence from documents, observations, and interviews</li>
                <li className="pl-1">Report both positive findings and non-conformances</li>
                <li className="pl-1">Track corrective actions to verified closure</li>
                <li className="pl-1">Use findings for continuous improvement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Inspections check physical conditions and behaviours</li>
                <li className="pl-1">Frequency based on risk - high risk = more frequent</li>
                <li className="pl-1">Use checklists but don't be limited by them</li>
                <li className="pl-1">Involve workers and safety representatives</li>
                <li className="pl-1">Act immediately on imminent dangers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Tick-box approach:</strong> Going through motions without engagement</li>
                <li className="pl-1"><strong>No follow-up:</strong> Actions not tracked or closed</li>
                <li className="pl-1"><strong>Blame focus:</strong> Finding fault rather than fixing systems</li>
                <li className="pl-1"><strong>Poor prioritisation:</strong> All issues treated equally</li>
                <li className="pl-1"><strong>No trend analysis:</strong> Missing patterns in repeat issues</li>
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
                <p className="font-medium text-white mb-1">Audit vs Inspection</p>
                <ul className="space-y-0.5">
                  <li>Audit = Systems, procedures, compliance</li>
                  <li>Inspection = Physical conditions, practices</li>
                  <li>Both needed for complete monitoring</li>
                  <li>Both require follow-up actions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Statutory Inspections</p>
                <ul className="space-y-0.5">
                  <li>EICR: 1-5 years (type dependent)</li>
                  <li>LOLER: 6-12 months</li>
                  <li>Fire systems: Weekly/annual</li>
                  <li>Emergency lighting: Monthly/annual</li>
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
            <Link to="../h-n-c-module1-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Permit to Work
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3-5">
              Next: Emergency Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section3_4;
