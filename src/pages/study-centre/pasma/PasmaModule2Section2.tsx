import { ArrowLeft, Wrench, CheckCircle, AlertTriangle, Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "horizontal-vs-diagonal-brace",
    question: "What is the primary purpose of diagonal braces on a mobile access tower?",
    options: [
      "To provide a climbing surface for the operative",
      "To add rigidity and prevent racking (parallelogram distortion)",
      "To support the weight of the platform",
      "To connect the castors to the end frames"
    ],
    correctIndex: 1,
    explanation: "Diagonal braces (cross-braces) prevent the tower from racking — a parallelogram distortion where the tower leans to one side. They are fitted in opposing pairs to triangulate the structure, which is the most effective way to resist lateral forces."
  },
  {
    id: "platform-trapdoor-purpose",
    question: "Why must working platforms on a mobile access tower have a trapdoor?",
    options: [
      "To allow ventilation through the tower structure",
      "To provide access from below without removing guardrails",
      "To reduce the weight of the platform",
      "To allow rain to drain through the platform"
    ],
    correctIndex: 1,
    explanation: "Trapdoor platforms allow the operative to climb up through the platform from below without having to remove guardrails. The trapdoor is closed once the operative is on the platform, maintaining edge protection at all times. This is a critical safety feature."
  },
  {
    id: "worn-spigot-action",
    question: "During a pre-use inspection you notice a spigot has a cracked spring-loaded gravity lock. What should you do?",
    options: [
      "Continue using it — the spigot still fits into the socket",
      "Tape the lock closed and carry on with the build",
      "Remove the component from service, tag it as defective, and quarantine it",
      "Report it at the end of the shift and keep building"
    ],
    correctIndex: 2,
    explanation: "A defective gravity lock means the spigot connection is not secure. The component must be immediately removed from service, clearly tagged as defective, and quarantined to prevent accidental reuse. Never attempt field repairs on structural tower components."
  }
];

