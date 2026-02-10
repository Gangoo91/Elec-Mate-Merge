import {
  ArrowLeft,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  HardHat,
  FileText,
  Search,
  ShieldAlert,
  Phone,
  Eye,
  ArrowRight,
  Lightbulb,
  Scale,
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
    question:
      "A scaffold collapses on a construction site but nobody is injured. Does this need to be reported under RIDDOR?",
    options: [
      "No — RIDDOR only applies when someone is injured",
      "Yes — scaffold collapse is a dangerous occurrence and must be reported regardless of injury",
      "Only if the scaffold was above 4 metres high",
      "Only if the HSE requests the information",
    ],
    correctIndex: 1,
    explanation:
      "Scaffold collapse is classified as a dangerous occurrence under RIDDOR 2013 and must be reported regardless of whether anyone was injured. Dangerous occurrences are events with the potential to cause serious harm — the fact that no one was hurt this time does not remove the reporting obligation.",
  },
  {
    question:
      "An investigation identifies that a worker fell because they were not wearing a harness. The investigation concludes that the immediate cause was 'failure to wear PPE.' Is this a sufficient root cause?",
    options: [
      "Yes — the worker did not follow the rules, so the root cause is identified",
      "No — root cause analysis must go deeper: why were they not wearing it? Was it available? Were they trained? Was it enforced?",
      "Yes — PPE failure is always the root cause of falls",
      "No — root cause analysis is only needed for fatal accidents",
    ],
    correctIndex: 1,
    explanation:
      "The immediate cause (not wearing a harness) is the surface-level finding. Root cause analysis asks 'why?' repeatedly to find underlying failures: Was the harness provided? Was the worker trained? Was there supervision? Was the risk assessment adequate? These systemic failures are the true root causes.",
  },
  {
    question:
      "A worker on a scaffold trips over a loose board and nearly falls through a gap in the platform. They are uninjured. Should this be reported?",
    options: [
      "No — it was just a trip, not a real incident",
      "Only if the supervisor decides it is worth reporting",
      "Yes — it is a near miss and should be reported through the site near-miss reporting system",
      "Only if the worker wants to report it",
    ],
    correctIndex: 2,
    explanation:
      "Near misses are leading indicators of future accidents. This near miss reveals two hazards (loose board and gap in platform) that could cause a serious fall. Reporting it allows the organisation to fix the hazards before someone is injured. A strong near-miss reporting culture is one of the most effective accident prevention tools.",
  },
];

