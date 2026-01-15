import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
  Zap,
  Hammer,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "vde-importance",
    question: "Why is it important to use insulated screwdrivers in electrical work?",
    options: [
      "To improve grip",
      "To ensure insulation against electric shock",
      "To make them lighter",
    ],
    correctIndex: 1,
    explanation:
      "VDE-rated screwdrivers are tested to 1,000V and provide essential protection against electric shock when working on or near live electrical equipment.",
  },
  {
    id: "long-nose-pliers",
    question: "Which type of pliers would you use to grip small components in a tight space?",
    options: [
      "Combination pliers",
      "Long-nose pliers",
      "Water pump pliers",
    ],
    correctIndex: 1,
    explanation:
      "Long-nose pliers have a narrow, elongated jaw design that makes them ideal for reaching into confined spaces and gripping small components precisely.",
  },
  {
    id: "wrong-screwdriver",
    question: "Name one reason why using the wrong size screwdriver can cause problems.",
    options: [
      "It damages the screw head or tool",
      "It makes work faster",
      "It improves electrical connections",
    ],
    correctIndex: 0,
    explanation:
      "Using the wrong size screwdriver can strip screw heads, damage the tool tip, or result in poor connections that could fail or overheat.",
  },
  {
    id: "cable-protection",
    question: "What should be installed at entry points to protect cable insulation?",
    options: [
      "Insulation tape",
      "Grommets or bushes",
      "Paint",
    ],
    correctIndex: 1,
    explanation:
      "Grommets or bushes provide a smooth, protective surface that prevents sharp edges from cutting through cable insulation during installation or movement.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why should screwdrivers used in electrical work be VDE-rated?",
    options: [
      "To improve grip",
      "To ensure insulation against electric shock",
      "To make them lighter",
      "To meet aesthetic standards",
    ],
    correctAnswer: 1,
    explanation:
      "VDE-rated screwdrivers are tested to 1,000V and provide essential protection against electric shock when working on live electrical equipment.",
  },
  {
    id: 2,
    question: "Which tool is used for stripping insulation from conductors without damaging them?",
    options: [
      "Pliers",
      "Screwdriver",
      "Cable strippers",
      "Hacksaw",
    ],
    correctAnswer: 2,
    explanation:
      "Cable strippers are specifically designed to remove insulation cleanly without cutting into or damaging the copper conductors underneath.",
  },
  {
    id: 3,
    question: "True or False: Side cutters are suitable for cutting steel wire armour.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Side cutters are designed for small conductors. Steel wire armour requires specialist SWA cutters or hacksaws to avoid tool damage.",
  },
  {
    id: 4,
    question: "Name one type of screwdriver head commonly used in electrical work.",
    options: [
      "Robertson",
      "Slotted",
      "Hex",
      "Star",
    ],
    correctAnswer: 1,
    explanation:
      "Slotted screwdrivers are one of the most common types used in electrical work, along with Phillips, Pozidriv, and Torx for various screw heads.",
  },
  {
    id: 5,
    question: "Which pliers are best for reaching into confined spaces?",
    options: [
      "Combination pliers",
      "Long-nose pliers",
      "Water pump pliers",
      "Ratchet pliers",
    ],
    correctAnswer: 1,
    explanation:
      "Long-nose pliers have a narrow, elongated design that makes them ideal for precision work in tight spaces and gripping small components.",
  },
  {
    id: 6,
    question: "Give one reason for keeping plier jaws clean.",
    options: [
      "To maintain a strong grip and prevent slipping",
      "To improve appearance",
      "To reduce weight",
      "To prevent rust",
    ],
    correctAnswer: 0,
    explanation:
      "Clean plier jaws provide better grip on components, preventing slipping that could cause damage to work or injury to the user.",
  },
  {
    id: 7,
    question: "What should be used to cut larger power cables cleanly?",
    options: [
      "Ratchet cable cutters",
      "Long-nose pliers",
      "Adjustable spanner",
      "Knife",
    ],
    correctAnswer: 0,
    explanation:
      "Ratchet cable cutters provide the leverage needed to cut through larger power cables cleanly without crushing or distorting the conductors.",
  },
  {
    id: 8,
    question: "Name one measuring tool commonly used in electrical installations.",
    options: [
      "Compass",
      "Tape measure",
      "Protractor",
      "Caliper",
    ],
    correctAnswer: 1,
    explanation:
      "Tape measures are essential for accurate layout work, measuring cable runs, and ensuring proper spacing in electrical installations.",
  },
];

