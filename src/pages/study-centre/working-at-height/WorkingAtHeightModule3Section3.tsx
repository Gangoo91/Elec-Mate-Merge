import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Eye,
  Layers,
  Sun,
  Info,
  ChevronDown,
  ChevronUp,
  Zap,
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
      "If you are unsure whether a roof surface is fragile, what should you assume?",
    options: [
      "It is safe to walk on if it looks solid",
      "It is fragile until confirmed otherwise by a competent person",
      "It is only fragile if it is more than 20 years old",
      "You should test it by standing on the edge first",
    ],
    correctIndex: 1,
    explanation:
      "The safe assumption is always that an unknown roof surface is fragile until a competent person has confirmed otherwise. Many fragile materials (such as fibre cement sheets or deteriorated roof lights) may appear solid but will not support the weight of a person.",
  },
  {
    id: "qc2",
    question:
      "What is the primary purpose of a crawling board (also called a roof ladder or cat ladder)?",
    options: [
      "To provide a walkway across fragile surfaces",
      "To spread the user's weight across multiple purlins and prevent falling through fragile sheeting",
      "To provide edge protection at the eaves",
      "To anchor personal fall arrest equipment",
    ],
    correctIndex: 1,
    explanation:
      "Crawling boards span across the structural supports (purlins) and distribute the user's weight over a larger area, preventing them from putting their full weight on a single fragile sheet or panel.",
  },
  {
    id: "qc3",
    question:
      "Which HSE publication provides specific guidance on safety in roof work?",
    options: ["HSG65", "HSG33", "L8", "INDG401"],
    correctIndex: 1,
    explanation:
      "HSG33 'Safety in Roof Work' is the HSE's primary guidance document for managing the risks of working on roofs, covering fragile surfaces, edge protection, access, weather, and emergency procedures.",
  },
];

/* ─── FAQs ─── */
const faqs = [
  {
    question:
      "How can I tell if a roof surface is fragile?",
    answer:
      "You often cannot tell by looking alone. Many fragile materials (fibre cement sheets, old roof lights, rusted metal decking) appear solid from above. The only safe approach is to check the building records, consult the building owner or facilities manager, and if in doubt, assume the surface is fragile. A competent person should carry out a survey before work begins on any roof where there is uncertainty.",
  },
  {
    question:
      "Are modern polycarbonate roof lights fragile?",
    answer:
      "Yes. Even new polycarbonate and GRP (glass-reinforced plastic) roof lights are classified as fragile — they will not reliably support the weight of a person. Over time, UV degradation further weakens them. They must be treated as fragile at all ages and protected with permanent covers, barriers, or guard rails. A significant number of fatal falls each year occur through roof lights.",
  },
  {
    question:
      "Can I walk on a metal profile roof if it looks in good condition?",
    answer:
      "Not necessarily. Metal profile sheets are only as strong as their fixings and the supporting purlins. Corroded fixings, deteriorated purlins, or very thin gauge sheets may not support a person's weight. Furthermore, some areas of a metal roof may have been patched with thinner material. Always assess the roof structure before deciding it is safe to walk on, and use crawling boards where there is any doubt.",
  },
  {
    question:
      "What electrical work commonly takes place on roofs?",
    answer:
      "Solar PV panel installation and maintenance is the most common electrical roof task. Other work includes external lighting installation, CCTV and security camera cabling, lightning protection system installation and testing, air conditioning/ventilation wiring on rooftop plant, and communication aerial or antenna cabling. All of these require a work-at-height risk assessment addressing fragile surfaces.",
  },
];

