/**
 * Module 5 · Section 4 · Subsection 1 — Quality Management Systems
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   ISO 9001 quality management systems applied to building services — procedures, documentation control, audit and continual improvement.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Quality Management Systems - HNC Module 5 Section 4.1';
const DESCRIPTION =
  'Master ISO 9001:2015 quality management systems for building services: PDCA cycle, quality procedures, document control, non-conformance reporting, corrective actions, and continual improvement.';

const quickCheckQuestions = [
  {
    id: 'iso-9001-focus',
    question: 'What is the primary focus of ISO 9001:2015?',
    options: [
      'Minimising the environmental impact of operations',
      'Reducing labour costs across the supply chain',
      'Customer satisfaction through consistent quality',
      'Ensuring compliance with health and safety law',
    ],
    correctIndex: 2,
    explanation:
      'ISO 9001:2015 focuses on customer satisfaction by ensuring organisations consistently deliver products and services that meet customer and regulatory requirements through effective quality management.',
  },
  {
    id: 'pdca-cycle',
    question: 'What does PDCA stand for in quality management?',
    options: [
      'Plan, Document, Correct, Analyse',
      'Process, Design, Check, Approve',
      'Plan, Do, Check, Act',
      'Prepare, Document, Control, Audit',
    ],
    correctIndex: 2,
    explanation:
      'PDCA (Plan-Do-Check-Act) is the fundamental cycle for continual improvement in quality management, providing a systematic approach to problem-solving and process improvement.',
  },
  {
    id: 'document-control',
    question: 'What is the purpose of document control in a QMS?',
    options: [
      'To ensure only current, approved documents are used',
      'To reduce the cost of printing project drawings',
      'To restrict access to confidential commercial information',
      'To satisfy the requirements of the construction programme',
    ],
    correctIndex: 0,
    explanation:
      'Document control ensures that only current, approved versions of procedures, drawings, and specifications are in use. This prevents errors caused by outdated or incorrect documentation.',
  },
  {
    id: 'ncr-purpose',
    question: 'What is the primary purpose of a Non-Conformance Report (NCR)?',
    options: [
      'To record the cost of completed works for valuation',
      'To list the materials approved for use on the project',
      'To schedule planned maintenance activities',
      'To record and manage deviations from requirements',
    ],
    correctIndex: 3,
    explanation:
      'NCRs formally record instances where work, materials, or processes deviate from specified requirements, enabling proper investigation, correction, and prevention of recurrence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'ISO 9001:2015 is structured around how many clauses?',
    options: [
      '7 clauses',
      '10 clauses',
      '12 clauses',
      '15 clauses',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 9001:2015 contains 10 clauses. Clauses 1-3 cover scope, references, and terms. Clauses 4-10 contain the requirements: Context, Leadership, Planning, Support, Operation, Performance Evaluation, and Improvement.',
  },
  {
    id: 2,
    question: "Which clause of ISO 9001:2015 addresses 'Leadership'?",
    options: [
      'Clause 6',
      'Clause 4',
      'Clause 5',
      'Clause 7',
    ],
    correctAnswer: 2,
    explanation:
      'Clause 5 addresses Leadership, requiring top management to demonstrate commitment, establish quality policy, and assign organisational roles and responsibilities.',
  },
  {
    id: 3,
    question: "What does 'risk-based thinking' mean in ISO 9001:2015?",
    options: [
      'Transferring all project risk to subcontractors by contract',
      'Pricing a financial contingency into every project budget',
      'Carrying out a health and safety risk assessment before work',
      'Proactively identifying and addressing risks and opportunities',
    ],
    correctAnswer: 3,
    explanation:
      'Risk-based thinking requires organisations to proactively identify potential risks and opportunities throughout their processes, taking action to prevent or reduce undesired effects and enhance desired outcomes.',
  },
  {
    id: 4,
    question: "In the PDCA cycle, what happens during the 'Check' phase?",
    options: [
      'Monitoring and measuring results against objectives',
      'Implementing the planned changes',
      'Making corrections to the process',
      'Planning the improvement strategy',
    ],
    correctAnswer: 0,
    explanation:
      "The 'Check' phase involves monitoring and measuring the results of implemented changes against planned objectives to determine if the expected improvements were achieved.",
  },
  {
    id: 5,
    question: 'A controlled document must include which of the following?',
    options: [
      'The full cost breakdown of the work it relates to',
      'Revision number, approval status, and distribution list',
      'A signature from every operative who has read it',
      'The name of the client who commissioned the project',
    ],
    correctAnswer: 1,
    explanation:
      'Controlled documents require revision/version numbers, approval status (who approved and when), and controlled distribution to ensure only authorised persons have current versions.',
  },
  {
    id: 6,
    question: "What is the difference between a 'corrective action' and a 'preventive action'?",
    options: [
      'Corrective is done on site; preventive is done in the office',
      'Corrective is the client’s duty; preventive is the contractor’s',
      'Corrective addresses existing problems; preventive stops potential problems',
      'Corrective applies to materials; preventive applies to workmanship',
    ],
    correctAnswer: 2,
    explanation:
      'Corrective action addresses the root cause of an existing non-conformance to prevent recurrence. Preventive action identifies potential problems before they occur and implements measures to prevent them.',
  },
  {
    id: 7,
    question: 'During an internal quality audit, who should NOT audit a process?',
    options: [
      'A trained auditor from another department',
      'An external consultant',
      'A member of the quality team',
      'The person responsible for that process',
    ],
    correctAnswer: 3,
    explanation:
      'Auditors must be independent of the area being audited to ensure objectivity. The person responsible for a process cannot objectively audit their own work.',
  },
  {
    id: 8,
    question: "What is a 'Quality Manual' in a QMS?",
    options: [
      'A document describing the QMS scope, processes, and procedures',
      'A log of every non-conformance raised on a project',
      'The manufacturer’s installation instructions for equipment',
      'A record of all internal audit findings and close-outs',
    ],
    correctAnswer: 0,
    explanation:
      'A Quality Manual is a top-level document that describes the scope of the QMS, references procedures, and explains how the organisation addresses quality requirements. Note: ISO 9001:2015 no longer mandates a Quality Manual.',
  },
  {
    id: 9,
    question: "What is 'continual improvement' in quality management?",
    options: [
      'A one-off overhaul of the QMS every few years',
      'Ongoing effort to enhance products, services, and processes',
      'Increasing production output regardless of defect rates',
      'Replacing operatives until quality targets are met',
    ],
    correctAnswer: 1,
    explanation:
      'Continual improvement is an ongoing effort to enhance products, services, processes, and the QMS itself. It involves incremental improvements over time rather than single breakthrough changes.',
  },
  {
    id: 10,
    question: 'In building services, what would typically trigger an NCR?',
    options: [
      'A minor change to cable route approved by the client',
      'Using a different brand of approved equivalent material',
      'Installation not matching approved drawings',
      'Completing work ahead of schedule',
    ],
    correctAnswer: 2,
    explanation:
      'Installation not matching approved drawings is a deviation from specified requirements and would trigger an NCR. The NCR process ensures the deviation is assessed, corrected if necessary, and lessons learned.',
  },
  {
    id: 11,
    question: 'How often should a QMS be reviewed by management?',
    options: [
      'Only when a major non-conformance is raised',
      'Every day as part of the site supervisor’s routine',
      'Once at the start of each project and never again',
      'At planned intervals (typically annually minimum)',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 9001 requires management review at planned intervals. Most organisations conduct reviews annually at minimum, though more frequent reviews may be appropriate for complex projects or changing circumstances.',
  },
  {
    id: 12,
    question: "What is the role of 'documented information' in ISO 9001:2015?",
    options: [
      'Any information the organisation determines necessary for QMS effectiveness',
      'Only the records that an external auditor specifically requests',
      'The marketing material describing the company’s capabilities',
      'A legally required register of all staff qualifications',
    ],
    correctAnswer: 0,
    explanation:
      'Documented information includes documents and records that the organisation determines are necessary for the effectiveness of the QMS, plus those required by ISO 9001 itself.',
  },
];

const faqs = [
  {
    question: 'Does every building services company need ISO 9001 certification?',
    answer:
      "Certification is not legally required, but many main contractors and public sector clients require ISO 9001 certification from their supply chain. Even without certification, implementing QMS principles improves consistency, reduces defects, and enhances client satisfaction. Smaller companies often operate 'in accordance with' ISO 9001 without formal certification.",
  },
  {
    question: 'How does a QMS relate to BS 7671 compliance?',
    answer:
      'A QMS provides the management framework to ensure consistent BS 7671 compliance. While BS 7671 specifies technical requirements, the QMS ensures processes exist to achieve compliance: trained competent persons, calibrated test equipment, controlled procedures for testing and inspection, and records demonstrating compliance.',
  },
  {
    question: 'What is the difference between ISO 9001 and ISO 14001?',
    answer:
      "ISO 9001 covers Quality Management (customer satisfaction, consistent products/services). ISO 14001 covers Environmental Management (minimising environmental impact). Many organisations hold both certifications as an 'Integrated Management System' since they share similar structures and can be audited together.",
  },
  {
    question: 'How long does it take to implement a QMS from scratch?',
    answer:
      'For a typical building services contractor, expect 6-12 months to develop and implement a QMS suitable for ISO 9001 certification. This includes documenting procedures, training staff, running the system for several months, conducting internal audits, and addressing findings before the certification audit.',
  },
  {
    question: 'Who is responsible for quality in a building services project?',
    answer:
      "Everyone is responsible for quality, but specific roles include: Top Management (commitment and resources), Quality Manager (QMS maintenance), Project Managers (project-level implementation), Supervisors (daily compliance), Operatives (following procedures and reporting issues). The client's quality requirements should cascade through the supply chain.",
  },
  {
    question: 'What happens if we fail a certification audit?',
    answer:
      'Minor non-conformances typically allow continued certification provided corrective actions are implemented within an agreed timeframe. Major non-conformances may require a follow-up audit before certification is granted. Critical failures (systemic breakdown of QMS) could result in certification being withheld or withdrawn until fundamental issues are resolved.',
  },
];

const HNCModule5Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 1"
            title="Quality Management Systems"
            description="ISO 9001 requirements, quality procedures, documentation control and continual improvement for building services."
            tone="purple"
          />

          <TLDR
            points={[
              "ISO 9001:2015 is the international QMS standard — risk-based thinking, process approach, leadership commitment, continual improvement.",
              "Seven QMS principles: customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision-making, relationship management.",
              "Documented information: quality policy, quality manual, procedures, work instructions, records — only what is needed, controlled by version.",
              "Internal audit programme verifies compliance; management review (annual) closes the improvement loop.",
              "Certification (UKAS-accredited certification body) is the visible badge but the value is in the operational discipline.",
            ]}
          />

          <RegsCallout
            source="ISO 9001:2015 — Clause 5.1 (Leadership and commitment)"
            clause="Top management shall demonstrate leadership and commitment with respect to the quality management system by taking accountability for the effectiveness of the quality management system, ensuring that the quality policy and quality objectives are established for the quality management system and are compatible with the context and strategic direction of the organization, ensuring the integration of the quality management system requirements into the organization’s business processes."
            meaning={
              <>
                ISO 9001 is fundamentally a leadership standard, not a paperwork standard. If the project team treats QMS as compliance theatre, audits will find non-conformities and projects will repeat the same mistakes. The PM's daily attention to procedures, NCRs and lessons-learned is what makes QMS deliver value.
              </>
            }
            cite="Source: ISO 9001:2015 (refer to BSI published text for verbatim clauses)."
          />


          <LearningOutcomes
            outcomes={[
              'Explain the structure and requirements of ISO 9001:2015',
              'Apply the PDCA cycle to building services quality improvement',
              'Implement effective document control procedures',
              'Manage non-conformances through NCR processes',
              'Understand corrective and preventive action requirements',
              'Contribute to continual improvement initiatives',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="ISO 9001:2015 Structure and Requirements">
            <p>
              ISO 9001:2015 is the internationally recognised standard for quality management
              systems (QMS). It provides a framework for organisations to consistently meet customer
              and regulatory requirements while continually improving their processes.
            </p>
            <p>
              <strong>The 10-clause structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Clauses 1-3:</strong> Scope, References, Terms — Introductory clauses
              </li>
              <li>
                <strong>Clause 4:</strong> Context of the Organisation — Understanding
                internal/external issues, interested parties
              </li>
              <li>
                <strong>Clause 5:</strong> Leadership — Management commitment, quality policy, roles
              </li>
              <li>
                <strong>Clause 6:</strong> Planning — Risks, opportunities, quality objectives
              </li>
              <li>
                <strong>Clause 7:</strong> Support — Resources, competence, communication,
                documentation
              </li>
              <li>
                <strong>Clause 8:</strong> Operation — Planning, control of processes, service
                delivery
              </li>
              <li>
                <strong>Clause 9:</strong> Performance Evaluation — Monitoring, measurement,
                analysis, audits
              </li>
              <li>
                <strong>Clause 10:</strong> Improvement — Non-conformity, corrective action,
                continual improvement
              </li>
            </ul>
            <p>
              <strong>Core principles of ISO 9001:2015:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer focus:</strong> Meeting and exceeding customer expectations
              </li>
              <li>
                <strong>Leadership:</strong> Creating unity of purpose and direction
              </li>
              <li>
                <strong>Engagement of people:</strong> Competent, empowered staff
              </li>
              <li>
                <strong>Process approach:</strong> Managing activities as interrelated processes
              </li>
              <li>
                <strong>Improvement:</strong> Ongoing focus on enhancement
              </li>
              <li>
                <strong>Evidence-based decisions:</strong> Using data and analysis
              </li>
              <li>
                <strong>Relationship management:</strong> Managing interested parties
              </li>
              <li>
                <strong>Risk-based thinking:</strong> Proactive risk identification
              </li>
            </ul>
            <p>
              <strong>Building services application:</strong> For M&E contractors, ISO 9001
              certification demonstrates commitment to quality and is often a pre-qualification
              requirement for major projects.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="The PDCA Cycle and Quality Procedures">
            <p>
              The Plan-Do-Check-Act (PDCA) cycle, also known as the Deming Cycle, is the engine of
              continual improvement in quality management. ISO 9001:2015 is built around this
              methodology.
            </p>
            <p>
              <strong>Plan:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Establish objectives and processes</li>
              <li>Identify risks and opportunities</li>
              <li>Determine resources needed</li>
              <li>Define success criteria</li>
            </ul>
            <p>
              <strong>Do:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Implement the planned processes</li>
              <li>Train personnel as required</li>
              <li>Document activities</li>
              <li>Collect data for analysis</li>
            </ul>
            <p>
              <strong>Check:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Monitor and measure results</li>
              <li>Compare against objectives</li>
              <li>Analyse data and trends</li>
              <li>Identify gaps and issues</li>
            </ul>
            <p>
              <strong>Act:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Take action to improve</li>
              <li>Implement corrective actions</li>
              <li>Standardise improvements</li>
              <li>Begin new cycle</li>
            </ul>
            <p>
              <strong>PDCA example — electrical installation testing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan:</strong> Create ITP, identify hold points, calibrate instruments,
                schedule inspections
              </li>
              <li>
                <strong>Do:</strong> Conduct testing per BS 7671, complete test sheets, record
                results
              </li>
              <li>
                <strong>Check:</strong> Review test results against requirements, identify failures,
                compare to benchmarks
              </li>
              <li>
                <strong>Act:</strong> Rectify failures, update procedures if systemic issues,
                improve for next phase
              </li>
            </ul>
            <p>
              <strong>Typical quality procedures for building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>QP-001:</strong> Document and Record Control
              </li>
              <li>
                <strong>QP-002:</strong> Control of Non-Conforming Work
              </li>
              <li>
                <strong>QP-003:</strong> Corrective and Preventive Action
              </li>
              <li>
                <strong>QP-004:</strong> Internal Auditing
              </li>
              <li>
                <strong>QP-005:</strong> Management Review
              </li>
              <li>
                <strong>QP-006:</strong> Control of Monitoring and Measuring Equipment
              </li>
              <li>
                <strong>QP-007:</strong> Purchasing and Supplier Evaluation
              </li>
              <li>
                <strong>QP-008:</strong> Training and Competence
              </li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Quality procedures should be practical and used daily,
              not just documents for auditors. If procedures aren't being followed, they may need
              simplification.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Document Control and Records Management">
            <p>
              Effective document control ensures that personnel always use current, approved
              versions of procedures, drawings, specifications, and other controlled documents. Poor
              document control leads to errors, rework, and non-conformances.
            </p>
            <p>
              <strong>Document control requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Documents reviewed and approved before issue</li>
              <li>Revision status clearly identified</li>
              <li>Current versions available at points of use</li>
              <li>Obsolete documents prevented from unintended use</li>
              <li>External documents identified and controlled</li>
            </ul>
            <p>
              <strong>Document control elements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Document number:</strong> Unique identification — QP-003, DWG-E-101
              </li>
              <li>
                <strong>Revision:</strong> Track version changes — Rev A, Rev 02, Issue 3
              </li>
              <li>
                <strong>Issue date:</strong> When current version released — 15/01/2024
              </li>
              <li>
                <strong>Approval:</strong> Authorisation of content — Approved by: J. Smith
              </li>
              <li>
                <strong>Distribution:</strong> Who receives controlled copies — Site office, QA
                Manager
              </li>
              <li>
                <strong>Change history:</strong> Record of amendments — Rev B: Added section 4.3
              </li>
            </ul>
            <p>
              <strong>Documents (controlled):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Quality procedures</li>
              <li>Work instructions</li>
              <li>Drawings and specifications</li>
              <li>Method statements</li>
              <li>ITPs and checklists</li>
            </ul>
            <p>
              <strong>Records (evidence):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Completed test certificates</li>
              <li>Inspection reports</li>
              <li>NCRs and corrective actions</li>
              <li>Training records</li>
              <li>Calibration certificates</li>
            </ul>
            <p>
              <strong>Drawing revision control on site:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transmittal:</strong> Formal issue of drawings with register
              </li>
              <li>
                <strong>Superseded stamp:</strong> Mark old drawings as obsolete
              </li>
              <li>
                <strong>Cloud markings:</strong> Identify changed areas on drawings
              </li>
              <li>
                <strong>RFI process:</strong> Formal clarification when drawings unclear
              </li>
              <li>
                <strong>As-built drawings:</strong> Record actual installation for O&M
              </li>
            </ul>
            <p>
              <strong>Common issue:</strong> Operatives working from superseded drawings is a
              frequent cause of rework. Establish a clear process for removing old drawings when new
              revisions are issued.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Non-Conformance Reporting and Continual Improvement">
            <p>
              Non-Conformance Reports (NCRs) are the formal mechanism for recording, investigating,
              and resolving deviations from specified requirements. A robust NCR process is
              essential for learning from mistakes and preventing recurrence.
            </p>
            <p>
              <strong>NCR process flow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Identification:</strong> Non-conformance detected and reported
              </li>
              <li>
                <strong>2. Recording:</strong> NCR raised with full details
              </li>
              <li>
                <strong>3. Containment:</strong> Immediate action to prevent further impact
              </li>
              <li>
                <strong>4. Investigation:</strong> Root cause analysis conducted
              </li>
              <li>
                <strong>5. Correction:</strong> Work rectified or concession agreed
              </li>
              <li>
                <strong>6. Corrective action:</strong> Measures to prevent recurrence
              </li>
              <li>
                <strong>7. Verification:</strong> Effectiveness confirmed
              </li>
              <li>
                <strong>8. Close-out:</strong> NCR formally closed
              </li>
            </ul>
            <p>
              <strong>NCR content requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Description:</strong> What, where, when, who discovered, extent
              </li>
              <li>
                <strong>Requirement:</strong> Specification, drawing, or standard not met
              </li>
              <li>
                <strong>Root cause:</strong> Why did this occur? (5 Whys analysis)
              </li>
              <li>
                <strong>Disposition:</strong> Rectify, rework, accept as-is, reject
              </li>
              <li>
                <strong>Corrective action:</strong> Action to prevent recurrence
              </li>
              <li>
                <strong>Evidence:</strong> Photos, test results, witness statements
              </li>
            </ul>
            <p>
              <strong>Root cause analysis — the 5 Whys (example: cable installed in wrong
              location):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Why 1:</strong> Electrician installed in wrong position → Used wrong drawing
              </li>
              <li>
                <strong>Why 2:</strong> Why wrong drawing? → Old revision on site
              </li>
              <li>
                <strong>Why 3:</strong> Why old revision on site? → Not collected when new issue
                distributed
              </li>
              <li>
                <strong>Why 4:</strong> Why not collected? → No sign-off process for superseded
                drawings
              </li>
              <li>
                <strong>Why 5:</strong> Why no process? → Document control procedure doesn't include
                collection step
              </li>
              <li>
                <strong>Root cause:</strong> Document control procedure inadequate → Update
                procedure
              </li>
            </ul>
            <p>
              <strong>Continual improvement methods:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NCR trend analysis:</strong> Identify recurring issues across projects
              </li>
              <li>
                <strong>Internal audits:</strong> Systematic review of QMS compliance
              </li>
              <li>
                <strong>Management review:</strong> Strategic assessment of QMS performance
              </li>
              <li>
                <strong>Customer feedback:</strong> Client satisfaction surveys and defect data
              </li>
              <li>
                <strong>Lessons learned:</strong> Post-project reviews and knowledge sharing
              </li>
              <li>
                <strong>Benchmarking:</strong> Comparison with industry best practice
              </li>
            </ul>
            <p>
              <strong>Quality KPIs for building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>First-time pass rate:</strong> % inspections passed first time — target
                &gt;95%
              </li>
              <li>
                <strong>NCR rate:</strong> NCRs per £1M contract value — target &lt;5
              </li>
              <li>
                <strong>Snagging density:</strong> Snags per 100m² at handover — target &lt;2
              </li>
              <li>
                <strong>NCR close-out time:</strong> Average days to close NCRs — target &lt;14 days
              </li>
              <li>
                <strong>Customer satisfaction:</strong> Post-project survey score — target &gt;8/10
              </li>
            </ul>
            <p>
              <strong>Culture note:</strong> A healthy quality culture encourages reporting issues
              without blame. Organisations with low NCR numbers may actually have poor reporting
              rather than good quality.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — ITP hold point:</strong> An Inspection and Test Plan (ITP) for a
              distribution board installation includes a hold point for pre-energisation inspection.
              What must happen?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hold Point: Pre-energisation Inspection (H)</li>
              <li>Work must STOP until inspection completed</li>
              <li>Inspector (client/M&E consultant) formally notified</li>
              <li>Inspection conducted per checklist criteria</li>
              <li>Sign-off obtained before energisation proceeds</li>
              <li>Records retained as quality evidence</li>
              <li>
                <strong>Result:</strong> Hold points are mandatory; work cannot proceed without
                sign-off
              </li>
            </ul>
            <p>
              <strong>Example 2 — NCR for incorrect installation:</strong> Containment installed at
              2.7m height instead of specified 3.0m. How should this be managed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NCR-2024-0047:</strong> Cable Containment at Incorrect Height
              </li>
              <li>
                <strong>Description:</strong> 25m of cable tray installed at 2.7m instead of 3.0m
                per DWG-E-201 Rev C
              </li>
              <li>
                <strong>Containment:</strong> Area marked, no further installation
              </li>
              <li>Operative worked from marked-up drawing showing 2.7m (previous design)</li>
              <li>Marked-up drawing not updated when formal revision issued</li>
              <li>
                <strong>Disposition 1 — Rectify:</strong> Remove and reinstall at 3.0m (cost: £2,400)
              </li>
              <li>
                <strong>Disposition 2 — Concession:</strong> Accept at 2.7m if clearances acceptable
                (requires design approval)
              </li>
              <li>
                <strong>Corrective action:</strong> All marked-up drawings to be verified against
                current revision weekly
              </li>
            </ul>
            <p>
              <strong>Example 3 — Document control audit finding:</strong> Internal audit finds 3
              superseded drawings in site office. How should this be addressed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Audit Finding:</strong> AF-2024-012
              </li>
              <li>
                <strong>Observation:</strong> 3 superseded drawings found in active use folder
              </li>
              <li>DWG-E-101 Rev A (current: Rev C)</li>
              <li>DWG-E-205 Rev B (current: Rev D)</li>
              <li>DWG-M-301 Rev - (current: Rev A)</li>
              <li>
                <strong>Classification:</strong> Minor non-conformance
              </li>
              <li>Remove superseded drawings from site</li>
              <li>Verify current revisions available</li>
              <li>Brief site team on document control</li>
              <li>
                <strong>Corrective action:</strong> Implement weekly drawing register check by Site
                Engineer
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>QMS implementation checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Quality policy established and communicated</li>
              <li>Quality objectives defined and measurable</li>
              <li>Procedures documented for key processes</li>
              <li>Document control system operational</li>
              <li>NCR process understood by all staff</li>
              <li>Internal audit schedule in place</li>
              <li>Management review conducted regularly</li>
              <li>Training records maintained for competence</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                ISO 9001:2015 has <strong>10 clauses</strong> (4-10 are requirements)
              </li>
              <li>
                PDCA cycle: <strong>Plan-Do-Check-Act</strong>
              </li>
              <li>
                Records retention: Typically <strong>6 years minimum</strong> for construction
              </li>
              <li>
                Internal audits: <strong>Independent of area audited</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Paper-only QMS</strong> — Procedures that aren't actually followed
                </li>
                <li>
                  <strong>Blame culture</strong> — Discourages issue reporting
                </li>
                <li>
                  <strong>Ignoring root cause</strong> — Only fixing symptoms, not causes
                </li>
                <li>
                  <strong>Skipping hold points</strong> — Proceeding without required approvals
                </li>
              </ul>
            }
            doInstead="Build a QMS that operatives use daily, treat issue reporting as improvement data not blame, run 5-Whys to find root causes before closing NCRs, and never proceed past a hold point without formal sign-off."
          />

          <SectionRule />

          <Scenario
            title="Failed surveillance audit triggers project re-work"
            situation={
              <>
                Your company holds ISO 9001:2015 certification. During a UKAS-accredited surveillance audit at one of your live MEP projects, the auditor finds 14 NCRs: missing site induction records, undated drawings on site, ITP hold-points unsigned, defective equipment installed without challenge, unsigned QA sign-offs at level 3. The certification body issues a major NCR, threatening certification suspension if not closed within 30 days.
              </>
            }
            whatToDo={
              <>
                Convene an urgent project quality review. Brief the site team. Implement a controlled-document register on site, with an out-of-date drawing amnesty followed by a controlled re-issue. Re-validate all open ITPs and sign retrospectively where work has been verified. Brief subcontractors on document control discipline. Implement weekly site QA walk-rounds by the PM. Close all NCRs within 30 days with corrective action evidence. Lessons learned across the wider business — every project needs the same baseline.
              </>
            }
            whyItMatters={
              <>
                QMS certification is reputational and commercial — many clients require it as PQQ pre-condition. A suspended certification can lock you out of pre-qualified frameworks for years. More importantly, the project quality issues that generate the NCRs are the same ones that generate defects, rework and client claims. QMS discipline is project-margin discipline.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "ISO 9001:2015 is risk-based, process-led, leadership-driven — not paperwork.",
              "Seven principles: customer focus, leadership, engagement, process, improvement, evidence, relationships.",
              "Documented info: policy, manual, procedures, instructions, records — only what is needed.",
              "Internal audit programme verifies compliance; management review closes the loop.",
              "NCRs investigated for root cause, corrective action implemented and verified.",
              "Continual improvement (PDCA cycle): plan, do, check, act.",
              "Certification by UKAS-accredited body is the badge; operational discipline is the value.",
              "Project-level QMS is the daily reality — PM’s attention makes the difference.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Quality management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Inspection and test plans
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section4_1;
