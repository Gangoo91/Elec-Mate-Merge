import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Method Statements - HNC Module 1 Section 2.4";
const DESCRIPTION = "Comprehensive guide to method statements in building services: purpose, content, task sequencing, control measures, emergency procedures, and practical examples for electrical installations.";

const quickCheckQuestions = [
  {
    id: "method-purpose",
    question: "What is the primary purpose of a method statement?",
    options: ["To estimate project costs", "To document safe systems of work for specific tasks", "To record completed work", "To list materials required"],
    correctIndex: 1,
    explanation: "A method statement documents the safe system of work for a specific task, detailing how work will be carried out safely, step by step, with identified hazards and control measures."
  },
  {
    id: "method-author",
    question: "Who is typically responsible for preparing a method statement?",
    options: ["The client", "The HSE inspector", "The contractor undertaking the work", "The building owner"],
    correctIndex: 2,
    explanation: "The contractor undertaking the work is responsible for preparing method statements. They have the technical knowledge of the tasks and must demonstrate competence to the principal contractor."
  },
  {
    id: "method-review",
    question: "When should a method statement be reviewed?",
    options: ["Only at project completion", "Before work begins and when conditions change", "Once per year", "Only after an accident"],
    correctIndex: 1,
    explanation: "Method statements must be reviewed before work begins and whenever conditions change, new hazards emerge, or the scope of work is altered. They are living documents that must remain current."
  },
  {
    id: "sequence-importance",
    question: "Why is task sequencing important in method statements?",
    options: ["To speed up the work", "To reduce material costs", "To ensure safe progression and identify dependencies", "To impress the client"],
    correctIndex: 2,
    explanation: "Task sequencing ensures work progresses safely with proper dependencies identified. For example, isolation must occur before cable work, and testing must complete before energisation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a method statement primarily document?",
    options: [
      "The cost of materials and labour",
      "The safe system of work for a specific task",
      "The qualifications of workers",
      "The client's project requirements"
    ],
    correctAnswer: 1,
    explanation: "A method statement documents the safe system of work for a specific task, providing step-by-step instructions on how the work will be carried out safely with appropriate control measures."
  },
  {
    id: 2,
    question: "Under CDM 2015, when must method statements be provided?",
    options: [
      "Only for work over £50,000",
      "Only for domestic projects",
      "For notifiable projects and when requested by the principal contractor",
      "Only after work is completed"
    ],
    correctAnswer: 2,
    explanation: "Under CDM 2015, method statements must be provided for notifiable projects and whenever requested by the principal contractor as part of demonstrating competence and safe working practices."
  },
  {
    id: 3,
    question: "What is the relationship between risk assessments and method statements?",
    options: [
      "They are the same document",
      "Risk assessments identify hazards; method statements describe how to control them",
      "Method statements replace risk assessments",
      "They are unrelated documents"
    ],
    correctAnswer: 1,
    explanation: "Risk assessments identify hazards and evaluate risks, while method statements describe the practical steps and control measures to safely carry out the work. They work together as complementary documents."
  },
  {
    id: 4,
    question: "Which of the following should be included in a method statement for electrical isolation?",
    options: [
      "Staff holiday schedules",
      "Lock-off procedures and verification testing",
      "Previous year's energy consumption",
      "Building insurance details"
    ],
    correctAnswer: 1,
    explanation: "Method statements for electrical isolation must include lock-off procedures (LOTO), verification testing using approved voltage indicators, permit-to-work requirements, and safe reinstatement procedures."
  },
  {
    id: 5,
    question: "What does 'task breakdown' mean in a method statement?",
    options: [
      "When equipment fails during work",
      "Dividing work into logical, sequential steps",
      "Cancelling a project",
      "Allocating budget to tasks"
    ],
    correctAnswer: 1,
    explanation: "Task breakdown means dividing the overall work into logical, sequential steps that can be clearly communicated, each with its own hazards, controls, and responsible persons identified."
  },
  {
    id: 6,
    question: "Who should sign off a method statement before work commences?",
    options: [
      "Only the site labourer",
      "The supervisor/manager and those undertaking the work",
      "The building receptionist",
      "No signatures are required"
    ],
    correctAnswer: 1,
    explanation: "Method statements should be signed by the supervisor/manager who prepared or approved it and by those undertaking the work to confirm they have read, understood, and will follow the documented procedures."
  },
  {
    id: 7,
    question: "What is the purpose of the emergency procedures section in a method statement?",
    options: [
      "To increase document length",
      "To meet insurance requirements only",
      "To ensure rapid, appropriate response to incidents",
      "To list fire extinguisher locations"
    ],
    correctAnswer: 2,
    explanation: "The emergency procedures section ensures everyone knows how to respond rapidly and appropriately to incidents, including first aid arrangements, emergency contacts, evacuation procedures, and incident reporting."
  },
  {
    id: 8,
    question: "For cable installation in an occupied building, which control measure is essential?",
    options: [
      "Working during office hours only",
      "Segregation, barriers, and dust control to protect occupants",
      "Using the fastest installation method",
      "Minimising documentation"
    ],
    correctAnswer: 1,
    explanation: "When working in occupied buildings, segregation barriers, dust control (e.g., dust sheets, extraction), and appropriate signage are essential to protect occupants from hazards and minimise disruption."
  },
  {
    id: 9,
    question: "What should happen if site conditions differ from those described in the method statement?",
    options: [
      "Continue work regardless",
      "Stop work, reassess, and update the method statement",
      "Complete work and update documentation later",
      "Ignore the differences"
    ],
    correctAnswer: 1,
    explanation: "If conditions differ from those documented, work should stop, a reassessment conducted, and the method statement updated before proceeding. Working outside the documented safe system creates uncontrolled risks."
  },
  {
    id: 10,
    question: "Which document typically accompanies a method statement when submitted to a principal contractor?",
    options: [
      "Company annual accounts",
      "Risk assessment (RAMS)",
      "Employee payroll records",
      "Marketing brochures"
    ],
    correctAnswer: 1,
    explanation: "Method statements are typically submitted alongside risk assessments as RAMS (Risk Assessment and Method Statement). Together they demonstrate the hazards identified and the controls that will be implemented."
  }
];

