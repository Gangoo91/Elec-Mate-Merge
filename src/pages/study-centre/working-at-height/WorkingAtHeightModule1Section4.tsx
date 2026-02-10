import { ArrowLeft, Shield, CheckCircle, AlertTriangle, HardHat, Layers, Users, Wrench, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-hierarchy-first",
    question: "What is the FIRST step in the hierarchy of controls for working at height?",
    options: [
      "Provide personal fall protection (harness and lanyard)",
      "Install guardrails and edge protection",
      "Avoid working at height altogether",
      "Deploy safety nets below the work area"
    ],
    correctIndex: 2,
    explanation: "The first step is always to avoid working at height altogether wherever it is reasonably practicable. This might mean redesigning the installation to be done at ground level, using pre-fabricated assemblies, or using extendable tools that eliminate the need to work above ground."
  },
  {
    id: "wah-collective-vs-personal",
    question: "Why is collective protection (e.g. guardrails) preferred over personal protection (e.g. harnesses)?",
    options: [
      "Collective protection is always cheaper",
      "Collective protection protects everyone in the area without relying on individual behaviour",
      "Personal protection is illegal on construction sites",
      "Harnesses are uncomfortable to wear"
    ],
    correctIndex: 1,
    explanation: "Collective protection measures such as guardrails, platforms, and edge protection protect everyone in the work area automatically, without relying on individuals to wear, inspect, and correctly use personal equipment. Personal fall protection (harnesses, lanyards) depends on each individual worker wearing it correctly, having it properly inspected, and having a suitable anchor point — introducing more opportunities for human error."
  },
  {
    id: "wah-mitigate-example",
    question: "Which of the following is an example of MITIGATING the consequences of a fall (the third level of the hierarchy)?",
    options: [
      "Installing a guardrail around the roof edge",
      "Redesigning the work to be done from ground level",
      "Deploying a safety net below the work area to catch a falling person",
      "Using a scaffold with a proper working platform"
    ],
    correctIndex: 2,
    explanation: "Safety nets are a mitigation measure — they do not prevent the fall from happening, but they reduce the distance fallen and minimise the consequences if a fall does occur. Guardrails and scaffold platforms are prevention measures (they stop the fall). Redesigning the work is avoidance (eliminating the need to work at height altogether)."
  }
];

