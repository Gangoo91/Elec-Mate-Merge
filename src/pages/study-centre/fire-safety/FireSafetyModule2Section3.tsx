import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  FileText,
  Flame,
  Search,
  Users,
  Shield,
  ClipboardCheck,
  RefreshCw,
  UserCheck,
  XCircle,
  GitBranch,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  QUICK CHECK QUESTIONS                                              */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    id: "fra-qc-1",
    question:
      "Under which Article of the RRFSO is a fire risk assessment mandatory?",
    options: [
      "Article 5",
      "Article 9",
      "Article 14",
      "Article 21",
    ],
    correctIndex: 1,
    explanation:
      "Article 9 of the Regulatory Reform (Fire Safety) Order 2005 places a duty on the responsible person to carry out a suitable and sufficient fire risk assessment of the premises. This is the cornerstone obligation of the RRFSO -- without a compliant fire risk assessment, no other fire safety duty can be properly discharged.",
  },
  {
    id: "fra-qc-2",
    question:
      "How many steps are in the standard fire risk assessment process?",
    options: ["Three", "Four", "Five", "Seven"],
    correctIndex: 2,
    explanation:
      "The standard fire risk assessment follows a five-step process: (1) identify fire hazards, (2) identify people at risk, (3) evaluate, remove or reduce risk, and protect, (4) record findings, prepare an emergency plan, and provide training, and (5) review regularly and update when changes occur. This five-step methodology is endorsed by HM Government fire safety guidance and PAS 79-1:2020.",
  },
  {
    id: "fra-qc-3",
    question:
      "When must a fire risk assessment be reviewed?",
    options: [
      "Only after a fire has occurred",
      "Every five years as a legal minimum",
      "Regularly and whenever significant changes occur (annually minimum)",
      "Only when requested by the fire service",
    ],
    correctIndex: 2,
    explanation:
      "A fire risk assessment must be reviewed regularly -- annually as a minimum -- and whenever there are significant changes. Triggers for review include changes to the building layout, change of use, significant changes in staffing or occupancy, building works, after a fire or near-miss incident, or when the fire service identifies deficiencies. It is a living document, not a one-off exercise.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question:
      "Does a fire risk assessment need to be written down?",
    answer:
      "If you employ five or more people, you are legally required to record the significant findings of your fire risk assessment. Even if you have fewer than five employees, a written record is required if your premises has a licence under an enactment (such as a premises licence for alcohol or entertainment) or if an alterations notice requiring this has been issued by the fire and rescue authority. Best practice is always to record your assessment regardless of employee numbers -- a written record demonstrates compliance, provides a baseline for future reviews, and is essential evidence if your assessment is ever questioned by the fire service.",
  },
  {
    question:
      "Can I carry out my own fire risk assessment or do I need a professional?",
    answer:
      "The RRFSO requires the fire risk assessment to be carried out by a 'competent person' -- someone with sufficient training, experience, knowledge, or other qualities to undertake the assessment properly. For simple, low-risk premises (such as a small office), the responsible person may be able to carry out the assessment themselves, provided they have a reasonable understanding of fire hazards and the assessment methodology. HM Government publishes free sector-specific fire safety guides to assist. However, for complex premises (such as those with sleeping risks, high-risk processes, large public assembly, or complex building layouts), it is strongly recommended to engage a specialist fire risk assessor registered with a recognised body such as the IFE, BAFE, or FPA. Using a professional assessor ensures thoroughness and can provide a defence of due diligence if the assessment is later challenged.",
  },
  {
    question:
      "What is PAS 79 and how does it relate to fire risk assessment?",
    answer:
      "PAS 79-1:2020 is a Publicly Available Specification published by the British Standards Institution (BSI) that provides guidance on fire risk assessment of premises. It sets out a recommended methodology and format for carrying out and recording fire risk assessments. PAS 79-1 covers general premises, while PAS 79-2:2020 covers residential premises including flats and houses in multiple occupation (HMOs). Many professional fire risk assessors use the PAS 79 methodology as the basis for their assessments, and fire and rescue authorities generally regard a PAS 79-compliant assessment as meeting the standard of 'suitable and sufficient.' It is not a legal requirement to use PAS 79, but it is widely regarded as best practice.",
  },
  {
    question:
      "What happens if the fire service finds my fire risk assessment is inadequate?",
    answer:
      "If an inspecting officer from the fire and rescue authority determines that your fire risk assessment is inadequate, several outcomes are possible depending on the severity of the deficiency. An informal notification may be given, advising you to improve the assessment within a specified timeframe. An enforcement notice may be served under Article 30, requiring you to take specific steps to remedy the failures within a set period. In cases of serious risk to life, a prohibition notice under Article 31 can be served, which can immediately restrict or prohibit the use of all or part of the premises until the risk is reduced. Failure to comply with an enforcement or prohibition notice is a criminal offence carrying unlimited fines and, in the most serious cases, imprisonment for up to two years. Prosecutions for fire safety failings have increased significantly in recent years, with fines regularly reaching six and seven figures for serious breaches.",
  },
];

