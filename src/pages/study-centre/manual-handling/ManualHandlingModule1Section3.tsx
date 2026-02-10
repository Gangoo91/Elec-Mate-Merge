import { ArrowLeft, ClipboardCheck, CheckCircle, AlertTriangle, Search, FileText, Grid3X3, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-tile-meaning",
    question: "What does the acronym TILE stand for in the context of manual handling risk assessment?",
    options: [
      "Training, Instruction, Lifting, Equipment",
      "Task, Individual, Load, Environment",
      "Time, Intensity, Location, Effort",
      "Technique, Inspection, Limit, Evaluation"
    ],
    correctIndex: 1,
    explanation: "TILE stands for Task, Individual, Load, and Environment. These are the four categories of risk factor that must be considered when carrying out a manual handling risk assessment under the MHOR 1992. The TILE framework is derived from Schedule 1 of the regulations."
  },
  {
    id: "mh-five-steps",
    question: "What is the first step in the HSE's five-step risk assessment process?",
    options: [
      "Decide who might be harmed and how",
      "Identify the hazards",
      "Record your findings",
      "Evaluate the risks and decide on precautions"
    ],
    correctIndex: 1,
    explanation: "The first step in the HSE's five-step risk assessment process is to identify the hazards. For manual handling, this means identifying all tasks that involve transporting or supporting a load by hand or bodily force. Only after hazards have been identified can you move on to evaluating who is at risk and what controls are needed."
  },
  {
    id: "mh-mac-tool",
    question: "What is the HSE MAC tool used for?",
    options: [
      "Measuring the maximum allowable capacity of a hoist",
      "Assessing the risk of manual handling tasks using a colour-coded scoring system",
      "Calculating the minimum number of workers needed for a team lift",
      "Testing whether a load exceeds the legal weight limit"
    ],
    correctIndex: 1,
    explanation: "The HSE Manual Handling Assessment Charts (MAC) tool is a risk assessment method that uses a colour-coded scoring system (green, amber, red, purple) to assess the risk level of lifting, carrying, and team handling operations. It helps identify high-risk tasks and prioritise improvements."
  }
];