const faqs = [
  {
    question: "Can a harness be used instead of guardrails if it is more convenient?",
    answer: "No. The Work at Height Regulations 2005 require that collective protection (such as guardrails, working platforms, and scaffolds) is given priority over personal protection (such as harnesses and lanyards). A harness should only be used when collective protection is not reasonably practicable — for example, during the initial erection or dismantling of scaffolding before guardrails can be installed, or for short-duration tasks where installing collective protection would be disproportionate to the risk. Convenience alone is not a valid reason to skip collective protection."
  },
  {
    question: "What are the main advantages of using a MEWP over a ladder for electrical work?",
    answer: "MEWPs (mobile elevating work platforms such as cherry pickers and scissor lifts) provide a stable, guarded working platform with edge protection (guardrails and toe boards). They allow the electrician to work with both hands free, carry tools and materials safely on the platform, reach multiple positions without repositioning, and work for extended periods without fatigue. MEWPs are significantly safer than ladders for most tasks and are required for any work at height that involves sustained or complex tasks."
  },
  {
    question: "What is suspension trauma and why is it important when using harnesses?",
    answer: "Suspension trauma (also called harness hang syndrome or orthostatic intolerance) is a life-threatening condition that can occur when a person is suspended motionless in a harness after a fall. The leg straps compress the femoral veins, causing blood to pool in the legs. Without intervention, this can lead to unconsciousness within 5-15 minutes and death within 15-30 minutes. This is why every work at height plan involving harnesses MUST include a rescue plan that allows a fallen worker to be reached and lowered to the ground within minutes."
  },
  {
    question: "Can an electrician use a ladder for work at height if a scaffold would be safer?",
    answer: "Only in limited circumstances. The Work at Height Regulations 2005 (Schedule 4) state that a ladder may only be used for work at height if a risk assessment has shown that the use of more suitable work equipment is not justified because of the low risk and short duration of the task, or because of features of the site that cannot be altered. If the task requires both hands free, lasts more than 30 minutes, involves carrying heavy materials, or could be done more safely from a scaffold or MEWP, then a ladder is not appropriate."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the correct order of the hierarchy of controls for working at height?",
    options: [
      "Prevent > Mitigate > Avoid",
      "Mitigate > Avoid > Prevent",
      "Avoid > Prevent > Mitigate",
      "Avoid > Mitigate > Prevent"
    ],
    correctAnswer: 2,
    explanation: "The correct hierarchy is: (1) Avoid work at height wherever reasonably practicable, (2) Prevent falls using collective protection such as guardrails and working platforms, (3) Mitigate the consequences of a fall using safety nets, airbags, or personal fall protection."
  },
  {
    id: 2,
    question: "Which of the following is an example of AVOIDING work at height?",
    options: [
      "Using a harness with a self-retracting lifeline",
      "Installing guardrails around the roof perimeter",
      "Assembling cable tray at ground level and lifting it into position as a complete unit",
      "Deploying safety nets below the work area"
    ],
    correctAnswer: 2,
    explanation: "Assembling cable tray at ground level and then lifting it into position is an example of avoiding work at height — the assembly work is done safely at ground level rather than at height. This is the highest and most preferred level of the hierarchy."
  },
  {
    id: 3,
    question: "Collective protection measures include all of the following EXCEPT:",
    options: [
      "Guardrails and toe boards",
      "Safety harnesses and lanyards",
      "Working platforms with edge protection",
      "Scaffold systems with guardrails"
    ],
    correctAnswer: 1,
    explanation: "Safety harnesses and lanyards are personal fall protection — they protect only the individual wearing them and depend on correct use. Collective protection measures (guardrails, toe boards, working platforms, scaffolds) protect everyone in the work area automatically."
  },
  {
    id: 4,
    question: "Why must a rescue plan be in place before any work at height using harnesses begins?",
    options: [
      "Because the HSE requires a copy for their records",
      "Because a person suspended in a harness after a fall can develop suspension trauma and die within minutes",
      "Because harnesses always break during a fall",
      "Because it is good practice but not legally required"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma is a life-threatening condition that can develop within minutes when a person hangs motionless in a harness. Without prompt rescue, the worker can lose consciousness within 5-15 minutes and die within 15-30 minutes. A rescue plan is both a legal requirement and a practical necessity."
  },
  {
    id: 5,
    question: "Under the hierarchy of controls, when is personal fall protection (harnesses) appropriate?",
    options: [
      "As the first choice for all work at height",
      "Whenever it is cheaper than collective protection",
      "Only when it is not reasonably practicable to prevent falls using collective protection",
      "Only for work above 10 metres"
    ],
    correctAnswer: 2,
    explanation: "Personal fall protection (harnesses, lanyards, self-retracting lifelines) should only be used when collective protection — such as guardrails, platforms, or scaffolds — is not reasonably practicable. The regulations require that collective protection is always given priority."
  },
  {
    id: 6,
    question: "Which of the following is an example of a PREVENTION measure?",
    options: [
      "A safety net positioned below the work area",
      "An airbag system deployed at ground level",
      "A guardrail installed around the edge of a flat roof",
      "A rescue plan for a suspended worker"
    ],
    correctAnswer: 2,
    explanation: "A guardrail is a prevention measure — it physically prevents the worker from falling over the edge. Safety nets and airbags are mitigation measures — they do not prevent the fall, but reduce its consequences."
  },
  {
    id: 7,
    question: "An electrician needs to install 50 metres of cable tray along a warehouse ceiling at 4 metres height. The task will take two full days. What is the most appropriate access equipment?",
    options: [
      "An extension ladder",
      "A stepladder",
      "A mobile tower scaffold or scissor lift MEWP",
      "A chair or desk"
    ],
    correctAnswer: 2,
    explanation: "For a task of this duration, complexity, and height, a mobile tower scaffold or scissor lift MEWP is the most appropriate. They provide a stable working platform with edge protection, allow both hands free, and can be repositioned along the run. A ladder is not suitable for a task lasting two days at 4 metres that requires carrying and fixing heavy materials."
  },
  {
    id: 8,
    question: "Which of the following practical measures helps an electrician AVOID working at height?",
    options: [
      "Using a harness clipped to a roof anchor",
      "Installing guardrails around the work area",
      "Using an extendable paint roller to test smoke detectors from ground level",
      "Wearing a hard hat in case of a fall"
    ],
    correctAnswer: 2,
    explanation: "Using an extendable tool to carry out the task from ground level is an avoidance measure — it eliminates the need to work at height entirely. Guardrails are prevention. Harnesses are mitigation. A hard hat does not address the fall hazard."
  }
];

export default function WorkingAtHeightModule1Section4() {
  useSEO({
    title: "The Hierarchy of Controls | Working at Height Module 1.4",
    description: "Avoid, prevent, mitigate — the hierarchy of controls for working at height. Collective vs personal protection, practical examples for electricians, and the control pyramid.",
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
            <Link to="../working-at-height-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <Shield className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Hierarchy of Controls
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Avoid, prevent, mitigate &mdash; the three-tier approach to managing fall risks, with practical examples for electricians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Level 1:</strong> AVOID &mdash; eliminate the need to work at height</li>
              <li><strong>Level 2:</strong> PREVENT &mdash; stop falls with collective protection</li>
              <li><strong>Level 3:</strong> MITIGATE &mdash; reduce fall consequences</li>
              <li><strong>Rule:</strong> Collective protection always before personal</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400 text-base font-medium mb-2">Electrician Examples</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Avoid:</strong> Pre-wire at ground level, use extendable tools</li>
              <li><strong>Prevent:</strong> Tower scaffolds, MEWPs, guardrails</li>
              <li><strong>Mitigate:</strong> Harnesses, safety nets, soft landing systems</li>
              <li><strong>Always:</strong> Plan rescue before starting</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the three levels of the hierarchy: avoid, prevent, mitigate",
              "Give practical examples of avoidance measures for electrical work",
              "Explain why collective protection is preferred over personal protection",
              "Identify the main types of collective fall prevention equipment",
              "Describe the role and limitations of personal fall protection (harnesses)",
              "Explain why a rescue plan is essential when using fall arrest equipment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Hierarchy of Controls Pyramid */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">&mdash;</span>
            Hierarchy of Controls Pyramid
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <p className="text-sm text-white/60 mb-6 text-center">Work through the levels from top to bottom &mdash; only move to the next level if the one above is not reasonably practicable</p>

            <div className="max-w-md mx-auto">
              {/* Pyramid Level 1 - AVOID (narrowest at top) */}
              <div className="flex justify-center mb-1">
                <div className="w-[55%] sm:w-[45%] bg-gradient-to-r from-green-500/20 to-green-400/20 border-2 border-green-500/40 rounded-t-2xl p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center">
                      <span className="text-green-400 text-xs font-bold">1</span>
                    </div>
                    <p className="text-green-400 font-bold text-sm sm:text-base">AVOID</p>
                  </div>
                  <p className="text-xs text-white/60">Eliminate the need to work at height</p>
                  <p className="text-[10px] text-green-400/60 mt-1">MOST EFFECTIVE</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowDown className="h-4 w-4 text-white/30" />
              </div>

              {/* Pyramid Level 2 - PREVENT (wider) */}
              <div className="flex justify-center mb-1">
                <div className="w-[75%] sm:w-[65%] bg-gradient-to-r from-amber-500/20 to-amber-400/20 border-2 border-amber-500/40 p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center">
                      <span className="text-amber-400 text-xs font-bold">2</span>
                    </div>
                    <p className="text-amber-400 font-bold text-sm sm:text-base">PREVENT</p>
                  </div>
                  <p className="text-xs text-white/60">Stop falls with collective protection</p>
                  <p className="text-[10px] text-white/40 mt-1">Guardrails, platforms, scaffolds, MEWPs</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowDown className="h-4 w-4 text-white/30" />
              </div>

              {/* Pyramid Level 3 - MITIGATE (widest) */}
              <div className="flex justify-center">
                <div className="w-[95%] sm:w-[85%] bg-gradient-to-r from-red-500/20 to-red-400/20 border-2 border-red-500/40 rounded-b-2xl p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center">
                      <span className="text-red-400 text-xs font-bold">3</span>
                    </div>
                    <p className="text-red-400 font-bold text-sm sm:text-base">MITIGATE</p>
                  </div>
                  <p className="text-xs text-white/60">Minimise fall distance and consequences</p>
                  <p className="text-[10px] text-white/40 mt-1">Safety nets, airbags, harnesses &amp; lanyards</p>
                  <p className="text-[10px] text-red-400/60 mt-1">LAST RESORT</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
              <p className="text-xs text-white/70">
                <strong className="text-amber-400">Key principle:</strong> Always start at the top of the pyramid. Only move to a lower level if the level above is not reasonably practicable.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: Level 1 — AVOID */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            Level 1 &mdash; Avoid Working at Height
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most effective way to eliminate the risk of a fall is to <strong>not work at
                height at all</strong>. This is the first and highest level of the hierarchy, and
                it should always be considered before any other option. The question to ask is:
                <em> &ldquo;Is there a way to carry out this work without anyone going to
                height?&rdquo;</em>
              </p>

              <p>
                For electricians, there are often more opportunities to avoid working at height
                than you might think. Many tasks can be redesigned, re-sequenced, or completed
                using ground-level techniques and tools.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Practical Avoidance Measures for Electricians</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span><strong className="text-white">Pre-fabrication at ground level</strong> &mdash; assemble cable tray runs, containment sections, and modular wiring systems at ground level and lift them into position as complete units using a crane, hoist, or MEWP. This minimises the time anyone spends at height.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span><strong className="text-white">Extendable tools</strong> &mdash; use telescopic pole systems for testing smoke detectors, changing lamps, and inspecting high-level equipment from ground level. Specialist tools exist for many routine maintenance tasks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span><strong className="text-white">Design changes</strong> &mdash; work with the designer to relocate distribution boards, isolators, and control equipment to accessible heights. Position cable routes at lower levels where feasible. Specify luminaires with ground-level lowering mechanisms (winch systems).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span><strong className="text-white">Pre-wired modular systems</strong> &mdash; specify factory-wired lighting, power, and data systems that plug together rather than requiring termination at height. Systems like plug-and-play modular wiring reduce both time at height and the complexity of work done at height.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span><strong className="text-white">Ground-level access</strong> &mdash; where equipment requires regular maintenance (e.g. luminaire drivers, emergency lighting batteries), specify equipment with ground-level access for the serviceable components.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">CDM 2015 link:</strong> Under CDM 2015,
                  designers have a specific duty to avoid foreseeable risks in their designs. An
                  electrical designer who specifies a cable route that requires extensive work at
                  height, when a lower-level route would be feasible, is failing in their duty.
                  Always challenge designs that create unnecessary work at height.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Level 2 — PREVENT */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            Level 2 &mdash; Prevent Falls
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When working at height cannot be avoided, the next priority is to
                <strong> prevent</strong> falls from occurring. This is achieved through
                <strong> collective protection</strong> &mdash; measures that protect everyone in
                the work area without relying on individual behaviour.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Why Collective Protection First?</p>
                </div>
                <p className="text-sm text-white/80">
                  Regulation 7 of the Work at Height Regulations 2005 requires that collective
                  protection is given priority over personal protection. The reason is
                  straightforward: collective protection works <strong className="text-white">passively
                  and automatically</strong>. A guardrail protects every person who works near that
                  edge, regardless of whether they are wearing a harness, have been trained, or are
                  paying attention. Personal protection depends entirely on the individual &mdash;
                  it must be worn correctly, inspected regularly, and connected to a suitable anchor.
                  Any failure in this chain renders it ineffective.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Collective Protection Equipment</p>
                <div className="space-y-4 text-sm text-white/80">
                  <div>
                    <p className="text-amber-400 font-medium mb-1">Guardrails &amp; Edge Protection</p>
                    <p className="mb-2">The most common form of collective protection. Required at any edge where a person could fall 2 metres or more (or less if there is a particular risk). Must include:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Top rail</strong> at a minimum height of 950mm (ideally 1100mm)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Mid rail</strong> (or suitable infill) to prevent a person falling through the gap</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Toe board</strong> at least 150mm high to prevent tools and materials falling from the edge</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-amber-400 font-medium mb-1">Working Platforms</p>
                    <p className="mb-2">A stable, level surface from which work at height is carried out. Must be:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Wide enough for the work being carried out (minimum 600mm for passage, wider for work)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Surrounded by guardrails and toe boards at any open edge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Free from tripping hazards and not overloaded beyond its rated capacity</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-amber-400 font-medium mb-1">Scaffolds</p>
                    <p className="mb-2">Fixed scaffolds, mobile tower scaffolds, and system scaffolds all provide working platforms with edge protection:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Fixed scaffolding</strong> &mdash; erected by trained scaffolders, inspected before use and at 7-day intervals (or after adverse weather). Must display a scaffold inspection tag.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Mobile tower scaffolds</strong> &mdash; must be erected and used by persons with PASMA training. Outriggers/stabilisers must be deployed. Never move a tower with anyone on it.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Podium steps</strong> &mdash; a low-level enclosed platform with guardrails, ideal for short-duration electrician tasks up to approximately 2.5m working height.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-amber-400 font-medium mb-1">MEWPs (Mobile Elevating Work Platforms)</p>
                    <p className="mb-2">Include cherry pickers (boom lifts), scissor lifts, and truck-mounted platforms:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Operators must hold IPAF or equivalent certification for the category of MEWP</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>MEWPs must be thoroughly examined under LOLER 1998 every 6 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Ground conditions must be firm, level, and able to support the machine&rsquo;s weight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>A harness must be worn inside a boom-type MEWP (to prevent ejection); not typically required in scissor lifts unless specified by the risk assessment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Level 3 — MITIGATE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Level 3 &mdash; Mitigate Falls
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The third and final level of the hierarchy applies when working at height cannot
                be avoided and falls cannot be entirely prevented. In this case, the goal is to
                <strong> minimise the distance and consequences</strong> of any fall that does
                occur. This is mitigation &mdash; accepting that a fall may happen and ensuring
                that the outcome is as least harmful as possible.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Mitigation Is the Last Resort</p>
                </div>
                <p className="text-sm text-white/80">
                  Mitigation measures — including harnesses, safety nets, and airbags — are the
                  <strong className="text-white"> least preferred option</strong> in the hierarchy.
                  They do not prevent the fall; they only reduce its consequences. They should
                  only be used when avoidance and prevention are not reasonably practicable, and
                  they must always be accompanied by a <strong className="text-white">rescue
                  plan</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mitigation Equipment</p>
                <div className="space-y-4 text-sm text-white/80">
                  <div>
                    <p className="text-red-400 font-medium mb-1">Safety Nets (Collective Mitigation)</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Positioned below the work area to catch falling workers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Must be installed as close as possible below the work level (maximum 2 metres recommended)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Must be installed and inspected by competent persons to BS EN 1263</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Preferred over personal fall protection because they protect everyone (collective measure)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-red-400 font-medium mb-1">Soft Landing Systems / Airbags</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Inflatable airbag systems or bean-bag-style soft landing systems positioned below the work area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Useful for low-level work (typically up to 3-4 metres) where nets are not practical</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Must not be used as a substitute for guardrails where guardrails are reasonably practicable</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-red-400 font-medium mb-1">Personal Fall Protection (Harnesses, Lanyards, SRLs)</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Full body harness</strong> (BS EN 361) with dorsal attachment point &mdash; distributes arrest forces across the body</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Energy-absorbing lanyard</strong> (BS EN 354/355) &mdash; limits arrest force to a maximum of 6 kN</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Self-retracting lifeline (SRL)</strong> (BS EN 360) &mdash; automatically takes up slack and locks in a fall</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong className="text-white">Anchor point</strong> (BS EN 795) &mdash; must be rated for at least 12 kN and positioned to minimise fall distance and avoid a pendulum swing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Fall Distance Calculation</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  When using a harness and energy-absorbing lanyard, you must calculate the
                  <strong className="text-white"> total fall distance</strong> to ensure there is
                  sufficient clearance below the anchor point. The total fall distance includes:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Lanyard length:</strong> up to 2.0 metres</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Energy absorber deployment:</strong> up to 1.75 metres</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Harness stretch:</strong> approximately 0.5 metres</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Height of person below D-ring:</strong> approximately 1.5 metres</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Safety clearance:</strong> minimum 1.0 metre</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 mt-2">
                    <p className="text-amber-400 font-semibold">Total minimum clearance: approximately 6.75 metres</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-2">
                  If the clearance below the anchor point is less than this, an SRL (self-retracting lifeline) may reduce the required clearance. Always calculate before use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Rescue Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            Rescue Planning
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every work at height plan that involves the use of personal fall protection must
                include a <strong>rescue plan</strong>. This is not optional &mdash; it is a
                requirement of Regulation 4 of the Work at Height Regulations 2005. The rescue
                plan must ensure that a fallen worker can be reached, stabilised, and lowered to
                safety within <strong>minutes</strong>, not hours.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Suspension Trauma Warning</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  <strong className="text-white">Suspension trauma</strong> (also called harness
                  hang syndrome or orthostatic intolerance) is a life-threatening condition that
                  can develop when a person hangs motionless in a harness after a fall arrest.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>The leg straps of the harness compress the femoral veins in the thighs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Blood pools in the legs and cannot return to the heart</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Loss of consciousness can occur within <strong className="text-white">5&ndash;15 minutes</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Death can follow within <strong className="text-white">15&ndash;30 minutes</strong> if not rescued</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Even after rescue, rapid lowering to a flat position can cause cardiac arrest (reflow syndrome)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Rescue Plan Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Rescue method</strong> &mdash; how will a suspended worker be reached? Options include a MEWP, a rescue winch system, a trained rescue team on standby, or a self-rescue device.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Rescue equipment</strong> &mdash; is all necessary rescue equipment available on site, in working order, and accessible?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Trained personnel</strong> &mdash; who on site is trained in the rescue procedure? Is there always at least one trained rescuer present while work at height is ongoing?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Time to rescue</strong> &mdash; can the rescue be completed within minutes? The target should be to begin rescue within 5 minutes and complete it within 15 minutes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Emergency services</strong> &mdash; is the work area accessible to the emergency services? Have they been notified if the location is remote or difficult to access?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Post-rescue care</strong> &mdash; do rescuers know to place the casualty in a semi-seated position (not flat) to prevent reflow syndrome?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">Critical rule:</strong> If you cannot
                  demonstrate a credible rescue plan that will reach a suspended worker within
                  minutes, <strong>you must not use a harness-based fall arrest system</strong>.
                  Calling 999 is not a rescue plan &mdash; emergency services cannot guarantee
                  reaching a suspended worker within the critical timeframe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Practical Decision Making for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Practical Decision Making for Electricians
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Putting the hierarchy into practice requires making informed decisions about each
                task. The following table provides guidance for common electrician tasks, showing
                the preferred access method at each level of the hierarchy.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-x-auto">
                <p className="text-sm font-medium text-white mb-3">Equipment Selection Guide</p>
                <div className="min-w-[500px]">
                  <div className="grid grid-cols-4 gap-1 text-xs">
                    {/* Header */}
                    <div className="p-2 bg-white/5 rounded font-medium text-white">Task</div>
                    <div className="p-2 bg-green-500/10 rounded font-medium text-green-400">Avoid?</div>
                    <div className="p-2 bg-amber-500/10 rounded font-medium text-amber-400">Prevent</div>
                    <div className="p-2 bg-red-500/10 rounded font-medium text-red-400">Mitigate</div>

                    {/* Row 1 */}
                    <div className="p-2 bg-white/5 rounded text-white/80">Lamp replacement (office)</div>
                    <div className="p-2 bg-green-500/5 rounded text-white/60">Lowering winch luminaire</div>
                    <div className="p-2 bg-amber-500/5 rounded text-white/60">Podium step / tower scaffold</div>
                    <div className="p-2 bg-red-500/5 rounded text-white/60">N/A for short task</div>

                    {/* Row 2 */}
                    <div className="p-2 bg-white/5 rounded text-white/80">Cable tray at 4m (warehouse)</div>
                    <div className="p-2 bg-green-500/5 rounded text-white/60">Pre-fab at ground, lift into position</div>
                    <div className="p-2 bg-amber-500/5 rounded text-white/60">Scissor lift MEWP or tower scaffold</div>
                    <div className="p-2 bg-red-500/5 rounded text-white/60">Harness if MEWP not feasible</div>

                    {/* Row 3 */}
                    <div className="p-2 bg-white/5 rounded text-white/80">Rooftop plant room wiring</div>
                    <div className="p-2 bg-green-500/5 rounded text-white/60">Route cables internally where possible</div>
                    <div className="p-2 bg-amber-500/5 rounded text-white/60">Guardrails at roof edge, scaffold access</div>
                    <div className="p-2 bg-red-500/5 rounded text-white/60">Harness to roof anchor during access</div>

                    {/* Row 4 */}
                    <div className="p-2 bg-white/5 rounded text-white/80">Solar PV array wiring</div>
                    <div className="p-2 bg-green-500/5 rounded text-white/60">Pre-wire at ground level</div>
                    <div className="p-2 bg-amber-500/5 rounded text-white/60">Edge protection + walkway system</div>
                    <div className="p-2 bg-red-500/5 rounded text-white/60">Harness + SRL to ridge anchor</div>

                    {/* Row 5 */}
                    <div className="p-2 bg-white/5 rounded text-white/80">Smoke detector test</div>
                    <div className="p-2 bg-green-500/5 rounded text-white/60">Telescopic test pole from ground</div>
                    <div className="p-2 bg-amber-500/5 rounded text-white/60">N/A if telescopic pole used</div>
                    <div className="p-2 bg-red-500/5 rounded text-white/60">N/A</div>
                  </div>
                </div>
                <p className="text-[10px] text-white/40 mt-2 sm:hidden">&larr; Scroll to view full table &rarr;</p>
              </div>

              <p>
                The key message is that the hierarchy is not just a theoretical framework &mdash;
                it is a practical decision-making tool that must be applied to every task, every
                day. Before you reach for a ladder, ask yourself: <em>&ldquo;Can this work be
                done without going to height? If not, what is the safest way to prevent a
                fall?&rdquo;</em>
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">When Ladders Are Acceptable</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Ladders remain a common and sometimes appropriate piece of work at height
                  equipment, but only when the risk assessment confirms that:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>The task is <strong className="text-white">short duration</strong> (typically less than 30 minutes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>The task is <strong className="text-white">light duty</strong> (no heavy loads, no complex work requiring both hands)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Three points of contact can be <strong className="text-white">maintained at all times</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>The ladder can be <strong className="text-white">securely positioned</strong> (tied, footed, or stabilised)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>A more suitable alternative is <strong className="text-white">not reasonably practicable</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Hierarchy:</strong> Avoid &rarr; Prevent &rarr; Mitigate. Always start at the top and only move down when the level above is not reasonably practicable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Avoidance:</strong> Pre-fabrication, extendable tools, design changes, ground-level access, and modular systems can all eliminate work at height.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Prevention:</strong> Collective protection (guardrails, platforms, scaffolds, MEWPs) is always preferred. It protects everyone automatically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Mitigation:</strong> Safety nets, airbags, and harness systems are the last resort. They minimise consequences but do not prevent falls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Rescue:</strong> A credible rescue plan is mandatory whenever harnesses are used. Suspension trauma can kill within 15&ndash;30 minutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Ladders:</strong> Only appropriate for short-duration, light-duty tasks where more suitable equipment is not reasonably practicable.</span>
                </li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">Module 1 Complete:</strong> You have now
                  covered the four core topics of Module 1 &mdash; the definition of working at
                  height, the legal framework, risk assessment, and the hierarchy of controls.
                  In Module 2, we will move on to the practical use of specific equipment:
                  ladders, stepladders, tower scaffolds, and other access equipment that
                  electricians use every day.
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
          title="Section 4 Knowledge Check"
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
            <Link to="../working-at-height-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Risk Assessment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-white hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
