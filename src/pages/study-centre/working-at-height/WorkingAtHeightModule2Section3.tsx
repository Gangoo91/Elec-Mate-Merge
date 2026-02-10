import {
  ArrowLeft,
  CableCar,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Ruler,
  Eye,
  ClipboardCheck,
  LifeBuoy,
  Gauge,
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
    id: "mewp-ipaf-category",
    question:
      "You need to operate a cherry picker (articulated boom lift) that drives while the platform is elevated. Which IPAF training category do you need?",
    options: [
      "1a — Static Vertical",
      "1b — Static Boom",
      "3a — Mobile Vertical",
      "3b — Mobile Boom",
    ],
    correctIndex: 3,
    explanation:
      "Category 3b covers mobile boom lifts — machines that can be driven with the platform raised. The '3' indicates it is a mobile machine (can travel with the platform elevated), and the 'b' indicates it is a boom-type (as opposed to a vertical scissor-type). A cherry picker / articulated boom is a 3b machine.",
  },
  {
    id: "mewp-loler-interval",
    question:
      "Under LOLER 1998, how often must a MEWP undergo a thorough examination?",
    options: [
      "Every 3 months",
      "Every 6 months",
      "Every 12 months",
      "Every 24 months",
    ],
    correctIndex: 1,
    explanation:
      "LOLER (Lifting Operations and Lifting Equipment Regulations 1998) requires a thorough examination of MEWPs at intervals not exceeding 6 months. This is because the platform carries people — equipment used to lift people must be examined twice as frequently as equipment used to lift goods only (which is 12 months).",
  },
  {
    id: "mewp-rescue-plan",
    question:
      "Why is a rescue plan required before using a MEWP?",
    options: [
      "It is only required for boom lifts, not scissor lifts",
      "Because the platform could fail to lower, stranding the operative at height",
      "It is optional but recommended as good practice",
      "It is only required when working above 10 metres",
    ],
    correctIndex: 1,
    explanation:
      "A rescue plan is required for ALL MEWP operations because the platform could suffer a mechanical, hydraulic, or electrical failure that prevents it from lowering normally. The plan must detail how a stranded operative will be rescued — including who will carry it out, what equipment will be used, and the expected timescale. This applies to all MEWP types at any working height.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Items (4)                                                     */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Do I need IPAF training to use a scissor lift?",
    answer:
      "Yes. Anyone operating a MEWP — including scissor lifts — must be trained and competent. IPAF (International Powered Access Federation) training is the industry-standard training scheme recognised across the UK. Even small, self-propelled scissor lifts require operator training. The specific IPAF category depends on the machine type: 1a (static vertical) for scissor lifts that cannot travel while elevated, or 3a (mobile vertical) for self-propelled scissor lifts that can drive while elevated.",
  },
  {
    question: "Can I use a MEWP outdoors in windy conditions?",
    answer:
      "MEWPs have maximum wind speed ratings specified by the manufacturer — typically Beaufort Force 5 (19-24 mph / 30-38 km/h) for boom lifts. Scissor lifts have lower wind speed tolerances due to their sail effect when elevated. You must monitor wind conditions continuously and lower the platform if wind speeds approach or exceed the manufacturer's limits. Many sites set lower thresholds than the manufacturer's maximum. An anemometer should be available on site for outdoor MEWP operations.",
  },
  {
    question: "What is the difference between an outrigger and a stabiliser?",
    answer:
      "Outriggers are extendable legs with pads that deploy from the machine's chassis to widen the support base and increase stability. They are typically used on truck-mounted and trailer-mounted MEWPs and must be fully extended and set on firm, level ground (with spreader mats if needed). Stabilisers serve a similar purpose but are usually fixed rather than telescopic, providing additional support without widening the base as significantly. Both must always be fully deployed before elevating the platform.",
  },
  {
    question: "Is a harness required when using a MEWP?",
    answer:
      "It depends on the type of MEWP and the site requirements. On boom lifts (articulated and telescopic), a full-body harness with a short lanyard attached to the designated anchor point inside the platform is almost always required — because the machine's movement can cause ejection from the basket. On scissor lifts, a harness is not always mandatory (because the platform is enclosed by guardrails) but may be required by the site-specific risk assessment or by the principal contractor's rules. Always check the risk assessment and site rules before operating any MEWP.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which type of MEWP provides vertical-only elevation and is commonly used in warehouses?",
    options: [
      "Articulated boom lift",
      "Telescopic boom lift",
      "Scissor lift",
      "Trailer-mounted boom lift",
    ],
    correctAnswer: 2,
    explanation:
      "Scissor lifts provide vertical-only elevation — the platform goes straight up and down. They are widely used in warehouses, distribution centres, and indoor environments where only vertical reach is needed.",
  },
  {
    id: 2,
    question:
      "What is the primary advantage of an articulated boom lift over a telescopic boom lift?",
    options: [
      "It can reach greater heights",
      "It can reach up and over obstacles",
      "It is lighter and easier to transport",
      "It does not require outriggers",
    ],
    correctAnswer: 1,
    explanation:
      "An articulated boom lift has a hinged (knuckle) boom that allows the platform to reach up, over, and around obstacles. A telescopic boom provides maximum straight-line reach but cannot articulate around obstacles.",
  },
  {
    id: 3,
    question:
      "IPAF category 3a covers which type of MEWP?",
    options: [
      "Static vertical (scissor lift on outriggers)",
      "Static boom (boom lift on outriggers)",
      "Mobile vertical (self-propelled scissor lift)",
      "Mobile boom (self-propelled boom lift)",
    ],
    correctAnswer: 2,
    explanation:
      "Category 3a = Mobile Vertical. The '3' means mobile (can travel with the platform elevated) and the 'a' means vertical (scissor-type, not boom-type). This covers self-propelled scissor lifts.",
  },
  {
    id: 4,
    question:
      "What must always be in place before any MEWP operation begins?",
    options: [
      "A crane to provide backup lifting",
      "A rescue plan",
      "A structural engineer on standby",
      "A minimum of three operatives",
    ],
    correctAnswer: 1,
    explanation:
      "A rescue plan must always be in place before any MEWP operation. It must detail how a stranded operative will be rescued if the platform fails to lower. The plan should include personnel, equipment, timescales, and emergency contacts.",
  },
  {
    id: 5,
    question:
      "Under LOLER 1998, what is the maximum interval between thorough examinations for a MEWP?",
    options: [
      "3 months",
      "6 months",
      "12 months",
      "24 months",
    ],
    correctAnswer: 1,
    explanation:
      "MEWPs carry people, so LOLER requires thorough examination at intervals not exceeding 6 months. Equipment that lifts goods only (not people) requires examination every 12 months.",
  },
  {
    id: 6,
    question:
      "Which pre-use check is specific to MEWPs with outriggers?",
    options: [
      "Checking the platform guardrails",
      "Testing the emergency lowering system",
      "Verifying outriggers are fully extended and set on firm ground",
      "Checking the SWL plate",
    ],
    correctAnswer: 2,
    explanation:
      "Outriggers must be fully extended and set on firm, level ground with spreader mats if necessary. Partially extended outriggers dramatically reduce the machine's stability envelope and can lead to overturning.",
  },
  {
    id: 7,
    question:
      "Which MEWP type would be most suitable for working in a narrow aisle between warehouse racking?",
    options: [
      "Articulated boom lift",
      "Telescopic boom lift",
      "Vertical mast lift",
      "Truck-mounted platform",
    ],
    correctAnswer: 2,
    explanation:
      "Vertical mast lifts have a very compact footprint and are specifically designed for confined spaces such as narrow warehouse aisles. Boom lifts are too wide and require outrigger space that is not available between racking.",
  },
  {
    id: 8,
    question:
      "An exclusion zone around a MEWP is established to:",
    options: [
      "Mark the area where only IPAF-trained operatives may enter",
      "Prevent pedestrians and vehicles from entering the area where the MEWP could topple or drop objects",
      "Indicate the maximum outreach of the boom",
      "Show where the machine's ground pressure exceeds safe limits",
    ],
    correctAnswer: 1,
    explanation:
      "Exclusion zones protect pedestrians and vehicles from the risk of the MEWP overturning, dropping tools/materials, or the boom swinging into personnel. The zone size depends on the MEWP type, reach, and task being carried out.",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function WorkingAtHeightModule2Section3() {
  useSEO({
    title: "MEWPs | Working at Height Module 2.3",
    description:
      "Mobile Elevating Work Platforms — scissor lifts, boom lifts, vertical masts, IPAF training categories, pre-use checks, exclusion zones, LOLER requirements, and rescue planning.",
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
            <CableCar className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            MEWPs
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Mobile Elevating Work Platforms — types, selection factors, IPAF
            training categories, pre-use checks, exclusion zones, rescue
            planning, and LOLER requirements
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
                  <strong className="text-white">4 main types:</strong> scissor
                  lift, articulated boom, telescopic boom, vertical mast
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">IPAF training:</strong> 1a/1b
                  static, 3a/3b mobile — mandatory before operating
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">LOLER:</strong> thorough
                  examination every 6 months (carries people)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Rescue plan:</strong> always
                  required — what if the platform won't come down?
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
                  <strong className="text-white">Pre-use checks:</strong>{" "}
                  controls, emergency lowering, guardrails, hydraulics, SWL
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Exclusion zone:</strong> set up
                  barriers to keep pedestrians and vehicles clear
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Ground conditions:</strong>{" "}
                  firm, level, no voids — use spreader mats if needed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Harness on booms:</strong>{" "}
                  short lanyard attached to platform anchor point
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
              "Identify and describe the four main types of MEWP used on UK sites",
              "Select the correct MEWP type based on task requirements and site conditions",
              "State the IPAF training categories and which category applies to each machine type",
              "Carry out a comprehensive pre-use check on a MEWP before operation",
              "Explain the purpose and requirements of exclusion zones and rescue plans",
              "State the LOLER thorough examination interval for MEWPs",
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
        {/*  SECTION 01 — Types of MEWPs                                     */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">01</span>
              Types of MEWPs
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                A{" "}
                <strong className="text-white">
                  MEWP (Mobile Elevating Work Platform)
                </strong>{" "}
                is a powered machine with a working platform that can be raised
                and lowered mechanically. MEWPs provide a stable, enclosed
                working platform at height — a significant safety improvement
                over ladders for many tasks. The four main categories are:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h3 className="text-amber-300 font-medium mb-3">
                    Scissor Lift
                  </h3>
                  <p className="text-white/70 text-sm mb-2 leading-relaxed">
                    Provides <strong className="text-white">vertical-only</strong>{" "}
                    elevation using a crisscross (pantograph) mechanism. The
                    platform goes straight up and straight down with no lateral
                    outreach.
                  </p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Working heights typically 6m to 18m</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Large platform area — can accommodate multiple
                        operatives and materials
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Electric (indoor) or diesel/hybrid (outdoor) models
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Ideal for ceiling work, cable tray installation, lighting
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h3 className="text-amber-300 font-medium mb-3">
                    Articulated Boom Lift
                  </h3>
                  <p className="text-white/70 text-sm mb-2 leading-relaxed">
                    Has a hinged (knuckle) boom that allows the platform to{" "}
                    <strong className="text-white">reach up and over</strong>{" "}
                    obstacles. The articulation point provides flexibility to
                    position the platform precisely.
                  </p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Working heights typically 12m to 40m+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Can reach over parapets, around structures, into awkward
                        positions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Sometimes called a "cherry picker" or "knuckle boom"
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Harness and short lanyard required — risk of ejection
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h3 className="text-amber-300 font-medium mb-3">
                    Telescopic Boom Lift
                  </h3>
                  <p className="text-white/70 text-sm mb-2 leading-relaxed">
                    A straight boom that telescopes (extends) to provide{" "}
                    <strong className="text-white">maximum reach</strong> in a
                    straight line. No articulation — but delivers the greatest
                    horizontal outreach and working height.
                  </p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Working heights up to 50m+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Maximum horizontal outreach of all MEWP types
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Cannot reach over obstacles — straight-line only
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Harness always required — significant catapult risk
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h3 className="text-amber-300 font-medium mb-3">
                    Vertical Mast Lift
                  </h3>
                  <p className="text-white/70 text-sm mb-2 leading-relaxed">
                    A compact platform on a single telescopic mast, designed for{" "}
                    <strong className="text-white">confined spaces</strong>.
                    Very small footprint — ideal for narrow aisles and indoor
                    environments.
                  </p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Working heights typically 5m to 12m</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Fits through standard single doorways
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Usually electric — suitable for indoor use (no emissions)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Excellent for warehouse racking, retail fit-outs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 02 — Selection Factors                                  */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Selection Factors
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Selecting the wrong MEWP is costly and dangerous. The right
                machine depends on a combination of task requirements, site
                conditions, and operational constraints. Consider these factors
                systematically:
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: Ruler,
                    factor: "Working Height Required",
                    detail:
                      "Calculate the maximum height the operative needs to reach — remembering that working height = platform height + approximately 2m standing reach. Match this to the MEWP's maximum platform height.",
                  },
                  {
                    icon: CableCar,
                    factor: "Horizontal Outreach",
                    detail:
                      "If the machine cannot be positioned directly below the work area, you need horizontal outreach. Only boom lifts provide significant outreach. Scissor lifts and vertical masts have zero or minimal outreach.",
                  },
                  {
                    icon: Shield,
                    factor: "Ground Conditions",
                    detail:
                      "Firm, level ground is essential. Rough terrain models (with larger tyres and 4WD) are needed on uneven construction sites. Indoor machines with smooth tyres are not suitable for outdoor soft ground.",
                  },
                  {
                    icon: Gauge,
                    factor: "Weight Capacity (SWL)",
                    detail:
                      "Check the Safe Working Load — the total weight of operatives, tools, and materials the platform can support. Exceeding the SWL risks overturning the machine.",
                  },
                  {
                    icon: Info,
                    factor: "Indoor vs Outdoor Use",
                    detail:
                      "Indoor machines are electric (zero emissions, quiet, non-marking tyres). Outdoor machines may be diesel, bi-energy, or hybrid with rough-terrain capability and higher wind tolerances.",
                  },
                  {
                    icon: Eye,
                    factor: "Power Source",
                    detail:
                      "Electric (battery), diesel, bi-energy (electric + diesel), or hybrid. Indoor environments require electric. Outdoor long-duration tasks may need diesel. Battery life must cover the shift.",
                  },
                ].map(({ icon: Icon, factor, detail }, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-purple-400/30 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm">
                          {factor}
                        </p>
                        <p className="text-white/60 text-xs leading-relaxed mt-1">
                          {detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── MEWP Selection Guide ── */}
              <div className="bg-[#111] border border-white/10 rounded-xl p-5 sm:p-6">
                <h3 className="text-amber-400 font-semibold text-base mb-4 text-center">
                  MEWP Selection Guide — Decision Matrix
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[500px]">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-white/60 pb-2 pr-3 font-medium">
                          Requirement
                        </th>
                        <th className="text-white/60 pb-2 pr-3 font-medium text-center">
                          Scissor
                        </th>
                        <th className="text-white/60 pb-2 pr-3 font-medium text-center">
                          Articulated Boom
                        </th>
                        <th className="text-white/60 pb-2 pr-3 font-medium text-center">
                          Telescopic Boom
                        </th>
                        <th className="text-white/60 pb-2 font-medium text-center">
                          Vertical Mast
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Vertical-only access</td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          Best
                        </td>
                        <td className="py-2 pr-3 text-center text-white/40">
                          &mdash;
                        </td>
                        <td className="py-2 pr-3 text-center text-white/40">
                          &mdash;
                        </td>
                        <td className="py-2 text-center text-green-400">
                          Good
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Reach over obstacles</td>
                        <td className="py-2 pr-3 text-center text-red-400">
                          No
                        </td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          Best
                        </td>
                        <td className="py-2 pr-3 text-center text-amber-400">
                          Limited
                        </td>
                        <td className="py-2 text-center text-red-400">
                          No
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Maximum height</td>
                        <td className="py-2 pr-3 text-center text-amber-400">
                          18m
                        </td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          40m+
                        </td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          50m+
                        </td>
                        <td className="py-2 text-center text-amber-400">
                          12m
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Maximum outreach</td>
                        <td className="py-2 pr-3 text-center text-red-400">
                          None
                        </td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          15m+
                        </td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          25m+
                        </td>
                        <td className="py-2 text-center text-red-400">
                          None
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Confined spaces</td>
                        <td className="py-2 pr-3 text-center text-amber-400">
                          Some
                        </td>
                        <td className="py-2 pr-3 text-center text-red-400">
                          No
                        </td>
                        <td className="py-2 pr-3 text-center text-red-400">
                          No
                        </td>
                        <td className="py-2 text-center text-green-400">
                          Best
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 pr-3">Platform capacity</td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          Largest
                        </td>
                        <td className="py-2 pr-3 text-center text-amber-400">
                          1–2 persons
                        </td>
                        <td className="py-2 pr-3 text-center text-amber-400">
                          1–2 persons
                        </td>
                        <td className="py-2 text-center text-amber-400">
                          1 person
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3">Indoor suitability</td>
                        <td className="py-2 pr-3 text-center text-green-400">
                          Excellent
                        </td>
                        <td className="py-2 pr-3 text-center text-red-400">
                          Poor
                        </td>
                        <td className="py-2 pr-3 text-center text-red-400">
                          Poor
                        </td>
                        <td className="py-2 text-center text-green-400">
                          Excellent
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-amber-400 text-xs font-semibold mb-1">
                    Quick Selection Rule
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    <strong className="text-white">No outreach needed?</strong>{" "}
                    Use a scissor lift (or vertical mast in tight spaces).{" "}
                    <strong className="text-white">
                      Need to reach over something?
                    </strong>{" "}
                    Use an articulated boom.{" "}
                    <strong className="text-white">
                      Maximum reach in a straight line?
                    </strong>{" "}
                    Use a telescopic boom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/*  SECTION 03 — IPAF Training Categories                           */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              IPAF Training Categories
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                <strong className="text-white">
                  IPAF (International Powered Access Federation)
                </strong>{" "}
                is the globally recognised training scheme for MEWP operators.
                In the UK, IPAF Powered Access Licence (PAL) cards are the
                standard proof of competence. Training is category-based — you
                must hold the correct category for the machine you intend to
                operate.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  Understanding the Category System
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  The first number indicates whether the machine is{" "}
                  <strong className="text-white">static (1)</strong> or{" "}
                  <strong className="text-white">mobile (3)</strong>. Static
                  machines must be in a fixed position before elevating. Mobile
                  machines can drive while the platform is raised. The letter
                  indicates the platform type:{" "}
                  <strong className="text-white">a = vertical</strong>{" "}
                  (scissor), <strong className="text-white">b = boom</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                  <h4 className="text-teal-300 font-medium mb-2">
                    Category 1a — Static Vertical
                  </h4>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Scissor lift that <strong className="text-white">cannot travel</strong>{" "}
                        while elevated
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Must be positioned and set up before raising
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Example: trailer-mounted scissor lift with outriggers
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                  <h4 className="text-teal-300 font-medium mb-2">
                    Category 1b — Static Boom
                  </h4>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Boom lift that <strong className="text-white">cannot travel</strong>{" "}
                        while elevated
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Positioned on outriggers or stabilisers before use
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Example: truck-mounted or trailer-mounted cherry picker
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                  <h4 className="text-teal-300 font-medium mb-2">
                    Category 3a — Mobile Vertical
                  </h4>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Self-propelled scissor lift that{" "}
                        <strong className="text-white">can drive while elevated</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The most common MEWP type on commercial/industrial sites
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Example: electric self-propelled scissor lift for
                        warehouse use
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                  <h4 className="text-teal-300 font-medium mb-2">
                    Category 3b — Mobile Boom
                  </h4>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Self-propelled boom lift that{" "}
                        <strong className="text-white">can drive while elevated</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Covers both articulated and telescopic self-propelled
                        booms
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Harness always required when operating from the platform
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-2">
                  IPAF PAL Card
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  On successful completion of IPAF training, the operator
                  receives a PAL (Powered Access Licence) card showing the
                  categories they are trained for. The card is valid for{" "}
                  <strong className="text-white">5 years</strong> and must be
                  renewed before expiry. Operators must carry the card at all
                  times when operating a MEWP. Most hire companies will not
                  release a MEWP without seeing a valid PAL card.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 04 — Pre-Use Checks                                     */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Pre-Use Checks
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                A thorough pre-use check must be carried out{" "}
                <strong className="text-white">before every shift</strong> by
                the operator. This is not a substitute for the 6-monthly LOLER
                thorough examination — it is an additional daily requirement.
                Pre-use checks take 10–15 minutes and can prevent serious
                incidents.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5" />
                  Pre-Use Checklist
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      item: "Platform controls",
                      check:
                        "Test all directional and elevation controls from the platform. Ensure controls respond correctly and return to neutral when released (dead-man controls).",
                    },
                    {
                      item: "Ground-level controls",
                      check:
                        "Verify ground-level override controls function — these are used for emergency lowering and must override the platform controls.",
                    },
                    {
                      item: "Emergency lowering system",
                      check:
                        "Test the emergency lowering mechanism to confirm the platform can be lowered manually if the normal system fails. This is critical for rescue scenarios.",
                    },
                    {
                      item: "Platform guardrails",
                      check:
                        "Check all guardrails, mid-rails, and toe boards are in place, secure, and undamaged. The platform gate must close and latch properly.",
                    },
                    {
                      item: "Outriggers / stabilisers",
                      check:
                        "If fitted, check outriggers extend, lock, and retract correctly. Inspect pads and pins. Verify the machine's level indicator reads correctly.",
                    },
                    {
                      item: "Tyres and wheels",
                      check:
                        "Inspect tyres for damage, proper inflation, and correct type (indoor/outdoor). Check wheel nuts and braking system.",
                    },
                    {
                      item: "Hydraulic system",
                      check:
                        "Inspect for hydraulic fluid leaks — around cylinders, hoses, fittings, and the hydraulic tank. Check fluid level against the gauge.",
                    },
                    {
                      item: "SWL plate",
                      check:
                        "Confirm the Safe Working Load (SWL) plate is present, legible, and shows the maximum number of persons and total weight permitted on the platform.",
                    },
                    {
                      item: "LOLER certificate",
                      check:
                        "Verify the current thorough examination certificate is in date (within the last 6 months). If expired, the machine must not be used until re-examined.",
                    },
                  ].map((point, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium text-sm">
                            {point.item}
                          </p>
                          <p className="text-white/60 text-xs leading-relaxed mt-1">
                            {point.check}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Defect Found = Machine Out of Service
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  If any defect is found during the pre-use check, the machine
                  must not be operated. Isolate it (remove the key), attach a
                  "DO NOT USE" tag, and report the defect to the hire company or
                  fleet manager. Never attempt to repair a MEWP yourself unless
                  you are a qualified service engineer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/*  SECTION 05 — Exclusion Zones & Ground Conditions                */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Exclusion Zones &amp; Ground Conditions
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Exclusion zones prevent pedestrians, vehicles, and other site
                traffic from entering the area around a MEWP during operation.
                They protect against the risk of being struck by the machine, by
                falling objects, or by the machine overturning.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Setting Up an Exclusion Zone
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Use barriers, cones, and warning tape to mark the zone
                      perimeter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The zone must extend beyond the maximum swing radius of
                      the boom (for boom lifts)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      For scissor lifts, the zone should extend at least 2
                      metres from the machine base
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Consider falling object risk — tools and materials could
                      fall from the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      A banksman may be needed to control traffic and pedestrian
                      movement
                    </span>
                  </li>
                </ul>
              </div>

              <h3 className="text-white font-semibold text-base mt-4">
                Ground Conditions
              </h3>

              <p>
                Ground conditions directly affect MEWP stability. The machine
                exerts significant point loads — particularly when outriggers are
                deployed. Ground failure under an outrigger can cause the
                machine to overturn instantly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-amber-400 font-medium mb-2">
                    Ground Must Be:
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Firm — capable of supporting the machine's total weight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Level — within the machine's tolerance (typically 1–3 degrees)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Free from voids, excavations, and underground services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Clear of soft spots, drains, manholes, and loose fill</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-amber-400 font-medium mb-2">
                    Mitigation Measures:
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Spreader mats / load-spreading plates under outriggers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Ground protection mats for soft-terrain areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Ground-bearing capacity assessment before heavy machines arrive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Selecting rough-terrain models for unpaved surfaces</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 06 — Rescue Plan & LOLER                                */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">06</span>
              Rescue Plans &amp; LOLER Requirements
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Two critical requirements apply to every MEWP operation: a{" "}
                <strong className="text-white">rescue plan</strong> and
                compliance with{" "}
                <strong className="text-white">
                  LOLER (Lifting Operations and Lifting Equipment Regulations
                  1998)
                </strong>
                .
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3 flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5" />
                  Rescue Plan
                </h3>
                <p className="text-white/70 text-sm mb-3 leading-relaxed">
                  Every MEWP operation must have a rescue plan in place{" "}
                  <strong className="text-white">before work begins</strong>.
                  The plan addresses a simple but critical question:{" "}
                  <em>
                    "What happens if the platform fails to lower and the
                    operative is stranded at height?"
                  </em>
                </p>
                <div className="space-y-2">
                  {[
                    "Who will carry out the rescue — trained personnel must be available on site",
                    "What equipment will be used — ground-level controls, secondary MEWP, descent equipment",
                    "How long the rescue will take — a reasonable timeframe must be established",
                    "Emergency services contact details and site access routes",
                    "Communication method — how will the stranded operative alert ground personnel",
                    "Medical considerations — what if the operative is incapacitated at height",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="text-white/70 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  LOLER Requirements
                </h3>
                <p className="text-white/80 text-sm mb-3 leading-relaxed">
                  Because MEWPs carry people, they are classified as{" "}
                  <strong className="text-white">lifting equipment</strong>{" "}
                  under LOLER 1998. This imposes specific legal requirements:
                </p>
                <div className="space-y-2">
                  {[
                    {
                      req: "Thorough examination every 6 months",
                      detail:
                        "Carried out by a competent person (typically a specialist insurance engineer). Equipment lifting goods only requires examination every 12 months — but people-lifting equipment requires double the frequency.",
                    },
                    {
                      req: "Examination report on file",
                      detail:
                        "The thorough examination report must be kept and available for inspection. It details the machine's condition, any defects found, and whether it is safe to continue in service.",
                    },
                    {
                      req: "Planned lifting operation",
                      detail:
                        "Each MEWP operation should be properly planned by a competent person, supervised, and carried out safely. The risk assessment must cover the specific task.",
                    },
                    {
                      req: "SWL not exceeded",
                      detail:
                        "The Safe Working Load must never be exceeded. This includes the total weight of all persons, tools, materials, and equipment on the platform.",
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
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

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
          <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* ── Bottom Navigation ── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Scaffolding Basics
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2-section-4">
              Next: Other Access Equipment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
