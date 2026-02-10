import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Users,
  HelpCircle,
  GitBranch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick Check Questions (3)                                         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "cdm-construction-work-def",
    question:
      "Under CDM 2015 Regulation 2, which of the following activities is explicitly included in the definition of 'construction work'?",
    options: [
      "Surface mineral extraction carried out at a mine",
      "Fitting out, commissioning, renovation, repair, upkeep, redecoration, and maintenance of a structure",
      "Routine cleaning of windows using access equipment",
      "Manufacture of building products at a factory",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 2 defines 'construction work' very broadly. It explicitly includes building, civil engineering, alteration, conversion, fitting out, commissioning, renovation, repair, upkeep, redecoration, maintenance (including cleaning where it involves a structure), decommissioning, demolition, and the installation, commissioning, maintenance or removal of mechanical, electrical, gas, compressed air, hydraulic, telecommunications, computer or similar services. Surface mineral extraction at mines is specifically excluded from CDM.",
  },
  {
    id: "cdm-domestic-client-duty",
    question:
      "What happens to a domestic client's CDM duties when they engage a contractor but do not appoint a principal designer or principal contractor?",
    options: [
      "The domestic client must carry out all CDM duties themselves",
      "The duties automatically transfer to the contractor carrying out or managing the work",
      "The HSE takes on the duties on behalf of the client",
      "The domestic client is exempt from all CDM requirements",
    ],
    correctIndex: 1,
    explanation:
      "Under CDM 2015 Regulation 7, domestic clients are not required to carry out client duties themselves. Where a domestic client has not appointed a principal designer (PD) or principal contractor (PC), the contractor carrying out or managing the construction work automatically assumes the client duties. If there is more than one contractor and a PD or PC has been appointed, the duties transfer to those appointees instead.",
  },
  {
    id: "cdm-notification-threshold",
    question:
      "Which of the following correctly describes the notification threshold under CDM 2015?",
    options: [
      "Any project lasting more than 14 days must be notified",
      "Any project with more than 5 workers must be notified",
      "Projects lasting longer than 30 working days with more than 20 workers simultaneously at any point, OR exceeding 500 person-days of construction work",
      "Only projects valued at more than £250,000 must be notified",
    ],
    correctIndex: 2,
    explanation:
      "CDM 2015 Regulation 6 sets the notification threshold. A project must be notified to the HSE if the construction phase is likely to last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days of construction work. Notification is made by submitting an F10 form to the HSE before the construction phase begins. There is no financial threshold — even low-value projects can trigger notification if they meet the time/worker criteria.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Is painting a room considered 'construction work' under CDM 2015?",
    answer:
      "Yes. The definition of construction work in Regulation 2 explicitly includes 'redecoration'. This means painting, wallpapering, and similar decoration activities are construction work for CDM purposes. However, CDM applies a proportionate approach — the duties on a simple domestic redecoration project are far less onerous than those on a major commercial fit-out. In practice, for low-risk domestic redecoration carried out by a single contractor, the duties that transfer to the contractor are minimal and largely amount to managing their own health and safety competently.",
  },
  {
    question:
      "Does CDM 2015 apply when an electrician rewires a house for a homeowner?",
    answer:
      "Yes. Electrical installation, maintenance, and removal are explicitly included in the CDM definition of construction work. A domestic rewire is construction work carried out for a domestic client. Under Regulation 7, the domestic client's duties transfer automatically to the contractor (the electrician or their employing firm). The electrician must plan, manage, and monitor the work to ensure it is carried out safely. If the project meets the notification threshold (unlikely for a standard domestic rewire), an F10 form must also be submitted to the HSE.",
  },
  {
    question:
      "What is the difference between a 'contractor' and a 'principal contractor' under CDM?",
    answer:
      "A contractor is any person (individual or organisation) who carries out, manages, or controls construction work. A principal contractor (PC) is a specific appointment made by the client on projects with more than one contractor. The PC's role is to plan, manage, and monitor the construction phase, coordinate the work of all contractors on site, and ensure the construction phase plan is prepared and implemented. The PC must be a contractor — you cannot appoint a designer or other non-contractor as PC. On single-contractor projects, there is no requirement to appoint a PC.",
  },
  {
    question:
      "Does fitting a new kitchen count as construction work under CDM?",
    answer:
      "Yes, in most cases. Fitting a kitchen typically involves alteration, fitting out, and the installation of mechanical and electrical services (plumbing, gas, electrics) — all of which fall within the CDM definition of construction work. The CDM duties apply, though proportionately. For a domestic client engaging a single kitchen fitter, the contractor's duties under CDM transfer automatically and are managed as part of their normal health and safety responsibilities. If the work involves structural alterations (removing a load-bearing wall, for example), the design duties under CDM also become significant.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT included in the CDM 2015 definition of 'construction work'?",
    options: [
      "Demolition of a building",
      "Surface mineral extraction at a mine",
      "Commissioning of a new electrical installation",
      "Maintenance of a bridge",
    ],
    correctAnswer: 1,
    explanation:
      "Surface mineral extraction is specifically excluded from the CDM 2015 definition of construction work. Demolition, commissioning, and maintenance are all explicitly included in the Regulation 2 definition. Other exclusions include certain diving operations and offshore installations covered by separate regulations.",
  },
  {
    id: 2,
    question:
      "Under CDM 2015, which of the following best defines a 'structure'?",
    options: [
      "Only permanent buildings made of brick, stone, or concrete",
      "Any building, timber/metal/concrete structure, railway, tramway, dock, harbour wall, bridge, viaduct, waterway, tunnel, shaft, pipeline, or scaffolding",
      "Only buildings that are occupied by people",
      "Any structure over 3 metres in height",
    ],
    correctAnswer: 1,
    explanation:
      "The CDM 2015 definition of 'structure' is deliberately very broad. It includes any building, timber, metal or concrete structure, railway line or siding, tramway line, dock, harbour, inland navigation, tunnel, shaft, bridge, viaduct, waterworks, reservoir, pipe or pipeline, cable, aqueduct, sewer, sewage works, gasholder, road, airfield, sea defence works, river works, drainage works, earthworks, lagoon, dam, wall, catwalk, mast, tower, pylon, underground tank, earth retaining structure, fixed plant (where its installation or removal is construction work), and scaffolding.",
  },
  {
    id: 3,
    question:
      "In CDM 2015, the term 'design' includes which of the following?",
    options: [
      "Only architectural drawings and CAD models",
      "Drawings, design details, specifications, bills of quantities, and decisions about material selection and buildability",
      "Only structural calculations signed off by an engineer",
      "Only documents produced by a chartered architect",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 defines 'design' broadly to include drawings, design details, specifications, and bills of quantities relating to a structure, and calculations prepared for the purpose of a design. Crucially, it also includes decisions about material selection and buildability. Anyone who makes these decisions is acting as a designer under CDM, regardless of their job title — this can include architects, engineers, interior designers, building services consultants, and even contractors who specify materials or methods.",
  },
  {
    id: 4,
    question: "Who is the 'client' under CDM 2015?",
    options: [
      "The main contractor on site",
      "Any person for whom a construction project is carried out",
      "Only commercial property developers",
      "The Health and Safety Executive",
    ],
    correctAnswer: 1,
    explanation:
      "Under CDM 2015, the client is any person for whom a construction project is carried out. This includes commercial organisations, public bodies, developers, and domestic clients (homeowners). The client is the person who initiates the project, makes the key decisions, and commissions the design and construction work. On some projects, the client role may be shared by more than one organisation.",
  },
  {
    id: 5,
    question:
      "A construction project is planned to last 35 working days with a maximum of 15 workers on site at any one time. The total estimated effort is 450 person-days. Is this project notifiable to the HSE?",
    options: [
      "Yes — it exceeds 30 working days",
      "No — it does not meet either notification threshold",
      "Yes — any project over 30 days is automatically notifiable",
      "It depends on the type of construction work",
    ],
    correctAnswer: 1,
    explanation:
      "This project is NOT notifiable. To trigger notification, a project must exceed 30 working days AND have more than 20 workers simultaneously at any point, OR exceed 500 person-days. This project exceeds 30 days but never has more than 20 workers simultaneously (only 15), and the total effort is 450 person-days (below 500). Neither threshold is met, so no F10 notification is required.",
  },
  {
    id: 6,
    question:
      "A homeowner (domestic client) engages two separate contractors to carry out a kitchen extension. No principal designer or principal contractor has been appointed. What happens to the client duties?",
    options: [
      "The homeowner must carry out all CDM client duties personally",
      "The duties transfer to the contractor in charge of the construction phase of the project",
      "The duties are shared equally between both contractors",
      "No CDM duties apply because it is a domestic project",
    ],
    correctAnswer: 1,
    explanation:
      "Under Regulation 7, where a domestic client has not appointed a principal designer or principal contractor, the CDM client duties transfer automatically to the contractor in charge of the construction phase. If no contractor is clearly in charge, the duties transfer to the contractor for each part of the project that they control. CDM 2015 always applies — the domestic client exemption does not remove duties, it transfers them.",
  },
  {
    id: 7,
    question:
      "Which of the following activities is specifically excluded from the scope of CDM 2015?",
    options: [
      "Installing a gas boiler in a domestic property",
      "Demolishing a disused warehouse",
      "Exploration for and extraction of mineral resources by an offshore installation",
      "Painting the exterior of a commercial building",
    ],
    correctAnswer: 2,
    explanation:
      "Offshore installations engaged in the exploration for and extraction of mineral resources are covered by separate offshore safety legislation (including the Offshore Installations and Pipeline Works (Management and Administration) Regulations 1995 and related regulations) and are therefore excluded from CDM 2015. Gas boiler installation, demolition, and painting are all construction work under CDM.",
  },
  {
    id: 8,
    question:
      "An interior designer specifies a particular type of suspended ceiling tile and a partition wall layout for a commercial office refurbishment. Under CDM 2015, is this person a 'designer'?",
    options: [
      "No — only chartered architects and structural engineers can be designers under CDM",
      "No — interior designers are specifically excluded from CDM duties",
      "Yes — anyone who prepares or modifies a design, including material specifications and layout decisions, is a designer under CDM",
      "Only if the interior designer holds a CSCS card",
    ],
    correctAnswer: 2,
    explanation:
      "Under CDM 2015, a designer is any person (including a business) who prepares or modifies a design for a building, product, or system relating to construction work. The definition does not depend on job title or professional registration. An interior designer who specifies materials, layouts, and finishes is making design decisions that affect health and safety — for example, the choice of ceiling tile affects fire performance, and the partition layout affects means of escape. This person is a designer under CDM and must fulfil CDM designer duties.",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function CdmRegulationsModule1Section3() {
  useSEO({
    title: "Key Definitions & Scope | CDM Regulations Module 1.3",
    description:
      "Essential CDM 2015 definitions: construction work, structure, design, client, contractor, designer, principal designer, principal contractor, domestic client, notification thresholds, exclusions, and scope boundaries.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ──────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ─────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <FileText className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Key Definitions &amp; Scope
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The essential terminology and boundaries of the Construction (Design
            and Management) Regulations 2015 &mdash; what CDM covers, who it
            applies to, and where the limits lie
          </p>
        </header>

        {/* ── Quick Summary Boxes ────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Regulation 2</strong> defines &ldquo;construction
                work&rdquo; very broadly
              </li>
              <li>
                <strong>6 key roles:</strong> client, contractor, designer, PD,
                PC, worker
              </li>
              <li>
                <strong>Domestic clients</strong> have duties that transfer
                automatically
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Threshold:</strong> &gt;30 days &amp; &gt;20 workers, or
                &gt;500 person-days
              </li>
              <li>
                <strong>Notify:</strong> F10 form to the HSE before work starts
              </li>
              <li>
                <strong>Scope:</strong> Includes fitting out, maintenance,
                demolition &amp; more
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ──────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the Regulation 2 definition of 'construction work' and list the activities it includes",
              "Define 'structure' as it is used in CDM 2015 and give examples beyond conventional buildings",
              "Describe how CDM 2015 defines 'design' and why it extends beyond architectural drawings",
              "Identify the six key duty-holder roles under CDM 2015 and summarise their core responsibilities",
              "Explain how domestic client duties are transferred and to whom",
              "Apply the notification thresholds to determine whether a project requires an F10 submission",
              "List the main exclusions from the scope of CDM 2015",
              "Discuss grey-area scenarios and the HSE's proportionate approach to interpretation",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ================================================================ */}
        {/*  01 — "Construction Work" Defined                                */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            &ldquo;Construction Work&rdquo; Defined
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The definition of <strong>construction work</strong> is found in{" "}
                <strong>Regulation 2 of CDM 2015</strong> and is deliberately
                very broad. Understanding precisely what qualifies as
                &ldquo;construction work&rdquo; is essential because it
                determines whether CDM duties apply to an activity. If an
                activity falls within this definition, every person involved in
                that activity &mdash; client, designer, contractor, worker
                &mdash; has legal duties under CDM.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Regulation 2 &mdash; Construction Work Includes:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Building (construction of new structures)",
                    "Civil engineering work",
                    "Alteration of an existing structure",
                    "Conversion of an existing structure",
                    "Fitting out",
                    "Commissioning",
                    "Renovation",
                    "Repair",
                    "Upkeep",
                    "Redecoration",
                    "Maintenance (including cleaning involving a structure)",
                    "Decommissioning",
                    "Demolition or dismantling of a structure",
                    "Installation of mechanical, electrical, gas, compressed air, hydraulic, telecommunications, computer or similar services",
                    "Commissioning, maintenance, or removal of those services",
                    "Site preparation, exploration, investigation, and clearance",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-black/30 rounded p-2"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                This list is not exhaustive. The HSE takes the view that if an
                activity involves working on or in connection with a structure,
                it is likely to be construction work under CDM. The inclusion of{" "}
                <strong>redecoration</strong> and{" "}
                <strong>maintenance</strong> means that even routine activities
                such as painting, replacing a roof tile, or servicing an
                electrical installation are construction work. This is a
                deliberately wide net &mdash; the purpose is to ensure that
                health and safety duties apply to all activities where
                construction risks exist.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Key Implication for Electricians
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Every electrical installation, commissioning, maintenance, and
                  removal activity is <strong>construction work</strong> under
                  CDM 2015. This means CDM duties apply to every electrical job
                  &mdash; from a domestic rewire to a major commercial fit-out.
                  The scale of duties is proportionate to the risk, but the
                  duties always exist. Even a simple socket change in a domestic
                  property is technically construction work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  02 — "Structure" Defined                                        */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">02</span>
            &ldquo;Structure&rdquo; Defined
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The definition of <strong>structure</strong> in CDM 2015 extends
                far beyond conventional buildings. It is critical to understand
                this definition because CDM applies to all construction work
                relating to a &ldquo;structure&rdquo; &mdash; and the wider the
                definition, the wider the application of CDM duties.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  &ldquo;Structure&rdquo; Includes:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      category: "Buildings",
                      examples:
                        "Any building, whether permanent or temporary, domestic or commercial, occupied or unoccupied",
                    },
                    {
                      category: "Timber, metal & concrete structures",
                      examples:
                        "Steel frames, timber frames, precast concrete structures, modular buildings",
                    },
                    {
                      category: "Transport infrastructure",
                      examples:
                        "Railway lines and sidings, tramway lines, roads, airfields",
                    },
                    {
                      category: "Bridges & viaducts",
                      examples:
                        "All bridges (road, rail, pedestrian), viaducts, flyovers, overpasses",
                    },
                    {
                      category: "Water & maritime",
                      examples:
                        "Docks, harbour walls, inland navigation, waterworks, reservoirs, aqueducts, sewers, sewage works, lagoons, dams",
                    },
                    {
                      category: "Underground",
                      examples:
                        "Tunnels, shafts, underground tanks, earth retaining structures, earthworks",
                    },
                    {
                      category: "Services & utilities",
                      examples:
                        "Pipes, pipelines, cables, gasholders, drainage works, river works, sea defence works",
                    },
                    {
                      category: "Temporary structures",
                      examples:
                        "Scaffolding, falsework, formwork, temporary access platforms, catwalks",
                    },
                    {
                      category: "Towers & masts",
                      examples:
                        "Telecommunications masts, transmission towers, pylons, cooling towers",
                    },
                    {
                      category: "Fixed plant",
                      examples:
                        "Any fixed plant whose installation, commissioning, decommissioning, or dismantling involves construction work",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-400 mb-1">
                        {item.category}
                      </p>
                      <p className="text-xs text-white/70">{item.examples}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Why This Matters
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Many people assume CDM applies only to &ldquo;buildings&rdquo;
                  in the conventional sense. In fact, work on a pipeline, a
                  scaffold, a telecommunications mast, a railway siding, a sewer,
                  or even a temporary access platform is all work on a
                  &ldquo;structure&rdquo; under CDM. If you are carrying out
                  electrical work on any of these structures, CDM duties apply.
                  This includes, for example, installing power supplies to
                  scaffolding hoists, wiring temporary site accommodation, or
                  maintaining lighting on a bridge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── InlineCheck after Section 02 ───────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/*  03 — "Design" in CDM                                            */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">03</span>
            &ldquo;Design&rdquo; in CDM
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The term <strong>design</strong> in CDM 2015 is much broader
                than most people expect. It is not limited to architectural
                drawings or structural calculations. CDM defines design as any
                activity that involves preparing or modifying a design for a
                building, product, or system relating to construction work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  &ldquo;Design&rdquo; Encompasses:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      element: "Drawings",
                      detail:
                        "Architectural drawings, engineering drawings, layout plans, schematic diagrams, wiring diagrams, and any graphical representation of the design intent",
                    },
                    {
                      element: "Design details",
                      detail:
                        "Detailed descriptions of how components are to be assembled, installed, or configured — including connection details, fixing methods, and sequences",
                    },
                    {
                      element: "Specifications",
                      detail:
                        "Written descriptions of materials, products, standards, workmanship, and performance requirements for the construction work",
                    },
                    {
                      element: "Bills of quantities",
                      detail:
                        "Documents that itemise and quantify the materials and labour required for the project, often used for tendering and cost control",
                    },
                    {
                      element: "Material selection",
                      detail:
                        "Decisions about which materials to use — e.g. specifying a particular cable type, insulation material, or fixing system. These decisions affect buildability and worker safety",
                    },
                    {
                      element: "Buildability decisions",
                      detail:
                        "Decisions about how the design will be constructed in practice — including access requirements, lifting operations, working at height, and construction sequences",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-400 mb-1">
                        {item.element}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The implication is significant: <strong>anyone who makes
                design decisions is a designer under CDM</strong>, regardless of
                their job title. This can include architects, engineers, interior
                designers, building services consultants, quantity surveyors (who
                specify materials), and even contractors who decide on methods of
                work or materials to be used on site.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Example &mdash; Electrician as Designer
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  An electrician who designs a distribution board layout, selects
                  cable types and sizes, specifies containment routes, and
                  determines the protective device schedule is acting as a{" "}
                  <strong>designer</strong> under CDM 2015. They must consider
                  the health and safety implications of their design decisions
                  &mdash; for example, can the containment be installed safely
                  without working at height? Are the specified cable routes
                  accessible for future maintenance? Will the distribution board
                  location require work in confined spaces?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  04 — Key Roles Defined                                          */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">04</span>
            Key Roles Defined
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 defines <strong>six key duty-holder roles</strong>.
                Every person involved in a construction project holds at least
                one of these roles, and each role carries specific legal duties.
                On small projects, a single person or organisation may hold
                multiple roles simultaneously.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-blue-300">
                    The Six CDM 2015 Duty-Holder Roles
                  </p>
                </div>

                {/* Client */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                        CLIENT
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Any person for whom a construction project is carried
                        out. The client initiates the project, commissions design
                        and construction work, and must make suitable
                        arrangements for managing the project. This includes
                        ensuring sufficient time and resources are allocated,
                        appointing designers and contractors with the right
                        skills, knowledge, and experience, and ensuring relevant
                        information is provided to the project team.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Designer */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                        DESIGNER
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Any person (including a business) who prepares or
                        modifies a design for a building, product, or system
                        relating to construction work. Designers must eliminate,
                        reduce, or control foreseeable risks in their designs and
                        provide information about remaining risks to those who
                        need it. This duty applies to anyone who makes design
                        decisions &mdash; not just architects and engineers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contractor */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                        CONTRACTOR
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Any person who carries out, manages, or controls
                        construction work. This includes main contractors,
                        subcontractors, specialist contractors, and
                        self-employed tradespeople. Contractors must plan,
                        manage, and monitor their work to ensure it is carried
                        out safely, and must ensure that workers have the
                        information, instruction, training, and supervision they
                        need.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Principal Designer */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 text-xs font-bold">
                        PRINCIPAL DESIGNER
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Appointed by the client on projects involving more than
                        one contractor. The principal designer (PD) plans,
                        manages, monitors, and coordinates health and safety in
                        the pre-construction phase. They must ensure that all
                        designers comply with their CDM duties, and they prepare
                        and maintain the health and safety file. The PD must be a
                        designer (or an organisation employing designers) with
                        the skills, knowledge, and experience necessary for the
                        role.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Principal Contractor */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 text-xs font-bold">
                        PRINCIPAL CONTRACTOR
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Appointed by the client on projects involving more than
                        one contractor. The principal contractor (PC) plans,
                        manages, monitors, and coordinates the construction
                        phase. They prepare the construction phase plan, ensure
                        all contractors comply with their duties, manage site
                        access, and coordinate welfare provisions. The PC must be
                        a contractor &mdash; you cannot appoint a non-contractor
                        (such as a designer) as PC.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Worker */}
                <div className="p-4">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                        WORKER
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80">
                        Any individual who carries out construction work,
                        including employees and the self-employed. Workers must
                        cooperate with others, report anything they believe is
                        likely to endanger health or safety, and not misuse
                        anything provided for their health, safety, or welfare.
                        Workers must also be consulted on matters affecting their
                        health and safety.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Multiple Roles
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  On smaller projects, one person or organisation commonly holds
                  multiple CDM roles simultaneously. For example, a sole-trader
                  electrician carrying out a domestic rewire is acting as{" "}
                  <strong>designer</strong> (designing the electrical
                  installation), <strong>contractor</strong> (carrying out the
                  construction work), and <strong>worker</strong> (physically
                  doing the work). They may also hold the client&rsquo;s
                  transferred duties if the homeowner is a domestic client. Each
                  role carries its own duties, and all must be fulfilled.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── InlineCheck after Section 04 ───────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/*  05 — "Domestic Client"                                          */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">05</span>
            &ldquo;Domestic Client&rdquo;
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>domestic client</strong> is a person who lives, or will
                live, in the premises where construction work is carried out, and
                who commissions the work for purposes not connected with a
                business. This definition covers homeowners commissioning
                extensions, renovations, rewires, new kitchens, loft
                conversions, and similar residential work.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Regulation 7 &mdash; Domestic Client Duty Transfer
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Domestic clients are <strong>not</strong> required to carry out
                  CDM client duties themselves. Instead, the duties transfer
                  automatically:
                </p>
                <div className="space-y-2">
                  {[
                    {
                      scenario: "Single contractor, no PD/PC appointed",
                      transfer:
                        "Duties transfer to the contractor carrying out or managing the work",
                    },
                    {
                      scenario:
                        "Multiple contractors, PD and PC appointed by client",
                      transfer:
                        "Duties transfer to the principal designer (pre-construction phase) and principal contractor (construction phase)",
                    },
                    {
                      scenario:
                        "Multiple contractors, no PD/PC appointed",
                      transfer:
                        "Duties transfer to the contractor in charge of the construction phase",
                    },
                    {
                      scenario:
                        "Domestic client actively chooses to take on client duties",
                      transfer:
                        "The domestic client may voluntarily assume client duties by making a written declaration — but this is rare in practice",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-400 mb-1">
                        {item.scenario}
                      </p>
                      <p className="text-xs text-white/70">{item.transfer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Critical Point
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The domestic client exemption does{" "}
                  <strong>not remove CDM duties</strong> &mdash; it{" "}
                  <strong>transfers them</strong>. CDM 2015 always applies to
                  domestic construction work. The effect of Regulation 7 is that
                  the contractor (or PD/PC) must fulfil the client duties that
                  the homeowner would otherwise hold. This means contractors
                  working for domestic clients carry a greater burden of
                  responsibility under CDM than many realise &mdash;
                  particularly on projects involving multiple trades.
                </p>
              </div>

              <p>
                A person is <strong>not</strong> a domestic client if the work
                relates to a property they own but do not live in (e.g. a
                buy-to-let landlord commissioning work on a rental property).
                Landlords commissioning work on rental properties are
                commercial clients with full CDM client duties.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  06 — Project Thresholds                                         */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">06</span>
            Project Thresholds &mdash; Notification
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 <strong>Regulation 6</strong> sets out the thresholds
                for when a construction project must be notified to the Health
                and Safety Executive (HSE). Notification is a formal process
                that alerts the HSE to significant construction activity in
                their area.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Notification Thresholds (Regulation 6)
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-bold text-blue-300 mb-2">
                      Threshold A
                    </p>
                    <p className="text-sm text-white/80">
                      The construction phase is likely to last longer than{" "}
                      <strong>30 working days</strong> AND will have{" "}
                      <strong>
                        more than 20 workers working simultaneously
                      </strong>{" "}
                      at any point during the project
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-bold text-blue-300 mb-2">
                      Threshold B
                    </p>
                    <p className="text-sm text-white/80">
                      The construction work is likely to exceed{" "}
                      <strong>500 person-days</strong> of construction work in
                      total
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3">
                  A project is notifiable if it meets <strong>either</strong>{" "}
                  Threshold A <strong>or</strong> Threshold B. Both conditions in
                  Threshold A must be met simultaneously.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What Notification Means in Practice
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: "F10 form",
                      detail:
                        "The client (or principal designer on their behalf) must submit an F10 notification form to the HSE. This can be done online via the HSE's website.",
                    },
                    {
                      step: "Timing",
                      detail:
                        "The F10 must be submitted as soon as practicable before the construction phase begins. It should not be submitted before the pre-construction phase is sufficiently advanced.",
                    },
                    {
                      step: "Content",
                      detail:
                        "The F10 includes project details (address, description, dates), client details, principal designer and principal contractor details, and the names of other designers and contractors known at that stage.",
                    },
                    {
                      step: "Site display",
                      detail:
                        "A copy of the F10 notification must be displayed in the construction site office or otherwise made available to anyone working on the project.",
                    },
                    {
                      step: "Updates",
                      detail:
                        "If the details on the F10 change materially (e.g. change of principal contractor, significant change in project duration), an updated notification should be submitted.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-400 mb-1">
                        {item.step}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Common Misconception
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The notification threshold does{" "}
                  <strong>not determine whether CDM applies</strong>. CDM 2015
                  applies to <strong>all</strong> construction projects
                  regardless of size. The notification threshold only determines
                  whether the project must be formally notified to the HSE via
                  the F10 form. A project below the threshold still has all CDM
                  duties &mdash; the client, designers, contractors, and workers
                  must all fulfil their responsibilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── InlineCheck after Section 06 ───────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── Diagram: CDM Definitions Visual Map ────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <GitBranch className="h-5 w-5 text-blue-400" />
            CDM Definitions Visual Map
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">
              How the Key CDM 2015 Definitions Relate to Each Other
            </p>

            <div className="relative mx-auto max-w-2xl">
              <div className="relative border-2 border-blue-500/40 rounded-lg bg-gradient-to-b from-blue-500/5 to-transparent">
                {/* Top: Construction Work */}
                <div className="border-b border-dashed border-blue-500/20 p-3 sm:p-4">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                    Construction Work (Reg 2)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      "Building",
                      "Alteration",
                      "Fitting out",
                      "Commissioning",
                      "Repair",
                      "Maintenance",
                      "Demolition",
                      "Services install",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">
                          {i + 1}
                        </span>
                        <span className="text-xs text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle: Structures & Design */}
                <div className="border-b border-dashed border-blue-500/20 p-3 sm:p-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                        Structure (Reg 2)
                      </p>
                      <div className="space-y-1">
                        {[
                          "Buildings",
                          "Bridges & viaducts",
                          "Tunnels & shafts",
                          "Pipelines & cables",
                          "Scaffolding",
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[9px] font-bold text-blue-400">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-xs text-white/70">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                        Design (Reg 2)
                      </p>
                      <div className="space-y-1">
                        {[
                          "Drawings",
                          "Specifications",
                          "Bills of quantities",
                          "Material selection",
                          "Buildability decisions",
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[9px] font-bold text-blue-400">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-xs text-white/70">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Roles */}
                <div className="p-3 sm:p-4">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                    Duty-Holder Roles
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { role: "Client", colour: "bg-blue-500/30 text-blue-300" },
                      { role: "Designer", colour: "bg-blue-500/30 text-blue-300" },
                      { role: "Contractor", colour: "bg-blue-500/30 text-blue-300" },
                      { role: "Principal Designer", colour: "bg-indigo-500/30 text-indigo-300" },
                      { role: "Principal Contractor", colour: "bg-indigo-500/30 text-indigo-300" },
                      { role: "Worker", colour: "bg-blue-500/30 text-blue-300" },
                    ].map((item, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${item.colour}`}
                      >
                        {item.role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500/50" />
                  <span className="text-[10px] text-white/50">
                    All-project roles
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500/30 border border-indigo-500/50" />
                  <span className="text-[10px] text-white/50">
                    Multi-contractor roles only
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Diagram: Notification Threshold Decision Tree ──── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            Notification Threshold Decision Tree
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">
              Does Your Project Need to Be Notified to the HSE?
            </p>

            <div className="relative mx-auto max-w-xl space-y-3">
              {/* Step 1 */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-blue-300 mb-1">
                  Step 1
                </p>
                <p className="text-sm text-white/80">
                  Is the construction phase likely to last longer than{" "}
                  <strong>30 working days</strong>?
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {/* YES path */}
                <div className="space-y-3">
                  <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-blue-300">YES</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-semibold text-blue-300 mb-1">
                      Step 2a
                    </p>
                    <p className="text-xs text-white/80">
                      Will there be more than <strong>20 workers</strong>{" "}
                      simultaneously at any point?
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] font-bold text-red-300">YES</p>
                      <p className="text-[10px] text-white/70 mt-1">
                        NOTIFY HSE (F10)
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-[10px] font-bold text-white/60">NO</p>
                      <p className="text-[10px] text-white/50 mt-1">
                        Check Threshold B
                      </p>
                    </div>
                  </div>
                </div>

                {/* NO path */}
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-white/60">NO</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-semibold text-blue-300 mb-1">
                      Step 2b
                    </p>
                    <p className="text-xs text-white/80">
                      Will the total effort exceed{" "}
                      <strong>500 person-days</strong>?
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] font-bold text-red-300">YES</p>
                      <p className="text-[10px] text-white/70 mt-1">
                        NOTIFY HSE (F10)
                      </p>
                    </div>
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] font-bold text-green-300">NO</p>
                      <p className="text-[10px] text-white/70 mt-1">
                        Not notifiable
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-white/70">
                  <strong className="text-blue-400">Remember:</strong> CDM
                  duties apply to <strong>all</strong> projects regardless of
                  whether they are notifiable. Notification only determines
                  whether the F10 form must be submitted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  07 — Exclusions & Boundaries                                    */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">07</span>
            Exclusions &amp; Boundaries
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While the scope of CDM 2015 is deliberately broad, there are
                specific activities and sectors that fall{" "}
                <strong>outside</strong> the definition of construction work or
                are covered by separate, dedicated legislation. Understanding
                these boundaries is important to avoid both over-application and
                under-application of CDM duties.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Activities Excluded from CDM 2015
                </p>
                <div className="space-y-3">
                  {[
                    {
                      exclusion: "Surface mineral extraction at mines",
                      reason:
                        "Covered by the Mines Regulations 2014 and related mining legislation. Opencast and deep mining operations have their own comprehensive safety framework.",
                    },
                    {
                      exclusion: "Diving operations",
                      reason:
                        "Certain diving operations are covered by the Diving at Work Regulations 1997. Where diving forms part of construction work, both CDM and the Diving Regulations may apply — the exclusion relates to standalone diving operations.",
                    },
                    {
                      exclusion:
                        "Offshore installations (exploration & extraction)",
                      reason:
                        "Offshore oil and gas installations are covered by the Offshore Installations and Pipeline Works (Management and Administration) Regulations 1995, the Offshore Installations (Safety Case) Regulations 2005, and related offshore legislation. CDM does not apply to these activities.",
                    },
                    {
                      exclusion:
                        "Construction work covered by CDM (Northern Ireland)",
                      reason:
                        "Northern Ireland has its own CDM Regulations — the Construction (Design and Management) Regulations (Northern Ireland) 2016. Work carried out entirely in Northern Ireland falls under the NI regulations, not the GB CDM 2015.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-400 mb-1">
                        {item.exclusion}
                      </p>
                      <p className="text-xs text-white/70">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Boundary Areas
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Some activities sit on the boundary and require careful
                  consideration. For example, <strong>manufacturing</strong> of
                  building components in a factory is not construction work
                  (it is covered by general workplace health and safety
                  legislation), but the <strong>installation</strong> of those
                  components on site is construction work.
                  Similarly, <strong>routine cleaning</strong> of a building is
                  generally not construction work, but cleaning that involves
                  working on the fabric of the structure (such as pressure
                  washing or repointing) may be. When in doubt, the HSE advises
                  applying CDM duties on a proportionate basis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  08 — Interpretation Challenges                                  */}
        {/* ================================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">08</span>
            Interpretation Challenges
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Despite the breadth of the CDM definitions, there are genuine
                grey areas where it is not immediately obvious whether an
                activity constitutes construction work. The HSE recognises
                this and advocates a <strong>proportionate approach</strong>{" "}
                &mdash; applying CDM duties in a way that is appropriate to the
                level of risk, rather than applying the full weight of CDM
                paperwork to every minor task.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-blue-300">
                    Worked Examples &mdash; Grey Areas
                  </p>
                </div>

                {/* Painting */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                        YES &mdash; CDM
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Is painting a room construction work?
                      </p>
                      <p className="text-sm text-white/80">
                        Yes. &ldquo;Redecoration&rdquo; is explicitly listed in
                        the Regulation 2 definition. Painting, wallpapering, and
                        other decorating activities are construction work.
                        However, for a simple domestic repaint by a single
                        decorator, the CDM duties are minimal and largely amount
                        to the contractor managing their own health and safety
                        competently (risk assessment, safe use of access
                        equipment, ventilation for solvent-based products).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Electrical installation */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                        YES &mdash; CDM
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Is installing a new consumer unit construction work?
                      </p>
                      <p className="text-sm text-white/80">
                        Yes. The installation, commissioning, maintenance, and
                        removal of electrical services is explicitly included.
                        Installing a consumer unit involves alteration and the
                        installation of electrical services &mdash; both are
                        construction work. The electrician carries CDM contractor
                        and designer duties. If working for a homeowner, the
                        domestic client duties transfer to the electrician.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kitchen fitting */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                        YES &mdash; CDM
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Does fitting a new kitchen count as construction work?
                      </p>
                      <p className="text-sm text-white/80">
                        Yes in most cases. Kitchen fitting typically involves
                        alteration, fitting out, and the installation of
                        mechanical and electrical services (plumbing, gas,
                        electrics). If the work involves structural changes
                        (removing a wall, altering drainage), the CDM design
                        duties also become significant. A simple like-for-like
                        unit replacement with no plumbing or electrical changes
                        might sit on the boundary.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Replacing a light fitting */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                        GREY AREA
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Is replacing a light fitting construction work?
                      </p>
                      <p className="text-sm text-white/80">
                        Likely yes. It involves maintenance of electrical
                        services within a structure. The HSE would expect the
                        work to be carried out competently and safely, but
                        the practical CDM burden for a simple light fitting
                        change is minimal. The proportionate approach means the
                        contractor should manage the obvious risks (working at
                        height, isolation, competence) without needing extensive
                        CDM documentation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Window cleaning */}
                <div className="p-4 border-b border-white/5">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                        GREY AREA
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Is routine window cleaning construction work?
                      </p>
                      <p className="text-sm text-white/80">
                        Generally no, unless it involves work on the fabric of
                        the structure itself. Regular window cleaning using
                        ladders or water-fed poles is normally covered by general
                        health and safety legislation (MHSWR, WAHR) rather than
                        CDM. However, cleaning that involves scaffolding,
                        abseil access, or work on the building fabric (such as
                        cleaning stonework with specialist equipment) may cross
                        into construction work territory.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Putting up shelves */}
                <div className="p-4">
                  <div className="grid md:grid-cols-[180px_1fr] gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                        GREY AREA
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Is putting up shelves in an office construction work?
                      </p>
                      <p className="text-sm text-white/80">
                        This depends on context. Installing a small shelf using
                        a drill and wall fixings is arguably a minor alteration
                        to a structure and therefore construction work, but the
                        practical CDM implications are negligible. Installing a
                        large shelving system that is fixed to the structure and
                        requires structural assessment is more clearly
                        construction work. The HSE guidance states that CDM
                        should be applied proportionately &mdash; common sense
                        should prevail.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    HSE Guidance &mdash; The Proportionate Approach
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The HSE&rsquo;s approved code of practice{" "}
                  <strong>L153 (Managing health and safety in construction)</strong>{" "}
                  emphasises that CDM should be applied proportionately to the
                  scale and complexity of the project. The key principles are:
                </p>
                <div className="space-y-2">
                  {[
                    "CDM applies to all construction work — but the level of effort in managing it should be proportionate to the risk",
                    "Small, low-risk projects do not require extensive documentation — a simple risk assessment and method statement may be sufficient",
                    "The focus should always be on managing real risks, not on generating paperwork for its own sake",
                    "Where there is genuine doubt about whether CDM applies, it is better to apply CDM duties proportionately than to ignore them entirely",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-black/30 rounded p-2"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Practical Advice
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If you are ever unsure whether a particular activity is
                  construction work under CDM, the safest approach is to{" "}
                  <strong>assume it is</strong> and apply CDM duties
                  proportionately. The consequences of ignoring CDM when it
                  applies (potential enforcement action, personal liability in
                  the event of an incident) are far more serious than the minor
                  administrative effort of applying CDM to a borderline
                  activity. The HSE&rsquo;s guidance document L153 and the
                  CDM 2015 regulations themselves are freely available on the
                  HSE website.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────── */}
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

        {/* ── Quiz ───────────────────────────────────────────── */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ── Bottom Navigation ──────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: History &amp; Evolution
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-1-section-4">
              Next: When CDM Applies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
