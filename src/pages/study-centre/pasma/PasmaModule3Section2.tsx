import { ArrowLeft, Wrench, CheckCircle, AlertTriangle, Lock, Eye, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "3t-base-assembly",
    question: "When setting up the base of a tower using the 3T method, what must be done BEFORE fitting the first pair of end frames?",
    options: [
      "Install the guardrails at the top",
      "Position castors or base plates, ensuring they are on firm, level ground",
      "Climb to the first platform level",
      "Fit diagonal braces to the wall"
    ],
    correctIndex: 1,
    explanation: "The base must be established first: position castors or base plates on firm, level ground, then fit the first pair of end frames into them. The base provides the foundation for everything above, so it must be correctly positioned and levelled before any further assembly."
  },
  {
    id: "3t-guardrail-sequence",
    question: "In the 3T method, from what position should guardrails be installed at each new level?",
    options: [
      "From outside the tower using a ladder",
      "From the ground using an extendable pole",
      "From inside the tower through the trapdoor, with the operative protected to waist height",
      "From the completed platform after climbing fully onto it"
    ],
    correctIndex: 2,
    explanation: "The 3T method requires the operative to pass through the trapdoor to waist height, giving them the protection of the platform edge while they install guardrails on all sides. Only after guardrails are fitted does the operative step fully onto the platform."
  },
  {
    id: "3t-completion-checks",
    question: "Which of the following is NOT part of the completion checks after tower assembly?",
    options: [
      "All braces fitted and locks engaged",
      "Guardrails on all sides at correct heights",
      "Painting the tower in high-visibility colours",
      "Castors locked and stabilisers fitted if required"
    ],
    correctIndex: 2,
    explanation: "Completion checks include verifying all braces are fitted with locks engaged, guardrails on all sides at correct heights, the platform is level, castors are locked, and stabilisers are fitted if required. Painting the tower is not part of the standard assembly or inspection process."
  }
];

