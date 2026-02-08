import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Lock, HardHat, Anchor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "guardrail-minimum-height",
    question: "What is the minimum guardrail height above the working platform on a mobile access tower?",
    options: [
      "750mm",
      "850mm",
      "950mm",
      "1100mm"
    ],
    correctIndex: 2,
    explanation: "The minimum guardrail height is 950mm above the platform surface. This is specified in the Work at Height Regulations 2005 and BS EN 1004. The guardrail must be fitted on all exposed sides of the platform — any side not adjacent to a structure."
  },
  {
    id: "stabiliser-vs-outrigger",
    question: "What is the key difference between a stabiliser and an outrigger on a mobile access tower?",
    options: [
      "Stabilisers are for indoor use, outriggers for outdoor use",
      "Stabilisers brace diagonally to the ground; outriggers extend the base horizontally",
      "Stabilisers are permanent; outriggers are temporary",
      "There is no difference — the terms are interchangeable"
    ],
    correctIndex: 1,
    explanation: "Stabilisers are diagonal braces that extend from the tower to the ground at an angle, increasing the effective base width. Outriggers extend horizontally from the base of the tower to increase the base area. Both increase stability but work in different ways."
  },
  {
    id: "three-point-contact",
    question: "When climbing the internal ladder of a tower, the three-point contact rule requires:",
    options: [
      "Both feet and one hand in contact with the ladder at all times",
      "Two hands and one foot, or two feet and one hand, in contact at all times",
      "Both hands and both feet in contact at all times",
      "At least one hand in contact at all times"
    ],
    correctIndex: 1,
    explanation: "The three-point contact rule means maintaining contact with the ladder at three points simultaneously — either two hands and one foot, or two feet and one hand. This ensures stability while climbing. Moving only one limb at a time maintains three points of contact."
  }
];

