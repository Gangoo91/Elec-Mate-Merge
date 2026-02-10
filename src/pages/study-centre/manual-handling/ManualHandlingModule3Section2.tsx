import {
  ArrowLeft,
  Search,
  CheckCircle,
  AlertTriangle,
  Eye,
  BarChart3,
  Users,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-hazard-observation",
    question:
      "When observing workers performing manual handling tasks, what should you specifically look for?",
    options: [
      "Only whether they are lifting loads above the HSE guideline weights",
      "Poor postures, twisting, stooping, overreaching, rushing, and signs of fatigue or discomfort",
      "Whether they are wearing safety boots",
      "Only the weight of the loads and nothing else",
    ],
    correctIndex: 1,
    explanation:
      "Workplace observation should look at the full range of manual handling risk indicators including poor postures (stooping, twisting, overreaching), signs of rushing or taking shortcuts, visible discomfort or fatigue, and whether workers are using mechanical aids where available. Weight alone does not determine risk.",
  },
  {
    id: "mh-mac-tool-red",
    question:
      "In the HSE MAC tool, what does a RED risk band indicate?",
    options: [
      "Low risk -- no action required",
      "Medium risk -- action needed in the medium term",
      "High risk -- prompt action required",
      "Very high risk -- activities should be stopped until improvements are made",
    ],
    correctIndex: 2,
    explanation:
      "In the MAC tool, RED indicates HIGH risk, meaning prompt action is required to reduce the risk. PURPLE indicates VERY HIGH risk (stop and improve immediately). AMBER indicates medium risk (further assessment needed), and GREEN indicates low risk.",
  },
  {
    id: "mh-worker-consultation",
    question:
      "Why is consulting workers considered one of the most valuable sources of hazard information?",
    options: [
      "Because it is a legal requirement and nothing more",
      "Because workers who do the tasks daily know the practical problems, workarounds, and pain points better than anyone",
      "Because it saves the assessor from having to visit the workplace",
      "Because worker opinions override all other forms of assessment",
    ],
    correctIndex: 1,
    explanation:
      "Workers are the people who actually perform the manual handling tasks day after day. They experience the practical difficulties, develop workarounds (which may introduce new risks), know which tasks cause discomfort, and can identify problems that may not be visible during a brief observation. Their insight is invaluable for a thorough assessment.",
  },
];

