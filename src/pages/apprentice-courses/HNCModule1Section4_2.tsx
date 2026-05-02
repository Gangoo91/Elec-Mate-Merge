/**
 * Module 1 · Section 4 · Subsection 2 — Competence and Training
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Establishing, verifying and maintaining workforce competence — knowledge, skill,
 *   experience, attitude. Engineer-in-training perspective: how an HNC supervisor evidences
 *   competence in line with EAWR Reg 16 and MHSWR Reg 13.
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

const TITLE = 'Competence and Training - HNC Module 1 Section 4.2';
const DESCRIPTION =
  'Master competency frameworks, training needs analysis, competence verification methods, JIB/ECS card schemes, and training record requirements for building services engineering.';

const quickCheckQuestions = [
  {
    id: 'competence-definition',
    question: "Under health and safety law, what constitutes 'competence'?",
    options: [
      'Holding any relevant qualification',
      'Having sufficient training, knowledge, experience, and ability to perform tasks safely',
      'Being employed for more than two years',
      'Completing an online safety course',
    ],
    correctIndex: 1,
    explanation:
      'Competence is defined by the Management of Health and Safety at Work Regulations 1999 as having sufficient training and experience or knowledge and other qualities to properly undertake the task. It combines formal qualifications with practical experience and ongoing development.',
  },
  {
    id: 'ecs-card-purpose',
    question: 'What is the primary purpose of the JIB/ECS card scheme in the electrical industry?',
    options: [
      'To provide a discount card for trade suppliers',
      'To verify and evidence competence and qualifications of electrical workers',
      'To allow access to restricted websites',
      'To replace driving licences for company vehicles',
    ],
    correctIndex: 1,
    explanation:
      'The Electrotechnical Certification Scheme (ECS) provides a card-based system that verifies and evidences the competence of individuals working in the electrotechnical sector. It is increasingly required for site access and demonstrates compliance with industry standards.',
  },
  {
    id: 'training-needs-analysis',
    question: 'What is the first step in conducting a Training Needs Analysis (TNA)?',
    options: [
      'Booking training courses',
      'Identifying the gap between current competence and required competence',
      'Setting a training budget',
      'Writing training materials',
    ],
    correctIndex: 1,
    explanation:
      'TNA begins by identifying the gap between what workers can currently do safely and what they need to be able to do. This gap analysis considers job requirements, risk assessments, legal requirements, and individual capabilities to determine where training is needed.',
  },
  {
    id: 'refresher-training',
    question: 'Why is refresher training necessary even for experienced workers?',
    options: [
      'It is not necessary for experienced workers',
      'To meet legal requirements only',
      'To address knowledge decay, update skills for new hazards, and reinforce safe behaviours',
      'To justify training budgets',
    ],
    correctIndex: 2,
    explanation:
      'Refresher training addresses the natural decay of knowledge and skills over time, ensures workers are updated on new hazards, equipment, or regulations, and reinforces safe behaviours. Even experienced workers need periodic updates to maintain competence.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under Regulation 13 of the Management of Health and Safety at Work Regulations 1999, employers must provide health and safety training:',
    options: [
      'Only when employees request it',
      'On recruitment, when exposed to new/increased risks, and as refresher training',
      'Once every five years',
      'Only after an accident has occurred',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 13 requires training on recruitment, when transferred or given new responsibilities, when new equipment, technology, or systems are introduced, and to refresh knowledge. Training must be adapted to take account of new or changed risks.',
  },
  {
    id: 2,
    question: "What does the acronym 'KSA' stand for in competency assessment?",
    options: [
      'Key Safety Actions',
      'Knowledge, Skills, and Attitudes',
      'Known Safety Attributes',
      'Keeping Sites Accessible',
    ],
    correctAnswer: 1,
    explanation:
      'KSA stands for Knowledge (what they understand), Skills (what they can do), and Attitudes (how they approach safety). Effective competence assessment evaluates all three elements, as knowledge without the right attitude may still lead to unsafe behaviour.',
  },
  {
    id: 3,
    question:
      'Which ECS card level is appropriate for a qualified electrician who has completed an approved apprenticeship and holds AM2 certification?',
    options: [
      'Trainee card',
      'Provisional card',
      'Installation Electrician JIB-registered Gold card',
      'Labourer card',
    ],
    correctAnswer: 2,
    explanation:
      'The JIB Gold card for Installation Electrician is issued to those who have completed an approved apprenticeship including the AM2 assessment, demonstrating full competence as a skilled electrician. This is the standard card for qualified installation electricians.',
  },
  {
    id: 4,
    question: 'What is the typical validity period for most ECS cards?',
    options: ['1 year', '3 years', '5 years', '10 years'],
    correctAnswer: 2,
    explanation:
      'Most ECS cards are valid for 5 years, after which the holder must demonstrate continuing competence through relevant work experience, CPD, or additional training to renew. This ensures ongoing competence verification rather than a one-time assessment.',
  },
  {
    id: 5,
    question: 'A competent person under the Electricity at Work Regulations must:',
    options: [
      'Have any electrical qualification',
      'Have technical knowledge and experience to prevent danger and recognise risk',
      'Hold only a university degree in electrical engineering',
      'Be employed by the electricity supplier',
    ],
    correctAnswer: 1,
    explanation:
      "The Electricity at Work Regulations require persons to have 'technical knowledge or experience' to prevent danger. This is task-specific - someone competent for one task may not be competent for another. Both theoretical knowledge and practical experience are considered.",
  },
  {
    id: 6,
    question: 'Which of the following is NOT a valid method for verifying competence?',
    options: [
      'Practical assessment of skills',
      'Review of qualifications and training certificates',
      'Self-declaration without evidence',
      'Observation of work performance',
    ],
    correctAnswer: 2,
    explanation:
      'Self-declaration without supporting evidence is not a valid competence verification method. While self-assessment can be part of the process, it must be supported by objective evidence such as qualifications, observed performance, practical assessments, or verified experience.',
  },
  {
    id: 7,
    question: 'Training records should be retained for:',
    options: [
      "Only during the employee's period of employment",
      'The period of employment plus a reasonable period after (typically 3-6 years)',
      '1 year only',
      'Training records do not need to be kept',
    ],
    correctAnswer: 1,
    explanation:
      'Training records should be retained during employment and for a reasonable period after (often 3-6 years or longer for specific risks). They provide evidence of compliance, support civil claims defence, and may be needed for incident investigations long after the event.',
  },
  {
    id: 8,
    question: 'What is the Kirkpatrick Model used for?',
    options: [
      'Risk assessment',
      'Incident investigation',
      'Evaluating training effectiveness at four levels',
      'Cable sizing calculations',
    ],
    correctAnswer: 2,
    explanation:
      'The Kirkpatrick Model evaluates training effectiveness at four levels: (1) Reaction - did trainees enjoy it? (2) Learning - did they gain knowledge? (3) Behaviour - are they applying it? (4) Results - has it improved safety outcomes? This helps ensure training achieves its objectives.',
  },
  {
    id: 9,
    question:
      'An electrical contractor assigns a worker to install three-phase equipment. The worker holds ECS qualifications but has only worked on single-phase domestic installations. What should the contractor do?',
    options: [
      'Allow the work as the ECS card is valid',
      'Assess competence specifically for three-phase work and provide additional training if needed',
      'Ask the worker if they feel confident',
      'Nothing - qualifications cover all electrical work',
    ],
    correctAnswer: 1,
    explanation:
      'Competence is task-specific, not a general attribute. Holding qualifications for one type of work does not automatically mean competence for different or more complex work. The contractor must assess whether the worker has the specific competence for three-phase work.',
  },
  {
    id: 10,
    question:
      'Under the Construction (Design and Management) Regulations 2015, what duty do principal contractors have regarding competence?',
    options: [
      'No specific duties regarding competence',
      'Only to employ the cheapest contractors',
      'To take reasonable steps to ensure workers have the skills, knowledge, and training for the work',
      'To provide all training themselves',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 requires principal contractors to take reasonable steps to ensure that workers have the necessary skills, knowledge, training, and experience for the work. This includes checking contractor competence and ensuring appropriate supervision is provided.',
  },
];

const faqs = [
  {
    question: 'What is the difference between training and competence?',
    answer:
      'Training is the process of acquiring knowledge and skills through instruction, practice, or experience. Competence is the outcome - the demonstrated ability to apply that knowledge and those skills effectively and safely in the workplace. Training contributes to competence, but competence also requires experience, appropriate attitude, and the ability to apply learning in real situations.',
  },
  {
    question: 'Who is responsible for ensuring worker competence?',
    answer:
      'Employers have the primary legal duty to ensure worker competence under the Management Regulations and HASAWA. However, employees also have duties to apply their training and not undertake work beyond their competence. Principal contractors under CDM have duties to verify the competence of those they engage. Individuals have personal responsibility to maintain and develop their competence.',
  },
  {
    question: 'Can competence be transferred between different types of work?',
    answer:
      'Competence is largely task-specific. While some underlying knowledge transfers (e.g., electrical principles), competence for one type of work does not automatically mean competence for another. A domestic electrician is not necessarily competent for industrial installations without additional training and supervised experience specific to that environment.',
  },
  {
    question: 'What should happen if a worker is found to be incompetent?',
    answer:
      'The worker should immediately be prevented from continuing work that exceeds their competence. The employer should then assess the gap between current competence and requirements, provide appropriate training and supervised practice, verify competence before allowing independent work, and document the process. Incompetence itself is not grounds for dismissal if the employer can provide training.',
  },
  {
    question: 'How often should competence be reassessed?',
    answer:
      'There is no fixed legal interval, but good practice suggests: on introduction of new equipment, systems, or regulations; after incidents suggesting competence gaps; at regular intervals (often aligned with ECS card renewal every 5 years); when taking on new or expanded responsibilities; and following extended absence from work.',
  },
  {
    question: "What is the Health and Safety Executive's view on competence?",
    answer:
      'The HSE emphasises that competence is about capability and reliability to do work safely, not just holding qualifications. They state that no one is competent for all tasks, competence must be matched to the work, and organisations should have systems to verify competence. The HSE provides sector-specific guidance on competence requirements for high-risk activities.',
  },
];

const HNCModule1Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 1.4.2"
            title="Competence and Training"
            description="Establishing, verifying, and maintaining workforce competence in building services engineering"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat competence as the four-leg stool — knowledge, skill, experience, attitude — and reject the assumption that a card alone makes someone competent.',
              'You apply EAWR Reg 16 (technical knowledge or experience) and MHSWR Reg 13 (capabilities and training) on every task allocation.',
              'You differentiate skilled, instructed and ordinary persons (BS 7671 Part 2) and place each operative correctly.',
              'You record evidence — qualifications, in-house assessments, supervised work logs — in a competence matrix.',
            ]}
          />

          <RegsCallout
            source="MHSWR 1999 — Regulation 13(1)"
            clause="Every employer shall, in entrusting tasks to his employees, take into account their capabilities as regards health and safety."
            meaning={
              <>
                Reg 13 is the legal hook for matching task to person. As an HNC supervisor your
                allocation decisions — who installs, who tests, who certifies — must be
                defendable on the basis of recorded competence, not gut feel.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Reg 13(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Define competence and its legal requirements under health and safety law",
              "Conduct a Training Needs Analysis to identify competence gaps",
              "Apply appropriate methods for verifying worker competence",
              "Explain the JIB/ECS card scheme and qualification requirements",
              "Maintain effective training records to demonstrate compliance",
              "Evaluate training effectiveness using recognised frameworks",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Understanding Competence</ContentEyebrow>

          <ConceptBlock title="Understanding Competence">
            <p>
            Competence is central to workplace health and safety. The law requires that work be
            carried out by competent persons, but competence is not simply about holding
            qualifications - it encompasses a combination of training, experience, knowledge, and
            personal qualities.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Legal Definition of Competence
            </p>
            <p className="text-sm text-white italic mb-3">
            "A competent person is someone who has sufficient training and experience or
            knowledge and other qualities that allow them to assist you properly."
            </p>
            <p className="text-xs text-white">
            — Management of Health and Safety at Work Regulations 1999
            </p>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Components of Competence
            </p>
            
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Knowledge</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Understanding of relevant hazards and risks</li>
            <li>Knowledge of legal requirements and standards</li>
            <li>Technical knowledge of systems and equipment</li>
            <li>Awareness of safe working procedures</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Skills</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Practical ability to perform tasks safely</li>
            <li>Use of tools and equipment correctly</li>
            <li>Application of inspection and testing procedures</li>
            <li>Problem-solving and decision-making ability</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Attitude</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Commitment to working safely</li>
            <li>Willingness to follow procedures</li>
            <li>Recognition of limitations</li>
            <li>Willingness to seek help when needed</li>
            </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-elec-yellow mb-2">Experience</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Practical exposure to real work situations</li>
            <li>Supervised practice building confidence</li>
            <li>Exposure to different scenarios and problems</li>
            <li>Learning from mistakes in safe environment</li>
            </ul>
            </div>
            
            

            <CommonMistake
            title="Task-Specific Competence"
            whatHappens={<><p className="text-sm text-white">
            Competence is task-specific, not a general attribute. An electrician competent to
            install domestic wiring may not be competent for industrial three-phase systems,
            high voltage work, or hazardous area installations. Each new type of work requires
            specific assessment and potentially additional training.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> Nobody is competent for all tasks - competence must be
            matched to the specific work being undertaken.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Training Needs Analysis (TNA)</ContentEyebrow>

          <ConceptBlock title="Training Needs Analysis (TNA)">
            <p>
            Training Needs Analysis is a systematic process for identifying the gap between
            current workforce competence and required competence. It ensures training resources
            are targeted where they will have most impact on health and safety performance.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">TNA Process Steps</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Job analysis</strong> — Activity: Identify tasks, hazards, and competence requirements. Output: Job competence profile</li>
            <li><strong>2. Current assessment</strong> — Activity: Evaluate workers' current knowledge, skills, experience. Output: Individual competence profiles</li>
            <li><strong>3. Gap analysis</strong> — Activity: Compare required vs. actual competence. Output: Training needs identified</li>
            <li><strong>4. Prioritisation</strong> — Activity: Rank needs by risk, legal requirement, urgency. Output: Priority training list</li>
            <li><strong>5. Training plan</strong> — Activity: Determine training methods, resources, schedule. Output: Training programme</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Triggers for Training
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>New starters:</strong> Induction and job-specific training
            </li>
            <li>
            <strong>New equipment:</strong> Operating procedures and hazards
            </li>
            <li>
            <strong>Changed regulations:</strong> Updated legal requirements
            </li>
            <li>
            <strong>Incidents:</strong> Lessons learned, corrective training
            </li>
            <li>
            <strong>Role changes:</strong> New responsibilities or tasks
            </li>
            <li>
            <strong>Refresher:</strong> Periodic knowledge update
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Methods</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Classroom:</strong> Theory, regulations, procedures
            </li>
            <li>
            <strong>Practical:</strong> Hands-on skills development
            </li>
            <li>
            <strong>On-the-job:</strong> Supervised work experience
            </li>
            <li>
            <strong>E-learning:</strong> Flexible self-paced modules
            </li>
            <li>
            <strong>Toolbox talks:</strong> Short, focused safety briefings
            </li>
            <li>
            <strong>Simulation:</strong> Practice without real risks
            </li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Legal Training Requirements (Regulation 13)
            </p>
            <p className="text-sm text-white mb-3">
            The Management of Health and Safety at Work Regulations 1999 require training to be
            provided:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>On being recruited into the employer's undertaking</li>
            <li>
            On being exposed to new or increased risks due to transfer, change of
            responsibilities, introduction of new equipment, new technology, or new systems of
            work
            </li>
            <li>Training must be repeated periodically as appropriate</li>
            <li>
            Training must be adapted to take account of new or changed risks
            </li>
            <li>Training must take place during working hours</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Record keeping:</strong> Document training provided, attendees, content
            covered, assessments completed, and trainer details for compliance evidence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>JIB/ECS Card Scheme and Qualification Framework</ContentEyebrow>

          <ConceptBlock title="JIB/ECS Card Scheme and Qualification Framework">
            <p>
            The Electrotechnical Certification Scheme (ECS) is managed by the Joint Industry Board
            (JIB) and provides industry-recognised cards that verify the competence and
            qualifications of electrical workers. The scheme is increasingly required for site
            access across the construction industry.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            ECS Card Types and Grades
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Apprentice</strong> — Colour: Red. Holder Profile: Registered apprentice. Key Requirements: JIB registered apprenticeship</li>
            <li><strong>Trainee</strong> — Colour: Amber. Holder Profile: Training towards qualification. Key Requirements: Enrolled on approved course</li>
            <li><strong>Provisional</strong> — Colour: Amber. Holder Profile: NVQ Level 3 but no AM2. Key Requirements: Working towards AM2</li>
            <li><strong>Installation Electrician</strong> — Colour: Gold. Holder Profile: Qualified installation electrician. Key Requirements: NVQ L3 + AM2 + H&S test</li>
            <li><strong>Approved Electrician</strong> — Colour: Gold. Holder Profile: Experienced installation electrician. Key Requirements: As above + experience + assessment</li>
            <li><strong>Technician</strong> — Colour: Blue. Holder Profile: Technical/supervisory role. Key Requirements: HNC/HND or equivalent + experience</li>
            <li><strong>Experienced Worker</strong> — Colour: Grey. Holder Profile: Significant industry experience. Key Requirements: Employer letter + H&S test</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">AM2 Assessment</p>
            <p className="text-sm text-white mb-3">
            The AM2 (Achievement Measurement 2) is a practical end-point assessment for
            electrical apprentices that tests:
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Safe isolation procedures</li>
            <li>Installation of wiring systems</li>
            <li>Inspection and testing</li>
            <li>Fault diagnosis</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Completion of documentation</li>
            <li>Cable selection and sizing</li>
            <li>Earthing and bonding</li>
            <li>Professional behaviours</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Health and Safety Assessment
            </p>
            <p className="text-sm text-white mb-3">
            All ECS card holders must pass the CSCS Health, Safety and Environment test
            appropriate to their occupation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Tests are occupation-specific (e.g., Electrician test for electricians)
            </li>
            <li>Valid for 2 years at the time of card application</li>
            <li>
            Multiple choice questions covering site safety, hazard awareness, legal
            requirements
            </li>
            <li>Must be passed at approved test centres</li>
            </ul>
            

            <CommonMistake
            title="Card Validity and Renewal"
            whatHappens={<><p className="text-sm text-white">
            Most ECS cards are valid for <strong>5 years</strong>. To renew, cardholders must
            demonstrate continuing competence through relevant work experience and CPD activity.
            Evidence of ongoing training, additional qualifications, and up-to-date health and
            safety awareness is required. The H&S test must also be current at the time of
            renewal.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Site access:</strong> Many construction sites now require valid ECS cards for
            all electrical workers as evidence of competence and safety awareness.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Competence Verification and Training Records</ContentEyebrow>

          <ConceptBlock title="Competence Verification and Training Records">
            <p>
            Verifying competence requires objective evidence that workers have the necessary
            knowledge, skills, and experience for their work. Training records provide essential
            evidence of compliance with legal duties and support defence in any subsequent
            proceedings.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Methods for Verifying Competence
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Qualification check</strong> — What It Verifies: Formal knowledge and training completed. Limitations: Does not verify current skills</li>
            <li><strong>ECS card verification</strong> — What It Verifies: Industry-recognised competence level. Limitations: Task-specific competence still needed</li>
            <li><strong>Practical assessment</strong> — What It Verifies: Ability to perform specific tasks. Limitations: Time-consuming, requires assessor</li>
            <li><strong>Work observation</strong> — What It Verifies: Real-world performance and behaviour. Limitations: May modify behaviour when observed</li>
            <li><strong>Knowledge testing</strong> — What It Verifies: Understanding of procedures and hazards. Limitations: Does not verify practical ability</li>
            <li><strong>Reference/experience check</strong> — What It Verifies: Previous work history and performance. Limitations: Relies on third-party accuracy</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Evaluating Training Effectiveness - Kirkpatrick Model
            </p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Level 1: Reaction</p>
            <p className="text-xs text-white">
            Did trainees find the training engaging and relevant?
            </p>
            <p className="text-xs text-white mt-1">
            Method: Feedback forms, verbal feedback
            </p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Level 2: Learning</p>
            <p className="text-xs text-white">
            Did trainees gain the intended knowledge and skills?
            </p>
            <p className="text-xs text-white mt-1">
            Method: Tests, demonstrations, assessments
            </p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Level 3: Behaviour</p>
            <p className="text-xs text-white">
            Are trainees applying learning in their work?
            </p>
            <p className="text-xs text-white mt-1">
            Method: Observation, supervisor feedback
            </p>
            
            
            <p className="font-bold text-elec-yellow mb-1">Level 4: Results</p>
            <p className="text-xs text-white">Has training improved safety outcomes?</p>
            <p className="text-xs text-white mt-1">
            Method: Incident rates, audit findings
            </p>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Training Record Requirements
            </p>
            <p className="text-sm text-white mb-3">
            Effective training records should capture:
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Employee name and identification</li>
            <li>Training title and content covered</li>
            <li>Date, duration, and location</li>
            <li>Trainer name and qualifications</li>
            </ul>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Assessment results if applicable</li>
            <li>Competence declaration signed</li>
            <li>Certificates or qualifications awarded</li>
            <li>Refresher/renewal dates due</li>
            </ul>
            
            

            <CommonMistake
            title="Record Retention"
            whatHappens={<><p className="text-sm text-white">
            Training records should be retained for the duration of employment plus a reasonable
            period after (typically 3-6 years, longer for exposure to hazardous substances).
            Records may be needed for: incident investigations, civil claims, regulatory
            inspections, demonstrating compliance, and defending legal proceedings - all of
            which may arise years after the training occurred.
            </p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Digital records:</strong> Electronic training management systems can track
            competence, flag renewal dates, and generate compliance reports - but must be backed
            up and accessible.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Building a Competence Management System</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Define roles:</strong> Create competence profiles for each job role
            </li>
            <li>
            <strong>Assess gaps:</strong> Compare individual competence against role
            requirements
            </li>
            <li>
            <strong>Plan training:</strong> Prioritise training based on risk and legal
            requirements
            </li>
            <li>
            <strong>Verify competence:</strong> Use appropriate methods to confirm capability
            </li>
            <li>
            <strong>Document:</strong> Maintain comprehensive training and competence records
            </li>
            <li>
            <strong>Review:</strong> Regularly reassess competence and update training
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Supervision Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Workers developing competence must be supervised by competent persons
            </li>
            <li>
            Level of supervision must match the risk and the trainee's current competence
            </li>
            <li>
            Supervision can reduce as competence increases, documented by assessment
            </li>
            <li>
            Higher-risk tasks require closer supervision regardless of experience
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common Competence Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Assumption of competence:</strong> Relying on job title without
            verification
            </li>
            <li>
            <strong>One-time assessment:</strong> Not reassessing when roles or risks change
            </li>
            <li>
            <strong>Paper compliance:</strong> Records exist but competence not actually
            verified
            </li>
            <li>
            <strong>Generic training:</strong> Not tailored to specific workplace risks
            </li>
            <li>
            <strong>No refresher:</strong> Allowing skills and knowledge to become outdated
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Allocating an EICR to an electrician with a 2391 from 2014"
            situation={
              <>
                You need to allocate an EICR on a commercial premises to an electrician on
                your team. They hold the 2391 inspection &amp; testing qualification from
                2014, but have done little I&amp;T work in the last three years.
              </>
            }
            whatToDo={
              <>
                Treat the 2391 as one input, not the whole picture. Verify currency: BS 7671
                edition (must be A4:2026 trained), recent supervised EICR work, calibration
                and use of test instruments, knowledge of new periodic inspection requirements.
                If gaps exist, schedule a refresher (BS 7671 update + supervised EICR), record
                the development plan in the competence matrix and only release for
                independent EICR work after sign-off.
              </>
            }
            whyItMatters={
              <>
                Letting a card-holder loose on certification work without checking currency
                exposes the firm to negligence claims and the supervisor to an MHSWR Reg 13
                breach. The card is necessary; it is not sufficient.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Competence = knowledge + skill + experience + attitude. A qualification card alone is none of these in full.',
              'EAWR 1989 Reg 16 — no person shall do work needing technical knowledge or experience without it (or with appropriate supervision).',
              'MHSWR 1999 Reg 13 — match task to capability when allocating work.',
              'BS 7671 Part 2 distinguishes skilled, instructed and ordinary persons — each level has different work scope.',
              'Competence matrix: name × task × evidence × verifier × review date — the live record.',
              'Currency matters — BS 7671 amendments (A4:2026), new technologies (EV, PV, BESS) require regular refresh.',
              'Supervised work and signed log books are the route from instructed to skilled person.',
              'Document the assessment — &ldquo;I judged him competent&rdquo; is not enough; show the reasoning.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 4
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Safety Representatives
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section4_2;