const faqs = [
  {
    question: "What does '3T' stand for in the 3T assembly method?",
    answer: "3T stands for 'Through The Trap'. It refers to the method of building a mobile tower from the inside, where the operative climbs through the trapdoor in each platform to access the next level. This keeps the operative inside the tower's protective structure throughout the assembly process."
  },
  {
    question: "Can I use the 3T method for any mobile scaffold tower?",
    answer: "Yes. The 3T method is compatible with all standard mobile scaffold towers that have trapdoor platforms. It is the traditional PASMA assembly method and works with towers from any manufacturer. Unlike the AGR method, which requires specific AGR-compatible frames, the 3T method uses standard end frames and platforms."
  },
  {
    question: "Why must the trapdoor be closed after passing through it?",
    answer: "The trapdoor must be closed for two critical reasons. First, an open trapdoor creates a fall hazard — anyone on the platform could step into the opening and fall to the level below. Second, the platform is a structural element of the tower, and the trapdoor must be closed and locked to provide its full load-bearing capacity and to maintain the working platform area."
  },
  {
    question: "What is the most common error during 3T assembly?",
    answer: "The most common error is failing to install guardrails before stepping fully onto a platform. The correct sequence requires the operative to pass through the trapdoor to waist height only, install all guardrails from that protected position, and only then step fully onto the platform. Stepping onto an unguarded platform, even briefly, creates an immediate fall hazard."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the '3T' in the 3T assembly method stand for?",
    options: [
      "Three-Tier Tower",
      "Through The Trap",
      "Triple-Tested Tower",
      "Three-Turn Technique"
    ],
    correctAnswer: 1,
    explanation: "3T stands for 'Through The Trap', referring to the operative climbing through the trapdoor platform to access each new level during assembly."
  },
  {
    id: 2,
    question: "In what order should the base of a tower be assembled?",
    options: [
      "End frames, castors, braces, level",
      "Castors/base plates, end frames, plan braces, horizontal braces, level, lock castors",
      "Level the ground, install guardrails, add castors",
      "Install platform first, then add base below"
    ],
    correctAnswer: 1,
    explanation: "The correct base assembly sequence is: position castors or base plates, fit the first pair of end frames, install plan braces and horizontal braces, level using adjustable legs, then lock all castors."
  },
  {
    id: 3,
    question: "When building up using the 3T method, what is fitted BEFORE the operative climbs through the trapdoor?",
    options: [
      "Guardrails at the next level",
      "The platform with trapdoor at the next level",
      "Stabilisers at ground level",
      "A safety harness to the tower"
    ],
    correctAnswer: 1,
    explanation: "The platform with its trapdoor must be installed at the next level before the operative climbs through. This gives the operative a surface to pass through and provides edge protection to waist height while guardrails are being fitted."
  },
  {
    id: 4,
    question: "From what position should guardrails be installed during 3T assembly?",
    options: [
      "Standing fully on the new platform",
      "From outside the tower using a separate ladder",
      "Through the trapdoor with the operative protected to waist height by the platform",
      "From the ground by reaching upward"
    ],
    correctAnswer: 2,
    explanation: "The operative opens the trapdoor and passes through to waist height. At this point, the platform provides protection and the operative can safely fit guardrails on all sides before stepping fully onto the platform."
  },
  {
    id: 5,
    question: "What must happen to the trapdoor after the operative has passed through it?",
    options: [
      "It should be left open for quick escape",
      "It should be removed and stored at ground level",
      "It must be closed and locked",
      "It only needs closing if other people are on the platform"
    ],
    correctAnswer: 2,
    explanation: "The trapdoor must always be closed and locked after passing through it. An open trapdoor is a fall hazard, and the platform needs to be fully closed to provide its designed load-bearing capacity."
  },
  {
    id: 6,
    question: "After completing the full tower assembly, which check is NOT required?",
    options: [
      "All braces fitted and locks engaged",
      "Guardrails on all sides at correct heights",
      "The tower has been painted with identification markings",
      "Castors locked and stabilisers fitted if required"
    ],
    correctAnswer: 2,
    explanation: "Completion checks include verifying all braces, locks, guardrails, platform level, castor locks, and stabilisers. Painting or marking the tower with identification is not a standard assembly completion requirement."
  },
  {
    id: 7,
    question: "Which of the following is a common 3T assembly error?",
    options: [
      "Using the adjustable legs to level the tower",
      "Installing plan braces at the base level",
      "Working from outside the tower to fit components at height",
      "Locking the castors before levelling"
    ],
    correctAnswer: 2,
    explanation: "Working from outside the tower — such as standing on a separate ladder to fit components — is a dangerous error. The 3T method requires all work at height to be done from inside the tower, passing through the trapdoor."
  },
  {
    id: 8,
    question: "What should you do if you discover a missing diagonal brace during the completion check?",
    options: [
      "Use the tower anyway if it feels stable",
      "Tie a rope across the gap instead",
      "Do not use the tower until the correct brace has been fitted",
      "Reduce the maximum platform load to compensate"
    ],
    correctAnswer: 2,
    explanation: "Every brace specified by the manufacturer is a structural element. A missing brace compromises the tower's rigidity and stability. The tower must not be used until the correct replacement brace has been obtained and fitted."
  }
];

