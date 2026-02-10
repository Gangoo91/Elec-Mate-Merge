import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  PenTool,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick Check Questions (inline after sections 02, 04, 06)          */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "pd-appointment",
    question:
      "When must a client appoint a Principal Designer under CDM 2015?",
    options: [
      "On every construction project regardless of size",
      "When the project involves more than one contractor",
      "Only when the project exceeds £500,000 in value",
      "Only when the HSE issues a formal instruction",
    ],
    correctIndex: 1,
    explanation:
      "Under Regulation 5 of CDM 2015, the client must appoint a Principal Designer when the project involves, or is likely to involve, more than one contractor. The PD takes control of the pre-construction phase and coordinates health and safety in design.",
  },
  {
    id: "design-risk-hierarchy",
    question:
      "What is the correct hierarchy of risk control that the Principal Designer must apply?",
    options: [
      "Inform about risks, then reduce risks, then eliminate hazards",
      "Reduce risks, eliminate hazards, then inform about residual risks",
      "Eliminate hazards, reduce risks, then inform about remaining risks",
      "Transfer all risks to the principal contractor",
    ],
    correctIndex: 2,
    explanation:
      "The General Principles of Prevention (Schedule 1 of CDM 2015) require the PD to follow a strict hierarchy: first eliminate hazards through design, then reduce risks that cannot be eliminated, and finally inform others about remaining risks that cannot be designed out. This mirrors the standard hierarchy of risk control.",
  },
  {
    id: "hs-file-handover",
    question:
      "What must the Principal Designer do with the Health & Safety File at project completion?",
    options: [
      "Archive it with the HSE for future reference",
      "Pass it to the client for retention and future use",
      "Destroy it once all works are signed off",
      "Keep it in their own records for seven years",
    ],
    correctIndex: 1,
    explanation:
      "The Principal Designer must ensure the Health & Safety File is reviewed, updated, and passed to the client at project completion. The client must then retain it and make it available to anyone who needs it for future construction work, maintenance, or alterations on the structure.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs                                                               */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Can the client appoint themselves as the Principal Designer?",
    answer:
      "Yes, but only if the client is a designer (or an organisation that employs designers) and has the skills, knowledge, experience, and organisational capability to fulfil the PD role. In practice this is unusual for domestic clients but may occur with large organisations that have in-house design teams. If the client is not a designer, they cannot take on the PD role — they must appoint a competent external designer.",
  },
  {
    question:
      "What happens if no Principal Designer is appointed on a multi-contractor project?",
    answer:
      "If the client fails to appoint a Principal Designer when one is required, the PD duties fall on the client by default under Regulation 5(4). This means the client becomes legally responsible for all PD functions including coordinating design, managing pre-construction information, and preparing the Health & Safety File. This is a significant liability and the HSE views failure to appoint as a serious breach of CDM 2015.",
  },
  {
    question:
      "How does the Principal Designer role differ from a project architect?",
    answer:
      "While the PD is often the lead architect, the roles are distinct. The project architect focuses on design quality, aesthetics, functionality, and buildability. The Principal Designer has specific CDM 2015 duties around health and safety coordination during the pre-construction phase — including identifying and eliminating design risks, coordinating between designers, preparing pre-construction information, and compiling the Health & Safety File. A PD must think about how their design decisions affect construction safety, maintenance safety, and end-of-life demolition safety.",
  },
  {
    question:
      "Can the Principal Designer role be transferred during a project?",
    answer:
      "Yes. The client can replace the Principal Designer at any point during the project. If the PD's appointment ends before the construction phase is complete, the client must either appoint a replacement PD or ensure that the principal contractor takes on the PD duties for any remaining design work. The outgoing PD must hand over all relevant project information, including the draft Health & Safety File, pre-construction information, and any design risk registers. There must be no gap in PD coverage.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                  */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, who must the Principal Designer be?",
    options: [
      "Any competent person appointed by the client",
      "A designer (individual or organisation) with the ability to control the pre-construction phase",
      "A certified CDM Coordinator registered with the HSE",
      "The most senior architect on the project team",
    ],
    correctAnswer: 1,
    explanation:
      "The Principal Designer must be a designer — either an individual or an organisation that carries out design work — and must have the skills, knowledge, experience, and organisational capability to fulfil the role. They must be able to exercise control over the pre-construction phase of the project.",
  },
  {
    id: 2,
    question:
      "Which regulation in CDM 2015 sets out the Principal Designer's duties?",
    options: [
      "Regulation 8 — General duties",
      "Regulation 9 — Designers",
      "Regulation 11 — Duties of a Principal Designer",
      "Regulation 13 — Duties of a Principal Contractor",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 11 of CDM 2015 specifically sets out the duties of the Principal Designer, including planning, managing, and monitoring the pre-construction phase, coordinating design work, ensuring designers comply with their duties, and preparing the Health & Safety File.",
  },
  {
    id: 3,
    question:
      "What is the Principal Designer's primary duty during the pre-construction phase?",
    options: [
      "To carry out all the design work personally",
      "To plan, manage, monitor, and coordinate health and safety in the pre-construction phase",
      "To prepare the construction phase plan",
      "To supervise workers on site during excavation works",
    ],
    correctAnswer: 1,
    explanation:
      "The PD's primary duty is to plan, manage, monitor, and coordinate health and safety matters during the pre-construction phase. This includes ensuring that designers cooperate, that risks are identified and eliminated or reduced through design, and that pre-construction information is prepared and distributed.",
  },
  {
    id: 4,
    question:
      "According to the General Principles of Prevention (Schedule 1), which step comes first in the risk control hierarchy?",
    options: [
      "Provide collective protective measures",
      "Give appropriate instructions and information to workers",
      "Avoid risks (eliminate the hazard entirely)",
      "Adapt the work to the individual",
    ],
    correctAnswer: 2,
    explanation:
      "The first principle in Schedule 1 is to avoid risks entirely — that is, to eliminate the hazard through design. If a hazard can be designed out completely, no further control measures are needed. Only when elimination is not reasonably practicable should the PD move to the next steps in the hierarchy.",
  },
  {
    id: 5,
    question:
      "Which of the following must be included in the Health & Safety File?",
    options: [
      "The project's financial accounts and cost records",
      "As-built drawings, material specifications, and maintenance procedures",
      "Personal performance reviews of the design team",
      "Marketing brochures for the completed building",
    ],
    correctAnswer: 1,
    explanation:
      "The Health & Safety File must contain information needed for future construction work, maintenance, refurbishment, or demolition. This includes as-built drawings, specifications of materials used (including hazardous substances), maintenance schedules and procedures, and details of any structural arrangements or design features that affect safety.",
  },
  {
    id: 6,
    question:
      "How does the CDM 2015 Principal Designer role differ from the CDM 2007 CDM Coordinator?",
    options: [
      "The PD has a purely advisory role, while the CDM-C had legal duties",
      "The PD must be a designer with control over pre-construction design, while the CDM-C could be a non-designer advisor",
      "The PD only works during the construction phase, while the CDM-C worked pre-construction",
      "There is no difference — the roles are identical with a new name",
    ],
    correctAnswer: 1,
    explanation:
      "The key difference is that the Principal Designer must be a designer (someone who carries out design work) and must have direct control over the pre-construction phase. The CDM 2007 Coordinator could be a non-designer advisor with a more administrative and advisory function. CDM 2015 deliberately shifted responsibility to someone who could influence design decisions directly.",
  },
  {
    id: 7,
    question:
      "A Principal Designer discovers that two design consultants have specified conflicting structural details. What should the PD do?",
    options: [
      "Ignore the conflict and allow the principal contractor to resolve it on site",
      "Coordinate the designers, facilitate a design review meeting, and ensure the conflict is resolved before construction begins",
      "Report the matter to the HSE immediately",
      "Instruct both designers to withdraw their specifications",
    ],
    correctAnswer: 1,
    explanation:
      "One of the PD's core duties is to coordinate design work and ensure designers cooperate with each other. When design conflicts arise, the PD must facilitate resolution — typically through design review meetings, updated risk assessments, and clear communication. Conflicts must be resolved before they reach the construction phase.",
  },
  {
    id: 8,
    question:
      "What competence standard is required for a Principal Designer under CDM 2015?",
    options: [
      "A formal CDM Principal Designer qualification issued by the HSE",
      "At least 10 years of experience as a project architect",
      "Demonstrable skills, knowledge, experience, and organisational capability — no formal qualification required",
      "Membership of a professional body such as RIBA or ICE is mandatory",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 does not require a specific formal qualification for the PD role. Instead, the PD must demonstrate sufficient skills, knowledge, experience, and organisational capability to fulfil the duties. While membership of professional bodies (RIBA, ICE, CIOB) provides evidence of competence, it is not a mandatory requirement. What matters is demonstrable ability to perform the role effectively.",
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const CdmRegulationsModule2Section2 = () => {
  useSEO({
    title:
      "Principal Designer | CDM Regulations Module 2.2",
    description:
      "Understand the Principal Designer's role under CDM 2015 — appointment, duties, risk management through design, coordinating designers, the Health & Safety File, and competence requirements.",
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
            <Link to="../cdm-regulations-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 mb-4">
            <PenTool className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-blue-400">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Principal Designer
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            The Principal Designer is the key duty holder responsible for
            planning, managing, and coordinating health and safety during the
            pre-construction phase of a CDM 2015 project
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="font-semibold text-blue-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Appointed by:</strong> the
                  client, on projects with more than one contractor
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Must be:</strong> a designer
                  with control over the pre-construction phase
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Core duty:</strong> plan,
                  manage, monitor, and coordinate H&S in design
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Key output:</strong> the
                  Health & Safety File passed to the client
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="font-semibold text-blue-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Before construction:</strong>{" "}
                  PD coordinates all pre-construction design work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Design reviews:</strong>{" "}
                  ensure risks are eliminated or reduced through design
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">H&S File:</strong> compile
                  as-built info, materials, maintenance procedures
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Handover:</strong> pass the
                  completed H&S File to the client at project end
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
              "Explain who the Principal Designer is and when they must be appointed under CDM 2015",
              "Describe the PD's duties under Regulation 11 including planning, managing, and coordinating the pre-construction phase",
              "Apply the General Principles of Prevention hierarchy to design risk management",
              "Explain how the PD coordinates design work between multiple designers",
              "Describe the purpose, content, and handover requirements of the Health & Safety File",
              "Compare the CDM 2015 Principal Designer role with the former CDM 2007 CDM Coordinator",
              "Identify the competence requirements for a Principal Designer",
              "Recognise the PD's responsibilities throughout each project phase from inception to completion",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — Who Is the Principal Designer?                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">01</span>
              Who Is the Principal Designer?
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The{" "}
                <strong className="text-white">Principal Designer (PD)</strong>{" "}
                is the designer appointed by the client to take control of the{" "}
                <strong className="text-white">pre-construction phase</strong>{" "}
                of a project. Under CDM 2015, the client must appoint a PD on
                any project that involves, or is likely to involve,{" "}
                <strong className="text-white">
                  more than one contractor
                </strong>
                .
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Key Definition: Principal Designer
                </h3>
                <p className="text-white/80 text-sm">
                  The Principal Designer is a{" "}
                  <strong className="text-white">designer</strong> (an
                  individual or organisation that carries out design work)
                  appointed by the client under Regulation 5 of CDM 2015 to
                  plan, manage, monitor, and coordinate health and safety during
                  the pre-construction phase. The PD must have the skills,
                  knowledge, experience, and organisational capability to fulfil
                  the role.
                </p>
              </div>

              <p>
                The PD role was introduced by CDM 2015 to replace the former CDM
                Coordinator role from CDM 2007. The critical difference is that
                the PD{" "}
                <strong className="text-white">must be a designer</strong> —
                someone who actually carries out design work and can therefore
                influence design decisions directly. In practice, the PD is
                typically:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-2">
                  Typical Principal Designers
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Architect</strong> — the
                      most common appointment, particularly on building projects
                      where the architect leads the design team
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Consulting engineer
                      </strong>{" "}
                      — structural, civil, or building services engineer on
                      engineering-led projects
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Multi-disciplinary design practice
                      </strong>{" "}
                      — a firm that employs designers across multiple disciplines
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Design-and-build contractor
                      </strong>{" "}
                      — where the contractor also carries out design, they may
                      take on the PD role
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Timing of Appointment
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  The client must appoint the PD{" "}
                  <strong className="text-white">
                    as early as practicable
                  </strong>{" "}
                  — and in any event before the construction phase begins. The
                  earlier the appointment, the greater the PD&rsquo;s ability to
                  influence design and eliminate hazards. Ideally, the PD should
                  be appointed at the concept or feasibility stage so they can
                  shape the design from the outset.
                </p>
              </div>

              <p>
                If the client fails to appoint a PD when one is required, the PD
                duties{" "}
                <strong className="text-white">
                  fall on the client by default
                </strong>
                . This can create serious legal exposure for clients who are not
                designers and lack the competence to fulfil the role.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — PD Duties Overview                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-sky-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-sky-400/80 text-sm font-normal">02</span>
              PD Duties Overview (Regulation 11)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong className="text-white">Regulation 11</strong> of CDM
                2015 sets out the Principal Designer&rsquo;s duties in detail.
                The PD must take active control of health and safety during the
                pre-construction phase — this is not an advisory or
                administrative role but one of{" "}
                <strong className="text-white">direct responsibility</strong>.
              </p>

              <div className="bg-white/5 border border-sky-400/30 p-4 rounded-lg">
                <h3 className="text-sky-300 font-medium mb-3">
                  Regulation 11 — Core Duties
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Plan, Manage & Monitor
                      </p>
                      <p className="text-white/60">
                        Plan, manage, and monitor the pre-construction phase,
                        ensuring it is carried out without risks to health and
                        safety so far as is reasonably practicable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Coordinate Design Work
                      </p>
                      <p className="text-white/60">
                        Coordinate matters relating to health and safety during
                        the pre-construction phase to ensure that all designers
                        comply with their duties under Regulation 9.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Ensure Designer Compliance
                      </p>
                      <p className="text-white/60">
                        Ensure that designers comply with their duties — in
                        particular, the duty to eliminate foreseeable risks and
                        reduce risks through design decisions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Pre-Construction Information
                      </p>
                      <p className="text-white/60">
                        Assist the client in providing pre-construction
                        information to every designer and contractor appointed
                        (or being considered for appointment) to the project.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-300 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Prepare the Health & Safety File
                      </p>
                      <p className="text-white/60">
                        Prepare, review, update, and revise the Health & Safety
                        File, ensuring it contains information likely to be
                        needed during any subsequent construction work on the
                        structure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-300 text-xs font-bold">6</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Liaise with the Principal Contractor
                      </p>
                      <p className="text-white/60">
                        Liaise with the principal contractor for the duration of
                        their appointment, sharing relevant design information
                        and ensuring design risk information is communicated
                        effectively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Key Principle: Active Control
                </h3>
                <p className="text-white/80 text-sm">
                  The PD role under CDM 2015 is fundamentally about{" "}
                  <strong className="text-white">active control</strong>, not
                  passive advice. The PD must{" "}
                  <strong className="text-white">do</strong> — not merely
                  recommend. They must plan, manage, coordinate, and ensure.
                  This is a deliberate shift from the former CDM Coordinator
                  role, which was often criticised for being too advisory and
                  insufficiently connected to actual design decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Pre-Construction Phase                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Pre-Construction Phase
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The{" "}
                <strong className="text-white">pre-construction phase</strong>{" "}
                is the period from when the design work begins until the
                construction phase starts. This is the PD&rsquo;s primary area
                of responsibility and the window during which design decisions
                can have the greatest impact on construction safety.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  PD Responsibilities During Pre-Construction
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Identify risks:
                      </strong>{" "}
                      work with the design team to identify foreseeable health
                      and safety risks arising from the design
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Eliminate risks through design:
                      </strong>{" "}
                      where possible, change the design to remove hazards
                      entirely — for example, specifying pre-fabricated
                      components to reduce work at height
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Reduce remaining risks:
                      </strong>{" "}
                      where elimination is not possible, reduce risks through
                      design choices — such as positioning heavy plant at ground
                      level instead of on upper floors
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Prepare pre-construction information:
                      </strong>{" "}
                      compile and distribute information relevant to the project
                      including existing surveys, site conditions, hazardous
                      materials, and previous H&S files
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Coordinate design work:
                      </strong>{" "}
                      manage the interfaces between different design disciplines
                      (architecture, structural, mechanical, electrical) to
                      ensure no conflicts create safety risks
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                The pre-construction information is critical because it forms the
                basis on which the{" "}
                <strong className="text-white">
                  principal contractor prepares the construction phase plan
                </strong>
                . Poor or incomplete pre-construction information leads to poor
                planning, which leads to unsafe construction.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Practical Example
                </h3>
                <p className="text-white/80 text-sm">
                  A PD working on a school refurbishment project reviews the
                  existing asbestos survey and discovers ACMs in the ceiling
                  voids where new electrical and mechanical services are to be
                  routed. The PD coordinates with the M&E designer to re-route
                  the services away from the ACMs where possible, and ensures
                  that the pre-construction information provided to the principal
                  contractor clearly identifies the remaining ACM locations so a
                  licensed asbestos removal contractor can be appointed before
                  the M&E installation begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Design Risk Management                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-indigo-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-indigo-400/80 text-sm font-normal">04</span>
              Design Risk Management
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                At the heart of the PD&rsquo;s role is{" "}
                <strong className="text-white">
                  design risk management
                </strong>{" "}
                — the process of identifying hazards that arise from the design
                and either eliminating them or reducing the associated risks. CDM
                2015 requires the PD (and all designers) to apply the{" "}
                <strong className="text-white">
                  General Principles of Prevention
                </strong>{" "}
                set out in Schedule 1 of the Regulations.
              </p>

              <div className="bg-white/5 border border-indigo-400/30 p-4 rounded-lg">
                <h3 className="text-indigo-300 font-medium mb-3">
                  Schedule 1 — General Principles of Prevention
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        a
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Avoid risks</p>
                      <p className="text-white/60">
                        Eliminate the hazard entirely through a design change —
                        for example, designing ground-level maintenance access
                        instead of roof-level access
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        b
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Evaluate unavoidable risks
                      </p>
                      <p className="text-white/60">
                        Assess the risks that cannot be eliminated — determine
                        their severity and likelihood
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        c
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Combat risks at source
                      </p>
                      <p className="text-white/60">
                        Address the root cause of the risk through design rather
                        than relying on protective measures — for example,
                        specifying lighter materials to reduce manual handling
                        risks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        d
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Adapt work to the individual
                      </p>
                      <p className="text-white/60">
                        Design workplaces, workstations, and work processes to
                        suit the people who will use them
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        e
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Adapt to technical progress
                      </p>
                      <p className="text-white/60">
                        Use modern construction methods, materials, and
                        techniques that are inherently safer
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        f
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Replace dangerous with non-dangerous
                      </p>
                      <p className="text-white/60">
                        Substitute hazardous materials, substances, or processes
                        with safer alternatives where practicable
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        g
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Develop a coherent prevention policy
                      </p>
                      <p className="text-white/60">
                        Ensure a systematic, project-wide approach to risk
                        prevention — not piecemeal measures
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        h
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Prioritise collective over individual measures
                      </p>
                      <p className="text-white/60">
                        Design features that protect everyone (e.g. permanent
                        edge protection) before relying on individual PPE
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-300 text-xs font-bold">
                        i
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Give appropriate instructions and information
                      </p>
                      <p className="text-white/60">
                        Communicate remaining risks clearly to those who need to
                        know — through design risk information, drawings, and the
                        H&S File
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  The Design Risk Hierarchy in Practice
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The PD must apply a clear three-step hierarchy to every design
                  decision that affects health and safety:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-300 text-xs font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="text-green-300 font-medium">
                        ELIMINATE — Design out the hazard
                      </p>
                      <p className="text-white/60 text-xs">
                        Change the design so the hazard does not exist
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-300 text-xs font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-amber-300 font-medium">
                        REDUCE — Minimise the risk
                      </p>
                      <p className="text-white/60 text-xs">
                        Where elimination is not possible, redesign to reduce
                        the severity or likelihood
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-red-300 font-medium">
                        INFORM — Communicate remaining risks
                      </p>
                      <p className="text-white/60 text-xs">
                        Provide clear information about risks that cannot be
                        designed out
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Designers must not simply identify risks and pass them to the
                contractor to manage. The expectation is that the PD and all
                designers will make{" "}
                <strong className="text-white">
                  genuine design decisions
                </strong>{" "}
                that improve safety, not produce paperwork that transfers
                responsibility.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05 — Coordinating Design Work                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">
                05
              </span>
              Coordinating Design Work
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                On any project with multiple designers, there will be{" "}
                <strong className="text-white">design interfaces</strong> —
                points where the work of one designer meets or affects the work
                of another. The PD is responsible for managing these interfaces
                to ensure they do not create health and safety risks.
              </p>

              <div className="bg-white/5 border border-violet-400/30 p-4 rounded-lg">
                <h3 className="text-violet-300 font-medium mb-3">
                  Coordination Methods
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Design review meetings:
                      </strong>{" "}
                      regular meetings where all designers present their work
                      and the PD identifies potential conflicts, overlaps, or
                      safety issues arising from the combined design
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Risk registers:</strong>{" "}
                      a project-wide register maintained by the PD that records
                      all identified design risks, the designer responsible, the
                      action taken (eliminate, reduce, inform), and the current
                      status
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Design risk assessments:
                      </strong>{" "}
                      each designer produces risk assessments for their
                      discipline, and the PD reviews them to ensure consistency
                      and completeness
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Cooperation protocols:
                      </strong>{" "}
                      the PD ensures all designers cooperate with each other and
                      with the principal contractor, sharing information openly
                      and promptly
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        BIM coordination:
                      </strong>{" "}
                      on projects using Building Information Modelling, the PD
                      can use clash detection software to identify physical
                      conflicts between different design disciplines before
                      construction
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Common Design Interface Issues
                  </h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  The following are common examples of design interface problems
                  that the PD must identify and resolve:
                </p>
                <ul className="text-white/70 space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Structural steelwork clashing with M&E service routes,
                      forcing workers to work in confined or awkward positions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Cladding fixings specified in locations where there is no
                      safe means of access for installation or maintenance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Different designers specifying incompatible fire
                      protection systems that leave gaps in coverage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Drainage and foundation designs conflicting, creating
                      excavation stability risks
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The PD does not need to check every line of every drawing, but
                they must establish{" "}
                <strong className="text-white">
                  systems and processes
                </strong>{" "}
                that identify and resolve design interface issues before they
                reach the construction phase. Prevention through design
                coordination is always preferable to resolution on site.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06 — Health & Safety File                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">
                06
              </span>
              Health & Safety File
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The{" "}
                <strong className="text-white">Health & Safety File</strong> is
                one of the most important outputs of the PD&rsquo;s work. It is
                a document (or collection of documents) that contains
                information about the completed structure which will be needed
                for any future construction work, maintenance, cleaning,
                refurbishment, or demolition.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Key Definition: Health & Safety File
                </h3>
                <p className="text-white/80 text-sm">
                  The H&S File is a living document prepared by the Principal
                  Designer during the project and passed to the client at
                  completion. It contains information needed for anyone who may
                  carry out future construction work on the structure — including
                  as-built drawings, specifications, details of hazardous
                  materials, structural arrangements, maintenance procedures, and
                  residual design risks.
                </p>
              </div>

              <div className="bg-white/5 border border-emerald-400/30 p-4 rounded-lg">
                <h3 className="text-emerald-300 font-medium mb-3">
                  H&S File Contents
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        As-Built Drawings
                      </p>
                      <p className="text-white/60">
                        Accurate drawings showing the building as actually
                        constructed — including structural elements, service
                        routes, drainage, foundations, and any hidden or
                        concealed elements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Material Specifications
                      </p>
                      <p className="text-white/60">
                        Details of materials used — particularly hazardous
                        substances (e.g. lead paint, asbestos-free but
                        specialist coatings), structural adhesives, composite
                        materials, and fire-resistant products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Maintenance Procedures
                      </p>
                      <p className="text-white/60">
                        Safe methods of access for cleaning, maintenance, and
                        repair — including information about fall arrest anchor
                        points, safe access routes to plant rooms, and
                        maintenance schedules for safety-critical systems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Structural Arrangements
                      </p>
                      <p className="text-white/60">
                        Details of structural systems, load-bearing elements,
                        pre-stressed or post-tensioned members, and any
                        temporary works that were left in place
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-300 text-xs font-bold">
                        5
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Residual Design Risks
                      </p>
                      <p className="text-white/60">
                        Information about risks that could not be eliminated
                        through design — for example, buried services, fragile
                        roof materials, or concealed structural connections that
                        must not be disturbed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Handover Requirements
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  The PD must ensure the H&S File is{" "}
                  <strong className="text-white">
                    passed to the client at project completion
                  </strong>
                  . If the PD&rsquo;s appointment ends before the construction
                  phase is complete, the file must be handed to the principal
                  contractor who will continue to develop it. The client must
                  then retain the H&S File and make it available to anyone who
                  needs it for future work on the structure. When a building is
                  sold, the H&S File should be passed to the new owner.
                </p>
              </div>

              <p>
                A well-prepared H&S File is invaluable — it provides future
                designers, contractors, and maintenance teams with the
                information they need to work safely on the structure for the
                rest of its life. A poor or missing H&S File forces future
                workers to proceed without critical safety information.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07 — PD vs CDM Coordinator                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">07</span>
              PD vs CDM Coordinator
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                CDM 2015 replaced the{" "}
                <strong className="text-white">CDM Coordinator</strong> (CDM-C)
                role from CDM 2007 with the{" "}
                <strong className="text-white">Principal Designer</strong>{" "}
                role. While both roles address pre-construction health and
                safety, the PD role represents a significant shift in approach.
              </p>

              {/* Comparison Table */}
              <div className="my-6">
                <h3 className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  PD vs CDM Coordinator — Comparison Table
                </h3>
                <div className="overflow-x-auto -mx-4 px-4">
                  <div className="min-w-[600px]">
                    {/* Header row */}
                    <div className="grid grid-cols-3 gap-px bg-white/10 rounded-t-lg overflow-hidden">
                      <div className="bg-blue-500/20 p-3">
                        <p className="text-blue-300 font-semibold text-sm">
                          Aspect
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-3">
                        <p className="text-blue-300 font-semibold text-sm">
                          CDM 2007 — CDM Coordinator
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-3">
                        <p className="text-blue-300 font-semibold text-sm">
                          CDM 2015 — Principal Designer
                        </p>
                      </div>
                    </div>

                    {/* Data rows */}
                    {[
                      {
                        aspect: "Who can be appointed?",
                        cdm2007:
                          "Any competent person — did not need to be a designer",
                        cdm2015:
                          "Must be a designer (individual or organisation) who carries out design work",
                      },
                      {
                        aspect: "Nature of the role",
                        cdm2007:
                          "Primarily advisory and administrative — coordinated information flow",
                        cdm2015:
                          "Active control — plans, manages, monitors, and coordinates the pre-construction phase",
                      },
                      {
                        aspect: "Design influence",
                        cdm2007:
                          "Limited — could advise designers but had no direct control over design decisions",
                        cdm2015:
                          "Direct — the PD is a designer and can influence and direct design decisions",
                      },
                      {
                        aspect: "Duty to ensure compliance",
                        cdm2007:
                          "Advised designers of their duties — no direct enforcement power",
                        cdm2015:
                          "Must ensure designers comply with their duties under Regulation 9",
                      },
                      {
                        aspect: "Health & Safety File",
                        cdm2007:
                          "CDM-C prepared the H&S File",
                        cdm2015:
                          "PD prepares, reviews, updates, and passes the H&S File to the client",
                      },
                      {
                        aspect: "Notifiable projects only?",
                        cdm2007:
                          "Yes — only required on notifiable projects (over 30 days / 500 person-days)",
                        cdm2015:
                          "No — required on all projects with more than one contractor (lower threshold)",
                      },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className={`grid grid-cols-3 gap-px ${i % 2 === 0 ? "bg-white/5" : "bg-white/[0.02]"} ${i === 5 ? "rounded-b-lg overflow-hidden" : ""}`}
                      >
                        <div className="p-3 border-r border-white/5">
                          <p className="text-white font-medium text-xs">
                            {row.aspect}
                          </p>
                        </div>
                        <div className="p-3 border-r border-white/5">
                          <p className="text-white/60 text-xs">
                            {row.cdm2007}
                          </p>
                        </div>
                        <div className="p-3">
                          <p className="text-white/80 text-xs">
                            {row.cdm2015}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Why the Change?
                </h3>
                <p className="text-white/80 text-sm">
                  The Löfstedt review (2011) and the subsequent government
                  response identified that the CDM Coordinator role was often
                  seen as a{" "}
                  <strong className="text-white">
                    bureaucratic intermediary
                  </strong>{" "}
                  rather than someone with real influence over design safety.
                  Many CDM-Cs were not designers and could not effectively
                  challenge or change design decisions. CDM 2015 addressed this
                  by requiring the PD to be a designer, giving them direct
                  control over design health and safety, and making the role less
                  about paperwork and more about{" "}
                  <strong className="text-white">
                    genuine risk reduction through design
                  </strong>
                  .
                </p>
              </div>

              <div className="bg-white/5 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    Transitional Note
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Some professionals who previously worked as CDM Coordinators
                  transitioned into PD roles under CDM 2015. However, only those
                  who are designers (or work within design organisations) can
                  legitimately take on the PD role. Former CDM-Cs who are not
                  designers may continue to provide H&S advisory services but
                  cannot be appointed as Principal Designers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08 — PD Competence                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              PD Competence
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                CDM 2015 does not prescribe a specific qualification for the
                Principal Designer. Instead, it requires the PD to have
                sufficient{" "}
                <strong className="text-white">
                  skills, knowledge, experience, and organisational capability
                </strong>{" "}
                to fulfil the role. The client must make a reasonable assessment
                of the PD&rsquo;s competence before making the appointment.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Competence Framework
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">
                        S
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Skills</p>
                      <p className="text-white/60">
                        Practical ability to carry out the PD role — including
                        design risk assessment, coordination of design teams,
                        production of pre-construction information, and
                        compilation of H&S Files
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">
                        K
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Knowledge</p>
                      <p className="text-white/60">
                        Understanding of CDM 2015 and related legislation,
                        construction health and safety hazards, the General
                        Principles of Prevention, and the design process
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">
                        E
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Experience</p>
                      <p className="text-white/60">
                        Relevant track record of managing pre-construction
                        health and safety on projects of a similar nature, size,
                        and complexity
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-bold">
                        O
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Organisational Capability
                      </p>
                      <p className="text-white/60">
                        The organisation must have the resources, systems,
                        processes, and management structure to support the PD
                        function — including trained staff, quality management
                        systems, and adequate time allocation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-2">
                  Professional Body Alignment
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  While no formal PD qualification is required, membership of
                  recognised professional bodies provides evidence of competence:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">RIBA</strong> — Royal
                      Institute of British Architects: professional standards
                      for architects, including CDM awareness
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">ICE</strong> — Institution
                      of Civil Engineers: professional standards for civil and
                      structural engineers
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">CIOB</strong> — Chartered
                      Institute of Building: professional standards for
                      construction managers and design-and-build contractors
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">CIBSE</strong> — Chartered
                      Institution of Building Services Engineers: relevant for
                      M&E-led projects
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">APS</strong> — Association
                      for Project Safety: offers specific training and
                      certification for CDM professionals
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">
                  Proportionality
                </h3>
                <p className="text-white/80 text-sm">
                  The level of competence required is{" "}
                  <strong className="text-white">proportionate</strong> to the
                  nature, size, and complexity of the project. A small domestic
                  extension with two contractors requires a PD with basic CDM
                  knowledge and design risk management skills. A major
                  infrastructure project requires a PD (or PD organisation) with
                  extensive experience of managing complex, multi-disciplinary
                  design teams and high-risk construction activities.
                </p>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Client Responsibility
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  It is the{" "}
                  <strong className="text-white">client&rsquo;s duty</strong> to
                  make reasonable enquiries to satisfy themselves that the PD has
                  the necessary competence. This does not mean the client needs
                  to be an expert — but they must take reasonable steps, such as
                  checking qualifications, reviewing past project experience,
                  asking for references, and assessing organisational resources.
                  Simply appointing the cheapest designer without checking
                  competence is a breach of the client&rsquo;s duty under
                  Regulation 5.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  DIAGRAM — Principal Designer Duties Timeline                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h3 className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wide">
            Principal Designer Duties Timeline
          </h3>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-500/20"></div>

            {/* Phase 1: Inception */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-blue-300 text-xs font-bold">1</span>
              </div>
              <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 flex-1">
                <p className="text-blue-300 font-semibold text-sm mb-1">
                  Inception & Appointment
                </p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li>Client identifies the project involves more than one contractor</li>
                  <li>PD appointed as early as practicable</li>
                  <li>PD reviews project brief and client requirements</li>
                </ul>
              </div>
            </div>

            {/* Phase 2: Concept Design */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-blue-300 text-xs font-bold">2</span>
              </div>
              <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 flex-1">
                <p className="text-blue-300 font-semibold text-sm mb-1">
                  Concept & Feasibility
                </p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li>Identify key hazards at concept stage</li>
                  <li>Begin gathering pre-construction information</li>
                  <li>Establish design coordination protocols</li>
                </ul>
              </div>
            </div>

            {/* Phase 3: Detailed Design */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-blue-300 text-xs font-bold">3</span>
              </div>
              <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 flex-1">
                <p className="text-blue-300 font-semibold text-sm mb-1">
                  Detailed Design
                </p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li>Apply eliminate/reduce/inform hierarchy to all design risks</li>
                  <li>Coordinate between design disciplines</li>
                  <li>Conduct design review meetings and maintain risk register</li>
                  <li>Begin compiling the Health & Safety File</li>
                </ul>
              </div>
            </div>

            {/* Phase 4: Pre-Construction Complete */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-blue-300 text-xs font-bold">4</span>
              </div>
              <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 flex-1">
                <p className="text-blue-300 font-semibold text-sm mb-1">
                  Pre-Construction Handover
                </p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li>Ensure pre-construction information is provided to the principal contractor</li>
                  <li>Communicate residual design risks</li>
                  <li>Support the principal contractor in preparing the construction phase plan</li>
                </ul>
              </div>
            </div>

            {/* Phase 5: Construction Phase */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-blue-300 text-xs font-bold">5</span>
              </div>
              <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 flex-1">
                <p className="text-blue-300 font-semibold text-sm mb-1">
                  Construction Phase
                </p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li>Liaise with the principal contractor throughout</li>
                  <li>Continue coordinating any ongoing design work</li>
                  <li>Update the Health & Safety File as construction progresses</li>
                </ul>
              </div>
            </div>

            {/* Phase 6: Completion & Handover */}
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-blue-300 text-xs font-bold">6</span>
              </div>
              <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 flex-1">
                <p className="text-blue-300 font-semibold text-sm mb-1">
                  Completion & Handover
                </p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li>Finalise and review the Health & Safety File</li>
                  <li>Pass the H&S File to the client</li>
                  <li>Ensure all as-built information is incorporated</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

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
            <Link to="../cdm-regulations-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: The Client
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-2-section-3">
              Next: Principal Contractor
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default CdmRegulationsModule2Section2;
