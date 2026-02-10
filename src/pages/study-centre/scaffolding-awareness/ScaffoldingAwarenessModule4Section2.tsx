import { ArrowLeft, Search, CheckCircle, AlertTriangle, ClipboardCheck, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "foundation-check",
    question:
      "During a scaffold inspection, you notice that one sole board has sunk approximately 30mm into soft ground. What should you do?",
    options: [
      "Continue the inspection — 30mm of settlement is within acceptable limits",
      "Place an additional sole board on top of the sunk one and continue working",
      "Stop using the scaffold, report the defect, and tag it as unsafe until a competent person has assessed and remedied the settlement",
      "Ignore it unless the scaffold is visibly leaning",
    ],
    correctIndex: 2,
    explanation:
      "Any visible settlement of sole boards or base plates is a defect that must be reported and rectified before the scaffold is used. Settlement can cause uneven loading, loss of plumb in standards, and progressive structural failure. The scaffold must be taken out of use and tagged as unsafe until a competent scaffolder has assessed the situation, re-levelled the base, and confirmed the scaffold is safe.",
  },
  {
    id: "guardrail-height",
    question:
      "You measure a guardrail on a working platform and find it is 870mm above the platform surface. Is this acceptable?",
    options: [
      "Yes — anything above 800mm is acceptable",
      "No — guardrails must be at least 950mm above the platform surface, this scaffold must not be used until corrected",
      "Yes — 870mm is close enough and within normal tolerance",
      "It depends on the height of the scaffold",
    ],
    correctIndex: 1,
    explanation:
      "The Work at Height Regulations 2005 require guardrails to be at least 950mm above the working platform surface. A guardrail at 870mm is 80mm below the minimum requirement and does not provide adequate fall protection. The scaffold must not be used until the guardrail has been raised to the correct height by a competent scaffolder. There is no tolerance on this minimum height — 950mm means 950mm.",
  },
  {
    id: "board-gap",
    question:
      "You notice a 35mm gap between two scaffold boards on a working platform. What action is required?",
    options: [
      "No action needed — gaps up to 50mm are permitted",
      "Place a piece of plywood over the gap as a temporary fix",
      "The scaffold must not be used — gaps must not exceed 25mm, and this must be reported and corrected by a competent scaffolder",
      "Push the boards closer together yourself and carry on",
    ],
    correctIndex: 2,
    explanation:
      "Gaps between scaffold boards must not exceed 25mm. A 35mm gap is a trip hazard and could allow tools, materials, or debris to fall through to people below. The platform must not be used until the boards have been repositioned by a competent scaffolder to close the gap. Never attempt to reposition boards yourself unless you are a competent scaffolder — moving boards can destabilise the platform.",
  },
];