const Module3Section3_1: React.FC = () => {
  console.log("Module3Section3_1 component loaded");

  useSEO(
    "Essential Hand Tools (Strippers, Cutters, Drivers) – Module 3 (3.3.1)",
    "Complete guide to essential electrical hand tools. Cable strippers, cutters, screwdrivers, pliers and best practices for safe, efficient work."
  );

  const faqs = [
    {
      q: "Can I use one set of cutters for all cable types?",
      a: "No — use cutters designed for the cable type and size. SWA cables require specific tools to avoid damage.",
    },
    {
      q: "How often should I replace my cable strippers?",
      a: "When blades are worn, stripping becomes inconsistent, or the tool no longer grips insulation properly.",
    },
    {
      q: "Are automatic strippers better than manual ones?",
      a: "They are faster and consistent for high-volume work but may not be necessary for small jobs.",
    },
    {
      q: "What's the difference between VDE and standard screwdrivers?",
      a: "VDE screwdrivers are tested to 1,000V and provide insulation against electric shock, essential for electrical work.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 3 - Section 3.3.1</span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white/5">
              <Wrench className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Essential Hand Tools (Strippers, Cutters, Drivers)
          </h1>
          <p className="text-white/70">
            Master the essential hand tools for safe, efficient electrical installation work.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cable strippers: remove insulation cleanly without conductor damage.</li>
                <li>Cable cutters: clean cuts without crushing (ratchet for larger cables).</li>
                <li>VDE screwdrivers: insulated protection up to 1,000V for safe work.</li>
                <li>Pliers: grip, twist, bend - choose type for job (long-nose for tight spaces).</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Red/yellow insulated handles (VDE), adjustable stripper jaws, ratchet mechanisms.
                </li>
                <li>
                  <strong>Use:</strong> Right tool for job size - don't use side cutters on SWA cables.
                </li>
                <li>
                  <strong>Check:</strong> Tool condition, blade sharpness, insulation integrity before each use.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the key hand tools required for electrical installation work.</li>
            <li>Describe their functions and typical uses.</li>
            <li>Apply correct handling techniques to ensure safe and efficient work.</li>
            <li>Recognise the importance of maintaining hand tools in good condition.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content
          </h2>

          {/* Cable Tools */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Scissors className="w-5 h-5" /> Cable Preparation Tools
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Cable Strippers</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Remove insulation from conductors without damage</li>
                        <li>Precise control over strip length</li>
                        <li>Clean cuts with minimal conductor distortion</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Adjustable manual strippers (most common)</li>
                        <li>Automatic strippers for high-volume work</li>
                        <li>Coaxial/data cable strippers for specialist cables</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Best Practice</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Set tool to match insulation thickness exactly</li>
                        <li>Avoid cutting into copper conductors</li>
                        <li>Check stripped end for damage before termination</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Cable Cutters</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose & Function</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Cut cables cleanly without crushing conductors</li>
                        <li>Maintain conductor shape and integrity</li>
                        <li>Prevent fraying of stranded conductors</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Types Available</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Side cutters for small conductors (up to 6mm²)</li>
                        <li>Ratchet cutters for larger cables (up to 50mm²)</li>
                        <li>Specialist SWA cutters for armoured cables</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Best Practice</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Use correct cutter for cable size and type</li>
                        <li>Never use side cutters on steel wire armour</li>
                        <li>Use hacksaw for SWA unless specialist cutter available</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* Hand Tools */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Essential Hand Tools
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Screwdrivers</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">VDE-Rated Requirements</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Insulated to 1,000V for electrical safety</li>
                        <li>Two-layer insulation system with colour coding</li>
                        <li>Regular testing and inspection required</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Common Types</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Slotted (flat blade) - most common in electrical</li>
                        <li>Phillips and Pozidriv for cross-head screws</li>
                        <li>Torx for specialist applications</li>
                        <li>Terminal drivers for small terminals</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Best Practice</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Select correct size/type for screw head</li>
                        <li>Avoid using as levers or chisels</li>
                        <li>Check insulation integrity before each use</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Pliers</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Primary Functions</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Grip components and conductors securely</li>
                        <li>Twist conductors for connections</li>
                        <li>Bend and shape cables and components</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Essential Types</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Combination pliers - general purpose gripping</li>
                        <li>Long-nose pliers - precision work in tight spaces</li>
                        <li>Water pump pliers - gripping conduit fittings</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Best Practice</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Keep jaws clean for maximum grip</li>
                        <li>Don't use in place of proper spanners</li>
                        <li>Choose appropriate size for component</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* Other Essential Tools */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Hammer className="w-5 h-5" /> Other Essential Tools
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Support Tools</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li><strong>Adjustable Spanners:</strong> Tightening cable glands and fixing bolts</li>
                      <li><strong>Hacksaws:</strong> Cutting conduit, trunking, and armoured cables</li>
                      <li><strong>Files:</strong> Smoothing cut edges and removing burrs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Measuring & Marking</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li><strong>Tape Measures:</strong> Accurate layout and cable length measurement</li>
                      <li><strong>Spirit Levels:</strong> Ensuring level installation of equipment</li>
                      <li><strong>Permanent Markers:</strong> Cable identification and equipment labelling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* What this means on site */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <Building className="w-5 h-5" /> What this means on site
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2">Daily Tool Selection</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Check tool condition before starting work - damaged insulation is dangerous</li>
                <li>Carry appropriate tools for the specific job type and cable sizes</li>
                <li>Keep cutting tools sharp for clean, safe cuts that don't damage conductors</li>
                <li>Use only VDE-rated tools when working near or on live electrical systems</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium mb-2">Quality Installation Impact</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper stripping prevents conductor damage that could cause overheating</li>
                <li>Clean cuts ensure good connections and professional appearance</li>
                <li>Correct screwdriver fit prevents terminal damage and ensures secure connections</li>
                <li>Right tool for the job improves efficiency and reduces material waste</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation Practices */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <Settings className="w-5 h-5" /> Installation Practices
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Tool Maintenance</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Clean tools after each use to prevent contamination</li>
                  <li>Store in dry conditions to prevent rust and corrosion</li>
                  <li>Replace worn cutting edges before they affect work quality</li>
                  <li>Test VDE insulation annually or after suspected damage</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">Safe Working Practices</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Never use damaged or non-insulated tools on live circuits</li>
                  <li>Use correct PPE in addition to insulated tools</li>
                  <li>Keep tools organised to prevent loss and damage</li>
                  <li>Don't use tools outside their designed capacity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <AlertTriangle className="w-5 h-5 text-elec-yellow" /> Common Mistakes
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Dangerous Practices</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Using non-VDE tools on live circuits</strong> - Risk of electric shock or electrocution</li>
                <li><strong>Wrong size screwdrivers</strong> - Damages screw heads and reduces connection security</li>
                <li><strong>Side cutters on SWA cables</strong> - Tool damage and poor cuts</li>
                <li><strong>Overstripping conductors</strong> - Exposes copper that can cause short circuits</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Quality Issues</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Blunt cutting tools</strong> - Crush conductors and create poor connections</li>
                <li><strong>Dirty plier jaws</strong> - Poor grip leads to slipping and component damage</li>
                <li><strong>Using pliers as spanners</strong> - Rounds off nuts and damages surfaces</li>
                <li><strong>Poor tool storage</strong> - Leads to damage, rust, and safety hazards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* BS 7671 Context */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            <Shield className="w-5 h-5" /> BS 7671 Context
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <p className="font-medium mb-2">Relevant Sections</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Section 526:</strong> Connection requirements - proper termination techniques</li>
                <li><strong>Section 543:</strong> Protective conductor requirements for earthing continuity</li>
                <li><strong>Appendix 15:</strong> Safety procedures for live working</li>
                <li><strong>Part 6:</strong> Inspection and testing requirements for installations</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="font-medium mb-2">Compliance Points</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>All connections must be mechanically and electrically sound</li>
                <li>Conductor damage during installation can compromise safety</li>
                <li>Proper tools ensure compliance with termination requirements</li>
                <li>VDE tools required for safe working practices near live parts</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Real-world Scenario */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            <Factory className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
            <p className="font-medium mb-2">Scenario: Non-VDE Tool Incident</p>
            <p className="text-sm mb-4">
              An electrician used a non-insulated screwdriver when tightening a live terminal on a lighting circuit.
              A short circuit occurred, damaging the screwdriver tip and causing a minor burn to the electrician's hand.
              The incident would have been avoided with a VDE-rated insulated screwdriver.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-300 mb-1">Prevention Measures</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Always use VDE-rated tools for electrical work</li>
                  <li>Test tool insulation regularly</li>
                  <li>Follow safe isolation procedures</li>
                  <li>Use appropriate PPE</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Consequences Avoided</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Serious electric shock or electrocution</li>
                  <li>Equipment damage and downtime</li>
                  <li>Health and safety investigation</li>
                  <li>Professional reputation damage</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-medium text-white mb-1">{faq.q}</p>
                <p className="text-sm text-white">{faq.a}</p>
                {index < faqs.length - 1 && <div className="mt-4 border-t border-white/10" />}
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Summary
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p>
              Essential hand tools are the backbone of electrical work. Knowing how to select, use, and maintain them
              ensures safe, precise, and efficient installations, while also protecting both the tools and the materials you're working with.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Key Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Safe working with VDE-rated insulated tools</li>
                  <li>Professional quality connections and installations</li>
                  <li>Efficient work with proper tool selection</li>
                  <li>Reduced material waste and rework</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-elec-yellow mb-2">Essential Points</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Match tool to task - don't compromise on quality</li>
                  <li>Regular maintenance keeps tools safe and effective</li>
                  <li>Proper technique prevents damage and injury</li>
                  <li>Investment in quality tools pays long-term dividends</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Apprentice Do's and Don'ts */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            <Target className="w-5 h-5" /> Apprentice Do's and Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium text-green-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> DO
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Always use VDE-rated tools for electrical work</li>
                <li>Check tool condition before each use</li>
                <li>Select the correct size and type for each task</li>
                <li>Keep tools clean and properly stored</li>
                <li>Replace worn or damaged tools immediately</li>
                <li>Use proper technique to avoid damage</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> DON'T
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Use non-insulated tools on live circuits</li>
                <li>Force wrong-sized tools onto components</li>
                <li>Use damaged or worn cutting tools</li>
                <li>Use pliers in place of proper spanners</li>
                <li>Leave tools exposed to weather or moisture</li>
                <li>Skip safety checks to save time</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pocket Card Quick Reference */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Pocket Card Quick Reference
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Essential Tool Checklist</p>
                <ul className="space-y-1">
                  <li>Cable strippers (adjustable)</li>
                  <li>Side cutters (small cables)</li>
                  <li>Ratchet cutters (large cables)</li>
                  <li>VDE screwdrivers (slotted, Phillips)</li>
                  <li>Long-nose pliers</li>
                  <li>Combination pliers</li>
                  <li>Adjustable spanner</li>
                  <li>Tape measure</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Safety Reminders</p>
                <ul className="space-y-1">
                  <li>VDE = 1,000V insulated protection</li>
                  <li>Check insulation before use</li>
                  <li>Right tool for cable size/type</li>
                  <li>Clean cuts prevent poor connections</li>
                  <li>Maintain tools for safety & efficiency</li>
                  <li>Store tools properly when not in use</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key References */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">13</span>
            Key References
          </h2>
          <div className="text-xs sm:text-sm text-white space-y-2">
            <p><strong>BS 7671:</strong> IET Wiring Regulations (18th Edition)</p>
            <p><strong>GS38:</strong> Electrical test equipment for use by electricians</p>
            <p><strong>HSE Guidance:</strong> Safe working practices with electrical tools</p>
            <p><strong>Tool Standards:</strong> VDE 0682 for insulated hand tools</p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">14</span>
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.3
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-2">
              Next: Power Tools
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section3_1;