const faqs = [
  {
    question: "How do I know if a platform is safe to use?",
    answer: "Check four things before stepping onto any platform: (1) the platform hooks are fully engaged and locked into the frame, (2) the trapdoor is closed, (3) there are no visible cracks, splits, or deformation in the platform deck, and (4) the platform is clean and free from grease or debris that could cause slipping. If any of these checks fail, do not use the platform."
  },
  {
    question: "What is the difference between a spigot and a brace connector?",
    answer: "A spigot is a male connector that joins frame sections vertically — it slides into the top of one frame and the bottom of the next frame sits over it, creating a vertical joint. A brace connector (or brace claw/hook) is the fitting at each end of a horizontal or diagonal brace that clips onto the frame tubes to connect frames laterally. Both use gravity locks or spring clips to secure the connection."
  },
  {
    question: "Can I replace a damaged castor on site?",
    answer: "Only if you have the correct replacement castor from the same manufacturer and tower system. The replacement must be identical in size, load rating, and fitting type. Never substitute a castor from a different manufacturer or system. If the correct replacement is not available, the tower must not be used until it is repaired with the correct component."
  },
  {
    question: "How often should tower components be inspected?",
    answer: "Components should be inspected at three points: (1) before every use (pre-use check), (2) at regular intervals during prolonged use — at least every 7 days as required by the Work at Height Regulations 2005, and (3) after any event that could affect structural integrity (impact, high winds, unauthorised modification). All inspections should be recorded."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the vertical ladder frames of a mobile access tower called?",
    options: [
      "Diagonal braces",
      "End frames (standards and transoms)",
      "Plan braces",
      "Outriggers"
    ],
    correctAnswer: 1,
    explanation: "The vertical ladder frames are called end frames. They consist of two vertical tubes (standards) connected by horizontal rungs (transoms). End frames form the skeleton of the tower and provide the climbing surface."
  },
  {
    id: 2,
    question: "Horizontal braces connect end frames at right angles. What is their primary function?",
    options: [
      "To provide a surface for standing on",
      "To support the weight of the platform",
      "To provide lateral stability and maintain the correct spacing between frames",
      "To allow the tower to be folded for transport"
    ],
    correctAnswer: 2,
    explanation: "Horizontal braces connect opposing end frames at right angles, maintaining the correct spacing and providing lateral stability. Without them, the end frames could spread apart or move closer together, compromising the tower's structural integrity."
  },
  {
    id: 3,
    question: "Diagonal braces are fitted in pairs on opposing faces of the tower. This pattern is called:",
    options: [
      "Parallel bracing",
      "Cross-bracing",
      "Plan bracing",
      "Cantilever bracing"
    ],
    correctAnswer: 1,
    explanation: "Fitting diagonal braces in opposing pairs creates cross-bracing (X-pattern). This triangulates the structure, providing rigidity and preventing racking — the parallelogram distortion that would cause the tower to lean and potentially collapse."
  },
  {
    id: 4,
    question: "What must be done with castors when operatives are working on the tower platform?",
    options: [
      "They should be removed and replaced with base plates",
      "They must be locked (brakes applied) at all times",
      "They should be left unlocked for easy repositioning",
      "Two diagonal castors should be locked, two unlocked"
    ],
    correctAnswer: 1,
    explanation: "All castors must be locked (brakes applied) whenever anyone is on the tower. Unlocked castors allow the tower to roll, which could cause it to move away from the work area or collide with obstructions, potentially causing a fall."
  },
  {
    id: 5,
    question: "What is the purpose of a spigot in tower construction?",
    options: [
      "To connect horizontal braces to the frame",
      "To join frame sections vertically, allowing the tower to be built higher",
      "To lock the castors in position",
      "To secure the guardrails to the platform"
    ],
    correctAnswer: 1,
    explanation: "Spigots are male connectors that join frame sections vertically. They slide into the top of one frame section, and the next frame section sits over the protruding spigot, creating a secure vertical joint. Spring-loaded gravity locks hold the joint in place."
  },
  {
    id: 6,
    question: "What is the maximum extension limit of adjustable legs typically determined by?",
    options: [
      "The operative's preference",
      "The site supervisor's judgement",
      "The manufacturer's instruction manual for the specific tower system",
      "There is no maximum — extend as far as needed"
    ],
    correctAnswer: 2,
    explanation: "The maximum extension of adjustable legs is specified in the manufacturer's instruction manual. Exceeding this limit reduces the structural stability of the tower and creates a risk of collapse. Always check the manual for the specific tower system you are using."
  },
  {
    id: 7,
    question: "During inspection, you find a bent tube on an end frame. What is the correct action?",
    options: [
      "Straighten the tube and continue using the frame",
      "Use the frame only for lower lifts where loads are lighter",
      "Remove the frame from service, tag it as defective, and quarantine it",
      "Report it to the manufacturer but continue using it"
    ],
    correctAnswer: 2,
    explanation: "A bent tube indicates the frame has been overloaded or impacted. Its structural integrity is compromised and it must be immediately removed from service. Tag the component as defective and quarantine it to prevent accidental reuse. Never attempt to straighten or repair structural components on site."
  },
  {
    id: 8,
    question: "What do platform locking hooks do?",
    options: [
      "They lock the trapdoor in the open position",
      "They secure the platform to the frame, preventing it from being dislodged",
      "They connect adjacent platforms together",
      "They attach the toeboards to the platform edge"
    ],
    correctAnswer: 1,
    explanation: "Platform locking hooks engage with the frame tubes to secure the platform in position. They prevent the platform from being lifted by wind or dislodged by movement on the tower. Always check that all locking hooks are fully engaged before stepping onto a platform."
  }
];