const faqs = [
  {
    question: "Do I need to carry out a written risk assessment for every manual handling task?",
    answer: "The regulations require a 'suitable and sufficient' assessment for any manual handling operation that involves a risk of injury. For low-risk, routine tasks (such as picking up a lightweight tool bag from a bench), a brief mental assessment may suffice. However, for tasks involving heavier loads, awkward postures, repetitive handling, or hazardous environments, a formal written assessment is strongly recommended and may be legally required. If you employ five or more people, you must record the significant findings of your risk assessments in writing. As a practical rule, if there is any doubt about whether a task is low-risk, carry out and record a formal assessment."
  },
  {
    question: "How often should manual handling risk assessments be reviewed?",
    answer: "Risk assessments must be reviewed whenever there is reason to suspect they are no longer valid — for example, if the task changes, new equipment is introduced, a different type of load is handled, the working environment changes, or an injury or near miss occurs. Even if nothing changes, it is good practice to review assessments at regular intervals (typically annually). On construction sites, where conditions change frequently, assessments may need to be reviewed daily or weekly."
  },
  {
    question: "What is the difference between the TILE framework and the MAC tool?",
    answer: "The TILE framework (Task, Individual, Load, Environment) is a structured approach to identifying and categorising manual handling risk factors. It is derived from Schedule 1 of the MHOR 1992 and provides the framework for any manual handling assessment. The MAC tool (Manual Handling Assessment Charts) is a specific assessment method developed by the HSE that uses a colour-coded scoring system to quantify the risk level of lifting, carrying, and team handling operations. The MAC tool applies TILE principles in a standardised, semi-quantitative format. Think of TILE as the 'what to look at' and MAC as 'how to score it'."
  },
  {
    question: "Can I use the MAC tool for all manual handling tasks?",
    answer: "The MAC tool is designed for three specific types of manual handling operation: lifting operations, carrying operations, and team handling operations. It is most effective for tasks that are relatively straightforward and repetitive. For more complex operations — such as pushing and pulling, repetitive upper limb tasks, or handling in unusual environments — the HSE recommends using additional tools such as the RAPP (Risk Assessment of Pushing and Pulling) tool or the ART (Assessment of Repetitive Tasks) tool. For highly complex or unusual tasks, a full ergonomic assessment by a competent specialist may be needed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The TILE framework for manual handling risk assessment stands for:",
    options: [
      "Training, Instruction, Lifting, Equipment",
      "Task, Individual, Load, Environment",
      "Technique, Inspection, Limit, Evaluation",
      "Time, Impact, Load, Exposure"
    ],
    correctAnswer: 1,
    explanation: "TILE stands for Task, Individual, Load, and Environment — the four categories of risk factor that must be assessed for every manual handling operation."
  },
  {
    id: 2,
    question: "Under the 'Task' element of TILE, which of the following would be a risk factor?",
    options: [
      "The load weighs 30 kg",
      "The task involves twisting the trunk while lifting",
      "The worker has a pre-existing back condition",
      "The floor surface is wet and slippery"
    ],
    correctAnswer: 1,
    explanation: "Twisting the trunk while lifting is a Task risk factor — it relates to what is being done (the physical demands and movements involved). The load weight is a Load factor, the pre-existing condition is an Individual factor, and the wet floor is an Environment factor."
  },
  {
    id: 3,
    question: "Under the 'Individual' element of TILE, which of the following should be considered?",
    options: [
      "Whether the load has handles",
      "Whether the floor is level",
      "Whether the worker is pregnant, has a health condition, or lacks training",
      "Whether the task involves repetitive lifting"
    ],
    correctAnswer: 2,
    explanation: "The Individual element considers factors specific to the person carrying out the task — including pregnancy, health conditions, physical capability, age, experience, fatigue, and whether they have received appropriate training."
  },
  {
    id: 4,
    question: "The HSE's five-step risk assessment process is, in order:",
    options: [
      "Record findings, identify hazards, evaluate risks, decide who is harmed, review",
      "Identify hazards, decide who might be harmed, evaluate risks, record findings, review",
      "Evaluate risks, identify hazards, record findings, decide who is harmed, review",
      "Decide who is harmed, identify hazards, evaluate risks, review, record findings"
    ],
    correctAnswer: 1,
    explanation: "The HSE's five-step process is: (1) Identify the hazards; (2) Decide who might be harmed and how; (3) Evaluate the risks and decide on precautions; (4) Record your significant findings; (5) Review your assessment and update if necessary."
  },
  {
    id: 5,
    question: "In the HSE MAC tool, a RED colour code indicates:",
    options: [
      "Low risk — no action needed",
      "Medium risk — examine the task more closely",
      "High risk — prompt action is needed to reduce risk",
      "Very high risk — the task must be stopped immediately"
    ],
    correctAnswer: 2,
    explanation: "In the MAC tool, RED indicates a high level of risk and that prompt action is needed to reduce the risk. GREEN indicates low risk, AMBER indicates medium risk requiring closer examination, and PURPLE indicates very high risk requiring immediate action."
  },
  {
    id: 6,
    question: "Which of the following is an 'Environment' risk factor under TILE?",
    options: [
      "The load is bulky and difficult to grip",
      "The worker has not received manual handling training",
      "The task requires reaching above shoulder height",
      "The workspace is confined with limited room to manoeuvre"
    ],
    correctAnswer: 3,
    explanation: "A confined workspace with limited room to manoeuvre is an Environment risk factor — it relates to where the task is being carried out. Space constraints force workers into awkward postures and limit their ability to use proper lifting techniques."
  },
  {
    id: 7,
    question: "When must a manual handling risk assessment be reviewed?",
    options: [
      "Only when the HSE conducts an inspection",
      "Every 5 years as a legal requirement",
      "When there is reason to believe it is no longer valid, or when conditions change",
      "Only after an accident has occurred"
    ],
    correctAnswer: 2,
    explanation: "Regulation 4(2) of the MHOR 1992 requires employers to review assessments whenever there is reason to suspect they are no longer valid — for example, when the task changes, a new type of load is introduced, the environment changes, or an injury or near miss occurs."
  },
  {
    id: 8,
    question: "The HSE guideline filter figure for a man lifting a load close to the body at waist height is:",
    options: [
      "15 kg",
      "20 kg",
      "25 kg",
      "30 kg"
    ],
    correctAnswer: 2,
    explanation: "The HSE guideline filter figure for a man lifting a load close to the body, at waist height (between knuckle and elbow height), is 25 kg. This is NOT a legal limit — it is a filter to help identify tasks that need a detailed risk assessment. The actual safe weight depends on all the TILE factors."
  }
];

