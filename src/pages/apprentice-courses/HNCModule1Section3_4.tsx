/**
 * Module 1 · Section 3 · Subsection 4 — Safety Audits and Inspections
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Active monitoring (audit, inspection, observation) and reactive monitoring (incident,
 *   near-miss). Engineer-in-training perspective: how an HNC supervisor uses MHSWR Reg 5
 *   monitoring to keep the SSOW honest.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safety Audits and Inspections - HNC Module 1 Section 3.4';
const DESCRIPTION =
  'Understand the difference between safety audits and inspections, their types, frequency, reporting requirements, and corrective action processes in building services.';

const quickCheckQuestions = [
  {
    id: 'audit-vs-inspection',
    question: 'What is the key difference between an audit and an inspection?',
    options: [
      'Audits are carried out by external bodies; inspections never are',
      'Audits examine systems and compliance; inspections check physical conditions',
      'Audits check physical conditions; inspections examine paperwork only',
      'Audits are legally required; inspections are entirely voluntary',
    ],
    correctIndex: 1,
    explanation:
      'Audits examine management systems, documentation, and compliance with standards. Inspections focus on physical workplace conditions, equipment, and work practices at a point in time.',
  },
  {
    id: 'inspection-frequency',
    question: 'How often should workplace safety inspections typically be conducted?',
    options: [
      'Weekly to monthly depending on risk level',
      'Only once at the start of a project',
      'Every five years regardless of risk',
      'Only after an accident has occurred',
    ],
    correctIndex: 0,
    explanation:
      'Inspection frequency depends on risk level - high-risk workplaces may need daily or weekly inspections, while lower-risk areas may be monthly. Construction sites typically require daily inspections.',
  },
  {
    id: 'corrective-action',
    question: 'What should happen immediately if an inspection identifies an imminent danger?',
    options: [
      'Wait for management approval',
      'Include it in the monthly report',
      'Stop work and take immediate corrective action',
      'Note it for the next safety meeting',
    ],
    correctIndex: 2,
    explanation:
      'Imminent dangers require immediate action - stop work, remove people from danger, and implement emergency controls. Do not wait for paperwork or approval when life is at risk.',
  },
  {
    id: 'audit-evidence',
    question: 'What type of evidence should safety auditors gather?',
    options: [
      'Only the organisation’s written safety policy document',
      'Only verbal assurances from senior management',
      'Documents, observations, and interviews combined',
      'Only photographs of the workplace taken on the day',
    ],
    correctIndex: 2,
    explanation:
      'Effective audits gather triangulated evidence: documents (policies, records), observations (physical conditions, behaviours), and interviews (understanding, attitudes). This provides a complete picture.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of a safety audit?',
    options: [
      'To apportion blame to individuals after an accident',
      'To verify that safety management systems are effective',
      'To replace the need for workplace inspections entirely',
      'To record the physical condition of equipment on the day',
    ],
    correctAnswer: 1,
    explanation:
      'Safety audits systematically evaluate whether the safety management system is implemented, effective, and achieving its objectives. They verify compliance and identify improvement opportunities.',
  },
  {
    id: 2,
    question: "Which type of audit is conducted by an organisation's own staff?",
    options: [
      'Certification audit',
      'Third-party audit',
      'Internal audit',
      'External audit',
    ],
    correctAnswer: 2,
    explanation:
      'Internal audits are conducted by trained staff from within the organisation. External or third-party audits are conducted by independent bodies, often for certification purposes.',
  },
  {
    id: 3,
    question: "What does a 'statutory inspection' refer to?",
    options: [
      'An inspection requested voluntarily by the workforce',
      'A management walk-round to demonstrate visible leadership',
      'A daily housekeeping check carried out by the site supervisor',
      'Legally required inspection of specific equipment or systems',
    ],
    correctAnswer: 3,
    explanation:
      'Statutory inspections are legally required under regulations like LOLER (lifting equipment), PUWER (work equipment), and the Electricity at Work Regulations (electrical installations).',
  },
  {
    id: 4,
    question: 'Who should conduct workplace safety inspections?',
    options: [
      'Competent persons including managers, supervisors, and safety reps',
      'Only an external HSE inspector appointed by the regulator',
      'Only the company director, as the legally accountable person',
      'Any available operative, regardless of training or experience',
    ],
    correctAnswer: 0,
    explanation:
      'Inspections should involve various competent persons: managers, supervisors, safety representatives, and workers. Different perspectives identify different issues. Training is essential.',
  },
  {
    id: 5,
    question: "What is a 'non-conformance' in audit terminology?",
    options: [
      'A positive finding of good practice worth replicating',
      'A failure to meet a specified requirement',
      'A worker who declines to take part in the audit',
      'A recommendation for future improvement only',
    ],
    correctAnswer: 1,
    explanation:
      "A non-conformance is a failure to meet a requirement of the standard, legal provision, or the organisation's own documented system. It requires corrective action and follow-up.",
  },
  {
    id: 6,
    question: 'What is the recommended structure for an inspection checklist?',
    options: [
      'A single open-ended box for free-text general comments only',
      'Items listed in random order to keep the inspector alert',
      'Logical sequence covering all relevant areas systematically',
      'Only the items that failed at the previous inspection',
    ],
    correctAnswer: 2,
    explanation:
      'Checklists should follow a logical sequence, often geographical (room by room) or by topic (electrical, fire, access). This ensures systematic coverage without missing areas.',
  },
  {
    id: 7,
    question: 'What should an audit report include?',
    options: [
      'A list of individuals at fault and proposed disciplinary action',
      'Only the non-conformances, with no positive findings recorded',
      'A pass or fail grade with no supporting detail or evidence',
      'Scope, findings, evidence, conclusions, and recommendations',
    ],
    correctAnswer: 3,
    explanation:
      'Comprehensive audit reports include: scope and objectives, methodology, positive findings, non-conformances with evidence, root cause analysis, conclusions, and prioritised recommendations.',
  },
  {
    id: 8,
    question: 'How should corrective actions from inspections be prioritised?',
    options: [
      'By risk level - highest risk first',
      'By the order in which they were found during the walk-round',
      'By the lowest cost to fix first, regardless of risk',
      'Alphabetically by the area or department affected',
    ],
    correctAnswer: 0,
    explanation:
      'Corrective actions should be prioritised by risk: immediate action for imminent dangers, short-term for high risks, medium-term for moderate risks, and planned for lower risks.',
  },
  {
    id: 9,
    question: "What is the purpose of a 'site safety tour' by senior management?",
    options: [
      'To replace the formal weekly inspection carried out by supervisors',
      'To demonstrate commitment and engage with workers on safety',
      'To identify individuals to discipline for unsafe behaviour',
      'To satisfy a legal duty to inspect every site location daily',
    ],
    correctAnswer: 1,
    explanation:
      "Management safety tours demonstrate visible leadership commitment, provide opportunity to engage with workers, identify issues, and reinforce safety culture. They complement but don't replace formal inspections.",
  },
  {
    id: 10,
    question: 'How should audit non-conformances be tracked?',
    options: [
      'Noted verbally in the closing meeting, with no written record',
      'Closed immediately once the auditor leaves the site',
      'Logged, assigned owners, target dates set, and verified closed',
      'Held confidentially by the auditor and not shared with managers',
    ],
    correctAnswer: 2,
    explanation:
      'Non-conformances require formal tracking: logging in a register, assigning responsible persons, setting realistic target dates, monitoring progress, and verifying effective closure.',
  },
  {
    id: 11,
    question: "What is a 'periodic inspection' under the Electricity at Work Regulations?",
    options: [
      'A one-off inspection carried out only when the installation is new',
      'A daily visual check of portable appliances before use',
      'An inspection triggered solely by a reported electric shock',
      'Required inspection of electrical installations at defined intervals',
    ],
    correctAnswer: 3,
    explanation:
      'Under the Electricity at Work Regulations and BS 7671, electrical installations require periodic inspection and testing at intervals appropriate to the type of installation and its use.',
  },
  {
    id: 12,
    question: 'What documentation should be retained from safety inspections?',
    options: [
      'Inspection reports, findings, corrective actions, and close-out evidence',
      'Only records of inspections where a serious hazard was found',
      'Nothing in writing, provided the actions were completed verbally',
      'Only the blank checklist template used on the day',
    ],
    correctAnswer: 0,
    explanation:
      'Retain complete records: dated inspection reports, who conducted them, findings (positive and negative), corrective actions raised, evidence of completion, and trend analysis over time.',
  },
];

const faqs = [
  {
    question: "What's the difference between first, second, and third-party audits?",
    answer:
      'First-party (internal) audits are conducted by the organisation on itself. Second-party audits are conducted by interested parties such as clients or principal contractors on suppliers. Third-party audits are conducted by independent certification bodies for formal accreditation.',
  },
  {
    question: 'How often should internal audits be conducted?',
    answer:
      'The entire safety management system should typically be audited at least annually, with high-risk areas audited more frequently. Many organisations operate a rolling programme that covers all elements over a defined cycle.',
  },
  {
    question: 'Can workers refuse to participate in audits or inspections?',
    answer:
      'Workers should be encouraged to participate as it demonstrates engagement and helps identify real issues. While they cannot be forced to answer questions, non-cooperation may itself be an audit finding about safety culture. Ensure workers understand audits are about systems, not blame.',
  },
  {
    question: 'What qualifications do safety auditors need?',
    answer:
      'Internal auditors need training in audit techniques (such as ISO 19011 principles) plus knowledge of the standards being audited against. Third-party auditors for certification typically hold Lead Auditor qualifications and relevant sector experience.',
  },
  {
    question: 'Should positive findings be included in audit reports?',
    answer:
      'Yes, definitely. Reporting positive findings recognises good practice, maintains morale, identifies what works well for replication elsewhere, and provides a balanced view. An audit that only reports negatives misses half the picture.',
  },
  {
    question: 'How do you handle repeat non-conformances?',
    answer:
      'Repeat issues indicate the original corrective action was ineffective or addressed symptoms not root causes. Escalate repeat findings, conduct deeper root cause analysis, consider systemic factors, and ensure senior management attention. They may indicate cultural or resource issues.',
  },
];

const HNCModule1Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1.3.4"
            title="Safety Audits and Inspections"
            description="Monitoring safety performance through systematic checking and verification"
            tone="purple"
          />

          <TLDR
            points={[
              'You will distinguish audits (system-level checks of policy and arrangements) from inspections (workplace-level checks of conditions and behaviour).',
              'You can run an active monitoring programme (planned inspections, behavioural observations, audit) alongside reactive monitoring (incident investigation, near-miss).',
              'You apply MHSWR Reg 5 — health and safety arrangements must include effective monitoring and review.',
              'You write findings that prioritise corrective actions by risk, with named owners and target dates.',
            ]}
          />

          <RegsCallout
            source="MHSWR 1999 — Regulation 5(1)"
            clause="Every employer shall make and give effect to such arrangements as are appropriate, having regard to the nature of his activities and the size of his undertaking, for the effective planning, organisation, control, monitoring and review of the preventive and protective measures."
            meaning={
              <>
                Reg 5 names monitoring and review as statutory duties. Audit and inspection are
                the two main mechanisms. As an HNC supervisor your audit programme is the
                evidence that the firm is meeting Reg 5.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Reg 5(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish between safety audits and safety inspections",
              "Identify different types of audits and their purposes",
              "Understand statutory inspection requirements for building services",
              "Plan and conduct effective workplace inspections",
              "Implement corrective action processes for findings",
              "Apply risk-based prioritisation to safety findings",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Understanding Audits and Inspections</ContentEyebrow>

          <ConceptBlock title="Understanding Audits and Inspections">
            <p>
            While often used interchangeably, audits and inspections serve different purposes in
            safety management. Understanding the distinction helps apply the right approach for
            different monitoring needs.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Differences</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Focus</strong> — Safety Audit: Management systems, procedures, compliance. Safety Inspection: Physical conditions, equipment, practices</li>
            <li><strong>Depth</strong> — Safety Audit: Systematic, comprehensive, in-depth. Safety Inspection: Snapshot at a point in time</li>
            <li><strong>Frequency</strong> — Safety Audit: Annual or planned programme. Safety Inspection: Daily to monthly based on risk</li>
            <li><strong>Conducted by</strong> — Safety Audit: Trained auditors (internal/external). Safety Inspection: Supervisors, managers, safety reps</li>
            <li><strong>Output</strong> — Safety Audit: Formal report with non-conformances. Safety Inspection: Checklist, action list, observations</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Audits</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Internal (1st party):</strong> Self-assessment
            </li>
            <li>
            <strong>Supplier (2nd party):</strong> Client auditing contractor
            </li>
            <li>
            <strong>Certification (3rd party):</strong> Independent body
            </li>
            <li>
            <strong>Compliance audit:</strong> Against legal requirements
            </li>
            <li>
            <strong>System audit:</strong> Against ISO 45001 or similar
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Inspections</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>General workplace:</strong> Overall conditions
            </li>
            <li>
            <strong>Statutory:</strong> Legally required checks
            </li>
            <li>
            <strong>Pre-use:</strong> Equipment before each use
            </li>
            <li>
            <strong>Management tour:</strong> Leadership visibility
            </li>
            <li>
            <strong>Behavioural:</strong> Work practices observed
            </li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Complementary approaches:</strong> Audits and inspections work together -
            audits ensure systems are in place; inspections verify they're implemented on the
            ground.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Statutory Inspection Requirements</ContentEyebrow>

          <ConceptBlock title="Statutory Inspection Requirements">
            <p>
            Certain equipment and systems require inspection at legally defined intervals. In
            building services, this includes electrical installations, lifting equipment, pressure
            systems, and work equipment.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Key Statutory Inspections for Building Services
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electrical installation</strong> — Regulation: EAWR / BS 7671. Typical Interval: 1-5 years (based on type)</li>
            <li><strong>Lifting equipment (MEWP, hoist)</strong> — Regulation: LOLER 1998. Typical Interval: 6-12 months</li>
            <li><strong>Pressure systems</strong> — Regulation: PSSR 2000. Typical Interval: As per written scheme</li>
            <li><strong>Portable appliances</strong> — Regulation: EAWR (via PUWER). Typical Interval: 3 months - 4 years (risk-based)</li>
            <li><strong>Fire detection systems</strong> — Regulation: RRO / BS 5839. Typical Interval: Weekly test, annual service</li>
            <li><strong>Emergency lighting</strong> — Regulation: RRO / BS 5266. Typical Interval: Monthly test, annual full test</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Electrical Periodic Inspection Intervals (BS 7671)
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Domestic: 10 years (5 on change of occupancy)</li>
            <li>Commercial: 5 years</li>
            <li>Industrial: 3 years</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Leisure/entertainment: 1 year</li>
            <li>Construction site: 3 months</li>
            <li>Caravan parks: 1-3 years</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Record keeping:</strong> Statutory inspection reports and certificates must be
            retained and made available for inspection. LOLER thorough examinations require
            reports kept until the next examination; EICR kept for the period of the certificate
            plus 2 years.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Conducting Effective Inspections</ContentEyebrow>

          <ConceptBlock title="Conducting Effective Inspections">
            <p>
            Regular workplace inspections are essential for identifying hazards before they cause
            harm. Effective inspections are planned, systematic, and result in action - not just
            paperwork.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Inspection process:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Prepare:</strong> Review previous findings, incidents, current work
            activities
            </li>
            <li>
            <strong>Conduct:</strong> Follow systematic route, use checklist, observe and talk
            to workers
            </li>
            <li>
            <strong>Record:</strong> Document findings with location, description, photos if
            needed
            </li>
            <li>
            <strong>Prioritise:</strong> Risk-rank findings for action priority
            </li>
            <li>
            <strong>Act:</strong> Assign actions, set deadlines, follow up completion
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Sample Inspection Checklist Areas
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Access/egress</strong> — Items to Check: Clear walkways, unobstructed exits, signage, lighting</li>
            <li><strong>Electrical</strong> — Items to Check: Cable condition, temporary supplies, isolation points, testing records</li>
            <li><strong>Working at height</strong> — Items to Check: Scaffold condition, ladder inspection tags, edge protection</li>
            <li><strong>Fire precautions</strong> — Items to Check: Extinguisher condition, storage of flammables, hot work controls</li>
            <li><strong>PPE</strong> — Items to Check: Correct PPE worn, condition, storage, availability</li>
            <li><strong>Housekeeping</strong> — Items to Check: Waste management, material storage, slip/trip hazards</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Tips</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Vary route to avoid predictable patterns</li>
            <li>Look up, down, behind - not just eye level</li>
            <li>Engage workers - ask about concerns</li>
            <li>Check work in progress, not just static conditions</li>
            <li>Note positive findings too</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Site Inspection Frequency
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Construction site: Daily by supervisor</li>
            <li>Construction site: Weekly formal inspection</li>
            <li>Occupied commercial: Monthly minimum</li>
            <li>High-risk areas: More frequent as required</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Worker involvement:</strong> Including workers in inspections improves
            coverage, builds ownership, and often identifies issues that outsiders miss. Safety
            reps have statutory rights to conduct inspections.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Corrective Action and Follow-up</ContentEyebrow>

          <ConceptBlock title="Corrective Action and Follow-up">
            <p>
            Findings from audits and inspections are only valuable if they lead to action. A
            robust corrective action process ensures issues are addressed effectively and verified
            closed.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Action Priority Framework
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Immediate</strong> — Risk Level: Imminent danger. Timeframe: Stop work now. Example: Exposed live conductors</li>
            <li><strong>High</strong> — Risk Level: High risk. Timeframe: Within 24-48 hours. Example: Scaffold incomplete</li>
            <li><strong>Medium</strong> — Risk Level: Moderate risk. Timeframe: Within 1-2 weeks. Example: PPE storage inadequate</li>
            <li><strong>Low</strong> — Risk Level: Low risk. Timeframe: Within 1 month. Example: Notice board update needed</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-white mb-2">Corrective action process:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Log:</strong> Enter finding in tracking system with unique reference
            </li>
            <li>
            <strong>Assign:</strong> Allocate to person with authority to resolve
            </li>
            <li>
            <strong>Analyse:</strong> Identify root cause, not just symptoms
            </li>
            <li>
            <strong>Plan:</strong> Define corrective action with realistic deadline
            </li>
            <li>
            <strong>Implement:</strong> Carry out the action
            </li>
            <li>
            <strong>Verify:</strong> Check action was effective - close only when confirmed
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Audit Reporting Best Practice
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Executive summary with key findings and overall opinion</li>
            <li>Scope, objectives, and methodology described</li>
            <li>Positive findings as well as non-conformances</li>
            <li>Evidence referenced for each finding</li>
            <li>Risk-rated non-conformances with recommended actions</li>
            <li>Agreed management responses and target dates</li>
            </ul>
            

            <p className="text-sm text-white italic">
            <strong>Trend analysis:</strong> Review findings over time to identify patterns.
            Repeat issues in the same area may indicate systemic problems, training gaps, or
            cultural issues that need deeper investigation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Application">
            <p><strong>Example 1: Weekly Site Inspection</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Site:</strong> New commercial building - M&E installation phase.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Inspection Findings:</strong>
            </p>
            <p className="ml-4 text-red-400">
            HIGH: Temporary DB cover removed, live terminals exposed
            </p>
            <p className="ml-4">
            → Action: Immediate - work stopped, cover replaced before resuming
            </p>
            <p className="ml-4 text-amber-400">
            MEDIUM: Some operatives not wearing eye protection during drilling
            </p>
            <p className="ml-4">→ Action: Toolbox talk on PPE, supervisors to monitor</p>
            <p className="ml-4 text-yellow-400">
            LOW: Storage area cluttered, materials blocking access
            </p>
            <p className="ml-4">→ Action: Site tidy scheduled for Friday</p>
            <p className="mt-2 text-green-400">
            POSITIVE: All scaffold inspections up to date with tags
            </p>
            </div>
            

            
            <p><strong>Example 2: Internal Safety Audit Finding</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Finding:</strong> Training records do not demonstrate competence
            verification.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Non-Conformance Report:</strong>
            </p>
            <p className="ml-4">Ref: NC-2024-017</p>
            <p className="ml-4">Standard: Training Procedure TP-003 clause 5.3</p>
            <p className="ml-4">
            Finding: Training records show attendance but no evidence of competence assessment
            </p>
            <p className="ml-4">
            Evidence: Sample of 10 training records reviewed - none include test results
            </p>
            <p className="mt-2">
            <strong>Root Cause:</strong> Assessment element not built into training process
            </p>
            <p className="mt-2">
            <strong>Corrective Action:</strong>
            </p>
            <p className="ml-4">
            1. Revise training procedure to include assessment (Owner: L&D Manager)
            </p>
            <p className="ml-4">2. Create assessment templates for each training module</p>
            <p className="ml-4">3. Brief trainers on new requirements</p>
            <p className="ml-4">4. Target date: 30 days</p>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Key Points Summary">
            <div>
            <p><strong>Audit Essentials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Audits verify systems - are policies and procedures implemented?
            </li>
            <li>
            Gather evidence from documents, observations, and interviews
            </li>
            <li>Report both positive findings and non-conformances</li>
            <li>Track corrective actions to verified closure</li>
            <li>Use findings for continuous improvement</li>
            </ul>
            </div>

            <div>
            <p><strong>Inspection Essentials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Inspections check physical conditions and behaviours</li>
            <li>Frequency based on risk - high risk = more frequent</li>
            <li>Use checklists but don't be limited by them</li>
            <li>Involve workers and safety representatives</li>
            <li>Act immediately on imminent dangers</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Tick-box approach:</strong> Going through motions without engagement
            </li>
            <li>
            <strong>No follow-up:</strong> Actions not tracked or closed
            </li>
            <li>
            <strong>Blame focus:</strong> Finding fault rather than fixing systems
            </li>
            <li>
            <strong>Poor prioritisation:</strong> All issues treated equally
            </li>
            <li>
            <strong>No trend analysis:</strong> Missing patterns in repeat issues
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Quarterly site inspection on a multi-trade fit-out"
            situation={
              <>
                You are running a quarterly safety inspection on a 24-week multi-trade office
                fit-out. Last quarter&rsquo;s findings included blocked fire-escape routes and
                missing isolation locks. The actions were closed, but you want to verify on
                the ground.
              </>
            }
            whatToDo={
              <>
                Walk the floors with the principal contractor&rsquo;s safety lead and the
                workforce safety rep. Check fire routes physically (not just paperwork),
                check isolation lock kits at each TBA, sample five RAMS at random, observe a
                live task. Photograph findings, score against a numerical checklist, prioritise
                actions: red (stop work), amber (close within 7 days), green (improvement).
                Issue the report within 48 hours, allocate named owners, follow up at the next
                review.
              </>
            }
            whyItMatters={
              <>
                Closing actions on paper without verifying on the floor is the most common
                audit failing. The HSE will sample your inspection records after any incident
                and a paper-only history is treated as evidence of a wider failure.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Audit = system-level (policy, procedures, arrangements). Inspection = workplace-level (conditions, behaviour).',
              'MHSWR Reg 5 names monitoring and review as statutory duties.',
              'Active monitoring (planned inspections, observations, audit) is leading; reactive monitoring (incident, near-miss) is lagging.',
              'Audit programme: scope, criteria, methodology, frequency, competence of auditor, reporting.',
              'Inspection findings: prioritise by risk (red/amber/green), name owners, set target dates, verify closure.',
              'HSG65 Plan-Do-Check-Act provides the framework — inspection sits in Check.',
              'Behavioural observation programmes (e.g. DuPont STOP, BBS) measure leading indicators of culture.',
              'Independent audit (internal department or external) is more credible than self-audit.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section3-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Emergency Procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section3_4;