const PasmaModule2Section2 = () => {
  useSEO({
    title: "Structural Components | PASMA Module 2.2",
    description: "Learn about mobile access tower structural components including end frames, braces, platforms, castors, spigots, and adjustable legs. Includes labelled tower diagram.",
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
            <Wrench className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-block bg-elec-yellow/10 border border-elec-yellow/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-elec-yellow">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Structural Components
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding the key components that make up a mobile access tower — from end frames and braces to platforms, castors, and spigots
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">End frames:</strong> vertical ladder frames forming the tower skeleton</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Braces:</strong> horizontal (lateral stability) and diagonal (rigidity)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Platforms:</strong> working decks with trapdoor access and locking hooks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Base:</strong> castors (mobile), base plates (fixed), adjustable legs</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Inspect:</strong> every component before use — reject if damaged</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Check:</strong> all locks engaged, platforms hooked, castors braked</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Verify:</strong> all components from same manufacturer and system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Record:</strong> any defects and quarantine damaged components</span>
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
              "Identify and name the principal structural components of a mobile access tower",
              "Explain the function of end frames, horizontal braces, and diagonal braces",
              "Describe platform types including trapdoor access and locking mechanisms",
              "State the purpose and correct use of castors, base plates, and adjustable legs",
              "Explain how spigots and gravity locks create secure vertical connections",
              "Identify common component defects and describe the correct rejection procedure"
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: End Frames */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              End Frames (Standards & Transoms)
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                End frames are the vertical ladder frames that form the skeleton of the tower. Each end frame consists
                of two vertical tubes — called <strong className="text-white">standards</strong> — connected by horizontal
                rungs called <strong className="text-white">transoms</strong>. The result is an H-shaped frame with
                built-in ladder rungs for climbing access.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition: End Frame</h3>
                <p className="text-white/80 text-sm">
                  An <strong className="text-white">end frame</strong> (also called a ladder frame or H-frame) is a
                  prefabricated vertical component consisting of two parallel standards (vertical tubes) connected
                  by transoms (horizontal rungs) at regular intervals. End frames are manufactured in sizes that
                  match the tower width — 0.74m frames for single-width towers and 1.35m frames for double-width towers.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">End Frame Features</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Spigot sockets:</strong> at the top and bottom of each standard for vertical stacking</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Brace connection points:</strong> welded sockets or pressed fittings for attaching braces</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Locking mechanisms:</strong> gravity locks or spring clips that engage when frames are stacked</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Rung spacing:</strong> typically 250mm to 300mm centres, providing comfortable climbing steps</div>
                  </li>
                </ul>
              </div>

              <p>
                End frames are positioned at each end of the tower — hence the name. On a standard tower, two end
                frames sit opposite each other at each lift level, connected by horizontal and diagonal braces. The
                width of the end frame determines the tower width. Always check that the end frames match the intended
                tower configuration before assembly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Horizontal & Diagonal Braces */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Horizontal & Diagonal Braces
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Braces are the connecting elements that hold the end frames together and give the tower its structural
                rigidity. Without braces, the end frames would simply fall apart. There are two main types:
                <strong className="text-white"> horizontal braces</strong> and <strong className="text-white">diagonal braces</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2">Horizontal Braces</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Connect end frames at right angles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Maintain the correct spacing between frames</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide lateral stability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fitted along the long sides of the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Sometimes called <strong className="text-white">ledgers</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Clip onto the frame standards using hook/claw fittings</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2">Diagonal Braces</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Cross-bracing fitted diagonally between frames</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Prevent <strong className="text-white">racking</strong> (parallelogram distortion)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fitted in opposing pairs on each face</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Triangulate the structure for maximum rigidity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must not be omitted — even temporarily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>One pair on each long face at every lift level</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition: Racking</h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Racking</strong> is a parallelogram distortion where the tower leans
                  to one side because the rectangular shape has deformed into a parallelogram. This occurs when diagonal
                  braces are missing, incorrectly fitted, or damaged. Racking significantly reduces structural stability
                  and can lead to tower collapse. Diagonal braces prevent racking by triangulating the structure.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Plan Braces</h3>
                <p className="text-white/70 text-sm">
                  In addition to horizontal and diagonal braces on the tower faces, some configurations require
                  <strong className="text-white"> plan braces</strong> — horizontal diagonal members fitted within
                  the plan view of the tower (across the platform area). Plan braces prevent the tower from twisting
                  and are typically required at the base level and at intervals up the tower. Check the manufacturer's
                  assembly sequence for plan brace positions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Platforms & Trapdoors */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Platforms & Trapdoors
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The working platform is the deck on which operatives stand to carry out their work. Platforms span
                the full width and length of the tower, providing a flat, stable working surface. Modern tower
                platforms incorporate a <strong className="text-white">trapdoor</strong> — a hinged section that
                opens to allow the operative to climb through from below.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-2">Working Platform Features</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Full-width deck:</strong> spans the complete platform area, providing maximum working space</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Trapdoor access:</strong> hinged section allows climbing through from below without removing guardrails</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Locking hooks:</strong> spring-loaded hooks engage with the frame tubes to secure the platform</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Non-slip surface:</strong> textured or perforated deck to reduce slip risk in wet conditions</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Wind locks:</strong> some platforms have wind locks to prevent uplift in windy conditions</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Intermediate Platforms</h3>
                <p className="text-white/70 text-sm mb-2">
                  In addition to the main working platform at the top of the tower, intermediate platforms are fitted
                  at intervals during the build. These serve two purposes:
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Provide a resting point during the climb — reducing fatigue on tall towers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Act as a staging area during assembly — the operative stands on the intermediate platform while fitting the next lift of frames and braces above</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Safe Working Load (SWL)</h3>
                <p className="text-white/70 text-sm">
                  Every platform has a rated safe working load specified by the manufacturer. This includes the
                  weight of operatives, tools, and materials. The SWL must never be exceeded. Typical platform
                  SWLs range from <strong className="text-white">150kg to 275kg</strong> depending on the tower class
                  (BS EN 1004 load classes 1, 2, or 3). Always check the manufacturer's data plate or instruction
                  manual for the specific SWL of your platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: SVG Diagram — Tower Anatomy */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Tower Anatomy — Labelled Diagram
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The diagram below shows a double-width mobile access tower with the principal structural components
                labelled. Familiarise yourself with the position and name of each component — you will need to identify
                them during assembly, inspection, and when reporting defects.
              </p>

              {/* SVG Tower Diagram */}
              <div className="my-8 flex justify-center">
                <svg className="w-full max-w-md text-white/70" viewBox="0 0 400 600" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  {/* Adjustable Legs */}
                  <line x1="110" y1="560" x2="110" y2="530" strokeWidth="3" className="text-amber-400" stroke="currentColor" />
                  <line x1="290" y1="560" x2="290" y2="530" strokeWidth="3" className="text-amber-400" stroke="currentColor" />
                  <line x1="110" y1="560" x2="100" y2="570" strokeWidth="2" />
                  <line x1="110" y1="560" x2="120" y2="570" strokeWidth="2" />
                  <line x1="290" y1="560" x2="280" y2="570" strokeWidth="2" />
                  <line x1="290" y1="560" x2="300" y2="570" strokeWidth="2" />

                  {/* Castors */}
                  <circle cx="110" cy="578" r="10" className="text-blue-400" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="290" cy="578" r="10" className="text-blue-400" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="100" y1="590" x2="120" y2="590" strokeWidth="1" className="text-white/30" stroke="currentColor" />
                  <line x1="280" y1="590" x2="300" y2="590" strokeWidth="1" className="text-white/30" stroke="currentColor" />

                  {/* Left End Frame (Standards) */}
                  <line x1="110" y1="530" x2="110" y2="100" strokeWidth="2.5" className="text-white/60" stroke="currentColor" />
                  <line x1="150" y1="530" x2="150" y2="100" strokeWidth="2.5" className="text-white/60" stroke="currentColor" />

                  {/* Right End Frame (Standards) */}
                  <line x1="250" y1="530" x2="250" y2="100" strokeWidth="2.5" className="text-white/60" stroke="currentColor" />
                  <line x1="290" y1="530" x2="290" y2="100" strokeWidth="2.5" className="text-white/60" stroke="currentColor" />

                  {/* Left End Frame Transoms (Rungs) */}
                  {[530, 490, 450, 410, 370, 330, 290, 250, 210, 170, 130].map((y) => (
                    <line key={`lt-${y}`} x1="110" y1={y} x2="150" y2={y} strokeWidth="1.5" className="text-white/40" stroke="currentColor" />
                  ))}

                  {/* Right End Frame Transoms (Rungs) */}
                  {[530, 490, 450, 410, 370, 330, 290, 250, 210, 170, 130].map((y) => (
                    <line key={`rt-${y}`} x1="250" y1={y} x2="290" y2={y} strokeWidth="1.5" className="text-white/40" stroke="currentColor" />
                  ))}

                  {/* Horizontal Braces (front face) */}
                  {[530, 370, 210].map((y) => (
                    <line key={`hb-${y}`} x1="150" y1={y} x2="250" y2={y} strokeWidth="2" className="text-green-400/70" stroke="currentColor" />
                  ))}

                  {/* Diagonal Braces (front face cross-bracing) */}
                  <line x1="150" y1="530" x2="250" y2="370" strokeWidth="1.5" className="text-orange-400/70" stroke="currentColor" />
                  <line x1="250" y1="530" x2="150" y2="370" strokeWidth="1.5" className="text-orange-400/70" stroke="currentColor" />
                  <line x1="150" y1="370" x2="250" y2="210" strokeWidth="1.5" className="text-orange-400/70" stroke="currentColor" />
                  <line x1="250" y1="370" x2="150" y2="210" strokeWidth="1.5" className="text-orange-400/70" stroke="currentColor" />

                  {/* Working Platform */}
                  <rect x="105" y="195" width="190" height="12" rx="2" className="text-cyan-400" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />

                  {/* Trapdoor line on platform */}
                  <line x1="160" y1="195" x2="160" y2="207" strokeWidth="1" className="text-cyan-300/50" stroke="currentColor" strokeDasharray="3,2" />

                  {/* Intermediate Platform */}
                  <rect x="105" y="355" width="190" height="8" rx="1" className="text-cyan-400/50" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.08" />

                  {/* Guardrails */}
                  <line x1="105" y1="140" x2="295" y2="140" strokeWidth="2.5" className="text-red-400" stroke="currentColor" />
                  <line x1="105" y1="100" x2="105" y2="195" strokeWidth="2" className="text-red-400/60" stroke="currentColor" />
                  <line x1="295" y1="100" x2="295" y2="195" strokeWidth="2" className="text-red-400/60" stroke="currentColor" />

                  {/* Guardrail top rail */}
                  <line x1="105" y1="100" x2="295" y2="100" strokeWidth="2.5" className="text-red-400" stroke="currentColor" />

                  {/* Toeboard indicators */}
                  <rect x="105" y="195" width="4" height="20" className="text-yellow-400" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="1" />
                  <rect x="291" y="195" width="4" height="20" className="text-yellow-400" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="1" />

                  {/* Spigot detail (small connector between frame sections) */}
                  <rect x="107" y="368" width="6" height="16" rx="1" className="text-purple-400" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
                  <rect x="287" y="368" width="6" height="16" rx="1" className="text-purple-400" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />

                  {/* Plan brace at base (shown as dashed diagonal within the base rectangle) */}
                  <line x1="110" y1="530" x2="290" y2="530" strokeWidth="1" className="text-white/30" stroke="currentColor" strokeDasharray="4,3" />

                  {/* ──── LABELS ──── */}

                  {/* Guardrail label */}
                  <line x1="300" y1="100" x2="345" y2="75" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="348" y="79" className="text-white/90 fill-current" fontSize="10" fontFamily="system-ui">Guardrail</text>

                  {/* Mid-rail label */}
                  <line x1="300" y1="140" x2="345" y2="120" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="348" y="124" className="text-white/90 fill-current" fontSize="10" fontFamily="system-ui">Mid-rail</text>

                  {/* Platform label */}
                  <line x1="300" y1="200" x2="345" y2="175" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="348" y="179" className="text-white/90 fill-current" fontSize="10" fontFamily="system-ui">Platform</text>

                  {/* Toeboard label */}
                  <line x1="298" y1="210" x2="345" y2="225" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="348" y="229" className="text-white/90 fill-current" fontSize="10" fontFamily="system-ui">Toeboard</text>

                  {/* End Frame label (left side) */}
                  <line x1="105" y1="300" x2="55" y2="280" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="10" y="275" className="text-white/90 fill-current" fontSize="10" fontFamily="system-ui">End Frame</text>
                  <text x="10" y="287" className="text-white/60 fill-current" fontSize="8" fontFamily="system-ui">(Standards</text>
                  <text x="10" y="297" className="text-white/60 fill-current" fontSize="8" fontFamily="system-ui">& Transoms)</text>

                  {/* Horizontal Brace label */}
                  <line x1="200" y1="370" x2="200" y2="395" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="145" y="410" className="text-green-400/90 fill-current" fontSize="9" fontFamily="system-ui">Horizontal Brace</text>

                  {/* Diagonal Brace label */}
                  <line x1="215" y1="440" x2="260" y2="450" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="263" y="454" className="text-orange-400/90 fill-current" fontSize="9" fontFamily="system-ui">Diagonal</text>
                  <text x="263" y="465" className="text-orange-400/90 fill-current" fontSize="9" fontFamily="system-ui">Brace</text>

                  {/* Spigot label */}
                  <line x1="100" y1="376" x2="55" y2="376" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="15" y="380" className="text-purple-400/90 fill-current" fontSize="9" fontFamily="system-ui">Spigot</text>

                  {/* Adjustable Leg label */}
                  <line x1="105" y1="545" x2="55" y2="540" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="5" y="535" className="text-amber-400/90 fill-current" fontSize="9" fontFamily="system-ui">Adjustable</text>
                  <text x="5" y="546" className="text-amber-400/90 fill-current" fontSize="9" fontFamily="system-ui">Leg</text>

                  {/* Castor label */}
                  <line x1="295" y1="578" x2="340" y2="570" strokeWidth="0.8" className="text-white/40" stroke="currentColor" />
                  <text x="343" y="574" className="text-blue-400/90 fill-current" fontSize="9" fontFamily="system-ui">Castor</text>

                  {/* Base Plate label (below castors) */}
                  <text x="145" y="598" className="text-white/50 fill-current" fontSize="8" fontFamily="system-ui" fontStyle="italic">Base plates replace castors for fixed positions</text>

                  {/* Title */}
                  <text x="200" y="35" className="text-white/90 fill-current" fontSize="13" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Double-Width Tower — Component Layout</text>
                  <text x="200" y="52" className="text-white/50 fill-current" fontSize="9" fontFamily="system-ui" textAnchor="middle">Front elevation (simplified)</text>
                </svg>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Diagram Key</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-white/60"></div>
                    <span className="text-white/70">End frames</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-green-400/70"></div>
                    <span className="text-white/70">Horizontal braces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-orange-400/70"></div>
                    <span className="text-white/70">Diagonal braces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-cyan-400"></div>
                    <span className="text-white/70">Platforms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-red-400"></div>
                    <span className="text-white/70">Guardrails</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-purple-400"></div>
                    <span className="text-white/70">Spigots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-blue-400"></div>
                    <span className="text-white/70">Castors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-amber-400"></div>
                    <span className="text-white/70">Adjustable legs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-yellow-400"></div>
                    <span className="text-white/70">Toeboards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Castors, Base Plates & Adjustable Legs */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Castors, Base Plates & Adjustable Legs
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The base components support the entire tower structure and determine how it interfaces with the ground.
                The choice between castors, base plates, and the use of adjustable legs depends on whether the tower
                needs to be mobile, the ground conditions, and the manufacturer's specification.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">Castors</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Swivel wheels:</strong> allow the tower to be rolled to different positions when unoccupied</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Brakes:</strong> each castor has an integral brake that must be locked before anyone ascends the tower</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Load rating:</strong> each castor is rated for a maximum load — do not exceed it</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">ALL castors must be locked:</strong> not just two diagonal ones — all four (or more) must be braked</div>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">Base Plates</h3>
                  <p className="text-white/70 text-sm">
                    Used instead of castors when the tower does not need to be mobile. Base plates sit flat on the
                    ground and spread the tower's load over a larger area. They are typically used on soft ground
                    (with sole boards) or where the tower will remain in a fixed position for an extended period.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">Adjustable Legs</h3>
                  <p className="text-white/70 text-sm">
                    Screw-jack legs that allow fine height adjustment to level the tower on slightly uneven ground.
                    Each leg can be independently adjusted. The maximum extension is specified by the manufacturer
                    — exceeding this compromises stability. Locking nuts or pins secure the legs at the set height.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Maximum Extension Warning</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Adjustable legs have a maximum safe extension marked on the leg or specified in the instruction
                  manual. This is typically <strong className="text-white">300mm to 400mm</strong> depending on the
                  system. Extending beyond this limit reduces the structural stability of the tower and creates a
                  risk of buckling or collapse. If the ground is too uneven for the adjustable legs to compensate,
                  the ground must be levelled first or an alternative access method selected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Spigots & Connection Hardware */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Spigots & Connection Hardware
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Spigots are the male connectors that join frame sections vertically, allowing the tower to be built
                progressively higher. Each spigot slides into the top of one frame section, and the bottom socket
                of the next frame section sits over the protruding portion, creating a secure vertical joint.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition: Gravity Lock</h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">gravity lock</strong> (also called a spring-loaded lock or snap lock) is
                  an automatic locking device fitted to spigots and connection hardware. When two components are joined,
                  the gravity lock engages automatically under its own weight or spring tension, locking the joint in
                  place. The lock must be visually and physically confirmed as engaged before proceeding with the build.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Checking Spigot Engagement</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <Eye className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Visual check:</strong> Look for the gravity lock tab — it should be fully extended through the engagement hole. If the tab is not visible, the lock has not engaged.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Search className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <div><strong className="text-white">Physical check:</strong> Attempt to lift the upper frame section slightly. If properly locked, it should resist being pulled upward. Any vertical play indicates the lock has not engaged.</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Worn Spigot Indicators</h3>
                <p className="text-white/70 text-sm mb-2">
                  During inspection, look for these signs that a spigot or its lock mechanism is worn or damaged:
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Gravity lock does not spring out automatically when frame is seated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Visible wear, deformation, or mushrooming on the spigot end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cracked or missing spring in the lock mechanism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Excessive play (wobble) in the joint even when the lock appears engaged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Corrosion or pitting on the spigot surface preventing smooth insertion</span>
                  </li>
                </ul>
              </div>

              <p>
                Brace connectors (hooks, claws, or clips at each end of a brace) also use gravity locks or spring
                clips. The same inspection criteria apply — the connector must fully engage with the frame tube and
                the lock must be confirmed as secure before the brace is considered installed.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Component Inspection & Defects */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Component Inspection & Defects
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Every component must be inspected before use. A single defective component can compromise the entire
                tower's structural integrity. Inspections should be carried out methodically — checking each component
                as it is handled during assembly.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">What to Look For</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Bent or Distorted Tubes</p>
                      <p className="text-white/60">Any visible bend, kink, or deformation in a standard, transom, or brace indicates the component has been overloaded or impacted. It must not be used.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Cracked or Broken Welds</p>
                      <p className="text-white/60">Welds at joints — particularly where transoms meet standards — must be intact. Cracked welds indicate fatigue failure and the component must be rejected.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Missing or Broken Locks</p>
                      <p className="text-white/60">Gravity locks, spring clips, and platform hooks must all be present and functional. Missing or broken locks mean the component cannot be securely connected.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Worn or Damaged Castors</p>
                      <p className="text-white/60">Flat spots on wheels, broken brakes, or loose swivel bearings. Castors with defective brakes must not be used — the tower cannot be safely immobilised.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Platform Damage</p>
                      <p className="text-white/60">Cracked or split deck boards, broken locking hooks, damaged trapdoor hinges, or warped platform frames. Any damage that could cause the platform to fail under load.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Reject and Quarantine Procedure</h3>
                </div>
                <div className="text-white/70 text-sm space-y-2">
                  <p>If a defective component is found:</p>
                  <ol className="list-decimal pl-5 space-y-1 text-white/60">
                    <li><strong className="text-white">Stop:</strong> Do not use the defective component</li>
                    <li><strong className="text-white">Tag:</strong> Clearly mark it as defective (red tag, tape, or written label)</li>
                    <li><strong className="text-white">Quarantine:</strong> Separate it from serviceable components to prevent accidental reuse</li>
                    <li><strong className="text-white">Report:</strong> Inform the supervisor and record the defect</li>
                    <li><strong className="text-white">Return:</strong> Send the component to the manufacturer or supplier for assessment</li>
                  </ol>
                  <p className="text-white/50 italic mt-2">
                    Never attempt field repairs on structural tower components. Welding, straightening, or drilling
                    compromises the material's strength and invalidates the manufacturer's design calculations.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Inspection Frequency</h3>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Pre-Use</p>
                    <p className="text-white/60">Before every assembly — check each component as handled</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Weekly</p>
                    <p className="text-white/60">At least every 7 days during prolonged use (WAH Regs 2005)</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">After Events</p>
                    <p className="text-white/60">After impact, high winds, or any event affecting integrity</p>
                  </div>
                </div>
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
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Tower Classifications
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2-section-3">
              Next: Safety Components
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PasmaModule2Section2;
