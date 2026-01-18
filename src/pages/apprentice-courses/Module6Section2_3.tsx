import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_3 = () => {
  useSEO(
    "Checking Cable Routes, Depths, and Zones - Level 2 Electrical Installation",
    "Understanding BS 7671 requirements for cable routing, depth requirements, and safe zones in electrical installations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum distance from the top of a wall that a cable can run in a horizontal zone?",
      options: ["100 mm", "150 mm", "200 mm", "250 mm"],
      correctAnswer: 1,
      explanation: "BS 7671 specifies horizontal zones within 150 mm from the top of a wall or above an accessory."
    },
    {
      id: 2,
      question: "True or False: Cables can be run diagonally if concealed in plaster.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - cables must not be run diagonally when concealed. They must follow safe zones."
    },
    {
      id: 3,
      question: "What is the minimum depth for a concealed cable without RCD protection?",
      options: ["30 mm", "40 mm", "50 mm", "More than 50 mm"],
      correctAnswer: 3,
      explanation: "Cables must be buried more than 50 mm deep to avoid requiring additional RCD protection."
    },
    {
      id: 4,
      question: "Give one reason why diagonal runs are unsafe.",
      options: ["They cost more", "They increase the chance of accidental drilling", "They look unprofessional", "They take longer to install"],
      correctAnswer: 1,
      explanation: "Diagonal runs are unsafe because they increase the chance of accidental drilling into cables."
    },
    {
      id: 5,
      question: "Which regulation sets out safe zones for cables?",
      options: ["BS 7671", "Building Regulations", "HSE Guidelines", "IET Guidance"],
      correctAnswer: 0,
      explanation: "BS 7671 (IET Wiring Regulations) sets out the requirements for safe cable zones."
    },
    {
      id: 6,
      question: "What additional protection is required for cables buried less than 50 mm deep?",
      options: ["Extra insulation", "RCD or mechanical protection", "Warning labels", "Deeper burial"],
      correctAnswer: 1,
      explanation: "Cables less than 50 mm deep require RCD protection or mechanical protection like conduit/trunking."
    },
    {
      id: 7,
      question: "Name one tool used to verify cable routes during inspection.",
      options: ["Multimeter", "Cable detector", "Insulation tester", "Earth loop tester"],
      correctAnswer: 1,
      explanation: "Cable detectors are used to locate and verify cable routes during inspections."
    },
    {
      id: 8,
      question: "Where should cables be installed in relation to sockets and switches?",
      options: ["Diagonally from accessories", "Randomly positioned", "Directly above or below in vertical zones", "At 45-degree angles"],
      correctAnswer: 2,
      explanation: "Cables should run directly above or below sockets and switches in vertical zones."
    },
    {
      id: 9,
      question: "What is one common mistake made when installing cable routes?",
      options: ["Using too much cable", "Running cables diagonally", "Installing too many cables", "Using wrong colour cables"],
      correctAnswer: 1,
      explanation: "Running cables diagonally or outside safe zones is a common and dangerous mistake."
    },
    {
      id: 10,
      question: "Why is it important to follow cable zone rules?",
      options: ["To save money", "For aesthetic reasons", "To ensure safety and compliance", "To use less cable"],
      correctAnswer: 2,
      explanation: "Following cable zone rules ensures safety, compliance with BS 7671, and reduces future risks of damage."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.2.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Checking Cable Routes, Depths, and Zones
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding BS 7671 requirements for cable routing, depth requirements, and safe zones
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">Quick Reference</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <p className="font-medium text-white mb-1">In 30 Seconds</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Safe zones: horizontal within 150mm of top, vertical above/below accessories</li>
                  <li>Depth requirements: &gt;50mm without RCD, ≤50mm needs protection</li>
                  <li>Route violations: diagonal runs, cables outside zones</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spot it / Use it</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> Diagonal cables, shallow runs, missing protection</li>
                  <li><strong>Use:</strong> Cable detectors, as-built drawings, depth measurements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Cables must be installed in specific zones, depths, and routes to ensure both safety and compliance with BS 7671. Incorrect routing can make future work hazardous, increase the chance of mechanical damage, and lead to non-compliance.
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Identify permitted cable zones in walls, floors, and ceilings</li>
              <li>Understand depth requirements for concealed cables</li>
              <li>Recognise risks of installing cables outside recognised zones</li>
              <li>Apply BS 7671 rules for safe routing of cables</li>
              <li>Inspect and verify cable runs against design and site drawings</li>
            </ul>
          </section>

          {/* Cable Zones */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Cable Zones (BS 7671 Guidance)
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                BS 7671 defines specific safe zones where cables can be installed to ensure predictable routing and prevent accidental damage during future work.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Horizontal Zones:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Within 150 mm from the top of a wall or ceiling</li>
                  <li>Within 150 mm above or below any accessory</li>
                  <li>Must run parallel to wall edges</li>
                  <li>No diagonal runs permitted in concealed installations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Vertical Zones:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Directly above or below electrical accessories</li>
                  <li>Within 150 mm either side of corners or openings</li>
                  <li>Must run straight up or down from accessory position</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Prohibited Areas:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Diagonal runs in concealed installations</li>
                  <li>Random positions not related to accessories</li>
                  <li>Routes through areas subject to heavy mechanical stress</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="cable-zones-check"
                question="What is the maximum distance from the top of a wall for horizontal cable zones?"
                options={["100 mm", "150 mm", "200 mm", "250 mm"]}
                correctIndex={1}
                explanation="Horizontal zones extend up to 150 mm from the top of a wall or above accessories as specified in BS 7671."
              />
            </div>
          </section>

          {/* Depth Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Depth Requirements
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Cable burial depth affects the level of protection required against mechanical damage from drilling, nailing, or other penetration.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Shallow Installation (≤50 mm):</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Requires 30 mA RCD protection as minimum</li>
                  <li>Steel conduit or trunking provides mechanical protection</li>
                  <li>Warning tape installation recommended</li>
                  <li>Higher risk of accidental penetration by fixings</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Deep Installation (&gt;50 mm):</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>RCD protection still recommended as best practice</li>
                  <li>Reduced risk of accidental penetration</li>
                  <li>Documentation of exact routes essential</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Best Practice</p>
                <p className="text-sm">
                  Even when depth requirements are met, RCD protection and mechanical protection provide additional safety margins and should be considered for all installations.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="depth-requirements-check"
                question="What additional protection is required for cables less than 50 mm deep?"
                options={["Extra insulation only", "RCD or mechanical protection", "Warning tape only", "No additional protection needed"]}
                correctIndex={1}
                explanation="Cables less than 50 mm deep require RCD protection or mechanical protection like conduit to guard against accidental penetration."
              />
            </div>
          </section>

          {/* Risks of Incorrect Routing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Risks of Incorrect Routing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Improper cable routing creates safety hazards and compliance issues that can have serious consequences.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-3">Safety Hazards:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Drilling into concealed cables outside safe zones</li>
                  <li>Increased risk of electric shock during future maintenance</li>
                  <li>Fire risk from damaged cables and arc faults</li>
                  <li>Electrocution risk to maintenance workers and occupants</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">Regulatory Issues:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Breach of BS 7671 wiring regulations</li>
                  <li>Non-compliance with Building Regulations Part P</li>
                  <li>Insurance implications for non-compliant installations</li>
                  <li>Legal liability for accidents and incidents</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="routing-risks-check"
                question="What is the main safety risk of cables outside safe zones?"
                options={["Higher installation costs", "Accidental drilling and penetration", "Poor cable performance", "Difficult cable identification"]}
                correctIndex={1}
                explanation="The primary risk is accidental drilling or fixing penetration into concealed cables, which can cause electric shock, fires, and system failures."
              />
            </div>
          </section>

          {/* Inspection Points */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Inspection Points
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Route Verification:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Compare installed routes against approved drawings</li>
                  <li>Verify compliance with safe zone requirements</li>
                  <li>Check for unauthorised deviations from design</li>
                  <li>Confirm connection points and junction locations</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Depth Measurement:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Use cable detection equipment to locate buried cables</li>
                  <li>Measure burial depths at key points along routes</li>
                  <li>Verify compliance with minimum depth requirements</li>
                  <li>Record measurements for future reference</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Inspection Tools</p>
                <p className="text-sm">
                  Cable detectors, depth gauges, as-built drawings, and RCD testers are essential tools for comprehensive route inspection.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="inspection-tools-check"
                question="Which tool is most important for verifying cable routes during inspection?"
                options={["Multimeter", "Cable detector/locator", "Insulation tester", "Earth loop impedance tester"]}
                correctIndex={1}
                explanation="Cable detectors are specifically designed to locate buried cables and verify their routing, making them essential for route inspection."
              />
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Common Mistakes
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">Routing Violations:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Installing cables diagonally to save time and materials</li>
                  <li>Running cables outside recognised safe zones</li>
                  <li>Taking shortcuts that don't follow accessory alignment</li>
                  <li>Ignoring zone requirements in renovation work</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-3">Depth and Protection Issues:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Installing cables too shallow without RCD protection</li>
                  <li>Omitting mechanical protection in high-risk areas</li>
                  <li>Failing to install warning tape above buried cables</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Prevention Strategy</p>
                <p className="text-sm">
                  Proper planning, clear drawings, and systematic inspection at key stages prevent most routing errors and ensure compliance.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="common-mistakes-check"
                question="Which is the most common cable routing mistake in electrical installations?"
                options={["Using oversized cables", "Running cables diagonally outside safe zones", "Installing too many junction boxes", "Using wrong cable colours"]}
                correctIndex={1}
                explanation="Running cables diagonally outside safe zones is extremely common as installers try to save time and materials, but it creates serious safety risks."
              />
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="font-medium text-red-400 mb-3">Case Study: Housing Development Cable Strike</p>
              <p className="text-sm text-white/80 mb-3">
                During a housing development project, electricians installed cables diagonally across walls to save time. Later, during a kitchen renovation, a contractor struck a live cable, resulting in:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-sm text-white/80 mb-3">
                <li>Electric shock injury to the contractor</li>
                <li>Circuit damage requiring complete rewiring</li>
                <li>Fire risk from arcing at the damage point</li>
                <li>Insurance claims and potential legal action</li>
              </ul>
              <p className="text-sm font-medium text-white">
                Prevention: Following BS 7671 safe zone requirements and ensuring proper RCD protection would have prevented this incident.
              </p>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide - Cable Zones & Depths
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Horizontal: 150 mm from top of wall</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Vertical: directly above or below accessories</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Depth: &gt;50mm without RCD protection</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-red-400">✗</span>
                  <span>Never run cables diagonally when concealed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-red-400">✗</span>
                  <span>Avoid routes outside recognised safe zones</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-red-400">✗</span>
                  <span>Don't install shallow cables without protection</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Signs of Damage
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-4">
                Next: Terminations & Polarity
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section2_3;
