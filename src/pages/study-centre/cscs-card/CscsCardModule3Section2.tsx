import { ArrowLeft, Wrench, CheckCircle, AlertTriangle, Ladder, Building2, Truck, Shield, ClipboardCheck, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "access-ladder-ratio",
    question: "What is the correct angle ratio for setting up a leaning ladder?",
    options: [
      "1:3 — one unit out for every three units up",
      "1:4 — one unit out for every four units up",
      "1:5 — one unit out for every five units up",
      "1:2 — one unit out for every two units up"
    ],
    correctIndex: 1,
    explanation: "The correct ratio for a leaning ladder is 1:4. For every four units of height, the base of the ladder should be one unit away from the structure. This gives an angle of approximately 75 degrees and provides the best balance between stability and usability."
  },
  {
    id: "access-scaffold-tag",
    question: "What does a GREEN scaffold tag indicate on site?",
    options: [
      "The scaffold is being erected and must not be used",
      "The scaffold has been inspected and is safe for use",
      "The scaffold requires urgent repair work",
      "The scaffold is due for its 7-day inspection"
    ],
    correctIndex: 1,
    explanation: "A green scaffold tag means the scaffold has been inspected by a competent person and is safe for use. A yellow tag means alterations are in progress, and a red tag means the scaffold must not be used."
  },
  {
    id: "access-mewp-training",
    question: "Which training accreditation is the industry standard for operating Mobile Elevating Work Platforms (MEWPs)?",
    options: [
      "PASMA",
      "CSCS",
      "IPAF",
      "NASC"
    ],
    correctIndex: 2,
    explanation: "IPAF (International Powered Access Federation) is the recognised industry standard for MEWP operator training. PASMA covers mobile access towers. Operators must hold the correct IPAF category licence for the type of MEWP they are using."
  }
];

