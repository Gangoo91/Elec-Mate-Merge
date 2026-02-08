import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Zap, Settings, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "agr-key-advantage",
    question: "What is the key safety advantage of the AGR method over the 3T method?",
    options: [
      "AGR towers are lighter to carry",
      "Guardrail protection is in place BEFORE the operative reaches the next level",
      "AGR towers do not need braces",
      "AGR towers can be assembled by one person"
    ],
    correctIndex: 1,
    explanation: "The AGR (Advance Guard Rail) system deploys guardrails upward from below, meaning protection is already in place before the operative climbs to the next level. With the 3T method, there is a brief period where the operative must install guardrails from the waist-height position through the trapdoor."
  },
  {
    id: "agr-vs-3t-compatibility",
    question: "Which statement about AGR and 3T compatibility is correct?",
    options: [
      "AGR frames work with any tower from any manufacturer",
      "3T can only be used with AGR-compatible towers",
      "AGR frames require specific compatible tower systems from the same manufacturer",
      "Both methods require identical frame types"
    ],
    correctIndex: 2,
    explanation: "AGR frames are manufacturer-specific and must be used with compatible tower systems from the same manufacturer. The 3T method, by contrast, works with any standard tower that has trapdoor platforms, regardless of manufacturer."
  },
  {
    id: "agr-dismantling",
    question: "When dismantling a tower with AGR frames, at what point can the guardrails be lowered and folded?",
    options: [
      "At any time during dismantling",
      "Only after the operative has descended to the level below",
      "Before the operative begins descending",
      "Only when the tower is fully dismantled"
    ],
    correctIndex: 1,
    explanation: "During AGR dismantling, the guardrails must remain in position until the operative has descended to the lower level. Only from the safety of the lower platform can the guardrails be unlocked, lowered, and folded. This maintains continuous edge protection throughout the dismantling process."
  }
];

