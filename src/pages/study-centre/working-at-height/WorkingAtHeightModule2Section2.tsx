import {
  ArrowLeft,
  Construction,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Calendar,
  Eye,
  ClipboardCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Check Questions (3)                                        */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "scaffold-inspection-frequency",
    question:
      "How often must a scaffold be formally inspected once it is in use?",
    options: [
      "Every 3 days",
      "Every 7 days, after adverse weather, and after any modification",
      "Every 14 days",
      "Only once — before first use",
    ],
    correctIndex: 1,
    explanation:
      "The Work at Height Regulations 2005 (Schedule 7) require scaffold inspections before first use, at intervals not exceeding 7 days, after any event likely to have affected strength or stability (e.g. adverse weather), and after any modification. Results must be recorded and kept on site.",
  },
  {
    id: "scaffold-tag-colours",
    question:
      "You arrive at a scaffold and the tag displayed is RED. What does this mean?",
    options: [
      "The scaffold is safe to use with caution",
      "The scaffold is under construction — do not use",
      "The scaffold has not yet been inspected",
      "The scaffold is safe for all users",
    ],
    correctIndex: 1,
    explanation:
      "A RED scaffold tag means 'DO NOT USE'. The scaffold is either incomplete, under modification, failed inspection, or has been taken out of service. A GREEN tag means safe to use, and an AMBER tag means caution — restrictions may apply (e.g. partial loading only).",
  },
  {
    id: "scaffold-platform-width",
    question:
      "What is the minimum width for a working platform on a scaffold?",
    options: [
      "400mm",
      "500mm",
      "600mm",
      "800mm",
    ],
    correctIndex: 2,
    explanation:
      "The minimum width for a scaffold working platform is 600mm (3 scaffold boards wide). This allows an operative to work safely with space for tools and materials. Narrower platforms may be used only for access (not work) in exceptional circumstances.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Items (4)                                                     */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can an electrician erect scaffolding?",
    answer:
      "Only if they hold a valid CISRS (Construction Industry Scaffolders Record Scheme) card for the type of scaffold being erected. Basic scaffold awareness training (such as a CITB scaffold appreciation course) does not qualify someone to erect, alter, or dismantle scaffolding. Electricians should only work from scaffolding that has been erected by a competent scaffolder and has a valid green inspection tag.",
  },
  {
    question: "What is the difference between an independent scaffold and a putlog scaffold?",
    answer:
      "An independent tied scaffold has two rows of vertical standards — one inner and one outer — connected by transoms and ledgers, and is tied back to the building for stability but does not rely on the building for structural support. A putlog (dependent) scaffold has only one row of standards (the outer row) with putlog tubes that slot into the brickwork of the building under construction, making the scaffold structurally dependent on the building. Putlog scaffolds are only used during new brick or blockwork construction.",
  },
  {
    question: "What is a NASC TG20 compliant scaffold?",
    answer:
      "TG20 is the technical guidance published by the National Access & Scaffolding Confederation (NASC) for tube and fitting scaffolding. A TG20 compliant scaffold is one that falls within the parameters defined in the guidance — standard configurations that do not require individual design calculations by a structural engineer. If a scaffold exceeds TG20 parameters (unusual loading, non-standard configuration, or exceptional height), it becomes a 'designed scaffold' and must have specific structural calculations produced by a competent engineer.",
  },
  {
    question: "Do I need to check the scaffold tag every day before use?",
    answer:
      "Yes. Every person who intends to work on a scaffold should check the scaffold tag before starting work each day. The tag confirms the scaffold has been inspected, is safe to use, and any restrictions that apply. If the tag is missing, expired, or shows a red 'do not use' status, do not use the scaffold and report it to your supervisor. Additionally, carry out a quick visual check for obvious hazards such as missing boards, displaced guardrails, or damaged components.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What are the vertical tubes in a scaffold structure called?",
    options: ["Ledgers", "Transoms", "Standards", "Braces"],
    correctAnswer: 2,
    explanation:
      "Standards are the vertical tubes that carry the load of the scaffold down to the ground. They rest on base plates (and sole plates on soft ground) and are connected by horizontal ledgers and transoms.",
  },
  {
    id: 2,
    question:
      "Which scaffold component runs horizontally along the length of the scaffold, connecting standards?",
    options: ["Transom", "Ledger", "Brace", "Putlog"],
    correctAnswer: 1,
    explanation:
      "Ledgers run horizontally along the length of the scaffold, connecting standards at each lift. They provide lateral stability and support the transoms, which run at right angles to the ledgers.",
  },
  {
    id: 3,
    question:
      "What colour scaffold tag indicates the scaffold is safe to use?",
    options: ["Red", "Amber", "Green", "Blue"],
    correctAnswer: 2,
    explanation:
      "GREEN indicates the scaffold has been inspected and is safe to use. AMBER indicates caution — there may be restrictions. RED means do not use — the scaffold is incomplete, damaged, or undergoing modification.",
  },
  {
    id: 4,
    question:
      "What is the purpose of toe boards on a scaffold platform?",
    options: [
      "To provide a handhold when climbing",
      "To prevent materials and tools from falling off the platform edge",
      "To increase the load-bearing capacity of the platform",
      "To mark the edge of the scaffold for visibility",
    ],
    correctAnswer: 1,
    explanation:
      "Toe boards (minimum 150mm high) prevent tools, materials, and debris from being kicked or rolling off the scaffold platform. Falling objects from scaffolds can cause serious injury or death to persons below.",
  },
  {
    id: 5,
    question:
      "At what minimum height must guard rails be fitted on a scaffold working platform?",
    options: [
      "700mm above the platform",
      "800mm above the platform",
      "950mm above the platform",
      "1100mm above the platform",
    ],
    correctAnswer: 2,
    explanation:
      "The top guard rail must be at least 950mm above the working platform. An intermediate guard rail (or brick guard) must be fitted so that the gap between the toe board and guard rail does not exceed 470mm. This prevents a person falling or rolling off the platform.",
  },
  {
    id: 6,
    question:
      "Who is permitted to erect, alter, or dismantle scaffolding?",
    options: [
      "Any person with a CSCS card",
      "A competent person holding a valid CISRS card",
      "The site foreman",
      "Any experienced construction worker",
    ],
    correctAnswer: 1,
    explanation:
      "Only a competent person — typically holding a CISRS (Construction Industry Scaffolders Record Scheme) card — may erect, alter, or dismantle scaffolding. The CISRS scheme provides nationally recognised training and competence assessment for scaffolders.",
  },
  {
    id: 7,
    question:
      "What is the maximum gap permitted between scaffold boards on a working platform?",
    options: ["10mm", "15mm", "25mm", "50mm"],
    correctAnswer: 2,
    explanation:
      "The maximum permissible gap between scaffold boards is 25mm. Larger gaps risk tools, materials, or feet slipping through. If gaps exceed 25mm, additional boards must be fitted or the gap closed with appropriate infill.",
  },
  {
    id: 8,
    question:
      "A scaffold must be re-inspected after which of the following events?",
    options: [
      "A scaffold board is replaced like-for-like",
      "A delivery of materials is made to the platform",
      "Adverse weather conditions (high winds, heavy rain, frost)",
      "A tea break lasting more than 30 minutes",
    ],
    correctAnswer: 2,
    explanation:
      "Adverse weather — including high winds, heavy rain, snow, and frost — can affect the structural integrity and stability of a scaffold. A formal inspection must be carried out after any such event before the scaffold is used again.",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function WorkingAtHeightModule2Section2() {
  useSEO({
    title: "Scaffolding Basics | Working at Height Module 2.2",
    description:
      "Types of scaffolding, key components, inspection requirements, NASC TG20, scaffold tags, CISRS competency, and working platform standards for safe working at height.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Main Article ── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <Construction className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Scaffolding Basics
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Types of scaffolding, key structural components, inspection
            requirements, scaffold tagging systems, and competency standards for
            scaffold erection and use
          </p>
        </header>

        {/* ── Quick Summary Boxes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="font-semibold text-amber-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">4 main types:</strong>{" "}
                  independent tied, putlog, system scaffold, mobile tower
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Key components:</strong>{" "}
                  standards, ledgers, transoms, braces, toe boards, guard rails
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Inspect every 7 days:</strong>{" "}
                  before first use, weekly, after weather or modifications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">CISRS card:</strong> required
                  for anyone erecting or dismantling scaffolding
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg p-4 bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="font-semibold text-amber-400 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Check the tag:</strong> green =
                  safe, amber = caution, red = do not use
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Platform minimum:</strong>{" "}
                  600mm wide, no gaps &gt;25mm between boards
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Guard rails:</strong> 950mm
                  minimum height, with intermediate rail
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Never modify:</strong> only
                  competent CISRS card holders may alter scaffolds
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4 leading-relaxed">
            By the end of this section, you will be able to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Describe the four main types of scaffolding used on UK construction sites",
              "Identify and name the key structural components of a scaffold",
              "State the frequency and triggers for scaffold inspections",
              "Explain the scaffold tagging system and what each colour means",
              "Distinguish between TG20 compliant and designed scaffolds",
              "State the minimum standards for working platforms, guard rails, and toe boards",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ================================================================ */}
        {/*  SECTION 01 — Types of Scaffolding                               */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">01</span>
              Types of Scaffolding
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Scaffolding is the most common form of temporary access
                equipment used on construction sites in the UK. It provides
                stable working platforms at height, designed to support
                operatives, tools, and materials. There are four principal types
                you need to understand:
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h3 className="text-amber-300 font-medium mb-3">
                    Independent Tied Scaffold
                  </h3>
                  <p className="text-white/70 text-sm mb-2 leading-relaxed">
                    The most common type used on UK sites. It consists of{" "}
                    <strong className="text-white">two rows of standards</strong>{" "}
                    — an inner row close to the building and an outer row — connected
                    by ledgers and transoms. The scaffold is structurally
                    independent (it stands on its own) but is{" "}
                    <strong className="text-white">tied back</strong> to the
                    building at regular intervals for lateral stability.
                  </p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Can be used on any building — new build or existing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Does not depend on the building structure for support
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Ties prevent the scaffold pulling away from or pushing
                        into the building
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Suitable for all trades including electrical work
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h3 className="text-amber-300 font-medium mb-3">
                    Putlog (Dependent) Scaffold
                  </h3>
                  <p className="text-white/70 text-sm mb-2 leading-relaxed">
                    Has only{" "}
                    <strong className="text-white">one row of standards</strong>{" "}
                    (the outer row). Short horizontal tubes called{" "}
                    <strong className="text-white">putlogs</strong> are
                    flattened at one end and inserted into the horizontal
                    mortar joints of new brickwork. The building itself provides
                    the inner support.
                  </p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Used only during new brickwork or blockwork construction
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Cannot be used on existing buildings (no fresh mortar
                        joints to insert putlogs)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Less common now — most sites prefer independent tied
                        scaffolds
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                    <h3 className="text-amber-300 font-medium mb-3">
                      System Scaffold
                    </h3>
                    <p className="text-white/70 text-sm mb-2 leading-relaxed">
                      Prefabricated modular scaffold systems with built-in
                      connection points (rosettes, cups, or wedge fittings) that
                      eliminate the need for loose couplers.
                    </p>
                    <ul className="text-white/60 text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Faster to erect than tube-and-fitting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Consistent dimensions and strength</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Common brands: Layher, HAKI, Cuplok, Ringscaff
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Increasingly the default choice on major sites
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                    <h3 className="text-amber-300 font-medium mb-3">
                      Mobile Tower Scaffold
                    </h3>
                    <p className="text-white/70 text-sm mb-2 leading-relaxed">
                      Lightweight, freestanding scaffold on castors — covered in
                      detail in dedicated PASMA training, but key points are:
                    </p>
                    <ul className="text-white/60 text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Freestanding — not tied to a building</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Mounted on castors for repositioning (brakes on during
                          use)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>PASMA training required for erection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Ideal for short-duration tasks needing frequent
                          repositioning
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 02 — Key Components                                     */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Key Scaffold Components
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Understanding the structural components of a scaffold is
                essential — both for recognising when a scaffold is safe to use
                and for communicating clearly with scaffolders on site. The
                following are the primary components of a tube-and-fitting
                scaffold:
              </p>

              {/* Scaffold Component Diagram */}
              <div className="bg-[#111] border border-white/10 rounded-xl p-5 sm:p-6">
                <h3 className="text-amber-400 font-semibold text-base mb-4 text-center">
                  Scaffold Component Diagram — Elevation View
                </h3>
                <div className="relative mx-auto" style={{ maxWidth: "480px" }}>
                  {/* Diagram container */}
                  <div className="relative w-full" style={{ paddingBottom: "130%" }}>
                    {/* Ground line */}
                    <div className="absolute bottom-0 left-[5%] right-[5%] h-[3px] bg-white/30" />
                    <div className="absolute bottom-[-20px] left-[50%] -translate-x-1/2 text-[10px] text-white/40">
                      GROUND LEVEL
                    </div>

                    {/* Sole plates */}
                    <div className="absolute bottom-[0px] left-[12%] w-[16%] h-[2%] bg-amber-700/60 border border-amber-600/40 rounded-sm" />
                    <div className="absolute bottom-[0px] right-[12%] w-[16%] h-[2%] bg-amber-700/60 border border-amber-600/40 rounded-sm" />

                    {/* Base plates */}
                    <div className="absolute bottom-[2%] left-[17%] w-[6%] h-[2%] bg-white/30 rounded-sm" />
                    <div className="absolute bottom-[2%] right-[17%] w-[6%] h-[2%] bg-white/30 rounded-sm" />

                    {/* Standards (vertical tubes) — inner */}
                    <div className="absolute bottom-[4%] left-[19%] w-[2%] h-[85%] bg-amber-500/70 rounded-full" />
                    {/* Standards — outer */}
                    <div className="absolute bottom-[4%] right-[19%] w-[2%] h-[85%] bg-amber-500/70 rounded-full" />

                    {/* Ledgers (horizontal) — 3 levels */}
                    <div className="absolute bottom-[25%] left-[19%] right-[19%] h-[1.5%] bg-cyan-400/60 rounded-full" />
                    <div className="absolute bottom-[50%] left-[19%] right-[19%] h-[1.5%] bg-cyan-400/60 rounded-full" />
                    <div className="absolute bottom-[75%] left-[19%] right-[19%] h-[1.5%] bg-cyan-400/60 rounded-full" />

                    {/* Transoms (shown as shorter horizontal lines at ledger levels) */}
                    <div className="absolute bottom-[26%] left-[17%] w-[3%] h-[1%] bg-green-400/60 rounded-full" />
                    <div className="absolute bottom-[26%] right-[17%] w-[3%] h-[1%] bg-green-400/60 rounded-full" />
                    <div className="absolute bottom-[51%] left-[17%] w-[3%] h-[1%] bg-green-400/60 rounded-full" />
                    <div className="absolute bottom-[51%] right-[17%] w-[3%] h-[1%] bg-green-400/60 rounded-full" />

                    {/* Braces (diagonal) */}
                    <div
                      className="absolute bottom-[25%] left-[20%] h-[25%] w-[1.5%] bg-red-400/50 rounded-full"
                      style={{ transformOrigin: "bottom left", transform: "rotate(-30deg)" }}
                    />
                    <div
                      className="absolute bottom-[50%] right-[20%] h-[25%] w-[1.5%] bg-red-400/50 rounded-full"
                      style={{ transformOrigin: "bottom right", transform: "rotate(30deg)" }}
                    />

                    {/* Working platform (scaffold boards) */}
                    <div className="absolute bottom-[73.5%] left-[15%] right-[15%] h-[2%] bg-amber-600/50 border border-amber-500/30 rounded-sm" />

                    {/* Guard rail (top) */}
                    <div className="absolute bottom-[82%] left-[17%] right-[17%] h-[1%] bg-green-400/60 rounded-full" />

                    {/* Intermediate guard rail */}
                    <div className="absolute bottom-[78%] left-[17%] right-[17%] h-[0.8%] bg-green-400/40 rounded-full" />

                    {/* Toe boards */}
                    <div className="absolute bottom-[73.5%] left-[15%] w-[1.5%] h-[4%] bg-yellow-500/50 rounded-sm" />
                    <div className="absolute bottom-[73.5%] right-[15%] w-[1.5%] h-[4%] bg-yellow-500/50 rounded-sm" />

                    {/* Labels */}
                    <div className="absolute bottom-[88%] left-[1%] text-[9px] sm:text-[10px] text-amber-400 font-medium leading-tight">
                      Standards<br />(vertical)
                    </div>
                    <div className="absolute bottom-[48%] right-[1%] text-[9px] sm:text-[10px] text-cyan-400 font-medium leading-tight text-right">
                      Ledgers<br />(horizontal)
                    </div>
                    <div className="absolute bottom-[35%] left-[1%] text-[9px] sm:text-[10px] text-red-400 font-medium leading-tight">
                      Braces<br />(diagonal)
                    </div>
                    <div className="absolute bottom-[71%] right-[1%] text-[9px] sm:text-[10px] text-amber-600 font-medium leading-tight text-right">
                      Scaffold<br />boards
                    </div>
                    <div className="absolute bottom-[82%] right-[1%] text-[9px] sm:text-[10px] text-green-400 font-medium leading-tight text-right">
                      Guard rail<br />950mm+
                    </div>
                    <div className="absolute bottom-[63%] left-[1%] text-[9px] sm:text-[10px] text-yellow-400 font-medium leading-tight">
                      Toe board<br />150mm+
                    </div>
                    <div className="absolute bottom-[2%] left-[1%] text-[9px] sm:text-[10px] text-white/50 font-medium leading-tight">
                      Sole plate<br />+ base plate
                    </div>
                    <div className="absolute bottom-[22%] right-[1%] text-[9px] sm:text-[10px] text-green-400/70 font-medium leading-tight text-right">
                      Transoms<br />(cross tubes)
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-amber-500/70 flex-shrink-0" />
                    <span className="text-white/60">Standards</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-400/60 flex-shrink-0" />
                    <span className="text-white/60">Ledgers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/50 flex-shrink-0" />
                    <span className="text-white/60">Braces</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-green-400/60 flex-shrink-0" />
                    <span className="text-white/60">Guard rails</span>
                  </div>
                </div>
              </div>

              {/* Component details */}
              <div className="space-y-3">
                {[
                  {
                    name: "Standards",
                    desc: "Vertical tubes that carry the scaffold loads down to the ground. They rest on base plates (steel plates distributing the load) which in turn sit on sole plates (timber boards) on soft or uneven ground.",
                  },
                  {
                    name: "Ledgers",
                    desc: "Horizontal tubes running along the length of the scaffold at each lift level. They connect standards together and provide lateral bracing. Ledgers support the transoms.",
                  },
                  {
                    name: "Transoms",
                    desc: "Horizontal tubes running at right angles to the ledgers, spanning between the inner and outer standards. They directly support the scaffold boards that form the working platform.",
                  },
                  {
                    name: "Braces",
                    desc: "Diagonal tubes that prevent the scaffold racking (twisting sideways). Braces run diagonally between standards and are essential for structural rigidity. Both face braces and ledger braces may be used.",
                  },
                  {
                    name: "Sole Plates & Base Plates",
                    desc: "Sole plates are timber boards that spread the scaffold load over a larger area of ground. Base plates are steel plates at the foot of each standard that sit on the sole plates. Together they prevent the standards sinking into soft ground.",
                  },
                  {
                    name: "Scaffold Boards",
                    desc: "Timber or metal platform boards laid across the transoms to form the working platform. Boards must be BS 2482 graded softwood or proprietary metal decks. They must be supported at maximum 1.2m intervals and must not overhang the transom by more than 4 times the board thickness.",
                  },
                  {
                    name: "Guard Rails",
                    desc: "Horizontal tubes or proprietary barrier panels at the edge of the working platform. The top guard rail must be at minimum 950mm above the platform. An intermediate guard rail must fill the gap so no space exceeds 470mm.",
                  },
                  {
                    name: "Toe Boards",
                    desc: "Boards fitted vertically at the platform edge, minimum 150mm high. They prevent tools, materials, and debris from falling off the platform — protecting people working below.",
                  },
                ].map((comp, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-lg p-3"
                  >
                    <p className="text-white font-medium text-sm">
                      {comp.name}
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed mt-1">
                      {comp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/*  SECTION 03 — Inspection Requirements                            */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Scaffold Inspection Requirements
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                The{" "}
                <strong className="text-white">
                  Work at Height Regulations 2005, Schedule 7
                </strong>{" "}
                sets out mandatory inspection requirements for scaffolding.
                Scaffolds must be inspected by a competent person, and the
                results recorded in writing. The inspection report must be kept
                on site and available for review by the HSE.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  When Must a Scaffold Be Inspected?
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      trigger: "Before first use",
                      detail:
                        "After initial erection and before any person works from the scaffold. The scaffolder must confirm the scaffold is complete and safe.",
                    },
                    {
                      trigger: "At intervals not exceeding 7 days",
                      detail:
                        "A weekly inspection by a competent person. This is a legal requirement, not a recommendation. The 7-day clock starts from the date of the last inspection.",
                    },
                    {
                      trigger: "After adverse weather",
                      detail:
                        "After any event likely to have affected the scaffold's stability — high winds (Beaufort 6+), heavy rain, snow, frost, flooding, or lightning strike.",
                    },
                    {
                      trigger: "After any modification or alteration",
                      detail:
                        "If the scaffold is extended, reduced, or altered in any way, it must be re-inspected before use. This includes adding or removing working platforms, ties, or loading bays.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <p className="text-white font-medium text-sm">
                        {item.trigger}
                      </p>
                      <p className="text-white/60 text-xs leading-relaxed mt-1">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Inspection Records
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Inspection reports must be completed within 24 hours of the
                  inspection. They must record the date, location, and details
                  of the scaffold, any defects found, the action taken, and the
                  name of the competent person who carried out the inspection.
                  Reports must be kept for at least 3 months (or until the next
                  inspection, whichever is later). The HSE can request to see
                  these records at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 04 — TG20 & Designed Scaffolds                          */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              NASC TG20 vs Designed Scaffolds
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                <strong className="text-white">TG20</strong> (Technical Guidance
                Note 20) is published by the{" "}
                <strong className="text-white">
                  National Access &amp; Scaffolding Confederation (NASC)
                </strong>
                . It provides standardised guidance for tube-and-fitting
                scaffolding that falls within defined parameters. If a scaffold
                meets TG20 requirements, it can be erected using the published
                guidance without individual engineering calculations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                  <h4 className="text-green-300 font-medium mb-2">
                    TG20 Compliant Scaffold
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Standard configuration within TG20 parameters
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        No individual design calculations required
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        TG20 compliance sheet generated from eGuide software
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Covers the majority of straightforward scaffolds
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    Designed Scaffold
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Exceeds TG20 parameters (height, loading, configuration)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Requires specific structural calculations by a competent
                        engineer
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Design drawings and calculations must be on site
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Examples: heavy-duty loading bays, cantilever scaffolds,
                        unusual configurations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Key Point for Electricians
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  As an electrician, you do not need to know how to design or
                  calculate a scaffold. However, you should be aware that some
                  scaffolds have specific loading restrictions. Always check the
                  scaffold tag and any posted load notices before placing heavy
                  equipment or materials on a scaffold platform. If you need to
                  load a scaffold with unusually heavy items (such as a
                  distribution board or large cable drums), inform the site
                  manager — the scaffold may need engineering review.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/*  SECTION 05 — Scaffold Tags                                      */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Scaffold Tags &amp; Signage
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Scaffold tags are the primary means of communicating the status
                of a scaffold to all site personnel. They are typically attached
                at the access point (ladder base or stairway entrance) so anyone
                approaching the scaffold can see the status before getting on.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500/60 mb-2">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <h4 className="text-green-300 font-semibold mb-1">GREEN</h4>
                  <p className="text-green-200/70 text-xs leading-relaxed">
                    Scaffold inspected and <strong>safe to use</strong>. The
                    inspection date and next inspection due date are shown.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-500/60 mb-2">
                    <AlertTriangle className="h-6 w-6 text-amber-400" />
                  </div>
                  <h4 className="text-amber-300 font-semibold mb-1">AMBER</h4>
                  <p className="text-amber-200/70 text-xs leading-relaxed">
                    <strong>Caution — restrictions apply.</strong> The scaffold
                    may have loading limitations, incomplete areas, or other
                    conditions noted on the tag.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500/60 mb-2">
                    <Shield className="h-6 w-6 text-red-400" />
                  </div>
                  <h4 className="text-red-300 font-semibold mb-1">RED</h4>
                  <p className="text-red-200/70 text-xs leading-relaxed">
                    <strong>DO NOT USE.</strong> The scaffold is incomplete,
                    under modification, failed inspection, or has been
                    condemned.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-2">
                  What the Tag Should Show
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    "Scaffold location and reference number",
                    "Date of last inspection",
                    "Name of competent inspector",
                    "Date of next inspection due",
                    "Maximum permitted load (if applicable)",
                    "Any restrictions or special conditions",
                    "Scaffold contractor's company name",
                    "Contact number for scaffold contractor",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="text-white/70 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    No Tag = No Access
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  If a scaffold has no tag, a missing tag, or an expired
                  inspection date, treat it as a red tag — do not use. Report it
                  to your supervisor immediately. Never assume a scaffold is safe
                  because it looks complete. Incomplete scaffolds can appear
                  finished but may be missing critical ties, braces, or guard
                  rails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 06 — Who Can Erect Scaffolding                          */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">06</span>
              Who Can Erect Scaffolding — CISRS
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Scaffolding must only be erected, altered, or dismantled by{" "}
                <strong className="text-white">competent persons</strong>. In
                the UK, competence for scaffolding work is demonstrated through
                the{" "}
                <strong className="text-white">
                  CISRS (Construction Industry Scaffolders Record Scheme)
                </strong>{" "}
                card scheme.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  CISRS Card Levels
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      level: "Labourer",
                      desc: "Can assist scaffolders by passing materials and carrying out ground-level tasks. Cannot work at height on the scaffold during erection.",
                    },
                    {
                      level: "Trainee Scaffolder",
                      desc: "Working towards a scaffolding NVQ under supervision. Must work under the direct supervision of a qualified scaffolder at all times.",
                    },
                    {
                      level: "Scaffolder",
                      desc: "Fully qualified to erect, alter, and dismantle standard scaffolds (tube-and-fitting, system scaffold). Holds a CISRS Scaffolder card.",
                    },
                    {
                      level: "Advanced Scaffolder",
                      desc: "Qualified for complex and non-standard scaffolds including suspended scaffolds, designed scaffolds, and specialist configurations.",
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <p className="text-white font-medium text-sm">
                        {card.level}
                      </p>
                      <p className="text-white/60 text-xs leading-relaxed mt-1">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Never Alter a Scaffold Yourself
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  As an electrician, you must{" "}
                  <strong className="text-white">never</strong> remove, move, or
                  add any scaffold component — not even a single board, brace,
                  or guard rail. Even removing one guard rail to pass materials
                  through can cause a fatal fall or compromise the scaffold
                  structure. If the scaffold does not suit your needs, request a
                  modification through the site manager who will arrange for the
                  scaffold contractor to make the change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ================================================================ */}
        {/*  SECTION 07 — Working Platforms                                   */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Working Platform Standards
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                The working platform is the most critical part of the scaffold
                from the user's perspective — it is where you stand, place your
                tools, and carry out your work. Platform standards are strict and
                non-negotiable.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-3 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5" />
                  Platform Requirements
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      req: "Minimum width: 600mm",
                      detail:
                        "Equivalent to 3 scaffold boards side by side. This provides sufficient space for an operative to work safely. Wider platforms may be specified for tasks requiring more space.",
                    },
                    {
                      req: "Maximum gap between boards: 25mm",
                      detail:
                        "Gaps must not exceed 25mm. Larger gaps risk small tools, fixings, or debris falling through onto people below.",
                    },
                    {
                      req: "Guard rails: 950mm minimum height",
                      detail:
                        "Top guard rail at minimum 950mm. Intermediate guard rail fitted so no gap exceeds 470mm. Guard rails on all open sides of the platform.",
                    },
                    {
                      req: "Toe boards: 150mm minimum height",
                      detail:
                        "Fitted at all platform edges to prevent materials rolling or being kicked off. Gaps at toe board level must not exceed 25mm.",
                    },
                    {
                      req: "Board support: maximum 1.2m span",
                      detail:
                        "Scaffold boards must be supported at intervals not exceeding 1.2m. Boards must not overhang their support by more than 4 times the board's thickness (typically 150mm).",
                    },
                    {
                      req: "Board condition: free from defects",
                      detail:
                        "Boards must be BS 2482 graded, free from splits, rot, excessive knots, warping, or damage. Metal scaffold decks must be free from corrosion and damage.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <p className="text-white font-medium text-sm">
                        {item.req}
                      </p>
                      <p className="text-white/60 text-xs leading-relaxed mt-1">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-2">
                  Daily Visual Check Before Use
                </h3>
                <p className="text-white/70 text-sm mb-2 leading-relaxed">
                  Even with weekly formal inspections, every user should carry
                  out a quick visual check before stepping onto the scaffold
                  each day:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    "Check the scaffold tag is green and in date",
                    "All guard rails are in place and secure",
                    "All toe boards are fitted and undamaged",
                    "No missing or displaced scaffold boards",
                    "Access ladder is in position and secured",
                    "No visible damage to standards, ledgers, or braces",
                    "No unauthorised modifications have been made",
                    "Platform is clear of ice, standing water, or debris",
                  ].map((check, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Eye className="h-4 w-4 text-amber-400/70 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 leading-relaxed">
                        {check}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
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
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quiz ── */}
        <div className="mt-12">
          <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* ── Bottom Navigation ── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Ladders &amp; Stepladders
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2-section-3">
              Next: MEWPs
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
