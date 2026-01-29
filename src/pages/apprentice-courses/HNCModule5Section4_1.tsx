import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Quality Management Systems - HNC Module 5 Section 4.1";
const DESCRIPTION = "Master ISO 9001:2015 quality management systems for building services: PDCA cycle, quality procedures, document control, non-conformance reporting, corrective actions, and continual improvement.";

const quickCheckQuestions = [
  {
    id: "iso-9001-focus",
    question: "What is the primary focus of ISO 9001:2015?",
    options: ["Environmental management", "Customer satisfaction through consistent quality", "Health and safety compliance", "Financial auditing"],
    correctIndex: 1,
    explanation: "ISO 9001:2015 focuses on customer satisfaction by ensuring organisations consistently deliver products and services that meet customer and regulatory requirements through effective quality management."
  },
  {
    id: "pdca-cycle",
    question: "What does PDCA stand for in quality management?",
    options: ["Process, Design, Check, Approve", "Plan, Do, Check, Act", "Prepare, Document, Control, Audit", "Plan, Document, Correct, Analyse"],
    correctIndex: 1,
    explanation: "PDCA (Plan-Do-Check-Act) is the fundamental cycle for continual improvement in quality management, providing a systematic approach to problem-solving and process improvement."
  },
  {
    id: "document-control",
    question: "What is the purpose of document control in a QMS?",
    options: ["To reduce paperwork", "To ensure only current, approved documents are used", "To archive historical records", "To limit access to information"],
    correctIndex: 1,
    explanation: "Document control ensures that only current, approved versions of procedures, drawings, and specifications are in use. This prevents errors caused by outdated or incorrect documentation."
  },
  {
    id: "ncr-purpose",
    question: "What is the primary purpose of a Non-Conformance Report (NCR)?",
    options: ["To blame individuals for mistakes", "To record and manage deviations from requirements", "To reduce project costs", "To satisfy regulatory inspectors"],
    correctIndex: 1,
    explanation: "NCRs formally record instances where work, materials, or processes deviate from specified requirements, enabling proper investigation, correction, and prevention of recurrence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "ISO 9001:2015 is structured around how many clauses?",
    options: [
      "7 clauses",
      "10 clauses",
      "12 clauses",
      "15 clauses"
    ],
    correctAnswer: 1,
    explanation: "ISO 9001:2015 contains 10 clauses. Clauses 1-3 cover scope, references, and terms. Clauses 4-10 contain the requirements: Context, Leadership, Planning, Support, Operation, Performance Evaluation, and Improvement."
  },
  {
    id: 2,
    question: "Which clause of ISO 9001:2015 addresses 'Leadership'?",
    options: ["Clause 4", "Clause 5", "Clause 6", "Clause 7"],
    correctAnswer: 1,
    explanation: "Clause 5 addresses Leadership, requiring top management to demonstrate commitment, establish quality policy, and assign organisational roles and responsibilities."
  },
  {
    id: 3,
    question: "What does 'risk-based thinking' mean in ISO 9001:2015?",
    options: [
      "Only focusing on high-risk activities",
      "Proactively identifying and addressing risks and opportunities",
      "Avoiding all risks in projects",
      "Creating risk registers for auditors"
    ],
    correctAnswer: 1,
    explanation: "Risk-based thinking requires organisations to proactively identify potential risks and opportunities throughout their processes, taking action to prevent or reduce undesired effects and enhance desired outcomes."
  },
  {
    id: 4,
    question: "In the PDCA cycle, what happens during the 'Check' phase?",
    options: [
      "Implementing the planned changes",
      "Monitoring and measuring results against objectives",
      "Making corrections to the process",
      "Planning the improvement strategy"
    ],
    correctAnswer: 1,
    explanation: "The 'Check' phase involves monitoring and measuring the results of implemented changes against planned objectives to determine if the expected improvements were achieved."
  },
  {
    id: 5,
    question: "A controlled document must include which of the following?",
    options: [
      "Revision number, approval status, and distribution list",
      "Only the document title",
      "Author's personal contact details",
      "Estimated cost of implementation"
    ],
    correctAnswer: 0,
    explanation: "Controlled documents require revision/version numbers, approval status (who approved and when), and controlled distribution to ensure only authorised persons have current versions."
  },
  {
    id: 6,
    question: "What is the difference between a 'corrective action' and a 'preventive action'?",
    options: [
      "They are the same thing",
      "Corrective addresses existing problems; preventive stops potential problems",
      "Preventive is mandatory; corrective is optional",
      "Corrective is for safety; preventive is for quality"
    ],
    correctAnswer: 1,
    explanation: "Corrective action addresses the root cause of an existing non-conformance to prevent recurrence. Preventive action identifies potential problems before they occur and implements measures to prevent them."
  },
  {
    id: 7,
    question: "During an internal quality audit, who should NOT audit a process?",
    options: [
      "A trained auditor from another department",
      "An external consultant",
      "The person responsible for that process",
      "A member of the quality team"
    ],
    correctAnswer: 2,
    explanation: "Auditors must be independent of the area being audited to ensure objectivity. The person responsible for a process cannot objectively audit their own work."
  },
  {
    id: 8,
    question: "What is a 'Quality Manual' in a QMS?",
    options: [
      "A list of all company employees",
      "A document describing the QMS scope, processes, and procedures",
      "A record of all non-conformances",
      "A training register for quality staff"
    ],
    correctAnswer: 1,
    explanation: "A Quality Manual is a top-level document that describes the scope of the QMS, references procedures, and explains how the organisation addresses quality requirements. Note: ISO 9001:2015 no longer mandates a Quality Manual."
  },
  {
    id: 9,
    question: "What is 'continual improvement' in quality management?",
    options: [
      "Making one major change per year",
      "Ongoing effort to enhance products, services, and processes",
      "Fixing problems only when auditors identify them",
      "Replacing all equipment regularly"
    ],
    correctAnswer: 1,
    explanation: "Continual improvement is an ongoing effort to enhance products, services, processes, and the QMS itself. It involves incremental improvements over time rather than single breakthrough changes."
  },
  {
    id: 10,
    question: "In building services, what would typically trigger an NCR?",
    options: [
      "A minor change to cable route approved by the client",
      "Installation not matching approved drawings",
      "Completing work ahead of schedule",
      "Using a different brand of approved equivalent material"
    ],
    correctAnswer: 1,
    explanation: "Installation not matching approved drawings is a deviation from specified requirements and would trigger an NCR. The NCR process ensures the deviation is assessed, corrected if necessary, and lessons learned."
  },
  {
    id: 11,
    question: "How often should a QMS be reviewed by management?",
    options: [
      "Only when problems occur",
      "At planned intervals (typically annually minimum)",
      "Every five years",
      "Only before certification audits"
    ],
    correctAnswer: 1,
    explanation: "ISO 9001 requires management review at planned intervals. Most organisations conduct reviews annually at minimum, though more frequent reviews may be appropriate for complex projects or changing circumstances."
  },
  {
    id: 12,
    question: "What is the role of 'documented information' in ISO 9001:2015?",
    options: [
      "Only records required by law",
      "Any information the organisation determines necessary for QMS effectiveness",
      "Marketing materials for customers",
      "Personal employee records"
    ],
    correctAnswer: 1,
    explanation: "Documented information includes documents and records that the organisation determines are necessary for the effectiveness of the QMS, plus those required by ISO 9001 itself."
  }
];

