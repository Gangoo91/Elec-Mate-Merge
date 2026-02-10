import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Ruler,
  Layers,
  Construction,
  HardHat,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ─── Quick-check questions (InlineCheck) ─── */
const quickCheckQuestions = [
  {
    id: "qc1",
    question:
      "Under the Work at Height Regulations, which type of protection must always be considered first?",
    options: [
      "Personal fall protection",
      "Collective fall prevention",
      "Administrative controls",
      "Warning signs",
    ],
    correctIndex: 1,
    explanation:
      "The hierarchy of control requires collective protection measures — those that protect everyone without individual action — to be considered before personal protection systems.",
  },
  {
    id: "qc2",
    question:
      "What is the minimum top rail height specified by BS EN 13374 for guard rail systems?",
    options: ["750 mm", "850 mm", "950 mm", "1100 mm"],
    correctIndex: 2,
    explanation:
      "BS EN 13374 specifies a minimum top rail height of 950 mm (approximately 1 metre) to prevent people from toppling over the edge.",
  },
  {
    id: "qc3",
    question:
      "What is the maximum fall distance permitted when safety netting complies with EN 1263?",
    options: ["2 metres", "4 metres", "6 metres", "10 metres"],
    correctIndex: 2,
    explanation:
      "Safety nets complying with EN 1263 must be installed so the maximum fall distance from the working level to the net does not exceed 6 metres.",
  },
];

/* ─── FAQs ─── */
const faqs = [
  {
    question:
      "Why is collective protection always preferred over personal protection?",
    answer:
      "Collective protection safeguards everyone in the area simultaneously without relying on individual behaviour, training, or correct equipment use. It removes the risk at source rather than managing it person-by-person, which makes it more reliable and cost-effective for most work-at-height scenarios.",
  },
  {
    question: "Can free-standing edge protection move during use?",
    answer:
      "Free-standing edge protection is designed to remain stable through its own weight or counterbalance mechanism. However, it must be checked regularly for stability — wind loading, vibration from plant, or accidental impact can displace it. Manufacturers provide guidance on maximum spacing, surface requirements, and wind limitations.",
  },
  {
    question:
      "How often should safety nets be inspected once installed on site?",
    answer:
      "Safety nets should be inspected after initial installation, at regular intervals thereafter (usually weekly), after any event that could have caused damage (such as debris falling into the net), and before re-use if the net has been moved. A competent person must carry out each inspection.",
  },
  {
    question:
      "Are airbag fall arrest systems suitable for all types of work at height?",
    answer:
      "No. Airbag systems are designed for specific applications — typically low-level steel erection and roof work — where other collective protection is not reasonably practicable. They are not suitable where sharp or hot tools could puncture the bags, where the fall trajectory is unpredictable, or where the landing area cannot be fully covered.",
  },
];

