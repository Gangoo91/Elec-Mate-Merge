import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Layers,
  Wrench,
  MoveHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — inserted after content 02 / 04 / 06   */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "independent-vs-putlog",
    question:
      "What is the main structural difference between independent scaffolding and putlog scaffolding?",
    options: [
      "Independent scaffolding is made from aluminium; putlog scaffolding is made from steel",
      "Independent scaffolding has two rows of standards; putlog scaffolding has one row with putlogs into the wall",
      "Independent scaffolding is only used indoors; putlog scaffolding is only used outdoors",
      "There is no structural difference — the names are interchangeable",
    ],
    correctIndex: 1,
    explanation:
      "Independent scaffolding uses two rows of standards (inner and outer) connected by transoms and ledgers, and does not rely on the building for support. Putlog scaffolding uses a single row of standards with horizontal putlogs inserted into the brickwork, relying on the wall for partial support. This makes putlog scaffolding only suitable during bricklaying or masonry work when the wall can bear the load.",
  },
  {
    id: "mobile-tower-training",
    question:
      "Which training certification is specifically required for the assembly, use, and dismantling of mobile scaffold towers?",
    options: [
      "CISRS Scaffolder Card",
      "IPAF Operator Licence",
      "PASMA Training Certificate",
      "CPCS Blue Card",
    ],
    correctIndex: 2,
    explanation:
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) training is specifically required for mobile scaffold towers. PASMA covers assembly, use, inspection, and dismantling of aluminium tower scaffolds. CISRS covers tube-and-fitting and system scaffolding. IPAF covers powered access (MEWPs). CPCS covers plant and machinery.",
  },
  {
    id: "suspended-scaffold-regs",
    question:
      "Suspended scaffolding platforms hung from wire ropes are subject to which specific set of UK regulations?",
    options: [
      "The Provision and Use of Work Equipment Regulations 1998 (PUWER) only",
      "The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)",
      "The Construction (Head Protection) Regulations 1989",
      "The Electricity at Work Regulations 1989",
    ],
    correctIndex: 1,
    explanation:
      "Suspended scaffolding platforms are subject to the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) because the platform and its occupants are raised and lowered by wire ropes or chains — making it lifting equipment. LOLER requires thorough examination by a competent person at specified intervals, proper planning of lifting operations, and written schemes of examination. PUWER also applies but LOLER is the specific regulation governing the lifting aspects.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Who is allowed to erect and dismantle tube-and-fitting or system scaffolding on UK construction sites?",
    answer:
      "Under the Work at Height Regulations 2005 and industry best practice, scaffolding must be erected, altered, and dismantled by people who are trained and competent. In the UK, the industry standard is the CISRS (Construction Industry Scaffolders Record Scheme) card scheme. CISRS scaffolders hold cards at various levels — Labourer, Trainee, Scaffolder, Advanced Scaffolder, and Scaffold Inspector. The scaffolding must also be designed or checked by a competent person, and a handover certificate or scaffold tag must be issued before anyone else uses the scaffold. Untrained workers must never attempt to erect, alter, or dismantle scaffolding.",
  },
  {
    question:
      "Can mobile scaffold towers be used outdoors in windy conditions?",
    answer:
      "Mobile scaffold towers should not be used outdoors in wind speeds above the manufacturer's stated limit — typically around 17 mph (force 4 on the Beaufort scale) for standard towers. High winds can cause overturning, especially at greater heights. If used outdoors, towers must be assessed for wind loading, the height-to-base ratio must comply with the manufacturer's instructions, and outriggers or stabilisers must be deployed for taller configurations. Castors must always be locked during use, and the tower must never be moved with anyone on the platform. PASMA guidance covers safe outdoor use in detail.",
  },
  {
    question:
      "What is the difference between a cantilever scaffold and a truss-out scaffold?",
    answer:
      "Both project outward from a building, but they differ in support method. A cantilever scaffold is supported by needles (horizontal beams) that pass through the building wall or window openings, with the inner end anchored or counterweighted inside the building. A truss-out scaffold is supported by a triangulated frame (truss) that projects from the main scaffold structure itself, transferring the load back into the scaffold rather than through the wall. Both require specific design by a competent person and are classified as non-standard scaffolds. They are used where ground-level support is not available — for example, over public footpaths, loading bays, or building overhangs.",
  },
  {
    question:
      "Does birdcage scaffolding need to be designed by a structural engineer?",
    answer:
      "Birdcage scaffolding does not always require a structural engineer, but it must always be designed by a competent person. For straightforward birdcage scaffolds, a CISRS Advanced Scaffolder or scaffold designer with appropriate experience may produce the design using standard guidance (such as TG20 for tube-and-fitting scaffolds or the system manufacturer's design guide). However, complex or large-span birdcage scaffolds, those supporting heavy loads, or those in unusual configurations will require a specific design from a qualified scaffold designer or structural engineer. The design must account for all loads (self-weight, imposed loads, wind), bracing requirements, foundation conditions, and tie patterns. A scaffold design drawing or specification must be available on site before erection begins.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Independent scaffolding is defined by which key structural feature?",
    options: [
      "A single row of standards with putlogs into the wall",
      "Two rows of standards (inner and outer) connected by transoms and ledgers, not relying on the building",
      "Modular components that slot together without loose fittings",
      "Platforms suspended from the roof by wire ropes",
    ],
    correctAnswer: 1,
    explanation:
      "Independent scaffolding is characterised by two rows of standards — an inner row and an outer row — connected horizontally by ledgers and transoms. It is fully self-supporting and does not rely on the building structure for stability. This makes it the most common type on new-build construction sites where the building cannot yet support putlogs.",
  },
  {
    id: 2,
    question:
      "Putlog scaffolding is only suitable for use during which type of construction activity?",
    options: [
      "Painting and decorating",
      "Roof work and chimney repairs",
      "Bricklaying and masonry work",
      "Window installation on completed buildings",
    ],
    correctAnswer: 2,
    explanation:
      "Putlog scaffolding uses a single row of standards with horizontal putlogs inserted into the bed joints of the brickwork being laid. It relies on the wall for support, which means it can only be used during bricklaying or masonry construction when the wall is being built up and the putlogs can be properly bedded in. It is not suitable for completed buildings or non-masonry work.",
  },
  {
    id: 3,
    question:
      "Which of the following is a key advantage of system scaffolding over traditional tube-and-fitting scaffolding?",
    options: [
      "It does not require trained erectors",
      "It is lighter and can be carried by one person",
      "Pre-engineered modular components slot together, giving faster erection and consistent quality",
      "It can be used without a scaffold design",
    ],
    correctAnswer: 2,
    explanation:
      "System scaffolding (such as Layher Allround, HAKI, or Cuplok) uses pre-engineered modular components that slot, clip, or wedge together at fixed node points. This gives faster erection times, more consistent quality, and fewer loose components compared to traditional tube-and-fitting. However, it still requires trained and competent erectors — CISRS training covers system scaffolding, and manufacturers also provide specific product training.",
  },
  {
    id: 4,
    question:
      "When using a mobile scaffold tower, which of the following is a mandatory safety requirement?",
    options: [
      "The tower must be anchored to the building with ties at every lift",
      "All four castors must be locked before anyone works on the platform",
      "The tower must be erected by a CISRS-carded scaffolder",
      "A scaffold inspector must check the tower every 24 hours",
    ],
    correctAnswer: 1,
    explanation:
      "All four castors (wheels) must be locked before anyone climbs or works on a mobile scaffold tower. This prevents the tower from rolling while occupied, which could cause it to tip or the user to fall. Mobile towers require PASMA training (not CISRS), are inspected before each use, and are not normally tied to the building unless they exceed the manufacturer's free-standing height limit.",
  },
  {
    id: 5,
    question: "Cantilever scaffolding is typically used in which situation?",
    options: [
      "Providing access to ceilings and soffits over a large internal area",
      "Short-duration maintenance tasks at low level",
      "Where ground-level support is not possible, such as over public footpaths or building overhangs",
      "For window cleaning on the outside of tall buildings",
    ],
    correctAnswer: 2,
    explanation:
      "Cantilever scaffolding projects outward from the building face, supported by needles passing through the wall or by the main scaffold structure. It is used where ground-level support is not available or not practical — for example, over public footpaths, loading bays, building overhangs, or restricted ground areas. It requires specific design by a competent person and is classified as non-standard scaffolding.",
  },
  {
    id: 6,
    question:
      "Suspended scaffolding platforms are subject to LOLER. What does LOLER stand for?",
    options: [
      "Lifting Operations and Lifting Equipment Regulations 1998",
      "Loading, Operation, and Lowering Equipment Regulations 2005",
      "Ladder, Overhead, and Lifting Equipment Regulations 1998",
      "Local Operator Licensing and Equipment Regulations 2002",
    ],
    correctAnswer: 0,
    explanation:
      "LOLER stands for the Lifting Operations and Lifting Equipment Regulations 1998. Suspended scaffolding — where platforms are raised and lowered by wire ropes or chains from the roof or structure above — is classified as lifting equipment under LOLER. This requires thorough examination by a competent person every 6 months (for equipment used for lifting persons), a written scheme of examination, and proper planning of every lifting operation.",
  },
  {
    id: 7,
    question:
      "Birdcage scaffolding is best described as which of the following?",
    options: [
      "A scaffold suspended from the roof by wire ropes for external building maintenance",
      "A freestanding scaffold with multiple rows of standards supporting a working platform at the top for access to ceilings or soffits",
      "A single tower on castors used for short-duration work at height",
      "A scaffold that projects out from the building face on cantilever needles",
    ],
    correctAnswer: 1,
    explanation:
      "Birdcage scaffolding is a freestanding scaffold structure consisting of multiple rows of standards arranged in a grid pattern, supporting a working platform at the top. It provides access to ceilings, soffits, or overhead areas over a large internal area. It is commonly used for ceiling work, painting, and M&E (mechanical and electrical) installation. It must be properly braced to prevent racking and collapse.",
  },
  {
    id: 8,
    question:
      "Which of the following is classified as specialist scaffolding?",
    options: [
      "A standard independent scaffold on a new-build housing site",
      "A mobile aluminium tower used for changing light bulbs in a warehouse",
      "A loading bay, protection fan, or temporary roof formed as part of the scaffold structure",
      "A putlog scaffold used during bricklaying on a domestic extension",
    ],
    correctAnswer: 2,
    explanation:
      "Loading bays (for receiving materials at height), protection fans (angled platforms to catch falling debris), and temporary roofs (weather protection during construction) are all classified as specialist scaffolding. They are additional structures built into or onto the main scaffold and require specific design. Other specialist types include truss-out scaffolds and scaffolding for specific industries such as offshore, industrial, and events.",
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function ScaffoldingAwarenessModule1Section2() {
  useSEO({
    title: "Types of Scaffolding | Scaffolding Awareness Module 1.2",
    description:
      "Independent, putlog, system, mobile tower, cantilever, suspended, birdcage, and specialist scaffolding. Structure, uses, training requirements, and when each type is appropriate on UK construction sites.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ────────────────────────────────────────── */}
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
        {/* ── Page Title ─────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Layers className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Scaffolding
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The eight principal scaffold types used in UK construction &mdash;
            their structure, purpose, training requirements, and when each is
            the right choice for the job
          </p>
        </header>

        {/* ── Quick Summary Boxes ────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Independent &amp; putlog:</strong> Traditional
                tube-and-fitting types
              </li>
              <li>
                <strong>System:</strong> Pre-engineered modular (Layher, HAKI,
                Cuplok)
              </li>
              <li>
                <strong>Mobile towers:</strong> Aluminium on castors &mdash;
                PASMA trained
              </li>
              <li>
                <strong>Specialist:</strong> Cantilever, suspended, birdcage,
                and more
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>CISRS:</strong> Required for tube-and-fitting &amp;
                system scaffold erection
              </li>
              <li>
                <strong>PASMA:</strong> Required for mobile scaffold towers
              </li>
              <li>
                <strong>LOLER:</strong> Applies to all suspended scaffolding
              </li>
              <li>
                <strong>Design:</strong> Non-standard scaffolds need specific
                design
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ──────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the eight principal types of scaffolding used in UK construction",
              "Describe the structural differences between independent and putlog scaffolding",
              "Explain the advantages of system scaffolding over traditional tube-and-fitting",
              "State the training requirements for mobile scaffold towers (PASMA) and tube-and-fitting/system scaffolding (CISRS)",
              "Recognise when cantilever, suspended, or birdcage scaffolding is appropriate",
              "Understand what constitutes specialist scaffolding and when specific design is required",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ── 01: Independent Scaffolding ────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Independent Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Independent scaffolding is the most widely used scaffold type on
                new-build construction sites in the UK. It consists of{" "}
                <strong>two rows of standards</strong> &mdash; an inner row
                (closest to the building) and an outer row &mdash; connected
                horizontally by <strong>ledgers</strong> (running along the
                length of the scaffold) and <strong>transoms</strong> (running
                across the width, between the inner and outer standards).
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Feature:</strong>{" "}
                  Independent scaffolding does{" "}
                  <strong>not rely on the building for support</strong>. The
                  entire structure is self-supporting. This is critical on
                  new-build sites where the building walls may not yet be strong
                  enough to accept putlogs, or where the building fabric must
                  not be penetrated.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Structural Characteristics
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Two rows of standards:</strong>{" "}
                      Inner and outer rows, typically at 2.1&thinsp;m to
                      2.4&thinsp;m centres along the length
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Ledgers:</strong>{" "}
                      Horizontal tubes running along the scaffold at each lift
                      height, connecting standards longitudinally
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Transoms:</strong>{" "}
                      Horizontal tubes running across the scaffold between inner
                      and outer standards, supporting the scaffold boards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Bracing:</strong>{" "}
                      Diagonal braces (facade bracing and ledger bracing) to
                      prevent racking and provide lateral stability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Ties:</strong> Connected to
                      the building at specified intervals to prevent the
                      scaffold from pulling away or overturning in wind
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  When Independent Scaffolding Is Used
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      New-build construction where walls cannot yet support
                      putlogs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Renovation or refurbishment of completed buildings where
                      the facade must not be penetrated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Any application requiring a fully self-supporting
                      structure that does not load the building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Multi-trade access &mdash; providing working platforms for
                      bricklayers, electricians, cladding installers, painters,
                      and others
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Independent scaffolding uses more material than putlog
                scaffolding because it requires a full outer and inner row of
                standards and transoms. However, this additional material
                provides a stronger, more versatile structure that is suitable
                for a wider range of applications and does not depend on the
                building for any part of its support.
              </p>
            </div>
          </div>
        </section>

        {/* ── 02: Putlog Scaffolding ─────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Putlog Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Putlog scaffolding uses a <strong>single row of standards</strong>{" "}
                set away from the building face, with horizontal members called{" "}
                <strong>putlogs</strong> extending from the outer ledger into the{" "}
                bed joints of the brickwork being laid. The inner end of each
                putlog is flattened (a &ldquo;blade&rdquo;) so it can sit in the
                mortar bed between courses of bricks.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Limitation:</strong>{" "}
                  Putlog scaffolding can{" "}
                  <strong>only be used during bricklaying or masonry work</strong>.
                  Because the putlogs are inserted into the bed joints as the
                  wall is built up, the scaffold depends on the wall for
                  support. Once the wall is complete, putlog scaffolding cannot
                  be used because the putlogs cannot be inserted without
                  disturbing the finished brickwork.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Structural Characteristics
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Single row of standards:</strong>{" "}
                      Only the outer row is erected &mdash; no inner row of
                      standards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Putlogs:</strong>{" "}
                      Horizontal tubes with a flattened blade end inserted into
                      the brickwork bed joints at each lift
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Ledgers:</strong>{" "}
                      Horizontal tubes along the outer face connecting the
                      standards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Less material:</strong>{" "}
                      Uses approximately 40% less tube and fitting than
                      independent scaffolding for the same facade area
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Safety Requirements for Putlog Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Putlogs must be properly inserted into the bed joints with
                      the blade sitting flat and fully supported by the mortar
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The wall must be strong enough to support the putlog
                      loads &mdash; fresh brickwork needs time to gain strength
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Putlogs must not be removed before the scaffold above them
                      has been dismantled
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      The scaffold must still be tied to the building at the
                      required intervals for stability
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Hazard
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If putlogs are not properly inserted or the brickwork is too
                  green (not yet cured), the putlog can slip out of the wall
                  under load, causing a localised collapse of the working
                  platform. This is one of the most common causes of scaffold
                  accidents involving putlog systems. Always ensure putlogs are
                  correctly bedded and the mortar has sufficient strength before
                  loading the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ── 03: System Scaffolding ─────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            System Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                System scaffolding (also called modular scaffolding) uses{" "}
                <strong>pre-engineered components</strong> that slot, clip, or
                wedge together at fixed node points on the standards. Unlike
                traditional tube-and-fitting scaffolding where every connection
                requires a separate coupler, system scaffold components are
                designed to connect directly to each other.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Common Systems:</strong>{" "}
                  The most widely used system scaffolds in the UK include{" "}
                  <strong>Layher Allround</strong>,{" "}
                  <strong>HAKI Universal</strong>,{" "}
                  <strong>Cuplok (SGB/BRAND)</strong>, and{" "}
                  <strong>Kwikstage</strong>. Each system has its own connection
                  method &mdash; rosette (Layher), cup-and-blade (Cuplok),
                  wedge (Kwikstage) &mdash; but the principle is the same:
                  faster, more consistent assembly with fewer loose fittings.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Advantages of System Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Faster erection:</strong>{" "}
                      Components slot together without individual couplers,
                      reducing erection time by up to 50% compared to
                      tube-and-fitting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Consistent quality:</strong>{" "}
                      Fixed node points mean components always connect at the
                      correct spacing &mdash; reducing errors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Fewer loose components:
                      </strong>{" "}
                      No loose couplers to drop, lose, or incorrectly tighten
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Higher load capacity:</strong>{" "}
                      Node-point connections typically give higher load ratings
                      than individual couplers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Versatility:</strong>{" "}
                      System scaffolds can form straight runs, corners, circular
                      shapes, and complex geometries using standard components
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Training Still Required
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Despite being easier to assemble than tube-and-fitting,
                  system scaffolding{" "}
                  <strong className="text-white">
                    still requires trained and competent erectors
                  </strong>
                  . CISRS (Construction Industry Scaffolders Record Scheme)
                  training covers system scaffolding, and most manufacturers
                  also provide specific product training. Untrained workers must
                  never attempt to erect, alter, or dismantle system
                  scaffolding.
                </p>
              </div>

              <p>
                System scaffolding is now the dominant type on large commercial,
                industrial, and infrastructure projects in the UK. It is
                increasingly common on housing sites as well, particularly for
                multi-storey developments. Traditional tube-and-fitting remains
                important for bespoke or complex configurations that do not suit
                standard modular components.
              </p>
            </div>
          </div>
        </section>

        {/* ── 04: Mobile Scaffold Towers ─────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Mobile Scaffold Towers
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mobile scaffold towers are lightweight,{" "}
                <strong>aluminium-framed structures on lockable castors</strong>{" "}
                (wheels). They are designed for short-duration work at height
                where a full scaffold is not justified. They are widely used by
                electricians, painters, decorators, M&amp;E installers, and
                maintenance teams.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Training Requirement:
                  </strong>{" "}
                  <strong>PASMA</strong> (Prefabricated Access Suppliers&rsquo;
                  and Manufacturers&rsquo; Association) training is the
                  industry-recognised standard for assembling, using, inspecting,
                  and dismantling mobile scaffold towers. PASMA training covers
                  the 3T method (Through the Trap) or Advance Guard Rail (AGR)
                  system for safe assembly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key Safety Rules for Mobile Towers
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Lock all castors:
                      </strong>{" "}
                      All four castors must be locked before anyone climbs or
                      works on the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Height-to-base ratio:
                      </strong>{" "}
                      Maximum 3.5:1 outdoors and 3:1 indoors (unless
                      stabilisers or outriggers are used) &mdash; always follow
                      the manufacturer&rsquo;s specific instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Outriggers/stabilisers:
                      </strong>{" "}
                      Required for taller configurations to increase the
                      effective base width and prevent overturning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Never move while occupied:
                      </strong>{" "}
                      The tower must never be moved with anyone on the platform
                      or with tools and materials on the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Level ground:</strong> The
                      tower must be erected on firm, level ground &mdash;
                      adjustable legs can compensate for minor slopes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Wind conditions:
                      </strong>{" "}
                      Do not use outdoors in high winds &mdash; typically above
                      17&thinsp;mph (Beaufort force 4) for standard towers
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Common Uses for Mobile Towers
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Electrical installation and maintenance &mdash; cable
                      tray, containment, lighting, fire alarms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Painting and decorating at height in rooms and corridors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Building maintenance &mdash; changing lights, accessing
                      services, inspecting ceilings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Short-duration external work where a full scaffold is not
                      proportionate
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ── 05: Cantilever Scaffolding ─────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            Cantilever Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cantilever scaffolding <strong>projects outward</strong> from the
                building face, supported by horizontal beams called{" "}
                <strong>needles</strong> that pass through the building wall (or
                window openings), or by cantilever frames attached to the main
                scaffold structure. The projecting platform is supported from
                below by the needles rather than from the ground.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  When Cantilever Scaffolding Is Used
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Over public footpaths or roads where ground-level
                      standards cannot be placed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      At building overhangs, set-backs, or projections where the
                      scaffold line changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      For loading bays that need to project beyond the main
                      scaffold line
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Where restricted ground access prevents a standard
                      scaffold from being erected at ground level
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Design and Safety Considerations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Requires specific design:
                      </strong>{" "}
                      Cantilever scaffolds are non-standard and must be designed
                      by a competent person for each application
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Needle support:</strong>{" "}
                      The inner end of the needle must be adequately
                      counterweighted or anchored to prevent the cantilever from
                      tipping
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Wall strength:
                      </strong>{" "}
                      The building wall or structure must be capable of
                      supporting the needle loads without damage or failure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Load limits:</strong>{" "}
                      Cantilever platforms have strict load limits that must be
                      clearly marked and communicated to all users
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Non-Standard Scaffold
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Cantilever scaffolding is classified as a{" "}
                  <strong className="text-white">non-standard scaffold</strong>{" "}
                  under NASC guidance. This means it falls outside the scope of
                  standard solutions (such as TG20 compliance sheets for basic
                  independent scaffolds) and requires a{" "}
                  <strong className="text-white">
                    scaffold-specific design
                  </strong>{" "}
                  produced by a competent designer. The design must be available
                  on site, and the scaffold must be erected strictly in
                  accordance with it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 06: Suspended Scaffolding ──────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            Suspended Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Suspended scaffolding consists of{" "}
                <strong>
                  platforms hung from the roof or structure above
                </strong>{" "}
                by wire ropes or chains. The platform can be raised and lowered
                to provide access to the building facade at any height without
                requiring a ground-based scaffold structure. It is commonly used
                for building maintenance, window cleaning at height, and work on
                tall structures.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Types of Suspended Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Cradles:</strong> Enclosed
                      or semi-enclosed platforms for one or more workers,
                      suspended from davit arms or outrigger beams on the roof
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Bosun&rsquo;s chairs:
                      </strong>{" "}
                      Single-person seats suspended by rope for lightweight
                      inspection or maintenance tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Powered platforms:
                      </strong>{" "}
                      Motorised cradles with electric or hydraulic hoists for
                      raising and lowering
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Manual platforms:
                      </strong>{" "}
                      Hand-operated hoists &mdash; now less common due to the
                      effort and safety concerns
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    LOLER Compliance:
                  </strong>{" "}
                  Suspended scaffolding is classified as{" "}
                  <strong>lifting equipment</strong> under the Lifting Operations
                  and Lifting Equipment Regulations 1998 (LOLER). This means it
                  requires:{" "}
                  <strong>
                    thorough examination by a competent person every 6 months
                  </strong>{" "}
                  (because it lifts persons), a{" "}
                  <strong>written scheme of examination</strong>, and every
                  lifting operation must be{" "}
                  <strong>properly planned, supervised, and carried out safely</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Safety Requirements for Suspended Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Roof anchor points:
                      </strong>{" "}
                      Davit arms or outrigger beams must be rated for the
                      intended load and properly secured to the roof structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Wire ropes:</strong>{" "}
                      Must be inspected before each use for damage, wear, or
                      corrosion &mdash; and replaced at specified intervals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Secondary safety ropes:
                      </strong>{" "}
                      Independent safety lines with fall arresters are required
                      as a backup in case the primary suspension fails
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Personal fall protection:
                      </strong>{" "}
                      Workers must wear harnesses clipped to independent
                      anchorage points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Wind restrictions:
                      </strong>{" "}
                      Suspended platforms must not be used in high winds &mdash;
                      the risk of swinging, collision with the building face,
                      and loss of control increases significantly
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Suspended scaffolding is particularly common on high-rise
                buildings where erecting a full ground-based scaffold to the
                entire height would be impractical or uneconomic. It is also the
                standard method for routine facade maintenance and window
                cleaning on commercial buildings with permanently installed
                davit systems on the roof.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── 07: Birdcage Scaffolding ───────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Birdcage Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Birdcage scaffolding is a{" "}
                <strong>freestanding scaffold structure</strong> that provides
                access to ceilings, soffits, or overhead areas over a{" "}
                <strong>large internal area</strong>. It consists of multiple
                rows of standards arranged in a grid pattern, all supporting a
                working platform at the top. The name comes from its appearance
                &mdash; a forest of vertical standards resembling the bars of a
                birdcage.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Structural Characteristics
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Multiple rows of standards:
                      </strong>{" "}
                      Arranged in a grid pattern covering the entire work area
                      below the ceiling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Single working platform:
                      </strong>{" "}
                      The platform is at the top level only, close to the
                      ceiling or soffit being accessed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Ledgers:</strong>{" "}
                      Horizontal tubes connecting standards in both directions
                      at each lift
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">Bracing:</strong>{" "}
                      Diagonal braces in both directions to prevent racking
                      &mdash; critical for stability in a freestanding structure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      <strong className="text-white">
                        Access:
                      </strong>{" "}
                      Internal ladders or stair towers provide access from
                      ground level to the working platform
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Common Uses for Birdcage Scaffolding
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Ceiling work &mdash; plastering, painting, installing
                      suspended ceilings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      M&amp;E (mechanical and electrical) installation &mdash;
                      cable trays, containment, lighting, HVAC ductwork, fire
                      suppression systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Church and heritage building restoration &mdash; accessing
                      ornate ceilings, stained glass, or roof structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Warehouse and industrial facility maintenance &mdash;
                      accessing high-level services and roof structures
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Bracing Is Critical
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Because birdcage scaffolding is freestanding and covers a
                  large area, it is{" "}
                  <strong className="text-white">
                    particularly vulnerable to racking
                  </strong>{" "}
                  (sideways distortion). Adequate diagonal bracing in both
                  directions is essential. Without proper bracing, the entire
                  structure can collapse progressively. The scaffold must also be
                  designed for the specific loads it will carry &mdash; including
                  the weight of workers, tools, and materials on the platform.
                </p>
              </div>

              <p>
                Birdcage scaffolding is particularly useful where the entire
                ceiling area needs to be accessed simultaneously by multiple
                trades. It provides a large, continuous working platform that
                allows workers to move freely across the full area. However, it
                uses a considerable amount of material and takes up significant
                floor space, which must be planned for in the project programme.
              </p>
            </div>
          </div>
        </section>

        {/* ── 08: Specialist Scaffolding ─────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Specialist Scaffolding
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the main scaffold types, a range of{" "}
                <strong>specialist scaffold structures</strong> are used on UK
                construction sites for specific purposes. These are typically
                built into or onto the main scaffold and require dedicated
                design from a competent person.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Truss-Out Scaffolds
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Projecting platforms supported by triangulated truss
                        frames attached to the main scaffold
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Used where the scaffold line needs to extend beyond the
                        main structure &mdash; for example, at building
                        set-backs or over obstructions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        The truss transfers the load back into the main scaffold
                        rather than through the building wall (unlike cantilever
                        needles)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Loading Bays
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Reinforced platforms within the scaffold designed for
                        receiving and distributing materials at height
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Fitted with loading gates that open inward &mdash; never
                        outward &mdash; to prevent accidental falls
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Maximum safe working load (SWL) must be clearly marked
                        and never exceeded
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        The scaffold beneath a loading bay must be designed to
                        carry the concentrated point loads
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Protection Fans
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Angled platforms (typically at 45 degrees) that project
                        outward from the scaffold to catch falling debris
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Positioned above public areas, pedestrian routes, or
                        adjacent properties to protect people below
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Typically boarded with scaffold boards or plywood and
                        fitted with a brick guard along the outer edge
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Temporary Roofs
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Scaffold-supported structures providing weather
                        protection during construction or renovation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Sheeted with tarpaulins or purpose-made covers to keep
                        rain, snow, and wind off the work area
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Commonly used during roof replacements, heritage
                        restoration, and work where weather protection is
                        critical
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        Must be designed for wind loading &mdash; a temporary
                        roof significantly increases the wind load on the
                        scaffold
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Industry-Specific Scaffolding
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        <strong className="text-white">Offshore:</strong>{" "}
                        Scaffolding on oil rigs, wind turbine platforms, and
                        marine structures &mdash; subject to additional
                        regulations and extreme environmental loads
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        <strong className="text-white">Industrial:</strong>{" "}
                        Scaffolding in refineries, power stations, and
                        processing plants &mdash; often involving high
                        temperatures, chemical exposure, or confined spaces
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                      <span>
                        <strong className="text-white">Events:</strong>{" "}
                        Temporary structures for stages, seating, lighting rigs,
                        and crowd barriers &mdash; subject to specific
                        structural and fire safety requirements
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Common Thread:
                  </strong>{" "}
                  All specialist scaffold structures require{" "}
                  <strong>specific design by a competent person</strong>. They
                  fall outside the scope of standard scaffold solutions (such as
                  TG20 compliance sheets) and must have a design drawing or
                  specification available on site before erection begins. The
                  erectors must be briefed on the design and must follow it
                  precisely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Diagram: Scaffold Types Comparison ─────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <MoveHorizontal className="h-5 w-5 text-slate-400" />
            Scaffold Types Comparison
          </h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-[540px]">
              {/* Independent */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">IN</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Independent</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Standards</span>
                    <span className="text-white font-medium">2 rows</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Building support</span>
                    <span className="text-white font-medium">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">CISRS</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">New-builds, refurb, multi-trade</p>
                </div>
              </div>

              {/* Putlog */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">PL</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Putlog</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Standards</span>
                    <span className="text-white font-medium">1 row</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Building support</span>
                    <span className="text-white font-medium">Wall (putlogs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">CISRS</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">Bricklaying &amp; masonry only</p>
                </div>
              </div>

              {/* System */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">SY</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">System</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Standards</span>
                    <span className="text-white font-medium">Modular</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Building support</span>
                    <span className="text-white font-medium">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">CISRS</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">Commercial, industrial, infra</p>
                </div>
              </div>

              {/* Mobile Tower */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">MT</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Mobile Tower</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Standards</span>
                    <span className="text-white font-medium">Aluminium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Building support</span>
                    <span className="text-white font-medium">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">PASMA</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">Short-duration, maintenance</p>
                </div>
              </div>

              {/* Cantilever */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">CL</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Cantilever</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Support</span>
                    <span className="text-white font-medium">Needles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Design</span>
                    <span className="text-white font-medium">Specific</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">CISRS</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">Overhangs, loading bays</p>
                </div>
              </div>

              {/* Suspended */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">SU</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Suspended</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Support</span>
                    <span className="text-white font-medium">Wire ropes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Regulation</span>
                    <span className="text-white font-medium">LOLER</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">Specific</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">Maintenance, high-rise</p>
                </div>
              </div>

              {/* Birdcage */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">BC</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Birdcage</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Standards</span>
                    <span className="text-white font-medium">Grid pattern</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Platform</span>
                    <span className="text-white font-medium">Top only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">CISRS</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">Ceilings, soffits, M&amp;E</p>
                </div>
              </div>

              {/* Specialist */}
              <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
                <div className="bg-slate-500/10 border-b border-slate-500/30 px-3 py-2.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400/30 to-slate-600/30 border-2 border-slate-400/40 mx-auto mb-1.5 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300">SP</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Specialist</p>
                </div>
                <div className="px-3 py-2.5 space-y-1.5 text-[11px] text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Types</span>
                    <span className="text-white font-medium">Multiple</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Design</span>
                    <span className="text-white font-medium">Specific</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Training</span>
                    <span className="text-white font-medium">CISRS+</span>
                  </div>
                  <hr className="border-white/10" />
                  <p className="text-white text-[10px]">Fans, roofs, bays, offshore</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Diagram: Independent vs Putlog Cross-Section ───────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Wrench className="h-5 w-5 text-slate-400" />
            Independent vs Putlog &mdash; Cross-Section Comparison
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Independent Cross-Section */}
            <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
              <div className="bg-slate-500/10 border-b border-slate-500/30 px-4 py-3 text-center">
                <p className="text-sm font-bold text-slate-400">
                  Independent Scaffold
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  Cross-section (end view)
                </p>
              </div>
              <div className="px-4 py-4 space-y-3">
                {/* Visual representation */}
                <div className="bg-[#111] rounded-lg p-4 font-mono text-[11px] text-white/80 leading-relaxed">
                  <div className="text-center text-white/40 mb-2">
                    BUILDING FACE
                  </div>
                  <div className="border-l-2 border-white/20 pl-3 space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400">|</span>
                      <span className="text-white/30">
                        &larr; gap &rarr;
                      </span>
                      <span className="text-slate-400">|</span>
                      <span className="text-white/30">&larr; boards &rarr;</span>
                      <span className="text-slate-400">|</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-bold">
                        Inner std
                      </span>
                      <span className="text-white/20">
                        ====transom====
                      </span>
                      <span className="text-slate-300 font-bold">
                        Outer std
                      </span>
                    </div>
                    <div className="text-white/40 text-[10px] mt-1">
                      Two rows of standards + transoms
                    </div>
                  </div>
                </div>
                <ul className="text-[11px] text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Two rows of vertical standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Transoms span between inner and outer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Does NOT rely on the building</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Putlog Cross-Section */}
            <div className="bg-white/5 border border-slate-500/30 rounded-xl overflow-hidden">
              <div className="bg-slate-500/10 border-b border-slate-500/30 px-4 py-3 text-center">
                <p className="text-sm font-bold text-slate-400">
                  Putlog Scaffold
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  Cross-section (end view)
                </p>
              </div>
              <div className="px-4 py-4 space-y-3">
                {/* Visual representation */}
                <div className="bg-[#111] rounded-lg p-4 font-mono text-[11px] text-white/80 leading-relaxed">
                  <div className="text-center text-white/40 mb-2">
                    BUILDING FACE (brickwork)
                  </div>
                  <div className="border-l-2 border-white/20 pl-3 space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="text-amber-400/70">[blade]</span>
                      <span className="text-white/20">
                        ==putlog==
                      </span>
                      <span className="text-white/30">&larr; boards &rarr;</span>
                      <span className="text-slate-400">|</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-amber-400/60 text-[10px]">
                        in wall
                      </span>
                      <span className="text-white/20">
                        &mdash;&mdash;&mdash;&mdash;&mdash;&mdash;
                      </span>
                      <span className="text-slate-300 font-bold">
                        Outer std
                      </span>
                    </div>
                    <div className="text-white/40 text-[10px] mt-1">
                      One row of standards + putlogs into wall
                    </div>
                  </div>
                </div>
                <ul className="text-[11px] text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Single row of outer standards only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>
                      Putlog blade sits in brickwork bed joint
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>RELIES on the building wall for support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
            <p className="text-sm text-white">
              <strong className="text-slate-400">Key Comparison:</strong>{" "}
              Independent scaffolding uses approximately{" "}
              <strong>60% more material</strong> than putlog scaffolding for the
              same facade area because it requires a full inner row of
              standards and transoms. However, independent scaffolding is far
              more versatile &mdash; it works on any building type, does not
              depend on the wall for support, and can be used for all trades,
              not just bricklaying. Putlog scaffolding is limited to masonry
              work during construction.
            </p>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────────── */}
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

        {/* ── Quiz ───────────────────────────────────────────────── */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* ── Bottom Navigation ──────────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
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
            <Link to="../scaffolding-awareness-module-1-section-3">
              Next: Scaffold Terminology
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
