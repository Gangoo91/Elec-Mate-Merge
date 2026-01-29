import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Work Breakdown Structure - HNC Module 5 Section 1.1";
const DESCRIPTION = "Master Work Breakdown Structure development for building services projects: WBS fundamentals, coding systems, hierarchical decomposition, scope definition, and MEP-specific structures.";

const quickCheckQuestions = [
  {
    id: "wbs-definition",
    question: "What is a Work Breakdown Structure (WBS)?",
    options: ["A list of project team members", "A hierarchical decomposition of project scope into deliverables", "A schedule of project milestones", "A budget allocation document"],
    correctIndex: 1,
    explanation: "A WBS is a hierarchical decomposition of the total scope of work to be carried out by the project team, organised into manageable deliverables and work packages."
  },
  {
    id: "wbs-purpose",
    question: "What is the primary purpose of creating a WBS?",
    options: ["To assign staff to tasks", "To calculate project costs", "To define and organise the total project scope", "To create the project schedule"],
    correctIndex: 2,
    explanation: "The WBS defines and organises the total project scope. It forms the foundation for planning, scheduling, cost estimation, and resource allocation but its primary purpose is scope definition."
  },
  {
    id: "work-package",
    question: "A work package in a WBS is:",
    options: ["The highest level of decomposition", "The lowest level of deliverable that can be scheduled and estimated", "A summary of all project work", "The same as a milestone"],
    correctIndex: 1,
    explanation: "A work package is the lowest level of the WBS - the point at which work can be reliably scheduled, cost estimated, monitored, and controlled. It represents a discrete, measurable deliverable."
  },
  {
    id: "coding-system",
    question: "Why do WBS elements require a coding system?",
    options: ["For visual appeal", "For unique identification, tracking, and integration with cost systems", "To comply with health and safety", "To satisfy building regulations"],
    correctIndex: 1,
    explanation: "WBS coding systems provide unique identification for each element, enabling tracking, cost allocation, progress monitoring, and integration with accounting and project management systems."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which principle states that the WBS should include 100% of the project scope?",
    options: [
      "The decomposition rule",
      "The 100% rule",
      "The completeness principle",
      "The scope baseline"
    ],
    correctAnswer: 1,
    explanation: "The 100% rule states that the WBS must include 100% of the work defined by the project scope and capture all deliverables. Each level must equal 100% of the parent level."
  },
  {
    id: 2,
    question: "In a building services WBS, what would typically be at Level 2?",
    options: ["Individual cable runs", "Major systems (Electrical, Mechanical, Controls)", "Socket outlet installation", "Testing and commissioning activities"],
    correctAnswer: 1,
    explanation: "Level 2 typically represents major deliverables or systems. For building services, this would include Electrical Installation, Mechanical Services, BMS/Controls, and Fire Systems as separate Level 2 elements."
  },
  {
    id: 3,
    question: "What is the recommended maximum number of decomposition levels in a WBS?",
    options: ["3 levels", "4-6 levels", "8-10 levels", "No limit"],
    correctAnswer: 1,
    explanation: "Best practice suggests 4-6 levels of decomposition. Fewer levels provide insufficient detail for control; more levels create excessive administrative overhead without proportionate benefit."
  },
  {
    id: 4,
    question: "A WBS code of 1.3.2.4 indicates:",
    options: [
      "Project 1, Phase 3, System 2, Work Package 4",
      "4 levels of hierarchy with the element in the 4th position at each level",
      "134 work packages in 4 systems",
      "The work package is 25% complete"
    ],
    correctAnswer: 0,
    explanation: "WBS codes use hierarchical numbering where each number represents a position at that level. 1.3.2.4 shows the path through 4 levels: Level 1 item 1, Level 2 item 3, Level 3 item 2, Level 4 item 4."
  },
  {
    id: 5,
    question: "Which of these is NOT a characteristic of a well-defined work package?",
    options: [
      "It has a single accountable owner",
      "It can be estimated for cost and duration",
      "It overlaps with other work packages to ensure coverage",
      "It produces a measurable deliverable"
    ],
    correctAnswer: 2,
    explanation: "Work packages must be mutually exclusive (no overlap) to avoid double-counting scope, cost, or effort. Overlap violates the 100% rule and creates confusion in cost allocation and progress tracking."
  },
  {
    id: 6,
    question: "For an MEP project, what level of detail is typically appropriate for a work package?",
    options: [
      "Install all electrical systems",
      "Install power distribution to Level 3",
      "Install single socket outlet",
      "Electrical work"
    ],
    correctAnswer: 1,
    explanation: "Work packages should be sizeable enough to manage (typically 8-80 hours or 1-2 weeks duration) but detailed enough to estimate and control. 'Install power distribution to Level 3' represents an appropriate scope."
  },
  {
    id: 7,
    question: "What is a WBS dictionary?",
    options: [
      "A glossary of technical terms",
      "A document describing the content, boundaries, and deliverables of each WBS element",
      "A list of cost codes",
      "A schedule of work"
    ],
    correctAnswer: 1,
    explanation: "A WBS dictionary provides detailed descriptions of each WBS element including scope of work, deliverables, acceptance criteria, assumptions, constraints, and responsible parties."
  },
  {
    id: 8,
    question: "How should contingency work be handled in a WBS?",
    options: [
      "Hidden within other work packages",
      "Not included as it's not defined scope",
      "Shown as a separate element with clear identification",
      "Added at Level 1 only"
    ],
    correctAnswer: 2,
    explanation: "Contingency should be shown as a separate, identifiable element (often called Management Reserve) to maintain transparency and allow proper tracking. Hidden contingency undermines cost control."
  },
  {
    id: 9,
    question: "When integrating a WBS with cost codes, the primary benefit is:",
    options: [
      "Creating longer code numbers",
      "Enabling accurate cost collection and analysis by WBS element",
      "Satisfying auditors",
      "Reducing the number of accounts"
    ],
    correctAnswer: 1,
    explanation: "Integrating WBS with cost codes enables costs to be collected, tracked, and analysed by deliverable, supporting earned value management, variance analysis, and accurate project reporting."
  },
  {
    id: 10,
    question: "A building services project WBS shows 'Commissioning' as a Level 2 element. This approach is called:",
    options: [
      "Deliverable-oriented WBS",
      "Phase-oriented WBS",
      "Organisational WBS",
      "Hybrid WBS"
    ],
    correctAnswer: 1,
    explanation: "A phase-oriented WBS organises work by project phases (Design, Procurement, Installation, Commissioning). A deliverable-oriented WBS would show systems/outputs. Both are valid approaches."
  },
  {
    id: 11,
    question: "What is the relationship between WBS and project schedule?",
    options: [
      "They are identical documents",
      "WBS defines what; schedule defines when",
      "Schedule is created first, then WBS",
      "WBS only covers procurement activities"
    ],
    correctAnswer: 1,
    explanation: "The WBS defines the scope (what work is included) while the schedule sequences that work over time (when it occurs). Work packages from the WBS become the basis for schedule activities."
  },
  {
    id: 12,
    question: "For a hospital MEP project, which WBS structure would best support separate subcontractor packages?",
    options: [
      "Phase-oriented",
      "Deliverable/system-oriented",
      "Location-oriented",
      "Single level"
    ],
    correctAnswer: 1,
    explanation: "Deliverable/system-oriented WBS (Electrical, Mechanical, Plumbing, Fire, BMS) aligns with typical subcontractor packages, enabling clear scope definition, separate cost tracking, and accountability per trade."
  }
];