/* ------------------------------------------------------------------ */
/*  QUIZ QUESTIONS                                                     */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under which Article of the Regulatory Reform (Fire Safety) Order 2005 is a fire risk assessment mandatory for all non-domestic premises?",
    options: [
      "Article 5 -- Application to premises",
      "Article 9 -- Risk assessment",
      "Article 14 -- Emergency routes and exits",
      "Article 21 -- Provision of information to employees",
    ],
    correctAnswer: 1,
    explanation:
      "Article 9 of the RRFSO places a duty on the responsible person to make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions needed. This is the foundational requirement from which all other fire safety duties flow.",
  },
  {
    id: 2,
    question:
      "What is the correct order of the five steps in a fire risk assessment?",
    options: [
      "Evaluate risk, identify hazards, identify people, record findings, review",
      "Identify fire hazards, identify people at risk, evaluate/reduce/protect, record/plan/train, review and update",
      "Record findings, identify hazards, train staff, review, identify people",
      "Review premises, install equipment, train staff, record findings, identify hazards",
    ],
    correctAnswer: 1,
    explanation:
      "The correct five-step process is: (1) identify fire hazards (ignition, fuel, oxygen), (2) identify people at risk, (3) evaluate risk and remove, reduce or protect, (4) record significant findings, prepare an emergency plan, and provide training, and (5) review regularly and update when changes occur. This sequence ensures a logical, systematic approach.",
  },
  {
    id: 3,
    question:
      "When identifying fire hazards in Step 1, which of the following is NOT one of the three categories of hazard source?",
    options: [
      "Ignition sources (heat, sparks, flames)",
      "Fuel sources (combustible materials)",
      "Oxygen sources (air, ventilation, oxidising chemicals)",
      "Water sources (sprinkler systems, fire hydrants)",
    ],
    correctAnswer: 3,
    explanation:
      "The three categories of fire hazard source are ignition sources, fuel sources, and oxygen sources -- the three elements of the fire triangle. Water sources such as sprinkler systems and hydrants are fire protection measures, not fire hazards. Step 1 focuses on identifying what could start a fire and what could allow it to grow, not on the measures to extinguish it.",
  },
  {
    id: 4,
    question:
      "In Step 2, which group of people must be specifically considered in a fire risk assessment because they may need assistance to evacuate?",
    options: [
      "Only full-time employees who work regular hours",
      "Only visitors who have signed in at reception",
      "Persons with disabilities, including those with mobility, sensory, or cognitive impairments",
      "Only contractors who hold a valid CSCS card",
    ],
    correctAnswer: 2,
    explanation:
      "Persons with disabilities -- including those with mobility impairments, sensory impairments (hearing, vision), and cognitive impairments -- must be specifically considered because they may need assistance to evacuate. This includes the provision of Personal Emergency Evacuation Plans (PEEPs) or the adoption of general emergency evacuation plans that cater for people who may need assistance. The Equality Act 2010 also requires reasonable adjustments to be made.",
  },
  {
    id: 5,
    question:
      "When must the significant findings of a fire risk assessment be recorded in writing?",
    options: [
      "Only when the fire service specifically requests it",
      "If five or more persons are employed, or the premises has a licence or alterations notice",
      "Only for premises with a floor area greater than 500 square metres",
      "Only when flammable substances are stored on the premises",
    ],
    correctAnswer: 1,
    explanation:
      "Article 9(6) and (7) of the RRFSO requires the significant findings to be recorded if: (a) the responsible person employs five or more employees, (b) a licence under an enactment is in force in relation to the premises, or (c) an alterations notice requiring this has been issued. Best practice is always to record the assessment regardless, as a written record demonstrates compliance and provides a baseline for reviews.",
  },
  {
    id: 6,
    question:
      "How often should a fire risk assessment be reviewed at a minimum?",
    options: [
      "Only when the building is extended or refurbished",
      "Every five years in line with electrical testing intervals",
      "Annually as a minimum, and whenever significant changes occur",
      "Only after a fire or enforcement notice",
    ],
    correctAnswer: 2,
    explanation:
      "A fire risk assessment should be reviewed annually as a minimum. Additionally, it must be reviewed whenever there are significant changes such as alterations to the building layout, change of use, significant changes in occupancy or staffing, building works, after a fire or near-miss, or when the fire service identifies issues. The review ensures the assessment remains current and the fire precautions remain adequate.",
  },
  {
    id: 7,
    question:
      "What makes a person 'competent' to carry out a fire risk assessment under the RRFSO?",
    options: [
      "They must hold a university degree in fire engineering",
      "They must have sufficient training, experience, knowledge, or other qualities",
      "They must be a serving or retired fire officer",
      "They must be employed by the premises owner as a full-time safety officer",
    ],
    correctAnswer: 1,
    explanation:
      "The RRFSO defines competence in terms of sufficient training, experience, knowledge, or other qualities. There is no single prescribed qualification. For simple premises, the responsible person with adequate knowledge may be competent. For complex or high-risk premises, a specialist assessor registered with a recognised body (such as the IFE, BAFE, or FPA) or qualified under the PAS 79 methodology is strongly recommended.",
  },
  {
    id: 8,
    question:
      "Which of the following is one of the most common failures found by fire inspectors during enforcement visits?",
    options: [
      "Premises having too many fire extinguishers installed",
      "Inadequate fire risk assessment, blocked escape routes, and no emergency plan",
      "Having fire drills too frequently (more than twice per year)",
      "Installing fire detection systems that exceed the minimum BS 5839 standard",
    ],
    correctAnswer: 1,
    explanation:
      "The most common failures found by fire inspectors include: an inadequate or absent fire risk assessment, blocked or obstructed escape routes, poor housekeeping creating fire hazards, defective fire doors, no written emergency plan, no fire drills, inadequate fire detection and alarm systems, and failure to review the fire risk assessment after changes. Over-provision of fire safety measures (too many extinguishers, exceeding alarm standards, or frequent drills) is never cited as a failure.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function FireSafetyModule2Section3() {
  useSEO({
    title:
      "Fire Risk Assessment | Fire Safety Module 2 Section 3",
    description:
      "Learn the fire risk assessment process under the RRFSO -- the five-step methodology, identifying hazards and people at risk, evaluating and reducing risk, recording findings, review requirements, competent persons, and common failures found by fire inspectors.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* ---------------------------------------------------------- */}
      {/*  Sticky Header                                              */}
      {/* ---------------------------------------------------------- */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">
              MODULE 2 {"\u2022"} SECTION 3
            </p>
            <h1 className="text-sm font-semibold text-white truncate">
              Fire Risk Assessment
            </h1>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/*  Main Content                                               */}
      {/* ---------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <ClipboardCheck className="h-8 w-8 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              MODULE 2 {"\u2022"} SECTION 3
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fire Risk Assessment
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            The mandatory five-step process for evaluating fire hazards
            and risks in non-domestic premises under the RRFSO
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-rose-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Article 9 of the RRFSO makes a fire risk assessment mandatory
            for all non-domestic premises. It follows a five-step
            process: identify fire hazards, identify people at risk,
            evaluate and reduce risk, record findings and plan, then
            review regularly. It must be "suitable and sufficient" and
            recorded in writing if you employ five or more people.
            PAS 79-1:2020 provides the standard methodology. A fire risk
            assessment is a living document -- not a one-off exercise.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            On Site -- Critical Reminder
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            <strong className="text-red-400">
              An inadequate or absent fire risk assessment is the single
              most common failure found during fire service inspections.
            </strong>{" "}
            It is also the first document an inspecting officer will ask
            to see. If your assessment is out of date, incomplete, or
            does not reflect the current use and layout of the premises,
            enforcement action can follow immediately -- including
            prohibition notices that can close your premises.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-rose-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Explain the legal requirement for a fire risk assessment under Article 9 of the RRFSO",
              "Describe the five-step fire risk assessment process and the purpose of each step",
              "Identify the three categories of fire hazard: ignition sources, fuel sources, and oxygen sources",
              "Identify the groups of people who must be considered as being at risk from fire",
              "Explain how to evaluate, remove, and reduce fire risk and protect people",
              "Describe the recording, emergency planning, and training requirements of Steps 4 and 5",
              "Explain who is competent to carry out a fire risk assessment",
              "Recognise the most common failures found during fire service inspections and potential enforcement action",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 01 -- What Is a Fire Risk Assessment?            */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              What Is a Fire Risk Assessment?
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A fire risk assessment is a systematic evaluation of the
              fire hazards and fire risks present in premises. It is
              the cornerstone of fire safety management under the
              Regulatory Reform (Fire Safety) Order 2005 (RRFSO).{" "}
              <strong className="text-white">
                Article 9 of the RRFSO
              </strong>{" "}
              places a mandatory duty on the responsible person to carry
              out a "suitable and sufficient" assessment of the risks to
              which relevant persons are exposed for the purpose of
              identifying the general fire precautions needed to comply
              with the Order.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-rose-400" />
                Key Legal Requirements
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Mandatory</strong>{" "}
                    for all non-domestic premises -- offices, shops,
                    factories, warehouses, schools, hospitals, care
                    homes, pubs, restaurants, HMOs (common parts), and
                    any other premises to which the RRFSO applies
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Suitable and sufficient
                    </strong>{" "}
                    -- it must be thorough enough to identify all
                    significant fire hazards and the people who may be
                    affected, and to determine what fire precautions are
                    needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Recorded in writing
                    </strong>{" "}
                    if the responsible person employs five or more
                    employees, or the premises has a licence under an
                    enactment, or an alterations notice has been issued
                    requiring it
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      PAS 79-1:2020 methodology
                    </strong>{" "}
                    -- the widely accepted standard for conducting and
                    recording fire risk assessments, published by BSI
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Living document
                    </strong>{" "}
                    -- must be reviewed regularly and updated whenever
                    there are significant changes; it is not a one-off
                    exercise
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              The purpose of a fire risk assessment is not simply to
              produce a document. Its purpose is to ensure that the
              responsible person understands the fire risks in their
              premises and has put in place adequate fire precautions to
              protect all relevant persons. The written record is
              evidence of that process -- it is not the process itself.
              A fire risk assessment that sits in a drawer and is never
              acted upon is worthless.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 02 -- The Five-Step Process                     */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              The Five-Step Process
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              HM Government fire safety guidance and PAS 79-1:2020
              recommend a five-step methodology for fire risk
              assessment. Each step builds on the previous one to create
              a comprehensive picture of fire risk and the measures
              needed to manage it.
            </p>

            {/* 5-Step Flowchart Diagram */}
            <div className="bg-white/5 border border-rose-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-rose-400 text-sm mb-4 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                5-Step Fire Risk Assessment Process
              </h4>
              <div className="space-y-2">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-red-400 font-semibold text-xs">
                      STEP 1
                    </p>
                    <p className="text-white text-sm font-medium">
                      Identify Fire Hazards
                    </p>
                    <p className="text-white/60 text-xs">
                      Ignition sources, fuel sources, oxygen sources
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-rose-500/40" />
                </div>
                {/* Step 2 */}
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500/20 border border-orange-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-orange-400 font-semibold text-xs">
                      STEP 2
                    </p>
                    <p className="text-white text-sm font-medium">
                      Identify People at Risk
                    </p>
                    <p className="text-white/60 text-xs">
                      Employees, visitors, contractors, disabled
                      persons, lone workers, sleeping risks
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-rose-500/40" />
                </div>
                {/* Step 3 */}
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-amber-400 font-semibold text-xs">
                      STEP 3
                    </p>
                    <p className="text-white text-sm font-medium">
                      Evaluate, Remove/Reduce, Protect
                    </p>
                    <p className="text-white/60 text-xs">
                      Prevention, detection, warning, escape routes,
                      firefighting, maintenance, training
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-rose-500/40" />
                </div>
                {/* Step 4 */}
                <div className="flex items-center gap-3">
                  <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-rose-400 font-semibold text-xs">
                      STEP 4
                    </p>
                    <p className="text-white text-sm font-medium">
                      Record, Plan, Train
                    </p>
                    <p className="text-white/60 text-xs">
                      Significant findings, emergency plan, staff
                      training and fire drills
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-4 bg-rose-500/40" />
                </div>
                {/* Step 5 */}
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 border border-green-500/40 rounded-lg px-3 py-2 flex-1 text-center">
                    <p className="text-green-400 font-semibold text-xs">
                      STEP 5
                    </p>
                    <p className="text-white text-sm font-medium">
                      Review & Update
                    </p>
                    <p className="text-white/60 text-xs">
                      Regularly (annually minimum), after changes, after
                      fire/near-miss
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs text-center mt-4 italic">
                The five-step process is cyclical -- Step 5 feeds back
                into Step 1 whenever the review identifies new or
                changed hazards
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                Overview of Each Step
              </h4>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-[auto_1fr] gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-red-400 font-bold">1</span>
                  <div>
                    <p className="text-white font-medium">
                      Identify fire hazards
                    </p>
                    <p className="text-white/60 text-xs">
                      Sources of ignition (electrical, heating,
                      cooking, smoking, hot works, arson, lightning),
                      sources of fuel (building materials, furnishings,
                      stored materials, waste, flammable liquids and
                      gases), and sources of oxygen (natural and
                      mechanical ventilation, piped oxygen, oxidising
                      chemicals)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-orange-400 font-bold">2</span>
                  <div>
                    <p className="text-white font-medium">
                      Identify people at risk
                    </p>
                    <p className="text-white/60 text-xs">
                      Employees, visitors, contractors, disabled
                      persons, lone workers, sleeping risks, young
                      persons, large assemblies, people unfamiliar with
                      the building
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-amber-400 font-bold">3</span>
                  <div>
                    <p className="text-white font-medium">
                      Evaluate, remove/reduce, protect
                    </p>
                    <p className="text-white/60 text-xs">
                      Fire prevention measures, detection and warning
                      (BS 5839), escape routes (number, width, lighting,
                      signage), firefighting equipment, fire doors,
                      compartmentation, emergency plan, training
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-rose-400 font-bold">4</span>
                  <div>
                    <p className="text-white font-medium">
                      Record findings, prepare emergency plan, provide
                      training
                    </p>
                    <p className="text-white/60 text-xs">
                      Significant findings documented, action plan with
                      priorities and timescales, evacuation strategy,
                      roles, procedures, assembly points, all-staff
                      training
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-3 bg-black/20 rounded-lg p-3">
                  <span className="text-green-400 font-bold">5</span>
                  <div>
                    <p className="text-white font-medium">
                      Review regularly and update
                    </p>
                    <p className="text-white/60 text-xs">
                      Annually minimum, after any fire or near-miss,
                      after significant changes (layout, use, staffing,
                      building works)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 -- after section 02 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* -------------------------------------------------------- */}
        {/*  SECTION 03 -- Step 1 in Detail: Identifying Hazards     */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              Step 1 in Detail: Identifying Hazards
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Step 1 requires a systematic walk-through of the entire
              premises to identify anything that could cause a fire to
              start and anything that could allow it to spread. The
              three elements of the fire triangle -- ignition, fuel, and
              oxygen -- provide the framework for this identification.
            </p>

            {/* Ignition Sources */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-3 flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Ignition Sources
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Anything that could generate enough heat, sparks, or
                flame to ignite a fuel source. During the walk-through,
                look for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-xs mb-1">
                    Electrical
                  </p>
                  <p className="text-white/60 text-xs">
                    Overloaded sockets, damaged cables, faulty
                    appliances, old wiring, portable heaters, overheating
                    equipment, misuse of extension leads
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-xs mb-1">
                    Heating
                  </p>
                  <p className="text-white/60 text-xs">
                    Boilers, radiators placed close to combustibles,
                    portable heaters, hot pipes, fan heaters, underfloor
                    heating faults
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-xs mb-1">
                    Cooking
                  </p>
                  <p className="text-white/60 text-xs">
                    Cookers, deep fat fryers, toasters, microwaves,
                    extraction systems with grease build-up, unattended
                    cooking
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-xs mb-1">
                    Smoking
                  </p>
                  <p className="text-white/60 text-xs">
                    Designated smoking areas near combustibles,
                    discarded smoking materials, cigarette ends in
                    planters or bins, illicit smoking indoors
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-xs mb-1">
                    Hot Works
                  </p>
                  <p className="text-white/60 text-xs">
                    Welding, cutting, grinding, soldering, brazing --
                    sparks and heat can travel considerable distances
                    and ignite materials in adjacent areas
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-xs mb-1">
                    Arson
                  </p>
                  <p className="text-white/60 text-xs">
                    The single largest cause of fire in non-domestic
                    premises. Wheelie bins against buildings, insecure
                    external areas, poor site security, combustible
                    waste left outside
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 sm:col-span-2">
                  <p className="text-white font-medium text-xs mb-1">
                    Lightning
                  </p>
                  <p className="text-white/60 text-xs">
                    Direct strikes or induced surges. Consider lightning
                    protection systems (BS EN 62305) for tall or
                    isolated buildings, or premises storing flammable
                    materials
                  </p>
                </div>
              </div>
            </div>

            {/* Fuel Sources */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 text-sm mb-3">
                Fuel Sources
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                Anything that can burn. Consider both the quantity and
                the arrangement of combustible materials:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Building materials
                    </strong>{" "}
                    -- timber framing, combustible insulation (PIR, EPS,
                    phenolic), combustible cladding, cavity barriers,
                    roof coverings
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Furnishings</strong>{" "}
                    -- upholstered furniture, curtains, blinds, carpets,
                    display materials, ceiling tiles, decorations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Stored materials
                    </strong>{" "}
                    -- paper, cardboard, packaging, textiles, timber,
                    pallets, stock, archives
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Waste</strong> --
                    accumulations of waste paper, cardboard, off-cuts,
                    packaging, rubbish in bins or skips
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Flammable liquids and gases
                    </strong>{" "}
                    -- solvents, adhesives, paints, cleaning chemicals,
                    LPG, acetylene, petrol, cooking oils
                  </span>
                </li>
              </ul>
            </div>

            {/* Oxygen Sources */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 text-sm mb-3">
                Oxygen Sources
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                A fire needs oxygen to sustain combustion. While normal
                air (21% oxygen) is always present, some premises have
                additional oxygen sources that can accelerate fire
                growth:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Natural ventilation
                    </strong>{" "}
                    -- open windows, doors, vents creating air flow that
                    feeds the fire
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Mechanical ventilation
                    </strong>{" "}
                    -- HVAC systems, extraction fans, air handling units
                    that can distribute smoke and feed oxygen to a fire
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Piped oxygen
                    </strong>{" "}
                    -- in hospitals, care homes, dental practices, and
                    industrial settings; significantly accelerates fire
                    growth
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Oxidising chemicals
                    </strong>{" "}
                    -- chemical stores containing oxidisers (e.g.
                    hydrogen peroxide, sodium hypochlorite) that
                    release oxygen when heated
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Air conditioning
                    </strong>{" "}
                    -- air conditioning systems that may not shut down
                    automatically in a fire, continuing to supply fresh
                    oxygen
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 04 -- Step 2 in Detail: People at Risk          */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              Step 2 in Detail: People at Risk
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Step 2 requires you to identify everyone who may be at
              risk from fire in or around the premises. Do not limit
              this to employees -- the RRFSO protects all "relevant
              persons," which includes anyone who is lawfully on the
              premises and anyone in the immediate vicinity who may be
              at risk.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-rose-400" />
                Groups to Consider
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Employees in all areas
                    </p>
                    <p className="text-white/70 text-xs">
                      Including those in remote parts of the building,
                      basements, roof spaces, plant rooms, and areas not
                      normally occupied. Consider all shifts and working
                      patterns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Visitors, customers, patients, pupils
                    </p>
                    <p className="text-white/70 text-xs">
                      People who are unfamiliar with the building layout,
                      escape routes, and alarm sounds. They are entirely
                      dependent on the premises' fire safety arrangements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Contractors
                    </p>
                    <p className="text-white/70 text-xs">
                      May be working in areas with restricted access or
                      performing hot works that introduce additional fire
                      hazards. May not be familiar with the alarm system
                      or evacuation routes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    4
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Persons with disabilities
                    </p>
                    <p className="text-white/70 text-xs">
                      Mobility impairments (wheelchair users, people
                      using walking aids), sensory impairments (deaf or
                      hard of hearing -- may not hear the alarm; blind
                      or partially sighted -- may not see escape route
                      signage), and cognitive impairments. Require
                      Personal Emergency Evacuation Plans (PEEPs) or
                      equivalent arrangements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    5
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Lone workers
                    </p>
                    <p className="text-white/70 text-xs">
                      People working alone who cannot rely on others to
                      raise the alarm, assist with evacuation, or call
                      the fire service. Particular risk in buildings
                      outside normal working hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    6
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      People sleeping on premises
                    </p>
                    <p className="text-white/70 text-xs">
                      Hotels, hostels, hospitals, care homes, residential
                      schools, HMOs. Sleeping persons are at
                      significantly higher risk because they are
                      unaware of the fire developing and take time to
                      wake, orientate, and respond.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    7
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Young persons
                    </p>
                    <p className="text-white/70 text-xs">
                      Employees under 18, pupils, children in nurseries.
                      May not understand fire risks, may panic, may not
                      be able to operate fire safety equipment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    8
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Large numbers in assembly
                    </p>
                    <p className="text-white/70 text-xs">
                      Conference halls, theatres, nightclubs, sports
                      venues. Large numbers increase evacuation time
                      and the risk of crush injuries. Crowd dynamics
                      must be considered.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-rose-500/20 text-rose-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    9
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      People unfamiliar with the building
                    </p>
                    <p className="text-white/70 text-xs">
                      Delivery drivers, temporary workers, one-off
                      visitors, members of the public. They will not
                      know the layout, escape routes, or alarm sounds
                      and are wholly dependent on signage, wayfinding,
                      and staff guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 -- after section 04 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* -------------------------------------------------------- */}
        {/*  SECTION 05 -- Step 3 in Detail: Evaluate & Act          */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Step 3 in Detail: Evaluate & Act
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Having identified the hazards and the people at risk,
              Step 3 evaluates the risk and determines the fire
              precautions needed. The hierarchy is:{" "}
              <strong className="text-white">eliminate</strong> the
              hazard where possible,{" "}
              <strong className="text-white">reduce</strong> the risk
              where elimination is not possible, then{" "}
              <strong className="text-white">protect</strong> people
              from the remaining risk.
            </p>

            {/* Eliminate & Reduce */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-3">
                Eliminate & Reduce
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Safe storage
                    </strong>{" "}
                    -- flammable liquids in fire-rated stores or
                    cabinets; combustible waste removed regularly;
                    minimum stock levels maintained
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Housekeeping
                    </strong>{" "}
                    -- no accumulations of waste, clear gangways,
                    combustible materials separated from ignition
                    sources, clean extraction systems
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Electrical maintenance
                    </strong>{" "}
                    -- regular inspection and testing, PAT testing,
                    avoiding overloaded sockets and daisy-chained
                    extension leads
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Hot work controls
                    </strong>{" "}
                    -- hot work permits, fire watch, removal of
                    combustibles, post-work inspections for at least
                    60 minutes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Arson prevention
                    </strong>{" "}
                    -- secure external areas, lock bins away from the
                    building, security lighting, CCTV, remove
                    combustible materials from against the building
                  </span>
                </li>
              </ul>
            </div>

            {/* Protect */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 text-sm mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Protect People
              </h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold text-sm">
                    Detection & Warning
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Fire detection and alarm systems designed and
                    installed to BS 5839-1 (commercial/industrial) or
                    BS 5839-6 (residential). System category (L1-L5,
                    P1-P2, M) must match the risk profile of the
                    premises. Alarm must be audible throughout and
                    supplemented by visual/vibrating alerters where
                    persons with hearing impairments are present.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold text-sm">
                    Escape Routes
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Adequate number and width for the occupancy, kept
                    clear and unobstructed at all times. Emergency
                    lighting to BS 5266 for when normal lighting fails.
                    Fire exit signs compliant with the Health and Safety
                    (Safety Signs and Signals) Regulations 1996.
                    Travel distances within the limits set by Approved
                    Document B or sector-specific guidance.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold text-sm">
                    Firefighting Equipment
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Fire extinguishers selected for the type of risk
                    (water, foam, CO2, dry powder, wet chemical),
                    positioned on escape routes at appropriate
                    intervals, maintained annually by a competent
                    person. Hose reels or sprinkler systems where
                    appropriate.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold text-sm">
                    Fire Doors & Compartmentation
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Fire doors providing the required fire resistance
                    (typically FD30 or FD60), fitted with self-closing
                    devices, intumescent strips and smoke seals, kept
                    closed (or held open on electromagnetic devices
                    linked to the fire alarm). Compartmentation to
                    contain fire spread and protect escape routes.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold text-sm">
                    Emergency Plan & Training
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Written emergency plan covering evacuation
                    procedures, staff roles and responsibilities,
                    assembly points, procedures for persons needing
                    assistance, and liaison with the fire service. All
                    staff trained on induction and regularly thereafter.
                    Fire drills at least annually (more frequently for
                    high-risk premises).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 06 -- Steps 4 & 5: Record, Plan, Review        */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              Steps 4 & 5: Record, Plan, Review
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Steps 4 and 5 turn the assessment into action. The
              findings must be recorded, an emergency plan prepared,
              staff trained, and the entire assessment kept under
              regular review.
            </p>

            {/* Recording */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-rose-400 text-sm mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Step 4: Recording the Significant Findings
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Significant findings
                    </strong>{" "}
                    -- the fire hazards identified, the people at risk,
                    the fire precautions in place, and any deficiencies
                    requiring action
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Action plan</strong>{" "}
                    -- with clear priorities, realistic timescales, and
                    a named responsible person for each action. High-risk
                    items must be addressed urgently; lower-risk items
                    can be programmed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">
                      Emergency plan
                    </strong>{" "}
                    -- the evacuation strategy (simultaneous, phased,
                    progressive horizontal, defend-in-place), defined
                    roles (fire marshals, assembly point marshals, fire
                    wardens), detailed procedures for each area, and
                    assembly point locations
                  </span>
                </li>
              </ul>
            </div>

            {/* Training */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">
                Training Requirements
              </h4>
              <div className="space-y-2 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-rose-400 font-semibold text-xs">
                    All Staff -- On Induction
                  </p>
                  <p className="text-white/70 text-xs">
                    Fire safety awareness, location of fire exits and
                    assembly points, action on discovering a fire,
                    action on hearing the alarm, location and use of
                    fire extinguishers, the emergency plan
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-rose-400 font-semibold text-xs">
                    Fire Marshals / Wardens
                  </p>
                  <p className="text-white/70 text-xs">
                    Enhanced training covering sweep procedures,
                    assisting persons needing help, use of all
                    firefighting equipment, liaison with the fire
                    service, roll-call procedures, specific duties
                    under the emergency plan
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-rose-400 font-semibold text-xs">
                    Fire Drills
                  </p>
                  <p className="text-white/70 text-xs">
                    At least annually for most premises, more frequently
                    for high-risk premises (e.g. quarterly for sleeping
                    risks). Drill results must be recorded including
                    evacuation time, any problems encountered, and
                    corrective actions taken
                  </p>
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-rose-400 text-sm mb-3 flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Step 5: Review & Update
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                A fire risk assessment must be reviewed regularly. The
                RRFSO does not specify a fixed interval, but annually is
                the widely accepted minimum. In addition, a review must
                be triggered by:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    Changes to the building layout or structure
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    Change of use of the premises or part of it
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    Significant changes in staffing or occupancy
                    levels
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    Building works, refurbishment, or alterations
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    After a fire or significant near-miss incident
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    When the fire service identifies deficiencies
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    Introduction of new processes, equipment, or
                    materials
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white/60 text-xs">
                    Changes in relevant legislation or guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 -- after section 06 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* -------------------------------------------------------- */}
        {/*  SECTION 07 -- Who Can Carry Out the Assessment?         */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              07
            </span>
            <h3 className="text-xl font-semibold text-white">
              Who Can Carry Out the Assessment?
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The RRFSO requires the fire risk assessment to be carried
              out by a{" "}
              <strong className="text-white">competent person</strong>{" "}
              -- someone with sufficient training, experience,
              knowledge, or other qualities to undertake the task
              properly. This can be an internal person or an external
              specialist.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-rose-400" />
                Competent Person Options
              </h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-rose-400 font-semibold text-sm">
                    Internal Assessment
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    For simple, low-risk premises (small offices, retail
                    units), the responsible person may carry out the
                    assessment themselves, provided they have adequate
                    knowledge of fire hazards and the assessment
                    methodology. HM Government publishes free
                    sector-specific fire safety risk assessment guides
                    to assist.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-rose-400 font-semibold text-sm">
                    PAS 79 Fire Risk Assessors
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Assessors trained in the PAS 79-1:2020 methodology
                    who can carry out assessments to the nationally
                    recognised standard. PAS 79 provides a consistent
                    framework for identifying hazards, evaluating risk,
                    and recording findings.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-rose-400 font-semibold text-sm">
                    Registered Assessors
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Assessors registered with recognised bodies such as
                    the Institution of Fire Engineers (IFE), the BAFE
                    (British Approvals for Fire Equipment) scheme, or
                    the Fire Protection Association (FPA). Registration
                    provides assurance of competence through
                    qualification requirements, auditing, and continuing
                    professional development.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                When to Use an External Specialist
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                An external specialist fire risk assessor should be
                engaged when:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    The premises are complex (multi-storey, mixed-use,
                    interconnected buildings, complex layouts)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    There are sleeping risks (hotels, care homes,
                    hostels, HMOs, hospitals)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    High-risk processes are present (large quantities of
                    flammable substances, industrial processes, LPG
                    storage)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    Large numbers of people are present (public assembly,
                    entertainment venues, sports stadia)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    The responsible person does not have the necessary
                    competence or confidence to carry out the assessment
                    themselves
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    The fire and rescue authority has identified
                    deficiencies in a previous assessment
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-white">Important:</strong>{" "}
              Regardless of whether the assessment is carried out
              internally or externally, the responsibility for fire
              safety remains with the responsible person. Engaging an
              external assessor does not transfer that responsibility.
              The responsible person must ensure the recommendations are
              implemented and the assessment is kept under review.
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  SECTION 08 -- Common Failures & Enforcement Action      */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-sm">
              08
            </span>
            <h3 className="text-xl font-semibold text-white">
              Common Failures & Enforcement Action
            </h3>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Fire and rescue authority inspectors carry out enforcement
              visits to check compliance with the RRFSO. The following
              are the most common failures identified during
              inspections -- and the most common triggers for
              enforcement action.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Most Common Failures Found by Fire Inspectors
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Inadequate or absent fire risk assessment
                    </p>
                    <p className="text-white/70 text-xs">
                      No assessment at all, or an assessment that is
                      generic, outdated, incomplete, or does not reflect
                      the current use and layout of the premises. This
                      is the number one failure found.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Blocked or obstructed escape routes
                    </p>
                    <p className="text-white/70 text-xs">
                      Fire exits locked, escape routes used for
                      storage, corridors narrowed by stock or equipment,
                      fire doors wedged open, external escape routes
                      blocked by vehicles or bins.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Poor housekeeping
                    </p>
                    <p className="text-white/70 text-xs">
                      Accumulations of combustible waste, combustible
                      materials stored close to ignition sources,
                      external bins against the building, dirty
                      extraction systems, cluttered electrical
                      cupboards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    4
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Defective fire doors
                    </p>
                    <p className="text-white/70 text-xs">
                      Missing self-closers, damaged intumescent strips
                      or smoke seals, doors that do not close fully into
                      the frame, gaps around doors, glazing that is not
                      fire-rated, doors propped open without
                      electromagnetic hold-open devices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    5
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      No emergency plan
                    </p>
                    <p className="text-white/70 text-xs">
                      No written emergency plan, or a plan that is
                      outdated, not communicated to staff, or does not
                      cover all scenarios (e.g. out-of-hours evacuation,
                      assistance for disabled persons).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    6
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      No fire drills
                    </p>
                    <p className="text-white/70 text-xs">
                      No record of fire drills ever being conducted, or
                      drills carried out infrequently with no record of
                      evacuation times or lessons learned. Staff who
                      have never participated in a drill will not know
                      what to do in a real fire.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    7
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Inadequate detection and alarm
                    </p>
                    <p className="text-white/70 text-xs">
                      No fire alarm system, system not maintained, not
                      tested weekly, faults not rectified, system
                      category insufficient for the risk (e.g. manual
                      call points only in a premises that requires
                      automatic detection), system not audible in all
                      areas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    8
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Failure to review
                    </p>
                    <p className="text-white/70 text-xs">
                      Fire risk assessment not reviewed after
                      significant changes, building works, change of
                      use, or for years at a time. An unreviewed
                      assessment is an unreliable assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enforcement Actions */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">
                Enforcement Action & Penalties
              </h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3 border-l-4 border-amber-500">
                  <p className="text-amber-400 font-semibold text-sm">
                    Informal Notification
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    For minor deficiencies, the inspecting officer may
                    give informal advice or write to the responsible
                    person advising of the improvements needed. This is
                    not legally enforceable but indicates areas of
                    concern.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border-l-4 border-orange-500">
                  <p className="text-orange-400 font-semibold text-sm">
                    Enforcement Notice (Article 30)
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Requires the responsible person to take specific
                    steps to remedy the failures within a set period.
                    Failure to comply is a criminal offence. The notice
                    must specify what is wrong and what must be done to
                    put it right.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border-l-4 border-red-500">
                  <p className="text-red-400 font-semibold text-sm">
                    Prohibition Notice (Article 31)
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Where there is a serious risk to life, a
                    prohibition notice can immediately restrict or
                    prohibit the use of all or part of the premises until
                    the risk is reduced to an acceptable level. This can
                    shut down a business instantly.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border-l-4 border-purple-500">
                  <p className="text-purple-400 font-semibold text-sm">
                    Prosecution
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    For serious breaches, the fire and rescue authority
                    can prosecute the responsible person. Penalties
                    include unlimited fines and, for the most serious
                    cases, imprisonment for up to two years. In recent
                    years, fines for fire safety offences have
                    increased dramatically, with six- and seven-figure
                    fines now common for serious breaches.
                  </p>
                </div>
              </div>
            </div>

            {/* Case Examples */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-rose-400" />
                Case Examples
              </h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-sm">
                    Hotel Chain -- Inadequate FRA
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    A major hotel chain was fined over 300,000 pounds
                    after fire inspectors found that fire risk
                    assessments across multiple properties were
                    inadequate, fire doors were defective, and escape
                    routes were obstructed. The fire risk assessments
                    had not been reviewed after significant
                    refurbishments.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-sm">
                    Care Home -- No Emergency Plan
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    A care home operator received a prohibition notice
                    after inspectors found no written emergency plan, no
                    PEEPs for residents with mobility impairments, fire
                    doors wedged open, and no fire drills on record. The
                    premises was prohibited from use for sleeping
                    accommodation until all deficiencies were rectified.
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-white font-medium text-sm">
                    Warehouse -- Blocked Escape Routes
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    A warehouse operator was prosecuted and fined
                    150,000 pounds after inspectors found fire exits
                    locked during working hours, escape routes blocked
                    by palletised stock, the fire alarm system out of
                    service, and no fire risk assessment on the
                    premises. A prohibition notice was served
                    immediately, halting all work until the issues were
                    resolved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Key Rules Summary                                       */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-rose-400" />
            Key Rules -- Quick Reference
          </h3>
          <div className="bg-gradient-to-br from-rose-500/10 to-rose-400/10 border border-rose-500/20 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-rose-400 font-bold text-lg flex-shrink-0">
                  1
                </span>
                <p className="text-white/80">
                  <strong className="text-rose-400">Article 9</strong>{" "}
                  of the RRFSO makes a fire risk assessment{" "}
                  <strong className="text-white">mandatory</strong> for
                  all non-domestic premises
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-orange-400 font-bold text-lg flex-shrink-0">
                  2
                </span>
                <p className="text-white/80">
                  The{" "}
                  <strong className="text-orange-400">
                    five-step process
                  </strong>{" "}
                  covers hazards, people, evaluation, recording, and{" "}
                  <strong className="text-white">review</strong>
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold text-lg flex-shrink-0">
                  3
                </span>
                <p className="text-white/80">
                  Must be{" "}
                  <strong className="text-amber-400">
                    recorded in writing
                  </strong>{" "}
                  if 5+ employees, licensed premises, or alterations
                  notice
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-green-400 font-bold text-lg flex-shrink-0">
                  4
                </span>
                <p className="text-white/80">
                  It is a{" "}
                  <strong className="text-green-400">
                    living document
                  </strong>{" "}
                  -- review{" "}
                  <strong className="text-white">
                    annually minimum
                  </strong>{" "}
                  and after any significant change
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-blue-400 font-bold text-lg flex-shrink-0">
                  5
                </span>
                <p className="text-white/80">
                  Must be carried out by a{" "}
                  <strong className="text-blue-400">
                    competent person
                  </strong>{" "}
                  -- internal or external depending on complexity
                </p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-purple-400 font-bold text-lg flex-shrink-0">
                  6
                </span>
                <p className="text-white/80">
                  Inadequate FRA is the{" "}
                  <strong className="text-purple-400">
                    number one failure
                  </strong>{" "}
                  found by fire inspectors -- leading to{" "}
                  <strong className="text-white">
                    enforcement action and prosecution
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  FAQs                                                    */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
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

        {/* -------------------------------------------------------- */}
        {/*  Quiz                                                    */}
        {/* -------------------------------------------------------- */}
        <Quiz
          title="Section 3 -- Fire Risk Assessment"
          questions={quizQuestions}
        />

        {/* -------------------------------------------------------- */}
        {/*  Navigation Footer                                       */}
        {/* -------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2-section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: The Responsible Person
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-rose-500 hover:bg-rose-500/90 text-white font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-2-section-4">
              Next: Supporting Legislation & Standards
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