const faqs = [
  {
    question: "Does every building services company need ISO 9001 certification?",
    answer: "Certification is not legally required, but many main contractors and public sector clients require ISO 9001 certification from their supply chain. Even without certification, implementing QMS principles improves consistency, reduces defects, and enhances client satisfaction. Smaller companies often operate 'in accordance with' ISO 9001 without formal certification."
  },
  {
    question: "How does a QMS relate to BS 7671 compliance?",
    answer: "A QMS provides the management framework to ensure consistent BS 7671 compliance. While BS 7671 specifies technical requirements, the QMS ensures processes exist to achieve compliance: trained competent persons, calibrated test equipment, controlled procedures for testing and inspection, and records demonstrating compliance."
  },
  {
    question: "What is the difference between ISO 9001 and ISO 14001?",
    answer: "ISO 9001 covers Quality Management (customer satisfaction, consistent products/services). ISO 14001 covers Environmental Management (minimising environmental impact). Many organisations hold both certifications as an 'Integrated Management System' since they share similar structures and can be audited together."
  },
  {
    question: "How long does it take to implement a QMS from scratch?",
    answer: "For a typical building services contractor, expect 6-12 months to develop and implement a QMS suitable for ISO 9001 certification. This includes documenting procedures, training staff, running the system for several months, conducting internal audits, and addressing findings before the certification audit."
  },
  {
    question: "Who is responsible for quality in a building services project?",
    answer: "Everyone is responsible for quality, but specific roles include: Top Management (commitment and resources), Quality Manager (QMS maintenance), Project Managers (project-level implementation), Supervisors (daily compliance), Operatives (following procedures and reporting issues). The client's quality requirements should cascade through the supply chain."
  },
  {
    question: "What happens if we fail a certification audit?",
    answer: "Minor non-conformances typically allow continued certification provided corrective actions are implemented within an agreed timeframe. Major non-conformances may require a follow-up audit before certification is granted. Critical failures (systemic breakdown of QMS) could result in certification being withheld or withdrawn until fundamental issues are resolved."
  }
];