const faqs = [
  {
    question: "What does AGR stand for and how does it work?",
    answer: "AGR stands for Advance Guard Rail. AGR frames have built-in guardrail sections that are hinged to the frame. When assembling, the guardrail sections are pushed upward from below and locked into their extended position. This means the guardrails are in place before anyone climbs to the next level, providing continuous protection throughout the assembly process."
  },
  {
    question: "Is the AGR method always better than the 3T method?",
    answer: "The AGR method is generally considered safer because it provides guardrail protection before the operative reaches the next level. However, the 3T method remains a valid and safe approach when performed correctly. The choice depends on the available equipment: AGR requires specific compatible frames, while 3T works with any standard tower. Both methods are covered in the PASMA course and both are accepted in the industry."
  },
  {
    question: "Can I mix AGR frames with standard frames from a different manufacturer?",
    answer: "No. AGR frames must only be used with compatible components from the same manufacturer and tower system. The AGR mechanism is designed to integrate with specific frame dimensions, spigot positions, and locking systems. Mixing components from different manufacturers or systems can result in incompatible fits, failed locks, and structural failure."
  },
  {
    question: "How do I maintain AGR frames to keep the mechanism working correctly?",
    answer: "AGR frames require regular inspection of the hinge points, locking mechanisms, springs, and guardrail straightness. Check that all moving parts operate smoothly, locks engage positively, and springs return guardrails to the correct position. Lubricate hinge points as recommended by the manufacturer. Reject any AGR frame where the mechanism does not operate correctly, locks fail to engage, or guardrails are bent or damaged."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does AGR stand for?",
    options: [
      "Automatic Guard Release",
      "Advance Guard Rail",
      "Assisted Ground Rail",
      "Adjustable Guard Rung"
    ],
    correctAnswer: 1,
    explanation: "AGR stands for Advance Guard Rail. The system deploys guardrails in advance of the operative reaching the next level, providing continuous protection during assembly."
  },
  {
    id: 2,
    question: "How are AGR guardrails deployed during assembly?",
    options: [
      "They are fitted manually from outside the tower",
      "They drop down automatically when the platform is installed",
      "They are pushed upward from below and locked into position before climbing",
      "They are lowered from above using a crane"
    ],
    correctAnswer: 2,
    explanation: "AGR guardrail sections are hinged to the frame and pushed upward from below by the operative. Once extended to full height, they lock into position, providing guardrail protection before the operative climbs to that level."
  },
  {
    id: 3,
    question: "Which of the following is an advantage of the 3T method over the AGR method?",
    options: [
      "3T provides better fall protection",
      "3T is faster to assemble",
      "3T works with any standard tower from any manufacturer",
      "3T does not require guardrails"
    ],
    correctAnswer: 2,
    explanation: "The 3T method works with any standard tower that has trapdoor platforms, regardless of manufacturer. AGR requires specific compatible frames from the same manufacturer, making the 3T method more versatile across different tower systems."
  },
  {
    id: 4,
    question: "When should the AGR method be preferred over the 3T method?",
    options: [
      "When working indoors only",
      "When the tower is less than 2 metres high",
      "For regular tower use, higher towers, and sites with strict safety requirements",
      "Only when required by the manufacturer"
    ],
    correctAnswer: 2,
    explanation: "AGR is preferred for regular tower use, higher towers, less experienced teams, and sites with strict safety requirements because it provides guardrail protection before the operative reaches each new level, reducing the risk of exposure to unguarded edges."
  },
  {
    id: 5,
    question: "During AGR dismantling, when can the guardrails be lowered?",
    options: [
      "As soon as dismantling begins",
      "Only after the operative has descended to the level below",
      "Before the operative starts descending",
      "At any point during the process"
    ],
    correctAnswer: 1,
    explanation: "Guardrails must remain in position until the operative has safely descended to the lower level. Only from the lower level can the guardrails be unlocked, lowered, and folded. This maintains continuous edge protection throughout dismantling."
  },
  {
    id: 6,
    question: "What should you check specifically on AGR frames during pre-assembly inspection?",
    options: [
      "Only the colour and labelling",
      "Hinges, locks, springs, and guardrail straightness",
      "Only the weight of the frame",
      "Only the frame dimensions"
    ],
    correctAnswer: 1,
    explanation: "AGR frames require inspection of the hinge points for free movement, locking mechanisms for positive engagement, springs for correct tension, and guardrail sections for straightness and structural integrity. Any defect in the AGR mechanism makes the frame unsafe to use."
  },
  {
    id: 7,
    question: "Can AGR frames from manufacturer A be used with standard frames from manufacturer B?",
    options: [
      "Yes, all tower frames are interchangeable",
      "Yes, but only if they are the same height",
      "No, AGR frames must be used with compatible components from the same manufacturer",
      "No, AGR frames cannot be used with any standard frames"
    ],
    correctAnswer: 2,
    explanation: "AGR frames are manufacturer-specific and must only be used with compatible components from the same manufacturer and tower system. Mixing manufacturers risks incompatible fits and failed locking mechanisms."
  },
  {
    id: 8,
    question: "What is the base assembly procedure for an AGR tower compared to a 3T tower?",
    options: [
      "AGR towers do not need a base",
      "The base assembly is different — AGR uses a special base frame",
      "The base assembly is the same as for a 3T tower",
      "AGR towers are built from the top down"
    ],
    correctAnswer: 2,
    explanation: "The base assembly is identical for both methods: position castors or base plates, fit end frames, install plan and horizontal braces, level, and lock castors. The difference begins at the upper levels where AGR frames replace standard frames."
  }
];

