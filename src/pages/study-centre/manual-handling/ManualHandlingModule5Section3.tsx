import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  ClipboardList,
  Search,
  TrendingUp,
  ShieldAlert,
  Phone,
  FileWarning,
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
    id: "riddor-category",
    question:
      "What is the most common RIDDOR reportable category for manual handling injuries?",
    options: [
      "Fatal injuries",
      "Over-7-day incapacitation injuries",
      "Dangerous occurrences",
      "Occupational diseases reported within 24 hours",
    ],
    correctIndex: 1,
    explanation:
      "Over-7-day incapacitation is the most common RIDDOR reportable category for manual handling injuries. This applies when a worker is incapacitated from their normal work for more than seven consecutive days (not counting the day of the injury). The employer must report this to the HSE within 15 days using form F2508.",
  },
  {
    id: "root-cause",
    question:
      "During a manual handling injury investigation, which of the following is most likely to be identified as a root cause rather than an immediate cause?",
    options: [
      "The worker's back gave way while lifting",
      "A systematic failure to provide mechanical aids for tasks that had been assessed as requiring them",
      "The load was heavier than expected",
      "The worker was in a hurry",
    ],
    correctIndex: 1,
    explanation:
      "A root cause is a systemic or organisational failure that allowed the conditions for the injury to exist. A systematic failure to provide mechanical aids — despite assessments identifying the need for them — is a root cause because it represents a management failure. The worker's back giving way, the load being heavier than expected, and the worker being in a hurry are immediate or contributing causes, not root causes.",
  },
  {
    id: "near-miss",
    question:
      "Why is reporting near misses so valuable for preventing manual handling injuries?",
    options: [
      "Near misses are legally required to be reported under RIDDOR",
      "Near misses identify hazards and unsafe conditions before they result in actual injuries — they are free lessons",
      "Near misses always result in prosecution by the HSE",
      "Near misses are only relevant if a worker was physically injured",
    ],
    correctIndex: 1,
    explanation:
      "Near misses are invaluable because they highlight hazards, unsafe practices, and system failures BEFORE anyone is hurt. For every serious injury, there are typically hundreds of near misses. Each near miss is an opportunity to identify and fix a problem before it causes real harm. A strong near-miss reporting culture is one of the most effective injury prevention tools available.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between an over-7-day injury and a specified injury under RIDDOR?",
    answer:
      "An over-7-day injury is one where the worker is incapacitated from their normal work for more than seven consecutive days (not counting the day of injury). A specified injury is a more serious category that includes specific types of injury such as fractures (other than to fingers, thumbs, or toes), dislocations of the shoulder, hip, knee, or spine, amputations, and loss of sight. Specified injuries must be reported to the HSE immediately (within 24 hours), while over-7-day injuries must be reported within 15 days. Manual handling can cause both categories — a disc herniation causing over 7 days' absence is an over-7-day injury, while a vertebral fracture from dropping a heavy load would be a specified injury.",
  },
  {
    question:
      "Who is responsible for reporting a RIDDOR-reportable manual handling injury?",
    answer:
      "The employer (or the person in control of the premises where the work takes place) is responsible for reporting RIDDOR-reportable injuries. It is NOT the injured worker's responsibility to make the RIDDOR report, although the worker must report the injury to their employer in the first instance. The employer must then determine whether the injury meets the RIDDOR reporting threshold and, if so, report it using form F2508 via the HSE's online reporting system or by telephone for the most serious incidents.",
  },
  {
    question:
      "What should happen if the same manual handling task keeps causing injuries or near misses?",
    answer:
      "This indicates a systemic problem with the task itself, not just individual worker errors. The employer must carry out a thorough review of the task, starting with the original risk assessment. Questions to ask include: Is the task necessary, or can it be eliminated? Is the assessment adequate and up to date? Are the control measures actually being implemented? Are mechanical aids available and being used? Is training adequate? Trend analysis of repeated incidents at the same task or location is a powerful tool for identifying systemic failures. The employer has a legal duty to reduce the risk to the lowest level reasonably practicable — repeated injuries suggest this duty is not being met.",
  },
  {
    question:
      "Can I be disciplined for reporting a manual handling injury or near miss?",
    answer:
      "No. Workers have a legal right to report health and safety concerns, injuries, and near misses without fear of disciplinary action. Section 44 of the Employment Rights Act 1996 protects workers from detriment for raising health and safety concerns. If you are disciplined for reporting an injury or near miss, this may constitute an automatically unfair dismissal or detriment, and you would have grounds for an employment tribunal claim. A good employer actively encourages reporting because it helps prevent future injuries. If you feel your employer discourages reporting, you can contact the HSE or your trade union for advice.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under RIDDOR 2013, an over-7-day incapacitation injury must be reported to the HSE within how many days?",
    options: [
      "Immediately (within 24 hours)",
      "Within 7 days",
      "Within 15 days",
      "Within 30 days",
    ],
    correctAnswer: 2,
    explanation:
      "Over-7-day incapacitation injuries must be reported within 15 days of the incident. The 7 days refers to the duration of incapacitation, not the reporting deadline. Specified injuries and fatal injuries must be reported immediately (within 24 hours).",
  },
  {
    id: 2,
    question:
      "Which form is used to report a RIDDOR-reportable workplace injury to the HSE?",
    options: [
      "Form F2508",
      "Form HSE-01",
      "Form RIDDOR-7",
      "Form BI-510",
    ],
    correctAnswer: 0,
    explanation:
      "Form F2508 is the standard form used to report injuries, dangerous occurrences, and cases of disease to the HSE under RIDDOR. It can be submitted online through the HSE's reporting website. For the most serious incidents (fatalities and specified injuries), the initial report should be made by telephone, followed by the written F2508 within 24 hours.",
  },
  {
    id: 3,
    question:
      "Which of the following manual handling injuries would be classified as a 'specified injury' under RIDDOR?",
    options: [
      "Back strain causing 10 days' absence",
      "Bruised knee from dropping a load",
      "Fractured vertebra from a heavy load falling on the worker",
      "Muscle stiffness lasting 3 days",
    ],
    correctAnswer: 2,
    explanation:
      "A fractured vertebra is a specified injury under RIDDOR because it is a fracture (other than to fingers, thumbs, or toes). Specified injuries are the most serious reportable category and must be reported immediately. A back strain causing 10 days' absence would be an over-7-day incapacitation injury. Bruised knee and muscle stiffness would not meet the RIDDOR reporting threshold.",
  },
  {
    id: 4,
    question:
      "What is the PRIMARY purpose of a manual handling injury investigation?",
    options: [
      "To find someone to blame and discipline them",
      "To identify what happened, why it happened, and what changes will prevent it from happening again",
      "To complete the insurance claim paperwork",
      "To satisfy the HSE inspector during their visit",
    ],
    correctAnswer: 1,
    explanation:
      "The primary purpose of any workplace injury investigation is to establish what happened, why it happened (root cause), and what corrective actions will prevent recurrence. It is NOT about blame. A blame culture discourages reporting and hides the true causes of injuries. Effective investigations focus on systems, procedures, and conditions — not on punishing individuals.",
  },
  {
    id: 5,
    question:
      "Which of the following is a common ROOT cause of manual handling injuries, rather than an immediate cause?",
    options: [
      "The worker lifted with a bent spine",
      "The load was heavier than the worker expected",
      "Inadequate risk assessment that failed to identify the need for mechanical aids",
      "The worker slipped while carrying the load",
    ],
    correctAnswer: 2,
    explanation:
      "An inadequate risk assessment is a root cause — it is a systemic management failure that created the conditions for the injury. The worker lifting with a bent spine, the load being unexpectedly heavy, and slipping while carrying are all immediate or contributing causes. Root cause analysis asks 'why?' repeatedly until the underlying management system failure is identified.",
  },
  {
    id: 6,
    question:
      "What must an employer record in the accident book after a manual handling injury?",
    options: [
      "Only the worker's name and the date",
      "Details of the injured person, date, time, location, nature of the injury, how it happened, and first aid given",
      "Only injuries that require hospital treatment",
      "Nothing — the accident book is optional for manual handling injuries",
    ],
    correctAnswer: 1,
    explanation:
      "The employer must record comprehensive details in the accident book: the injured person's details, date and time of the incident, location, nature of the injury, how the injury occurred, treatment given, and any witnesses. Under the Social Security (Claims and Payments) Regulations 1979, employers must keep an accident book and record all workplace accidents. This record is also essential for RIDDOR compliance, insurance claims, and trend analysis.",
  },
  {
    id: 7,
    question:
      "What is trend analysis in the context of manual handling incidents?",
    options: [
      "Analysing fashion trends among construction workers",
      "Reviewing incident data over time to identify patterns — repeat tasks, locations, times, or worker groups with higher injury rates",
      "Tracking the cost of workplace injuries for budgeting purposes",
      "Monitoring weather patterns that might affect manual handling",
    ],
    correctAnswer: 1,
    explanation:
      "Trend analysis involves reviewing incident and near-miss data over time to identify patterns. This might reveal that a particular task, location, shift pattern, or time of day has a disproportionately high injury rate. These patterns point to systemic issues that can be addressed through targeted interventions — far more effective than reacting to individual incidents in isolation.",
  },
  {
    id: 8,
    question:
      "For the most serious RIDDOR-reportable incidents (fatalities and specified injuries), how should the initial report be made?",
    options: [
      "By email to the HSE within 7 days",
      "By letter to the local HSE office within 30 days",
      "By telephone to the HSE, followed by a written F2508 within 24 hours",
      "By posting on the HSE website forum",
    ],
    correctAnswer: 2,
    explanation:
      "For the most serious incidents — fatalities and specified injuries — the initial report must be made by telephone to the HSE Incident Contact Centre immediately. This must be followed by a written report on form F2508 within 24 hours. Less serious reportable incidents (over-7-day incapacitation) can be reported online within 15 days.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ManualHandlingModule5Section3() {
  useSEO({
    title:
      "Incident Reporting & Investigation | Manual Handling Module 5.3",
    description:
      "RIDDOR 2013 for manual handling, reporting process, accident book, investigation, root cause analysis, corrective actions, trend analysis, and near-miss culture.",
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
            <FileText className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 5 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Incident Reporting &amp; Investigation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            RIDDOR 2013 requirements, reporting processes, investigation
            techniques, root cause analysis, corrective actions, trend
            analysis, and building a near-miss reporting culture
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
                  <strong>RIDDOR:</strong> over-7-day incapacitation is the
                  most common MH reporting category
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Report:</strong> online F2508 or telephone for
                  serious incidents
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Investigate:</strong> what happened, why, root
                  cause, corrective actions
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
                  <strong>Over-7-day:</strong> report within 15 days
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Specified injuries:</strong> report within 24 hours
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Near misses</strong> are free lessons &mdash; report
                  every one
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
              "Explain which manual handling injuries are reportable under RIDDOR 2013",
              "Distinguish between over-7-day incapacitation and specified injuries",
              "Describe the RIDDOR reporting process — form F2508, online and telephone",
              "Outline the employer's internal reporting requirements (accident book, near-miss reports)",
              "Explain the investigation process from incident to corrective actions",
              "Identify common root causes of manual handling injuries at the organisational level",
              "Understand the value of trend analysis and near-miss reporting culture",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: RIDDOR 2013 for Manual Handling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            RIDDOR 2013 for Manual Handling
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Reporting of Injuries, Diseases and Dangerous Occurrences
                Regulations 2013 (RIDDOR) requires employers to report certain
                workplace injuries to the HSE. Manual handling injuries feature
                prominently in RIDDOR statistics &mdash;{" "}
                <strong>
                  over-7-day incapacitation is the most common reportable
                  category
                </strong>{" "}
                for manual handling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  RIDDOR Reportable Categories for Manual Handling
                </p>
                <div className="space-y-3">
                  {/* Over-7-day */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-amber-400">1</span>
                      </div>
                      <span className="text-sm font-semibold text-amber-400">
                        Over-7-Day Incapacitation (Most Common)
                      </span>
                    </div>
                    <p className="text-xs text-white/80 ml-8">
                      Worker incapacitated from normal work for more than 7
                      consecutive days (not counting the day of injury).
                      Report within <strong className="text-white">15 days</strong>.
                    </p>
                    <p className="text-xs text-white/60 ml-8 mt-1">
                      Examples: severe back strain, disc herniation causing
                      extended absence, torn ligament
                    </p>
                  </div>

                  {/* Specified injuries */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-red-400">2</span>
                      </div>
                      <span className="text-sm font-semibold text-red-400">
                        Specified Injuries
                      </span>
                    </div>
                    <p className="text-xs text-white/80 ml-8">
                      More serious injuries that must be reported{" "}
                      <strong className="text-white">immediately (within 24 hours)</strong>.
                    </p>
                    <ul className="text-xs text-white/70 ml-8 mt-1 space-y-0.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Fractures (other than fingers, thumbs, or toes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Dislocations of the shoulder, hip, knee, or spine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Amputations (e.g. crushing injury from dropped load)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Fatal */}
                  <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-red-600/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-red-300">3</span>
                      </div>
                      <span className="text-sm font-semibold text-red-300">
                        Fatal Injuries
                      </span>
                    </div>
                    <p className="text-xs text-white/80 ml-8">
                      Any death resulting from a workplace manual handling
                      incident. Report{" "}
                      <strong className="text-white">immediately by telephone</strong>,
                      followed by F2508 within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Reporting Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            The Reporting Process
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reporting a RIDDOR-notifiable injury involves a specific
                process depending on the severity of the incident. The
                employer (not the injured worker) is responsible for making
                the RIDDOR report.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    Reporting Methods
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Online (F2508):
                      </strong>{" "}
                      the standard method for most reports &mdash; submitted
                      through the HSE&rsquo;s online reporting system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Telephone:
                      </strong>{" "}
                      required for the most serious incidents (fatalities and
                      specified injuries) &mdash; call the HSE Incident
                      Contact Centre immediately
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What the F2508 Form Requires
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details of the injured person (name, occupation, age)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Date, time, and location of the incident</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Description of what happened and how the injury occurred</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Nature and severity of the injury</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details of the employer and reporting person</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Internal Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Internal Reporting
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In addition to RIDDOR reporting (which only applies to the
                most serious injuries), employers have internal reporting
                requirements that apply to{" "}
                <strong>ALL workplace injuries and near misses</strong>,
                regardless of severity.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    The Accident Book
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  Under the Social Security (Claims and Payments) Regulations
                  1979, every employer must maintain an accident book and
                  record <strong className="text-white">all</strong>{" "}
                  workplace accidents, no matter how minor.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details of the injured person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Date, time, and place of the accident</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>How the accident happened</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Nature of the injury</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>First aid or treatment given</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileWarning className="h-4 w-4 text-amber-400" />
                  <p className="text-sm font-medium text-white">
                    Near-Miss Reports
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  Near misses are incidents where no injury occurred{" "}
                  <strong className="text-white">but could have</strong>. They
                  are arguably more valuable than injury reports because they
                  provide a warning before anyone is hurt.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>A load slips from the hands but is caught before hitting anyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>A worker feels a sharp pain while lifting but the pain quickly subsides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>A pallet is found stacked unsafely but no one has been injured yet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>A mechanical aid breaks during use but no one is hurt</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Investigation Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Investigation Process
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every manual handling injury and significant near miss should
                be investigated. The purpose is{" "}
                <strong>not to blame</strong> but to understand what happened,
                why it happened, and how to prevent it from happening again.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    The Investigation Framework
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        What happened?
                      </p>
                      <p className="text-xs text-white/60">
                        Establish the facts &mdash; who, what, where, when,
                        how
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Why did it happen?
                      </p>
                      <p className="text-xs text-white/60">
                        Identify the immediate causes (the unsafe act or
                        condition)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        What was the root cause?
                      </p>
                      <p className="text-xs text-white/60">
                        Dig deeper &mdash; why did the immediate cause exist?
                        What management system failed?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        What corrective actions are needed?
                      </p>
                      <p className="text-xs text-white/60">
                        What changes to systems, procedures, equipment, or
                        training will prevent recurrence?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">5</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Implement and review
                      </p>
                      <p className="text-xs text-white/60">
                        Put corrective actions in place, assign
                        responsibility, set a review date
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Common Root Causes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Common Root Causes of Manual Handling Injuries
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Root causes are the underlying{" "}
                <strong>systemic or management failures</strong> that create
                the conditions for injuries to occur. They are not the
                immediate trigger (the &ldquo;how&rdquo;) but the deeper
                reason (the &ldquo;why&rdquo;) the conditions existed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Frequently Identified Root Causes
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inadequate risk assessment:
                      </strong>{" "}
                      the task was not assessed at all, or the assessment was
                      generic and did not reflect the actual conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No training provided:
                      </strong>{" "}
                      workers had not received manual handling training, or
                      training was out of date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No mechanical aids available:
                      </strong>{" "}
                      the assessment identified the need for trolleys, hoists,
                      or other aids, but they were not provided or were out of
                      service
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Time pressure:
                      </strong>{" "}
                      production targets or deadlines pressured workers into
                      taking shortcuts &mdash; skipping assessments, not
                      using aids, lifting alone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Poor planning:
                      </strong>{" "}
                      materials delivered to the wrong location, requiring
                      unnecessary manual handling to reposition them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inadequate supervision:
                      </strong>{" "}
                      workers not monitored to ensure safe practices were
                      being followed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Poor workplace layout:
                      </strong>{" "}
                      narrow access routes, uneven floors, poor lighting,
                      obstructed pathways
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MH Incident Investigation Flowchart Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-emerald-400" />
            MH Incident Investigation Flowchart
          </h2>

          <div className="bg-gradient-to-b from-emerald-500/5 to-emerald-500/15 border border-emerald-500/20 rounded-xl p-5 sm:p-6">
            <h4 className="text-sm font-bold text-emerald-400 mb-5 text-center">
              From Injury to Corrective Action
            </h4>

            <div className="space-y-2 max-w-lg mx-auto">
              {/* Step 1 */}
              <div className="bg-red-500/15 border-2 border-red-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">1</span>
                  </div>
                  <div>
                    <p className="text-red-400 text-sm font-bold">
                      INJURY OCCURS
                    </p>
                    <p className="text-xs text-white/60">
                      Immediate first aid &amp; make area safe
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-orange-500/15 border-2 border-orange-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">2</span>
                  </div>
                  <div>
                    <p className="text-orange-400 text-sm font-bold">
                      REPORT INTERNALLY
                    </p>
                    <p className="text-xs text-white/60">
                      Accident book entry &amp; notify supervisor
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">3</span>
                  </div>
                  <div>
                    <p className="text-amber-400 text-sm font-bold">
                      ASSESS RIDDOR THRESHOLD
                    </p>
                    <p className="text-xs text-white/60">
                      Over 7 days? Specified injury? Report if required
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">4</span>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-sm font-bold">
                      INVESTIGATE
                    </p>
                    <p className="text-xs text-white/60">
                      What happened? Why? Root cause analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">5</span>
                  </div>
                  <div>
                    <p className="text-blue-400 text-sm font-bold">
                      CORRECTIVE ACTIONS
                    </p>
                    <p className="text-xs text-white/60">
                      Changes to systems, procedures, equipment, or training
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-black">6</span>
                  </div>
                  <div>
                    <p className="text-purple-400 text-sm font-bold">
                      REVIEW &amp; MONITOR
                    </p>
                    <p className="text-xs text-white/60">
                      Check actions are effective &amp; feed into trend
                      analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-white/50 text-xs italic text-center mt-5">
              Every step must be documented. The investigation record becomes
              part of the organisation&rsquo;s safety management system.
            </p>
          </div>
        </section>

        {/* Section 06: Trend Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Trend Analysis
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Trend analysis involves reviewing incident and near-miss data
                over time to identify{" "}
                <strong>patterns and recurring themes</strong>. This is one of
                the most powerful tools available for preventing manual
                handling injuries at an organisational level.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    What Trend Analysis Can Reveal
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Repeat tasks:
                      </strong>{" "}
                      a specific task causes a disproportionate number of
                      injuries &mdash; the task needs redesigning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Repeat locations:
                      </strong>{" "}
                      a particular area has a high injury rate &mdash;
                      environmental factors may need addressing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Time patterns:
                      </strong>{" "}
                      injuries clustering at end of shifts or on specific
                      days &mdash; fatigue management may be inadequate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Worker groups:
                      </strong>{" "}
                      new workers, agency staff, or specific trades having
                      higher rates &mdash; training or supervision may be
                      inadequate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Equipment failures:
                      </strong>{" "}
                      repeated incidents involving specific mechanical aids
                      &mdash; maintenance programme may be failing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Near-Miss Culture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Building a Near-Miss Culture
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A near-miss culture is one where workers actively report
                incidents that <strong>could have</strong> caused injury but
                did not. Research consistently shows that for every serious
                injury, there are typically{" "}
                <strong>hundreds of near misses</strong>. Each near miss is a{" "}
                <strong>free lesson</strong> &mdash; an opportunity to fix a
                problem before someone gets hurt.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Building an Effective Near-Miss Reporting Culture
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Make reporting easy:
                      </strong>{" "}
                      simple forms, digital reporting, or verbal reports to
                      supervisors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No blame:
                      </strong>{" "}
                      workers must feel safe to report without fear of
                      criticism or punishment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Visible action:
                      </strong>{" "}
                      workers must see that their reports lead to real changes
                      &mdash; otherwise they stop reporting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Positive reinforcement:
                      </strong>{" "}
                      thank and acknowledge workers who report near misses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Share the lessons:
                      </strong>{" "}
                      communicate the outcomes of near-miss reports through
                      toolbox talks and site briefings
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Remember:</strong> A
                  high number of near-miss reports is a{" "}
                  <strong>positive sign</strong> &mdash; it means workers are
                  engaged and the organisation is identifying hazards before
                  they cause harm. A low number of near-miss reports is a
                  warning sign that problems are going unreported.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fitness, Fatigue &amp; Personal Factors
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-5-section-4">
              Next: Roles, Responsibilities &amp; Training
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