const HNCModule5Section4_1 = () => {
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
            <span>Module 5.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Quality Management Systems
          </h1>
          <p className="text-white/80">
            ISO 9001 requirements, quality procedures, documentation control and continual improvement for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ISO 9001:2015:</strong> International quality management standard</li>
              <li className="pl-1"><strong>PDCA cycle:</strong> Plan-Do-Check-Act improvement method</li>
              <li className="pl-1"><strong>Document control:</strong> Ensures current approved versions in use</li>
              <li className="pl-1"><strong>NCRs:</strong> Formal recording and resolution of deviations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ITP:</strong> Inspection and Test Plans for works</li>
              <li className="pl-1"><strong>Hold points:</strong> Mandatory witness/approval stages</li>
              <li className="pl-1"><strong>O&M manuals:</strong> Controlled handover documentation</li>
              <li className="pl-1"><strong>Snagging:</strong> Systematic defect identification and closure</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the structure and requirements of ISO 9001:2015",
              "Apply the PDCA cycle to building services quality improvement",
              "Implement effective document control procedures",
              "Manage non-conformances through NCR processes",
              "Understand corrective and preventive action requirements",
              "Contribute to continual improvement initiatives"
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

        {/* Section 1: ISO 9001:2015 Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ISO 9001:2015 Structure and Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO 9001:2015 is the internationally recognised standard for quality management systems (QMS).
              It provides a framework for organisations to consistently meet customer and regulatory requirements
              while continually improving their processes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The 10-Clause Structure:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Clause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1-3</td>
                      <td className="border border-white/10 px-3 py-2">Scope, References, Terms</td>
                      <td className="border border-white/10 px-3 py-2">Introductory clauses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Context of the Organisation</td>
                      <td className="border border-white/10 px-3 py-2">Understanding internal/external issues, interested parties</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Leadership</td>
                      <td className="border border-white/10 px-3 py-2">Management commitment, quality policy, roles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Planning</td>
                      <td className="border border-white/10 px-3 py-2">Risks, opportunities, quality objectives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7</td>
                      <td className="border border-white/10 px-3 py-2">Support</td>
                      <td className="border border-white/10 px-3 py-2">Resources, competence, communication, documentation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">Operation</td>
                      <td className="border border-white/10 px-3 py-2">Planning, control of processes, service delivery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9</td>
                      <td className="border border-white/10 px-3 py-2">Performance Evaluation</td>
                      <td className="border border-white/10 px-3 py-2">Monitoring, measurement, analysis, audits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10</td>
                      <td className="border border-white/10 px-3 py-2">Improvement</td>
                      <td className="border border-white/10 px-3 py-2">Non-conformity, corrective action, continual improvement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Principles of ISO 9001:2015</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Customer focus:</strong> Meeting and exceeding customer expectations</li>
                    <li className="pl-1"><strong>Leadership:</strong> Creating unity of purpose and direction</li>
                    <li className="pl-1"><strong>Engagement of people:</strong> Competent, empowered staff</li>
                    <li className="pl-1"><strong>Process approach:</strong> Managing activities as interrelated processes</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Improvement:</strong> Ongoing focus on enhancement</li>
                    <li className="pl-1"><strong>Evidence-based decisions:</strong> Using data and analysis</li>
                    <li className="pl-1"><strong>Relationship management:</strong> Managing interested parties</li>
                    <li className="pl-1"><strong>Risk-based thinking:</strong> Proactive risk identification</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building services application:</strong> For M&E contractors, ISO 9001 certification demonstrates commitment to quality and is often a pre-qualification requirement for major projects.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The PDCA Cycle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The PDCA Cycle and Quality Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Plan-Do-Check-Act (PDCA) cycle, also known as the Deming Cycle, is the engine of continual
              improvement in quality management. ISO 9001:2015 is built around this methodology.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Plan</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Establish objectives and processes</li>
                  <li className="pl-1">Identify risks and opportunities</li>
                  <li className="pl-1">Determine resources needed</li>
                  <li className="pl-1">Define success criteria</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Do</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Implement the planned processes</li>
                  <li className="pl-1">Train personnel as required</li>
                  <li className="pl-1">Document activities</li>
                  <li className="pl-1">Collect data for analysis</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Check</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Monitor and measure results</li>
                  <li className="pl-1">Compare against objectives</li>
                  <li className="pl-1">Analyse data and trends</li>
                  <li className="pl-1">Identify gaps and issues</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Act</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Take action to improve</li>
                  <li className="pl-1">Implement corrective actions</li>
                  <li className="pl-1">Standardise improvements</li>
                  <li className="pl-1">Begin new cycle</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PDCA Example: Electrical Installation Testing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Plan</td>
                      <td className="border border-white/10 px-3 py-2">Create ITP, identify hold points, calibrate instruments, schedule inspections</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Do</td>
                      <td className="border border-white/10 px-3 py-2">Conduct testing per BS 7671, complete test sheets, record results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Check</td>
                      <td className="border border-white/10 px-3 py-2">Review test results against requirements, identify failures, compare to benchmarks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Act</td>
                      <td className="border border-white/10 px-3 py-2">Rectify failures, update procedures if systemic issues, improve for next phase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Quality Procedures for Building Services</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>QP-001:</strong> Document and Record Control</li>
                <li className="pl-1"><strong>QP-002:</strong> Control of Non-Conforming Work</li>
                <li className="pl-1"><strong>QP-003:</strong> Corrective and Preventive Action</li>
                <li className="pl-1"><strong>QP-004:</strong> Internal Auditing</li>
                <li className="pl-1"><strong>QP-005:</strong> Management Review</li>
                <li className="pl-1"><strong>QP-006:</strong> Control of Monitoring and Measuring Equipment</li>
                <li className="pl-1"><strong>QP-007:</strong> Purchasing and Supplier Evaluation</li>
                <li className="pl-1"><strong>QP-008:</strong> Training and Competence</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Quality procedures should be practical and used daily, not just documents for auditors. If procedures aren't being followed, they may need simplification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Document Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Document Control and Records Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective document control ensures that personnel always use current, approved versions of
              procedures, drawings, specifications, and other controlled documents. Poor document control
              leads to errors, rework, and non-conformances.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Document Control Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Documents reviewed and approved before issue</li>
                <li className="pl-1">Revision status clearly identified</li>
                <li className="pl-1">Current versions available at points of use</li>
                <li className="pl-1">Obsolete documents prevented from unintended use</li>
                <li className="pl-1">External documents identified and controlled</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Document Control Elements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Document number</td>
                      <td className="border border-white/10 px-3 py-2">Unique identification</td>
                      <td className="border border-white/10 px-3 py-2">QP-003, DWG-E-101</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Revision</td>
                      <td className="border border-white/10 px-3 py-2">Track version changes</td>
                      <td className="border border-white/10 px-3 py-2">Rev A, Rev 02, Issue 3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Issue date</td>
                      <td className="border border-white/10 px-3 py-2">When current version released</td>
                      <td className="border border-white/10 px-3 py-2">15/01/2024</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Approval</td>
                      <td className="border border-white/10 px-3 py-2">Authorisation of content</td>
                      <td className="border border-white/10 px-3 py-2">Approved by: J. Smith</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution</td>
                      <td className="border border-white/10 px-3 py-2">Who receives controlled copies</td>
                      <td className="border border-white/10 px-3 py-2">Site office, QA Manager</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Change history</td>
                      <td className="border border-white/10 px-3 py-2">Record of amendments</td>
                      <td className="border border-white/10 px-3 py-2">Rev B: Added section 4.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Documents (Controlled)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Quality procedures</li>
                  <li>Work instructions</li>
                  <li>Drawings and specifications</li>
                  <li>Method statements</li>
                  <li>ITPs and checklists</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Records (Evidence)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Completed test certificates</li>
                  <li>Inspection reports</li>
                  <li>NCRs and corrective actions</li>
                  <li>Training records</li>
                  <li>Calibration certificates</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Revision Control on Site</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Transmittal:</strong> Formal issue of drawings with register</li>
                <li className="pl-1"><strong>Superseded stamp:</strong> Mark old drawings as obsolete</li>
                <li className="pl-1"><strong>Cloud markings:</strong> Identify changed areas on drawings</li>
                <li className="pl-1"><strong>RFI process:</strong> Formal clarification when drawings unclear</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Record actual installation for O&M</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Common issue:</strong> Operatives working from superseded drawings is a frequent cause of rework. Establish a clear process for removing old drawings when new revisions are issued.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Non-Conformance and Corrective Action */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Non-Conformance Reporting and Continual Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Non-Conformance Reports (NCRs) are the formal mechanism for recording, investigating, and
              resolving deviations from specified requirements. A robust NCR process is essential for
              learning from mistakes and preventing recurrence.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NCR Process Flow</p>
              <div className="p-4 rounded-lg bg-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">1</span>
                  <span className="text-sm"><strong>Identification:</strong> Non-conformance detected and reported</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">2</span>
                  <span className="text-sm"><strong>Recording:</strong> NCR raised with full details</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">3</span>
                  <span className="text-sm"><strong>Containment:</strong> Immediate action to prevent further impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">4</span>
                  <span className="text-sm"><strong>Investigation:</strong> Root cause analysis conducted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">5</span>
                  <span className="text-sm"><strong>Correction:</strong> Work rectified or concession agreed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">6</span>
                  <span className="text-sm"><strong>Corrective action:</strong> Measures to prevent recurrence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">7</span>
                  <span className="text-sm"><strong>Verification:</strong> Effectiveness confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-xs font-medium">8</span>
                  <span className="text-sm"><strong>Close-out:</strong> NCR formally closed</span>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NCR Content Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Information Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Description</td>
                      <td className="border border-white/10 px-3 py-2">What, where, when, who discovered, extent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Requirement</td>
                      <td className="border border-white/10 px-3 py-2">Specification, drawing, or standard not met</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Root cause</td>
                      <td className="border border-white/10 px-3 py-2">Why did this occur? (5 Whys analysis)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Disposition</td>
                      <td className="border border-white/10 px-3 py-2">Rectify, rework, accept as-is, reject</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corrective action</td>
                      <td className="border border-white/10 px-3 py-2">Action to prevent recurrence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Evidence</td>
                      <td className="border border-white/10 px-3 py-2">Photos, test results, witness statements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Root Cause Analysis: The 5 Whys</p>
              <p className="text-sm text-white mb-3">Example: Cable installed in wrong location</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Why 1:</strong> Electrician installed in wrong position → Used wrong drawing</li>
                <li className="pl-1"><strong>Why 2:</strong> Why wrong drawing? → Old revision on site</li>
                <li className="pl-1"><strong>Why 3:</strong> Why old revision on site? → Not collected when new issue distributed</li>
                <li className="pl-1"><strong>Why 4:</strong> Why not collected? → No sign-off process for superseded drawings</li>
                <li className="pl-1"><strong>Why 5:</strong> Why no process? → Document control procedure doesn't include collection step</li>
                <li className="pl-1 text-green-400"><strong>Root cause:</strong> Document control procedure inadequate → Update procedure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continual Improvement Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NCR trend analysis:</strong> Identify recurring issues across projects</li>
                <li className="pl-1"><strong>Internal audits:</strong> Systematic review of QMS compliance</li>
                <li className="pl-1"><strong>Management review:</strong> Strategic assessment of QMS performance</li>
                <li className="pl-1"><strong>Customer feedback:</strong> Client satisfaction surveys and defect data</li>
                <li className="pl-1"><strong>Lessons learned:</strong> Post-project reviews and knowledge sharing</li>
                <li className="pl-1"><strong>Benchmarking:</strong> Comparison with industry best practice</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality KPIs for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">KPI</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measure</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">First-time pass rate</td>
                      <td className="border border-white/10 px-3 py-2">% inspections passed first time</td>
                      <td className="border border-white/10 px-3 py-2">&gt;95%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NCR rate</td>
                      <td className="border border-white/10 px-3 py-2">NCRs per £1M contract value</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Snagging density</td>
                      <td className="border border-white/10 px-3 py-2">Snags per 100m² at handover</td>
                      <td className="border border-white/10 px-3 py-2">&lt;2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NCR close-out time</td>
                      <td className="border border-white/10 px-3 py-2">Average days to close NCRs</td>
                      <td className="border border-white/10 px-3 py-2">&lt;14 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Customer satisfaction</td>
                      <td className="border border-white/10 px-3 py-2">Post-project survey score</td>
                      <td className="border border-white/10 px-3 py-2">&gt;8/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Culture note:</strong> A healthy quality culture encourages reporting issues without blame. Organisations with low NCR numbers may actually have poor reporting rather than good quality.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: ITP Hold Point</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An Inspection and Test Plan (ITP) for a distribution board installation includes a hold point for pre-energisation inspection. What must happen?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Hold Point: Pre-energisation Inspection (H)</p>
                <p className="mt-2">Requirements:</p>
                <p>• Work must STOP until inspection completed</p>
                <p>• Inspector (client/M&E consultant) formally notified</p>
                <p>• Inspection conducted per checklist criteria</p>
                <p>• Sign-off obtained before energisation proceeds</p>
                <p>• Records retained as quality evidence</p>
                <p className="mt-2 text-green-400">→ Hold points are mandatory; work cannot proceed without sign-off</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: NCR for Incorrect Installation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Containment installed at 2.7m height instead of specified 3.0m. How should this be managed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>NCR-2024-0047: Cable Containment at Incorrect Height</p>
                <p className="mt-2">Description: 25m of cable tray installed at 2.7m instead of 3.0m per DWG-E-201 Rev C</p>
                <p className="mt-2">Containment: Area marked, no further installation</p>
                <p className="mt-2">Root cause investigation:</p>
                <p>• Operative worked from marked-up drawing showing 2.7m (previous design)</p>
                <p>• Marked-up drawing not updated when formal revision issued</p>
                <p className="mt-2">Disposition options:</p>
                <p>1. Rectify: Remove and reinstall at 3.0m (cost: £2,400)</p>
                <p>2. Concession: Accept at 2.7m if clearances acceptable (requires design approval)</p>
                <p className="mt-2 text-green-400">→ Corrective action: All marked-up drawings to be verified against current revision weekly</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Document Control Audit Finding</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Internal audit finds 3 superseded drawings in site office. How should this be addressed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Audit Finding: AF-2024-012</p>
                <p className="mt-2">Observation: 3 superseded drawings found in active use folder</p>
                <p>• DWG-E-101 Rev A (current: Rev C)</p>
                <p>• DWG-E-205 Rev B (current: Rev D)</p>
                <p>• DWG-M-301 Rev - (current: Rev A)</p>
                <p className="mt-2">Classification: Minor non-conformance</p>
                <p className="mt-2">Immediate action required:</p>
                <p>• Remove superseded drawings from site</p>
                <p>• Verify current revisions available</p>
                <p>• Brief site team on document control</p>
                <p className="mt-2 text-green-400">→ Corrective action: Implement weekly drawing register check by Site Engineer</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">QMS Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Quality policy established and communicated</li>
                <li className="pl-1">Quality objectives defined and measurable</li>
                <li className="pl-1">Procedures documented for key processes</li>
                <li className="pl-1">Document control system operational</li>
                <li className="pl-1">NCR process understood by all staff</li>
                <li className="pl-1">Internal audit schedule in place</li>
                <li className="pl-1">Management review conducted regularly</li>
                <li className="pl-1">Training records maintained for competence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">ISO 9001:2015 has <strong>10 clauses</strong> (4-10 are requirements)</li>
                <li className="pl-1">PDCA cycle: <strong>Plan-Do-Check-Act</strong></li>
                <li className="pl-1">Records retention: Typically <strong>6 years minimum</strong> for construction</li>
                <li className="pl-1">Internal audits: <strong>Independent of area audited</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Paper-only QMS</strong> — Procedures that aren't actually followed</li>
                <li className="pl-1"><strong>Blame culture</strong> — Discourages issue reporting</li>
                <li className="pl-1"><strong>Ignoring root cause</strong> — Only fixing symptoms, not causes</li>
                <li className="pl-1"><strong>Skipping hold points</strong> — Proceeding without required approvals</li>
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
                <p className="font-medium text-white mb-1">ISO 9001:2015 Structure</p>
                <ul className="space-y-0.5">
                  <li>Clause 4: Context of the Organisation</li>
                  <li>Clause 5: Leadership</li>
                  <li>Clause 6: Planning</li>
                  <li>Clause 7: Support</li>
                  <li>Clause 8: Operation</li>
                  <li>Clause 9: Performance Evaluation</li>
                  <li>Clause 10: Improvement</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">PDCA Cycle</p>
                <ul className="space-y-0.5">
                  <li>Plan: Establish objectives and processes</li>
                  <li>Do: Implement the processes</li>
                  <li>Check: Monitor and measure results</li>
                  <li>Act: Take action to improve</li>
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
            <Link to="../h-n-c-module5-section4-2">
              Next: Quality Auditing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section4_1;
