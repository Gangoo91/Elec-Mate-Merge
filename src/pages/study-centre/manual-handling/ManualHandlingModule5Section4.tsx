import {
  ArrowLeft,
  Scale,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  GraduationCap,
  Shield,
  Users,
  ShieldAlert,
  ClipboardCheck,
  Eye,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    id: "employer-hierarchy",
    question:
      "Under the MHOR 1992, what is the FIRST thing an employer must do when a manual handling task is identified?",
    options: [
      "Provide training on correct lifting technique",
      "Issue PPE such as back support belts",
      "Avoid the hazardous manual handling operation altogether, so far as is reasonably practicable",
      "Carry out a risk assessment and provide mechanical aids",
    ],
    correctIndex: 2,
    explanation:
      "The MHOR 1992 follows a clear hierarchy. The FIRST duty is to AVOID hazardous manual handling so far as is reasonably practicable — can the task be eliminated, automated, or redesigned so that manual handling is not needed? Only if avoidance is not reasonably practicable does the employer move to step 2: assess the remaining risk. Training alone is never sufficient if the task could have been avoided or mechanised.",
  },
  {
    id: "employee-duty",
    question:
      "Which of the following is an employee's duty under the MHOR 1992?",
    options: [
      "Writing the manual handling risk assessment for their own tasks",
      "Deciding whether to use mechanical aids based on their own experience",
      "Using the systems of work provided by the employer, cooperating with training, and reporting problems",
      "Carrying out RIDDOR reports for manual handling injuries",
    ],
    correctIndex: 2,
    explanation:
      "Under the MHOR 1992 and the Health and Safety at Work Act 1974, employees have a duty to: use the systems of work provided by their employer, use mechanical aids when provided, cooperate with manual handling training, and report any problems, difficulties, or symptoms to their supervisor. Writing risk assessments and RIDDOR reports are employer responsibilities.",
  },
  {
    id: "training-refresh",
    question:
      "How often should manual handling training be refreshed?",
    options: [
      "Only once — initial training is sufficient for a whole career",
      "Every 1 to 3 years, or sooner if tasks, equipment, or legislation change",
      "Every 10 years",
      "Refresher training is optional and has no recommended frequency",
    ],
    correctIndex: 1,
    explanation:
      "Industry best practice and HSE guidance recommend refresher training every 1 to 3 years. The exact frequency depends on the risk level of the tasks, the worker's role, and whether anything has changed (new tasks, new equipment, new legislation, or after incidents). Training should also be repeated if a worker moves to a new role or returns after long-term absence.",
  },
];