const faqs = [
  {
    question:
      "Can I carry out a scaffold inspection myself, or does it have to be a scaffolder?",
    answer:
      "Under the Work at Height Regulations 2005 (Schedule 7), scaffold inspections must be carried out by a competent person. This does not necessarily mean a qualified scaffolder — it means someone with sufficient training, knowledge, and experience to identify defects and assess whether the scaffold is safe to use. In practice, many employers train site supervisors, site managers, or designated operatives to carry out routine inspections using a structured checklist. However, if defects are found, only a competent scaffolder should carry out repairs or alterations. The key question is whether the inspector has the competence to identify ALL the things that could be wrong — if in doubt, use a qualified scaffold inspector.",
  },
  {
    question:
      "What is the difference between a pre-use check and a formal inspection?",
    answer:
      "A pre-use check is a quick visual check carried out by the person about to use the scaffold BEFORE each use. It typically takes a few minutes and covers obvious defects such as missing boards, damaged guardrails, obstructed access, overloading, or a red/yellow scaffold tag. It does not need to be formally recorded (though many employers require it). A formal inspection is a detailed, systematic examination carried out by a competent person at statutory intervals — before first use, at least every 7 days, and after any event that could affect stability (such as adverse weather, alteration, or impact). Formal inspections must be recorded in writing and the report kept on site.",
  },
  {
    question:
      "How do I know if a coupler is tight enough during an inspection?",
    answer:
      "During a visual inspection, you can check couplers by applying hand pressure — try to move the tubes in the coupler. If the tube moves or rotates in a right-angle coupler, the coupler is not tight enough. A properly tightened coupler should resist hand pressure without any movement. You should also look for visible signs of loose couplers: gaps between the coupler jaws and the tube, couplers that have slipped down a standard, or T-bolt nuts that are visibly loose. If you have any doubt, use a torque wrench — right-angle and swivel couplers should be tightened to approximately 40-50 Nm. In practice, if you can spin the nut with your fingers, it is too loose.",
  },
  {
    question:
      "What should I do if I find a defect during an inspection but the scaffold is urgently needed?",
    answer:
      "Safety is not negotiable — if a defect makes the scaffold unsafe, it must NOT be used regardless of how urgently it is needed. Tag the scaffold with a red prohibition tag (do not use) or a yellow restriction tag if only part of the scaffold is affected. Report the defect immediately to the scaffold contractor and site management. A competent scaffolder must rectify the defect before the scaffold can be used. If the work is urgent, alternative safe access must be arranged — for example, a mobile tower, MEWP, or podium steps. Never allow production pressure to override safety. An unsafe scaffold that collapses will cause far more delay than waiting for a repair.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "When inspecting scaffold foundations, which of the following is a defect that requires immediate action?",
    options: [
      "Base plates sitting flat on sole boards with no visible gap",
      "Sole boards resting on firm, level ground with no visible settlement",
      "A base plate sitting directly on soft ground with no sole board underneath",
      "Adjustable base plates set to equal heights on a level surface",
    ],
    correctAnswer: 2,
    explanation:
      "A base plate sitting directly on soft ground without a sole board is a serious defect. Sole boards are essential to spread the load of the scaffold over a wider area of ground, preventing the base plate from sinking into soft ground. Without a sole board, the point load from the base plate can cause settlement, leading to the scaffold going out of plumb and potentially collapsing. This must be corrected before the scaffold is used.",
  },
  {
    id: 2,
    question:
      "What is the minimum height for a guardrail above the working platform surface?",
    options: [
      "750mm",
      "900mm",
      "950mm",
      "1000mm",
    ],
    correctAnswer: 2,
    explanation:
      "The Work at Height Regulations 2005 (Schedule 3) require guardrails to be at a minimum height of 950mm above the working platform surface. This height has been determined as the minimum necessary to prevent a person from falling over the guardrail. A mid-rail must also be fitted so that the unprotected gap between the guardrail and the toe board (or platform surface) does not exceed 470mm.",
  },
  {
    id: 3,
    question:
      "During a systematic inspection, in what order should you inspect a scaffold?",
    options: [
      "Top to bottom — start at the highest platform and work down",
      "Bottom to top — start at the foundations and work upward systematically",
      "Inside out — start at the boards and work outward to the standards",
      "Random order — it does not matter as long as everything is checked",
    ],
    correctAnswer: 1,
    explanation:
      "A systematic scaffold inspection should always work from the bottom to the top — starting at the foundations (sole boards, base plates, ground conditions) and working upward through standards, ledgers, transoms, bracing, ties, platforms, guardrails, and access. This logical sequence ensures nothing is missed and reflects the structural hierarchy of the scaffold — if the foundations are defective, everything above them is compromised regardless of its condition.",
  },
  {
    id: 4,
    question:
      "What is the maximum permissible gap between scaffold boards on a working platform?",
    options: [
      "10mm",
      "25mm",
      "35mm",
      "50mm",
    ],
    correctAnswer: 1,
    explanation:
      "The maximum permissible gap between scaffold boards is 25mm. Gaps larger than this are a trip hazard for workers and allow tools, materials, and debris to fall through to people below. During an inspection, any gap exceeding 25mm must be reported as a defect and the boards must be repositioned by a competent scaffolder before the platform is used.",
  },
  {
    id: 5,
    question:
      "You are inspecting the ties on a scaffold and find that two ties have been removed from a section. What should you do?",
    options: [
      "Continue the inspection — two missing ties will not make a significant difference",
      "Replace the ties yourself using spare components from the ground",
      "Immediately stop using that section of scaffold, tag it as unsafe, and report to the scaffold contractor for urgent re-tying",
      "Add extra bracing to compensate for the missing ties",
    ],
    correctAnswer: 2,
    explanation:
      "Missing ties are one of the most dangerous defects on a scaffold. Ties prevent the scaffold from pulling away from the building or overturning under wind loading or eccentric loading. Every tie is calculated as part of the scaffold design — removing even one or two ties can compromise the stability of an entire section of scaffold. The affected area must be immediately taken out of use and tagged as unsafe. Only a competent scaffolder should re-install ties, as they must be fixed to suitable anchorage points and properly tightened.",
  },
  {
    id: 6,
    question:
      "Which of the following is NOT part of a systematic scaffold inspection?",
    options: [
      "Checking that sole boards are level and not sinking into the ground",
      "Verifying that all couplers are tight and not slipping",
      "Measuring the exact weight of materials stored on each platform",
      "Checking that guardrails are at the correct height with mid-rails and toe boards",
    ],
    correctAnswer: 2,
    explanation:
      "Measuring the exact weight of materials on each platform is not a practical part of a visual inspection. However, the inspector should make a visual assessment of whether the loading appears to be within the scaffold's designed capacity — looking for signs of overloading such as excessive deflection of boards, large quantities of heavy materials, or materials stacked higher than guardrails. The other three options are all essential parts of a systematic inspection.",
  },
  {
    id: 7,
    question:
      "When inspecting standards (uprights), what are you primarily checking for?",
    options: [
      "That they are painted in the correct colour for the scaffold type",
      "That they are plumb (vertical), correctly spaced, properly spliced, and undamaged",
      "That they are made from aluminium rather than steel",
      "That they have been on site for less than 12 months",
    ],
    correctAnswer: 1,
    explanation:
      "When inspecting standards, you are checking that they are plumb (vertical) — a leaning standard indicates potential foundation failure or structural issues. You also check that they are correctly spaced according to the scaffold design, that any splices are correctly positioned (staggered and not at the same lift), and that the tubes are not bent, corroded, or damaged. The material and colour are not inspection criteria, and there is no maximum time limit for scaffold tubes on site provided they remain in good condition.",
  },
  {
    id: 8,
    question:
      "A scaffold inspection reveals that the trap door on the access ladder is jammed open and cannot be closed. Why is this a defect?",
    options: [
      "An open trap door is not a defect — it makes access easier for workers",
      "The open trap door creates a fall hazard through the opening in the platform, and the platform edge protection is incomplete at that point",
      "It is only a defect if the scaffold is more than 4 metres high",
      "It is only a defect if the ladder is not secured at the top",
    ],
    correctAnswer: 1,
    explanation:
      "A trap door that cannot be closed creates an unprotected opening in the working platform through which a person could fall. When the trap door is open, the edge protection at that point is incomplete — there is no guardrail, mid-rail, or toe board across the opening. The trap door must be repaired so that it can be closed after each use, restoring the full edge protection of the platform. This is a defect at any height, not just above 4 metres.",
  },
];