const faqs = [
  {
    question: "When is it acceptable to use a ladder instead of a scaffold or MEWP?",
    answer: "Ladders are acceptable for short-duration tasks (generally under 30 minutes), light work where you can maintain three points of contact, and tasks where the risk assessment confirms a ladder is the most suitable option. They should not be used for heavy work, tasks requiring both hands free, or prolonged working at height. HSE guidance INDG401 provides detailed criteria for when ladder use is appropriate."
  },
  {
    question: "What is the difference between PASMA and IPAF training?",
    answer: "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) training covers the safe assembly, use, and dismantling of mobile access towers. IPAF (International Powered Access Federation) training covers the safe operation of Mobile Elevating Work Platforms such as scissor lifts and boom lifts. They are separate qualifications for different types of equipment, and you need the correct one for the equipment you are using."
  },
  {
    question: "How often must scaffolding be inspected?",
    answer: "Under the Work at Height Regulations 2005, scaffolding must be inspected by a competent person before first use, after any substantial alteration, after any event likely to have affected its stability (such as severe weather), and at regular intervals not exceeding 7 days while it remains erected. Each inspection must be formally recorded in writing and the records kept on site."
  },
  {
    question: "What should I do if I find a defect on access equipment?",
    answer: "Immediately stop using the equipment and take it out of service. Report the defect to your supervisor or site manager. Attach a clear 'Do Not Use' label or tag. Record the defect in the site defect log. Never attempt to repair access equipment yourself unless you are trained and authorised to do so. Defective equipment must not be used under any circumstances until it has been repaired and re-inspected by a competent person."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to HSE guidance INDG401, what is the maximum recommended duration for working from a ladder?",
    options: [
      "15 minutes",
      "30 minutes",
      "1 hour",
      "2 hours"
    ],
    correctAnswer: 1,
    explanation: "HSE guidance recommends that ladders should only be used for short-duration work, generally no longer than 30 minutes. For longer tasks, more stable access equipment such as a tower scaffold, podium step, or MEWP should be used."
  },
  {
    id: 2,
    question: "What training is required before a worker can assemble a mobile access tower?",
    options: [
      "IPAF operator licence",
      "CSCS card only",
      "PASMA training",
      "No specific training is required"
    ],
    correctAnswer: 2,
    explanation: "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) training is the industry-recognised standard for the safe assembly, alteration, and dismantling of mobile access towers. Untrained persons must not assemble or dismantle towers."
  },
  {
    id: 3,
    question: "What is the maximum height-to-base ratio for an indoor mobile access tower without outriggers?",
    options: [
      "2.5:1",
      "3:1",
      "3.5:1",
      "4:1"
    ],
    correctAnswer: 2,
    explanation: "For indoor use, the maximum height-to-base ratio is 3.5:1 without outriggers. For outdoor use, this reduces to 3:1 due to the additional wind loading. Outriggers or stabilisers must be used if these ratios would otherwise be exceeded."
  },
  {
    id: 4,
    question: "What colour scaffold tag indicates the scaffold is NOT safe to use?",
    options: [
      "Green",
      "Yellow",
      "Red",
      "Blue"
    ],
    correctAnswer: 2,
    explanation: "A red scaffold tag means the scaffold must NOT be used. It indicates that the scaffold is incomplete, has failed inspection, has been damaged, or is otherwise unsafe. Only a green tag confirms the scaffold has been inspected and is safe for use."
  },
  {
    id: 5,
    question: "Which of the following is a key component of scaffolding that provides diagonal bracing?",
    options: [
      "Standards",
      "Ledgers",
      "Transoms",
      "Braces"
    ],
    correctAnswer: 3,
    explanation: "Braces are the diagonal tubes that provide rigidity and prevent the scaffold from swaying or racking. Standards are the vertical poles, ledgers are the horizontal tubes running along the length, and transoms are the horizontal tubes running across the width."
  },
  {
    id: 6,
    question: "Before using a MEWP, which of the following checks must be completed?",
    options: [
      "Only a visual check of the platform",
      "Pre-use checks including controls, safety devices, tyres, and structural condition",
      "A check by the HSE inspector",
      "Only a check that the fuel tank is full"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive pre-use checks must be completed before operating a MEWP. These include checking all controls function correctly, safety devices are operational, tyres and wheels are in good condition, hydraulic systems show no leaks, and the structural components are undamaged."
  },
  {
    id: 7,
    question: "When should roof ladders or crawling boards be used on a roof?",
    options: [
      "On any roof to improve grip",
      "Only on flat roofs",
      "On pitched roofs or fragile roofs to distribute load and prevent falls through the surface",
      "Only when it is raining"
    ],
    correctAnswer: 2,
    explanation: "Roof ladders and crawling boards are used on pitched roofs to provide a safe working position, and on fragile roofs to distribute the worker's weight and prevent them from falling through the roofing material. They must be properly secured at the ridge."
  },
  {
    id: 8,
    question: "What is the FIRST factor to consider when choosing access equipment for a task?",
    options: [
      "The cost of hiring the equipment",
      "Whether the task can be done from ground level without working at height",
      "The colour of the equipment",
      "Whether the equipment fits through the site entrance"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control requires you to first consider whether work at height can be avoided altogether. Only if the task cannot be carried out from ground level should you proceed to select the most appropriate access equipment for the job."
  }
];

export default function CscsCardModule3Section2() {
  useSEO({
    title: "Access Equipment | CSCS Card Module 3 Section 2",
    description:
      "Learn about ladders, stepladders, scaffolding, mobile towers, MEWPs, podium steps, and equipment selection criteria for the CSCS HS&E test.",
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
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <Wrench className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Access Equipment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Selecting, using, and inspecting the right access equipment for working at height — from ladders and towers to scaffolding and MEWPs
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Selection:</strong> Match equipment to height, duration, task &amp; conditions</li>
              <li><strong>Principle:</strong> Collective protection before personal protection</li>
              <li><strong>Training:</strong> PASMA for towers, IPAF for MEWPs, competent for all</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Risk assess, check equipment, verify training</li>
              <li><strong>During:</strong> Inspect before each use, follow safe systems of work</li>
              <li><strong>Always:</strong> Report defects, never use damaged equipment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the factors to consider when selecting access equipment",
              "Describe safe use of ladders, stepladders, and their limitations",
              "Understand mobile access tower assembly and PASMA requirements",
              "Identify key scaffold components and the scaffold tag system",
              "Explain MEWP types and IPAF training categories",
              "Describe inspection and maintenance requirements for access equipment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Choosing the Right Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Choosing the Right Equipment
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selecting the correct access equipment is one of the most important decisions you will make
                when planning work at height. The wrong choice can lead to instability, falls, and serious
                injuries. HSE guidance document INDG401 provides a practical framework for making this
                decision, and your selection must always follow the hierarchy of control established by the
                Work at Height Regulations 2005.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Key Principle:</strong> Always prefer collective protection
                  (guardrails, scaffolding, towers) over personal protection (harnesses, lanyards). Collective
                  measures protect everyone in the area without requiring individual action, whereas personal
                  protection only works if used correctly every time.
                </p>
              </div>

              <p>
                Before selecting any equipment, you must consider six critical factors. Each one influences
                which type of access is appropriate, and ignoring any of them can result in an unsafe system
                of work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Six Factors for Equipment Selection</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Height</p>
                      <p className="text-sm text-white/80">What is the working height required? Low-level access (under 2m) may suit podium steps, whereas heights above 6m typically require scaffolding or MEWPs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Duration</p>
                      <p className="text-sm text-white/80">How long will the work take? Ladders suit tasks under 30 minutes. Longer tasks demand more stable platforms with guardrails and toe boards.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Task</p>
                      <p className="text-sm text-white/80">What work is being carried out? Light inspection may suit a ladder, but drilling, lifting, or two-handed work requires a platform with edge protection.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Load</p>
                      <p className="text-sm text-white/80">What tools and materials need to be carried? Heavy loads require equipment rated for the combined weight of people, tools, and materials.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Ground Conditions</p>
                      <p className="text-sm text-white/80">Is the ground firm, level, and stable? Soft, uneven, or sloping ground affects the suitability and safety of all access equipment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Environment</p>
                      <p className="text-sm text-white/80">Are there overhead hazards, confined spaces, wind exposure, or proximity to public areas? Environmental factors can rule out certain equipment types entirely.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment Selection Flowchart */}
              <div className="bg-[#111] border border-green-500/20 rounded-lg p-4 sm:p-6">
                <p className="text-sm font-semibold text-green-400 mb-4 text-centre">Equipment Selection Flowchart</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-centre justify-centre">
                    <div className="bg-green-500/15 border border-green-500/30 rounded-lg px-4 py-2 text-centre">
                      <p className="text-green-400 font-medium">Can the task be done from ground level?</p>
                    </div>
                  </div>
                  <div className="flex justify-centre gap-8 sm:gap-16">
                    <div className="text-centre">
                      <p className="text-green-400 text-xs font-bold mb-1">&darr; YES</p>
                      <div className="bg-green-500/20 border border-green-500/40 rounded px-3 py-1.5">
                        <p className="text-white text-xs">Use long-reach tools / work at ground level</p>
                      </div>
                    </div>
                    <div className="text-centre">
                      <p className="text-red-400 text-xs font-bold mb-1">&darr; NO</p>
                      <div className="bg-white/5 border border-white/10 rounded px-3 py-1.5">
                        <p className="text-white text-xs">Is the task short (&lt;30 min), light, low height?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-centre gap-4 sm:gap-8 ml-auto" style={{ maxWidth: "70%", marginLeft: "auto" }}>
                    <div className="text-centre">
                      <p className="text-green-400 text-xs font-bold mb-1">&darr; YES</p>
                      <div className="bg-blue-500/15 border border-blue-500/30 rounded px-3 py-1.5">
                        <p className="text-white text-xs">Ladder / Stepladder / Podium Step</p>
                      </div>
                    </div>
                    <div className="text-centre">
                      <p className="text-red-400 text-xs font-bold mb-1">&darr; NO</p>
                      <div className="bg-white/5 border border-white/10 rounded px-3 py-1.5">
                        <p className="text-white text-xs">Is the work area fixed or does it move?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-centre gap-4 sm:gap-8 ml-auto" style={{ maxWidth: "55%", marginLeft: "auto" }}>
                    <div className="text-centre">
                      <p className="text-amber-400 text-xs font-bold mb-1">&darr; FIXED</p>
                      <div className="bg-amber-500/15 border border-amber-500/30 rounded px-3 py-1.5">
                        <p className="text-white text-xs">Scaffold / Mobile Tower</p>
                      </div>
                    </div>
                    <div className="text-centre">
                      <p className="text-purple-400 text-xs font-bold mb-1">&darr; MOVING</p>
                      <div className="bg-purple-500/15 border border-purple-500/30 rounded px-3 py-1.5">
                        <p className="text-white text-xs">MEWP (Scissor / Boom Lift)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="text-sm text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Always start with the hierarchy: avoid height, then prevent falls, then mitigate consequences</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Document your equipment selection rationale in the risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Consider whether the equipment is suitable for the specific site conditions, not just the task</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Ensure all operatives are trained and competent to use the selected equipment</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Ladders & Stepladders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Ladders &amp; Stepladders
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ladders and stepladders are among the most commonly used — and most commonly misused — pieces
                of access equipment on construction sites. The HSE does not ban ladder use, but their guidance
                document INDG401 sets clear limits on when ladders are appropriate. A ladder should only ever
                be the last resort for work at height, used when more stable equipment is not reasonably
                practicable.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">When Is Ladder Use Acceptable?</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Short duration</strong> — the task will take no longer than 30 minutes in one position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Light work only</strong> — you can maintain three points of contact at all times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Low risk</strong> — the risk assessment confirms a ladder is the most suitable option</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">No heavy loads</strong> — you should not carry loads that prevent you from gripping the ladder</span>
                  </li>
                </ul>
              </div>

              {/* Ladder Setup Diagram */}
              <div className="bg-[#111] border border-green-500/20 rounded-lg p-4 sm:p-6">
                <p className="text-sm font-semibold text-green-400 mb-4 text-centre">Ladder Setup Diagram — 1:4 Ratio</p>
                <div className="flex items-end gap-2 sm:gap-4 justify-centre">
                  {/* Wall */}
                  <div className="flex flex-col items-centre">
                    <div className="w-4 bg-white/20 border border-white/30 rounded-t" style={{ height: "160px" }} />
                    <p className="text-[10px] text-white/50 mt-1">Wall</p>
                  </div>
                  {/* Ladder angled */}
                  <div className="relative" style={{ width: "60px", height: "170px" }}>
                    <div
                      className="absolute bg-green-500/40 border border-green-400/60 rounded"
                      style={{
                        width: "8px",
                        height: "180px",
                        bottom: "0",
                        left: "10px",
                        transform: "rotate(-14deg)",
                        transformOrigin: "bottom left"
                      }}
                    />
                    {/* 3 rungs above label */}
                    <div className="absolute top-0 right-0 text-[9px] text-green-400 whitespace-nowrap">
                      3 rungs above<br />landing point
                    </div>
                    {/* Angle label */}
                    <div className="absolute bottom-1 left-8 text-[9px] text-white/60">
                      75&deg;
                    </div>
                  </div>
                  {/* Ground distance */}
                  <div className="flex flex-col items-centre justify-end" style={{ height: "170px" }}>
                    <div className="border-t border-dashed border-white/30 w-8 mb-1" />
                    <p className="text-[10px] text-white/50">1 unit</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-white/70">
                  <div className="bg-white/5 rounded px-3 py-2 text-centre">
                    <p className="text-green-400 font-medium">1:4 Ratio</p>
                    <p>1 unit out for every 4 up</p>
                  </div>
                  <div className="bg-white/5 rounded px-3 py-2 text-centre">
                    <p className="text-green-400 font-medium">Secure at Top</p>
                    <p>Tie off or have someone foot it</p>
                  </div>
                  <div className="bg-white/5 rounded px-3 py-2 text-centre">
                    <p className="text-green-400 font-medium">3 Rungs Above</p>
                    <p>Extend at least 1m past landing</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Leaning Ladder Safety Rules</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Set at a 1:4 ratio (75-degree angle) — one unit out for every four units up</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Secure at the top with a tie or, if not possible, secure at the base</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Extend at least 3 rungs (approximately 1 metre) above the landing point</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Rest on a firm, level surface — never on loose materials or unstable ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Maintain three points of contact at all times whilst climbing</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Ladder Classification (EN 131)</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Class 1 (Industrial)</strong> — rated for heavy-duty trade use, 175 kg maximum load</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">EN 131 Professional</strong> — meets the European standard for professional/trade use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">EN 131 Non-Professional</strong> — domestic use only, NOT suitable for site work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Always check the duty rating label before using any ladder on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Domestic-class ladders must never be used on construction sites</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Pre-Use Inspection</p>
                </div>
                <p className="text-sm text-white/80">
                  Before every use, visually inspect the ladder for damage. Check for bent or cracked stiles,
                  missing or loose rungs, damaged feet, and worn or missing anti-slip devices. Check that
                  locking mechanisms on stepladders and extension ladders are fully engaged. If any defect is
                  found, the ladder must be taken out of service immediately and labelled as defective.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Mobile Access Towers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            Mobile Access Towers
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mobile access towers (also called mobile scaffold towers) provide a stable, guarded working
                platform and are one of the most commonly used forms of access equipment in the construction
                industry. They are particularly suited to tasks that require a stable platform at height for
                extended periods, such as electrical installation, painting, and plastering.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">PASMA Training Required:</strong> Only persons who have
                  completed PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) training
                  should assemble, alter, or dismantle mobile access towers. This is the industry-recognised
                  standard and is a requirement on most construction sites. PASMA training covers the 3T method
                  (Through the Trap) and the AGR method (Advance Guard Rail) for safe assembly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Assembly &amp; Disassembly Procedures</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Always follow the manufacturer's instruction manual — never improvise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Assemble on firm, level ground using base plates and sole boards where needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Use the 3T (Through the Trap) or AGR (Advance Guard Rail) method as trained</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Build from the ground up, platform by platform, following the correct sequence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Ensure all braces, platforms, and guardrails are fitted before use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Dismantle in reverse order, never from the top down without protection</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Maximum Height-to-Base Ratios</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Indoors:</strong> 3.5:1 without outriggers/stabilisers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Outdoors:</strong> 3:1 without outriggers/stabilisers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Outriggers increase the effective base size and allow greater heights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Never exceed the manufacturer's stated maximum platform height</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Safe Use Guidelines</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Lock all castors before climbing — never move a tower with people on it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Deploy outriggers and stabilisers when required by the configuration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Never overload the platform — check the safe working load (SWL)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Check for overhead obstructions before moving the tower to a new position</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Tower Inspection Checklist</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>All frames and braces are correctly fitted and locked in position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Platform boards are in place with no gaps greater than 25mm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Guardrails are fitted at the correct height (minimum 950mm)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Toe boards are in place (minimum 150mm high)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>All castors are locked and in good condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>The tower is plumb and not leaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Outriggers and stabilisers are deployed where required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>No visible damage, corrosion, or missing components</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Scaffolding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Scaffolding
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffolding is the most common form of access equipment on construction sites. It provides
                a large, stable working area at height and is suitable for prolonged tasks, heavy loads, and
                multiple workers. Scaffolding must be designed, erected, and dismantled by competent persons,
                and it must comply with NASC (National Access and Scaffolding Confederation) standards,
                particularly TG20 for tube-and-fitting scaffolds.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Scaffolding</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-green-400">Independent Scaffold</p>
                    <p className="text-sm text-white/80">Has two rows of standards (vertical tubes) and does not rely on the building for support. Used where the building cannot support loads or where access is needed on both sides. Both rows of standards support the full scaffold load.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400">Putlog Scaffold</p>
                    <p className="text-sm text-white/80">Has a single row of standards set away from the building, with putlogs (horizontal members) built into the brickwork for support. Commonly used during bricklaying. Only suitable for buildings under construction where putlogs can be embedded in the wall.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400">System Scaffold</p>
                    <p className="text-sm text-white/80">Uses prefabricated components with built-in connection points (rosettes, cups, or wedges). Faster to erect and dismantle than tube-and-fitting scaffolds. Common systems include Cuplock, Kwikstage, and Ringlock.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Key Scaffold Components</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Standards</strong> — vertical tubes that carry the load to the ground</span>
                    </li>
                    <li className="flex items-start gap-2 mt-1.5">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Ledgers</strong> — horizontal tubes running the length of the scaffold</span>
                    </li>
                    <li className="flex items-start gap-2 mt-1.5">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Transoms</strong> — horizontal tubes running across the width</span>
                    </li>
                    <li className="flex items-start gap-2 mt-1.5">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Braces</strong> — diagonal tubes that prevent racking and sway</span>
                    </li>
                  </div>
                  <div>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Toe Boards</strong> — minimum 150mm high, prevent objects falling</span>
                    </li>
                    <li className="flex items-start gap-2 mt-1.5">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Guard Rails</strong> — top rail at minimum 950mm above platform</span>
                    </li>
                    <li className="flex items-start gap-2 mt-1.5">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Base Plates</strong> — spread the load at the bottom of each standard</span>
                    </li>
                    <li className="flex items-start gap-2 mt-1.5">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Sole Boards</strong> — timber boards under base plates on soft ground</span>
                    </li>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Scaffold Tag System</p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-green-600/20 border border-green-500/40 p-3 rounded-lg text-centre">
                    <div className="w-8 h-8 rounded-full bg-green-500 mx-auto mb-2 flex items-center justify-centre">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-green-400 font-semibold text-xs">GREEN</p>
                    <p className="text-white/80 text-xs mt-1">Safe to use — inspected and compliant</p>
                  </div>
                  <div className="bg-yellow-600/20 border border-yellow-500/40 p-3 rounded-lg text-centre">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 mx-auto mb-2 flex items-center justify-centre">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-yellow-400 font-semibold text-xs">YELLOW</p>
                    <p className="text-white/80 text-xs mt-1">Alterations in progress — restricted use</p>
                  </div>
                  <div className="bg-red-600/20 border border-red-500/40 p-3 rounded-lg text-centre">
                    <div className="w-8 h-8 rounded-full bg-red-500 mx-auto mb-2 flex items-center justify-centre">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-red-400 font-semibold text-xs">RED</p>
                    <p className="text-white/80 text-xs mt-1">DO NOT USE — incomplete, failed, or unsafe</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">NASC TG20 Compliance &amp; 7-Day Inspections</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>TG20 provides design guidance for standard tube-and-fitting scaffolds — if a scaffold falls outside TG20 parameters, it must be individually designed by a scaffold designer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Scaffolds must be inspected before first use, after any alteration, after adverse weather, and at intervals not exceeding 7 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Inspections must be carried out by a competent person and formally recorded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Records must be kept on site until the scaffold is dismantled, then retained for 3 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Never use a scaffold without checking the tag — if there is no tag, treat it as a red tag and do not use it</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Mobile Elevating Work Platforms (MEWPs) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Mobile Elevating Work Platforms (MEWPs)
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                MEWPs — commonly known as cherry pickers, scissor lifts, or boom lifts — are powered
                platforms that can be raised, lowered, and in some cases extended to reach working positions
                at height. They offer excellent access for tasks that require frequent repositioning or
                reaching multiple heights. IPAF (International Powered Access Federation) training is the
                recognised industry standard for MEWP operators.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of MEWP</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-green-400">Scissor Lifts (IPAF Category 3a/3b)</p>
                    <p className="text-sm text-white/80">Vertical-only movement. The platform rises directly upwards from the base. Ideal for work requiring a large platform area at a fixed position. 3a = mobile (can be driven at height), 3b = static (must be repositioned at ground level).</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400">Boom Lifts (IPAF Category 1a/1b)</p>
                    <p className="text-sm text-white/80">Articulated or telescopic arms allow the platform to reach up, over, and around obstacles. Greater reach and flexibility than scissor lifts but smaller platform area. 1a = mobile, 1b = static.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400">Vertical Mast Lifts</p>
                    <p className="text-sm text-white/80">Compact, lightweight platforms suitable for low-level indoor work. The platform extends vertically from a small base. Commonly used in warehouses, retail premises, and for facilities maintenance.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">IPAF Training Categories</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="bg-white/5 rounded p-2">
                    <p className="font-medium text-white">1a — Mobile boom (self-propelled)</p>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <p className="font-medium text-white">1b — Static boom (vehicle-mounted)</p>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <p className="font-medium text-white">3a — Mobile scissor lift</p>
                  </div>
                  <div className="bg-white/5 rounded p-2">
                    <p className="font-medium text-white">3b — Static scissor lift</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 mt-2">
                  Operators must hold the correct IPAF PAL Card (Powered Access Licence) for the category of
                  machine they are operating. The PAL Card is valid for 5 years.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Pre-Use Checks</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>All controls function correctly (ground and platform level)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Emergency lowering device is operational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>No hydraulic leaks or damage to hoses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Tyres are in good condition with correct pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Guard rails and platform gate are secure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Structural components show no cracks, bending, or corrosion</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Safe Operation Rules</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Check ground conditions can support the machine's weight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Deploy outriggers fully on firm ground before operating boom lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Establish exclusion zones to prevent people entering the work area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Wear a harness and short lanyard in boom lifts (catapult risk)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Have a rescue plan in place before starting work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Never exceed the safe working load (SWL) of the platform</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Rescue Plans</p>
                </div>
                <p className="text-sm text-white/80">
                  A rescue plan must be in place before any MEWP operation begins. The plan should cover
                  scenarios such as machine failure at height, medical emergency on the platform, and
                  entrapment. It must identify who will carry out the rescue, what equipment is available
                  (e.g. ground-level controls, secondary MEWP), and how emergency services will be contacted.
                  The rescue must be achievable within a reasonable timeframe to prevent suspension trauma.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Podium Steps & Hop-ups */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Podium Steps &amp; Hop-ups
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Podium steps and hop-ups are designed for low-level access, typically where the working
                height is below 2 metres. They bridge the gap between a simple stepladder and a full mobile
                access tower, providing a more stable and safer working platform for tasks that do not justify
                larger equipment. Their popularity has grown significantly as the industry has moved away from
                using stepladders for tasks where a more stable platform is reasonably practicable.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Podium Steps</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Feature a large, flat platform (typically 600mm x 600mm or more)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Include guardrails on all sides of the platform for fall prevention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Typical working heights of 1.2m to 2.4m platform height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Self-closing gate for safe access and egress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Lockable castors for easy repositioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Lightweight and foldable for storage and transport</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Hop-ups</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Very low platform height (typically around 500mm / 0.5m)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Provide a stable, non-slip platform with no need for guardrails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Suitable for very low-level access tasks such as light switch installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Must have a platform area large enough to stand on comfortably</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Non-slip feet to prevent sliding on smooth floors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Never use makeshift hop-ups (crates, buckets, pallets are not suitable)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Advantages Over Stepladders:</strong> Podium steps provide
                  a significantly larger and more stable working platform than stepladders. The guardrails mean
                  the user is protected from falls on all sides. Both hands are free for the task as there is no
                  need to hold on for balance. The wider base makes them inherently more stable, and they are
                  less likely to tip when reaching sideways. For any low-level task lasting more than a few
                  minutes, podium steps should be the default choice over a stepladder.
                </p>
              </div>

              <ul className="text-sm text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Always lock castors before stepping onto the platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Do not overreach from the platform — reposition the unit instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Ensure the surface underneath is firm and level</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Never stand on the guardrails or climb on top of them</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Roof Ladders & Crawling Boards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Roof Ladders &amp; Crawling Boards
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Roof ladders and crawling boards are specialist access equipment designed for use on
                sloping roofs and fragile roofing surfaces. They distribute the user's weight across a larger
                area and provide a secure working position on surfaces where standing unaided would be
                extremely dangerous. They are always used in combination with other protective measures, never
                as the sole means of fall prevention.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When to Use Roof Ladders</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Pitched roofs</strong> — where the slope angle makes standing or walking unsafe without support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Fragile roofing materials</strong> — cement fibre sheets, skylights, glass panels, and aged roofing felt that cannot support a person's weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Inspection and repair tasks</strong> — where the work area is limited and short-duration access is required</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Roof Ladder Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Must be secured at the ridge with a properly designed ridge hook</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>The ridge hook must bear on the opposite slope, not just the ridge tile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Must be long enough to reach from the eaves to the ridge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Never rest a roof ladder on guttering — it cannot support the load</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Crawling Boards</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Wider than roof ladders to distribute load over fragile surfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Must span at least three purlins or rafters to properly distribute weight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Used on fragile roofs where the roofing material cannot bear point loads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Always used with additional fall protection (nets, harnesses, or both)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Fragile Roof Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Falls through fragile roofs are one of the most common causes of fatal falls at work.
                  Cement fibre sheets, liner panels, rooflights, and glass panels may not be immediately
                  obvious as fragile. Always assume a roof surface is fragile unless confirmed otherwise by
                  a competent person. Warning notices reading "FRAGILE ROOF" must be displayed at all access
                  points to fragile roofs. Roof ladders and crawling boards alone are not sufficient protection
                  — they must be combined with additional measures such as safety nets, harnesses, or
                  underneath platforms.
                </p>
              </div>

              <ul className="text-sm text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Never walk directly on fragile roofing materials, even if they appear sound</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Combine roof ladders or crawling boards with edge protection at the eaves</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Carry out a risk assessment specific to the roof type and condition before starting</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>Consider whether the task can be done from underneath using a MEWP or internal platform</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 08: Equipment Inspection & Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Equipment Inspection &amp; Maintenance
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every piece of access equipment must be regularly inspected and properly maintained to ensure
                it remains safe for use. Inspection requirements fall into two categories: informal pre-use
                checks carried out by the user before each use, and formal inspections carried out by a
                competent person at defined intervals. Both are essential, and failure to carry out either
                is a breach of the Work at Height Regulations.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Pre-Use Visual Checks (by user)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Look for visible damage: bends, cracks, dents, weld breaks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Check for corrosion, especially at joints and connection points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Ensure all parts are present — no missing rungs, pins, clips, or boards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Test locking mechanisms, catches, and hinges for correct operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Verify anti-slip feet and rubber pads are intact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Check labels and markings are legible (load rating, manufacturer, standards)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardCheck className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Formal Inspection Schedule</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Scaffolds &amp; towers:</strong> before first use, after alteration, every 7 days, and after any adverse event</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">MEWPs:</strong> 6-monthly thorough examination under LOLER 1998, daily pre-use checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Ladders:</strong> regular inspection schedule set by the employer (frequency based on use)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Harnesses &amp; lanyards:</strong> 6-monthly thorough examination by a competent person</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>All formal inspections must be recorded in writing and retained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Must be carried out by a competent person (not necessarily the user)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">What to Look For During Inspection</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="font-medium text-white mb-1">Structural Issues</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Bent, twisted, or buckled members</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Cracked welds or broken connections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Corrosion reducing material thickness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Impact damage from dropped objects or vehicles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Functional Issues</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Missing pins, clips, bolts, or locking devices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Worn or missing anti-slip feet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Defective locking mechanisms on castors or hinges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Illegible or missing load rating labels</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reporting Defects &amp; Removing Equipment</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Stop immediately</strong> — cease using the equipment as soon as a defect is identified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Isolate the equipment</strong> — attach a "Do Not Use" or "Defective" tag to prevent others from using it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Report to supervisor</strong> — inform your immediate supervisor or site manager verbally and in writing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Record the defect</strong> — enter details in the site defect log including the date, equipment ID, and nature of the defect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Remove from service</strong> — move defective equipment to a quarantine area where possible, away from usable stock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-white">Do not repair</strong> — never attempt to repair access equipment unless you are trained, authorised, and using approved parts</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Record Keeping</p>
                </div>
                <p className="text-sm text-white/80">
                  All formal inspection records must be kept in a systematic manner. Records should include
                  the date of inspection, the identity of the equipment, the name and signature of the
                  competent person, the findings, and any actions taken. Scaffold inspection records must be
                  kept on site until the scaffold is dismantled, then retained for a minimum of 3 months.
                  LOLER examination reports for MEWPs must be kept until the next examination is due. Good
                  record keeping demonstrates compliance and provides evidence of your duty of care.
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
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-3-section-3">
              Next: Manual Handling Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
