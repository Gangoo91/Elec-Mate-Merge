import { ArrowLeft, Layers, CheckCircle, AlertTriangle, Info, Zap, Building2, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "single-vs-double-width",
    question: "A client needs lighting installed along a 0.9m-wide corridor. Which tower width is appropriate?",
    options: [
      "Double-width (1.35m) — more platform space",
      "Single-width (0.74m) — fits the corridor",
      "Either width would work in this space",
      "Neither — use a ladder instead"
    ],
    correctIndex: 1,
    explanation: "A single-width tower at 0.74m will fit within the 0.9m corridor with clearance either side. A double-width tower at 1.35m physically cannot fit. Always measure the available space before selecting a tower."
  },
  {
    id: "stairway-tower-use",
    question: "You need to install emergency lighting on a staircase ceiling where steps rise 3.5m between landings. What tower type should you use?",
    options: [
      "Standard double-width with packing under the castors",
      "Folding tower placed on the landing",
      "Stairway tower with internal staircase access",
      "Single-width tower turned sideways on the steps"
    ],
    correctIndex: 2,
    explanation: "A stairway tower is specifically designed for use on stairs and slopes. Never pack under castors with timber or bricks — this is extremely dangerous. The stairway tower's adjustable legs allow it to sit level on the steps."
  },
  {
    id: "grp-selection",
    question: "You are replacing a luminaire directly above a live busbar chamber in a switchroom. Which tower material must you use?",
    options: [
      "Standard aluminium — it is lighter and easier to move",
      "GRP (fibreglass) — it is non-conductive",
      "Either material — both are equally safe near electrical equipment",
      "Steel scaffold — it is the strongest option"
    ],
    correctIndex: 1,
    explanation: "GRP (Glass Reinforced Plastic) towers are non-conductive and must be used when working near live electrical equipment. An aluminium tower could become energised if it contacts a live conductor, creating a fatal shock hazard."
  }
];