const faqs = [
  {
    question: "Can I remove guardrails temporarily to lift materials onto the platform?",
    answer: "No. Guardrails must never be removed while anyone is on the platform. If materials need to be passed up to the platform, use the trapdoor access from below, or use a materials hoist if the items are too large for the trapdoor. If a guardrail must be removed for any reason, all personnel must first leave the platform and use alternative fall protection such as a harness and lanyard attached to a suitable anchor."
  },
  {
    question: "When do I need to use stabilisers or outriggers?",
    answer: "Stabilisers or outriggers are required when the manufacturer's instruction manual specifies them for the tower configuration and height you are building. They are typically needed for taller towers, outdoor towers exposed to wind, and towers built to their maximum freestanding height. The manufacturer's manual will state the exact height at which stabilisers or outriggers must be fitted. Never build beyond this height without them."
  },
  {
    question: "Do I need to wear a harness when working from a fully assembled tower?",
    answer: "Generally no — a properly assembled tower with guardrails, mid-rails, and toeboards provides collective fall protection that does not require a personal harness. However, a harness may be required during the assembly and disassembly process if the advance guardrail (AGR) method is not being used. Some site-specific risk assessments may also require harness use in exceptional circumstances. Check the method statement."
  },
  {
    question: "What is the minimum toeboard height and why is it important?",
    answer: "The minimum toeboard height is 150mm above the platform surface. Toeboards prevent tools, materials, and debris from being kicked or falling off the platform edge. A falling spanner from even 3m height can cause a serious head injury to someone below. Toeboards are a legal requirement on all open sides of the working platform under the Work at Height Regulations 2005."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum height of a guardrail above the working platform?",
    options: [
      "750mm",
      "850mm",
      "950mm",
      "1100mm"
    ],
    correctAnswer: 2,
    explanation: "Guardrails must be a minimum of 950mm above the working platform surface. This height provides effective edge protection to prevent persons falling from the platform. Both BS EN 1004 and the Work at Height Regulations 2005 specify this requirement."
  },
  {
    id: 2,
    question: "At what approximate height should the mid-rail be positioned?",
    options: [
      "250mm above the platform",
      "470mm above the platform (approximately halfway between toeboard and guardrail)",
      "700mm above the platform",
      "At any height the operative chooses"
    ],
    correctAnswer: 1,
    explanation: "The mid-rail should be positioned at approximately 470mm above the platform — roughly halfway between the toeboard top and the guardrail. Its purpose is to prevent a person falling through the gap between the guardrail and toeboard."
  },
  {
    id: 3,
    question: "What is the minimum height of toeboards on a mobile access tower?",
    options: [
      "50mm",
      "100mm",
      "150mm",
      "200mm"
    ],
    correctAnswer: 2,
    explanation: "Toeboards must be a minimum of 150mm high above the platform surface. They prevent tools, materials, and debris from falling off the platform edge, protecting people below from being struck by falling objects."
  },
  {
    id: 4,
    question: "Stabilisers on a mobile access tower work by:",
    options: [
      "Adding weight to the top of the tower",
      "Bracing diagonally from the tower to the ground, increasing the effective base",
      "Tying the tower to an adjacent structure",
      "Locking the castors more securely"
    ],
    correctAnswer: 1,
    explanation: "Stabilisers are diagonal braces that extend from the tower structure down to the ground at an angle. By doing so, they increase the effective base area of the tower, improving resistance to overturning. They must not obstruct access routes."
  },
  {
    id: 5,
    question: "When must a tower be tied in to an adjacent structure?",
    options: [
      "Always, regardless of height",
      "Only when used outdoors",
      "When the tower exceeds the manufacturer's maximum freestanding height",
      "Only when wind speeds exceed Beaufort 6"
    ],
    correctAnswer: 2,
    explanation: "A tower must be tied to a suitable adjacent structure when it is built beyond the manufacturer's specified maximum freestanding height. The instruction manual states the freestanding limit for each configuration. Building beyond this without ties creates an unacceptable risk of overturning."
  },
  {
    id: 6,
    question: "The three-point contact rule for climbing internal ladders means:",
    options: [
      "Climbing three rungs at a time",
      "Having three people hold the tower",
      "Maintaining two hands and one foot, or two feet and one hand, on the ladder at all times",
      "Resting at every third platform level"
    ],
    correctAnswer: 2,
    explanation: "Three-point contact means keeping three limbs in contact with the ladder while moving the fourth. This could be two hands and one foot, or two feet and one hand. It ensures stability during climbing and prevents falls."
  },
  {
    id: 7,
    question: "During tower assembly using the AGR (Advance Guard Rail) method, when is the operative protected from falls?",
    options: [
      "Only when the tower is fully complete",
      "At all times — the AGR provides temporary guardrail protection during the build process",
      "Only when wearing a harness in addition to the AGR",
      "Only at platform levels, not between them"
    ],
    correctAnswer: 1,
    explanation: "The AGR method provides temporary guardrail protection at each stage of the build. The advance guardrails are installed from the level below before the operative moves up to the next level, ensuring continuous edge protection throughout the assembly process."
  },
  {
    id: 8,
    question: "Which of the following is NOT a valid reason to use a harness during tower work?",
    options: [
      "During assembly without AGR method",
      "Site-specific risk assessment requirement",
      "As a substitute for missing guardrails on a completed tower",
      "During disassembly in high winds"
    ],
    correctAnswer: 2,
    explanation: "A harness must never be used as a substitute for missing guardrails on a completed tower. If guardrails are missing, the tower is incomplete and must not be used. Guardrails are collective protection — they protect everyone on the platform without requiring individual action. A harness should only supplement, not replace, collective measures."
  }
];

