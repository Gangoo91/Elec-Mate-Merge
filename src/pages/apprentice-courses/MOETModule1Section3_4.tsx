import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Writing and Following Method Statements - MOET Module 1 Section 3.4";
const DESCRIPTION = "Comprehensive guide to method statements for electrical maintenance technicians: RAMS structure, step-by-step task breakdown, hazard identification per step, CDM 2015 requirements, construction phase plans and a worked example for electrical panel changeover.";

const quickCheckQuestions = [
  {
    id: "method-statement-purpose",
    question: "What is the primary purpose of a method statement?",
    options: [
      "To replace the risk assessment entirely",
      "To describe step-by-step how a task will be carried out safely, identifying hazards and controls for each step",
      "To provide a cost estimate for the work",
      "To satisfy the client's administrative requirements only"
    ],
    correctIndex: 1,
    explanation: "A method statement describes the step-by-step sequence of work activities, identifying the hazards associated with each step and the control measures that will be applied. It is a practical, operational document that translates the findings of the risk assessment into a workable plan that the team can follow on site. It complements but does not replace the risk assessment."
  },
  {
    id: "rams-meaning",
    question: "What does the acronym RAMS stand for?",
    options: [
      "Risk Analysis and Management System",
      "Risk Assessment Method Statement",
      "Regulatory Assessment Management Standard",
      "Risk Avoidance and Mitigation Strategy"
    ],
    correctIndex: 1,
    explanation: "RAMS stands for Risk Assessment Method Statement. It is a combined document (or pair of documents) that includes both the risk assessment (identifying hazards and evaluating risks) and the method statement (describing how the work will be carried out safely). RAMS are commonly required on construction sites and for maintenance work in commercial and industrial premises."
  },
  {
    id: "cdm-2015-link",
    question: "Under the Construction (Design and Management) Regulations 2015, method statements are most closely linked to which CDM document?",
    options: [
      "The pre-construction information pack",
      "The construction phase plan",
      "The health and safety file",
      "The F10 notification"
    ],
    correctIndex: 1,
    explanation: "The construction phase plan is the CDM document that sets out how health and safety will be managed during the construction phase. Method statements form part of the construction phase plan, providing the detailed work procedures for specific tasks. The principal contractor is responsible for ensuring the construction phase plan is in place and that method statements from all contractors are coordinated."
  },
  {
    id: "method-statement-review",
    question: "When should a method statement be reviewed and updated?",
    options: [
      "Only when the HSE visits the site",
      "Whenever there is a significant change in the work method, site conditions, personnel, or when the original method proves inadequate",
      "Only at the end of the project for record purposes",
      "Method statements never need reviewing once they are signed"
    ],
    correctIndex: 1,
    explanation: "Method statements are living documents that must be reviewed and updated whenever circumstances change — including changes in the work method, site conditions, personnel, equipment, or when an incident or near-miss reveals that the original method statement is inadequate. They should also be reviewed at the point of work to confirm they accurately describe the actual conditions encountered."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A method statement should be prepared:",
    options: [
      "After the work is completed, as a record of what was done",
      "Before the work begins, as part of the planning process",
      "Only when the client specifically requests one",
      "Only for work classified as 'high risk' under RIDDOR"
    ],
    correctAnswer: 1,
    explanation: "Method statements must be prepared before work begins, as part of the planning process. They are forward-looking documents that describe how the work will be carried out safely. Preparing them after the work defeats their purpose — they are intended to plan and control the work, not merely record it."
  },
  {
    id: 2,
    question: "The key elements of a method statement include:",
    options: [
      "Only the name of the client and the contract value",
      "Task description, step-by-step sequence, hazards per step, control measures per step, responsible persons, emergency arrangements and required resources",
      "Only the PPE required for the work",
      "A list of all workers' NI numbers and CSCS card details"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive method statement includes: a clear description of the task, the step-by-step sequence of work, the hazards associated with each step, the control measures for each hazard, the persons responsible, the resources required (tools, equipment, materials, PPE), and the emergency arrangements. It should be sufficiently detailed that a competent person can follow it safely."
  },
  {
    id: 3,
    question: "The relationship between a risk assessment and a method statement is best described as:",
    options: [
      "They are the same document with different names",
      "The risk assessment identifies hazards and evaluates risks; the method statement describes how the work will be done safely, incorporating the controls identified in the risk assessment",
      "The method statement replaces the risk assessment",
      "The risk assessment is for the office; the method statement is for the site"
    ],
    correctAnswer: 1,
    explanation: "The risk assessment and method statement are complementary documents. The risk assessment identifies hazards, evaluates the level of risk, and determines the control measures required. The method statement then describes the practical, step-by-step work procedure that incorporates those control measures. Together they form the RAMS — the safety planning framework for the task."
  },
  {
    id: 4,
    question: "When briefing a work team on a method statement, the person in charge should:",
    options: [
      "Simply hand out printed copies and ask everyone to sign",
      "Walk through the method statement step by step, explain the hazards and controls, answer questions, and confirm everyone understands before signing",
      "Read the document aloud as quickly as possible to save time",
      "Only brief the most senior member of the team"
    ],
    correctAnswer: 1,
    explanation: "An effective briefing involves walking through the method statement step by step, explaining the hazards at each stage, describing the control measures, inviting questions and checking understanding. Signatures should only be obtained after the briefing — they confirm that each person has been briefed and understood the content. Simply handing out copies without discussion is a 'tick-box' exercise that provides no real safety benefit."
  },
  {
    id: 5,
    question: "Under CDM 2015, who is responsible for ensuring that method statements are in place for construction work?",
    options: [
      "The client only",
      "The principal contractor for the construction phase plan, and each contractor for their own work methods",
      "The CDM coordinator (a role that no longer exists under CDM 2015)",
      "The local authority building control officer"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the principal contractor is responsible for the construction phase plan, which must include or reference the method statements for all work on the project. Each contractor is responsible for preparing method statements for their own work and ensuring their workers follow them. The client has overarching duties to ensure suitable arrangements are in place but does not write method statements."
  },
  {
    id: 6,
    question: "A method statement for an electrical panel changeover should include:",
    options: [
      "Only the electrical work — other trades are not relevant",
      "The complete sequence including preparatory work, isolation, changeover procedure, testing, commissioning, reinstatement and handover",
      "Only the commissioning test results",
      "Just the list of materials required"
    ],
    correctAnswer: 1,
    explanation: "A method statement for a panel changeover must cover the entire task from start to finish: site preparation, notification of affected parties, isolation and proving dead, disconnection of the old panel, installation of the new panel, connection and termination, testing and commissioning, labelling, reinstatement and handover. Each step should identify the associated hazards and the specific control measures to be applied."
  },
  {
    id: 7,
    question: "Emergency arrangements in a method statement should include:",
    options: [
      "Only the telephone number for 999",
      "The location of first aid provision, emergency procedures for the specific hazards of the task, rescue arrangements for confined spaces or working at height, and the procedure for reporting incidents",
      "Only the fire assembly point",
      "Emergency arrangements are not required in a method statement"
    ],
    correctAnswer: 1,
    explanation: "Emergency arrangements must be specific to the task and the hazards identified. For electrical work, this should include the location of the nearest first aid kit and first aider, the procedure for dealing with electric shock (including how to safely disconnect the casualty), rescue plans for confined spaces or working at height if applicable, the procedure for reporting incidents, and contact numbers for emergency services and the site safety manager."
  },
  {
    id: 8,
    question: "A method statement sign-off sheet records:",
    options: [
      "The cost of the work and the profit margin",
      "The names of all persons who have been briefed on the method statement, confirming they understand the hazards, controls and their responsibilities",
      "Only the supervisor's name and signature",
      "The date the method statement was filed in the office"
    ],
    correctAnswer: 1,
    explanation: "The sign-off sheet provides documentary evidence that each member of the work team has been briefed on the method statement and confirms their understanding. It typically records the date of briefing, the briefer's name and signature, and each attendee's name and signature. This is important both for safety (ensuring everyone is informed) and for compliance (providing an audit trail)."
  },
  {
    id: 9,
    question: "If conditions on site differ from those described in the method statement, you should:",
    options: [
      "Proceed anyway — the method statement was approved",
      "Stop work, assess the changed conditions, and update the method statement (and risk assessment if necessary) before proceeding",
      "Cross out the affected steps and continue with the rest",
      "Call the office and ask them to email a revised version at the end of the day"
    ],
    correctAnswer: 1,
    explanation: "If conditions on site differ from those described in the method statement, work must stop. The method statement was written for specific conditions — if those conditions have changed, the planned controls may no longer be adequate. The changed conditions must be assessed, and the method statement (and risk assessment) updated to reflect reality before work can proceed. This is a fundamental principle of safe working."
  },
  {
    id: 10,
    question: "A 'step-by-step task breakdown' in a method statement means:",
    options: [
      "A general description of the overall work in one paragraph",
      "Breaking the entire task down into individual sequential steps, each describing a specific activity, the hazards present during that step, and the controls to be applied",
      "A list of the tools required",
      "The project programme showing start and finish dates"
    ],
    correctAnswer: 1,
    explanation: "A step-by-step task breakdown divides the entire work activity into individual, sequential steps. Each step describes what will be done, identifies the hazards that exist during that specific step, and specifies the control measures to be applied. This level of detail ensures that hazards are not overlooked and that controls are appropriate to each phase of the work — not just a generic list applied to the whole task."
  },
  {
    id: 11,
    question: "The construction phase plan under CDM 2015 must be in place:",
    options: [
      "Before the end of the construction phase",
      "Before the construction phase begins",
      "Only if the project is notifiable (lasting more than 30 working days with more than 20 workers)",
      "Only if there is a principal designer appointed"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12 of CDM 2015 requires the construction phase plan to be drawn up before the construction phase begins. For projects with only one contractor, the contractor prepares it. For projects with more than one contractor, the principal contractor prepares it. The plan must be proportionate to the complexity of the project and the risks involved. Method statements form part of this plan."
  },
  {
    id: 12,
    question: "Under ST1426, maintenance technicians should be able to:",
    options: [
      "Only follow method statements written by others",
      "Contribute to the preparation of method statements for their work, follow them on site, and identify when they need updating",
      "Write method statements for all trades including those outside their competence",
      "Ignore method statements as they are only for construction sites"
    ],
    correctAnswer: 1,
    explanation: "ST1426 expects maintenance technicians to contribute to the preparation of RAMS for their work activities, drawing on their technical knowledge and practical experience. They must also follow method statements on site, identify when conditions differ from what was planned, and flag when updates are needed. This combination of planning, executing and reviewing is part of the continuous improvement behaviour assessed in the end-point assessment."
  }
];

const faqs = [
  {
    question: "What is the difference between a method statement and a risk assessment?",
    answer: "A risk assessment identifies hazards, evaluates the level of risk (likelihood x severity), and determines what control measures are needed. A method statement describes the step-by-step work procedure, incorporating those control measures into the practical sequence of work. Think of the risk assessment as 'what could go wrong and how do we prevent it' and the method statement as 'here is how we will do the work safely'. Together they form the RAMS — the complete safety planning package."
  },
  {
    question: "Do I need a method statement for every electrical maintenance task?",
    answer: "Not necessarily — the need for a method statement depends on the complexity and risk level of the task. Simple, routine tasks covered by a generic safe system of work (such as replacing a light fitting on a confirmed dead circuit) may not require an individual method statement. However, complex, non-routine or high-risk tasks — such as a panel changeover, HV switching, or work in a confined space — should always have a task-specific method statement. Your employer's procedures will define the threshold."
  },
  {
    question: "Who should write the method statement?",
    answer: "Method statements should be written or significantly contributed to by someone with direct, practical knowledge of the work being described. For electrical maintenance, this means an electrically competent person — ideally the supervisor or lead technician who will oversee the work. They understand the practical realities, the sequence of operations, and the specific hazards involved. Method statements written by people who do not understand the work tend to be generic and ineffective."
  },
  {
    question: "How detailed should a method statement be?",
    answer: "Detailed enough that a competent person could follow it safely, but not so detailed that it becomes unreadable. The level of detail should be proportionate to the complexity and risk of the task. A simple task might have 6-8 steps; a complex panel changeover might have 20 or more. Each step should identify the activity, the hazards, and the controls. If you find a step has multiple significant hazards, consider breaking it into smaller sub-steps."
  },
  {
    question: "What happens if I discover a hazard on site that is not in the method statement?",
    answer: "Stop work immediately and assess the situation. If the hazard can be safely controlled by adding a control measure that is consistent with the overall safe system of work, update the method statement, brief the team, and proceed. If the hazard significantly changes the risk profile of the task — for example, discovering live conductors where the method statement assumes a dead circuit — stop work, withdraw from the area if necessary, and do not proceed until the method statement and risk assessment have been formally reviewed and updated."
  }
];

const MOETModule1Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3">
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
            <Shield className="h-4 w-4" />
            <span>Module 1.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Writing and Following Method Statements
          </h1>
          <p className="text-white/80">
            Planning safe work through structured, step-by-step procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>RAMS:</strong> Risk Assessment Method Statement — the combined safety plan</li>
              <li className="pl-1"><strong>Structure:</strong> Step-by-step with hazards and controls per step</li>
              <li className="pl-1"><strong>Briefing:</strong> Walk through before work; sign-off confirms understanding</li>
              <li className="pl-1"><strong>Review:</strong> Update when conditions change, not just once and file</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>CDM 2015:</strong> Method statements form part of the construction phase plan</li>
              <li className="pl-1"><strong>Isolation:</strong> Each step of the safe isolation procedure should be a separate step</li>
              <li className="pl-1"><strong>Testing:</strong> Commissioning and testing steps need their own hazard analysis</li>
              <li className="pl-1"><strong>ST1426:</strong> Contribute to RAMS preparation and follow them on site</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and structure of a method statement",
              "Describe the relationship between risk assessments and method statements (RAMS)",
              "Break down a task into sequential steps with hazards and controls for each",
              "Understand CDM 2015 requirements for construction phase plans and method statements",
              "Apply method statement briefing and sign-off procedures",
              "Review and update method statements when conditions change"
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

        {/* Section 01: What Is a Method Statement? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is a Method Statement and Why Does It Matter?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A method statement is a document that describes how a specific task or activity will be carried out
              safely. It provides a step-by-step sequence of work, identifying the hazards at each stage and the
              control measures that will be applied to manage them. Think of it as a safe work plan — it translates
              the findings of the risk assessment into a practical, actionable procedure that the work team can
              follow on site.
            </p>

            <p>
              Method statements are not just paperwork — they are planning tools. The process of writing a method
              statement forces you to think through the work in detail before you start. This thinking process often
              reveals hazards, conflicts and logistical problems that would not be apparent until work was under way.
              By identifying these issues in advance, you can plan appropriate controls and avoid reactive,
              improvised responses to problems on site.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RAMS — The Combined Approach</p>
              <p className="text-sm text-white mb-3">
                In practice, the risk assessment and method statement are often prepared together as a combined
                document known as a RAMS (Risk Assessment Method Statement). This ensures that the risk assessment
                directly informs the method of work and that the controls identified in the assessment are embedded
                in the work procedure. A RAMS package typically includes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Risk assessment:</strong> Hazard identification, risk evaluation (using a risk matrix), existing and additional controls</li>
                <li className="pl-1"><strong>Method statement:</strong> Step-by-step work procedure incorporating all control measures</li>
                <li className="pl-1"><strong>Supporting documents:</strong> COSHH assessments, permit to work requirements, equipment inspection records, training records, site-specific information</li>
                <li className="pl-1"><strong>Sign-off sheet:</strong> Record of personnel who have been briefed on the RAMS</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Is a Method Statement Required?</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Construction work under CDM 2015:</strong> The construction phase plan must include or reference method statements for all significant work activities</li>
                <li className="pl-1"><strong>Complex or non-routine maintenance:</strong> Panel changeovers, switchgear upgrades, cable installations, major fault repairs</li>
                <li className="pl-1"><strong>High-risk activities:</strong> Work involving live electrical systems, confined spaces, working at height, hot work</li>
                <li className="pl-1"><strong>Client or principal contractor requirements:</strong> Many clients and main contractors require RAMS for all work on their sites</li>
                <li className="pl-1"><strong>Multi-trade coordination:</strong> When electrical work interfaces with other trades and the sequence must be planned</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A method statement is only useful if it is specific to the actual task
              and conditions. Generic method statements that are copied from job to job without being tailored to
              the specific site, equipment and personnel are dangerous — they create a false sense of security while
              failing to address the real hazards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Structure and Content */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Structure and Content of a Method Statement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Although there is no legally prescribed format for a method statement, effective documents share a
              common structure. The following sections should be included to ensure the method statement is
              comprehensive and usable.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Header Information</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Document reference number and revision number</li>
                  <li className="pl-1">Project/site name and address</li>
                  <li className="pl-1">Client and principal contractor names</li>
                  <li className="pl-1">Description of the task</li>
                  <li className="pl-1">Prepared by (name, qualification, date)</li>
                  <li className="pl-1">Approved by (name, date)</li>
                  <li className="pl-1">Associated risk assessment reference number</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scope and Description</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Clear description of the work to be carried out</li>
                  <li className="pl-1">Location (building, floor, room, equipment designation)</li>
                  <li className="pl-1">Start and anticipated completion dates/times</li>
                  <li className="pl-1">Working hours and any restrictions</li>
                  <li className="pl-1">Interfaces with other work activities</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Resources Required</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Personnel — number, roles, competence requirements</li>
                  <li className="pl-1">Tools and equipment (including test equipment, voltage indicators)</li>
                  <li className="pl-1">Materials and components</li>
                  <li className="pl-1">PPE required for each stage</li>
                  <li className="pl-1">Access equipment (scaffolding, MEWP, ladders)</li>
                  <li className="pl-1">Welfare facilities</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="text-sm font-medium text-elec-yellow mb-2">Step-by-Step Work Procedure — The Core of the Document</h3>
                <p className="text-sm text-white mb-2">
                  This is the most important section. Each step should be presented in a table format:
                </p>
                <div className="overflow-x-auto">
                  <table className="text-xs text-white w-full border-collapse mt-2">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-2 py-1.5 text-left">Step</th>
                        <th className="border border-white/10 px-2 py-1.5 text-left">Activity</th>
                        <th className="border border-white/10 px-2 py-1.5 text-left">Hazards</th>
                        <th className="border border-white/10 px-2 py-1.5 text-left">Controls</th>
                        <th className="border border-white/10 px-2 py-1.5 text-left">Responsible</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-2 py-1.5">1</td>
                        <td className="border border-white/10 px-2 py-1.5">What is done</td>
                        <td className="border border-white/10 px-2 py-1.5">What could go wrong</td>
                        <td className="border border-white/10 px-2 py-1.5">How we prevent it</td>
                        <td className="border border-white/10 px-2 py-1.5">Who does it</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-2 py-1.5">2</td>
                        <td className="border border-white/10 px-2 py-1.5">...</td>
                        <td className="border border-white/10 px-2 py-1.5">...</td>
                        <td className="border border-white/10 px-2 py-1.5">...</td>
                        <td className="border border-white/10 px-2 py-1.5">...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Arrangements</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">First aid provision and nearest first aider location</li>
                  <li className="pl-1">Electric shock emergency procedure (disconnect, CPR, call 999)</li>
                  <li className="pl-1">Fire procedure and nearest extinguisher location</li>
                  <li className="pl-1">Rescue plan for working at height or confined spaces</li>
                  <li className="pl-1">Incident reporting procedure and contact numbers</li>
                  <li className="pl-1">Nearest hospital with A&E department</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Worked Example — Electrical Panel Changeover */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Worked Example — Electrical Panel Changeover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              To illustrate how a method statement works in practice, the following is an abridged example for
              a common electrical maintenance task: replacing a three-phase distribution board in a commercial
              building. This is a non-routine, medium-to-high risk task that requires detailed planning.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example Method Statement — DB Changeover (Abridged)</h3>
              <div className="overflow-x-auto">
                <table className="text-xs text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-1.5 text-left w-10">Step</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">Activity</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">Key Hazards</th>
                      <th className="border border-white/10 px-2 py-1.5 text-left">Control Measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">1</td>
                      <td className="border border-white/10 px-2 py-1.5">Site preparation — set up work area, install barriers</td>
                      <td className="border border-white/10 px-2 py-1.5">Trips, public access, manual handling</td>
                      <td className="border border-white/10 px-2 py-1.5">Barriers and signage; housekeeping; mechanical aids for heavy items</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">2</td>
                      <td className="border border-white/10 px-2 py-1.5">Notify affected building occupants of planned shutdown</td>
                      <td className="border border-white/10 px-2 py-1.5">Disruption, emergency lighting failure</td>
                      <td className="border border-white/10 px-2 py-1.5">Written notification 48 hrs in advance; confirm emergency lighting operational; temporary supplies where needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">3</td>
                      <td className="border border-white/10 px-2 py-1.5">Isolate supply at upstream MCCB — safe isolation procedure</td>
                      <td className="border border-white/10 px-2 py-1.5">Electric shock, arc flash</td>
                      <td className="border border-white/10 px-2 py-1.5">Identify correct isolator from drawings; open MCCB; lock off with unique padlock; prove dead with GS38 voltage indicator (tested before and after)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">4</td>
                      <td className="border border-white/10 px-2 py-1.5">Disconnect outgoing circuits from old board</td>
                      <td className="border border-white/10 px-2 py-1.5">Stored energy (capacitors), manual handling of cables</td>
                      <td className="border border-white/10 px-2 py-1.5">Allow capacitors to discharge; label all circuits before disconnection; support heavy cables; use correct tools</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">5</td>
                      <td className="border border-white/10 px-2 py-1.5">Disconnect incoming supply cables from old board</td>
                      <td className="border border-white/10 px-2 py-1.5">Heavy cables, sharp edges, possible back-feed</td>
                      <td className="border border-white/10 px-2 py-1.5">Prove dead at incoming terminals; support cables; gloves for sharp edges; two-person lift if needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">6</td>
                      <td className="border border-white/10 px-2 py-1.5">Remove old board from wall</td>
                      <td className="border border-white/10 px-2 py-1.5">Manual handling, falling objects, dust</td>
                      <td className="border border-white/10 px-2 py-1.5">Two-person lift minimum; hard hats; dust mask if drilling; safe disposal of old board</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">7</td>
                      <td className="border border-white/10 px-2 py-1.5">Install new board and connect incoming supply</td>
                      <td className="border border-white/10 px-2 py-1.5">Manual handling, drilling (noise, dust), cable damage</td>
                      <td className="border border-white/10 px-2 py-1.5">Check cable avoidance before drilling; hearing protection; torque connections to manufacturer spec</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">8</td>
                      <td className="border border-white/10 px-2 py-1.5">Connect outgoing circuits to new board</td>
                      <td className="border border-white/10 px-2 py-1.5">Incorrect termination, loose connections</td>
                      <td className="border border-white/10 px-2 py-1.5">Match labelling to circuit schedule; torque all connections; visual inspection before energising</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">9</td>
                      <td className="border border-white/10 px-2 py-1.5">Testing and commissioning (dead tests first)</td>
                      <td className="border border-white/10 px-2 py-1.5">Incorrect readings leading to unsafe energisation</td>
                      <td className="border border-white/10 px-2 py-1.5">Insulation resistance, continuity and polarity tests before energising; record results on schedule of test results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">10</td>
                      <td className="border border-white/10 px-2 py-1.5">Re-energise — remove lock, close MCCB</td>
                      <td className="border border-white/10 px-2 py-1.5">Arc flash on energisation, fault on new board</td>
                      <td className="border border-white/10 px-2 py-1.5">All personnel clear of board; close MCCB from side position; arc flash PPE worn during switching; confirm all outgoing MCBs off before main energisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">11</td>
                      <td className="border border-white/10 px-2 py-1.5">Live tests — RCD trip times, voltage checks, phase rotation</td>
                      <td className="border border-white/10 px-2 py-1.5">Electric shock, incorrect test procedure</td>
                      <td className="border border-white/10 px-2 py-1.5">GS38 compliant test equipment; competent person only; record all results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-1.5 font-bold">12</td>
                      <td className="border border-white/10 px-2 py-1.5">Labelling, reinstatement and handover</td>
                      <td className="border border-white/10 px-2 py-1.5">Incomplete labelling leading to future hazards</td>
                      <td className="border border-white/10 px-2 py-1.5">Label all circuits; update circuit chart; remove barriers; clean work area; hand over to client with test certificates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> This is an abridged example for educational purposes. A real method statement
              would include additional detail on specific tools, named responsible persons, detailed emergency
              procedures, and supporting documentation references. The level of detail should be proportionate to
              the complexity and risk of the task.
            </p>
          </div>
        </section>

        {/* Section 04: CDM 2015 and Construction Phase Plans */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            CDM 2015 and the Construction Phase Plan
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Construction (Design and Management) Regulations 2015 (CDM 2015) apply to all construction work
              in Great Britain, including electrical installation and maintenance work on construction sites.
              Method statements form a key part of the safety management framework under CDM 2015.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CDM 2015 Duty Holders</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method Statement Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Client</td>
                      <td className="border border-white/10 px-3 py-2">Ensure suitable arrangements for managing health and safety, including provision of pre-construction information that informs method statements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Principal designer</td>
                      <td className="border border-white/10 px-3 py-2">Identify, eliminate and reduce design risks; provide information to contractors to help them prepare effective method statements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Principal contractor</td>
                      <td className="border border-white/10 px-3 py-2">Prepare the construction phase plan; ensure method statements from all contractors are adequate and coordinated; manage site-wide safety</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Contractor (your employer)</td>
                      <td className="border border-white/10 px-3 py-2">Prepare task-specific method statements for your work; ensure workers are briefed; follow the method statements on site; update when conditions change</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Worker (you)</td>
                      <td className="border border-white/10 px-3 py-2">Follow the method statement; report hazards not covered; cooperate with the safety management system; attend briefings</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Construction Phase Plan</h3>
              <p className="text-sm text-white mb-3">
                The construction phase plan (CPP) is the overarching document that sets out how health and safety
                will be managed during the construction phase. It must be prepared before construction work begins
                (Regulation 12). The CPP includes or references:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">A description of the project and the management structure</li>
                <li className="pl-1">Site rules and arrangements for welfare, first aid and emergency procedures</li>
                <li className="pl-1">Risk assessments and method statements (RAMS) for all significant work activities</li>
                <li className="pl-1">Arrangements for coordination between contractors</li>
                <li className="pl-1">Monitoring and review arrangements</li>
              </ul>
              <p className="text-sm text-white mt-3">
                As an electrical maintenance technician working on a construction project, your method statements
                will form part of the principal contractor's construction phase plan. You must submit them in
                advance, usually as part of your RAMS package, and they must be accepted before work begins.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Does CDM 2015 Apply to Maintenance Work?</p>
              <p className="text-sm text-white">
                CDM 2015 applies to all "construction work", which is defined broadly and includes installation,
                repair, maintenance and dismantling of electrical systems. However, the regulations apply
                proportionately — a simple like-for-like replacement of a socket outlet does not require the same
                level of documentation as a major rewire. The duty to plan, manage and monitor work safely applies
                regardless of project size, but the level of documentation should be proportionate to the
                complexity and risk.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Briefing, Sign-Off and Review */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Briefing, Sign-Off and Ongoing Review
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A method statement is only effective if the people doing the work understand it, follow it, and
              update it when conditions change. The briefing and sign-off process is the critical link between the
              document and the work — it ensures that the planned controls are actually communicated and understood
              by the work team.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Conducting an Effective Briefing</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Location:</strong> At or near the work area, so the team can see the conditions being described</li>
                <li className="pl-1"><strong>Timing:</strong> Before work begins — ideally on the same day, so conditions are current</li>
                <li className="pl-1"><strong>Content:</strong> Walk through each step of the method statement, explaining the activity, hazards and controls. Point out physical features on site that relate to the method statement</li>
                <li className="pl-1"><strong>Interaction:</strong> Encourage questions and concerns. Workers at the point of work often identify issues that the person writing the method statement has missed</li>
                <li className="pl-1"><strong>Confirmation:</strong> Check understanding — ask team members to describe key controls in their own words, not just nod</li>
                <li className="pl-1"><strong>Sign-off:</strong> Each person signs the sign-off sheet, confirming they have been briefed and understood the content</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The "Sign and Go" Problem</p>
              <p className="text-sm text-white">
                One of the most common failures in method statement management is the "sign and go" approach —
                where workers are handed a document, asked to sign it, and sent to work without any meaningful
                briefing or discussion. This creates a paper trail without providing any real safety benefit. If
                you are ever asked to sign a method statement without being properly briefed, ask for a briefing.
                Your signature should confirm that you have been briefed and understood the content — not merely
                that you have seen the document.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Update the Method Statement</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Conditions on site differ from those described in the method statement</li>
                <li className="pl-1">A new hazard is discovered that was not anticipated (e.g., asbestos, unknown live cables)</li>
                <li className="pl-1">The planned work method proves impractical and needs to be changed</li>
                <li className="pl-1">Personnel change — a new team member needs to be briefed, or a change in competence levels</li>
                <li className="pl-1">An incident or near-miss occurs during the work</li>
                <li className="pl-1">The work scope changes — additional tasks or changed sequence</li>
                <li className="pl-1">Equipment or materials are different from what was planned</li>
              </ul>
              <p className="text-sm text-white mt-3">
                Updates should be documented — mark the original method statement as revised, note the changes,
                re-brief the team, and obtain fresh signatures on the sign-off sheet for the revised version.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to follow safe systems
              of work (including method statements) and to identify when they need updating. You are expected to
              take personal responsibility for working safely, which includes reading and understanding the method
              statement before starting work, following it during the task, and reporting when it no longer reflects
              the actual conditions. This is assessed in the end-point assessment practical observation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Hierarchy of Controls
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-5">
              Next: Dynamic Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section3_4;
