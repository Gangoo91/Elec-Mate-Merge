import { ArrowLeft, Scale, CheckCircle, AlertTriangle, FileCheck, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cdm-client-duty",
    question:
      "Under CDM 2015, what must a client do before construction work — including scaffold erection — begins on site?",
    options: [
      "Appoint a principal designer and principal contractor (where more than one contractor is involved), ensure suitable welfare facilities are provided, and allow sufficient time and resources for the work to be carried out safely",
      "Erect the scaffold themselves and inspect it daily",
      "Submit a design certificate to the Health and Safety Executive",
      "Hire only CISRS-carded scaffolders and no other trades",
    ],
    correctIndex: 0,
    explanation:
      "CDM 2015 Regulation 4 requires the client to make suitable arrangements for managing a project, including appointing a principal designer and principal contractor where more than one contractor is involved, ensuring adequate welfare facilities, and allowing sufficient time and resources for safe planning and execution.",
  },
  {
    id: "temporary-works-coordinator",
    question:
      "What is the primary role of the temporary works coordinator (TWC) on a construction project?",
    options: [
      "To erect and dismantle all scaffolding on the project",
      "To manage the temporary works procedure — ensuring designs are produced, checked, approved, and that erection and dismantling are carried out in accordance with the design",
      "To inspect scaffolds after every shift change",
      "To submit scaffold designs to the local authority for planning approval",
    ],
    correctIndex: 1,
    explanation:
      "The TWC manages the temporary works procedure from design through to removal. Their role is to ensure that every temporary works item (including scaffolds) follows the correct process: design, independent check, approval, permit to load, inspection during use, and controlled dismantling.",
  },
  {
    id: "scaffold-handover",
    question:
      "What must happen before a scaffold is handed over to the user and loaded?",
    options: [
      "The scaffold must be painted in the contractor's brand colours",
      "The scaffold must be inspected by a competent person, a handover certificate (or scaffold tag/permit to use) must be issued confirming it is fit for purpose, and the scaffold register must be updated",
      "The scaffold must be left for 48 hours to allow the ground to settle",
      "The scaffold must be photographed and the images sent to the HSE",
    ],
    correctIndex: 1,
    explanation:
      "Before a scaffold can be used, a competent person must inspect it and confirm it has been erected in accordance with the design. A handover certificate or scaffold tag is issued, the scaffold register is updated, and only then may the scaffold be loaded and used by other trades.",
  },
];

