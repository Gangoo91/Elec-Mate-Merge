import { ArrowLeft, ClipboardCheck, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "hierarchy-first-step",
    question:
      "What is the FIRST step in the hierarchy of controls when planning asbestos work?",
    options: [
      "Eliminate the hazard entirely — remove the need to work with or near ACMs",
      "Issue RPE and PPE to all workers before they enter the area",
      "Put up warning signs and restrict access to the work area",
      "Set up local exhaust ventilation (LEV) around the work zone",
    ],
    correctIndex: 0,
    explanation:
      "The hierarchy of controls must always be applied from the top down. Elimination is the most effective control — if you can redesign the task or use an alternative route to avoid working with or near ACMs, you remove the hazard entirely. PPE is the LAST resort, not the first choice.",
  },
  {
    id: "dynamic-risk-assessment",
    question:
      "You discover suspected ACMs during work that were not identified beforehand. What should you do FIRST?",
    options: [
      "STOP work immediately and assess whether the material has been disturbed",
      "Put on an FFP3 mask and continue working carefully",
      "Take a sample of the material for laboratory analysis",
      "Spray the material with water and carry on with caution",
    ],
    correctIndex: 0,
    explanation:
      "If you discover suspected ACMs during work that were not expected, you must STOP work immediately. Assess whether the material has been disturbed. If it has, follow the 4-S emergency procedure. If not, secure the area and report to your supervisor. Do NOT resume work until the material has been identified and appropriate controls are in place.",
  },
  {
    id: "method-statement-content",
    question:
      "Which of the following is NOT typically included in a method statement for asbestos work?",
    options: [
      "The building's original construction cost and architect details",
      "The sequence of operations (step by step)",
      "Emergency procedures in case of uncontrolled fibre release",
      "Names and competencies of workers carrying out the task",
    ],
    correctIndex: 0,
    explanation:
      "A method statement for asbestos work must include the description of work, location of ACMs, category of work, sequence of operations, equipment required, control measures, decontamination procedures, waste handling, emergency procedures, and the names and competencies of workers. The building's original construction cost and architect details are not relevant to the safe system of work.",
  },
];