export default function PasmaModule3Section2() {
  useSEO({
    title: "3T Method — Through The Trap | PASMA Module 3.2",
    description: "Step-by-step 3T tower assembly method — base setup, building up through trapdoor platforms, guardrail installation, completion checks, and common errors to avoid.",
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
            <Wrench className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            3T Method &mdash; Through The Trap
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The traditional PASMA assembly method where the operative works from inside the tower, climbing through trapdoor platforms to build each level safely
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Method:</strong> Build from inside, climb through trapdoors</li>
              <li><strong>Guardrails:</strong> Fitted from waist-height through the trap</li>
              <li><strong>Works with:</strong> All standard towers with trapdoor platforms</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Base first:</strong> Castors, frames, braces, level, lock</li>
              <li><strong>Build up:</strong> Frames &rarr; braces &rarr; platform &rarr; through trap &rarr; guardrails</li>
              <li><strong>Finish:</strong> Check all braces, locks, guardrails, castors</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what the 3T method is and when it is used",
              "Describe the correct base assembly sequence step by step",
              "Demonstrate the build-up procedure for each additional lift",
              "Install guardrails safely from inside the tower via the trapdoor",
              "Carry out completion checks after full tower assembly",
              "Identify and avoid common 3T assembly errors"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is the 3T Method? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is the 3T Method?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 3T method &mdash; <strong>Through The Trap</strong> &mdash; is the traditional PASMA assembly method for mobile scaffold towers. The operative works from inside the tower at all times, climbing through trapdoor openings in each platform to access the next level and install guardrails before stepping fully onto any unguarded surface.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Principle:</strong> At no point during 3T assembly should an operative be standing on an unguarded platform. The trapdoor provides protection to waist height while guardrails are being fitted. This is the safest method when Advance Guard Rail (AGR) frames are not available.
                </p>
              </div>

              <p>
                The 3T method is compatible with all standard mobile scaffold towers from any manufacturer, provided the platforms include trapdoor openings. It is the method taught on every PASMA Towers for Users course and is the most widely used assembly technique in the industry.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">When to Use the 3T Method</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Standard tower assembly where AGR frames are not available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Towers using components from different hire periods or depots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Older tower systems that predate AGR technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Any situation where a competent person determines 3T is appropriate</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Minimum Team Size</p>
                <p className="text-sm text-white/80">
                  While regulations do not specify an exact minimum team size, PASMA guidance recommends a minimum of two people for tower assembly using the 3T method. One person assembles from inside the tower while the other passes components from ground level and maintains the exclusion zone. For taller towers or heavier components, additional team members may be needed for safe manual handling.
                </p>
              </div>

              <p>
                The 3T method has been used safely for decades and remains the most widely practised assembly technique across the UK. Its effectiveness depends entirely on the competence of the operatives and strict adherence to the correct sequence. Shortcuts are where accidents happen.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Base Assembly */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Base Assembly
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The base is the foundation of the entire tower. Every measurement, every level check, and every lock at this stage affects the safety of the tower at its full height. Take your time here &mdash; correcting a base error after multiple lifts have been built is extremely difficult.
              </p>

              <p>
                Before starting the base assembly, lay out all base components in the order they will be used: castors or base plates first, then end frames, then braces. Having everything to hand prevents delays and reduces the risk of assembling components in the wrong order. The ground operative should prepare components while the assembly lead positions the castors.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Base Assembly Sequence</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Position castors or base plates</p>
                      <p className="text-sm text-white/80">Place on firm, level ground (or sole boards). Castors should be in the locked position. Use base plates for fixed towers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Fit the first pair of end frames</p>
                      <p className="text-sm text-white/80">Insert the end frames into the castors or base plates. Ensure spigots are fully engaged and locking clips are secured.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Install plan braces and horizontal braces</p>
                      <p className="text-sm text-white/80">Fit plan braces diagonally across the base to prevent racking. Add horizontal braces to complete the base frame structure.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">Level using adjustable legs</p>
                      <p className="text-sm text-white/80">Use a spirit level on the horizontal braces. Adjust castor stems or base plate legs until the base is perfectly level in both directions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-white">Lock all castors</p>
                      <p className="text-sm text-white/80">Engage both the wheel brake and the swivel lock on every castor. The tower must not move during assembly. Check all four castors are fully locked.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Critical Base Checks</p>
                </div>
                <p className="text-sm text-white/80">
                  Never proceed beyond the base until: the base is level in both directions, all castors are fully locked (wheel and swivel), all braces are fitted with locks engaged, and the frame is square and plumb. A base error of even a few millimetres is magnified at height.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Building Up — Step by Step */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building Up &mdash; Step by Step
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once the base is complete and checked, the tower is built upward one lift at a time. Each lift follows the same sequence: fit the next end frames, add braces, install the platform, climb through the trapdoor, and fit guardrails. This repeating cycle continues until the tower reaches the required height.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Build-Up Sequence for Each Lift</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Fit next end frames:</strong> Slide the next pair of end frames onto the spigots of the frames below. Ensure they drop fully home and locking clips engage.</p>
                  <p><strong className="text-white">2. Add horizontal and diagonal braces:</strong> Fit horizontal braces between the new end frames, then install diagonal braces. All brace hooks and locks must be fully engaged.</p>
                  <p><strong className="text-white">3. Install platform with trapdoor:</strong> Slide the platform into position at the new level. Ensure it sits correctly on the frame ledgers and the platform locks engage. The trapdoor should be in the closed position.</p>
                  <p><strong className="text-white">4. Climb through the trapdoor:</strong> Open the trapdoor from below, climb through until your waist is at platform level. At this point, the platform provides protection on all sides to waist height.</p>
                  <p><strong className="text-white">5. Install guardrails:</strong> From the waist-height position inside the trapdoor, fit guardrails on all open sides. Do not step fully onto the platform until all guardrails are in place.</p>
                  <p><strong className="text-white">6. Step onto platform:</strong> Once all guardrails are secure, step fully onto the platform. Close and lock the trapdoor behind you.</p>
                </div>
              </div>

              {/* SVG Diagram: 3T Assembly */}
              <div className="my-8 flex justify-center">
                <svg viewBox="0 0 400 500" className="w-full max-w-sm text-white/70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Tower Frame - Left Side */}
                  <line x1="80" y1="480" x2="80" y2="60" stroke="currentColor" strokeWidth="2.5" />
                  {/* Tower Frame - Right Side */}
                  <line x1="320" y1="480" x2="320" y2="60" stroke="currentColor" strokeWidth="2.5" />

                  {/* Ground Line */}
                  <line x1="40" y1="480" x2="360" y2="480" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 3" />

                  {/* Base horizontal brace */}
                  <line x1="80" y1="460" x2="320" y2="460" stroke="currentColor" strokeWidth="2" />

                  {/* Level 1 Platform (solid) */}
                  <rect x="80" y="360" width="240" height="6" fill="currentColor" opacity="0.4" rx="1" />

                  {/* Level 2 Platform with Trapdoor Opening */}
                  <rect x="80" y="240" width="100" height="6" fill="currentColor" opacity="0.4" rx="1" />
                  <rect x="220" y="240" width="100" height="6" fill="currentColor" opacity="0.4" rx="1" />
                  {/* Trapdoor (open, angled up) */}
                  <line x1="180" y1="240" x2="200" y2="200" stroke="currentColor" strokeWidth="2" />
                  <line x1="220" y1="240" x2="200" y2="200" stroke="currentColor" strokeWidth="2" />
                  <text x="205" y="195" fill="currentColor" fontSize="10" opacity="0.5">trap open</text>

                  {/* Horizontal braces */}
                  <line x1="80" y1="360" x2="320" y2="360" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="80" y1="240" x2="320" y2="240" stroke="currentColor" strokeWidth="1.5" />

                  {/* Diagonal braces */}
                  <line x1="80" y1="460" x2="320" y2="360" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
                  <line x1="80" y1="360" x2="320" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />

                  {/* Guardrail being fitted (at Level 3) */}
                  <line x1="80" y1="120" x2="320" y2="120" stroke="#EAB308" strokeWidth="2.5" strokeDasharray="8 4" />
                  <text x="330" y="124" fill="#EAB308" fontSize="10" fontWeight="600">guardrail</text>

                  {/* Top horizontal */}
                  <line x1="80" y1="60" x2="320" y2="60" stroke="currentColor" strokeWidth="1.5" />

                  {/* Operative — upper body through trapdoor at Level 3 (y=120) */}
                  {/* Head */}
                  <circle cx="200" cy="135" r="14" stroke="#EAB308" strokeWidth="2" fill="none" />
                  {/* Helmet brim */}
                  <path d="M186 130 Q200 120 214 130" stroke="#EAB308" strokeWidth="2" fill="none" />
                  {/* Body */}
                  <line x1="200" y1="149" x2="200" y2="210" stroke="#EAB308" strokeWidth="2.5" />
                  {/* Arms reaching to guardrail */}
                  <line x1="200" y1="165" x2="155" y2="125" stroke="#EAB308" strokeWidth="2" />
                  <line x1="200" y1="165" x2="245" y2="125" stroke="#EAB308" strokeWidth="2" />
                  {/* Waist at platform level indicator */}
                  <line x1="165" y1="190" x2="235" y2="190" stroke="#EAB308" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

                  {/* Level 3 Platform with trap opening */}
                  <rect x="80" y="187" width="100" height="6" fill="currentColor" opacity="0.4" rx="1" />
                  <rect x="220" y="187" width="100" height="6" fill="currentColor" opacity="0.4" rx="1" />

                  {/* Castors at base */}
                  <circle cx="90" cy="486" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="310" cy="486" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />

                  {/* Labels */}
                  <text x="15" y="365" fill="currentColor" fontSize="10" opacity="0.6">Level 1</text>
                  <text x="15" y="245" fill="currentColor" fontSize="10" opacity="0.6">Level 2</text>
                  <text x="15" y="192" fill="currentColor" fontSize="10" opacity="0.6">Level 3</text>
                  <text x="160" y="498" fill="currentColor" fontSize="10" opacity="0.5">firm, level ground</text>
                </svg>
              </div>

              <p>
                This sequence repeats for every lift. The critical safety principle is that the operative is always protected: either by the platform edge (when passing through the trapdoor to waist height) or by the guardrails (once fitted). At no point should an operative stand on an unguarded platform.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Passing Components Up</p>
                <p className="text-sm text-white/80">
                  As the tower grows taller, components must be passed up from ground level. The ground operative lifts components to the person on the tower, who receives them from a safe position inside the structure. Never throw components upward. For heavier items, use a gin wheel or material hoist attached to the tower frame. Carry nothing in your hands while climbing &mdash; use a tool belt or material line.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Three Points of Contact:</strong> While climbing inside the tower between levels, always maintain three points of contact with the structure &mdash; two hands and one foot, or two feet and one hand. This means both hands must be free during climbing. Tools, components, and materials should be raised separately after the operative has reached the next level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Guardrail Installation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Guardrail Installation
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              {/* YouTube Embed */}
              <div className="my-8">
                <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.youtube.com/embed/ByZzHdt9PtE"
                    title="Setting up a BoSS Ladderspan 3T Mobile Access Tower"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-xs text-white/40 mt-2 text-center">Setting up a BoSS Ladderspan 3T mobile access tower</p>
              </div>

              <p>
                Guardrail installation is the most safety-critical part of each lift cycle. The sequence must be followed precisely to ensure the operative is never exposed to an unguarded edge.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Guardrail Installation Sequence</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm text-white/80"><strong className="text-white">Open the trapdoor</strong> from below. Ensure it opens fully and rests securely in the open position.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm text-white/80"><strong className="text-white">Pass through to waist height.</strong> Climb until your waist is level with the platform. The platform edges now protect you on all sides like a guardrail.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm text-white/80"><strong className="text-white">Fit guardrails on all open sides.</strong> Working from the protected waist-height position, install guardrails on all sides of the platform that are not protected by end frames. Ensure all hooks and locks engage fully.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm text-white/80"><strong className="text-white">Step fully onto the platform.</strong> Only once all guardrails are in place, step fully through the trapdoor onto the platform. Close and lock the trapdoor behind you.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Guardrail Heights</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Main guardrail:</strong> Must be between 950mm and 1000mm above the platform surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Intermediate guardrail:</strong> Fitted midway between the main guardrail and the toe board to prevent falls between the rails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Toe board:</strong> At platform level, minimum 150mm high, to prevent tools and materials falling from the platform edge</span>
                  </li>
                </ul>
              </div>

              <p>
                Some tower systems use end frames that incorporate guardrail protection on the narrow ends of the tower. In this case, separate guardrails only need to be installed on the long sides (the open sides not protected by end frames). However, you must verify this for your specific tower system &mdash; not all end frames provide adequate edge protection at the correct height.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Guardrail Integrity:</strong> Guardrails are structural safety elements, not handholds. They must be capable of withstanding a person falling against them. Check that each guardrail hook or clip is fully engaged and that the rail sits securely without wobbling. A guardrail that detaches under load defeats its entire purpose.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Guardrails During Dismantling</p>
                <p className="text-sm text-white/80">
                  During dismantling (which is the reverse of assembly), guardrails are removed last at each level. The operative descends through the trapdoor to the level below before the guardrails on the level above are removed. This ensures continuous edge protection throughout the dismantling process, just as during assembly.
                </p>
              </div>

              <p>
                Never remove a guardrail to create more working space on the platform. If the platform feels too small for the task, the tower configuration is wrong for the job. Use a wider platform or reposition the tower rather than compromising the edge protection that prevents falls.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Trapdoor Operation & Safety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Trapdoor Operation &amp; Safety
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The trapdoor is a critical safety feature of the 3T method. It provides the access route between levels while also forming part of the working platform when closed. Correct operation of the trapdoor is essential for both the safety of the person climbing and the structural integrity of the platform.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Trapdoor Operating Principles</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Opening:</strong> Open the trapdoor from below, pushing it upward. It should rest securely in the open position without risk of falling closed on the person below.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Climbing through:</strong> Use the internal ladder or climbing rungs. Maintain three points of contact. Do not carry tools or materials while climbing &mdash; use a tool belt or haul line.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Closing:</strong> After stepping onto the platform and fitting guardrails, close the trapdoor. It must lock into the closed position to form a continuous platform surface.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Locking:</strong> Engage the trapdoor locking mechanism. A closed but unlocked trapdoor could open unexpectedly if someone steps on it.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Trapdoor Safety Rules</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Never</strong> leave a trapdoor open unattended &mdash; it is a fall hazard for anyone on the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Never</strong> step on a trapdoor without confirming it is closed and locked</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Never</strong> exceed the platform's load capacity &mdash; the trapdoor section may have a lower capacity than the main platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Always</strong> check the trapdoor mechanism during pre-assembly inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Always</strong> report any trapdoor that does not open, close, or lock correctly</span>
                  </li>
                </ul>
              </div>

              <p>
                When stepping on a closed trapdoor, distribute your weight across the full surface. Do not stand on the edge of the trapdoor or the hinge line. Place materials and tools away from the trapdoor area to keep it clear for access and egress.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Emergency Egress</p>
                <p className="text-sm text-white/80">
                  The trapdoor is also the primary means of emergency egress from the platform. If an operative is injured or conditions change suddenly (severe weather, fire), they must be able to descend through the trapdoor quickly. This is another reason to keep the trapdoor area clear of obstructions. Ensure every team member knows the emergency descent procedure before work begins.
                </p>
              </div>

              <p>
                On multi-platform towers with intermediate levels, ensure each trapdoor at every level is closed and locked when not in use. A person descending in an emergency should not encounter an unexpected open trapdoor on any level. During regular work, only one trapdoor should be open at a time &mdash; the one being used for access.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Completion Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Completion Checks
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After the tower has been fully assembled, a comprehensive completion inspection must be carried out before anyone uses the tower for work. This inspection should be documented as required by Schedule 5 of the Work at Height Regulations.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Completion Inspection Checklist</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">All braces fitted:</strong> Horizontal, diagonal, and plan braces at every level as specified by the manufacturer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">All locks engaged:</strong> Every brace hook, frame lock, and spigot clip must be fully engaged &mdash; check each one individually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Guardrails on all sides:</strong> Main guardrail, intermediate guardrail, and toe boards on every open side at the working platform level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Correct guardrail heights:</strong> Main guardrail between 950mm and 1000mm above platform surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Platform level:</strong> Check with a spirit level &mdash; the platform should be level in both directions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Castors locked:</strong> All four castors must have both wheel brakes and swivel locks fully engaged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Stabilisers fitted:</strong> If the tower height requires stabilisers or outriggers, confirm they are correctly positioned and secured</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Trapdoors closed and locked:</strong> All trapdoors at every level must be closed and locked</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Visual Check from Ground Level</p>
                </div>
                <p className="text-sm text-white/80">
                  After the detailed component check, step back and view the tower from each side at ground level. The tower should appear vertical and true. Any visible lean, twist, or misalignment indicates a problem that must be investigated and corrected before use. Check that the tower is plumb using a plumb line or long spirit level against the vertical frame members.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Common 3T Assembly Errors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Common 3T Assembly Errors
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding common errors is just as important as knowing the correct procedure. These errors are seen regularly on sites and each one creates a serious risk of tower failure or a fall from height.
              </p>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Missing Braces</p>
                  <p className="text-sm text-white/80">
                    Leaving out horizontal or diagonal braces to "save time" or because a brace appears to be missing from the component set. Every brace specified by the manufacturer is structurally necessary. A tower missing a single diagonal brace can lose over 50% of its lateral rigidity.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Unlocked Components</p>
                  <p className="text-sm text-white/80">
                    Fitting components but failing to engage the locking mechanisms. Brace hooks that are resting on the rung but not clipped, spigot connections without locking pins, and platform boards not clicked into place. If it is not locked, it is not fitted.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Guardrails Not Fitted Before Use</p>
                  <p className="text-sm text-white/80">
                    Stepping fully onto a platform before all guardrails are in place. This is the most dangerous error &mdash; even a momentary lapse creates a fall hazard. The guardrails must be fitted from the waist-height position through the trapdoor, every time.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Trapdoor Left Open</p>
                  <p className="text-sm text-white/80">
                    Leaving the trapdoor open after climbing through. An open trapdoor is a fall hazard for anyone on the platform and reduces the usable platform area. Close and lock it as soon as you have stepped through.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Working from Outside the Tower</p>
                  <p className="text-sm text-white/80">
                    Using a separate ladder or standing on another structure to fit components to the tower from the outside. The 3T method requires all assembly work at height to be done from inside the tower. External assembly removes the protection provided by the tower structure itself.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Exceeding Freestanding Height Without Stabilisers</p>
                  <p className="text-sm text-white/80">
                    Building the tower beyond its maximum freestanding height without fitting stabilisers or outriggers. The height-to-base ratio must be maintained within safe limits: 3.5:1 indoors and 3:1 outdoors. Exceeding these ratios without stabilisers creates an overturning hazard.
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">How to Avoid These Errors:</strong> Follow the manufacturer's instruction manual exactly. Use the assembly sequence chart provided. Check each component is locked before moving to the next. Have a second person carry out an independent check of each completed lift. If anything does not feel right or look right, stop and investigate before proceeding.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../pasma-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pre-Assembly
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3-section-3">
              Next: AGR Method
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}