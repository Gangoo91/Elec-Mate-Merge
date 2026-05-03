/**
 * Module 5 · Section 1 · Subsection 1 — Work Breakdown Structure
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   WBS as the scope baseline that drives schedule, cost, procurement and earned value reporting on every building services project.
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

const TITLE = 'Work Breakdown Structure - HNC Module 5 Section 1.1';
const DESCRIPTION =
  'Master Work Breakdown Structure development for building services projects: WBS fundamentals, coding systems, hierarchical decomposition, scope definition, and MEP-specific structures.';

const quickCheckQuestions = [
  {
    id: 'wbs-definition',
    question: 'What is a Work Breakdown Structure (WBS)?',
    options: [
      'A list of project team members',
      'A hierarchical decomposition of project scope into deliverables',
      'A schedule of project milestones',
      'A budget allocation document',
    ],
    correctIndex: 1,
    explanation:
      'A WBS is a hierarchical decomposition of the total scope of work to be carried out by the project team, organised into manageable deliverables and work packages.',
  },
  {
    id: 'wbs-purpose',
    question: 'What is the primary purpose of creating a WBS?',
    options: [
      'To assign staff to tasks',
      'To calculate project costs',
      'To define and organise the total project scope',
      'To create the project schedule',
    ],
    correctIndex: 2,
    explanation:
      'The WBS defines and organises the total project scope. It forms the foundation for planning, scheduling, cost estimation, and resource allocation but its primary purpose is scope definition.',
  },
  {
    id: 'work-package',
    question: 'A work package in a WBS is:',
    options: [
      'The highest level of decomposition',
      'The lowest level of deliverable that can be scheduled and estimated',
      'A summary of all project work',
      'The same as a milestone',
    ],
    correctIndex: 1,
    explanation:
      'A work package is the lowest level of the WBS - the point at which work can be reliably scheduled, cost estimated, monitored, and controlled. It represents a discrete, measurable deliverable.',
  },
  {
    id: 'coding-system',
    question: 'Why do WBS elements require a coding system?',
    options: [
      'For visual appeal',
      'For unique identification, tracking, and integration with cost systems',
      'To comply with health and safety',
      'To satisfy building regulations',
    ],
    correctIndex: 1,
    explanation:
      'WBS coding systems provide unique identification for each element, enabling tracking, cost allocation, progress monitoring, and integration with accounting and project management systems.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which principle states that the WBS should include 100% of the project scope?',
    options: [
      'The decomposition rule',
      'The 100% rule',
      'The completeness principle',
      'The scope baseline',
    ],
    correctAnswer: 1,
    explanation:
      'The 100% rule states that the WBS must include 100% of the work defined by the project scope and capture all deliverables. Each level must equal 100% of the parent level.',
  },
  {
    id: 2,
    question: 'In a building services WBS, what would typically be at Level 2?',
    options: [
      'Individual cable runs',
      'Major systems (Electrical, Mechanical, Controls)',
      'Socket outlet installation',
      'Testing and commissioning activities',
    ],
    correctAnswer: 1,
    explanation:
      'Level 2 typically represents major deliverables or systems. For building services, this would include Electrical Installation, Mechanical Services, BMS/Controls, and Fire Systems as separate Level 2 elements.',
  },
  {
    id: 3,
    question: 'What is the recommended maximum number of decomposition levels in a WBS?',
    options: ['3 levels', '4-6 levels', '8-10 levels', 'No limit'],
    correctAnswer: 1,
    explanation:
      'Best practice suggests 4-6 levels of decomposition. Fewer levels provide insufficient detail for control; more levels create excessive administrative overhead without proportionate benefit.',
  },
  {
    id: 4,
    question: 'A WBS code of 1.3.2.4 indicates:',
    options: [
      'Project 1, Phase 3, System 2, Work Package 4',
      '4 levels of hierarchy with the element in the 4th position at each level',
      '134 work packages in 4 systems',
      'The work package is 25% complete',
    ],
    correctAnswer: 0,
    explanation:
      'WBS codes use hierarchical numbering where each number represents a position at that level. 1.3.2.4 shows the path through 4 levels: Level 1 item 1, Level 2 item 3, Level 3 item 2, Level 4 item 4.',
  },
  {
    id: 5,
    question: 'Which of these is NOT a characteristic of a well-defined work package?',
    options: [
      'It has a single accountable owner',
      'It can be estimated for cost and duration',
      'It overlaps with other work packages to ensure coverage',
      'It produces a measurable deliverable',
    ],
    correctAnswer: 2,
    explanation:
      'Work packages must be mutually exclusive (no overlap) to avoid double-counting scope, cost, or effort. Overlap violates the 100% rule and creates confusion in cost allocation and progress tracking.',
  },
  {
    id: 6,
    question:
      'For an MEP project, what level of detail is typically appropriate for a work package?',
    options: [
      'Install all electrical systems',
      'Install power distribution to Level 3',
      'Install single socket outlet',
      'Electrical work',
    ],
    correctAnswer: 1,
    explanation:
      "Work packages should be sizeable enough to manage (typically 8-80 hours or 1-2 weeks duration) but detailed enough to estimate and control. 'Install power distribution to Level 3' represents an appropriate scope.",
  },
  {
    id: 7,
    question: 'What is a WBS dictionary?',
    options: [
      'A glossary of technical terms',
      'A document describing the content, boundaries, and deliverables of each WBS element',
      'A list of cost codes',
      'A schedule of work',
    ],
    correctAnswer: 1,
    explanation:
      'A WBS dictionary provides detailed descriptions of each WBS element including scope of work, deliverables, acceptance criteria, assumptions, constraints, and responsible parties.',
  },
  {
    id: 8,
    question: 'How should contingency work be handled in a WBS?',
    options: [
      'Hidden within other work packages',
      "Not included as it's not defined scope",
      'Shown as a separate element with clear identification',
      'Added at Level 1 only',
    ],
    correctAnswer: 2,
    explanation:
      'Contingency should be shown as a separate, identifiable element (often called Management Reserve) to maintain transparency and allow proper tracking. Hidden contingency undermines cost control.',
  },
  {
    id: 9,
    question: 'When integrating a WBS with cost codes, the primary benefit is:',
    options: [
      'Creating longer code numbers',
      'Enabling accurate cost collection and analysis by WBS element',
      'Satisfying auditors',
      'Reducing the number of accounts',
    ],
    correctAnswer: 1,
    explanation:
      'Integrating WBS with cost codes enables costs to be collected, tracked, and analysed by deliverable, supporting earned value management, variance analysis, and accurate project reporting.',
  },
  {
    id: 10,
    question:
      "A building services project WBS shows 'Commissioning' as a Level 2 element. This approach is called:",
    options: ['Deliverable-oriented WBS', 'Phase-oriented WBS', 'Organisational WBS', 'Hybrid WBS'],
    correctAnswer: 1,
    explanation:
      'A phase-oriented WBS organises work by project phases (Design, Procurement, Installation, Commissioning). A deliverable-oriented WBS would show systems/outputs. Both are valid approaches.',
  },
  {
    id: 11,
    question: 'What is the relationship between WBS and project schedule?',
    options: [
      'They are identical documents',
      'WBS defines what; schedule defines when',
      'Schedule is created first, then WBS',
      'WBS only covers procurement activities',
    ],
    correctAnswer: 1,
    explanation:
      'The WBS defines the scope (what work is included) while the schedule sequences that work over time (when it occurs). Work packages from the WBS become the basis for schedule activities.',
  },
  {
    id: 12,
    question:
      'For a hospital MEP project, which WBS structure would best support separate subcontractor packages?',
    options: ['Phase-oriented', 'Deliverable/system-oriented', 'Location-oriented', 'Single level'],
    correctAnswer: 1,
    explanation:
      'Deliverable/system-oriented WBS (Electrical, Mechanical, Plumbing, Fire, BMS) aligns with typical subcontractor packages, enabling clear scope definition, separate cost tracking, and accountability per trade.',
  },
];

const faqs = [
  {
    question: "What's the difference between a WBS and a task list?",
    answer:
      "A WBS is a hierarchical decomposition of deliverables and scope, not tasks. It shows WHAT the project will produce, organised in a parent-child structure. A task list shows activities to be performed. The WBS focuses on outcomes (nouns - 'Electrical distribution system') while task lists focus on activities (verbs - 'Install cables'). Work packages from the WBS become the basis for creating task lists.",
  },
  {
    question: 'How detailed should MEP work packages be?',
    answer:
      "Work packages should follow the 8/80 rule: large enough to be meaningful (minimum 8 hours) but small enough to manage (maximum 80 hours or 2 weeks). For building services, typical work packages might be 'LV distribution board installation - Ground floor' or 'AHU-01 ductwork installation'. Too granular (individual cable runs) creates administrative overhead; too broad (all electrical work) prevents effective control.",
  },
  {
    question: 'Should design work be included in a construction WBS?',
    answer:
      'Yes, if design is within the project scope. A design-build MEP project WBS should include design deliverables (drawings, specifications, calculations) as separate elements. For construct-only projects, design may be excluded or shown as a predecessor. The key principle is: if your project team is responsible for it, it belongs in the WBS.',
  },
  {
    question: 'How do I handle variations and changes to the WBS?',
    answer:
      'The WBS is part of the scope baseline and should be controlled through formal change management. When variations occur: (1) Assess impact on WBS structure, (2) Update affected elements with new codes if needed, (3) Revise the WBS dictionary, (4) Rebaseline cost and schedule. Avoid informal additions that undermine baseline integrity.',
  },
  {
    question: 'Can the same WBS element appear in multiple locations?',
    answer:
      'No, each element should appear only once to maintain the 100% rule and prevent double-counting. If work genuinely serves multiple systems (e.g., testing that covers electrical and mechanical), either create a separate integration/commissioning branch, or allocate percentages clearly in the WBS dictionary. Never duplicate elements.',
  },
  {
    question: 'How does the WBS relate to NRM2 cost categories?',
    answer:
      'NRM2 (New Rules of Measurement) provides a standard cost structure for building works. Many organisations map their WBS coding to align with NRM2 categories, enabling industry-standard cost reporting and benchmarking. Level 2/3 WBS elements often correspond to NRM2 work sections, while work packages map to detailed items.',
  },
];

const HNCModule5Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 1"
            title="Work Breakdown Structure"
            description="WBS development, coding systems, hierarchical decomposition, and scope definition for building services projects."
            tone="purple"
          />

          <TLDR
            points={[
              "A WBS is a hierarchical decomposition of 100% of project scope into deliverables (nouns) — not activities, not a schedule.",
              "Stop decomposing at the work-package level (8–80 hours / 1–2 reporting cycles) — finer is admin overhead, coarser is loss of control.",
              "Code every element uniquely so cost, schedule, procurement, drawings and ITPs can all roll up against the same scope spine.",
              "For MEP, organise by deliverable/system (Electrical, Mechanical, BMS, Fire) so subcontract packages, ITPs and O&M sections align cleanly.",
              "Always create explicit interface work packages (BMS↔HVAC, Fire↔Mechanical) — that is where money and programme are lost.",
            ]}
          />

          <RegsCallout
            source="CDM 2015 — Regulation 8(1) (General duties)"
            clause="A designer (including a principal designer) or contractor (including a principal contractor) appointed to work on a project must have the skills, knowledge and experience, and, if they are an organisation, the organisational capability, necessary to fulfil the role that they are appointed to undertake, in a manner that secures the health and safety of any person affected by the project."
            meaning={
              <>
                The WBS is the route by which you demonstrate you have understood the scope and have the capability to deliver it. A weak or incomplete WBS at tender stage exposes both the contractor and the principal designer to a Reg 8 challenge — you cannot show you understood the work, let alone resourced it safely.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Define WBS purpose, principles, and the 100% rule',
              'Apply hierarchical decomposition to building services projects',
              'Develop WBS coding systems for cost and schedule integration',
              'Create work packages with appropriate scope and detail',
              'Structure MEP-specific WBS for electrical, mechanical, and controls',
              'Use WBS dictionaries to define scope boundaries',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="WBS Fundamentals">
            <p>
              The Work Breakdown Structure is the foundation of effective project management. It
              provides a hierarchical decomposition of the total scope of work, organising
              deliverables into manageable components that can be planned, estimated, scheduled, and
              controlled.
            </p>
            <p>
              <strong>Key WBS principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>100% rule:</strong> WBS must include 100% of project scope - no more, no
                less
              </li>
              <li>
                <strong>Deliverable-focused:</strong> Elements represent outcomes (nouns), not
                activities (verbs)
              </li>
              <li>
                <strong>Mutually exclusive:</strong> No overlap between elements at the same level
              </li>
              <li>
                <strong>Hierarchical:</strong> Parent elements summarise all child elements beneath
              </li>
            </ul>
            <p>
              <strong>WBS levels explained:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Level 0:</strong> Project title — Hospital MEP Installation
              </li>
              <li>
                <strong>Level 1:</strong> Major deliverables or phases — Design, Procurement,
                Installation, Commissioning
              </li>
              <li>
                <strong>Level 2:</strong> Systems or sub-deliverables — Electrical, Mechanical,
                Public Health, Fire, BMS
              </li>
              <li>
                <strong>Level 3:</strong> Sub-systems or locations — HV, LV Distribution, Lighting,
                Small Power
              </li>
              <li>
                <strong>Level 4:</strong> Work packages — DB-G01 Installation, Submain to Level 2
              </li>
            </ul>
            <p>
              <strong>Design principle:</strong> The WBS answers "What will we deliver?" - not "What
              will we do?" or "When will we do it?"
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Hierarchical Decomposition">
            <p>
              Decomposition is the process of breaking down project scope into progressively
              smaller, more manageable components. Effective decomposition balances detail against
              administrative overhead.
            </p>
            <p>
              <strong>Top-down approach:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start with major deliverables</li>
              <li>Progressively subdivide</li>
              <li>Stop at manageable level</li>
              <li>Best for new projects</li>
            </ul>
            <p>
              <strong>Bottom-up approach:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>List all deliverables first</li>
              <li>Group into categories</li>
              <li>Build hierarchy upward</li>
              <li>Useful for familiar scope</li>
            </ul>
            <p>
              <strong>Template-based:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use standard MEP templates</li>
              <li>Adapt to project specifics</li>
              <li>Ensures completeness</li>
              <li>Faster development</li>
            </ul>
            <p>
              <strong>Decomposition guidelines:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>8/80 Rule:</strong> Work packages 8-80 hours — distribution board
                installation (40 hrs)
              </li>
              <li>
                <strong>Reporting period:</strong> Complete within 1-2 reporting cycles —
                weekly/fortnightly progress reporting
              </li>
              <li>
                <strong>Measurable:</strong> Clear completion criteria — cables installed, tested,
                labelled
              </li>
              <li>
                <strong>Single owner:</strong> One accountable person/team — electrical
                subcontractor foreman
              </li>
              <li>
                <strong>Independent:</strong> Minimal dependencies on other work — containment can
                proceed while others cable
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Stop decomposing when further breakdown adds
              administrative burden without improving control capability.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Coding Systems and Integration">
            <p>
              Effective WBS coding enables tracking, cost collection, and integration with project
              management systems. A well-designed coding structure supports both reporting
              requirements and operational needs.
            </p>
            <p>
              <strong>WBS code structure example:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Project 1:</strong> Hospital MEP
              </li>
              <li>
                <strong>Phase 1.3:</strong> Installation
              </li>
              <li>
                <strong>System 1.3.1:</strong> Electrical
              </li>
              <li>
                <strong>Subsystem 1.3.1.2:</strong> LV Distribution
              </li>
              <li>
                <strong>Work Package 1.3.1.2.05:</strong> DB-L2-01 Installation
              </li>
            </ul>
            <p>
              <strong>Coding system types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Numeric hierarchical:</strong> 1.2.3.4 - Simple, shows structure clearly
              </li>
              <li>
                <strong>Alphanumeric:</strong> E-LV-DB01 - More readable, less rigid hierarchy
              </li>
              <li>
                <strong>Location-based:</strong> L2-E-001 - Floor, system, sequence
              </li>
              <li>
                <strong>Hybrid:</strong> 1.3.E.LV.05 - Combines approaches
              </li>
            </ul>
            <p>
              <strong>Integration with other systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cost accounts:</strong> Map WBS codes to cost codes — cost tracking by
                deliverable
              </li>
              <li>
                <strong>Schedule (Gantt):</strong> Work packages become activities — scope-schedule
                alignment
              </li>
              <li>
                <strong>Procurement:</strong> Material requirements by WBS — delivery aligned to
                need dates
              </li>
              <li>
                <strong>Document control:</strong> Drawings linked to WBS elements — complete
                document sets per package
              </li>
              <li>
                <strong>Quality/ITP:</strong> Inspection points per work package — QA coverage
                verification
              </li>
            </ul>
            <p>
              <strong>Integration tip:</strong> Design the coding system at project start with all
              stakeholders - changing codes mid-project creates significant rework.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="MEP-Specific WBS Structures">
            <p>
              Building services projects require WBS structures that align with trade packages,
              enable subcontractor management, and support the unique characteristics of MEP
              installation including interfaces between systems.
            </p>
            <p>
              <strong>1.0 Electrical Installation (typical Level 2-3):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.1 HV Installation</li>
              <li>1.2 LV Distribution</li>
              <li>1.3 Lighting Systems</li>
              <li>1.4 Small Power</li>
              <li>1.5 Fire Alarm</li>
              <li>1.6 Emergency Lighting</li>
              <li>1.7 Lightning Protection</li>
              <li>1.8 Earthing &amp; Bonding</li>
            </ul>
            <p>
              <strong>2.0 Mechanical Installation (typical Level 2-3):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2.1 Heating Systems</li>
              <li>2.2 Cooling Systems</li>
              <li>2.3 Ventilation</li>
              <li>2.4 Ductwork</li>
              <li>2.5 Pipework</li>
              <li>2.6 Plant Equipment</li>
              <li>2.7 Insulation</li>
              <li>2.8 Controls Interface</li>
            </ul>
            <p>
              <strong>WBS organisation options:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>By system (E/M/P):</strong> Best for subcontractor packages — may miss
                interface issues
              </li>
              <li>
                <strong>By location/zone:</strong> Best for phased handover — complicates trade
                tracking
              </li>
              <li>
                <strong>By phase:</strong> Best for stage-gate projects — less suited to parallel
                work
              </li>
              <li>
                <strong>Hybrid:</strong> Best for complex projects — requires careful design
              </li>
            </ul>
            <p>
              <strong>Work package example — Electrical Distribution:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>WBS Code:</strong> 1.3.1.2.05
              </li>
              <li>
                <strong>Title:</strong> Level 2 Distribution Board DB-L2-01
              </li>
              <li>
                <strong>Scope:</strong> Supply, install, and commission 400A TP+N distribution
                board including all internal wiring, busbar connections, metering CT installation,
                and labelling.
              </li>
              <li>
                <strong>Deliverables:</strong> Installed and tested distribution board, completed
                test certificates, as-built drawings, O&amp;M documentation section.
              </li>
              <li>
                <strong>Acceptance criteria:</strong> Board energised, all circuits tested per BS
                7671, labels complete, QA sign-off obtained.
              </li>
              <li>
                <strong>Duration:</strong> 3 days (24 hours)
              </li>
              <li>
                <strong>Owner:</strong> Electrical Subcontractor Supervisor
              </li>
            </ul>
            <p>
              <strong>Interface management:</strong> Create explicit work packages for system
              interfaces (e.g., "BMS to HVAC control wiring") to ensure these critical connections
              are not overlooked.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Office Building WBS Development:</strong> Develop Level 2-3 WBS
              for a 5-storey office electrical installation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Level 1: Electrical Installation</li>
              <li>1.1 Main Intake and HV (if applicable)</li>
              <li>1.2 LV Distribution</li>
              <li>1.3 General Lighting</li>
              <li>1.4 Emergency Lighting</li>
              <li>1.5 Small Power</li>
              <li>1.6 Data Infrastructure</li>
              <li>1.7 Fire Alarm System</li>
              <li>1.8 Security Systems</li>
              <li>1.9 External Works</li>
              <li>Level 3 Example (1.2 LV Distribution): 1.2.1 Main LV Switchboard, 1.2.2
                Submains and Risers, 1.2.3 Floor Distribution Boards, 1.2.4 Metering Installation</li>
            </ul>
            <p>
              <strong>Example 2 — Cost Code Integration:</strong> Map WBS codes to company cost
              codes for an MEP project.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.2.1 → E-510-001 — Main switchboard supply &amp; install</li>
              <li>1.2.2 → E-520-001 — Submain cables - labour</li>
              <li>1.2.2 → E-520-002 — Submain cables - materials</li>
              <li>1.2.3 → E-530-001 — Distribution boards - supply</li>
              <li>1.2.3 → E-530-002 — Distribution boards - install</li>
              <li>Multiple cost codes can roll up to a single WBS, enabling cost analysis at
                both detailed and summary levels.</li>
            </ul>
            <p>
              <strong>Example 3 — Applying the 100% Rule:</strong> Verify WBS completeness for
              lighting installation scope (1.3 General Lighting against specification: LED
              luminaires throughout, DALI control system, presence detection, daylight dimming).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.3.1 Luminaire supply and install</li>
              <li>1.3.2 Lighting control wiring</li>
              <li>1.3.3 DALI drivers and addressing</li>
              <li>1.3.4 Sensors and detectors</li>
              <li>1.3.5 Commissioning and scene setting</li>
              <li>
                <strong>Result:</strong> 100% of lighting scope captured.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>WBS development checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review contract scope, specifications, and drawings thoroughly</li>
              <li>Identify all major deliverables and systems</li>
              <li>Decompose to work package level (8-80 hours)</li>
              <li>Apply 100% rule - check nothing is missing or duplicated</li>
              <li>Assign unique codes to all elements</li>
              <li>Create WBS dictionary for key work packages</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Work package duration: <strong>8-80 hours</strong> (1-2 weeks)
              </li>
              <li>
                Typical levels: <strong>4-6 levels</strong> of decomposition
              </li>
              <li>
                100% rule: <strong>All scope</strong> must be captured
              </li>
              <li>
                Each element: <strong>Mutually exclusive</strong> (no overlap)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Confusing WBS with schedule</strong> - WBS shows deliverables, not
                  activities
                </li>
                <li>
                  <strong>Inconsistent decomposition</strong> - Similar items should be at similar
                  levels
                </li>
                <li>
                  <strong>Missing interfaces</strong> - System boundaries need explicit work
                  packages
                </li>
                <li>
                  <strong>Overlapping elements</strong> - Violates 100% rule, causes double-counting
                </li>
              </ul>
            }
            doInstead="Treat the WBS as a deliverable map (nouns), keep similar items at similar levels, create explicit interface packages for boundaries between systems, and audit against the 100% rule before baselining."
          />

          <SectionRule />

          <Scenario
            title="Hospital MEP — discovering missing scope at month four"
            situation={
              <>
                You inherit a £6m hospital MEP package as project manager. The original WBS shows electrical, mechanical and public health at Level 2 but no separate element for BMS-to-HVAC interface wiring. Four months in, the BMS subcontractor refuses to commission until the controls cabling is installed — neither electrical nor mechanical scope owns it.
              </>
            }
            whatToDo={
              <>
                Issue an early warning under the contract. Convene a scope review with the design team, the M&E subcontractors and the BMS specialist. Map the missing scope against the original WBS — is it design intent that was always there (your risk) or a genuine omission from the employer's requirements (a compensation event)? Update the WBS with an explicit interface work package (e.g. 1.4.7 BMS Field Wiring &amp; Termination), allocate it to a responsible party with a cost code, and revise the programme.
              </>
            }
            whyItMatters={
              <>
                Missing interface scope is the single most common cause of MEP programme slip and disputed final accounts. The 100% rule is not academic — it is the audit trail you fall back on when the QS asks "who owns this?" at month eight. Catch it at WBS sign-off, not at commissioning.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "WBS = scope baseline. 100% rule. Mutually exclusive elements. Deliverables not activities.",
              "Decompose to work-package level (8–80 hours) — the 8/80 rule keeps things estimable and controllable.",
              "Code every element uniquely and map to cost codes — earned value is impossible without coded scope.",
              "For MEP projects, deliverable/system organisation aligns to subcontract packages, ITPs and O&M structure.",
              "Interface work packages (BMS↔HVAC, Fire↔Mechanical) must be explicit — that is where scope gaps hide.",
              "WBS dictionary defines boundaries, deliverables and acceptance criteria for each element.",
              "WBS forms the scope baseline — change only via formal change control to keep cost and schedule baselines intact.",
              "CDM Reg 8 capability test — the WBS is how you evidence you understand the scope you have been appointed to deliver.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Project planning and programming
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Programme development
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section1_1;