const faqs = [
  {
    question: "Does CDM 2015 apply to all scaffolding work?",
    answer:
      "CDM 2015 applies to all construction work in Great Britain, and scaffolding erection, alteration, and dismantling are defined as construction work under the regulations. This means that even a simple independent scaffold for a domestic loft conversion falls within CDM 2015. The extent of the duties depends on the scale of the project — for projects with more than one contractor, the full duty-holder structure (client, principal designer, principal contractor, designers, contractors) applies. For single-contractor projects, the client still has duties but there is no requirement to appoint a principal designer or principal contractor.",
  },
  {
    question:
      "Who is responsible for the scaffold design — the scaffolding contractor or the principal designer?",
    answer:
      "The scaffolding contractor (or a specialist scaffold designer engaged by the contractor) is typically the designer of the scaffold as a temporary works item. The principal designer coordinates health and safety matters during the pre-construction phase and ensures that designers — including scaffold designers — fulfil their duties, but the principal designer does not normally produce the scaffold design itself. On complex projects, the structural engineer or temporary works designer may also contribute to the scaffold design, particularly where the scaffold imposes loads on the permanent structure or where unusual configurations are required.",
  },
  {
    question:
      "What is the difference between a scaffold register and a scaffold handover certificate?",
    answer:
      "The scaffold register is a document that lists every scaffold on the project, recording its location, type, designer, erector, current status, inspection dates, and any modifications. It is a living document maintained throughout the project by the principal contractor or the temporary works coordinator. The handover certificate (sometimes called a scaffold tag, completion certificate, or permit to use) is issued for an individual scaffold when it has been inspected by a competent person and confirmed as fit for purpose. It authorises the scaffold for use and is typically attached to the scaffold itself so that users can see at a glance that it has been approved.",
  },
  {
    question:
      "Can a scaffold be altered by someone other than the original erector?",
    answer:
      "Any alteration to a scaffold — including adding or removing boards, guardrails, ties, or braces — must be carried out under the supervision of a competent person and in accordance with a revised design or method statement. Unauthorised alterations are one of the most common causes of scaffold collapse and are a serious offence under CDM 2015 and the Work at Height Regulations 2005. If an alteration is needed, the scaffold must be taken out of service (scaffold tag removed or marked as 'do not use'), the alteration must be designed and approved through the temporary works procedure, and the scaffold must be re-inspected and re-certified before it is returned to service.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, which duty holder is responsible for ensuring that a project is managed so that health and safety risks are controlled, including risks from scaffolding?",
    options: [
      "The principal contractor",
      "The scaffold inspector",
      "The client",
      "The Health and Safety Executive",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 places the overarching duty on the client to make suitable arrangements for managing a project. While the principal contractor manages site-level coordination, it is the client who must ensure adequate time, resources, and competent appointments are in place — including for scaffold design and erection.",
  },
  {
    id: 2,
    question:
      "A scaffold is classified as which type of works under CDM 2015 and BS 5975?",
    options: [
      "Permanent works",
      "Temporary works",
      "Enabling works",
      "Substructure works",
    ],
    correctAnswer: 1,
    explanation:
      "Scaffolding is classified as temporary works — structures that are needed during the construction process but do not form part of the completed building. Under BS 5975:2019, all temporary works must follow a managed procedure from design through to removal.",
  },
  {
    id: 3,
    question:
      "Which CDM 2015 regulation requires designers to eliminate foreseeable risks and, where elimination is not possible, reduce them?",
    options: [
      "Regulation 4 — Client duties",
      "Regulation 8 — General duties (all duty holders)",
      "Regulation 9 — Duties of designers",
      "Regulation 13 — Duties of contractors",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 9 of CDM 2015 requires designers (including scaffold designers) to eliminate foreseeable risks so far as is reasonably practicable. Where risks cannot be eliminated, the designer must reduce them and provide information about remaining risks to those who need it.",
  },
  {
    id: 4,
    question:
      "What is the role of the temporary works supervisor (TWS) in the scaffold erection process?",
    options: [
      "To design the scaffold and produce the calculation package",
      "To supervise the erection on site, ensuring the scaffold is built in accordance with the design, and to report completion to the temporary works coordinator",
      "To carry out the independent design check required by BS 5975",
      "To issue the F10 notification to the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "The temporary works supervisor (TWS) is the person on site who supervises the erection, ensures it follows the approved design and method statement, checks that materials are in good condition, and reports completion to the TWC so that the final inspection and handover can take place.",
  },
  {
    id: 5,
    question:
      "Before a scaffold design is approved for erection, what check must be carried out under BS 5975?",
    options: [
      "A thermal imaging check of the scaffold components",
      "An independent design check by a person not involved in producing the original design",
      "A wind-speed forecast for the next 30 days",
      "A check that the scaffold colour matches the client's branding",
    ],
    correctAnswer: 1,
    explanation:
      "BS 5975:2019 requires an independent design check — sometimes called a Category 2 or Category 3 check depending on the risk level. The check must be carried out by a competent person who was not involved in producing the original design, to provide an independent verification that the design is safe and adequate.",
  },
  {
    id: 6,
    question:
      "Which document must be updated every time a scaffold is erected, altered, or dismantled on a construction project?",
    options: [
      "The F10 notification",
      "The construction phase plan",
      "The scaffold register",
      "The principal designer's risk register",
    ],
    correctAnswer: 2,
    explanation:
      "The scaffold register must be updated every time a scaffold is erected, altered, dismantled, or its status changes. It provides a complete record of all scaffolds on the project, their inspection history, and their current condition and approval status.",
  },
  {
    id: 7,
    question:
      "Under CDM 2015 Regulation 13, contractors must not begin work on site unless which condition is met regarding scaffolding they will use?",
    options: [
      "The scaffold has been inspected by the client personally",
      "Reasonable steps have been taken to ensure the scaffold is safe, erected by competent persons, and inspected at the required intervals",
      "The scaffold has been in place for at least seven calendar days",
      "The scaffold has been tested with twice the intended working load",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 13 requires contractors to ensure that reasonable steps have been taken to prevent risks. For scaffolding, this means satisfying themselves that the scaffold has been designed, erected by competent persons, inspected by a competent person, and approved for use before they or their workers step onto it.",
  },
  {
    id: 8,
    question:
      "An erection sequence drawing is required for which type of scaffold?",
    options: [
      "Only scaffolds over 50 metres in height",
      "Only birdcage scaffolds inside buildings",
      "Any scaffold that cannot be erected safely by following a standard configuration — including complex, unusual, or high-risk scaffolds where the method of building the scaffold itself introduces risk",
      "Only scaffolds erected by apprentices",
    ],
    correctAnswer: 2,
    explanation:
      "An erection sequence drawing (or method statement with step-by-step build instructions) is required whenever the scaffold configuration is complex, unusual, or high-risk and cannot be safely erected by following a standard approach. This includes cantilever scaffolds, heavily loaded scaffolds, scaffolds over water, and any configuration where the partially-built scaffold could be unstable.",
  },
];

export default function ScaffoldingAwarenessModule2Section4() {
  useSEO({
    title:
      "CDM 2015 & Scaffold Design | Scaffolding Awareness Module 2 Section 4",
    description:
      "CDM 2015 duties as they apply to scaffolding — client duties, designer duties, principal contractor duties, temporary works coordinator role, design review, erection sequence, handover certification, and scaffold registers.",
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
            <Link to="../scaffolding-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Scale className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 2 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CDM 2015 &amp; Scaffold Design
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How the Construction (Design and Management) Regulations 2015 apply
            to scaffolding &mdash; duty holders, temporary works procedures,
            design review, erection sequences, and handover certification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>CDM 2015:</strong> Legal framework for managing health
                and safety on construction projects
              </li>
              <li>
                <strong>Scaffold = Temporary Works:</strong> Must follow BS
                5975 procedures
              </li>
              <li>
                <strong>Design:</strong> Must be produced, independently checked,
                and approved before erection
              </li>
              <li>
                <strong>Handover:</strong> Inspect, certify, register, then
                permit to use
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Always:</strong> Check the scaffold tag before stepping
                onto any scaffold
              </li>
              <li>
                <strong>Never:</strong> Alter a scaffold without authorisation
                through the TW procedure
              </li>
              <li>
                <strong>Report:</strong> Any defects, damage, or missing
                components immediately
              </li>
              <li>
                <strong>Know:</strong> Your duty-holder role and what CDM 2015
                requires of you
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the five CDM 2015 duty holders and explain their responsibilities for scaffolding",
              "Explain why scaffolding is classified as temporary works and what that means in practice",
              "Describe the role of the temporary works coordinator (TWC) and temporary works supervisor (TWS)",
              "Outline the temporary works procedure from design through to removal",
              "Explain the purpose of the independent design check and when it is required",
              "Describe what a scaffold handover certificate contains and why it matters",
              "Understand the purpose and contents of the scaffold register",
              "Explain when an erection sequence drawing is required",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 01: CDM 2015 Overview */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            CDM 2015 Overview
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Construction (Design and Management) Regulations
                2015</strong> (CDM 2015) are the main set of regulations for
                managing the health, safety, and welfare of construction
                projects in Great Britain. They replaced CDM 2007 and came into
                force on 6 April 2015. CDM 2015 applies to
                <strong> all construction work</strong>, regardless of size,
                duration, or number of workers &mdash; from a small domestic
                scaffold for a window replacement through to a multi-storey
                tower-block refurbishment.
              </p>

              <p>
                The regulations are built on a simple principle:
                <strong> those who create the risks are best placed to manage
                them</strong>. CDM 2015 places duties on five categories of
                duty holder, each with specific responsibilities for ensuring
                that construction work &mdash; including scaffolding &mdash; is
                planned, designed, managed, and carried out safely.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-3">
                  The Five CDM 2015 Duty Holders
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Client</strong> &mdash;
                      the person or organisation for whom the construction work
                      is carried out
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Principal Designer</strong>{" "}
                      &mdash; the designer appointed by the client to plan,
                      manage, and coordinate health and safety during the
                      pre-construction phase
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Principal Contractor
                      </strong>{" "}
                      &mdash; the contractor appointed by the client to plan,
                      manage, and coordinate health and safety during the
                      construction phase
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Designers</strong> &mdash;
                      anyone who prepares or modifies a design for a building,
                      product, or system relating to construction work (includes
                      scaffold designers)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Contractors</strong>{" "}
                      &mdash; anyone who carries out or manages construction
                      work (includes scaffolding contractors and individual
                      scaffolders)
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Every person involved in a scaffolding operation falls into at
                least one of these duty-holder categories. Understanding which
                category you fall into &mdash; and what duties that category
                carries &mdash; is essential for compliance and, more
                importantly, for keeping people safe.
              </p>

              {/* CDM 2015 Duty Holder Matrix Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-slate-500/20 border-b border-slate-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-400">
                    CDM 2015 Duty Holder Matrix for Scaffolding
                  </p>
                </div>

                {/* Client Row */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-slate-400 mb-3">
                    Client (Regulation 4)
                  </p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Appoint principal designer &amp; principal contractor
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Pre-con
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Ensure sufficient time and resources for scaffold planning
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Pre-con
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Ensure welfare facilities are provided
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      All phases
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Provide pre-construction information to designers
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Pre-con
                    </div>
                  </div>
                </div>

                {/* Principal Designer Row */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-slate-400 mb-3">
                    Principal Designer (Regulation 11)
                  </p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Coordinate health &amp; safety during pre-construction
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Pre-con
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Ensure scaffold designers fulfil Regulation 9 duties
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Design
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Identify and communicate design risks (including from scaffolding loads on the permanent structure)
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Design
                    </div>
                  </div>
                </div>

                {/* Principal Contractor Row */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-slate-400 mb-3">
                    Principal Contractor (Regulation 12)
                  </p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Plan, manage, and coordinate scaffold operations on site
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Build
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Maintain the scaffold register and temporary works log
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      All phases
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Ensure scaffold inspections at required intervals (Reg. 12 + WAH Regs.)
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Build
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Prevent unauthorised access and unauthorised alterations
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Build
                    </div>
                  </div>
                </div>

                {/* Designer Row */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-medium text-slate-400 mb-3">
                    Designer &mdash; Scaffold Designer (Regulation 9)
                  </p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Eliminate foreseeable risks in scaffold design
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Design
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Reduce risks that cannot be eliminated
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Design
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Provide information about remaining risks (design risk register)
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Design
                    </div>
                  </div>
                </div>

                {/* Contractor Row */}
                <div className="p-4">
                  <p className="text-sm font-medium text-slate-400 mb-3">
                    Contractor &mdash; Scaffolding Contractor (Regulation 13)
                  </p>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Erect, alter, and dismantle scaffolds using competent persons (CISRS-carded)
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Build
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Follow the approved design and method statement
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Build
                    </div>
                    <div className="text-sm text-white/80 py-1.5 px-2 bg-white/5 rounded">
                      Report completion to the TWC and cooperate with inspections
                    </div>
                    <div className="text-sm font-bold text-slate-300 py-1.5 px-3 bg-slate-500/10 rounded text-center min-w-[64px]">
                      Build
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 02: Client Duties */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Client Duties
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>client</strong> is the person or organisation for
                whom the construction work is carried out. Under CDM 2015, the
                client has overarching duties that set the framework within
                which all other duty holders operate. A client who fails to
                fulfil their duties can make it impossible for scaffolding to
                be planned, designed, and erected safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Client Duties Relevant to Scaffolding
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Make Suitable Arrangements (Reg. 4)
                      </p>
                      <p>
                        The client must ensure that the project is managed so
                        that health and safety risks are controlled. For
                        scaffolding, this means ensuring that scaffolding needs
                        are identified early, that competent contractors are
                        appointed, and that scaffold work is integrated into the
                        overall project programme.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Allow Sufficient Time and Resources
                      </p>
                      <p>
                        The client must allow enough time for the scaffolding
                        contractor to plan, design, procure materials, and erect
                        the scaffold properly. Rushing scaffold erection is one
                        of the most common causes of scaffold-related incidents.
                        The client must also ensure that adequate financial
                        resources are allocated so that the scaffolding
                        specification is not reduced to save money.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Appoint in Writing (Reg. 5)
                      </p>
                      <p>
                        Where more than one contractor is involved, the client
                        must appoint a principal designer (PD) and a principal
                        contractor (PC) in writing. These appointments must be
                        made as early as is practical. On single-contractor
                        projects, the contractor automatically assumes the PC
                        duties and the designer assumes the PD duties.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-slate-500/20 text-slate-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Provide Pre-Construction Information (Reg. 4(4))
                      </p>
                      <p>
                        The client must provide relevant information about the
                        site and the existing structure to designers and
                        contractors. For scaffolding, this includes ground
                        conditions, underground services, overhead power lines,
                        adjacent structures, access restrictions, and any
                        existing temporary works on site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Point:</strong> A
                  domestic client (a householder having work done on their own
                  home) still has client duties under CDM 2015, but these are
                  normally transferred to the contractor or principal contractor
                  by a written agreement or, if no agreement exists, they pass
                  automatically to the contractor in control of the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 03: Designer Duties — Scaffold as Temporary Works */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            Designer Duties &mdash; Scaffold Design as Temporary Works
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under CDM 2015, a <strong>designer</strong> is anyone who
                prepares or modifies a design for a building, product, or
                system relating to construction work. A scaffold designer
                &mdash; whether an in-house designer employed by the
                scaffolding contractor, an independent engineering practice,
                or a system scaffold manufacturer &mdash; is a
                <strong> designer under CDM 2015</strong> and carries the duties
                set out in Regulation 9.
              </p>

              <p>
                Scaffolding is classified as <strong>temporary works</strong>{" "}
                &mdash; structures that are essential during the construction
                process but do not form part of the finished building. Other
                examples of temporary works include formwork, falsework,
                propping, shoring, and temporary access roads. The management
                of temporary works in the UK is governed by{" "}
                <strong>BS 5975:2019 &mdash; Code of Practice for
                Temporary Works Procedures and the Permissible Stress Design
                of Falsework</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Regulation 9 &mdash; Designer Duties Applied to Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Eliminate foreseeable risks
                      </strong>{" "}
                      &mdash; the scaffold designer must, so far as is
                      reasonably practicable, eliminate risks to anyone who
                      might be affected by the scaffold. For example, designing
                      a scaffold that avoids the need for operatives to work
                      above fragile surfaces, or specifying system scaffold
                      with integrated guardrails that eliminate the need for
                      unprotected edges during erection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduce risks that cannot be eliminated
                      </strong>{" "}
                      &mdash; where a risk cannot be designed out, the designer
                      must reduce it. For example, if a cantilever section
                      cannot be avoided, the designer must specify the minimum
                      safe projections, adequate ties, and any additional
                      bracing needed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Provide information about remaining risks
                      </strong>{" "}
                      &mdash; the designer must communicate any risks that
                      remain after elimination and reduction. This information
                      is typically included in a design risk register, a
                      designer&rsquo;s risk assessment, or design notes issued
                      alongside the scaffold drawings and calculations.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What a Scaffold Design Package Typically Includes
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        General arrangement drawings
                      </strong>{" "}
                      &mdash; plan and elevation views showing the scaffold
                      layout, dimensions, bay sizes, lift heights, and
                      relationship to the permanent structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Detail drawings
                      </strong>{" "}
                      &mdash; tie arrangements, base plate details, bracing
                      layout, cantilever details, loading bay details, and any
                      special features
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Structural calculations
                      </strong>{" "}
                      &mdash; demonstrating that the scaffold can safely support
                      the intended loads (imposed, wind, self-weight, and any
                      special loads) in accordance with TG20:21, BS EN 12811,
                      or BS 5975 as appropriate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Design risk assessment
                      </strong>{" "}
                      &mdash; identifying residual risks and the control
                      measures required during erection, use, and dismantling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Method statement / erection sequence
                      </strong>{" "}
                      &mdash; step-by-step instructions for building and
                      dismantling the scaffold (required for complex scaffolds)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    No Design = No Scaffold
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A scaffold must <strong className="text-white">never</strong>{" "}
                  be erected without a design. For standard configurations
                  that fall within the scope of TG20:21 (NASC guidance), a
                  TG20 compliance sheet may serve as the design. For anything
                  outside TG20 parameters &mdash; unusual heights, heavy duty
                  loads, complex geometries, cantilevers, or where wind
                  exposure is above normal &mdash; a bespoke design with full
                  structural calculations is required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 04: Principal Contractor Duties */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Principal Contractor Duties
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>principal contractor</strong> (PC) is appointed by
                the client to plan, manage, monitor, and coordinate health and
                safety during the construction phase. On most projects, the PC
                is the main contractor who controls the site. Their duties under
                CDM 2015 Regulation 12 have a direct impact on how scaffolding
                is managed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  PC Duties for Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Construction phase plan
                      </strong>{" "}
                      &mdash; the PC must prepare, review, and maintain the
                      construction phase plan (CPP). This plan must identify how
                      scaffolding will be managed, including the temporary works
                      procedure, inspection regime, and the names and roles of
                      the TWC and TWS.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Coordination
                      </strong>{" "}
                      &mdash; the PC must coordinate scaffold erection and
                      dismantling with all other site activities. This includes
                      ensuring that the scaffold is available when needed by
                      other trades, that exclusion zones are in place during
                      erection and dismantling, and that scaffold alterations
                      are managed through a controlled process.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffold register
                      </strong>{" "}
                      &mdash; the PC (or the TWC acting on behalf of the PC)
                      must maintain a scaffold register listing every scaffold
                      on site, its current status, and its inspection history.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Preventing unauthorised alterations
                      </strong>{" "}
                      &mdash; the PC must take steps to prevent anyone other
                      than authorised, competent persons from altering scaffolds.
                      This includes site rules, inductions, scaffold tags, and
                      disciplinary procedures for unauthorised interference.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Site induction and information
                      </strong>{" "}
                      &mdash; the PC must ensure that all workers on site
                      receive a site induction that covers scaffold rules,
                      including how to check the scaffold tag, what to do if a
                      scaffold is damaged, and who to report defects to.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Electricians &amp; Other Users:
                  </strong>{" "}
                  As an electrician using a scaffold erected by a scaffolding
                  contractor, you are a <strong>worker</strong> under CDM 2015
                  and a <strong>user</strong> of the scaffold under the Work at
                  Height Regulations 2005. You must check the scaffold tag
                  before use, report any defects, and never alter the scaffold
                  yourself. If the scaffold does not have a valid tag or you
                  notice missing guardrails, boards, or ties, do not use it
                  &mdash; report it to the site manager or TWC immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 05: The Temporary Works Coordinator & Supervisor */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            The Temporary Works Coordinator &amp; Supervisor
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>BS 5975:2019</strong> requires the appointment of a
                <strong> Temporary Works Coordinator (TWC)</strong> and a
                <strong> Temporary Works Supervisor (TWS)</strong> for the
                management of all temporary works on a project, including
                scaffolding. These roles are critical to ensuring that the
                scaffold follows the correct procedure from initial design
                request through to final removal.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck className="h-5 w-5 text-slate-400" />
                    <p className="text-sm font-medium text-slate-400">
                      Temporary Works Coordinator (TWC)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Manages the <strong className="text-white">
                          entire temporary works procedure
                        </strong>{" "}
                        on the project
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Ensures scaffold designs are{" "}
                        <strong className="text-white">produced</strong>,{" "}
                        <strong className="text-white">checked</strong>, and{" "}
                        <strong className="text-white">approved</strong> before
                        erection begins
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Issues the <strong className="text-white">
                          permit to load
                        </strong>{" "}
                        (authorisation for the scaffold to be used) after
                        satisfactory inspection
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Maintains the{" "}
                        <strong className="text-white">
                          temporary works register
                        </strong>{" "}
                        (which includes the scaffold register)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Authorises controlled{" "}
                        <strong className="text-white">dismantling</strong>{" "}
                        when the scaffold is no longer needed
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="h-5 w-5 text-slate-400" />
                    <p className="text-sm font-medium text-slate-400">
                      Temporary Works Supervisor (TWS)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">On-site role</strong>{" "}
                        &mdash; physically present during scaffold erection
                        and dismantling
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Supervises erection to ensure the scaffold is built{" "}
                        <strong className="text-white">
                          in accordance with the design
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Checks that{" "}
                        <strong className="text-white">
                          materials are serviceable
                        </strong>{" "}
                        (no bent tubes, cracked fittings, or damaged boards)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Reports{" "}
                        <strong className="text-white">completion</strong> to
                        the TWC so that the handover inspection can take place
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>
                        Typically the{" "}
                        <strong className="text-white">
                          scaffold supervisor or advanced scaffolder
                        </strong>{" "}
                        on site (CISRS-carded)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The TWC and TWS roles may be held by the same person on smaller
                projects, but on larger projects they are almost always separate
                appointments. The TWC is usually a member of the principal
                contractor&rsquo;s management team (such as a project manager
                or site agent with temporary works training), while the TWS is
                typically the scaffolding contractor&rsquo;s site supervisor.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Why These Roles Matter:
                  </strong>{" "}
                  Without a TWC and TWS, there is no formal process to ensure
                  that scaffold designs are checked, that erection follows the
                  design, or that the scaffold is inspected and approved before
                  use. The temporary works procedure is the scaffold&rsquo;s
                  quality assurance system &mdash; it is what separates a
                  properly managed scaffold from one that has been thrown up
                  with no oversight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 06: The Temporary Works Process */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            The Temporary Works Process
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS 5975:2019 sets out a step-by-step procedure for managing
                temporary works. Every scaffold on a project should follow this
                process, from the initial request through to final removal.
                The process ensures that nothing is missed and that each stage
                is formally signed off before the next stage begins.
              </p>

              {/* Temporary Works Process Flowchart */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-slate-500/20 border-b border-slate-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-400">
                    Temporary Works Process Flowchart &mdash; Scaffolding
                  </p>
                </div>

                <div className="p-4 space-y-3">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        1
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        Design Request (TW Brief)
                      </p>
                      <p className="text-sm text-white/70">
                        The TWC identifies the need for a scaffold and issues a
                        temporary works brief to the scaffold designer,
                        specifying the purpose, loads, access requirements,
                        duration, and any site constraints.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        2
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        Design Production
                      </p>
                      <p className="text-sm text-white/70">
                        The scaffold designer produces the design package:
                        drawings, calculations, design risk assessment, and
                        method statement (where required). The design must
                        comply with relevant standards (TG20:21, BS EN 12811,
                        or BS 5975).
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        3
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        Independent Design Check
                      </p>
                      <p className="text-sm text-white/70">
                        A competent person who was not involved in producing the
                        design carries out an independent check. The level of
                        check (Category 1, 2, or 3) depends on the complexity
                        and risk of the scaffold. The checker verifies the
                        assumptions, calculations, and drawings.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        4
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        TWC Approval
                      </p>
                      <p className="text-sm text-white/70">
                        The TWC reviews the design and the checker&rsquo;s
                        report. If satisfied, the TWC approves the design and
                        authorises erection to proceed. The TWC records the
                        approval in the temporary works register.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        5
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        Erection (Supervised by TWS)
                      </p>
                      <p className="text-sm text-white/70">
                        The scaffolding contractor erects the scaffold under the
                        supervision of the TWS, following the approved design
                        and method statement. The TWS monitors progress and
                        checks material quality throughout.
                      </p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        6
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        Completion &amp; Inspection
                      </p>
                      <p className="text-sm text-white/70">
                        The TWS reports completion to the TWC. A competent
                        person inspects the scaffold against the design. Any
                        defects or non-conformances are recorded and rectified
                        before the scaffold is approved.
                      </p>
                    </div>
                  </div>

                  {/* Step 7 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        7
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        Permit to Load / Handover
                      </p>
                      <p className="text-sm text-white/70">
                        The TWC issues a permit to load (or handover
                        certificate). A scaffold tag is attached confirming the
                        scaffold is fit for purpose. The scaffold register is
                        updated. The scaffold may now be used.
                      </p>
                    </div>
                  </div>

                  {/* Step 8 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        8
                      </span>
                      <div className="w-0.5 h-6 bg-slate-500/30 mt-1" />
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium text-white">
                        In-Use Inspections
                      </p>
                      <p className="text-sm text-white/70">
                        The scaffold is inspected at the intervals required by
                        the Work at Height Regulations 2005 (before first use,
                        every 7 days, and after any event that could affect
                        stability). Inspection results are recorded in the
                        scaffold register.
                      </p>
                    </div>
                  </div>

                  {/* Step 9 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-500/30 text-slate-300 text-xs font-bold border border-slate-500/50">
                        9
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Controlled Dismantling
                      </p>
                      <p className="text-sm text-white/70">
                        When the scaffold is no longer needed, the TWC
                        authorises dismantling. The scaffold is taken down in a
                        controlled sequence (reverse of erection or as specified
                        in the method statement), supervised by the TWS. The
                        scaffold register is updated to show the scaffold has
                        been removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Skipping Steps Costs Lives
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Every stage of the temporary works process exists because
                  failures at that stage have caused scaffold collapses,
                  serious injuries, and fatalities. Skipping the design check,
                  omitting the handover inspection, or failing to maintain the
                  register are not administrative oversights &mdash; they are
                  <strong className="text-white"> serious safety
                  failures</strong> that can have fatal consequences. If you
                  are aware that any step has been missed, report it immediately
                  to the TWC or site manager.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 07: Erection Sequence & Handover Certification */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Erection Sequence &amp; Handover Certification
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For <strong>complex, unusual, or high-risk scaffolds</strong>,
                the design must include an <strong>erection sequence
                drawing</strong> (or a detailed method statement with
                step-by-step build instructions). The erection sequence defines
                the order in which the scaffold is built, ensuring that the
                partially-completed structure is stable at every stage of the
                build.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  When an Erection Sequence Is Required
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cantilever scaffolds
                      </strong>{" "}
                      &mdash; where the scaffold extends beyond its base
                      supports and the loading sequence during erection is
                      critical to stability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Birdcage scaffolds
                      </strong>{" "}
                      &mdash; large internal scaffolds where the temporary
                      stability during erection depends on the order in which
                      lifts and bracing are added
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Heavily loaded scaffolds
                      </strong>{" "}
                      &mdash; scaffolds designed to support heavy materials,
                      plant, or equipment where the sequence of tying and
                      loading must be carefully controlled
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffolds over water, railways, or public areas
                      </strong>{" "}
                      &mdash; where the consequences of a collapse during
                      erection would be severe
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Suspended scaffolds
                      </strong>{" "}
                      &mdash; where the rigging, counterweights, and wire-rope
                      installation must follow a precise sequence to prevent
                      catastrophic failure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Any non-standard configuration
                      </strong>{" "}
                      &mdash; where the scaffold cannot be safely erected by
                      simply working upwards from the base in a standard manner
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Once the scaffold has been erected in accordance with the
                approved design and the TWS has confirmed completion, the
                scaffold must be <strong>formally inspected and handed
                over</strong> before it can be used. This is the handover
                certification process.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Handover Certificate (Scaffold Tag / Completion Certificate)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Scaffold location</strong>{" "}
                      &mdash; a clear description or reference number so the
                      scaffold can be identified
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Design reference</strong>{" "}
                      &mdash; which design drawing the scaffold has been built
                      to
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maximum permitted loads
                      </strong>{" "}
                      &mdash; the duty class (light, general, or heavy duty)
                      and any specific load restrictions (e.g., maximum number
                      of loaded lifts)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Date of inspection</strong>{" "}
                      and the name and signature of the competent person who
                      carried out the inspection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Confirmation of compliance
                      </strong>{" "}
                      &mdash; a statement that the scaffold has been erected in
                      accordance with the approved design and is fit for its
                      intended purpose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Any conditions or restrictions
                      </strong>{" "}
                      &mdash; for example, &ldquo;not to be used in wind speeds
                      exceeding 40 mph&rdquo; or &ldquo;sheeting must not be
                      added without consulting the designer&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Scaffold Tags:</strong> On
                  most construction sites, the handover certification takes the
                  form of a <strong>scaffold tag</strong> (usually a laminated
                  card attached to the scaffold at each access point). The tag
                  shows whether the scaffold is{" "}
                  <strong className="text-green-400">
                    &ldquo;Safe to Use&rdquo;
                  </strong>{" "}
                  (green),{" "}
                  <strong className="text-red-400">
                    &ldquo;Do Not Use&rdquo;
                  </strong>{" "}
                  (red), or{" "}
                  <strong className="text-yellow-400">
                    &ldquo;Under Construction / Alteration&rdquo;
                  </strong>{" "}
                  (amber/yellow). Always check the tag colour and date before
                  stepping onto any scaffold.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ──────────────────────────────────────────────────── */}
        {/* Section 08: The Scaffold Register */}
        {/* ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            The Scaffold Register
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>scaffold register</strong> is a comprehensive
                document that records every scaffold on the project. It is
                maintained by the principal contractor (or the TWC on the
                PC&rsquo;s behalf) and is a key part of both the temporary
                works procedure and the inspection regime required by the
                Work at Height Regulations 2005.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What the Scaffold Register Must Record
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Unique scaffold reference
                      </strong>{" "}
                      &mdash; an identification number or code for each
                      scaffold on site (e.g., &ldquo;SCAF-001&rdquo;,
                      &ldquo;Block A North Elevation&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Location</strong> &mdash;
                      where the scaffold is on site, described clearly enough
                      for anyone to find it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Type of scaffold</strong>{" "}
                      &mdash; independent, putlog, system, mobile tower,
                      birdcage, cantilever, etc.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Design reference
                      </strong>{" "}
                      &mdash; the drawing number or TG20 compliance sheet
                      reference
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffolding contractor
                      </strong>{" "}
                      &mdash; the company that erected the scaffold
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Date of erection
                      </strong>{" "}
                      and the name of the TWS who supervised the build
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Handover date and inspector
                      </strong>{" "}
                      &mdash; when the scaffold was inspected and by whom
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Current status
                      </strong>{" "}
                      &mdash; in use, under alteration, awaiting inspection,
                      dismantled, etc.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inspection history
                      </strong>{" "}
                      &mdash; dates of all 7-day inspections, post-event
                      inspections, and the results of each inspection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Alterations and modifications
                      </strong>{" "}
                      &mdash; any changes made to the scaffold after the
                      initial handover, including the reason, the revised
                      design reference, and the re-inspection date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Date of dismantling
                      </strong>{" "}
                      &mdash; when the scaffold was removed and the register
                      entry closed out
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The scaffold register serves multiple purposes. It is a
                <strong> management tool</strong> for the TWC and PC, allowing
                them to see at a glance which scaffolds are on site, which are
                due for inspection, and which are awaiting action. It is a
                <strong> legal record</strong> that demonstrates compliance
                with the Work at Height Regulations 2005 (Schedule 7, which
                requires inspection results to be recorded and kept on site
                until the work is completed, and kept by the person carrying
                out the inspection for three months after that). And it is a
                <strong> safety document</strong> that prevents scaffolds
                from being forgotten, missed during inspections, or left on
                site after they are no longer needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Scaffold Register Failures
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      !
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Scaffolds not recorded
                      </p>
                      <p>
                        Small or temporary scaffolds (e.g., a single-bay tower
                        erected for one day) are sometimes not entered in the
                        register. Every scaffold must be recorded, regardless
                        of size or duration.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      !
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Inspections not recorded
                      </p>
                      <p>
                        Inspections happen but the results are not entered in
                        the register. An unrecorded inspection is, from a legal
                        standpoint, an inspection that did not happen.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      !
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Alterations not updated
                      </p>
                      <p>
                        A scaffold is altered (e.g., a lift removed to allow
                        crane access) but the register still shows the
                        original configuration. This means the next inspection
                        may be carried out against the wrong design.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      !
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Dismantled scaffolds not closed out
                      </p>
                      <p>
                        A scaffold is removed but the register still shows it
                        as &ldquo;in use&rdquo;. This creates confusion and
                        can lead to resources being wasted inspecting a scaffold
                        that no longer exists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Digital Scaffold Registers:
                  </strong>{" "}
                  Many principal contractors now use digital scaffold management
                  systems (e.g., SMART Scaffolder, ScaffTag, or bespoke
                  platforms) that allow scaffolds to be registered, inspections
                  to be recorded via tablet or smartphone, and scaffold tags to
                  include QR codes linking to the digital record. Digital
                  systems reduce paperwork errors, make it easier to track
                  inspection due dates, and provide real-time visibility of the
                  scaffold status across the project.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Enforcement Action
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The HSE and local authority inspectors routinely check
                  scaffold registers during site visits. An incomplete or
                  missing register is a strong indicator that scaffold
                  management is inadequate and will often result in
                  <strong className="text-white"> improvement notices</strong>,{" "}
                  <strong className="text-white">prohibition notices</strong>{" "}
                  (stopping scaffold use until the register is brought up to
                  date), or <strong className="text-white">prosecution</strong>{" "}
                  in serious cases. Maintaining the register is not optional
                  &mdash; it is a legal requirement and a fundamental part of
                  scaffold safety management.
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
            <Link to="../scaffolding-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
