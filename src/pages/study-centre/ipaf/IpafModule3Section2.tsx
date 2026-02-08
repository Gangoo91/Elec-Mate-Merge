import { ArrowLeft, Layers, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "3T Method (Through The Trap) – Assembly & Dismantling (IPAF Module 3 Section 2)";
const DESCRIPTION = "Step-by-step 3T assembly method for mobile access towers. Climb through the trapdoor, install guardrails from a protected position, and build safely to full height.";

const quizQuestions = [
  {
    id: 1,
    question: "What does '3T' stand for in the 3T assembly method?",
    options: [
      "Three Tower method",
      "Through The Trap",
      "Triple Tie method",
      "Tower To Top"
    ],
    correctAnswer: 1,
    explanation: "3T stands for 'Through The Trap'. The operative climbs through the trapdoor in the platform to reach each new level, installing guardrails from a protected position before stepping onto the platform."
  },
  {
    id: 2,
    question: "During 3T assembly, when must the castors be locked?",
    options: [
      "Only once the tower is complete",
      "Before the first frame is erected on the base",
      "After the second platform is installed",
      "Only when the tower is being used, not during assembly"
    ],
    correctAnswer: 1,
    explanation: "All castors must be locked before the first frame is erected. The tower must never be moved during assembly — all four castor brakes must remain engaged throughout the entire build process."
  },
  {
    id: 3,
    question: "At what point during 3T assembly does the operative install guardrails?",
    options: [
      "After stepping onto the new platform",
      "While standing on the platform below, reaching through the trapdoor",
      "From a ladder leaning against the tower",
      "From the ground using a pole"
    ],
    correctAnswer: 1,
    explanation: "The operative installs guardrails from the platform below by reaching through the trapdoor. This means the operative is always protected by the guardrails of the level they are standing on while fitting rails to the next level."
  },
  {
    id: 4,
    question: "Why must you NEVER stand on an unguarded platform during 3T assembly?",
    options: [
      "It voids the tower warranty",
      "The platform is not strong enough without guardrails",
      "There is a direct risk of falling from height with no edge protection",
      "It makes the tower unstable"
    ],
    correctAnswer: 2,
    explanation: "Standing on an unguarded platform exposes the operative to a direct fall from height — the single greatest cause of fatalities in the construction industry. The 3T method eliminates this risk by ensuring guardrails are always installed before the operative steps onto the platform."
  },
  {
    id: 5,
    question: "What is the correct sequence for adding a new level in 3T assembly?",
    options: [
      "Platform → Guardrails → Frames → Braces",
      "Frames → Braces → Guardrails → Platform",
      "Frames → Braces → Platform (through trap) → Guardrails from below",
      "Frames → Guardrails (from below through trap) → Platform → Climb up"
    ],
    correctAnswer: 3,
    explanation: "The correct 3T sequence is: add frames, add braces, then from the platform below reach through the trapdoor to install guardrails on the new level. Only then install the platform and climb through the trap to the new guarded level."
  },
  {
    id: 6,
    question: "How should adjustable legs be set during the initial base assembly?",
    options: [
      "Fully extended for maximum height",
      "Fully retracted to keep the tower low",
      "Adjusted so the base frame is perfectly level, verified with a spirit level",
      "Set to the same length regardless of ground conditions"
    ],
    correctAnswer: 2,
    explanation: "Adjustable legs must be set so the base frame is perfectly level. Use a spirit level to verify. This is the foundation for the entire tower — any error at the base compounds as height increases."
  },
  {
    id: 7,
    question: "During 3T assembly, diagonal braces serve which primary purpose?",
    options: [
      "They are decorative and optional",
      "They provide lateral rigidity and prevent the frame from racking",
      "They are used as a climbing aid",
      "They hold the platforms in place"
    ],
    correctAnswer: 1,
    explanation: "Diagonal braces provide lateral rigidity, preventing the tower from racking (deforming into a parallelogram shape). Without diagonal braces, the tower would be structurally unstable and could collapse under lateral load."
  },
  {
    id: 8,
    question: "The trapdoor in a 3T platform must:",
    options: [
      "Be left open at all times for quick escape",
      "Be closed after the operative has climbed through",
      "Be removed once the tower is complete",
      "Only be used by the lead assembler"
    ],
    correctAnswer: 1,
    explanation: "The trapdoor must be closed after the operative has climbed through. An open trapdoor is a trip hazard and reduces the effective platform area. It also means there is an unprotected opening that someone could fall through."
  }
];

const quickCheckQuestions = [
  {
    id: "3t-castor-lock",
    question: "When during 3T assembly must you lock the castors?",
    options: [
      "After the first platform is installed",
      "Before erecting the first frame on the base",
      "Once the tower reaches working height",
      "Only when someone climbs the tower"
    ],
    correctIndex: 1,
    explanation: "All four castors must be locked before the first frame is erected on the base. The tower must never move during assembly — castor brakes stay engaged throughout the entire build."
  },
  {
    id: "3t-guardrail-position",
    question: "From which position does the operative install guardrails in the 3T method?",
    options: [
      "Standing on the new (unguarded) platform",
      "From the platform below, reaching through the trapdoor",
      "From a ladder propped against the tower",
      "From the ground using extension poles"
    ],
    correctIndex: 1,
    explanation: "The operative always installs guardrails from the platform below by reaching through the trapdoor. This ensures they are protected by the existing guardrails while fitting new ones to the level above."
  },
  {
    id: "3t-platform-rule",
    question: "When can you step onto a new platform during 3T assembly?",
    options: [
      "As soon as the platform is placed",
      "Only after the guardrails for that level are fully installed",
      "Once you have clipped your harness on",
      "After the diagonal braces are fitted"
    ],
    correctIndex: 1,
    explanation: "You may only step onto a new platform after the guardrails for that level have been fully installed from below. The platform must be guarded before anyone stands on it — this is the fundamental principle of the 3T method."
  }
];

const faqs = [
  {
    question: "Can one person assemble a tower using the 3T method?",
    answer: "Whilst some smaller towers can technically be assembled by one trained person, best practice and most manufacturer instructions recommend a minimum of two operatives. A second person is needed to pass components, stabilise frames during fitting, and provide assistance in an emergency. The risk assessment should always determine the minimum crew size."
  },
  {
    question: "What if the trapdoor platform does not fit properly?",
    answer: "If a platform does not seat correctly, do not force it. Check that the frame dimensions match the platform size, that locking hooks or clips are engaging, and that the platform is the correct model for the tower system. A poorly fitted platform can disengage under load. Never continue assembly on a platform that is not fully locked in position."
  },
  {
    question: "How do I know when the tower has reached the correct height?",
    answer: "The instruction manual specifies the maximum platform height for the chosen configuration and base dimensions. The working height (platform height plus operative height) must allow the task to be performed without over-reaching. Never add extra levels beyond the manufacturer's stated maximum — this invalidates the structural design and creates an unstable tower."
  },
  {
    question: "Is the 3T method suitable for all mobile tower types?",
    answer: "The 3T method is the traditional assembly method and is compatible with most standard aluminium tower systems that use trapdoor platforms. However, some modern tower systems are designed specifically for the AGR (Advance Guard Rail) method and may not use trapdoor platforms. Always follow the manufacturer's recommended assembly method for the specific tower system."
  }
];

const IpafModule3Section2 = () => {
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
          <Layers className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 3.2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            3T Method (Through The Trap)
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Step-by-step 3T assembly sequence — installing guardrails from a protected position at every level
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
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>3T:</strong> "Through The Trap" — climb through the trapdoor to reach each new level.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Key Principle:</strong> Guardrails are always installed BEFORE stepping onto a platform.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Protected Position:</strong> Install guardrails from the level below via the trapdoor.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Sequence:</strong> Base → Level → Frames → Braces → Guardrails (from below) → Platform → Repeat.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Golden Rule:</strong> NEVER stand on an unguarded platform.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Castors:</strong> Locked from the very start and throughout assembly.</span></li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2 text-base">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Spot:</strong> Traditional aluminium tower systems with trapdoor platforms.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Use:</strong> Standard assembly method for most PASMA-type towers.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Apply:</strong> Follow the instruction manual step by step, never skip guardrail installation, always close the trapdoor after climbing through.</span></li>
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
              <span>Explain the meaning and purpose of the 3T (Through The Trap) assembly method</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Describe the correct sequence for assembling each level of a mobile access tower</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Demonstrate how guardrails are installed from a protected position through the trapdoor</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify the critical safety rule: never stand on an unguarded platform</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Assemble the base section correctly including castors, levelling, and first frame</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Continue adding levels until the planned working height is reached</span>
            </li>
          </ul>
        </section>

        {/* Section 03: Base Assembly */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Base Assembly
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The base is the foundation of the entire tower. Every error at base level is amplified
                as the tower grows in height. Take your time to get this stage right — it determines
                the stability and safety of the entire structure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-elec-yellow">Base Assembly Steps</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">1</div>
                    <div><strong>Position Castors:</strong> Place the four castors at the marked positions. Ensure they are the correct type for the tower system.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">2</div>
                    <div><strong>Lock All Castors:</strong> Engage all four castor brakes immediately. They remain locked throughout the entire assembly process.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">3</div>
                    <div><strong>Fit Adjustable Legs:</strong> Insert adjustable legs into the castors or base plates. Extend as needed for levelling.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">4</div>
                    <div><strong>Level the Base:</strong> Use a spirit level across both diagonals and both axes. Adjust legs until perfectly level.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">5</div>
                    <div><strong>Add First Frame Sections:</strong> Fit the end frames onto the adjustable legs, ensuring locking clips engage fully.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">6</div>
                    <div><strong>Add Horizontal Braces:</strong> Connect the two end frames with horizontal braces at the base level.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">7</div>
                    <div><strong>Add Diagonal Braces:</strong> Fit diagonal braces to provide lateral stability. Follow the manufacturer's bracing pattern.</div>
                  </li>
                </ol>
              </div>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Base Assembly Rules
                </h3>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>All four castors MUST be locked</strong> before any frame is erected</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>The base MUST be level</strong> — check with a spirit level, not by eye</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Never use bricks, blocks, or timber</strong> as packing under castors</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>All connections MUST click or lock</strong> — finger-tight is not enough</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Building Each Level */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Building Each Level — The 3T Sequence
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Once the base is complete, each subsequent level follows the same repeating sequence.
                The key principle is that guardrails for the new level are always installed from the
                protected position of the level below, through the trapdoor.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-elec-yellow">Level-by-Level Sequence</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">1</div>
                    <div><strong>Add Next Frame Sections:</strong> From the current platform (or ground), add the frame sections for the next level. Lock all connections.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">2</div>
                    <div><strong>Add Braces:</strong> Fit horizontal and diagonal braces to the new frame sections. Follow the manufacturer's bracing pattern exactly.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">3</div>
                    <div><strong>Install Guardrails From Below:</strong> Standing on the current platform, reach UP through the trapdoor opening and install guardrails and intermediate rails on the new level.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">4</div>
                    <div><strong>Install Toeboards:</strong> Fit toeboards around the perimeter of the new level (may also be done from below or as part of the guardrail frame).</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">5</div>
                    <div><strong>Place Platform:</strong> Slide the trapdoor platform into position on the new level. Ensure it locks securely on all support points.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">6</div>
                    <div><strong>Climb Through The Trap:</strong> Open the trapdoor, climb through to the new guarded level. Close the trapdoor behind you.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">7</div>
                    <div><strong>Repeat:</strong> Continue adding levels following the same sequence until the planned working height is reached.</div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: 3T Diagram */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              3T Assembly — Visual Guide
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The diagram below shows the key moment in 3T assembly: the operative is standing on
                the lower platform (protected by existing guardrails) and reaching through the trapdoor
                to install guardrails on the level above.
              </p>

              {/* Inline SVG — 3T Method Diagram */}
              <svg className="w-full max-w-md mx-auto" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <rect width="400" height="500" fill="#1a1a1a" rx="12" />

                {/* Tower frame — left vertical */}
                <line x1="80" y1="50" x2="80" y2="450" stroke="#9ca3af" strokeWidth="4" />
                {/* Tower frame — right vertical */}
                <line x1="320" y1="50" x2="320" y2="450" stroke="#9ca3af" strokeWidth="4" />

                {/* Cross braces — lower section */}
                <line x1="80" y1="350" x2="320" y2="450" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8 4" />
                <line x1="320" y1="350" x2="80" y2="450" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8 4" />

                {/* Cross braces — upper section */}
                <line x1="80" y1="160" x2="320" y2="300" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8 4" />
                <line x1="320" y1="160" x2="80" y2="300" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8 4" />

                {/* Lower platform (where operative stands) */}
                <rect x="76" y="300" width="248" height="8" rx="2" fill="#4ade80" />
                {/* Trapdoor opening in lower platform */}
                <rect x="155" y="300" width="90" height="8" fill="#1a1a1a" stroke="#4ade80" strokeWidth="1" />

                {/* Upper platform (being installed) */}
                <rect x="76" y="155" width="248" height="8" rx="2" fill="#4ade80" opacity="0.4" />

                {/* Lower guardrails (existing — protecting the operative) */}
                <line x1="80" y1="230" x2="80" y2="300" stroke="#9ca3af" strokeWidth="3" />
                <line x1="320" y1="230" x2="320" y2="300" stroke="#9ca3af" strokeWidth="3" />
                {/* Lower guardrail — top rail left */}
                <line x1="76" y1="230" x2="84" y2="230" stroke="#9ca3af" strokeWidth="6" />
                {/* Lower guardrail — top rail right */}
                <line x1="316" y1="230" x2="324" y2="230" stroke="#9ca3af" strokeWidth="6" />
                {/* Lower guardrail — horizontal top */}
                <line x1="80" y1="230" x2="320" y2="230" stroke="#9ca3af" strokeWidth="3" />
                {/* Lower guardrail — intermediate rail */}
                <line x1="80" y1="265" x2="320" y2="265" stroke="#9ca3af" strokeWidth="2" />

                {/* Upper guardrails (being installed — highlighted) */}
                <line x1="80" y1="90" x2="320" y2="90" stroke="#facc15" strokeWidth="3" strokeDasharray="6 3" />
                <line x1="80" y1="122" x2="320" y2="122" stroke="#facc15" strokeWidth="2" strokeDasharray="6 3" />

                {/* Operative — body on lower platform */}
                {/* Legs (standing on lower platform) */}
                <line x1="185" y1="360" x2="185" y2="300" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                <line x1="215" y1="360" x2="215" y2="300" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                {/* Feet */}
                <line x1="175" y1="360" x2="190" y2="360" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                <line x1="210" y1="360" x2="225" y2="360" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                {/* Torso going up through trap */}
                <line x1="200" y1="300" x2="200" y2="200" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
                {/* Head (above lower platform, through trapdoor) */}
                <circle cx="200" cy="185" r="15" fill="#facc15" />
                {/* Hard hat brim */}
                <line x1="182" y1="175" x2="218" y2="175" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
                {/* Arms reaching out to install guardrails */}
                <line x1="200" y1="215" x2="140" y2="125" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                <line x1="200" y1="215" x2="260" y2="125" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                {/* Hands at guardrail position */}
                <circle cx="140" cy="122" r="6" fill="#facc15" />
                <circle cx="260" cy="122" r="6" fill="#facc15" />

                {/* Castors at base */}
                <circle cx="85" cy="455" r="10" stroke="#9ca3af" strokeWidth="2" fill="none" />
                <circle cx="315" cy="455" r="10" stroke="#9ca3af" strokeWidth="2" fill="none" />

                {/* Labels */}
                <text x="200" y="485" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">Castors locked</text>
                <text x="350" y="308" textAnchor="start" fill="#4ade80" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Lower platform</text>
                <text x="350" y="163" textAnchor="start" fill="#4ade80" fontSize="10" fontFamily="sans-serif" opacity="0.6">Upper platform</text>
                <text x="350" y="95" textAnchor="start" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Installing guardrails</text>
                <text x="200" y="395" textAnchor="middle" fill="#facc15" fontSize="10" fontFamily="sans-serif">Operative protected by</text>
                <text x="200" y="408" textAnchor="middle" fill="#facc15" fontSize="10" fontFamily="sans-serif">existing guardrails below</text>
              </svg>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-sm">
                <p className="text-white/80">
                  <strong className="text-elec-yellow">Key:</strong> The operative (yellow) stands on
                  the lower platform (green) protected by existing guardrails (grey). Their upper body
                  passes through the trapdoor opening, and their arms reach out to install the new
                  guardrails (yellow dashed) on the level above. The tower frame (grey) and diagonal
                  braces provide the structural support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Embed — PASMA 3T Demo */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              3T Assembly — Video Demonstration
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Watch this PASMA demonstration of the 3T method in action. Pay close attention to the
                sequence of operations and the position of the operative at each stage.
              </p>

              <div className="aspect-video rounded-lg overflow-hidden my-6">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/JE9wEkbFnGM"
                  title="PASMA 3T Assembly Method"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-sm">
                <p className="text-white/80">
                  <strong className="text-elec-yellow">Note:</strong> This video is provided for
                  educational reference. Always follow the specific instruction manual for your tower
                  system — there may be differences in component design and assembly sequence between
                  manufacturers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Height Stage Details */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">07</span>
              Height Stage Details
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Each height stage has specific requirements. The table below shows typical platform
                heights and what changes at each stage of the build.
              </p>

              <div className="overflow-hidden rounded-lg border border-white/10">
                <div className="grid grid-cols-3 gap-0 text-xs sm:text-sm">
                  <div className="bg-elec-yellow/20 p-3 font-semibold text-elec-yellow border-b border-white/10">Stage</div>
                  <div className="bg-elec-yellow/20 p-3 font-semibold text-elec-yellow border-b border-white/10">Platform Height</div>
                  <div className="bg-elec-yellow/20 p-3 font-semibold text-elec-yellow border-b border-white/10">Key Action</div>

                  <div className="bg-white/5 p-3 border-b border-white/5">Base</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Ground level</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Castors, legs, level, first frames and braces</div>

                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Level 1</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">~2m</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">First platform with guardrails — first climb through trap</div>

                  <div className="bg-white/5 p-3 border-b border-white/5">Level 2</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">~4m</div>
                  <div className="bg-white/5 p-3 border-b border-white/5">Check: may need stabilisers / outriggers from this height</div>

                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Level 3</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">~6m</div>
                  <div className="bg-white/[0.02] p-3 border-b border-white/5">Re-check plumb; wind exposure increases significantly</div>

                  <div className="bg-white/5 p-3">Level 4+</div>
                  <div className="bg-white/5 p-3">~8m+</div>
                  <div className="bg-white/5 p-3">Verify max height for base size; ballast or ties may be needed</div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Stability Check at Each Stage</h3>
                <div className="text-white text-sm space-y-1">
                  <p>At every new level, check:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>The tower is plumb (vertical) — use a plumb bob or spirit level on the vertical members</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>All connections are locked and secure</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Braces are fitted in the correct pattern</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>The tower does not feel unstable or excessively flexible</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Whether stabilisers or outriggers are now required for the new height</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: The Golden Rule */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">08</span>
              The Golden Rule & Common Errors
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-elec-yellow mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  NEVER Stand on an Unguarded Platform
                </h3>
                <p className="text-white text-sm mb-3">
                  This is the single most important rule in 3T assembly. If the guardrails have not
                  been installed on a platform, nobody may step onto it. Falls from unguarded platforms
                  are the leading cause of serious injury and death from mobile tower scaffolds.
                </p>
                <p className="text-white text-sm">
                  The 3T method exists specifically to eliminate this risk. By installing guardrails
                  from the level below (through the trapdoor), the operative is always protected.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Common 3T Errors</h3>
                  <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Skipping guardrails:</strong> "Just quickly stepping onto the platform" without rails</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Not closing the trapdoor:</strong> Creating a trip hazard and fall risk</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Unlocked castors:</strong> Tower moves during assembly</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Wrong brace pattern:</strong> Omitting diagonals reduces stability</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Over-reaching:</strong> Leaning too far through the trapdoor</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Best Practice</h3>
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Follow the instruction manual step by step</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Work methodically — never rush</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Check every connection before moving up</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Close the trapdoor immediately after climbing through</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Communicate clearly between team members</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 09: Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            3T Method Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">3T Assembly Sequence</h3>
                <ol className="space-y-1 text-white/80 list-decimal ml-4">
                  <li>Lock castors and level base</li>
                  <li>Fit first frames and braces</li>
                  <li>Add guardrails (from below via trap)</li>
                  <li>Place platform and lock</li>
                  <li>Climb through trapdoor</li>
                  <li>Close trapdoor</li>
                  <li>Repeat for each level</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Golden Rules</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">NEVER</strong> stand on unguarded platform</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">ALWAYS</strong> lock castors first</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">ALWAYS</strong> close the trapdoor</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">ALWAYS</strong> follow the manual</span></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Base Assembly Checklist</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Castors positioned and locked</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Adjustable legs fitted</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Base levelled (spirit level)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>First frames connected</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Horizontal braces fitted</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Diagonal braces fitted</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Check at Every Level</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Tower is plumb (vertical)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>All connections locked</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Braces in correct pattern</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Guardrails secure</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Platform locked in place</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Stabilisers needed?</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
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
            title="3T Method (Through The Trap) Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Planning & Preparation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3-section-3">
              Next: AGR Method
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule3Section2;
