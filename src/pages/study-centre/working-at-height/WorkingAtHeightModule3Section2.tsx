import {
  ArrowLeft,
  User,
  CheckCircle,
  AlertTriangle,
  Shield,
  Link2,
  Anchor,
  Ruler,
  Info,
  ChevronDown,
  ChevronUp,
  Calculator,
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
      "What is the key difference between a fall arrest system and a fall restraint system?",
    options: [
      "Fall arrest uses a harness, fall restraint uses a helmet",
      "Fall arrest stops a fall after it begins, fall restraint prevents the user from reaching the edge",
      "Fall arrest is for heights above 10 m, fall restraint is for below 10 m",
      "There is no difference — the terms are interchangeable",
    ],
    correctIndex: 1,
    explanation:
      "A fall restraint system prevents the worker from reaching the fall edge entirely (the lanyard is short enough to stop them getting there). A fall arrest system allows the worker to reach the edge but stops the fall after it has begun, using a shock absorber to limit deceleration forces.",
  },
  {
    id: "qc2",
    question:
      "According to EN 795, what is the minimum anchor point strength for a single-user personal fall protection anchor?",
    options: ["6 kN", "10 kN", "12 kN", "15 kN"],
    correctIndex: 1,
    explanation:
      "EN 795 specifies a minimum strength of 12 kN for multi-user anchors. For a single-user personal anchor point, 10 kN is the accepted minimum strength, though many manufacturers recommend 12 kN as a safety margin.",
  },
  {
    id: "qc3",
    question:
      "How often must a full body harness receive a thorough examination by a competent person?",
    options: [
      "Every 3 months",
      "Every 6 months",
      "Every 12 months",
      "Only after a fall arrest event",
    ],
    correctIndex: 1,
    explanation:
      "Under the Lifting Operations and Lifting Equipment Regulations (LOLER), personal fall protection equipment must receive a thorough examination by a competent person at intervals not exceeding 6 months.",
  },
];

/* ─── FAQs ─── */
const faqs = [
  {
    question:
      "Can I use a fall arrest harness with any anchor point I can find on site?",
    answer:
      "No. You must only connect to anchor points that have been specifically assessed and certified for fall arrest use. An anchor point must meet EN 795 requirements and be rated for at least 10 kN (single user) or 12 kN (multi-user). Structural elements like handrails, pipe brackets, or conduit fixings are NOT suitable anchor points — they may not withstand the forces generated during a fall arrest event.",
  },
  {
    question:
      "What happens if my shock absorber deploys but I do not actually fall?",
    answer:
      "If the shock absorber tear-webbing has even partially deployed — i.e., you can see that some of the stitching has torn — the entire lanyard/shock absorber assembly must be removed from service immediately. Partial deployment means the energy absorption capacity has been reduced and it may not perform correctly in a subsequent fall. The equipment must be inspected by a competent person and will almost certainly need replacing.",
  },
  {
    question:
      "What is suspension trauma and why does it affect harness users?",
    answer:
      "Suspension trauma (also called harness hang syndrome) occurs when a person is left suspended motionless in a harness after a fall. The leg straps compress the femoral veins, reducing blood return to the heart and causing blood to pool in the legs. This can lead to unconsciousness and, in severe cases, death within 15 to 30 minutes. This is why every fall arrest system must have an accompanying rescue plan that enables the suspended person to be retrieved quickly.",
  },
  {
    question:
      "Is a chest-only harness acceptable for fall arrest?",
    answer:
      "No. EN 361 requires a full body harness for fall arrest. Chest-only harnesses are only suitable for certain restraint or work positioning tasks (under EN 358 or EN 813). In a fall arrest event, a chest-only harness concentrates forces on the ribcage and can cause serious internal injuries. The full body harness distributes forces across shoulders, chest, and thighs.",
  },
];