/* ─── End-of-section quiz (8 questions) ─── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which British Standard covers the requirements for temporary edge protection systems (guard rails)?",
    options: ["BS EN 12811", "BS EN 13374", "BS EN 1263", "BS EN 795"],
    correctAnswer: 1,
    explanation:
      "BS EN 13374 specifies the requirements and test methods for temporary edge protection systems used during construction and maintenance work.",
  },
  {
    id: 2,
    question:
      "What is the required height of the toe board on a guard rail system?",
    options: [
      "At least 50 mm",
      "At least 100 mm",
      "At least 150 mm",
      "At least 200 mm",
    ],
    correctAnswer: 2,
    explanation:
      "The toe board must be at least 150 mm high to prevent tools, materials, and debris from being kicked or rolling off the edge.",
  },
  {
    id: 3,
    question:
      "Which of the following is NOT an example of collective fall prevention?",
    options: [
      "Guard rails",
      "Safety netting",
      "A full body harness",
      "Safety decking",
    ],
    correctAnswer: 2,
    explanation:
      "A full body harness is personal fall protection equipment. Collective measures — guard rails, netting, decking — protect everyone in the area without individual equipment.",
  },
  {
    id: 4,
    question:
      "At approximately what height should the mid rail be positioned on a standard guard rail system?",
    options: ["250 mm", "350 mm", "470 mm", "600 mm"],
    correctAnswer: 2,
    explanation:
      "The intermediate (mid) rail should be positioned at approximately 470 mm — roughly halfway between the toe board and top rail — to prevent a person falling between the two.",
  },
  {
    id: 5,
    question:
      "Safety nets complying with EN 1263 are positioned to catch a person who has fallen. What is the key advantage of safety netting over personal harnesses?",
    options: [
      "Netting is cheaper to purchase",
      "Netting protects everyone in the work area without individual training or equipment",
      "Netting allows a longer fall distance",
      "Netting can be re-used indefinitely without inspection",
    ],
    correctAnswer: 1,
    explanation:
      "The main advantage is that netting provides collective protection — it safeguards every person working above it without requiring them to wear, inspect, or correctly use personal equipment.",
  },
  {
    id: 6,
    question:
      "What is the primary purpose of safety decking installed below a working level?",
    options: [
      "To provide additional storage space for tools",
      "To prevent falls through openings in the working platform",
      "To reduce noise from work above",
      "To provide a walkway for site visitors",
    ],
    correctAnswer: 1,
    explanation:
      "Safety decking is a close-boarded platform installed below the working level. Its primary purpose is to prevent people and materials from falling through gaps, openings, or incomplete floor areas.",
  },
  {
    id: 7,
    question:
      "When using scaffolding as collective fall prevention, what TWO features are essential for it to serve this purpose?",
    options: [
      "Painted uprights and weather sheeting",
      "Properly boarded platforms and full guard railing",
      "Ladder access and a loading bay",
      "Brick guards and debris netting only",
    ],
    correctAnswer: 1,
    explanation:
      "Scaffolding functions as collective protection when it has fully boarded working platforms (so no one can fall through) and compliant guard railing with top rail, mid rail, and toe board around all open edges.",
  },
  {
    id: 8,
    question:
      "Which class of guard rail system under BS EN 13374 is designed to resist dynamic forces from a person falling down a sloped surface?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    correctAnswer: 2,
    explanation:
      "BS EN 13374 defines three classes: Class A for flat/low-slope surfaces (static loads only), Class B for slopes where a person could slide towards the edge (limited dynamic loads), and Class C for steep slopes where a falling person generates significant dynamic forces.",
  },
];

/* ─── FAQ accordion item ─── */
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full min-h-[52px] flex items-center justify-between gap-3 px-4 py-3.5 text-left text-white hover:bg-white/5 transition-colors touch-manipulation active:scale-[0.99]"
      >
        <span className="text-sm sm:text-base font-medium leading-relaxed flex-1">
          {question}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-amber-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/40 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-white/70 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/*  MAIN COMPONENT                                                              */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function WorkingAtHeightModule3Section1() {
  useSEO({
    title:
      "Collective Fall Prevention | Module 3 Section 1 | Working at Height",
    description:
      "Guard rails, edge protection, safety netting, safety decking, airbags, catch platforms, and scaffolding as collective fall prevention for working at height.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky nav bar ── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article body ── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <ShieldCheck className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Collective Fall Prevention
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Guard rails, edge protection, safety netting, safety decking, airbags,
            catch platforms, and scaffolding — the collective measures that protect
            everyone working at height without relying on individual behaviour.
          </p>
        </header>

        {/* ── Quick Summary Boxes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Key Principle
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Collective protection always takes priority over personal
              protection in the hierarchy of control.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Why It Matters
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Collective measures protect everyone automatically — no
              training, fitting, or reliance on individual compliance needed.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Key Standard
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              BS EN 13374 specifies guard rail requirements; EN 1263 covers
              safety netting.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Electrician Context
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Solar PV, external lighting, and cable runs often require edge
              protection on roofs and elevated platforms.
            </p>
          </div>
        </div>

        {/* ── Learning Outcomes ── */}
        <div className="mb-12 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-amber-500" />
            Learning Outcomes
          </h2>
          <div className="space-y-3">
            {[
              "Explain why collective protection is preferred over personal protection in the hierarchy of control",
              "State the BS EN 13374 requirements for guard rail systems including top rail height, mid rail, and toe board",
              "Describe the differences between permanent and temporary edge protection systems",
              "Explain how safety netting, safety decking, airbags, and catch platforms function as fall prevention",
              "Identify when scaffolding serves as collective protection and what features are required",
              "Apply collective fall prevention principles to common electrical work-at-height scenarios",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 01 — Collective vs Personal Protection                */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Collective vs Personal Protection
              </h2>
              <p className="text-white/50 text-sm">
                Understanding the hierarchy of control
              </p>
            </div>
          </div>
          <div className="border-l-2 border-amber-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The Work at Height Regulations 2005 establish a clear hierarchy
              when selecting fall prevention measures. Before any personal
              protection system is considered, employers must first evaluate
              whether the risk can be managed through <strong className="text-amber-400">collective
              protection</strong> — measures that safeguard every person in the
              work area simultaneously.
            </p>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Collective protection works passively. Once installed, it does
              not depend on any individual wearing equipment correctly,
              clipping on to an anchor, or remembering to check their harness
              before each use. This removes the &ldquo;human factor&rdquo;
              that accounts for a significant proportion of fall-from-height
              incidents.
            </p>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <h3 className="text-amber-400 text-sm font-semibold mb-3">
                Why collective protection is preferred:
              </h3>
              <div className="space-y-2">
                {[
                  "Protects everyone in the area — workers, supervisors, visitors",
                  "No training burden for individual users beyond general site induction",
                  "No reliance on individual behaviour — the system works whether or not a person remembers to use it",
                  "Typically lower ongoing cost than issuing and inspecting personal equipment for every worker",
                  "Reduces the need for rescue plans — a guard rail prevents the fall entirely, whereas a harness requires a rescue procedure if someone is left suspended",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-amber-400 text-sm font-semibold">
                  Important
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Personal protection — such as harnesses and lanyards — should
                only be used when collective protection is{" "}
                <strong className="text-white">
                  not reasonably practicable
                </strong>
                . &ldquo;Not reasonably practicable&rdquo; does not mean
                inconvenient or expensive; it means the cost, time, and
                effort of collective measures would be grossly
                disproportionate to the risk reduction achieved.
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 02 — Guard Rails                                      */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-blue-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Guard Rails — BS EN 13374
              </h2>
              <p className="text-white/50 text-sm">
                Requirements, classes, and specification
              </p>
            </div>
          </div>
          <div className="border-l-2 border-blue-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Guard rails are the most common form of collective edge
              protection on construction sites. BS EN 13374 sets out the
              design, testing, and performance requirements for temporary
              edge protection systems. The standard defines three classes
              based on the slope of the working surface and the forces the
              system must withstand.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="text-blue-400 text-sm font-semibold mb-2">
                  Class A — Flat / Low Slope
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  For surfaces up to 10° slope. Resists static loads only
                  (a person leaning against the rail). Suitable for most
                  floor edges, flat roofs, and level scaffold platforms.
                </p>
              </div>
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="text-blue-400 text-sm font-semibold mb-2">
                  Class B — Medium Slope
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  For surfaces between 10° and 30°. Must resist limited
                  dynamic loads — a person sliding towards the edge under
                  gravity. More robust posts and connections required.
                </p>
              </div>
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="text-blue-400 text-sm font-semibold mb-2">
                  Class C — Steep Slope
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  For surfaces between 30° and 45°. Must arrest a person
                  falling/sliding down the slope — significant dynamic
                  impact forces. Typically uses wire rope or mesh infill
                  panels rather than simple tube-and-fitting rails.
                </p>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h4 className="text-amber-400 text-sm font-semibold mb-2">
                  Beyond 45°
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Surfaces steeper than 45° are considered vertical — guard
                  rails alone are not sufficient. Other measures such as
                  scaffolding, rope access, or MEWPs must be considered.
                </p>
              </div>
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Guard Rail Component Requirements
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              A compliant guard rail system under BS EN 13374 comprises three
              essential elements, each with defined minimum dimensions:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Top rail</strong> —
                  minimum 950 mm above the working surface. This is the
                  primary barrier preventing a person from toppling over
                  the edge.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">
                    Intermediate (mid) rail
                  </strong>{" "}
                  — positioned at approximately 470 mm above the working
                  surface (roughly halfway between the toe board and top
                  rail). Prevents a person slipping or rolling under the
                  top rail.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  <strong className="text-white">Toe board</strong> —
                  minimum 150 mm high. Prevents tools, materials, and
                  debris from falling off the edge — protecting people
                  working below as well as preventing trip hazards.
                </span>
              </div>
            </div>

            {/* ── Guard Rail Specification Diagram ── */}
            <div className="my-6 rounded-xl border border-white/10 bg-[#111] p-5 sm:p-6">
              <h4 className="text-amber-400 text-sm font-semibold mb-4 text-center">
                Guard Rail Specification — Cross-Section
              </h4>
              <div className="relative max-w-md mx-auto">
                {/* Top rail */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-2 flex-1 bg-amber-500 rounded" />
                  <span className="text-xs text-white/60 flex-shrink-0 w-24 text-right">
                    Top Rail
                  </span>
                </div>
                {/* Dimension — 950mm */}
                <div className="flex items-center gap-3 my-0.5">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="border-l border-dashed border-white/30 h-8" />
                  </div>
                  <span className="text-xs text-amber-400 font-semibold flex-shrink-0 w-24 text-right">
                    ↕ 950 mm min
                  </span>
                </div>
                {/* Mid rail */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-1.5 flex-1 bg-blue-400 rounded" />
                  <span className="text-xs text-white/60 flex-shrink-0 w-24 text-right">
                    Mid Rail
                  </span>
                </div>
                {/* Dimension — 470mm */}
                <div className="flex items-center gap-3 my-0.5">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="border-l border-dashed border-white/30 h-8" />
                  </div>
                  <span className="text-xs text-blue-400 font-semibold flex-shrink-0 w-24 text-right">
                    ↕ ~470 mm
                  </span>
                </div>
                {/* Toe board */}
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-4 flex-1 bg-green-500/80 rounded" />
                  <span className="text-xs text-white/60 flex-shrink-0 w-24 text-right">
                    Toe Board
                  </span>
                </div>
                {/* Dimension — 150mm */}
                <div className="flex items-center gap-3 my-0.5">
                  <div className="flex-1" />
                  <span className="text-xs text-green-400 font-semibold flex-shrink-0 w-24 text-right">
                    ↕ 150 mm min
                  </span>
                </div>
                {/* Platform */}
                <div className="flex items-center gap-3 mt-1">
                  <div className="h-3 flex-1 bg-white/20 rounded" />
                  <span className="text-xs text-white/40 flex-shrink-0 w-24 text-right">
                    Working Platform
                  </span>
                </div>
              </div>
              <p className="text-center text-white/40 text-xs mt-4">
                Cross-section view — not to scale. Posts and fixings omitted
                for clarity.
              </p>
            </div>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Guard rail posts must be securely fixed to the structure —
              either clamped, bolted, or counterweighted. The maximum gap
              between any two elements of the system (e.g., between the mid
              rail and the toe board top) must not allow a 470 mm sphere to
              pass through, ensuring nobody can slip between the rails.
            </p>
          </div>
        </section>

        {/* ── Inline Check 1 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 03 — Edge Protection Systems                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-green-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Edge Protection Systems
              </h2>
              <p className="text-white/50 text-sm">
                Permanent vs temporary, free-standing vs fixed
              </p>
            </div>
          </div>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Edge protection systems fall into two broad categories based on
              how they are installed and how long they remain in place.
              Understanding the difference is essential for selecting the
              right system for your work scope.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <h4 className="text-green-400 text-sm font-semibold mb-2">
                  Permanent Edge Protection
                </h4>
                <div className="space-y-2">
                  {[
                    "Designed to remain in place for the life of the building",
                    "Typically parapet walls, permanent handrails, or integrated roof edge barriers",
                    "Installed during original construction or as a retrofit",
                    "Provides ongoing protection for maintenance workers, window cleaners, and anyone accessing the roof",
                    "Must be included in the building's maintenance schedule and inspected periodically",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <h4 className="text-green-400 text-sm font-semibold mb-2">
                  Temporary Edge Protection
                </h4>
                <div className="space-y-2">
                  {[
                    "Erected for the duration of the work and then removed",
                    "Includes scaffold guard rails, temporary post-and-rail systems, and free-standing barriers",
                    "Must comply with BS EN 13374 during use",
                    "Requires a specific erection and dismantling plan, often by a competent scaffolder",
                    "Must be inspected before first use and at regular intervals while in place",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Free-Standing vs Fixed Systems
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Within temporary edge protection, there are two installation
              methods. Each has advantages depending on the structure and
              access requirements:
            </p>

            <div className="space-y-4 mt-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Free-Standing Systems
                </h4>
                <div className="space-y-2">
                  {[
                    "Stability provided by weighted counterbalance bases — no drilling or clamping into the structure required",
                    "Quick to install and reposition — ideal for flat roofs and concrete decks",
                    "No penetration of the waterproof membrane — important for roof work",
                    "Must be positioned correctly according to manufacturer's instructions — base distance from edge, minimum weight, and wind limitations all apply",
                    "Not suitable for sloped surfaces above approximately 5° without additional measures",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Fixed (Clamped / Bolted) Systems
                </h4>
                <div className="space-y-2">
                  {[
                    "Attached directly to the structure using clamps, bolts, or sockets",
                    "Can be used on sloped surfaces — essential for Class B and Class C situations",
                    "Posts are rigidly connected, providing higher load resistance than free-standing alternatives",
                    "May require engineering assessment of the structure's capacity to support the fixing loads",
                    "Installation and removal may cause minor damage to surfaces — cosmetic repair may be needed",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 04 — Safety Netting                                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-purple-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Safety Netting
              </h2>
              <p className="text-white/50 text-sm">
                EN 1263 requirements and installation principles
              </p>
            </div>
          </div>
          <div className="border-l-2 border-purple-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Safety nets are a collective fall arrest system. Unlike guard
              rails, which <em>prevent</em> a fall from occurring, safety
              nets <em>catch</em> a person who has already fallen. They are
              installed below the working level and absorb the energy of the
              fall through controlled deformation of the net mesh.
            </p>

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <h4 className="text-purple-400 text-sm font-semibold mb-3">
                EN 1263 — Key Requirements
              </h4>
              <div className="space-y-2">
                {[
                  "Maximum fall distance from working level to net: 6 metres",
                  "Net must have sufficient clearance below to allow for deflection without the fallen person striking the surface beneath",
                  "Minimum mesh size and breaking strength are specified — nets must be tested by the manufacturer",
                  "Border ropes must be secured to the support structure at intervals no greater than 2.5 metres",
                  "Nets must overlap by at least 2 metres where two nets are joined, or be laced together with approved cord",
                  "Test certificates must accompany every net delivered to site, showing compliance with EN 1263",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-white font-semibold text-base mt-4 mb-3">
              Installation Considerations
            </h3>
            <div className="space-y-2">
              {[
                "Nets must be installed by competent riggers who have received specific training",
                "Attachment points must be checked by a structural engineer if there is any doubt about their capacity",
                "Debris (tools, offcuts, fixings) must be cleared from the net regularly — accumulated weight reduces its effectiveness",
                "Any net that has arrested a fall must be removed from service and inspected before re-use",
                "Weather exposure, UV degradation, and chemical contamination all affect net lifespan — inspect regularly",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 mt-4">
              <div className="flex items-start gap-2 mb-2">
                <Info className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-purple-400 text-sm font-semibold">
                  Electrician Note
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                You are unlikely to install safety nets yourself, but you
                may work above them during steel-frame, roof, or atrium
                projects. Always check that the net is current (within its
                inspection date), that your tools are tethered, and that you
                do not store materials on the net surface.
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 05 — Safety Decking                                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-cyan-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Safety Decking
              </h2>
              <p className="text-white/50 text-sm">
                Close-boarded platforms preventing falls through openings
              </p>
            </div>
          </div>
          <div className="border-l-2 border-cyan-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Safety decking consists of close-boarded platforms installed
              below the working level to prevent people and objects from
              falling through gaps, openings, or incomplete floor areas. It
              is widely used in steel-frame and concrete-frame construction
              where floor slabs have not yet been cast or where services
              penetrations create fall hazards.
            </p>

            <div className="space-y-2">
              {[
                "Boards must be fully supported, close-butted (minimal gaps), and secured against displacement by wind or vibration",
                "Typically installed on steel beams or purlins using proprietary brackets or wire ties",
                "Must be able to support the weight of any person plus any load they are likely to carry — typically designed for a minimum of 2 kN point load",
                "Provides a secondary working platform — workers can stand on the decking to install services above",
                "Unlike netting, safety decking does not allow any fall at all — it is a physical barrier, not a catch system",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <h4 className="text-cyan-400 text-sm font-semibold mb-2">
                When is safety decking used?
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Safety decking is particularly effective in multi-storey
                construction where work is proceeding on several levels
                simultaneously. It protects workers on lower levels from
                falling objects as well as preventing falls through openings.
                In electrical work, you may encounter safety decking when
                running containment above suspended ceilings or pulling cables
                through floor voids in new-build projects.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 06 — Airbags & Catch Platforms                         */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-rose-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              06
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Airbags & Catch Platforms
              </h2>
              <p className="text-white/50 text-sm">
                Inflatable fall arrest and temporary platform systems
              </p>
            </div>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <h3 className="text-white font-semibold text-base mb-2">
              Inflatable Airbag Systems
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Airbag fall arrest systems use large inflatable cushions
              positioned below the working area to arrest a person&rsquo;s
              fall. They are kept constantly inflated by an electric blower
              and are designed to decelerate the body gradually, reducing
              injury. Airbags are commonly used in steel erection and
              industrial roof work where safety netting may be impractical.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <h4 className="text-rose-400 text-sm font-semibold mb-2">
                  Advantages
                </h4>
                <div className="space-y-2">
                  {[
                    "Quick to deploy and reposition as work progresses",
                    "No structural fixing required — systems are self-contained",
                    "Provides collective protection over a defined area",
                    "Can be used where net installation is not feasible",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <h4 className="text-rose-400 text-sm font-semibold mb-2">
                  Limitations
                </h4>
                <div className="space-y-2">
                  {[
                    "Not suitable where sharp or hot tools could puncture the bag",
                    "Requires continuous power supply for the blower",
                    "Wind can affect positioning and inflation on exposed sites",
                    "Coverage area is limited — multiple units may be needed for large spans",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-2">
              Catch Platforms
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Catch platforms (also known as catch fans or catch scaffolds)
              are temporary platforms positioned below the working area to
              catch any person or material that falls. They extend
              horizontally from the face of the building and are typically
              constructed from scaffold tube and boards.
            </p>

            <div className="space-y-2">
              {[
                "Width of the platform must be sufficient to catch a falling person — typically a minimum of 1.5 metres projection from the building face",
                "Must be close-boarded with no gaps exceeding 25 mm",
                "Guard rails required on the outer edge of the catch platform itself",
                "Must be regularly cleared of debris to maintain capacity",
                "Commonly seen on high-rise construction, façade repairs, and window installation projects",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 07 — Scaffolding as Collective Protection              */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              07
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Scaffolding as Collective Protection
              </h2>
              <p className="text-white/50 text-sm">
                Properly boarded and guard-railed working platforms
              </p>
            </div>
          </div>
          <div className="border-l-2 border-amber-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Scaffolding is perhaps the most familiar form of collective
              fall prevention for electricians. A properly erected scaffold
              provides a complete working platform at height, with guard
              rails, toe boards, and full boarding to prevent falls. It
              allows multiple trades to work safely at the same level
              without any personal fall protection equipment.
            </p>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <h4 className="text-amber-400 text-sm font-semibold mb-3">
                Requirements for scaffolding to serve as collective protection:
              </h4>
              <div className="space-y-2">
                {[
                  "Platforms must be fully boarded — no unboarded lifts, gaps wider than 25 mm, or missing boards",
                  "Guard rails on all open edges: top rail at minimum 950 mm, mid rail, and 150 mm toe board",
                  "Ladder access must be secured and extend at least 1 metre above the platform level",
                  "Scaffold must be erected, altered, and dismantled by competent persons (often CISRS-carded scaffolders)",
                  "A scaffold inspection register must be maintained — inspections before first use, after any event that could affect stability, and at intervals not exceeding 7 days",
                  "Loading limits must be clearly displayed — do not overload platforms with materials",
                  "Brick guards or debris netting may be required where there is a risk of materials falling onto people below",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <Construction className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-amber-400 text-sm font-semibold">
                  Electrician&rsquo;s Responsibilities on Scaffolding
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                As an electrician using a scaffold erected by others, you
                must:
              </p>
              <div className="space-y-2">
                {[
                  "Check the scaffold tag/handover certificate is current before using the scaffold",
                  "Never remove boards, guard rails, or ties — even temporarily — without authorisation from the scaffold supervisor",
                  "Report any damage, missing components, or concerns immediately",
                  "Do not overload the platform with cable drums, distribution boards, or heavy containment beyond the stated limit",
                  "Use the designated access (ladders/stairs) — do not climb the outside of the scaffold",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Scaffold Types Providing Collective Protection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Independent Tied Scaffold
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Free-standing structure tied to the building for stability.
                  Two rows of standards (uprights) connected by transoms and
                  ledgers. The most common external scaffold on construction
                  sites.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Putlog Scaffold
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Single row of standards with putlogs (short transoms)
                  built into the wall during brickwork. Only suitable for
                  new-build brickwork — cannot be used on completed
                  structures.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-white font-semibold text-sm mb-2">
                  Mobile Tower Scaffold
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Lightweight aluminium tower on castors. When correctly
                  assembled with guard rails and stabilisers, provides
                  collective protection for one or two workers. Must not be
                  moved while occupied.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h4 className="text-white font-semibold text-sm mb-2">
                  System Scaffold
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Proprietary systems (e.g., Layher, HAKI, Cuplock) with
                  pre-engineered connections. Faster to erect, consistent
                  quality, and built-in guard rail provisions at each lift.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Summary of Collective Measures                                 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-500" />
            Summary — Choosing the Right Collective Measure
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[500px] px-4 sm:px-0">
              <div className="rounded-xl border border-white/10 overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
                  <div className="p-3 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    Measure
                  </div>
                  <div className="p-3 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    How It Works
                  </div>
                  <div className="p-3 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    Best For
                  </div>
                </div>
                {/* Data rows */}
                {[
                  {
                    measure: "Guard Rails",
                    how: "Physical barrier at edge — prevents fall",
                    best: "Open edges, platforms, flat roofs",
                  },
                  {
                    measure: "Safety Netting",
                    how: "Catches a fallen person below working level",
                    best: "Large open areas, steel frames, atriums",
                  },
                  {
                    measure: "Safety Decking",
                    how: "Close-boarded platform blocks fall through openings",
                    best: "Floor voids, service penetrations, incomplete slabs",
                  },
                  {
                    measure: "Airbags",
                    how: "Inflatable cushions absorb fall energy",
                    best: "Steel erection, limited-area roof work",
                  },
                  {
                    measure: "Catch Platforms",
                    how: "Temporary platform projects from building face",
                    best: "Façade work, high-rise construction",
                  },
                  {
                    measure: "Scaffolding",
                    how: "Full working platform with guard rails",
                    best: "External walls, multi-level access",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-3 ${
                      i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                    } ${
                      i < 5 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <div className="p-3 text-white text-sm font-medium">
                      {row.measure}
                    </div>
                    <div className="p-3 text-white/70 text-sm leading-relaxed">
                      {row.how}
                    </div>
                    <div className="p-3 text-white/70 text-sm leading-relaxed">
                      {row.best}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Key Takeaways                                                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-400/5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <HardHat className="h-5 w-5 text-amber-500" />
              Key Takeaways
            </h2>
            <div className="space-y-3">
              {[
                "Always consider collective protection first — it protects everyone and does not rely on individual behaviour.",
                "Guard rails to BS EN 13374: top rail at 950 mm minimum, mid rail at ~470 mm, toe board at 150 mm minimum.",
                "Three classes of guard rail (A, B, C) match the slope and forces involved.",
                "Safety nets catch falls up to 6 m — they are collective fall arrest, not fall prevention.",
                "Safety decking prevents falls through openings by providing a solid platform below.",
                "Airbags and catch platforms are specialist collective measures for specific scenarios.",
                "Scaffolding is collective protection when fully boarded, guard-railed, and properly inspected.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Quiz                                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <Quiz
            questions={quizQuestions}
            title="Section 1 Quiz — Collective Fall Prevention"
          />
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  FAQs                                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Ruler className="h-5 w-5 text-amber-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