const faqs = [
  {
    question:
      "How often should manual handling risk assessments be reviewed?",
    answer:
      "There is no fixed legal timescale for reviewing manual handling assessments. However, the Manual Handling Operations Regulations 1992 require assessments to be reviewed when there is reason to believe they are no longer valid, or when there has been a significant change in the work. In practice, most organisations review assessments annually as a minimum, and immediately when any of the following occur: a manual handling injury or near miss, a change in the task (new equipment, different loads, altered layout), a change in the workforce (new starter, worker returning from injury, pregnant worker), a change in the environment (new building, different floor surface, seasonal conditions), or when worker feedback identifies new concerns.",
  },
  {
    question:
      "What is the difference between a generic and a specific manual handling risk assessment?",
    answer:
      "A generic risk assessment covers a type of task that is performed regularly in broadly similar conditions -- for example, 'unloading cable drums from delivery vehicles.' It identifies the typical risks and controls for that category of work. A specific risk assessment covers a particular operation in a particular location with particular workers -- for example, 'moving three 50 kg cable drums from the loading bay to the sub-station on level 2 of the new hospital wing this Thursday.' Specific assessments are required when the generic assessment does not adequately cover the actual conditions, when the risk is particularly high, or when individual worker factors (such as a disability or recent injury) need to be considered.",
  },
  {
    question:
      "Can I use the MAC tool for pushing and pulling tasks?",
    answer:
      "No, the MAC tool is specifically designed for lifting, lowering, and team handling operations. For pushing and pulling tasks, HSE has published a separate tool called RAPP (Risk Assessment of Pushing and Pulling). RAPP uses a similar colour-coded approach but assesses different risk factors specific to push/pull operations, such as the initial force required to start the load moving, the sustained force during transport, and the quality and condition of wheels and castors. For repetitive upper limb tasks (such as cable stripping, terminating, or crimping), use the ART (Assessment of Repetitive Tasks) tool.",
  },
  {
    question:
      "What should I do if I identify a manual handling hazard but my employer does not act on it?",
    answer:
      "First, put your concerns in writing to your supervisor or manager and keep a copy. If the concern is raised through the company's safety reporting system, keep evidence of your report. If your employer still does not act, you can raise the issue with your health and safety representative (trade union rep or employee representative). If the risk is serious and immediate, you can report it to the HSE (Health and Safety Executive) by calling their helpline or using the online concern reporting form. Under Section 44 of the Employment Rights Act 1996, you have legal protection against dismissal or detriment for raising genuine health and safety concerns. You are also protected by the duty holders' obligations under Regulation 4 of the Management of Health and Safety at Work Regulations 1999 to consult workers on health and safety matters.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the first step in identifying manual handling hazards in a workplace?",
    options: [
      "Immediately implement mechanical aids for all tasks",
      "Conduct systematic workplace observation of manual handling tasks",
      "Ban all manual handling operations",
      "Ask workers to complete an anonymous survey",
    ],
    correctAnswer: 1,
    explanation:
      "Systematic workplace observation is typically the first step because it allows the assessor to see the actual tasks being performed, the conditions in which they take place, and the postures and techniques workers are using. This provides the foundation for all subsequent assessment activities.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT a source of information for identifying manual handling hazards?",
    options: [
      "Accident and incident reports",
      "Sickness absence records",
      "Worker consultation and feedback",
      "Financial profit and loss statements",
    ],
    correctAnswer: 3,
    explanation:
      "Financial profit and loss statements do not contain information about manual handling hazards. Accident reports, sickness absence records (particularly musculoskeletal-related absences), and worker consultation are all valuable sources of hazard identification information.",
  },
  {
    id: 3,
    question: "The HSE MAC tool uses four colour-coded risk bands. What are they?",
    options: [
      "Blue, yellow, orange, red",
      "Green, amber, red, purple",
      "White, green, amber, red",
      "Green, yellow, red, black",
    ],
    correctAnswer: 1,
    explanation:
      "The MAC tool uses green (low risk), amber (medium risk -- further assessment needed), red (high risk -- prompt action required), and purple (very high risk -- activities should be stopped until improvements are made).",
  },
  {
    id: 4,
    question:
      "What does RAPP stand for in the context of HSE manual handling assessment tools?",
    options: [
      "Risk Assessment of Posture and Position",
      "Risk Assessment of Pushing and Pulling",
      "Rapid Assessment of Physical Performance",
      "Review and Assessment of Personal Protection",
    ],
    correctAnswer: 1,
    explanation:
      "RAPP stands for Risk Assessment of Pushing and Pulling. It is an HSE-published tool specifically designed to assess the risks associated with push and pull operations, which are not covered by the MAC tool.",
  },
  {
    id: 5,
    question:
      "When reviewing injury data for manual handling hazard identification, which type of injury pattern is most significant?",
    options: [
      "A single serious injury from a one-off unusual event",
      "Repeated minor injuries or complaints from the same task or area",
      "Injuries that occurred more than five years ago",
      "Injuries that happened to agency workers only",
    ],
    correctAnswer: 1,
    explanation:
      "Repeated minor injuries or complaints from the same task or area are the most significant pattern because they indicate an ongoing, systemic hazard that is causing cumulative harm. While single serious injuries must be investigated, patterns of repeated problems point to tasks or conditions that need redesign.",
  },
  {
    id: 6,
    question:
      "What is the ART tool used for?",
    options: [
      "Assessing the risk of lifting heavy loads",
      "Assessing the risk of repetitive tasks involving the upper limbs",
      "Measuring the strength of individual workers",
      "Calculating the maximum weight a team can safely lift",
    ],
    correctAnswer: 1,
    explanation:
      "ART stands for Assessment of Repetitive Tasks. It is an HSE-published tool designed to assess the risk of upper limb disorders from repetitive work such as assembly, packing, and (for electricians) tasks like cable stripping, crimping, and repetitive terminations.",
  },
  {
    id: 7,
    question:
      "During a workplace observation, you notice a worker consistently twisting their body while moving boxes from a pallet to a shelf. This is an example of identifying a hazard related to which TILE factor?",
    options: [
      "Load factor -- the boxes are too heavy",
      "Individual factor -- the worker lacks training",
      "Task factor -- the layout forces twisting",
      "Environment factor -- the workspace is too cold",
    ],
    correctAnswer: 2,
    explanation:
      "Twisting while handling loads is a Task factor. It relates to how the work is performed and the postures required. The solution would typically involve redesigning the Task (repositioning the pallet or shelf so the worker can face both without twisting) rather than simply training the worker.",
  },
  {
    id: 8,
    question:
      "A purple rating on the MAC tool means:",
    options: [
      "No risk -- continue as normal",
      "Low risk -- monitor the situation",
      "High risk -- take action within three months",
      "Very high risk -- activities should be stopped until improvements are made",
    ],
    correctAnswer: 3,
    explanation:
      "Purple is the highest risk band in the MAC tool. It indicates very high risk and means that the manual handling activity should be stopped until improvements are made to reduce the risk. This is the most urgent action level in the MAC system.",
  },
];