/* ─── End-of-section quiz (8 questions) ─── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is the legal definition of a fragile surface under the Work at Height Regulations?",
    options: [
      "Any surface that is wet or icy",
      "Any surface more than 10 years old",
      "Any surface that would not support the weight of a person and any load they carry",
      "Any surface made of glass",
    ],
    correctAnswer: 2,
    explanation:
      "The Regulations define a fragile surface as one that would be liable to fail if a person's weight (plus any load they are carrying) were applied to it.",
  },
  {
    id: 2,
    question:
      "Which of the following materials is NOT normally considered fragile?",
    options: [
      "Fibre cement sheeting",
      "Reinforced concrete slab (300 mm thick)",
      "Polycarbonate roof light",
      "Asbestos cement sheeting",
    ],
    correctAnswer: 1,
    explanation:
      "A 300 mm reinforced concrete slab is a structural element designed to carry significant loads and is not considered fragile. Fibre cement, polycarbonate roof lights, and asbestos cement are all classified as fragile.",
  },
  {
    id: 3,
    question:
      "What is the function of running boards/staging on a fragile roof?",
    options: [
      "To provide edge protection at the eaves",
      "To spread the worker's weight across the structural supports",
      "To anchor fall arrest equipment",
      "To provide thermal insulation during cold weather",
    ],
    correctAnswer: 1,
    explanation:
      "Running boards (staging) distribute the user's weight over several purlins or structural supports, preventing concentrated loading on any single fragile sheet or panel.",
  },
  {
    id: 4,
    question:
      "According to HSG33, what minimum height must guard rails reach when working on a roof?",
    options: ["750 mm", "900 mm", "950 mm", "2 metres"],
    correctAnswer: 2,
    explanation:
      "Guard rails on roofs must comply with the same standard as other edge protection — a minimum top rail height of 950 mm under BS EN 13374, with a mid rail and toe board.",
  },
  {
    id: 5,
    question:
      "A significant number of fatal roof falls occur through which of the following?",
    options: [
      "Metal profile sheeting",
      "Roof lights and skylights",
      "Concrete slabs",
      "Tiled roofs",
    ],
    correctAnswer: 1,
    explanation:
      "Roof lights and skylights are the single most common fragile element through which workers fall. They are often poorly marked, covered with dirt or moss, and may be indistinguishable from the surrounding roof surface.",
  },
  {
    id: 6,
    question:
      "Where should safety netting be positioned in relation to a fragile roof surface?",
    options: [
      "Above the fragile surface",
      "Below the fragile surface to catch anyone who falls through",
      "At the same level as the fragile surface",
      "Only at the eaves",
    ],
    correctAnswer: 1,
    explanation:
      "Safety netting is installed below the fragile surface (typically beneath the purlins) so that if a person falls through the fragile material, the net catches them before they reach the floor or ground below.",
  },
  {
    id: 7,
    question:
      "Which of the following is NOT a recommended control for working near fragile roof lights?",
    options: [
      "Installing permanent covers or guards over the roof lights",
      "Marking the roof lights with warning signs and barriers",
      "Using crawling boards to spread load around the roof lights",
      "Covering the roof lights with cardboard so they cannot be seen",
    ],
    correctAnswer: 3,
    explanation:
      "Covering roof lights with cardboard does not provide structural protection — someone could still step on the covered light and fall through. Effective controls include permanent covers/guards, clear marking with barriers, and using crawling boards or staging.",
  },
  {
    id: 8,
    question:
      "An electrician is installing solar PV panels on a warehouse roof with fibre cement sheets and plastic roof lights. Which combination of controls is most appropriate?",
    options: [
      "Personal harness only — it is the quickest option",
      "Guard rails at edges, crawling boards over fragile areas, safety netting below, barriers around roof lights",
      "Warning signs at ground level only",
      "Briefing the workforce to be careful and walk only on the purlins",
    ],
    correctAnswer: 1,
    explanation:
      "A combination of collective measures is required: guard rails at eaves and verges, crawling boards to distribute weight across the fragile sheeting, safety netting below as a secondary catch system, and barriers around roof lights. Personal fall protection may supplement these but should not be the sole control.",
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
export default function WorkingAtHeightModule3Section3() {
  useSEO({
    title:
      "Fragile Surfaces & Roof Work | Module 3 Section 3 | Working at Height",
    description:
      "Fragile surface identification, common fragile materials, crawling boards, safety netting, HSG33 requirements, and electrical roof work hazards.",
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
            <AlertTriangle className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fragile Surfaces & Roof Work
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            How to identify fragile surfaces, the common materials that kill,
            the controls that prevent falls through roofs, and the specific
            hazards electricians face when working on roofs.
          </p>
        </header>

        {/* ── Quick Summary Boxes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl bg-red-500/5 border-l-2 border-red-500/50 p-4">
            <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Critical Warning
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              You cannot always tell if a surface is fragile by looking at
              it. Assume unknown roof surfaces are fragile until confirmed
              safe.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Key Guidance
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              HSG33 &ldquo;Safety in Roof Work&rdquo; — the HSE&rsquo;s
              primary guidance for managing roof work risks.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              The Biggest Killer
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Falls through roof lights and fragile roof sheeting are among
              the most common causes of fatal falls from height in the UK.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Electrician Relevance
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Solar PV, CCTV, external lighting, and lightning protection
              all involve working on roofs with potentially fragile surfaces.
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
              "Define a fragile surface as described in the Work at Height Regulations",
              "Identify common fragile roofing materials and explain why they are dangerous",
              "Explain why visual inspection alone is insufficient to determine if a surface is fragile",
              "Describe the controls used for working on or near fragile surfaces: crawling boards, staging, netting, and barriers",
              "Summarise the key requirements of HSG33 for safe roof work",
              "Identify the common electrical tasks that take place on roofs and the associated risks",
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
        {/*  SECTION 01 — Fragile Surface Definition                        */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Fragile Surface Definition
              </h2>
              <p className="text-white/50 text-sm">
                What makes a surface &ldquo;fragile&rdquo; in law
              </p>
            </div>
          </div>
          <div className="border-l-2 border-amber-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The Work at Height Regulations 2005 define a fragile surface as:
            </p>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-amber-300 text-sm sm:text-base italic leading-relaxed">
                &ldquo;A surface which would be liable to fail if any
                reasonably foreseeable loading were to be applied to it.&rdquo;
              </p>
              <p className="text-white/60 text-xs mt-2">
                — Work at Height Regulations 2005, Regulation 2
              </p>
            </div>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              In practical terms, this means any surface that would not
              reliably support the weight of a person (approximately 100 kg
              as a design assumption) together with any tools, materials, or
              equipment they are carrying. The surface does not need to fail
              immediately — if it would crack, deform, or give way under
              sustained or repeated loading, it is fragile.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <ShieldAlert className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-red-400 text-sm font-semibold">
                  The Hidden Danger
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Many fragile surfaces <strong className="text-white">look
                solid</strong>. A fibre cement sheet may appear identical to
                a metal profile sheet from above. A roof light covered in
                dirt or moss may be indistinguishable from the surrounding
                roof surface. Age, weathering, and UV exposure weaken
                materials over time, turning once-adequate surfaces into
                fragile ones. <strong className="text-white">You cannot
                determine fragility by visual inspection alone.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 02 — Common Fragile Materials                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-red-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Common Fragile Materials
              </h2>
              <p className="text-white/50 text-sm">
                Know the materials that kill
              </p>
            </div>
          </div>
          <div className="border-l-2 border-red-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The following materials are classified as fragile and are
              responsible for the majority of falls-through-roof incidents
              in the UK. Learn to recognise them — your life may depend on it.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <h4 className="text-red-400 text-sm font-semibold mb-2">
                  Fibre Cement Sheets
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Corrugated or flat sheets made from cement reinforced with
                  synthetic fibres (or historically, asbestos fibres). Common
                  on industrial units, farm buildings, and older warehouses.
                  Brittle when new; becomes progressively weaker with age,
                  weathering, and moss growth.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <h4 className="text-red-400 text-sm font-semibold mb-2">
                  Roof Lights (Polycarbonate / GRP)
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Translucent panels set into the roof to admit daylight.
                  Made from polycarbonate or glass-reinforced plastic (GRP).
                  Even new roof lights will not support a person&rsquo;s
                  weight. UV degradation makes them more brittle with age.
                  The single biggest cause of fatal falls through roofs.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <h4 className="text-red-400 text-sm font-semibold mb-2">
                  Glass Panels
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Skylights, atrium glazing, glass canopies, and wired glass
                  panels are all fragile. Even toughened glass can shatter
                  under point loading from a falling person. Laminated glass
                  may hold together but will deflect significantly.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <h4 className="text-red-400 text-sm font-semibold mb-2">
                  Liner Panels
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Thin metal or plastic sheets installed as the inner skin
                  of an insulated roof system. They are not structural —
                  they support the insulation and vapour barrier only.
                  Standing on a liner panel between purlins will cause
                  immediate failure.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <h4 className="text-red-400 text-sm font-semibold mb-2">
                  Rusted / Corroded Metal Sheets
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Metal profile sheets in good condition may support a
                  person, but corrosion drastically reduces their strength.
                  Rust around fixings is particularly dangerous — the sheet
                  may detach from the purlins under load.
                </p>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <h4 className="text-red-400 text-sm font-semibold mb-2">
                  Asbestos Cement Sheets
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Found on buildings constructed before 2000. Extremely
                  fragile — especially with age. Falling through asbestos
                  cement creates a double hazard: the fall itself and
                  exposure to airborne asbestos fibres. Never walk on
                  asbestos cement sheeting under any circumstances.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <Eye className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-amber-400 text-sm font-semibold">
                  Why You Cannot Tell By Looking
                </span>
              </div>
              <div className="space-y-2 mt-2">
                {[
                  "Dirt, moss, and paint can hide the true material beneath — a fibre cement sheet may look like a metal one",
                  "Roof lights may be obscured by decades of grime — you may not even know they are there",
                  "Internal corrosion is invisible from above — the topside coating may look fine while the underside has corroded away",
                  "Patching and repairs may have introduced weaker materials without any visible indication",
                  "Age weakens most roofing materials — a surface that was safe 20 years ago may not be safe today",
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
        </section>

        {/* ── Inline Check 1 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 03 — Controls for Fragile Surfaces                     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-green-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Controls for Fragile Surfaces
              </h2>
              <p className="text-white/50 text-sm">
                Crawling boards, staging, netting, and barriers
              </p>
            </div>
          </div>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              When work on or near fragile surfaces cannot be avoided, a
              combination of controls must be implemented. The hierarchy of
              control applies: prevent the fall first, then arrest it if
              prevention fails.
            </p>

            <h3 className="text-white font-semibold text-base mt-4 mb-3">
              Crawling Boards & Staging
            </h3>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="space-y-2">
                {[
                  "Crawling boards (also called roof ladders or cat ladders) are placed over the fragile surface and span across the structural supports (purlins)",
                  "They distribute the worker's weight across multiple purlins, preventing concentrated loading on a single fragile sheet",
                  "Must be at least 600 mm wide and have adequate battens for grip — some proprietary systems are wider for improved stability",
                  "Must be secured against sliding — typically hooked over the ridge or clamped to a purlin at the top",
                  "Staging provides a similar function on flat or low-pitch roofs — wide boards supported by trestles or scaffold frames",
                  "Workers should only stand or kneel on the boards — never step off onto the fragile surface",
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

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Safety Netting Below Fragile Surfaces
            </h3>
            <div className="space-y-2">
              {[
                "Installed beneath the roof sheeting (between the purlins and the structure below) to catch anyone who falls through",
                "Provides a secondary safety measure — even if the crawling boards fail or the worker slips off, the net catches them",
                "Must comply with EN 1263 and be rigged by competent net riggers",
                "Clearance below the net must be sufficient for deflection — the net sags when loaded",
                "Particularly important where large areas of fragile roof are being worked on (e.g., re-roofing projects, solar PV arrays)",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Guard Rails & Edge Protection
            </h3>
            <div className="space-y-2">
              {[
                "Guard rails at the eaves (the lower edge of the roof) prevent anyone from falling off the roof entirely",
                "Guard rails or barriers must also be placed around fragile roof lights and other openings",
                "On flat roofs, free-standing edge protection is often the simplest solution for the perimeter",
                "On pitched roofs, scaffold or proprietary eaves protection may be needed",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Warning Signs & Demarcation
            </h3>
            <div className="space-y-2">
              {[
                "Warning signs must be posted at all access points to the roof: 'DANGER — FRAGILE ROOF — Use crawling boards'",
                "Individual fragile elements (roof lights, patch repairs) should be marked with fluorescent paint or tape where practicable",
                "Barriers, tape, or physical demarcation should be used to keep people away from fragile areas where they do not need to work",
                "Signs should be visible from the roof surface and from below (especially for roof lights visible from inside the building)",
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

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 04 — HSG33 & Roof Work Regulations                     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-purple-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                HSG33 — Safety in Roof Work
              </h2>
              <p className="text-white/50 text-sm">
                The HSE&rsquo;s guidance document for roof work
              </p>
            </div>
          </div>
          <div className="border-l-2 border-purple-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              HSG33 &ldquo;Safety in Roof Work&rdquo; is the Health and
              Safety Executive&rsquo;s primary guidance for anyone planning,
              managing, or carrying out work on roofs. It is not a legal
              document in itself, but it provides practical guidance on
              complying with the Work at Height Regulations 2005 and the
              Construction (Design and Management) Regulations 2015.
            </p>

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <h4 className="text-purple-400 text-sm font-semibold mb-3">
                Key Requirements & Recommendations of HSG33
              </h4>
              <div className="space-y-2">
                {[
                  "Risk assessment must be carried out before any roof work begins — identifying all hazards including fragile surfaces, weather, access, and materials handling",
                  "Planning and organisation: a method statement must define the sequence of work, access arrangements, fall prevention measures, and emergency procedures",
                  "Guard rails at eaves and verges must be in place before anyone accesses the roof — minimum top rail height 950 mm",
                  "Fragile surfaces must be identified, marked, and protected — crawling boards, barriers, netting as appropriate",
                  "Safe means of access: properly secured ladders, scaffold stair towers, or MEWPs — not climbing over parapets or using unguarded scaffold",
                  "Materials must be stored safely on the roof — secured against wind, not overloading the structure, and not blocking access routes",
                  "Weather conditions must be monitored — work should stop in high winds, heavy rain, ice, snow, or poor visibility",
                  "Workers must be competent — trained in the specific hazards of roof work and the equipment they will use",
                  "Supervision must be appropriate to the level of risk — more supervision for less experienced workers",
                  "Emergency and rescue procedures must be in place before work starts",
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

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Preventing Materials from Falling
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              HSG33 emphasises that it is not just people who must be
              prevented from falling — tools, materials, and debris must
              also be controlled. Objects falling from a roof can kill or
              seriously injure anyone below.
            </p>
            <div className="space-y-2">
              {[
                "Toe boards (minimum 150 mm) at all edges prevent objects rolling or being kicked off",
                "Brick guards or mesh panels may be needed on scaffold if there is a risk of objects bouncing over the toe board",
                "Tools should be tethered where practicable — especially at height above public areas",
                "Exclusion zones on the ground below the work area — barriers and signage to keep people clear",
                "Materials being hoisted to the roof must be properly secured — never throw materials up or down",
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

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 05 — Electricians on Roofs                             */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-cyan-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Electricians on Roofs
              </h2>
              <p className="text-white/50 text-sm">
                Solar PV, external lighting, CCTV, and cable runs
              </p>
            </div>
          </div>
          <div className="border-l-2 border-cyan-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              As an electrician, you will encounter roof work more frequently
              than many other trades. The growth of solar PV, improved
              external lighting, and increased CCTV coverage means that
              electricians regularly need to access roofs for installation,
              maintenance, and testing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <h4 className="text-cyan-400 text-sm font-semibold">
                    Solar PV Installation
                  </h4>
                </div>
                <div className="space-y-2">
                  {[
                    "Panels are typically installed on pitched or flat roofs — both involve working at height",
                    "Mounting rails may require roof penetrations — check the roof structure capacity",
                    "Cable runs from panels to inverters often cross the roof surface and enter through walls or soffits",
                    "Weight of panels and mounting hardware must not overload the roof — structural survey may be needed",
                    "Edge protection required at eaves and verges during the entire installation period",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <h4 className="text-cyan-400 text-sm font-semibold">
                    External Lighting & CCTV
                  </h4>
                </div>
                <div className="space-y-2">
                  {[
                    "Building-mounted floodlights, car park lighting, and architectural lighting often require roof access",
                    "CCTV cameras and their cable runs may be mounted on parapets, walls, or gantries accessed from the roof",
                    "Maintenance visits (lamp replacement, aiming, cleaning) may not receive the same planning as new installations — resist cutting corners",
                    "Single-person roof access for maintenance is particularly risky — always have a second person or communication system",
                    "Use platform towers or MEWPs where possible to avoid walking on the roof surface",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <h4 className="text-cyan-400 text-sm font-semibold">
                  Lightning Protection & Communication Aerials
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  "Lightning conductors run along ridges, around parapets, and down walls — installation and testing requires full roof access",
                  "Communication aerials and satellite dishes on rooftops require periodic alignment and maintenance",
                  "These tasks often involve working close to the roof edge — edge protection is essential",
                  "Electrical testing (earth resistance, continuity) may require access to multiple points across the roof",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Roof Work Protection Diagram                                   */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="rounded-xl border border-white/10 bg-[#111] p-5 sm:p-6">
            <h3 className="text-amber-400 text-sm font-semibold mb-5 text-center">
              Roof Work Protection — Cross-Section Diagram
            </h3>
            <div className="max-w-lg mx-auto space-y-4">
              {/* Ridge / top */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
                <div className="flex-1 h-px bg-white/20 border-t border-dashed border-white/20" />
                <span className="text-xs text-white/50 flex-shrink-0 w-32 text-right">
                  Ridge Line
                </span>
              </div>
              {/* Crawling board */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <div className="flex-1 h-2 bg-amber-500/30 rounded border border-amber-500/40" />
                <span className="text-xs text-amber-400 flex-shrink-0 w-32 text-right">
                  Crawling Board
                </span>
              </div>
              {/* Fragile sheeting */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <div className="flex-1 h-1 bg-red-500/30 rounded" />
                <span className="text-xs text-red-400 flex-shrink-0 w-32 text-right">
                  Fragile Sheeting
                </span>
              </div>
              {/* Purlins */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                <div className="flex-1 flex gap-2">
                  <div className="h-3 w-4 bg-blue-400/30 rounded border border-blue-400/40" />
                  <div className="flex-1" />
                  <div className="h-3 w-4 bg-blue-400/30 rounded border border-blue-400/40" />
                  <div className="flex-1" />
                  <div className="h-3 w-4 bg-blue-400/30 rounded border border-blue-400/40" />
                  <div className="flex-1" />
                  <div className="h-3 w-4 bg-blue-400/30 rounded border border-blue-400/40" />
                </div>
                <span className="text-xs text-blue-400 flex-shrink-0 w-32 text-right">
                  Purlins (Supports)
                </span>
              </div>
              {/* Safety net */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <div className="flex-1 h-px bg-green-400/60 border-t-2 border-dashed border-green-400/50" />
                <span className="text-xs text-green-400 flex-shrink-0 w-32 text-right">
                  Safety Net (EN 1263)
                </span>
              </div>
              {/* Guard rail at eaves */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                <div className="flex-1 flex items-end gap-1">
                  <div className="h-6 w-1 bg-purple-400/50 rounded" />
                  <div className="h-4 flex-1 border-t border-purple-400/40" />
                  <div className="h-3 flex-1 border-t border-purple-400/30" />
                  <div className="h-1.5 flex-1 bg-purple-400/20 rounded" />
                </div>
                <span className="text-xs text-purple-400 flex-shrink-0 w-32 text-right">
                  Guard Rail at Eaves
                </span>
              </div>
              {/* Warning sign */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                <div className="flex-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-400" />
                  <span className="text-[10px] text-yellow-400/70">
                    DANGER — FRAGILE ROOF
                  </span>
                </div>
                <span className="text-xs text-yellow-400 flex-shrink-0 w-32 text-right">
                  Warning Signs
                </span>
              </div>
              {/* Ground level */}
              <div className="flex items-center gap-3 mt-2">
                <div className="w-2 h-2 rounded-full bg-white/20 flex-shrink-0" />
                <div className="flex-1 h-1 bg-white/10 rounded" />
                <span className="text-xs text-white/40 flex-shrink-0 w-32 text-right">
                  Ground / Floor Level
                </span>
              </div>
            </div>
            <p className="text-center text-white/40 text-xs mt-4">
              Cross-section view showing layered protection system — not to
              scale.
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Key Takeaways                                                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-400/5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-amber-500" />
              Key Takeaways
            </h2>
            <div className="space-y-3">
              {[
                "A fragile surface is any surface that would not support the weight of a person plus any load they carry.",
                "Common fragile materials: fibre cement, roof lights, glass panels, liner panels, rusted metal, asbestos cement.",
                "You CANNOT tell if a surface is fragile by looking — always assume unknown surfaces are fragile until confirmed otherwise.",
                "Controls: crawling boards to spread weight, safety netting below, guard rails at edges, barriers around openings, warning signs.",
                "HSG33 provides comprehensive guidance: risk assessment, method statement, edge protection, competent workers, weather monitoring.",
                "Electricians frequently work on roofs for solar PV, CCTV, lighting, and lightning protection — all require full work-at-height risk assessments.",
                "Falls through roof lights are among the most common causes of fatal falls from height in the UK.",
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
            title="Section 3 Quiz — Fragile Surfaces & Roof Work"
          />
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  FAQs                                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-amber-500" />
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
