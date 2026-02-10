import {
  ArrowLeft,
  ArrowUpFromLine,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Ruler,
  Eye,
  ClipboardCheck,
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
    id: "ladder-1-in-4-rule",
    question:
      "A ladder needs to reach a working platform 4 metres above the ground. Using the 1-in-4 rule, how far from the wall should the base of the ladder be?",
    options: [
      "0.5 metres",
      "1 metre",
      "2 metres",
      "4 metres",
    ],
    correctIndex: 1,
    explanation:
      "The 1-in-4 rule means for every 4 units up, the base must be 1 unit out from the wall. At 4 metres height, the base should be 1 metre out. This gives the ladder a safe angle of approximately 75 degrees.",
  },
  {
    id: "ladder-3-rung-rule",
    question:
      "When a ladder is used to access a scaffold platform or roof, how far must the ladder extend above the landing point?",
    options: [
      "At least 1 rung above the landing point",
      "At least 2 rungs above the landing point",
      "At least 3 rungs (approximately 1 metre) above the landing point",
      "At least 5 rungs above the landing point",
    ],
    correctIndex: 2,
    explanation:
      "The ladder must extend at least 3 rungs (approximately 1 metre) above the landing point. This gives the user a secure handhold while stepping off the ladder onto the platform. Without this extension, stepping off at the top becomes extremely hazardous.",
  },
  {
    id: "ladder-class-selection",
    question:
      "You need a ladder for daily use on a construction site. Which BS EN 131 class must you select?",
    options: [
      "Class 3 — domestic use",
      "Class 2 — light trade",
      "Class 1 — industrial / heavy-duty professional",
      "Any class is acceptable on a construction site",
    ],
    correctIndex: 2,
    explanation:
      "Class 1 (industrial / heavy-duty professional) ladders are rated for the demanding conditions found on construction sites, including heavier loads and more frequent use. Class 3 domestic ladders are not suitable for any professional or trade environment.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Items (4)                                                     */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can I use a ladder for work lasting longer than 30 minutes?",
    answer:
      "Ladders should generally be used for short-duration tasks of up to 30 minutes. If the task will take longer, you should consider alternative access equipment such as a scaffold, MEWP, or podium step. A risk assessment must justify the use of a ladder for any extended period, and the hierarchy of controls in the Work at Height Regulations 2005 should always be followed.",
  },
  {
    question: "What should I do if I find a defect during a pre-use inspection?",
    answer:
      "Remove the ladder from service immediately and attach a clear 'DO NOT USE' label or tag. Report the defect to your supervisor or site manager. Never attempt to repair a damaged ladder yourself — damaged ladders must be assessed by a competent person or returned to the manufacturer. Using a defective ladder is a serious safety breach that could result in a fall from height.",
  },
  {
    question: "Is the 1-in-4 rule different for extension ladders?",
    answer:
      "No. The 1-in-4 rule applies equally to single-section ladders, extension ladders, and combination ladders when used in the leaning configuration. For every 4 units of vertical height, the base must be 1 unit out from the support surface. This gives an angle of approximately 75 degrees, which is the optimum balance between stability and the risk of the ladder sliding outwards or falling backwards.",
  },
  {
    question:
      "Do I need formal training to use a ladder on a construction site?",
    answer:
      "Yes. Under the Work at Height Regulations 2005 and CDM Regulations 2015, anyone using a ladder on a construction site must be competent — meaning they have received adequate training, instruction, and supervision. Many principal contractors require documented evidence of ladder safety training before permitting ladder use on their sites. Toolbox talks and CITB ladder courses are common routes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the correct angle for a leaning ladder, as defined by the 1-in-4 rule?",
    options: [
      "Approximately 60 degrees",
      "Approximately 70 degrees",
      "Approximately 75 degrees",
      "Approximately 80 degrees",
    ],
    correctAnswer: 2,
    explanation:
      "The 1-in-4 rule produces an angle of approximately 75 degrees. This is the optimum working angle — steep enough to prevent the base sliding out, but not so steep that the ladder could fall backwards.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT an acceptable method for securing a ladder?",
    options: [
      "Tying the ladder at the top to a secure anchor point",
      "Having a competent person foot the ladder at the base",
      "Leaning heavy tools against the bottom of the ladder",
      "Using a proprietary ladder stabiliser device",
    ],
    correctAnswer: 2,
    explanation:
      "Leaning tools against the ladder base is never an acceptable securing method. Proper methods include tying at the top, footing by a competent person, using stabiliser devices, or securing against lateral slip with stakes or clamps.",
  },
  {
    id: 3,
    question:
      "How many points of contact must a user maintain at all times when working from a ladder?",
    options: [
      "1 point of contact",
      "2 points of contact",
      "3 points of contact",
      "4 points of contact",
    ],
    correctAnswer: 2,
    explanation:
      "Three points of contact must be maintained at all times — either two hands and one foot, or two feet and one hand. This is essential to prevent loss of balance and falls.",
  },
  {
    id: 4,
    question:
      "What is the maximum recommended duration for continuous work from a ladder?",
    options: [
      "15 minutes",
      "30 minutes",
      "1 hour",
      "2 hours",
    ],
    correctAnswer: 1,
    explanation:
      "Ladder work should generally be limited to 30 minutes of continuous use. For longer tasks, alternative access equipment such as scaffolding, a MEWP, or a podium step should be considered.",
  },
  {
    id: 5,
    question:
      "Under BS EN 131, which class of ladder is suitable for industrial use on construction sites?",
    options: [
      "Class 3 — domestic",
      "Class 2 — commercial",
      "Class 1 — industrial / heavy-duty professional",
      "All classes are equally suitable for construction",
    ],
    correctAnswer: 2,
    explanation:
      "Class 1 industrial / heavy-duty professional ladders are designed and rated for the demanding conditions of construction sites. Class 3 domestic ladders must never be used in professional or trade environments.",
  },
  {
    id: 6,
    question:
      "Which pre-use inspection check relates to the structural side members of a ladder?",
    options: [
      "Checking the locking mechanisms",
      "Inspecting the stiles for cracks, bends, or corrosion",
      "Testing the anti-slip feet",
      "Verifying the tie rod tension",
    ],
    correctAnswer: 1,
    explanation:
      "The stiles are the two vertical side members of the ladder. During pre-use inspection, they must be checked for cracks, bends, dents, corrosion, or any other damage that could compromise the structural integrity of the ladder.",
  },
  {
    id: 7,
    question:
      "A ladder used as access to a roof must extend above the roof edge by at least:",
    options: [
      "1 rung",
      "2 rungs",
      "3 rungs (approximately 1 metre)",
      "5 rungs (approximately 1.5 metres)",
    ],
    correctAnswer: 2,
    explanation:
      "The ladder must extend at least 3 rungs (approximately 1 metre) above the landing point. This provides a secure handhold for the person stepping on and off the ladder at the top.",
  },
  {
    id: 8,
    question:
      "You need to set up a ladder against a wall to reach a height of 6 metres. Using the 1-in-4 rule, how far from the wall should the base be?",
    options: [
      "1 metre",
      "1.5 metres",
      "2 metres",
      "3 metres",
    ],
    correctAnswer: 1,
    explanation:
      "Using the 1-in-4 rule: 6 metres height ÷ 4 = 1.5 metres out from the wall. This maintains the correct 75-degree angle for safe use.",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function WorkingAtHeightModule2Section1() {
  useSEO({
    title: "Ladders & Stepladders | Working at Height Module 2.1",
    description:
      "When ladders are acceptable, types of ladders and stepladders, the 1-in-4 rule, securing methods, BS EN 131 classes, and pre-use inspection checklists for working at height.",
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
            <ArrowUpFromLine className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ladders &amp; Stepladders
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            When ladders and stepladders are acceptable, the different types
            available, correct setup angles, securing methods, British
            Standards, and pre-use inspection procedures
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
                  <strong className="text-white">Short duration:</strong>{" "}
                  ladders suit tasks under 30 minutes with light work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">1-in-4 rule:</strong> base 1
                  unit out for every 4 units up (75&deg;)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">3 points of contact:</strong>{" "}
                  always — two hands + one foot, or two feet + one hand
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">BS EN 131:</strong> Class 1
                  industrial, Class 3 domestic — always use Class 1 on site
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
                  <strong className="text-white">Inspect before use:</strong>{" "}
                  stiles, rungs, feet, locking mechanisms
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Secure the ladder:</strong>{" "}
                  tie at top, foot at bottom, prevent slipping
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">3 rungs above:</strong> ladder
                  must extend 1&nbsp;m above the landing point
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Remove if defective:</strong>{" "}
                  tag and take out of service immediately
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
              "Explain when ladders and stepladders are acceptable as work-at-height equipment",
              "Identify the main types of ladders and stepladders used in the electrical trade",
              "Apply the 1-in-4 rule to set up a leaning ladder at the correct 75-degree angle",
              "Describe the methods for securing a ladder against slipping and overturning",
              "Distinguish between BS EN 131 Class 1 (industrial) and Class 3 (domestic) ratings",
              "Carry out a thorough pre-use inspection of a ladder before every use",
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
        {/*  SECTION 01 — When Are Ladders Acceptable?                       */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">01</span>
              When Are Ladders Acceptable?
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Under the{" "}
                <strong className="text-white">
                  Work at Height Regulations 2005
                </strong>
                , ladders should only be used when the risk assessment shows that
                using more suitable equipment (such as scaffolding or a MEWP) is
                not reasonably practicable, or where the risk is already low.
                Ladders are <em>not</em> banned, but they sit near the bottom of
                the access equipment hierarchy.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  Key Principle: Ladders as a Last Resort
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  The regulations require a hierarchy approach: (1) avoid
                  working at height if possible, (2) use collective fall
                  prevention (guardrails, scaffolding), (3) use personal fall
                  protection (harnesses), and only then (4) use a ladder if the
                  task is low-risk, short-duration, and light work.
                </p>
              </div>

              <p>
                In practice, ladders and stepladders are widely used in the
                electrical trade — for accessing distribution boards at height,
                changing luminaires, running short cable drops, and accessing
                roofs or scaffold platforms. The key is that the task must meet
                <strong className="text-white"> all three criteria</strong>:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 mb-2">
                    <Ruler className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-amber-300 font-medium mb-1 text-sm">
                    Short Duration
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Tasks should not exceed approximately 30 minutes of
                    continuous work from the ladder
                  </p>
                </div>
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 mb-2">
                    <Shield className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-amber-300 font-medium mb-1 text-sm">
                    Light Work
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    The work must not require both hands simultaneously or
                    involve carrying heavy loads up the ladder
                  </p>
                </div>
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 mb-2">
                    <Info className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-amber-300 font-medium mb-1 text-sm">
                    3-Point Contact
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    The user must be able to maintain three points of contact
                    (two hands + one foot, or two feet + one hand) at all times
                  </p>
                </div>
              </div>

              <p>
                If any of these criteria cannot be met, a ladder is not the
                correct access equipment for the task, and an alternative must
                be selected. This decision should be recorded in the risk
                assessment and method statement.
              </p>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Common Mistake
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Electricians frequently use ladders for tasks that exceed 30
                  minutes or require both hands — such as wiring a new light
                  fitting at ceiling height. If you find yourself working for
                  extended periods or needing to release your grip to use tools,
                  the task has outgrown the ladder. Stop and arrange proper
                  access equipment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 02 — Types of Ladders                                   */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Types of Ladders &amp; Stepladders
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                There are several types of ladder and stepladder commonly used
                in the electrical industry. Each has specific use cases,
                advantages, and limitations. Selecting the wrong type is a
                frequent cause of incidents.
              </p>

              {/* Leaning ladder types */}
              <h3 className="text-white font-semibold text-base">
                Leaning Ladders
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">
                    Single-Section Ladder
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        One fixed length — no moving parts or extensions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Typically up to 6 metres in length
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Simple, lightweight, and easy to transport
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Best for short-reach access at a fixed height
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">
                    Extension Ladder
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Two or three sections that slide to extend
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Reaches greater heights — up to 12 metres when fully
                        extended
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Locking catches or rope-and-pulley system to hold
                        sections in place
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Sections must overlap by at least 3 rungs when extended
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg sm:col-span-2">
                  <h4 className="text-purple-300 font-medium mb-2">
                    Combination Ladder
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Multi-purpose — converts between leaning ladder,
                        stepladder, and stairwell mode
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Adjustable hinge points allow multiple configurations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Popular with electricians for versatility on varied
                        tasks
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Must check locking mechanisms are fully engaged in each
                        configuration
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stepladder types */}
              <h3 className="text-white font-semibold text-base mt-6">
                Stepladders
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">
                    Platform Stepladder
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Flat platform at the top for standing with both feet
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Usually has a handrail above the platform for stability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        More comfortable for tasks lasting a few minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Freestanding — does not need to lean against a surface
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">
                    Swing-Back Stepladder
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Rear legs swing out to form an A-frame
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        No platform — the top is a pointed cap, not for standing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        User must not stand on the top 2 treads
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Lighter and more compact than platform stepladders
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Never Stand on the Top 2 Treads
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  On a swing-back stepladder, you must never stand on the top
                  cap or the top two treads. This raises your centre of gravity
                  above the top of the stepladder, making it extremely unstable.
                  Platform stepladders are specifically designed so the platform
                  is the intended standing point — but even then, only stand on
                  the platform, not on any part above it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ================================================================ */}
        {/*  SECTION 03 — The 1-in-4 Rule                                    */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              The 1-in-4 Rule (75&deg; Angle)
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                The{" "}
                <strong className="text-white">1-in-4 rule</strong> is the
                single most important principle for setting up a leaning ladder
                safely. It determines the correct angle between the ladder and
                the ground — approximately{" "}
                <strong className="text-white">75 degrees</strong>.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  The Rule Explained
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  For every <strong className="text-white">4 units</strong> of
                  vertical height (from ground to the contact point on the
                  wall), the base of the ladder must be{" "}
                  <strong className="text-white">1 unit</strong> out from the
                  wall. For example, if the ladder rests against the wall at a
                  height of 4 metres, the base must be 1 metre from the wall. At
                  8 metres, the base must be 2 metres out.
                </p>
              </div>

              <p>
                Getting the angle wrong has serious consequences:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    Too Steep (&gt;80&deg;)
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Ladder can fall backwards away from the wall
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Sideways movement becomes more likely
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Very difficult to climb safely
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    Too Shallow (&lt;70&deg;)
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Base can slide outwards under the user's weight
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Increased loading on the ladder's rungs and stiles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The ladder can buckle or collapse under load
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ── Ladder Setup Diagram ── */}
              <div className="bg-[#111] border border-white/10 rounded-xl p-5 sm:p-6">
                <h3 className="text-amber-400 font-semibold text-base mb-4 text-center">
                  Ladder Setup Diagram — The 1-in-4 Rule
                </h3>
                <div className="flex justify-center">
                  <div className="relative w-[280px] sm:w-[340px] h-[360px] sm:h-[420px]">
                    {/* Wall */}
                    <div className="absolute left-0 top-0 bottom-[40px] w-[3px] bg-white/40" />
                    <div className="absolute left-[-40px] top-[10px] text-xs text-white/40 -rotate-90 whitespace-nowrap">
                      WALL SURFACE
                    </div>

                    {/* Ground */}
                    <div className="absolute bottom-[40px] left-0 right-0 h-[3px] bg-white/40" />
                    <div className="absolute bottom-[16px] left-[50%] -translate-x-1/2 text-xs text-white/40">
                      GROUND LEVEL
                    </div>

                    {/* Ladder (angled line) */}
                    <div
                      className="absolute bottom-[40px] left-0 h-[310px] sm:h-[370px] w-[4px] bg-gradient-to-t from-amber-500 to-amber-400 rounded-full"
                      style={{
                        transformOrigin: "bottom left",
                        transform: "rotate(14.04deg)",
                      }}
                    />

                    {/* Rung marks */}
                    {[0.15, 0.28, 0.41, 0.54, 0.67, 0.80, 0.89, 0.95].map(
                      (pos, i) => (
                        <div
                          key={i}
                          className="absolute w-[14px] h-[2px] bg-amber-400/60 rounded"
                          style={{
                            bottom: `${40 + pos * 310}px`,
                            left: `${pos * 310 * Math.tan((14.04 * Math.PI) / 180) - 5}px`,
                          }}
                        />
                      )
                    )}

                    {/* Height annotation (vertical) */}
                    <div className="absolute left-[14px] top-[20px] bottom-[48px] border-l border-dashed border-amber-400/40" />
                    <div className="absolute left-[20px] top-[50%] -translate-y-1/2 text-xs text-amber-400 font-semibold whitespace-nowrap">
                      4 units UP
                    </div>

                    {/* Base annotation (horizontal) */}
                    <div className="absolute bottom-[44px] left-[3px] w-[75px] sm:w-[85px] border-t border-dashed border-amber-400/40" />
                    <div className="absolute bottom-[50px] left-[18px] text-xs text-amber-400 font-semibold whitespace-nowrap">
                      1 unit OUT
                    </div>

                    {/* Angle arc indicator */}
                    <div className="absolute bottom-[30px] left-[70px] sm:left-[78px] text-xs text-white font-bold bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-full">
                      75&deg;
                    </div>

                    {/* 3 rungs above label */}
                    <div className="absolute top-[2px] right-[10px] sm:right-[20px] text-[10px] text-green-400 border border-green-400/30 bg-green-500/10 px-2 py-1 rounded leading-tight text-center">
                      3 rungs<br />above<br />landing
                    </div>

                    {/* Footing label */}
                    <div className="absolute bottom-[2px] right-[10px] sm:right-[20px] text-[10px] text-cyan-400 border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 rounded leading-tight text-center">
                      Footed or<br />secured<br />at base
                    </div>

                    {/* Tied at top label */}
                    <div className="absolute top-[50px] left-[50px] sm:left-[60px] text-[10px] text-amber-400 border border-amber-400/30 bg-amber-500/10 px-2 py-1 rounded leading-tight text-center">
                      Tied at<br />top to<br />secure point
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded text-center">
                    <span className="text-amber-400 font-semibold">4m height</span>
                    <span className="text-white/50"> = 1m base</span>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded text-center">
                    <span className="text-amber-400 font-semibold">6m height</span>
                    <span className="text-white/50"> = 1.5m base</span>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded text-center">
                    <span className="text-amber-400 font-semibold">8m height</span>
                    <span className="text-white/50"> = 2m base</span>
                  </div>
                </div>
              </div>

              <p>
                A quick on-site method to check the angle: stand at the base of
                the ladder with your toes touching the stiles and extend your
                arms straight out — if your palms rest comfortably on the rung
                at shoulder height, the angle is approximately correct. However,
                this is only a rough guide — always measure when in doubt.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 04 — Securing Ladders                                   */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Securing Ladders
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                An unsecured ladder is one of the most common causes of falls
                from height. The{" "}
                <strong className="text-white">
                  Work at Height Regulations 2005
                </strong>{" "}
                require that ladders must be prevented from slipping during use.
                There are three primary methods:
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    1. Securing at the Top (Preferred Method)
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Tie both stiles (not the rungs) to a secure anchor
                        point at the top
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Use proprietary ladder ties, ratchet straps, or
                        lashing — never bungee cords
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Prevents both outward sliding at the base and lateral
                        movement
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The anchor point must be structural — not a gutter,
                        drainpipe, or loose fitting
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    2. Footing at the Base
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        A competent person stands at the base, gripping both
                        stiles with hands and bracing feet against the ladder
                        feet
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The footer must face the ladder, not away from it
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Footing is a temporary measure — not a substitute for
                        tying at the top when reasonably practicable
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        The footer must remain in position for the entire
                        duration of ladder use
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    3. Preventing Lateral Slip
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Use a ladder stabiliser or stand-off device to widen the
                        base footprint
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        On soft ground, use a board under the feet to prevent
                        sinking (never dig the feet in)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Anti-slip feet (rubber or pivoting) must be in good
                        condition and in contact with the surface
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        On smooth floors, use a ladder mat or anti-slip device
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Critical Safety Rule
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  If a ladder cannot be secured by any of the above methods, it
                  must not be used. Select alternative access equipment instead.
                  An unsecured ladder on a smooth floor or soft ground is one of
                  the most common causes of fatal falls in the construction
                  industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ================================================================ */}
        {/*  SECTION 05 — BS EN 131 Standard                                 */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              BS EN 131 — Ladder Standards &amp; Classes
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                <strong className="text-white">BS EN 131</strong> is the
                European standard for portable ladders, adopted in the UK. It
                sets out design, manufacturing, and performance requirements
                that all portable ladders must meet. The standard was
                significantly updated in 2018 (BS EN 131-1:2015+A1:2019 and
                BS EN 131-2:2010+A2:2017).
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  Key Definition: BS EN 131 Classes
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  BS EN 131 classifies ladders into duty ratings based on their
                  intended use. In the UK, the two most common classes you will
                  encounter are <strong className="text-white">Class 1</strong>{" "}
                  (industrial / heavy-duty professional) and{" "}
                  <strong className="text-white">Class 3</strong> (domestic).
                  There is also a Class 2 (commercial) but this is less commonly
                  referenced on construction sites.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                  <h4 className="text-green-300 font-medium mb-2">
                    Class 1 — Industrial
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Rated for heavy-duty professional and industrial use
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Maximum user load typically 175&nbsp;kg (user + carried
                        equipment)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Must be used on all construction sites and in
                        professional trade environments
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Tested to more rigorous strength, stiffness, and
                        durability standards
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2">
                    Class 3 — Domestic
                  </h4>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Rated for light domestic use only (DIY, household tasks)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Lower maximum load rating than Class 1
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">
                          NOT suitable for any professional, trade, or
                          construction use
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Often significantly cheaper — which is why they sometimes
                        appear on sites incorrectly
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    Site Rule
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Most principal contractors and site managers will not permit
                  any ladder below Class 1 on their construction sites. If you
                  arrive with a Class 3 domestic ladder, you will likely be
                  asked to remove it. Always check the ladder label or markings
                  for its classification before use.
                </p>
              </div>

              <p>
                The BS EN 131 marking is typically found on a label or sticker
                on the stile of the ladder. It will state the class, the
                maximum load rating, the standard reference (BS EN 131-2), and
                the manufacturer's information. If the label is missing or
                illegible, the ladder should not be used.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/*  SECTION 06 — Pre-Use Inspection                                 */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">06</span>
              Pre-Use Inspection Checklist
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                A visual and physical inspection must be carried out{" "}
                <strong className="text-white">before every use</strong>. This
                is the user's responsibility — even if the ladder passed a
                formal inspection the previous day, conditions may have changed.
                Pre-use inspections take only a few minutes but can prevent
                serious injuries.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-amber-400 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5" />
                  Pre-Use Inspection Points
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      item: "Stiles (side members)",
                      check:
                        "Check for cracks, bends, dents, splits, or corrosion. Ensure stiles are straight and true — even a slight bend can compromise structural integrity.",
                    },
                    {
                      item: "Rungs / treads",
                      check:
                        "Check every rung is present, firmly fixed, and not bent, cracked, or loose. Rungs must be free from grease, oil, mud, or ice. Missing or damaged rungs mean the ladder is unserviceable.",
                    },
                    {
                      item: "Feet (anti-slip devices)",
                      check:
                        "Rubber or pivoting feet must be present, in good condition, and free from debris. Worn, missing, or hardened feet compromise grip on the ground surface.",
                    },
                    {
                      item: "Tie rods / braces",
                      check:
                        "Metal tie rods connecting the stiles must be tight and undamaged. On stepladders, the spreader bars and locking stays must engage fully.",
                    },
                    {
                      item: "Locking mechanisms",
                      check:
                        "On extension ladders — locking catches, hooks, or rope-and-pulley systems must operate correctly and hold the extended sections securely. On combination ladders — hinge locks must click fully into place.",
                    },
                    {
                      item: "Labels and markings",
                      check:
                        "The BS EN 131 class label, maximum load rating, and manufacturer's information must be present and legible. If the label is missing, the ladder must not be used until its class can be confirmed.",
                    },
                    {
                      item: "Overall condition",
                      check:
                        "Look for evidence of repair (welding, riveting, binding), paint covering defects, water ingress into hollow sections, and any makeshift modifications. Repaired ladders must only be returned to service by the manufacturer.",
                    },
                  ].map((point, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
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
                    Defect Found — What To Do
                  </h3>
                </div>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Do not use the ladder — remove it from the work area
                      immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Attach a clear <strong className="text-white">"DO NOT USE"</strong> tag or label
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Report the defect to your supervisor or site manager
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Never attempt to repair a damaged ladder yourself —
                      repairs must be carried out by the manufacturer or
                      authorised repairer
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Formal inspections (documented with records) should also be
                carried out at regular intervals as defined by your employer's
                policy — typically monthly or quarterly. These are in addition
                to the daily pre-use check carried out by the individual user.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ================================================================ */}
        {/*  SECTION 07 — The 3-Rung Rule & Safe Use Summary                 */}
        {/* ================================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              The 3-Rung Rule &amp; Safe Use Summary
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                When a ladder is used as a means of access to another level
                (such as a scaffold platform, flat roof, or mezzanine), the
                ladder must extend at least{" "}
                <strong className="text-white">
                  3 rungs (approximately 1 metre)
                </strong>{" "}
                above the landing point. This provides a secure handhold for the
                person stepping on and off the ladder at the top.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-amber-400">
                  Why 3 Rungs?
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Without the extension above the landing, the user must lean
                  forward and twist to step off the ladder — drastically
                  increasing the risk of losing balance and falling. The 3-rung
                  extension provides something to hold onto while making the
                  transition from ladder to platform. This is one of the most
                  critical rules for ladder safety and one of the most commonly
                  ignored on site.
                </p>
              </div>

              <h3 className="text-white font-semibold text-base mt-6">
                Safe Ladder Use — Complete Summary
              </h3>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    "Set up on firm, level ground — never on loose material, boxes, or other equipment",
                    "Apply the 1-in-4 rule to achieve a 75-degree angle",
                    "Secure at the top (tie both stiles) or foot at the base",
                    "Extend 3 rungs above any landing point",
                    "Maintain 3 points of contact at all times",
                    "Face the ladder when climbing and descending",
                    "Do not overreach — keep your belt buckle within the stiles",
                    "Do not carry heavy or bulky items up a ladder — use a tool belt or hoist",
                    "Work for no more than 30 minutes continuously",
                    "Do not use in strong winds, heavy rain, or icy conditions",
                    "Ensure the area at the base is clear and the ladder is visible to passers-by",
                    "Never rest a ladder against fragile surfaces, gutters, or plastic drainpipes",
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-400/70 mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 leading-relaxed">
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-2">
                  Stepladder-Specific Rules
                </h3>
                <ul className="text-white/70 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Open fully and engage all locking devices before use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Position so the work is directly in front — never work
                      from the side
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Never stand on the top 2 treads of a swing-back
                      stepladder
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Do not use a stepladder as a leaning ladder unless it is
                      a combination type designed for that configuration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      All four feet must be in contact with the ground at all
                      times
                    </span>
                  </li>
                </ul>
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
          <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* ── Bottom Navigation ── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2-section-2">
              Next: Scaffolding Basics
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