export default function PasmaModule3Section3() {
  useSEO({
    title: "AGR Method — Advance Guard Rail | PASMA Module 3.3",
    description: "How the Advance Guard Rail assembly method works, step-by-step AGR assembly, 3T vs AGR comparison, when to use each method, dismantling, and AGR maintenance.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Shield className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            AGR Method &mdash; Advance Guard Rail
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The safest assembly method &mdash; guardrail protection is deployed before the operative reaches each new level, eliminating exposure to unguarded edges
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Principle:</strong> Guardrails deployed BEFORE climbing to next level</li>
              <li><strong>How:</strong> Hinged guardrails pushed up from below, locked in place</li>
              <li><strong>Result:</strong> No exposure to unguarded edges at any point</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Requires:</strong> Specific AGR-compatible frames from one manufacturer</li>
              <li><strong>Base:</strong> Same as 3T &mdash; castors, frames, braces, level, lock</li>
              <li><strong>Check:</strong> AGR hinges, locks, and springs before each use</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principle of Advance Guard Rail protection",
              "Describe how AGR frames deploy guardrails mechanically",
              "Follow the AGR assembly sequence step by step",
              "Compare the 3T and AGR methods for safety, speed, and cost",
              "Determine when each method is most appropriate",
              "Carry out AGR-specific maintenance checks and inspections"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is the AGR Method? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is the AGR Method?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The AGR (Advance Guard Rail) method is the most advanced and safest assembly technique for mobile scaffold towers. Unlike the 3T method where guardrails are installed after the operative passes through the trapdoor, AGR frames provide guardrail protection <strong>before</strong> the operative reaches the next level.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Core Principle:</strong> AGR frames have built-in guardrail sections that are hinged to the end frames. These guardrail sections are pushed upward from below and locked into their extended position. Once locked, they provide full guardrail protection at the next level &mdash; before anyone climbs there.
                </p>
              </div>

              <p>
                The AGR method is considered the safest because the operative is never exposed to an unguarded edge at any point during the assembly. With the 3T method, there is a brief transition where the operative must install guardrails from the waist-height position. The AGR method eliminates even this brief exposure.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Safety Advantage</p>
                </div>
                <p className="text-sm text-white/80">
                  With AGR, guardrail protection is always one step ahead of the operative. By the time you climb to a new level, the guardrails are already there, fully deployed and locked. This is particularly valuable for less experienced teams, higher towers, and sites with strict safety standards.
                </p>
              </div>

              <p>
                The AGR method was developed in response to the recognition that the brief unguarded period during 3T guardrail installation &mdash; however short &mdash; represented a residual risk that could be engineered out. Major tower manufacturers now offer AGR-compatible frames as standard in their product ranges, and the method is increasingly specified on construction sites across the UK.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">AGR in the PASMA Course</p>
                <p className="text-sm text-white/80">
                  Both the 3T and AGR methods are taught and assessed on the PASMA Towers for Users course. Successful candidates will have demonstrated competence in both methods during the practical assessment. Your PASMA card covers both methods, so you do not need separate certification for AGR use.
                </p>
              </div>

              <p>
                The development of the AGR method represents a broader trend in the construction industry toward engineering out risk rather than relying solely on procedural controls. By building the guardrail protection into the frame itself, the AGR system removes the human factor from the most critical safety step &mdash; ensuring guardrails are in place before the operative is exposed to a fall hazard.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: How AGR Frames Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            How AGR Frames Work
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                AGR frames are mechanically more complex than standard end frames. Each AGR frame incorporates guardrail sections that are hinged at the top of the frame. In their folded (transport) position, the guardrail sections lie flat against the frame, making the unit compact for storage and handling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Mechanical Operation</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Folded state:</strong> The guardrail sections are hinged downward against the end frame. The unit is similar in size and weight to a standard end frame, allowing normal handling and transport.</p>
                  <p><strong className="text-white">Deployment:</strong> From the level below, the operative pushes the guardrail sections upward using their hands. The guardrails swing up through an arc until they reach their fully extended vertical position.</p>
                  <p><strong className="text-white">Locking:</strong> At full extension, a locking mechanism engages to hold the guardrail in position. The lock must click positively &mdash; check that it has engaged before releasing the guardrail. Some systems use spring-loaded locks, others require manual engagement.</p>
                  <p><strong className="text-white">Result:</strong> The extended guardrail section provides protection at the correct height (950mm to 1000mm above the next platform level) before the operative climbs to that level.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Critical Check</p>
                </div>
                <p className="text-sm text-white/80">
                  Always confirm the locking mechanism has engaged after pushing up each guardrail section. An unlocked AGR guardrail can fold back down under load, removing the protection entirely. Pull gently on the guardrail after deployment to confirm it is locked.
                </p>
              </div>

              <p>
                Different manufacturers implement the AGR mechanism in different ways. Some use a gravity-assisted lock that engages automatically as the guardrail reaches full extension. Others use a spring-loaded catch that clicks into a receptor. Some systems require the operative to manually engage a pin or clip after the guardrail is raised. You must be familiar with the specific mechanism of the AGR frames you are using &mdash; consult the manufacturer's instruction manual.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Weight Considerations</p>
                <p className="text-sm text-white/80">
                  AGR frames are heavier than standard end frames due to the additional guardrail sections and locking mechanisms. This affects manual handling during assembly and transport. Ensure your team is aware of the increased weight and uses proper lifting techniques. For taller towers where AGR frames must be lifted to significant heights, consider using a material hoist rather than hand-passing components between levels.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: AGR Assembly Step by Step */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            AGR Assembly Step by Step
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The AGR assembly follows the same base setup as the 3T method. The difference begins when AGR frames are fitted at the upper levels. The sequence ensures guardrail protection is always established before the operative ascends.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">AGR Assembly Sequence</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Base assembly (identical to 3T)</p>
                      <p className="text-sm text-white/80">Position castors, fit first end frames, install plan and horizontal braces, level, lock castors.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Fit AGR frames at the next level</p>
                      <p className="text-sm text-white/80">Install AGR end frames onto the spigots, with the guardrail sections in their folded (down) position. Add horizontal and diagonal braces.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Push up guardrail sections and lock</p>
                      <p className="text-sm text-white/80">From the current level, push the guardrail sections upward until they lock into the extended position. Confirm each lock has engaged by pulling gently.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">Install platform at the next level</p>
                      <p className="text-sm text-white/80">Fit the platform board at the new level. The guardrails are already in place above it, providing full edge protection.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-white">Climb to the new platform</p>
                      <p className="text-sm text-white/80">Ascend to the new level. You arrive at a platform that is already fully guarded &mdash; no additional guardrail fitting needed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-sm font-medium text-white">Repeat for each additional lift</p>
                      <p className="text-sm text-white/80">Continue the sequence: fit next AGR frames, deploy guardrails, install platform, climb. Repeat until the required height is reached.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SVG Diagram: AGR Frame — Folded vs Deployed */}
              <div className="my-8 flex justify-center">
                <svg viewBox="0 0 500 400" className="w-full max-w-sm text-white/70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* LEFT SIDE: Folded State */}
                  {/* Frame uprights */}
                  <line x1="50" y1="350" x2="50" y2="100" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="180" y1="350" x2="180" y2="100" stroke="currentColor" strokeWidth="2.5" />
                  {/* Horizontal rungs */}
                  <line x1="50" y1="350" x2="180" y2="350" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="270" x2="180" y2="270" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="190" x2="180" y2="190" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="2" />
                  {/* Folded guardrails (flat against frame top) */}
                  <line x1="50" y1="100" x2="50" y2="70" stroke="#EAB308" strokeWidth="2.5" opacity="0.6" />
                  <line x1="50" y1="70" x2="180" y2="70" stroke="#EAB308" strokeWidth="2.5" opacity="0.6" />
                  <line x1="180" y1="70" x2="180" y2="100" stroke="#EAB308" strokeWidth="2.5" opacity="0.6" />
                  {/* Hinge indicators */}
                  <circle cx="50" cy="100" r="4" fill="#EAB308" opacity="0.5" />
                  <circle cx="180" cy="100" r="4" fill="#EAB308" opacity="0.5" />
                  {/* Label */}
                  <text x="115" y="390" fill="currentColor" fontSize="13" textAnchor="middle" fontWeight="600">Folded</text>
                  <text x="115" y="55" fill="#EAB308" fontSize="10" textAnchor="middle" opacity="0.7">guardrail folded</text>

                  {/* Arrow between */}
                  <line x1="215" y1="220" x2="265" y2="220" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="currentColor" opacity="0.6" />
                    </marker>
                  </defs>

                  {/* RIGHT SIDE: Deployed State */}
                  {/* Frame uprights */}
                  <line x1="300" y1="350" x2="300" y2="100" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="430" y1="350" x2="430" y2="100" stroke="currentColor" strokeWidth="2.5" />
                  {/* Horizontal rungs */}
                  <line x1="300" y1="350" x2="430" y2="350" stroke="currentColor" strokeWidth="2" />
                  <line x1="300" y1="270" x2="430" y2="270" stroke="currentColor" strokeWidth="2" />
                  <line x1="300" y1="190" x2="430" y2="190" stroke="currentColor" strokeWidth="2" />
                  <line x1="300" y1="100" x2="430" y2="100" stroke="currentColor" strokeWidth="2" />
                  {/* Deployed guardrails (extended upward) */}
                  <line x1="300" y1="100" x2="300" y2="20" stroke="#EAB308" strokeWidth="2.5" />
                  <line x1="300" y1="20" x2="430" y2="20" stroke="#EAB308" strokeWidth="2.5" />
                  <line x1="430" y1="20" x2="430" y2="100" stroke="#EAB308" strokeWidth="2.5" />
                  {/* Intermediate rail */}
                  <line x1="300" y1="60" x2="430" y2="60" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="4 2" />
                  {/* Hinge indicators */}
                  <circle cx="300" cy="100" r="4" fill="#EAB308" />
                  <circle cx="430" cy="100" r="4" fill="#EAB308" />
                  {/* Lock indicators */}
                  <rect x="293" y="45" width="14" height="10" rx="2" stroke="#EAB308" strokeWidth="1.5" fill="none" />
                  <rect x="423" y="45" width="14" height="10" rx="2" stroke="#EAB308" strokeWidth="1.5" fill="none" />
                  {/* Platform level */}
                  <rect x="300" y="97" width="130" height="6" fill="currentColor" opacity="0.3" rx="1" />
                  {/* Labels */}
                  <text x="365" y="390" fill="currentColor" fontSize="13" textAnchor="middle" fontWeight="600">Deployed</text>
                  <text x="365" y="14" fill="#EAB308" fontSize="10" textAnchor="middle" fontWeight="600">advance guardrail</text>
                  <text x="460" y="52" fill="#EAB308" fontSize="9" opacity="0.7">lock</text>
                  <text x="270" y="102" fill="currentColor" fontSize="9" opacity="0.6">platform</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: 3T vs AGR Comparison */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            3T vs AGR Comparison
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Both the 3T and AGR methods are taught on the PASMA Towers for Users course and both are accepted as safe assembly methods when performed correctly. The key differences lie in the level of protection provided, speed of assembly, equipment requirements, and cost.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRightLeft className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Head-to-Head Comparison</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-medium text-white/60">Factor</div>
                    <div className="font-medium text-center text-purple-400">3T Method</div>
                    <div className="font-medium text-center text-green-400">AGR Method</div>
                  </div>
                  <hr className="border-white/10" />
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-white">Safety</div>
                    <div className="text-center text-white/80">Good &mdash; waist protection via trapdoor</div>
                    <div className="text-center text-white/80">Best &mdash; full guardrails before climbing</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-white">Speed</div>
                    <div className="text-center text-white/80">Slower &mdash; guardrails fitted at each level</div>
                    <div className="text-center text-white/80">Faster &mdash; guardrails deploy from below</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-white">Cost</div>
                    <div className="text-center text-white/80">Lower &mdash; standard frames</div>
                    <div className="text-center text-white/80">Higher &mdash; AGR frames cost more</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-white">Compatibility</div>
                    <div className="text-center text-white/80">Any tower with trapdoor platforms</div>
                    <div className="text-center text-white/80">Specific AGR-compatible systems only</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-white">Training</div>
                    <div className="text-center text-white/80">Covered in PASMA course</div>
                    <div className="text-center text-white/80">Covered in PASMA course</div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Takeaway:</strong> AGR is the safer and faster method, but it requires specific compatible equipment that costs more and is not universally available. The 3T method remains a fully valid, safe approach that works with any standard tower system.
                </p>
              </div>

              <p>
                On larger projects where multiple towers are in use simultaneously, standardising on one method (either all 3T or all AGR) simplifies training, reduces the risk of errors, and streamlines component management. However, the decision should always be based on safety and equipment availability rather than administrative convenience.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What Clients and Principal Contractors May Require</p>
                <p className="text-sm text-white/80">
                  Some principal contractors and clients now specify AGR as the required assembly method on their sites. This is a commercial decision driven by the improved safety profile of AGR. If AGR is specified in the contract or site rules, you must comply or negotiate an approved alternative. Check the site induction and construction phase plan for tower assembly requirements specific to that project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: When to Use Each Method */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            When to Use Each Method
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The choice between 3T and AGR depends on the equipment available, the frequency of tower use, the experience level of the team, and the site's safety requirements. In some cases, the decision is made for you &mdash; if AGR frames are not available, the 3T method is the only option.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">AGR Preferred For</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Regular, frequent tower use by the same team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Higher towers where the number of lifts increases risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Less experienced teams or newly PASMA-trained operatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Sites with strict safety requirements or CDM obligations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Organisations that own their own tower equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Situations where speed of assembly is commercially important</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-2">3T Still Valid For</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Older tower systems that predate AGR technology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mixed-component towers from hire companies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Occasional tower use where AGR investment is not justified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Situations where AGR frames are not available from the supplier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lower towers with fewer lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Experienced teams familiar with the 3T sequence</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                Regardless of which method is chosen, it must be documented in the method statement. The risk assessment should record why the chosen method is appropriate for the specific job and site conditions.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Transitioning Between Methods:</strong> Some organisations start with 3T equipment and later invest in AGR frames. When transitioning, ensure all operatives receive specific training on the new AGR frames, including deployment, locking, release, and inspection. Do not assume that 3T competence transfers automatically to AGR operation &mdash; the mechanical elements require separate familiarisation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Hire vs Ownership</p>
                <p className="text-sm text-white/80">
                  When hiring towers, you may not always receive AGR-compatible frames. Discuss equipment requirements with the hire company in advance. If AGR is specified in your method statement but AGR frames are not available, do not substitute with standard frames and attempt to continue with 3T unless the method statement is revised and the team is briefed on the change of procedure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Dismantling with AGR */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Dismantling with AGR
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dismantling an AGR tower follows the reverse sequence of assembly, with the same fundamental safety principle: the operative must always be protected by guardrails. Guardrails are only lowered after the operative has descended to the level below.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">AGR Dismantling Sequence</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Start at the top level:</strong> From the top working platform with guardrails in place around you.</p>
                  <p><strong className="text-white">2. Descend to the level below:</strong> Climb down through the trapdoor or access point to the next level down. The guardrails at the level you have just left remain in place.</p>
                  <p><strong className="text-white">3. Lower the guardrails from below:</strong> From the safety of the lower level, release the AGR locking mechanisms on the level above. The guardrail sections swing down and fold against the frame.</p>
                  <p><strong className="text-white">4. Remove the platform:</strong> Take out the platform board from the level above.</p>
                  <p><strong className="text-white">5. Remove braces and frames:</strong> Dismantle the horizontal and diagonal braces, then remove the AGR end frames.</p>
                  <p><strong className="text-white">6. Repeat downward:</strong> Continue the sequence for each lift until only the base remains.</p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Safety Rule</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>Never</strong> lower or remove guardrails while standing on the same level as those guardrails. The operative must always be at the level below before guardrails are lowered. Removing your own guardrails while standing on that platform creates an immediate, unprotected fall hazard.
                </p>
              </div>

              <p>
                The dismantling process also requires the same level of planning, competence, and supervision as assembly. Fatigue is a factor &mdash; if the team has been working all day and the tower is being dismantled at the end of the shift, concentration may be lower. Schedule dismantling for a time when the team is alert, and never rush the process. Components should be lowered carefully and stacked for transport, not dropped to ground level.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Dismantling Checks</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Confirm all materials and tools have been removed from the platform before dismantling begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Lower components to ground level &mdash; do not throw or drop them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Stack dismantled components neatly for transport or storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Inspect components for damage during dismantling &mdash; report any defects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maintain the exclusion zone until all components are at ground level</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: AGR Maintenance & Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            AGR Maintenance &amp; Checks
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                AGR frames have moving parts that standard frames do not. This means they require additional inspection and maintenance to ensure the guardrail deployment and locking mechanisms work reliably every time. A failed AGR mechanism is worse than having no AGR at all, because it creates a false sense of security.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">AGR-Specific Inspection Points</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Hinges:</strong> Check for free movement, no binding, no excessive wear or play. The guardrail should swing smoothly from folded to deployed position.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Locking mechanisms:</strong> Confirm positive engagement at full extension. The lock must hold firmly without requiring force to maintain position. Test by pushing and pulling the deployed guardrail.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Springs:</strong> Where spring-loaded locks are used, check that the spring returns the lock to the engaged position. Weak or broken springs may allow the lock to fail under load.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Guardrail straightness:</strong> Inspect each guardrail section for bends, dents, or deformation that could affect its strength or its ability to fold and deploy correctly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Release mechanisms:</strong> Confirm that the release mechanism (for dismantling) operates smoothly and that the guardrail folds down cleanly when released.</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">AGR Reject Criteria</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Locking mechanism does not engage positively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Guardrail will not extend to full height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Hinge is seized, cracked, or excessively worn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Spring is broken or has lost tension</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Guardrail section is bent or deformed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Any weld crack on the hinge or lock mounting</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Lubrication &amp; Care</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lubricate hinge points as per manufacturer guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use the lubricant type recommended by the manufacturer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Keep locking mechanism free from dirt and debris</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Store AGR frames to protect the mechanisms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Do not force a stiff mechanism &mdash; investigate the cause</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Record all maintenance in the equipment register</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Manufacturer&rsquo;s Guidance:</strong> Always follow the manufacturer's specific maintenance instructions for AGR frames. Different manufacturers use different mechanisms, and the inspection and lubrication requirements vary. Keep the manufacturer's instruction manual available on site.
                </p>
              </div>

              <p>
                AGR frames that fail inspection must be quarantined immediately and clearly tagged as defective. Do not leave faulty AGR frames mixed with serviceable stock &mdash; there is a risk that another team will pick them up and use them unknowingly. Report defective frames to the equipment manager or hire company for repair or replacement.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">AGR Inspection Frequency</p>
                <p className="text-sm text-white/80">
                  AGR mechanisms should be checked during the pre-assembly component inspection (before every use), during routine periodic inspections at intervals specified by the manufacturer, and after any event that may have affected the mechanism (impact, adverse weather, or being dropped). The inspection must be carried out by a competent person and the results recorded.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">AGR Frame Identification:</strong> AGR frames should be clearly marked or labelled to distinguish them from standard end frames. When storing mixed inventories, keep AGR frames separate and clearly identified to prevent confusion during deployment. Using a standard frame where an AGR frame was expected disrupts the assembly method and may leave operatives unprotected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: 3T Method
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3-section-4">
              Next: Stability Principles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}