const PasmaModule2Section3 = () => {
  useSEO({
    title: "Safety Components | PASMA Module 2.3",
    description: "Learn about mobile access tower safety components: guardrails, mid-rails, toeboards, stabilisers, outriggers, tie-ins, access systems, and PPE requirements.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 mb-4">
            <Shield className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-block bg-elec-yellow/10 border border-elec-yellow/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-elec-yellow">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Safety Components
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding the safety-critical components that protect operatives from falls, falling objects, and tower instability
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Guardrails:</strong> min 950mm, all exposed sides</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Mid-rails:</strong> ~470mm, prevent falling through gap</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Toeboards:</strong> min 150mm, prevent objects falling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Stabilisers/outriggers:</strong> increase base, prevent overturning</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Check:</strong> guardrails on all open sides before use</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Confirm:</strong> toeboards fitted and secure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Verify:</strong> stabilisers fitted as per manufacturer's manual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Climb:</strong> using 3-point contact, internal access only</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white/70 mb-4">By the end of this section, you will be able to:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "State the minimum guardrail height and explain where guardrails must be fitted",
              "Describe the purpose of mid-rails and toeboards and their dimensional requirements",
              "Explain the difference between stabilisers and outriggers and when each is required",
              "Identify when a tower must be tied in to an adjacent structure",
              "Describe safe access methods including the three-point contact rule",
              "State the PPE requirements for tower assembly and use"
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Guardrails */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Guardrails
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Guardrails are the primary fall-prevention measure on a mobile access tower. They form a protective
                barrier around the platform edge, preventing operatives from falling from the platform. Guardrails
                are classified as <strong className="text-white">collective protection</strong> — they protect everyone
                on the platform without requiring individual action.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Dimensions</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium">Minimum Height</p>
                    <p className="text-elec-yellow text-2xl font-bold">950mm</p>
                    <p className="text-white/60">above the platform surface</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Required On</p>
                    <p className="text-elec-yellow text-lg font-bold">All exposed sides</p>
                    <p className="text-white/60">any side not against a structure</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Guardrail Systems</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Single Guardrail</p>
                    <p className="text-white/60">
                      A single rail at the top edge of the platform. Provides a basic barrier but leaves
                      a gap between the rail and the platform surface. A mid-rail must be fitted to close this gap.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Double Guardrail</p>
                    <p className="text-white/60">
                      Two rails — a top rail at 950mm minimum and an intermediate (mid) rail at approximately
                      470mm. This is the standard configuration on most modern tower systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">How Guardrails Are Secured</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Guardrail frames slot into sockets or clips welded to the end frames</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Gravity locks or spring clips engage automatically when the guardrail is seated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Some systems use separate guardrail posts that bolt or clip to the platform edge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All connections must be checked — pull-test each guardrail after fitting</span>
                  </li>
                </ul>
              </div>

              <p>
                Guardrails must never be removed while anyone is on the platform. If a guardrail is damaged
                or missing, the tower must not be used until it is replaced. The operative must descend and
                report the deficiency before any further work is carried out.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Mid-Rails & Intermediate Protection */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Mid-Rails & Intermediate Protection
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                A guardrail alone leaves a significant gap between the top rail and the platform surface. Without
                intermediate protection, a person could slip beneath the guardrail and fall from the platform. The
                mid-rail closes this gap.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition: Mid-Rail</h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">mid-rail</strong> (also called an intermediate rail) is a horizontal
                  bar positioned approximately <strong className="text-white">470mm</strong> above the platform surface —
                  roughly halfway between the toeboard and the guardrail. Its primary purpose is to prevent a person
                  from falling through the gap between the guardrail and the toeboard.
                </p>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">Mid-Rail Requirements</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Position:</strong> approximately 470mm above platform — midway between toeboard and guardrail</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Coverage:</strong> fitted on all open sides of the platform, matching the guardrail layout</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Strength:</strong> must withstand a horizontal force of at least 20kg at any point</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Integration:</strong> on most modern systems, the mid-rail is integral to the guardrail frame</div>
                  </li>
                </ul>
              </div>

              <p>
                Together, the guardrail, mid-rail, and toeboard form a complete edge protection system. All three
                elements must be present on all open sides of the working platform. Missing any one of these components
                creates a gap through which a person or object could fall.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Toeboards */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Toeboards
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Toeboards are low barriers fitted around the perimeter of the working platform at floor level. Their
                primary purpose is to prevent tools, materials, and debris from falling off the platform edge — protecting
                people below from being struck by falling objects.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Dimensions</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium">Minimum Height</p>
                    <p className="text-elec-yellow text-2xl font-bold">150mm</p>
                    <p className="text-white/60">above the platform surface</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Required On</p>
                    <p className="text-elec-yellow text-lg font-bold">All open sides</p>
                    <p className="text-white/60">with no gap at the base</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                  <h3 className="text-teal-300 font-medium mb-2">Integral Toeboards</h3>
                  <p className="text-white/70 text-sm">
                    Built into the platform or guardrail frame as part of the design. These are the preferred type
                    — they cannot be accidentally omitted because they form part of the structural assembly. Most
                    modern tower systems use integral toeboards.
                  </p>
                </div>
                <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                  <h3 className="text-teal-300 font-medium mb-2">Clip-On Toeboards</h3>
                  <p className="text-white/70 text-sm">
                    Separate boards that clip onto the platform edge or guardrail posts. These must be fitted
                    as a conscious step during assembly. There is a risk of them being forgotten — always check
                    toeboard presence as part of the pre-use inspection.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Falling Object Hazard</h3>
                </div>
                <p className="text-white/70 text-sm">
                  A 500g spanner dropped from just 3 metres hits the ground with the same force as a 5kg weight
                  dropped from table height. From 10 metres, the impact can be fatal. Toeboards are not optional —
                  they are a critical safety component that protects everyone working below or passing near the tower.
                  Always ensure an exclusion zone is maintained at the base of the tower.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Stabilisers & Outriggers */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Stabilisers & Outriggers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                When a tower needs additional stability — particularly at greater heights or in outdoor conditions —
                stabilisers or outriggers are fitted to increase the effective base area and reduce the risk of
                overturning.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h3 className="text-red-300 font-medium mb-2">Stabilisers</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Diagonal braces extending from the tower to ground level</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Attached to the tower at an intermediate height</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Foot plate at ground level spreads the load</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Increase effective base width diagonally</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h3 className="text-red-300 font-medium mb-2">Outriggers</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Horizontal extensions from the base of the tower</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Extend the base area outward in the horizontal plane</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Adjustable to accommodate uneven ground</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                      <span>Must be fully extended and in ground contact</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Important Considerations</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Stabilisers and outriggers must not obstruct pedestrian routes, fire exits, or vehicle access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If they encroach on a walkway, the area must be barriered and signed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>They must be fitted symmetrically — do not fit stabilisers on one side only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The manufacturer's manual specifies which type is required for each configuration and height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All stabiliser/outrigger foot plates must be in firm contact with the ground or sole boards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Tie-In Points & Anchoring */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Tie-In Points & Anchoring
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                When a tower is built beyond the manufacturer's specified maximum freestanding height, it must be
                tied to an adjacent structure to prevent overturning. Ties transfer lateral forces (primarily wind)
                from the tower into the building structure.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3 flex items-center gap-2">
                  <Anchor className="h-4 w-4" />
                  When Ties Are Required
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>Tower height exceeds the manufacturer's maximum freestanding limit</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>The risk assessment identifies excessive wind exposure</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>The tower is used in an exposed location (rooftop, open courtyard)</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>The task creates lateral forces on the tower (e.g., drilling into a wall)</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Tie Patterns</h3>
                <p className="text-white/70 text-sm mb-2">
                  Ties should be fitted at regular vertical intervals as specified by the manufacturer. Typical patterns include:
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>First tie at the lowest point specified by the manufacturer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Subsequent ties at intervals of every 2 to 4 metres vertically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ties on alternating faces of the tower to resist forces in all directions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The topmost tie should be as close to the top of the tower as practical</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Suitable Anchor Points</h3>
                <p className="text-white/70 text-sm mb-2">
                  A suitable anchor point must be structurally capable of resisting the tie forces. Acceptable anchors include:
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Structural steelwork (columns, beams) — not cladding or infill panels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Masonry walls of sufficient thickness and integrity (not single-leaf blockwork)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Reinforced concrete elements (columns, floor slabs, beams)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Purpose-designed anchor points fitted to the building structure</span>
                  </li>
                </ul>
                <p className="text-white/50 text-xs mt-2 italic">
                  Never tie to pipework, cable trays, suspended ceilings, window frames, or non-structural elements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Access Systems */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Access Systems
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Safe access to the working platform is a critical consideration. Operatives must be able to reach
                the platform safely, and the access method must not create additional hazards during the climb.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Internal Ladder Access</h3>
                <p className="text-white/70 text-sm mb-3">
                  The standard access method is via the internal ladder formed by the end frame rungs (transoms).
                  The operative climbs up inside the tower, passing through trapdoor platforms at each level.
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Always climb <strong className="text-white">inside</strong> the tower — never on the outside</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Close each trapdoor after passing through it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Face the ladder while climbing (face the rungs, not outward)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Do not carry heavy or bulky items while climbing — use a hoist or rope</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Wear suitable footwear with grip — no loose laces or open-toed shoes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Rule: Three-Point Contact</h3>
                <p className="text-white/80 text-sm">
                  The <strong className="text-white">three-point contact rule</strong> requires the climber to maintain
                  contact with the ladder at three points simultaneously: either two hands and one foot, or two feet
                  and one hand. Only one limb moves at a time. This ensures stability throughout the climb and
                  significantly reduces the risk of losing grip and falling.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Stairway Access Alternative</h3>
                <p className="text-white/70 text-sm mb-2">
                  For frequent access, extended-duration tasks, or when carrying tools and materials, a stairway
                  tower provides a safer and more practical access route. Benefits include:
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Walking upright instead of climbing vertically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Both hands available for carrying items (handrails for support)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Reduced physical effort — less fatigue over the working day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Improved accessibility for operatives with mobility limitations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Never Climb the Outside</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Climbing the outside of a tower is extremely dangerous. There is no fall protection — if you lose
                  grip, there is nothing to prevent a fall to the ground. External climbing also exerts lateral forces
                  on the tower that it is not designed to withstand. Always use the internal ladder access through
                  trapdoor platforms. If the internal access is obstructed, do not climb — clear the obstruction first.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Personal Protective Equipment */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Personal Protective Equipment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Personal Protective Equipment (PPE) is the last line of defence in the hierarchy of controls. For
                tower work, PPE supplements the collective protection provided by the tower's safety components
                (guardrails, toeboards, etc.) — it does not replace them.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3 flex items-center gap-2">
                  <HardHat className="h-4 w-4" />
                  PPE for Tower Assembly
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Safety helmet:</strong> mandatory during assembly and disassembly — protects against falling components and head impacts with the frame structure</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Safety boots:</strong> steel or composite toe cap, ankle support, non-slip sole — essential for handling heavy components and climbing</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Gloves:</strong> grip gloves for handling aluminium tubes and frames — reduces risk of cuts, pinch injuries, and improves grip</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">High-visibility clothing:</strong> required on construction sites and in areas with vehicle or plant movements</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Harness Use During Assembly (AGR Method)
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  The <strong className="text-white">Advance Guard Rail (AGR)</strong> method is the preferred assembly
                  technique because it provides collective fall protection at every stage of the build — no harness
                  is needed. However, if an alternative assembly method is used that does not provide continuous
                  guardrail protection, a harness and lanyard must be worn.
                </p>
                <div className="bg-white/5 rounded p-3">
                  <p className="text-white font-medium text-sm mb-1">When a Harness May Be Required:</p>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Assembly without the AGR method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Disassembly in adverse weather conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Site-specific risk assessment requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Working on incomplete towers (e.g., during modification)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Once a tower is fully assembled with all guardrails, mid-rails, and toeboards in place, the
                collective protection is generally sufficient and a harness is not required for normal use. However,
                always check the site-specific risk assessment and method statement — some clients and principal
                contractors have additional PPE requirements beyond the statutory minimum.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">PPE Inspection and Maintenance</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All PPE must be inspected before each use — check for damage, wear, and expiry dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Harnesses must have a current thorough examination certificate (at least every 6 months for frequently used equipment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Safety helmets must be replaced if cracked, heavily scratched, or past their expiry date (typically 3-5 years from manufacture)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>PPE must be stored correctly — away from UV light, chemicals, and extreme temperatures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz
            title="Section 3 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Structural Components
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2-section-4">
              Next: Tower Selection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PasmaModule2Section3;
