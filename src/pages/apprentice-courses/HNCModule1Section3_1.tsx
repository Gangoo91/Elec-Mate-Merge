/**
 * Module 1 · Section 3 · Subsection 1 — Safety Policy and Organisation
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The written H&S policy under HSWA s.2(3), the organisation chart and the arrangements
 *   that turn intent into practice. Engineer-in-training perspective: how an HNC supervisor
 *   uses the firm&rsquo;s policy as the operational lever for everything from training to
 *   audit.
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

const TITLE = 'Safety Policy and Organisation - HNC Module 1 Section 3.1';
const DESCRIPTION =
  'Understand safety policy requirements, organisational responsibilities, management commitment, and effective communication of health and safety in building services engineering.';

const quickCheckQuestions = [
  {
    id: 'policy-statement',
    question: 'What must a written health and safety policy include as its first element?',
    options: [
      'Risk assessments',
      'Training records',
      'Emergency procedures',
      'General statement of intent',
    ],
    correctIndex: 3,
    explanation:
      "The general statement of intent is the first and most important element - it sets out the organisation's commitment to health and safety, signed by the most senior person.",
  },
  {
    id: 'policy-threshold',
    question:
      'At what employee threshold must an organisation have a written health and safety policy?',
    options: [
      '1 employee',
      '5 or more employees',
      '50 or more employees',
      '10 or more employees',
    ],
    correctIndex: 1,
    explanation:
      'Under the Health and Safety at Work etc. Act 1974, employers with 5 or more employees must have a written health and safety policy.',
  },
  {
    id: 'policy-review',
    question: 'How often should a health and safety policy be reviewed as a minimum?',
    options: [
      'Quarterly',
      'Every 5 years',
      'Annually',
      'Monthly',
    ],
    correctIndex: 2,
    explanation:
      'Safety policies should be reviewed at least annually, or sooner if there are significant changes to the organisation, legislation, or after incidents.',
  },
  {
    id: 'communication-method',
    question:
      'Which is the most effective method for communicating safety information to site workers?',
    options: [
      'Its excellent thermal resistance',
      'According to BS7671 tables',
      'Below minimum requirements',
      'Toolbox talks and briefings',
    ],
    correctIndex: 3,
    explanation:
      'Toolbox talks and regular briefings are most effective as they allow two-way communication, immediate feedback, and can address current site-specific hazards.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the three main parts of a health and safety policy?',
    options: [
      'To establish true vertical reference lines',
      'Statement of intent, organisation, arrangements',
      'Its maximum continuous apparent power output',
      'MTBF divided by (MTBF + MTTR), expressed as a percentage',
    ],
    correctAnswer: 1,
    explanation:
      'A health and safety policy must contain: (1) General statement of intent signed by senior management, (2) Organisation section detailing responsibilities, (3) Arrangements section describing how safety is managed in practice.',
  },
  {
    id: 2,
    question: 'Who has ultimate responsibility for health and safety in an organisation?',
    options: [
      'Optimise accuracy and safety',
      'The scaffold may collapse due to instability',
      'The most senior person (MD/CEO/Owner)',
      'Equal load on each phase with equal phase angles',
    ],
    correctAnswer: 2,
    explanation:
      'The most senior person in the organisation holds ultimate responsibility for health and safety. They cannot delegate this responsibility, though they can delegate tasks to others.',
  },
  {
    id: 3,
    question:
      "What is the role of a 'competent person' under the Management of Health and Safety at Work Regulations?",
    options: [
      'To enforce safety rules and issue fines',
      'To carry out all risk assessments personally',
      'To represent employees in safety disputes',
      'To advise the employer on health and safety matters',
    ],
    correctAnswer: 3,
    explanation:
      'A competent person is appointed to assist the employer with health and safety. They must have sufficient training, experience, and knowledge to advise on compliance with health and safety law.',
  },
  {
    id: 4,
    question: 'Which document demonstrates management commitment to health and safety?',
    options: [
      'Signed statement of intent in the safety policy',
      'Being regularly reviewed, communicated, and implemented',
      'Changes in legislation, organisation, or after incidents',
      'To cooperate with the employer and follow safety arrangements',
    ],
    correctAnswer: 0,
    explanation:
      "The signed statement of intent demonstrates visible commitment from top management. It should be signed by the MD/CEO and clearly state the organisation's commitment to health and safety.",
  },
  {
    id: 5,
    question: "What is the purpose of the 'organisation' section of a safety policy?",
    options: [
      'To list all company products and services',
      'To detail who is responsible for what aspects of health and safety',
      "To outline the company's marketing strategy",
      "To describe the company's financial position",
    ],
    correctAnswer: 1,
    explanation:
      "The organisation section sets out the chain of responsibility for health and safety, from directors through managers, supervisors to employees, clearly stating each person's duties.",
  },
  {
    id: 6,
    question: 'How should safety responsibilities be communicated to employees?',
    options: [
      'Signed statement of intent in the safety policy',
      'Cascade from management through supervisors to operatives',
      'Through job descriptions, induction, and ongoing communication',
      'To cooperate with the employer and follow safety arrangements',
    ],
    correctAnswer: 2,
    explanation:
      'Safety responsibilities should be clearly documented in job descriptions, explained during induction, reinforced through training, and communicated through regular briefings and meetings.',
  },
  {
    id: 7,
    question: 'What triggers the need for a safety policy review?',
    options: [
      'To cooperate with the employer and follow safety arrangements',
      'Cascade from management through supervisors to operatives',
      'To advise the employer on health and safety matters',
      'Changes in legislation, organisation, or after incidents',
    ],
    correctAnswer: 3,
    explanation:
      'Policy reviews should occur annually as minimum, plus after any significant changes: new legislation, organisational restructure, new work activities, incidents/accidents, or audit findings.',
  },
  {
    id: 8,
    question: 'What is the role of safety representatives appointed by trade unions?',
    options: [
      'To represent employees and consult on safety matters',
      'To advise the employer on health and safety matters',
      'Signed statement of intent in the safety policy',
      'Changes in legislation, organisation, or after incidents',
    ],
    correctAnswer: 0,
    explanation:
      'Safety representatives represent employees in consultations with the employer, investigate hazards and complaints, inspect the workplace, and attend safety committee meetings.',
  },
  {
    id: 9,
    question:
      'Which building services scenario requires specific mention in the arrangements section?',
    options: [
      'To advise the employer on health and safety matters',
      'Isolation procedures for electrical work',
      'The most senior person (MD/CEO/Owner)',
      'Signed statement of intent in the safety policy',
    ],
    correctAnswer: 1,
    explanation:
      'The arrangements section must cover specific hazards and procedures relevant to the work, including isolation procedures, permit systems, PPE requirements, and emergency procedures for building services work.',
  },
  {
    id: 10,
    question: "What makes a safety policy 'live' and effective?",
    options: [
      'To represent employees and consult on safety matters',
      'Through job descriptions, induction, and ongoing communication',
      'Being regularly reviewed, communicated, and implemented',
      'To detail who is responsible for what aspects of health and safety',
    ],
    correctAnswer: 2,
    explanation:
      'An effective policy is regularly reviewed, actively communicated to all employees, implemented through practical arrangements, monitored for compliance, and updated based on feedback and incidents.',
  },
  {
    id: 11,
    question: 'Under HASAWA 1974, what duty do employees have regarding safety policies?',
    options: [
      'Cascade from management through supervisors to operatives',
      'Through job descriptions, induction, and ongoing communication',
      'Signed statement of intent in the safety policy',
      'To cooperate with the employer and follow safety arrangements',
    ],
    correctAnswer: 3,
    explanation:
      'Employees must cooperate with their employer on health and safety matters, follow safety rules and procedures, use equipment as trained, and not interfere with safety provisions.',
  },
  {
    id: 12,
    question:
      'What is the recommended structure for communicating safety information on a construction site?',
    options: [
      'Cascade from management through supervisors to operatives',
      'Being regularly reviewed, communicated, and implemented',
      'To cooperate with the employer and follow safety arrangements',
      'To advise the employer on health and safety matters',
    ],
    correctAnswer: 0,
    explanation:
      'Effective communication cascades down through the organisation: management decisions communicated through supervisors to operatives via toolbox talks, briefings, and site inductions, with feedback flowing upward.',
  },
];

const faqs = [
  {
    question: 'Can a small building services company share a safety policy template?',
    answer:
      "While templates can provide a starting point, the safety policy must be specific to your organisation. It must reflect your actual work activities, hazards, responsibilities, and arrangements. A generic template that doesn't match your operations is ineffective and may not meet legal requirements.",
  },
  {
    question: 'Who should sign the statement of intent?',
    answer:
      'The most senior person in the organisation - typically the Managing Director, CEO, or Owner. Their signature demonstrates top-level commitment. In larger organisations, divisional directors may also sign for their areas, but ultimate responsibility remains with the most senior person.',
  },
  {
    question: 'How do I communicate safety policy to subcontractors?',
    answer:
      'Subcontractors should receive relevant extracts during induction, particularly the arrangements section. They should acknowledge receipt and understanding. Their own safety arrangements must be compatible with yours. Regular coordination meetings and toolbox talks ensure ongoing communication.',
  },
  {
    question: "What happens if the safety policy isn't followed?",
    answer:
      'Failure to follow the policy could result in accidents, enforcement action by HSE (improvement or prohibition notices), prosecution, civil liability claims, and reputational damage. Employees who repeatedly breach safety rules may face disciplinary action up to dismissal.',
  },
  {
    question: 'Do I need a competent person if I have a safety policy?',
    answer:
      'Yes. Under the Management of Health and Safety at Work Regulations 1999, every employer must appoint one or more competent persons to assist with health and safety. This is separate from having a policy. In small firms, this could be a trained director; larger firms may employ dedicated safety professionals.',
  },
  {
    question: 'How detailed should the arrangements section be for electrical work?',
    answer:
      'The arrangements should cover all significant hazards: isolation procedures, permit to work systems, live working restrictions, testing procedures, PPE requirements, training requirements, supervision arrangements, and emergency procedures. It should reference specific procedures documents where needed.',
  },
];

const HNCModule1Section3_1 = () => {
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
            eyebrow="Module 1.3.1"
            title="Safety Policy and Organisation"
            description="The foundation of effective safety management in building services organisations"
            tone="purple"
          />

          <TLDR
            points={[
              'You will know the three required parts of a safety policy under HSWA s.2(3) — statement of intent, organisation, arrangements — and find them in your firm&rsquo;s policy on day one.',
              'You can map roles up the chain (board, director, manager, supervisor, operative) and explain who has which named duty.',
              'You apply HSG65 (Plan-Do-Check-Act) as the framework that links policy to practice.',
              'You recognise when a policy is unfit for purpose — out-of-date, unsigned, generic, untranslated for the workforce — and trigger revision.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 2(3)"
            clause="Except in such cases as may be prescribed, it shall be the duty of every employer to prepare and as often as may be appropriate revise a written statement of his general policy with respect to the health and safety at work of his employees and the organisation and arrangements for the time being in force for carrying out that policy, and to bring the statement and any revision of it to the notice of all of his employees."
            meaning={
              <>
                Five-or-more employees triggers the written-policy duty. As an HNC supervisor
                you check that the policy is current, signed by the most senior officer, and
                accessible to every operative — translated where the workforce&rsquo;s first
                language is not English.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.2(3) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the three essential elements of a health and safety policy",
              "Describe organisational responsibilities from directors to operatives",
              "Understand the role of competent persons in safety management",
              "Identify effective methods for communicating safety information",
              "Apply policy requirements to building services contexts",
              "Recognise triggers for policy review and update",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>The Health and Safety Policy</ContentEyebrow>

          <ConceptBlock title="The Health and Safety Policy">
            <p>
            The health and safety policy is the cornerstone of an organisation's safety management
            system. Under Section 2(3) of the Health and Safety at Work etc. Act 1974, every
            employer with five or more employees must prepare and revise a written statement of
            general policy on health and safety.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">The three essential elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>General Statement of Intent:</strong> The commitment from top management
            </li>
            <li>
            <strong>Organisation:</strong> Who is responsible for what
            </li>
            <li>
            <strong>Arrangements:</strong> How health and safety is managed in practice
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Statement of Intent Requirements
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Signature</strong> — Requirement: MD/CEO/Owner must sign. Purpose: Demonstrates commitment</li>
            <li><strong>Date</strong> — Requirement: Date of issue/review. Purpose: Shows currency of policy</li>
            <li><strong>Commitment</strong> — Requirement: Clear statement of intent. Purpose: Sets organisational culture</li>
            <li><strong>Objectives</strong> — Requirement: Key safety goals. Purpose: Provides direction</li>
            <li><strong>Review date</strong> — Requirement: Next review scheduled. Purpose: Ensures regular update</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Legal requirement:</strong> The policy must be brought to the attention of all
            employees. Simply having a policy locked in a cabinet does not fulfil this legal duty.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Organisation and Responsibilities</ContentEyebrow>

          <ConceptBlock title="Organisation and Responsibilities">
            <p>
            The organisation section establishes a clear chain of responsibility for health and
            safety, from the boardroom to the shop floor. Every person must understand their role
            and to whom they are accountable for safety matters.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Typical Responsibility Structure
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Directors/Senior Management</strong> — Key Responsibilities: Ultimate accountability, policy approval, resource allocation, strategic direction</li>
            <li><strong>Contracts/Project Managers</strong> — Key Responsibilities: Risk assessments, method statements, site safety plans, contractor coordination</li>
            <li><strong>Site Supervisors</strong> — Key Responsibilities: Daily supervision, toolbox talks, compliance monitoring, incident reporting</li>
            <li><strong>Electricians/Operatives</strong> — Key Responsibilities: Follow safe systems, use PPE, report hazards, cooperate with employer</li>
            <li><strong>Competent Person</strong> — Key Responsibilities: Advise on H&S matters, assist with compliance, provide specialist guidance</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Competent Person</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Required under Reg 7 MHSWR 1999</li>
            <li>Must have sufficient training and experience</li>
            <li>Advises on compliance with H&S law</li>
            <li>Can be internal or external appointment</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Specifics
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Authorised Person for electrical systems</li>
            <li>Appointed persons for first aid</li>
            <li>Fire wardens for occupied premises</li>
            <li>Permit issuers for high-risk work</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> Responsibility can be delegated, but accountability
            cannot. The most senior person remains ultimately accountable for health and safety.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Arrangements - Practical Implementation</ContentEyebrow>

          <ConceptBlock title="Arrangements - Practical Implementation">
            <p>
            The arrangements section describes how health and safety is actually managed in
            practice. This is the 'how' of safety management and should be specific to your
            organisation's activities and hazards.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Key arrangement areas for building services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Risk assessment:</strong> Process for identifying and controlling hazards
            </li>
            <li>
            <strong>Safe systems of work:</strong> Method statements, procedures, permits
            </li>
            <li>
            <strong>Training:</strong> Induction, ongoing, task-specific, refresher
            </li>
            <li>
            <strong>Consultation:</strong> How workers are involved in safety decisions
            </li>
            <li>
            <strong>Monitoring:</strong> Inspections, audits, health surveillance
            </li>
            <li>
            <strong>Emergency procedures:</strong> Fire, first aid, evacuation, rescue
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Specific Arrangements
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electrical work</strong> — Required Arrangements: Isolation procedures, lock-off systems, testing protocols, live working controls</li>
            <li><strong>Working at height</strong> — Required Arrangements: Access equipment selection, inspection regimes, rescue plans</li>
            <li><strong>Confined spaces</strong> — Required Arrangements: Entry permits, atmospheric testing, standby arrangements, rescue equipment</li>
            <li><strong>Hot work</strong> — Required Arrangements: Permit system, fire watch, isolation of services, PPE requirements</li>
            <li><strong>Asbestos</strong> — Required Arrangements: Survey requirements, licensed removal, awareness training, emergency procedures</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Practical tip:</strong> The arrangements section often references separate
            detailed documents (procedures, method statements, permits). Keep these as controlled
            documents that can be updated without reissuing the entire policy.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Communication and Review</ContentEyebrow>

          <ConceptBlock title="Communication and Review">
            <p>
            Effective communication ensures everyone understands and follows safety arrangements.
            Regular review keeps the policy current and relevant. Both are essential for a 'live'
            safety management system.
            </p>

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Communication Methods
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Induction training:</strong> New starters and site arrivals
            </li>
            <li>
            <strong>Toolbox talks:</strong> Regular brief safety sessions
            </li>
            <li>
            <strong>Safety briefings:</strong> Before high-risk activities
            </li>
            <li>
            <strong>Notice boards:</strong> Policy, procedures, alerts
            </li>
            <li>
            <strong>Safety meetings:</strong> Formal consultation forum
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Triggers for Policy Review
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Annual review:</strong> Minimum requirement
            </li>
            <li>
            <strong>Legislative changes:</strong> New or amended regulations
            </li>
            <li>
            <strong>Organisational changes:</strong> Structure, activities, locations
            </li>
            <li>
            <strong>After incidents:</strong> Accidents, near misses, enforcement
            </li>
            <li>
            <strong>Audit findings:</strong> Internal or external audit results
            </li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Cascade Communication Model
            </p>
            <div className="text-sm text-white space-y-2">
            <p>
            <strong>Level 1:</strong> Directors communicate strategic decisions to managers
            </p>
            <p>
            <strong>Level 2:</strong> Managers brief supervisors on implementation
            requirements
            </p>
            <p>
            <strong>Level 3:</strong> Supervisors deliver toolbox talks to operatives
            </p>
            <p>
            <strong>Level 4:</strong> Operatives provide feedback up the chain
            </p>
            </div>
            

            <p className="text-sm text-white italic">
            <strong>Two-way communication:</strong> Employees must have the opportunity to raise
            concerns and provide feedback. This consultation is a legal requirement under the
            Safety Representatives and Safety Committees Regulations or the Health and Safety
            (Consultation with Employees) Regulations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Practical Application">
            <p><strong>Example 1: Small Electrical Contractor</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> A 12-person electrical contracting company needs to
            develop their safety policy.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Statement of Intent:</strong>
            </p>
            <p className="ml-4">- Signed by the Managing Director</p>
            <p className="ml-4">
            - States commitment to safe electrical work and compliance with BS 7671
            </p>
            <p className="mt-2">
            <strong>Organisation:</strong>
            </p>
            <p className="ml-4">- MD: Ultimate responsibility, resource provision</p>
            <p className="ml-4">- Contracts Manager: Risk assessments, method statements</p>
            <p className="ml-4">- Lead Electricians: Site supervision, toolbox talks</p>
            <p className="ml-4">- All Electricians: Follow safe systems, report hazards</p>
            <p className="mt-2">
            <strong>Arrangements:</strong>
            </p>
            <p className="ml-4">- References separate procedures for isolation, testing, PPE</p>
            <p className="ml-4">- Training matrix showing competencies</p>
            <p className="ml-4">- Accident reporting procedure</p>
            </div>
            

            
            <p><strong>Example 2: Policy Communication on Multi-Contractor Site</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> How to ensure all workers understand safety requirements
            on a large commercial project.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Communication Strategy:</strong>
            </p>
            <p className="ml-4">
            1. Site induction for all personnel - covers key policy points
            </p>
            <p className="ml-4">2. Safety notice boards at entrance and welfare facilities</p>
            <p className="ml-4">
            3. Weekly coordination meetings with all contractor supervisors
            </p>
            <p className="ml-4">4. Daily activity briefings before work commences</p>
            <p className="ml-4">5. Toolbox talks on specific hazards (minimum weekly)</p>
            <p className="ml-4">6. Site rules document issued to all contractors</p>
            <p className="mt-2 text-green-400">
            Key: Two-way communication - feedback mechanism through supervisors to safety
            committee
            </p>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Key Points Summary">
            <div>
            <p><strong>Legal Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Written policy required for 5+ employees (HASAWA s.2(3))</li>
            <li>Must be brought to attention of all employees</li>
            <li>Competent person must be appointed (MHSWR Reg 7)</li>
            <li>Employees must be consulted on H&S matters</li>
            <li>Policy must be reviewed and revised as necessary</li>
            </ul>
            </div>

            <div>
            <p><strong>Effective Policy Characteristics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Specific to the organisation's activities and hazards</li>
            <li>Clear responsibilities assigned to named positions</li>
            <li>Practical arrangements that are actually followed</li>
            <li>Regularly reviewed and updated</li>
            <li>Actively communicated to all personnel</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Generic templates:</strong> Not tailored to actual work activities
            </li>
            <li>
            <strong>Shelf documents:</strong> Not communicated or implemented
            </li>
            <li>
            <strong>Outdated content:</strong> Not reviewed after changes
            </li>
            <li>
            <strong>Unclear responsibilities:</strong> No named accountable persons
            </li>
            <li>
            <strong>Missing arrangements:</strong> Key hazards not addressed
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A 12-person building services contractor without a current policy"
            situation={
              <>
                You join a 12-person building services contractor as an HNC engineer. The
                firm&rsquo;s safety policy is six years old, signed by a director who has
                left, and references regulations that have since been replaced.
              </>
            }
            whatToDo={
              <>
                Flag the breach (HSWA s.2(3) — must be revised &ldquo;as often as may be
                appropriate&rdquo;). Draft a revised three-part policy: statement of intent
                signed by the current MD, organisation chart with named roles and deputies,
                arrangements covering RAMS, training, PPE, isolation, accident reporting,
                consultation. Issue and brief every operative, get a signed receipt. Refresh
                annually and after any structural change.
              </>
            }
            whyItMatters={
              <>
                An out-of-date policy will be one of the first documents an HSE inspector
                requests after an incident — and the absence of a current policy is presumed
                evidence of a wider management failing.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'HSWA s.2(3) requires a written H&S policy for any employer with five or more employees.',
              'Three required parts: statement of intent (signed by senior officer), organisation (named roles), arrangements (procedures).',
              'HSG65 (Plan-Do-Check-Act) is the HSE-recommended framework that links policy to operational practice.',
              'Policy must be brought to the notice of every employee — printed, posted, briefed, signed-for.',
              'Review trigger: change of organisation, change of activity, change of legislation, after any incident, and at least annually.',
              'Roles up the chain: board accountability, director assignment, manager ownership, supervisor delivery, operative compliance.',
              'Worker consultation under HSWA s.2(6) and Safety Reps Regulations 1977 is part of the &ldquo;arrangements&rdquo; section.',
              'A generic, off-the-shelf policy is presumed inadequate — it must reflect the firm&rsquo;s actual activities and structure.',
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
              onClick={() => navigate('../h-n-c-module1-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Safety Culture and Leadership
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section3_1;