export default function ManualHandlingModule3Section2() {
  useSEO({
    title:
      "Identifying Manual Handling Hazards | Manual Handling Module 3.2",
    description:
      "Workplace observation techniques, task analysis, injury data review, worker consultation, and HSE assessment tools including MAC, RAPP, and ART for manual handling hazard identification.",
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
            <Link to="../manual-handling-module-3">
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
            <Search className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Identifying Manual Handling Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Practical methods for finding manual handling hazards in the
            workplace &mdash; observation, task analysis, injury data,
            worker consultation, and HSE assessment tools
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Observe:</strong> watch workers doing actual tasks in
                  real conditions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Analyse:</strong> review injury data and sickness
                  absence patterns
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Consult:</strong> ask the workers &mdash; they know the
                  problems best
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Assess:</strong> use HSE tools (MAC, RAPP, ART) for
                  structured evaluation
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              HSE Tools
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>MAC:</strong> Manual Handling Assessment Charts
                  (lifting, lowering, team handling)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>RAPP:</strong> Risk Assessment of Pushing and Pulling
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>ART:</strong> Assessment of Repetitive Tasks (upper
                  limb)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Colour bands:</strong> green, amber, red, purple
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe four key methods for identifying manual handling hazards",
              "Explain the purpose and technique of workplace observation",
              "Identify the value of injury data and sickness absence records in hazard identification",
              "State why worker consultation is essential and how to carry it out effectively",
              "Describe the HSE MAC, RAPP, and ART tools and when each is used",
              "Interpret MAC tool colour-coded risk bands and explain the required action for each",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Workplace Observation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            <Eye className="h-5 w-5 text-emerald-400" />
            Workplace Observation
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Workplace observation is the foundation of manual handling hazard
                identification. It involves{" "}
                <strong>
                  watching workers perform actual tasks in real working
                  conditions
                </strong>
                , rather than relying on written procedures or assumptions about
                how work is done. There is often a significant gap between the
                planned method of work and what actually happens on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What to Look For During Observation
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Poor postures:
                      </strong>{" "}
                      Stooping, twisting, overreaching, bending sideways,
                      reaching behind the body, lifting with a rounded back,
                      working in a crouched position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rushing:</strong> Workers
                      hurrying manual handling tasks, skipping preparation steps,
                      carrying too many items at once, taking shortcuts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Signs of discomfort:
                      </strong>{" "}
                      Rubbing backs, stretching, grimacing, pausing to rest
                      frequently, shifting grip repeatedly, favouring one side
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Mechanical aids available but not used:
                      </strong>{" "}
                      Trolleys, sack trucks, or hoists that are present but
                      workers are carrying by hand &mdash; find out why they are
                      not being used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Environmental conditions:
                      </strong>{" "}
                      Cluttered walkways, wet floors, poor lighting, restricted
                      space, temperature extremes, steps or slopes on the route
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Improvised methods:
                      </strong>{" "}
                      Workers developing their own techniques or workarounds
                      (which may introduce new risks) because the planned method
                      does not work in practice
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Observation Tip:
                  </strong>{" "}
                  Observe at different times &mdash; start of shift (when workers
                  are fresh), end of shift (when fatigued), during peak workload
                  (when time pressure is highest), and during deliveries (when
                  unplanned handling may occur). The hazards you see may be very
                  different at each time.
                </p>
              </div>

              <p>
                Task analysis takes observation further by systematically
                breaking down each manual handling task into its component steps
                and assessing the risk at each stage. This is particularly
                valuable for complex or multi-stage tasks where the hazards may
                not be obvious at first glance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Task Analysis Steps
                </p>
                <ol className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      1
                    </span>
                    <span>List every step in the manual handling task from start to finish</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      2
                    </span>
                    <span>For each step, identify the postures adopted and forces applied</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      3
                    </span>
                    <span>Assess which steps present the highest risk of injury</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      4
                    </span>
                    <span>Determine whether any steps can be eliminated, modified, or mechanised</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      5
                    </span>
                    <span>Record findings and implement controls for the highest-risk steps</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Injury Data Review */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            Injury Data Review
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reviewing historical injury data and sickness absence records
                is a powerful way to identify manual handling hazards that are
                already causing harm. Patterns in the data reveal which tasks,
                areas, or conditions are most problematic.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Data Sources to Review
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Accident/incident reports:
                      </strong>{" "}
                      Look for reports involving strains, sprains, back pain,
                      shoulder injuries, and other musculoskeletal problems.
                      Note the task being performed, the body part affected, and
                      the circumstances.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Sickness absence records:
                      </strong>{" "}
                      Musculoskeletal-related absences are a strong indicator of
                      ongoing manual handling problems. Look for patterns by
                      department, job role, time of year, or specific tasks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Near-miss reports:
                      </strong>{" "}
                      Near misses (dropped loads, stumbles while carrying, loads
                      that nearly fell) are early warnings of future injuries.
                      They indicate hazards that have not yet caused harm but
                      easily could.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        RIDDOR reports:
                      </strong>{" "}
                      Any manual handling injury that results in over-seven-day
                      absence must be reported under RIDDOR. These reports
                      indicate serious hazards that require urgent attention.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Occupational health records:
                      </strong>{" "}
                      Pre-employment and periodic health assessments may reveal
                      trends in musculoskeletal health across the workforce.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Pattern Recognition
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The most valuable finding from injury data review is{" "}
                  <strong className="text-white">patterns</strong>. A single
                  injury from an unusual event may be a one-off. But repeated
                  injuries from the same task, the same area, or the same type
                  of load indicate a <strong className="text-white">systemic hazard</strong>{" "}
                  that requires redesign, not just a reminder to &ldquo;lift
                  properly.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Worker Consultation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            <Users className="h-5 w-5 text-emerald-400" />
            Worker Consultation
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The people who perform manual handling tasks every day are your
                single best source of information about the hazards involved.
                Workers know which tasks cause them discomfort, which
                workarounds they have developed, which mechanical aids are
                impractical, and where the real problems lie. Consulting them
                is not just good practice &mdash; it is a{" "}
                <strong>legal requirement</strong> under the Safety
                Representatives and Safety Committees Regulations 1977 and the
                Health and Safety (Consultation with Employees) Regulations
                1996.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Effective Consultation Methods
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Informal conversations:
                      </strong>{" "}
                      Talk to workers during their tasks. Ask &ldquo;Which parts
                      of this job are hardest on your body?&rdquo; and
                      &ldquo;If you could change one thing about this task, what
                      would it be?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Structured interviews:
                      </strong>{" "}
                      Use a prepared questionnaire covering each TILE factor to
                      ensure nothing is missed. Include questions about pain,
                      discomfort, fatigue, and any workarounds workers have
                      developed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Body mapping:
                      </strong>{" "}
                      Ask workers to mark on a body diagram where they
                      experience pain or discomfort after performing specific
                      tasks. This reveals patterns that link injuries to
                      particular operations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Toolbox talks and team meetings:
                      </strong>{" "}
                      Raise manual handling as a topic and invite workers to
                      share their experiences and suggestions in a group setting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Anonymous reporting:
                      </strong>{" "}
                      Some workers may be reluctant to raise concerns directly.
                      Providing an anonymous reporting mechanism (suggestion box,
                      online form) can capture issues that would otherwise go
                      unreported.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Key Point:</strong>{" "}
                  Consultation must be genuine, not a tick-box exercise. Workers
                  can tell when their input is not valued, and they will stop
                  reporting concerns. Act on the information you receive, feed
                  back the results, and explain what has been changed as a result
                  of their input.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: HSE Assessment Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            <ClipboardList className="h-5 w-5 text-emerald-400" />
            HSE Assessment Tools
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive (HSE) has published several
                practical assessment tools that provide a structured, repeatable
                method for evaluating manual handling risks. These tools are
                freely available and do not require specialist training to use,
                though training improves accuracy.
              </p>

              {/* MAC Tool */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-emerald-400 mb-2">
                  MAC &mdash; Manual Handling Assessment Charts
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The MAC tool is the most widely used HSE manual handling
                  assessment tool. It is designed for three types of operation:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lifting operations:</strong>{" "}
                      Individual workers lifting, lowering, or carrying loads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Carrying operations:
                      </strong>{" "}
                      Transporting loads over a distance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Team handling operations:
                      </strong>{" "}
                      Two or more workers lifting together
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80">
                  The MAC tool assesses specific risk factors (load weight,
                  hand distance from lower back, trunk posture, frequency, carry
                  distance, and other factors) and assigns each a colour-coded
                  risk rating. The individual ratings are then combined to give
                  an overall numerical score and risk level.
                </p>
              </div>

              {/* RAPP Tool */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-emerald-400 mb-2">
                  RAPP &mdash; Risk Assessment of Pushing and Pulling
                </p>
                <p className="text-sm text-white/80 mb-3">
                  RAPP is specifically designed for tasks involving pushing or
                  pulling loads, such as:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Moving trolleys, roll cages, and wheeled equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Operating manual pallet trucks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Pulling cable through conduit or trunking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Dragging equipment or materials into position</span>
                  </li>
                </ul>
              </div>

              {/* ART Tool */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-emerald-400 mb-2">
                  ART &mdash; Assessment of Repetitive Tasks
                </p>
                <p className="text-sm text-white/80 mb-3">
                  ART is designed for tasks involving repetitive movements of the
                  upper limbs (arms, wrists, hands, fingers). For electricians,
                  relevant tasks include:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Repetitive cable stripping and preparation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Crimping and terminating connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Repetitive screw driving and fixing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Assembly-line wiring tasks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MAC Risk Assessment Colour Bands Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            MAC Risk Assessment Colour Bands
          </h2>
          <div className="space-y-3">
            {/* Green */}
            <div className="bg-white/5 border border-green-500/30 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="bg-green-500/20 border-b sm:border-b-0 sm:border-r border-green-500/30 px-4 py-3 sm:w-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 mx-auto mb-1" />
                    <p className="text-xs font-bold text-green-400">GREEN</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex-1">
                  <p className="text-sm font-bold text-green-400 mb-1">
                    Low Risk
                  </p>
                  <p className="text-sm text-white/80">
                    The manual handling operation is within acceptable limits.
                    No immediate action is required, but continue to monitor
                    and maintain good practice. Review if conditions change.
                  </p>
                </div>
              </div>
            </div>

            {/* Amber */}
            <div className="bg-white/5 border border-amber-500/30 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="bg-amber-500/20 border-b sm:border-b-0 sm:border-r border-amber-500/30 px-4 py-3 sm:w-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 mx-auto mb-1" />
                    <p className="text-xs font-bold text-amber-400">AMBER</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex-1">
                  <p className="text-sm font-bold text-amber-400 mb-1">
                    Medium Risk
                  </p>
                  <p className="text-sm text-white/80">
                    Further assessment is needed. Examine the task more closely,
                    consider control measures, and implement improvements. This
                    level indicates the task should be improved in the medium
                    term.
                  </p>
                </div>
              </div>
            </div>

            {/* Red */}
            <div className="bg-white/5 border border-red-500/30 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="bg-red-500/20 border-b sm:border-b-0 sm:border-r border-red-500/30 px-4 py-3 sm:w-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-red-500 mx-auto mb-1" />
                    <p className="text-xs font-bold text-red-400">RED</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex-1">
                  <p className="text-sm font-bold text-red-400 mb-1">
                    High Risk
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">
                      Prompt action is required.
                    </strong>{" "}
                    The task poses a significant risk of injury and must be
                    improved as soon as possible. Implement control measures
                    immediately and plan task redesign.
                  </p>
                </div>
              </div>
            </div>

            {/* Purple */}
            <div className="bg-white/5 border border-purple-500/30 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="bg-purple-500/20 border-b sm:border-b-0 sm:border-r border-purple-500/30 px-4 py-3 sm:w-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500 mx-auto mb-1" />
                    <p className="text-xs font-bold text-purple-400">PURPLE</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex-1">
                  <p className="text-sm font-bold text-purple-400 mb-1">
                    Very High Risk
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">
                      Activities should be stopped
                    </strong>{" "}
                    until improvements are made. This is the most serious
                    category and indicates an unacceptable level of risk. The
                    task must be redesigned, mechanised, or eliminated before
                    work continues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
            <p className="text-sm text-white">
              <strong className="text-emerald-400">
                Using the colour bands:
              </strong>{" "}
              Each risk factor in the MAC assessment is individually colour-coded.
              The overall risk score is the sum of the individual numerical
              scores. A single purple or red factor can make an otherwise
              &ldquo;green&rdquo; task high-risk &mdash; the highest individual
              rating should drive the urgency of action.
            </p>
          </div>
        </section>

        {/* Section 05: Applying Assessment Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Applying Assessment Tools on Site
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HSE assessment tools are most effective when used as part of
                a systematic approach to hazard identification, rather than in
                isolation. The recommended workflow combines observation,
                consultation, and data review with structured tool-based
                assessment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Recommended Assessment Workflow
                </p>
                <ol className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Walk the workplace</strong>{" "}
                      and observe all manual handling tasks currently being performed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">Consult workers</strong>{" "}
                      about which tasks cause the most problems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">Review injury data</strong>{" "}
                      to identify tasks already causing harm
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">Prioritise</strong> the
                      highest-risk tasks for detailed assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">Apply the correct HSE tool</strong>{" "}
                      (MAC for lifting, RAPP for push/pull, ART for repetitive)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-emerald-400">
                      6
                    </span>
                    <span>
                      <strong className="text-white">Record, implement, and review</strong>{" "}
                      the findings and control measures
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Mistake
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Do not rely on a single assessment method. Observation alone
                  may miss tasks performed at other times. Data review alone
                  only reveals hazards that have already caused injury. Worker
                  consultation alone may underestimate risks that workers have
                  become accustomed to. The combination of all methods provides
                  the most complete picture.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: TILE Framework
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-3-section-3">
              Next: Mechanical Aids
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