const ScaffoldingAwarenessModule4Section2 = () => {
  useSEO({
    title: "The Inspection Process | Scaffolding Awareness Module 4.2",
    description:
      "Learn the systematic scaffold inspection process from ground to top, covering foundations, standards, ledgers, transoms, bracing, ties, platforms, guardrails, access, and loading. Identify common defects and understand the correct inspection sequence.",
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
            <Link to="../scaffolding-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500/20 to-slate-600/20 border border-slate-500/30 mb-4">
            <Search className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-block bg-slate-500/10 border border-slate-500/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-slate-400">MODULE 4</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The Inspection Process
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            A systematic approach to scaffold inspection, working from the ground
            upward through every structural element to identify defects before
            they become failures
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="font-semibold text-slate-400 mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Bottom to top:</strong> always
                  inspect from foundations upward — ground, base plates, standards,
                  ledgers, transoms, bracing, ties, platforms, guardrails, access
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Guardrails:</strong> minimum
                  950mm, mid-rails fitted, toe boards in place, no gaps exceeding
                  470mm
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Boards:</strong> no gaps
                  exceeding 25mm, boards in good condition, fully supported
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Ties:</strong> every tie must
                  be present, tight, and not removed — missing ties can cause
                  collapse
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="font-semibold text-slate-400/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Use a checklist:</strong> never
                  rely on memory — a structured checklist ensures every element is
                  checked in order
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Record findings:</strong> write
                  down what you find — both defects and confirmations that elements
                  are satisfactory
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Defects found:</strong> tag the
                  scaffold immediately and report to the scaffold contractor — do
                  not allow use until rectified
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Check the tag:</strong> before
                  using any scaffold, always check the scaffold tag — green means
                  safe, red means do not use
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
              "Describe the correct sequence for a systematic scaffold inspection from ground level upward",
              "Identify the key inspection points for foundations including sole boards, base plates, and ground conditions",
              "Explain what to check when inspecting standards, ledgers, transoms, and bracing",
              "State the requirements for ties and the dangers of missing or removed ties",
              "Identify defects in working platforms including gaps, board condition, and overhang",
              "State the minimum guardrail height, mid-rail requirements, and toe board specifications",
              "Describe what to check regarding scaffold access including ladders, trap doors, and internal stairways",
              "Recognise the signs of overloading and explain why loading limits must be observed",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Systematic Approach */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">01</span>
              The Systematic Approach
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A scaffold inspection must be <strong className="text-white">systematic</strong> — not
                a casual glance or a quick walk-around. The competent person must follow a logical
                sequence, checking every structural element in order, so that nothing is missed. The
                universally accepted method is to inspect from the{" "}
                <strong className="text-white">ground upward</strong>, starting at the foundations
                and working through each lift to the top of the scaffold.
              </p>

              <p>
                This bottom-to-top approach reflects the structural hierarchy of a scaffold. If the
                foundations are defective, everything above them is compromised — no matter how good
                the rest of the scaffold looks. A leaning standard caused by a sinking base plate
                affects every ledger, transom, platform, and guardrail above it. By starting at
                ground level, you establish whether the structural base is sound before examining
                anything else.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-400">
                  Key Principle: Use a Checklist
                </h3>
                <p className="text-white/80 text-sm">
                  Never rely on memory during an inspection. A structured checklist ensures that
                  every element is checked in the correct order and that findings are recorded as
                  the inspection progresses. Many organisations use a standard inspection form
                  based on the requirements of the Work at Height Regulations 2005 (Schedule 7).
                  The checklist should be completed on site during the inspection — not filled in
                  afterwards from memory.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-2">
                  The Inspection Sequence
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  The following sequence should be followed for every formal inspection:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 1 — Foundations:</strong>{" "}
                      ground conditions, sole boards, base plates, adjustable legs
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 2 — Standards:</strong>{" "}
                      plumb, spacing, splices, condition of tubes
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 3 — Ledgers:</strong>{" "}
                      level, couplers tight, no missing ledgers
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 4 — Transoms:</strong>{" "}
                      spacing correct, couplers tight, supporting boards properly
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 5 — Bracing:</strong>{" "}
                      complete as per design, couplers tight, not removed
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 6 — Ties:</strong>{" "}
                      all present, tight, anchored correctly, not removed by trades
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 7 — Platforms:</strong>{" "}
                      boards complete, in good condition, no gaps exceeding 25mm
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 8 — Guardrails:</strong>{" "}
                      minimum 950mm, mid-rails, toe boards in place
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 9 — Access:</strong>{" "}
                      ladders secured, trap doors operational, stairways clear
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 10 — Loading:</strong>{" "}
                      within design limits, no excessive storage of materials
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Step 11 — Overall condition:</strong>{" "}
                      general appearance, signage, hazard proximity, public protection
                    </div>
                  </li>
                </ul>
              </div>

              {/* Systematic Inspection Checklist Diagram */}
              <div className="my-6">
                <h3 className="text-slate-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Systematic Inspection Checklist (Ground to Top)
                </h3>

                <div className="flex gap-3 sm:gap-4">
                  {/* Arrow label - left side */}
                  <div className="flex flex-col items-center justify-between py-2 flex-shrink-0">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">
                      Ground
                      <br />
                      level
                    </span>
                    <div className="flex-1 w-0.5 bg-gradient-to-b from-slate-500 via-slate-400 to-slate-300 my-2"></div>
                    <span className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider whitespace-nowrap">
                      Top
                      <br />
                      level
                    </span>
                  </div>

                  {/* Inspection levels */}
                  <div className="flex-1 space-y-1.5">
                    <div className="w-full rounded-lg bg-amber-500/15 border border-amber-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-amber-300 font-bold text-xs sm:text-sm">1. FOUNDATIONS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Sole boards, base plates, ground conditions, settlement
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-slate-500/15 border border-slate-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-slate-300 font-bold text-xs sm:text-sm">2. STANDARDS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Plumb, spacing, splices, tube condition
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-slate-500/15 border border-slate-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-slate-300 font-bold text-xs sm:text-sm">3. LEDGERS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Level, couplers tight, no missing members
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-slate-500/15 border border-slate-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-slate-300 font-bold text-xs sm:text-sm">4. TRANSOMS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Spacing, couplers, board support
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-blue-500/15 border border-blue-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-blue-300 font-bold text-xs sm:text-sm">5. BRACING</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Complete as per design, couplers tight
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-red-500/15 border border-red-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-red-300 font-bold text-xs sm:text-sm">6. TIES</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        All present, tight, anchored, not removed
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-green-500/15 border border-green-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-green-300 font-bold text-xs sm:text-sm">7. PLATFORMS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Complete, no gaps &gt;25mm, boards sound
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-green-500/15 border border-green-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-green-300 font-bold text-xs sm:text-sm">8. GUARDRAILS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        950mm height, mid-rails, toe boards
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-purple-500/15 border border-purple-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-purple-300 font-bold text-xs sm:text-sm">9. ACCESS</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Ladders secured, trap doors, stairways
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-orange-500/15 border border-orange-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-orange-300 font-bold text-xs sm:text-sm">10. LOADING</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        Within limits, no overloading, signage
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-cyan-500/15 border border-cyan-400/30 px-3 sm:px-4 py-2.5">
                      <p className="text-cyan-300 font-bold text-xs sm:text-sm">11. OVERALL</p>
                      <p className="text-white/60 text-[11px] sm:text-xs">
                        General condition, signage, public protection
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-slate-500/30 rounded-lg p-3">
                  <p className="text-slate-300 text-xs sm:text-sm font-medium">
                    Always start from the ground and work up. If the foundations are defective,
                    everything above is compromised — there is no point checking guardrails if
                    the scaffold is sinking into the ground.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Inspecting Foundations */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">02</span>
              Inspecting Foundations
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The foundation is the most critical element of any scaffold. If the base fails,
                the entire structure above it is compromised. Foundation inspection covers the
                ground conditions, sole boards, base plates, and any adjustable legs. Every
                standard (upright) must be properly supported and transferring its load safely
                to the ground.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">
                  Foundation Inspection Checklist
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Ground conditions:</strong>{" "}
                      is the ground firm, level, and capable of supporting the scaffold load?
                      Look for signs of waterlogging, soft spots, recent excavation, or
                      underground voids. Ground conditions can change after heavy rain — what
                      was firm last week may be soft today
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Sole boards:</strong>{" "}
                      are sole boards in place under every base plate? Are they of adequate
                      size and thickness to spread the load? Are they level, not cracked or
                      split, and sitting flat on the ground with no rocking? Sole boards must
                      be timber (not bricks, blocks, or other makeshift packing)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Base plates:</strong>{" "}
                      is every standard sitting on a base plate? Are the base plates centred
                      on the sole boards? Are they flat and not bent or damaged? Is the standard
                      located centrally in the base plate spigot?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Settlement:</strong>{" "}
                      is there any visible settlement of base plates or sole boards into the
                      ground? Even small amounts of settlement can cause standards to go out of
                      plumb. Look for base plates that appear lower than adjacent ones or sole
                      boards that have sunk into soft ground
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Adjustable base plates:</strong>{" "}
                      if the scaffold uses adjustable (screw-jack) base plates, check that they
                      are not extended beyond the maximum permitted extension (typically 300mm
                      for standard base plates) and that the locking nuts are tight
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Drainage:</strong>{" "}
                      is water pooling around the base of the scaffold? Standing water can
                      soften the ground and undermine sole boards. Check that site drainage
                      directs water away from scaffold foundations
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    Makeshift Packing Is Never Acceptable
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Base plates must be supported on proper sole boards — never on bricks, concrete
                  blocks, off-cuts of timber, pallets, or other makeshift packing. These materials
                  can crack, shift, or collapse under load. If the ground is uneven, adjustable
                  base plates should be used on proper sole boards — not bricks stacked up to
                  make up the difference. If you see makeshift packing during an inspection, the
                  scaffold must not be used until the foundations have been properly rectified by
                  a competent scaffolder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Inspecting Standards */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">03</span>
              Inspecting Standards (Uprights)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Standards are the vertical tubes that carry the weight of the scaffold, the
                platforms, the workers, and any stored materials down to the foundations.
                If a standard is out of plumb, damaged, or improperly spliced, the structural
                integrity of the entire scaffold bay is affected.
              </p>

              <div className="bg-white/5 border border-slate-400/30 p-4 rounded-lg">
                <h3 className="text-slate-300 font-medium mb-3">
                  Standards Inspection Points
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Plumb (vertical):</strong>{" "}
                      standards must be vertical. A leaning standard is a sign of
                      foundation settlement, loose couplers, or structural distortion.
                      Use a spirit level or plumb line if there is any doubt — visual
                      assessment alone can be misleading on tall scaffolds
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Spacing:</strong>{" "}
                      standards must be spaced according to the scaffold design. For a
                      general-purpose scaffold, standard spacing is typically between
                      1.8m and 2.4m along the length. Check that no bays are wider than
                      the design permits
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Splices:</strong>{" "}
                      where two tubes are joined to form one standard, the splice must be
                      made with a proper sleeve coupler or external joint pin. Splices in
                      adjacent standards must be <strong className="text-white">staggered</strong>{" "}
                      — never at the same lift. Check that the splice is positioned within
                      the middle third of the lift height
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Tube condition:</strong>{" "}
                      check for bent tubes, deep corrosion, dents, or cracks. Scaffold
                      tubes that are significantly corroded lose wall thickness and
                      therefore load-carrying capacity. Bent tubes must be replaced, not
                      straightened and re-used
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Continuity:</strong>{" "}
                      every standard must run continuously from the base plate to the top
                      of the scaffold. There must be no breaks or missing sections in any
                      standard
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Inspecting Ledgers, Transoms, and Bracing */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              Inspecting Ledgers, Transoms & Bracing
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Ledgers, transoms, and bracing are the horizontal and diagonal members that
                connect the standards, support the platforms, and provide stability against
                lateral and wind forces. Each has a distinct structural role, and each must
                be inspected for correct installation, tight couplers, and good condition.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Ledgers
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Ledgers are the horizontal tubes that run along the length of the scaffold,
                  connecting standards at each lift height. They provide lateral restraint to the
                  standards and support the transoms.
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Level:</strong>{" "}
                      ledgers must be horizontal. A ledger that dips or rises between standards
                      indicates that the standards are at different heights or the couplers have
                      slipped
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Couplers tight:</strong>{" "}
                      check every coupler connecting ledgers to standards. Apply hand pressure —
                      there should be no movement. Look for couplers that have slipped down the
                      standard or have visibly loose T-bolts
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">No missing ledgers:</strong>{" "}
                      every standard-to-standard connection must have a ledger at each lift
                      height on both the inner and outer rows. Missing ledgers reduce the
                      structural capacity of the scaffold
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Transoms
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Transoms are the horizontal tubes that span across the scaffold from the
                  inner row to the outer row of standards. They support the scaffold boards
                  that form the working platform.
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Spacing:</strong>{" "}
                      transoms must be spaced according to the scaffold design — typically
                      at every standard position plus intermediate transoms as needed to support
                      the boards. No scaffold board should span more than four transoms or be
                      unsupported at any point
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Couplers tight:</strong>{" "}
                      transoms are connected to ledgers using right-angle couplers or
                      putlog couplers. Check that all couplers are tight and that the
                      transoms have not rotated or moved out of position
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Board support:</strong>{" "}
                      check that every scaffold board is supported by at least three transoms.
                      Boards must overhang their end transoms by at least 50mm but no more
                      than four times the board thickness (typically no more than 150mm for a
                      38mm board)
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">
                  Bracing
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Bracing provides diagonal stiffness to the scaffold, preventing it from
                  racking (distorting into a parallelogram shape) under lateral forces such
                  as wind loading or eccentric loading from workers and materials.
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Complete as per design:</strong>{" "}
                      check that all bracing shown on the scaffold design drawing is in place.
                      This includes facade bracing (on the outside face), ledger bracing
                      (connecting inner and outer standards diagonally in plan), and any
                      additional bracing specified for the scaffold configuration
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Couplers tight:</strong>{" "}
                      bracing is typically connected using swivel couplers, which allow the
                      brace to be fixed at any angle. Check that all swivel couplers are
                      tight — loose bracing provides no structural benefit
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Not removed:</strong>{" "}
                      bracing is sometimes removed by workers to gain access or to allow
                      materials to be loaded. This is extremely dangerous — removing bracing
                      can cause the scaffold to collapse under wind loading or eccentric loading.
                      All bracing must remain in place unless a competent scaffolder redesigns
                      the scaffold to account for the modification
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Inspecting Ties */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">05</span>
              Inspecting Ties
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Ties connect the scaffold to the building or structure, preventing it from
                pulling away or overturning. They are one of the most safety-critical elements
                of any scaffold — and one of the most commonly interfered with by other trades.
                Missing ties are a leading cause of scaffold collapse in the UK.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Missing Ties Kill
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Every tie in a scaffold has been calculated as part of the structural design.
                  Removing even one tie changes the load path and can overload the remaining ties.
                  In high winds, a scaffold with missing ties can overturn completely — crushing
                  anyone beneath it and anyone on it. The HSE has investigated numerous fatal
                  scaffold collapses where the primary cause was ties that had been removed by
                  other trades and not replaced.
                </p>
              </div>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">
                  Tie Inspection Points
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">All ties present:</strong>{" "}
                      compare the number and location of ties to the scaffold design drawing.
                      Every tie shown on the design must be in place. Count them — do not
                      assume they are all there because the scaffold &ldquo;looks right&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Tight and secure:</strong>{" "}
                      check that every tie is tight — there should be no slack or play in
                      the tie. Apply hand pressure to each tie to verify it is firmly connected
                      at both ends (the scaffold and the building)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Properly anchored:</strong>{" "}
                      the building end of the tie must be fixed to a structurally sound
                      anchorage point — typically a through-tie through a window opening or a
                      ring bolt fixed into solid masonry. Ties should not be fixed to window
                      frames, rainwater pipes, fascia boards, or other non-structural elements
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Not removed by trades:</strong>{" "}
                      trades sometimes remove ties to gain access for cladding, rendering,
                      painting, or window installation. If any ties have been removed, the
                      scaffold must not be used until they have been replaced by a competent
                      scaffolder. Check with site management whether any ties have been
                      temporarily removed
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Tie pattern:</strong>{" "}
                      ties must follow the pattern specified in the scaffold design — typically
                      at every other standard at every other lift (a staggered pattern), but
                      this varies depending on the scaffold height, configuration, and wind
                      loading requirements
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-400">
                  Practical Tip: Tie Checks
                </h3>
                <p className="text-white/80 text-sm">
                  Ties should be checked at every inspection, but also whenever you notice
                  other trades working in areas where ties are located. If a plasterer, painter,
                  or cladder is working on the facade, check that they have not removed ties to
                  do their work. Establish a system where trades must notify the scaffold
                  contractor before removing any tie — and the scaffold contractor must install
                  temporary alternative ties before the permanent tie is removed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Inspecting Platforms and Guardrails */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">06</span>
              Inspecting Platforms & Guardrails
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Working platforms and guardrails are the elements that directly protect
                workers from falls — the single greatest cause of death in the construction
                industry. A platform that is incomplete, has large gaps, or lacks proper
                edge protection is a fall-from-height hazard that can be fatal.
              </p>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-3">
                  Platform Inspection Points
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Boards complete:</strong>{" "}
                      every working platform must be fully boarded across its full width.
                      There should be no missing boards. A platform with a missing board is
                      a fall-through hazard — a person can fall through the gap or step into
                      it and lose their balance
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Gaps no greater than 25mm:</strong>{" "}
                      check the gaps between adjacent boards. Gaps must not exceed 25mm. Use
                      a tape measure if there is any doubt. Gaps that are too wide are a trip
                      hazard and allow small tools or debris to fall through to people below
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Board condition:</strong>{" "}
                      check every board for cracks, splits, warping, rot, excessive wear, or
                      damage. Boards that are cracked or split can break under load. Boards
                      that are warped do not sit flat and create a trip hazard. Boards with
                      excessive knots or defects in the timber must be replaced
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Board overhang:</strong>{" "}
                      boards must overhang the end transom by at least 50mm but no more than
                      four times the board thickness (typically no more than 150mm for a 38mm
                      thick board). Boards that overhang too far become a tipping hazard when
                      a worker steps on the unsupported end
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Boards secured:</strong>{" "}
                      boards must be secured against displacement by wind uplift or accidental
                      movement. This is typically achieved using board retaining clips or by
                      nailing boards to transoms. Check that clips are in place and that boards
                      cannot be lifted or slid out of position
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Clear of debris:</strong>{" "}
                      platforms must be free from loose materials, tools, brick rubble, mortar
                      droppings, and standing water. A cluttered platform is a trip hazard and
                      can obstruct emergency escape routes
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-3">
                  Guardrail Inspection Points
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Height — minimum 950mm:</strong>{" "}
                      the top guardrail must be at least 950mm above the working platform
                      surface. Measure from the top of the board to the top of the guardrail
                      tube. There is no tolerance — 950mm means 950mm
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Mid-rail:</strong>{" "}
                      a mid-rail must be fitted so that the unprotected gap between the
                      guardrail and the toe board (or platform surface) does not exceed
                      470mm. The mid-rail prevents a person from rolling or sliding under
                      the top guardrail
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Toe boards:</strong>{" "}
                      toe boards must be fitted at every working platform edge to a minimum
                      height of 150mm above the platform surface. They prevent materials,
                      tools, and debris from being kicked off the edge of the platform onto
                      people below. Check that toe boards are in place, undamaged, and
                      securely fixed
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Continuous protection:</strong>{" "}
                      guardrails, mid-rails, and toe boards must be continuous around all
                      open sides of the working platform. There should be no gaps or
                      unprotected sections. Check particularly at corners, returns, and
                      loading bay openings
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Securely fixed:</strong>{" "}
                      guardrail tubes must be securely fixed to the standards using right-angle
                      couplers. Apply hand pressure — the guardrail should not move or flex
                      excessively. A guardrail that gives way under pressure will not stop a
                      person from falling
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-slate-400">
                  Key Measurements to Remember
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-400">950mm</p>
                    <p className="text-white/60 text-xs mt-1">Minimum guardrail height</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-400">470mm</p>
                    <p className="text-white/60 text-xs mt-1">Maximum unprotected gap</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-400">150mm</p>
                    <p className="text-white/60 text-xs mt-1">Minimum toe board height</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-400">25mm</p>
                    <p className="text-white/60 text-xs mt-1">Maximum board gap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Inspecting Access and Loading */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Inspecting Access & Loading
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Safe access to and from the working platform is essential. Workers must be
                able to get on and off the scaffold safely at every level. Loading is equally
                important — a scaffold that is overloaded can fail catastrophically, and the
                signs of overloading are often visible during an inspection.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Access Inspection Points
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Ladders secured:</strong>{" "}
                      access ladders must be securely fixed at the top to prevent them from
                      slipping or falling. The ladder must extend at least 1 metre above the
                      platform it serves (or have an equivalent handhold) to give the user
                      something to hold while stepping on and off the ladder
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Ladder condition:</strong>{" "}
                      check that ladder stiles and rungs are not cracked, bent, corroded, or
                      missing. Damaged ladders must be removed from service immediately — not
                      repaired on site
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Trap doors:</strong>{" "}
                      where ladders pass through working platforms, a trap door (hatch) must
                      be fitted. The trap door must open and close freely and must be kept
                      closed when not in use to maintain the integrity of the platform edge
                      protection. A jammed or missing trap door is a fall hazard through the
                      platform opening
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Internal stairways:</strong>{" "}
                      on larger scaffolds, internal stairway towers may be provided instead of
                      ladders. Check that stairways are clear, handrails are in place, and the
                      stairway structure is securely connected to the main scaffold
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Access not obstructed:</strong>{" "}
                      check that access routes are clear of stored materials, tools, rubble,
                      and waste. Workers must be able to access and leave the scaffold quickly
                      in an emergency
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Loading Inspection Points
                </h3>
                <ul className="text-white/70 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Within design limits:</strong>{" "}
                      every scaffold has a designed load capacity, expressed as a duty rating.
                      A general-purpose scaffold is typically rated for 2.0 kN/m&sup2;
                      (approximately 200 kg per square metre) of distributed load. Check that
                      the actual loading on the platform does not obviously exceed the design
                      capacity
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Materials not stacked too high:</strong>{" "}
                      materials stored on scaffold platforms should not be stacked higher than
                      the guardrails. Materials stacked above guardrail height can fall off the
                      edge, and the additional weight at height increases the overturning
                      moment on the scaffold
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Signs of overloading:</strong>{" "}
                      look for visible deflection (sagging) of scaffold boards under the weight
                      of stored materials. Listen for creaking sounds when walking on the
                      platform. Look for standards that appear to be bowing or bending under
                      load. These are signs that the scaffold may be approaching or exceeding
                      its design capacity
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Load notices displayed:</strong>{" "}
                      check that the scaffold has a load notice prominently displayed, stating
                      the maximum permitted loading. Workers must be aware of the load limits
                      and must not exceed them
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    Overloading Is Invisible Until It Is Too Late
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  Scaffold overloading often happens gradually. A bricklayer stacks a few extra
                  packs of bricks. A roofer stores tiles on the platform overnight. A plasterer
                  fills a barrow with mortar. Individually, none of these may seem excessive —
                  but cumulatively, they can push the scaffold well beyond its design capacity.
                  Unlike a vehicle that warns you when it is overloaded, a scaffold gives no
                  warning before it fails. The first sign of overloading is often a sudden,
                  catastrophic collapse.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Common Defects Visual Guide */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Common Defects & Overall Condition
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                In addition to the systematic check of each structural element, the inspector
                must assess the <strong className="text-white">overall condition</strong> of the
                scaffold and look for common defects that may not fall neatly into a single
                category. The following visual guide summarises the most frequently encountered
                defects and their significance.
              </p>

              {/* Common Defects Visual Guide Diagram */}
              <div className="my-6">
                <h3 className="text-cyan-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                  Common Defects Visual Guide
                </h3>

                <div className="space-y-2">
                  {/* Critical defects */}
                  <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
                      <p className="text-red-300 font-bold text-sm sm:text-base">
                        CRITICAL — Do Not Use (Red Tag)
                      </p>
                    </div>
                    <ul className="text-white/70 space-y-2 text-sm ml-5">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Missing or removed ties — scaffold at risk of overturning in wind</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Foundation settlement causing standards to lean visibly out of plumb</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Missing guardrails on a working platform — unprotected fall edge</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Missing scaffold boards creating a fall-through hazard</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Bracing removed — scaffold at risk of racking collapse</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Base plates on makeshift packing (bricks, blocks, pallets)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Obvious severe overloading — boards visibly sagging under materials</span>
                      </li>
                    </ul>
                  </div>

                  {/* Serious defects */}
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <p className="text-amber-300 font-bold text-sm sm:text-base">
                        SERIOUS — Restrict Use (Yellow Tag)
                      </p>
                    </div>
                    <ul className="text-white/70 space-y-2 text-sm ml-5">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Guardrail at less than 950mm but scaffold otherwise safe — restrict until corrected</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Missing mid-rail or toe board — partial edge protection only</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Board gaps between 25mm and 35mm — trip hazard, materials can fall through</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Loose couplers that can be moved by hand — joints not providing full restraint</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Trap door jammed open — platform opening unprotected when not in use</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Access ladder not extending 1 metre above landing platform</span>
                      </li>
                    </ul>
                  </div>

                  {/* Minor defects */}
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <p className="text-blue-300 font-bold text-sm sm:text-base">
                        MINOR — Report & Monitor
                      </p>
                    </div>
                    <ul className="text-white/70 space-y-2 text-sm ml-5">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Debris or materials cluttering the platform — housekeeping issue, clear before use</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Surface rust on tubes — cosmetic unless deep pitting is visible</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Scaffold tag faded but still legible — replace at next opportunity</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Warning signage missing or damaged — replace promptly</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                        <span>Standing water on platform after rain — sweep off before use to prevent slips</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">
                  Overall Condition Checks
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  After completing the systematic element-by-element inspection, step back and
                  assess the scaffold as a whole:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">General appearance:</strong>{" "}
                      does the scaffold look straight, level, and well-maintained? Or does it
                      look crooked, patched, or neglected? General appearance is a useful
                      indicator of how well the scaffold has been maintained
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Signage:</strong>{" "}
                      is the scaffold tag in place and current? Are load notices displayed?
                      Are warning signs visible where the scaffold is close to overhead power
                      lines, public areas, or other hazards?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Proximity hazards:</strong>{" "}
                      check for overhead power lines, nearby excavations, vehicle movements,
                      crane operations, or other site activities that could affect the scaffold.
                      Has the exclusion zone been maintained?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Public protection:</strong>{" "}
                      if the scaffold is adjacent to a public footpath, road, or occupied
                      building, check that fans, netting, brick guards, or other protection
                      is in place to prevent materials from falling onto the public. Check
                      that pedestrian walkways are properly lit, signed, and maintained
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Unauthorised alterations:</strong>{" "}
                      look for signs that the scaffold has been altered by anyone other than a
                      competent scaffolder — missing components, additional boards wedged in,
                      ropes or straps used instead of couplers, or components from different
                      scaffold systems mixed together. Any unauthorised alteration is a defect
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Sheeting and netting:</strong>{" "}
                      if the scaffold is sheeted or netted, check that the sheeting is securely
                      fixed and not torn. Sheeting significantly increases the wind loading on
                      a scaffold — the tie pattern must account for this additional load. Torn
                      sheeting that is flapping in the wind creates dynamic forces that are
                      worse than static wind loading
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Eye className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-slate-300">
                    The Inspector&rsquo;s Mindset
                  </h3>
                </div>
                <p className="text-white/70 text-sm">
                  A good scaffold inspector approaches every inspection with a{" "}
                  <strong className="text-white">critical eye</strong>. Do not start from the
                  assumption that the scaffold is safe — start from the assumption that defects
                  may be present and it is your job to find them. Every element must actively
                  pass your inspection. If you cannot confirm that an element is satisfactory,
                  treat it as a defect until proven otherwise. It is always better to tag a
                  scaffold unnecessarily than to allow workers to use a defective one.
                </p>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../scaffolding-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-4-section-3">
              Next: Scaffold Tags & Status
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default ScaffoldingAwarenessModule4Section2;