const faqs = [
  {
    question:
      "Does the MHOR 1992 set a maximum weight that workers can lift?",
    answer:
      "No. The MHOR 1992 deliberately does NOT set a maximum weight limit. This is because the risk of injury depends on many factors beyond just the weight — the posture, distance from the body, twisting, repetition, individual capability, and environment all affect the risk. The HSE provides guideline figures (25 kg for men, 16 kg for women in the best-case posture) as a starting point for assessment, but these are NOT legal limits. They are filters to help identify tasks that need a more detailed assessment. A 10 kg load can be dangerous if handled repeatedly, at arms' length, in an awkward posture.",
  },
  {
    question:
      "Who can be a 'competent person' to carry out manual handling assessments?",
    answer:
      "A competent person for manual handling assessment is someone who has sufficient training, experience, and knowledge to identify the hazards, assess the risks, and recommend appropriate control measures. This does not require a specific qualification, but the person should have: a thorough understanding of the MHOR 1992 and the TILE framework, practical experience of the types of manual handling tasks being assessed, knowledge of available control measures and mechanical aids, and the ability to record and communicate their findings clearly. Many organisations use trained supervisors, health and safety officers, or external consultants.",
  },
  {
    question:
      "Can an employer simply provide a back support belt instead of doing a proper risk assessment?",
    answer:
      "No. Back support belts are NOT a substitute for a proper risk assessment and the hierarchy of controls. The HSE does not recommend back support belts as a control measure for manual handling because there is no reliable evidence that they prevent injuries. They may even increase risk by giving workers a false sense of security, encouraging them to lift heavier loads or use poorer technique. The employer must follow the MHOR 1992 hierarchy: avoid, assess, reduce. PPE (personal protective equipment) is always the last resort, and back support belts do not qualify as effective PPE for manual handling.",
  },
  {
    question:
      "What is the difference between a toolbox talk and formal manual handling training?",
    answer:
      "Formal manual handling training is a structured programme that covers the full curriculum: legislation, TILE assessment, kinetic lifting technique, mechanical aids, risk assessment, and practical demonstration. It is typically delivered by a qualified trainer and takes several hours. A toolbox talk is a short (5-15 minute), focused briefing on a specific topic — for example, 'using the new electric pallet truck' or 'correct technique for lifting cable drums.' Toolbox talks reinforce and supplement formal training but do NOT replace it. Both are essential components of an effective manual handling training programme.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the correct order of the employer's duty hierarchy under the MHOR 1992?",
    options: [
      "Assess, Avoid, Reduce, Inform",
      "Avoid, Assess, Reduce, Inform",
      "Train, Assess, Monitor, Review",
      "Reduce, Avoid, Inform, Assess",
    ],
    correctAnswer: 1,
    explanation:
      "The MHOR 1992 hierarchy is: (1) AVOID hazardous manual handling so far as is reasonably practicable; (2) ASSESS the risk of any remaining manual handling that cannot be avoided; (3) REDUCE the risk to the lowest level reasonably practicable; (4) provide INFORMATION on the weight and centre of gravity of loads. This hierarchy must be followed in order — you cannot skip straight to training without first considering avoidance and reduction.",
  },
  {
    id: 2,
    question:
      "Under the MHOR 1992, what information must an employer provide to workers about loads they will be handling?",
    options: [
      "Only the colour of the load for identification",
      "The weight of the load and, where the centre of gravity is not central, the heaviest side",
      "Only verbal reassurance that the load is safe to lift",
      "No information is required — workers should assess loads themselves",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4(1)(b)(iii) of the MHOR 1992 requires employers to provide workers with information about the weight of each load and, where the centre of gravity is not at the geometric centre, to indicate which side is the heaviest. This enables workers to plan their lift correctly and judge whether mechanical aids or team lifting is needed.",
  },
  {
    id: 3,
    question:
      "Which of the following is NOT an employee's duty under the MHOR 1992?",
    options: [
      "Using the systems of work provided by the employer",
      "Using mechanical aids when they are provided",
      "Writing the risk assessment for their own manual handling tasks",
      "Reporting problems, symptoms, and difficulties to their supervisor",
    ],
    correctAnswer: 2,
    explanation:
      "Writing risk assessments is an EMPLOYER duty, not an employee duty. Employees must: use the safe systems of work provided, use mechanical aids when available, cooperate with training, and report any problems. However, employees should contribute to the assessment process by sharing their knowledge of the task.",
  },
  {
    id: 4,
    question:
      "What makes a person 'competent' to carry out manual handling risk assessments?",
    options: [
      "They must hold a university degree in ergonomics",
      "They must be the most senior person on site",
      "They must have sufficient training, experience, and knowledge to identify hazards and recommend controls",
      "Any worker can carry out a risk assessment without any training",
    ],
    correctAnswer: 2,
    explanation:
      "Competence is defined by having sufficient training, experience, and knowledge — not by a specific qualification or job title. The competent person must understand the MHOR 1992, the TILE framework, the types of tasks being assessed, and the available control measures. This might be a trained supervisor, a health and safety professional, or an external consultant.",
  },
  {
    id: 5,
    question:
      "What should good manual handling training ALWAYS include, in addition to theory?",
    options: [
      "A written exam lasting at least 2 hours",
      "Practical demonstration and hands-on practice of correct technique",
      "A tour of the nearest hospital to show the consequences of injury",
      "Only a certificate of attendance — practical skills are not required",
    ],
    correctAnswer: 1,
    explanation:
      "Good manual handling training must include practical demonstration and hands-on practice. Theory alone is insufficient because manual handling is a physical skill. Workers need to practise the kinetic lifting technique under supervision, receive feedback on their posture and movements, and have the opportunity to ask questions about their specific tasks. A certificate without practical competence is meaningless.",
  },
  {
    id: 6,
    question:
      "How often does HSE guidance and industry best practice recommend refresher training for manual handling?",
    options: [
      "Once every 10 years",
      "Only after an injury has occurred",
      "Every 1 to 3 years, depending on the risk level and any changes to tasks or equipment",
      "Refresher training is not recommended — initial training is sufficient",
    ],
    correctAnswer: 2,
    explanation:
      "HSE guidance and industry best practice recommend refresher training every 1 to 3 years. Higher-risk roles may need more frequent refreshers. Training should also be refreshed when tasks change, new equipment is introduced, after incidents, when legislation changes, or when a worker moves to a new role or returns after extended absence.",
  },
  {
    id: 7,
    question:
      "What is the purpose of toolbox talks in the context of manual handling?",
    options: [
      "They replace formal manual handling training entirely",
      "They provide short, focused reinforcement of specific manual handling topics relevant to current work",
      "They are only required if a worker has been injured",
      "They are purely social events with no safety content",
    ],
    correctAnswer: 1,
    explanation:
      "Toolbox talks are short (5-15 minute) focused briefings that reinforce specific aspects of manual handling relevant to current tasks. For example, a talk on correct technique for a specific load, how to use a new piece of equipment, or lessons learned from a recent near miss. They supplement but do NOT replace formal training.",
  },
  {
    id: 8,
    question:
      "What is the role of supervision and monitoring in manual handling safety?",
    options: [
      "Supervision is only needed for workers under 18",
      "Supervision ensures that safe systems of work, correct technique, and mechanical aids are actually being used in practice",
      "Supervision is optional if workers have been trained",
      "Supervision only involves checking that work is completed on time",
    ],
    correctAnswer: 1,
    explanation:
      "Supervision and monitoring are essential to ensure that what was planned is actually being done in practice. Training teaches workers the correct way; supervision checks that they are doing it consistently. This includes observing technique, checking that mechanical aids are being used, ensuring risk assessments are being followed, and identifying any new or changing hazards. Without supervision, unsafe practices can develop unnoticed.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ManualHandlingModule5Section4() {
  useSEO({
    title:
      "Roles, Responsibilities & Training | Manual Handling Module 5.4",
    description:
      "Employer and employee duties under MHOR 1992, competent person requirements, training content, refresher schedules, toolbox talks, supervision and monitoring.",
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
            <Link to="../manual-handling-module-5">
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
            <Scale className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 5 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Roles, Responsibilities &amp; Training
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Employer and employee duties under MHOR 1992, competent persons
            for assessment, training requirements, toolbox talks, and the
            role of supervision and monitoring
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Employer hierarchy:</strong> avoid &rarr; assess
                  &rarr; reduce &rarr; inform
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Employee duties:</strong> use systems provided,
                  cooperate, report
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Refresher:</strong> every 1&ndash;3 years or when
                  tasks change
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>No weight limit</strong> in law &mdash; risk depends
                  on many factors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Training must be practical</strong> &mdash; not
                  theory-only
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Supervision</strong> ensures safe practice in the
                  real world
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "State the employer's four-step duty hierarchy under the MHOR 1992",
              "Explain what information employers must provide about loads (weight and centre of gravity)",
              "Describe the employee's duties under the MHOR 1992 and HSWA 1974",
              "Define what makes a person 'competent' to carry out manual handling assessments",
              "Outline the content requirements for effective manual handling training",
              "State the recommended refresher training frequency and triggers for re-training",
              "Explain the role of toolbox talks, supervision, and monitoring in maintaining safe practice",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Employer Duties Under MHOR 1992 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            Employer Duties Under MHOR 1992
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Manual Handling Operations Regulations 1992 (as amended)
                place clear duties on employers. These duties follow a{" "}
                <strong>strict hierarchy</strong> &mdash; each step must be
                considered in order. You cannot skip straight to training
                without first considering whether the task can be avoided or
                mechanised.
              </p>

              <div className="space-y-3">
                {/* Duty 1 — Avoid */}
                <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">1</span>
                    </div>
                    <div>
                      <p className="text-emerald-400 text-base font-bold">
                        AVOID
                      </p>
                      <p className="text-xs text-white/60">
                        So far as is reasonably practicable
                      </p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1 ml-11">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Can the manual handling be eliminated entirely?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Can the task be automated or mechanised?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Can materials be delivered directly to the point of use?</span>
                    </li>
                  </ul>
                </div>

                {/* Duty 2 — Assess */}
                <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">2</span>
                    </div>
                    <div>
                      <p className="text-amber-400 text-base font-bold">
                        ASSESS
                      </p>
                      <p className="text-xs text-white/60">
                        Any remaining manual handling that cannot be avoided
                      </p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1 ml-11">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Use the TILE framework: Task, Individual, Load, Environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Assessment must be suitable and sufficient</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Must be reviewed when circumstances change</span>
                    </li>
                  </ul>
                </div>

                {/* Duty 3 — Reduce */}
                <div className="bg-orange-500/15 border-2 border-orange-500/40 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">3</span>
                    </div>
                    <div>
                      <p className="text-orange-400 text-base font-bold">
                        REDUCE
                      </p>
                      <p className="text-xs text-white/60">
                        Risk to the lowest level reasonably practicable
                      </p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1 ml-11">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Provide mechanical aids (trolleys, hoists, conveyors)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Reduce load weight, improve load design and handles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Improve the working environment (surfaces, lighting, space)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Organise team lifting where individual handling is too risky</span>
                    </li>
                  </ul>
                </div>

                {/* Duty 4 — Inform */}
                <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">4</span>
                    </div>
                    <div>
                      <p className="text-blue-400 text-base font-bold">
                        INFORM
                      </p>
                      <p className="text-xs text-white/60">
                        Provide information on load weight and centre of gravity
                      </p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1 ml-11">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Label loads with their weight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Indicate the heaviest side where the centre of gravity is offset</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Provide training on correct technique and available aids</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Employee Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Employee Duties
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While the primary duties under the MHOR 1992 rest with the
                employer, employees also have important legal
                responsibilities. These come from both the MHOR 1992 and the
                Health and Safety at Work Act 1974 (Section 7).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    Employee Responsibilities
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Use systems of work provided:
                      </strong>{" "}
                      follow the procedures, techniques, and methods your
                      employer has established for manual handling tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Use mechanical aids:
                      </strong>{" "}
                      when trolleys, hoists, or other aids are provided, use
                      them &mdash; do not bypass them to &ldquo;save
                      time&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Report problems:
                      </strong>{" "}
                      report any difficulties, symptoms, broken equipment,
                      or unsafe conditions to your supervisor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cooperate with training:
                      </strong>{" "}
                      attend manual handling training, apply what you learn,
                      and participate in refresher sessions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Take reasonable care:
                      </strong>{" "}
                      do not put yourself or others at risk through your
                      actions or omissions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Disclose conditions:
                      </strong>{" "}
                      inform your employer of any pre-existing condition that
                      may affect your ability to carry out manual handling
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Consequences of Not Following Duties
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Employees who deliberately ignore safe systems of work,
                  bypass mechanical aids, or fail to cooperate with training
                  can face disciplinary action from their employer. In
                  serious cases, employees can also be prosecuted under
                  Section 7 of the Health and Safety at Work Act 1974 for
                  failing to take reasonable care for the safety of
                  themselves and others.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Competent Person for MH Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Competent Person for MH Assessment
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The MHOR 1992 requires that manual handling risk assessments
                are carried out by a{" "}
                <strong>competent person</strong>. Competence is not defined
                by a specific certificate but by a combination of training,
                experience, and knowledge.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    What Makes a Person Competent?
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Understanding of MHOR 1992:
                      </strong>{" "}
                      knows the legal requirements, the duty hierarchy, and
                      the employer&rsquo;s obligations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        TILE framework knowledge:
                      </strong>{" "}
                      can apply the Task, Individual, Load, Environment
                      assessment systematically
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Practical experience:
                      </strong>{" "}
                      has hands-on knowledge of the types of manual handling
                      tasks being assessed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Control measure knowledge:
                      </strong>{" "}
                      knows what mechanical aids, workplace adjustments, and
                      procedural changes are available
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Communication skills:
                      </strong>{" "}
                      can record findings clearly and communicate
                      recommendations effectively
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Training Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Training Requirements
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Manual handling training is a legal requirement under the
                MHOR 1992. However, not all training is created equal. The
                HSE is clear that{" "}
                <strong>
                  training must be practical and task-specific
                </strong>{" "}
                &mdash; a generic presentation alone is not sufficient.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    Types of Manual Handling Training
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-emerald-400 mb-1">
                      Initial Induction Training
                    </p>
                    <p className="text-xs text-white/70">
                      Provided to all new workers before they carry out any
                      manual handling. Covers the basics: legislation, TILE,
                      kinetic technique, how to use mechanical aids, and
                      reporting procedures.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-amber-400 mb-1">
                      Task-Specific Training
                    </p>
                    <p className="text-xs text-white/70">
                      Focused on the specific manual handling tasks the
                      worker will actually perform. Includes practical
                      demonstration and supervised practice with the actual
                      loads, equipment, and working conditions.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-400 mb-1">
                      Practical Demonstration
                    </p>
                    <p className="text-xs text-white/70">
                      Workers must practise correct technique under
                      supervision. Observation, feedback, and correction are
                      essential. A worker cannot be considered trained if
                      they have only watched a video or read a handout.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <RefreshCw className="h-3 w-3 text-purple-400" />
                      <p className="text-sm font-medium text-purple-400">
                        Refresher Training (Every 1&ndash;3 Years)
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Reinforces correct technique, addresses any bad habits
                      that have developed, covers any changes to tasks,
                      equipment, or legislation, and incorporates lessons
                      learned from recent incidents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: What Good MH Training Covers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            What Good MH Training Covers
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective manual handling training covers both theory and
                practice. The following are the core topics that should be
                included in any comprehensive training programme.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Core Training Content
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">TILE assessment:</strong>{" "}
                      how to assess any manual handling task using Task,
                      Individual, Load, Environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Kinetic lifting technique:
                      </strong>{" "}
                      correct posture, foot placement, grip, lifting
                      sequence, and the importance of keeping the load close
                      to the body
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Mechanical aids:
                      </strong>{" "}
                      what aids are available, how to use them correctly, and
                      when they are required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Risk assessment:
                      </strong>{" "}
                      how to recognise hazards and make dynamic assessments
                      before each lift
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Team lifting:
                      </strong>{" "}
                      when team lifts are needed, how to coordinate, and the
                      role of the lead lifter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reporting procedures:
                      </strong>{" "}
                      how to report injuries, near misses, and difficulties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        MSD awareness:
                      </strong>{" "}
                      understanding the types of injuries that can result and
                      why early reporting is critical
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MHOR 1992 Duty Hierarchy Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-400" />
            MHOR 1992 Duty Hierarchy
          </h2>

          <div className="bg-gradient-to-b from-emerald-500/5 to-emerald-500/15 border border-emerald-500/20 rounded-xl p-5 sm:p-6">
            <h4 className="text-sm font-bold text-emerald-400 mb-5 text-center">
              Employer Obligations Flowchart
            </h4>

            <div className="max-w-lg mx-auto space-y-2">
              {/* Question 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-white">
                  Does the task involve manual handling?
                </p>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <span className="text-xs text-emerald-400 font-semibold my-1">YES</span>
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 1 */}
              <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">1</span>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-sm font-bold">
                      Can you AVOID it?
                    </p>
                    <p className="text-xs text-white/60">
                      Eliminate, automate, or redesign the task
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <span className="text-xs text-red-400 font-semibold my-1">CANNOT AVOID</span>
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">2</span>
                  </div>
                  <div>
                    <p className="text-amber-400 text-sm font-bold">
                      ASSESS the risk (TILE)
                    </p>
                    <p className="text-xs text-white/60">
                      Task, Individual, Load, Environment
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-orange-500/15 border-2 border-orange-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">3</span>
                  </div>
                  <div>
                    <p className="text-orange-400 text-sm font-bold">
                      REDUCE risk to lowest ALARP
                    </p>
                    <p className="text-xs text-white/60">
                      Mechanical aids, task redesign, team lifts
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">4</span>
                  </div>
                  <div>
                    <p className="text-blue-400 text-sm font-bold">
                      INFORM workers
                    </p>
                    <p className="text-xs text-white/60">
                      Load weight, centre of gravity, training
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Review */}
              <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-400 text-sm font-bold">
                      REVIEW regularly
                    </p>
                    <p className="text-xs text-white/60">
                      When tasks change, after incidents, or at least annually
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-white/50 text-xs italic text-center mt-5">
              This hierarchy must be followed in order. Training and PPE are
              NOT substitutes for avoidance, assessment, and risk reduction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Toolbox Talks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Toolbox Talks
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Toolbox talks are short, focused briefings (typically
                5&ndash;15 minutes) delivered on site. They are a vital tool
                for reinforcing manual handling safety in the context of
                current work activities.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Effective Manual Handling Toolbox Talk Topics
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Correct technique for a specific task</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>How to use a new mechanical aid</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Lessons learned from a recent near miss</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Fatigue management and rest break scheduling</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Team lifting coordination for a specific load</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Seasonal risks (cold weather, hot weather)</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-400">Important:</strong>{" "}
                  Toolbox talks <strong>supplement</strong> formal training
                  &mdash; they do <strong>NOT replace</strong> it. A toolbox
                  talk cannot be the only manual handling training a worker
                  receives. However, regular toolbox talks are one of the
                  most effective ways to keep manual handling safety at the
                  forefront of workers&rsquo; minds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Supervision & Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Supervision &amp; Monitoring
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Training tells workers what to do. Supervision ensures they{" "}
                <strong>actually do it</strong>. Without effective supervision
                and monitoring, unsafe practices can develop unnoticed and
                become normalised.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    What Supervision Should Check
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Correct technique:
                      </strong>{" "}
                      are workers using the kinetic lifting method, or have
                      bad habits developed?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Mechanical aids in use:
                      </strong>{" "}
                      are the provided aids actually being used, or are they
                      sitting idle?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Risk assessments followed:
                      </strong>{" "}
                      are the procedures from the assessment being implemented
                      on the ground?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        New or changing hazards:
                      </strong>{" "}
                      has anything changed that the current assessment does
                      not cover?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Worker wellbeing:
                      </strong>{" "}
                      are workers showing signs of fatigue, pain, or
                      difficulty?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    The Supervision Cycle:
                  </strong>{" "}
                  Effective supervision is not a one-off event &mdash; it is
                  a continuous cycle of{" "}
                  <strong>observe, feedback, correct, reinforce</strong>.
                  Workers should see supervision as supportive, not punitive.
                  The goal is to maintain high standards and catch problems
                  early, not to find fault.
                </p>
              </div>
            </div>
          </div>
        </section>

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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Incident Reporting &amp; Investigation
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-6">
              Next: Module 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