const faqs = [
  {
    question:
      "Do I need a separate RAMS for every asbestos task, or can I use a generic one?",
    answer:
      "RAMS must be task-specific and site-specific. A generic RAMS is not acceptable because every asbestos task involves different materials, conditions, locations, and risks. For example, removing asbestos cement roof sheets on an exposed rooftop requires entirely different controls from removing vinyl floor tiles in an occupied school. The risk assessment must consider the specific ACM type, its condition, the method of work, who might be exposed, and what controls are needed. The method statement must set out the safe system of work step by step for that particular task in that particular location. You may use templates as a starting point, but they must always be adapted to the specific job.",
  },
  {
    question:
      "What is the difference between a risk assessment and a method statement?",
    answer:
      "A risk assessment identifies the hazards associated with a task and evaluates the level of risk. It asks: what could go wrong, who could be harmed, how likely is it, and how serious would it be? A method statement sets out the safe system of work — the step-by-step procedure that workers must follow to carry out the task safely, incorporating the control measures identified in the risk assessment. In practice, the two documents are usually prepared together as a single RAMS package, but they serve different purposes: the risk assessment is the 'thinking' part (identifying and evaluating risks) and the method statement is the 'doing' part (the practical procedure to manage those risks).",
  },
  {
    question:
      "Where can I find HSE Asbestos Essentials task sheets?",
    answer:
      "HSE Asbestos Essentials (HSG210) is available free from the HSE website at hse.gov.uk. It contains task sheets for common non-licensed asbestos tasks such as removing textured coatings (Artex), removing asbestos cement sheets, removing floor tiles, and working with asbestos insulating board. Each task sheet specifies the equipment needed, preparation, working method, clearance, and waste disposal. There are also equipment and method sheets providing detailed guidance on specific controls such as HEPA vacuums, polythene enclosures, and RPE. It is an essential reference for anyone carrying out non-licensed asbestos work, but it does NOT cover licensed work — separate HSE guidance applies for that.",
  },
  {
    question:
      "Can conditions on site change after the RAMS has been written?",
    answer:
      "Yes, and this is precisely why dynamic risk assessment is so important. Conditions can change due to unexpected discoveries (finding ACMs not identified in the survey), changes in weather (wind affecting outdoor work), building occupancy changes, or deterioration of ACMs during the work. If conditions change, work must stop until the RAMS has been reviewed and updated. Workers must be re-briefed on any changes before work resumes. The RAMS is a living document — it must reflect current conditions, not just the conditions that existed when the document was first written.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under Regulation 6 of CAR 2012, when must an employer carry out a risk assessment for asbestos work?",
    options: [
      "Only when licensed asbestos removal is planned",
      "Before any work that may expose workers to asbestos",
      "After work has started, once fibre levels have been measured",
      "Only when the HSE requests one during an inspection",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 6 of the Control of Asbestos Regulations 2012 requires the employer to carry out a suitable and sufficient assessment BEFORE any work that is liable to expose employees to asbestos. This applies to all categories of asbestos work — licensed, notifiable non-licensed, and non-licensed.",
  },
  {
    id: 2,
    question:
      "In the hierarchy of controls, which level comes AFTER engineering controls?",
    options: [
      "Elimination",
      "Substitution",
      "Administrative controls",
      "PPE/RPE",
    ],
    correctAnswer: 2,
    explanation:
      "The hierarchy of controls runs: Eliminate, Substitute, Engineering Controls, Administrative Controls, PPE/RPE. Administrative controls (such as permits to work, restricted access, supervision, training, and job rotation) come after engineering controls. PPE/RPE is always the last resort.",
  },
  {
    id: 3,
    question:
      "Which of the following is an example of an engineering control for asbestos work?",
    options: [
      "Issuing a permit to work before entering the area",
      "Rotating workers to limit individual exposure time",
      "Using local exhaust ventilation (LEV) to capture fibres at source",
      "Briefing workers on the risk assessment before work begins",
    ],
    correctAnswer: 2,
    explanation:
      "Local exhaust ventilation (LEV) is an engineering control — it physically isolates people from the hazard by capturing airborne fibres at the point of release. Permits to work and worker briefings are administrative controls. Job rotation is also an administrative control.",
  },
  {
    id: 4,
    question:
      "A task-specific risk assessment for asbestos work should consider all of the following EXCEPT:",
    options: [
      "The type, condition, and friability of the ACM involved",
      "The expected fibre release from the planned work method",
      "The colour and brand name of the building's original paint",
      "Who might be exposed, including building occupants and passers-by",
    ],
    correctAnswer: 2,
    explanation:
      "A task-specific risk assessment must consider the ACM type, condition, and friability; the work method and tools; the expected fibre release; who might be exposed; the duration of exposure; the controls needed; RPE/PPE requirements; waste disposal; and emergency procedures. The colour and brand name of paint are not relevant to asbestos risk assessment.",
  },
  {
    id: 5,
    question:
      "What does HSE Asbestos Essentials (HSG210) provide?",
    options: [
      "Legal templates for asbestos licence applications to the HSE",
      "Practical task sheets for common non-licensed asbestos work",
      "Training materials for licensed asbestos removal contractors",
      "Air monitoring results for different types of asbestos work",
    ],
    correctAnswer: 1,
    explanation:
      "HSE Asbestos Essentials (HSG210) is a practical guidance document containing task sheets for common non-licensed asbestos tasks. Each task sheet specifies the equipment needed, preparation, working method, clearance, and waste disposal. It also includes equipment and method sheets for specific controls. It does NOT cover licensed work.",
  },
  {
    id: 6,
    question:
      "When carrying out a site-specific assessment, why is building ventilation important to consider?",
    options: [
      "Because ventilation systems must be turned up to maximum to clear fibres quickly",
      "Because natural and mechanical ventilation could spread asbestos fibres to other areas",
      "Because ventilation is only relevant for outdoor asbestos work",
      "Because the HSE requires all ventilation to be upgraded before any asbestos work",
    ],
    correctAnswer: 1,
    explanation:
      "Natural and mechanical ventilation systems can spread asbestos fibres from the work area to other parts of the building, potentially exposing building occupants who are not involved in the work. Ventilation systems in and around the work area may need to be isolated or sealed before asbestos work begins.",
  },
  {
    id: 7,
    question:
      "Which of the following must be included in a method statement for asbestos work?",
    options: [
      "A list of all employees in the company and their home addresses",
      "The sequence of operations, control measures, and decontamination procedures",
      "The building's energy performance certificate rating",
      "A photograph of every room in the building",
    ],
    correctAnswer: 1,
    explanation:
      "A method statement for asbestos work must include the description of work, location and extent of ACMs, category of work, sequence of operations, equipment required, control measures, decontamination procedures, waste handling, emergency procedures, names and competencies of workers, and supervision arrangements.",
  },
  {
    id: 8,
    question:
      "During work, you notice that site conditions have changed since the RAMS was written. What should you do?",
    options: [
      "Continue working — the RAMS was approved and cannot be changed",
      "Stop work, review and update the RAMS, and re-brief workers before resuming",
      "Make a mental note and mention it at the next weekly safety meeting",
      "Ask a colleague to carry on while you update the paperwork",
    ],
    correctAnswer: 1,
    explanation:
      "If site conditions change, work must stop until the RAMS has been reviewed and updated to reflect the new conditions. Workers must be re-briefed on any changes before work resumes. The RAMS is a living document and must always reflect current conditions. Continuing to work under an outdated RAMS puts workers at risk.",
  },
];

const AsbestosModule4Section2 = () => {
  useSEO({
    title: "Risk Assessment & Method Statements | Asbestos Awareness Module 4.2",
    description:
      "Learn about RAMS for asbestos work, the hierarchy of controls, task-specific and site-specific risk assessment, dynamic risk assessment, HSE Asbestos Essentials, and method statement content.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-orange-400">MODULE 4</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Risk Assessment & Method Statements
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding RAMS for asbestos work, the hierarchy of controls,
            task-specific assessment, dynamic risk assessment, and the essential
            content of a method statement
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="font-semibold text-orange-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">RAMS:</strong> risk assessment
                  + method statement required for ALL asbestos work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Hierarchy:</strong> eliminate
                  first, PPE last — always work from top to bottom
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Task-specific:</strong> every
                  RAMS must be tailored to the specific job and site
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Dynamic:</strong> reassess
                  continuously — stop if conditions change
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="font-semibold text-orange-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Before starting:</strong> read
                  and understand the RAMS — ask if unclear
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Controls:</strong> check all
                  controls are in place before work begins
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Unexpected ACMs:</strong> STOP
                  immediately, do not disturb, report at once
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">HSG210:</strong> use HSE task
                  sheets as your guide for non-licensed work
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Explain why a Risk Assessment and Method Statement (RAMS) is required for all asbestos work under Regulation 6 of CAR 2012",
              "Apply the hierarchy of controls in the correct order when planning asbestos work",
              "Carry out a task-specific risk assessment covering ACM type, work method, fibre release, exposure, and controls",
              "Identify site-specific factors that affect safe working including ventilation, occupancy, access, and services",
              "Describe the dynamic risk assessment process and what to do if unexpected ACMs are discovered",
              "List the essential contents of a method statement for asbestos work",
              "Explain the purpose and content of HSE Asbestos Essentials (HSG210)",
              "Understand why RAMS must be reviewed and updated whenever conditions change",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: RAMS for Asbestos Work */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">01</span>
              RAMS for Asbestos Work
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A <strong className="text-white">Risk Assessment and Method Statement (RAMS)</strong>{" "}
                is required for <strong className="text-white">ALL</strong> asbestos work — whether
                licensed, notifiable non-licensed (NNLW), or non-licensed. This is not optional; it is
                a legal requirement under{" "}
                <strong className="text-white">Regulation 6 of the Control of Asbestos Regulations 2012</strong>,
                which states that an employer must not carry out work that is liable to expose
                employees to asbestos unless they have first carried out a suitable and sufficient
                assessment of the risk.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Key Definition: RAMS
                </h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">RAMS</strong> is a two-part document.
                  The <strong className="text-white">risk assessment</strong> identifies hazards
                  and evaluates the level of risk for a specific task. The{" "}
                  <strong className="text-white">method statement</strong> sets out the safe system
                  of work — the step-by-step procedure that workers must follow to carry out the
                  task safely, incorporating the control measures identified in the risk assessment.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-2">
                  RAMS Requirements
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Task-specific:</strong>{" "}
                      the RAMS must relate to the specific task being carried out — not a generic
                      document covering &ldquo;asbestos work in general&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Site-specific:</strong>{" "}
                      the RAMS must consider the conditions at the specific site where the work
                      will take place — including building occupancy, access, ventilation, and
                      adjacent activities
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Reviewed and updated:</strong>{" "}
                      the RAMS must be reviewed and updated if conditions change — for example,
                      if the ACM is found to be in worse condition than expected, if weather
                      conditions change, or if additional ACMs are discovered
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Briefed to workers:</strong>{" "}
                      all workers must be briefed on the RAMS before work begins — they must
                      understand the risks, the controls, and the safe system of work
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Regulation 6: Assessment Before Work
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Regulation 6 of CAR 2012 is clear: an employer must{" "}
                  <strong className="text-white">NOT</strong> carry out work that is liable to
                  expose employees to asbestos unless a{" "}
                  <strong className="text-white">suitable and sufficient risk assessment</strong>{" "}
                  has been carried out. The assessment must be made{" "}
                  <strong className="text-white">before</strong> the work begins — not during or
                  after. The assessment must identify the type of asbestos involved, the nature
                  and degree of exposure, and the steps to be taken to prevent or reduce exposure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Hierarchy of Controls */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">02</span>
              The Hierarchy of Controls
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The <strong className="text-white">hierarchy of controls</strong> is the
                fundamental framework for managing risk. Controls must be applied in order —{" "}
                <strong className="text-white">most effective first</strong>. You must always
                start at the top of the hierarchy and only move down to less effective controls
                when higher-level controls are not reasonably practicable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  The Five Levels
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Eliminate
                      </p>
                      <p className="text-white/60">
                        Remove the need to work with or near ACMs. Redesign the task, use
                        alternative routes, or re-route services to avoid ACM locations entirely.
                        This is the <strong className="text-white">most effective</strong> control.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Substitute
                      </p>
                      <p className="text-white/60">
                        Replace with a less hazardous alternative. In asbestos work, substitution
                        is not usually applicable — you cannot substitute the asbestos that is
                        already present. However, you can substitute work methods (e.g. hand tools
                        instead of power tools) to reduce fibre release.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Engineering Controls
                      </p>
                      <p className="text-white/60">
                        Isolate people from the hazard using physical measures: enclosures, local
                        exhaust ventilation (LEV), wet working methods, shadow vacuuming, negative
                        pressure units, and sealed transit routes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Administrative Controls
                      </p>
                      <p className="text-white/60">
                        Change the way people work: permits to work, restricted access zones,
                        supervision, training, job rotation to limit exposure time, signage, and
                        briefings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        PPE/RPE
                      </p>
                      <p className="text-white/60">
                        Protect the individual worker: respiratory protective equipment (RPE),
                        disposable coveralls (Type 5/6), gloves, boot covers. This is the{" "}
                        <strong className="text-white">last resort</strong> — the least effective
                        control because it only protects the individual wearing it, and only if
                        it is worn correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hierarchy of Controls Triangle Diagram */}
              <div className="my-6">
                <h3 className="text-orange-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Hierarchy of Controls
                </h3>

                <div className="flex gap-3 sm:gap-4">
                  {/* Arrow label - left side */}
                  <div className="flex flex-col items-center justify-between py-2 flex-shrink-0">
                    <span className="text-[10px] sm:text-xs text-green-400 font-semibold uppercase tracking-wider whitespace-nowrap">
                      Most
                      <br />
                      effective
                    </span>
                    <div className="flex-1 w-0.5 bg-gradient-to-b from-green-400 via-yellow-400 to-red-400 my-2"></div>
                    <span className="text-[10px] sm:text-xs text-red-400 font-semibold uppercase tracking-wider whitespace-nowrap">
                      Least
                      <br />
                      effective
                    </span>
                  </div>

                  {/* Triangle / Inverted Pyramid */}
                  <div className="flex-1 space-y-1.5">
                    {/* Level 1: Eliminate (widest) */}
                    <div className="w-full rounded-lg bg-green-500/20 border border-green-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-green-300 font-bold text-xs sm:text-sm">ELIMINATE</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Remove the hazard entirely
                      </p>
                    </div>

                    {/* Level 2: Substitute */}
                    <div className="w-[88%] mx-auto rounded-lg bg-blue-500/20 border border-blue-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-blue-300 font-bold text-xs sm:text-sm">SUBSTITUTE</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Replace with less hazardous alternative
                      </p>
                    </div>

                    {/* Level 3: Engineering Controls */}
                    <div className="w-[74%] mx-auto rounded-lg bg-yellow-500/20 border border-yellow-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-yellow-300 font-bold text-xs sm:text-sm">ENGINEERING CONTROLS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Isolate people from the hazard
                      </p>
                    </div>

                    {/* Level 4: Administrative Controls */}
                    <div className="w-[58%] mx-auto rounded-lg bg-orange-500/20 border border-orange-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-orange-300 font-bold text-xs sm:text-sm">ADMINISTRATIVE</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Change the way people work
                      </p>
                    </div>

                    {/* Level 5: PPE/RPE (narrowest) */}
                    <div className="w-[42%] mx-auto rounded-lg bg-red-500/20 border border-red-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-red-300 font-bold text-xs sm:text-sm">PPE / RPE</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Protect the worker
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-orange-500/30 rounded-lg p-3">
                  <p className="text-orange-300 text-xs sm:text-sm font-medium">
                    Always work from top to bottom — PPE is the{" "}
                    <strong className="text-white">LAST</strong> resort, not the first choice.
                    In practice, most asbestos work requires a combination of controls from
                    multiple levels of the hierarchy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Task-Specific Risk Assessment */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Task-Specific Risk Assessment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Every asbestos risk assessment must be{" "}
                <strong className="text-white">task-specific</strong>. A generic assessment
                covering &ldquo;asbestos work&rdquo; in broad terms is not acceptable. The
                assessment must address the specific ACM, the specific work method, and the
                specific conditions at the site. The following questions must be answered:
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  Task-Specific Assessment Checklist
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What ACM is involved?
                      </p>
                      <p className="text-white/60">
                        Identify the type of asbestos (chrysotile, amosite, crocidolite), the form
                        of the ACM (lagging, insulating board, cement, textured coating, floor tiles),
                        and its current condition and friability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What work is being done?
                      </p>
                      <p className="text-white/60">
                        Define the task: removal, encapsulation, repair, maintenance near ACMs,
                        drilling through ACMs, or working in areas where ACMs are present but not
                        being directly disturbed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What tools and methods will be used?
                      </p>
                      <p className="text-white/60">
                        Hand tools, power tools, wet methods, shadow vacuuming. Power tools generate
                        significantly more fibre than hand tools — their use must be carefully
                        justified and controlled.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What is the expected fibre release?
                      </p>
                      <p className="text-white/60">
                        Estimate the likely airborne fibre concentration based on the ACM type,
                        condition, and work method. This determines the category of work and the
                        level of controls required.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Who might be exposed?
                      </p>
                      <p className="text-white/60">
                        Workers carrying out the task, other workers in the vicinity, building
                        occupants, visitors, and passers-by. Each group may require different
                        protective measures.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What is the duration of exposure?
                      </p>
                      <p className="text-white/60">
                        How long will each worker be exposed? Consider whether job rotation is
                        needed to limit individual exposure time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">7</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What controls are needed?
                      </p>
                      <p className="text-white/60">
                        Apply the hierarchy of controls. Determine the specific engineering,
                        administrative, and PPE controls required to reduce exposure to as low
                        as reasonably practicable (ALARP).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">8</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What RPE/PPE is required?
                      </p>
                      <p className="text-white/60">
                        Specify the type of RPE (FFP3, half-mask, full-face, powered air), coveralls
                        (Type 5/6), gloves, and boot covers. All RPE must be face-fit tested to
                        the individual wearer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">9</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What waste will be generated?
                      </p>
                      <p className="text-white/60">
                        Identify the type and quantity of asbestos waste. Determine how it will
                        be double-bagged, labelled, transported, and disposed of at a licensed
                        facility.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal-300 text-xs font-bold">10</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        What emergency procedures are needed?
                      </p>
                      <p className="text-white/60">
                        Plan for uncontrolled fibre release, equipment failure, injury, fire, and
                        other emergencies. Ensure all workers know the emergency procedures before
                        work begins.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Site-Specific Considerations */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">04</span>
              Site-Specific Considerations
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                In addition to the task itself, the risk assessment must consider the{" "}
                <strong className="text-white">specific conditions at the site</strong> where
                the work will take place. Site conditions can significantly affect the level
                of risk and the controls required.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Key Site-Specific Factors
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Building occupancy:</strong>{" "}
                      will the area need to be evacuated? Are there vulnerable occupants
                      (e.g. in schools or hospitals) who need to be protected?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Access and egress routes:</strong>{" "}
                      plan routes for workers and waste that avoid occupied areas. Do not
                      carry asbestos waste through communal corridors, reception areas, or
                      public spaces.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Ventilation:</strong>{" "}
                      assess both natural and mechanical ventilation. HVAC systems and open
                      windows can spread airborne fibres to other parts of the building.
                      Ventilation systems may need to be isolated or sealed.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Adjacent work:</strong>{" "}
                      are other trades working nearby? They may need to be informed,
                      excluded from the area, or rescheduled to avoid exposure.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Services:</strong>{" "}
                      identify live electrical, gas, and water services that may need to
                      be isolated before work begins. Cutting through a live cable while
                      removing ACMs creates additional serious hazards.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Weather conditions:</strong>{" "}
                      for outdoor work — wind can disperse asbestos fibres over a wide area;
                      rain can affect enclosures and equipment. Work may need to be suspended
                      in adverse conditions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Ground conditions:</strong>{" "}
                      relevant for scaffolding, access platforms, and ground-level enclosures.
                      Unstable or uneven ground must be assessed and managed.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Emergency access:</strong>{" "}
                      fire escape routes must remain clear and accessible throughout the
                      work. Do not block fire exits with enclosures, equipment, or waste.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Practical Tip: Site Visit
                </h3>
                <p className="text-white/80 text-sm">
                  Always carry out a{" "}
                  <strong className="text-white">site visit before writing the RAMS</strong>.
                  Desk-based assessments miss critical details. Walk the route, inspect the
                  work area, check the asbestos register on site, identify access points,
                  and speak to the building manager about occupancy, services, and any local
                  conditions that could affect the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Dynamic Risk Assessment */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Dynamic Risk Assessment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A <strong className="text-white">dynamic risk assessment</strong> is an ongoing
                process of identifying and responding to hazards as they arise during work. No
                matter how thorough the pre-work RAMS, conditions on site can change — and
                workers must be prepared to stop, reassess, and adapt.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Discovering Unexpected ACMs During Work
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  If you discover suspected asbestos-containing materials during work that were
                  not identified beforehand, you must follow this sequence:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">1</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">STOP</strong> work immediately —
                      do not continue to disturb the material
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">2</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">Assess</strong> the situation —
                      has the material been disturbed? Is there visible dust or debris?
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">3</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">If disturbed:</strong> follow
                      the 4-S emergency procedure (covered in Module 5) — Stop, Secure,
                      Sign, Seek help
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">4</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">If not yet disturbed:</strong>{" "}
                      secure the area, report to your supervisor, and check the asbestos
                      register
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-300 text-xs font-bold">5</span>
                    </div>
                    <p className="text-white/70">
                      <strong className="text-white">Do NOT resume</strong> work until
                      the material has been identified and appropriate controls are in place
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-2">
                  Ongoing Reassessment
                </h3>
                <p className="text-white/70 text-sm">
                  Dynamic risk assessment is <strong className="text-white">not</strong> a
                  one-off activity at the start of the shift. Workers must continuously
                  reassess conditions as work progresses. Conditions that may trigger a
                  reassessment include: ACMs in worse condition than expected, unexpected
                  materials behind panels or above ceilings, equipment failure, changes in
                  weather (wind picking up during outdoor work), other trades entering the
                  restricted area, or any situation that does not match what the RAMS
                  anticipated.
                </p>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Never &ldquo;Work Through&rdquo; a Problem
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  If you are unsure whether a material contains asbestos, or if conditions
                  have changed from what the RAMS described, you must{" "}
                  <strong className="text-white">stop and report</strong>. Never attempt to
                  &ldquo;work through&rdquo; uncertainty. The cost of stopping is a delay.
                  The cost of continuing could be a fatal disease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: HSE Asbestos Essentials (HSG210) */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">06</span>
              HSE Asbestos Essentials (HSG210)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">HSE Asbestos Essentials</strong> (HSG210) is a
                key HSE publication that provides practical, step-by-step guidance for{" "}
                <strong className="text-white">non-licensed asbestos work</strong>. It is an
                essential reference for anyone planning or carrying out work that may disturb
                low-risk asbestos-containing materials.
              </p>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  What HSG210 Contains
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Task sheets:</strong>{" "}
                      step-by-step guidance for common non-licensed tasks such as removing
                      textured coatings (Artex), asbestos cement roof sheets, floor tiles,
                      and insulating board
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Task sheet content:</strong>{" "}
                      each task sheet specifies the equipment needed, preparation steps,
                      the working method, clearance procedures, and waste disposal
                      requirements
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Equipment and method sheets:</strong>{" "}
                      detailed guidance on specific controls such as HEPA vacuums, polythene
                      enclosures, glove bags, wet working, and decontamination
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Free access:</strong>{" "}
                      available free from the HSE website — no cost to download or use
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Scope Limitation
                </h3>
                <p className="text-white/80 text-sm">
                  HSG210 covers <strong className="text-white">non-licensed</strong> and{" "}
                  <strong className="text-white">notifiable non-licensed</strong> asbestos
                  work only. It does <strong className="text-white">NOT</strong> cover
                  licensed work such as the removal of asbestos insulation, lagging, or
                  sprayed coatings — separate HSE guidance and a licence from the HSE are
                  required for that category of work.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-2">
                  Using HSG210 in Practice
                </h3>
                <p className="text-white/70 text-sm">
                  When preparing a RAMS for non-licensed asbestos work, the relevant HSG210
                  task sheet should be your starting point. It provides a proven, HSE-approved
                  method for carrying out the task safely. However, you must still carry out
                  a site-specific risk assessment — the task sheet provides the general method,
                  but you need to adapt it to the specific conditions at your site. The task
                  sheet is a guide, not a substitute for thinking.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Method Statement Content */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">07</span>
              Method Statement Content
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The <strong className="text-white">method statement</strong> is the second part
                of the RAMS. It translates the findings of the risk assessment into a practical,
                step-by-step safe system of work that every worker must understand and follow.
                A well-written method statement leaves nothing to guesswork.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">
                  Essential Method Statement Contents
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Description of Work
                      </p>
                      <p className="text-white/60">
                        A clear, concise description of the work to be carried out — what is
                        being done and why.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Location and Extent of ACMs
                      </p>
                      <p className="text-white/60">
                        The precise location, type, and extent of asbestos-containing materials
                        involved in the work — referencing the asbestos register and survey
                        reports.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Category of Work
                      </p>
                      <p className="text-white/60">
                        Whether the work is licensed, notifiable non-licensed (NNLW), or
                        non-licensed — this determines the regulatory requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Sequence of Operations
                      </p>
                      <p className="text-white/60">
                        A step-by-step procedure covering every stage of the work from setup
                        to completion — what happens first, second, third, and so on.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Equipment Required
                      </p>
                      <p className="text-white/60">
                        A full list of equipment: RPE (type and protection factor), PPE
                        (coveralls, gloves, boot covers), tools, HEPA vacuum, waste bags,
                        polythene sheeting, warning signs, and tape.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Control Measures
                      </p>
                      <p className="text-white/60">
                        The specific controls identified in the risk assessment: wet working,
                        enclosure, LEV, access restrictions, ventilation isolation, and any
                        other measures to prevent fibre release and exposure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">7</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Decontamination Procedures
                      </p>
                      <p className="text-white/60">
                        How workers, tools, and the work area will be decontaminated. The
                        sequence of removing PPE, the use of HEPA vacuums, and the clean-up
                        procedure must all be specified.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">8</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Waste Handling and Disposal
                      </p>
                      <p className="text-white/60">
                        How asbestos waste will be packaged (double-bagged in red-striped or
                        clear-and-red bags), labelled, stored, transported, and disposed of at
                        a licensed waste facility.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">9</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Emergency Procedures
                      </p>
                      <p className="text-white/60">
                        What to do in the event of uncontrolled fibre release, equipment
                        failure, injury, fire, or any other emergency. Include contact numbers
                        and escalation procedures.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">10</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Names and Competencies of Workers
                      </p>
                      <p className="text-white/60">
                        The names of all workers carrying out the task, their asbestos awareness
                        training records, RPE face-fit test certificates, and any relevant
                        qualifications or licences.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose-300 text-xs font-bold">11</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Supervision Arrangements
                      </p>
                      <p className="text-white/60">
                        Who will supervise the work, their qualifications, and the level of
                        supervision required (continuous, periodic, or by inspection).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    The Method Statement Is Not a Filing Exercise
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  A method statement is only useful if workers{" "}
                  <strong className="text-white">read, understand, and follow it</strong>.
                  Every worker must be briefed on the method statement before work begins.
                  If a worker does not understand any part of the method statement, they must
                  ask for clarification — not guess. The method statement should be available
                  on site throughout the work for reference.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-400">
                  Living Document
                </h3>
                <p className="text-white/80 text-sm">
                  Like the risk assessment, the method statement is a{" "}
                  <strong className="text-white">living document</strong>. If conditions change
                  during the work — for example, the ACM is found to be in worse condition than
                  assessed, or additional ACMs are discovered — the method statement must be
                  reviewed and updated. Workers must be re-briefed on any changes before work
                  resumes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Categories of Asbestos Work
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4-section-3">
              Next: RPE & PPE Selection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default AsbestosModule4Section2;