const faqs = [
  {
    question: "What is the time limit for reporting a fatal or specified injury under RIDDOR?",
    answer:
      "Fatal and specified injuries must be reported immediately — by telephone to the HSE Incident Contact Centre (0345 300 9923) for fatalities and major incidents, followed by an online report (F2508) within 10 days. Over-7-day incapacitation injuries must be reported online within 15 days of the incident. Dangerous occurrences must be reported without delay.",
  },
  {
    question: "Who is legally responsible for making the RIDDOR report?",
    answer:
      "The responsible person is the employer (if the injured person is an employee), the self-employed person (if they are injured while at work), or the person in control of the premises where the incident occurred. On a construction site, the principal contractor typically has this responsibility, but subcontractors also have duties for their own employees.",
  },
  {
    question:
      "What is the difference between a near miss and a dangerous occurrence?",
    answer:
      "A dangerous occurrence is a specific category defined in Schedule 2 of RIDDOR 2013 — it includes events like scaffold collapse, MEWP overturning, or unintended collapse of a structure. These MUST be reported to the HSE regardless of injury. A near miss is a broader term for any unplanned event that had the potential to cause harm but did not. Near misses should be reported internally through the organisation's safety management system but are not reportable under RIDDOR unless they fall into the dangerous occurrence category.",
  },
  {
    question:
      "Can a worker be blamed or disciplined for reporting a near miss?",
    answer:
      "A no-blame reporting culture means that workers are encouraged to report near misses without fear of disciplinary action. The purpose of near-miss reporting is to identify and fix hazards before they cause harm. If workers fear punishment for reporting, they will not report, and the organisation loses its most valuable source of safety intelligence. However, no-blame does not mean no-accountability — deliberate recklessness or willful disregard of safety rules is a separate matter from honest reporting of incidents.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under RIDDOR 2013, which of the following must be reported as a 'specified injury'?",
    options: [
      "A bruised knee from a minor trip",
      "A fractured wrist (not fingers or toes)",
      "A small cut requiring a plaster",
      "A headache from dehydration",
    ],
    correctAnswer: 1,
    explanation:
      "Fractures (other than to fingers, thumbs, or toes) are classified as specified injuries under RIDDOR 2013 and must be reported immediately. Minor injuries such as bruises, small cuts, and headaches are not RIDDOR-reportable.",
  },
  {
    id: 2,
    question:
      "A worker sustains an injury at work and is unable to carry out their normal duties for 8 working days. When must this be reported under RIDDOR?",
    options: [
      "Immediately by telephone",
      "Within 7 days of the incident",
      "Within 15 days of the incident",
      "It does not need to be reported",
    ],
    correctAnswer: 2,
    explanation:
      "Over-7-day incapacitation injuries (where the worker is unable to perform their normal duties for more than 7 consecutive days, not counting the day of the incident) must be reported within 15 days using the online form at the HSE website.",
  },
  {
    id: 3,
    question:
      "A MEWP overturns on site but the operator jumps clear and is uninjured. Does this require a RIDDOR report?",
    options: [
      "No — no one was injured",
      "Yes — MEWP overturning is a dangerous occurrence under RIDDOR",
      "Only if the MEWP is damaged beyond repair",
      "Only if the site is notifiable under CDM",
    ],
    correctAnswer: 1,
    explanation:
      "The overturning of a MEWP is classified as a dangerous occurrence under Schedule 2 of RIDDOR 2013. It must be reported regardless of whether anyone was injured. The event itself had the potential to cause serious harm.",
  },
  {
    id: 4,
    question:
      "What is the primary purpose of root cause analysis after an incident?",
    options: [
      "To identify which worker was at fault",
      "To determine the amount of compensation to pay",
      "To identify underlying systemic failures that allowed the incident to occur",
      "To complete the insurance claim paperwork",
    ],
    correctAnswer: 2,
    explanation:
      "Root cause analysis looks beyond the immediate cause (what happened) to identify the underlying systemic failures (why it happened). These might include inadequate training, poor planning, defective equipment, lack of supervision, or failures in the safety management system. Fixing root causes prevents recurrence.",
  },
  {
    id: 5,
    question:
      "During an incident investigation, when should photographs of the scene be taken?",
    options: [
      "Only after the HSE inspector arrives",
      "As soon as possible after the scene is made safe and casualties are attended to",
      "The next morning in better light",
      "Only if a fatality has occurred",
    ],
    correctAnswer: 1,
    explanation:
      "Photographs should be taken as soon as the scene is safe and casualty care is under way. Evidence can be lost or altered quickly — weather, clean-up, equipment movement, or other work can change the scene. Photographic evidence is critical for the investigation and any subsequent legal proceedings.",
  },
  {
    id: 6,
    question:
      "Which of the following is NOT a dangerous occurrence reportable under RIDDOR 2013?",
    options: [
      "Collapse of a scaffold more than 5 metres high",
      "Overturning of a MEWP",
      "A worker tripping on a cable and bruising their knee",
      "Unintended collapse of a wall or floor in a building under construction",
    ],
    correctAnswer: 2,
    explanation:
      "A trip resulting in a bruised knee is a minor injury and is not a RIDDOR-reportable event. Scaffold collapse, MEWP overturning, and structural collapse are all classified as dangerous occurrences under Schedule 2 of RIDDOR 2013.",
  },
  {
    id: 7,
    question:
      "What is the most important principle of a near-miss reporting culture?",
    options: [
      "Workers should only report near misses if their supervisor asks them to",
      "Near-miss reports are only useful for statistical purposes",
      "Workers can report without fear of blame — the focus is on learning and prevention",
      "Near misses only need to be reported if they involve equipment failure",
    ],
    correctAnswer: 2,
    explanation:
      "A no-blame reporting culture encourages workers to report near misses without fear of disciplinary action. The purpose is to identify hazards and fix them before they cause actual harm. If workers fear punishment, they will not report, and valuable safety intelligence is lost.",
  },
  {
    id: 8,
    question:
      "In the incident investigation flowchart, what step comes immediately after 'Make Safe'?",
    options: [
      "Interview witnesses",
      "Report to the HSE",
      "Administer first aid to the casualty",
      "Identify root causes",
    ],
    correctAnswer: 2,
    explanation:
      "The correct sequence is: Incident occurs, Make safe (remove ongoing hazards), First aid (treat casualties), then Report (RIDDOR if applicable), Investigate, Root cause analysis, Corrective actions, and Review. Casualty care always comes before paperwork.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function WorkingAtHeightModule5Section2() {
  useSEO({
    title: "Incident Reporting & Investigation | Module 5 | Working at Height",
    description:
      "RIDDOR 2013 reporting requirements, incident investigation process, root cause analysis, and near-miss reporting culture for working at height.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 2</p>
            <h1 className="text-sm font-semibold text-white truncate">
              Incident Reporting & Investigation
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4">
            <ClipboardList className="h-8 w-8 text-amber-500" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-xs font-semibold">
                MODULE 5 &middot; SECTION 2
              </span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Incident Reporting & Investigation
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding RIDDOR requirements, the investigation process, root
            cause analysis, and building a near-miss reporting culture that
            prevents future accidents
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-amber-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            RIDDOR 2013 requires employers to report fatal injuries, specified
            injuries, over-7-day incapacitation, and dangerous occurrences to the
            HSE. After any incident, the scene must be preserved and a thorough
            investigation conducted to identify root causes — not just blame
            individuals. Near-miss reporting is equally important: every near miss
            is a free lesson that could prevent a future fatality.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Legal Requirement
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Failure to report a RIDDOR-reportable incident is a criminal
            offence. Employers can face unlimited fines and imprisonment.
            Beyond the legal obligation, proper reporting and investigation is
            the mechanism by which the industry learns from mistakes and
            prevents the same accidents from recurring.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Explain the purpose and scope of RIDDOR 2013",
              "List the categories of incidents that must be reported under RIDDOR",
              "Identify who is responsible for making a RIDDOR report and how",
              "Describe the time limits for different categories of RIDDOR reports",
              "Outline the incident investigation process from scene preservation to corrective actions",
              "Explain root cause analysis and why it goes beyond blaming individuals",
              "Describe the principles and benefits of a near-miss reporting culture",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — RIDDOR 2013 Overview                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              RIDDOR 2013 — Overview
            </h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The <strong className="text-amber-400">Reporting of Injuries,
              Diseases and Dangerous Occurrences Regulations 2013</strong>{" "}
              (RIDDOR) require employers, the self-employed, and people in
              control of work premises to report certain serious workplace
              incidents to the Health and Safety Executive (HSE). These reports
              enable the HSE to identify patterns, target inspections, and
              develop safety guidance.
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              RIDDOR applies to all workplaces in Great Britain, including
              construction sites, factories, offices, shops, and any location
              where work activities take place. For work at height, RIDDOR is
              particularly significant because falls from height remain the
              leading cause of fatal workplace injuries in the UK.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Key Points About RIDDOR
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>RIDDOR replaced the earlier 1995 Regulations and simplified the reporting categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>The "over-3-day" reporting threshold was changed to "over-7-day" in 2013</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Reports are made to the HSE, not the local authority (for most workplaces)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Failure to report is a criminal offence carrying unlimited fines</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — What Must Be Reported                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              What Must Be Reported
            </h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              RIDDOR 2013 requires reporting of four main categories of incident.
              Understanding which category an incident falls into is essential
              for determining the correct reporting method and timescale.
            </p>

            {/* Fatal Injuries */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-red-400 text-sm mb-3 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                1. Fatal Injuries
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-2">
                Any death of a worker arising from a work-related accident, or a
                non-worker dying as a result of a work activity (e.g., a member
                of the public struck by falling debris from a scaffold).
              </p>
              <div className="bg-black/20 rounded-lg p-3 text-sm">
                <span className="text-red-300 font-semibold">Reporting:</span>{" "}
                <span className="text-white/70">Immediately by telephone, followed by online report within 10 days</span>
              </div>
            </div>

            {/* Specified Injuries */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-orange-400 text-sm mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                2. Specified Injuries
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Serious injuries to workers as listed in Regulation 4. These
                include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70 mb-3">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Fractures (other than to fingers, thumbs, or toes)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Amputation of an arm, hand, finger, thumb, leg, foot, or toe</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Permanent loss of sight or reduction of sight</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Crush injuries leading to internal organ damage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Scalping (separation of skin from the head)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Burns covering more than 10% of the body or causing significant damage to eyes, respiratory system, or vital organs</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Any degree of scalping requiring hospital treatment</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Loss of consciousness caused by head injury or asphyxia</span>
                </div>
              </div>
              <div className="bg-black/20 rounded-lg p-3 text-sm">
                <span className="text-orange-300 font-semibold">Reporting:</span>{" "}
                <span className="text-white/70">Immediately — online or by telephone for the most serious</span>
              </div>
            </div>

            {/* Over-7-Day Incapacitation */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-amber-400 text-sm mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                3. Over-7-Day Incapacitation
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-2">
                Where a worker is incapacitated for more than 7 consecutive days
                (not counting the day of the accident) — meaning they are unable
                to perform their normal work duties. This does not require them
                to be off work entirely; being unable to carry out their usual
                role is sufficient.
              </p>
              <div className="bg-black/20 rounded-lg p-3 text-sm">
                <span className="text-amber-300 font-semibold">Reporting:</span>{" "}
                <span className="text-white/70">Within 15 days of the incident, online via the HSE website</span>
              </div>
            </div>

            {/* Dangerous Occurrences */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-purple-400 text-sm mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                4. Dangerous Occurrences
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Events that did not necessarily result in injury but had the
                potential to cause serious harm. Those relevant to work at
                height include:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Scaffold collapse</strong> — any substantial collapse of a scaffold more than 5 metres high
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">MEWP overturning</strong> — any overturning of lifting equipment designed to carry persons
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Structural collapse</strong> — unintended collapse of a building, floor, wall, or structure under construction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Electrical incidents</strong> — contact with overhead power lines
                  </span>
                </li>
              </ul>
              <div className="bg-black/20 rounded-lg p-3 text-sm mt-3">
                <span className="text-purple-300 font-semibold">Reporting:</span>{" "}
                <span className="text-white/70">Without delay — online via the HSE website</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 — Who Reports and How                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              Who Reports and How
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The <strong className="text-white">responsible person</strong>{" "}
              — typically the employer — must make the RIDDOR report. On
              construction sites with multiple employers, the principal
              contractor often coordinates reporting, but each employer retains
              responsibility for their own employees.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <Phone className="h-5 w-5 text-blue-400 mb-2" />
                <h4 className="font-semibold text-white text-sm mb-1">
                  By Telephone
                </h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  HSE Incident Contact Centre: <strong className="text-blue-300">0345 300 9923</strong>.
                  Required for fatalities and the most serious incidents.
                  Available Monday to Friday, 8:30am to 5pm. Out of hours, the
                  duty officer can be reached through the same number for
                  fatalities.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <FileText className="h-5 w-5 text-blue-400 mb-2" />
                <h4 className="font-semibold text-white text-sm mb-1">
                  Online
                </h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  Via the HSE RIDDOR website using form F2508. This is the
                  preferred method for all reportable incidents except
                  fatalities (which must be notified by phone first). The online
                  form generates a reference number as confirmation.
                </p>
              </div>
            </div>

            {/* Time Limits Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3">
                Reporting Time Limits — Summary
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 bg-red-500/10 rounded-lg p-3">
                  <span className="text-red-400 font-bold min-w-[120px] text-xs flex-shrink-0">
                    Fatal / Specified
                  </span>
                  <span className="text-white/70 text-xs">
                    Immediately (phone for fatalities) + online report within 10 days
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-amber-500/10 rounded-lg p-3">
                  <span className="text-amber-400 font-bold min-w-[120px] text-xs flex-shrink-0">
                    Over-7-Day
                  </span>
                  <span className="text-white/70 text-xs">
                    Within 15 days of the incident (online form)
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-purple-500/10 rounded-lg p-3">
                  <span className="text-purple-400 font-bold min-w-[120px] text-xs flex-shrink-0">
                    Dangerous Occurrence
                  </span>
                  <span className="text-white/70 text-xs">
                    Without delay (online form; phone if very serious)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — Investigation Process                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              The Investigation Process
            </h3>
          </div>
          <div className="border-l-2 border-green-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A thorough investigation is essential after any incident,
              regardless of severity. The purpose is not to allocate blame but
              to understand what happened, why it happened, and how to prevent it
              from happening again.
            </p>

            {/* Investigation Flowchart Diagram */}
            <div className="bg-gradient-to-b from-green-500/5 to-green-500/15 border border-green-500/20 rounded-xl p-5">
              <h4 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Incident Investigation Flowchart
              </h4>
              <div className="space-y-2">
                {/* Step 1 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center">
                    <span className="text-red-300 font-semibold text-xs">INCIDENT OCCURS</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                </div>
                {/* Step 2 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 text-center">
                    <span className="text-orange-300 font-semibold text-xs">MAKE SAFE</span>
                    <p className="text-white/50 text-[10px] mt-1">Remove ongoing hazards, prevent further harm</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                </div>
                {/* Step 3 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                    <span className="text-green-300 font-semibold text-xs">FIRST AID</span>
                    <p className="text-white/50 text-[10px] mt-1">Treat casualties, call 999 if needed</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                </div>
                {/* Step 4 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 text-center">
                    <span className="text-blue-300 font-semibold text-xs">REPORT (RIDDOR?)</span>
                    <p className="text-white/50 text-[10px] mt-1">Determine if RIDDOR-reportable; submit if required</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                </div>
                {/* Step 5 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-purple-500/20 border border-purple-500/30 rounded-lg p-3 text-center">
                    <span className="text-purple-300 font-semibold text-xs">INVESTIGATE</span>
                    <p className="text-white/50 text-[10px] mt-1">Secure scene, photos, witnesses, equipment check</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                </div>
                {/* Step 6 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 text-center">
                    <span className="text-amber-300 font-semibold text-xs">ROOT CAUSE ANALYSIS</span>
                    <p className="text-white/50 text-[10px] mt-1">Ask "why?" repeatedly to find underlying failures</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                </div>
                {/* Step 7 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-teal-500/20 border border-teal-500/30 rounded-lg p-3 text-center">
                    <span className="text-teal-300 font-semibold text-xs">CORRECTIVE ACTIONS</span>
                    <p className="text-white/50 text-[10px] mt-1">Implement changes to prevent recurrence</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-white/30 rotate-90" />
                </div>
                {/* Step 8 */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <span className="text-cyan-300 font-semibold text-xs">REVIEW</span>
                    <p className="text-white/50 text-[10px] mt-1">Monitor effectiveness, update procedures, share learning</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gathering Evidence */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4 text-amber-400" />
                Gathering Evidence
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Evidence must be gathered as soon as practicable after the
                incident. The scene will change — weather, clean-up, continued
                work, and equipment removal can all destroy critical evidence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-white text-xs font-semibold mb-1">Photographs & Video</h5>
                  <ul className="space-y-1.5 text-xs text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Wide-angle shots showing the overall scene</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Close-ups of equipment, damage, and defects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Any labels, serial numbers, or inspection tags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Ground conditions, weather conditions</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-white text-xs font-semibold mb-1">Witness Statements</h5>
                  <ul className="space-y-1.5 text-xs text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Taken individually — not in groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Record what they saw, heard, and did</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Do not lead the witness or suggest answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Date, time, sign — as soon as possible</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-white text-xs font-semibold mb-1">Equipment Inspection</h5>
                  <ul className="space-y-1.5 text-xs text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Preserve the equipment in its post-incident state</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Check inspection records and maintenance history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Note serial numbers, manufacturer, and model</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Do not repair or modify before investigation is complete</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <h5 className="text-white text-xs font-semibold mb-1">Documentation Review</h5>
                  <ul className="space-y-1.5 text-xs text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Risk assessments and method statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Training records for those involved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Inspection and maintenance records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Permits to work and briefing records</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — Root Cause Analysis                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Root Cause Analysis
            </h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Root cause analysis (RCA) is a systematic method for identifying
              the underlying reasons an incident occurred. It goes beyond the
              immediate cause — "the worker fell" — to ask{" "}
              <strong className="text-amber-400">why</strong> they fell, and
              why the conditions existed that allowed the fall to happen.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3">
                The "5 Whys" Technique — Example
              </h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-300 text-xs font-semibold">Why #1: Why did the worker fall?</p>
                  <p className="text-white/70 text-xs mt-1">Because the guardrail on the scaffold was missing.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-300 text-xs font-semibold">Why #2: Why was the guardrail missing?</p>
                  <p className="text-white/70 text-xs mt-1">Because it was removed to allow materials to be loaded and not replaced.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-300 text-xs font-semibold">Why #3: Why was it not replaced?</p>
                  <p className="text-white/70 text-xs mt-1">Because there was no procedure for temporarily removing and reinstating guardrails.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-300 text-xs font-semibold">Why #4: Why was there no procedure?</p>
                  <p className="text-white/70 text-xs mt-1">Because the risk assessment did not consider the loading operation.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-300 text-xs font-semibold">Why #5: Why did the risk assessment not cover this?</p>
                  <p className="text-white/70 text-xs mt-1">Because the risk assessment was generic and not task-specific, and had not been reviewed since the project started.</p>
                </div>
              </div>
              <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-amber-400 text-xs font-semibold">Root Cause Identified:</p>
                <p className="text-white/70 text-xs mt-1">
                  Inadequate risk assessment process — generic rather than task-specific, and not reviewed or updated. The immediate cause (missing guardrail) was a symptom of this systemic failure.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Common Root Cause Categories
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Inadequate training</strong> — workers did not know what they were supposed to do or the risks involved
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Poor planning</strong> — the work was not properly planned, risk-assessed, or method-statemented
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Defective equipment</strong> — equipment was damaged, not maintained, or not fit for purpose
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Inadequate supervision</strong> — no one was checking that procedures were being followed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Organisational culture</strong> — safety was not prioritised, shortcuts were tolerated, or time pressure overrode safety
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Communication failures</strong> — information was not passed between shifts, trades, or management levels
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — Near-Miss Reporting Culture                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              Near-Miss Reporting Culture
            </h3>
          </div>
          <div className="border-l-2 border-teal-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A near miss is an unplanned event that could have caused injury or
              damage but did not — this time. Research consistently shows that
              for every serious accident, there are hundreds of near misses that
              went unreported and unaddressed.
            </p>
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-teal-400" />
                The Safety Triangle (Heinrich's Pyramid)
              </h4>
              <div className="space-y-2">
                <div className="bg-red-500/20 rounded-lg p-3 text-center">
                  <span className="text-red-300 font-bold text-xs">1 FATAL / MAJOR INJURY</span>
                </div>
                <div className="bg-orange-500/20 rounded-lg p-3 text-center">
                  <span className="text-orange-300 font-bold text-xs">29 MINOR INJURIES</span>
                </div>
                <div className="bg-amber-500/20 rounded-lg p-3 text-center">
                  <span className="text-amber-300 font-bold text-xs">300 NEAR MISSES / UNSAFE ACTS</span>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-3 italic">
                Heinrich's ratio (1:29:300) illustrates that near misses vastly
                outnumber actual injuries. Reporting and addressing near misses
                removes hazards before they cause harm at the top of the pyramid.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Principles of No-Blame Reporting
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Easy to report</strong> — simple forms, apps, or verbal reports to a supervisor; remove barriers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">No punishment</strong> — reporters are thanked, not disciplined (unless deliberate recklessness)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Visible action</strong> — management must be seen to act on reports; if nothing changes, people stop reporting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Feedback loop</strong> — tell the reporter what action was taken; this closes the loop and encourages further reporting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Confidential option</strong> — allow anonymous reporting for those who prefer it
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <HardHat className="h-4 w-4" />
                On Site — Making It Work
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Toolbox talks at the start of each shift are an excellent
                opportunity to review recent near-miss reports and discuss what
                was done about them. When workers see that their reports lead to
                real changes — a scaffold fixed, a guardrail replaced, a
                procedure updated — they are far more likely to continue
                reporting. The best-performing sites in terms of safety are
                invariably those with the highest near-miss reporting rates.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Key Terminology                                              */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Key Terminology
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">RIDDOR</span>
                <span className="text-white/70">
                  Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — the legal framework for reporting workplace incidents to the HSE
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Specified Injury</span>
                <span className="text-white/70">
                  A defined category of serious injury under RIDDOR including fractures (not fingers/toes), amputations, loss of sight, crush injuries, scalping, and serious burns
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Dangerous Occurrence</span>
                <span className="text-white/70">
                  An event with the potential to cause serious harm — reportable under RIDDOR regardless of whether anyone was actually injured
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Root Cause</span>
                <span className="text-white/70">
                  The underlying systemic failure that allowed an incident to occur — identified through techniques such as the "5 Whys"
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Near Miss</span>
                <span className="text-white/70">
                  An unplanned event that had the potential to cause harm but did not result in injury or damage on this occasion
                </span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">F2508</span>
                <span className="text-white/70">
                  The HSE online form used for making RIDDOR reports — generates a reference number as confirmation of submission
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h4 className="font-medium text-white mb-2 text-sm">
                  {faq.question}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 2 — Incident Reporting & Investigation"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-amber-500 hover:bg-amber-500/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5-section-3">
              Next: Roles, Responsibilities & Competence
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
