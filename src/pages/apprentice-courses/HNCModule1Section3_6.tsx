/**
 * Module 1 · Section 3 · Subsection 6 — Contractor Management
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Selection, vetting, induction, supervision and review of contractors. Engineer-in-training
 *   perspective: how an HNC engineer applies CDM 2015 + HSWA s.3 to discharge the firm&rsquo;s
 *   duty when work is sub-let.
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

const TITLE = 'Contractor Management - HNC Module 1 Section 3.6';
const DESCRIPTION =
  'Master contractor selection, induction, monitoring, coordination, and principal contractor duties under CDM for building services projects.';

const quickCheckQuestions = [
  {
    id: 'contractor-selection',
    question: 'What must a client assess when selecting contractors under CDM 2015?',
    options: [
      'High fault currents and electromagnetic interference',
      'Skills, knowledge, experience and organisational capability',
      'Competent person scheme registration and assessment',
      'Switching to low or zero-carbon energy sources',
    ],
    correctIndex: 1,
    explanation:
      'Under CDM 2015, clients must take reasonable steps to satisfy themselves that contractors have the skills, knowledge, experience, and (for organisations) the organisational capability to carry out the work safely.',
  },
  {
    id: 'principal-contractor',
    question: 'When must a principal contractor be appointed under CDM 2015?',
    options: [
      'General-purpose indoor cables (not plenum)',
      'Test date, next test date, and tester ID',
      'Construction (Design and Management)',
      'When there is more than one contractor',
    ],
    correctIndex: 3,
    explanation:
      'A principal contractor must be appointed for construction projects where there is, or is likely to be, more than one contractor working on the project at any time.',
  },
  {
    id: 'induction-content',
    question: 'What must contractor site induction include?',
    options: [
      'Site rules, hazards, emergency procedures, and welfare arrangements',
      'Moving desks and computers within a finished office',
      'Appropriate PPE including breathing apparatus if required',
      'Improving mental wellbeing and managing stress, anxiety, and low mood',
    ],
    correctIndex: 0,
    explanation:
      'Inductions must cover site-specific information: rules, known hazards, emergency procedures, first aid, welfare facilities, reporting procedures, and any site-specific requirements.',
  },
  {
    id: 'coordination-duty',
    question: 'Who is responsible for coordinating activities between contractors?',
    options: [
      'Each contractor individually',
      'The principal contractor',
      'The HSE',
      'The client only',
    ],
    correctIndex: 1,
    explanation:
      'The principal contractor has the duty to plan, manage and monitor the construction phase, including coordinating cooperation between contractors to ensure work is carried out safely.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the CDM 2015 client duties regarding contractor competence?',
    options: [
      'The change in capacitance between the probe and the tank wall as the dielectric (liquid) level changes',
      'Take reasonable steps to satisfy themselves that designers and contractors are competent',
      'It continues to run but may overheat, or fails to start if stationary',
      'Higher productivity, fewer reworks, better safety record, stronger team morale and repeat-customer business',
    ],
    correctAnswer: 1,
    explanation:
      'CDM Reg 8 requires clients to take reasonable steps to satisfy themselves that designers and contractors have the skills, knowledge, experience, and (for organisations) organisational capability needed.',
  },
  {
    id: 2,
    question: 'What is the purpose of pre-qualification questionnaires (PQQs)?',
    options: [
      'A formal meeting to review arrangements before work begins',
      'A meeting to coordinate multiple permits and prevent conflicts',
      'To assess contractor competence before inviting them to tender',
      'Address it immediately through escalating action from warning to removal',
    ],
    correctAnswer: 2,
    explanation:
      "PQQs assess contractor competence, capability, and compliance before they're invited to tender. This includes health and safety management, training, experience, and relevant accreditations.",
  },
  {
    id: 3,
    question: 'What information should be in the Construction Phase Plan?',
    options: [
      'Risk assessments, method statements, training records, insurance',
      'Through regular coordination meetings, clear demarcation, and permit systems',
      'Ensure every worker receives suitable site induction',
      'Site rules, emergency procedures, arrangements for managing risks',
    ],
    correctAnswer: 3,
    explanation:
      "The Construction Phase Plan must record arrangements for managing significant risks, site rules, emergency procedures, and how the work will be managed safely. It's developed by the principal contractor.",
  },
  {
    id: 4,
    question: "What is a 'permit to work coordination meeting'?",
    options: [
      'A meeting to coordinate multiple permits and prevent conflicts',
      'Take reasonable steps to ensure the matter is addressed',
      'A formal meeting to review arrangements before work begins',
      'Address it immediately through escalating action from warning to removal',
    ],
    correctAnswer: 0,
    explanation:
      "Coordination meetings ensure multiple activities under permit don't conflict or create combined hazards. For example, hot work shouldn't occur near where gas systems are being purged.",
  },
  {
    id: 5,
    question: 'How should contractor performance be monitored on site?',
    options: [
      'Risk assessments, method statements, training records, insurance',
      'Through regular inspections, observations, and documented checks',
      'To assess contractor competence before inviting them to tender',
      'Take reasonable steps to ensure the matter is addressed',
    ],
    correctAnswer: 1,
    explanation:
      'Ongoing monitoring through site inspections, behavioural observations, documented safety checks, and review of method statements ensures contractors maintain standards throughout the project.',
  },
  {
    id: 6,
    question: 'What should happen if a contractor fails to comply with site safety rules?',
    options: [
      'A meeting to coordinate multiple permits and prevent conflicts',
      'Ensure every worker receives suitable site induction',
      'Address it immediately through escalating action from warning to removal',
      'To assess contractor competence before inviting them to tender',
    ],
    correctAnswer: 2,
    explanation:
      'Non-compliance must be addressed immediately. Escalation typically goes: verbal warning, written warning, stop notice, and ultimately removal from site for serious or repeated breaches.',
  },
  {
    id: 7,
    question: "What is the principal contractor's duty regarding site induction?",
    options: [
      'A formal meeting to review arrangements before work begins',
      'A meeting to coordinate multiple permits and prevent conflicts',
      'Through regular inspections, observations, and documented checks',
      'Ensure every worker receives suitable site induction',
    ],
    correctAnswer: 3,
    explanation:
      'The principal contractor must ensure every site worker receives suitable site induction covering site-specific risks, rules, emergency procedures, and welfare arrangements before starting work.',
  },
  {
    id: 8,
    question: 'What documents should contractors provide before starting work?',
    options: [
      'Risk assessments, method statements, training records, insurance',
      'Take reasonable steps to ensure the matter is addressed',
      'Site rules, emergency procedures, arrangements for managing risks',
      'Through regular inspections, observations, and documented checks',
    ],
    correctAnswer: 0,
    explanation:
      'Before work starts, contractors should provide: relevant risk assessments and method statements (RAMS), evidence of competence (training/qualifications), insurance certificates, and any specific certifications required.',
  },
  {
    id: 9,
    question: "What is 'contractor pre-start' or 'kick-off' meeting?",
    options: [
      'Address it immediately through escalating action from warning to removal',
      'A formal meeting to review arrangements before work begins',
      'Through regular inspections, observations, and documented checks',
      'Ensure every worker receives suitable site induction',
    ],
    correctAnswer: 1,
    explanation:
      'Pre-start meetings formally review all arrangements before work begins: scope, RAMS, interfaces with other contractors, site rules, emergency procedures, communication, and any outstanding issues.',
  },
  {
    id: 10,
    question: 'How should multiple electrical contractors be coordinated on a large project?',
    options: [
      'A meeting to coordinate multiple permits and prevent conflicts',
      'A formal meeting to review arrangements before work begins',
      'Through regular coordination meetings, clear demarcation, and permit systems',
      'Site rules, emergency procedures, arrangements for managing risks',
    ],
    correctAnswer: 2,
    explanation:
      'Coordination requires regular meetings, clear work area demarcation, permit coordination, shared isolation registers, communication protocols, and resolution of interface issues.',
  },
  {
    id: 11,
    question: 'What records should be kept regarding contractor management?',
    options: [
      'A formal meeting to review arrangements before work begins',
      'A meeting to coordinate multiple permits and prevent conflicts',
      'Through regular coordination meetings, clear demarcation, and permit systems',
      'Selection records, inductions, monitoring, non-conformances, meetings',
    ],
    correctAnswer: 3,
    explanation:
      'Maintain records of: competence assessment/selection, induction attendance, monitoring inspections, non-conformance reports, coordination meetings, permit registers, and performance reviews.',
  },
  {
    id: 12,
    question: "What is the client's duty if they become aware of contractor safety failings?",
    options: [
      'Take reasonable steps to ensure the matter is addressed',
      'A formal meeting to review arrangements before work begins',
      'A meeting to coordinate multiple permits and prevent conflicts',
      'Site rules, emergency procedures, arrangements for managing risks',
    ],
    correctAnswer: 0,
    explanation:
      'If a client becomes aware of safety failings, they must take reasonable steps to ensure the matter is addressed. This may include raising it with the principal contractor or contractor directly.',
  },
];

const faqs = [
  {
    question: 'What evidence of competence should we check for electrical contractors?',
    answer:
      'Check: ECS cards showing qualifications (AM2, inspection and testing, design), BS 7671 competence, specific equipment training (e.g., HV, fire alarm), health and safety training (SSSTS/SMSTS/SEATS), NICEIC or similar registration, relevant project experience, and organisational systems (risk assessment, quality control).',
  },
  {
    question: 'Can we rely on contractor accreditations alone?',
    answer:
      "Accreditations (SSIP, ISO, NICEIC) provide useful assurance but shouldn't be the only check. They confirm systems are in place but don't guarantee competence for your specific project. Always review RAMS, check relevant experience, and monitor performance on site.",
  },
  {
    question: 'How detailed should contractor inductions be?',
    answer:
      'Inductions should cover all site-specific information needed to work safely: site rules, known hazards, emergency procedures, first aid, welfare, reporting procedures, permit requirements, and specific restrictions. Duration depends on complexity - typically 30 minutes to 2 hours.',
  },
  {
    question: 'What happens if a subcontractor brings their own sub-subcontractors?',
    answer:
      "This 'chain' must be controlled. Require notification and approval of sub-subcontractors, ensure they meet the same competence standards, and ensure they receive proper induction. The principal contractor remains responsible for coordination regardless of contractual levels.",
  },
  {
    question: 'How do we manage contractor work in occupied premises?',
    answer:
      "Additional coordination is needed: agree work areas and access, communicate with building occupants, consider timing of noisy/disruptive work, maintain fire safety and escape routes, protect occupants from dust/fumes, and ensure contractors don't create hazards for building users.",
  },
  {
    question: 'Should we audit our regular contractors?',
    answer:
      'Yes, periodic audits of regular contractors help maintain standards. This can include site visits, document reviews, and assessment against contract requirements. Audits should be proportionate to risk and value - high-risk/high-value contractors warrant more frequent, detailed audits.',
  },
];

const HNCModule1Section3_6 = () => {
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
            eyebrow="Module 1.3.6"
            title="Contractor Management"
            description="Selecting, managing and coordinating contractors for safe building services projects"
            tone="purple"
          />

          <TLDR
            points={[
              'You will run pre-qualification, selection, induction, monitoring and review on every contractor — not just the principal contractor.',
              'You can apply CDM 2015 Reg 8 (general duties) and Reg 13 (principal contractor) to allocate accountability across multi-contractor projects.',
              'You apply HSWA s.3 (duties to non-employees) — your duty extends to the workforce of every contractor on your site.',
              'You use SSIP-accredited schemes (CHAS, SafeContractor, Achilles) as the start of pre-qualification, not the end.',
            ]}
          />

          <RegsCallout
            source="HASAWA 1974 — Section 3(1)"
            clause="It shall be the duty of every employer to conduct his undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in his employment who may be affected thereby are not exposed to risks to their health or safety."
            meaning={
              <>
                Section 3 captures contractors&rsquo; employees, sub-contractors, visitors and
                the public. As an HNC supervisor running a multi-contractor project the duty
                does not stop at your own headcount.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, s.3(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Apply CDM 2015 requirements for contractor appointment",
              "Implement effective contractor selection and pre-qualification",
              "Develop and deliver contractor induction programmes",
              "Monitor contractor safety performance on site",
              "Coordinate multiple contractors and manage interfaces",
              "Address contractor non-compliance effectively",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Contractor Selection and Competence</ContentEyebrow>

          <ConceptBlock title="Contractor Selection and Competence">
            <p>
            Under CDM 2015, clients must take reasonable steps to satisfy themselves that
            contractors have the skills, knowledge, experience, and organisational capability to
            carry out the work safely. This assessment should be proportionate to the risks
            involved.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Competence assessment elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Experience:</strong> Relevant project history, similar scope and
            complexity
            </li>
            <li>
            <strong>Qualifications:</strong> Trade competence, management training, specific
            certifications
            </li>
            <li>
            <strong>Resources:</strong> Adequate workforce, equipment, supervision capacity
            </li>
            <li>
            <strong>Systems:</strong> Health and safety management, quality control, training
            </li>
            <li>
            <strong>Track record:</strong> Safety performance, references, enforcement history
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Pre-Qualification Assessment Areas
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>H&S Policy</strong> — What to Check: Appropriate to activities, current, signed. Evidence: Copy of policy document</li>
            <li><strong>Training</strong> — What to Check: Trade qualifications, CSCS/ECS cards, safety training. Evidence: Training matrix, card copies</li>
            <li><strong>Experience</strong> — What to Check: Similar projects, specific expertise. Evidence: Project references, testimonials</li>
            <li><strong>Insurance</strong> — What to Check: Employers liability, public liability, professional indemnity. Evidence: Current certificates</li>
            <li><strong>Accreditations</strong> — What to Check: SSIP, ISO 45001, trade body membership. Evidence: Certificates, registration numbers</li>
            <li><strong>Safety record</strong> — What to Check: Accident rates, enforcement action, improvements. Evidence: Statistics, declarations</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Proportionate approach:</strong> Assessment should be proportionate to risk.
            Low-risk routine work needs simpler checks; high-risk specialist work requires more
            detailed assessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>CDM Roles and Principal Contractor Duties</ContentEyebrow>

          <ConceptBlock title="CDM Roles and Principal Contractor Duties">
            <p>
            The Construction (Design and Management) Regulations 2015 establish clear duties for
            all parties involved in construction work. For projects with multiple contractors, a
            principal contractor must be appointed to coordinate the construction phase.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">CDM Duty Holders</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Client</strong> — Key Duties: Make suitable arrangements, ensure adequate time/resources, provide pre-construction information</li>
            <li><strong>Principal Designer</strong> — Key Duties: Plan, manage, coordinate pre-construction phase, prepare health and safety file</li>
            <li><strong>Principal Contractor</strong> — Key Duties: Plan, manage, coordinate construction phase, prepare construction phase plan</li>
            <li><strong>Designers</strong> — Key Duties: Eliminate/reduce risks through design, provide information on remaining risks</li>
            <li><strong>Contractors</strong> — Key Duties: Plan, manage, monitor own work, cooperate with others, provide information</li>
            <li><strong>Workers</strong> — Key Duties: Cooperate with others, report unsafe conditions, follow instructions</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Principal Contractor Duties
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Prepare construction phase plan</li>
            <li>Organise cooperation between contractors</li>
            <li>Coordinate implementation of H&S principles</li>
            <li>Ensure site induction for all workers</li>
            <li>Take reasonable steps to prevent unauthorised access</li>
            <li>Provide welfare facilities</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractor Duties</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Plan, manage and monitor own work safely</li>
            <li>Comply with PC's site rules and directions</li>
            <li>Provide information for construction phase plan</li>
            <li>Inform PC of risks created by their work</li>
            <li>Ensure workers have right skills and training</li>
            <li>Consult and engage with workforce</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Single contractor:</strong> If there's only one contractor on a project, they
            take on the principal contractor duties. The principal designer role may be taken by
            the designer.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Induction and RAMS Review</ContentEyebrow>

          <ConceptBlock title="Induction and RAMS Review">
            <p>
            Every person working on a construction site must receive suitable site-specific
            induction before starting work. Additionally, contractors must provide risk
            assessments and method statements (RAMS) for review before work begins.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Site induction content:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Site rules:</strong> Access, PPE, behaviour, prohibited activities
            </li>
            <li>
            <strong>Known hazards:</strong> Asbestos, services, live systems, fragile areas
            </li>
            <li>
            <strong>Emergency procedures:</strong> Alarms, assembly points, first aid,
            contacts
            </li>
            <li>
            <strong>Welfare:</strong> Toilets, rest areas, drinking water, drying facilities
            </li>
            <li>
            <strong>Reporting:</strong> Accidents, near misses, hazards, toolbox talks
            </li>
            <li>
            <strong>Permits:</strong> When required, how to obtain, procedures
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">RAMS Review Checklist</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Scope</strong> — Questions to Ask: Does it cover all the work to be done? Specific to this site?</li>
            <li><strong>Hazards</strong> — Questions to Ask: All significant hazards identified? Including site-specific ones?</li>
            <li><strong>Controls</strong> — Questions to Ask: Controls proportionate and practical? Hierarchy of control followed?</li>
            <li><strong>Sequence</strong> — Questions to Ask: Logical work sequence? Safe access/egress? Isolation points?</li>
            <li><strong>Resources</strong> — Questions to Ask: Right equipment specified? Training requirements clear?</li>
            <li><strong>Interfaces</strong> — Questions to Ask: Coordination with other trades? Impact on building users?</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Pre-Start Meeting Agenda
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Confirm scope and programme</li>
            <li>Review and accept RAMS</li>
            <li>Identify interfaces with other contractors</li>
            <li>Confirm permit requirements</li>
            <li>Agree communication and reporting procedures</li>
            <li>Resolve any outstanding issues</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Generic RAMS:</strong> Beware of generic documents that haven't been tailored
            to the specific site. Challenge and return documents that don't address actual site
            conditions and hazards.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Monitoring and Coordination</ContentEyebrow>

          <ConceptBlock title="Monitoring and Coordination">
            <p>
            Ongoing monitoring ensures contractors maintain standards throughout the project.
            Effective coordination prevents conflicts between trades and manages interface risks -
            particularly critical in building services where multiple systems interact.
            </p>

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitoring Methods</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Regular site inspections and tours</li>
            <li>Behavioural safety observations</li>
            <li>Review of permits and isolations</li>
            <li>Verification of competence cards on site</li>
            <li>Checking adherence to RAMS</li>
            <li>Toolbox talk attendance</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Coordination Requirements
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Daily activity coordination (busy areas)</li>
            <li>Weekly contractor coordination meetings</li>
            <li>Shared isolation registers</li>
            <li>Permit coordination (no conflicts)</li>
            <li>Interface risk management</li>
            <li>Progress and look-ahead planning</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Escalation of Non-Compliance
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1</strong> — Trigger: Minor non-compliance, first instance. Action: Verbal correction, coaching, record made</li>
            <li><strong>2</strong> — Trigger: Repeat minor or moderate breach. Action: Written warning, meeting with supervisor</li>
            <li><strong>3</strong> — Trigger: Serious breach or continued repeats. Action: Stop notice, formal meeting with management</li>
            <li><strong>4</strong> — Trigger: Gross misconduct or refusal to comply. Action: Removal from site, contract review</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            M&E Coordination Specifics
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Electrical/mechanical interfaces:</strong> Motor connections, control
            wiring, BMS integration
            </li>
            <li>
            <strong>Service clashes:</strong> Containment routes, penetrations, access for
            maintenance
            </li>
            <li>
            <strong>Commissioning sequence:</strong> Power before controls, controls before
            systems
            </li>
            <li>
            <strong>Isolation management:</strong> Shared registers, clear demarcation of
            responsibility
            </li>
            </ul>
            

            <p className="text-sm text-white italic">
            <strong>Record keeping:</strong> Document all monitoring activities, findings, and
            actions taken. These records demonstrate due diligence and provide evidence for
            contractor performance reviews.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Application">
            <p><strong>Example 1: Contractor Pre-Qualification</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> Selecting electrical contractor for major commercial
            installation.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Assessment Criteria:</strong>
            </p>
            <p className="ml-4">1. NICEIC Approved Contractor registration - verified</p>
            <p className="ml-4">2. ISO 45001 certification - current certificate reviewed</p>
            <p className="ml-4">
            3. Similar project references - 3 comparable projects checked
            </p>
            <p className="ml-4">
            4. Training matrix - AM2, design, inspection & testing competence
            </p>
            <p className="ml-4">5. Accident statistics - AFR below industry average</p>
            <p className="ml-4">6. Example RAMS - reviewed for quality and specificity</p>
            <p className="ml-4">7. Insurance - EL £10m, PL £5m, PI £2m confirmed</p>
            <p className="mt-2">
            <strong>Outcome:</strong> Contractor meets criteria - included on approved list
            </p>
            </div>
            

            
            <p><strong>Example 2: Multi-Contractor Coordination</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> Plant room with electrical, mechanical, and controls
            contractors.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Coordination Measures:</strong>
            </p>
            <p className="ml-4">
            - Daily briefing: All supervisors 08:00 - today's activities, interfaces
            </p>
            <p className="ml-4">
            - Shared isolation register: All isolations logged and visible
            </p>
            <p className="ml-4">
            - Permit coordination: Hot work not during refrigerant pipe work
            </p>
            <p className="ml-4">- Work areas: Clear demarcation of each contractor's zone</p>
            <p className="ml-4">- Weekly coordination meeting: Programme, issues, look-ahead</p>
            <p className="ml-4">
            - Commissioning sequence: Agreed and documented - electrical first
            </p>
            <p className="mt-2">
            <strong>Interface Risk:</strong> Controls wiring to be installed before panels
            energised - sequenced in programme
            </p>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Key Points Summary">
            <div>
            <p><strong>Selection Essentials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Assess competence proportionate to risk before appointment</li>
            <li>
            Check experience, qualifications, systems, and track record
            </li>
            <li>Don't rely solely on accreditations - verify capability</li>
            <li>Maintain approved contractor lists with regular review</li>
            <li>Document selection decisions and evidence reviewed</li>
            </ul>
            </div>

            <div>
            <p><strong>Coordination Essentials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Principal contractor coordinates all contractors on site</li>
            <li>
            Regular coordination meetings - daily briefings for busy sites
            </li>
            <li>Shared isolation registers prevent conflicts</li>
            <li>Clear work area demarcation and sequence</li>
            <li>Address interface risks proactively</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Price over safety:</strong> Selecting on cost alone without competence
            check
            </li>
            <li>
            <strong>Generic RAMS:</strong> Accepting documents not specific to the site
            </li>
            <li>
            <strong>Induction gaps:</strong> Workers starting before proper induction
            </li>
            <li>
            <strong>Weak monitoring:</strong> Assuming contractors will self-manage
            </li>
            <li>
            <strong>Poor coordination:</strong> Contractors working in isolation
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Vetting a fire-stopping sub-contractor for a hospital project"
            situation={
              <>
                Your firm needs to sub-let fire-stopping reinstatement on a hospital
                services upgrade. The proposed sub-contractor is the lowest price but holds
                no third-party accreditation and has done no NHS work.
              </>
            }
            whatToDo={
              <>
                Pre-qualify against the project requirements: SSIP membership, third-party
                certification (e.g. ASFP/IFC FIRAS), references on healthcare projects, named
                operatives with current CSCS and competence cards, evidence of insurance.
                Reject if any leg fails. If accepted, induct against the site rules, brief on
                the hospital&rsquo;s infection-control procedures, embed in the daily SSOW
                briefings, sample-audit the work, sign off each penetration on a register.
              </>
            }
            whyItMatters={
              <>
                Inadequate fire-stopping in healthcare can kill. A weak vetting process
                transfers no liability — the principal contractor and HNC supervisor remain
                accountable under HSWA s.3 and CDM 2015.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'HSWA s.3 — your duty to non-employees includes every contractor&rsquo;s workforce on your site.',
              'CDM 2015 Reg 8 (general duties) and Reg 13 (principal contractor) allocate accountability across multi-contractor projects.',
              'Five-stage contractor lifecycle: pre-qualification → selection → induction → monitoring → review.',
              'SSIP schemes (CHAS, SafeContractor, Achilles) are pre-qualification baselines — never the whole picture.',
              'Site induction must cover site-specific rules, emergency procedures, RAMS sign-off and competence verification.',
              'Monitor in proportion to risk — daily for high-risk, weekly for medium, monthly for low.',
              'Post-project review feeds back into pre-qualification — failed contractors do not return without a reset.',
              'Labour-only and self-employed contracts do not transfer duty — the engaging firm remains accountable.',
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
              onClick={() => navigate('../h-n-c-module1-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section3_6;
