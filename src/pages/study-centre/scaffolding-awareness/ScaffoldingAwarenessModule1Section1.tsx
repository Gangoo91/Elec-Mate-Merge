import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Building2,
  Scale,
  BarChart3,
  Shield,
  Zap,
  Users,
  HardHat,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck after sections 02, 04, 06)     */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "scaff-what-is-it",
    question:
      "What is the primary purpose of scaffolding on a construction site?",
    options: [
      "To store materials permanently at height",
      "To provide temporary support for workers and materials during work at height",
      "To act as a permanent structural element of the building",
      "To replace the need for personal protective equipment",
    ],
    correctIndex: 1,
    explanation:
      "Scaffolding is a temporary structure used to support workers and materials during construction, maintenance, repair, and demolition at height. It is never a permanent structure and does not replace the need for PPE where required.",
  },
  {
    id: "scaff-electrician-risk",
    question:
      "What is a key risk for electricians working on or near scaffold platforms?",
    options: [
      "Scaffolds are always too small for electrical tools",
      "Working near live services from scaffold platforms",
      "Scaffolds cannot support the weight of cable drums",
      "Electricians are not permitted to use scaffolds",
    ],
    correctIndex: 1,
    explanation:
      "Electricians face specific risks when working on or near scaffolds, including proximity to live electrical services and the challenge of routing cables through scaffold structures. Understanding these risks is essential even if you never erect a scaffold yourself.",
  },
  {
    id: "scaff-hierarchy-preference",
    question:
      "When is a full scaffold structure generally preferred over other access methods?",
    options: [
      "Only when the building is over five storeys",
      "When a single worker needs access for under thirty minutes",
      "When work duration exceeds a few hours, multiple workers need access, or materials need storing at height",
      "Only when the client specifically requests scaffolding",
    ],
    correctIndex: 2,
    explanation:
      "A full scaffold structure is preferred when the work will last more than a few hours, when multiple workers need access simultaneously, when materials and tools need to be stored at height, when edge protection is needed for ongoing work, or when the task requires both hands free.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ array                                                         */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Do I need to be a trained scaffolder to use a scaffold?",
    answer:
      "No. You do not need a CISRS card to use a scaffold, but you must be competent to identify whether a scaffold is safe before you work from it. You should check for a valid scaffold inspection tag, ensure guardrails and toe boards are in place, and confirm the scaffold has been inspected within the last seven days. If anything looks wrong, do not use the scaffold and report the defect immediately.",
  },
  {
    question:
      "What is the difference between NASC and CISRS?",
    answer:
      "NASC (National Access & Scaffolding Confederation) is the UK trade body representing scaffolding contractors. It sets industry standards, publishes technical guidance (such as TG20), and promotes best practice. CISRS (Construction Industry Scaffolders Record Scheme) is the card and training scheme for individual scaffolders. CISRS manages the competence framework, training courses, and card renewals. In short, NASC represents companies; CISRS certifies individuals.",
  },
  {
    question:
      "What legislation primarily governs scaffolding in the UK?",
    answer:
      "The primary legislation includes the Work at Height Regulations 2005 (which requires scaffolding as a means of providing safe working platforms), CDM Regulations 2015 (which cover scaffold design as temporary works), the Health and Safety at Work Act 1974 (general duties on employers and employees), and BS EN 12811 (the European design standard adopted in the UK). NASC TG20 provides practical compliance guidance for tube and fitting scaffolds.",
  },
  {
    question:
      "Can I modify a scaffold if it doesn't suit my work?",
    answer:
      "Absolutely not. Only a competent scaffolder — typically holding a CISRS card at the appropriate level — is permitted to alter, modify, or dismantle any part of a scaffold. Removing a guardrail, shifting a platform board, or adding an unauthorised component can compromise the entire structure. If the scaffold does not meet your needs, request a scaffold alteration through the site supervisor or scaffolding contractor.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "Scaffolding is best described as:",
    options: [
      "A permanent support structure forming part of the building fabric",
      "A temporary structure used to support workers and materials during work at height",
      "A type of personal protective equipment used at height",
      "A lifting appliance for moving materials between floors",
    ],
    correctAnswer: 1,
    explanation:
      "Scaffolding is a temporary structure erected to provide safe working platforms, access, and support for workers and materials during construction, maintenance, repair, and demolition at height. It is never a permanent part of the building.",
  },
  {
    id: 2,
    question:
      "Falls from height are the single biggest cause of workplace death in which UK industry?",
    options: [
      "Agriculture",
      "Manufacturing",
      "Construction",
      "Transport and logistics",
    ],
    correctAnswer: 2,
    explanation:
      "Falls from height are the single biggest cause of workplace death in the UK construction industry. Properly erected scaffolding is one of the most effective collective fall prevention measures available.",
  },
  {
    id: 3,
    question: "What does the acronym CISRS stand for?",
    options: [
      "Construction Industry Scaffolders Record Scheme",
      "Certified Industrial Safety and Rigging Standard",
      "Construction Inspection of Scaffolding and Related Structures",
      "Council for Industrial Scaffolding Regulation and Standards",
    ],
    correctAnswer: 0,
    explanation:
      "CISRS stands for the Construction Industry Scaffolders Record Scheme. It manages training, assessment, and competence cards for individual scaffolders in the UK.",
  },
  {
    id: 4,
    question:
      "Approximately how many people work in the scaffolding industry in the UK?",
    options: [
      "Around 10,000",
      "Around 25,000",
      "Over 50,000",
      "Over 100,000",
    ],
    correctAnswer: 2,
    explanation:
      "Over 50,000 people work in the UK scaffolding industry. The industry is worth over \u00a31 billion annually and is represented by NASC at the contractor level.",
  },
  {
    id: 5,
    question:
      "Which regulation specifically requires scaffolding as the primary means of providing a safe working platform?",
    options: [
      "The Electricity at Work Regulations 1989",
      "The Work at Height Regulations 2005",
      "The Provision and Use of Work Equipment Regulations 1998",
      "The Workplace (Health, Safety and Welfare) Regulations 1992",
    ],
    correctAnswer: 1,
    explanation:
      "The Work at Height Regulations 2005 require that scaffolding is used as the primary means of providing a safe working platform where work at height cannot be avoided. CDM 2015 also covers scaffold design as temporary works.",
  },
  {
    id: 6,
    question:
      "Which of the following is NOT a reason to prefer a full scaffold over other access methods?",
    options: [
      "Multiple workers need simultaneous access",
      "The task will take less than fifteen minutes",
      "Materials and tools need to be stored at height",
      "The task requires both hands and no ability to hold on",
    ],
    correctAnswer: 1,
    explanation:
      "A full scaffold structure is preferred when work exceeds a few hours, multiple workers need access, materials must be stored at height, edge protection is needed, or the task requires both hands. A very short, single-person task may be completed safely using a simpler access method such as a podium step, subject to risk assessment.",
  },
  {
    id: 7,
    question: "Who has responsibility for scaffold safety on site?",
    options: [
      "Only the scaffolding contractor who erected it",
      "Only the site manager",
      "Everyone on site — scaffolders, users, inspectors, and managers all have defined responsibilities",
      "Only the Health and Safety Executive",
    ],
    correctAnswer: 2,
    explanation:
      "Everyone on site shares responsibility for scaffold safety. Scaffolders must erect safely and to standard, users must use correctly and never modify, inspectors must carry out thorough and honest inspections, and managers must ensure compliance and resource scaffolding properly.",
  },
  {
    id: 8,
    question:
      "What is the most common category of scaffold-related accident?",
    options: [
      "Scaffold collapse due to design failure",
      "Electrocution from overhead power lines",
      "Falls from scaffold platforms",
      "Fire damage to scaffold sheeting",
    ],
    correctAnswer: 2,
    explanation:
      "Falls from scaffold platforms are the most common category of scaffold-related accident. Other common incidents include falls during erection and dismantling, being struck by falling objects from scaffolds, and scaffold collapse. Most scaffold accidents are preventable with proper inspection and correct use.",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function ScaffoldingAwarenessModule1Section1() {
  useSEO({
    title: "What Is Scaffolding? | Scaffolding Awareness Module 1.1",
    description:
      "Definition, history, and purpose of scaffolding. UK industry overview, legal requirements, scaffold hierarchy, key statistics, and safety culture for electricians.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Building2 className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Scaffolding?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The definition, history, UK industry landscape, legal framework, and
            safety culture that every construction worker and electrician needs to
            understand
          </p>
        </header>

        {/* ── Quick Summary Boxes ───────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Definition:</strong> A temporary structure supporting
                workers and materials during work at height
              </li>
              <li>
                <strong>History:</strong> Used for thousands of years &mdash;
                evidence from ancient Egypt
              </li>
              <li>
                <strong>Industry:</strong> Worth over &pound;1&nbsp;billion
                annually in the UK
              </li>
              <li>
                <strong>Key fact:</strong> Falls from height are the biggest
                cause of construction death
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              For Electricians
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Wiring:</strong> Containment runs at ceiling level from
                scaffold platforms
              </li>
              <li>
                <strong>Lighting:</strong> Luminaire installation and maintenance
                at height
              </li>
              <li>
                <strong>Live services:</strong> Key risk &mdash; proximity to
                live cables on scaffolds
              </li>
              <li>
                <strong>Cable routing:</strong> Cables often routed through
                scaffold structures
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ─────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define scaffolding and explain its primary purpose",
              "Outline the history of scaffolding from ancient times to the modern era",
              "Describe the scale and structure of the UK scaffolding industry",
              "Identify the key risks scaffolding poses for electricians",
              "List the principal legislation and standards governing scaffolding",
              "Explain the hierarchy of when scaffolding is preferred over other access methods",
              "Recall key statistics on scaffold-related incidents in the UK",
              "Describe the shared responsibility model for scaffold safety on site",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  01 — Definition & Purpose                                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Definition &amp; Purpose
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Scaffolding</strong> is a temporary structure used to
                support workers and materials during construction, maintenance,
                repair, and demolition at height. It provides safe working
                platforms, access routes, and edge protection so that tasks can
                be carried out safely above ground level. Once the work is
                complete, the scaffold is dismantled and removed.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-2">
                  Core Definition
                </p>
                <p className="text-base text-white leading-relaxed">
                  A <strong>scaffold</strong> is any temporarily provided
                  structure from which persons can carry out work at height, gain
                  access to a workplace at height, or be protected from falling
                  by means of guardrails, toe boards, and other edge protection.
                </p>
              </div>

              <p>
                Scaffolding has been used for thousands of years. Archaeological
                evidence shows that ancient Egyptians used rudimentary scaffold
                structures when building temples and monuments &mdash; remnants
                of putlog holes (the recesses in masonry walls where scaffold
                tubes or timbers are inserted) have been found in structures
                dating back over 4,000 years. Similar evidence exists from
                ancient Greek and Roman construction.
              </p>

              <p>
                Modern scaffolding as we know it developed in the 20th century.
                The steel tube and coupler system was introduced in the 1920s
                and 1930s, and the system scaffold (using prefabricated
                components that slot together without loose couplers) emerged
                from the 1950s onwards. Today, scaffolding is a highly
                engineered discipline with its own design standards, training
                schemes, and regulatory framework.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Purposes of Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Safe working platforms
                      </strong>{" "}
                      &mdash; flat, level, and sufficiently wide surfaces from
                      which workers can carry out tasks with both hands free
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Access and egress</strong>{" "}
                      &mdash; stairways, ladder access bays, and internal
                      ladders allowing workers to reach elevated work positions
                      safely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Edge protection</strong>{" "}
                      &mdash; guardrails, mid-rails, and toe boards preventing
                      falls from open edges and platforms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Material storage</strong>{" "}
                      &mdash; platforms strong enough to hold tools, materials,
                      and equipment at height, reducing the need for repeated
                      climbing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Protection of the public
                      </strong>{" "}
                      &mdash; fans, netting, and brick guards fitted to
                      scaffolds prevent debris falling onto pedestrians and
                      adjacent areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Temporary weather protection
                      </strong>{" "}
                      &mdash; sheeting and temporary roofs can be added to allow
                      work to continue in adverse weather
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Historical Timeline
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400 font-mono text-xs min-w-[70px]">
                      ~2000 BC
                    </span>
                    <span>
                      Ancient Egyptians use timber scaffolding to build temples;
                      putlog holes found in masonry walls
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400 font-mono text-xs min-w-[70px]">
                      Medieval
                    </span>
                    <span>
                      Timber pole scaffolds used throughout Europe for cathedral
                      and castle construction
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400 font-mono text-xs min-w-[70px]">
                      1920s
                    </span>
                    <span>
                      Steel tube and coupler systems introduced, replacing timber
                      poles in the UK
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400 font-mono text-xs min-w-[70px]">
                      1950s+
                    </span>
                    <span>
                      Prefabricated system scaffolds developed, offering faster
                      erection and improved safety
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400 font-mono text-xs min-w-[70px]">
                      2005
                    </span>
                    <span>
                      Work at Height Regulations 2005 come into force,
                      consolidating scaffold safety law
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  02 — Why Scaffolding Matters                                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Why Scaffolding Matters
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Falls from height are the{" "}
                <strong>
                  single biggest cause of workplace death in the UK construction
                  industry
                </strong>
                . Year after year, HSE data confirms that more construction
                workers die from falling than from any other single cause &mdash;
                including being struck by vehicles, being trapped by collapsing
                structures, or contact with electricity.
              </p>

              <p>
                Scaffolding provides three critical safety functions that
                directly address this risk:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Safe working platforms
                    </strong>{" "}
                    &mdash; providing flat, stable surfaces that are fully
                    boarded, level, and free from trip hazards, allowing workers
                    to move and work safely at height
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Safe access and egress
                    </strong>{" "}
                    &mdash; stair towers, ladder bays, and internal ladders that
                    provide controlled, protected routes to and from the working
                    platform
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">Edge protection</strong>{" "}
                    &mdash; guardrails, mid-rails, and toe boards that prevent
                    workers, tools, and materials from falling from open edges
                  </span>
                </li>
              </ul>

              <p>
                Properly erected scaffolding is one of the most effective{" "}
                <strong>collective fall prevention measures</strong> available.
                Unlike personal fall protection (such as harnesses and lanyards),
                scaffolding protects everyone on the platform simultaneously
                without requiring each individual to clip on, adjust, or inspect
                personal equipment. This collective approach is always preferred
                under the hierarchy of control in the Work at Height Regulations
                2005.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Cost of Getting It Wrong
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  When scaffolding is poorly erected, inadequately inspected, or
                  misused, the consequences can be catastrophic. Scaffold
                  failures and falls from scaffolds result in fatalities, life-
                  changing injuries, criminal prosecutions, unlimited fines, and
                  imprisonment. Every scaffold-related death and serious injury
                  is preventable.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Why Collective Protection Matters
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Protects all workers on the platform simultaneously &mdash;
                      no individual action required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Cannot be forgotten, left unclipped, or incorrectly worn
                      like personal PPE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Prevents falls in the first place rather than arresting
                      them after they occur
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Preferred by the Work at Height Regulations 2005 hierarchy
                      of control
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  03 — The UK Scaffolding Industry                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            The UK Scaffolding Industry
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The UK scaffolding industry is a substantial sector in its own
                right. It is worth{" "}
                <strong>over &pound;1&nbsp;billion annually</strong> and employs
                a large, skilled workforce that is essential to virtually every
                construction, maintenance, and demolition project in the country.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">
                  UK Scaffolding Industry &mdash; Key Figures
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-slate-400">
                      &pound;1bn+
                    </p>
                    <p className="text-white/70 text-xs">
                      Annual value of the UK scaffold industry
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-slate-400">50,000+</p>
                    <p className="text-white/70 text-xs">
                      People working in scaffolding across the UK
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-slate-400">NASC</p>
                    <p className="text-white/70 text-xs">
                      National Access &amp; Scaffolding Confederation &mdash;
                      the industry trade body
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-slate-400">CISRS</p>
                    <p className="text-white/70 text-xs">
                      Construction Industry Scaffolders Record Scheme &mdash;
                      manages competence cards
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The{" "}
                <strong>
                  NASC (National Access &amp; Scaffolding Confederation)
                </strong>{" "}
                is the principal trade body representing major scaffolding
                contractors in the UK. NASC members are required to meet
                rigorous safety, training, and quality standards. The
                confederation publishes essential technical guidance, most
                notably <strong>TG20</strong> (the compliance guide for tube and
                fitting scaffolds), and works closely with the HSE and CISRS to
                raise standards across the industry.
              </p>

              <p>
                The{" "}
                <strong>
                  CISRS (Construction Industry Scaffolders Record Scheme)
                </strong>{" "}
                manages the training and competence card system for individual
                scaffolders. CISRS cards are the recognised proof of competence
                for scaffold operatives and are required on most UK construction
                sites. The scheme provides a structured career pathway from
                labourer through trainee scaffolder, scaffolder, advanced
                scaffolder, and scaffold inspector.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  CISRS Card Levels
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Labourer</strong> &mdash;
                      assists scaffolders with material handling but does not
                      erect or dismantle
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Trainee Scaffolder</strong>{" "}
                      &mdash; works under direct supervision of a qualified
                      scaffolder while gaining experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Scaffolder</strong> &mdash;
                      qualified to erect, alter, and dismantle standard scaffold
                      configurations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Advanced Scaffolder
                      </strong>{" "}
                      &mdash; qualified for complex and non-standard scaffolds
                      including suspended, cantilevered, and birdcage structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Scaffold Inspector
                      </strong>{" "}
                      &mdash; qualified to carry out statutory inspections under
                      the Work at Height Regulations 2005
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Over <strong>50,000 people</strong> work in scaffolding in the
                UK, ranging from labourers and trainees through to advanced
                scaffolders, inspectors, designers, and project managers. The
                industry supports virtually every major construction and
                maintenance project &mdash; from house building and commercial
                fit-out to industrial shutdowns, bridge repairs, and heritage
                restoration.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  04 — Scaffolding in the Electrical Industry                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Scaffolding in the Electrical Industry
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians regularly work on or near scaffolds as part of
                their everyday duties. Whether you are installing containment,
                wiring lighting circuits, fitting distribution equipment, or
                carrying out maintenance on existing installations, there is a
                high probability that you will work from a scaffold at some
                point &mdash; even if you never erect one yourself.
              </p>

              <p>
                Understanding scaffold safety is therefore{" "}
                <strong>essential for all electricians</strong>, not just those
                in the scaffolding trade. You need to know how to check that a
                scaffold is safe before you step onto it, how to use it
                correctly, and what hazards to be aware of that are specific to
                electrical work on scaffolds.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Common Electrical Tasks Involving Scaffolds
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Wiring &amp; Containment
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Installing cable tray and basket at ceiling level
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Running conduit and trunking along high walls
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Pulling cables through containment at elevated levels
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Lighting Installation
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Fitting luminaires in offices, warehouses, and retail
                          units
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          High-bay lighting installation and lamp replacement
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          External floodlight and security lighting on facades
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Maintenance &amp; Repair
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Periodic inspection and testing at elevated positions
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Replacing faulty components on high-level equipment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Fault finding on circuits routed through scaffold zones
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Temporary Supplies
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Installing temporary site lighting on scaffold
                          structures
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Routing temporary power cables through scaffold bays
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Connecting distribution boards for scaffold-mounted
                          equipment
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Key Risks for Electricians on Scaffolds
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">
                        Working near live services
                      </strong>{" "}
                      &mdash; existing electrical cables, overhead lines, and
                      live equipment may be in close proximity to scaffold
                      platforms. Contact with live conductors from a metal
                      scaffold is extremely dangerous due to the conductive path
                      through the scaffold structure to earth.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">
                        Cable routing through scaffold structures
                      </strong>{" "}
                      &mdash; temporary and permanent cables are frequently
                      routed through scaffold bays, creating trip hazards,
                      pinch points, and potential damage to cable insulation
                      during scaffold alterations or dismantling.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">
                        Conductive scaffold components
                      </strong>{" "}
                      &mdash; steel tubes, couplers, and fittings are excellent
                      electrical conductors. A fault condition that energises
                      any part of the scaffold structure could present a shock
                      risk to everyone in contact with it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">
                        Tools and materials at height
                      </strong>{" "}
                      &mdash; electricians carry drills, cable cutters, test
                      instruments, and cable drums onto scaffolds. Dropped tools
                      are a significant struck-by hazard for workers below.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  05 — Legal Requirements                                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            Legal Requirements
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffolding in the UK is governed by a comprehensive framework
                of legislation, regulations, and standards. Understanding the
                key legal requirements is essential for anyone who erects, uses,
                inspects, or manages scaffolding on a construction site.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Primary Legislation &amp; Standards
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Work at Height Regulations 2005
                    </p>
                    <p className="text-white/70 text-xs">
                      The principal regulations governing all work at height.
                      Scaffolding is recognised as the primary means of
                      providing a safe working platform where work at height
                      cannot be avoided. The regulations require proper
                      planning, competent personnel, suitable equipment,
                      inspection, and risk management.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      CDM Regulations 2015
                    </p>
                    <p className="text-white/70 text-xs">
                      The Construction (Design and Management) Regulations 2015
                      classify scaffold design as temporary works. The principal
                      designer, principal contractor, and scaffold designer all
                      have defined duties to ensure scaffolding is designed,
                      erected, and maintained safely throughout the project.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Health and Safety at Work Act 1974 (HASAWA)
                    </p>
                    <p className="text-white/70 text-xs">
                      The overarching legislation that places general duties on
                      employers to ensure the health, safety, and welfare of
                      employees and others affected by their work activities.
                      This includes the provision and maintenance of safe
                      scaffolding.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      BS EN 12811 &mdash; Design Standards
                    </p>
                    <p className="text-white/70 text-xs">
                      The European standard (adopted in the UK) covering the
                      performance requirements and general design of temporary
                      works equipment including scaffolding. It specifies load
                      classes, dimensions, structural requirements, and testing
                      methods.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      NASC TG20 &mdash; Compliance Guidance
                    </p>
                    <p className="text-white/70 text-xs">
                      The NASC technical guidance document TG20 provides
                      comprehensive compliance guidance for tube and fitting
                      scaffolds. It includes design tables, wind loading
                      calculations, tie patterns, and standard configurations
                      that, when followed, demonstrate compliance with the
                      relevant regulations and standards.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Beyond these primary instruments, several additional regulations
                are relevant to scaffolding:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      The Lifting Operations and Lifting Equipment Regulations
                      1998 (LOLER)
                    </strong>{" "}
                    &mdash; applies when scaffolds incorporate lifting
                    appliances such as gin wheels or scaffold hoists
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      The Provision and Use of Work Equipment Regulations 1998
                      (PUWER)
                    </strong>{" "}
                    &mdash; scaffold components are work equipment and must be
                    suitable, maintained, and inspected
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      The Management of Health and Safety at Work Regulations
                      1999
                    </strong>{" "}
                    &mdash; requires risk assessments to be carried out for all
                    scaffold-related activities
                  </span>
                </li>
              </ul>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Inspection Requirements
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Under the Work at Height Regulations 2005 (Schedule 7),
                  scaffolds must be inspected by a competent person{" "}
                  <strong className="text-white">
                    before first use, after any event likely to have affected
                    stability (such as high winds or impact), and at intervals
                    not exceeding seven days
                  </strong>
                  . The results of each inspection must be recorded in writing
                  and kept on site for at least three months.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  06 — The Hierarchy of Scaffolding                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            The Hierarchy of Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not every task at height requires a full scaffold structure.
                The Work at Height Regulations 2005 require a risk-based
                approach: you must select the most appropriate type of access
                equipment for the specific task, taking into account the
                duration, the number of workers, the height, the loads
                involved, and the nature of the work.
              </p>

              <p>
                However, a <strong>full scaffold structure</strong> is generally
                preferred over other access methods when:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Work duration exceeds a few hours
                    </strong>{" "}
                    &mdash; sustained tasks require stable, comfortable platforms
                    rather than temporary access equipment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Multiple workers need access
                    </strong>{" "}
                    &mdash; scaffolds can accommodate several workers
                    simultaneously on wide, boarded platforms
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Materials and tools need to be stored at height
                    </strong>{" "}
                    &mdash; scaffold platforms can support significant loads,
                    reducing repeated trips up and down
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Edge protection is needed for ongoing work
                    </strong>{" "}
                    &mdash; scaffolds provide permanent guardrails, mid-rails,
                    and toe boards for the duration of the project
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      The task involves both hands
                    </strong>{" "}
                    &mdash; where the worker has no ability to hold on (e.g.
                    drilling, connecting, or lifting), a platform with edge
                    protection is essential
                  </span>
                </li>
              </ul>

              {/* Scaffold vs Other Access Methods — comparison table */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">
                  Scaffold vs Other Access Methods
                </p>
                <div className="overflow-x-auto -mx-2">
                  <div className="min-w-[500px] px-2">
                    {/* Header row */}
                    <div className="grid grid-cols-4 gap-2 mb-2 text-xs font-semibold">
                      <div className="text-white/60 p-2">Criteria</div>
                      <div className="text-slate-400 p-2 bg-slate-500/10 rounded-t-lg text-center">
                        Full Scaffold
                      </div>
                      <div className="text-white/60 p-2 text-center">
                        Tower Scaffold
                      </div>
                      <div className="text-white/60 p-2 text-center">
                        Podium / Ladder
                      </div>
                    </div>
                    {/* Rows */}
                    {[
                      {
                        criteria: "Duration",
                        scaffold: "Hours to months",
                        tower: "Hours to days",
                        podium: "Minutes to hours",
                      },
                      {
                        criteria: "No. of workers",
                        scaffold: "Multiple simultaneously",
                        tower: "1\u20132 workers",
                        podium: "1 worker",
                      },
                      {
                        criteria: "Material storage",
                        scaffold: "Yes \u2014 high load capacity",
                        tower: "Limited",
                        podium: "Minimal / none",
                      },
                      {
                        criteria: "Edge protection",
                        scaffold: "Full guardrails, toe boards",
                        tower: "Guardrails on platform",
                        podium: "Guardrails (podium) / none (ladder)",
                      },
                      {
                        criteria: "Two-handed work",
                        scaffold: "Fully supported",
                        tower: "Supported",
                        podium: "Podium yes / ladder no",
                      },
                      {
                        criteria: "Mobility",
                        scaffold: "Fixed in position",
                        tower: "Repositionable",
                        podium: "Highly mobile",
                      },
                      {
                        criteria: "Setup time",
                        scaffold: "Hours (by competent scaffolder)",
                        tower: "30\u201360 minutes",
                        podium: "Immediate",
                      },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className={`grid grid-cols-4 gap-2 text-xs ${
                          i % 2 === 0 ? "bg-white/[0.02]" : ""
                        }`}
                      >
                        <div className="text-white/60 p-2 font-medium">
                          {row.criteria}
                        </div>
                        <div className="text-white p-2 bg-slate-500/5 text-center">
                          {row.scaffold}
                        </div>
                        <div className="text-white/70 p-2 text-center">
                          {row.tower}
                        </div>
                        <div className="text-white/70 p-2 text-center">
                          {row.podium}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 p-3 bg-slate-500/10 border border-slate-500/20 rounded-lg">
                  <p className="text-xs text-white/70">
                    <strong className="text-slate-400">Note:</strong> The
                    correct access method must always be determined by a
                    risk assessment. A full scaffold is not always necessary,
                    but when the criteria above are met, it is almost always
                    the safest and most productive option.
                  </p>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">
                    Electrician Consideration
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Electrical work almost always requires both hands free &mdash;
                  for connecting cables, tightening glands, operating test
                  instruments, and using power tools. This means that ladders
                  are rarely suitable for electrical tasks at height. A scaffold
                  platform, tower scaffold, or podium step with guardrails is
                  almost always the correct choice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  07 — Key Statistics                                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Key Statistics
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                HSE data consistently shows that scaffold-related incidents
                account for a significant proportion of construction accidents.
                Understanding these statistics reinforces why scaffold safety
                must be taken seriously by everyone on site.
              </p>

              {/* Scaffold Safety Statistics — styled div diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-white">
                    Scaffold Safety Statistics
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~40</p>
                    <p className="text-white/70 text-xs">
                      Workers killed by falls from height each year in the UK
                      (all access equipment)
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~50%</p>
                    <p className="text-white/70 text-xs">
                      Of all construction fatalities involve falls from height
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-slate-400">5,000+</p>
                    <p className="text-white/70 text-xs">
                      Major injuries from falls at height each year across all
                      UK industries
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400">90%+</p>
                    <p className="text-white/70 text-xs">
                      Of scaffold accidents are preventable with proper
                      inspection and use
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The most common categories of scaffold-related accident are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Falls from scaffold platforms
                    </strong>{" "}
                    &mdash; the single most common scaffold accident. Causes
                    include missing guardrails, incomplete boarding, wet or icy
                    platforms, tripping on debris, and overreaching beyond the
                    platform edge.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Falls during erection and dismantling
                    </strong>{" "}
                    &mdash; scaffolders are at particular risk during the
                    build-up and strip-out phases when the scaffold is
                    incomplete and edge protection may not yet be in place.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">
                      Struck by falling objects from scaffolds
                    </strong>{" "}
                    &mdash; tools, materials, scaffold fittings, and debris
                    dropped from scaffold platforms can cause serious or fatal
                    injuries to workers and members of the public below.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                  <span>
                    <strong className="text-white">Scaffold collapse</strong>{" "}
                    &mdash; caused by inadequate foundations, missing ties,
                    overloading, unauthorised modifications, or failure to
                    account for wind loading. Scaffold collapses are
                    comparatively rare but have catastrophic consequences when
                    they occur.
                  </span>
                </li>
              </ul>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Most Scaffold Accidents Are Preventable
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The overwhelming majority of scaffold-related accidents are
                  entirely preventable. They result from a failure to inspect
                  the scaffold before use, a failure to erect it to the correct
                  standard, unauthorised modifications by users, overloading,
                  or a simple failure to report defects. If every scaffold were
                  erected correctly, inspected regularly, and used properly,
                  the number of scaffold-related injuries and deaths would fall
                  dramatically.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Contributing Factors in Scaffold Incidents
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Missing or incomplete guardrails and toe boards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Scaffold boards missing, broken, or not properly supported
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Inadequate or missing scaffold ties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Overloading platforms beyond their rated capacity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Unauthorised alterations by unqualified persons
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Poor foundations &mdash; base plates on soft ground,
                      uneven surfaces, or inadequate sole boards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Failure to carry out or act upon statutory inspections
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Wind loading not accounted for &mdash; sheeted scaffolds
                      acting as sails in high winds
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  08 — Scaffold Safety Culture                                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Scaffold Safety Culture
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffold safety is not the sole responsibility of the
                scaffolding contractor. Everyone on site has a defined role to
                play, and a genuine safety culture requires that all parties
                understand and fulfil their responsibilities consistently.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-white">
                    Shared Responsibility Model
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <HardHat className="h-4 w-4 text-slate-400" />
                      <p className="text-white font-medium">Scaffolders</p>
                    </div>
                    <ul className="text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Erect safely and to the correct standard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Follow the scaffold design or TG20 guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Use only serviceable, inspected components</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Hand over with a completed scaffold inspection tag
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-slate-400" />
                      <p className="text-white font-medium">
                        Users (Electricians &amp; Other Trades)
                      </p>
                    </div>
                    <ul className="text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Check the scaffold tag and visual condition before use
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Use the scaffold correctly &mdash; do not overload</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Never modify, remove guardrails, or alter any component
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Report any defects immediately and stop using the
                          scaffold
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardCheck className="h-4 w-4 text-slate-400" />
                      <p className="text-white font-medium">Inspectors</p>
                    </div>
                    <ul className="text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Carry out thorough inspections at the required intervals
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Provide honest, accurate written reports
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Tag scaffolds as safe or unsafe as appropriate
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Refuse to sign off a scaffold that is not compliant
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-slate-400" />
                      <p className="text-white font-medium">Managers</p>
                    </div>
                    <ul className="text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Ensure compliance with regulations and standards
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Resource scaffolding properly &mdash; do not cut costs
                          on safety
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Ensure inspections are carried out and acted upon
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>
                          Provide training and supervision for all scaffold users
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Golden Rules of Scaffold Safety
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">
                        Never use a scaffold you haven&rsquo;t checked
                      </strong>{" "}
                      &mdash; look for the scaffold inspection tag, check the
                      date, and visually inspect guardrails, boarding, ties, and
                      access before stepping onto any scaffold
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">
                        Never modify a scaffold
                      </strong>{" "}
                      &mdash; do not remove guardrails, shift boards, remove
                      ties, or add unauthorised components. Only a competent
                      scaffolder may alter a scaffold structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">
                        Always report defects
                      </strong>{" "}
                      &mdash; if you see anything wrong &mdash; a missing
                      guardrail, a damaged board, a displaced tie, a leaning
                      standard &mdash; stop work, evacuate the scaffold, and
                      report the defect immediately to the site supervisor
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                A positive scaffold safety culture means that{" "}
                <strong>no one ignores a defect</strong>,{" "}
                <strong>no one takes shortcuts</strong>, and{" "}
                <strong>no one is afraid to report problems</strong>. It means
                that scaffolders take pride in building compliant structures,
                users respect the scaffold and use it as intended, inspectors
                are thorough and honest, and managers support and resource safety
                rather than treating it as an inconvenience.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Remember:</strong> As an
                  electrician, you are a scaffold <em>user</em>. You may not
                  erect scaffolds, but you use them regularly. Your
                  responsibility is to check before you use, use correctly,
                  never modify, and always report. These simple actions could
                  save your life or the life of a colleague.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section Summary ──────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has introduced scaffolding from the ground up
                &mdash; what it is, why it matters, how the UK industry is
                structured, why electricians need to understand it, the legal
                framework, when to prefer scaffolding over other access methods,
                the accident statistics, and the safety culture that everyone on
                site must uphold. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Definition:</strong>{" "}
                    Scaffolding is a temporary structure supporting workers and
                    materials during construction, maintenance, repair, and
                    demolition at height
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Importance:</strong> Falls
                    from height are the biggest cause of construction death;
                    scaffolding is one of the most effective collective fall
                    prevention measures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Industry:</strong> Worth over
                    &pound;1&nbsp;billion, employing 50,000+ people, governed by
                    NASC and CISRS
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Electrician relevance:</strong>{" "}
                    You will regularly work on scaffolds for wiring, containment,
                    lighting, and maintenance &mdash; understand the risks
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Legal framework:</strong> WAH
                    Regs 2005, CDM 2015, HASAWA 1974, BS EN 12811, and NASC TG20
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Safety culture:</strong>{" "}
                    Never use unchecked, never modify, always report defects
                    &mdash; everyone has a role
                  </span>
                </li>
              </ul>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Next:</strong> In Section
                  2, we will examine the different types of scaffolding used in
                  the UK &mdash; tube and fitting, system scaffolds, mobile
                  towers, birdcage scaffolds, and more &mdash; so you can
                  recognise each type and understand when each is used.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom Navigation ────────────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mb-10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-1-section-2">
              Next: Types of Scaffolding
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

        {/* ── FAQ Section ──────────────────────────────────────────── */}
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

        {/* ── Quiz ─────────────────────────────────────────────────── */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />
      </article>
    </div>
  );
}
