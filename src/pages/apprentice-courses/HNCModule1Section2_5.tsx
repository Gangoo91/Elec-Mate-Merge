import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Systems of Work - HNC Module 1 Section 2.5";
const DESCRIPTION = "Comprehensive guide to developing, implementing and maintaining safe systems of work in building services engineering, including safe isolation procedures and permit-to-work systems.";

const quickCheckQuestions = [
  {
    id: "ssow-definition",
    question: "What is the primary purpose of a safe system of work?",
    options: [
      "To speed up work activities",
      "To identify hazards and implement controls to prevent harm",
      "To satisfy insurance requirements",
      "To reduce the number of workers needed"
    ],
    correctIndex: 1,
    explanation: "A safe system of work (SSOW) is a formal procedure resulting from systematic examination of a task to identify all the hazards and implement controls to eliminate or minimise the risk of harm."
  },
  {
    id: "hierarchy-controls",
    question: "According to the hierarchy of controls, what should be considered first when managing risks?",
    options: [
      "Personal protective equipment",
      "Administrative controls",
      "Elimination of the hazard",
      "Engineering controls"
    ],
    correctIndex: 2,
    explanation: "The hierarchy of controls prioritises elimination first, followed by substitution, engineering controls, administrative controls, and finally PPE as the last resort."
  },
  {
    id: "permit-work",
    question: "When is a permit-to-work system typically required?",
    options: [
      "For all routine maintenance tasks",
      "For high-risk activities like live working or confined space entry",
      "Only when working in office environments",
      "Whenever more than two people are working together"
    ],
    correctIndex: 1,
    explanation: "Permit-to-work systems are formal documented procedures required for high-risk activities including live electrical work, confined space entry, hot work, and work at height."
  },
  {
    id: "safe-isolation",
    question: "What is the correct sequence for safe isolation of electrical supplies?",
    options: [
      "Isolate - Lock off - Test - Post warning notices",
      "Test - Isolate - Lock off - Post warning notices",
      "Identify - Isolate - Lock off - Prove dead - Post warning notices",
      "Post warning notices - Isolate - Test"
    ],
    correctIndex: 2,
    explanation: "The correct safe isolation procedure is: Identify the circuit, Isolate at the point of supply, Lock off with personal lock, Prove dead using approved voltage indicator (tested before and after), then Post warning notices."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under which legislation are employers required to provide safe systems of work?",
    options: [
      "The Electricity at Work Regulations 1989 only",
      "The Health and Safety at Work etc. Act 1974",
      "The Building Regulations 2010",
      "BS 7671 Requirements for Electrical Installations"
    ],
    correctAnswer: 1,
    explanation: "The Health and Safety at Work etc. Act 1974 Section 2 requires employers to provide and maintain safe systems of work so far as is reasonably practicable. This is supported by specific regulations like MHSWR 1999."
  },
  {
    id: 2,
    question: "What does the acronym SSOW stand for?",
    options: [
      "Safe Standard Operating Work",
      "Safety Systems of Work",
      "Safe System of Work",
      "Systematic Safety Operating Workflow"
    ],
    correctAnswer: 2,
    explanation: "SSOW stands for Safe System of Work - a formal procedure resulting from systematic examination of a task to identify hazards and implement control measures."
  },
  {
    id: 3,
    question: "Which of the following is NOT typically part of developing a safe system of work?",
    options: [
      "Task analysis and hazard identification",
      "Risk assessment and control selection",
      "Setting productivity targets",
      "Communication and training requirements"
    ],
    correctAnswer: 2,
    explanation: "Setting productivity targets is not part of developing a SSOW. The focus is on task analysis, hazard identification, risk assessment, selecting controls, and ensuring effective communication and training."
  },
  {
    id: 4,
    question: "In the hierarchy of controls, where does PPE (Personal Protective Equipment) sit?",
    options: [
      "First priority - always use PPE",
      "Second priority after elimination",
      "Equal priority with engineering controls",
      "Last resort when other controls are not reasonably practicable"
    ],
    correctAnswer: 3,
    explanation: "PPE is the last resort in the hierarchy of controls. More effective measures (elimination, substitution, engineering controls, administrative controls) should be considered first as PPE only protects the individual wearer."
  },
  {
    id: 5,
    question: "What is the main purpose of a permit-to-work system?",
    options: [
      "To satisfy regulatory paperwork requirements",
      "To record time spent on tasks",
      "To provide formal control for high-risk activities and ensure all precautions are taken",
      "To allocate work to contractors"
    ],
    correctAnswer: 2,
    explanation: "A permit-to-work system provides formal documented control for high-risk activities, ensuring all necessary precautions are identified, implemented and verified before work begins, with clear handover and sign-off procedures."
  },
  {
    id: 6,
    question: "Before testing a circuit dead, the voltage indicator must be:",
    options: [
      "Calibrated within the last 6 months",
      "Proved on a known live source before AND after use",
      "Of the same make as the installation",
      "Used only by a qualified electrician"
    ],
    correctAnswer: 1,
    explanation: "GS38 requires voltage indicators to be proved on a known live source immediately before and immediately after testing the circuit to confirm the instrument is working correctly throughout the test procedure."
  },
  {
    id: 7,
    question: "Who should hold the key to a personal safety lock during safe isolation?",
    options: [
      "The site supervisor",
      "The person who applied the lock",
      "The client or building owner",
      "The electrical contractor's office"
    ],
    correctAnswer: 1,
    explanation: "The person working on the isolated circuit must retain the key to their personal safety lock. This ensures only they can remove it when their work is complete and it's safe to re-energise."
  },
  {
    id: 8,
    question: "Which standard provides guidance on safe isolation procedures in the UK?",
    options: [
      "BS 7671 only",
      "HSE Guidance Note GS38",
      "Building Regulations Part P",
      "CIBSE Guide A"
    ],
    correctAnswer: 1,
    explanation: "HSE Guidance Note GS38 'Electrical test equipment for use on low voltage electrical systems' provides detailed guidance on safe isolation procedures and the equipment required."
  },
  {
    id: 9,
    question: "What should happen when a SSOW is found to be ineffective?",
    options: [
      "Continue working and report at the end of the day",
      "Stop work, report the issue and review/revise the system",
      "Increase supervision levels",
      "Reduce the scope of work"
    ],
    correctAnswer: 1,
    explanation: "If a SSOW is found ineffective, work should stop immediately and the issue reported. The system must be reviewed and revised before work continues. This is part of the continuous improvement cycle."
  },
  {
    id: 10,
    question: "For electrical work, what does 'dead working' refer to?",
    options: [
      "Working on circuits that have been safely isolated and proved dead",
      "Working in areas with no electrical supply",
      "Emergency work following an incident",
      "Working outside normal hours"
    ],
    correctAnswer: 0,
    explanation: "Dead working means working on electrical systems that have been safely isolated and proved dead using approved test equipment. It is the preferred method as it eliminates the risk of electric shock."
  },
  {
    id: 11,
    question: "How often should safe systems of work be reviewed?",
    options: [
      "Only when an accident occurs",
      "Annually as a minimum",
      "Regularly, after incidents, and when circumstances change",
      "Every five years"
    ],
    correctAnswer: 2,
    explanation: "SSOW should be reviewed regularly as part of a planned schedule, after any incidents or near misses, when work methods or equipment change, and when new hazards are identified."
  },
  {
    id: 12,
    question: "What is the purpose of a 'toolbox talk' in relation to safe systems of work?",
    options: [
      "To check that workers have the correct tools",
      "To communicate specific safety information before work begins",
      "To issue new PPE",
      "To record attendance on site"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are short, focused safety briefings used to communicate specific hazards, control measures and safe working procedures to the workforce before they start a particular task or shift."
  }
];

const faqs = [
  {
    question: "What is the difference between a safe system of work and a method statement?",
    answer: "A safe system of work (SSOW) is the overall formal procedure for carrying out work safely, developed from risk assessment. A method statement is a detailed written document describing how specific work will be carried out step-by-step, including the SSOW elements. Method statements are often required by principal contractors and form part of the SSOW documentation."
  },
  {
    question: "When can live electrical work be justified?",
    answer: "Live working should only be undertaken when it is unreasonable in all circumstances for the conductor to be dead (Regulation 14, Electricity at Work Regulations 1989). This might include essential diagnostic testing, or where isolation would cause unacceptable consequences. Even then, suitable precautions must be taken, competent persons must do the work, and a permit-to-work system should be used."
  },
  {
    question: "Who is responsible for ensuring safe systems of work are followed?",
    answer: "Employers have overall responsibility for providing SSOW under HASAWA 1974. However, supervisors must ensure systems are followed, and employees have a duty under Section 7 to cooperate with safety arrangements. In building services, this extends through the contracting chain - principal contractors, contractors and subcontractors all have responsibilities."
  },
  {
    question: "What should I do if I discover a hazard not covered by the existing SSOW?",
    answer: "Stop work immediately if there is imminent danger. Report the hazard to your supervisor and record it. The SSOW and risk assessment must be reviewed and updated before work continues. This 'stop the job' authority is essential for maintaining safety and should be supported by management."
  },
  {
    question: "How detailed should a safe system of work be?",
    answer: "The level of detail should be proportionate to the risk. Higher risk activities require more detailed, prescriptive procedures. For routine low-risk tasks, a brief SSOW may suffice. The key is that workers can understand and follow the system, and that all significant hazards and controls are addressed. Complex tasks may need separate method statements for each phase."
  },
  {
    question: "What training is required for safe isolation procedures?",
    answer: "All persons who isolate electrical equipment must be trained and competent in safe isolation procedures. This includes understanding GS38 requirements, correct use of approved voltage indicators and proving units, lock-off procedures, and the importance of verifying isolation. Training should be refreshed periodically and documented."
  }
];

const HNCModule1Section2_5 = () => {
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

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Systems of Work
          </h1>
          <p className="text-white/80">
            Developing, implementing and maintaining formal procedures to protect people from workplace hazards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>SSOW:</strong> Formal procedure from systematic hazard examination</li>
              <li className="pl-1"><strong>Legal basis:</strong> Required under HASAWA 1974 Section 2</li>
              <li className="pl-1"><strong>Five stages:</strong> Assess, design, implement, monitor, review</li>
              <li className="pl-1"><strong>Key examples:</strong> Safe isolation, permit-to-work systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical:</strong> Safe isolation per GS38</li>
              <li className="pl-1"><strong>Mechanical:</strong> LOTO for rotating plant</li>
              <li className="pl-1"><strong>Permits:</strong> Hot work, confined spaces, high voltage</li>
              <li className="pl-1"><strong>Documentation:</strong> Method statements, risk assessments</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define safe systems of work and explain their legal basis",
              "Describe the process for developing an effective SSOW",
              "Apply the hierarchy of controls to hazard management",
              "Explain permit-to-work systems and when they are required",
              "Demonstrate safe isolation procedures for electrical work",
              "Understand monitoring, supervision and review requirements"
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

        {/* Section 1: Definition and Legal Basis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Definition and Legal Basis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A safe system of work (SSOW) is a formal procedure which results from systematic examination
              of a task in order to identify all the hazards and implement control measures to eliminate or
              minimise the risk of harm. It defines how work should be carried out safely.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Legal requirements for SSOW:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HASAWA 1974 Section 2(2)(a):</strong> Duty to provide and maintain safe systems of work</li>
                <li className="pl-1"><strong>MHSWR 1999 Regulation 3:</strong> Risk assessment requirement - foundation of all SSOW</li>
                <li className="pl-1"><strong>MHSWR 1999 Regulation 4:</strong> Implement preventive and protective measures from assessment</li>
                <li className="pl-1"><strong>EAW 1989 Regulation 4:</strong> Systems of work to prevent electrical danger</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Elements of a Safe System of Work</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Task analysis</td>
                      <td className="border border-white/10 px-3 py-2">Break down work into steps</td>
                      <td className="border border-white/10 px-3 py-2">Each stage of cable installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hazard identification</td>
                      <td className="border border-white/10 px-3 py-2">Find things that could cause harm</td>
                      <td className="border border-white/10 px-3 py-2">Live conductors, work at height</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Risk evaluation</td>
                      <td className="border border-white/10 px-3 py-2">Assess likelihood and severity</td>
                      <td className="border border-white/10 px-3 py-2">High risk = live HV work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control measures</td>
                      <td className="border border-white/10 px-3 py-2">Actions to reduce risk</td>
                      <td className="border border-white/10 px-3 py-2">Isolation, PPE, barriers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safe procedures</td>
                      <td className="border border-white/10 px-3 py-2">Step-by-step safe method</td>
                      <td className="border border-white/10 px-3 py-2">Isolation sequence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Competent persons</td>
                      <td className="border border-white/10 px-3 py-2">Trained, qualified workers</td>
                      <td className="border border-white/10 px-3 py-2">Authorised persons for HV</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A SSOW is only effective if it is communicated, understood, and followed. Documentation alone does not create safety.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Development Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Development Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Developing an effective safe system of work requires systematic analysis of the task,
              identification of hazards, and selection of appropriate controls using the hierarchy of controls.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Five-Stage Development Process</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Stage 1: Task Analysis</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Break the job into individual steps or phases</li>
                    <li className="pl-1">Consider the sequence of operations</li>
                    <li className="pl-1">Identify the people, plant, materials and environment involved</li>
                    <li className="pl-1">Note any interfaces with other work activities</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Stage 2: Hazard Identification</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">For each step, identify what could cause harm</li>
                    <li className="pl-1">Consider physical, chemical, biological, ergonomic and psychological hazards</li>
                    <li className="pl-1">Review incident history and industry guidance</li>
                    <li className="pl-1">Consult with workers who do the task</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Stage 3: Risk Evaluation</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Assess likelihood of harm occurring</li>
                    <li className="pl-1">Evaluate potential severity of harm</li>
                    <li className="pl-1">Consider who might be affected and how</li>
                    <li className="pl-1">Prioritise risks requiring control measures</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Stage 4: Control Selection (Hierarchy)</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Eliminate:</strong> Remove the hazard entirely</li>
                    <li className="pl-1"><strong>Substitute:</strong> Replace with less hazardous alternative</li>
                    <li className="pl-1"><strong>Engineering:</strong> Physical controls (guards, ventilation, isolation)</li>
                    <li className="pl-1"><strong>Administrative:</strong> Procedures, training, signage, supervision</li>
                    <li className="pl-1"><strong>PPE:</strong> Last resort - personal protective equipment</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Stage 5: Documentation</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Record the SSOW in appropriate format</li>
                    <li className="pl-1">Include risk assessment, method statement, permits if required</li>
                    <li className="pl-1">Specify competency requirements</li>
                    <li className="pl-1">Define monitoring and review arrangements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Controls</p>
              <div className="relative">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">1</div>
                    <div className="flex-1 p-2 rounded bg-green-500/10 border border-green-500/30">
                      <p className="text-sm font-medium text-green-400">Eliminate - Most effective</p>
                      <p className="text-xs text-white/70">Remove the hazard completely</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-lime-500/20 flex items-center justify-center text-lime-400 font-bold text-sm">2</div>
                    <div className="flex-1 p-2 rounded bg-lime-500/10 border border-lime-500/30">
                      <p className="text-sm font-medium text-lime-400">Substitute</p>
                      <p className="text-xs text-white/70">Replace with less hazardous alternative</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-sm">3</div>
                    <div className="flex-1 p-2 rounded bg-yellow-500/10 border border-yellow-500/30">
                      <p className="text-sm font-medium text-yellow-400">Engineering Controls</p>
                      <p className="text-xs text-white/70">Isolate people from the hazard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">4</div>
                    <div className="flex-1 p-2 rounded bg-orange-500/10 border border-orange-500/30">
                      <p className="text-sm font-medium text-orange-400">Administrative Controls</p>
                      <p className="text-xs text-white/70">Change the way people work</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">5</div>
                    <div className="flex-1 p-2 rounded bg-red-500/10 border border-red-500/30">
                      <p className="text-sm font-medium text-red-400">PPE - Last resort</p>
                      <p className="text-xs text-white/70">Protect the individual worker</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Always start at the top of the hierarchy. Only move down when higher-level controls are not reasonably practicable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Implementation and Communication */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Implementation and Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A safe system of work is only effective if it is properly implemented, communicated to all
              relevant persons, and actively followed. This requires clear documentation, effective training,
              and ongoing supervision.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Risk assessment:</strong> Record significant findings</li>
                  <li className="pl-1"><strong>Method statement:</strong> Step-by-step procedure</li>
                  <li className="pl-1"><strong>Permits:</strong> For high-risk activities</li>
                  <li className="pl-1"><strong>Training records:</strong> Competency evidence</li>
                  <li className="pl-1"><strong>Briefing records:</strong> Who was informed</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Induction:</strong> Site-specific hazards and rules</li>
                  <li className="pl-1"><strong>Toolbox talks:</strong> Task-specific briefings</li>
                  <li className="pl-1"><strong>Written procedures:</strong> Accessible on site</li>
                  <li className="pl-1"><strong>Signage:</strong> Warnings and instructions</li>
                  <li className="pl-1"><strong>Supervision:</strong> Ongoing guidance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Toolbox Talks - Effective Briefings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scope of work</td>
                      <td className="border border-white/10 px-3 py-2">What task is being done, where, and when</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hazards</td>
                      <td className="border border-white/10 px-3 py-2">Specific dangers for this task/location</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controls</td>
                      <td className="border border-white/10 px-3 py-2">Measures in place and required actions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PPE</td>
                      <td className="border border-white/10 px-3 py-2">Required equipment and standards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency</td>
                      <td className="border border-white/10 px-3 py-2">What to do if things go wrong</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Questions</td>
                      <td className="border border-white/10 px-3 py-2">Opportunity to clarify and raise concerns</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Critical Success Factors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Management commitment and visible leadership</li>
                <li className="pl-1">Worker involvement in developing systems</li>
                <li className="pl-1">Clear, understandable documentation</li>
                <li className="pl-1">Adequate resources (time, equipment, training)</li>
                <li className="pl-1">Positive safety culture that encourages reporting</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Workers who help develop SSOW are more likely to understand and follow them. Consultation is not just a legal requirement - it improves safety outcomes.
            </p>
          </div>
        </section>

        {/* Section 4: Monitoring, Supervision and Review */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Monitoring, Supervision and Review
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective monitoring ensures safe systems of work are being followed, while regular review
              ensures they remain effective as circumstances change. This is the 'check' and 'act' part
              of the Plan-Do-Check-Act safety management cycle.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Monitoring</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Active (Proactive) Monitoring</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Regular safety tours and inspections</li>
                    <li className="pl-1">Observations of work practices</li>
                    <li className="pl-1">Checking equipment and PPE</li>
                    <li className="pl-1">Reviewing documentation compliance</li>
                    <li className="pl-1">Auditing against standards</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Reactive Monitoring</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Investigating accidents and incidents</li>
                    <li className="pl-1">Analysing near-miss reports</li>
                    <li className="pl-1">Reviewing ill-health records</li>
                    <li className="pl-1">Tracking enforcement actions</li>
                    <li className="pl-1">Learning from complaints</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Review Safe Systems of Work</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Regularly:</strong> As part of a planned review schedule (at least annually)</li>
                <li className="pl-1"><strong>After incidents:</strong> Following accidents, near misses, or dangerous occurrences</li>
                <li className="pl-1"><strong>When circumstances change:</strong> New equipment, processes, or personnel</li>
                <li className="pl-1"><strong>When new hazards identified:</strong> Previously unknown risks emerge</li>
                <li className="pl-1"><strong>When legislation changes:</strong> New legal requirements or guidance</li>
                <li className="pl-1"><strong>When monitoring shows deficiencies:</strong> Systems not being followed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supervision Requirements</p>
              <p className="text-sm text-white mb-3">
                The level of supervision required depends on the risk level and worker competence:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Situation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supervision Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-risk task, new worker</td>
                      <td className="border border-white/10 px-3 py-2">Constant, direct supervision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-risk task, experienced worker</td>
                      <td className="border border-white/10 px-3 py-2">Regular checks, immediate availability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low-risk task, competent worker</td>
                      <td className="border border-white/10 px-3 py-2">Periodic monitoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Permit-controlled work</td>
                      <td className="border border-white/10 px-3 py-2">As specified in permit conditions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Continuous improvement:</strong> Review outcomes should feed back into revised risk assessments and updated safe systems of work. Safety is a cycle, not a one-time activity.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Building Services SSOW Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Building Services SSOW Examples</h2>

          <div className="space-y-6">
            {/* Safe Isolation */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Safe Isolation Procedure (GS38)</h3>
              <p className="text-sm text-white mb-4">
                Safe isolation is the fundamental SSOW for electrical work. It ensures conductors are dead
                before work begins and cannot be re-energised during work.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-2 rounded bg-black/30">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">1</div>
                  <div>
                    <p className="text-sm font-medium text-white">Identify</p>
                    <p className="text-xs text-white/70">Identify the circuit to be worked on from drawings, labels and tracing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded bg-black/30">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">2</div>
                  <div>
                    <p className="text-sm font-medium text-white">Isolate</p>
                    <p className="text-xs text-white/70">Switch off at the point of supply using suitable means of isolation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded bg-black/30">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">3</div>
                  <div>
                    <p className="text-sm font-medium text-white">Lock Off</p>
                    <p className="text-xs text-white/70">Secure isolation with personal safety lock - keep the key on your person</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded bg-black/30">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">4</div>
                  <div>
                    <p className="text-sm font-medium text-white">Prove Dead</p>
                    <p className="text-xs text-white/70">Test with approved voltage indicator (proved on known live source before AND after)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded bg-black/30">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-xs flex-shrink-0">5</div>
                  <div>
                    <p className="text-sm font-medium text-white">Post Warning Notices</p>
                    <p className="text-xs text-white/70">Display 'Danger - Do Not Switch On' signs at isolation point</p>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />

            {/* Permit-to-Work */}
            <div className="p-4 rounded-lg bg-white/5 mt-6">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Permit-to-Work Systems</h3>
              <p className="text-sm text-white mb-4">
                Permit-to-work (PTW) systems are formal documented procedures for controlling high-risk activities.
                They ensure all necessary precautions are taken before work begins.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Permit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical (HV)</td>
                      <td className="border border-white/10 px-3 py-2">Work on high voltage systems</td>
                      <td className="border border-white/10 px-3 py-2">Isolation, earthing, access control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hot Work</td>
                      <td className="border border-white/10 px-3 py-2">Welding, cutting, brazing</td>
                      <td className="border border-white/10 px-3 py-2">Fire watch, removal of combustibles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Confined Space</td>
                      <td className="border border-white/10 px-3 py-2">Entry to tanks, ducts, chambers</td>
                      <td className="border border-white/10 px-3 py-2">Atmosphere testing, rescue plan</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Excavation</td>
                      <td className="border border-white/10 px-3 py-2">Groundwork near services</td>
                      <td className="border border-white/10 px-3 py-2">Service location, shoring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Breaking Containment</td>
                      <td className="border border-white/10 px-3 py-2">Opening pressurised systems</td>
                      <td className="border border-white/10 px-3 py-2">Depressurisation, drainage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 rounded bg-black/30">
                <p className="text-xs font-medium text-white mb-2">Essential PTW Elements:</p>
                <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Clear description of work to be done and location</li>
                  <li className="pl-1">Time limits (start/finish, shift handover procedures)</li>
                  <li className="pl-1">Hazards identified and precautions required</li>
                  <li className="pl-1">Isolation details and testing requirements</li>
                  <li className="pl-1">PPE and equipment requirements</li>
                  <li className="pl-1">Emergency procedures and contacts</li>
                  <li className="pl-1">Signatures: issue, receipt, clearance, cancellation</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />

            {/* LOTO */}
            <div className="p-4 rounded-lg bg-white/5 mt-6">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Lock-Out Tag-Out (LOTO) for Mechanical Systems</h3>
              <p className="text-sm text-white mb-4">
                LOTO procedures apply to mechanical systems with stored energy (rotating plant, hydraulics,
                pneumatics) as well as electrical systems. The principles are similar to electrical safe isolation.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Energy Sources to Isolate</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Electrical supply</li>
                    <li className="pl-1">Pneumatic (compressed air)</li>
                    <li className="pl-1">Hydraulic (pressurised fluid)</li>
                    <li className="pl-1">Mechanical (springs, flywheels)</li>
                    <li className="pl-1">Thermal (steam, hot surfaces)</li>
                    <li className="pl-1">Gravitational (suspended loads)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">LOTO Key Points</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Each worker applies own lock</li>
                    <li className="pl-1">Tags identify lock owner and purpose</li>
                    <li className="pl-1">All energy sources must be addressed</li>
                    <li className="pl-1">Stored energy must be dissipated</li>
                    <li className="pl-1">Verify isolation before work begins</li>
                    <li className="pl-1">Only lock owner removes their lock</li>
                  </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">SSOW Development Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Task broken down into logical steps</li>
                <li className="pl-1">All foreseeable hazards identified</li>
                <li className="pl-1">Risks evaluated using consistent methodology</li>
                <li className="pl-1">Controls selected using hierarchy approach</li>
                <li className="pl-1">Competency requirements defined</li>
                <li className="pl-1">Equipment and PPE specified</li>
                <li className="pl-1">Emergency procedures included</li>
                <li className="pl-1">Review triggers identified</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Legislation and Guidance</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HASAWA 1974:</strong> Section 2 - safe systems of work requirement</li>
                <li className="pl-1"><strong>MHSWR 1999:</strong> Regulations 3, 4, 5 - risk assessment and controls</li>
                <li className="pl-1"><strong>EAW 1989:</strong> Regulations 4, 12, 13, 14 - electrical safety</li>
                <li className="pl-1"><strong>GS38:</strong> Electrical test equipment and safe isolation</li>
                <li className="pl-1"><strong>HSG65:</strong> Managing for health and safety</li>
                <li className="pl-1"><strong>HSG250:</strong> Guidance on permit-to-work systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Failures to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic SSOW:</strong> Not tailored to specific task and location</li>
                <li className="pl-1"><strong>No worker consultation:</strong> Systems imposed without input</li>
                <li className="pl-1"><strong>Inadequate communication:</strong> Workers unaware of requirements</li>
                <li className="pl-1"><strong>No monitoring:</strong> Systems exist on paper only</li>
                <li className="pl-1"><strong>Static documents:</strong> Never reviewed or updated</li>
                <li className="pl-1"><strong>Complexity:</strong> Procedures too complicated to follow</li>
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
                <p className="font-medium text-white mb-1">SSOW Development</p>
                <ul className="space-y-0.5">
                  <li>1. Task analysis - break down the work</li>
                  <li>2. Hazard identification - what can cause harm</li>
                  <li>3. Risk evaluation - likelihood × severity</li>
                  <li>4. Control selection - hierarchy approach</li>
                  <li>5. Documentation - record significant findings</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safe Isolation Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify circuit correctly</li>
                  <li>2. Isolate at point of supply</li>
                  <li>3. Lock off with personal lock</li>
                  <li>4. Prove dead (test before AND after)</li>
                  <li>5. Post warning notices</li>
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
            <Link to="../h-n-c-module1-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2.4
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section2-6">
              Next: Section 2.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section2_5;