const faqs = [
  {
    question: "What is the difference between a method statement and a risk assessment?",
    answer: "A risk assessment identifies hazards and evaluates the level of risk, while a method statement describes the practical steps to carry out work safely. The risk assessment asks 'what could go wrong?', while the method statement answers 'how will we do this safely?'. Together they form RAMS - Risk Assessment and Method Statement."
  },
  {
    question: "How detailed should a method statement be?",
    answer: "A method statement should be detailed enough that someone unfamiliar with the specific task could understand how to complete it safely. It should cover all significant steps, hazards, and controls without being so lengthy that workers won't read it. Use clear, simple language and bullet points for readability."
  },
  {
    question: "Do I need a method statement for every task?",
    answer: "Not every minor task requires a formal method statement, but all work with significant risk should have documented safe systems of work. Principal contractors typically require method statements for any work involving electrical systems, working at height, hot works, confined spaces, or activities affecting building occupants."
  },
  {
    question: "Can I use a generic method statement template?",
    answer: "Templates provide a useful starting point, but method statements must be site-specific. Generic statements that aren't tailored to actual site conditions, specific hazards, and the actual work being done are insufficient. Always adapt templates to reflect the real working environment and task requirements."
  },
  {
    question: "How long should method statements be retained?",
    answer: "Method statements should be retained for at least the duration of the project plus the limitation period for civil claims (typically 6 years, or 12 years for contracts under seal). Many organisations retain safety documentation for longer. Digital storage makes long-term retention practical."
  },
  {
    question: "Who needs to read and sign the method statement?",
    answer: "All workers involved in the task should read (or have read to them) and sign the method statement before work begins. This confirms understanding and acceptance of the safe system of work. Supervisors should also sign to confirm the statement is adequate and workers have been briefed."
  }
];

