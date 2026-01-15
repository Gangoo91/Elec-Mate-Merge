import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Container,
  AlertTriangle,
  Factory,
  Shield,
  Target,
  Settings,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const TITLE = "Cable Tray, Basket and Ladder Systems - Module 3.2.4 | Level 2 Electrical Course";
const DESCRIPTION = "Complete guide to cable containment systems. Trays, baskets, and ladder systems for electrical installations and BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: "tray-advantage",
    question: "Name one advantage of cable trays over baskets.",
    options: [
      "Better ventilation",
      "Lower weight",
      "Weather protection and support",
    ],
    correctIndex: 2,
    explanation:
      "Cable trays provide better weather protection with solid or perforated bases and offer superior support for heavier cable loads.",
  },
  {
    id: "basket-application",
    question: "Why are cable baskets popular for data installations?",
    options: [
      "Highest load capacity",
      "Lightweight and easy to cut on site",
      "Best weather protection",
    ],
    correctIndex: 1,
    explanation:
      "Cable baskets are lightweight, quick to install, and can be easily cut to length on site, making them ideal for data cabling projects.",
  },
  {
    id: "ladder-system",
    question: "Which containment system offers the highest load capacity?",
    options: [
      "Cable basket",
      "Cable tray",
      "Ladder system",
    ],
    correctIndex: 2,
    explanation:
      "Ladder systems provide the highest load capacity and can span longer distances, making them ideal for heavy power cables.",
  },
  {
    id: "earthing-requirement",
    question: "What earthing requirement applies to metallic cable management systems?",
    options: [
      "Earthing is optional",
      "All metallic sections must be earthed",
      "Only outdoor systems need earthing",
    ],
    correctIndex: 1,
    explanation:
      "All metallic sections of cable management systems must be properly earthed to maintain electrical safety and continuity.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which open containment method offers the highest load capacity?",
    options: [
      "Cable basket",
      "Cable tray",
      "Ladder system",
      "PVC trunking",
    ],
    correctAnswer: 2,
    explanation:
      "Ladder systems provide extremely high load capacity for long spans and heavy power cables, typically 150-500 kg/m.",
  },
  {
    id: 2,
    question: "Why are cable baskets popular for data installations?",
    options: [
      "Low cost and easy to cut",
      "Highest load capacity",
      "Can be buried underground",
      "Provide better EMC shielding",
    ],
    correctAnswer: 0,
    explanation:
      "Cable baskets are lightweight, quick to install, and easy to cut to length on site, making them ideal for data cabling.",
  },
  {
    id: 3,
    question: "True or False: Ladder systems are ideal for small, lightweight cable runs.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Ladder systems are designed for heavy-duty applications and are not cost-effective for small, lightweight cables.",
  },
  {
    id: 4,
    question: "Name one advantage of perforated cable trays over solid trays.",
    options: [
      "Lower cost",
      "Improved airflow and easier fixing options",
      "Better weather protection",
      "Higher load capacity",
    ],
    correctAnswer: 1,
    explanation:
      "Perforated designs allow better airflow for cooling and make fixing cables easier with multiple fixing points.",
  },
  {
    id: 5,
    question: "What must be done at sharp edges where cables exit metal containment?",
    options: [
      "Paint edges",
      "File smooth or fit protective grommets",
      "Wrap cables in tape",
      "Avoid using that exit",
    ],
    correctAnswer: 1,
    explanation:
      "Sharp edges must be filed smooth or fitted with protective grommets to prevent damage to cable insulation.",
  },
  {
    id: 6,
    question: "What is the typical support spacing for heavy-duty cable ladders?",
    options: [
      "Every 500mm",
      "Every 1.5-3 metres depending on load",
      "Every 5 metres",
      "Support spacing is not critical",
    ],
    correctAnswer: 1,
    explanation:
      "Support spacing for cable ladders typically ranges from 1.5-3 metres depending on the load and cable ladder specification.",
  },
  {
    id: 7,
    question: "According to BS EN 61537, what is required for cable management systems in fire escape routes?",
    options: [
      "Any material is acceptable",
      "Enhanced fire performance requirements",
      "Only PVC systems allowed",
      "No specific requirements",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 61537 requires enhanced fire performance for cable management systems in escape routes to maintain safety during evacuation.",
  },
  {
    id: 8,
    question: "What earthing requirement applies to metallic cable management systems?",
    options: [
      "Earthing is optional",
      "Only the first section needs earthing",
      "All metallic sections must be earthed to maintain continuity",
      "Earthing is only required outdoors",
    ],
    correctAnswer: 2,
    explanation:
      "All metallic sections of cable management systems must be properly earthed to maintain electrical safety and continuity.",
  },
];