const faqs = [
  {
    question: "What's the difference between a WBS and a task list?",
    answer: "A WBS is a hierarchical decomposition of deliverables and scope, not tasks. It shows WHAT the project will produce, organised in a parent-child structure. A task list shows activities to be performed. The WBS focuses on outcomes (nouns - 'Electrical distribution system') while task lists focus on activities (verbs - 'Install cables'). Work packages from the WBS become the basis for creating task lists."
  },
  {
    question: "How detailed should MEP work packages be?",
    answer: "Work packages should follow the 8/80 rule: large enough to be meaningful (minimum 8 hours) but small enough to manage (maximum 80 hours or 2 weeks). For building services, typical work packages might be 'LV distribution board installation - Ground floor' or 'AHU-01 ductwork installation'. Too granular (individual cable runs) creates administrative overhead; too broad (all electrical work) prevents effective control."
  },
  {
    question: "Should design work be included in a construction WBS?",
    answer: "Yes, if design is within the project scope. A design-build MEP project WBS should include design deliverables (drawings, specifications, calculations) as separate elements. For construct-only projects, design may be excluded or shown as a predecessor. The key principle is: if your project team is responsible for it, it belongs in the WBS."
  },
  {
    question: "How do I handle variations and changes to the WBS?",
    answer: "The WBS is part of the scope baseline and should be controlled through formal change management. When variations occur: (1) Assess impact on WBS structure, (2) Update affected elements with new codes if needed, (3) Revise the WBS dictionary, (4) Rebaseline cost and schedule. Avoid informal additions that undermine baseline integrity."
  },
  {
    question: "Can the same WBS element appear in multiple locations?",
    answer: "No, each element should appear only once to maintain the 100% rule and prevent double-counting. If work genuinely serves multiple systems (e.g., testing that covers electrical and mechanical), either create a separate integration/commissioning branch, or allocate percentages clearly in the WBS dictionary. Never duplicate elements."
  },
  {
    question: "How does the WBS relate to NRM2 cost categories?",
    answer: "NRM2 (New Rules of Measurement) provides a standard cost structure for building works. Many organisations map their WBS coding to align with NRM2 categories, enabling industry-standard cost reporting and benchmarking. Level 2/3 WBS elements often correspond to NRM2 work sections, while work packages map to detailed items."
  }
];

