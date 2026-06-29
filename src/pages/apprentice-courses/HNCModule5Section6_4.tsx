/**
 * Module 5 · Section 6 · Subsection 4 — CDM Site Compliance
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Construction Phase Plan, site induction, toolbox talks and CDM 2015 site-level compliance — the principal contractor’s daily duties.
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

const TITLE = 'CDM Site Compliance - HNC Module 5 Section 6.4';
const DESCRIPTION =
  'Master CDM 2015 site compliance for building services: construction phase plan requirements, site inductions, toolbox talks, RAMS process, principal contractor duties and F10 notification procedures.';

const quickCheckQuestions = [
  {
    id: 'cdm-dutyholder',
    question: 'Under CDM 2015, who is responsible for preparing the construction phase plan?',
    options: [
      'The client',
      'The principal designer',
      'The principal contractor',
      'The building services contractor',
    ],
    correctIndex: 2,
    explanation:
      'The principal contractor is responsible for preparing, developing and maintaining the construction phase plan throughout the project. They must ensure it is site-specific and addresses all health and safety risks.',
  },
  {
    id: 'f10-notification',
    question: 'When must a F10 notification be submitted to the HSE?',
    options: [
      'Before construction phase begins',
      'Only for projects over 500 person-days',
      'After the first site induction',
      'Within 7 days of work starting',
    ],
    correctIndex: 0,
    explanation:
      'The F10 notification must be submitted to the HSE before the construction phase begins. This applies to projects lasting more than 30 working days with more than 20 workers, or exceeding 500 person-days.',
  },
  {
    id: 'toolbox-talk',
    question: 'What is the primary purpose of a toolbox talk?',
    options: [
      'To formally assess and record each worker’s competence',
      'To address specific hazards and reinforce safe practices',
      'To replace the need for a full site induction',
      'To record attendance for payroll and timesheet purposes',
    ],
    correctIndex: 1,
    explanation:
      'Toolbox talks are short, focused safety briefings designed to address specific hazards relevant to current work activities and reinforce safe working practices. They supplement but do not replace formal training.',
  },
  {
    id: 'rams-requirement',
    question: 'RAMS must be prepared and communicated before:',
    options: [
      'The project completion date',
      'High-risk activities only',
      'The work activity they relate to',
      'Any work begins on site',
    ],
    correctIndex: 2,
    explanation:
      'Risk Assessments and Method Statements (RAMS) must be prepared and communicated to all workers before the specific work activity they relate to begins. This ensures workers understand the risks and control measures.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which dutyholder role was introduced by CDM 2015 to replace the CDM coordinator?',
    options: [
      'Principal contractor',
      'Principal designer',
      'Client advisor',
      'CDM consultant',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 introduced the principal designer role to replace the CDM coordinator. The principal designer has design-phase health and safety coordination responsibilities.',
  },
  {
    id: 2,
    question: 'The construction phase plan must be in place before:',
    options: [
      'Workers arrive on site',
      'The design is complete',
      'The construction phase begins',
      'The F10 is submitted',
    ],
    correctAnswer: 2,
    explanation:
      'The construction phase plan must be prepared by the principal contractor and be in place before the construction phase begins. Work cannot lawfully start without it.',
  },
  {
    id: 3,
    question: 'What is the minimum content required in a construction phase plan?',
    options: [
      'A priced bill of quantities and the construction programme',
      'The names and qualifications of every operative on site',
      'A copy of each subcontractor’s public liability insurance',
      'Management arrangements, site rules, specific measures for high-risk work',
    ],
    correctAnswer: 3,
    explanation:
      'A construction phase plan must include management arrangements, communication protocols, site rules, and specific measures for controlling high-risk work as defined in Schedule 3 of CDM 2015.',
  },
  {
    id: 4,
    question: 'Site inductions must cover which of the following?',
    options: [
      'Emergency procedures, site rules, hazards and welfare facilities',
      'The commercial terms agreed between client and contractor',
      'The detailed design calculations for the building services',
      'The principal designer’s pre-construction information only',
    ],
    correctAnswer: 0,
    explanation:
      'Site inductions must cover emergency procedures, site-specific rules, known hazards, first aid arrangements, welfare facilities, and reporting procedures. This ensures workers can work safely from day one.',
  },
  {
    id: 5,
    question:
      'How often should toolbox talks typically be delivered on an active construction site?',
    options: [
      'Once at the start of the project during induction',
      'Weekly or as new hazards arise',
      'Only after a reportable incident has occurred',
      'Monthly, aligned with site progress meetings',
    ],
    correctAnswer: 1,
    explanation:
      "Toolbox talks should be delivered regularly, typically weekly, and whenever new hazards arise or work activities change. They keep safety fresh in workers' minds and address evolving site conditions.",
  },
  {
    id: 6,
    question: 'A RAMS document should include:',
    options: [
      'A priced schedule of the materials required for the task',
      'The F10 notification and project dutyholder details',
      'Risk assessment, method statement, and emergency procedures',
      'The site welfare and security arrangements for all trades',
    ],
    correctAnswer: 2,
    explanation:
      'RAMS should include a comprehensive risk assessment identifying hazards and control measures, a detailed method statement describing safe work procedures, and emergency procedures specific to the activity.',
  },
  {
    id: 7,
    question:
      'Who is responsible for ensuring workers receive adequate site-specific training and induction?',
    options: [
      'The client',
      'The principal designer',
      'Individual workers',
      'The principal contractor',
    ],
    correctAnswer: 3,
    explanation:
      'The principal contractor is responsible for ensuring all workers, including subcontractors, receive adequate site-specific training and induction before commencing work on the construction site.',
  },
  {
    id: 8,
    question: 'The F10 notification must be displayed:',
    options: [
      'In a prominent position on site accessible to all workers',
      'Only in the principal contractor’s site office filing system',
      'On the HSE website and nowhere on the physical site',
      'In each worker’s personal induction pack only',
    ],
    correctAnswer: 0,
    explanation:
      'The F10 notification must be displayed in a prominent position on site where it is accessible to all workers. This ensures everyone knows the project is notifiable and who the key dutyholders are.',
  },
  {
    id: 9,
    question: 'Which of the following is NOT a Schedule 3 high-risk activity under CDM 2015?',
    options: [
      'Work where there is a risk of drowning',
      'Standard first fix electrical installation',
      'Work in a confined space',
      'Work near high-voltage power lines',
    ],
    correctAnswer: 1,
    explanation:
      'Standard electrical installation is not specifically listed as a Schedule 3 high-risk activity. However, work at height, with asbestos, in confined spaces, near live services, and excavation work are all Schedule 3 activities requiring specific control measures.',
  },
  {
    id: 10,
    question: 'Building services contractors attending site must:',
    options: [
      'Prepare the overall construction phase plan for the project',
      'Appoint the principal designer for the construction phase',
      'Comply with the construction phase plan and site rules',
      'Submit the F10 notification to the HSE on the client’s behalf',
    ],
    correctAnswer: 2,
    explanation:
      'All contractors, including building services contractors, must comply with the construction phase plan and site rules established by the principal contractor. This ensures coordinated safety management across all trades.',
  },
  {
    id: 11,
    question: 'The principal contractor must consult and engage with workers on matters of:',
    options: [
      'Commercial contract terms',
      'Subcontractor selection',
      'Design decisions',
      'Health, safety and welfare',
    ],
    correctAnswer: 3,
    explanation:
      'Under CDM 2015, the principal contractor must consult and engage with workers on matters of health, safety and welfare. This includes involving workers in risk assessments and safety planning.',
  },
  {
    id: 12,
    question: 'A construction phase plan should be:',
    options: [
      'Site-specific and proportionate to the risks',
      'Prepared by the principal designer',
      'A generic template used on all projects',
      'Finalised only after the construction phase ends',
    ],
    correctAnswer: 0,
    explanation:
      'The construction phase plan must be site-specific and proportionate to the nature and scale of the work and the risks involved. A generic template is not sufficient for CDM compliance.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a principal contractor and a principal designer?',
    answer:
      'The principal contractor manages the construction phase, including site safety, worker coordination, and the construction phase plan. The principal designer manages health and safety during the pre-construction phase, coordinating design to eliminate or reduce risks. On most projects, these are separate organisations with complementary responsibilities.',
  },
  {
    question: "Do I need to complete a site induction if I've worked on the same site before?",
    answer:
      'If you return to a site after a significant absence or if site conditions have changed, you should complete a refresher induction. Many sites require re-induction after 6-12 months absence. Always check with the principal contractor - site rules and hazards may have changed since your last visit.',
  },
  {
    question: 'Can toolbox talks replace formal health and safety training?',
    answer:
      'No. Toolbox talks supplement formal training but cannot replace it. Workers must still hold required qualifications (such as ECS cards) and complete mandatory training (such as asbestos awareness). Toolbox talks reinforce existing knowledge and address site-specific or task-specific hazards.',
  },
  {
    question: 'Who is responsible for RAMS on a building services subcontract?',
    answer:
      'The building services contractor typically prepares RAMS for their specific work activities, but these must be submitted to and approved by the principal contractor before work begins. The RAMS must align with the construction phase plan and consider interfaces with other trades.',
  },
  {
    question: 'What happens if an incident occurs and the construction phase plan is inadequate?',
    answer:
      'An inadequate construction phase plan is a breach of CDM 2015. The principal contractor could face HSE enforcement action including improvement notices, prohibition notices, or prosecution. In serious cases, directors can face personal liability. Insurance claims may also be affected if non-compliance contributed to the incident.',
  },
  {
    question:
      'How detailed does a construction phase plan need to be for a small building services project?',
    answer:
      'The plan should be proportionate to the risks. For a simple installation in an occupied building, a few pages covering site rules, emergency procedures, key hazards, and coordination arrangements may suffice. For complex multi-trade projects, much more detail is required. The HSE provides guidance and templates scaled to project complexity.',
  },
];

const HNCModule5Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 4"
            title="CDM Site Compliance"
            description="Construction phase plan requirements, site inductions, toolbox talks and CDM 2015 compliance procedures."
            tone="purple"
          />

          <TLDR
            points={[
              "CDM 2015 places duties on client, principal designer, principal contractor, designers, contractors and workers — all live during construction.",
              "Construction Phase Plan (CPP): site-specific, updated as work progresses, available on site — Reg 12 obligation on principal contractor.",
              "Site induction mandatory before any operative starts work — covers site rules, hazards, welfare, emergency, contacts.",
              "Toolbox talks weekly minimum: site-specific risks, recent incidents, upcoming high-risk work, safety topics.",
              "F10 notification (HSE) required for projects exceeding 30 days/500 person-days — client duty (often discharged by PD or PC).",
            ]}
          />

          <RegsCallout
            source="CDM 2015 — Regulation 12(1) (Construction phase plan and health and safety file)"
            clause="The principal contractor must draw up a construction phase plan, or make arrangements for a construction phase plan to be drawn up, as soon as is practicable prior to setting up a construction site."
            meaning={
              <>
                The CPP is the principal contractor's primary CDM site deliverable. It must be in place before site set-up — not after, not "in development". HSE inspectors ask for the CPP on first visit; absence is a Reg 12 breach. The CPP is also the operational document referenced by site management daily.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Identify CDM 2015 dutyholders and their responsibilities',
              'Understand construction phase plan content requirements',
              'Deliver effective site inductions for building services work',
              'Plan and conduct toolbox talks for electrical teams',
              'Prepare compliant RAMS for building services activities',
              'Apply F10 notification requirements correctly',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="CDM 2015 Dutyholders and Responsibilities">
            <p>
              The Construction (Design and Management) Regulations 2015 establish a framework of
              dutyholders with specific health and safety responsibilities throughout the project
              lifecycle. Understanding these roles is essential for building services contractors
              working on construction projects.
            </p>
            <p>
              <strong>Key CDM 2015 dutyholders:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Client:</strong> Makes suitable arrangements for managing the project and
                ensures dutyholders are appointed
              </li>
              <li>
                <strong>Principal designer:</strong> Plans, manages and coordinates health and
                safety during pre-construction phase
              </li>
              <li>
                <strong>Principal contractor:</strong> Plans, manages and coordinates health and
                safety during construction phase
              </li>
              <li>
                <strong>Designers:</strong> Eliminate, reduce or control foreseeable risks through
                design decisions
              </li>
              <li>
                <strong>Contractors:</strong> Plan, manage and monitor their own work and workers
              </li>
              <li>
                <strong>Workers:</strong> Cooperate with others and report unsafe conditions
              </li>
            </ul>
            <p>
              <strong>Principal contractor duties (key for site compliance):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prepare construction phase plan:</strong> Document site rules, emergency
                procedures, high-risk work controls
              </li>
              <li>
                <strong>Organise cooperation between contractors:</strong> Coordination meetings,
                shared access arrangements, sequencing
              </li>
              <li>
                <strong>Ensure site induction provided:</strong> All workers inducted before
                starting work
              </li>
              <li>
                <strong>Prevent unauthorised access:</strong> Site security, fencing, sign-in
                procedures
              </li>
              <li>
                <strong>Provide welfare facilities:</strong> Toilets, washing, rest areas, drinking
                water
              </li>
              <li>
                <strong>Consult and engage workers:</strong> Toolbox talks, safety committees,
                feedback mechanisms
              </li>
            </ul>
            <p>
              <strong>F10 notification requirements:</strong> An F10 notification must be submitted
              to the HSE before construction begins when:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Work will last longer than 30 working days AND have more than 20 workers at any one
                time, OR
              </li>
              <li>Work will exceed 500 person-days</li>
              <li>
                The F10 must be displayed prominently on site and contains project details, client
                information, and dutyholder appointments.
              </li>
            </ul>
            <p>
              <strong>Building services context:</strong> As a subcontractor, you are classified as
              a 'contractor' under CDM 2015 and must comply with the principal contractor's site
              rules and construction phase plan.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Construction Phase Plan Requirements">
            <p>
              The construction phase plan is the cornerstone document for site health and safety
              management. It must be prepared by the principal contractor before the construction
              phase begins and developed throughout the project as circumstances change.
            </p>
            <p>
              <strong>Management arrangements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project description and scope</li>
              <li>Management structure and responsibilities</li>
              <li>Communication arrangements</li>
              <li>Monitoring and review procedures</li>
              <li>Training and competence requirements</li>
            </ul>
            <p>
              <strong>Site rules and procedures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site access and security</li>
              <li>Emergency procedures</li>
              <li>First aid arrangements</li>
              <li>Welfare facilities</li>
              <li>PPE requirements</li>
            </ul>
            <p>
              <strong>Schedule 3 high-risk activities — the construction phase plan must include
              specific arrangements for controlling these high-risk activities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Work at height:</strong> Cable tray installation, lighting, ceiling voids
              </li>
              <li>
                <strong>Work with asbestos:</strong> Refurbishment work in older buildings
              </li>
              <li>
                <strong>Confined spaces:</strong> Service ducts, risers, plant rooms
              </li>
              <li>
                <strong>Excavation work:</strong> Underground cable installation
              </li>
              <li>
                <strong>Work near live services:</strong> Alterations to existing electrical systems
              </li>
              <li>
                <strong>Work involving explosives:</strong> Cartridge-operated fixing tools
              </li>
            </ul>
            <p>
              <strong>Construction phase plan review triggers — the plan must be reviewed and
              updated when:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New contractors join the project</li>
              <li>Work activities or sequences change</li>
              <li>Incidents, near-misses or complaints occur</li>
              <li>Design changes affect construction methods</li>
              <li>Site conditions change (e.g., weather, ground conditions)</li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Always request a copy of the construction phase plan
              before starting work on any site. Review it to understand site-specific requirements
              and how your work interfaces with other trades.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Site Inductions and Toolbox Talks">
            <p>
              Site inductions and toolbox talks are essential communication tools that ensure
              workers understand site-specific hazards and safe working procedures. They form a
              critical part of the principal contractor's duty to provide information and training.
            </p>
            <p>
              <strong>Site induction — essential content:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site overview and current activities</li>
              <li>Emergency procedures and muster points</li>
              <li>First aid locations and arrangements</li>
              <li>Site-specific hazards and controls</li>
              <li>Traffic management and pedestrian routes</li>
              <li>PPE requirements</li>
              <li>Welfare facilities location</li>
              <li>Permit-to-work systems</li>
              <li>Reporting procedures (incidents, hazards)</li>
              <li>Working hours and access restrictions</li>
            </ul>
            <p>
              <strong>Toolbox talks — delivery best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Duration:</strong> 5-15 minutes - focused and concise
              </li>
              <li>
                <strong>Frequency:</strong> Weekly minimum, plus when hazards change
              </li>
              <li>
                <strong>Topic selection:</strong> Relevant to current work, recent incidents,
                seasonal risks
              </li>
              <li>
                <strong>Delivery style:</strong> Interactive - ask questions, encourage discussion
              </li>
              <li>
                <strong>Documentation:</strong> Record topic, date, attendees (signatures)
              </li>
            </ul>
            <p>
              <strong>Electrical safety toolbox talk topics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Isolation procedures</li>
              <li>Safe use of test equipment</li>
              <li>Cable damage prevention</li>
              <li>Temporary supplies</li>
            </ul>
            <p>
              <strong>Working at height topics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ladder safety</li>
              <li>MEWP operation</li>
              <li>Scaffold use</li>
              <li>Edge protection</li>
            </ul>
            <p>
              <strong>General site safety topics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Manual handling</li>
              <li>Housekeeping</li>
              <li>Fire prevention</li>
              <li>PPE care and use</li>
            </ul>
            <p>
              <strong>Documentation tip:</strong> Keep attendance records for all toolbox talks.
              These demonstrate due diligence and are valuable evidence if incidents occur. Many
              sites use digital sign-in systems for efficiency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="RAMS Process and Implementation">
            <p>
              Risk Assessments and Method Statements (RAMS) are the foundation of safe working on
              construction sites. They translate general safety requirements into specific,
              actionable control measures for individual work activities.
            </p>
            <p>
              <strong>Risk assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify hazards associated with the activity</li>
              <li>Assess who might be harmed and how</li>
              <li>Evaluate risk level (severity x likelihood)</li>
              <li>Specify control measures (hierarchy of control)</li>
              <li>Document residual risk after controls</li>
            </ul>
            <p>
              <strong>Method statement:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step-by-step work procedure</li>
              <li>Sequence of operations</li>
              <li>Equipment and materials required</li>
              <li>Personnel and competence requirements</li>
              <li>Interface with other trades</li>
            </ul>
            <p>
              <strong>RAMS workflow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Prepare RAMS</li>
              <li>2. Submit to PC</li>
              <li>3. Approval/Review</li>
              <li>4. Brief Workers</li>
              <li>5. Execute Work</li>
            </ul>
            <p>
              <strong>Building services RAMS examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable installation in ceiling void:</strong> Falls, existing services, dust
                — Tower scaffold, service detection, RPE
              </li>
              <li>
                <strong>Distribution board installation:</strong> Electrical contact, manual
                handling — Isolation, team lift, insulated tools
              </li>
              <li>
                <strong>External containment installation:</strong> Work at height, weather, traffic
                — MEWP, hi-vis, traffic management
              </li>
              <li>
                <strong>Testing and commissioning:</strong> Electrical shock, arc flash — Permit to
                work, competent person, PPE
              </li>
              <li>
                <strong>Fire alarm installation:</strong> Work at height, dust activation — Step
                ladders, detector covers, notification
              </li>
            </ul>
            <p>
              <strong>Common RAMS deficiencies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Generic content:</strong> Copy-paste documents that don't reflect actual
                site conditions
              </li>
              <li>
                <strong>Missing signatures:</strong> Workers not briefed or signing before work
              </li>
              <li>
                <strong>No review dates:</strong> Outdated RAMS still in use after conditions change
              </li>
              <li>
                <strong>Inadequate controls:</strong> Relying on PPE when elimination or engineering
                controls are possible
              </li>
              <li>
                <strong>Poor communication:</strong> RAMS not available at the work face
              </li>
            </ul>
            <p>
              <strong>Legal requirement:</strong> RAMS must be task-specific and site-specific.
              Generic documents are not compliant and provide no legal protection if incidents
              occur.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Scenarios">
            <p>
              <strong>Scenario 1 — Arriving at a new site:</strong> You are starting electrical
              first fix on a new-build office block. What CDM compliance steps must you complete?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete site induction delivered by principal contractor</li>
              <li>Review construction phase plan - understand site rules and emergency procedures</li>
              <li>Submit your company RAMS to principal contractor for approval</li>
              <li>Attend any pre-start meetings to coordinate with other trades</li>
              <li>Check F10 notification is displayed (if applicable)</li>
              <li>Brief your team on site-specific requirements</li>
            </ul>
            <p>
              <strong>Scenario 2 — Delivering a toolbox talk:</strong> Your team will be installing
              cable tray at 4m height tomorrow. Prepare a toolbox talk outline.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Topic:</strong> Safe working at height - cable tray installation
              </li>
              <li>
                <strong>Duration:</strong> 10 minutes
              </li>
              <li>
                <strong>Key points:</strong> Tower scaffold erection/inspection, tool lanyards,
                exclusion zone below, emergency descent
              </li>
              <li>
                <strong>Discussion questions:</strong> "What would you do if you noticed damaged
                scaffold boards?"
              </li>
              <li>
                <strong>Record:</strong> Date, topic, attendees with signatures
              </li>
            </ul>
            <p>
              <strong>Scenario 3 — RAMS development:</strong> You need to isolate and modify an
              existing distribution board in an occupied office. Key RAMS considerations?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolation:</strong> Permit to work, lock-off procedures, proving dead
              </li>
              <li>
                <strong>Existing services:</strong> Survey for unknown cables, asbestos check
              </li>
              <li>
                <strong>Occupied building:</strong> Coordination with building management, affected
                areas notification
              </li>
              <li>
                <strong>Sequence:</strong> Step-by-step isolation, modification, re-energisation
              </li>
              <li>
                <strong>Emergency:</strong> First aid, fire procedures, contact numbers
              </li>
              <li>
                <strong>Competence:</strong> Qualified electricians only, specific training
                requirements
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Site compliance checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site induction completed and recorded</li>
              <li>Copy of construction phase plan reviewed</li>
              <li>RAMS submitted and approved by principal contractor</li>
              <li>Workers briefed on RAMS content</li>
              <li>Toolbox talk schedule established</li>
              <li>Emergency procedures understood by all team members</li>
              <li>PPE requirements checked and compliant</li>
              <li>Permit systems understood (if applicable)</li>
            </ul>
            <p>
              <strong>Key CDM 2015 values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                F10 threshold: <strong>30 days + 20 workers OR 500 person-days</strong>
              </li>
              <li>
                Toolbox talk frequency: <strong>Weekly minimum</strong>
              </li>
              <li>
                RAMS submission: <strong>Before activity starts</strong>
              </li>
              <li>
                Construction phase plan: <strong>Before construction phase begins</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common compliance failures"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Starting work before induction</strong> - always complete before any work
                </li>
                <li>
                  <strong>Generic RAMS</strong> - must be site and task specific
                </li>
                <li>
                  <strong>Missing toolbox talk records</strong> - no record means no proof
                </li>
                <li>
                  <strong>Ignoring the construction phase plan</strong> - it's a legal document
                </li>
                <li>
                  <strong>Not reporting near-misses</strong> - valuable prevention data lost
                </li>
              </ul>
            }
            doInstead="Hold induction before any tools come out, write task-specific RAMS aligned to the construction phase plan, capture signed toolbox talk attendance, and treat near-miss reporting as core safety culture."
          />

          <SectionRule />

          <Scenario
            title="Generic CPP fails an HSE inspection"
            situation={
              <>
                An HSE inspector arrives at week 6 of an MEP project. They ask to see the CPP. The PM produces a 40-page document that is the company's template — generic risks, generic procedures, no project-specific content. The inspector identifies the CPP does not address: confined space risk in the basement plant room, the live electrical environment, the asbestos report findings, the working at height plan for the riser. Improvement Notice issued.
              </>
            }
            whatToDo={
              <>
                The CPP must be project-specific. Re-write within 14 days using actual site information: hazards from PCI, structure of the works, specific risk control measures, welfare arrangement, emergency procedures, briefing arrangements. The CPP is reviewed and updated as the project progresses — not a one-shot document. Brief the site team on CPP content; make it the working document, not a shelf document.
              </>
            }
            whyItMatters={
              <>
                The CPP is the project's safety constitution. A generic CPP signals that the principal contractor has not engaged with the actual risks — a finding that exposes the contractor to enforcement, the project to delay, and the operatives to harm. Investment in a real CPP returns in safer, smoother delivery.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "CDM 2015 duties: client, PD, PC, designers, contractors, workers — all live in construction.",
              "CPP: project-specific, updated, available on site — Reg 12 obligation on PC.",
              "Site induction mandatory before any operative starts.",
              "Toolbox talks weekly minimum: site-specific risks, incidents, high-risk work.",
              "F10 notification for projects >30 days/500 person-days — client duty.",
              "CPP referenced daily by site management — not a shelf document.",
              "HSE inspections look for CPP, induction records, toolbox records, welfare on Day 1.",
              "Generic CPP = Reg 12 breach = improvement notice or worse.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Site management and CDM
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Environmental management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section6_4;