const faqs = [
  {
    question: "What is the difference between a linked tower and a bridge tower?",
    answer: "A linked tower consists of two or more standard towers joined together side by side with linking braces to create a wider working area. A bridge tower uses two separate towers with a bridging platform spanning the gap between them, allowing work to be carried out over an obstruction such as machinery, a roadway, or pipework. Both require specific manufacturer guidance for assembly."
  },
  {
    question: "Can I use an aluminium tower in light rain?",
    answer: "Aluminium towers can be used in light rain, but you must assess the risks carefully. Wet platforms become slippery — consider using non-slip platform decks. The main concern with aluminium in wet conditions is not conductivity (rain alone does not make the tower electrically dangerous) but rather reduced grip and visibility. If conditions worsen, cease work and descend safely."
  },
  {
    question: "Are folding towers as safe as full-height towers?",
    answer: "Yes, provided they are used correctly and within their design limits. Folding towers must comply with the same Work at Height Regulations 2005 as full-height towers. They must have guardrails, toeboards, and a stable base. The key difference is their lower maximum platform height (typically up to 2.5m). Always follow the manufacturer's assembly instructions."
  },
  {
    question: "How do I know which tower configuration is right for the job?",
    answer: "Consider five key factors: (1) the height you need to reach, (2) the available space at ground level, (3) whether electrical hazards are present, (4) the ground conditions (level, sloped, or stepped), and (5) whether the tower will be used indoors or outdoors. Match these factors against tower specifications in the manufacturer's product guide to select the correct configuration."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the approximate platform width of a single-width mobile access tower?",
    options: [
      "0.50 metres",
      "0.74 metres",
      "1.00 metres",
      "1.35 metres"
    ],
    correctAnswer: 1,
    explanation: "Single-width towers have a platform width of approximately 0.74m (740mm). This narrower footprint makes them suitable for confined spaces such as corridors, doorways, and between racking."
  },
  {
    id: 2,
    question: "What is the approximate platform width of a double-width tower?",
    options: [
      "0.74 metres",
      "1.00 metres",
      "1.35 metres",
      "1.80 metres"
    ],
    correctAnswer: 2,
    explanation: "Double-width towers have a platform width of approximately 1.35m (1350mm). The wider platform provides greater stability, more working space, and allows higher build heights than single-width towers."
  },
  {
    id: 3,
    question: "Which tower type uses two or more standard towers connected together with linking braces?",
    options: [
      "Bridge tower",
      "Linked tower",
      "High clearance tower",
      "Cantilever tower"
    ],
    correctAnswer: 1,
    explanation: "A linked tower consists of two or more standard towers joined together with horizontal linking braces. This creates a wider working area and increased structural stability for larger tasks."
  },
  {
    id: 4,
    question: "Why would you choose a GRP tower instead of an aluminium tower?",
    options: [
      "GRP towers are lighter and easier to transport",
      "GRP towers can reach greater heights",
      "GRP towers are non-conductive, safer near live electrical equipment",
      "GRP towers are cheaper to purchase"
    ],
    correctAnswer: 2,
    explanation: "GRP (Glass Reinforced Plastic) towers are non-conductive, making them essential when working near live electrical installations. Aluminium towers conduct electricity and must never be used where contact with live conductors is possible."
  },
  {
    id: 5,
    question: "What is a key advantage of a stairway tower over a standard tower?",
    options: [
      "It can reach greater heights",
      "It provides internal staircase access instead of ladder climbing",
      "It does not require guardrails",
      "It is lighter than a standard tower"
    ],
    correctAnswer: 1,
    explanation: "Stairway towers provide internal staircase access, making it easier and safer to ascend and descend. This reduces fatigue, allows materials to be carried more easily, and is particularly beneficial for frequent access or when operatives have limited mobility."
  },
  {
    id: 6,
    question: "A high clearance tower is characterised by which feature?",
    options: [
      "A wider platform than standard towers",
      "A raised base height to clear obstructions at ground level",
      "Non-conductive materials throughout",
      "Internal staircase access to the platform"
    ],
    correctAnswer: 1,
    explanation: "High clearance towers have a raised base section, allowing the tower to straddle obstructions such as machinery, conveyors, or workbenches at ground level. The working platform is positioned above these obstructions."
  },
  {
    id: 7,
    question: "What is the typical maximum platform height of a folding or pop-up tower?",
    options: [
      "1.0 metres",
      "2.0 to 2.5 metres",
      "5.0 metres",
      "8.0 metres"
    ],
    correctAnswer: 1,
    explanation: "Folding and pop-up towers are designed for low-level work, with typical maximum platform heights of 2.0m to 2.5m. They are compact, quick to set up, and ideal for tasks where a full-height tower would be impractical."
  },
  {
    id: 8,
    question: "When selecting a tower type, which factor determines whether you need a GRP tower rather than aluminium?",
    options: [
      "The height of the work",
      "Whether the tower will be used indoors or outdoors",
      "The proximity of live electrical conductors or equipment",
      "The weight of materials to be carried on the platform"
    ],
    correctAnswer: 2,
    explanation: "The proximity of live electrical equipment is the determining factor. If there is any risk of the tower contacting live conductors, a non-conductive GRP tower must be used. Aluminium conducts electricity and could create a fatal shock hazard."
  }
];