/* ─── End-of-section quiz (8 questions) ─── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which European standard governs the design of full body harnesses for fall arrest?",
    options: ["EN 354", "EN 355", "EN 358", "EN 361"],
    correctAnswer: 3,
    explanation:
      "EN 361 specifies requirements for full body harnesses used as a component in a personal fall protection system. EN 354 covers lanyards, EN 355 covers energy absorbers, and EN 358 covers work positioning.",
  },
  {
    id: 2,
    question:
      "When calculating total clearance distance for a fall arrest system, which of the following must be included?",
    options: [
      "Lanyard length only",
      "Lanyard length + shock absorber deployment + body height + safety margin",
      "Harness extension + lanyard length only",
      "Fall distance to anchor point only",
    ],
    correctAnswer: 1,
    explanation:
      "Total clearance = free fall distance (lanyard length) + shock absorber deployment (typically 1.75 m) + body height below D-ring (typically 1.5 m) + safety margin (usually 1 m). All components must be added to ensure the person does not strike the surface below.",
  },
  {
    id: 3,
    question:
      "What does EN 355 specify?",
    options: [
      "Full body harnesses",
      "Energy absorbers (shock absorbers)",
      "Self-retracting lifelines",
      "Anchor devices",
    ],
    correctAnswer: 1,
    explanation:
      "EN 355 covers energy absorbers — the shock-absorbing element in a fall arrest lanyard that limits the peak deceleration force on the body to a maximum of 6 kN.",
  },
  {
    id: 4,
    question:
      "Which EN 795 class describes a horizontal flexible anchor line?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    correctAnswer: 2,
    explanation:
      "EN 795 classes: A = structural anchor, B = temporary transportable anchor, C = horizontal flexible anchor line (wire rope or webbing), D = horizontal rigid anchor rail, E = deadweight anchor.",
  },
  {
    id: 5,
    question:
      "A self-retracting lifeline (SRL) complying with EN 360 limits free fall distance to approximately:",
    options: ["0.3 m", "0.6 m", "2 m", "4 m"],
    correctAnswer: 1,
    explanation:
      "SRLs lock automatically when the extraction speed exceeds a set threshold, limiting the free fall distance to approximately 0.6 m — significantly less than a standard 2 m lanyard, which reduces the total fall forces and clearance distance required.",
  },
  {
    id: 6,
    question:
      "Where is the rear D-ring on a full body harness typically located?",
    options: [
      "On the chest strap",
      "Between the shoulder blades on the back",
      "On the left hip",
      "On the waist belt at the front",
    ],
    correctAnswer: 1,
    explanation:
      "The rear (dorsal) D-ring is positioned between the shoulder blades. This is the primary attachment point for fall arrest lanyards, as it keeps the body upright during and after a fall and distributes forces through the shoulder and thigh straps.",
  },
  {
    id: 7,
    question:
      "What maximum force must an energy absorber limit the peak arrest force to, as specified by EN 355?",
    options: ["4 kN", "6 kN", "8 kN", "10 kN"],
    correctAnswer: 1,
    explanation:
      "EN 355 stipulates that the energy absorber must limit the peak arrest force transmitted to the body to no more than 6 kN. Forces above this level can cause serious spinal and internal injuries.",
  },
  {
    id: 8,
    question:
      "Which of the following is NOT a valid reason to remove a harness from service immediately?",
    options: [
      "The harness has been used to arrest a fall",
      "Webbing shows signs of chemical staining and stiffness",
      "The harness has been stored in a dry cupboard for 3 months",
      "The manufacturer's label is illegible",
    ],
    correctAnswer: 2,
    explanation:
      "Storing a harness properly in a dry, UV-free location is correct practice — it is not a reason to discard it. However, a fall arrest event, chemical damage, and an illegible label are all valid reasons for immediate removal from service.",
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
export default function WorkingAtHeightModule3Section2() {
  useSEO({
    title:
      "Personal Fall Protection Systems | Module 3 Section 2 | Working at Height",
    description:
      "Full body harnesses, lanyards, shock absorbers, SRLs, anchor points, fall arrest vs restraint, clearance calculations, and 6-monthly examination requirements.",
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
            <User className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Personal Fall Protection Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Full body harnesses, lanyards, shock absorbers, self-retracting
            lifelines, anchor points, clearance calculations, and the critical
            differences between fall arrest, restraint, and work positioning.
          </p>
        </header>

        {/* ── Quick Summary Boxes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              When To Use
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Personal fall protection is only used when collective
              protection is not reasonably practicable.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Key Standard
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              EN 361 (harnesses), EN 354 (lanyards), EN 355 (energy
              absorbers), EN 360 (SRLs), EN 795 (anchor devices).
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Inspection Cycle
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Pre-use visual check every time. Thorough examination by a
              competent person every 6 months.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Maximum Arrest Force
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Energy absorbers must limit peak force on the body to no more
              than 6 kN (EN 355).
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
              "Identify the components of a full body harness and their functions",
              "Explain the differences between fall arrest, fall restraint, and work positioning systems",
              "Describe the function of energy absorbers and self-retracting lifelines",
              "Classify anchor points using the EN 795 system (Classes A–E)",
              "Calculate total clearance distance for a fall arrest system",
              "State the inspection and thorough examination requirements for personal fall protection equipment",
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
        {/*  SECTION 01 — When Personal Protection Is Needed                */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                When Personal Fall Protection Is Needed
              </h2>
              <p className="text-white/50 text-sm">
                The hierarchy of control in practice
              </p>
            </div>
          </div>
          <div className="border-l-2 border-amber-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Personal fall protection systems are the last line of defence.
              They should only be selected after a thorough assessment has
              confirmed that:
            </p>
            <div className="space-y-2">
              {[
                "The work cannot be done from ground level or from a position where there is no risk of falling",
                "Collective protection (guard rails, netting, decking) is not reasonably practicable for the specific task",
                "The remaining risk requires each individual worker to be protected by their own equipment",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-amber-400 text-sm font-semibold">
                  Critical Requirement
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Every personal fall protection system{" "}
                <strong className="text-white">must</strong> have an
                accompanying rescue plan. If someone falls and is suspended
                in their harness, they must be rescued within minutes to
                avoid suspension trauma (harness hang syndrome). You cannot
                rely on the emergency services for this — the rescue plan
                must use on-site resources.
              </p>
            </div>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Common electrical scenarios requiring personal fall protection
              include: working on cable trays above suspended ceilings where
              guard rails cannot be installed, climbing steel structures to
              install containment, accessing communications masts, and
              working from MEWPs where an anchor point on the platform
              requires the operator to wear a harness.
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 02 — Full Body Harness                                 */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-blue-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Full Body Harness — EN 361
              </h2>
              <p className="text-white/50 text-sm">
                Components, fit, and adjustment
              </p>
            </div>
          </div>
          <div className="border-l-2 border-blue-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The full body harness is the foundation of any personal fall
              arrest system. Designed to EN 361, it distributes fall arrest
              forces across the strongest parts of the body — the shoulders,
              chest, and upper thighs — reducing the risk of injury during a
              fall arrest event.
            </p>

            {/* ── Harness Components Diagram ── */}
            <div className="my-6 rounded-xl border border-white/10 bg-[#111] p-5 sm:p-6">
              <h4 className="text-amber-400 text-sm font-semibold mb-5 text-center">
                Full Body Harness — Component Diagram
              </h4>
              <div className="max-w-sm mx-auto space-y-3">
                {/* Shoulder straps */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Shoulder Straps
                  </span>
                </div>
                {/* Rear D-ring */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Rear (Dorsal) D-Ring
                  </span>
                </div>
                {/* Chest strap */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Chest Strap & Buckle
                  </span>
                </div>
                {/* Front D-ring */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Front (Sternal) D-Ring
                  </span>
                </div>
                {/* Waist belt (if present) */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Waist/Positioning Belt
                  </span>
                </div>
                {/* Adjustment buckles */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Adjustment Buckles
                  </span>
                </div>
                {/* Leg loops */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Leg Loops / Thigh Straps
                  </span>
                </div>
                {/* Sub-pelvic strap */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0" />
                  <div className="flex-1 h-px bg-white/20" />
                  <span className="text-xs text-white/70 flex-shrink-0">
                    Sub-Pelvic Strap
                  </span>
                </div>
              </div>
              <p className="text-center text-white/40 text-xs mt-4">
                Labelled component layout — each coloured dot represents a
                key element of the EN 361 full body harness.
              </p>
            </div>

            <h3 className="text-white font-semibold text-base mt-4 mb-3">
              Component Functions
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "Shoulder Straps",
                  desc: "Run over each shoulder and connect to the rear D-ring. Bear the majority of the arrest load and keep the upper body upright after a fall.",
                },
                {
                  name: "Rear (Dorsal) D-Ring",
                  desc: "Located between the shoulder blades. Primary attachment point for fall arrest lanyards and SRLs. Keeps the body upright during suspension.",
                },
                {
                  name: "Front (Sternal) D-Ring",
                  desc: "Located on the chest strap. Used for ladder climbing devices, confined space entry retrieval, and some rope access systems.",
                },
                {
                  name: "Chest Strap",
                  desc: "Connects the two shoulder straps across the chest. Prevents the shoulder straps from slipping outwards during a fall.",
                },
                {
                  name: "Leg Loops / Thigh Straps",
                  desc: "Pass around each upper thigh. Transfer a significant portion of the arrest force to the legs. Must be snug but not restrictive.",
                },
                {
                  name: "Adjustment Buckles",
                  desc: "Allow the harness to be sized to the individual. Quick-connect buckles speed up donning; pass-through buckles are more secure but slower.",
                },
                {
                  name: "Sub-Pelvic Strap",
                  desc: "Connects the leg loops beneath the pelvis. Prevents the wearer from sliding through the harness in an inverted fall.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    <strong className="text-white">{item.name}:</strong>{" "}
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 mt-4">
              <h4 className="text-blue-400 text-sm font-semibold mb-2">
                Fitting a Harness Correctly
              </h4>
              <div className="space-y-2">
                {[
                  "Shoulder straps should sit centrally on the shoulders — not slipping off to one side",
                  "The rear D-ring should sit between the shoulder blades — not at the neck or lower back",
                  "Leg straps should be snug around the upper thigh — you should be able to slide a flat hand between the strap and your leg",
                  "The chest strap should sit at mid-chest level — not riding up to the throat",
                  "All excess webbing should be secured through the keepers to prevent snagging",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
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
        {/*  SECTION 03 — Lanyards & Shock Absorbers                        */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-green-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Lanyards & Shock Absorbers
              </h2>
              <p className="text-white/50 text-sm">
                EN 354 (restraint) and EN 355 (fall arrest with energy absorber)
              </p>
            </div>
          </div>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              A lanyard is the connecting element between the harness and the
              anchor point. Different lanyards serve different purposes, and
              using the wrong type in the wrong situation can be fatal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <h4 className="text-green-400 text-sm font-semibold mb-2">
                  Restraint Lanyard — EN 354
                </h4>
                <div className="space-y-2">
                  {[
                    "Designed to prevent the user from reaching the edge",
                    "Maximum length 2 metres (but should be shorter than the distance to the edge)",
                    "No shock absorber needed — the user should never experience a fall",
                    "Connects harness to anchor via karabiner at each end",
                    "Often used with a waist belt or positioning harness",
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
                  Fall Arrest Lanyard — EN 355
                </h4>
                <div className="space-y-2">
                  {[
                    "Designed to arrest a free fall — the user CAN reach and go over the edge",
                    "Incorporates an energy absorber (shock absorber) that deploys during a fall",
                    "Maximum free-fall lanyard length: 2 metres",
                    "Shock absorber limits peak arrest force to ≤ 6 kN on the body",
                    "Deployed shock absorber adds up to 1.75 m to total length — critical for clearance calculations",
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
              How Shock Absorbers Work
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Energy absorbers typically use <strong className="text-white">tear
              webbing</strong> — layers of webbing stitched together in a
              specific pattern. During a fall, the stitching tears
              progressively, absorbing kinetic energy and converting it to
              heat. This controlled tearing extends the deceleration time
              and limits the peak force on the body to the EN 355 maximum
              of 6 kN.
            </p>
            <div className="space-y-2">
              {[
                "Tear webbing is housed in a fabric pack attached to the lanyard — it deploys by extending the overall lanyard length",
                "Typical deployment length: 1.0 to 1.75 metres (depends on the mass of the user and the fall distance)",
                "Once deployed, the shock absorber cannot be reused — it must be discarded along with the lanyard",
                "A visual indicator (often a red tag or window) shows whether the shock absorber has been activated — check this during every pre-use inspection",
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
              Twin-Tail (Y-Type) Lanyards
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Twin-tail lanyards have two legs, each with its own connector.
              This allows the user to remain connected at all times — one leg
              is always attached while the other is moved to a new anchor
              point. This provides 100% continuous tie-off, which is critical
              when traversing along a structure or when anchor points need to
              be changed frequently.
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 04 — Self-Retracting Lifelines (SRLs)                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-purple-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Self-Retracting Lifelines (SRLs)
              </h2>
              <p className="text-white/50 text-sm">
                EN 360 — automatic braking fall arrest devices
              </p>
            </div>
          </div>
          <div className="border-l-2 border-purple-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              A self-retracting lifeline (SRL), also known as an inertia
              reel, contains a drum of cable or webbing that extends and
              retracts automatically as the user moves — similar to a car
              seat belt. Under normal movement, the line pays out freely.
              If the user falls and the extraction speed exceeds a set
              threshold, an internal braking mechanism locks the drum and
              arrests the fall.
            </p>

            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <h4 className="text-purple-400 text-sm font-semibold mb-3">
                Key Features of EN 360 SRLs
              </h4>
              <div className="space-y-2">
                {[
                  "Free fall distance limited to approximately 0.6 m — significantly less than a standard 2 m lanyard",
                  "Reduced fall forces mean less clearance distance is required below the user",
                  "Available in cable (galvanised or stainless steel) and webbing versions",
                  "Cable SRLs are more compact but can be damaged by sharp edges; webbing SRLs are lighter but bulkier",
                  "Working lengths from 2.5 m to 30 m+ depending on application",
                  "Some models include an integral energy absorber for additional force reduction",
                  "Must be mounted above the user where possible — side-mounted or floor-mounted units exist but increase free-fall distance",
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

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <Info className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-purple-400 text-sm font-semibold">
                  SRL vs Standard Lanyard
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                An SRL is often preferred over a standard lanyard because the
                shorter free-fall distance reduces both the forces on the body
                and the total clearance distance required. Where headroom
                below the working level is limited, an SRL may be the only
                practical option for fall arrest.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 05 — Anchor Points                                     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-cyan-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Anchor Points — EN 795
              </h2>
              <p className="text-white/50 text-sm">
                Classes A–E and minimum strength requirements
              </p>
            </div>
          </div>
          <div className="border-l-2 border-cyan-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The anchor point is the fixed element to which the lanyard or
              SRL is connected. It must be strong enough to withstand the
              forces generated during a fall arrest event. EN 795 classifies
              anchor devices into five types:
            </p>

            <div className="space-y-3">
              {[
                {
                  cls: "Class A",
                  colour: "amber",
                  desc: "Structural anchor — fixed to a wall, column, beam, or other structural element. Sub-classes: A1 (vertical surface) and A2 (horizontal surface, e.g. soffit/ceiling).",
                },
                {
                  cls: "Class B",
                  colour: "blue",
                  desc: "Temporary transportable anchor — not permanently fixed. Includes tripods, beam clamps, and portable deadweight anchors. Can be moved between locations.",
                },
                {
                  cls: "Class C",
                  colour: "green",
                  desc: "Horizontal flexible anchor line — a wire rope or webbing line tensioned between two structural anchors. Allows the user to traverse along the line while remaining connected.",
                },
                {
                  cls: "Class D",
                  colour: "purple",
                  desc: "Horizontal rigid anchor rail — a metal track fixed to the structure. A trolley runs along the rail, providing a mobile anchor point. Common on industrial roofs and walkways.",
                },
                {
                  cls: "Class E",
                  colour: "rose",
                  desc: "Deadweight anchor — relies on mass (not fixings) to remain in position. Typically a large concrete or steel block. Used on flat roofs where drilling is not possible.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl border border-${item.colour}-500/20 bg-${item.colour}-500/5 p-4`}
                >
                  <h4
                    className={`text-${item.colour}-400 text-sm font-semibold mb-1`}
                  >
                    {item.cls}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 mt-4">
              <h4 className="text-amber-400 text-sm font-semibold mb-2">
                Minimum Anchor Strength
              </h4>
              <div className="space-y-2">
                {[
                  "Multi-user anchor devices: minimum 12 kN static strength",
                  "Single-user personal anchor (when assessed by a competent person): minimum 10 kN",
                  "Some manufacturers specify higher ratings — always follow the product data sheet",
                  "The anchor must be tested/certified — never connect to an unchecked structural element",
                  "Position the anchor as high as possible above the user to minimise free-fall distance and swing radius",
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

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 06 — Fall Arrest vs Restraint vs Work Positioning       */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-rose-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              06
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Fall Arrest vs Fall Restraint vs Work Positioning
              </h2>
              <p className="text-white/50 text-sm">
                Three distinct systems — choosing correctly
              </p>
            </div>
          </div>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 sm:col-span-2">
                <h4 className="text-rose-400 text-sm font-semibold mb-2">
                  Fall Arrest
                </h4>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  The user <strong className="text-white">can</strong> reach the edge and
                  fall. The system stops the fall after it has begun. Requires
                  a full body harness (EN 361), fall arrest lanyard with energy
                  absorber (EN 355) or SRL (EN 360), and a suitable anchor
                  point.
                </p>
                <div className="space-y-1">
                  {[
                    "Adequate clearance distance below the user is essential",
                    "A rescue plan must be in place before work starts",
                    "The user experiences a shock-loaded fall — even with an energy absorber, this is a traumatic event",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span className="text-white/60 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <h4 className="text-green-400 text-sm font-semibold mb-2">
                  Fall Restraint
                </h4>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  The system physically prevents the user from reaching the
                  fall edge. The lanyard is short enough (or an anchor is
                  positioned) so the worker simply cannot get to the point
                  of danger.
                </p>
                <div className="space-y-1">
                  {[
                    "No energy absorber needed — no fall should ever occur",
                    "No clearance calculation needed",
                    "Simpler rescue scenario — the user is still on a surface",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-white/60 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="text-blue-400 text-sm font-semibold mb-2">
                  Work Positioning
                </h4>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  The system supports the user in tension, allowing them to
                  work hands-free while leaning back (e.g., on a pole or
                  tower). Governed by EN 358.
                </p>
                <div className="space-y-1">
                  {[
                    "Requires a separate fall arrest backup in case the positioning system fails",
                    "Common in telecom mast work and utility pole climbing",
                    "Uses a positioning belt or sit harness in addition to the full body harness",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="text-white/60 text-sm leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 07 — Clearance Distance Calculation                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              07
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Clearance Distance Calculation
              </h2>
              <p className="text-white/50 text-sm">
                Ensuring sufficient space to arrest a fall safely
              </p>
            </div>
          </div>
          <div className="border-l-2 border-amber-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Before using any fall arrest system, you must calculate the
              <strong className="text-white"> total clearance distance</strong> —
              the minimum vertical space required below the anchor point to
              ensure the user does not strike the ground or any obstruction
              during or after a fall.
            </p>

            {/* ── Calculation diagram ── */}
            <div className="my-6 rounded-xl border border-white/10 bg-[#111] p-5 sm:p-6">
              <h4 className="text-amber-400 text-sm font-semibold mb-4 text-center">
                Clearance Distance — Worked Example
              </h4>
              <div className="max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70 text-sm">
                    Free fall distance (lanyard length)
                  </span>
                  <span className="text-amber-400 text-sm font-semibold">
                    2.0 m
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70 text-sm">
                    Shock absorber deployment
                  </span>
                  <span className="text-amber-400 text-sm font-semibold">
                    1.75 m
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70 text-sm">
                    Harness extension (stretch)
                  </span>
                  <span className="text-amber-400 text-sm font-semibold">
                    0.25 m
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70 text-sm">
                    Height of user below D-ring
                  </span>
                  <span className="text-amber-400 text-sm font-semibold">
                    1.5 m
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70 text-sm">
                    Safety margin
                  </span>
                  <span className="text-amber-400 text-sm font-semibold">
                    1.0 m
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-white font-semibold text-sm">
                    TOTAL CLEARANCE REQUIRED
                  </span>
                  <span className="text-amber-400 text-base font-bold">
                    6.5 m
                  </span>
                </div>
              </div>
              <p className="text-center text-white/40 text-xs mt-4">
                Always add each component — never assume a manufacturer&rsquo;s
                &ldquo;typical&rdquo; figure covers all situations.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <Calculator className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-amber-400 text-sm font-semibold">
                  Reducing Clearance Distance
                </span>
              </div>
              <div className="space-y-2">
                {[
                  "Use a shorter lanyard (e.g., 1.5 m instead of 2 m) where the work allows",
                  "Use an SRL — reduces free fall to ~0.6 m and eliminates the need for a separate shock absorber in many models",
                  "Position the anchor point directly above the user to eliminate any swing (pendulum effect)",
                  "Use a retractable lanyard with integrated shock absorber for the shortest possible deployment",
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

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 08 — 6-Monthly Thorough Examination                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-teal-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              08
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                6-Monthly Thorough Examination
              </h2>
              <p className="text-white/50 text-sm">
                LOLER requirement for all personal fall protection equipment
              </p>
            </div>
          </div>
          <div className="border-l-2 border-teal-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The Lifting Operations and Lifting Equipment Regulations 1998
              (LOLER) require that all equipment used to arrest a fall from
              height receives a <strong className="text-white">thorough
              examination</strong> by a <strong className="text-white">competent
              person</strong> at intervals not exceeding 6 months.
            </p>

            <div className="space-y-2">
              {[
                "The thorough examination is more detailed than a daily pre-use check — it may involve partial disassembly and functional testing",
                "A competent person is someone with the knowledge, training, and experience to identify defects — this is typically NOT the user themselves",
                "Each examination must be recorded, and a certificate or report issued stating the equipment is safe for continued use or identifying defects",
                "The employer must keep thorough examination records and make them available on request",
                "If a defect is found that poses an immediate danger, the equipment must be taken out of service on the spot",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Key Takeaways                                                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-400/5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              Key Takeaways
            </h2>
            <div className="space-y-3">
              {[
                "Personal fall protection is only used when collective protection is not reasonably practicable.",
                "EN 361 harness: distributes forces across shoulders, chest, and thighs. Rear D-ring for fall arrest, front D-ring for retrieval/climbing.",
                "Fall arrest lanyards (EN 355) include a shock absorber limiting force to 6 kN. Restraint lanyards (EN 354) prevent reaching the edge.",
                "SRLs (EN 360) limit free fall to ~0.6 m — reducing forces and clearance requirements.",
                "Anchor points must meet EN 795: minimum 10 kN single-user, 12 kN multi-user.",
                "Clearance distance = free fall + shock absorber deployment + harness stretch + body height + safety margin.",
                "Every personal fall arrest system requires a rescue plan for suspension trauma.",
                "Thorough examination every 6 months by a competent person (LOLER requirement).",
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
            title="Section 2 Quiz — Personal Fall Protection Systems"
          />
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  FAQs                                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Anchor className="h-5 w-5 text-amber-500" />
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