const HNCModule1Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2">
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
            <span>Module 1.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Method Statements
          </h1>
          <p className="text-white/80">
            Documenting safe systems of work for building services installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Definition:</strong> Step-by-step safe work procedures</li>
              <li className="pl-1"><strong>Purpose:</strong> Document how tasks will be completed safely</li>
              <li className="pl-1"><strong>Content:</strong> Tasks, hazards, controls, responsibilities</li>
              <li className="pl-1"><strong>Legal basis:</strong> CDM 2015, HASAWA 1974, MHSWR 1999</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Isolation:</strong> Safe de-energisation procedures</li>
              <li className="pl-1"><strong>Installation:</strong> Cable routing, containment, terminations</li>
              <li className="pl-1"><strong>Commissioning:</strong> Testing, energisation, handover</li>
              <li className="pl-1"><strong>RAMS:</strong> Combined with risk assessments</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and legal requirements for method statements",
              "Identify essential content and format requirements",
              "Break down complex tasks into logical sequences",
              "Define appropriate control measures and responsibilities",
              "Include effective emergency procedures",
              "Apply method statement principles to building services work"
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

        {/* Section 1: Purpose and Scope */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose and Scope of Method Statements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A method statement is a document that describes how a task or process will be carried out
              safely. It provides a step-by-step guide that identifies hazards and specifies the control
              measures needed to manage risks throughout the work activity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key purposes of method statements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Document the safe system of work for specific tasks</li>
                <li className="pl-1">Communicate procedures to all workers involved</li>
                <li className="pl-1">Demonstrate competence to principal contractors and clients</li>
                <li className="pl-1">Provide a reference document during work execution</li>
                <li className="pl-1">Support training and induction of personnel</li>
                <li className="pl-1">Create an audit trail for compliance verification</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Framework</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Legislation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HASAWA 1974</td>
                      <td className="border border-white/10 px-3 py-2">Duty to provide safe systems of work (Section 2)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MHSWR 1999</td>
                      <td className="border border-white/10 px-3 py-2">Implement preventive and protective measures from risk assessments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CDM 2015</td>
                      <td className="border border-white/10 px-3 py-2">Contractors must plan, manage, and monitor work safely</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EAWR 1989</td>
                      <td className="border border-white/10 px-3 py-2">Safe systems for electrical work, especially Regulation 14</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RAMS - Risk Assessment and Method Statement</p>
              <p className="text-sm text-white">
                Method statements are typically combined with risk assessments to form RAMS. The risk assessment
                identifies <strong>what</strong> could go wrong, while the method statement describes <strong>how</strong>
                work will be done safely. Together they provide comprehensive documentation of hazard identification
                and control implementation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A method statement is not a substitute for proper training - it documents
              procedures for competent workers who have the skills to carry out the work safely.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Content and Format Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Content and Format Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An effective method statement follows a logical structure that covers all aspects of the
              work activity. While formats vary between organisations, certain elements are essential
              for comprehensive documentation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Content Elements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Header Information</td>
                      <td className="border border-white/10 px-3 py-2">Project name, location, date, revision number, author, approver</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Scope of Work</td>
                      <td className="border border-white/10 px-3 py-2">Clear description of what work is covered, boundaries, exclusions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Personnel</td>
                      <td className="border border-white/10 px-3 py-2">Roles, responsibilities, competence requirements, supervision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Equipment/Materials</td>
                      <td className="border border-white/10 px-3 py-2">Tools, PPE, materials, inspection requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Sequence of Operations</td>
                      <td className="border border-white/10 px-3 py-2">Step-by-step work instructions in logical order</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Hazards and Controls</td>
                      <td className="border border-white/10 px-3 py-2">Identified risks and specific control measures for each</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Emergency Procedures</td>
                      <td className="border border-white/10 px-3 py-2">First aid, emergency contacts, evacuation, incident reporting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Sign-off</td>
                      <td className="border border-white/10 px-3 py-2">Signatures confirming reading and understanding</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Format Best Practice</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use clear, simple language - avoid jargon</li>
                  <li className="pl-1">Number steps sequentially</li>
                  <li className="pl-1">Use bullet points for readability</li>
                  <li className="pl-1">Include diagrams where helpful</li>
                  <li className="pl-1">Keep to essential information</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Document Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Unique reference number</li>
                  <li className="pl-1">Version/revision tracking</li>
                  <li className="pl-1">Issue and review dates</li>
                  <li className="pl-1">Approval signatures</li>
                  <li className="pl-1">Distribution list if required</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> Method statements should be long enough to be comprehensive but short enough
              that workers will actually read them. Focus on the critical safety points.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Task Breakdown and Sequencing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Task Breakdown and Sequencing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Breaking work into logical steps is fundamental to effective method statements. Each step
              should be clearly defined, with associated hazards and controls identified. The sequence
              must reflect dependencies and ensure safe progression through the work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Principles of Task Breakdown</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Preparation phase:</strong> Site access, permits, equipment checks, isolation</li>
                <li className="pl-1"><strong>Execution phase:</strong> Main work activities in logical sequence</li>
                <li className="pl-1"><strong>Completion phase:</strong> Testing, reinstatement, handover, demobilisation</li>
                <li className="pl-1"><strong>Dependencies:</strong> Identify tasks that must complete before others begin</li>
                <li className="pl-1"><strong>Hold points:</strong> Stages requiring inspection or approval before proceeding</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: Cable Installation Task Sequence</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>1. Preparation</strong></p>
                <ul className="ml-4 space-y-1 list-disc list-outside">
                  <li>Obtain permit to work and confirm isolation</li>
                  <li>Review drawings and verify cable route</li>
                  <li>Inspect containment systems are complete</li>
                  <li>Check cable drums, tools, and PPE</li>
                </ul>
                <p className="mt-3"><strong>2. Installation</strong></p>
                <ul className="ml-4 space-y-1 list-disc list-outside">
                  <li>Position cable drums and pulling equipment</li>
                  <li>Feed cable through containment sections</li>
                  <li>Maintain bend radii per manufacturer specifications</li>
                  <li>Apply fire stopping at compartment penetrations</li>
                  <li>Label cables at both ends</li>
                </ul>
                <p className="mt-3"><strong>3. Completion</strong></p>
                <ul className="ml-4 space-y-1 list-disc list-outside">
                  <li>Conduct insulation resistance tests</li>
                  <li>Record test results</li>
                  <li>Clear work area and remove waste</li>
                  <li>Update as-built drawings</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Dependencies in Electrical Work</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Must Complete First</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Before This Can Start</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Isolation and lock-off</td>
                      <td className="border border-white/10 px-3 py-2">Any work on circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment installation</td>
                      <td className="border border-white/10 px-3 py-2">Cable pulling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable installation</td>
                      <td className="border border-white/10 px-3 py-2">Terminations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dead testing</td>
                      <td className="border border-white/10 px-3 py-2">Energisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Visual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Live testing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Never allow work to proceed beyond a dependency point until
              the prerequisite task is verified complete. Use hold points for critical transitions.
            </p>
          </div>
        </section>

        {/* Section 4: Control Measures and Responsibilities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Measures, Responsibilities and Emergency Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control measures translate the findings of risk assessments into practical actions. Each
              hazard identified must have corresponding controls specified in the method statement,
              following the hierarchy of controls.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Controls</p>
              <div className="space-y-2 text-sm">
                <div className="p-2 rounded bg-green-500/10 border-l-2 border-green-500">
                  <strong>1. Elimination</strong> - Remove the hazard entirely (most effective)
                </div>
                <div className="p-2 rounded bg-blue-500/10 border-l-2 border-blue-500">
                  <strong>2. Substitution</strong> - Replace with less hazardous alternative
                </div>
                <div className="p-2 rounded bg-purple-500/10 border-l-2 border-purple-500">
                  <strong>3. Engineering</strong> - Physical barriers, isolation, interlocks
                </div>
                <div className="p-2 rounded bg-yellow-500/10 border-l-2 border-yellow-500">
                  <strong>4. Administrative</strong> - Procedures, permits, training, signage
                </div>
                <div className="p-2 rounded bg-red-500/10 border-l-2 border-red-500">
                  <strong>5. PPE</strong> - Personal protective equipment (least effective alone)
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Control Measures for Electrical Work</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electric shock</td>
                      <td className="border border-white/10 px-3 py-2">Isolation, LOTO, proving dead, permit to work, insulated tools</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Arc flash</td>
                      <td className="border border-white/10 px-3 py-2">De-energise where possible, arc-rated PPE, approach boundaries</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Working at height</td>
                      <td className="border border-white/10 px-3 py-2">MEWP, scaffolding, edge protection, harness systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Manual handling</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical aids, team lifts, correct techniques, weight limits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dust/debris</td>
                      <td className="border border-white/10 px-3 py-2">Local exhaust ventilation, dust sheets, RPE, wet cutting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defining Responsibilities</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Site supervisor:</strong> Overall work coordination</li>
                  <li className="pl-1"><strong>Authorised person:</strong> Isolation control</li>
                  <li className="pl-1"><strong>Competent person:</strong> Task execution</li>
                  <li className="pl-1"><strong>First aider:</strong> Emergency response</li>
                  <li className="pl-1"><strong>All workers:</strong> Follow procedures, report issues</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Procedures Must Include</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Emergency contact numbers</li>
                  <li className="pl-1">Location of first aid facilities</li>
                  <li className="pl-1">Evacuation routes and assembly points</li>
                  <li className="pl-1">Electrical emergency isolation points</li>
                  <li className="pl-1">Incident reporting procedures</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Electrical Emergency Response</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electric shock:</strong> Isolate supply safely (do not touch victim until isolated), call 999, commence CPR if trained and required</li>
                <li className="pl-1"><strong>Electrical fire:</strong> Isolate supply if safe, evacuate area, use CO2 extinguisher only if trained and safe to do so</li>
                <li className="pl-1"><strong>Arc flash:</strong> Do not approach until supply confirmed isolated, treat burns, call emergency services</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Emergency procedures must be communicated to all workers before
              work begins, not buried in documentation that may not be read under stress.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services Method Statement Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Electrical Isolation Method Statement</h3>
              <div className="text-sm text-white space-y-3">
                <p><strong>Scope:</strong> Safe isolation of distribution board DB-L2-01 for circuit modifications</p>
                <div className="bg-black/30 p-3 rounded">
                  <p className="font-medium mb-2">Sequence of Operations:</p>
                  <ol className="list-decimal list-outside ml-5 space-y-1">
                    <li>Obtain permit to work from authorised person</li>
                    <li>Notify affected building users of planned isolation</li>
                    <li>Identify correct circuit(s) from drawings and labelling</li>
                    <li>Test voltage indicator on known live source (proving unit)</li>
                    <li>Switch off and lock off isolator with personal padlock</li>
                    <li>Attach danger tags with name, date, and contact details</li>
                    <li>Prove dead at point of work using approved voltage indicator</li>
                    <li>Re-test voltage indicator on known live source</li>
                    <li>Apply temporary earths if required for the work</li>
                    <li>Proceed with permitted work activities</li>
                  </ol>
                  <p className="mt-3 text-white/70"><strong>Key controls:</strong> LOTO procedure, proving dead sequence, permit system</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Cable Installation in Occupied Building</h3>
              <div className="text-sm text-white space-y-3">
                <p><strong>Scope:</strong> Installation of 3-core SWA submain through office areas</p>
                <div className="bg-black/30 p-3 rounded">
                  <p className="font-medium mb-2">Key Steps and Controls:</p>
                  <ul className="list-disc list-outside ml-5 space-y-1">
                    <li><strong>Access:</strong> Coordinate with building manager, work during low-occupancy periods</li>
                    <li><strong>Segregation:</strong> Erect barriers and signage around work areas</li>
                    <li><strong>Dust control:</strong> Use dust sheets, local extraction when core drilling</li>
                    <li><strong>Noise:</strong> Notify occupants, use low-noise tools where possible</li>
                    <li><strong>Cable handling:</strong> Use drum stands, winches; minimum 2-person team for heavy cables</li>
                    <li><strong>Fire stopping:</strong> Maintain compartmentation at all penetrations</li>
                    <li><strong>Testing:</strong> IR test before leaving each day to confirm no damage</li>
                    <li><strong>Housekeeping:</strong> Clear debris, secure cables, remove trip hazards at end of shift</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Commissioning Method Statement</h3>
              <div className="text-sm text-white space-y-3">
                <p><strong>Scope:</strong> Commissioning of new lighting installation in retail unit</p>
                <div className="bg-black/30 p-3 rounded">
                  <p className="font-medium mb-2">Commissioning Sequence:</p>
                  <ol className="list-decimal list-outside ml-5 space-y-1">
                    <li>Verify all dead testing complete and recorded (IR, continuity, polarity)</li>
                    <li>Visual inspection confirming installation matches design</li>
                    <li>Confirm area clear of personnel and tools before energisation</li>
                    <li>Energise circuit via RCD-protected supply</li>
                    <li>Verify correct operation of all luminaires</li>
                    <li>Test switching and dimming controls</li>
                    <li>Verify emergency lighting function (simulated mains failure)</li>
                    <li>Measure Zs values and confirm within design limits</li>
                    <li>RCD trip testing (within 40ms at I∆n)</li>
                    <li>Complete commissioning records and handover documentation</li>
                  </ol>
                  <p className="mt-3 text-white/70"><strong>Hold point:</strong> Energisation requires supervisor authorisation after dead test verification</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Writing Effective Method Statements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Visit the site before writing - understand actual conditions</li>
                <li className="pl-1">Involve workers who will do the job in the development</li>
                <li className="pl-1">Use active verbs: "isolate the supply" not "the supply should be isolated"</li>
                <li className="pl-1">Be specific about controls: "use 1100mm barriers" not "use barriers"</li>
                <li className="pl-1">Include photographs or diagrams for complex procedures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic statements:</strong> Not site-specific or task-specific</li>
                <li className="pl-1"><strong>Too lengthy:</strong> Workers won't read 20+ pages of text</li>
                <li className="pl-1"><strong>Missing sign-off:</strong> No evidence workers have read and understood</li>
                <li className="pl-1"><strong>Not updated:</strong> Conditions change but documents don't</li>
                <li className="pl-1"><strong>Vague controls:</strong> "Take appropriate precautions" is not a control</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Review and Update Triggers</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Site conditions differ from those documented</li>
                <li className="pl-1">Scope of work changes</li>
                <li className="pl-1">New hazards identified during work</li>
                <li className="pl-1">Near miss or incident occurs</li>
                <li className="pl-1">Regulatory or client requirements change</li>
                <li className="pl-1">Periodic review (typically annually for ongoing work)</li>
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
                <p className="font-medium text-white mb-1">Method Statement Essentials</p>
                <ul className="space-y-0.5">
                  <li>Header: project, date, author, revision</li>
                  <li>Scope: what work is covered</li>
                  <li>Sequence: step-by-step instructions</li>
                  <li>Controls: specific measures for each hazard</li>
                  <li>Sign-off: evidence of understanding</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legal Requirements</p>
                <ul className="space-y-0.5">
                  <li>HASAWA 1974 - safe systems of work</li>
                  <li>MHSWR 1999 - implement controls</li>
                  <li>CDM 2015 - plan, manage, monitor</li>
                  <li>EAWR 1989 - electrical safe systems</li>
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
            <Link to="../h-n-c-module1-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Risk Assessments
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2-5">
              Next: Section 2.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section2_4;