const PasmaModule2Section1 = () => {
  useSEO({
    title: "Tower Classifications | PASMA Module 2.1",
    description: "Learn about tower classifications including standard, specialist, stairway, GRP, and folding towers. Understand when to use each type for safe working at height.",
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
            <Layers className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-block bg-elec-yellow/10 border border-elec-yellow/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-elec-yellow">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Tower Classifications
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Understanding the different tower types, configurations, and materials — and knowing which to select for each task
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Standard towers:</strong> single-width (0.74m) or double-width (1.35m)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Specialist:</strong> linked, bridge, high clearance, stairway</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Material:</strong> aluminium (common) or GRP (non-conductive)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Folding/low-level:</strong> quick deploy, under 2.5m platform height</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Assess:</strong> task height, duration, location, ground conditions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Select:</strong> correct width, configuration, and material</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Verify:</strong> tower rated for intended use and load</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span><strong className="text-white">Document:</strong> record selection rationale in method statement</span>
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
              "Identify and describe the main tower classifications used on UK sites",
              "Explain the differences between single-width and double-width towers",
              "Describe specialist configurations including linked, bridge, and high clearance towers",
              "State the advantages of stairway towers over ladder-access towers",
              "Compare aluminium and GRP towers and explain when each must be used",
              "Recognise when a folding or low-level tower is the most appropriate choice"
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Overview of Tower Types */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Overview of Tower Types
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Mobile access towers come in many configurations, each designed for specific working conditions and tasks.
                Choosing the right type is not just a matter of convenience — it is a fundamental safety decision. Using
                the wrong tower type can lead to instability, restricted access, inefficient working, and in the worst
                cases, collapse or falls from height.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition: Mobile Access Tower</h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">mobile access tower</strong> is a freestanding, lightweight scaffold
                  structure mounted on castors or base plates, designed to provide temporary access for working at height.
                  Towers are assembled from prefabricated components and comply with BS EN 1004-1:2020. They must only
                  be erected, altered, or dismantled by trained and competent persons.
                </p>
              </div>

              <p>
                Tower classifications can be broadly divided by <strong className="text-white">width</strong> (single or double),
                <strong className="text-white"> configuration</strong> (standard, linked, bridge, stairway, high clearance),
                <strong className="text-white"> material</strong> (aluminium or GRP), and
                <strong className="text-white"> deployment type</strong> (modular or folding). Understanding these categories
                helps you make informed selections during planning and risk assessment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Tower Classification Summary</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">By Width</p>
                    <ul className="space-y-1 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Single-width: 0.74m platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Double-width: 1.35m platform</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">By Material</p>
                    <ul className="space-y-1 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Aluminium: lightweight, conductive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>GRP: heavier, non-conductive</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">By Configuration</p>
                    <ul className="space-y-1 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Standard, linked, bridge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>High clearance, cantilever, room</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">By Deployment</p>
                    <ul className="space-y-1 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Modular (component assembly)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Folding / pop-up (pre-assembled)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Standard Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Standard Towers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Standard mobile access towers are the workhorses of the industry. They are the most commonly encountered
                type on construction sites, in maintenance operations, and across commercial and industrial buildings.
                Standard towers come in two width options: <strong className="text-white">single-width</strong> and
                <strong className="text-white"> double-width</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2">Single-Width (0.74m Platform)</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Platform width approximately 0.74m (740mm)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Fits through standard doorways without dismantling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Ideal for corridors, between racking, narrow spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Lower maximum freestanding height than double-width</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Generally suits one operative on the platform</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-medium mb-2">Double-Width (1.35m Platform)</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Platform width approximately 1.35m (1350mm)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Nearly double the working area of single-width</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Accommodates two operatives and materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Greater stability — higher maximum freestanding height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                      <span>Best for open areas, external work, longer-duration tasks</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Height Limitations by Width</h3>
                <p className="text-white/70 text-sm mb-3">
                  Maximum permissible heights vary by manufacturer, but typical limits for standard configurations are:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Single-Width Indoors</p>
                    <p className="text-white/60">Up to approx. 6.2m platform height</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Single-Width Outdoors</p>
                    <p className="text-white/60">Up to approx. 3.9m platform height</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Double-Width Indoors</p>
                    <p className="text-white/60">Up to approx. 12.2m platform height</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Double-Width Outdoors</p>
                    <p className="text-white/60">Up to approx. 8.2m platform height</p>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-2 italic">
                  These are indicative figures. Always consult the manufacturer's instruction manual for the specific tower system.
                </p>
              </div>

              <p>
                The choice between single-width and double-width should always be based on a practical assessment:
                measure the available space, consider the task requirements, count the number of operatives, and check
                the required platform height. If both widths would physically fit, the double-width tower is generally
                preferred for its greater stability and working area.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Specialist Tower Configurations */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Specialist Tower Configurations
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Beyond standard single and double-width towers, several specialist configurations exist for situations
                where a standard tower cannot safely or efficiently meet the work requirements. These specialist types
                must only be assembled following the manufacturer's specific instructions for that configuration.
              </p>

              <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Linked Towers</h3>
                <p className="text-white/70 text-sm mb-2">
                  Two or more standard towers connected together using horizontal linking braces. This creates a wider
                  working platform spanning both towers. Linked towers are used when a single tower does not provide
                  sufficient platform area — for example, when installing long runs of cable tray or carrying out
                  extensive ceiling work.
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Requires specific linking components from the same manufacturer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Both towers must be the same height and configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Bridging platforms span between the two tower platforms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Bridge Towers</h3>
                <p className="text-white/70 text-sm mb-2">
                  Two towers positioned apart with a bridging section spanning the gap. Unlike linked towers (side by side),
                  bridge towers span an opening — allowing work to be carried out above machinery, doorways, conveyors,
                  or access routes without obstructing the area below.
                </p>
                <ul className="text-white/60 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The bridging section must be designed for the span</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Both supporting towers must be independently stable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maximum span is limited by the manufacturer's specification</span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">High Clearance Towers</h3>
                  <p className="text-white/70 text-sm mb-2">
                    Feature a raised base section that elevates the entire tower above ground-level obstructions.
                    The base frame is taller than standard, allowing the tower to straddle machinery, workbenches,
                    or other fixed equipment.
                  </p>
                  <p className="text-white/50 text-xs italic">
                    Often used in manufacturing environments where production equipment cannot be moved.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">Room Scaffolds</h3>
                  <p className="text-white/70 text-sm mb-2">
                    A low-level platform system that spans an entire room, providing full-area access at a uniform
                    height. Used for ceiling work across large areas — painting, installing lighting grids, or
                    fitting cable containment systems.
                  </p>
                  <p className="text-white/50 text-xs italic">
                    Essentially multiple linked towers covering the full floor area.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Cantilever Towers</h3>
                <p className="text-white/70 text-sm">
                  A cantilever tower extends the working platform beyond the base footprint of the tower. This allows
                  work to be carried out over an obstruction at ground level — for example, reaching over a parapet wall
                  or working above a fixed structure. Cantilever sections must be factory-designed for the specific tower
                  system and are subject to strict load limitations. Counterweighting or tie-in may be required to
                  prevent overturning.
                </p>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Critical Rule</h3>
                </div>
                <p className="text-white/70 text-sm">
                  All specialist configurations must be assembled strictly in accordance with the manufacturer's
                  instructions. Do not attempt to improvise specialist setups using standard components. Each
                  configuration has specific structural requirements, bracing patterns, and load ratings that
                  differ from a standard tower build.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Stairway Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Stairway Towers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Stairway towers (also called staircase towers) provide <strong className="text-white">internal staircase
                access</strong> instead of the standard ladder-climb through end frames. The operative ascends and descends
                via a built-in stairway within the tower structure, making access significantly easier and safer —
                particularly for frequent trips up and down, or when carrying tools and materials.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition: Stairway Tower</h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">stairway tower</strong> is a mobile access tower incorporating internal
                  staircase flights between levels instead of ladder access via end frames. The staircases are typically
                  positioned alternately on each level, with intermediate platforms at each turn. Stairway towers have
                  a larger footprint than standard towers of the same platform height.
                </p>
              </div>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">Benefits of Stairway Access</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Easier access:</strong> Walking up stairs is significantly less physically demanding than climbing vertical ladder rungs, especially repeatedly over a working day.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Material carrying:</strong> Operatives can carry tools and lightweight materials up the stairs using both hands for balance, rather than needing one hand free for ladder climbing.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Reduced fatigue:</strong> Less physical effort per ascent/descent means reduced fatigue over the working day — lowering the risk of accidents caused by tiredness.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong className="text-white">Accessibility:</strong> Stairway access may be specified in the risk assessment where operatives have mobility limitations or where the task requires frequent platform access.</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">When Stairway Towers Are Required</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The risk assessment identifies frequent ascent/descent (more than a few times per hour)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Operatives need to carry tools or materials to the platform regularly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The tower will be in use for extended periods (full-day or multi-day tasks)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Operative fitness or mobility constraints make ladder climbing impractical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Client or principal contractor requirements specify stairway access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The platform height exceeds 6m (some organisations mandate stairway access above this height)</span>
                  </li>
                </ul>
              </div>

              <p>
                The trade-off with stairway towers is their larger base footprint. The internal staircase sections
                increase the overall width and length of the tower compared to a standard ladder-access tower of the
                same platform height. Ensure you have sufficient ground space before specifying a stairway tower.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Aluminium vs GRP Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Aluminium vs GRP Towers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The two principal materials used for mobile access tower construction are <strong className="text-white">aluminium
                alloy</strong> and <strong className="text-white">GRP (Glass Reinforced Plastic)</strong>. The choice between
                them is primarily driven by the presence or absence of electrical hazards in the working environment.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                  <h3 className="text-cyan-300 font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Aluminium Towers
                  </h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Lightweight:</strong> Easy to transport and handle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Strong:</strong> High strength-to-weight ratio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Corrosion resistant:</strong> Natural oxide layer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Most common:</strong> ~90% of towers in use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Conductive:</strong> Conducts electricity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Cost:</strong> Less expensive than GRP</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                  <h3 className="text-cyan-300 font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    GRP (Fibreglass) Towers
                  </h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Non-conductive:</strong> Does not conduct electricity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Heavier:</strong> 30–50% heavier than aluminium</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">UV sensitive:</strong> Store under cover when not in use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Specialist use:</strong> Near live electrical equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Maintenance:</strong> Must be kept clean and dry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Cost:</strong> More expensive than aluminium</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-x-auto">
                <h3 className="text-elec-yellow font-medium mb-3">Comparison Table</h3>
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-white/60 pb-2 pr-4 font-medium">Property</th>
                      <th className="text-white/60 pb-2 pr-4 font-medium">Aluminium</th>
                      <th className="text-white/60 pb-2 font-medium">GRP</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Weight</td>
                      <td className="py-2 pr-4 text-green-400">Lighter</td>
                      <td className="py-2">30–50% heavier</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Conductivity</td>
                      <td className="py-2 pr-4 text-red-400">Conductive</td>
                      <td className="py-2 text-green-400">Non-conductive</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Corrosion</td>
                      <td className="py-2 pr-4 text-green-400">Resistant</td>
                      <td className="py-2 text-green-400">Resistant</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">UV Resistance</td>
                      <td className="py-2 pr-4 text-green-400">Good</td>
                      <td className="py-2 text-amber-400">Degrades — store under cover</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4">Cost</td>
                      <td className="py-2 pr-4 text-green-400">Lower</td>
                      <td className="py-2 text-amber-400">Higher</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Primary Use</td>
                      <td className="py-2 pr-4">General access</td>
                      <td className="py-2">Near live electrical equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">GRP Maintenance Warning</h3>
                </div>
                <p className="text-white/70 text-sm">
                  A GRP tower's non-conductive properties can be compromised by contamination. Metal filings, wet grime,
                  or conductive coatings on the surface can create a conductive path. Always inspect and clean GRP
                  components before use, and never assume a dirty GRP tower is non-conductive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Folding & Low-Level Towers */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Folding & Low-Level Towers
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Folding towers (also called pop-up towers) and low-level platforms fill the gap between stepladders and
                full-height mobile access towers. They provide a safer, more stable working platform for tasks at modest
                heights — typically up to 2.5m platform height.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">Folding / Pop-Up Towers</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Pre-assembled frame that folds flat for transport</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can typically be erected by one person in minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Platform height usually 1.5m to 2.5m</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fold-out or clip-on guardrails provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fitted with braked castors for repositioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ideal for repetitive short-duration tasks</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-medium mb-2">Low-Level Platforms</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Simple, robust platforms with integrated steps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Platform height typically 0.5m to 1.0m</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Guardrails may not be required at very low heights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Often under 15kg for easy portability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Comply with BS 8620:2022 (low-level work platforms)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Excellent for repetitive just-out-of-reach tasks</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition: Podium Step</h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">podium step</strong> (or podium platform) is a low-level access platform
                  with a large working platform, enclosed guardrails, and integrated steps. It is designed as a safer
                  alternative to stepladders for short-duration tasks at low heights. Unlike a mobile access tower, a
                  podium step has a fixed height and cannot be extended. Podium steps comply with BS 8620:2022.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Podium Steps vs Towers — When to Use Each</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Choose a Podium Step When:</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Platform height under 1m is sufficient</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Task is short (minutes, not hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Frequent repositioning is needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Storage space is limited</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Choose a Tower When:</p>
                    <ul className="text-white/60 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Platform height over 1m is required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Task is longer duration (hours)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Multiple tools/materials needed on platform</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Greater stability is required</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Folding and low-level towers are subject to the same Work at Height Regulations 2005 as full-height
                towers. Even at modest heights, falls can cause serious injury. Always ensure guardrails, toeboards,
                and stable bases are in place, and follow the manufacturer's assembly instructions.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Selecting the Right Tower Type */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Selecting the Right Tower Type
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Selecting the correct tower type is a critical planning decision. The wrong choice can create serious
                hazards, compromise work quality, and lead to costly delays. A systematic approach ensures you arrive
                on site with the right equipment every time.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">Decision Factors</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Ruler className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Height Required</p>
                      <p className="text-white/60">Working height = platform height + 2m reach. Calculate the platform height needed, then check which tower types and widths can achieve it.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Indoor or Outdoor</p>
                      <p className="text-white/60">Indoor towers can typically be built higher (no wind loading). Outdoor towers have reduced maximum heights and may need stabilisers or outriggers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Electrical Hazards</p>
                      <p className="text-white/60">If any risk of contact with live conductors exists, a GRP tower is mandatory. No exceptions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Selection Flowchart (Text)</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <p className="text-white font-medium">Step 1: Determine the working height required</p>
                  <p className="pl-4">&#8594; Under 2.5m? Consider folding tower or podium step</p>
                  <p className="pl-4">&#8594; Over 2.5m? Standard or specialist tower needed</p>

                  <p className="text-white font-medium mt-3">Step 2: Check for electrical hazards</p>
                  <p className="pl-4">&#8594; Live equipment nearby? GRP tower required</p>
                  <p className="pl-4">&#8594; No electrical hazard? Aluminium tower acceptable</p>

                  <p className="text-white font-medium mt-3">Step 3: Assess the ground conditions</p>
                  <p className="pl-4">&#8594; Level, firm ground? Standard tower with castors or base plates</p>
                  <p className="pl-4">&#8594; Steps or slope? Stairwell tower with adjustable legs</p>

                  <p className="text-white font-medium mt-3">Step 4: Measure the available space</p>
                  <p className="pl-4">&#8594; Under 1.0m wide? Single-width tower</p>
                  <p className="pl-4">&#8594; Over 1.5m wide? Double-width preferred for stability</p>

                  <p className="text-white font-medium mt-3">Step 5: Consider access requirements</p>
                  <p className="pl-4">&#8594; Frequent trips, heavy tools? Stairway tower</p>
                  <p className="pl-4">&#8594; Span over obstruction? Bridge or high clearance tower</p>
                  <p className="pl-4">&#8594; Large ceiling area? Linked towers or room scaffold</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Quick Reference by Task</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Office ceiling work:</strong> Folding tower or double-width standard</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Corridor lighting:</strong> Single-width aluminium</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Switchroom cable tray:</strong> GRP single or double-width</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Staircase emergency lighting:</strong> Stairwell tower</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Warehouse high-bay lighting:</strong> Double-width with stairway access</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div className="text-white/70"><strong className="text-white">Over production line:</strong> Bridge tower or high clearance</div>
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
            title="Section 1 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../pasma-module-2-section-2">
              Next: Structural Components
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PasmaModule2Section1;