const HNCModule5Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1">
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
            <span>Module 5.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Work Breakdown Structure
          </h1>
          <p className="text-white/80">
            WBS development, coding systems, hierarchical decomposition, and scope definition for building services projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>WBS:</strong> Hierarchical decomposition of project scope</li>
              <li className="pl-1"><strong>100% rule:</strong> Must capture all project deliverables</li>
              <li className="pl-1"><strong>Work packages:</strong> Lowest level elements for control</li>
              <li className="pl-1"><strong>Coding system:</strong> Unique identification for tracking</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP systems:</strong> Typically Level 2 elements</li>
              <li className="pl-1"><strong>Decomposition:</strong> 4-6 levels typical</li>
              <li className="pl-1"><strong>Work packages:</strong> 8-80 hours duration</li>
              <li className="pl-1"><strong>Integration:</strong> Links to cost codes and schedule</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define WBS purpose, principles, and the 100% rule",
              "Apply hierarchical decomposition to building services projects",
              "Develop WBS coding systems for cost and schedule integration",
              "Create work packages with appropriate scope and detail",
              "Structure MEP-specific WBS for electrical, mechanical, and controls",
              "Use WBS dictionaries to define scope boundaries"
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

        {/* Section 1: WBS Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            WBS Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Work Breakdown Structure is the foundation of effective project management. It provides a
              hierarchical decomposition of the total scope of work, organising deliverables into manageable
              components that can be planned, estimated, scheduled, and controlled.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key WBS principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>100% rule:</strong> WBS must include 100% of project scope - no more, no less</li>
                <li className="pl-1"><strong>Deliverable-focused:</strong> Elements represent outcomes (nouns), not activities (verbs)</li>
                <li className="pl-1"><strong>Mutually exclusive:</strong> No overlap between elements at the same level</li>
                <li className="pl-1"><strong>Hierarchical:</strong> Parent elements summarise all child elements beneath</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">WBS Levels Explained</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 0</td>
                      <td className="border border-white/10 px-3 py-2">Project title</td>
                      <td className="border border-white/10 px-3 py-2">Hospital MEP Installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 1</td>
                      <td className="border border-white/10 px-3 py-2">Major deliverables or phases</td>
                      <td className="border border-white/10 px-3 py-2">Design, Procurement, Installation, Commissioning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 2</td>
                      <td className="border border-white/10 px-3 py-2">Systems or sub-deliverables</td>
                      <td className="border border-white/10 px-3 py-2">Electrical, Mechanical, Public Health, Fire, BMS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 3</td>
                      <td className="border border-white/10 px-3 py-2">Sub-systems or locations</td>
                      <td className="border border-white/10 px-3 py-2">HV, LV Distribution, Lighting, Small Power</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Level 4</td>
                      <td className="border border-white/10 px-3 py-2">Work packages</td>
                      <td className="border border-white/10 px-3 py-2">DB-G01 Installation, Submain to Level 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> The WBS answers "What will we deliver?" - not "What will we do?" or "When will we do it?"
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Hierarchical Decomposition */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Hierarchical Decomposition
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Decomposition is the process of breaking down project scope into progressively smaller,
              more manageable components. Effective decomposition balances detail against administrative
              overhead.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Top-Down Approach</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Start with major deliverables</li>
                  <li className="pl-1">Progressively subdivide</li>
                  <li className="pl-1">Stop at manageable level</li>
                  <li className="pl-1">Best for new projects</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bottom-Up Approach</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">List all deliverables first</li>
                  <li className="pl-1">Group into categories</li>
                  <li className="pl-1">Build hierarchy upward</li>
                  <li className="pl-1">Useful for familiar scope</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Template-Based</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use standard MEP templates</li>
                  <li className="pl-1">Adapt to project specifics</li>
                  <li className="pl-1">Ensures completeness</li>
                  <li className="pl-1">Faster development</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Decomposition Guidelines</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Guideline</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MEP Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8/80 Rule</td>
                      <td className="border border-white/10 px-3 py-2">Work packages 8-80 hours</td>
                      <td className="border border-white/10 px-3 py-2">Distribution board installation (40 hrs)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reporting Period</td>
                      <td className="border border-white/10 px-3 py-2">Complete within 1-2 reporting cycles</td>
                      <td className="border border-white/10 px-3 py-2">Weekly/fortnightly progress reporting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Measurable</td>
                      <td className="border border-white/10 px-3 py-2">Clear completion criteria</td>
                      <td className="border border-white/10 px-3 py-2">Cables installed, tested, labelled</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single Owner</td>
                      <td className="border border-white/10 px-3 py-2">One accountable person/team</td>
                      <td className="border border-white/10 px-3 py-2">Electrical subcontractor foreman</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Independent</td>
                      <td className="border border-white/10 px-3 py-2">Minimal dependencies on other work</td>
                      <td className="border border-white/10 px-3 py-2">Containment can proceed while others cable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Stop decomposing when further breakdown adds administrative burden without improving control capability.
            </p>
          </div>
        </section>

        {/* Section 3: Coding Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Coding Systems and Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective WBS coding enables tracking, cost collection, and integration with project
              management systems. A well-designed coding structure supports both reporting requirements
              and operational needs.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">WBS Code Structure Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Project:</span> <span className="text-white">1</span> = Hospital MEP</p>
                <p><span className="text-white/60">Phase:</span> <span className="text-white">1.3</span> = Installation</p>
                <p><span className="text-white/60">System:</span> <span className="text-white">1.3.1</span> = Electrical</p>
                <p><span className="text-white/60">Subsystem:</span> <span className="text-white">1.3.1.2</span> = LV Distribution</p>
                <p><span className="text-white/60">Work Package:</span> <span className="text-white">1.3.1.2.05</span> = DB-L2-01 Installation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coding System Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Numeric hierarchical:</strong> 1.2.3.4 - Simple, shows structure clearly</li>
                <li className="pl-1"><strong>Alphanumeric:</strong> E-LV-DB01 - More readable, less rigid hierarchy</li>
                <li className="pl-1"><strong>Location-based:</strong> L2-E-001 - Floor, system, sequence</li>
                <li className="pl-1"><strong>Hybrid:</strong> 1.3.E.LV.05 - Combines approaches</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration with Other Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Integration Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost accounts</td>
                      <td className="border border-white/10 px-3 py-2">Map WBS codes to cost codes</td>
                      <td className="border border-white/10 px-3 py-2">Cost tracking by deliverable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule (Gantt)</td>
                      <td className="border border-white/10 px-3 py-2">Work packages become activities</td>
                      <td className="border border-white/10 px-3 py-2">Scope-schedule alignment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Procurement</td>
                      <td className="border border-white/10 px-3 py-2">Material requirements by WBS</td>
                      <td className="border border-white/10 px-3 py-2">Delivery aligned to need dates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Document control</td>
                      <td className="border border-white/10 px-3 py-2">Drawings linked to WBS elements</td>
                      <td className="border border-white/10 px-3 py-2">Complete document sets per package</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quality/ITP</td>
                      <td className="border border-white/10 px-3 py-2">Inspection points per work package</td>
                      <td className="border border-white/10 px-3 py-2">QA coverage verification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Design the coding system at project start with all stakeholders - changing codes mid-project creates significant rework.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: MEP-Specific WBS Structures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MEP-Specific WBS Structures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services projects require WBS structures that align with trade packages,
              enable subcontractor management, and support the unique characteristics of MEP
              installation including interfaces between systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical MEP WBS Structure (Level 2-3)</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">1.0 Electrical Installation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>1.1 HV Installation</li>
                    <li>1.2 LV Distribution</li>
                    <li>1.3 Lighting Systems</li>
                    <li>1.4 Small Power</li>
                    <li>1.5 Fire Alarm</li>
                    <li>1.6 Emergency Lighting</li>
                    <li>1.7 Lightning Protection</li>
                    <li>1.8 Earthing & Bonding</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">2.0 Mechanical Installation</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>2.1 Heating Systems</li>
                    <li>2.2 Cooling Systems</li>
                    <li>2.3 Ventilation</li>
                    <li>2.4 Ductwork</li>
                    <li>2.5 Pipework</li>
                    <li>2.6 Plant Equipment</li>
                    <li>2.7 Insulation</li>
                    <li>2.8 Controls Interface</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">WBS Organisation Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Organisation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">By system (E/M/P)</td>
                      <td className="border border-white/10 px-3 py-2">Subcontractor packages</td>
                      <td className="border border-white/10 px-3 py-2">May miss interface issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">By location/zone</td>
                      <td className="border border-white/10 px-3 py-2">Phased handover</td>
                      <td className="border border-white/10 px-3 py-2">Complicates trade tracking</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">By phase</td>
                      <td className="border border-white/10 px-3 py-2">Stage-gate projects</td>
                      <td className="border border-white/10 px-3 py-2">Less suited to parallel work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hybrid</td>
                      <td className="border border-white/10 px-3 py-2">Complex projects</td>
                      <td className="border border-white/10 px-3 py-2">Requires careful design</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Work Package Example - Electrical Distribution</p>
              <div className="text-sm space-y-2">
                <p><strong>WBS Code:</strong> 1.3.1.2.05</p>
                <p><strong>Title:</strong> Level 2 Distribution Board DB-L2-01</p>
                <p><strong>Scope:</strong> Supply, install, and commission 400A TP+N distribution board including all internal wiring, busbar connections, metering CT installation, and labelling.</p>
                <p><strong>Deliverables:</strong> Installed and tested distribution board, completed test certificates, as-built drawings, O&M documentation section.</p>
                <p><strong>Acceptance criteria:</strong> Board energised, all circuits tested per BS 7671, labels complete, QA sign-off obtained.</p>
                <p><strong>Duration:</strong> 3 days (24 hours)</p>
                <p><strong>Owner:</strong> Electrical Subcontractor Supervisor</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Interface management:</strong> Create explicit work packages for system interfaces (e.g., "BMS to HVAC control wiring") to ensure these critical connections are not overlooked.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Building WBS Development</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop Level 2-3 WBS for a 5-storey office electrical installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Level 1: Electrical Installation</p>
                <p className="mt-2">Level 2 Decomposition:</p>
                <p className="ml-4">1.1 Main Intake and HV (if applicable)</p>
                <p className="ml-4">1.2 LV Distribution</p>
                <p className="ml-4">1.3 General Lighting</p>
                <p className="ml-4">1.4 Emergency Lighting</p>
                <p className="ml-4">1.5 Small Power</p>
                <p className="ml-4">1.6 Data Infrastructure</p>
                <p className="ml-4">1.7 Fire Alarm System</p>
                <p className="ml-4">1.8 Security Systems</p>
                <p className="ml-4">1.9 External Works</p>
                <p className="mt-2">Level 3 Example (1.2 LV Distribution):</p>
                <p className="ml-4">1.2.1 Main LV Switchboard</p>
                <p className="ml-4">1.2.2 Submains and Risers</p>
                <p className="ml-4">1.2.3 Floor Distribution Boards</p>
                <p className="ml-4">1.2.4 Metering Installation</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Cost Code Integration</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Map WBS codes to company cost codes for an MEP project.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>WBS Code | Cost Code | Description</p>
                <p>---------|-----------|-------------</p>
                <p>1.2.1    | E-510-001 | Main switchboard supply & install</p>
                <p>1.2.2    | E-520-001 | Submain cables - labour</p>
                <p>1.2.2    | E-520-002 | Submain cables - materials</p>
                <p>1.2.3    | E-530-001 | Distribution boards - supply</p>
                <p>1.2.3    | E-530-002 | Distribution boards - install</p>
                <p className="mt-2 text-white/60">Note: Multiple cost codes can roll up to single WBS</p>
                <p className="text-green-400">This enables cost analysis at both detailed and summary levels</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Applying the 100% Rule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify WBS completeness for lighting installation scope.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>1.3 General Lighting (check against specification):</p>
                <p className="mt-2">Specification requirements:</p>
                <p className="ml-4">- LED luminaires throughout</p>
                <p className="ml-4">- DALI control system</p>
                <p className="ml-4">- Presence detection</p>
                <p className="ml-4">- Daylight dimming</p>
                <p className="mt-2">WBS coverage check:</p>
                <p className="ml-4 text-green-400">1.3.1 Luminaire supply and install</p>
                <p className="ml-4 text-green-400">1.3.2 Lighting control wiring</p>
                <p className="ml-4 text-green-400">1.3.3 DALI drivers and addressing</p>
                <p className="ml-4 text-green-400">1.3.4 Sensors and detectors</p>
                <p className="ml-4 text-green-400">1.3.5 Commissioning and scene setting</p>
                <p className="mt-2 text-green-400">Result: 100% of lighting scope captured</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">WBS Development Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Review contract scope, specifications, and drawings thoroughly</li>
                <li className="pl-1">Identify all major deliverables and systems</li>
                <li className="pl-1">Decompose to work package level (8-80 hours)</li>
                <li className="pl-1">Apply 100% rule - check nothing is missing or duplicated</li>
                <li className="pl-1">Assign unique codes to all elements</li>
                <li className="pl-1">Create WBS dictionary for key work packages</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Work package duration: <strong>8-80 hours</strong> (1-2 weeks)</li>
                <li className="pl-1">Typical levels: <strong>4-6 levels</strong> of decomposition</li>
                <li className="pl-1">100% rule: <strong>All scope</strong> must be captured</li>
                <li className="pl-1">Each element: <strong>Mutually exclusive</strong> (no overlap)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing WBS with schedule</strong> - WBS shows deliverables, not activities</li>
                <li className="pl-1"><strong>Inconsistent decomposition</strong> - Similar items should be at similar levels</li>
                <li className="pl-1"><strong>Missing interfaces</strong> - System boundaries need explicit work packages</li>
                <li className="pl-1"><strong>Overlapping elements</strong> - Violates 100% rule, causes double-counting</li>
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
                <p className="font-medium text-white mb-1">WBS Principles</p>
                <ul className="space-y-0.5">
                  <li>100% rule - capture all scope</li>
                  <li>Deliverable-focused (nouns not verbs)</li>
                  <li>Mutually exclusive elements</li>
                  <li>Hierarchical parent-child structure</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Work Package Criteria</p>
                <ul className="space-y-0.5">
                  <li>8-80 hours duration</li>
                  <li>Single accountable owner</li>
                  <li>Measurable deliverable</li>
                  <li>Can be estimated and scheduled</li>
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
            <Link to="../h-n-c-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1-2">
              Next: Critical Path Method
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section1_1;