export default function ManualHandlingModule1Section3() {
  useSEO({
    title: "Manual Handling Risk Assessment | Manual Handling Module 1.3",
    description: "TILE framework, five-step risk assessment process, HSE MAC tool, guideline filter figures, and recording manual handling assessment findings.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Manual Handling Risk Assessment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The TILE framework, the five-step assessment process, and the HSE MAC tool for evaluating manual handling risks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Framework:</strong> TILE &mdash; Task, Individual, Load, Environment</li>
              <li><strong>Process:</strong> Identify &rarr; Who &rarr; Evaluate &rarr; Record &rarr; Review</li>
              <li><strong>MAC tool:</strong> Colour-coded scoring (green/amber/red/purple)</li>
              <li><strong>Guideline:</strong> 25 kg for men at waist height (filter, not limit)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">Key Tools</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>MAC:</strong> Manual Handling Assessment Charts (lift/carry/team)</li>
              <li><strong>RAPP:</strong> Risk Assessment of Pushing and Pulling</li>
              <li><strong>ART:</strong> Assessment of Repetitive Tasks</li>
              <li><strong>V-MAC:</strong> Variable Manual Handling Assessment Charts</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and structure of the TILE risk assessment framework",
              "List the four TILE categories and give examples of risk factors in each",
              "Describe the HSE five-step risk assessment process applied to manual handling",
              "Explain how to use the HSE MAC tool and interpret the colour-coded results",
              "Identify when a manual handling assessment must be reviewed and updated",
              "Describe how to record significant findings from a manual handling assessment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* TILE Framework Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">&mdash;</span>
            TILE Framework
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Grid3X3 className="h-5 w-5 text-emerald-400" />
              <p className="text-sm font-medium text-white">The Four Quadrants of Manual Handling Risk Assessment</p>
            </div>
            <p className="text-sm text-white/60 mb-6 text-center">Every manual handling task must be assessed against all four TILE categories</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {/* Task */}
              <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <ListChecks className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-400">T &mdash; TASK</p>
                    <p className="text-[10px] text-white/50">What is being done?</p>
                  </div>
                </div>
                <ul className="text-xs text-white/70 space-y-1">
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Posture (bending, twisting, reaching)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Frequency and duration</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Carrying distance</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Pushing/pulling force</span>
                  </li>
                </ul>
              </div>

              {/* Individual */}
              <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Search className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-400">I &mdash; INDIVIDUAL</p>
                    <p className="text-[10px] text-white/50">Who is doing it?</p>
                  </div>
                </div>
                <ul className="text-xs text-white/70 space-y-1">
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Physical capability &amp; fitness</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Health conditions &amp; pregnancy</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Training and experience</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Age and fatigue level</span>
                  </li>
                </ul>
              </div>

              {/* Load */}
              <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-400">L &mdash; LOAD</p>
                    <p className="text-[10px] text-white/50">What is being handled?</p>
                  </div>
                </div>
                <ul className="text-xs text-white/70 space-y-1">
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Weight and size</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Shape (bulky, awkward, long)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Grip (handles, smooth, sharp)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Stability (shifting contents)</span>
                  </li>
                </ul>
              </div>

              {/* Environment */}
              <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Grid3X3 className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-purple-400">E &mdash; ENVIRONMENT</p>
                    <p className="text-[10px] text-white/50">Where is it being done?</p>
                  </div>
                </div>
                <ul className="text-xs text-white/70 space-y-1">
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Space constraints</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Floor condition (wet, uneven)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Temperature and lighting</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Steps, slopes, obstacles</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-white/40 text-xs mt-4">
              All four quadrants must be assessed together &mdash; a risk factor in any single category can make the overall task high-risk
            </p>
          </div>
        </section>

        {/* Section 01: The TILE Framework in Detail */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            The TILE Framework in Detail
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>TILE framework</strong> is derived from Schedule 1 of the Manual Handling
                Operations Regulations 1992. It provides a structured, systematic approach to
                identifying all the risk factors associated with a manual handling operation. Each
                letter represents a category of risk factor, and all four must be assessed for every
                task.
              </p>

              {/* Task */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-2">T &mdash; Task</p>
                <p className="text-sm text-white/80 mb-3">
                  The Task element examines <strong className="text-white">what is being done</strong>
                  &mdash; the physical demands, movements, and working methods involved.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Does the task involve bending, stooping, or twisting the trunk?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Does it require reaching above shoulder height or below knee height?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Does it involve holding a load away from the body?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Is there large vertical movement (e.g. lifting from floor to shoulder)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Is the task repetitive? How often is the handling performed?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Are there long carrying distances?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Is there strenuous pushing, pulling, or sustained holding?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Is there sufficient rest or recovery time between repetitions?</span>
                  </li>
                </ul>
              </div>

              {/* Individual */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-2">I &mdash; Individual</p>
                <p className="text-sm text-white/80 mb-3">
                  The Individual element considers <strong className="text-white">who is doing the
                  task</strong> &mdash; their personal characteristics, capabilities, and limitations.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Does the task require unusual physical strength or height?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Does the person have any pre-existing health conditions (back problems, joint conditions, hernias)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Is the worker pregnant or a new mother?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Is the person young, elderly, or inexperienced?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Have they received appropriate manual handling training?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Are they fatigued from other work or long working hours?</span>
                  </li>
                </ul>
              </div>

              {/* Load */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-2">L &mdash; Load</p>
                <p className="text-sm text-white/80 mb-3">
                  The Load element examines <strong className="text-white">what is being handled</strong>
                  &mdash; the physical characteristics of the object being moved.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>How heavy is the load? (Check packaging labels, delivery notes, or weigh it)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Is the load bulky, making it difficult to keep close to the body?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Is it difficult to grip (smooth, slippery, no handles, hot, sharp)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Is the load unstable or are its contents liable to shift?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Is the centre of gravity off-centre (heaviest side not obvious)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Could the load cause harm if dropped (sharp edges, hazardous substances)?</span>
                  </li>
                </ul>
              </div>

              {/* Environment */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">E &mdash; Environment</p>
                <p className="text-sm text-white/80 mb-3">
                  The Environment element considers <strong className="text-white">where the task is
                  being done</strong> &mdash; the physical conditions of the workplace.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Are there space constraints that restrict posture or movement?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Is the floor surface uneven, slippery, or unstable?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Are there changes in level (steps, ramps, slopes)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Is the lighting adequate to see the load and the route clearly?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Is the temperature extreme (very hot causing sweat/fatigue, very cold reducing grip)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Are there obstacles, obstructions, or other hazards in the carrying route?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The Five-Step Risk Assessment Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            The Five-Step Risk Assessment Process
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HSE recommends a <strong>five-step risk assessment process</strong> for all
                workplace hazards, including manual handling. This process provides the structured
                methodology for carrying out the assessment required by MHOR 1992 Regulation 4 and
                Management Regulations 1999 Regulation 3.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Five Steps</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <p className="text-emerald-400 text-xs font-bold mb-1">STEP 1: Identify the Hazards</p>
                    <p>Walk the workplace and observe all manual handling activities. Identify every task
                      that involves transporting or supporting a load by bodily force. Talk to workers
                      &mdash; they know which tasks cause pain, discomfort, or difficulty. Check accident
                      records and near-miss reports for manual handling incidents.</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-400 text-xs font-bold mb-1">STEP 2: Decide Who Might Be Harmed and How</p>
                    <p>Consider all workers who carry out each manual handling task. Include new workers,
                      young workers, pregnant workers, workers with existing health conditions, agency
                      staff, and contractors. Consider both immediate injury (acute strains, fractures)
                      and long-term harm (cumulative MSDs).</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-amber-400 text-xs font-bold mb-1">STEP 3: Evaluate the Risks and Decide on Precautions</p>
                    <p>Use the TILE framework to evaluate each risk factor. Apply the hierarchy: can the
                      task be avoided? If not, what controls will reduce the risk? Use the HSE MAC tool
                      or other assessment methods to quantify risk where appropriate. Prioritise actions
                      based on the level of risk.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-purple-400 text-xs font-bold mb-1">STEP 4: Record Your Significant Findings</p>
                    <p>Document the hazards identified, the people at risk, the existing controls, and
                      any additional actions required. If you employ five or more people, you must
                      record the significant findings in writing. Use the HSE assessment forms or
                      your organisation&rsquo;s standard templates.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-xs font-bold mb-1">STEP 5: Review Your Assessment and Update if Necessary</p>
                    <p>Revisit the assessment whenever conditions change &mdash; new tasks, new equipment,
                      new workers, changes in the working environment, or following an injury or near
                      miss. Even without changes, review assessments at regular intervals (at least
                      annually).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: The HSE MAC Tool */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            The HSE MAC Tool
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Manual Handling Assessment Charts</strong> (MAC) tool is a practical
                risk assessment method developed by the HSE. It provides a structured, semi-quantitative
                approach to assessing the risk of manual handling operations using a colour-coded
                scoring system that makes it easy to identify high-risk tasks and prioritise
                improvements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">MAC Tool &mdash; Colour-Coded Risk Levels</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-semibold">GREEN &mdash; Low Risk</p>
                      <p className="text-xs text-white/70">The task is within acceptable limits. No immediate action needed, but continue to monitor.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <div>
                      <p className="text-amber-400 text-sm font-semibold">AMBER &mdash; Medium Risk</p>
                      <p className="text-xs text-white/70">Examine the task more closely. Consider improvements to reduce risk. Monitor for signs of injury.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <div>
                      <p className="text-red-400 text-sm font-semibold">RED &mdash; High Risk</p>
                      <p className="text-xs text-white/70">Prompt action needed. The task presents a significant risk and must be improved as a priority.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <div>
                      <p className="text-purple-400 text-sm font-semibold">PURPLE &mdash; Very High Risk</p>
                      <p className="text-xs text-white/70">Immediate action required. The task should be stopped and redesigned before any further handling.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">MAC Tool Assessment Factors</p>
                <p className="text-sm text-white/80 mb-3">
                  The MAC tool assesses each operation against a series of risk factors, scoring each
                  one with a colour code. The factors assessed depend on the type of operation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">Lifting Operations</p>
                    <p className="text-white/80 text-xs">Load weight/frequency, hand distance from lower back, vertical lift region, trunk twisting/sideways bending, postural constraints, grip on load, floor surface.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">Carrying Operations</p>
                    <p className="text-white/80 text-xs">Load weight/frequency, hand distance from lower back, asymmetric trunk/load, postural constraints, grip on load, floor surface, carry distance, obstacles on route.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg sm:col-span-2">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">Team Handling Operations</p>
                    <p className="text-white/80 text-xs">Load weight/frequency per person, hand distance from lower back, vertical lift region, trunk twisting/sideways bending, postural constraints, grip on load, floor surface, communication/coordination/control.</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">HSE guideline figures:</strong> The HSE
                  provides guideline filter figures to help identify tasks that need detailed assessment.
                  For a man lifting close to the body at waist height (elbow to knuckle zone), the
                  filter figure is <strong>25 kg</strong>. For a woman in the same position, it is
                  <strong> 16 kg</strong>. These reduce significantly when the load is held away from
                  the body, when lifting above shoulder or below knee height, or when the task involves
                  twisting. These figures are <strong>filters, not safe limits</strong> &mdash; loads
                  below these figures can still be hazardous if other TILE factors are unfavourable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Recording and Reviewing Findings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Recording and Reviewing Findings
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 4(2) of the MHOR 1992 requires employers to review assessments whenever
                there is reason to suspect they are no longer valid, or when there has been a
                significant change in the manual handling operations to which they relate. Recording
                findings is essential for demonstrating compliance and tracking improvements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What to Record</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Task description:</strong> What manual handling operation is being assessed? Be specific &mdash; &ldquo;lifting cable drums from pallet to cable stand&rdquo; rather than just &ldquo;handling cables&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">TILE risk factors:</strong> Record the specific risk factors identified in each TILE category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Who is at risk:</strong> Name the roles, not just &ldquo;all workers&rdquo; &mdash; e.g. &ldquo;electricians, apprentices, labourers involved in cable installation&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Existing controls:</strong> What measures are already in place? (e.g. cable drum trolleys, team lift policy, manual handling training)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Additional actions:</strong> What further measures are needed? Who is responsible? By when?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Risk rating:</strong> Overall risk level (using MAC colour codes or a risk matrix)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Date and assessor:</strong> When the assessment was carried out and by whom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Review date:</strong> When the assessment will next be reviewed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When to Review</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>After an injury, incident, or near miss related to the task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>When the task, load, equipment, or working method changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>When the working environment changes (new site, different layout, new floor surface)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>When new workers are assigned to the task (especially young workers, pregnant workers, or those with health conditions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>When workers report pain, discomfort, or difficulty with the task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>At regular intervals (annually as a minimum, or more frequently on dynamic construction sites)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Practical Tip</p>
                </div>
                <p className="text-sm text-white/80">
                  On construction sites, manual handling conditions change frequently as the project
                  progresses. A risk assessment completed at the start of a project may be completely
                  invalid two weeks later if access routes have changed, floor levels have altered,
                  or new trades are working in the same area. Dynamic risk assessment &mdash; briefly
                  reassessing the task and conditions before each handling operation &mdash; should
                  become an automatic habit for all site workers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has covered the practical process of assessing manual handling risks.
                The key points to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">TILE framework:</strong> Task (what), Individual (who), Load (what is handled), Environment (where) &mdash; all four must be assessed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Five-step process:</strong> Identify hazards &rarr; Who is at risk &rarr; Evaluate and control &rarr; Record findings &rarr; Review and update</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">MAC tool:</strong> Colour-coded scoring (green/amber/red/purple) for lifting, carrying, and team handling operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Guideline figures:</strong> 25 kg for men, 16 kg for women at waist height &mdash; filters, not legal limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Record and review:</strong> Document findings, assign actions, and review whenever conditions change or after incidents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Dynamic assessment:</strong> On construction sites, briefly reassess before each handling operation as conditions change frequently</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Next:</strong> In Section 4, we will examine
                  the anatomy and injury mechanisms behind manual handling injuries &mdash; spinal
                  structure, how discs herniate, why posture matters, and why the lumbar region is
                  most vulnerable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: The Legal Framework
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1-section-4">
              Next: Anatomy &amp; Injury Mechanisms
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