const faqs = [
  {
    question: "What's the difference between perforated and solid cable trays?",
    answer: "Perforated trays offer better ventilation and easier cable fixing, while solid trays provide better weather protection and support for smaller cables.",
  },
  {
    question: "Can cable baskets be used for power cables?",
    answer: "Yes, but check load capacity. Baskets are typically rated 50-150 kg/m, suitable for lighter power cables but may require closer support spacing.",
  },
  {
    question: "What's the maximum span for ladder systems?",
    answer: "Typically 3-6 metres depending on load, but always check manufacturer's load tables and deflection limits for specific applications.",
  },
  {
    question: "Do cable management systems need earthing in non-metallic buildings?",
    answer: "Yes - metallic cable management systems must be earthed regardless of building type to ensure electrical safety.",
  },
];

const Module3Section2_4: React.FC = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Container className="h-4 w-4" />
            <span>Module 3.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Tray, Basket and Ladder Systems
          </h1>
          <p className="text-white/80">
            Understanding open cable containment systems, their applications and installation requirements for electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>Cable trays: Solid/perforated support, weather protection, medium-high loads</li>
              <li>Cable baskets: Wire mesh, excellent ventilation, lightweight, easy cutting</li>
              <li>Ladder systems: Maximum load capacity, long spans, heavy power cables</li>
              <li>All systems require proper earthing, support spacing and BS 7671 compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Metal mesh (baskets), solid perforated sheets (trays), side rails with rungs (ladders)</li>
              <li><strong>Use:</strong> Baskets for data/light cables; trays for general purpose; ladders for heavy power</li>
              <li><strong>Check:</strong> Load capacity, support spacing, earthing continuity, edge protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the characteristics and applications of cable trays, baskets and ladder systems",
              "Select the appropriate containment system based on load, environment and cable type",
              "Calculate support spacing and loads for different cable containment systems",
              "Understand installation requirements including earthing and fire safety compliance",
              "Apply BS EN 61537 and BS 7671 requirements for cable management systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: System Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Cable Containment System Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Cable Trays</p>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Construction</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Solid or perforated steel/aluminium base</li>
                      <li>Raised sides for cable retention</li>
                      <li>Standard widths: 50-900mm</li>
                      <li>Galvanised or powder coated finish</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Advantages</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Weather protection from above</li>
                      <li>Good support for mixed cable types</li>
                      <li>Load capacity: 75-300 kg/m</li>
                      <li>Easy cable access and organisation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Applications</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>General building services</li>
                      <li>Outdoor/weather exposed routes</li>
                      <li>Mixed power and control cables</li>
                      <li>Areas requiring cable segregation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-green-500/10 border border-green-400/20">
                <p className="font-medium text-white text-sm mb-2">Cable Baskets</p>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Construction</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Wire mesh or grid construction</li>
                      <li>Welded or formed mesh pattern</li>
                      <li>Lightweight galvanised steel</li>
                      <li>Easy to cut and modify on site</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Advantages</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Excellent ventilation and heat dissipation</li>
                      <li>Quick installation and modification</li>
                      <li>Load capacity: 50-150 kg/m</li>
                      <li>Cost-effective for data installations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Applications</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Data and communication cables</li>
                      <li>Areas requiring maximum ventilation</li>
                      <li>Retrofit installations</li>
                      <li>Suspended ceiling applications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Ladder Systems</p>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Construction</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Side rails with cross rungs</li>
                      <li>Heavy-duty galvanised steel</li>
                      <li>Welded or bolted construction</li>
                      <li>Available in standard 3m lengths</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Advantages</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Maximum load capacity: 150-500 kg/m</li>
                      <li>Long span capability (3-6m)</li>
                      <li>Excellent ventilation</li>
                      <li>Suitable for largest cable sizes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white/80 text-xs mb-1">Applications</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>Heavy power cable installations</li>
                      <li>Long span requirements</li>
                      <li>Industrial high-load applications</li>
                      <li>Main distribution routes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: What this means on site */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What This Means on Site
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded bg-white/5">
              <p className="font-medium text-white text-sm mb-2">Selection Criteria</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Calculate total cable weight including 25% future capacity</li>
                <li>Consider environmental conditions (indoor/outdoor, corrosive atmospheres)</li>
                <li>Evaluate span requirements and available support points</li>
                <li>Factor in installation time, accessibility and future modifications</li>
                <li>Consider fire safety requirements for escape routes (BS EN 61537)</li>
              </ul>
            </div>

            <div className="p-4 rounded bg-cyan-500/10 border border-cyan-400/20">
              <p className="font-medium text-white text-sm mb-2">Load Calculations</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Total load = cable weight + system self-weight + 25% safety factor</li>
                <li>Check manufacturer's load tables for maximum loads per support span</li>
                <li>Consider point loads from junction boxes and equipment</li>
                <li>Verify building structure can support total loads including dynamic forces</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Installation Practices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Practices and Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded bg-elec-yellow/10 border border-elec-yellow/20">
              <p className="font-medium text-elec-yellow text-sm mb-2">Support Spacing Requirements</p>
              <ul className="text-xs text-elec-yellow/80 space-y-1">
                <li><strong>Cable trays:</strong> 1.2-2.0m depending on width and load</li>
                <li><strong>Cable baskets:</strong> 1.0-1.5m for typical data cable loads</li>
                <li><strong>Ladder systems:</strong> 1.5-3.0m for heavy power cables</li>
                <li>Additional support required near bends, junctions and equipment</li>
                <li>Maximum deflection: L/200 under full load</li>
              </ul>
            </div>

            <div className="p-4 rounded bg-violet-500/10 border border-violet-400/20">
              <p className="font-medium text-violet-200 text-sm mb-2">Earthing and Electrical Safety</p>
              <ul className="text-xs text-violet-200/80 space-y-1">
                <li>All metallic sections must be electrically continuous</li>
                <li>Earth continuity conductor minimum 4mm sq for cable management systems</li>
                <li>Test continuity between sections: resistance less than 0.1 Ohm</li>
                <li>Connect to main earthing terminal via appropriate earth clamp</li>
                <li>Maintain earthing integrity through expansion joints</li>
              </ul>
            </div>

            <div className="p-4 rounded bg-indigo-500/10 border border-indigo-400/20">
              <p className="font-medium text-indigo-200 text-sm mb-2">Installation Best Practices</p>
              <ul className="text-xs text-indigo-200/80 space-y-1">
                <li>Plan cable routes to minimise bends and maintain minimum bend radius</li>
                <li>Install systems level and square with adequate clearances</li>
                <li>Use appropriate fixings rated for the building structure and loads</li>
                <li>Provide expansion joints every 30-50m for long runs</li>
                <li>Install end caps and covers for cable protection</li>
                <li>File smooth or fit grommets at sharp edges to protect cables</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Common Mistakes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Mistakes to Avoid
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-3 rounded bg-white/5">
              <p className="font-medium text-white text-sm mb-2">Installation Errors</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li><strong>Inadequate support spacing:</strong> Causing excessive deflection and cable stress</li>
                <li><strong>Poor earthing connections:</strong> Creating potential safety hazards and non-compliance</li>
                <li><strong>Incorrect load calculations:</strong> Leading to system overload and structural failure</li>
                <li><strong>Insufficient clearances:</strong> Preventing proper cable installation and maintenance</li>
                <li><strong>Mixing components:</strong> Using incompatible manufacturers' parts without checking compatibility</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-amber-500/10 border border-amber-400/20">
              <p className="font-medium text-white text-sm mb-2">Planning Oversights</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li><strong>Ignoring thermal expansion:</strong> Not providing expansion joints in long runs</li>
                <li><strong>Inadequate access provision:</strong> Making future maintenance difficult or impossible</li>
                <li><strong>Wrong system selection:</strong> Using baskets for heavy loads or ladders for light cables</li>
                <li><strong>Poor cable segregation:</strong> Mixing power and data cables without proper separation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* BS 7671 Context */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">BS 7671 and Standards Context</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded bg-white/5">
              <p className="font-medium text-white text-sm mb-2">Key Standards and Regulations</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li><strong>BS EN 61537:</strong> Cable management systems for electrical installations</li>
                <li><strong>BS 7671 Chapter 52:</strong> Selection and erection of wiring systems</li>
                <li><strong>521.10.1:</strong> Cable support systems and spacing requirements</li>
                <li><strong>543.2:</strong> Earthing requirements for metallic cable management</li>
                <li><strong>527.1:</strong> Cable segregation requirements for different circuits</li>
              </ul>
            </div>

            <div className="p-4 rounded bg-green-500/10 border border-green-400/20">
              <p className="font-medium text-white text-sm mb-2">Fire Safety Requirements</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Enhanced fire performance required in escape routes</li>
                <li>Reaction to fire classification for non-metallic systems</li>
                <li>Smoke and toxicity emission considerations</li>
                <li>Fire-resistant coatings for metallic systems in critical areas</li>
                <li>Compartmentation integrity around fire barriers</li>
              </ul>
            </div>

            <div className="p-4 rounded bg-white/5">
              <p className="font-medium text-white text-sm mb-2">Compliance Testing</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Earth continuity testing: less than 0.1 Ohm between all metallic sections</li>
                <li>Load testing: Verify systems meet manufacturer's specifications</li>
                <li>Visual inspection: Check support spacing, clearances and finish</li>
                <li>Cable segregation verification per BS 7671 requirements</li>
                <li>Documentation: Installation certificates and test records</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-world Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-elec-yellow" />
            Real-world Scenario: Industrial Facility Cable Management
          </h2>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-start gap-3 mb-4">
              <Factory className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-white mb-2">The Project</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  A manufacturing facility requires cable containment for the main electrical distribution.
                  The installation includes 400A three-phase power cables, control circuits, and data networks.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Power Distribution Route</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Cable ladder system for main 400A feeders</li>
                  <li>3m support spacing due to cable weight (85 kg/m)</li>
                  <li>Galvanised steel construction for corrosion resistance</li>
                  <li>Earthing via 25mm sq earth conductor</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Control and Data Circuits</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Cable baskets for control wiring (12 kg/m total load)</li>
                  <li>1.2m support spacing for lighter loads</li>
                  <li>Separate basket for data cables (segregation)</li>
                  <li>Common earthing point with main system</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h2 className="text-lg font-semibold text-elec-yellow mb-2">Summary</h2>
            <div className="text-sm text-white space-y-2">
              <p>
                <strong>Cable containment systems</strong> are essential for organised, safe cable installations.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Cable trays</strong> provide weather protection and good support for mixed loads</li>
                <li><strong>Cable baskets</strong> offer excellent ventilation and are ideal for data installations</li>
                <li><strong>Ladder systems</strong> provide maximum load capacity for heavy power cables</li>
                <li><strong>All systems</strong> require proper earthing, support spacing and BS 7671 compliance</li>
                <li><strong>Selection depends</strong> on load, environment, span requirements and cost factors</li>
              </ul>
              <p>
                Proper installation with correct support spacing, earthing and edge protection ensures safe,
                compliant installations that meet BS EN 61537 and BS 7671 requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Apprentice Do's and Don'ts</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-green-500/10 border border-green-400/20">
              <h3 className="font-medium text-white text-sm mb-3">DO</h3>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Calculate total loads including future capacity</li>
                <li>Check manufacturer's load tables and specifications</li>
                <li>Ensure all metallic sections are properly earthed</li>
                <li>Provide adequate support spacing per regulations</li>
                <li>Install expansion joints on long runs</li>
                <li>File smooth all sharp edges or fit grommets</li>
                <li>Consider environmental factors in system selection</li>
                <li>Test earth continuity after installation</li>
              </ul>
            </div>
            <div className="p-4 rounded bg-red-500/10 border border-red-400/20">
              <h3 className="font-medium text-white text-sm mb-3">DON'T</h3>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Exceed manufacturer's load ratings</li>
                <li>Use incompatible components from different systems</li>
                <li>Ignore thermal expansion requirements</li>
                <li>Install without proper earthing connections</li>
                <li>Mix power and data cables without segregation</li>
                <li>Cut corners on support spacing to save money</li>
                <li>Leave sharp edges that could damage cables</li>
                <li>Forget to plan for future maintenance access</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pocket Card */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Reference</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-white/5">
              <h4 className="font-medium text-white text-sm mb-2">Cable Trays</h4>
              <ul className="text-xs text-white/80 space-y-0.5">
                <li>Load: 75-300 kg/m</li>
                <li>Support: 1.2-2.0m</li>
                <li>Use: General purpose</li>
                <li>Benefit: Weather protection</li>
              </ul>
            </div>
            <div className="p-3 rounded bg-green-500/10 border border-green-400/20">
              <h4 className="font-medium text-white text-sm mb-2">Cable Baskets</h4>
              <ul className="text-xs text-white/80 space-y-0.5">
                <li>Load: 50-150 kg/m</li>
                <li>Support: 1.0-1.5m</li>
                <li>Use: Data/light power</li>
                <li>Benefit: Easy installation</li>
              </ul>
            </div>
            <div className="p-3 rounded bg-white/5">
              <h4 className="font-medium text-white text-sm mb-2">Ladder Systems</h4>
              <ul className="text-xs text-white/80 space-y-0.5">
                <li>Load: 150-500 kg/m</li>
                <li>Support: 1.5-3.0m</li>
                <li>Use: Heavy power</li>
                <li>Benefit: Maximum capacity</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
            <p className="text-elec-yellow/80 text-xs">
              <strong>Remember:</strong> All metallic systems need earthing (less than 0.1 Ohm).
              Support spacing critical for safety. Check BS EN 61537 for fire requirements.
            </p>
          </div>
        </section>

        {/* Key References */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Key References</h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 rounded bg-white/5">
              <span className="text-white">BS EN 61537:2006</span>
              <span className="text-white/70">Cable management systems for electrical installations</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-white/5">
              <span className="text-white">BS 7671:2018+A2:2022</span>
              <span className="text-white/70">IET Wiring Regulations (Chapter 52)</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-white/5">
              <span className="text-white">BS EN 50085</span>
              <span className="text-white/70">Cable trunking and ducting systems</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-white/5">
              <span className="text-white">Health & Safety at Work etc. Act 1974</span>
              <span className="text-white/70">General workplace safety requirements</span>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module3Section2_4;
