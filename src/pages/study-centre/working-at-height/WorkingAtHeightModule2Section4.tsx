import {
  ArrowLeft,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Clock,
  Ruler,
  Eye,
  ArrowRight,
  ArrowDown,
  Footprints,
  HardHat,
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
    id: "podium-step-advantage",
    question:
      "What is the key safety advantage of a podium step over a standard stepladder?",
    options: [
      "Podium steps can reach greater heights",
      "Podium steps are lighter and easier to carry",
      "Podium steps have an enclosed guardrail and larger platform for safer standing",
      "Podium steps do not require any training to use",
    ],
    correctIndex: 2,
    explanation:
      "The key advantage is the enclosed guardrail and larger platform. This provides a secure, guarded standing position that dramatically reduces the risk of falling compared to standing on the top treads of a stepladder. The user is enclosed on all sides by guard rails while working from the platform.",
  },
  {
    id: "hop-up-height-limit",
    question:
      "What is the maximum platform height for a hop-up?",
    options: [
      "300mm",
      "600mm",
      "1000mm",
      "1500mm",
    ],
    correctIndex: 1,
    explanation:
      "Hop-ups have a maximum platform height of 600mm (0.6 metres). They are designed for very low-level tasks where a person needs a small boost to reach a working area — for example, accessing equipment mounted slightly above comfortable reach height. Above 600mm, a podium step or other guarded platform should be used.",
  },
  {
    id: "safety-net-max-fall",
    question:
      "What is the maximum fall distance permitted when safety nets are used as a collective fall protection measure?",
    options: [
      "2 metres",
      "4 metres",
      "6 metres",
      "10 metres",
    ],
    correctIndex: 2,
    explanation:
      "Safety nets must be installed so that the maximum fall distance does not exceed 6 metres. This includes the distance from the working level to the net, plus the deflection (sag) of the net when it arrests the fall. Nets must be installed as close as possible below the working area — the shorter the fall, the lower the injury risk.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Items (4)                                                     */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "When should I use a podium step instead of a stepladder?",
    answer:
      "A podium step should be used whenever the task allows — they are the preferred alternative to stepladders for most low-level work. Specifically, use a podium step when the work will last more than a few minutes, when you need both hands free, when you need to move laterally along the work area (by repositioning the podium), or when site rules prohibit stepladders. The enclosed guardrail makes podium steps significantly safer than stepladders. Many large contractors and facilities have banned stepladders entirely, requiring podium steps as the minimum standard for low-level access.",
  },
  {
    question: "Are hop-ups safe to use on construction sites?",
    answer:
      "Hop-ups are acceptable for very short-duration, light tasks at minimal height (up to 600mm platform height). However, many construction sites have banned hop-ups because they lack guardrails and provide minimal fall protection. Always check site rules before using a hop-up. If the task requires standing at the hop-up for more than a few minutes, or involves using both hands for work, a podium step is the safer choice. Hop-ups are more commonly accepted in maintenance and facilities management settings than on active construction sites.",
  },
  {
    question: "Do I need training to use a roof ladder?",
    answer:
      "Yes. Anyone using a roof ladder must be competent — meaning they have received adequate training and understand the risks. Training should cover: when a roof ladder is needed (fragile roofs), how to secure the ladder using the ridge hook, how to distribute weight across the roof surface, how to identify fragile roofing materials, and the rescue procedures if a person falls through a fragile surface. Working on roofs also requires a specific risk assessment and method statement (RAMS).",
  },
  {
    question: "Can I use temporary edge protection instead of scaffolding?",
    answer:
      "Yes, in many situations temporary edge protection systems are an effective and quicker-to-install alternative to scaffolding for preventing falls from edges. Free-standing counterweighted guard rail systems can be deployed on flat roofs, mezzanines, loading bays, and floor edges without drilling or fixings. However, they have limitations — they provide edge protection only (no working platform at height), they must be rated for the specific application, and they must be installed by a competent person following the manufacturer's instructions. For tasks requiring a working platform at height, scaffolding or a MEWP is still needed.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the maximum platform height of a hop-up?",
    options: ["300mm", "450mm", "600mm", "1000mm"],
    correctAnswer: 2,
    explanation:
      "Hop-ups are limited to a maximum platform height of 600mm (0.6 metres). Above this height, a podium step or other guarded platform should be used to provide fall protection.",
  },
  {
    id: 2,
    question:
      "What is the key difference between a podium step and a standard stepladder?",
    options: [
      "Podium steps are taller than stepladders",
      "Podium steps have an enclosed guardrail and larger working platform",
      "Podium steps can be used as leaning ladders",
      "Podium steps are lighter than stepladders",
    ],
    correctAnswer: 1,
    explanation:
      "The key difference is the enclosed guardrail and larger platform. A podium step provides a guarded standing position with rails on all sides, dramatically reducing fall risk. The larger platform also provides more comfortable working space.",
  },
  {
    id: 3,
    question:
      "What is the purpose of a roof ladder's ridge hook?",
    options: [
      "To attach a safety harness",
      "To hook over the roof ridge to secure the ladder and distribute the user's weight",
      "To lift materials onto the roof",
      "To measure the roof pitch angle",
    ],
    correctAnswer: 1,
    explanation:
      "The ridge hook secures the roof ladder by hooking over the apex (ridge) of the roof. This prevents the ladder sliding down the roof and, critically, distributes the user's weight over a larger area of the roof surface — essential when working on or near fragile roofing materials.",
  },
  {
    id: 4,
    question:
      "Safety nets must be installed so the maximum fall distance does not exceed:",
    options: ["2 metres", "4 metres", "6 metres", "10 metres"],
    correctAnswer: 2,
    explanation:
      "The maximum fall distance into a safety net must not exceed 6 metres (including net deflection). Nets must be positioned as close below the working area as possible. Safety nets comply with EN 1263.",
  },
  {
    id: 5,
    question:
      "What is the maximum unsupported span for a scaffold board on a trestle platform?",
    options: ["0.8 metres", "1.0 metres", "1.2 metres", "2.0 metres"],
    correctAnswer: 2,
    explanation:
      "Scaffold boards on trestle platforms must be supported at intervals not exceeding 1.2 metres (the same as on a scaffold). Boards must not overhang the support by more than 4 times the board thickness, and the platform must be at least 600mm wide.",
  },
  {
    id: 6,
    question:
      "Temporary edge protection systems that are free-standing typically rely on what for stability?",
    options: [
      "Drilling into the floor or roof",
      "Counterweights positioned at the base",
      "Clamping to existing steelwork",
      "Adhesive fixings to the surface",
    ],
    correctAnswer: 1,
    explanation:
      "Free-standing temporary edge protection systems use counterweights to provide stability without penetrating the surface. This is a major advantage on flat roofs, concrete decks, and areas where drilling is not permitted (e.g. waterproof membranes). The counterweights must be correctly positioned per the manufacturer's instructions.",
  },
  {
    id: 7,
    question:
      "Which piece of access equipment would be most suitable for changing a ceiling light fitting in an office, where the work will take 10 minutes?",
    options: [
      "A hop-up",
      "A podium step",
      "A mobile scaffold tower",
      "A telescopic boom lift",
    ],
    correctAnswer: 1,
    explanation:
      "A podium step is ideal — it provides a safe, guarded platform at low level, is quick to position, and is proportionate to the task (10 minutes of light work at ceiling height in an office). A hop-up lacks guardrails, a tower is disproportionate for a 10-minute task, and a boom lift is entirely unnecessary indoors for low-level work.",
  },
  {
    id: 8,
    question:
      "When selecting access equipment, which factor should be assessed FIRST in the decision process?",
    options: [
      "The cost of hiring the equipment",
      "The duration of the task and the working height required",
      "The colour of the equipment",
      "Whether the equipment is available in the van",
    ],
    correctAnswer: 1,
    explanation:
      "Duration and working height are the primary selection factors. Short-duration, low-height tasks may suit a podium step or hop-up. Longer-duration tasks at greater heights require scaffolding, a tower, or a MEWP. Equipment selection must be based on the task requirements, not convenience or cost.",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function WorkingAtHeightModule2Section4() {
  useSEO({
    title: "Other Access Equipment | Working at Height Module 2.4",
    description:
      "Podium steps, hop-ups, trestle platforms, roof ladders, crawling boards, safety nets, temporary edge protection, and equipment selection for working at height.",
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
            <Wrench className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Other Access Equipment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Podium steps, hop-ups, trestle platforms, roof ladders, crawling
            boards, safety nets, temporary edge protection, and how to select
            the right equipment for the task
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
                  <strong className="text-white">Podium steps:</strong> safer
                  alternative to stepladders — enclosed guardrails, large
                  platform
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Hop-ups:</strong> max 600mm
                  platform height, very short tasks only
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Roof ladders:</strong>{" "}
                  distribute weight on fragile roofs, ridge hook securing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Safety nets:</strong> max 6m
                  fall distance, EN 1263 standard
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
                  <strong className="text-white">Selection:</strong> consider
                  duration, height, task type, then match equipment
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Trestle platforms:</strong>{" "}
                  boards supported at 1.2m max span, 600mm min width
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Edge protection:</strong>{" "}
                  free-standing counterweighted systems — no drilling required
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Always risk-assess:</strong>{" "}
                  match the equipment to the actual task, not the other way
                  round
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
              "Explain the advantages of podium steps over standard stepladders",
              "State the limitations and maximum platform height for hop-ups",
              "Describe the correct setup and use of trestle platforms",
              "Explain when roof ladders and crawling boards are required and how they are secured",
              "State the key requirements for safety nets under EN 1263",
              "Apply a systematic equipment selection process based on task requirements",
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
        {/*  SECTION 01 — Podium Steps                                       */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">01</span>
              Podium Steps
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Podium steps (also called podium platforms) are rapidly
                replacing stepladders as the standard low-level access equipment
                across UK construction sites, commercial buildings, and
                facilities. Many principal contractors now{" "}
                <strong className="text-white">ban stepladders entirely</strong>,
                requiring podium steps as the minimum standard.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  Key Definition: Podium Step
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  A <strong className="text-white">podium step</strong> is a
                  low-level access platform with integrated steps, a large
                  flat working platform (typically 500mm &times; 500mm or
                  larger), and enclosed guardrails on all sides. The guardrail
                  height is at least 950mm above the platform. Podium steps
                  comply with <strong className="text-white">BS 8620:2022</strong>{" "}
                  (specification for low-level work platforms).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">
                    Advantages Over Stepladders
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Enclosed guardrails on all four sides prevent falls
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Larger, flat platform — both feet on a comfortable
                        surface
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        User can work with both hands free (no need to hold on)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        More stable base — wider footprint than stepladders
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Self-closing gate at the access point
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Lockable castors for easy repositioning
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">
                    Typical Specifications
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Platform heights: 475mm, 720mm, 975mm (common sizes)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Platform size: typically 500mm &times; 500mm minimum
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Guard rail height: 950mm above platform (minimum)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Weight capacity: typically 150kg per platform
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Folds flat for transport and storage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Aluminium or fibreglass (GRP) construction
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 02 — Hop-Ups                                            */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Hop-Ups
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                A hop-up is a small, lightweight platform designed to give the
                user a modest boost in standing height. They are the simplest
                form of access equipment — essentially a robust step with a flat
                top.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">
                    When Hop-Ups Are Acceptable
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Very short-duration tasks (under 5 minutes)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Light work requiring a small height boost only
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Maximum platform height: 600mm
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Risk assessment confirms the risk is low
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">
                    Limitations
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        No guardrails — the user is unprotected from falls
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Small platform area limits working space
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Banned on many construction sites due to lack of fall
                        protection
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Must not be used on uneven or slippery surfaces
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Improvised Hop-Ups Are Prohibited
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Buckets, crates, pallets, toolboxes, cable drums, and
                  stacked materials are{" "}
                  <strong className="text-white">never</strong> acceptable as
                  hop-ups or improvised access platforms. These items are not
                  designed to support a person's weight and can collapse, tip,
                  or slide — causing falls, crush injuries, or worse. Only
                  purpose-built, commercially manufactured hop-ups may be used.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/*  SECTION 03 — Trestle Platforms                                  */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Trestle Platforms
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Trestle platforms use{" "}
                <strong className="text-white">
                  A-frame trestles (or split-head trestles)
                </strong>{" "}
                with scaffold boards laid across them to create a low-level
                working platform. They are used for tasks at modest heights
                where a simple, stable platform is needed — such as plastering,
                painting, or running cable containment along a wall.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">
                  Setup Requirements
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Board support:</strong>{" "}
                      scaffold boards must be supported at maximum{" "}
                      <strong className="text-white">1.2m</strong> intervals
                      (same as scaffolding)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Minimum platform width:</strong>{" "}
                      600mm (3 boards) for a working platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Board overhang:</strong>{" "}
                      not more than 4 times the board thickness from the
                      trestle support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Guard rails:</strong>{" "}
                      required if the platform is above 2 metres (guard rails
                      at 950mm + toe boards at 150mm)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Boards:</strong> must be
                      BS 2482 graded, inspected, and free from defects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Trestles:</strong> must be
                      fully opened, legs locked, and placed on firm, level
                      ground
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Common Trestle Platform Errors
                  </h3>
                </div>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Boards not secured — they can slide off the trestle if
                      kicked or caught by wind
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Excessive overhang creating a tipping hazard when the
                      user stands near the board end
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Using damaged or sub-standard boards that could break
                      under load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      No guard rails on platforms above 2m — a common and
                      serious breach
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 04 — Roof Ladders & Crawling Boards                     */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Roof Ladders &amp; Crawling Boards
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Roof ladders and crawling boards are specialist access equipment
                used when working on{" "}
                <strong className="text-white">sloped roofs</strong> or near{" "}
                <strong className="text-white">fragile roof materials</strong>.
                Their primary purpose is to distribute the user's weight over
                a larger area of the roof surface, preventing falls through
                fragile materials.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Critical Warning: Fragile Roofs
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Falls through fragile roofing materials are one of the{" "}
                  <strong className="text-white">
                    leading causes of fatal falls
                  </strong>{" "}
                  in the UK construction industry. Materials that appear solid
                  — such as fibre cement sheets, plastic rooflights, old
                  asbestos cement sheets, corroded metal decking, and glass
                  panels — may not support a person's weight. A roof ladder or
                  crawling board is essential, but it is{" "}
                  <strong className="text-white">
                    not a substitute for collective fall protection
                  </strong>{" "}
                  (such as safety nets or covers over fragile areas).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    Roof Ladders
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        A ladder with a{" "}
                        <strong className="text-white">ridge hook</strong> at
                        the top that hooks over the roof ridge
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Distributes the user's weight along the length of the
                        ladder
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The ridge hook must be securely engaged before the
                        user climbs on
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Always position the ladder so the rungs face upwards
                        (bearing surface down)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Used on sloped tiled, slated, or sheeted roofs
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    Crawling Boards
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Wider than a roof ladder — spreads weight over a greater
                        area
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Minimum 600mm wide with cross battens at intervals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Used on fragile or low-load-capacity roof surfaces
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Must span at least 3 purlins or support members
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Secured at the ridge to prevent sliding
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/*  SECTION 05 — Safety Nets                                        */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Safety Nets
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Safety nets are a form of{" "}
                <strong className="text-white">collective fall protection</strong>{" "}
                — they protect everyone working in the area above, not just
                individual users. Nets are installed below the working area to
                catch anyone who falls, arresting the fall before the person
                hits the ground or a lower level.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  EN 1263 Standard
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Safety nets for construction use must comply with{" "}
                  <strong className="text-white">EN 1263-1</strong> (the net
                  itself) and{" "}
                  <strong className="text-white">EN 1263-2</strong> (the
                  installation requirements). The standard defines mesh size,
                  cord diameter, breaking strength, energy absorption, and
                  installation methods.
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Key Requirements
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maximum fall distance: 6 metres
                      </strong>{" "}
                      — including net deflection when arresting a fall
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Nets must be installed as close below the working area as
                      possible — the closer the better
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Must be installed by a competent person following EN
                      1263-2
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Regular inspection for damage, UV degradation, chemical
                      contamination
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Debris and tools must be regularly cleared from nets
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      After catching a person, the net and its fixings must be
                      inspected before reuse
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Safety nets are commonly used in steelwork erection, roof
                construction, and bridge building — situations where other
                forms of edge protection or platform access are impractical.
                They are particularly effective because they protect the entire
                area below the work zone, not just individual operatives.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 06 — Harness Systems & Temp Edge Protection             */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">06</span>
              Harness Systems &amp; Temporary Edge Protection
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <h3 className="text-white font-semibold text-base">
                Harness Systems (Overview)
              </h3>
              <p>
                Personal fall protection using harnesses, lanyards, and anchor
                points is covered in depth in{" "}
                <strong className="text-white">Module 3</strong>. However, it
                is important to understand where harnesses fit in the hierarchy
                at this stage:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-amber-400 font-medium mb-2">
                  Hierarchy Position
                </h4>
                <ul className="text-white/70 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Harnesses are{" "}
                      <strong className="text-white">personal</strong> fall
                      protection — they protect only the individual wearing them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Collective measures (guard rails, nets, scaffolding) are
                      preferred — they protect everyone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Harnesses are used when collective protection is not
                      reasonably practicable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      A rescue plan is always required when harnesses are in use
                      — suspension trauma can be fatal within 30 minutes
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-white font-semibold text-base mt-6">
                Temporary Edge Protection
              </h3>
              <p>
                Temporary edge protection systems provide guard rails at
                unprotected edges — flat roofs, floor openings, mezzanines,
                loading bays, and incomplete stairwells. Free-standing systems
                are particularly useful because they require{" "}
                <strong className="text-white">
                  no drilling, bolting, or fixings
                </strong>{" "}
                to the surface.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">
                    Free-Standing Guard Rail Systems
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Counterweighted bases — no penetration of roof membrane
                        or floor
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Modular design — can be configured to any edge length
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Quick to install and remove — typically under 1 hour
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Guard rail at 950mm minimum, intermediate rail, and toe
                        board
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">
                    Other Edge Protection Types
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Clamp-on systems:
                        </strong>{" "}
                        clamp to steel beams or concrete edges
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Socket-based systems:
                        </strong>{" "}
                        uprights inserted into floor sockets cast into the slab
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Parapet clamp systems:
                        </strong>{" "}
                        clamp onto existing parapet walls to raise the
                        effective height
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        All types must meet the 950mm guard rail height
                        requirement
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ================================================================ */}
        {/*  SECTION 07 — Equipment Selection Flowchart                      */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Equipment Selection Flowchart
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Selecting the right access equipment is a systematic process.
                Start with the task requirements and work through the decision
                points to arrive at the most suitable option. The following
                flowchart covers the most common scenarios:
              </p>

              {/* ── Equipment Selection Flowchart Diagram ── */}
              <div className="bg-[#111] border border-white/10 rounded-xl p-5 sm:p-6">
                <h3 className="text-amber-400 font-semibold text-base mb-6 text-center">
                  Equipment Selection Flowchart
                </h3>

                <div className="space-y-4 max-w-lg mx-auto">
                  {/* Step 1: Duration */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-400 font-semibold text-sm">
                        STEP 1: Duration
                      </span>
                    </div>
                    <p className="text-white/60 text-xs">
                      How long will the task take?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-medium">
                        Under 5 mins
                      </p>
                      <ArrowDown className="h-3 w-3 text-amber-400/50 mx-auto my-1" />
                      <p className="text-amber-400/80 text-[10px]">
                        Hop-up or podium step may suit
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-medium">
                        Over 5 mins
                      </p>
                      <ArrowDown className="h-3 w-3 text-amber-400/50 mx-auto my-1" />
                      <p className="text-amber-400/80 text-[10px]">
                        Continue to Step 2
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Height */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Ruler className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-400 font-semibold text-sm">
                        STEP 2: Height
                      </span>
                    </div>
                    <p className="text-white/60 text-xs">
                      What working height is needed?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-medium">
                        Under 1m platform
                      </p>
                      <ArrowDown className="h-3 w-3 text-amber-400/50 mx-auto my-1" />
                      <p className="text-green-400 text-[10px] font-medium">
                        Podium step
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-medium">
                        1m to 6m platform
                      </p>
                      <ArrowDown className="h-3 w-3 text-amber-400/50 mx-auto my-1" />
                      <p className="text-amber-400/80 text-[10px]">
                        Continue to Step 3
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-medium">
                        Above 6m platform
                      </p>
                      <ArrowDown className="h-3 w-3 text-amber-400/50 mx-auto my-1" />
                      <p className="text-green-400 text-[10px] font-medium">
                        Scaffold or MEWP
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Task */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Wrench className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-400 font-semibold text-sm">
                        STEP 3: Task Type
                      </span>
                    </div>
                    <p className="text-white/60 text-xs">
                      What does the work involve?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-medium">
                        Light work, one position
                      </p>
                      <ArrowDown className="h-3 w-3 text-amber-400/50 mx-auto my-1" />
                      <p className="text-green-400 text-[10px] font-medium">
                        Tower scaffold or trestle
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-white text-xs font-medium">
                        Long-run, multiple positions
                      </p>
                      <ArrowDown className="h-3 w-3 text-amber-400/50 mx-auto my-1" />
                      <p className="text-green-400 text-[10px] font-medium">
                        Fixed scaffold or MEWP
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Recommendation */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <HardHat className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-400 font-semibold text-sm">
                        STEP 4: Confirm
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Record selection in risk assessment / method statement.
                      Verify equipment is inspected, available, and the
                      operator is trained.
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-white/50 text-xs text-center leading-relaxed">
                    This flowchart covers common scenarios. Complex tasks,
                    restricted access, fragile surfaces, or electrical hazards
                    may require specialist assessment. Always complete a full
                    risk assessment before selecting equipment.
                  </p>
                </div>
              </div>

              {/* Quick reference table */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-3">
                  Quick Reference — Equipment by Scenario
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    {
                      scenario: "Changing a light fitting in an office",
                      equipment: "Podium step",
                    },
                    {
                      scenario: "Installing cable tray along a corridor ceiling",
                      equipment: "Mobile tower scaffold or scissor lift",
                    },
                    {
                      scenario: "External cabling at first-floor level",
                      equipment: "Fixed scaffold or articulated boom MEWP",
                    },
                    {
                      scenario: "Inspecting a flat roof parapet",
                      equipment:
                        "Temporary edge protection + access ladder",
                    },
                    {
                      scenario:
                        "Working on a fragile cement sheet roof",
                      equipment:
                        "Crawling boards + safety net below + harness",
                    },
                    {
                      scenario: "Painting a wall at 2m height for 4 hours",
                      equipment: "Trestle platform with guard rails",
                    },
                    {
                      scenario: "Quick visual check of a ceiling void access hatch",
                      equipment: "Hop-up (if under 600mm and under 5 mins)",
                    },
                    {
                      scenario:
                        "Installing high-bay warehouse lighting at 12m",
                      equipment:
                        "Scissor lift (3a) or articulated boom (3b)",
                    },
                  ].map(({ scenario, equipment }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ArrowRight className="h-4 w-4 text-amber-400/50 mt-0.5 flex-shrink-0" />
                      <div className="text-white/70 leading-relaxed">
                        <strong className="text-white">{scenario}:</strong>{" "}
                        {equipment}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Never Let Convenience Drive Selection
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  A common cause of working-at-height incidents is using
                  whatever equipment happens to be available rather than what
                  the task actually requires. "The ladder was in the van" is
                  not a valid reason for using a ladder on a task that demands
                  a scaffold. Always select based on the task requirements
                  identified in your risk assessment — not based on convenience,
                  cost, or availability.
                </p>
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
          <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* ── Bottom Navigation ── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: MEWPs
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2">
              Back to Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
