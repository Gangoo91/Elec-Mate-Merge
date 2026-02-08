import { ArrowLeft, ArrowDownToLine, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dismantling & Safe Lowering – Assembly & Dismantling (IPAF Module 3 Section 4)";
const DESCRIPTION = "Safe dismantling procedures for mobile access towers. Reverse sequence, lowering components safely, minimum crew requirements, and post-dismantling site clearance.";

const quizQuestions = [
  {
    id: 1,
    question: "Dismantling a mobile access tower must follow:",
    options: [
      "Any convenient order, starting from the bottom",
      "The exact reverse of the assembly sequence",
      "A random order decided on site",
      "The same order as assembly, from the bottom up"
    ],
    correctAnswer: 1,
    explanation: "Dismantling must always follow the exact reverse of the assembly sequence. The tower was designed and tested for assembly in a specific order, and reversing that order ensures structural integrity is maintained throughout the dismantling process."
  },
  {
    id: 2,
    question: "Components removed during dismantling must be:",
    options: [
      "Thrown down to save time",
      "Dropped from the platform to the ground",
      "Lowered carefully — NEVER thrown",
      "Slid down the outside of the tower"
    ],
    correctAnswer: 2,
    explanation: "Components must always be lowered carefully using hand-to-hand passing, rope and pulley, or other controlled methods. Throwing components creates a serious risk of injury to people below and can damage the components."
  },
  {
    id: 3,
    question: "What is the minimum number of persons required for tower dismantling?",
    options: [
      "One trained person is sufficient",
      "Minimum two persons",
      "Minimum four persons",
      "It depends on the tower height only"
    ],
    correctAnswer: 1,
    explanation: "A minimum of two persons is required for dismantling. One person works on the tower removing components from the upper levels, and at least one person on the ground receives components, maintains the exclusion zone, and provides emergency assistance."
  },
  {
    id: 4,
    question: "At each level during dismantling, which components are removed LAST?",
    options: [
      "The platforms",
      "The diagonal braces",
      "The guardrails",
      "The frame sections"
    ],
    correctAnswer: 2,
    explanation: "Guardrails are removed last at each level. Since dismantling is the reverse of assembly, and guardrails were installed before the platform in assembly, the platform is removed first, then the guardrails. The operative must be on the level below (protected by its guardrails) before removing the guardrails from the level above."
  },
  {
    id: 5,
    question: "When using a rope and pulley to lower components, the rope must be:",
    options: [
      "Any available rope from site",
      "Rated for the weight being lowered and in good condition",
      "At least 25mm diameter",
      "Made of natural fibre only"
    ],
    correctAnswer: 1,
    explanation: "The rope must be rated for the weight of the heaviest component being lowered and must be in good condition with no fraying, cuts, or degradation. Use purpose-made lowering equipment wherever possible."
  },
  {
    id: 6,
    question: "After dismantling is complete, what must happen before the area is released?",
    options: [
      "Nothing — walk away once the last component is down",
      "Post-dismantling site clearance: remove all components, barriers, and debris from the area",
      "Leave the castors in position for the next team",
      "Only remove the barriers"
    ],
    correctAnswer: 1,
    explanation: "A full post-dismantling site clearance is required. All components must be collected, inspected, and stored properly. Barriers and signage must be removed. The ground must be checked for debris, fixings, or damage. The area should be left in a safe and tidy condition."
  },
  {
    id: 7,
    question: "If wind speed increases significantly during dismantling, you should:",
    options: [
      "Work faster to finish quickly",
      "Continue normally — wind only affects assembly",
      "Stop work, secure the partially dismantled tower, and wait for conditions to improve",
      "Remove the guardrails first to reduce wind loading"
    ],
    correctAnswer: 2,
    explanation: "If wind conditions become hazardous, stop work immediately. Secure the tower in its current state — do not leave it partially dismantled without guardrails. Wait for conditions to improve before resuming. A partially dismantled tower is less stable than a complete one."
  },
  {
    id: 8,
    question: "When lowering components hand-to-hand, the ground person should:",
    options: [
      "Stand directly under the tower",
      "Stand outside the tower footprint and receive components at arm's length",
      "Walk away and return when all components are on the ground",
      "Stand on a ladder next to the tower"
    ],
    correctAnswer: 1,
    explanation: "The ground person should stand outside the tower footprint and receive components passed down at arm's length. Standing directly under the tower puts them at risk from dropped components. Clear communication between the tower operative and ground person is essential."
  }
];

const quickCheckQuestions = [
  {
    id: "dismantling-sequence",
    question: "A tower was assembled in the sequence: base, level 1, level 2, level 3. In what order must it be dismantled?",
    options: [
      "Base first, then level 1, level 2, level 3",
      "Level 3 first, then level 2, level 1, base",
      "Any order is acceptable",
      "Remove all platforms first, then all frames"
    ],
    correctIndex: 1,
    explanation: "Dismantling is ALWAYS the exact reverse of the assembly sequence. If the tower was built base, 1, 2, 3, then it must be dismantled 3, 2, 1, base. This maintains structural integrity throughout the process."
  },
  {
    id: "lowering-components",
    question: "You need to lower a frame section from level 3. Which method is acceptable?",
    options: [
      "Throw it to the ground",
      "Drop it over the edge",
      "Lower it by rope and pulley or pass hand-to-hand",
      "Slide it down the outside of the tower"
    ],
    correctIndex: 2,
    explanation: "Components must always be lowered in a controlled manner — rope and pulley for heavier items or hand-to-hand passing between operatives. Components must NEVER be thrown, dropped, or slid down the outside of the tower."
  },
  {
    id: "guardrails-last",
    question: "Why are guardrails the last components removed at each level during dismantling?",
    options: [
      "Because they are the lightest",
      "Because they provide fall protection — the operative must be on the level below before rails above are removed",
      "Because they are easiest to remove",
      "Because the manufacturer says so without a reason"
    ],
    correctIndex: 1,
    explanation: "Guardrails provide fall protection. They are removed last because the operative must climb down to the level below (which still has its guardrails) before removing the guardrails from the level above. This ensures the operative is always protected during dismantling."
  }
];

const faqs = [
  {
    question: "Can I dismantle the tower in a different order from the assembly sequence?",
    answer: "No. Dismantling must follow the exact reverse of the assembly sequence specified in the manufacturer's instruction manual. The tower's structural integrity depends on components being in place in the correct order. Removing components out of sequence can cause sudden structural failure or collapse of the partially dismantled tower."
  },
  {
    question: "What should I do if a component is stuck and will not release during dismantling?",
    answer: "Do not use excessive force, hammers, or improvised tools. Check for paint build-up, corrosion, or debris in the locking mechanism. Try working the component gently back and forth. If it still will not release, stop and consult the manufacturer's guidance. A stuck component may indicate a damaged or deformed part that needs specialist attention."
  },
  {
    question: "Is it acceptable to partially dismantle a tower and leave it overnight?",
    answer: "A partially dismantled tower should be avoided where possible. If work must stop, ensure the tower is left in a stable condition with all guardrails in place at the top working level. Secure the exclusion zone, post warning signs, and brief the site management. Never leave a partially dismantled tower with missing guardrails — this is an immediate fall-from-height hazard."
  },
  {
    question: "How should components be stored after dismantling?",
    answer: "Components should be inspected as they are removed, cleaned of debris, and stored flat or in designated racks. Keep them off the ground to prevent moisture damage. Store in a dry, secure area. Any damaged components should be tagged, segregated, and reported. Maintain an inventory to ensure all components are accounted for. Proper storage extends the lifespan of the tower system."
  }
];

const IpafModule3Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <ArrowDownToLine className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 3.4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Dismantling & Safe Lowering
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Safe dismantling in reverse sequence, controlled lowering of components, and post-dismantling site clearance
          </p>
        </div>

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2 text-base">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Reverse Sequence:</strong> ALWAYS dismantle in the exact reverse order of assembly.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Never Throw:</strong> Components are lowered, NEVER thrown or dropped.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Two Persons Minimum:</strong> One on the tower, one on the ground at minimum.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Guardrails Last:</strong> At each level, guardrails are the last to be removed.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Exclusion Zone:</strong> Maintain the zone throughout the entire dismantling process.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Site Clearance:</strong> Remove all components, barriers, and debris when complete.</span></li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2 text-base">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Spot:</strong> End of a job, tower relocation, scaffold handback.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Use:</strong> Follow the manufacturer's dismantling sequence from the instruction manual.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Apply:</strong> Plan the dismantling, brief the team, maintain the exclusion zone, lower components carefully, inspect and store components after removal.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain why dismantling must always follow the exact reverse of the assembly sequence</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Describe safe methods for lowering components from height</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>State the minimum crew size for dismantling operations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain why guardrails are removed last at each level</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Choose appropriate lowering methods for different component types</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Carry out post-dismantling site clearance and component storage</span>
            </li>
          </ul>
        </section>

        {/* Section 03: The Reverse Sequence Rule */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              The Reverse Sequence Rule
            </h2>
            <div className="space-y-4 text-white">
              <p>
                This is the most fundamental principle of tower dismantling. The tower was designed,
                tested, and certified to be assembled in a specific sequence. The structural integrity
                of the tower at each stage of assembly depends on the components being in the correct
                order. Dismantling must therefore follow the exact reverse of this sequence.
              </p>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Why Reverse Sequence Is Non-Negotiable
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Structural Integrity:</strong> Removing components out of order can create an unstable structure that collapses without warning</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Overloading:</strong> The wrong sequence can overload remaining components beyond their design capacity</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Fall Protection:</strong> Only the reverse sequence guarantees the operative is always protected by guardrails during dismantling</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Tested Sequence:</strong> The manufacturer has tested the assembly/dismantling sequence — any other order is untested and unpredictable</span></li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-elec-yellow">Reverse Sequence Example (3T Tower)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-300 mb-2">Assembly Order</h4>
                    <ol className="text-sm space-y-1 list-decimal ml-4 text-white/80">
                      <li>Castors and base</li>
                      <li>First frames and braces</li>
                      <li>Guardrails (from below)</li>
                      <li>Platform</li>
                      <li>Next frames and braces</li>
                      <li>Guardrails (from below)</li>
                      <li>Top platform</li>
                      <li>Top guardrails</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-300 mb-2">Dismantling Order (Reverse)</h4>
                    <ol className="text-sm space-y-1 list-decimal ml-4 text-white/80">
                      <li>Top guardrails (from below)</li>
                      <li>Top platform</li>
                      <li>Upper guardrails (from below)</li>
                      <li>Upper frames and braces</li>
                      <li>Lower platform</li>
                      <li>Lower guardrails</li>
                      <li>Lower frames and braces</li>
                      <li>Base and castors</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Step-by-Step Dismantling */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Step-by-Step Dismantling Procedure
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Before starting, brief the team on the dismantling plan. Ensure the exclusion zone is
                in place, all castors are locked, and the instruction manual is available. Confirm all
                personnel and materials are off the tower working platform.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-elec-yellow">Dismantling Each Level</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">1</div>
                    <div><strong>Clear the Top Platform:</strong> Remove all tools, materials, and equipment from the working platform. Nothing should remain on the tower above the dismantler.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">2</div>
                    <div><strong>Descend to the Level Below:</strong> Climb down to the platform one level below the top. You are now protected by the guardrails of this lower platform.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">3</div>
                    <div><strong>Remove Top Guardrails:</strong> Reaching up through the trapdoor (3T) or from below, remove the guardrails from the top level. Lower them carefully.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">4</div>
                    <div><strong>Remove Top Platform:</strong> Lift out the platform from the top level and lower it down. For AGR systems, the guardrails will collapse when the platform is removed.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">5</div>
                    <div><strong>Remove Toeboards:</strong> Remove toeboards from the top level if fitted as separate components.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">6</div>
                    <div><strong>Remove Braces:</strong> Remove diagonal and horizontal braces from the top frame section. Lower each one carefully.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">7</div>
                    <div><strong>Remove Frame Sections:</strong> Disconnect and remove the top frame sections. Lower them to the ground person.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">8</div>
                    <div><strong>Repeat:</strong> Move down one level and repeat the sequence until only the base remains. Dismantle the base last.</div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Safe Lowering Methods */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              Safe Lowering Methods
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Components must NEVER be thrown, dropped, or allowed to fall uncontrolled from any height.
                There are two primary methods for lowering components safely, and the choice depends on the
                height, weight of the component, and the number of operatives available.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Hand-to-Hand Passing</h3>
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Suitable For:</strong> Lower heights (up to ~4m), lighter components</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Method:</strong> Operative on tower passes component down to person on ground or intermediate level</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Communication:</strong> Clear verbal signals ("ready to receive", "releasing")</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Position:</strong> Ground person stands to the side, not directly below</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Grip:</strong> Both parties must have a firm grip before releasing</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Rope and Pulley</h3>
                  <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Suitable For:</strong> Greater heights (above ~4m), heavier components</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Equipment:</strong> Purpose-made gin wheel, rated rope, secure attachment</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Rope Rating:</strong> Must be rated for the weight being lowered</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Control:</strong> Lower steadily — never let the rope run free</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Anchor:</strong> Pulley must be securely fixed to the tower structure</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  NEVER Throw Components
                </h3>
                <p className="text-white text-sm">
                  Throwing components from a tower is one of the most dangerous practices on a construction
                  site. A 3kg guardrail tube dropped from 6 metres generates enough force to cause a fatal
                  head injury. Even with a hard hat, the impact energy at this height is well beyond the
                  protection level of standard head protection. Use controlled lowering methods every time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Minimum Crew Requirements */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">06</span>
              Minimum Crew Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Tower dismantling requires a minimum of two persons. This is not merely a recommendation —
                it is a practical necessity for safe operation. The risk assessment may require additional
                personnel depending on the tower height, location, and complexity.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Tower Operative</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Position:</strong> On the tower, one level below the level being dismantled</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Role:</strong> Removes components in the correct reverse sequence</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Passes:</strong> Hands or lowers components to the ground person</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Qualification:</strong> Must be PASMA trained and competent</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>PPE:</strong> Full PPE including hard hat with chinstrap</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Ground Person</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Position:</strong> On the ground, outside the tower footprint</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Role:</strong> Receives components, stacks them safely</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Exclusion Zone:</strong> Maintains the exclusion zone and controls access</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Emergency:</strong> Available to summon help if an incident occurs</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>PPE:</strong> Full PPE including hard hat</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">When More Than Two Are Needed</h3>
                <ul className="text-white text-sm space-y-1">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Tower height exceeds 4 metres — additional person for component handling</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Near public areas — dedicated banksman for exclusion zone control</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>AGR systems — heavier frames may need team lifting</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Rope and pulley operations — separate rope handler</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Complex configurations — additional trained operative on the tower</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Guardrails Last at Each Level */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              Guardrails Last — The Critical Principle
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Just as guardrails are installed first (before stepping onto a platform) during assembly,
                they must be removed last during dismantling. The operative must always be on the level
                below — protected by that level's guardrails — before removing guardrails from the
                level above.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-elec-yellow">Why Guardrails Are Removed Last</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div><strong>Fall Protection:</strong> Guardrails are the primary fall protection for anyone on the platform. Removing them early exposes the operative to an unprotected edge.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div><strong>Reverse of Assembly:</strong> In assembly, guardrails are fitted before the operative steps onto the platform. In dismantling, the operative leaves the platform (goes down) before the guardrails are removed.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div><strong>Protected Removal:</strong> Guardrails on the level above are removed by reaching up from the protected level below — the same principle as the 3T assembly method in reverse.</div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Deadly Shortcut
                </h3>
                <p className="text-white text-sm">
                  Removing guardrails early to "make it easier to pass components down" is one of the
                  most common and most dangerous shortcuts in tower dismantling. It is responsible for
                  numerous fatal falls from mobile towers. There is no situation where removing guardrails
                  before the platform and braces is acceptable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Post-Dismantling */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Post-Dismantling: Storage & Site Clearance
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The job is not complete when the last component reaches the ground. Post-dismantling
                tasks ensure the site is left safe, components are preserved for future use, and any
                defects are reported.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Component Storage</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Inspect:</strong> Check each component for damage as it is removed</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Clean:</strong> Remove dirt, concrete, paint, and debris</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Dry Storage:</strong> Store in a dry, covered area to prevent corrosion</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Off the Ground:</strong> Use racks, pallets, or stillages</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Organised:</strong> Group by type (frames, braces, platforms, etc.)</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Inventory:</strong> Count all components against the parts list</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Tag Defects:</strong> Separate and tag any damaged components</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Site Clearance</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Remove Barriers:</strong> Take down exclusion zone barriers and signage</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Clear Debris:</strong> Pick up any fixings, clips, or locking pins from the ground</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Ground Repair:</strong> Note any ground damage (indentations from castors, sole board marks)</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Notify Site:</strong> Inform the site manager that the area is clear</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Documentation:</strong> Complete any required handback or completion forms</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Defect Reporting</h3>
                <p className="text-white text-sm">
                  Any component found to be damaged during dismantling must be reported immediately.
                  Tag the component with a "DO NOT USE" label, record the defect type, and inform
                  your supervisor. Damaged components must be quarantined and sent for repair or
                  disposal. Never return a defective component to the general stock without proper
                  inspection and clearance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Weather and Emergency Stops */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Weather Conditions & Emergency Stops
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Dismantling is as vulnerable to weather conditions as assembly. Wind, rain, lightning,
                and poor visibility can all create additional hazards during the process.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-300">Stop Work Conditions</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Wind:</strong> Stop if wind speed exceeds the manufacturer's limit (typically 17 mph / Beaufort 4)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Lightning:</strong> Stop immediately — metal tower is a conductor</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Heavy Rain:</strong> Slippery components and reduced grip</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Ice/Frost:</strong> Slippery surfaces on platforms and frames</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Poor Visibility:</strong> Fog, failing light, or dust</span></li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-300">Emergency Stop Procedure</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Secure:</strong> Leave the tower in a stable state with guardrails in place</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Descend:</strong> All operatives descend safely to ground level</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Barriers:</strong> Ensure the exclusion zone remains in place</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Signage:</strong> Post "Tower Under Dismantling — Do Not Use" signs</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Report:</strong> Notify site management of the situation</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Dismantling Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Dismantling Golden Rules</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Reverse sequence:</strong> Always</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Never throw:</strong> Lower everything</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Min 2 persons:</strong> Tower + ground</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Guardrails last:</strong> At every level</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Castors locked:</strong> Throughout</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Exclusion zone:</strong> Maintain always</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Lowering Methods</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Hand-to-hand:</strong> Lower heights, light items</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Rope & pulley:</strong> Above 4m, heavier items</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">NEVER:</strong> Throw, drop, or slide</span></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Post-Dismantling Checklist</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Inspect all components</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Clean and dry before storage</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Tag any defective items</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Count against parts list</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Store in dry, covered area</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Remove barriers and signage</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Clear debris from site</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Notify site manager of completion</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Stop Work If</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Wind exceeds manufacturer's limit</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Lightning is observed</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Heavy rain reduces grip</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ice or frost on components</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Visibility is poor</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Dismantling & Safe Lowering Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: AGR Method
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-4">
              Next: Module 4 — Inspection & Maintenance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule3Section4;
