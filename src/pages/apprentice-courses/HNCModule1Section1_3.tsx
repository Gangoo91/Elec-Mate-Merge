/**
 * Module 1 · Section 1 · Subsection 3 — CDM Regulations 2015
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The framework that imposes designer, principal designer and principal contractor
 *   duties from concept through handover. Engineer-in-training perspective: how an HNC
 *   electrical/building-services designer signals risks, populates the H&S file and
 *   coordinates with the principal designer.
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

const TITLE = 'CDM Regulations 2015 - HNC Module 1 Section 1.3';
const DESCRIPTION =
  'Master the Construction (Design and Management) Regulations 2015 for building services: duty holders, client duties, Principal Designer and Contractor roles, F10 notifications, and Construction Phase Plans.';

const quickCheckQuestions = [
  {
    id: 'cdm-client-domestic',
    question:
      "Under CDM 2015, when does a domestic client's duties transfer to another duty holder?",
    options: [
      'Only after the local authority has been formally notified',
      'When the client signs a written waiver of their duties',
      'Automatically to the contractor in control of the construction phase',
      'They never transfer; the domestic client keeps all duties',
    ],
    correctIndex: 2,
    explanation:
      'Under Regulation 7, domestic client duties automatically transfer to the contractor in control of the construction phase, or to the Principal Contractor on projects with more than one contractor. This recognises that domestic clients lack construction expertise.',
  },
  {
    id: 'cdm-f10-trigger',
    question: 'An F10 notification to HSE is required when a project exceeds which threshold?',
    options: [
      '10 working days with more than 5 workers at any one time',
      'Any project with a contract value above £100,000',
      '30 working days with more than 20 workers OR 500 person-days',
      '90 working days regardless of the number of workers',
    ],
    correctIndex: 2,
    explanation:
      'F10 notification is required for projects lasting more than 30 working days with more than 20 workers at any one time, OR exceeding 500 person-days of construction work. This applies regardless of project value.',
  },
  {
    id: 'cdm-principal-designer',
    question: 'What is the PRIMARY duty of the Principal Designer under CDM 2015?',
    options: [
      'Planning, managing and coordinating health and safety during the pre-construction phase',
      'Drawing up the Construction Phase Plan before work starts on site',
      'Providing welfare facilities for all workers from the first day',
      'Supervising the construction work and enforcing site rules daily',
    ],
    correctIndex: 0,
    explanation:
      "The Principal Designer's primary duty is planning, managing and coordinating health and safety in the pre-construction phase. They ensure designers comply with their duties and that design risks are eliminated or reduced so far as reasonably practicable.",
  },
  {
    id: 'cdm-cpp-required',
    question:
      'Who is responsible for ensuring a Construction Phase Plan is in place before the construction phase begins?',
    options: [
      'The Client',
      'The Principal Contractor',
      'The Principal Designer',
      'The HSE',
    ],
    correctIndex: 1,
    explanation:
      'The Principal Contractor must draw up a Construction Phase Plan before the construction phase begins. However, the Client must ensure this plan is in place before allowing construction to start - a joint responsibility.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under CDM 2015, which duty holder must make suitable arrangements for managing a project including allocating sufficient time and resources?',
    options: [
      'Principal Designer',
      'Client',
      'Principal Contractor',
      'Designer',
    ],
    correctAnswer: 1,
    explanation:
      'The Client has overarching duties under Regulation 4 to make suitable arrangements for managing the project, including allocating sufficient time and resources. This ensures projects are not rushed and properly resourced for health and safety.',
  },
  {
    id: 2,
    question:
      'A building services contractor is installing a new electrical distribution system in an occupied office building. The project will last 8 weeks with a maximum of 12 workers. Is an F10 notification required?',
    options: [
      'No - building services work is exempt from CDM',
      'Yes - any project over 4 weeks requires notification',
      'No - does not meet the 30 days with 20+ workers threshold',
      'Yes - commercial projects always require notification',
    ],
    correctAnswer: 2,
    explanation:
      'No F10 is required. The project is 8 weeks (40 days) but only has 12 workers maximum, not exceeding 20. The alternative 500 person-days threshold (8×5×12 = 480 person-days) is also not exceeded.',
  },
  {
    id: 3,
    question:
      'Which document must be prepared by the Principal Designer and passed to the Client at project completion?',
    options: [
      'F10 Notification',
      'Construction Phase Plan',
      'Designer Risk Assessment',
      'Health and Safety File',
    ],
    correctAnswer: 3,
    explanation:
      'The Health and Safety File must be prepared by the Principal Designer (or Principal Contractor if no PD) and handed to the Client at project completion. It contains information needed for future construction work on the building.',
  },
  {
    id: 4,
    question:
      'An M&E consultancy is designing HVAC systems for a new hospital. Under CDM 2015, what is their PRIMARY duty as a Designer?',
    options: [
      'Eliminate foreseeable risks or reduce them so far as is reasonably practicable',
      'Draw up and maintain the Construction Phase Plan for the project',
      'Submit the F10 notification to the HSE on behalf of the client',
      'Provide and maintain welfare facilities for the workforce on site',
    ],
    correctAnswer: 0,
    explanation:
      'Designers must eliminate foreseeable health and safety risks or, where not possible, reduce them so far as is reasonably practicable. For HVAC, this includes considering safe access for maintenance, weight of equipment, and installation sequences.',
  },
  {
    id: 5,
    question:
      'The Principal Contractor must ensure which of the following regarding welfare facilities?',
    options: [
      'Facilities are provided only once 20 or more workers are on site',
      'Facilities are available from day one and meet Schedule 2 standards',
      "Facilities remain the Client's sole responsibility throughout",
      'Facilities are required only on projects notifiable to the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'The Principal Contractor must ensure suitable welfare facilities (toilets, washing, rest areas, drinking water) are available from the start of construction and meet the minimum standards set out in Schedule 2 of CDM 2015.',
  },
  {
    id: 6,
    question:
      'A domestic client is having a house rewire. Under CDM 2015, who holds the client duties?',
    options: [
      'The homeowner retains all client duties',
      'The local Building Control authority',
      'The electrical contractor controlling the work',
      'No client duties apply to domestic work',
    ],
    correctAnswer: 2,
    explanation:
      'For domestic clients, client duties automatically transfer to the contractor in control of the construction phase (Regulation 7). The homeowner is not expected to have construction health and safety expertise.',
  },
  {
    id: 7,
    question: 'Which of the following must be included in a Construction Phase Plan?',
    options: [
      'The detailed financial budget and cost plan for the project',
      'The arrangements for managing risks, site rules and emergency procedures',
      'The marketing and tender strategy used to win the contract',
      'The full list of the client’s shareholders and directors',
    ],
    correctAnswer: 1,
    explanation:
      'The Construction Phase Plan must set out the arrangements for managing health and safety risks, the project H&S aims, site rules, emergency procedures, induction and welfare arrangements. It is the key document for managing H&S during construction.',
  },
  {
    id: 8,
    question:
      'Under CDM 2015, at what point must a Principal Designer be appointed on a notifiable project?',
    options: [
      'As soon as practicable and before the construction phase begins',
      'Only once the construction phase is already under way',
      'At practical completion, ready to prepare the Health and Safety File',
      'Within 30 working days of the project first being notified',
    ],
    correctAnswer: 0,
    explanation:
      "The Client must appoint a Principal Designer 'as soon as is practicable, and in any event before the construction phase begins'. Early appointment allows proper influence over design decisions and health and safety planning.",
  },
  {
    id: 9,
    question:
      'A building services designer specifies cable containment at high level requiring work at height for installation and maintenance. What CDM duty does this engage?',
    options: [
      'No duty - contractors choose installation methods',
      'Designer duty to eliminate or reduce foreseeable risks',
      'Principal Contractor duty to plan safe access',
      'Client duty to provide suitable equipment',
    ],
    correctAnswer: 1,
    explanation:
      'The Designer has a duty to consider risks from the design. Specifying high-level containment creates foreseeable work at height risks for installation AND future maintenance. The designer should consider whether lower-level routing is reasonably practicable.',
  },
  {
    id: 10,
    question:
      'Which regulation requires the Principal Contractor to consult and engage with workers on health and safety matters?',
    options: [
      "Regulation 4 - Client's duty to make suitable arrangements",
      "Regulation 9 - Designer's duty to eliminate or reduce risks",
      "Regulation 14 - Principal Contractor's duties to consult",
      "Regulation 7 - transfer of duties on domestic projects",
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 14 specifically requires the Principal Contractor to consult and engage with workers and their representatives on health and safety matters. This includes site inductions, toolbox talks, and ensuring workers can raise concerns.',
  },
  {
    id: 11,
    question: 'The Health and Safety File should contain information about which of the following?',
    options: [
      'The day-to-day labour timesheets recorded during the build',
      'The tender prices submitted by each competing contractor',
      'As-built drawings, hazardous materials and residual risks for future work',
      'The personal contact details of every operative on the project',
    ],
    correctAnswer: 2,
    explanation:
      'The H&S File must contain all information useful for future construction work including as-built drawings, hazardous materials, structural information, and any residual risks. For building services, this includes cable routes, isolation points, and asbestos surveys.',
  },
  {
    id: 12,
    question:
      'A contractor on a multi-contractor site must cooperate with the Principal Contractor by:',
    options: [
      'Working entirely to their own method statements, ignoring site rules',
      'Setting the overall construction programme for the whole site',
      'Appointing the Principal Designer for the project',
      'Following site rules, providing CPP information and complying with directions',
    ],
    correctAnswer: 3,
    explanation:
      'Contractors must cooperate with the Principal Contractor by following site rules, providing information for the CPP, reporting incidents, and complying with reasonable directions. This duty under Regulation 15 enables effective coordination.',
  },
];

const faqs = [
  {
    question: 'Does CDM 2015 apply to all building services work?',
    answer:
      'CDM 2015 applies to all construction work in Great Britain, which includes installation, maintenance, repair, and removal of building services (electrical, mechanical, plumbing). Even small jobs like installing a new distribution board or replacing an AHU are covered. The regulations scale with project complexity - more duty holders and documentation are required for larger, higher-risk projects.',
  },
  {
    question: 'What is the difference between a Designer and Principal Designer?',
    answer:
      'A Designer is anyone who prepares or modifies designs for construction work - including M&E consultants, electrical contractors designing installations, and manufacturers specifying bespoke equipment. The Principal Designer is the organisation appointed by the Client to plan, manage and coordinate health and safety during the pre-construction phase on projects with more than one contractor. The Principal Designer has additional duties around coordination and the Health and Safety File.',
  },
  {
    question: 'When does an electrical contractor become a Principal Contractor?',
    answer:
      'An electrical contractor becomes Principal Contractor when appointed by the Client on a project with more than one contractor to plan, manage and coordinate the construction phase. On single-contractor projects, the contractor automatically has Principal Contractor duties. For domestic clients, the contractor controlling the work assumes client duties automatically under Regulation 7.',
  },
  {
    question: 'What should building services designers include in the Health and Safety File?',
    answer:
      'Building services designers should contribute: as-built drawings showing cable routes, pipework, and equipment locations; isolation and switching arrangements; weight and lifting requirements for heavy equipment (transformers, chillers); access requirements for maintenance; hazardous materials (PCBs in old capacitors, refrigerants); and any residual risks that cannot be designed out (e.g., high-level access for luminaire replacement).',
  },
  {
    question: 'How does CDM 2015 affect design decisions for electrical installations?',
    answer:
      'CDM 2015 requires designers to consider buildability and maintainability. This means designing adequate working space around switchgear, considering safe access for cable installation, specifying lighter alternatives where manual handling is a risk, ensuring isolation points are accessible, and avoiding designs that create confined space entry requirements. The hierarchy is: eliminate, reduce, inform about residual risks.',
  },
  {
    question: 'What happens if CDM duties are breached?',
    answer:
      'Breach of CDM 2015 is a criminal offence. HSE can issue improvement or prohibition notices, and prosecutions can result in unlimited fines and up to 2 years imprisonment. Directors can be personally liable if offences are committed with their consent or connivance. Beyond legal penalties, breaches often indicate systemic failures that increase accident risk.',
  },
];

const HNCModule1Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1.1.3"
            title="CDM Regulations 2015"
            description="The Construction (Design and Management) Regulations - the framework for managing health and safety throughout construction projects"
            tone="purple"
          />

          <TLDR
            points={[
              'You will identify each duty-holder under CDM 2015 (client, principal designer, designer, principal contractor, contractor, worker) on every building services project you support.',
              'You can list the notification trigger (more than 30 working days and >20 workers simultaneously, or more than 500 person days) and complete an F10 mentally before the kick-off meeting.',
              'You apply Regulation 9 (designer&rsquo;s duty to eliminate, reduce or control foreseeable risks) when you produce a circuit-design package, switchroom layout or services-coordination drawing.',
              'You contribute residual-risk information to the pre-construction information pack and to the H&S file at handover.',
            ]}
          />

          <RegsCallout
            source="CDM 2015 — Regulation 9(2)"
            clause="A designer must, when preparing or modifying a design, take into account the general principles of prevention and any pre-construction information to eliminate, so far as is reasonably practicable, foreseeable risks to the health or safety of any person—(a) carrying out or liable to be affected by construction work; (b) maintaining or cleaning a structure; or (c) using a structure designed as a workplace."
            meaning={
              <>
                As a building services designer your duty is not just to make it work — it is to
                make it buildable, maintainable and replaceable safely. Cable routes, switchroom
                ventilation, headroom for testing, access for periodic inspection: each is a
                Regulation 9 decision that you must record on the design risk register.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015, Reg 9(2) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Identify the five duty holder roles and their responsibilities",
              "Understand Client duties and when F10 notification is required",
              "Explain the Principal Designer's role in the pre-construction phase",
              "Describe Principal Contractor duties and the Construction Phase Plan",
              "Apply CDM requirements to building services coordination",
              "Contribute appropriate information to the Health and Safety File",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Duty Holders and Their Responsibilities</ContentEyebrow>

          <ConceptBlock title="Duty Holders and Their Responsibilities">
            <p>
            CDM 2015 replaced the previous 2007 regulations and introduced significant changes
            including the new Principal Designer role. The regulations place duties on five
            categories of duty holder, with responsibilities proportionate to their ability to
            influence project health and safety.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Five Duty Holders</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Client</strong> — Who: Anyone for whom construction work is carried out. Key Duties: Make suitable arrangements, appoint duty holders, provide pre-construction information</li>
            <li><strong>Principal Designer</strong> — Who: Designer appointed by Client (projects with more than one contractor). Key Duties: Plan, manage and coordinate pre-construction phase H&S, prepare H&S File</li>
            <li><strong>Designer</strong> — Who: Anyone who prepares or modifies designs. Key Duties: Eliminate or reduce foreseeable risks, provide information about residual risks</li>
            <li><strong>Principal Contractor</strong> — Who: Contractor appointed by Client (projects with more than one contractor). Key Duties: Plan, manage and coordinate construction phase, prepare CPP, ensure welfare</li>
            <li><strong>Contractor</strong> — Who: Anyone who carries out or manages construction work. Key Duties: Plan and manage own work safely, cooperate with Principal Contractor</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-white mb-2">Key principles of CDM 2015:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Duties are proportionate to the ability to influence project H&S
            </li>
            <li>
            The Client is the most influential - they appoint the team and set the programme
            </li>
            <li>Designers can eliminate risks before they reach site</li>
            <li>Everyone has a duty to cooperate and communicate</li>
            <li>
            Competence requirements removed - focus on skills, knowledge, experience
            </li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> On single-contractor projects, the contractor automatically
            takes on Principal Designer and Principal Contractor duties - no separate appointments
            needed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Client Duties and F10 Notification</ContentEyebrow>

          <ConceptBlock title="Client Duties and F10 Notification">
            <p>
            The Client has overarching duties to ensure projects are set up for success. Even
            commercial clients who lack construction expertise cannot delegate their statutory
            duties - they must make suitable arrangements or appoint competent duty holders to
            assist them.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Core Client Duties (Regulation 4):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Make suitable arrangements for managing the project</li>
            <li>Allocate sufficient time and resources</li>
            <li>
            Appoint Principal Designer and Principal Contractor in writing (multi-contractor
            projects)
            </li>
            <li>
            Provide pre-construction information to designers and contractors
            </li>
            <li>
            Ensure a Construction Phase Plan is in place before construction starts
            </li>
            <li>Ensure welfare facilities are provided from day one</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            F10 Notification Thresholds
            </p>
            <p className="text-sm text-white mb-3">The Client must notify HSE when a project:</p>
            
            <div className="p-3 rounded bg-black/30">
            <p className="font-bold text-elec-yellow mb-1">Duration + Workers</p>
            <p className="text-sm text-white">
            More than 30 working days AND more than 20 workers at any one time
            </p>
            </div>
            <div className="p-3 rounded bg-black/30">
            <p className="font-bold text-elec-yellow mb-1">OR Person-Days</p>
            <p className="text-sm text-white">
            More than 500 person-days of construction work
            </p>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            F10 Notification Contents
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Date of submission and address of construction site</li>
            <li>Client name, address and contact details</li>
            <li>Principal Designer and Principal Contractor details</li>
            <li>
            Date construction phase is planned to start and estimated duration
            </li>
            <li>
            Maximum number of workers and contractors on site at any one time
            </li>
            <li>Name and address of anyone who has already been appointed</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Timing:</strong> F10 must be submitted as soon as practicable before the
            construction phase begins. It can be submitted electronically via the HSE website.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Principal Designer Role</ContentEyebrow>

          <ConceptBlock title="Principal Designer Role">
            <p>
            The Principal Designer replaced the CDM Coordinator role from the 2007 regulations.
            Unlike the coordinator role, the Principal Designer must be a designer themselves -
            they cannot simply coordinate without having design capability and understanding.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Principal Designer Duties (Regulation 11):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Plan, manage and monitor the pre-construction phase</li>
            <li>Identify and eliminate or control foreseeable risks</li>
            <li>
            Ensure designers comply with their duties under Regulation 9
            </li>
            <li>Ensure all designers cooperate and coordinate their work</li>
            <li>Assist the Client with pre-construction information</li>
            <li>Prepare and update the Health and Safety File</li>
            <li>Liaise with the Principal Contractor during construction</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Designer Duties for Building Services (Regulation 9)
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Cable containment routes</strong> — Risk Consideration: Work at height for installation/maintenance. Mitigation Example: Route at lower level where practicable</li>
            <li><strong>Distribution board location</strong> — Risk Consideration: Access for testing, maintenance, isolation. Mitigation Example: Adequate working space, good lighting</li>
            <li><strong>Heavy equipment (transformers)</strong> — Risk Consideration: Manual handling, lifting operations. Mitigation Example: Access for mechanical handling, lifting points</li>
            <li><strong>Service penetrations</strong> — Risk Consideration: Structural integrity, fire stopping. Mitigation Example: Coordinate with structural engineer early</li>
            <li><strong>Roof-mounted equipment</strong> — Risk Consideration: Edge protection, access routes. Mitigation Example: Design permanent access and fall protection</li>
            </ul>
            
            

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 my-6">
            <p className="text-sm text-amber-300">
            <strong>Design Risk Hierarchy:</strong> Designers must apply the hierarchy: (1)
            Eliminate hazards where possible, (2) Reduce risks that cannot be eliminated, (3)
            Provide information about significant residual risks. Simply noting a risk in a risk
            register does not discharge the duty.
            </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
            <strong>Note:</strong> On projects where the Principal Designer's appointment ends
            before construction completion, they must pass the H&S File to the Principal
            Contractor who then maintains and completes it.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Principal Contractor and Construction Phase Plan</ContentEyebrow>

          <ConceptBlock title="Principal Contractor and Construction Phase Plan">
            <p>
            The Principal Contractor manages health and safety during the construction phase. They
            must be a contractor - an organisation or individual who carries out or manages
            construction work. The CPP is the key document that sets out how the construction
            phase will be managed safely.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Principal Contractor Duties (Regulations 12-14):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Plan, manage and monitor the construction phase</li>
            <li>Draw up the Construction Phase Plan before work starts</li>
            <li>Organise cooperation between contractors</li>
            <li>Ensure suitable site inductions are provided</li>
            <li>Take reasonable steps to prevent unauthorised access</li>
            <li>Ensure welfare facilities are in place from day one</li>
            <li>Consult and engage with workers on H&S matters</li>
            <li>Liaise with Principal Designer on design matters</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Construction Phase Plan Contents
            </p>
            
            <div>
            <p className="text-xs text-white mb-2">Required Elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Description of the project</li>
            <li>Management arrangements</li>
            <li>Arrangements for controlling significant risks</li>
            <li>Health and safety aims for the project</li>
            <li>Site rules</li>
            <li>Emergency procedures</li>
            </ul>
            </div>
            <div>
            <p className="text-xs text-white mb-2">Building Services Specifics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Isolation procedures for live systems</li>
            <li>Permit to work systems</li>
            <li>Coordination between M&E trades</li>
            <li>Commissioning sequences</li>
            <li>Interface with occupied areas</li>
            <li>Hot work procedures</li>
            </ul>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Coordination Requirements
            </p>
            <p className="text-sm text-white mb-3">
            M&E installation requires careful coordination due to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Shared routes:</strong> Cable trays, pipework, ductwork competing for
            ceiling void space
            </li>
            <li>
            <strong>Sequencing:</strong> Containment before cables, pipework before insulation
            </li>
            <li>
            <strong>Testing interfaces:</strong> Electrical tests before BMS integration
            </li>
            <li>
            <strong>Fire stopping:</strong> All penetrations must be coordinated and properly
            sealed
            </li>
            <li>
            <strong>Live systems:</strong> Working near or on energised equipment requires
            permits
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Health and Safety File - Building Services Content
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            As-built drawings showing cable routes, containment, equipment locations
            </li>
            <li>Schematic diagrams and circuit charts</li>
            <li>Isolation and switching arrangements</li>
            <li>Equipment O&M manuals and specifications</li>
            <li>
            Hazardous materials (asbestos surveys, refrigerant types, PCBs)
            </li>
            <li>Structural information (lifting points, floor loadings)</li>
            <li>Access requirements for maintenance</li>
            <li>Residual risks not eliminated by design</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Client responsibility:</strong> The Client must keep the H&S File available
            for inspection and ensure it is revised if further construction work takes place. The
            file stays with the building.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p><strong>Example 1: Notification Calculation</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Question:</strong> A new office fit-out will take 12 weeks. The workforce
            will ramp up from 5 workers in weeks 1-2, to 15 workers in weeks 3-8, then 8 workers
            in weeks 9-12. Is F10 notification required?
            </p>
            <div className="bg-black/30 p-3 rounded text-sm font-mono text-white">
            <p>Check threshold 1: More than 30 days with more than 20 workers?</p>
            <p>
            Maximum workers = 15 (does not exceed 20) -{' '}
            <span className="text-red-400">NO</span>
            </p>
            <p className="mt-2">Check threshold 2: More than 500 person-days?</p>
            <p>Weeks 1-2: 2 × 5 × 5 = 50 person-days</p>
            <p>Weeks 3-8: 6 × 5 × 15 = 450 person-days</p>
            <p>Weeks 9-12: 4 × 5 × 8 = 160 person-days</p>
            <p className="mt-2">
            Total = 50 + 450 + 160 = <strong>660 person-days</strong>
            </p>
            <p className="mt-2 text-green-400">✓ Exceeds 500 - F10 NOTIFICATION REQUIRED</p>
            </div>
            

            
            <p><strong>Example 2: Designer Risk Considerations</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> An M&E consultant is designing the electrical
            installation for a warehouse with 10m high ceilings. What CDM considerations apply
            to luminaire specification?
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p className="font-medium mb-2">Design Risks to Consider:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Installation: Work at height, MEWP access, lifting heavy luminaires</li>
            <li>Maintenance: Lamp replacement, cleaning, emergency light testing</li>
            <li>Future alterations: Relamping, upgrade to LED, layout changes</li>
            </ul>
            <p className="font-medium mt-3 mb-2">Designer's Response:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Eliminate:</strong> Specify long-life LED luminaires (25,000+ hours)
            </li>
            <li>
            <strong>Reduce:</strong> Use high-level access with lowering winches for
            maintenance
            </li>
            <li>
            <strong>Inform:</strong> Note in H&S File that MEWP access is required, specify
            clear zones
            </li>
            </ul>
            </div>
            

            
            <p><strong>Example 3: Duty Holder Identification</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> A property management company commissions a rewire of a
            commercial unit. They appoint an electrical contractor who designs and installs the
            new system. Identify the duty holders.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Client:</strong> Property management company
            </p>
            <p className="text-white text-xs ml-4">
            - Has duties even though they appoint only one contractor
            </p>
            <p className="mt-2">
            <strong>Designer:</strong> Electrical contractor (they design the installation)
            </p>
            <p className="text-white text-xs ml-4">
            - Must consider risks in design decisions
            </p>
            <p className="mt-2">
            <strong>Principal Designer:</strong> Electrical contractor (single contractor
            project)
            </p>
            <p className="text-white text-xs ml-4">
            - Duties apply automatically, no separate appointment needed
            </p>
            <p className="mt-2">
            <strong>Principal Contractor:</strong> Electrical contractor (single contractor)
            </p>
            <p className="text-white text-xs ml-4">
            - Must prepare CPP if project is notifiable
            </p>
            <p className="mt-2">
            <strong>Contractor:</strong> Electrical contractor
            </p>
            <p className="text-white text-xs ml-4">- General contractor duties also apply</p>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Key Regulations to Know</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Regulation 4:</strong> Client duties
            </li>
            <li>
            <strong>Regulation 6:</strong> Notification (F10)
            </li>
            <li>
            <strong>Regulation 7:</strong> Domestic clients
            </li>
            <li>
            <strong>Regulation 9:</strong> Designer duties
            </li>
            <li>
            <strong>Regulation 11:</strong> Principal Designer duties
            </li>
            <li>
            <strong>Regulation 12-13:</strong> Principal Contractor duties
            </li>
            <li>
            <strong>Regulation 14:</strong> Worker consultation
            </li>
            <li>
            <strong>Schedule 2:</strong> Welfare facilities minimum standards
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Notification Thresholds Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>More than 30 working days AND more than 20 workers, OR</li>
            <li>More than 500 person-days of construction work</li>
            <li>Notify as soon as practicable before construction starts</li>
            <li>Can be submitted online via HSE website</li>
            <li>
            Display F10 in site office (or where impracticable, keep available)
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common Compliance Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>No written appointment:</strong> PD and PC must be appointed in writing
            </li>
            <li>
            <strong>Late CPP:</strong> Must exist BEFORE construction starts
            </li>
            <li>
            <strong>Generic CPP:</strong> Must be project-specific, not a template
            </li>
            <li>
            <strong>Missing H&S File:</strong> Must be handed to Client at completion
            </li>
            <li>
            <strong>Designer duties ignored:</strong> Designing risks into projects
            </li>
            <li>
            <strong>No pre-construction information:</strong> Client must provide to designers
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A residential refurbishment quietly tips into notifiable territory"
            situation={
              <>
                You are designing the electrical refit of a 14-flat residential block. The
                contractor estimates the project will run 35 working days with 18 trades on site
                most days. The client believes CDM doesn&rsquo;t apply because it is a domestic
                project.
              </>
            }
            whatToDo={
              <>
                Flag two CDM points in writing. First, even on a domestic client project the
                CDM duties are transferred to the contractor (Reg 7) — duties do not disappear,
                they migrate. Second, the project exceeds the 30-working-day notification
                threshold, so the client (or by extension the contractor) must submit an F10 to
                HSE before construction starts and appoint a principal designer and principal
                contractor in writing.
              </>
            }
            whyItMatters={
              <>
                Failure to notify is a strict-liability offence. As an HNC engineer signalling
                the requirement early protects the client from a Prohibition Notice and protects
                you from being drawn into an HSE investigation under Reg 13.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'CDM 2015 applies to every construction project including domestic — duties may transfer to the contractor, but they never disappear.',
              'Notify HSE via F10 when the project will exceed 30 working days with >20 workers simultaneously, or more than 500 person days.',
              'Six duty-holders: client, principal designer, designer, principal contractor, contractor, worker — each has named duties under Regs 4-15.',
              'Regulation 9 makes designers eliminate, reduce or control foreseeable risk — this is your day-to-day duty as a building services HNC designer.',
              'Pre-construction information, construction phase plan and H&S file are the three CDM documents that follow the project from concept to occupation.',
              'Principal designer is appointed in writing for any project with more than one contractor — and coordinates the design risk management.',
              'Worker engagement and consultation under Reg 14 is mandatory — toolbox talks alone do not satisfy this.',
              'Residual risks that cannot be designed out must be communicated to the principal contractor in the pre-construction information.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 1.4
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section1_3;
